const Mailer = require("../services/mailingService");
require("dotenv").config();

const mailer = new Mailer(
  process.env.EMAIL_HOST,
  process.env.EMAIL_USERNAME,
  process.env.EMAIL_PASSWORD,
  process.env.EMAIL_SOURCE
);

exports.sendF2SeedBuildApplication = async (req, res, next) => {
  try {
    req.body.website = req.body.website ? req.body.website : "";
    req.body.others = req.body.others ? req.body.others : "";
    req.body.reference = req.body.reference ? req.body.reference : "";
    await mailer.sendEmail(
      "f2seedBuildApplication",
      req.body,
      process.env.CONTACT_EMAIL
    );
    res.status(200).json({
      status: true,
      message: "Application sent successfully",
    });
  } catch (e) {
    next(e);
  }
};

exports.sendF2SeedScaleApplication = async (req, res, next) => {
  try {
    req.body.website = req.body.website ? req.body.website : "";
    req.body.others = req.body.others ? req.body.others : "";
    req.body.reference = req.body.reference ? req.body.reference : "";
    await mailer.sendEmail(
      "f2seedScaleApplication",
      req.body,
      process.env.CONTACT_EMAIL
    );
    res.status(200).json({
      status: true,
      message: "Application sent successfully",
    });
  } catch (e) {
    next(e);
  }
};

exports.sendF2SeedFundApplication = async (req, res, next) => {
  try {
    req.body.website = req.body.website ? req.body.website : "";
    req.body.others = req.body.others ? req.body.others : "";
    req.body.reference = req.body.reference ? req.body.reference : "";
    await mailer.sendEmail(
      "f2seedFundApplication",
      req.body,
      process.env.CONTACT_EMAIL
    );
    res.status(200).json({
      status: true,
      message: "Application sent successfully",
    });
  } catch (e) {
    next(e);
  }
};
