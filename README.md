# URL Shortener Backend

A robust and scalable URL shortening service built with Node.js, Express, and MongoDB. This backend API enables users to create shortened URLs, track analytics, and redirect to original URLs with click tracking capabilities.

## 🎯 Features

- **URL Shortening**: Convert long URLs into compact, shareable shortened URLs
- **Authentication**: Secure JWT-based authentication for protected endpoints
- **Click Analytics**: Track the number of clicks for each shortened URL
- **Redirect Tracking**: Automatic redirect from short URL to original URL with click counting
- **User Management**: User registration and authentication system
- **RESTful API**: Clean and intuitive REST API endpoints
- **MongoDB Integration**: Persistent data storage with MongoDB
- **Environment Configuration**: Secure environment variable management

## 🏗️ Project Structure

```
backend/
├── controllers/
│   ├── url.js              # URL creation, redirection, and analytics logic
│   └── user.controller.js  # User authentication (signup, login, logout)
├── middlewares/
│   └── authVerify.middleware.js  # JWT authentication middleware
├── models/
│   ├── url.js              # URL schema definition
│   └── user.model.js       # User schema definition
├── routes/
│   ├── url.js              # URL related routes
│   └── user.route.js       # User authentication routes
├── views/                  # View templates (if applicable)
├── package.json            # Dependencies and scripts
├── .env.example            # Environment variables example
└── README.md               # Project documentation
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Sagar-Kumar01/urlShortner_backend.git
   cd urlShortner/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   - Copy `.env.example` to `.env`
   - Update the following variables:
   ```env
   PORT=8800
   DATABASE_URL=your_mongodb_connection_string
   BASE_URL=http://localhost:8800
   JWT_SECRET=your_secure_jwt_secret_key
   ```

4. **Start the server**
   ```bash
   npm start
   ```
   
   For development with auto-reload:
   ```bash
   npx nodemon index.js
   ```

The server will start on the port specified in your `.env` file (default: 8800).

## 📚 API Endpoints

### URL Management

#### Create Short URL
- **Endpoint**: `POST /url/short`
- **Authentication**: Required (JWT Token)
- **Request Body**:
  ```json
  {
    "longUrl": "https://example.com/very/long/url"
  }
  ```
- **Response**:
  ```json
  {
    "shortUrl": "abc123",
    "longUrl": "https://example.com/very/long/url",
    "clicks": 0
  }
  ```

#### Get URL Analytics
- **Endpoint**: `GET /url/analytics/:code`
- **Authentication**: Required (JWT Token)
- **Response**:
  ```json
  {
    "shortUrl": "abc123",
    "longUrl": "https://example.com/very/long/url",
    "clicks": 42
  }
  ```

#### Redirect to Original URL
- **Endpoint**: `GET /url/:code`
- **Authentication**: Not Required
- **Behavior**: Redirects to the original long URL and increments click count
- **Response**: HTTP 302 Redirect

### User Management

#### User Registration
- **Endpoint**: `POST /user/register`
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "securePassword123"
  }
  ```

#### User Login
- **Endpoint**: `POST /user/login`
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "securePassword123"
  }
  ```

## 🔐 Authentication

This API uses JWT (JSON Web Tokens) for authentication. Include the token in the request header:

```bash
Authorization: Bearer <your_jwt_token>
```

## 📦 Dependencies

- **express**: ^5.2.1 - Web application framework
- **mongoose**: ^9.1.5 - MongoDB object modeling
- **jsonwebtoken**: ^9.0.3 - JWT generation and verification
- **dotenv**: ^17.2.3 - Environment variable management
- **cookie-parser**: ^1.4.7 - Cookie parsing middleware
- **nanoid**: ^5.1.6 - Unique ID generation for short codes

## 🛠️ Development Dependencies

- **nodemon**: ^3.1.11 - Automatic server restart during development

## 📋 Database Schema

### URL Model
```javascript
{
  shortUrl: String (unique, required),
  longUrl: String (required),
  clicks: Number (default: 0),
  createdAt: Date,
  updatedAt: Date
}
```

### User Model
- See `models/user.model.js` for user schema details

## 🔧 Configuration

All configuration is managed through environment variables. Update your `.env` file:

| Variable | Description | Example |
|----------|-------------|---------|
| PORT | Server port | 8800 |
| DATABASE_URL | MongoDB connection string | mongodb+srv://user:password@cluster.mongodb.net/dbname |
| BASE_URL | Base URL for short URLs | http://localhost:8800 |
| JWT_SECRET | Secret key for JWT signing | your_super_secret_key |

## 🧪 Testing

To test the API endpoints, use tools like:
- [Postman](https://www.postman.com/) - GUI-based API testing
- [curl](https://curl.se/) - Command-line testing
- [Thunder Client](https://www.thunderclient.io/) - VS Code extension

Example:
```bash
curl -X POST http://localhost:8800/url/short \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"longUrl": "https://example.com/long/url"}'
```

## 📈 Future Enhancements

- [ ] Custom short URL codes
- [ ] URL expiration dates
- [ ] Advanced analytics (geographic, device, referrer tracking)
- [ ] Rate limiting
- [ ] Bulk URL shortening
- [ ] QR code generation
- [ ] URL link validation

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Verify your `DATABASE_URL` in `.env`
- Ensure MongoDB service is running
- Check network connectivity and firewall settings

### Authentication Errors
- Verify JWT token is included in request headers
- Check if JWT_SECRET matches between login and protected endpoints
- Ensure token hasn't expired

### Server Won't Start
- Check if the specified PORT is already in use
- Verify all dependencies are installed with `npm install`
- Check console for specific error messages

## 👨‍💻 Contributing

Feel free to submit issues and enhancement requests!

---

**Last Updated**: January 2026
