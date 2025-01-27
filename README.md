# Final Project @alx

`Group project`
`Front-end`
`Back-end`
`Portfolio project`


## About

**Title**: A backend restful service for an ecommerce application

<p>A Rest Api E-commerce application that targets market sellers of different product and services to showcase, promote, sell their product online  and be in touch with potential buyers.</p>

### How to use

**Requirement to run project:**
- nodejs
 - mongodb server running on port 27017
 - redis server running on port 6379
 - Rest api client (e.g postman, apidog)

```bash
npm install
npm start
```

### Endpoints

| Users |Stores|Items|Reviews|Promotions|
|----------| ---------| ------- | -----------| ----------|
| /users/new {**methods**: POST}| /stores {**methods**: GET, POST} | /items {**methods**: GET, POST,} | /reviews {**methods**: GET, POST} |
| /users/me {**methods**: GET}| /stores/:id {**methods**: GET} |  /items/:id {**methods**: GET} |/reviews/:id {**methods**: GET} |
| /users/:id {**methods**: GET}|  /stores/:id {**methods**: DELETE}|  /items/:id {**methods**: DELETE} | /reviews/:id {**methods**: DELETE} |
| /users/ {**methods**: PUT}|  |   |
| /users/catalog {**methods**: POST, DELETE}|
| /users/verify-email {**methods**: PUT}|
| /users/request-email-verify {**methods**: GET}|
| /users/forgot-password {**methods**: GET}|

Proper api documentation link underway, reach if needed help.
Say hello to <damisco005@gmail.com> if you need a copy of the .env file