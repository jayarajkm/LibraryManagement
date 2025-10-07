## Library Management API

### Run Instructions
1. Clone the repo.
2. Run `dotnet restore` in `LibraryManagementApi` folder.
3. Run `dotnet ef database update` to create/update `library.db` (SQLite).
4. Start the API with `dotnet run`.
5. Open Swagger: `http://localhost:5000/swagger` or `https://localhost:5001/swagger`.

### API Endpoints
- GET `/api/books`
- GET `/api/books/{id}`
- POST `/api/books`
- PUT `/api/books/{id}`
- DELETE `/api/books/{id}`

- GET `/api/members`
- GET `/api/members/{id}`
- POST `/api/members`
- PUT `/api/members/{id}`
- DELETE `/api/members/{id}`

### Tech Stack
- .NET 8 Web API
- Entity Framework Core with SQLite
- Swagger/OpenAPI


