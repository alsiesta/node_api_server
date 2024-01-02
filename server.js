const express = require('express');
const cors = require('cors');

const { BlobServiceClient } = require('@azure/storage-blob');

// Load environment variables from .env file if it exists
require('dotenv').config();

const app = express();

//needed for CORS locally
app.use(cors());

const port = process.env.PORT || 3000;

// Load Azure storage configuration from environment variables
const azureStorageConnectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;


app.get('/', async (req, res) => {
    let output = `Account Name: ${blobServiceClient.accountName}<br>`;
    output += `Blob Service Client URL: ${blobServiceClient.url}<br>`;
    output += `Is it HTTPS?: ${blobServiceClient.isHttps}<br>`;

    // List all containers
    let i = 1;
    let iter = blobServiceClient.listContainers();
    for await (const container of iter) {
        output += `Container ${i++}: ${container.name}<br>`;
    }

    res.send(output);
});

// Create a BlobServiceClient
const blobServiceClient = BlobServiceClient.fromConnectionString(azureStorageConnectionString);
console.log(`Blob Service Client created - ${blobServiceClient.accountName}`);

app.get('/createContainer/:containerName', async (req, res) => {
    const containerName = req.params.containerName;
    if (!/^[-a-z0-9]{3,63}$/.test(containerName)) {
        res.status(400).send('Invalid container name');
        return;
    }
    try {
        await blobServiceClient.createContainer(containerName);
        res.send(`Container ${containerName} created`);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while creating the container');
    }
});


app.get('/deleteContainer/:containerName', async (req, res) => {
    const containerName = req.params.containerName;
    try {
        await blobServiceClient.deleteContainer(containerName);
        res.send(`Container ${containerName} deleted`);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while deleting the container');
    }
});


app.get('/listContainers', async (req, res) => {
    let containers = [];

    let iter = blobServiceClient.listContainers();
    for await (const container of iter) {
        containers.push(container.name);
    }
    res.json(containers);
});


app.get('/api/config', (req, res) => {
    res.json({
      AZURE_STORAGE_CONNECTION_STRING: process.env.AZURE_STORAGE_CONNECTION_STRING
    });
});
  


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
