# TODO backend
Just another backend for a todo app.

## Docker local setup guide

### Prerequisites

- Make sure that ports `8080` and `5432` are free on your local machine (they can be changed in the `.env` file)
- Make sure you have docker and docker-compose installed
   - I used docker `v24.0.2` and docker-compose `v2.18.1` but I am sure it works with older versions, too

### Setup guide
1. Create a `.env` file and edit the content if needed:
    ```bash
    cp .env.example .env
    ```
2. Install dependencies on the host machine:
   ```bash
   npm install
   ```
3. Create a docker network:
    ```bash
   docker network create todo_network
    ```
4. Build and start containers (add -d flag to start the containers in a detached mode):
    ```bash
    docker-compose up
    ```
5. Observe that services are running by doing a healthcheck:
    ```
    curl --location 'http://localhost:8080/healthcheck'
    ```
