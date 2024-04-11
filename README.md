## Demo video
https://www.loom.com/share/35c57eee587b48189527f6fdb4e2c2b7?sid=2c5e28f3-33a2-4407-9a18-15f66ed3ede3

## Prerequisites
Please make sure you have the required softwares and configuration done before cloning the repository

Make sure you have the below application installed

- Visual Studio Code
- Node.js (v20 LTS)
- Postman
- Docker desktop

## Dynamic Form Module
    - Purpose of dynamic form with dynamic fields. And also insert and retrive form data
    - Module is created in based on boilerplate project and followed naming conventions and standards as per boilerplate projects.
    
## Basic Objectives of Modules:
    - Create dynamic form having title of form and dynamic fields given in bodydata
    - Insert form data, body has form data and in query string title of form
    - Get all insert data fetch by title

## How to run:
    - npm ci
    - npm install -g win-node-env
    - docker-compose -f .\docker-compose.local.yml up -d
    - Create mydb database as defined in .env.development
    - npm run start:dev

## Entities
     Form - stores title of form has one to many relationship with FormField and one to many relationship with FormData
     FormField - stores id, formId and fieldName and fieldType
     FormData - stores uniqueId, formId, formFieldId and fieldValue

     ![image](https://github.com/Pruthviraj26/nest-is-best/assets/10598434/bfce2637-aa6b-448d-b3e0-dd8623ba716e)


## End Points (Form Controller functions)
    /create-form - Post request to create form and form fields
        example:
        Url : localhost:3000/api/v1/form/create-form
        Body : {
                    "title":"user",
                    "first_name": "string",
                    "last_name": "string",
                    "age": "number"
                }
        Response :
        {
            "statusCode": 201,
            "message": "Form created successfully",
            "data": {
                "form": {
                    "id": 1,
                    "title": "user",
                    "createdAt": "2024-04-10T12:26:39.000Z",
                    "updatedAt": "2024-04-10T12:26:39.000Z",
                    "formFields": [
                        {
                            "id": 1,
                            "formId": 1,
                            "fieldName": "first_name",
                            "fieldType": "string",
                            "createdAt": "2024-04-10T12:26:39.000Z",
                            "updatedAt": "2024-04-10T12:26:39.000Z"
                        },
                        {
                            "id": 2,
                            "formId": 1,
                            "fieldName": "last_name",
                            "fieldType": "string",
                            "createdAt": "2024-04-10T12:26:39.000Z",
                            "updatedAt": "2024-04-10T12:26:39.000Z"
                        },
                        {
                            "id": 3,
                            "formId": 1,
                            "fieldName": "age",
                            "fieldType": "number",
                            "createdAt": "2024-04-10T12:26:39.000Z",
                            "updatedAt": "2024-04-10T12:26:39.000Z"
                        }
                    ]
                }
            }
        }

    /fill-form?title={title} - Post request to insert data to the form given in query parameter title.
    POST url: localhost:3000/api/v1/form/fill-form?title=user
    Body : 
    {
        "first_name": "pruthvi",
        "last_name": "rathod",
        "age": 10
    }
    Reponse : 
    {
        "statusCode": 200,
        "message": "Form data filled successfully",
        "data": {
        "bcecb6a7-34c3-4725-943f-061f988c0af4": {
        "first_name": "pruthvi",
        "last_name": "rathod",
        "age": "10"
            }
        }
    }

    /get-data - Get request to get all inserted form given in query parameter title.
    GET url : localhost:3000/api/v1/form/get-data?title=user
    {
        "statusCode": 200,
        "message": "Form data fetched successfully",
        "data": {
            "bcecb6a7-34c3-4725-943f-061f988c0af4": {
                "first_name": "pruthvi",
                "last_name": "rathod",
                "age": "10"
            },
            "a2d15bd4-ba62-495c-9f1f-c0cc111e2cbf": {
                "first_name": "raj",
                "last_name": "rathod",
                "age": "10"
            }
        }
    }

## Service (Form Service)
    Provides basic functions like createFormAndFields, fillFormData, findFormData, transformData

## Repositories
    Defined repository file for each entity FormRepository, FormFieldRepository, FormDataRepository.
    Repository has create and find function to create record and fetch data.
    Used sequilize orm function to run query

## Validation
    Basic validation likes 
    - title value must be string 
    - supported data types by dynamic form
    - form data must be saved as form field data type. 
    
## Custom Exceptions
    Form not found form given title. 
    Invalid type of filedValue as per fieldType given for filedName.

## Design patterns
    MVC with service, repository and dto.

## Other
    Use nest-events
