# IIS Deployment Instructions for CRM API

## ✅ Application Published Successfully

The application has been published to: `d:\_DELETE_\CRMUI\CrmApi\publish`

## 📋 Prerequisites

Before deploying to IIS, ensure you have:

1. **IIS Installed** with ASP.NET Core Hosting Bundle
   - If not installed, download from: https://dotnet.microsoft.com/download/dotnet/10.0
   - Look for "Hosting Bundle" under Runtime downloads

2. **Administrator Privileges** - Required to configure IIS

## 🚀 Deployment Steps

### Option 1: Automated Setup (Recommended)

1. **Open PowerShell as Administrator**
   - Press `Win + X`
   - Select "Windows PowerShell (Admin)" or "Terminal (Admin)"

2. **Navigate to the project directory**
   ```powershell
   cd d:\_DELETE_\CRMUI\CrmApi
   ```

3. **Run the setup script**
   ```powershell
   .\setup-iis.ps1
   ```

This script will:
- Create an Application Pool named "CrmApiPool"
- Create a website named "CrmApi" on port 5000
- Set proper permissions
- Start the website

### Option 2: Manual IIS Configuration

1. Open IIS Manager (`inetmgr`)

2. **Create Application Pool:**
   - Right-click "Application Pools" → "Add Application Pool"
   - Name: `CrmApiPool`
   - .NET CLR Version: `No Managed Code`
   - Click OK

3. **Create Website:**
   - Right-click "Sites" → "Add Website"
   - Site name: `CrmApi`
   - Application pool: `CrmApiPool`
   - Physical path: `d:\_DELETE_\CRMUI\CrmApi\publish`
   - Port: `5000`
   - Click OK

4. **Set Permissions:**
   - Right-click the publish folder → Properties → Security
   - Add `IIS_IUSRS` with Full Control permissions

5. **Start the website** in IIS Manager

## 🌐 Access Your API

Once deployed, access your API at:

- **Base URL:** http://localhost:5000
- **Swagger UI:** http://localhost:5000/swagger
- **Swagger JSON:** http://localhost:5000/swagger/v1/swagger.json

## 📝 Example API Endpoints

Test these endpoints after deployment:

- `http://localhost:5000/api/v1/ClientData/1`
- `http://localhost:5000/api/v1/ClientData/123/division/numbers`
- `http://localhost:5000/api/v1/ClientData/pi-screen/1`

## 🔧 Troubleshooting

### If the site doesn't start:

1. **Check Event Viewer** (Windows Logs → Application)
2. **Check stdout logs** in `d:\_DELETE_\CRMUI\CrmApi\publish\logs`
3. **Verify ASP.NET Core Hosting Bundle** is installed
4. **Restart IIS:**
   ```powershell
   iisreset
   ```

### Port Conflict:

If port 5000 is already in use, edit the binding in IIS Manager or modify the script to use a different port.

## 📦 Files Created

- `publish/` - Published application files
- `publish/web.config` - IIS configuration
- `setup-iis.ps1` - Automated setup script
- `IIS-DEPLOYMENT.md` - This file

## 🔄 Updating the Application

To update after making changes:

1. Stop the IIS website
2. Run `dotnet publish -c Release -o ./publish` again
3. Start the IIS website

Or simply run the setup script again - it will recreate the site with the latest files.
