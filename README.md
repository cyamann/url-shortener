# URL Shortener Service

This project is a URL shortening service built with NestJS and Redis, designed to create shorter aliases for long URLs. It allows users to generate short URLs that are easier to share and manage.

## Features

- Shorten long URLs to concise links
- Redirect to original URLs using short links
- API key authentication for creating user-specific short URLs

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them:

- Node.js
- NestJS CLI
- Redis server

### Installing

A step-by-step series of examples that tell you how to get a development environment running:

1. Clone the repository:

   ```bash
   git clone https://github.com/cyamann/url-shortener

   cd url-shortener
   npm install
   2.Configure environment variables:
   ```

Copy .env.example to .env
Update the .env file with your Redis server details and API base URL

###Usage
Shorten a URL
Endpoint: /shorten
Method: POST


###Body:
{
"url": "https://example.com",
}


###Response:
{
"shortUrl": "http://localhost:3000/abcdef"
}
Redirect to Original URL
Endpoint: /:shortUrl
Method: GET
Response: Redirects to the original URL
