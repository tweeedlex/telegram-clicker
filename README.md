# Development

### 1) Install dependencies
Sign up on https://ngrok.com/, download and install ngrok. 
Than install dependencies for both frontend and backend
```bash
cd backend
npm i
cd ../frontend
npm i
```
### 2) Fill in the `.env` files as in the `.env.example` files
### 3) Start the frontend
```bash
cd frontend
npm run dev
```
### 4) Open a new terminal and start ngrok server to enable https for frontend
```bash
cd frontend
npm run ngrok
```
### 5) Change WEB_APP_URL in the backend .env file to the ngrok https url
### 6) Start the backend
```bash
cd backend
npm run dev
```

# Production
Build command in the frontend folder (`npm run build`) 
will build the frontend into backend's public folder.
The backend will serve the frontend from there.