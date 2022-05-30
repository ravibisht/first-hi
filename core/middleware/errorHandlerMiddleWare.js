import { StatusCodes } from "http-status-codes"
import { HttpException } from "../exception"

export const errorHandlerMiddleWare = (err, req, res, next) => {

    console.log(err)

    if (err instanceof HttpException) {
        return res.status(err.statusCode).send(`<script>alert('${err.message}')</script>`)
    }


    let customError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        message: err.message || "Something went wrong."
    }

    if (err.code && err.code === 11000) {
        console.log(err.keys)
        customError.message = `Duplicate value entered for ${Object.keys(err.keyValue || "")} field please choose another value.`
        customError.statusCode = StatusCodes.BAD_REQUEST
    }

    if (err.code && err.code === 11000) {
        console.log(err.keys);
        customError.message = `Duplicate value entered for ${Object.keys(err.keyValue || "")} field please choose another value.`
        customError.statusCode = StatusCodes.BAD_REQUEST
    }

    if (err.name && err.name === 'CastError') {
        customError.message = `No item with id : ${err.value}`
        customError.statusCode = StatusCodes.NOT_FOUND
    }

    if (err.name === "ValidationError") {
        customError.message = Object.values(err.errors).map((item) => item.message).join(',')
        customError.statusCode = StatusCodes.NOT_FOUND
    }


    return res.status(customError.statusCode).send(`<script>alert('${customError.message}')</script>`)
}

export default errorHandlerMiddleWare