const {sendFeedback} = require("../controllers/feedbackController");
const {createNameChain, createMessageChain, createEmailChain,handleValidationError} = require("../middleware/validationMiddleware");
const router = require("express").Router()

router.post(
    "/",
    [
        createNameChain(),
        createEmailChain(),
        createMessageChain(),
        handleValidationError
    ],
    sendFeedback
)


module.exports = router;