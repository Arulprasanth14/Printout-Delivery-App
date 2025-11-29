# Document Upload API Postman Collection

This collection contains endpoints for testing the document upload API with S3 URLs and pricing calculations.

## Collection Structure

The collection includes four endpoints:
1. Printout Document Upload
2. Spiral Binding Document Upload
3. Lamination Document Upload
4. Photo Copy Document Upload

## Setup Instructions

1. **Import the Collection**
   - Open Postman
   - Click "Import" button
   - Select the `Document_Upload_API.postman_collection.json` file
   - Click "Import"

2. **Configure Environment Variables**
   - In Postman, click on "Environments" tab
   - Create a new environment (e.g., "Local Development")
   - Add the following variables:
     - `base_url`: `http://localhost:5000` (or your server URL)
     - `auth_token`: Your JWT authentication token

3. **Select Environment**
   - In the top-right corner of Postman
   - Select your created environment from the dropdown

## Testing the Endpoints

### Printout Document Upload
- **Endpoint**: `{{base_url}}/api/documents/printouts`
- **Method**: POST
- **Headers**:
  - Content-Type: application/json
  - Authorization: Bearer {{auth_token}}
- **Body**:
```json
{
    "orderId": 1,
    "size": "a4",
    "colorType": "color",
    "paperType": "glossy",
    "sideType": "single",
    "copies": 10,
    "s3Url": "https://your-bucket.s3.amazonaws.com/printout.pdf"
}
```

### Spiral Binding Document Upload
- **Endpoint**: `{{base_url}}/api/documents/spiral-bindings`
- **Method**: POST
- **Headers**:
  - Content-Type: application/json
  - Authorization: Bearer {{auth_token}}
- **Body**:
```json
{
    "orderId": 1,
    "size": "a4",
    "colorType": "color",
    "bindingType": "metal_wire",
    "sideType": "double",
    "frontPageColor": "Blue",
    "s3Url": "https://your-bucket.s3.amazonaws.com/spiral-binding.pdf"
}
```

### Lamination Document Upload
- **Endpoint**: `{{base_url}}/api/documents/laminations`
- **Method**: POST
- **Headers**:
  - Content-Type: application/json
  - Authorization: Bearer {{auth_token}}
- **Body**:
```json
{
    "orderId": 1,
    "size": "a4",
    "colorType": "color",
    "laminationType": "glossy",
    "sideType": "single",
    "thickness": "125mic",
    "specialFeatures": "UV Protection",
    "copies": 5,
    "s3Url": "https://your-bucket.s3.amazonaws.com/lamination.pdf"
}
```

### Photo Copy Document Upload
- **Endpoint**: `{{base_url}}/api/documents/photo-copies`
- **Method**: POST
- **Headers**:
  - Content-Type: application/json
  - Authorization: Bearer {{auth_token}}
- **Body**:
```json
{
    "orderId": 1,
    "size": "a4",
    "paperType": "standard",
    "sideType": "single",
    "copies": 20,
    "s3Url": "https://your-bucket.s3.amazonaws.com/photo-copy.pdf"
}
```

## Expected Responses

All endpoints will return a JSON response with:
- Document details
- Calculated price
- Success/error message

Example success response:
```json
{
    "id": 1,
    "order_id": 1,
    "size": "a4",
    "color_type": "color",
    "paper_type": "glossy",
    "side_type": "single",
    "copies": 10,
    "file_path": "https://your-bucket.s3.amazonaws.com/printout.pdf",
    "pricing_id": 1,
    "calculated_price": 150.00
}
```

## Error Handling

The API will return appropriate error messages for:
- Invalid input parameters
- Missing required fields
- Authentication failures
- Database errors
- Invalid pricing configurations

Example error response:
```json
{
    "error": "No pricing configuration found for the given parameters"
}
```

## Notes

1. Make sure your server is running before testing
2. Replace the `auth_token` with a valid JWT token
3. Update the `s3Url` with your actual S3 bucket URL
4. The `orderId` must reference an existing order in the database 