
function sendJsonResponse(res, result, status) {
    let response = {
        message: "API was successful",
        statusCode: status,
        hits: result
    };
    res.writeHead(status, { 'content-Type': 'application/json' });
    res.end(JSON.stringify(response));
    res.end();
}

function sendJsonErrorResponse(res, id, next, errorMessage = '') {
    var err = null;
    switch (id) {
        case 2003: {
            var err = new Error('No Records found');
            err.status = id;
            err.message = errorMessage
        }
            break;
        case 2002: {
            var err = new Error('Service Failed');
            err.status = id;
            err.message = errorMessage
        }
            break;
        case 2001: {
            var err = new Error('getProximity Failed');
            err.status = id;
            err.message = errorMessage
        }
            break;
        case 1001: {
            var err = new Error('Db Query Error');
            err.status = id;
            err.message = errorMessage
        }
            break;
        default:
            err = new Error('Service Failed Due to Internal Error');
            err.status = 1000;
            err.message = errorMessage;
    }
    next(err);
}

module.exports = {
    sendJsonResponse: sendJsonResponse,
    sendJsonErrorResponse: sendJsonErrorResponse
}