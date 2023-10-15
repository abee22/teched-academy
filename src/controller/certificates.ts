import { Request, Response } from 'express';
import { ValidationResult } from 'joi';
import crypto from 'crypto';
import { issueCertificateSchema, verifyCertificateSchema } from '../schema/index.js';
import {
    handleValidationResponse,
    handleErrorResponse,
    getDid,
    readFile,
    writeFile
} from '../util/index.js';
import { getCourseById, getStudentById } from '../model/index.js';
import { PRIVATE_KEY_PATH, PUBLIC_KEY_PATH } from '../constants.js';

/**
 * `issueCertificate` function issues digital certificate to student.
 * It needs `studentId` and `courseId` as URL params
 * @param {express.Request} req - The Express.js request object
 * @param {express.Response} res - The Express.js response object
 * @returns {JSON} - A JSON response
 */
export const issueCertificate = async (req: Request, res: Response) => {
    try {
        const result: ValidationResult = issueCertificateSchema.validate(req.params);
        if (result.error) {
            return handleValidationResponse(result.error, res);
        }

        const { studentId, courseId } = req.params;

        const student = await getStudentById(studentId);
        if (!student) {
            return res.status(404).json({
                message: 'Student not found'
            });
        }

        const course = await getCourseById(courseId);
        if (!course) {
            return res.status(404).json({
                message: 'Course not found'
            });
        }
        await generateKey();
        const privateKey = (await readFile(PRIVATE_KEY_PATH));
        const publicKey = (await readFile(PUBLIC_KEY_PATH));
        if (!privateKey || !publicKey) {
            console.log('No public or private key found');
            return;
        }

        const now = new Date().toISOString();
        const certificateData: any = {
            '@context': [
                'https://www.w3.org/2018/credentials/v1',
                'https://www.w3.org/2018/credentials/examples/v1'
            ],
            'type': ['VerifiableCredential', 'CourseCompletionCredential'],
            'issuer': getDid('techedacademy'),
            'issuanceDate': now,
            'credentialSubject': {
                'id': getDid(student.id!),
                'studentName': student.name,
                'courseName': course.name,
                'courseCompletionDate': now
            }
        };
        const sign = crypto.createSign('RSA-SHA256');
        sign.update(JSON.stringify(certificateData));
        const signature = sign.sign(privateKey, 'base64');
        sign.end();
        storeCertificate(certificateData);
        certificateData.proof = {
            type: 'RsaSignature2018',
            created: now,
            proofPurpose: 'assertionMethod',
            verificationMethod: publicKey,
            jws: signature
        };

        return res.status(200).json({
            data: {
                certificateData
            }
        });
    } catch (e) {
        return handleErrorResponse(e, res);
    }
};

/**
 * `storeCertificate` function encrypts certificate logs the encrypted data in console
 * @param certificateData - Object containing certificate data to be stored
 * @returns Void
 */

const storeCertificate = (certificateData: any) => {
    try {
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(process.env.SECRET_KEY!), iv);
        let encryptedData = cipher.update(JSON.stringify(certificateData), 'utf-8', 'hex');
        encryptedData += cipher.final('hex');

        console.log('Encrypted certificate', encryptedData);

        const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(process.env.SECRET_KEY!), iv);
        let decryptedData = decipher.update(encryptedData, 'hex', 'utf-8');
        decryptedData += decipher.final('utf-8');
        console.log('Decrypted certificate', decryptedData);
    } catch (e) {
        throw e;
    }
}

/**
 * `verifyCertificate` function is used to verify certificate
 * It needs `certificateData` in request body
 * @param {express.Request} req - The Express.js request object
 * @param {express.Response} res - The Express.js response object
 * @returns {JSON} - A JSON response
 */
export const verifyCertificate = async (req: Request, res: Response) => {
    const result: ValidationResult = verifyCertificateSchema.validate(req.body);
    if (result.error) {
        return handleValidationResponse(result.error, res);
    }
    const { certificateData } = req.body;
    const verified = await verifyCryptographicProof(certificateData);
    return res.status(200).json({
        verified,
        message: verified ? 'The certificate is valid and not tampered' : 'The certificate is not valid and seems tampered',
        certificateData: verified ? certificateData : {}
    });
}

/**
 * `verifyCryptographicProof` function is used to verify cryptographic proof
 * It creates a signature and embed certifiate data in the signature,
 * then compares the received signature with newly created signature
 * @param certificateData - Object containing certificate data to be verified
 * @returns Boolean
 */
const verifyCryptographicProof = async (certificateData: any) => {
    try {
        const { jws, verificationMethod: publicKey } = certificateData.proof;
        delete certificateData.proof;
        // const publicKey = (await readFile(PRIVATE_KEY_PATH));
        const verifier = crypto.createVerify('RSA-SHA256');
        verifier.update(JSON.stringify(certificateData));
        const isVerified = verifier.verify(publicKey!, jws, 'base64');
        verifier.end();
        return isVerified;
    } catch (error) {
        return false;
    }
}

/**
 * `generateKey` function is used to generate public and private key pair
 * It also writes the generated key in `keys` folder
 * @returns Void
 */
export const generateKey = async () => {
    const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
        modulusLength: 1024,
        publicKeyEncoding: { type: 'spki', format: 'pem' },
        privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
    });

    await writeFile(PRIVATE_KEY_PATH, privateKey);
    await writeFile(PUBLIC_KEY_PATH, publicKey);
}