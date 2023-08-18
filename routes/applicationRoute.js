const {
  createGeneralApplicationChain,
  createURLChain,
  createMinMaxLengthChain,
  handleValidationError,
} = require("../middleware/validationMiddleware");
const applicationController = require("../controllers/applicationController");

const router = require("express").Router();

router.post(
  "/build",
  [createGeneralApplicationChain(), handleValidationError],
  applicationController.sendF2SeedBuildApplication
);


router.post(
  "/scale",
  [
    createGeneralApplicationChain(),
    createURLChain("productDemo"),
    createMinMaxLengthChain("market", 5, 300),
    handleValidationError,
  ],
  applicationController.sendF2SeedScaleApplication
);


router.post(
  "/fund",
  [
    createGeneralApplicationChain(),
    createURLChain("productDemo"),
    createMinMaxLengthChain("market", 5, 300),
    createMinMaxLengthChain("funding", 10, 300),
    handleValidationError,
  ],
  applicationController.sendF2SeedFundApplication
);

module.exports = router;
