import { g as getDefaultExportFromCjs } from "./react.mjs";
import { r as requireAxios } from "./axios.mjs";
import require$$1$1 from "crypto";
var nodeify_1;
var hasRequiredNodeify;
function requireNodeify() {
  if (hasRequiredNodeify) return nodeify_1;
  hasRequiredNodeify = 1;
  var nodeify = function nodeify2(promise, cb) {
    if (!cb) {
      return promise.then(function(response) {
        return response.data;
      });
    }
    return promise.then(function(response) {
      cb(null, response.data);
    }).catch(function(error) {
      cb(error, null);
    });
  };
  nodeify_1 = nodeify;
  return nodeify_1;
}
var razorpayUtils;
var hasRequiredRazorpayUtils;
function requireRazorpayUtils() {
  if (hasRequiredRazorpayUtils) return razorpayUtils;
  hasRequiredRazorpayUtils = 1;
  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
    return typeof obj;
  } : function(obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };
  var crypto = require$$1$1;
  function getDateInSecs(date) {
    return +new Date(date) / 1e3;
  }
  function normalizeDate(date) {
    return isNumber(date) ? date : getDateInSecs(date);
  }
  function isNumber(num) {
    return !isNaN(Number(num));
  }
  function isNonNullObject(input) {
    return !!input && (typeof input === "undefined" ? "undefined" : _typeof(input)) === "object" && !Array.isArray(input);
  }
  function normalizeBoolean(bool) {
    if (bool === void 0) {
      return bool;
    }
    return bool ? 1 : 0;
  }
  function isDefined(value) {
    return typeof value !== "undefined";
  }
  function normalizeNotes() {
    var notes = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    var normalizedNotes = {};
    for (var key in notes) {
      normalizedNotes["notes[" + key + "]"] = notes[key];
    }
    return normalizedNotes;
  }
  function prettify(val) {
    return JSON.stringify(val, null, 2);
  }
  function getTestError(summary, expectedVal, gotVal) {
    return new Error("\n" + summary + "\n" + ("Expected(" + (typeof expectedVal === "undefined" ? "undefined" : _typeof(expectedVal)) + ")\n" + prettify(expectedVal) + "\n\n") + ("Got(" + (typeof gotVal === "undefined" ? "undefined" : _typeof(gotVal)) + ")\n" + prettify(gotVal)));
  }
  function validateWebhookSignature(body, signature, secret) {
    var crypto2 = require$$1$1;
    if (!isDefined(body) || !isDefined(signature) || !isDefined(secret)) {
      throw Error("Invalid Parameters: Please give request body,signature sent in X-Razorpay-Signature header and webhook secret from dashboard as parameters");
    }
    body = body.toString();
    var expectedSignature = crypto2.createHmac("sha256", secret).update(body).digest("hex");
    return expectedSignature === signature;
  }
  function validatePaymentVerification() {
    var params = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    var signature = arguments[1];
    var secret = arguments[2];
    var paymentId = params.payment_id;
    if (!secret) {
      throw new Error("secret is mandatory");
    }
    if (isDefined(params.order_id) === true) {
      var orderId = params.order_id;
      var payload = orderId + "|" + paymentId;
    } else if (isDefined(params.subscription_id) === true) {
      var subscriptionId = params.subscription_id;
      var payload = paymentId + "|" + subscriptionId;
    } else if (isDefined(params.payment_link_id) === true) {
      var paymentLinkId = params.payment_link_id;
      var paymentLinkRefId = params.payment_link_reference_id;
      var paymentLinkStatus = params.payment_link_status;
      var payload = paymentLinkId + "|" + paymentLinkRefId + "|" + paymentLinkStatus + "|" + paymentId;
    } else {
      throw new Error("Either order_id or subscription_id is mandatory");
    }
    return validateWebhookSignature(payload, signature, secret);
  }
  function generateOnboardingSignature() {
    var params = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    var secret = arguments[1];
    var jsonStr = JSON.stringify(params);
    return encrypt(jsonStr, secret);
  }
  function encrypt(dataToEncrypt, secret) {
    try {
      var keyBytes = Buffer.from(secret.slice(0, 16), "utf8");
      var iv = Buffer.alloc(12);
      keyBytes.copy(iv, 0, 0, 12);
      var cipher = crypto.createCipheriv("aes-128-gcm", keyBytes, iv);
      var encryptedData = cipher.update(dataToEncrypt, "utf8");
      encryptedData = Buffer.concat([encryptedData, cipher.final()]);
      var authTag = cipher.getAuthTag();
      var finalData = Buffer.concat([encryptedData, authTag]);
      return finalData.toString("hex");
    } catch (err) {
      throw new Error("Encryption failed: " + err.message);
    }
  }
  function isValidUrl(url) {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  }
  razorpayUtils = {
    normalizeNotes,
    normalizeDate,
    normalizeBoolean,
    isNumber,
    getDateInSecs,
    prettify,
    isDefined,
    isNonNullObject,
    getTestError,
    validateWebhookSignature,
    validatePaymentVerification,
    isValidUrl,
    generateOnboardingSignature
  };
  return razorpayUtils;
}
var api;
var hasRequiredApi;
function requireApi() {
  if (hasRequiredApi) return api;
  hasRequiredApi = 1;
  var _extends = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  var _createClass = /* @__PURE__ */ (function() {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    return function(Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  })();
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  var axios = requireAxios().default;
  var nodeify = requireNodeify();
  var _require = requireRazorpayUtils(), isNonNullObject = _require.isNonNullObject;
  var allowedHeaders = {
    "X-Razorpay-Account": "",
    "Content-Type": "application/json"
  };
  function getValidHeaders(headers) {
    var result = {};
    if (!isNonNullObject(headers)) {
      return result;
    }
    return Object.keys(headers).reduce(function(result2, headerName) {
      if (allowedHeaders.hasOwnProperty(headerName)) {
        result2[headerName] = headers[headerName];
      }
      return result2;
    }, result);
  }
  function normalizeError(err) {
    throw {
      statusCode: err.response.status,
      error: err.response.data.error
    };
  }
  var API = (function() {
    function API2(options) {
      _classCallCheck(this, API2);
      this.version = "v1";
      this.rq = axios.create(this._createConfig(options));
    }
    _createClass(API2, [{
      key: "_createConfig",
      value: function _createConfig(options) {
        var config = {
          baseURL: options.hostUrl,
          headers: Object.assign({ "User-Agent": options.ua }, getValidHeaders(options.headers))
        };
        if (options.key_id && options.key_secret) {
          config.auth = {
            username: options.key_id,
            password: options.key_secret
          };
        }
        if (options.oauthToken) {
          config.headers = _extends({
            "Authorization": "Bearer " + options.oauthToken
          }, config.headers);
        }
        return config;
      }
    }, {
      key: "getEntityUrl",
      value: function getEntityUrl(params) {
        return params.hasOwnProperty("version") ? "/" + params.version + params.url : "/" + this.version + params.url;
      }
    }, {
      key: "get",
      value: function get(params, cb) {
        return nodeify(this.rq.get(this.getEntityUrl(params), {
          params: params.data
        }).catch(normalizeError), cb);
      }
    }, {
      key: "post",
      value: function post(params, cb) {
        return nodeify(this.rq.post(this.getEntityUrl(params), params.data).catch(normalizeError), cb);
      }
      // postFormData method for file uploads.
    }, {
      key: "postFormData",
      value: function postFormData(params, cb) {
        return nodeify(this.rq.post(this.getEntityUrl(params), params.formData, {
          "headers": {
            "Content-Type": "multipart/form-data"
          }
        }).catch(normalizeError), cb);
      }
    }, {
      key: "put",
      value: function put(params, cb) {
        return nodeify(this.rq.put(this.getEntityUrl(params), params.data).catch(normalizeError), cb);
      }
    }, {
      key: "patch",
      value: function patch(params, cb) {
        return nodeify(this.rq.patch(this.getEntityUrl(params), params.data).catch(normalizeError), cb);
      }
    }, {
      key: "delete",
      value: function _delete(params, cb) {
        return nodeify(this.rq.delete(this.getEntityUrl(params)).catch(normalizeError), cb);
      }
    }]);
    return API2;
  })();
  api = API;
  return api;
}
const version = "2.9.6";
const require$$1 = {
  version
};
var accounts;
var hasRequiredAccounts;
function requireAccounts() {
  if (hasRequiredAccounts) return accounts;
  hasRequiredAccounts = 1;
  var _extends = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  function _objectWithoutProperties(obj, keys) {
    var target = {};
    for (var i in obj) {
      if (keys.indexOf(i) >= 0) continue;
      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
      target[i] = obj[i];
    }
    return target;
  }
  accounts = function(api2) {
    var BASE_URL = "/accounts";
    return {
      create: function create(params, callback) {
        return api2.post({
          version: "v2",
          url: "" + BASE_URL,
          data: params
        }, callback);
      },
      edit: function edit(accountId, params, callback) {
        return api2.patch({
          version: "v2",
          url: BASE_URL + "/" + accountId,
          data: params
        }, callback);
      },
      fetch: function fetch(accountId, callback) {
        return api2.get({
          version: "v2",
          url: BASE_URL + "/" + accountId
        }, callback);
      },
      delete: function _delete(accountId, callback) {
        return api2.delete({
          version: "v2",
          url: BASE_URL + "/" + accountId
        }, callback);
      },
      uploadAccountDoc: function uploadAccountDoc(accountId, params, callback) {
        var file = params.file, rest = _objectWithoutProperties(params, ["file"]);
        return api2.postFormData({
          version: "v2",
          url: BASE_URL + "/" + accountId + "/documents",
          formData: _extends({
            file: file.value
          }, rest)
        }, callback);
      },
      fetchAccountDoc: function fetchAccountDoc(accountId, callback) {
        return api2.get({
          version: "v2",
          url: BASE_URL + "/" + accountId + "/documents"
        }, callback);
      }
    };
  };
  return accounts;
}
var stakeholders;
var hasRequiredStakeholders;
function requireStakeholders() {
  if (hasRequiredStakeholders) return stakeholders;
  hasRequiredStakeholders = 1;
  var _extends = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  function _objectWithoutProperties(obj, keys) {
    var target = {};
    for (var i in obj) {
      if (keys.indexOf(i) >= 0) continue;
      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
      target[i] = obj[i];
    }
    return target;
  }
  stakeholders = function(api2) {
    var BASE_URL = "/accounts";
    return {
      create: function create(accountId, params, callback) {
        return api2.post({
          version: "v2",
          url: BASE_URL + "/" + accountId + "/stakeholders",
          data: params
        }, callback);
      },
      edit: function edit(accountId, stakeholderId, params, callback) {
        return api2.patch({
          version: "v2",
          url: BASE_URL + "/" + accountId + "/stakeholders/" + stakeholderId,
          data: params
        }, callback);
      },
      fetch: function fetch(accountId, stakeholderId, callback) {
        return api2.get({
          version: "v2",
          url: BASE_URL + "/" + accountId + "/stakeholders/" + stakeholderId
        }, callback);
      },
      all: function all(accountId, callback) {
        return api2.get({
          version: "v2",
          url: BASE_URL + "/" + accountId + "/stakeholders"
        }, callback);
      },
      uploadStakeholderDoc: function uploadStakeholderDoc(accountId, stakeholderId, params, callback) {
        var file = params.file, rest = _objectWithoutProperties(params, ["file"]);
        return api2.postFormData({
          version: "v2",
          url: BASE_URL + "/" + accountId + "/stakeholders/" + stakeholderId + "/documents",
          formData: _extends({
            file: file.value
          }, rest)
        }, callback);
      },
      fetchStakeholderDoc: function fetchStakeholderDoc(accountId, stakeholderId, callback) {
        return api2.get({
          version: "v2",
          url: BASE_URL + "/" + accountId + "/stakeholders/" + stakeholderId + "/documents"
        }, callback);
      }
    };
  };
  return stakeholders;
}
var payments;
var hasRequiredPayments;
function requirePayments() {
  if (hasRequiredPayments) return payments;
  hasRequiredPayments = 1;
  var _extends = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  function _objectWithoutProperties(obj, keys) {
    var target = {};
    for (var i in obj) {
      if (keys.indexOf(i) >= 0) continue;
      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
      target[i] = obj[i];
    }
    return target;
  }
  var _require = requireRazorpayUtils(), normalizeDate = _require.normalizeDate;
  var ID_REQUIRED_MSG = "`payment_id` is mandatory", BASE_URL = "/payments";
  payments = function(api2) {
    return {
      all: function all() {
        var params = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        var callback = arguments[1];
        var from = params.from, to = params.to, count = params.count, skip = params.skip;
        var expand = void 0;
        if (from) {
          from = normalizeDate(from);
        }
        if (to) {
          to = normalizeDate(to);
        }
        if (params.hasOwnProperty("expand[]")) {
          expand = { "expand[]": params["expand[]"] };
        }
        count = Number(count) || 10;
        skip = Number(skip) || 0;
        return api2.get({
          url: "" + BASE_URL,
          data: {
            from,
            to,
            count,
            skip,
            expand
          }
        }, callback);
      },
      fetch: function fetch(paymentId) {
        var params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        var callback = arguments[2];
        var expand = void 0;
        if (!paymentId) {
          throw new Error("`payment_id` is mandatory");
        }
        if (params.hasOwnProperty("expand[]")) {
          expand = { "expand[]": params["expand[]"] };
        }
        return api2.get({
          url: BASE_URL + "/" + paymentId,
          data: {
            expand
          }
        }, callback);
      },
      capture: function capture(paymentId, amount, currency, callback) {
        if (!paymentId) {
          throw new Error("`payment_id` is mandatory");
        }
        if (!amount) {
          throw new Error("`amount` is mandatory");
        }
        var payload = {
          amount
        };
        if (typeof currency === "function" && !callback) {
          callback = currency;
          currency = void 0;
        } else if (typeof currency === "string") {
          payload.currency = currency;
        }
        return api2.post({
          url: BASE_URL + "/" + paymentId + "/capture",
          data: payload
        }, callback);
      },
      createPaymentJson: function createPaymentJson(params, callback) {
        var url = BASE_URL + "/create/json", rest = _objectWithoutProperties(params, []), data = Object.assign(rest);
        return api2.post({
          url,
          data
        }, callback);
      },
      createRecurringPayment: function createRecurringPayment(params, callback) {
        return api2.post({
          url: BASE_URL + "/create/recurring",
          data: params
        }, callback);
      },
      edit: function edit(paymentId) {
        var params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        var callback = arguments[2];
        if (!paymentId) {
          throw new Error("`payment_id` is mandatory");
        }
        return api2.patch({
          url: BASE_URL + "/" + paymentId,
          data: params
        }, callback);
      },
      refund: function refund(paymentId) {
        var params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        var callback = arguments[2];
        if (!paymentId) {
          throw new Error("`payment_id` is mandatory");
        }
        return api2.post({
          url: BASE_URL + "/" + paymentId + "/refund",
          data: params
        }, callback);
      },
      fetchMultipleRefund: function fetchMultipleRefund(paymentId) {
        var params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        var callback = arguments[2];
        var from = params.from, to = params.to, count = params.count, skip = params.skip, url = BASE_URL + "/" + paymentId + "/refunds";
        return api2.get({
          url,
          data: _extends({}, params, {
            from,
            to,
            count,
            skip
          })
        }, callback);
      },
      fetchRefund: function fetchRefund(paymentId, refundId, callback) {
        if (!paymentId) {
          throw new Error("payment Id` is mandatory");
        }
        if (!refundId) {
          throw new Error("refund Id` is mandatory");
        }
        return api2.get({
          url: BASE_URL + "/" + paymentId + "/refunds/" + refundId
        }, callback);
      },
      fetchTransfer: function fetchTransfer(paymentId, callback) {
        if (!paymentId) {
          throw new Error("payment Id` is mandatory");
        }
        return api2.get({
          url: BASE_URL + "/" + paymentId + "/transfers"
        }, callback);
      },
      transfer: function transfer(paymentId) {
        var params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        var callback = arguments[2];
        if (!paymentId) {
          throw new Error("`payment_id` is mandatory");
        }
        return api2.post({
          url: BASE_URL + "/" + paymentId + "/transfers",
          data: params
        }, callback);
      },
      bankTransfer: function bankTransfer(paymentId, callback) {
        if (!paymentId) {
          return Promise.reject(ID_REQUIRED_MSG);
        }
        return api2.get({
          url: BASE_URL + "/" + paymentId + "/bank_transfer"
        }, callback);
      },
      fetchCardDetails: function fetchCardDetails(paymentId, callback) {
        if (!paymentId) {
          return Promise.reject(ID_REQUIRED_MSG);
        }
        return api2.get({
          url: BASE_URL + "/" + paymentId + "/card"
        }, callback);
      },
      fetchPaymentDowntime: function fetchPaymentDowntime(callback) {
        return api2.get({
          url: BASE_URL + "/downtimes"
        }, callback);
      },
      fetchPaymentDowntimeById: function fetchPaymentDowntimeById(downtimeId, callback) {
        if (!downtimeId) {
          return Promise.reject("Downtime Id is mandatory");
        }
        return api2.get({
          url: BASE_URL + "/downtimes/" + downtimeId
        }, callback);
      },
      otpGenerate: function otpGenerate(paymentId, callback) {
        if (!paymentId) {
          return Promise.reject("payment Id is mandatory");
        }
        return api2.post({
          url: BASE_URL + "/" + paymentId + "/otp_generate"
        }, callback);
      },
      otpSubmit: function otpSubmit(paymentId) {
        var params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        var callback = arguments[2];
        if (!paymentId) {
          return Promise.reject("payment Id is mandatory");
        }
        return api2.post({
          url: BASE_URL + "/" + paymentId + "/otp/submit",
          data: params
        }, callback);
      },
      otpResend: function otpResend(paymentId, callback) {
        if (!paymentId) {
          return Promise.reject("payment Id is mandatory");
        }
        return api2.post({
          url: BASE_URL + "/" + paymentId + "/otp/resend"
        }, callback);
      },
      createUpi: function createUpi() {
        var params = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        var callback = arguments[1];
        var url = BASE_URL + "/create/upi", rest = _objectWithoutProperties(params, []), data = Object.assign(rest);
        return api2.post({
          url,
          data
        }, callback);
      },
      validateVpa: function validateVpa() {
        var params = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        var callback = arguments[1];
        var url = BASE_URL + "/validate/vpa", rest = _objectWithoutProperties(params, []), data = Object.assign(rest);
        return api2.post({
          url,
          data
        }, callback);
      },
      fetchPaymentMethods: function fetchPaymentMethods(callback) {
        var url = "/methods";
        return api2.get({
          url
        }, callback);
      }
    };
  };
  return payments;
}
var refunds;
var hasRequiredRefunds;
function requireRefunds() {
  if (hasRequiredRefunds) return refunds;
  hasRequiredRefunds = 1;
  var _require = requireRazorpayUtils(), normalizeDate = _require.normalizeDate;
  _require.normalizeNotes;
  refunds = function(api2) {
    return {
      all: function all() {
        var params = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        var callback = arguments[1];
        var from = params.from, to = params.to, count = params.count, skip = params.skip, payment_id = params.payment_id;
        var url = "/refunds";
        if (payment_id) {
          url = "/payments/" + payment_id + "/refunds";
        }
        if (from) {
          from = normalizeDate(from);
        }
        if (to) {
          to = normalizeDate(to);
        }
        count = Number(count) || 10;
        skip = Number(skip) || 0;
        return api2.get({
          url,
          data: {
            from,
            to,
            count,
            skip
          }
        }, callback);
      },
      edit: function edit(refundId, params, callback) {
        if (!refundId) {
          throw new Error("refund Id is mandatory");
        }
        return api2.patch({
          url: "/refunds/" + refundId,
          data: params
        }, callback);
      },
      fetch: function fetch(refundId) {
        var params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        var callback = arguments[2];
        var payment_id = params.payment_id;
        if (!refundId) {
          throw new Error("`refund_id` is mandatory");
        }
        var url = "/refunds/" + refundId;
        if (payment_id) {
          url = "/payments/" + payment_id + url;
        }
        return api2.get({
          url
        }, callback);
      }
    };
  };
  return refunds;
}
var orders;
var hasRequiredOrders;
function requireOrders() {
  if (hasRequiredOrders) return orders;
  hasRequiredOrders = 1;
  var _extends = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  function _objectWithoutProperties(obj, keys) {
    var target = {};
    for (var i in obj) {
      if (keys.indexOf(i) >= 0) continue;
      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
      target[i] = obj[i];
    }
    return target;
  }
  var _require = requireRazorpayUtils(), normalizeDate = _require.normalizeDate;
  orders = function(api2) {
    return {
      all: function all() {
        var params = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        var callback = arguments[1];
        var from = params.from, to = params.to, count = params.count, skip = params.skip, authorized = params.authorized, receipt = params.receipt;
        var expand = void 0;
        if (from) {
          from = normalizeDate(from);
        }
        if (to) {
          to = normalizeDate(to);
        }
        if (params.hasOwnProperty("expand[]")) {
          expand = { "expand[]": params["expand[]"] };
        }
        count = Number(count) || 10;
        skip = Number(skip) || 0;
        authorized = authorized;
        return api2.get({
          url: "/orders",
          data: {
            from,
            to,
            count,
            skip,
            authorized,
            receipt,
            expand
          }
        }, callback);
      },
      fetch: function fetch(orderId, callback) {
        if (!orderId) {
          throw new Error("`order_id` is mandatory");
        }
        return api2.get({
          url: "/orders/" + orderId
        }, callback);
      },
      create: function create() {
        var params = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        var callback = arguments[1];
        var currency = params.currency, otherParams = _objectWithoutProperties(params, ["currency"]);
        currency = currency || "INR";
        var data = Object.assign(_extends({
          currency
        }, otherParams));
        return api2.post({
          url: "/orders",
          data
        }, callback);
      },
      edit: function edit(orderId) {
        var params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        var callback = arguments[2];
        if (!orderId) {
          throw new Error("`order_id` is mandatory");
        }
        return api2.patch({
          url: "/orders/" + orderId,
          data: params
        }, callback);
      },
      fetchPayments: function fetchPayments(orderId, callback) {
        if (!orderId) {
          throw new Error("`order_id` is mandatory");
        }
        return api2.get({
          url: "/orders/" + orderId + "/payments"
        }, callback);
      },
      fetchTransferOrder: function fetchTransferOrder(orderId, callback) {
        if (!orderId) {
          throw new Error("`order_id` is mandatory");
        }
        return api2.get({
          url: "/orders/" + orderId + "/?expand[]=transfers&status"
        }, callback);
      },
      viewRtoReview: function viewRtoReview(orderId, callback) {
        return api2.post({
          url: "/orders/" + orderId + "/rto_review"
        }, callback);
      },
      editFulfillment: function editFulfillment(orderId) {
        var param = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        return api2.post({
          url: "/orders/" + orderId + "/fulfillment",
          data: param
        });
      }
    };
  };
  return orders;
}
var customers;
var hasRequiredCustomers;
function requireCustomers() {
  if (hasRequiredCustomers) return customers;
  hasRequiredCustomers = 1;
  customers = function(api2) {
    return {
      create: function create(params, callback) {
        return api2.post({
          url: "/customers",
          data: params
        }, callback);
      },
      edit: function edit(customerId, params, callback) {
        return api2.put({
          url: "/customers/" + customerId,
          data: params
        }, callback);
      },
      fetch: function fetch(customerId, callback) {
        return api2.get({
          url: "/customers/" + customerId
        }, callback);
      },
      all: function all() {
        var params = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        var callback = arguments[1];
        var count = params.count, skip = params.skip;
        count = Number(count) || 10;
        skip = Number(skip) || 0;
        return api2.get({
          url: "/customers",
          data: {
            count,
            skip
          }
        }, callback);
      },
      fetchTokens: function fetchTokens(customerId, callback) {
        return api2.get({
          url: "/customers/" + customerId + "/tokens"
        }, callback);
      },
      fetchToken: function fetchToken(customerId, tokenId, callback) {
        return api2.get({
          url: "/customers/" + customerId + "/tokens/" + tokenId
        }, callback);
      },
      deleteToken: function deleteToken(customerId, tokenId, callback) {
        return api2.delete({
          url: "/customers/" + customerId + "/tokens/" + tokenId
        }, callback);
      },
      addBankAccount: function addBankAccount(customerId, params, callback) {
        return api2.post({
          url: "/customers/" + customerId + "/bank_account",
          data: params
        }, callback);
      },
      deleteBankAccount: function deleteBankAccount(customerId, bankId, callback) {
        return api2.delete({
          url: "/customers/" + customerId + "/bank_account/" + bankId
        }, callback);
      },
      requestEligibilityCheck: function requestEligibilityCheck(params, callback) {
        return api2.post({
          url: "/customers/eligibility",
          data: params
        }, callback);
      },
      fetchEligibility: function fetchEligibility(eligibilityId, callback) {
        return api2.get({
          url: "/customers/eligibility/" + eligibilityId
        }, callback);
      }
    };
  };
  return customers;
}
var transfers;
var hasRequiredTransfers;
function requireTransfers() {
  if (hasRequiredTransfers) return transfers;
  hasRequiredTransfers = 1;
  var _require = requireRazorpayUtils(), normalizeDate = _require.normalizeDate;
  transfers = function(api2) {
    return {
      all: function all() {
        var params = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        var callback = arguments[1];
        var from = params.from, to = params.to, count = params.count, skip = params.skip, payment_id = params.payment_id, recipient_settlement_id = params.recipient_settlement_id;
        var url = "/transfers";
        if (payment_id) {
          url = "/payments/" + payment_id + "/transfers";
        }
        if (from) {
          from = normalizeDate(from);
        }
        if (to) {
          to = normalizeDate(to);
        }
        count = Number(count) || 10;
        skip = Number(skip) || 0;
        return api2.get({
          url,
          data: {
            from,
            to,
            count,
            skip,
            recipient_settlement_id
          }
        }, callback);
      },
      fetch: function fetch(transferId) {
        var params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        var callback = arguments[2];
        params.payment_id;
        if (!transferId) {
          throw new Error("`transfer_id` is mandatory");
        }
        var url = "/transfers/" + transferId;
        return api2.get({
          url
        }, callback);
      },
      create: function create(params, callback) {
        return api2.post({
          url: "/transfers",
          data: params
        }, callback);
      },
      edit: function edit(transferId, params, callback) {
        return api2.patch({
          url: "/transfers/" + transferId,
          data: params
        }, callback);
      },
      reverse: function reverse(transferId, params, callback) {
        if (!transferId) {
          throw new Error("`transfer_id` is mandatory");
        }
        var url = "/transfers/" + transferId + "/reversals";
        return api2.post({
          url,
          data: params
        }, callback);
      },
      fetchSettlements: function fetchSettlements(callback) {
        return api2.get({
          url: "/transfers?expand[]=recipient_settlement"
        }, callback);
      }
    };
  };
  return transfers;
}
var tokens;
var hasRequiredTokens;
function requireTokens() {
  if (hasRequiredTokens) return tokens;
  hasRequiredTokens = 1;
  var _require = requireRazorpayUtils();
  _require.normalizeNotes;
  tokens = function(api2) {
    var BASE_URL = "/tokens";
    return {
      create: function create(params, callback) {
        return api2.post({
          url: "" + BASE_URL,
          data: params
        }, callback);
      },
      fetch: function fetch(params, callback) {
        return api2.post({
          url: BASE_URL + "/fetch",
          data: params
        }, callback);
      },
      delete: function _delete(params, callback) {
        return api2.post({
          url: BASE_URL + "/delete",
          data: params
        }, callback);
      },
      processPaymentOnAlternatePAorPG: function processPaymentOnAlternatePAorPG(params, callback) {
        return api2.post({
          url: BASE_URL + "/service_provider_tokens/token_transactional_data",
          data: params
        }, callback);
      }
    };
  };
  return tokens;
}
var virtualAccounts;
var hasRequiredVirtualAccounts;
function requireVirtualAccounts() {
  if (hasRequiredVirtualAccounts) return virtualAccounts;
  hasRequiredVirtualAccounts = 1;
  var _extends = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  function _objectWithoutProperties(obj, keys) {
    var target = {};
    for (var i in obj) {
      if (keys.indexOf(i) >= 0) continue;
      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
      target[i] = obj[i];
    }
    return target;
  }
  var _require = requireRazorpayUtils(), normalizeDate = _require.normalizeDate;
  _require.normalizeNotes;
  var BASE_URL = "/virtual_accounts", ID_REQUIRED_MSG = "`virtual_account_id` is mandatory";
  virtualAccounts = function(api2) {
    return {
      all: function all() {
        var params = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        var callback = arguments[1];
        var from = params.from, to = params.to, count = params.count, skip = params.skip, otherParams = _objectWithoutProperties(params, ["from", "to", "count", "skip"]);
        var url = BASE_URL;
        if (from) {
          from = normalizeDate(from);
        }
        if (to) {
          to = normalizeDate(to);
        }
        count = Number(count) || 10;
        skip = Number(skip) || 0;
        return api2.get({
          url,
          data: _extends({
            from,
            to,
            count,
            skip
          }, otherParams)
        }, callback);
      },
      fetch: function fetch(virtualAccountId, callback) {
        if (!virtualAccountId) {
          return Promise.reject(ID_REQUIRED_MSG);
        }
        var url = BASE_URL + "/" + virtualAccountId;
        return api2.get({
          url
        }, callback);
      },
      create: function create() {
        var params = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        var callback = arguments[1];
        return api2.post({
          url: BASE_URL,
          data: params
        }, callback);
      },
      close: function close(virtualAccountId, callback) {
        if (!virtualAccountId) {
          return Promise.reject(ID_REQUIRED_MSG);
        }
        return api2.post({
          url: BASE_URL + "/" + virtualAccountId + "/close"
        }, callback);
      },
      fetchPayments: function fetchPayments(virtualAccountId, callback) {
        if (!virtualAccountId) {
          return Promise.reject(ID_REQUIRED_MSG);
        }
        var url = BASE_URL + "/" + virtualAccountId + "/payments";
        return api2.get({
          url
        }, callback);
      },
      addReceiver: function addReceiver(virtualAccountId) {
        var params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        var callback = arguments[2];
        if (!virtualAccountId) {
          return Promise.reject(ID_REQUIRED_MSG);
        }
        return api2.post({
          url: BASE_URL + "/" + virtualAccountId + "/receivers",
          data: params
        }, callback);
      },
      allowedPayer: function allowedPayer(virtualAccountId) {
        var params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        var callback = arguments[2];
        if (!virtualAccountId) {
          return Promise.reject(ID_REQUIRED_MSG);
        }
        return api2.post({
          url: BASE_URL + "/" + virtualAccountId + "/allowed_payers",
          data: params
        }, callback);
      },
      deleteAllowedPayer: function deleteAllowedPayer(virtualAccountId, allowedPayerId, callback) {
        if (!virtualAccountId) {
          return Promise.reject(ID_REQUIRED_MSG);
        }
        if (!allowedPayerId) {
          return Promise.reject("allowed payer id is mandatory");
        }
        return api2.delete({
          url: BASE_URL + "/" + virtualAccountId + "/allowed_payers/" + allowedPayerId
        }, callback);
      }
    };
  };
  return virtualAccounts;
}
var invoices;
var hasRequiredInvoices;
function requireInvoices() {
  if (hasRequiredInvoices) return invoices;
  hasRequiredInvoices = 1;
  var _extends = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  var _require = requireRazorpayUtils(), normalizeDate = _require.normalizeDate;
  invoices = function invoicesApi(api2) {
    var BASE_URL = "/invoices", MISSING_ID_ERROR = "Invoice ID is mandatory";
    return {
      create: function create() {
        var params = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        var callback = arguments[1];
        var url = BASE_URL;
        return api2.post({
          url,
          data: params
        }, callback);
      },
      edit: function edit(invoiceId) {
        var params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        var callback = arguments[2];
        var url = BASE_URL + "/" + invoiceId;
        if (!invoiceId) {
          return Promise.reject("Invoice ID is mandatory");
        }
        return api2.patch({
          url,
          data: params
        }, callback);
      },
      issue: function issue(invoiceId, callback) {
        if (!invoiceId) {
          return Promise.reject(MISSING_ID_ERROR);
        }
        var url = BASE_URL + "/" + invoiceId + "/issue";
        return api2.post({
          url
        }, callback);
      },
      delete: function _delete(invoiceId, callback) {
        if (!invoiceId) {
          return Promise.reject(MISSING_ID_ERROR);
        }
        var url = BASE_URL + "/" + invoiceId;
        return api2.delete({
          url
        }, callback);
      },
      cancel: function cancel(invoiceId, callback) {
        if (!invoiceId) {
          return Promise.reject(MISSING_ID_ERROR);
        }
        var url = BASE_URL + "/" + invoiceId + "/cancel";
        return api2.post({
          url
        }, callback);
      },
      fetch: function fetch(invoiceId, callback) {
        if (!invoiceId) {
          return Promise.reject(MISSING_ID_ERROR);
        }
        var url = BASE_URL + "/" + invoiceId;
        return api2.get({
          url
        }, callback);
      },
      all: function all() {
        var params = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        var callback = arguments[1];
        var from = params.from, to = params.to, count = params.count, skip = params.skip, url = BASE_URL;
        if (from) {
          from = normalizeDate(from);
        }
        if (to) {
          to = normalizeDate(to);
        }
        count = Number(count) || 10;
        skip = Number(skip) || 0;
        return api2.get({
          url,
          data: _extends({}, params, {
            from,
            to,
            count,
            skip
          })
        }, callback);
      },
      notifyBy: function notifyBy(invoiceId, medium, callback) {
        if (!invoiceId) {
          return Promise.reject(MISSING_ID_ERROR);
        }
        if (!medium) {
          return Promise.reject("`medium` is required");
        }
        var url = BASE_URL + "/" + invoiceId + "/notify_by/" + medium;
        return api2.post({
          url
        }, callback);
      }
    };
  };
  return invoices;
}
var iins;
var hasRequiredIins;
function requireIins() {
  if (hasRequiredIins) return iins;
  hasRequiredIins = 1;
  iins = function(api2) {
    var BASE_URL = "/iins";
    return {
      fetch: function fetch(tokenIin, callback) {
        return api2.get({
          url: BASE_URL + "/" + tokenIin
        }, callback);
      },
      all: function all() {
        var params = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        var callback = arguments[1];
        return api2.get({
          url: BASE_URL + "/list",
          data: params
        }, callback);
      }
    };
  };
  return iins;
}
var paymentLink;
var hasRequiredPaymentLink;
function requirePaymentLink() {
  if (hasRequiredPaymentLink) return paymentLink;
  hasRequiredPaymentLink = 1;
  var _extends = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  var _require = requireRazorpayUtils(), normalizeDate = _require.normalizeDate;
  paymentLink = function paymentLinkApi(api2) {
    var BASE_URL = "/payment_links", MISSING_ID_ERROR = "Payment Link ID is mandatory";
    return {
      create: function create(params, callback) {
        var url = BASE_URL;
        return api2.post({
          url,
          data: params
        }, callback);
      },
      cancel: function cancel(paymentLinkId, callback) {
        if (!paymentLinkId) {
          return Promise.reject(MISSING_ID_ERROR);
        }
        var url = BASE_URL + "/" + paymentLinkId + "/cancel";
        return api2.post({
          url
        }, callback);
      },
      fetch: function fetch(paymentLinkId, callback) {
        if (!paymentLinkId) {
          return Promise.reject(MISSING_ID_ERROR);
        }
        var url = BASE_URL + "/" + paymentLinkId;
        return api2.get({
          url
        }, callback);
      },
      all: function all() {
        var params = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        var callback = arguments[1];
        var from = params.from, to = params.to, count = params.count, skip = params.skip, url = BASE_URL;
        if (from) {
          from = normalizeDate(from);
        }
        if (to) {
          to = normalizeDate(to);
        }
        count = Number(count) || 10;
        skip = Number(skip) || 0;
        return api2.get({
          url,
          data: _extends({}, params, {
            from,
            to,
            count,
            skip
          })
        }, callback);
      },
      edit: function edit(paymentLinkId, params, callback) {
        return api2.patch({
          url: BASE_URL + "/" + paymentLinkId,
          data: params
        }, callback);
      },
      notifyBy: function notifyBy(paymentLinkId, medium, callback) {
        if (!paymentLinkId) {
          return Promise.reject(MISSING_ID_ERROR);
        }
        if (!medium) {
          return Promise.reject("`medium` is required");
        }
        var url = BASE_URL + "/" + paymentLinkId + "/notify_by/" + medium;
        return api2.post({
          url
        }, callback);
      }
    };
  };
  return paymentLink;
}
var plans;
var hasRequiredPlans;
function requirePlans() {
  if (hasRequiredPlans) return plans;
  hasRequiredPlans = 1;
  var _extends = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  var _require = requireRazorpayUtils(), normalizeDate = _require.normalizeDate;
  plans = function plansApi(api2) {
    var BASE_URL = "/plans", MISSING_ID_ERROR = "Plan ID is mandatory";
    return {
      create: function create() {
        var params = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        var callback = arguments[1];
        var url = BASE_URL;
        return api2.post({
          url,
          data: params
        }, callback);
      },
      fetch: function fetch(planId, callback) {
        if (!planId) {
          return Promise.reject(MISSING_ID_ERROR);
        }
        var url = BASE_URL + "/" + planId;
        return api2.get({ url }, callback);
      },
      all: function all() {
        var params = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        var callback = arguments[1];
        var from = params.from, to = params.to, count = params.count, skip = params.skip, url = BASE_URL;
        if (from) {
          from = normalizeDate(from);
        }
        if (to) {
          to = normalizeDate(to);
        }
        count = Number(count) || 10;
        skip = Number(skip) || 0;
        return api2.get({
          url,
          data: _extends({}, params, {
            from,
            to,
            count,
            skip
          })
        }, callback);
      }
    };
  };
  return plans;
}
var products;
var hasRequiredProducts;
function requireProducts() {
  if (hasRequiredProducts) return products;
  hasRequiredProducts = 1;
  products = function(api2) {
    var BASE_URL = "/accounts";
    return {
      requestProductConfiguration: function requestProductConfiguration(accountId, params, callback) {
        return api2.post({
          version: "v2",
          url: BASE_URL + "/" + accountId + "/products",
          data: params
        }, callback);
      },
      edit: function edit(accountId, productId, params, callback) {
        return api2.patch({
          version: "v2",
          url: BASE_URL + "/" + accountId + "/products/" + productId,
          data: params
        }, callback);
      },
      fetch: function fetch(accountId, productId, callback) {
        return api2.get({
          version: "v2",
          url: BASE_URL + "/" + accountId + "/products/" + productId
        }, callback);
      },
      fetchTnc: function fetchTnc(productName, callback) {
        return api2.get({
          version: "v2",
          url: "/products/" + productName + "/tnc"
        }, callback);
      }
    };
  };
  return products;
}
var subscriptions;
var hasRequiredSubscriptions;
function requireSubscriptions() {
  if (hasRequiredSubscriptions) return subscriptions;
  hasRequiredSubscriptions = 1;
  var _extends = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  var _require = requireRazorpayUtils(), normalizeDate = _require.normalizeDate;
  subscriptions = function subscriptionsApi(api2) {
    var BASE_URL = "/subscriptions", MISSING_ID_ERROR = "Subscription ID is mandatory";
    return {
      create: function create() {
        var params = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        var callback = arguments[1];
        var url = BASE_URL;
        return api2.post({
          url,
          data: params
        }, callback);
      },
      fetch: function fetch(subscriptionId, callback) {
        if (!subscriptionId) {
          return Promise.reject(MISSING_ID_ERROR);
        }
        var url = BASE_URL + "/" + subscriptionId;
        return api2.get({ url }, callback);
      },
      update: function update(subscriptionId, params, callback) {
        var url = BASE_URL + "/" + subscriptionId;
        if (!subscriptionId) {
          return Promise.reject(MISSING_ID_ERROR);
        }
        return api2.patch({
          url,
          data: params
        }, callback);
      },
      pendingUpdate: function pendingUpdate(subscriptionId, callback) {
        var url = BASE_URL + "/" + subscriptionId + "/retrieve_scheduled_changes";
        if (!subscriptionId) {
          return Promise.reject(MISSING_ID_ERROR);
        }
        return api2.get({ url }, callback);
      },
      cancelScheduledChanges: function cancelScheduledChanges(subscriptionId, callback) {
        var url = BASE_URL + "/" + subscriptionId + "/cancel_scheduled_changes";
        if (!subscriptionId) {
          return Promise.reject("Subscription Id is mandatory");
        }
        return api2.post({
          url
        }, callback);
      },
      pause: function pause(subscriptionId) {
        var params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        var callback = arguments[2];
        var url = BASE_URL + "/" + subscriptionId + "/pause";
        if (!subscriptionId) {
          return Promise.reject("Subscription Id is mandatory");
        }
        return api2.post({
          url,
          data: params
        }, callback);
      },
      resume: function resume(subscriptionId) {
        var params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        var callback = arguments[2];
        var url = BASE_URL + "/" + subscriptionId + "/resume";
        if (!subscriptionId) {
          return Promise.reject("Subscription Id is mandatory");
        }
        return api2.post({
          url,
          data: params
        }, callback);
      },
      deleteOffer: function deleteOffer(subscriptionId, offerId, callback) {
        var url = BASE_URL + "/" + subscriptionId + "/" + offerId;
        if (!subscriptionId) {
          return Promise.reject("Subscription Id is mandatory");
        }
        return api2.delete({
          url
        }, callback);
      },
      all: function all() {
        var params = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        var callback = arguments[1];
        var from = params.from, to = params.to, count = params.count, skip = params.skip, url = BASE_URL;
        if (from) {
          from = normalizeDate(from);
        }
        if (to) {
          to = normalizeDate(to);
        }
        count = Number(count) || 10;
        skip = Number(skip) || 0;
        return api2.get({
          url,
          data: _extends({}, params, {
            from,
            to,
            count,
            skip
          })
        }, callback);
      },
      cancel: function cancel(subscriptionId) {
        var cancelAtCycleEnd = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
        var callback = arguments[2];
        var url = BASE_URL + "/" + subscriptionId + "/cancel";
        if (!subscriptionId) {
          return Promise.reject(MISSING_ID_ERROR);
        }
        return api2.post(_extends({
          url
        }, cancelAtCycleEnd && { data: { cancel_at_cycle_end: 1 } }), callback);
      },
      createAddon: function createAddon(subscriptionId, params, callback) {
        var url = BASE_URL + "/" + subscriptionId + "/addons";
        if (!subscriptionId) {
          return Promise.reject(MISSING_ID_ERROR);
        }
        return api2.post({
          url,
          data: _extends({}, params)
        }, callback);
      },
      createRegistrationLink: function createRegistrationLink() {
        var params = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        var callback = arguments[1];
        return api2.post({
          url: "/subscription_registration/auth_links",
          data: params
        }, callback);
      }
    };
  };
  return subscriptions;
}
var addons;
var hasRequiredAddons;
function requireAddons() {
  if (hasRequiredAddons) return addons;
  hasRequiredAddons = 1;
  var _extends = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  var _require = requireRazorpayUtils(), normalizeDate = _require.normalizeDate;
  addons = function(api2) {
    var BASE_URL = "/addons", MISSING_ID_ERROR = "Addon ID is mandatory";
    return {
      fetch: function fetch(addonId, callback) {
        if (!addonId) {
          return Promise.reject(MISSING_ID_ERROR);
        }
        var url = BASE_URL + "/" + addonId;
        return api2.get({
          url
        }, callback);
      },
      delete: function _delete(addonId, callback) {
        if (!addonId) {
          return Promise.reject(MISSING_ID_ERROR);
        }
        var url = BASE_URL + "/" + addonId;
        return api2.delete({
          url
        }, callback);
      },
      all: function all() {
        var params = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        var callback = arguments[1];
        var from = params.from, to = params.to, count = params.count, skip = params.skip, url = BASE_URL;
        if (from) {
          from = normalizeDate(from);
        }
        if (to) {
          to = normalizeDate(to);
        }
        count = Number(count) || 10;
        skip = Number(skip) || 0;
        return api2.get({
          url,
          data: _extends({}, params, {
            from,
            to,
            count,
            skip
          })
        }, callback);
      }
    };
  };
  return addons;
}
var settlements;
var hasRequiredSettlements;
function requireSettlements() {
  if (hasRequiredSettlements) return settlements;
  hasRequiredSettlements = 1;
  var _extends = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  settlements = function(api2) {
    var BASE_URL = "/settlements";
    return {
      createOndemandSettlement: function createOndemandSettlement() {
        var params = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        var callback = arguments[1];
        var url = BASE_URL + "/ondemand";
        return api2.post({
          url,
          data: params
        }, callback);
      },
      all: function all() {
        var params = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        var callback = arguments[1];
        var from = params.from, to = params.to, count = params.count, skip = params.skip, url = BASE_URL;
        return api2.get({
          url,
          data: _extends({}, params, {
            from,
            to,
            count,
            skip
          })
        }, callback);
      },
      fetch: function fetch(settlementId, callback) {
        if (!settlementId) {
          return Promise.reject("settlement Id is mandatroy");
        }
        return api2.get({
          url: BASE_URL + "/" + settlementId
        }, callback);
      },
      fetchOndemandSettlementById: function fetchOndemandSettlementById(settlementId) {
        var param = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        var callback = arguments[2];
        var expand = void 0;
        if (!settlementId) {
          return Promise.reject("settlment Id is mandatroy");
        }
        if (param.hasOwnProperty("expand[]")) {
          expand = { "expand[]": param["expand[]"] };
        }
        return api2.get({
          url: BASE_URL + "/ondemand/" + settlementId,
          data: {
            expand
          }
        }, callback);
      },
      fetchAllOndemandSettlement: function fetchAllOndemandSettlement() {
        var params = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        var callback = arguments[1];
        var expand = void 0;
        var from = params.from, to = params.to, count = params.count, skip = params.skip, url = BASE_URL + "/ondemand";
        if (params.hasOwnProperty("expand[]")) {
          expand = { "expand[]": params["expand[]"] };
        }
        return api2.get({
          url,
          data: _extends({}, params, {
            from,
            to,
            count,
            skip,
            expand
          })
        }, callback);
      },
      reports: function reports() {
        var params = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        var callback = arguments[1];
        var day = params.day, count = params.count, skip = params.skip, url = BASE_URL + "/recon/combined";
        return api2.get({
          url,
          data: _extends({}, params, {
            day,
            count,
            skip
          })
        }, callback);
      }
    };
  };
  return settlements;
}
var qrCode;
var hasRequiredQrCode;
function requireQrCode() {
  if (hasRequiredQrCode) return qrCode;
  hasRequiredQrCode = 1;
  var _extends = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  qrCode = function(api2) {
    var BASE_URL = "/payments/qr_codes";
    return {
      create: function create() {
        var params = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        var callback = arguments[1];
        var url = BASE_URL;
        return api2.post({
          url,
          data: params
        }, callback);
      },
      all: function all() {
        var params = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        var callback = arguments[1];
        var from = params.from, to = params.to, count = params.count, skip = params.skip, url = BASE_URL;
        return api2.get({
          url,
          data: _extends({}, params, {
            from,
            to,
            count,
            skip
          })
        }, callback);
      },
      fetchAllPayments: function fetchAllPayments(qrCodeId) {
        var params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        var callback = arguments[2];
        var from = params.from, to = params.to, count = params.count, skip = params.skip, url = BASE_URL + "/" + qrCodeId + "/payments";
        return api2.get({
          url,
          data: _extends({}, params, {
            from,
            to,
            count,
            skip
          })
        }, callback);
      },
      fetch: function fetch(qrCodeId, callback) {
        if (!qrCodeId) {
          return Promise.reject("qrCode Id is mandatroy");
        }
        return api2.get({
          url: BASE_URL + "/" + qrCodeId
        }, callback);
      },
      close: function close(qrCodeId, callback) {
        if (!qrCodeId) {
          return Promise.reject("qrCode Id is mandatroy");
        }
        var url = BASE_URL + "/" + qrCodeId + "/close";
        return api2.post({
          url
        }, callback);
      }
    };
  };
  return qrCode;
}
var fundAccount;
var hasRequiredFundAccount;
function requireFundAccount() {
  if (hasRequiredFundAccount) return fundAccount;
  hasRequiredFundAccount = 1;
  var _extends = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  fundAccount = function(api2) {
    return {
      create: function create(params, callback) {
        return api2.post({
          url: "/fund_accounts",
          data: _extends({}, params)
        }, callback);
      },
      fetch: function fetch(customerId, callback) {
        if (!customerId) {
          return Promise.reject("Customer Id is mandatroy");
        }
        return api2.get({
          url: "/fund_accounts?customer_id=" + customerId
        }, callback);
      }
    };
  };
  return fundAccount;
}
var items;
var hasRequiredItems;
function requireItems() {
  if (hasRequiredItems) return items;
  hasRequiredItems = 1;
  var _extends = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  function _objectWithoutProperties(obj, keys) {
    var target = {};
    for (var i in obj) {
      if (keys.indexOf(i) >= 0) continue;
      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
      target[i] = obj[i];
    }
    return target;
  }
  var _require = requireRazorpayUtils(), normalizeDate = _require.normalizeDate;
  items = function(api2) {
    return {
      all: function all() {
        var params = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        var callback = arguments[1];
        var from = params.from, to = params.to, count = params.count, skip = params.skip, authorized = params.authorized, receipt = params.receipt;
        if (from) {
          from = normalizeDate(from);
        }
        if (to) {
          to = normalizeDate(to);
        }
        count = Number(count) || 10;
        skip = Number(skip) || 0;
        return api2.get({
          url: "/items",
          data: {
            from,
            to,
            count,
            skip,
            authorized,
            receipt
          }
        }, callback);
      },
      fetch: function fetch(itemId, callback) {
        if (!itemId) {
          throw new Error("`item_id` is mandatory");
        }
        return api2.get({
          url: "/items/" + itemId
        }, callback);
      },
      create: function create() {
        var params = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        var callback = arguments[1];
        var amount = params.amount, currency = params.currency, rest = _objectWithoutProperties(params, ["amount", "currency"]);
        currency = currency || "INR";
        if (!amount) {
          throw new Error("`amount` is mandatory");
        }
        var data = Object.assign(_extends({
          currency,
          amount
        }, rest));
        return api2.post({
          url: "/items",
          data
        }, callback);
      },
      edit: function edit(itemId) {
        var params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        var callback = arguments[2];
        if (!itemId) {
          throw new Error("`item_id` is mandatory");
        }
        var url = "/items/" + itemId;
        return api2.patch({
          url,
          data: params
        }, callback);
      },
      delete: function _delete(itemId, callback) {
        if (!itemId) {
          throw new Error("`item_id` is mandatory");
        }
        return api2.delete({
          url: "/items/" + itemId
        }, callback);
      }
    };
  };
  return items;
}
var cards;
var hasRequiredCards;
function requireCards() {
  if (hasRequiredCards) return cards;
  hasRequiredCards = 1;
  cards = function(api2) {
    return {
      fetch: function fetch(itemId, callback) {
        if (!itemId) {
          throw new Error("`card_id` is mandatory");
        }
        return api2.get({
          url: "/cards/" + itemId
        }, callback);
      },
      requestCardReference: function requestCardReference(params, callback) {
        return api2.post({
          url: "/cards/fingerprints",
          data: params
        }, callback);
      }
    };
  };
  return cards;
}
var webhooks;
var hasRequiredWebhooks;
function requireWebhooks() {
  if (hasRequiredWebhooks) return webhooks;
  hasRequiredWebhooks = 1;
  var _extends = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  var _require = requireRazorpayUtils(), normalizeDate = _require.normalizeDate;
  webhooks = function(api2) {
    var BASE_URL = "/accounts";
    return {
      create: function create(params, accountId, callback) {
        var payload = { url: "/webhooks", data: params };
        if (accountId) {
          payload = {
            version: "v2",
            url: BASE_URL + "/" + accountId + "/webhooks",
            data: params
          };
        }
        return api2.post(payload, callback);
      },
      edit: function edit(params, webhookId, accountId, callback) {
        if (accountId && webhookId) {
          return api2.patch({
            version: "v2",
            url: BASE_URL + "/" + accountId + "/webhooks/" + webhookId,
            data: params
          }, callback);
        }
        return api2.put({
          url: "/webhooks/" + webhookId,
          data: params
        }, callback);
      },
      all: function all() {
        var params = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        var accountId = arguments[1];
        var callback = arguments[2];
        var from = params.from, to = params.to, count = params.count, skip = params.skip;
        if (from) {
          from = normalizeDate(from);
        }
        if (to) {
          to = normalizeDate(to);
        }
        count = Number(count) || 10;
        skip = Number(skip) || 0;
        var data = _extends({}, params, { from, to, count, skip });
        if (accountId) {
          return api2.get({
            version: "v2",
            url: BASE_URL + "/" + accountId + "/webhooks/",
            data
          }, callback);
        }
        return api2.get({
          url: "/webhooks",
          data
        }, callback);
      },
      fetch: function fetch(webhookId, accountId, callback) {
        return api2.get({
          version: "v2",
          url: BASE_URL + "/" + accountId + "/webhooks/" + webhookId
        }, callback);
      },
      delete: function _delete(webhookId, accountId, callback) {
        return api2.delete({
          version: "v2",
          url: BASE_URL + "/" + accountId + "/webhooks/" + webhookId
        }, callback);
      }
    };
  };
  return webhooks;
}
var documents;
var hasRequiredDocuments;
function requireDocuments() {
  if (hasRequiredDocuments) return documents;
  hasRequiredDocuments = 1;
  var _extends = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  function _objectWithoutProperties(obj, keys) {
    var target = {};
    for (var i in obj) {
      if (keys.indexOf(i) >= 0) continue;
      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
      target[i] = obj[i];
    }
    return target;
  }
  documents = function(api2) {
    var BASE_URL = "/documents";
    return {
      create: function create(params, callback) {
        var file = params.file, rest = _objectWithoutProperties(params, ["file"]);
        return api2.postFormData({
          url: "" + BASE_URL,
          formData: _extends({
            file: file.value
          }, rest)
        }, callback);
      },
      fetch: function fetch(documentId, callback) {
        return api2.get({
          url: BASE_URL + "/" + documentId
        }, callback);
      }
    };
  };
  return documents;
}
var disputes;
var hasRequiredDisputes;
function requireDisputes() {
  if (hasRequiredDisputes) return disputes;
  hasRequiredDisputes = 1;
  disputes = function(api2) {
    var BASE_URL = "/disputes";
    return {
      fetch: function fetch(disputeId, callback) {
        return api2.get({
          url: BASE_URL + "/" + disputeId
        }, callback);
      },
      all: function all() {
        var params = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        var callback = arguments[1];
        var count = params.count, skip = params.skip;
        count = Number(count) || 10;
        skip = Number(skip) || 0;
        return api2.get({
          url: "" + BASE_URL,
          data: {
            count,
            skip
          }
        }, callback);
      },
      accept: function accept(disputeId, callback) {
        return api2.post({
          url: BASE_URL + "/" + disputeId + "/accept"
        }, callback);
      },
      contest: function contest(disputeId, param, callback) {
        return api2.patch({
          url: BASE_URL + "/" + disputeId + "/contest",
          data: param
        }, callback);
      }
    };
  };
  return disputes;
}
var razorpay;
var hasRequiredRazorpay;
function requireRazorpay() {
  if (hasRequiredRazorpay) return razorpay;
  hasRequiredRazorpay = 1;
  var _createClass = /* @__PURE__ */ (function() {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    return function(Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  })();
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  var API = requireApi();
  var pkg = require$$1;
  var _require = requireRazorpayUtils(), _validateWebhookSignature = _require.validateWebhookSignature;
  var Razorpay2 = (function() {
    _createClass(Razorpay3, null, [{
      key: "validateWebhookSignature",
      value: function validateWebhookSignature() {
        return _validateWebhookSignature.apply(void 0, arguments);
      }
    }]);
    function Razorpay3() {
      var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      _classCallCheck(this, Razorpay3);
      var key_id = options.key_id, key_secret = options.key_secret, oauthToken = options.oauthToken, headers = options.headers;
      if (!key_id && !oauthToken) {
        throw new Error("`key_id` or `oauthToken` is mandatory");
      }
      this.key_id = key_id;
      this.key_secret = key_secret;
      this.oauthToken = oauthToken;
      this.api = new API({
        hostUrl: "https://api.razorpay.com",
        ua: "razorpay-node@" + Razorpay3.VERSION,
        key_id,
        key_secret,
        headers,
        oauthToken
      });
      this.addResources();
    }
    _createClass(Razorpay3, [{
      key: "addResources",
      value: function addResources() {
        Object.assign(this, {
          accounts: requireAccounts()(this.api),
          stakeholders: requireStakeholders()(this.api),
          payments: requirePayments()(this.api),
          refunds: requireRefunds()(this.api),
          orders: requireOrders()(this.api),
          customers: requireCustomers()(this.api),
          transfers: requireTransfers()(this.api),
          tokens: requireTokens()(this.api),
          virtualAccounts: requireVirtualAccounts()(this.api),
          invoices: requireInvoices()(this.api),
          iins: requireIins()(this.api),
          paymentLink: requirePaymentLink()(this.api),
          plans: requirePlans()(this.api),
          products: requireProducts()(this.api),
          subscriptions: requireSubscriptions()(this.api),
          addons: requireAddons()(this.api),
          settlements: requireSettlements()(this.api),
          qrCode: requireQrCode()(this.api),
          fundAccount: requireFundAccount()(this.api),
          items: requireItems()(this.api),
          cards: requireCards()(this.api),
          webhooks: requireWebhooks()(this.api),
          documents: requireDocuments()(this.api),
          disputes: requireDisputes()(this.api)
        });
      }
    }]);
    return Razorpay3;
  })();
  Razorpay2.VERSION = pkg.version;
  razorpay = Razorpay2;
  return razorpay;
}
var razorpayExports = requireRazorpay();
const Razorpay = /* @__PURE__ */ getDefaultExportFromCjs(razorpayExports);
export {
  Razorpay as R
};
