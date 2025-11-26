# CRM API Mock & Explorer

A complete solution for mocking and exploring your CRM API based on OpenAPI/Swagger specification.

## 📦 What's Included

This project contains two main components:

### 1. **CrmApi** - C# Mock API Server
- ASP.NET Core Web API that serves dummy data based on swagger.json
- Intelligent data generation (names, emails, addresses, etc.)
- Handles all HTTP methods (GET, POST, PUT, DELETE)
- Supports path and query parameters
- CORS enabled for frontend communication

📁 Location: `/CrmApi`
🌐 Runs on: `http://localhost:5000`

### 2. **api-explorer** - React Frontend
- Beautiful, modern UI for exploring API endpoints
- Interactive testing interface (like Swagger UI)
- Search and filter capabilities
- Live API response viewing
- Statistics dashboard

📁 Location: `/api-explorer`
🌐 Runs on: `http://localhost:5173`

## 🚀 Quick Start

### Start the Mock API Server
```bash
cd CrmApi
dotnet run --urls=http://localhost:5000
```

### Start the React Frontend
```bash
cd api-explorer
npm run dev
```

Then open your browser to `http://localhost:5173` to explore your API!

## ✨ Features

### Mock API Server
- ✅ Automatic endpoint detection from swagger.json
- ✅ Smart dummy data generation:
  - Fields ending in "Name" → Human names
  - Email fields → Valid email addresses
  - Phone fields → Phone numbers
  - Address fields → Addresses
  - Integer fields → Random numbers
  - Date fields → Proper date formats
- ✅ Circular reference detection
- ✅ Nested object support
- ✅ Array generation (1-3 items)

### API Explorer Frontend
- ✅ Clean, modern UI with gradients
- ✅ Expandable endpoint cards  
- ✅ Method color-coding (GET/POST/PUT/DELETE)
- ✅ Search functionality
- ✅ Parameter input fields
- ✅ "Try it out" buttons
- ✅ JSON response viewer
- ✅ Statistics dashboard

## 📁 Project Structure

```
CRMUI/
├── swagger.json           # Fixed OpenAPI specification
├── CrmApi/               # C# Mock API Server
│   ├── Program.cs        # Entry point with CORS
│   ├── MockMiddleware.cs # Smart data generation
│   ├── swagger.json      # API spec (copy)
│   └── README.md         # Server documentation
│
└── api-explorer/         # React Frontend
    ├── public/
    │   └── swagger.json  # API spec (copy)
    ├── src/
    │   ├── App.jsx       # Main component
    │   └── App.css       # Styling
    └── README.md         # Frontend documentation
```

## 🎯 How It Works

1. **Swagger Spec** (`swagger.json`) defines all API endpoints and schemas
2. **Mock Server** parses the spec and generates realistic dummy data
3. **React Frontend** displays all endpoints in a beautiful interface
4. **User Interaction** - Click endpoints, enter parameters, test APIs
5. **Live Results** - See JSON responses immediately

## 🎨 Smart Data Generation Examples

| Field Type | Example Output |
|-----------|---------------|
| `clientLegalName` | "Emily Davis" |
| `firstName` | "John" |
| `emailAddress` | "john.doe@example.com" |
| `businessPhone` | "(555) 123-4567" |
| `city` | "New York" |
| `state` | "NY" |
| `amount` | 234.56 |
| `id` | 789 |

## 🔧 Technologies Used

### Backend (C#)
- ASP.NET Core 10.0
- Microsoft.OpenApi.Readers
- System.Text.Json

### Frontend (React)
- React 18
- Vite
- Vanilla CSS

## 📊 API Statistics

Your swagger.json contains **40+ endpoints** across multiple controllers:
- ClientData
- Payroll Processing
- Billing Information
- Contact Management
- And more!

## 🌐 URLs

- **Mock API**: http://localhost:5000
- **API Explorer**: http://localhost:5173
- **Example Endpoint**: http://localhost:5000/api/v1/ClientData/1

## 📝 Notes

- The original `swagger.json` had an invalid URL on line 1 - this has been fixed
- All fields treat nullable as optional (always generate sample data)
- CORS is enabled for local development
- The mock server runs independently - no database required

## 🎉 Ready to Use!

Both servers are currently running and ready for testing. Open the API Explorer at http://localhost:5173 to start exploring your API endpoints!

---

**Built with ❤️ using .NET and React**
