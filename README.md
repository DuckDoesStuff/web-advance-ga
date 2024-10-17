# Web Course Homework

## Setup Instructions

### Prerequisites

- Node.js
- Docker
- Docker Compose

### Installation

1. **Clone the repository:**

    ```sh
    git clone <repository-url>
    cd <hw-number>
    ```

2. **Install dependencies:**

    ```sh
    npm install
    ```

### Database Setup

1. **Start the MySQL database using Docker Compose:**

    ```sh
    cd mysql
    docker compose up -d
    ```

2. **Initialize the database:**

    By default the database **will not** be initialized automatically. Go to docker compose file to enable it.

    If the database docker container volume is not empty, the initialization will not run. To re-run the initialization, remove the volume by running:
    
    ```sh
    docker compose down -v
    ```

### Running the Application

1. **Install packages:**

    ```sh
    npm install
    ```

2. **Build the project (Optional):**

    ```sh
    npm run build
    ```

3. **Start the application:**

    ```sh
    npm run start
    ```

4. **Start the application in development mode:**

    ```sh
    npm run start:dev
    ```

5. **Start the application in debug mode:**

    ```sh
    npm run start:debug
    ```

### Running Tests (Not implemented yet)

1. **Run unit tests:**

    ```sh
    npm run test
    ```

2. **Run end-to-end tests:**

    ```sh
    npm run test:e2e
    ```

3. **Run tests with coverage:**

    ```sh
    npm run test:cov
    ```
### Additional Information

- The database schema and initial data are defined in [`mysql/initdb/sakila-mysql.sql`](mysql/initdb/sakila-mysql.sql).

For more details, refer to the [NestJS documentation](https://docs.nestjs.com/).