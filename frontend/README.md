<<<<<<< HEAD
# Nexora Application Repository  
**A full-stack application with Node.js backend and Angular frontend**  

---

## Project Structure  
The repository is organized into two main folders:  
- **`backend`**: Node.js server with REST API endpoints  
- **`frontend`**: Angular application for the user interface

---

## Getting Started  
### Backend (Node.js)  
1. Navigate to the `backend` folder:  
   ```bash  
   cd backend  
   ```  
2. Install dependencies:  
   ```bash  
   npm install  
   ```  
3. Set environment variables (create a `.env` file):  
   ```env  
   PORT=3000  
   DATABASE_URL=your_mongodb_connection_string  
   ```  
4. Start the server:  
   ```bash  
   npm start  
   ```  
   Server runs on `http://localhost:3000`  

### Frontend (Angular)  
1. Navigate to the `frontend` folder:  
   ```bash  
   cd frontend  
   ```  
2. Install dependencies:  
   ```bash  
   npm install  
   ```  
3. Start the development server:  
   ```bash  
   ng serve  
   ```  
   App runs on `http://localhost:4200`  

---

## Technologies Used  
- **Backend**: Node.js, Express.js, MongoDB [[1]]  
- **Frontend**: Angular, TypeScript, HTML/CSS [[1]]  

For more details, refer to the documentation in each folder.  
© 2025 Nexora Solutions
=======
# Frontend

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.0.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
>>>>>>> 4c57e18 (dashboard changes, added light and dark theme feature)
