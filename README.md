# Tournaments Manager

A full-stack web application built with **.NET Core API** (backend) and **Angular** (frontend).  
This README provides setup instructions for running the project locally in a development environment.

---

## Tech Stack

- **Frontend:** Angular (TypeScript, SCSS)
- **Backend:** .NET Core (C#)
- **Database:** SQL Server
- **Package Managers:** npm, NuGet
- **IDE Recommendations:** Visual Studio / Visual Studio Code

---

## Prerequisites

Before starting, make sure you have the following installed:

| Tool | Version | Download |
|------|----------|-----------|
| [.NET SDK](https://dotnet.microsoft.com/download) | 8.0 or later | ✅ |
| [Node.js](https://nodejs.org/) | 18.x or later | ✅ |
| [Angular CLI](https://angular.io/cli) | 17.x or later | ✅ |
| [SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads) or LocalDB | — | Optional for local DB |
| [Git](https://git-scm.com/downloads) | Latest | ✅ |

---

## ⚙️ Project Structure

/project-root
│
├── /ETournamentManager.App/		# Angular frontend
│   ├── src/
│   ├── package.json
│   └── angular.json
│
├── /ETournamentManager.Server/		# .NET Core Web API backend
│   ├── API/
│   ├── Core/
│   ├── Data/
│   ├── appsettings.json
│   └── Program.cs
│
└── README.md

````

---

## Environment Configuration

### 1. Backend (`API/appsettings.json`)
Make sure your API project has a valid connection string:

```json
"ConnectionStrings": {
  "DefaultConnection": "Server=(localdb)\\MSSQLLocalDB;Database=YourDbName;Trusted_Connection=True;"
}
````

### 2. Frontend (`ClientApp/src/environments/environment.ts`)

Example:

```typescript
export const environment = {
  production: false,
  apiUrl: 'https://localhost:5001/api'
};
```

---

## Run the Application Locally

### Step 1: Clone the repository

```bash
git clone https://github.com/NikolayNikolaev1/ETournamentManager.git
cd your-repo-name
```

### Step 2: Restore backend dependencies

```bash
cd ETournamentManager.Server
dotnet restore
```

### Step 3: Apply migrations (if applicable)

```bash
dotnet ef database update
```

### Step 4: Run the backend

```bash
dotnet run
```

By default, the backend should be running at:

```
https://localhost:5001
http://localhost:5000
```

### Step 5: Install and run the frontend

```bash
cd ../ETournamentManager.App
npm install
npm start
```

The Angular app should be running at:

```
http://localhost:4200
```

---

## Admin Credentials (Default)

| Role      | Username            | Password    |
| --------- | ------------------- | ----------- |
| **Admin** | `admin` | `Admin123!` |

---

## Common Issues

| Issue                         | Possible Fix                                                                       |
| ----------------------------- | ---------------------------------------------------------------------------------- |
| **CORS error**                | Ensure CORS is enabled in your API’s `Program.cs` or `Startup.cs`.                 |
| **Port conflict**             | Stop existing apps on ports `4200`, `5000`, or `5001`, or change them in settings. |
| **Invalid connection string** | Verify your DB connection string and user permissions.                             |
| **Angular build errors**      | Run `npm install` again and ensure Node.js version compatibility.                  |

---

## Features

### Tournament Manager

* Create, edit, and delete your own tournaments.
* Add or remove participants in tournaments that haven’t started yet.
* Start a tournament and automatically generate rounds.
* Select and edit winners for each round and the entire tournament.
* Search and filter tournaments by name, type, or game, with access to detailed information.
* Search and filter teams by their players, with access to detailed information.
* Edit and manage your personal profile.

---

### Participant (Player)

* Create, edit, and delete your own teams.
* Add or remove players within a team.
* Join and leave tournaments.
* Leave a team at any time.
* Search and filter tournaments by name, type, or game, with access to detailed information.
* Search and filter teams by players, with access to detailed information.
* Edit and manage your personal profile.

---

### Administrator

* Activate or deactivate user accounts.
* Create and edit available games for tournaments.
* Create, edit, delete, and start both personal and other users’ tournaments.
* Manage participants in tournaments and define winners at each stage.
* Edit teams and manage their participants.
* Search and filter tournaments by name, type, or game, with access to their details.
* Search and filter teams by players, with access to detailed information.
* Search and filter users across the platform.
* Manage the platform’s name and contact details.
* Manage the platform’s logo images.
* Customize the color theme of the platform.
* Control page access to prevent unauthorized users from viewing restricted content.
* Analyze results and statistics of teams and players from tournaments.

---

## Contributors

* **Nikolay Nikolaev** – Developer
* **Technical University Varna**
