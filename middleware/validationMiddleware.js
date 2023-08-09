const {body, validationResult} = require("express-validator");


const createNameChain = () => (
    body("fullName", "Name must be between 3 to 50 characters")
        .isString().trim().notEmpty().isLength({min: 3, max: 50}).escape()
)

const createEmailChain = () => (
    body("email", "Enter a valid email")
        .trim().isEmail().normalizeEmail()
)

const createMessageChain = () => (
    body("message", "Message must be between 3 to 300 characters")
        .isString().trim().notEmpty().isLength({min: 3, max: 300}).escape()
)


const handleValidationError = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        let validationErrors = [];
        for (const error of errors.array()) {
            validationErrors.push({ field: error?.path, message: error?.msg });
        }
        return res.status(400).json({
            status: false,
            message: "Oops, something went wrong.",
            errors: validationErrors,
        });
    }
    next()
}


module.exports = {
    createNameChain, createEmailChain, createMessageChain, handleValidationError
}