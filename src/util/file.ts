import fs from 'fs';

export const readJsonFile = async (path: string): Promise<any | undefined> => {
    if (!fs.existsSync(path)) {
        return;
    }
    return JSON.parse(fs.readFileSync(path, 'utf-8'));
}

export const readFile = async (path: string): Promise<string | undefined> => {
    if (!fs.existsSync(path)) {
        return;
    }
    return fs.readFileSync(path, 'utf-8');
}

export const writeFile = async (path: string, data: string) => {
    await fs.writeFileSync(path, data);
}

export const writeJsonFile = async (path: string, data: any) => {
    await createIfNotExist(path);
    await fs.writeFileSync(path, JSON.stringify(data));
}

export const createIfNotExist = async (path: string) => {
    if (!fs.existsSync(path)) {
        const fileName = path.split('/').pop();
        if (fileName) {
            await fs.writeFileSync(`db/${fileName}`, '[]');
        }
    }
}