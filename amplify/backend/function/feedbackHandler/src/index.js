const AWS = require('aws-sdk');

// Initialize DynamoDB
const dynamodb = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.FEEDBACK_TABLE_NAME || 'adjuvantiq-feedback';

exports.handler = async (event) => {
    console.log('Received feedback event:', JSON.stringify(event, null, 2));
    
    try {
        // Parse the request body
        let feedbackData;
        if (event.body) {
            feedbackData = JSON.parse(event.body);
        } else {
            feedbackData = event;
        }
        
        // Add metadata
        const enrichedData = {
            ...feedbackData,
            id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            receivedAt: new Date().toISOString(),
            source: 'aws-amplify',
            userAgent: event.requestContext?.identity?.userAgent || 'unknown'
        };
        
        // Store in DynamoDB
        const params = {
            TableName: TABLE_NAME,
            Item: enrichedData
        };
        
        await dynamodb.put(params).promise();
        console.log('Feedback stored successfully:', enrichedData.id);
        
        // Return success response
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST, OPTIONS'
            },
            body: JSON.stringify({
                success: true,
                message: 'Feedback received successfully',
                id: enrichedData.id
            })
        };
        
    } catch (error) {
        console.error('Error processing feedback:', error);
        
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST, OPTIONS'
            },
            body: JSON.stringify({
                success: false,
                message: 'Error processing feedback',
                error: error.message
            })
        };
    }
};
