import User from '../model'
import { StatusCodes } from 'http-status-codes'
import path from 'path'
import BadRequestException from '../../core/exception/BadRequestException.js'

export const signUp = async (req, res) => {

    try{

        const user = await User.create(req.body)
        res.status(StatusCodes.CREATED).json({
            statusCode: StatusCodes.CREATED,
            message: 'Account Created Successfully',
            result: user,
        })

    }catch (e) {
        const  message = `${Object.values(e.errors).map( item => item.message ).join(',')}`
        res.send(`<script>alert('${message}')</script>`)

    }
}

export const login = async ( req, res) =>{

    const { username , password } = req.body

    const user = await User.findOne({username}).select('+password')

    if (!user || ! await user.validatePassword(password)) throw new  BadRequestException('Please Provide Valid Username OR Password')

    delete user.password
    req.session.user = user
    res.redirect('/')
}

export const signUpView = async (req, res) => {
    return res.sendFile('sign-up.html', { root : path.join( path.resolve('.'),'public','html')})
}

export const loginView = async (req, res) => {
    return res.sendFile('login.html', { root : path.join( path.resolve('.'),'public','html')})
}

export const logout = async (req,res) => {
    req.session.destroy();
    res.redirect('/login')

}


