# URL Shortener API

A simple URL shortener REST API built with Node.js, Express, and MongoDB.

## Features

- Shorten any long URL to a short code
- Custom short code support
- Duplicate URL detection (returns existing short URL)
- Auto expiry of URLs after 30 days (TTL)
- Redirect to original URL via short code

## Tech Stack

- **Runtime** — Node.js
- **Framework** — Express.js
- **Database** — MongoDB (Mongoose)
- **Short code generation** — nanoid

## Project Structure

```
url-shortener/
├── server.js
├── .env
├── config/
│   └── db.js
├── models/
│   └── url.models.js
├── routes/
│   └── url.routes.js
├── controllers/
│   └── url.js
└── package.json
```

## Getting Started

### Prerequisites

- Node.js installed
- MongoDB Atlas account or local MongoDB

### Installation

1. Clone the repository

```bash
git clone https://github.com/Dhruvivek/CodeAlpha_URL-Shortner
cd url-shortener
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env` file in the root directory

```env
PORT=6500
MONGO_URI=your_mongodb_connection_string
BASE_URL=http://localhost:6500
```

4. Start the server

```bash
node server.js
```

## API Endpoints

### Shorten a URL

**POST** `/api/shorten`

Request body:
```json
{
    "url": "https://www.example.com/very-long-url",
    "customCode": "mycode"
}
```

> `customCode` is optional. If not provided, a random 6 character code will be generated.

Response:
```json
{
    "message": "Url created successfully",
    "shortCode": "mycode",
    "shortUrl": "http://localhost:6500/mycode"
}
```

### Redirect to Original URL

**GET** `/:code`

Redirects the user to the original URL associated with the short code.

Example:
```
GET http://localhost:6500/mycode
→ Redirects to https://www.example.com/very-long-url
```

## Error Responses

| Status Code | Reason |
|---|---|
| 301 | Site is redirected |
| 400 | Bad request |
| 404 | Short code not found |
| 500 | Internal server error |


## Notes

- URLs automatically expire after **30 days**
- If the same URL is shortened again, the existing short URL is returned
- Custom codes must be unique

## Upcoming Features

- Frontend UI to input and shorten URLs
