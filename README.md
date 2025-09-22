# Sudoku Solver (Responsive)

This is a responsive Sudoku solver web application built with Flask (Python) on the backend and vanilla HTML/CSS/JS on the frontend.

## Run locally (recommended: VS Code)

1. Extract the ZIP.
2. (Optional) Create and activate a virtual environment:
   ```bash
   python -m venv venv
   # Windows
   venv\Scripts\activate
   # macOS / Linux
   source venv/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install -r backend/requirements.txt
   ```
4. Run the app:
   ```bash
   cd backend
   python app.py
   ```
   The app will be available at http://127.0.0.1:5000

## Run with Docker (locally)
1. Build the image:
   ```bash
   docker build -t sudoku-solver .
   ```
2. Run the container:
   ```bash
   docker run -p 5000:5000 sudoku-solver
   ```
3. Open http://127.0.0.1:5000

## Deploy on Render (Docker)
1. Push this repository to GitHub (create a new repo and push all files).
2. On Render (https://render.com) create a new **Web Service**.
3. Choose **Docker** as the environment.
4. Connect your GitHub repo and select the branch.
5. Render will detect the Dockerfile at the repo root and build it.
6. Set the port to `5000` if asked. Render sets a PORT env variable; our Dockerfile listens on 5000 by default.
7. Deploy. Render will build the Docker image and run the container.

## Notes
- Add `frontend/static/images/sudoku-bg.jpg` to customize the background (or remove the page-bg div in HTML).
- For production, consider using HTTPS, adding logging, and enabling stricter CORS rules as needed.
