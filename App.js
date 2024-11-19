require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

// Routes
app.use('/api/categories', require('./routes/category'));
app.use('/api/products', require('./routes/product'));


app.get('/', (req, res) => {
    res.send(`
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        margin: 0;
        padding: 0;
        background-color: #f4f4f4;
      }
      .container {
        max-width: 800px;
        margin: 50px auto;
        padding: 20px;
        background: #fff;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
      h1, h2, h3 {
        color: #333;
      }
      ul, ol {
        margin: 0 0 20px 20px;
      }
      pre {
        background: #f4f4f4;
        padding: 10px;
        border-radius: 5px;
      }
      code {
        background: #e7e7e7;
        padding: 2px 4px;
        border-radius: 3px;
      }
    </style>
    <div class="container">
      <h1>E-commerce Backend API</h1>
      <p>Welcome to the E-commerce Backend API. This API is designed to manage categories and products for an online store. It provides robust CRUD operations with MongoDB for scalable data management, ensuring data integrity by maintaining product information even when categories are deleted.</p>
      <h2>Tech Stack</h2>
      <ul>
        <li>Node.js with Express.js</li>
        <li>MongoDB using Mongoose</li>
        <li>Environment Management: dotenv</li>
        <li>Development Tools: nodemon</li>
      </ul>
      <h2>Project Setup and Execution Instructions</h2>
      <h3>Prerequisites</h3>
      <ul>
        <li>Node.js</li>
        <li>MongoDB</li>
      </ul>
      <h3>Setup Instructions</h3>
      <ol>
        <li>Clone the repository:
          <pre><code>git clone &lt;your-repository-url&gt;</code></pre>
          <pre><code>cd my-project</code></pre>
        </li>
        <li>Install dependencies:
          <pre><code>npm install</code></pre>
        </li>
        <li>Set up environment variables:
          <pre><code>.env file in the root directory:
MONGODB_URI=your_mongodb_connection_string
PORT=6000</code></pre>
        </li>
        <li>Start the server:
          <pre><code>npm run dev</code></pre>
        </li>
        <li>Test the APIs using Postman or a similar tool.</li>
      </ol>
      <h2>Schema Design and Relationships</h2>
      <h3>Category Schema</h3>
      <ul>
        <li><strong>Fields</strong>:
          <ul>
            <li><code>name</code>: String, required, unique</li>
          </ul>
        </li>
      </ul>
      <h3>Product Schema</h3>
      <ul>
        <li><strong>Fields</strong>:
          <ul>
            <li><code>name</code>: String, required</li>
            <li><code>price</code>: Number, required, must be positive</li>
            <li><code>stock</code>: Number, required, default 0, must be non-negative</li>
            <li><code>categoryId</code>: ObjectId, reference to Category, required</li>
          </ul>
        </li>
      </ul>
      <h3>Relationships</h3>
      <ul>
        <li>Each product is associated with a category via the <code>categoryId</code> field.</li>
        <li>When a category is deleted, associated products are marked as uncategorized.</li>
      </ul>
      <h2>List of APIs and Their Usage</h2>
      <h3>Category APIs</h3>
      <ol>
        <li><strong>Create a Category</strong>
          <ul>
            <li><strong>Method</strong>: POST</li>
            <li><strong>URL</strong>: <code>/api/categories</code></li>
            <li><strong>Body</strong>:
              <pre><code>{
  "name": "Electronics"
}</code></pre>
            </li>
          </ul>
        </li>
        <li><strong>Get All Categories</strong>
          <ul>
            <li><strong>Method</strong>: GET</li>
            <li><strong>URL</strong>: <code>/api/categories</code></li>
          </ul>
        </li>
        <li><strong>Get a Category by ID (with its Products)</strong>
          <ul>
            <li><strong>Method</strong>: GET</li>
            <li><strong>URL</strong>: <code>/api/categories/:id</code></li>
          </ul>
        </li>
        <li><strong>Update a Category</strong>
          <ul>
            <li><strong>Method</strong>: PATCH</li>
            <li><strong>URL</strong>: <code>/api/categories/:id</code></li>
            <li><strong>Body</strong>:
              <pre><code>{
  "name": "Updated Category Name"
}</code></pre>
            </li>
          </ul>
        </li>
        <li><strong>Delete a Category</strong>
          <ul>
            <li><strong>Method</strong>: DELETE</li>
            <li><strong>URL</strong>: <code>/api/categories/:id</code></li>
          </ul>
        </li>
      </ol>
      <h3>Product APIs</h3>
      <ol>
        <li><strong>Create a Product</strong>
          <ul>
            <li><strong>Method</strong>: POST</li>
            <li><strong>URL</strong>: <code>/api/products</code></li>
            <li><strong>Body</strong>:
              <pre><code>{
  "name": "Smartphone",
  "price": 699,
  "stock": 50,
  "categoryId": "category_id_here"
}</code></pre>
            </li>
          </ul>
        </li>
        <li><strong>Get All Products</strong>
          <ul>
            <li><strong>Method</strong>: GET</li>
            <li><strong>URL</strong>: <code>/api/products</code></li>
          </ul>
        </li>
        <li><strong>Get a Product by ID (with its Category)</strong>
          <ul>
            <li><strong>Method</strong>: GET</li>
            <li><strong>URL</strong>: <code>/api/products/:id</code></li>
          </ul>
        </li>
        <li><strong>Update a Product</strong>
          <ul>
            <li><strong>Method</strong>: PATCH</li>
            <li><strong>URL</strong>: <code>/api/products/:id</code></li>
            <li><strong>Body</strong>:
              <pre><code>{
  "name": "Updated Product Name",
  "price": 799,
  "stock": 45
}</code></pre>
            </li>
          </ul>
        </li>
        <li><strong>Delete a Product</strong>
          <ul>
            <li><strong>Method</strong>: DELETE</li>
            <li><strong>URL</strong>: <code>/api/products/:id</code></li>
          </ul>
        </li>
      </ol>
      <h2>Future Enhancements</h2>
      <ul>
        <li><strong>Pagination and Search</strong>: Implement pagination and search functionality for better data retrieval.</li>
        <li><strong>Authentication</strong>: Add user authentication and authorization to secure the API.</li>
        <li><strong>Deployment</strong>: Deploy the API to a cloud platform for public access.</li>
      </ul>
    </div>
  `);
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});