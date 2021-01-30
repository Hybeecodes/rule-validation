const Response = (message, status, data=null) => {
    return {
        message,
        status,
        data
    }
}

module.exports = {
    Response
}
