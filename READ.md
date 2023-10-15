# Certificate Issuance and Verification Platform - TechEd

TechEd Academy's Certificate Issuance and Verification Platform is a cutting-edge system designed to securely issue and validate digital certificates for our students. Students who successfully complete TechEd Academy courses receive digital certificates that are digitally signed, making them tamper-proof and highly reliable. The platform also provides an API for whitelisted organizations to verify the authenticity of these certificates, bolstering trust in the professional world

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Database](#database)
- [License](#license)

## Introduction

Welcome to Certificate Issuance and Verification Platform, a robust and scalable web application built on the powerful Node.js framework, Express. This project is dedicated for issuance and verification of digital vertificate issued to students.

## Features

Certificate Issuance and Verification Platform has been built to demonstrate the following core features:

- Student Registration
- Issue Certificate
- Verify Certificate
- List of all courses

## Prerequisites

This project is light weight and easy to plug and play, it have very minimal prerequisite. Ensure that you have Node.js 18 and npm (Node Package Manager) installed on your system. You can download them from the official Node.js website: https://nodejs.org/

## Installation

After cloning project run below commands

```bash
# Example installation steps
npm install
npm run dev
```

## API Endpoints

### Student Registration

- **POST /api/v1/students**

### Description

The "Student Registration" API endpoint allows you to create a new student account by providing student information in the request body.

### Request

- **HTTP Method**: POST
- **Endpoint URL**: `{{base_url}}/api/v1/students`

#### Request Body

The request body should contain student information in JSON format, including at least the following fields:

```json
{
  "name": "New User name",
  "email": "newuser@example.com",
  "courseId": "courseId"
}
```

### Issue Certificate

- **GET /api/v1/certificates/issue/{{studentId}}/{{courseId}}**

### Description

The "Issue Certificate" API endpoint allows you to issue certificate to a student, student id and course id is required as URL parameters.

### Request

- **HTTP Method**: GET
- **Endpoint URL**: `{{base_url}}//api/v1/certificates/issue/{{studentId}}/{{courseId}}`

### Verify Certificate

- **POST /api/v1/certificates/verify**

### Description

The "Verify Certificate" API endpoint allows you to verify certificate of a student by providing certificate data in request body and organisation Bearer token in Authorization header.

### Request

- **HTTP Method**: POST
- **Endpoint URL**: `{{base_url}}//api/v1/certificates/verify`

#### Request Body

The request body should contain certificate data and authorization header should contain bearer token issues to org.

```json
{
  "certificatedata": {
    // Certificate data
  }
}
```

### Get Courses

- **GET /api/v1/courses**

### Description

The "Get Courses" API endpoint allows you get list of all courses offered by TechEd academy.

### Request

- **HTTP Method**: GET
- **Endpoint URL**: `{{base_url}}//api/v1/courses`

## Database

### Database System

Our project utilizes the file system as primary database.

## License

This project is licensed under the [MIT License].
