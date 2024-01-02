# AUTHENTICATING VIA SAS

### Step 1: Create a New Backend Project

1. **Create a New Directory:**
   - Create a new folder on your machine for the backend service, separate from your Angular project. 
   - For example, name it `my-node-backend`.

2. **Initialize Node.js Project:**
   - Open a terminal or command prompt.
   - Navigate to your newly created folder: `cd my-node-backend`.
   - Initialize a new Node.js project by running `npm init -y`.
   - This command creates a `package.json` file with default values.

### Step 2: Install Required Packages

1. **Install Express and Azure SDK:**
   - In the same directory (`my-node-backend`), install necessary NPM packages by running:
     ```bash
     npm install express @azure/storage-blob dotenv
     ```
   - `express` is a web framework for Node.js.
   - `@azure/storage-blob` is the Azure SDK for JavaScript for interacting with Azure Blob Storage.
   - `dotenv` is a module to load environment variables from a `.env` file.

### Step 3: Set Up the Basic Server

1. **Create the Server File:**
   - In the `my-node-backend` directory, create a new file named `server.js`.

2. **Write Basic Express Server Code:**
   - Open `server.js` and add the following code:
     ```javascript
     const express = require('express');
     const app = express();
     const port = process.env.PORT || 3000;

     app.get('/', (req, res) => {
       res.send('Hello from Node.js Backend!');
     });

     app.listen(port, () => {
       console.log(`Server running on port ${port}`);
     });
     ```

### Step 4: Add Azure Blob Storage Integration

1. **Configure Azure Blob Storage SDK:**
   - In the `server.js`, add the code to integrate with Azure Blob Storage. Here's a basic template:
     ```javascript
     require('dotenv').config();
     const { BlobServiceClient } = require('@azure/storage-blob');

     // Load Azure storage configuration from environment variables
     const azureStorageConnectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;

     // Create a BlobServiceClient
     const blobServiceClient = BlobServiceClient.fromConnectionString(azureStorageConnectionString);

     // Add more routes to handle Azure Blob operations...
     ```

2. **Create Routes for Blob Operations:**
   - You'll need to add Express routes to handle various Blob operations like upload, download, list, and delete.
   - Each route will use `blobServiceClient` to interact with Azure Blob Storage.

### Step 5: Add a `.env` File for Configuration

1. **Create `.env` File:**
   - In your `my-node-backend` directory, create a `.env` file.
   - Add the Azure Blob Storage connection string (you can find this in your Azure Storage account in the Azure portal):
     ```
     AZURE_STORAGE_CONNECTION_STRING=your_connection_string_here
     ```
   - Make sure to add `.env` to your `.gitignore` file to prevent committing it to version control.

### Step 6: Running the Backend Locally

1. **Start the Server:**
   - In your terminal, run `node server.js`.
   - Your server should start, and you should see a message indicating it's running on `http://localhost:3000`.

### Step 7: Testing the Backend

1. **Test the Endpoints:**
   - Use a tool like Postman or a browser to test the `/` endpoint.
   - As you add more routes for Blob operations, test each of them to ensure they work as expected.

### Step 8: Developing Your Angular App

1. **Connect Angular to Node.js Backend:**
   - In your Angular service, make HTTP requests to your local Node.js backend.
   - Example: `httpClient.get('http://localhost:3000/list-blobs')` to list blobs.

### Step 9: Deployment

1. **Deploying to Azure:**
   - Once your backend is ready, follow the steps outlined in the previous deployment guide to deploy it to Azure.

This backend will now serve as the intermediary between your Angular frontend and Azure Blob Storage, handling all sensitive operations and credentials securely.

_____
### Deploy to Azure

To shift your Node.js backend from local development to Azure cloud production, you'll need to deploy your application to an Azure App Service. This process involves several steps, including preparing your application for deployment, creating an Azure App Service, and deploying your code. Here's how to do it:

### Step 1: Prepare Your Node.js Application

1. **Ensure Your Application is Production-Ready:**
   - Check that your application works correctly in your local environment.
   - Remove any hardcoded values or development-only settings.

2. **Add a `start` Script in `package.json`:**
   - Azure App Service uses the `start` script to start your application.
   - In your `package.json`, add a `start` script under the `scripts` section:
     ```json
     "scripts": {
       "start": "node server.js"
     }
     ```

3. **Use Environment Variables for Configuration:**
   - Ensure that all configuration settings (like connection strings) are not hardcoded but are read from environment variables.

### Step 2: Create an Azure App Service

1. **Log in to the Azure Portal:**
   - Go to the [Azure Portal](https://portal.azure.com/) and log in with your credentials.

2. **Create a New App Service:**
   - Click on "Create a resource".
   - Search for and select "Web App".
   - Click "Create".
   - Fill in the necessary details:
     - **Resource Group:** Create a new one or select an existing group.
     - **Name:** Give a unique name to your web app.
     - **Publish:** Select "Code".
     - **Runtime stack:** Choose Node.js and select the version you're using.
     - **Operating System:** Choose Linux or Windows (Linux is recommended for Node.js).
     - **Region:** Select the region closest to your users.
     - **App Service Plan:** Create a new one or select an existing plan. This determines the pricing tier.

3. **Review and Create:**
   - Review your settings and click "Create" to provision the new App Service. This process may take a few minutes.

### Step 3: Deploy Your Application to Azure

1. **Push code to Github:**
   - Install the [Azure CLI](https://docs.microsoft.com/cli/azure/install-azure-cli) if you haven't already.
   - Open a terminal and log in to Azure by running `az login`.
   - Navigate to your project directory.
   - Initialize a local Git repository if you haven't already (using `git init`).
   - Add and commit your changes (`git add .` and `git commit -m "Initial commit"`).
   - You could use Azure CLI now to push the app to Azure, but let's rather prepare in Azure the Deployment from Github
2. **Set Up Deployment in Azure Portal:**
   - Log in to the Azure Portal
   - Navigate to Your App Service you created for your Node.js application
   - Set Up Deployment with GitHub:
     - Click on "Deployment Center" in the sidebar.
     - Choose "GitHub" as your source.
     - You'll be prompted to authenticate with GitHub and grant Azure access to your repositories.
     - Once authenticated, select the appropriate GitHub repository and branch for deployment
   - Check the Deployment Status:
     - In the Deployment Center, you can monitor the status of your deployments.
     - If there's a deployment in progress, you can view logs and detailed information about the build and deployment process.

### Step 4: Configure Environment Variables in Azure

1. **Set Environment Variables:**
   - In the Azure Portal, go to your App Service.
   - Click on "Configuration" under "Settings".
   - Add new application settings (environment variables) for your configuration, like your Azure Blob Storage connection string.

### Step 5: Verify the Deployment

1. **Check the App Service URL:**
   - Once the deployment is complete, your application will be accessible via the URL provided by Azure (e.g., `https://<your-app-name>.azurewebsites.net`).
   - Visit this URL in a browser to ensure your application is running correctly.

### Step 6: Monitor and Debug

1. **Monitor Your Application:**
   - Azure provides monitoring and logging tools. Use them to keep track of your application's health and performance.
   - You can find these tools in the Azure Portal under your App Service.

2. **Set Up Alerts and Logging:**
   - Configure alerts for any critical conditions.
   - Set up logging for error tracking and diagnostics.

By following these steps, you can successfully deploy your Node.js backend application to Azure and make it available for production use. This backend can then securely communicate with your Angular frontend and handle operations with Azure Blob Storage.
