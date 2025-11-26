# API Explorer - React Frontend

A beautiful, modern React application for exploring and testing your API endpoints - similar to Swagger UI but with a custom design.

## 🎯 Features

- ✅ **Automatic Endpoint Discovery** - Loads all endpoints from swagger.json
- ✅ **Interactive Testing** - Click any endpoint to test it with custom parameters
- ✅ **Search & Filter** - Quickly find endpoints by path, method, or tag
- ✅ **Smart Parameter Inputs** - Auto-generated input fields for path and query parameters
- ✅ **Live API Responses** - See real responses from your mock API server
- ✅ **Beautiful UI** - Modern gradient design with smooth animations
- ✅ **Method Statistics** - See at-a-glance count of GET, POST, PUT, DELETE endpoints
- ✅ **Expandable Cards** - Clean, organized display of endpoint details

## 🚀 Running the App

The app is already running at `http://localhost:5173`

To start it manually:
```bash
cd api-explorer
npm run dev
```

## 📋 Prerequisites

Make sure the C# Mock API server is running:
```bash
cd ../CrmApi
dotnet run --urls=http://localhost:5000
```

## 🎨 How to Use

1. **Browse Endpoints** - Scroll through the list of all available API endpoints
2. **Search** - Use the search box to filter by path, method, or tag
3. **Expand Details** - Click any endpoint card to see parameters and details
4. **Enter Parameters** - Fill in path parameters (like `id`) or query parameters
5. **Try it Out** - Click the "▶ Try it out" button to call the API
6. **View Response** - See the JSON response with syntax highlighting

## 📁 Project Structure

```
api-explorer/
├── public/
│   └── swagger.json    # API specification
├── src/
│   ├── App.jsx         # Main component with API Explorer logic
│   ├── App.css         # Beautiful styling
│   └── main.jsx        # Entry point
└── package.json        # Dependencies
```

## 🎨 Design Features

- **Gradient Background** - Purple/blue gradient backdrop
- **Color-Coded Methods** - Each HTTP method has its own color
  - GET: Blue
  - POST: Green
  - PUT: Orange
  - DELETE: Red
- **Smooth Animations** - Expand/collapse transitions
- **Hover Effects** - Cards lift on hover
- **Responsive Design** - Works on all screen sizes

## 🔗 API Connection

The React app connects to the mock API server at `http://localhost:5000`. CORS is enabled on the C# server to allow this connection.

## 🛠️ Technologies

- **React** - UI framework
- **Vite** - Build tool and dev server
- **Vanilla CSS** - Custom styling (no frameworks)
- **Fetch API** - For making HTTP requests

## 📸 Screenshots

The app displays:
- Header with API title and statistics
- Search box for filtering
- Expandable endpoint cards with method badges
- Parameter input fields
- Try it out buttons
- JSON response viewer

## 🔥 Next Steps

All endpoints from your swagger.json are available to test. Try searching for specific endpoints or browse by method type!

Developed with ❤️ using React and modern web technologies.
