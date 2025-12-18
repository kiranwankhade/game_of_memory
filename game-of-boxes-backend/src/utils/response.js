export const sendResponse = ({
    res,
    status = 200,
    data = null,
    error =null,
    message = "",
}) => {
    res.status(status).json({
        data,
        error,
        status,
        message
    })
}