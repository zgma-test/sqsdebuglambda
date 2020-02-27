let AWS = require('aws-sdk');
const sqs = new AWS.SQS();

exports.handler = async (event) => {
    debugger;
    let message = event['message'];

    try {
        console.log("Sending message \"", message, "\" to SQS");
        let data = await sqs.sendMessage({
            QueueUrl: `https://sqs.${process.env.AWS_REGION}.amazonaws.com/${process.env.SIGMA_AWS_ACC_ID}/KTestSQS`,
            MessageBody: message,
            DelaySeconds: 0
        }).promise();
        console.log("Successfully sent message");
        return data;

    } catch (err) {
        console.log("Failed to send message", err);
        throw err;
    }
};

require('slappforge-lambda-debug-proxy');