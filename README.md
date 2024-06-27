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
   git clone https://github.com/yourusername/youngmenu-backend.git
   cd youngmenu-backend
   ```

2. Install dependencies

   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables
   Create a `.env` file in the root directory and add the following:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```

### Running the Project

1. Start the server

   ```bash
   npm start
   # or
   yarn start
   ```

2. The server will be running on `http://localhost:5000`

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is open-source and available under the MIT License.
