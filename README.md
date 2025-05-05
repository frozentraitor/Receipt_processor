A simple Node.js web service that processes receipts and calculates reward points based on specific rules.

API:
1. Generate id and save receipt in a Map
2. Retrieve receipt by id and calculate the reward points.

Prerequisites
1. Docker installed on your machine.
2. Make sure port 3000 is not being used when you run the file.

Build the Docker Image: 
docker build -t receipt-processor .

In your project directory, run:
docker run -p 3000:3000 receipt-processor

This will listen for requests on port 3000

The service will be accessible at http://localhost:3000.

API Endpoints
1. Submit a Receipt
Endpoint: POST /receipts/process

Description: Submits a receipt for processing.

Request Body:

{
  "retailer": "string",
  "purchaseDate": "YYYY-MM-DD",
  "purchaseTime": "HH:MM",
  "total": "string",
  "items": [
    {
      "shortDescription": "string",
      "price": "string"
    }
    // ... more items
  ]
}

Response:
{
  "id": "string"
}

2. Get Points for a Receipt
Endpoint: GET /receipts/{id}/points

Description: Retrieves the points awarded for a specific receipt.

Response:
{
  "points": integer
}
