# Youngmenu Backend

Youngmenu Backend is an Express-based backend for the complete restaurant management application.

## Features

- API for restaurant management
- Authentication and authorization
- CRUD operations for stores, menus, and orders

## Getting Started

### Prerequisites

- Node.js (v14.x or later)
- npm (v6.x or later) or yarn (v1.22.x or later)
- MongoDB (v4.x or later)

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/syamjayaraj/youngmenu-backend.git
   cd youngmenu-backend
   ```

2. Install dependencies

   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables
   Copy the .env.example file to .env.local:

   ```
   cp .env.example .env.local
   ```

   Create a `.env` file in the root directory and add the following:

   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   PORT=your_port
   ```

   Note: You need to create a MongoDB account and set up a cluster. Follow the instructions [here](https://codeariv.com/connect-mongodb-atlas-with-express-backend/) here to get your MONGO_URI.

### Running the Project

1. Start the server

   ```bash
   npm start
   # or
   yarn start
   ```

2. The server will be running on `http://localhost:3020` as default

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is open-source and available under the MIT License.
