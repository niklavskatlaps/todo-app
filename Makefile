setup-backend:
	cd backend && cp .env.example .env && npm install && docker network create todo_network
setup-frontend:
	cd frontend && cp .env.example .env && npm install
run-backend:
	cd backend && docker-compose up -d
run-frontend:
	cd frontend && npm start
setup:
	make setup-backend & make setup-frontend
run:
	make run-backend && make run-frontend
