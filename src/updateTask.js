const AWS = require('aws-sdk')

const updateTask = async (event) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient()

    const { id } = event.pathParameters

    const { done } = JSON.parse(event.body)

    const result = await dynamodb.update({
        TableName: 'TaskTableVic',
        Key: { id },
        UpdateExpression: 'set done = :done',
        ExpressionAttributeValues: {
            ':done': done
        },
        ReturnValues: 'ALL_NEW'
    }).promise()

    return {
        status: 200,
        body: JSON.stringify({
            message: 'Task updated successfully'
        })
    }
}

module.exports = {
    updateTask
}