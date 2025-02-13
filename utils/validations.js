const moment = require("moment/moment");
const ResponseHelpers = require("../Helper/ResponseHelper");
const {
  EMAIL_VALIDATION_REGEX,
  MOBILE_VALIDATION_REGEX,
  ACCOUNT_NO_VALIDATION_REGEX,
  IFSC_CODE_VALIDATION_REGEX,
} = require("../constants/index");
const { logger } = require("./logger");
const validationFunction = (type, value, message = "", regex = null) => {
  try {
    const validationObj = { error: 0, message: "" };
    // requireField validation
    if (type === "required") {
      if (
        value === "" ||
        value === null ||
        value === "null" ||
        value.trim().length === 0
      ) {
        validationObj.error = 1;
        validationObj.message = message;
      }
    }
    if (type === "num_required") {
      if (
        value === undefined ||
        value === null ||
        value === "0" ||
        value === ""
      ) {
        validationObj.error = 1;
        validationObj.message = message;
      }
    }
    if (type === "email") {
      if (!EMAIL_VALIDATION_REGEX.test(String(value).toLowerCase())) {
        validationObj.error = 1;
        validationObj.message = message;
      }
    }
    if (type === "mobile") {
      if (!MOBILE_VALIDATION_REGEX.test(value)) {
        validationObj.error = 1;
        validationObj.message = message;
      }
    }

    if (type === "date") {
      if (
        value == null ||
        value === "" ||
        value.trim().length === 0 ||
        moment(value, regex, true).isValid() === false
      ) {
        validationObj.error = 1;
        validationObj.message = message;
      }
    }
    if (type === "account_no") {
      if (!ACCOUNT_NO_VALIDATION_REGEX.test(value)) {
        validationObj.error = 1;
        validationObj.message = message;
      }
    }
    if (type === "ifsc_code") {
      if (!IFSC_CODE_VALIDATION_REGEX.test(value)) {
        validationObj.error = 1;
        validationObj.message = message;
      }
    }
    return ResponseHelpers.serviceToController(
      validationObj.error,
      [],
      validationObj.message
    );
  } catch (error) {
    logger.error("==========ERROR FROM Common ValidationFunction ============");
    logger.error(error);
    return ResponseHelpers.serviceToController(
      0,
      [],
      "ERROR FROM Common ValidationFunction"
    );
  }
};

const removeSpace = (data) => {
  return Object.entries(data).reduce((obj, [key, values]) => {
    const strValue = values == null ? (values = "") : values.toString();
    obj[key] = strValue.trim();
    return obj;
  }, {});
};

module.exports = { validationFunction, removeSpace };
