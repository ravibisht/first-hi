import {StatusCodes} from 'http-status-codes'
import HttpException from './HttpException'

export default class InternalServerException extends HttpException {
    constructor(message) {
        super(message, StatusCodes.INTERNAL_SERVER_ERROR)
    }
}
