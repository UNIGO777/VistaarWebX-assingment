# E-commerce Backend API

## Overview

The E-commerce Backend API is a Node.js application built with Express.js, designed to manage categories and products for an online store. It provides robust CRUD operations with MongoDB for scalable data management, ensuring data integrity by maintaining product information even when categories are deleted.

## Tech Stack

- **Node.js** with **Express.js**
- **MongoDB** using **Mongoose**
- **Environment Management**: dotenv
- **Development Tools**: nodemon

## Project Setup and Execution Instructions

### Prerequisites

- Node.js
- MongoDB

### Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/UNIGO777/VistaarWebX-assingment.git
   cd my-project
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```
     MONGODB_URI=your_mongodb_connection_string
     PORT=6000
     ```

4. **Start the server**:
   ```bash
   npm run dev
   ```

5. **Test the APIs**:
   - Use Postman or a similar tool to test the API endpoints.

## Schema Design and Relationships

### Category Schema

- **Fields**:
  - `name`: String, required, unique

### Product Schema

- **Fields**:
  - `name`: String, required
  - `price`: Number, required, must be positive
  - `stock`: Number, required, default 0, must be non-negative
  - `categoryId`: ObjectId, reference to Category, required

### Relationships

- Each product is associated with a category via the `categoryId` field.
- When a category is deleted, associated products are marked as uncategorized.

## List of APIs and Their Usage

### Category APIs

1. **Create a Category**
   - **Method**: POST
   - **URL**: `/api/categories`
   - **Body**:
     ```json
     {
       "name": "Electronics"
     }
     ```

2. **Get All Categories**
   - **Method**: GET
   - **URL**: `/api/categories`

3. **Get a Category by ID (with its Products)**
   - **Method**: GET
   - **URL**: `/api/categories/:id`

4. **Update a Category**
   - **Method**: PATCH
   - **URL**: `/api/categories/:id`
   - **Body**:
     ```json
     {
       "name": "Updated Category Name"
     }
     ```

5. **Delete a Category**
   - **Method**: DELETE
   - **URL**: `/api/categories/:id`

### Product APIs

1. **Create a Product**
   - **Method**: POST
   - **URL**: `/api/products`
   - **Body**:
     ```json
     {
       "name": "Smartphone",
       "price": 699,
       "stock": 50,
       "categoryId": "category_id_here"
     }
     ```

2. **Get All Products**
   - **Method**: GET
   - **URL**: `/api/products`

3. **Get a Product by ID (with its Category)**
   - **Method**: GET
   - **URL**: `/api/products/:id`

4. **Update a Product**
   - **Method**: PATCH
   - **URL**: `/api/products/:id`
   - **Body**:
     ```json
     {
       "name": "Updated Product Name",
       "price": 799,
       "stock": 45
     }
     ```

5. **Delete a Product**
   - **Method**: DELETE
   - **URL**: `/api/products/:id`

## Future Enhancements

- **Pagination and Search**: Implement pagination and search functionality for better data retrieval.
- **Authentication**: Add user authentication and authorization to secure the API.
- **Deployment**: Deploy the API to a cloud platform for public access.
