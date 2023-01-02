import express from 'express'
import { authUser, createUser, loginWithToken } from '../controllers/userController'
import { body } from 'express-validator/src/middlewares/validation-chain-builders'
import { validateRequest } from '../middlewares/validate-requests'

const router = express.Router()

router.route("/login").post(
    [
    body('email')
    .isEmail().withMessage('Email must be valid')
    ,body('password')
    .trim()
    .notEmpty()
    .withMessage('You must supply a password'),
    ],
    validateRequest,
    authUser).get(loginWithToken)

router.route("/register").post([
    body('email').isEmail()
    .withMessage("Email must be valid"),
    body('password')
    .trim()
    .isLength({min:4,max:20})
    .withMessage('Password must be between 4 and 20 characters')
],validateRequest,createUser)


export default router