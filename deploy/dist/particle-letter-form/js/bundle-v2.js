/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/axios/index.js":
/*!*************************************!*\
  !*** ./node_modules/axios/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./lib/axios */ "./node_modules/axios/lib/axios.js");

/***/ }),

/***/ "./node_modules/axios/lib/adapters/xhr.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/adapters/xhr.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var settle = __webpack_require__(/*! ./../core/settle */ "./node_modules/axios/lib/core/settle.js");
var buildURL = __webpack_require__(/*! ./../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var parseHeaders = __webpack_require__(/*! ./../helpers/parseHeaders */ "./node_modules/axios/lib/helpers/parseHeaders.js");
var isURLSameOrigin = __webpack_require__(/*! ./../helpers/isURLSameOrigin */ "./node_modules/axios/lib/helpers/isURLSameOrigin.js");
var createError = __webpack_require__(/*! ../core/createError */ "./node_modules/axios/lib/core/createError.js");

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request.onreadystatechange = function handleLoad() {
      if (!request || request.readyState !== 4) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(/*! ./../helpers/cookies */ "./node_modules/axios/lib/helpers/cookies.js");

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
          cookies.read(config.xsrfCookieName) :
          undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (config.withCredentials) {
      request.withCredentials = true;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/axios.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/axios.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");
var Axios = __webpack_require__(/*! ./core/Axios */ "./node_modules/axios/lib/core/Axios.js");
var defaults = __webpack_require__(/*! ./defaults */ "./node_modules/axios/lib/defaults.js");

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(utils.merge(defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(/*! ./cancel/Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");
axios.CancelToken = __webpack_require__(/*! ./cancel/CancelToken */ "./node_modules/axios/lib/cancel/CancelToken.js");
axios.isCancel = __webpack_require__(/*! ./cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(/*! ./helpers/spread */ "./node_modules/axios/lib/helpers/spread.js");

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/Cancel.js":
/*!*************************************************!*\
  !*** ./node_modules/axios/lib/cancel/Cancel.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/CancelToken.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CancelToken.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(/*! ./Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/isCancel.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/cancel/isCancel.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/Axios.js":
/*!**********************************************!*\
  !*** ./node_modules/axios/lib/core/Axios.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defaults = __webpack_require__(/*! ./../defaults */ "./node_modules/axios/lib/defaults.js");
var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var InterceptorManager = __webpack_require__(/*! ./InterceptorManager */ "./node_modules/axios/lib/core/InterceptorManager.js");
var dispatchRequest = __webpack_require__(/*! ./dispatchRequest */ "./node_modules/axios/lib/core/dispatchRequest.js");

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = utils.merge({
      url: arguments[0]
    }, arguments[1]);
  }

  config = utils.merge(defaults, {method: 'get'}, this.defaults, config);
  config.method = config.method.toLowerCase();

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),

/***/ "./node_modules/axios/lib/core/InterceptorManager.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/core/InterceptorManager.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),

/***/ "./node_modules/axios/lib/core/createError.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/createError.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(/*! ./enhanceError */ "./node_modules/axios/lib/core/enhanceError.js");

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/dispatchRequest.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/core/dispatchRequest.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var transformData = __webpack_require__(/*! ./transformData */ "./node_modules/axios/lib/core/transformData.js");
var isCancel = __webpack_require__(/*! ../cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");
var defaults = __webpack_require__(/*! ../defaults */ "./node_modules/axios/lib/defaults.js");
var isAbsoluteURL = __webpack_require__(/*! ./../helpers/isAbsoluteURL */ "./node_modules/axios/lib/helpers/isAbsoluteURL.js");
var combineURLs = __webpack_require__(/*! ./../helpers/combineURLs */ "./node_modules/axios/lib/helpers/combineURLs.js");

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Support baseURL config
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/core/enhanceError.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/core/enhanceError.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }
  error.request = request;
  error.response = response;
  return error;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/settle.js":
/*!***********************************************!*\
  !*** ./node_modules/axios/lib/core/settle.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(/*! ./createError */ "./node_modules/axios/lib/core/createError.js");

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  // Note: status is not exposed by XDomainRequest
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),

/***/ "./node_modules/axios/lib/core/transformData.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/transformData.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),

/***/ "./node_modules/axios/lib/defaults.js":
/*!********************************************!*\
  !*** ./node_modules/axios/lib/defaults.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var normalizeHeaderName = __webpack_require__(/*! ./helpers/normalizeHeaderName */ "./node_modules/axios/lib/helpers/normalizeHeaderName.js");

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(/*! ./adapters/xhr */ "./node_modules/axios/lib/adapters/xhr.js");
  } else if (typeof process !== 'undefined') {
    // For node use HTTP adapter
    adapter = __webpack_require__(/*! ./adapters/http */ "./node_modules/axios/lib/adapters/xhr.js");
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/axios/lib/helpers/bind.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/bind.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/buildURL.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/buildURL.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/combineURLs.js":
/*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/combineURLs.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/cookies.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/helpers/cookies.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
  (function standardBrowserEnv() {
    return {
      write: function write(name, value, expires, path, domain, secure) {
        var cookie = [];
        cookie.push(name + '=' + encodeURIComponent(value));

        if (utils.isNumber(expires)) {
          cookie.push('expires=' + new Date(expires).toGMTString());
        }

        if (utils.isString(path)) {
          cookie.push('path=' + path);
        }

        if (utils.isString(domain)) {
          cookie.push('domain=' + domain);
        }

        if (secure === true) {
          cookie.push('secure');
        }

        document.cookie = cookie.join('; ');
      },

      read: function read(name) {
        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
        return (match ? decodeURIComponent(match[3]) : null);
      },

      remove: function remove(name) {
        this.write(name, '', Date.now() - 86400000);
      }
    };
  })() :

  // Non standard browser env (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return {
      write: function write() {},
      read: function read() { return null; },
      remove: function remove() {}
    };
  })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAbsoluteURL.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isURLSameOrigin.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  (function standardBrowserEnv() {
    var msie = /(msie|trident)/i.test(navigator.userAgent);
    var urlParsingNode = document.createElement('a');
    var originURL;

    /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
    function resolveURL(url) {
      var href = url;

      if (msie) {
        // IE needs attribute set twice to normalize properties
        urlParsingNode.setAttribute('href', href);
        href = urlParsingNode.href;
      }

      urlParsingNode.setAttribute('href', href);

      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
                  urlParsingNode.pathname :
                  '/' + urlParsingNode.pathname
      };
    }

    originURL = resolveURL(window.location.href);

    /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
    return function isURLSameOrigin(requestURL) {
      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
      return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
    };
  })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
      return true;
    };
  })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/normalizeHeaderName.js":
/*!***************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/normalizeHeaderName.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/parseHeaders.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseHeaders.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/spread.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/helpers/spread.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/utils.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/utils.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");
var isBuffer = __webpack_require__(/*! is-buffer */ "./node_modules/is-buffer/index.js");

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim
};


/***/ }),

/***/ "./node_modules/delegated-events/dist/index.esm.js":
/*!*********************************************************!*\
  !*** ./node_modules/delegated-events/dist/index.esm.js ***!
  \*********************************************************/
/*! exports provided: on, off, fire */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "on", function() { return on; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "off", function() { return off; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fire", function() { return fire; });
/* harmony import */ var selector_set__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! selector-set */ "./node_modules/selector-set/selector-set.next.js");


var bubbleEvents = {};
var captureEvents = {};
var propagationStopped = new WeakMap();
var immediatePropagationStopped = new WeakMap();
var currentTargets = new WeakMap();
var currentTargetDesc = Object.getOwnPropertyDescriptor(Event.prototype, 'currentTarget');

function before(subject, verb, fn) {
  var source = subject[verb];
  subject[verb] = function () {
    fn.apply(subject, arguments);
    return source.apply(subject, arguments);
  };
  return subject;
}

function matches(selectors, target, reverse) {
  var queue = [];
  var node = target;

  do {
    if (node.nodeType !== 1) break;
    var _matches = selectors.matches(node);
    if (_matches.length) {
      var matched = { node: node, observers: _matches };
      if (reverse) {
        queue.unshift(matched);
      } else {
        queue.push(matched);
      }
    }
  } while (node = node.parentElement);

  return queue;
}

function trackPropagation() {
  propagationStopped.set(this, true);
}

function trackImmediate() {
  propagationStopped.set(this, true);
  immediatePropagationStopped.set(this, true);
}

function getCurrentTarget() {
  return currentTargets.get(this) || null;
}

function defineCurrentTarget(event, getter) {
  if (!currentTargetDesc) return;

  Object.defineProperty(event, 'currentTarget', {
    configurable: true,
    enumerable: true,
    get: getter || currentTargetDesc.get
  });
}

function dispatch(event) {
  var events = event.eventPhase === 1 ? captureEvents : bubbleEvents;

  var selectors = events[event.type];
  if (!selectors) return;

  var queue = matches(selectors, event.target, event.eventPhase === 1);
  if (!queue.length) return;

  before(event, 'stopPropagation', trackPropagation);
  before(event, 'stopImmediatePropagation', trackImmediate);
  defineCurrentTarget(event, getCurrentTarget);

  for (var i = 0, len1 = queue.length; i < len1; i++) {
    if (propagationStopped.get(event)) break;
    var matched = queue[i];
    currentTargets.set(event, matched.node);

    for (var j = 0, len2 = matched.observers.length; j < len2; j++) {
      if (immediatePropagationStopped.get(event)) break;
      matched.observers[j].data.call(matched.node, event);
    }
  }

  currentTargets.delete(event);
  defineCurrentTarget(event);
}

function on(name, selector, fn) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  var capture = options.capture ? true : false;
  var events = capture ? captureEvents : bubbleEvents;

  var selectors = events[name];
  if (!selectors) {
    selectors = new selector_set__WEBPACK_IMPORTED_MODULE_0__["default"]();
    events[name] = selectors;
    document.addEventListener(name, dispatch, capture);
  }
  selectors.add(selector, fn);
}

function off(name, selector, fn) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  var capture = options.capture ? true : false;
  var events = capture ? captureEvents : bubbleEvents;

  var selectors = events[name];
  if (!selectors) return;
  selectors.remove(selector, fn);

  if (selectors.size) return;
  delete events[name];
  document.removeEventListener(name, dispatch, capture);
}

function fire(target, name, detail) {
  return target.dispatchEvent(new CustomEvent(name, {
    bubbles: true,
    cancelable: true,
    detail: detail
  }));
}




/***/ }),

/***/ "./node_modules/fastdom/fastdom.js":
/*!*****************************************!*\
  !*** ./node_modules/fastdom/fastdom.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;!(function(win) {

/**
 * FastDom
 *
 * Eliminates layout thrashing
 * by batching DOM read/write
 * interactions.
 *
 * @author Wilson Page <wilsonpage@me.com>
 * @author Kornel Lesinski <kornel.lesinski@ft.com>
 */

'use strict';

/**
 * Mini logger
 *
 * @return {Function}
 */
var debug = 0 ? undefined : function() {};

/**
 * Normalized rAF
 *
 * @type {Function}
 */
var raf = win.requestAnimationFrame
  || win.webkitRequestAnimationFrame
  || win.mozRequestAnimationFrame
  || win.msRequestAnimationFrame
  || function(cb) { return setTimeout(cb, 16); };

/**
 * Initialize a `FastDom`.
 *
 * @constructor
 */
function FastDom() {
  var self = this;
  self.reads = [];
  self.writes = [];
  self.raf = raf.bind(win); // test hook
  debug('initialized', self);
}

FastDom.prototype = {
  constructor: FastDom,

  /**
   * Adds a job to the read batch and
   * schedules a new frame if need be.
   *
   * @param  {Function} fn
   * @param  {Object} ctx the context to be bound to `fn` (optional).
   * @public
   */
  measure: function(fn, ctx) {
    debug('measure');
    var task = !ctx ? fn : fn.bind(ctx);
    this.reads.push(task);
    scheduleFlush(this);
    return task;
  },

  /**
   * Adds a job to the
   * write batch and schedules
   * a new frame if need be.
   *
   * @param  {Function} fn
   * @param  {Object} ctx the context to be bound to `fn` (optional).
   * @public
   */
  mutate: function(fn, ctx) {
    debug('mutate');
    var task = !ctx ? fn : fn.bind(ctx);
    this.writes.push(task);
    scheduleFlush(this);
    return task;
  },

  /**
   * Clears a scheduled 'read' or 'write' task.
   *
   * @param {Object} task
   * @return {Boolean} success
   * @public
   */
  clear: function(task) {
    debug('clear', task);
    return remove(this.reads, task) || remove(this.writes, task);
  },

  /**
   * Extend this FastDom with some
   * custom functionality.
   *
   * Because fastdom must *always* be a
   * singleton, we're actually extending
   * the fastdom instance. This means tasks
   * scheduled by an extension still enter
   * fastdom's global task queue.
   *
   * The 'super' instance can be accessed
   * from `this.fastdom`.
   *
   * @example
   *
   * var myFastdom = fastdom.extend({
   *   initialize: function() {
   *     // runs on creation
   *   },
   *
   *   // override a method
   *   measure: function(fn) {
   *     // do extra stuff ...
   *
   *     // then call the original
   *     return this.fastdom.measure(fn);
   *   },
   *
   *   ...
   * });
   *
   * @param  {Object} props  properties to mixin
   * @return {FastDom}
   */
  extend: function(props) {
    debug('extend', props);
    if (typeof props != 'object') throw new Error('expected object');

    var child = Object.create(this);
    mixin(child, props);
    child.fastdom = this;

    // run optional creation hook
    if (child.initialize) child.initialize();

    return child;
  },

  // override this with a function
  // to prevent Errors in console
  // when tasks throw
  catch: null
};

/**
 * Schedules a new read/write
 * batch if one isn't pending.
 *
 * @private
 */
function scheduleFlush(fastdom) {
  if (!fastdom.scheduled) {
    fastdom.scheduled = true;
    fastdom.raf(flush.bind(null, fastdom));
    debug('flush scheduled');
  }
}

/**
 * Runs queued `read` and `write` tasks.
 *
 * Errors are caught and thrown by default.
 * If a `.catch` function has been defined
 * it is called instead.
 *
 * @private
 */
function flush(fastdom) {
  debug('flush');

  var writes = fastdom.writes;
  var reads = fastdom.reads;
  var error;

  try {
    debug('flushing reads', reads.length);
    runTasks(reads);
    debug('flushing writes', writes.length);
    runTasks(writes);
  } catch (e) { error = e; }

  fastdom.scheduled = false;

  // If the batch errored we may still have tasks queued
  if (reads.length || writes.length) scheduleFlush(fastdom);

  if (error) {
    debug('task errored', error.message);
    if (fastdom.catch) fastdom.catch(error);
    else throw error;
  }
}

/**
 * We run this inside a try catch
 * so that if any jobs error, we
 * are able to recover and continue
 * to flush the batch until it's empty.
 *
 * @private
 */
function runTasks(tasks) {
  debug('run tasks');
  var task; while (task = tasks.shift()) task();
}

/**
 * Remove an item from an Array.
 *
 * @param  {Array} array
 * @param  {*} item
 * @return {Boolean}
 */
function remove(array, item) {
  var index = array.indexOf(item);
  return !!~index && !!array.splice(index, 1);
}

/**
 * Mixin own properties of source
 * object into the target.
 *
 * @param  {Object} target
 * @param  {Object} source
 */
function mixin(target, source) {
  for (var key in source) {
    if (source.hasOwnProperty(key)) target[key] = source[key];
  }
}

// There should never be more than
// one instance of `FastDom` in an app
var exports = win.fastdom = (win.fastdom || new FastDom()); // jshint ignore:line

// Expose to CJS & AMD
if (true) !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() { return exports; }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
else {}

})( typeof window !== 'undefined' ? window : this);


/***/ }),

/***/ "./node_modules/inversify/lib/annotation/decorator_utils.js":
/*!******************************************************************!*\
  !*** ./node_modules/inversify/lib/annotation/decorator_utils.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ERROR_MSGS = __webpack_require__(/*! ../constants/error_msgs */ "./node_modules/inversify/lib/constants/error_msgs.js");
var METADATA_KEY = __webpack_require__(/*! ../constants/metadata_keys */ "./node_modules/inversify/lib/constants/metadata_keys.js");
function tagParameter(annotationTarget, propertyName, parameterIndex, metadata) {
    var metadataKey = METADATA_KEY.TAGGED;
    _tagParameterOrProperty(metadataKey, annotationTarget, propertyName, metadata, parameterIndex);
}
exports.tagParameter = tagParameter;
function tagProperty(annotationTarget, propertyName, metadata) {
    var metadataKey = METADATA_KEY.TAGGED_PROP;
    _tagParameterOrProperty(metadataKey, annotationTarget.constructor, propertyName, metadata);
}
exports.tagProperty = tagProperty;
function _tagParameterOrProperty(metadataKey, annotationTarget, propertyName, metadata, parameterIndex) {
    var paramsOrPropertiesMetadata = {};
    var isParameterDecorator = (typeof parameterIndex === "number");
    var key = (parameterIndex !== undefined && isParameterDecorator) ? parameterIndex.toString() : propertyName;
    if (isParameterDecorator && propertyName !== undefined) {
        throw new Error(ERROR_MSGS.INVALID_DECORATOR_OPERATION);
    }
    if (Reflect.hasOwnMetadata(metadataKey, annotationTarget)) {
        paramsOrPropertiesMetadata = Reflect.getMetadata(metadataKey, annotationTarget);
    }
    var paramOrPropertyMetadata = paramsOrPropertiesMetadata[key];
    if (!Array.isArray(paramOrPropertyMetadata)) {
        paramOrPropertyMetadata = [];
    }
    else {
        for (var _i = 0, paramOrPropertyMetadata_1 = paramOrPropertyMetadata; _i < paramOrPropertyMetadata_1.length; _i++) {
            var m = paramOrPropertyMetadata_1[_i];
            if (m.key === metadata.key) {
                throw new Error(ERROR_MSGS.DUPLICATED_METADATA + " " + m.key.toString());
            }
        }
    }
    paramOrPropertyMetadata.push(metadata);
    paramsOrPropertiesMetadata[key] = paramOrPropertyMetadata;
    Reflect.defineMetadata(metadataKey, paramsOrPropertiesMetadata, annotationTarget);
}
function _decorate(decorators, target) {
    Reflect.decorate(decorators, target);
}
function _param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); };
}
function decorate(decorator, target, parameterIndex) {
    if (typeof parameterIndex === "number") {
        _decorate([_param(parameterIndex, decorator)], target);
    }
    else if (typeof parameterIndex === "string") {
        Reflect.decorate([decorator], target, parameterIndex);
    }
    else {
        _decorate([decorator], target);
    }
}
exports.decorate = decorate;


/***/ }),

/***/ "./node_modules/inversify/lib/annotation/inject.js":
/*!*********************************************************!*\
  !*** ./node_modules/inversify/lib/annotation/inject.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var error_msgs_1 = __webpack_require__(/*! ../constants/error_msgs */ "./node_modules/inversify/lib/constants/error_msgs.js");
var METADATA_KEY = __webpack_require__(/*! ../constants/metadata_keys */ "./node_modules/inversify/lib/constants/metadata_keys.js");
var metadata_1 = __webpack_require__(/*! ../planning/metadata */ "./node_modules/inversify/lib/planning/metadata.js");
var decorator_utils_1 = __webpack_require__(/*! ./decorator_utils */ "./node_modules/inversify/lib/annotation/decorator_utils.js");
var LazyServiceIdentifer = (function () {
    function LazyServiceIdentifer(cb) {
        this._cb = cb;
    }
    LazyServiceIdentifer.prototype.unwrap = function () {
        return this._cb();
    };
    return LazyServiceIdentifer;
}());
exports.LazyServiceIdentifer = LazyServiceIdentifer;
function inject(serviceIdentifier) {
    return function (target, targetKey, index) {
        if (serviceIdentifier === undefined) {
            throw new Error(error_msgs_1.UNDEFINED_INJECT_ANNOTATION(target.name));
        }
        var metadata = new metadata_1.Metadata(METADATA_KEY.INJECT_TAG, serviceIdentifier);
        if (typeof index === "number") {
            decorator_utils_1.tagParameter(target, targetKey, index, metadata);
        }
        else {
            decorator_utils_1.tagProperty(target, targetKey, metadata);
        }
    };
}
exports.inject = inject;


/***/ }),

/***/ "./node_modules/inversify/lib/annotation/injectable.js":
/*!*************************************************************!*\
  !*** ./node_modules/inversify/lib/annotation/injectable.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ERRORS_MSGS = __webpack_require__(/*! ../constants/error_msgs */ "./node_modules/inversify/lib/constants/error_msgs.js");
var METADATA_KEY = __webpack_require__(/*! ../constants/metadata_keys */ "./node_modules/inversify/lib/constants/metadata_keys.js");
function injectable() {
    return function (target) {
        if (Reflect.hasOwnMetadata(METADATA_KEY.PARAM_TYPES, target)) {
            throw new Error(ERRORS_MSGS.DUPLICATED_INJECTABLE_DECORATOR);
        }
        var types = Reflect.getMetadata(METADATA_KEY.DESIGN_PARAM_TYPES, target) || [];
        Reflect.defineMetadata(METADATA_KEY.PARAM_TYPES, types, target);
        return target;
    };
}
exports.injectable = injectable;


/***/ }),

/***/ "./node_modules/inversify/lib/annotation/multi_inject.js":
/*!***************************************************************!*\
  !*** ./node_modules/inversify/lib/annotation/multi_inject.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var METADATA_KEY = __webpack_require__(/*! ../constants/metadata_keys */ "./node_modules/inversify/lib/constants/metadata_keys.js");
var metadata_1 = __webpack_require__(/*! ../planning/metadata */ "./node_modules/inversify/lib/planning/metadata.js");
var decorator_utils_1 = __webpack_require__(/*! ./decorator_utils */ "./node_modules/inversify/lib/annotation/decorator_utils.js");
function multiInject(serviceIdentifier) {
    return function (target, targetKey, index) {
        var metadata = new metadata_1.Metadata(METADATA_KEY.MULTI_INJECT_TAG, serviceIdentifier);
        if (typeof index === "number") {
            decorator_utils_1.tagParameter(target, targetKey, index, metadata);
        }
        else {
            decorator_utils_1.tagProperty(target, targetKey, metadata);
        }
    };
}
exports.multiInject = multiInject;


/***/ }),

/***/ "./node_modules/inversify/lib/annotation/named.js":
/*!********************************************************!*\
  !*** ./node_modules/inversify/lib/annotation/named.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var METADATA_KEY = __webpack_require__(/*! ../constants/metadata_keys */ "./node_modules/inversify/lib/constants/metadata_keys.js");
var metadata_1 = __webpack_require__(/*! ../planning/metadata */ "./node_modules/inversify/lib/planning/metadata.js");
var decorator_utils_1 = __webpack_require__(/*! ./decorator_utils */ "./node_modules/inversify/lib/annotation/decorator_utils.js");
function named(name) {
    return function (target, targetKey, index) {
        var metadata = new metadata_1.Metadata(METADATA_KEY.NAMED_TAG, name);
        if (typeof index === "number") {
            decorator_utils_1.tagParameter(target, targetKey, index, metadata);
        }
        else {
            decorator_utils_1.tagProperty(target, targetKey, metadata);
        }
    };
}
exports.named = named;


/***/ }),

/***/ "./node_modules/inversify/lib/annotation/optional.js":
/*!***********************************************************!*\
  !*** ./node_modules/inversify/lib/annotation/optional.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var METADATA_KEY = __webpack_require__(/*! ../constants/metadata_keys */ "./node_modules/inversify/lib/constants/metadata_keys.js");
var metadata_1 = __webpack_require__(/*! ../planning/metadata */ "./node_modules/inversify/lib/planning/metadata.js");
var decorator_utils_1 = __webpack_require__(/*! ./decorator_utils */ "./node_modules/inversify/lib/annotation/decorator_utils.js");
function optional() {
    return function (target, targetKey, index) {
        var metadata = new metadata_1.Metadata(METADATA_KEY.OPTIONAL_TAG, true);
        if (typeof index === "number") {
            decorator_utils_1.tagParameter(target, targetKey, index, metadata);
        }
        else {
            decorator_utils_1.tagProperty(target, targetKey, metadata);
        }
    };
}
exports.optional = optional;


/***/ }),

/***/ "./node_modules/inversify/lib/annotation/post_construct.js":
/*!*****************************************************************!*\
  !*** ./node_modules/inversify/lib/annotation/post_construct.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ERRORS_MSGS = __webpack_require__(/*! ../constants/error_msgs */ "./node_modules/inversify/lib/constants/error_msgs.js");
var METADATA_KEY = __webpack_require__(/*! ../constants/metadata_keys */ "./node_modules/inversify/lib/constants/metadata_keys.js");
var metadata_1 = __webpack_require__(/*! ../planning/metadata */ "./node_modules/inversify/lib/planning/metadata.js");
function postConstruct() {
    return function (target, propertyKey, descriptor) {
        var metadata = new metadata_1.Metadata(METADATA_KEY.POST_CONSTRUCT, propertyKey);
        if (Reflect.hasOwnMetadata(METADATA_KEY.POST_CONSTRUCT, target.constructor)) {
            throw new Error(ERRORS_MSGS.MULTIPLE_POST_CONSTRUCT_METHODS);
        }
        Reflect.defineMetadata(METADATA_KEY.POST_CONSTRUCT, metadata, target.constructor);
    };
}
exports.postConstruct = postConstruct;


/***/ }),

/***/ "./node_modules/inversify/lib/annotation/tagged.js":
/*!*********************************************************!*\
  !*** ./node_modules/inversify/lib/annotation/tagged.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var metadata_1 = __webpack_require__(/*! ../planning/metadata */ "./node_modules/inversify/lib/planning/metadata.js");
var decorator_utils_1 = __webpack_require__(/*! ./decorator_utils */ "./node_modules/inversify/lib/annotation/decorator_utils.js");
function tagged(metadataKey, metadataValue) {
    return function (target, targetKey, index) {
        var metadata = new metadata_1.Metadata(metadataKey, metadataValue);
        if (typeof index === "number") {
            decorator_utils_1.tagParameter(target, targetKey, index, metadata);
        }
        else {
            decorator_utils_1.tagProperty(target, targetKey, metadata);
        }
    };
}
exports.tagged = tagged;


/***/ }),

/***/ "./node_modules/inversify/lib/annotation/target_name.js":
/*!**************************************************************!*\
  !*** ./node_modules/inversify/lib/annotation/target_name.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var METADATA_KEY = __webpack_require__(/*! ../constants/metadata_keys */ "./node_modules/inversify/lib/constants/metadata_keys.js");
var metadata_1 = __webpack_require__(/*! ../planning/metadata */ "./node_modules/inversify/lib/planning/metadata.js");
var decorator_utils_1 = __webpack_require__(/*! ./decorator_utils */ "./node_modules/inversify/lib/annotation/decorator_utils.js");
function targetName(name) {
    return function (target, targetKey, index) {
        var metadata = new metadata_1.Metadata(METADATA_KEY.NAME_TAG, name);
        decorator_utils_1.tagParameter(target, targetKey, index, metadata);
    };
}
exports.targetName = targetName;


/***/ }),

/***/ "./node_modules/inversify/lib/annotation/unmanaged.js":
/*!************************************************************!*\
  !*** ./node_modules/inversify/lib/annotation/unmanaged.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var METADATA_KEY = __webpack_require__(/*! ../constants/metadata_keys */ "./node_modules/inversify/lib/constants/metadata_keys.js");
var metadata_1 = __webpack_require__(/*! ../planning/metadata */ "./node_modules/inversify/lib/planning/metadata.js");
var decorator_utils_1 = __webpack_require__(/*! ./decorator_utils */ "./node_modules/inversify/lib/annotation/decorator_utils.js");
function unmanaged() {
    return function (target, targetKey, index) {
        var metadata = new metadata_1.Metadata(METADATA_KEY.UNMANAGED_TAG, true);
        decorator_utils_1.tagParameter(target, targetKey, index, metadata);
    };
}
exports.unmanaged = unmanaged;


/***/ }),

/***/ "./node_modules/inversify/lib/bindings/binding.js":
/*!********************************************************!*\
  !*** ./node_modules/inversify/lib/bindings/binding.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var literal_types_1 = __webpack_require__(/*! ../constants/literal_types */ "./node_modules/inversify/lib/constants/literal_types.js");
var id_1 = __webpack_require__(/*! ../utils/id */ "./node_modules/inversify/lib/utils/id.js");
var Binding = (function () {
    function Binding(serviceIdentifier, scope) {
        this.id = id_1.id();
        this.activated = false;
        this.serviceIdentifier = serviceIdentifier;
        this.scope = scope;
        this.type = literal_types_1.BindingTypeEnum.Invalid;
        this.constraint = function (request) { return true; };
        this.implementationType = null;
        this.cache = null;
        this.factory = null;
        this.provider = null;
        this.onActivation = null;
        this.dynamicValue = null;
    }
    Binding.prototype.clone = function () {
        var clone = new Binding(this.serviceIdentifier, this.scope);
        clone.activated = false;
        clone.implementationType = this.implementationType;
        clone.dynamicValue = this.dynamicValue;
        clone.scope = this.scope;
        clone.type = this.type;
        clone.factory = this.factory;
        clone.provider = this.provider;
        clone.constraint = this.constraint;
        clone.onActivation = this.onActivation;
        clone.cache = this.cache;
        return clone;
    };
    return Binding;
}());
exports.Binding = Binding;


/***/ }),

/***/ "./node_modules/inversify/lib/bindings/binding_count.js":
/*!**************************************************************!*\
  !*** ./node_modules/inversify/lib/bindings/binding_count.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var BindingCount = {
    MultipleBindingsAvailable: 2,
    NoBindingsAvailable: 0,
    OnlyOneBindingAvailable: 1
};
exports.BindingCount = BindingCount;


/***/ }),

/***/ "./node_modules/inversify/lib/constants/error_msgs.js":
/*!************************************************************!*\
  !*** ./node_modules/inversify/lib/constants/error_msgs.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.DUPLICATED_INJECTABLE_DECORATOR = "Cannot apply @injectable decorator multiple times.";
exports.DUPLICATED_METADATA = "Metadata key was used more than once in a parameter:";
exports.NULL_ARGUMENT = "NULL argument";
exports.KEY_NOT_FOUND = "Key Not Found";
exports.AMBIGUOUS_MATCH = "Ambiguous match found for serviceIdentifier:";
exports.CANNOT_UNBIND = "Could not unbind serviceIdentifier:";
exports.NOT_REGISTERED = "No matching bindings found for serviceIdentifier:";
exports.MISSING_INJECTABLE_ANNOTATION = "Missing required @injectable annotation in:";
exports.MISSING_INJECT_ANNOTATION = "Missing required @inject or @multiInject annotation in:";
exports.UNDEFINED_INJECT_ANNOTATION = function (name) {
    return "@inject called with undefined this could mean that the class " + name + " has " +
        "a circular dependency problem. You can use a LazyServiceIdentifer to  " +
        "overcome this limitation.";
};
exports.CIRCULAR_DEPENDENCY = "Circular dependency found:";
exports.NOT_IMPLEMENTED = "Sorry, this feature is not fully implemented yet.";
exports.INVALID_BINDING_TYPE = "Invalid binding type:";
exports.NO_MORE_SNAPSHOTS_AVAILABLE = "No snapshot available to restore.";
exports.INVALID_MIDDLEWARE_RETURN = "Invalid return type in middleware. Middleware must return!";
exports.INVALID_FUNCTION_BINDING = "Value provided to function binding must be a function!";
exports.INVALID_TO_SELF_VALUE = "The toSelf function can only be applied when a constructor is " +
    "used as service identifier";
exports.INVALID_DECORATOR_OPERATION = "The @inject @multiInject @tagged and @named decorators " +
    "must be applied to the parameters of a class constructor or a class property.";
exports.ARGUMENTS_LENGTH_MISMATCH = function () {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    return "The number of constructor arguments in the derived class " +
        (values[0] + " must be >= than the number of constructor arguments of its base class.");
};
exports.CONTAINER_OPTIONS_MUST_BE_AN_OBJECT = "Invalid Container constructor argument. Container options " +
    "must be an object.";
exports.CONTAINER_OPTIONS_INVALID_DEFAULT_SCOPE = "Invalid Container option. Default scope must " +
    "be a string ('singleton' or 'transient').";
exports.CONTAINER_OPTIONS_INVALID_AUTO_BIND_INJECTABLE = "Invalid Container option. Auto bind injectable must " +
    "be a boolean";
exports.CONTAINER_OPTIONS_INVALID_SKIP_BASE_CHECK = "Invalid Container option. Skip base check must " +
    "be a boolean";
exports.MULTIPLE_POST_CONSTRUCT_METHODS = "Cannot apply @postConstruct decorator multiple times in the same class";
exports.POST_CONSTRUCT_ERROR = function () {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    return "@postConstruct error in class " + values[0] + ": " + values[1];
};
exports.CIRCULAR_DEPENDENCY_IN_FACTORY = function () {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    return "It looks like there is a circular dependency " +
        ("in one of the '" + values[0] + "' bindings. Please investigate bindings with") +
        ("service identifier '" + values[1] + "'.");
};
exports.STACK_OVERFLOW = "Maximum call stack size exceeded";


/***/ }),

/***/ "./node_modules/inversify/lib/constants/literal_types.js":
/*!***************************************************************!*\
  !*** ./node_modules/inversify/lib/constants/literal_types.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var BindingScopeEnum = {
    Request: "Request",
    Singleton: "Singleton",
    Transient: "Transient"
};
exports.BindingScopeEnum = BindingScopeEnum;
var BindingTypeEnum = {
    ConstantValue: "ConstantValue",
    Constructor: "Constructor",
    DynamicValue: "DynamicValue",
    Factory: "Factory",
    Function: "Function",
    Instance: "Instance",
    Invalid: "Invalid",
    Provider: "Provider"
};
exports.BindingTypeEnum = BindingTypeEnum;
var TargetTypeEnum = {
    ClassProperty: "ClassProperty",
    ConstructorArgument: "ConstructorArgument",
    Variable: "Variable"
};
exports.TargetTypeEnum = TargetTypeEnum;


/***/ }),

/***/ "./node_modules/inversify/lib/constants/metadata_keys.js":
/*!***************************************************************!*\
  !*** ./node_modules/inversify/lib/constants/metadata_keys.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.NAMED_TAG = "named";
exports.NAME_TAG = "name";
exports.UNMANAGED_TAG = "unmanaged";
exports.OPTIONAL_TAG = "optional";
exports.INJECT_TAG = "inject";
exports.MULTI_INJECT_TAG = "multi_inject";
exports.TAGGED = "inversify:tagged";
exports.TAGGED_PROP = "inversify:tagged_props";
exports.PARAM_TYPES = "inversify:paramtypes";
exports.DESIGN_PARAM_TYPES = "design:paramtypes";
exports.POST_CONSTRUCT = "post_construct";


/***/ }),

/***/ "./node_modules/inversify/lib/container/container.js":
/*!***********************************************************!*\
  !*** ./node_modules/inversify/lib/container/container.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var binding_1 = __webpack_require__(/*! ../bindings/binding */ "./node_modules/inversify/lib/bindings/binding.js");
var ERROR_MSGS = __webpack_require__(/*! ../constants/error_msgs */ "./node_modules/inversify/lib/constants/error_msgs.js");
var literal_types_1 = __webpack_require__(/*! ../constants/literal_types */ "./node_modules/inversify/lib/constants/literal_types.js");
var METADATA_KEY = __webpack_require__(/*! ../constants/metadata_keys */ "./node_modules/inversify/lib/constants/metadata_keys.js");
var metadata_reader_1 = __webpack_require__(/*! ../planning/metadata_reader */ "./node_modules/inversify/lib/planning/metadata_reader.js");
var planner_1 = __webpack_require__(/*! ../planning/planner */ "./node_modules/inversify/lib/planning/planner.js");
var resolver_1 = __webpack_require__(/*! ../resolution/resolver */ "./node_modules/inversify/lib/resolution/resolver.js");
var binding_to_syntax_1 = __webpack_require__(/*! ../syntax/binding_to_syntax */ "./node_modules/inversify/lib/syntax/binding_to_syntax.js");
var id_1 = __webpack_require__(/*! ../utils/id */ "./node_modules/inversify/lib/utils/id.js");
var serialization_1 = __webpack_require__(/*! ../utils/serialization */ "./node_modules/inversify/lib/utils/serialization.js");
var container_snapshot_1 = __webpack_require__(/*! ./container_snapshot */ "./node_modules/inversify/lib/container/container_snapshot.js");
var lookup_1 = __webpack_require__(/*! ./lookup */ "./node_modules/inversify/lib/container/lookup.js");
var Container = (function () {
    function Container(containerOptions) {
        var options = containerOptions || {};
        if (typeof options !== "object") {
            throw new Error("" + ERROR_MSGS.CONTAINER_OPTIONS_MUST_BE_AN_OBJECT);
        }
        if (options.defaultScope === undefined) {
            options.defaultScope = literal_types_1.BindingScopeEnum.Transient;
        }
        else if (options.defaultScope !== literal_types_1.BindingScopeEnum.Singleton &&
            options.defaultScope !== literal_types_1.BindingScopeEnum.Transient &&
            options.defaultScope !== literal_types_1.BindingScopeEnum.Request) {
            throw new Error("" + ERROR_MSGS.CONTAINER_OPTIONS_INVALID_DEFAULT_SCOPE);
        }
        if (options.autoBindInjectable === undefined) {
            options.autoBindInjectable = false;
        }
        else if (typeof options.autoBindInjectable !== "boolean") {
            throw new Error("" + ERROR_MSGS.CONTAINER_OPTIONS_INVALID_AUTO_BIND_INJECTABLE);
        }
        if (options.skipBaseClassChecks === undefined) {
            options.skipBaseClassChecks = false;
        }
        else if (typeof options.skipBaseClassChecks !== "boolean") {
            throw new Error("" + ERROR_MSGS.CONTAINER_OPTIONS_INVALID_SKIP_BASE_CHECK);
        }
        this.options = {
            autoBindInjectable: options.autoBindInjectable,
            defaultScope: options.defaultScope,
            skipBaseClassChecks: options.skipBaseClassChecks
        };
        this.id = id_1.id();
        this._bindingDictionary = new lookup_1.Lookup();
        this._snapshots = [];
        this._middleware = null;
        this.parent = null;
        this._metadataReader = new metadata_reader_1.MetadataReader();
    }
    Container.merge = function (container1, container2) {
        var container = new Container();
        var bindingDictionary = planner_1.getBindingDictionary(container);
        var bindingDictionary1 = planner_1.getBindingDictionary(container1);
        var bindingDictionary2 = planner_1.getBindingDictionary(container2);
        function copyDictionary(origin, destination) {
            origin.traverse(function (key, value) {
                value.forEach(function (binding) {
                    destination.add(binding.serviceIdentifier, binding.clone());
                });
            });
        }
        copyDictionary(bindingDictionary1, bindingDictionary);
        copyDictionary(bindingDictionary2, bindingDictionary);
        return container;
    };
    Container.prototype.load = function () {
        var modules = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            modules[_i] = arguments[_i];
        }
        var getHelpers = this._getContainerModuleHelpersFactory();
        for (var _a = 0, modules_1 = modules; _a < modules_1.length; _a++) {
            var currentModule = modules_1[_a];
            var containerModuleHelpers = getHelpers(currentModule.id);
            currentModule.registry(containerModuleHelpers.bindFunction, containerModuleHelpers.unbindFunction, containerModuleHelpers.isboundFunction, containerModuleHelpers.rebindFunction);
        }
    };
    Container.prototype.loadAsync = function () {
        var modules = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            modules[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var getHelpers, _a, modules_2, currentModule, containerModuleHelpers;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        getHelpers = this._getContainerModuleHelpersFactory();
                        _a = 0, modules_2 = modules;
                        _b.label = 1;
                    case 1:
                        if (!(_a < modules_2.length)) return [3, 4];
                        currentModule = modules_2[_a];
                        containerModuleHelpers = getHelpers(currentModule.id);
                        return [4, currentModule.registry(containerModuleHelpers.bindFunction, containerModuleHelpers.unbindFunction, containerModuleHelpers.isboundFunction, containerModuleHelpers.rebindFunction)];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        _a++;
                        return [3, 1];
                    case 4: return [2];
                }
            });
        });
    };
    Container.prototype.unload = function () {
        var _this = this;
        var modules = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            modules[_i] = arguments[_i];
        }
        var conditionFactory = function (expected) { return function (item) {
            return item.moduleId === expected;
        }; };
        modules.forEach(function (module) {
            var condition = conditionFactory(module.id);
            _this._bindingDictionary.removeByCondition(condition);
        });
    };
    Container.prototype.bind = function (serviceIdentifier) {
        var scope = this.options.defaultScope || literal_types_1.BindingScopeEnum.Transient;
        var binding = new binding_1.Binding(serviceIdentifier, scope);
        this._bindingDictionary.add(serviceIdentifier, binding);
        return new binding_to_syntax_1.BindingToSyntax(binding);
    };
    Container.prototype.rebind = function (serviceIdentifier) {
        this.unbind(serviceIdentifier);
        return this.bind(serviceIdentifier);
    };
    Container.prototype.unbind = function (serviceIdentifier) {
        try {
            this._bindingDictionary.remove(serviceIdentifier);
        }
        catch (e) {
            throw new Error(ERROR_MSGS.CANNOT_UNBIND + " " + serialization_1.getServiceIdentifierAsString(serviceIdentifier));
        }
    };
    Container.prototype.unbindAll = function () {
        this._bindingDictionary = new lookup_1.Lookup();
    };
    Container.prototype.isBound = function (serviceIdentifier) {
        var bound = this._bindingDictionary.hasKey(serviceIdentifier);
        if (!bound && this.parent) {
            bound = this.parent.isBound(serviceIdentifier);
        }
        return bound;
    };
    Container.prototype.isBoundNamed = function (serviceIdentifier, named) {
        return this.isBoundTagged(serviceIdentifier, METADATA_KEY.NAMED_TAG, named);
    };
    Container.prototype.isBoundTagged = function (serviceIdentifier, key, value) {
        var bound = false;
        if (this._bindingDictionary.hasKey(serviceIdentifier)) {
            var bindings = this._bindingDictionary.get(serviceIdentifier);
            var request_1 = planner_1.createMockRequest(this, serviceIdentifier, key, value);
            bound = bindings.some(function (b) { return b.constraint(request_1); });
        }
        if (!bound && this.parent) {
            bound = this.parent.isBoundTagged(serviceIdentifier, key, value);
        }
        return bound;
    };
    Container.prototype.snapshot = function () {
        this._snapshots.push(container_snapshot_1.ContainerSnapshot.of(this._bindingDictionary.clone(), this._middleware));
    };
    Container.prototype.restore = function () {
        var snapshot = this._snapshots.pop();
        if (snapshot === undefined) {
            throw new Error(ERROR_MSGS.NO_MORE_SNAPSHOTS_AVAILABLE);
        }
        this._bindingDictionary = snapshot.bindings;
        this._middleware = snapshot.middleware;
    };
    Container.prototype.createChild = function (containerOptions) {
        var child = new Container(containerOptions || this.options);
        child.parent = this;
        return child;
    };
    Container.prototype.applyMiddleware = function () {
        var middlewares = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            middlewares[_i] = arguments[_i];
        }
        var initial = (this._middleware) ? this._middleware : this._planAndResolve();
        this._middleware = middlewares.reduce(function (prev, curr) { return curr(prev); }, initial);
    };
    Container.prototype.applyCustomMetadataReader = function (metadataReader) {
        this._metadataReader = metadataReader;
    };
    Container.prototype.get = function (serviceIdentifier) {
        return this._get(false, false, literal_types_1.TargetTypeEnum.Variable, serviceIdentifier);
    };
    Container.prototype.getTagged = function (serviceIdentifier, key, value) {
        return this._get(false, false, literal_types_1.TargetTypeEnum.Variable, serviceIdentifier, key, value);
    };
    Container.prototype.getNamed = function (serviceIdentifier, named) {
        return this.getTagged(serviceIdentifier, METADATA_KEY.NAMED_TAG, named);
    };
    Container.prototype.getAll = function (serviceIdentifier) {
        return this._get(true, true, literal_types_1.TargetTypeEnum.Variable, serviceIdentifier);
    };
    Container.prototype.getAllTagged = function (serviceIdentifier, key, value) {
        return this._get(false, true, literal_types_1.TargetTypeEnum.Variable, serviceIdentifier, key, value);
    };
    Container.prototype.getAllNamed = function (serviceIdentifier, named) {
        return this.getAllTagged(serviceIdentifier, METADATA_KEY.NAMED_TAG, named);
    };
    Container.prototype.resolve = function (constructorFunction) {
        var tempContainer = this.createChild();
        tempContainer.bind(constructorFunction).toSelf();
        return tempContainer.get(constructorFunction);
    };
    Container.prototype._getContainerModuleHelpersFactory = function () {
        var _this = this;
        var setModuleId = function (bindingToSyntax, moduleId) {
            bindingToSyntax._binding.moduleId = moduleId;
        };
        var getBindFunction = function (moduleId) {
            return function (serviceIdentifier) {
                var _bind = _this.bind.bind(_this);
                var bindingToSyntax = _bind(serviceIdentifier);
                setModuleId(bindingToSyntax, moduleId);
                return bindingToSyntax;
            };
        };
        var getUnbindFunction = function (moduleId) {
            return function (serviceIdentifier) {
                var _unbind = _this.unbind.bind(_this);
                _unbind(serviceIdentifier);
            };
        };
        var getIsboundFunction = function (moduleId) {
            return function (serviceIdentifier) {
                var _isBound = _this.isBound.bind(_this);
                return _isBound(serviceIdentifier);
            };
        };
        var getRebindFunction = function (moduleId) {
            return function (serviceIdentifier) {
                var _rebind = _this.rebind.bind(_this);
                var bindingToSyntax = _rebind(serviceIdentifier);
                setModuleId(bindingToSyntax, moduleId);
                return bindingToSyntax;
            };
        };
        return function (mId) { return ({
            bindFunction: getBindFunction(mId),
            isboundFunction: getIsboundFunction(mId),
            rebindFunction: getRebindFunction(mId),
            unbindFunction: getUnbindFunction(mId)
        }); };
    };
    Container.prototype._get = function (avoidConstraints, isMultiInject, targetType, serviceIdentifier, key, value) {
        var result = null;
        var defaultArgs = {
            avoidConstraints: avoidConstraints,
            contextInterceptor: function (context) { return context; },
            isMultiInject: isMultiInject,
            key: key,
            serviceIdentifier: serviceIdentifier,
            targetType: targetType,
            value: value
        };
        if (this._middleware) {
            result = this._middleware(defaultArgs);
            if (result === undefined || result === null) {
                throw new Error(ERROR_MSGS.INVALID_MIDDLEWARE_RETURN);
            }
        }
        else {
            result = this._planAndResolve()(defaultArgs);
        }
        return result;
    };
    Container.prototype._planAndResolve = function () {
        var _this = this;
        return function (args) {
            var context = planner_1.plan(_this._metadataReader, _this, args.isMultiInject, args.targetType, args.serviceIdentifier, args.key, args.value, args.avoidConstraints);
            context = args.contextInterceptor(context);
            var result = resolver_1.resolve(context);
            return result;
        };
    };
    return Container;
}());
exports.Container = Container;


/***/ }),

/***/ "./node_modules/inversify/lib/container/container_module.js":
/*!******************************************************************!*\
  !*** ./node_modules/inversify/lib/container/container_module.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var id_1 = __webpack_require__(/*! ../utils/id */ "./node_modules/inversify/lib/utils/id.js");
var ContainerModule = (function () {
    function ContainerModule(registry) {
        this.id = id_1.id();
        this.registry = registry;
    }
    return ContainerModule;
}());
exports.ContainerModule = ContainerModule;
var AsyncContainerModule = (function () {
    function AsyncContainerModule(registry) {
        this.id = id_1.id();
        this.registry = registry;
    }
    return AsyncContainerModule;
}());
exports.AsyncContainerModule = AsyncContainerModule;


/***/ }),

/***/ "./node_modules/inversify/lib/container/container_snapshot.js":
/*!********************************************************************!*\
  !*** ./node_modules/inversify/lib/container/container_snapshot.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ContainerSnapshot = (function () {
    function ContainerSnapshot() {
    }
    ContainerSnapshot.of = function (bindings, middleware) {
        var snapshot = new ContainerSnapshot();
        snapshot.bindings = bindings;
        snapshot.middleware = middleware;
        return snapshot;
    };
    return ContainerSnapshot;
}());
exports.ContainerSnapshot = ContainerSnapshot;


/***/ }),

/***/ "./node_modules/inversify/lib/container/lookup.js":
/*!********************************************************!*\
  !*** ./node_modules/inversify/lib/container/lookup.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ERROR_MSGS = __webpack_require__(/*! ../constants/error_msgs */ "./node_modules/inversify/lib/constants/error_msgs.js");
var Lookup = (function () {
    function Lookup() {
        this._map = new Map();
    }
    Lookup.prototype.getMap = function () {
        return this._map;
    };
    Lookup.prototype.add = function (serviceIdentifier, value) {
        if (serviceIdentifier === null || serviceIdentifier === undefined) {
            throw new Error(ERROR_MSGS.NULL_ARGUMENT);
        }
        if (value === null || value === undefined) {
            throw new Error(ERROR_MSGS.NULL_ARGUMENT);
        }
        var entry = this._map.get(serviceIdentifier);
        if (entry !== undefined) {
            entry.push(value);
            this._map.set(serviceIdentifier, entry);
        }
        else {
            this._map.set(serviceIdentifier, [value]);
        }
    };
    Lookup.prototype.get = function (serviceIdentifier) {
        if (serviceIdentifier === null || serviceIdentifier === undefined) {
            throw new Error(ERROR_MSGS.NULL_ARGUMENT);
        }
        var entry = this._map.get(serviceIdentifier);
        if (entry !== undefined) {
            return entry;
        }
        else {
            throw new Error(ERROR_MSGS.KEY_NOT_FOUND);
        }
    };
    Lookup.prototype.remove = function (serviceIdentifier) {
        if (serviceIdentifier === null || serviceIdentifier === undefined) {
            throw new Error(ERROR_MSGS.NULL_ARGUMENT);
        }
        if (!this._map.delete(serviceIdentifier)) {
            throw new Error(ERROR_MSGS.KEY_NOT_FOUND);
        }
    };
    Lookup.prototype.removeByCondition = function (condition) {
        var _this = this;
        this._map.forEach(function (entries, key) {
            var updatedEntries = entries.filter(function (entry) { return !condition(entry); });
            if (updatedEntries.length > 0) {
                _this._map.set(key, updatedEntries);
            }
            else {
                _this._map.delete(key);
            }
        });
    };
    Lookup.prototype.hasKey = function (serviceIdentifier) {
        if (serviceIdentifier === null || serviceIdentifier === undefined) {
            throw new Error(ERROR_MSGS.NULL_ARGUMENT);
        }
        return this._map.has(serviceIdentifier);
    };
    Lookup.prototype.clone = function () {
        var copy = new Lookup();
        this._map.forEach(function (value, key) {
            value.forEach(function (b) { return copy.add(key, b.clone()); });
        });
        return copy;
    };
    Lookup.prototype.traverse = function (func) {
        this._map.forEach(function (value, key) {
            func(key, value);
        });
    };
    return Lookup;
}());
exports.Lookup = Lookup;


/***/ }),

/***/ "./node_modules/inversify/lib/inversify.js":
/*!*************************************************!*\
  !*** ./node_modules/inversify/lib/inversify.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var keys = __webpack_require__(/*! ./constants/metadata_keys */ "./node_modules/inversify/lib/constants/metadata_keys.js");
exports.METADATA_KEY = keys;
var container_1 = __webpack_require__(/*! ./container/container */ "./node_modules/inversify/lib/container/container.js");
exports.Container = container_1.Container;
var literal_types_1 = __webpack_require__(/*! ./constants/literal_types */ "./node_modules/inversify/lib/constants/literal_types.js");
exports.BindingScopeEnum = literal_types_1.BindingScopeEnum;
exports.BindingTypeEnum = literal_types_1.BindingTypeEnum;
exports.TargetTypeEnum = literal_types_1.TargetTypeEnum;
var container_module_1 = __webpack_require__(/*! ./container/container_module */ "./node_modules/inversify/lib/container/container_module.js");
exports.AsyncContainerModule = container_module_1.AsyncContainerModule;
exports.ContainerModule = container_module_1.ContainerModule;
var injectable_1 = __webpack_require__(/*! ./annotation/injectable */ "./node_modules/inversify/lib/annotation/injectable.js");
exports.injectable = injectable_1.injectable;
var tagged_1 = __webpack_require__(/*! ./annotation/tagged */ "./node_modules/inversify/lib/annotation/tagged.js");
exports.tagged = tagged_1.tagged;
var named_1 = __webpack_require__(/*! ./annotation/named */ "./node_modules/inversify/lib/annotation/named.js");
exports.named = named_1.named;
var inject_1 = __webpack_require__(/*! ./annotation/inject */ "./node_modules/inversify/lib/annotation/inject.js");
exports.inject = inject_1.inject;
exports.LazyServiceIdentifer = inject_1.LazyServiceIdentifer;
var optional_1 = __webpack_require__(/*! ./annotation/optional */ "./node_modules/inversify/lib/annotation/optional.js");
exports.optional = optional_1.optional;
var unmanaged_1 = __webpack_require__(/*! ./annotation/unmanaged */ "./node_modules/inversify/lib/annotation/unmanaged.js");
exports.unmanaged = unmanaged_1.unmanaged;
var multi_inject_1 = __webpack_require__(/*! ./annotation/multi_inject */ "./node_modules/inversify/lib/annotation/multi_inject.js");
exports.multiInject = multi_inject_1.multiInject;
var target_name_1 = __webpack_require__(/*! ./annotation/target_name */ "./node_modules/inversify/lib/annotation/target_name.js");
exports.targetName = target_name_1.targetName;
var post_construct_1 = __webpack_require__(/*! ./annotation/post_construct */ "./node_modules/inversify/lib/annotation/post_construct.js");
exports.postConstruct = post_construct_1.postConstruct;
var metadata_reader_1 = __webpack_require__(/*! ./planning/metadata_reader */ "./node_modules/inversify/lib/planning/metadata_reader.js");
exports.MetadataReader = metadata_reader_1.MetadataReader;
var id_1 = __webpack_require__(/*! ./utils/id */ "./node_modules/inversify/lib/utils/id.js");
exports.id = id_1.id;
var decorator_utils_1 = __webpack_require__(/*! ./annotation/decorator_utils */ "./node_modules/inversify/lib/annotation/decorator_utils.js");
exports.decorate = decorator_utils_1.decorate;
var constraint_helpers_1 = __webpack_require__(/*! ./syntax/constraint_helpers */ "./node_modules/inversify/lib/syntax/constraint_helpers.js");
exports.traverseAncerstors = constraint_helpers_1.traverseAncerstors;
exports.taggedConstraint = constraint_helpers_1.taggedConstraint;
exports.namedConstraint = constraint_helpers_1.namedConstraint;
exports.typeConstraint = constraint_helpers_1.typeConstraint;
var serialization_1 = __webpack_require__(/*! ./utils/serialization */ "./node_modules/inversify/lib/utils/serialization.js");
exports.getServiceIdentifierAsString = serialization_1.getServiceIdentifierAsString;
var binding_utils_1 = __webpack_require__(/*! ./utils/binding_utils */ "./node_modules/inversify/lib/utils/binding_utils.js");
exports.multiBindToService = binding_utils_1.multiBindToService;


/***/ }),

/***/ "./node_modules/inversify/lib/planning/context.js":
/*!********************************************************!*\
  !*** ./node_modules/inversify/lib/planning/context.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var id_1 = __webpack_require__(/*! ../utils/id */ "./node_modules/inversify/lib/utils/id.js");
var Context = (function () {
    function Context(container) {
        this.id = id_1.id();
        this.container = container;
    }
    Context.prototype.addPlan = function (plan) {
        this.plan = plan;
    };
    Context.prototype.setCurrentRequest = function (currentRequest) {
        this.currentRequest = currentRequest;
    };
    return Context;
}());
exports.Context = Context;


/***/ }),

/***/ "./node_modules/inversify/lib/planning/metadata.js":
/*!*********************************************************!*\
  !*** ./node_modules/inversify/lib/planning/metadata.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var METADATA_KEY = __webpack_require__(/*! ../constants/metadata_keys */ "./node_modules/inversify/lib/constants/metadata_keys.js");
var Metadata = (function () {
    function Metadata(key, value) {
        this.key = key;
        this.value = value;
    }
    Metadata.prototype.toString = function () {
        if (this.key === METADATA_KEY.NAMED_TAG) {
            return "named: " + this.value.toString() + " ";
        }
        else {
            return "tagged: { key:" + this.key.toString() + ", value: " + this.value + " }";
        }
    };
    return Metadata;
}());
exports.Metadata = Metadata;


/***/ }),

/***/ "./node_modules/inversify/lib/planning/metadata_reader.js":
/*!****************************************************************!*\
  !*** ./node_modules/inversify/lib/planning/metadata_reader.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var METADATA_KEY = __webpack_require__(/*! ../constants/metadata_keys */ "./node_modules/inversify/lib/constants/metadata_keys.js");
var MetadataReader = (function () {
    function MetadataReader() {
    }
    MetadataReader.prototype.getConstructorMetadata = function (constructorFunc) {
        var compilerGeneratedMetadata = Reflect.getMetadata(METADATA_KEY.PARAM_TYPES, constructorFunc);
        var userGeneratedMetadata = Reflect.getMetadata(METADATA_KEY.TAGGED, constructorFunc);
        return {
            compilerGeneratedMetadata: compilerGeneratedMetadata,
            userGeneratedMetadata: userGeneratedMetadata || {}
        };
    };
    MetadataReader.prototype.getPropertiesMetadata = function (constructorFunc) {
        var userGeneratedMetadata = Reflect.getMetadata(METADATA_KEY.TAGGED_PROP, constructorFunc) || [];
        return userGeneratedMetadata;
    };
    return MetadataReader;
}());
exports.MetadataReader = MetadataReader;


/***/ }),

/***/ "./node_modules/inversify/lib/planning/plan.js":
/*!*****************************************************!*\
  !*** ./node_modules/inversify/lib/planning/plan.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Plan = (function () {
    function Plan(parentContext, rootRequest) {
        this.parentContext = parentContext;
        this.rootRequest = rootRequest;
    }
    return Plan;
}());
exports.Plan = Plan;


/***/ }),

/***/ "./node_modules/inversify/lib/planning/planner.js":
/*!********************************************************!*\
  !*** ./node_modules/inversify/lib/planning/planner.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var binding_count_1 = __webpack_require__(/*! ../bindings/binding_count */ "./node_modules/inversify/lib/bindings/binding_count.js");
var ERROR_MSGS = __webpack_require__(/*! ../constants/error_msgs */ "./node_modules/inversify/lib/constants/error_msgs.js");
var literal_types_1 = __webpack_require__(/*! ../constants/literal_types */ "./node_modules/inversify/lib/constants/literal_types.js");
var METADATA_KEY = __webpack_require__(/*! ../constants/metadata_keys */ "./node_modules/inversify/lib/constants/metadata_keys.js");
var exceptions_1 = __webpack_require__(/*! ../utils/exceptions */ "./node_modules/inversify/lib/utils/exceptions.js");
var serialization_1 = __webpack_require__(/*! ../utils/serialization */ "./node_modules/inversify/lib/utils/serialization.js");
var context_1 = __webpack_require__(/*! ./context */ "./node_modules/inversify/lib/planning/context.js");
var metadata_1 = __webpack_require__(/*! ./metadata */ "./node_modules/inversify/lib/planning/metadata.js");
var plan_1 = __webpack_require__(/*! ./plan */ "./node_modules/inversify/lib/planning/plan.js");
var reflection_utils_1 = __webpack_require__(/*! ./reflection_utils */ "./node_modules/inversify/lib/planning/reflection_utils.js");
var request_1 = __webpack_require__(/*! ./request */ "./node_modules/inversify/lib/planning/request.js");
var target_1 = __webpack_require__(/*! ./target */ "./node_modules/inversify/lib/planning/target.js");
function getBindingDictionary(cntnr) {
    return cntnr._bindingDictionary;
}
exports.getBindingDictionary = getBindingDictionary;
function _createTarget(isMultiInject, targetType, serviceIdentifier, name, key, value) {
    var metadataKey = isMultiInject ? METADATA_KEY.MULTI_INJECT_TAG : METADATA_KEY.INJECT_TAG;
    var injectMetadata = new metadata_1.Metadata(metadataKey, serviceIdentifier);
    var target = new target_1.Target(targetType, name, serviceIdentifier, injectMetadata);
    if (key !== undefined) {
        var tagMetadata = new metadata_1.Metadata(key, value);
        target.metadata.push(tagMetadata);
    }
    return target;
}
function _getActiveBindings(metadataReader, avoidConstraints, context, parentRequest, target) {
    var bindings = getBindings(context.container, target.serviceIdentifier);
    var activeBindings = [];
    if (bindings.length === binding_count_1.BindingCount.NoBindingsAvailable &&
        context.container.options.autoBindInjectable &&
        typeof target.serviceIdentifier === "function" &&
        metadataReader.getConstructorMetadata(target.serviceIdentifier).compilerGeneratedMetadata) {
        context.container.bind(target.serviceIdentifier).toSelf();
        bindings = getBindings(context.container, target.serviceIdentifier);
    }
    if (!avoidConstraints) {
        activeBindings = bindings.filter(function (binding) {
            var request = new request_1.Request(binding.serviceIdentifier, context, parentRequest, binding, target);
            return binding.constraint(request);
        });
    }
    else {
        activeBindings = bindings;
    }
    _validateActiveBindingCount(target.serviceIdentifier, activeBindings, target, context.container);
    return activeBindings;
}
function _validateActiveBindingCount(serviceIdentifier, bindings, target, container) {
    switch (bindings.length) {
        case binding_count_1.BindingCount.NoBindingsAvailable:
            if (target.isOptional()) {
                return bindings;
            }
            else {
                var serviceIdentifierString = serialization_1.getServiceIdentifierAsString(serviceIdentifier);
                var msg = ERROR_MSGS.NOT_REGISTERED;
                msg += serialization_1.listMetadataForTarget(serviceIdentifierString, target);
                msg += serialization_1.listRegisteredBindingsForServiceIdentifier(container, serviceIdentifierString, getBindings);
                throw new Error(msg);
            }
        case binding_count_1.BindingCount.OnlyOneBindingAvailable:
            if (!target.isArray()) {
                return bindings;
            }
        case binding_count_1.BindingCount.MultipleBindingsAvailable:
        default:
            if (!target.isArray()) {
                var serviceIdentifierString = serialization_1.getServiceIdentifierAsString(serviceIdentifier);
                var msg = ERROR_MSGS.AMBIGUOUS_MATCH + " " + serviceIdentifierString;
                msg += serialization_1.listRegisteredBindingsForServiceIdentifier(container, serviceIdentifierString, getBindings);
                throw new Error(msg);
            }
            else {
                return bindings;
            }
    }
}
function _createSubRequests(metadataReader, avoidConstraints, serviceIdentifier, context, parentRequest, target) {
    var activeBindings;
    var childRequest;
    if (parentRequest === null) {
        activeBindings = _getActiveBindings(metadataReader, avoidConstraints, context, null, target);
        childRequest = new request_1.Request(serviceIdentifier, context, null, activeBindings, target);
        var thePlan = new plan_1.Plan(context, childRequest);
        context.addPlan(thePlan);
    }
    else {
        activeBindings = _getActiveBindings(metadataReader, avoidConstraints, context, parentRequest, target);
        childRequest = parentRequest.addChildRequest(target.serviceIdentifier, activeBindings, target);
    }
    activeBindings.forEach(function (binding) {
        var subChildRequest = null;
        if (target.isArray()) {
            subChildRequest = childRequest.addChildRequest(binding.serviceIdentifier, binding, target);
        }
        else {
            if (binding.cache) {
                return;
            }
            subChildRequest = childRequest;
        }
        if (binding.type === literal_types_1.BindingTypeEnum.Instance && binding.implementationType !== null) {
            var dependencies = reflection_utils_1.getDependencies(metadataReader, binding.implementationType);
            if (!context.container.options.skipBaseClassChecks) {
                var baseClassDependencyCount = reflection_utils_1.getBaseClassDependencyCount(metadataReader, binding.implementationType);
                if (dependencies.length < baseClassDependencyCount) {
                    var error = ERROR_MSGS.ARGUMENTS_LENGTH_MISMATCH(reflection_utils_1.getFunctionName(binding.implementationType));
                    throw new Error(error);
                }
            }
            dependencies.forEach(function (dependency) {
                _createSubRequests(metadataReader, false, dependency.serviceIdentifier, context, subChildRequest, dependency);
            });
        }
    });
}
function getBindings(container, serviceIdentifier) {
    var bindings = [];
    var bindingDictionary = getBindingDictionary(container);
    if (bindingDictionary.hasKey(serviceIdentifier)) {
        bindings = bindingDictionary.get(serviceIdentifier);
    }
    else if (container.parent !== null) {
        bindings = getBindings(container.parent, serviceIdentifier);
    }
    return bindings;
}
function plan(metadataReader, container, isMultiInject, targetType, serviceIdentifier, key, value, avoidConstraints) {
    if (avoidConstraints === void 0) { avoidConstraints = false; }
    var context = new context_1.Context(container);
    var target = _createTarget(isMultiInject, targetType, serviceIdentifier, "", key, value);
    try {
        _createSubRequests(metadataReader, avoidConstraints, serviceIdentifier, context, null, target);
        return context;
    }
    catch (error) {
        if (exceptions_1.isStackOverflowExeption(error)) {
            if (context.plan) {
                serialization_1.circularDependencyToException(context.plan.rootRequest);
            }
        }
        throw error;
    }
}
exports.plan = plan;
function createMockRequest(container, serviceIdentifier, key, value) {
    var target = new target_1.Target(literal_types_1.TargetTypeEnum.Variable, "", serviceIdentifier, new metadata_1.Metadata(key, value));
    var context = new context_1.Context(container);
    var request = new request_1.Request(serviceIdentifier, context, null, [], target);
    return request;
}
exports.createMockRequest = createMockRequest;


/***/ }),

/***/ "./node_modules/inversify/lib/planning/queryable_string.js":
/*!*****************************************************************!*\
  !*** ./node_modules/inversify/lib/planning/queryable_string.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var QueryableString = (function () {
    function QueryableString(str) {
        this.str = str;
    }
    QueryableString.prototype.startsWith = function (searchString) {
        return this.str.indexOf(searchString) === 0;
    };
    QueryableString.prototype.endsWith = function (searchString) {
        var reverseString = "";
        var reverseSearchString = searchString.split("").reverse().join("");
        reverseString = this.str.split("").reverse().join("");
        return this.startsWith.call({ str: reverseString }, reverseSearchString);
    };
    QueryableString.prototype.contains = function (searchString) {
        return (this.str.indexOf(searchString) !== -1);
    };
    QueryableString.prototype.equals = function (compareString) {
        return this.str === compareString;
    };
    QueryableString.prototype.value = function () {
        return this.str;
    };
    return QueryableString;
}());
exports.QueryableString = QueryableString;


/***/ }),

/***/ "./node_modules/inversify/lib/planning/reflection_utils.js":
/*!*****************************************************************!*\
  !*** ./node_modules/inversify/lib/planning/reflection_utils.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var inject_1 = __webpack_require__(/*! ../annotation/inject */ "./node_modules/inversify/lib/annotation/inject.js");
var ERROR_MSGS = __webpack_require__(/*! ../constants/error_msgs */ "./node_modules/inversify/lib/constants/error_msgs.js");
var literal_types_1 = __webpack_require__(/*! ../constants/literal_types */ "./node_modules/inversify/lib/constants/literal_types.js");
var METADATA_KEY = __webpack_require__(/*! ../constants/metadata_keys */ "./node_modules/inversify/lib/constants/metadata_keys.js");
var serialization_1 = __webpack_require__(/*! ../utils/serialization */ "./node_modules/inversify/lib/utils/serialization.js");
exports.getFunctionName = serialization_1.getFunctionName;
var target_1 = __webpack_require__(/*! ./target */ "./node_modules/inversify/lib/planning/target.js");
function getDependencies(metadataReader, func) {
    var constructorName = serialization_1.getFunctionName(func);
    var targets = getTargets(metadataReader, constructorName, func, false);
    return targets;
}
exports.getDependencies = getDependencies;
function getTargets(metadataReader, constructorName, func, isBaseClass) {
    var metadata = metadataReader.getConstructorMetadata(func);
    var serviceIdentifiers = metadata.compilerGeneratedMetadata;
    if (serviceIdentifiers === undefined) {
        var msg = ERROR_MSGS.MISSING_INJECTABLE_ANNOTATION + " " + constructorName + ".";
        throw new Error(msg);
    }
    var constructorArgsMetadata = metadata.userGeneratedMetadata;
    var keys = Object.keys(constructorArgsMetadata);
    var hasUserDeclaredUnknownInjections = (func.length === 0 && keys.length > 0);
    var iterations = (hasUserDeclaredUnknownInjections) ? keys.length : func.length;
    var constructorTargets = getConstructorArgsAsTargets(isBaseClass, constructorName, serviceIdentifiers, constructorArgsMetadata, iterations);
    var propertyTargets = getClassPropsAsTargets(metadataReader, func);
    var targets = constructorTargets.concat(propertyTargets);
    return targets;
}
function getConstructorArgsAsTarget(index, isBaseClass, constructorName, serviceIdentifiers, constructorArgsMetadata) {
    var targetMetadata = constructorArgsMetadata[index.toString()] || [];
    var metadata = formatTargetMetadata(targetMetadata);
    var isManaged = metadata.unmanaged !== true;
    var serviceIdentifier = serviceIdentifiers[index];
    var injectIdentifier = (metadata.inject || metadata.multiInject);
    serviceIdentifier = (injectIdentifier) ? (injectIdentifier) : serviceIdentifier;
    if (serviceIdentifier instanceof inject_1.LazyServiceIdentifer) {
        serviceIdentifier = serviceIdentifier.unwrap();
    }
    if (isManaged) {
        var isObject = serviceIdentifier === Object;
        var isFunction = serviceIdentifier === Function;
        var isUndefined = serviceIdentifier === undefined;
        var isUnknownType = (isObject || isFunction || isUndefined);
        if (!isBaseClass && isUnknownType) {
            var msg = ERROR_MSGS.MISSING_INJECT_ANNOTATION + " argument " + index + " in class " + constructorName + ".";
            throw new Error(msg);
        }
        var target = new target_1.Target(literal_types_1.TargetTypeEnum.ConstructorArgument, metadata.targetName, serviceIdentifier);
        target.metadata = targetMetadata;
        return target;
    }
    return null;
}
function getConstructorArgsAsTargets(isBaseClass, constructorName, serviceIdentifiers, constructorArgsMetadata, iterations) {
    var targets = [];
    for (var i = 0; i < iterations; i++) {
        var index = i;
        var target = getConstructorArgsAsTarget(index, isBaseClass, constructorName, serviceIdentifiers, constructorArgsMetadata);
        if (target !== null) {
            targets.push(target);
        }
    }
    return targets;
}
function getClassPropsAsTargets(metadataReader, constructorFunc) {
    var classPropsMetadata = metadataReader.getPropertiesMetadata(constructorFunc);
    var targets = [];
    var keys = Object.keys(classPropsMetadata);
    for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
        var key = keys_1[_i];
        var targetMetadata = classPropsMetadata[key];
        var metadata = formatTargetMetadata(classPropsMetadata[key]);
        var targetName = metadata.targetName || key;
        var serviceIdentifier = (metadata.inject || metadata.multiInject);
        var target = new target_1.Target(literal_types_1.TargetTypeEnum.ClassProperty, targetName, serviceIdentifier);
        target.metadata = targetMetadata;
        targets.push(target);
    }
    var baseConstructor = Object.getPrototypeOf(constructorFunc.prototype).constructor;
    if (baseConstructor !== Object) {
        var baseTargets = getClassPropsAsTargets(metadataReader, baseConstructor);
        targets = targets.concat(baseTargets);
    }
    return targets;
}
function getBaseClassDependencyCount(metadataReader, func) {
    var baseConstructor = Object.getPrototypeOf(func.prototype).constructor;
    if (baseConstructor !== Object) {
        var baseConstructorName = serialization_1.getFunctionName(baseConstructor);
        var targets = getTargets(metadataReader, baseConstructorName, baseConstructor, true);
        var metadata = targets.map(function (t) {
            return t.metadata.filter(function (m) {
                return m.key === METADATA_KEY.UNMANAGED_TAG;
            });
        });
        var unmanagedCount = [].concat.apply([], metadata).length;
        var dependencyCount = targets.length - unmanagedCount;
        if (dependencyCount > 0) {
            return dependencyCount;
        }
        else {
            return getBaseClassDependencyCount(metadataReader, baseConstructor);
        }
    }
    else {
        return 0;
    }
}
exports.getBaseClassDependencyCount = getBaseClassDependencyCount;
function formatTargetMetadata(targetMetadata) {
    var targetMetadataMap = {};
    targetMetadata.forEach(function (m) {
        targetMetadataMap[m.key.toString()] = m.value;
    });
    return {
        inject: targetMetadataMap[METADATA_KEY.INJECT_TAG],
        multiInject: targetMetadataMap[METADATA_KEY.MULTI_INJECT_TAG],
        targetName: targetMetadataMap[METADATA_KEY.NAME_TAG],
        unmanaged: targetMetadataMap[METADATA_KEY.UNMANAGED_TAG]
    };
}


/***/ }),

/***/ "./node_modules/inversify/lib/planning/request.js":
/*!********************************************************!*\
  !*** ./node_modules/inversify/lib/planning/request.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var id_1 = __webpack_require__(/*! ../utils/id */ "./node_modules/inversify/lib/utils/id.js");
var Request = (function () {
    function Request(serviceIdentifier, parentContext, parentRequest, bindings, target) {
        this.id = id_1.id();
        this.serviceIdentifier = serviceIdentifier;
        this.parentContext = parentContext;
        this.parentRequest = parentRequest;
        this.target = target;
        this.childRequests = [];
        this.bindings = (Array.isArray(bindings) ? bindings : [bindings]);
        this.requestScope = parentRequest === null
            ? new Map()
            : null;
    }
    Request.prototype.addChildRequest = function (serviceIdentifier, bindings, target) {
        var child = new Request(serviceIdentifier, this.parentContext, this, bindings, target);
        this.childRequests.push(child);
        return child;
    };
    return Request;
}());
exports.Request = Request;


/***/ }),

/***/ "./node_modules/inversify/lib/planning/target.js":
/*!*******************************************************!*\
  !*** ./node_modules/inversify/lib/planning/target.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var METADATA_KEY = __webpack_require__(/*! ../constants/metadata_keys */ "./node_modules/inversify/lib/constants/metadata_keys.js");
var id_1 = __webpack_require__(/*! ../utils/id */ "./node_modules/inversify/lib/utils/id.js");
var metadata_1 = __webpack_require__(/*! ./metadata */ "./node_modules/inversify/lib/planning/metadata.js");
var queryable_string_1 = __webpack_require__(/*! ./queryable_string */ "./node_modules/inversify/lib/planning/queryable_string.js");
var Target = (function () {
    function Target(type, name, serviceIdentifier, namedOrTagged) {
        this.id = id_1.id();
        this.type = type;
        this.serviceIdentifier = serviceIdentifier;
        this.name = new queryable_string_1.QueryableString(name || "");
        this.metadata = new Array();
        var metadataItem = null;
        if (typeof namedOrTagged === "string") {
            metadataItem = new metadata_1.Metadata(METADATA_KEY.NAMED_TAG, namedOrTagged);
        }
        else if (namedOrTagged instanceof metadata_1.Metadata) {
            metadataItem = namedOrTagged;
        }
        if (metadataItem !== null) {
            this.metadata.push(metadataItem);
        }
    }
    Target.prototype.hasTag = function (key) {
        for (var _i = 0, _a = this.metadata; _i < _a.length; _i++) {
            var m = _a[_i];
            if (m.key === key) {
                return true;
            }
        }
        return false;
    };
    Target.prototype.isArray = function () {
        return this.hasTag(METADATA_KEY.MULTI_INJECT_TAG);
    };
    Target.prototype.matchesArray = function (name) {
        return this.matchesTag(METADATA_KEY.MULTI_INJECT_TAG)(name);
    };
    Target.prototype.isNamed = function () {
        return this.hasTag(METADATA_KEY.NAMED_TAG);
    };
    Target.prototype.isTagged = function () {
        return this.metadata.some(function (m) {
            return (m.key !== METADATA_KEY.INJECT_TAG) &&
                (m.key !== METADATA_KEY.MULTI_INJECT_TAG) &&
                (m.key !== METADATA_KEY.NAME_TAG) &&
                (m.key !== METADATA_KEY.UNMANAGED_TAG) &&
                (m.key !== METADATA_KEY.NAMED_TAG);
        });
    };
    Target.prototype.isOptional = function () {
        return this.matchesTag(METADATA_KEY.OPTIONAL_TAG)(true);
    };
    Target.prototype.getNamedTag = function () {
        if (this.isNamed()) {
            return this.metadata.filter(function (m) { return m.key === METADATA_KEY.NAMED_TAG; })[0];
        }
        return null;
    };
    Target.prototype.getCustomTags = function () {
        if (this.isTagged()) {
            return this.metadata.filter(function (m) {
                return (m.key !== METADATA_KEY.INJECT_TAG) &&
                    (m.key !== METADATA_KEY.MULTI_INJECT_TAG) &&
                    (m.key !== METADATA_KEY.NAME_TAG) &&
                    (m.key !== METADATA_KEY.UNMANAGED_TAG) &&
                    (m.key !== METADATA_KEY.NAMED_TAG);
            });
        }
        return null;
    };
    Target.prototype.matchesNamedTag = function (name) {
        return this.matchesTag(METADATA_KEY.NAMED_TAG)(name);
    };
    Target.prototype.matchesTag = function (key) {
        var _this = this;
        return function (value) {
            for (var _i = 0, _a = _this.metadata; _i < _a.length; _i++) {
                var m = _a[_i];
                if (m.key === key && m.value === value) {
                    return true;
                }
            }
            return false;
        };
    };
    return Target;
}());
exports.Target = Target;


/***/ }),

/***/ "./node_modules/inversify/lib/resolution/instantiation.js":
/*!****************************************************************!*\
  !*** ./node_modules/inversify/lib/resolution/instantiation.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var error_msgs_1 = __webpack_require__(/*! ../constants/error_msgs */ "./node_modules/inversify/lib/constants/error_msgs.js");
var literal_types_1 = __webpack_require__(/*! ../constants/literal_types */ "./node_modules/inversify/lib/constants/literal_types.js");
var METADATA_KEY = __webpack_require__(/*! ../constants/metadata_keys */ "./node_modules/inversify/lib/constants/metadata_keys.js");
function _injectProperties(instance, childRequests, resolveRequest) {
    var propertyInjectionsRequests = childRequests.filter(function (childRequest) {
        return (childRequest.target !== null &&
            childRequest.target.type === literal_types_1.TargetTypeEnum.ClassProperty);
    });
    var propertyInjections = propertyInjectionsRequests.map(resolveRequest);
    propertyInjectionsRequests.forEach(function (r, index) {
        var propertyName = "";
        propertyName = r.target.name.value();
        var injection = propertyInjections[index];
        instance[propertyName] = injection;
    });
    return instance;
}
function _createInstance(Func, injections) {
    return new (Func.bind.apply(Func, [void 0].concat(injections)))();
}
function _postConstruct(constr, result) {
    if (Reflect.hasMetadata(METADATA_KEY.POST_CONSTRUCT, constr)) {
        var data = Reflect.getMetadata(METADATA_KEY.POST_CONSTRUCT, constr);
        try {
            result[data.value]();
        }
        catch (e) {
            throw new Error(error_msgs_1.POST_CONSTRUCT_ERROR(constr.name, e.message));
        }
    }
}
function resolveInstance(constr, childRequests, resolveRequest) {
    var result = null;
    if (childRequests.length > 0) {
        var constructorInjectionsRequests = childRequests.filter(function (childRequest) {
            return (childRequest.target !== null && childRequest.target.type === literal_types_1.TargetTypeEnum.ConstructorArgument);
        });
        var constructorInjections = constructorInjectionsRequests.map(resolveRequest);
        result = _createInstance(constr, constructorInjections);
        result = _injectProperties(result, childRequests, resolveRequest);
    }
    else {
        result = new constr();
    }
    _postConstruct(constr, result);
    return result;
}
exports.resolveInstance = resolveInstance;


/***/ }),

/***/ "./node_modules/inversify/lib/resolution/resolver.js":
/*!***********************************************************!*\
  !*** ./node_modules/inversify/lib/resolution/resolver.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ERROR_MSGS = __webpack_require__(/*! ../constants/error_msgs */ "./node_modules/inversify/lib/constants/error_msgs.js");
var literal_types_1 = __webpack_require__(/*! ../constants/literal_types */ "./node_modules/inversify/lib/constants/literal_types.js");
var exceptions_1 = __webpack_require__(/*! ../utils/exceptions */ "./node_modules/inversify/lib/utils/exceptions.js");
var serialization_1 = __webpack_require__(/*! ../utils/serialization */ "./node_modules/inversify/lib/utils/serialization.js");
var instantiation_1 = __webpack_require__(/*! ./instantiation */ "./node_modules/inversify/lib/resolution/instantiation.js");
var invokeFactory = function (factoryType, serviceIdentifier, fn) {
    try {
        return fn();
    }
    catch (error) {
        if (exceptions_1.isStackOverflowExeption(error)) {
            throw new Error(ERROR_MSGS.CIRCULAR_DEPENDENCY_IN_FACTORY(factoryType, serviceIdentifier.toString()));
        }
        else {
            throw error;
        }
    }
};
var _resolveRequest = function (requestScope) {
    return function (request) {
        request.parentContext.setCurrentRequest(request);
        var bindings = request.bindings;
        var childRequests = request.childRequests;
        var targetIsAnArray = request.target && request.target.isArray();
        var targetParentIsNotAnArray = !request.parentRequest ||
            !request.parentRequest.target ||
            !request.target ||
            !request.parentRequest.target.matchesArray(request.target.serviceIdentifier);
        if (targetIsAnArray && targetParentIsNotAnArray) {
            return childRequests.map(function (childRequest) {
                var _f = _resolveRequest(requestScope);
                return _f(childRequest);
            });
        }
        else {
            var result = null;
            if (request.target.isOptional() && bindings.length === 0) {
                return undefined;
            }
            var binding_1 = bindings[0];
            var isSingleton = binding_1.scope === literal_types_1.BindingScopeEnum.Singleton;
            var isRequestSingleton = binding_1.scope === literal_types_1.BindingScopeEnum.Request;
            if (isSingleton && binding_1.activated) {
                return binding_1.cache;
            }
            if (isRequestSingleton &&
                requestScope !== null &&
                requestScope.has(binding_1.id)) {
                return requestScope.get(binding_1.id);
            }
            if (binding_1.type === literal_types_1.BindingTypeEnum.ConstantValue) {
                result = binding_1.cache;
            }
            else if (binding_1.type === literal_types_1.BindingTypeEnum.Function) {
                result = binding_1.cache;
            }
            else if (binding_1.type === literal_types_1.BindingTypeEnum.Constructor) {
                result = binding_1.implementationType;
            }
            else if (binding_1.type === literal_types_1.BindingTypeEnum.DynamicValue && binding_1.dynamicValue !== null) {
                result = invokeFactory("toDynamicValue", binding_1.serviceIdentifier, function () { return binding_1.dynamicValue(request.parentContext); });
            }
            else if (binding_1.type === literal_types_1.BindingTypeEnum.Factory && binding_1.factory !== null) {
                result = invokeFactory("toFactory", binding_1.serviceIdentifier, function () { return binding_1.factory(request.parentContext); });
            }
            else if (binding_1.type === literal_types_1.BindingTypeEnum.Provider && binding_1.provider !== null) {
                result = invokeFactory("toProvider", binding_1.serviceIdentifier, function () { return binding_1.provider(request.parentContext); });
            }
            else if (binding_1.type === literal_types_1.BindingTypeEnum.Instance && binding_1.implementationType !== null) {
                result = instantiation_1.resolveInstance(binding_1.implementationType, childRequests, _resolveRequest(requestScope));
            }
            else {
                var serviceIdentifier = serialization_1.getServiceIdentifierAsString(request.serviceIdentifier);
                throw new Error(ERROR_MSGS.INVALID_BINDING_TYPE + " " + serviceIdentifier);
            }
            if (typeof binding_1.onActivation === "function") {
                result = binding_1.onActivation(request.parentContext, result);
            }
            if (isSingleton) {
                binding_1.cache = result;
                binding_1.activated = true;
            }
            if (isRequestSingleton &&
                requestScope !== null &&
                !requestScope.has(binding_1.id)) {
                requestScope.set(binding_1.id, result);
            }
            return result;
        }
    };
};
function resolve(context) {
    var _f = _resolveRequest(context.plan.rootRequest.requestScope);
    return _f(context.plan.rootRequest);
}
exports.resolve = resolve;


/***/ }),

/***/ "./node_modules/inversify/lib/syntax/binding_in_syntax.js":
/*!****************************************************************!*\
  !*** ./node_modules/inversify/lib/syntax/binding_in_syntax.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var literal_types_1 = __webpack_require__(/*! ../constants/literal_types */ "./node_modules/inversify/lib/constants/literal_types.js");
var binding_when_on_syntax_1 = __webpack_require__(/*! ./binding_when_on_syntax */ "./node_modules/inversify/lib/syntax/binding_when_on_syntax.js");
var BindingInSyntax = (function () {
    function BindingInSyntax(binding) {
        this._binding = binding;
    }
    BindingInSyntax.prototype.inRequestScope = function () {
        this._binding.scope = literal_types_1.BindingScopeEnum.Request;
        return new binding_when_on_syntax_1.BindingWhenOnSyntax(this._binding);
    };
    BindingInSyntax.prototype.inSingletonScope = function () {
        this._binding.scope = literal_types_1.BindingScopeEnum.Singleton;
        return new binding_when_on_syntax_1.BindingWhenOnSyntax(this._binding);
    };
    BindingInSyntax.prototype.inTransientScope = function () {
        this._binding.scope = literal_types_1.BindingScopeEnum.Transient;
        return new binding_when_on_syntax_1.BindingWhenOnSyntax(this._binding);
    };
    return BindingInSyntax;
}());
exports.BindingInSyntax = BindingInSyntax;


/***/ }),

/***/ "./node_modules/inversify/lib/syntax/binding_in_when_on_syntax.js":
/*!************************************************************************!*\
  !*** ./node_modules/inversify/lib/syntax/binding_in_when_on_syntax.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var binding_in_syntax_1 = __webpack_require__(/*! ./binding_in_syntax */ "./node_modules/inversify/lib/syntax/binding_in_syntax.js");
var binding_on_syntax_1 = __webpack_require__(/*! ./binding_on_syntax */ "./node_modules/inversify/lib/syntax/binding_on_syntax.js");
var binding_when_syntax_1 = __webpack_require__(/*! ./binding_when_syntax */ "./node_modules/inversify/lib/syntax/binding_when_syntax.js");
var BindingInWhenOnSyntax = (function () {
    function BindingInWhenOnSyntax(binding) {
        this._binding = binding;
        this._bindingWhenSyntax = new binding_when_syntax_1.BindingWhenSyntax(this._binding);
        this._bindingOnSyntax = new binding_on_syntax_1.BindingOnSyntax(this._binding);
        this._bindingInSyntax = new binding_in_syntax_1.BindingInSyntax(binding);
    }
    BindingInWhenOnSyntax.prototype.inRequestScope = function () {
        return this._bindingInSyntax.inRequestScope();
    };
    BindingInWhenOnSyntax.prototype.inSingletonScope = function () {
        return this._bindingInSyntax.inSingletonScope();
    };
    BindingInWhenOnSyntax.prototype.inTransientScope = function () {
        return this._bindingInSyntax.inTransientScope();
    };
    BindingInWhenOnSyntax.prototype.when = function (constraint) {
        return this._bindingWhenSyntax.when(constraint);
    };
    BindingInWhenOnSyntax.prototype.whenTargetNamed = function (name) {
        return this._bindingWhenSyntax.whenTargetNamed(name);
    };
    BindingInWhenOnSyntax.prototype.whenTargetIsDefault = function () {
        return this._bindingWhenSyntax.whenTargetIsDefault();
    };
    BindingInWhenOnSyntax.prototype.whenTargetTagged = function (tag, value) {
        return this._bindingWhenSyntax.whenTargetTagged(tag, value);
    };
    BindingInWhenOnSyntax.prototype.whenInjectedInto = function (parent) {
        return this._bindingWhenSyntax.whenInjectedInto(parent);
    };
    BindingInWhenOnSyntax.prototype.whenParentNamed = function (name) {
        return this._bindingWhenSyntax.whenParentNamed(name);
    };
    BindingInWhenOnSyntax.prototype.whenParentTagged = function (tag, value) {
        return this._bindingWhenSyntax.whenParentTagged(tag, value);
    };
    BindingInWhenOnSyntax.prototype.whenAnyAncestorIs = function (ancestor) {
        return this._bindingWhenSyntax.whenAnyAncestorIs(ancestor);
    };
    BindingInWhenOnSyntax.prototype.whenNoAncestorIs = function (ancestor) {
        return this._bindingWhenSyntax.whenNoAncestorIs(ancestor);
    };
    BindingInWhenOnSyntax.prototype.whenAnyAncestorNamed = function (name) {
        return this._bindingWhenSyntax.whenAnyAncestorNamed(name);
    };
    BindingInWhenOnSyntax.prototype.whenAnyAncestorTagged = function (tag, value) {
        return this._bindingWhenSyntax.whenAnyAncestorTagged(tag, value);
    };
    BindingInWhenOnSyntax.prototype.whenNoAncestorNamed = function (name) {
        return this._bindingWhenSyntax.whenNoAncestorNamed(name);
    };
    BindingInWhenOnSyntax.prototype.whenNoAncestorTagged = function (tag, value) {
        return this._bindingWhenSyntax.whenNoAncestorTagged(tag, value);
    };
    BindingInWhenOnSyntax.prototype.whenAnyAncestorMatches = function (constraint) {
        return this._bindingWhenSyntax.whenAnyAncestorMatches(constraint);
    };
    BindingInWhenOnSyntax.prototype.whenNoAncestorMatches = function (constraint) {
        return this._bindingWhenSyntax.whenNoAncestorMatches(constraint);
    };
    BindingInWhenOnSyntax.prototype.onActivation = function (handler) {
        return this._bindingOnSyntax.onActivation(handler);
    };
    return BindingInWhenOnSyntax;
}());
exports.BindingInWhenOnSyntax = BindingInWhenOnSyntax;


/***/ }),

/***/ "./node_modules/inversify/lib/syntax/binding_on_syntax.js":
/*!****************************************************************!*\
  !*** ./node_modules/inversify/lib/syntax/binding_on_syntax.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var binding_when_syntax_1 = __webpack_require__(/*! ./binding_when_syntax */ "./node_modules/inversify/lib/syntax/binding_when_syntax.js");
var BindingOnSyntax = (function () {
    function BindingOnSyntax(binding) {
        this._binding = binding;
    }
    BindingOnSyntax.prototype.onActivation = function (handler) {
        this._binding.onActivation = handler;
        return new binding_when_syntax_1.BindingWhenSyntax(this._binding);
    };
    return BindingOnSyntax;
}());
exports.BindingOnSyntax = BindingOnSyntax;


/***/ }),

/***/ "./node_modules/inversify/lib/syntax/binding_to_syntax.js":
/*!****************************************************************!*\
  !*** ./node_modules/inversify/lib/syntax/binding_to_syntax.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ERROR_MSGS = __webpack_require__(/*! ../constants/error_msgs */ "./node_modules/inversify/lib/constants/error_msgs.js");
var literal_types_1 = __webpack_require__(/*! ../constants/literal_types */ "./node_modules/inversify/lib/constants/literal_types.js");
var binding_in_when_on_syntax_1 = __webpack_require__(/*! ./binding_in_when_on_syntax */ "./node_modules/inversify/lib/syntax/binding_in_when_on_syntax.js");
var binding_when_on_syntax_1 = __webpack_require__(/*! ./binding_when_on_syntax */ "./node_modules/inversify/lib/syntax/binding_when_on_syntax.js");
var BindingToSyntax = (function () {
    function BindingToSyntax(binding) {
        this._binding = binding;
    }
    BindingToSyntax.prototype.to = function (constructor) {
        this._binding.type = literal_types_1.BindingTypeEnum.Instance;
        this._binding.implementationType = constructor;
        return new binding_in_when_on_syntax_1.BindingInWhenOnSyntax(this._binding);
    };
    BindingToSyntax.prototype.toSelf = function () {
        if (typeof this._binding.serviceIdentifier !== "function") {
            throw new Error("" + ERROR_MSGS.INVALID_TO_SELF_VALUE);
        }
        var self = this._binding.serviceIdentifier;
        return this.to(self);
    };
    BindingToSyntax.prototype.toConstantValue = function (value) {
        this._binding.type = literal_types_1.BindingTypeEnum.ConstantValue;
        this._binding.cache = value;
        this._binding.dynamicValue = null;
        this._binding.implementationType = null;
        return new binding_when_on_syntax_1.BindingWhenOnSyntax(this._binding);
    };
    BindingToSyntax.prototype.toDynamicValue = function (func) {
        this._binding.type = literal_types_1.BindingTypeEnum.DynamicValue;
        this._binding.cache = null;
        this._binding.dynamicValue = func;
        this._binding.implementationType = null;
        return new binding_in_when_on_syntax_1.BindingInWhenOnSyntax(this._binding);
    };
    BindingToSyntax.prototype.toConstructor = function (constructor) {
        this._binding.type = literal_types_1.BindingTypeEnum.Constructor;
        this._binding.implementationType = constructor;
        return new binding_when_on_syntax_1.BindingWhenOnSyntax(this._binding);
    };
    BindingToSyntax.prototype.toFactory = function (factory) {
        this._binding.type = literal_types_1.BindingTypeEnum.Factory;
        this._binding.factory = factory;
        return new binding_when_on_syntax_1.BindingWhenOnSyntax(this._binding);
    };
    BindingToSyntax.prototype.toFunction = function (func) {
        if (typeof func !== "function") {
            throw new Error(ERROR_MSGS.INVALID_FUNCTION_BINDING);
        }
        var bindingWhenOnSyntax = this.toConstantValue(func);
        this._binding.type = literal_types_1.BindingTypeEnum.Function;
        return bindingWhenOnSyntax;
    };
    BindingToSyntax.prototype.toAutoFactory = function (serviceIdentifier) {
        this._binding.type = literal_types_1.BindingTypeEnum.Factory;
        this._binding.factory = function (context) {
            var autofactory = function () { return context.container.get(serviceIdentifier); };
            return autofactory;
        };
        return new binding_when_on_syntax_1.BindingWhenOnSyntax(this._binding);
    };
    BindingToSyntax.prototype.toProvider = function (provider) {
        this._binding.type = literal_types_1.BindingTypeEnum.Provider;
        this._binding.provider = provider;
        return new binding_when_on_syntax_1.BindingWhenOnSyntax(this._binding);
    };
    BindingToSyntax.prototype.toService = function (service) {
        this.toDynamicValue(function (context) { return context.container.get(service); });
    };
    return BindingToSyntax;
}());
exports.BindingToSyntax = BindingToSyntax;


/***/ }),

/***/ "./node_modules/inversify/lib/syntax/binding_when_on_syntax.js":
/*!*********************************************************************!*\
  !*** ./node_modules/inversify/lib/syntax/binding_when_on_syntax.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var binding_on_syntax_1 = __webpack_require__(/*! ./binding_on_syntax */ "./node_modules/inversify/lib/syntax/binding_on_syntax.js");
var binding_when_syntax_1 = __webpack_require__(/*! ./binding_when_syntax */ "./node_modules/inversify/lib/syntax/binding_when_syntax.js");
var BindingWhenOnSyntax = (function () {
    function BindingWhenOnSyntax(binding) {
        this._binding = binding;
        this._bindingWhenSyntax = new binding_when_syntax_1.BindingWhenSyntax(this._binding);
        this._bindingOnSyntax = new binding_on_syntax_1.BindingOnSyntax(this._binding);
    }
    BindingWhenOnSyntax.prototype.when = function (constraint) {
        return this._bindingWhenSyntax.when(constraint);
    };
    BindingWhenOnSyntax.prototype.whenTargetNamed = function (name) {
        return this._bindingWhenSyntax.whenTargetNamed(name);
    };
    BindingWhenOnSyntax.prototype.whenTargetIsDefault = function () {
        return this._bindingWhenSyntax.whenTargetIsDefault();
    };
    BindingWhenOnSyntax.prototype.whenTargetTagged = function (tag, value) {
        return this._bindingWhenSyntax.whenTargetTagged(tag, value);
    };
    BindingWhenOnSyntax.prototype.whenInjectedInto = function (parent) {
        return this._bindingWhenSyntax.whenInjectedInto(parent);
    };
    BindingWhenOnSyntax.prototype.whenParentNamed = function (name) {
        return this._bindingWhenSyntax.whenParentNamed(name);
    };
    BindingWhenOnSyntax.prototype.whenParentTagged = function (tag, value) {
        return this._bindingWhenSyntax.whenParentTagged(tag, value);
    };
    BindingWhenOnSyntax.prototype.whenAnyAncestorIs = function (ancestor) {
        return this._bindingWhenSyntax.whenAnyAncestorIs(ancestor);
    };
    BindingWhenOnSyntax.prototype.whenNoAncestorIs = function (ancestor) {
        return this._bindingWhenSyntax.whenNoAncestorIs(ancestor);
    };
    BindingWhenOnSyntax.prototype.whenAnyAncestorNamed = function (name) {
        return this._bindingWhenSyntax.whenAnyAncestorNamed(name);
    };
    BindingWhenOnSyntax.prototype.whenAnyAncestorTagged = function (tag, value) {
        return this._bindingWhenSyntax.whenAnyAncestorTagged(tag, value);
    };
    BindingWhenOnSyntax.prototype.whenNoAncestorNamed = function (name) {
        return this._bindingWhenSyntax.whenNoAncestorNamed(name);
    };
    BindingWhenOnSyntax.prototype.whenNoAncestorTagged = function (tag, value) {
        return this._bindingWhenSyntax.whenNoAncestorTagged(tag, value);
    };
    BindingWhenOnSyntax.prototype.whenAnyAncestorMatches = function (constraint) {
        return this._bindingWhenSyntax.whenAnyAncestorMatches(constraint);
    };
    BindingWhenOnSyntax.prototype.whenNoAncestorMatches = function (constraint) {
        return this._bindingWhenSyntax.whenNoAncestorMatches(constraint);
    };
    BindingWhenOnSyntax.prototype.onActivation = function (handler) {
        return this._bindingOnSyntax.onActivation(handler);
    };
    return BindingWhenOnSyntax;
}());
exports.BindingWhenOnSyntax = BindingWhenOnSyntax;


/***/ }),

/***/ "./node_modules/inversify/lib/syntax/binding_when_syntax.js":
/*!******************************************************************!*\
  !*** ./node_modules/inversify/lib/syntax/binding_when_syntax.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var binding_on_syntax_1 = __webpack_require__(/*! ./binding_on_syntax */ "./node_modules/inversify/lib/syntax/binding_on_syntax.js");
var constraint_helpers_1 = __webpack_require__(/*! ./constraint_helpers */ "./node_modules/inversify/lib/syntax/constraint_helpers.js");
var BindingWhenSyntax = (function () {
    function BindingWhenSyntax(binding) {
        this._binding = binding;
    }
    BindingWhenSyntax.prototype.when = function (constraint) {
        this._binding.constraint = constraint;
        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
    };
    BindingWhenSyntax.prototype.whenTargetNamed = function (name) {
        this._binding.constraint = constraint_helpers_1.namedConstraint(name);
        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
    };
    BindingWhenSyntax.prototype.whenTargetIsDefault = function () {
        this._binding.constraint = function (request) {
            var targetIsDefault = (request.target !== null) &&
                (!request.target.isNamed()) &&
                (!request.target.isTagged());
            return targetIsDefault;
        };
        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
    };
    BindingWhenSyntax.prototype.whenTargetTagged = function (tag, value) {
        this._binding.constraint = constraint_helpers_1.taggedConstraint(tag)(value);
        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
    };
    BindingWhenSyntax.prototype.whenInjectedInto = function (parent) {
        this._binding.constraint = function (request) {
            return constraint_helpers_1.typeConstraint(parent)(request.parentRequest);
        };
        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
    };
    BindingWhenSyntax.prototype.whenParentNamed = function (name) {
        this._binding.constraint = function (request) {
            return constraint_helpers_1.namedConstraint(name)(request.parentRequest);
        };
        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
    };
    BindingWhenSyntax.prototype.whenParentTagged = function (tag, value) {
        this._binding.constraint = function (request) {
            return constraint_helpers_1.taggedConstraint(tag)(value)(request.parentRequest);
        };
        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
    };
    BindingWhenSyntax.prototype.whenAnyAncestorIs = function (ancestor) {
        this._binding.constraint = function (request) {
            return constraint_helpers_1.traverseAncerstors(request, constraint_helpers_1.typeConstraint(ancestor));
        };
        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
    };
    BindingWhenSyntax.prototype.whenNoAncestorIs = function (ancestor) {
        this._binding.constraint = function (request) {
            return !constraint_helpers_1.traverseAncerstors(request, constraint_helpers_1.typeConstraint(ancestor));
        };
        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
    };
    BindingWhenSyntax.prototype.whenAnyAncestorNamed = function (name) {
        this._binding.constraint = function (request) {
            return constraint_helpers_1.traverseAncerstors(request, constraint_helpers_1.namedConstraint(name));
        };
        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
    };
    BindingWhenSyntax.prototype.whenNoAncestorNamed = function (name) {
        this._binding.constraint = function (request) {
            return !constraint_helpers_1.traverseAncerstors(request, constraint_helpers_1.namedConstraint(name));
        };
        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
    };
    BindingWhenSyntax.prototype.whenAnyAncestorTagged = function (tag, value) {
        this._binding.constraint = function (request) {
            return constraint_helpers_1.traverseAncerstors(request, constraint_helpers_1.taggedConstraint(tag)(value));
        };
        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
    };
    BindingWhenSyntax.prototype.whenNoAncestorTagged = function (tag, value) {
        this._binding.constraint = function (request) {
            return !constraint_helpers_1.traverseAncerstors(request, constraint_helpers_1.taggedConstraint(tag)(value));
        };
        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
    };
    BindingWhenSyntax.prototype.whenAnyAncestorMatches = function (constraint) {
        this._binding.constraint = function (request) {
            return constraint_helpers_1.traverseAncerstors(request, constraint);
        };
        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
    };
    BindingWhenSyntax.prototype.whenNoAncestorMatches = function (constraint) {
        this._binding.constraint = function (request) {
            return !constraint_helpers_1.traverseAncerstors(request, constraint);
        };
        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
    };
    return BindingWhenSyntax;
}());
exports.BindingWhenSyntax = BindingWhenSyntax;


/***/ }),

/***/ "./node_modules/inversify/lib/syntax/constraint_helpers.js":
/*!*****************************************************************!*\
  !*** ./node_modules/inversify/lib/syntax/constraint_helpers.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var METADATA_KEY = __webpack_require__(/*! ../constants/metadata_keys */ "./node_modules/inversify/lib/constants/metadata_keys.js");
var metadata_1 = __webpack_require__(/*! ../planning/metadata */ "./node_modules/inversify/lib/planning/metadata.js");
var traverseAncerstors = function (request, constraint) {
    var parent = request.parentRequest;
    if (parent !== null) {
        return constraint(parent) ? true : traverseAncerstors(parent, constraint);
    }
    else {
        return false;
    }
};
exports.traverseAncerstors = traverseAncerstors;
var taggedConstraint = function (key) { return function (value) {
    var constraint = function (request) {
        return request !== null && request.target !== null && request.target.matchesTag(key)(value);
    };
    constraint.metaData = new metadata_1.Metadata(key, value);
    return constraint;
}; };
exports.taggedConstraint = taggedConstraint;
var namedConstraint = taggedConstraint(METADATA_KEY.NAMED_TAG);
exports.namedConstraint = namedConstraint;
var typeConstraint = function (type) { return function (request) {
    var binding = null;
    if (request !== null) {
        binding = request.bindings[0];
        if (typeof type === "string") {
            var serviceIdentifier = binding.serviceIdentifier;
            return serviceIdentifier === type;
        }
        else {
            var constructor = request.bindings[0].implementationType;
            return type === constructor;
        }
    }
    return false;
}; };
exports.typeConstraint = typeConstraint;


/***/ }),

/***/ "./node_modules/inversify/lib/utils/binding_utils.js":
/*!***********************************************************!*\
  !*** ./node_modules/inversify/lib/utils/binding_utils.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.multiBindToService = function (container) {
    return function (service) {
        return function () {
            var types = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                types[_i] = arguments[_i];
            }
            return types.forEach(function (t) { return container.bind(t).toService(service); });
        };
    };
};


/***/ }),

/***/ "./node_modules/inversify/lib/utils/exceptions.js":
/*!********************************************************!*\
  !*** ./node_modules/inversify/lib/utils/exceptions.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ERROR_MSGS = __webpack_require__(/*! ../constants/error_msgs */ "./node_modules/inversify/lib/constants/error_msgs.js");
function isStackOverflowExeption(error) {
    return (error instanceof RangeError ||
        error.message === ERROR_MSGS.STACK_OVERFLOW);
}
exports.isStackOverflowExeption = isStackOverflowExeption;


/***/ }),

/***/ "./node_modules/inversify/lib/utils/id.js":
/*!************************************************!*\
  !*** ./node_modules/inversify/lib/utils/id.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var idCounter = 0;
function id() {
    return idCounter++;
}
exports.id = id;


/***/ }),

/***/ "./node_modules/inversify/lib/utils/serialization.js":
/*!***********************************************************!*\
  !*** ./node_modules/inversify/lib/utils/serialization.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ERROR_MSGS = __webpack_require__(/*! ../constants/error_msgs */ "./node_modules/inversify/lib/constants/error_msgs.js");
function getServiceIdentifierAsString(serviceIdentifier) {
    if (typeof serviceIdentifier === "function") {
        var _serviceIdentifier = serviceIdentifier;
        return _serviceIdentifier.name;
    }
    else if (typeof serviceIdentifier === "symbol") {
        return serviceIdentifier.toString();
    }
    else {
        var _serviceIdentifier = serviceIdentifier;
        return _serviceIdentifier;
    }
}
exports.getServiceIdentifierAsString = getServiceIdentifierAsString;
function listRegisteredBindingsForServiceIdentifier(container, serviceIdentifier, getBindings) {
    var registeredBindingsList = "";
    var registeredBindings = getBindings(container, serviceIdentifier);
    if (registeredBindings.length !== 0) {
        registeredBindingsList = "\nRegistered bindings:";
        registeredBindings.forEach(function (binding) {
            var name = "Object";
            if (binding.implementationType !== null) {
                name = getFunctionName(binding.implementationType);
            }
            registeredBindingsList = registeredBindingsList + "\n " + name;
            if (binding.constraint.metaData) {
                registeredBindingsList = registeredBindingsList + " - " + binding.constraint.metaData;
            }
        });
    }
    return registeredBindingsList;
}
exports.listRegisteredBindingsForServiceIdentifier = listRegisteredBindingsForServiceIdentifier;
function alreadyDependencyChain(request, serviceIdentifier) {
    if (request.parentRequest === null) {
        return false;
    }
    else if (request.parentRequest.serviceIdentifier === serviceIdentifier) {
        return true;
    }
    else {
        return alreadyDependencyChain(request.parentRequest, serviceIdentifier);
    }
}
function dependencyChainToString(request) {
    function _createStringArr(req, result) {
        if (result === void 0) { result = []; }
        var serviceIdentifier = getServiceIdentifierAsString(req.serviceIdentifier);
        result.push(serviceIdentifier);
        if (req.parentRequest !== null) {
            return _createStringArr(req.parentRequest, result);
        }
        return result;
    }
    var stringArr = _createStringArr(request);
    return stringArr.reverse().join(" --> ");
}
function circularDependencyToException(request) {
    request.childRequests.forEach(function (childRequest) {
        if (alreadyDependencyChain(childRequest, childRequest.serviceIdentifier)) {
            var services = dependencyChainToString(childRequest);
            throw new Error(ERROR_MSGS.CIRCULAR_DEPENDENCY + " " + services);
        }
        else {
            circularDependencyToException(childRequest);
        }
    });
}
exports.circularDependencyToException = circularDependencyToException;
function listMetadataForTarget(serviceIdentifierString, target) {
    if (target.isTagged() || target.isNamed()) {
        var m_1 = "";
        var namedTag = target.getNamedTag();
        var otherTags = target.getCustomTags();
        if (namedTag !== null) {
            m_1 += namedTag.toString() + "\n";
        }
        if (otherTags !== null) {
            otherTags.forEach(function (tag) {
                m_1 += tag.toString() + "\n";
            });
        }
        return " " + serviceIdentifierString + "\n " + serviceIdentifierString + " - " + m_1;
    }
    else {
        return " " + serviceIdentifierString;
    }
}
exports.listMetadataForTarget = listMetadataForTarget;
function getFunctionName(v) {
    if (v.name) {
        return v.name;
    }
    else {
        var name_1 = v.toString();
        var match = name_1.match(/^function\s*([^\s(]+)/);
        return match ? match[1] : "Anonymous function: " + name_1;
    }
}
exports.getFunctionName = getFunctionName;


/***/ }),

/***/ "./node_modules/is-buffer/index.js":
/*!*****************************************!*\
  !*** ./node_modules/is-buffer/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}


/***/ }),

/***/ "./node_modules/navigo/lib/navigo.min.js":
/*!***********************************************!*\
  !*** ./node_modules/navigo/lib/navigo.min.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!function(e,t){ true?module.exports=t():undefined}(this,function(){"use strict";var e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};function t(){return!("undefined"==typeof window||!window.history||!window.history.pushState)}function n(e,n,o){this.root=null,this._routes=[],this._useHash=n,this._hash=void 0===o?"#":o,this._paused=!1,this._destroyed=!1,this._lastRouteResolved=null,this._notFoundHandler=null,this._defaultHandler=null,this._usePushState=!n&&t(),this._onLocationChange=this._onLocationChange.bind(this),this._genericHooks=null,this._historyAPIUpdateMethod="pushState",e?this.root=n?e.replace(/\/$/,"/"+this._hash):e.replace(/\/$/,""):n&&(this.root=this._cLoc().split(this._hash)[0].replace(/\/$/,"/"+this._hash)),this._listen(),this.updatePageLinks()}function o(e){return e instanceof RegExp?e:e.replace(/\/+$/,"").replace(/^\/+/,"^/")}function i(e){return e.replace(/\/$/,"").split("/").length}function s(e,t){return i(t)-i(e)}function r(e,t){return function(e){return(arguments.length>1&&void 0!==arguments[1]?arguments[1]:[]).map(function(t){var i=function(e){var t=[];return{regexp:e instanceof RegExp?e:new RegExp(e.replace(n.PARAMETER_REGEXP,function(e,o,i){return t.push(i),n.REPLACE_VARIABLE_REGEXP}).replace(n.WILDCARD_REGEXP,n.REPLACE_WILDCARD)+n.FOLLOWED_BY_SLASH_REGEXP,n.MATCH_REGEXP_FLAGS),paramNames:t}}(o(t.route)),s=i.regexp,r=i.paramNames,a=e.replace(/^\/+/,"/").match(s),h=function(e,t){return 0===t.length?null:e?e.slice(1,e.length).reduce(function(e,n,o){return null===e&&(e={}),e[t[o]]=decodeURIComponent(n),e},null):null}(a,r);return!!a&&{match:a,route:t,params:h}}).filter(function(e){return e})}(e,t)[0]||!1}function a(e,t){var n=t.map(function(t){return""===t.route||"*"===t.route?e:e.split(new RegExp(t.route+"($|/)"))[0]}),i=o(e);return n.length>1?n.reduce(function(e,t){return e.length>t.length&&(e=t),e},n[0]):1===n.length?n[0]:i}function h(e,n,o){var i,s=function(e){return e.split(/\?(.*)?$/)[0]};return void 0===o&&(o="#"),t()&&!n?s(e).split(o)[0]:(i=e.split(o)).length>1?s(i[1]):s(i[0])}function u(t,n,o){if(n&&"object"===(void 0===n?"undefined":e(n))){if(n.before)return void n.before(function(){(!(arguments.length>0&&void 0!==arguments[0])||arguments[0])&&(t(),n.after&&n.after(o))},o);if(n.after)return t(),void(n.after&&n.after(o))}t()}return n.prototype={helpers:{match:r,root:a,clean:o,getOnlyURL:h},navigate:function(e,t){var n;return e=e||"",this._usePushState?(n=(n=(t?"":this._getRoot()+"/")+e.replace(/^\/+/,"/")).replace(/([^:])(\/{2,})/g,"$1/"),history[this._historyAPIUpdateMethod]({},"",n),this.resolve()):"undefined"!=typeof window&&(e=e.replace(new RegExp("^"+this._hash),""),window.location.href=window.location.href.replace(/#$/,"").replace(new RegExp(this._hash+".*$"),"")+this._hash+e),this},on:function(){for(var t=this,n=arguments.length,o=Array(n),i=0;i<n;i++)o[i]=arguments[i];if("function"==typeof o[0])this._defaultHandler={handler:o[0],hooks:o[1]};else if(o.length>=2)if("/"===o[0]){var r=o[1];"object"===e(o[1])&&(r=o[1].uses),this._defaultHandler={handler:r,hooks:o[2]}}else this._add(o[0],o[1],o[2]);else"object"===e(o[0])&&Object.keys(o[0]).sort(s).forEach(function(e){t.on(e,o[0][e])});return this},off:function(e){return null!==this._defaultHandler&&e===this._defaultHandler.handler?this._defaultHandler=null:null!==this._notFoundHandler&&e===this._notFoundHandler.handler&&(this._notFoundHandler=null),this._routes=this._routes.reduce(function(t,n){return n.handler!==e&&t.push(n),t},[]),this},notFound:function(e,t){return this._notFoundHandler={handler:e,hooks:t},this},resolve:function(e){var n,o,i=this,s=(e||this._cLoc()).replace(this._getRoot(),"");this._useHash&&(s=s.replace(new RegExp("^/"+this._hash),"/"));var a=function(e){return e.split(/\?(.*)?$/).slice(1).join("")}(e||this._cLoc()),l=h(s,this._useHash,this._hash);return!this._paused&&(this._lastRouteResolved&&l===this._lastRouteResolved.url&&a===this._lastRouteResolved.query?(this._lastRouteResolved.hooks&&this._lastRouteResolved.hooks.already&&this._lastRouteResolved.hooks.already(this._lastRouteResolved.params),!1):(o=r(l,this._routes))?(this._callLeave(),this._lastRouteResolved={url:l,query:a,hooks:o.route.hooks,params:o.params,name:o.route.name},n=o.route.handler,u(function(){u(function(){o.route.route instanceof RegExp?n.apply(void 0,o.match.slice(1,o.match.length)):n(o.params,a)},o.route.hooks,o.params,i._genericHooks)},this._genericHooks,o.params),o):this._defaultHandler&&(""===l||"/"===l||l===this._hash||function(e,n,o){if(t()&&!n)return!1;if(!e.match(o))return!1;var i=e.split(o);return i.length<2||""===i[1]}(l,this._useHash,this._hash))?(u(function(){u(function(){i._callLeave(),i._lastRouteResolved={url:l,query:a,hooks:i._defaultHandler.hooks},i._defaultHandler.handler(a)},i._defaultHandler.hooks)},this._genericHooks),!0):(this._notFoundHandler&&u(function(){u(function(){i._callLeave(),i._lastRouteResolved={url:l,query:a,hooks:i._notFoundHandler.hooks},i._notFoundHandler.handler(a)},i._notFoundHandler.hooks)},this._genericHooks),!1))},destroy:function(){this._routes=[],this._destroyed=!0,this._lastRouteResolved=null,this._genericHooks=null,clearTimeout(this._listeningInterval),"undefined"!=typeof window&&(window.removeEventListener("popstate",this._onLocationChange),window.removeEventListener("hashchange",this._onLocationChange))},updatePageLinks:function(){var e=this;"undefined"!=typeof document&&this._findLinks().forEach(function(t){t.hasListenerAttached||(t.addEventListener("click",function(n){if((n.ctrlKey||n.metaKey)&&"a"==n.target.tagName.toLowerCase())return!1;var o=e.getLinkPath(t);e._destroyed||(n.preventDefault(),e.navigate(o.replace(/\/+$/,"").replace(/^\/+/,"/")))}),t.hasListenerAttached=!0)})},generate:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=this._routes.reduce(function(n,o){var i;if(o.name===e)for(i in n=o.route,t)n=n.toString().replace(":"+i,t[i]);return n},"");return this._useHash?this._hash+n:n},link:function(e){return this._getRoot()+e},pause:function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];this._paused=e,this._historyAPIUpdateMethod=e?"replaceState":"pushState"},resume:function(){this.pause(!1)},historyAPIUpdateMethod:function(e){return void 0===e?this._historyAPIUpdateMethod:(this._historyAPIUpdateMethod=e,e)},disableIfAPINotAvailable:function(){t()||this.destroy()},lastRouteResolved:function(){return this._lastRouteResolved},getLinkPath:function(e){return e.getAttribute("href")},hooks:function(e){this._genericHooks=e},_add:function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;return"string"==typeof t&&(t=encodeURI(t)),this._routes.push("object"===(void 0===n?"undefined":e(n))?{route:t,handler:n.uses,name:n.as,hooks:o||n.hooks}:{route:t,handler:n,hooks:o}),this._add},_getRoot:function(){return null!==this.root?this.root:(this.root=a(this._cLoc().split("?")[0],this._routes),this.root)},_listen:function(){var e=this;if(this._usePushState)window.addEventListener("popstate",this._onLocationChange);else if("undefined"!=typeof window&&"onhashchange"in window)window.addEventListener("hashchange",this._onLocationChange);else{var t=this._cLoc(),n=void 0,o=void 0;(o=function(){n=e._cLoc(),t!==n&&(t=n,e.resolve()),e._listeningInterval=setTimeout(o,200)})()}},_cLoc:function(){return"undefined"!=typeof window?void 0!==window.__NAVIGO_WINDOW_LOCATION_MOCK__?window.__NAVIGO_WINDOW_LOCATION_MOCK__:o(window.location.href):""},_findLinks:function(){return[].slice.call(document.querySelectorAll("[data-navigo]"))},_onLocationChange:function(){this.resolve()},_callLeave:function(){var e=this._lastRouteResolved;e&&e.hooks&&e.hooks.leave&&e.hooks.leave(e.params)}},n.PARAMETER_REGEXP=/([:*])(\w+)/g,n.WILDCARD_REGEXP=/\*/g,n.REPLACE_VARIABLE_REGEXP="([^/]+)",n.REPLACE_WILDCARD="(?:.*)",n.FOLLOWED_BY_SLASH_REGEXP="(?:/$|$)",n.MATCH_REGEXP_FLAGS="",n});
//# sourceMappingURL=navigo.min.js.map


/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/reflect-metadata/Reflect.js":
/*!**************************************************!*\
  !*** ./node_modules/reflect-metadata/Reflect.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process, global) {/*! *****************************************************************************
Copyright (C) Microsoft. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
var Reflect;
(function (Reflect) {
    // Metadata Proposal
    // https://rbuckton.github.io/reflect-metadata/
    (function (factory) {
        var root = typeof global === "object" ? global :
            typeof self === "object" ? self :
                typeof this === "object" ? this :
                    Function("return this;")();
        var exporter = makeExporter(Reflect);
        if (typeof root.Reflect === "undefined") {
            root.Reflect = Reflect;
        }
        else {
            exporter = makeExporter(root.Reflect, exporter);
        }
        factory(exporter);
        function makeExporter(target, previous) {
            return function (key, value) {
                if (typeof target[key] !== "function") {
                    Object.defineProperty(target, key, { configurable: true, writable: true, value: value });
                }
                if (previous)
                    previous(key, value);
            };
        }
    })(function (exporter) {
        var hasOwn = Object.prototype.hasOwnProperty;
        // feature test for Symbol support
        var supportsSymbol = typeof Symbol === "function";
        var toPrimitiveSymbol = supportsSymbol && typeof Symbol.toPrimitive !== "undefined" ? Symbol.toPrimitive : "@@toPrimitive";
        var iteratorSymbol = supportsSymbol && typeof Symbol.iterator !== "undefined" ? Symbol.iterator : "@@iterator";
        var supportsCreate = typeof Object.create === "function"; // feature test for Object.create support
        var supportsProto = { __proto__: [] } instanceof Array; // feature test for __proto__ support
        var downLevel = !supportsCreate && !supportsProto;
        var HashMap = {
            // create an object in dictionary mode (a.k.a. "slow" mode in v8)
            create: supportsCreate
                ? function () { return MakeDictionary(Object.create(null)); }
                : supportsProto
                    ? function () { return MakeDictionary({ __proto__: null }); }
                    : function () { return MakeDictionary({}); },
            has: downLevel
                ? function (map, key) { return hasOwn.call(map, key); }
                : function (map, key) { return key in map; },
            get: downLevel
                ? function (map, key) { return hasOwn.call(map, key) ? map[key] : undefined; }
                : function (map, key) { return map[key]; },
        };
        // Load global or shim versions of Map, Set, and WeakMap
        var functionPrototype = Object.getPrototypeOf(Function);
        var usePolyfill = typeof process === "object" && process.env && process.env["REFLECT_METADATA_USE_MAP_POLYFILL"] === "true";
        var _Map = !usePolyfill && typeof Map === "function" && typeof Map.prototype.entries === "function" ? Map : CreateMapPolyfill();
        var _Set = !usePolyfill && typeof Set === "function" && typeof Set.prototype.entries === "function" ? Set : CreateSetPolyfill();
        var _WeakMap = !usePolyfill && typeof WeakMap === "function" ? WeakMap : CreateWeakMapPolyfill();
        // [[Metadata]] internal slot
        // https://rbuckton.github.io/reflect-metadata/#ordinary-object-internal-methods-and-internal-slots
        var Metadata = new _WeakMap();
        /**
         * Applies a set of decorators to a property of a target object.
         * @param decorators An array of decorators.
         * @param target The target object.
         * @param propertyKey (Optional) The property key to decorate.
         * @param attributes (Optional) The property descriptor for the target key.
         * @remarks Decorators are applied in reverse order.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     Example = Reflect.decorate(decoratorsArray, Example);
         *
         *     // property (on constructor)
         *     Reflect.decorate(decoratorsArray, Example, "staticProperty");
         *
         *     // property (on prototype)
         *     Reflect.decorate(decoratorsArray, Example.prototype, "property");
         *
         *     // method (on constructor)
         *     Object.defineProperty(Example, "staticMethod",
         *         Reflect.decorate(decoratorsArray, Example, "staticMethod",
         *             Object.getOwnPropertyDescriptor(Example, "staticMethod")));
         *
         *     // method (on prototype)
         *     Object.defineProperty(Example.prototype, "method",
         *         Reflect.decorate(decoratorsArray, Example.prototype, "method",
         *             Object.getOwnPropertyDescriptor(Example.prototype, "method")));
         *
         */
        function decorate(decorators, target, propertyKey, attributes) {
            if (!IsUndefined(propertyKey)) {
                if (!IsArray(decorators))
                    throw new TypeError();
                if (!IsObject(target))
                    throw new TypeError();
                if (!IsObject(attributes) && !IsUndefined(attributes) && !IsNull(attributes))
                    throw new TypeError();
                if (IsNull(attributes))
                    attributes = undefined;
                propertyKey = ToPropertyKey(propertyKey);
                return DecorateProperty(decorators, target, propertyKey, attributes);
            }
            else {
                if (!IsArray(decorators))
                    throw new TypeError();
                if (!IsConstructor(target))
                    throw new TypeError();
                return DecorateConstructor(decorators, target);
            }
        }
        exporter("decorate", decorate);
        // 4.1.2 Reflect.metadata(metadataKey, metadataValue)
        // https://rbuckton.github.io/reflect-metadata/#reflect.metadata
        /**
         * A default metadata decorator factory that can be used on a class, class member, or parameter.
         * @param metadataKey The key for the metadata entry.
         * @param metadataValue The value for the metadata entry.
         * @returns A decorator function.
         * @remarks
         * If `metadataKey` is already defined for the target and target key, the
         * metadataValue for that key will be overwritten.
         * @example
         *
         *     // constructor
         *     @Reflect.metadata(key, value)
         *     class Example {
         *     }
         *
         *     // property (on constructor, TypeScript only)
         *     class Example {
         *         @Reflect.metadata(key, value)
         *         static staticProperty;
         *     }
         *
         *     // property (on prototype, TypeScript only)
         *     class Example {
         *         @Reflect.metadata(key, value)
         *         property;
         *     }
         *
         *     // method (on constructor)
         *     class Example {
         *         @Reflect.metadata(key, value)
         *         static staticMethod() { }
         *     }
         *
         *     // method (on prototype)
         *     class Example {
         *         @Reflect.metadata(key, value)
         *         method() { }
         *     }
         *
         */
        function metadata(metadataKey, metadataValue) {
            function decorator(target, propertyKey) {
                if (!IsObject(target))
                    throw new TypeError();
                if (!IsUndefined(propertyKey) && !IsPropertyKey(propertyKey))
                    throw new TypeError();
                OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
            }
            return decorator;
        }
        exporter("metadata", metadata);
        /**
         * Define a unique metadata entry on the target.
         * @param metadataKey A key used to store and retrieve metadata.
         * @param metadataValue A value that contains attached metadata.
         * @param target The target object on which to define metadata.
         * @param propertyKey (Optional) The property key for the target.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     Reflect.defineMetadata("custom:annotation", options, Example);
         *
         *     // property (on constructor)
         *     Reflect.defineMetadata("custom:annotation", options, Example, "staticProperty");
         *
         *     // property (on prototype)
         *     Reflect.defineMetadata("custom:annotation", options, Example.prototype, "property");
         *
         *     // method (on constructor)
         *     Reflect.defineMetadata("custom:annotation", options, Example, "staticMethod");
         *
         *     // method (on prototype)
         *     Reflect.defineMetadata("custom:annotation", options, Example.prototype, "method");
         *
         *     // decorator factory as metadata-producing annotation.
         *     function MyAnnotation(options): Decorator {
         *         return (target, key?) => Reflect.defineMetadata("custom:annotation", options, target, key);
         *     }
         *
         */
        function defineMetadata(metadataKey, metadataValue, target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey))
                propertyKey = ToPropertyKey(propertyKey);
            return OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
        }
        exporter("defineMetadata", defineMetadata);
        /**
         * Gets a value indicating whether the target object or its prototype chain has the provided metadata key defined.
         * @param metadataKey A key used to store and retrieve metadata.
         * @param target The target object on which the metadata is defined.
         * @param propertyKey (Optional) The property key for the target.
         * @returns `true` if the metadata key was defined on the target object or its prototype chain; otherwise, `false`.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     result = Reflect.hasMetadata("custom:annotation", Example);
         *
         *     // property (on constructor)
         *     result = Reflect.hasMetadata("custom:annotation", Example, "staticProperty");
         *
         *     // property (on prototype)
         *     result = Reflect.hasMetadata("custom:annotation", Example.prototype, "property");
         *
         *     // method (on constructor)
         *     result = Reflect.hasMetadata("custom:annotation", Example, "staticMethod");
         *
         *     // method (on prototype)
         *     result = Reflect.hasMetadata("custom:annotation", Example.prototype, "method");
         *
         */
        function hasMetadata(metadataKey, target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey))
                propertyKey = ToPropertyKey(propertyKey);
            return OrdinaryHasMetadata(metadataKey, target, propertyKey);
        }
        exporter("hasMetadata", hasMetadata);
        /**
         * Gets a value indicating whether the target object has the provided metadata key defined.
         * @param metadataKey A key used to store and retrieve metadata.
         * @param target The target object on which the metadata is defined.
         * @param propertyKey (Optional) The property key for the target.
         * @returns `true` if the metadata key was defined on the target object; otherwise, `false`.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     result = Reflect.hasOwnMetadata("custom:annotation", Example);
         *
         *     // property (on constructor)
         *     result = Reflect.hasOwnMetadata("custom:annotation", Example, "staticProperty");
         *
         *     // property (on prototype)
         *     result = Reflect.hasOwnMetadata("custom:annotation", Example.prototype, "property");
         *
         *     // method (on constructor)
         *     result = Reflect.hasOwnMetadata("custom:annotation", Example, "staticMethod");
         *
         *     // method (on prototype)
         *     result = Reflect.hasOwnMetadata("custom:annotation", Example.prototype, "method");
         *
         */
        function hasOwnMetadata(metadataKey, target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey))
                propertyKey = ToPropertyKey(propertyKey);
            return OrdinaryHasOwnMetadata(metadataKey, target, propertyKey);
        }
        exporter("hasOwnMetadata", hasOwnMetadata);
        /**
         * Gets the metadata value for the provided metadata key on the target object or its prototype chain.
         * @param metadataKey A key used to store and retrieve metadata.
         * @param target The target object on which the metadata is defined.
         * @param propertyKey (Optional) The property key for the target.
         * @returns The metadata value for the metadata key if found; otherwise, `undefined`.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     result = Reflect.getMetadata("custom:annotation", Example);
         *
         *     // property (on constructor)
         *     result = Reflect.getMetadata("custom:annotation", Example, "staticProperty");
         *
         *     // property (on prototype)
         *     result = Reflect.getMetadata("custom:annotation", Example.prototype, "property");
         *
         *     // method (on constructor)
         *     result = Reflect.getMetadata("custom:annotation", Example, "staticMethod");
         *
         *     // method (on prototype)
         *     result = Reflect.getMetadata("custom:annotation", Example.prototype, "method");
         *
         */
        function getMetadata(metadataKey, target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey))
                propertyKey = ToPropertyKey(propertyKey);
            return OrdinaryGetMetadata(metadataKey, target, propertyKey);
        }
        exporter("getMetadata", getMetadata);
        /**
         * Gets the metadata value for the provided metadata key on the target object.
         * @param metadataKey A key used to store and retrieve metadata.
         * @param target The target object on which the metadata is defined.
         * @param propertyKey (Optional) The property key for the target.
         * @returns The metadata value for the metadata key if found; otherwise, `undefined`.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     result = Reflect.getOwnMetadata("custom:annotation", Example);
         *
         *     // property (on constructor)
         *     result = Reflect.getOwnMetadata("custom:annotation", Example, "staticProperty");
         *
         *     // property (on prototype)
         *     result = Reflect.getOwnMetadata("custom:annotation", Example.prototype, "property");
         *
         *     // method (on constructor)
         *     result = Reflect.getOwnMetadata("custom:annotation", Example, "staticMethod");
         *
         *     // method (on prototype)
         *     result = Reflect.getOwnMetadata("custom:annotation", Example.prototype, "method");
         *
         */
        function getOwnMetadata(metadataKey, target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey))
                propertyKey = ToPropertyKey(propertyKey);
            return OrdinaryGetOwnMetadata(metadataKey, target, propertyKey);
        }
        exporter("getOwnMetadata", getOwnMetadata);
        /**
         * Gets the metadata keys defined on the target object or its prototype chain.
         * @param target The target object on which the metadata is defined.
         * @param propertyKey (Optional) The property key for the target.
         * @returns An array of unique metadata keys.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     result = Reflect.getMetadataKeys(Example);
         *
         *     // property (on constructor)
         *     result = Reflect.getMetadataKeys(Example, "staticProperty");
         *
         *     // property (on prototype)
         *     result = Reflect.getMetadataKeys(Example.prototype, "property");
         *
         *     // method (on constructor)
         *     result = Reflect.getMetadataKeys(Example, "staticMethod");
         *
         *     // method (on prototype)
         *     result = Reflect.getMetadataKeys(Example.prototype, "method");
         *
         */
        function getMetadataKeys(target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey))
                propertyKey = ToPropertyKey(propertyKey);
            return OrdinaryMetadataKeys(target, propertyKey);
        }
        exporter("getMetadataKeys", getMetadataKeys);
        /**
         * Gets the unique metadata keys defined on the target object.
         * @param target The target object on which the metadata is defined.
         * @param propertyKey (Optional) The property key for the target.
         * @returns An array of unique metadata keys.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     result = Reflect.getOwnMetadataKeys(Example);
         *
         *     // property (on constructor)
         *     result = Reflect.getOwnMetadataKeys(Example, "staticProperty");
         *
         *     // property (on prototype)
         *     result = Reflect.getOwnMetadataKeys(Example.prototype, "property");
         *
         *     // method (on constructor)
         *     result = Reflect.getOwnMetadataKeys(Example, "staticMethod");
         *
         *     // method (on prototype)
         *     result = Reflect.getOwnMetadataKeys(Example.prototype, "method");
         *
         */
        function getOwnMetadataKeys(target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey))
                propertyKey = ToPropertyKey(propertyKey);
            return OrdinaryOwnMetadataKeys(target, propertyKey);
        }
        exporter("getOwnMetadataKeys", getOwnMetadataKeys);
        /**
         * Deletes the metadata entry from the target object with the provided key.
         * @param metadataKey A key used to store and retrieve metadata.
         * @param target The target object on which the metadata is defined.
         * @param propertyKey (Optional) The property key for the target.
         * @returns `true` if the metadata entry was found and deleted; otherwise, false.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     result = Reflect.deleteMetadata("custom:annotation", Example);
         *
         *     // property (on constructor)
         *     result = Reflect.deleteMetadata("custom:annotation", Example, "staticProperty");
         *
         *     // property (on prototype)
         *     result = Reflect.deleteMetadata("custom:annotation", Example.prototype, "property");
         *
         *     // method (on constructor)
         *     result = Reflect.deleteMetadata("custom:annotation", Example, "staticMethod");
         *
         *     // method (on prototype)
         *     result = Reflect.deleteMetadata("custom:annotation", Example.prototype, "method");
         *
         */
        function deleteMetadata(metadataKey, target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey))
                propertyKey = ToPropertyKey(propertyKey);
            var metadataMap = GetOrCreateMetadataMap(target, propertyKey, /*Create*/ false);
            if (IsUndefined(metadataMap))
                return false;
            if (!metadataMap.delete(metadataKey))
                return false;
            if (metadataMap.size > 0)
                return true;
            var targetMetadata = Metadata.get(target);
            targetMetadata.delete(propertyKey);
            if (targetMetadata.size > 0)
                return true;
            Metadata.delete(target);
            return true;
        }
        exporter("deleteMetadata", deleteMetadata);
        function DecorateConstructor(decorators, target) {
            for (var i = decorators.length - 1; i >= 0; --i) {
                var decorator = decorators[i];
                var decorated = decorator(target);
                if (!IsUndefined(decorated) && !IsNull(decorated)) {
                    if (!IsConstructor(decorated))
                        throw new TypeError();
                    target = decorated;
                }
            }
            return target;
        }
        function DecorateProperty(decorators, target, propertyKey, descriptor) {
            for (var i = decorators.length - 1; i >= 0; --i) {
                var decorator = decorators[i];
                var decorated = decorator(target, propertyKey, descriptor);
                if (!IsUndefined(decorated) && !IsNull(decorated)) {
                    if (!IsObject(decorated))
                        throw new TypeError();
                    descriptor = decorated;
                }
            }
            return descriptor;
        }
        function GetOrCreateMetadataMap(O, P, Create) {
            var targetMetadata = Metadata.get(O);
            if (IsUndefined(targetMetadata)) {
                if (!Create)
                    return undefined;
                targetMetadata = new _Map();
                Metadata.set(O, targetMetadata);
            }
            var metadataMap = targetMetadata.get(P);
            if (IsUndefined(metadataMap)) {
                if (!Create)
                    return undefined;
                metadataMap = new _Map();
                targetMetadata.set(P, metadataMap);
            }
            return metadataMap;
        }
        // 3.1.1.1 OrdinaryHasMetadata(MetadataKey, O, P)
        // https://rbuckton.github.io/reflect-metadata/#ordinaryhasmetadata
        function OrdinaryHasMetadata(MetadataKey, O, P) {
            var hasOwn = OrdinaryHasOwnMetadata(MetadataKey, O, P);
            if (hasOwn)
                return true;
            var parent = OrdinaryGetPrototypeOf(O);
            if (!IsNull(parent))
                return OrdinaryHasMetadata(MetadataKey, parent, P);
            return false;
        }
        // 3.1.2.1 OrdinaryHasOwnMetadata(MetadataKey, O, P)
        // https://rbuckton.github.io/reflect-metadata/#ordinaryhasownmetadata
        function OrdinaryHasOwnMetadata(MetadataKey, O, P) {
            var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ false);
            if (IsUndefined(metadataMap))
                return false;
            return ToBoolean(metadataMap.has(MetadataKey));
        }
        // 3.1.3.1 OrdinaryGetMetadata(MetadataKey, O, P)
        // https://rbuckton.github.io/reflect-metadata/#ordinarygetmetadata
        function OrdinaryGetMetadata(MetadataKey, O, P) {
            var hasOwn = OrdinaryHasOwnMetadata(MetadataKey, O, P);
            if (hasOwn)
                return OrdinaryGetOwnMetadata(MetadataKey, O, P);
            var parent = OrdinaryGetPrototypeOf(O);
            if (!IsNull(parent))
                return OrdinaryGetMetadata(MetadataKey, parent, P);
            return undefined;
        }
        // 3.1.4.1 OrdinaryGetOwnMetadata(MetadataKey, O, P)
        // https://rbuckton.github.io/reflect-metadata/#ordinarygetownmetadata
        function OrdinaryGetOwnMetadata(MetadataKey, O, P) {
            var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ false);
            if (IsUndefined(metadataMap))
                return undefined;
            return metadataMap.get(MetadataKey);
        }
        // 3.1.5.1 OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P)
        // https://rbuckton.github.io/reflect-metadata/#ordinarydefineownmetadata
        function OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P) {
            var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ true);
            metadataMap.set(MetadataKey, MetadataValue);
        }
        // 3.1.6.1 OrdinaryMetadataKeys(O, P)
        // https://rbuckton.github.io/reflect-metadata/#ordinarymetadatakeys
        function OrdinaryMetadataKeys(O, P) {
            var ownKeys = OrdinaryOwnMetadataKeys(O, P);
            var parent = OrdinaryGetPrototypeOf(O);
            if (parent === null)
                return ownKeys;
            var parentKeys = OrdinaryMetadataKeys(parent, P);
            if (parentKeys.length <= 0)
                return ownKeys;
            if (ownKeys.length <= 0)
                return parentKeys;
            var set = new _Set();
            var keys = [];
            for (var _i = 0, ownKeys_1 = ownKeys; _i < ownKeys_1.length; _i++) {
                var key = ownKeys_1[_i];
                var hasKey = set.has(key);
                if (!hasKey) {
                    set.add(key);
                    keys.push(key);
                }
            }
            for (var _a = 0, parentKeys_1 = parentKeys; _a < parentKeys_1.length; _a++) {
                var key = parentKeys_1[_a];
                var hasKey = set.has(key);
                if (!hasKey) {
                    set.add(key);
                    keys.push(key);
                }
            }
            return keys;
        }
        // 3.1.7.1 OrdinaryOwnMetadataKeys(O, P)
        // https://rbuckton.github.io/reflect-metadata/#ordinaryownmetadatakeys
        function OrdinaryOwnMetadataKeys(O, P) {
            var keys = [];
            var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ false);
            if (IsUndefined(metadataMap))
                return keys;
            var keysObj = metadataMap.keys();
            var iterator = GetIterator(keysObj);
            var k = 0;
            while (true) {
                var next = IteratorStep(iterator);
                if (!next) {
                    keys.length = k;
                    return keys;
                }
                var nextValue = IteratorValue(next);
                try {
                    keys[k] = nextValue;
                }
                catch (e) {
                    try {
                        IteratorClose(iterator);
                    }
                    finally {
                        throw e;
                    }
                }
                k++;
            }
        }
        // 6 ECMAScript Data Typ0es and Values
        // https://tc39.github.io/ecma262/#sec-ecmascript-data-types-and-values
        function Type(x) {
            if (x === null)
                return 1 /* Null */;
            switch (typeof x) {
                case "undefined": return 0 /* Undefined */;
                case "boolean": return 2 /* Boolean */;
                case "string": return 3 /* String */;
                case "symbol": return 4 /* Symbol */;
                case "number": return 5 /* Number */;
                case "object": return x === null ? 1 /* Null */ : 6 /* Object */;
                default: return 6 /* Object */;
            }
        }
        // 6.1.1 The Undefined Type
        // https://tc39.github.io/ecma262/#sec-ecmascript-language-types-undefined-type
        function IsUndefined(x) {
            return x === undefined;
        }
        // 6.1.2 The Null Type
        // https://tc39.github.io/ecma262/#sec-ecmascript-language-types-null-type
        function IsNull(x) {
            return x === null;
        }
        // 6.1.5 The Symbol Type
        // https://tc39.github.io/ecma262/#sec-ecmascript-language-types-symbol-type
        function IsSymbol(x) {
            return typeof x === "symbol";
        }
        // 6.1.7 The Object Type
        // https://tc39.github.io/ecma262/#sec-object-type
        function IsObject(x) {
            return typeof x === "object" ? x !== null : typeof x === "function";
        }
        // 7.1 Type Conversion
        // https://tc39.github.io/ecma262/#sec-type-conversion
        // 7.1.1 ToPrimitive(input [, PreferredType])
        // https://tc39.github.io/ecma262/#sec-toprimitive
        function ToPrimitive(input, PreferredType) {
            switch (Type(input)) {
                case 0 /* Undefined */: return input;
                case 1 /* Null */: return input;
                case 2 /* Boolean */: return input;
                case 3 /* String */: return input;
                case 4 /* Symbol */: return input;
                case 5 /* Number */: return input;
            }
            var hint = PreferredType === 3 /* String */ ? "string" : PreferredType === 5 /* Number */ ? "number" : "default";
            var exoticToPrim = GetMethod(input, toPrimitiveSymbol);
            if (exoticToPrim !== undefined) {
                var result = exoticToPrim.call(input, hint);
                if (IsObject(result))
                    throw new TypeError();
                return result;
            }
            return OrdinaryToPrimitive(input, hint === "default" ? "number" : hint);
        }
        // 7.1.1.1 OrdinaryToPrimitive(O, hint)
        // https://tc39.github.io/ecma262/#sec-ordinarytoprimitive
        function OrdinaryToPrimitive(O, hint) {
            if (hint === "string") {
                var toString_1 = O.toString;
                if (IsCallable(toString_1)) {
                    var result = toString_1.call(O);
                    if (!IsObject(result))
                        return result;
                }
                var valueOf = O.valueOf;
                if (IsCallable(valueOf)) {
                    var result = valueOf.call(O);
                    if (!IsObject(result))
                        return result;
                }
            }
            else {
                var valueOf = O.valueOf;
                if (IsCallable(valueOf)) {
                    var result = valueOf.call(O);
                    if (!IsObject(result))
                        return result;
                }
                var toString_2 = O.toString;
                if (IsCallable(toString_2)) {
                    var result = toString_2.call(O);
                    if (!IsObject(result))
                        return result;
                }
            }
            throw new TypeError();
        }
        // 7.1.2 ToBoolean(argument)
        // https://tc39.github.io/ecma262/2016/#sec-toboolean
        function ToBoolean(argument) {
            return !!argument;
        }
        // 7.1.12 ToString(argument)
        // https://tc39.github.io/ecma262/#sec-tostring
        function ToString(argument) {
            return "" + argument;
        }
        // 7.1.14 ToPropertyKey(argument)
        // https://tc39.github.io/ecma262/#sec-topropertykey
        function ToPropertyKey(argument) {
            var key = ToPrimitive(argument, 3 /* String */);
            if (IsSymbol(key))
                return key;
            return ToString(key);
        }
        // 7.2 Testing and Comparison Operations
        // https://tc39.github.io/ecma262/#sec-testing-and-comparison-operations
        // 7.2.2 IsArray(argument)
        // https://tc39.github.io/ecma262/#sec-isarray
        function IsArray(argument) {
            return Array.isArray
                ? Array.isArray(argument)
                : argument instanceof Object
                    ? argument instanceof Array
                    : Object.prototype.toString.call(argument) === "[object Array]";
        }
        // 7.2.3 IsCallable(argument)
        // https://tc39.github.io/ecma262/#sec-iscallable
        function IsCallable(argument) {
            // NOTE: This is an approximation as we cannot check for [[Call]] internal method.
            return typeof argument === "function";
        }
        // 7.2.4 IsConstructor(argument)
        // https://tc39.github.io/ecma262/#sec-isconstructor
        function IsConstructor(argument) {
            // NOTE: This is an approximation as we cannot check for [[Construct]] internal method.
            return typeof argument === "function";
        }
        // 7.2.7 IsPropertyKey(argument)
        // https://tc39.github.io/ecma262/#sec-ispropertykey
        function IsPropertyKey(argument) {
            switch (Type(argument)) {
                case 3 /* String */: return true;
                case 4 /* Symbol */: return true;
                default: return false;
            }
        }
        // 7.3 Operations on Objects
        // https://tc39.github.io/ecma262/#sec-operations-on-objects
        // 7.3.9 GetMethod(V, P)
        // https://tc39.github.io/ecma262/#sec-getmethod
        function GetMethod(V, P) {
            var func = V[P];
            if (func === undefined || func === null)
                return undefined;
            if (!IsCallable(func))
                throw new TypeError();
            return func;
        }
        // 7.4 Operations on Iterator Objects
        // https://tc39.github.io/ecma262/#sec-operations-on-iterator-objects
        function GetIterator(obj) {
            var method = GetMethod(obj, iteratorSymbol);
            if (!IsCallable(method))
                throw new TypeError(); // from Call
            var iterator = method.call(obj);
            if (!IsObject(iterator))
                throw new TypeError();
            return iterator;
        }
        // 7.4.4 IteratorValue(iterResult)
        // https://tc39.github.io/ecma262/2016/#sec-iteratorvalue
        function IteratorValue(iterResult) {
            return iterResult.value;
        }
        // 7.4.5 IteratorStep(iterator)
        // https://tc39.github.io/ecma262/#sec-iteratorstep
        function IteratorStep(iterator) {
            var result = iterator.next();
            return result.done ? false : result;
        }
        // 7.4.6 IteratorClose(iterator, completion)
        // https://tc39.github.io/ecma262/#sec-iteratorclose
        function IteratorClose(iterator) {
            var f = iterator["return"];
            if (f)
                f.call(iterator);
        }
        // 9.1 Ordinary Object Internal Methods and Internal Slots
        // https://tc39.github.io/ecma262/#sec-ordinary-object-internal-methods-and-internal-slots
        // 9.1.1.1 OrdinaryGetPrototypeOf(O)
        // https://tc39.github.io/ecma262/#sec-ordinarygetprototypeof
        function OrdinaryGetPrototypeOf(O) {
            var proto = Object.getPrototypeOf(O);
            if (typeof O !== "function" || O === functionPrototype)
                return proto;
            // TypeScript doesn't set __proto__ in ES5, as it's non-standard.
            // Try to determine the superclass constructor. Compatible implementations
            // must either set __proto__ on a subclass constructor to the superclass constructor,
            // or ensure each class has a valid `constructor` property on its prototype that
            // points back to the constructor.
            // If this is not the same as Function.[[Prototype]], then this is definately inherited.
            // This is the case when in ES6 or when using __proto__ in a compatible browser.
            if (proto !== functionPrototype)
                return proto;
            // If the super prototype is Object.prototype, null, or undefined, then we cannot determine the heritage.
            var prototype = O.prototype;
            var prototypeProto = prototype && Object.getPrototypeOf(prototype);
            if (prototypeProto == null || prototypeProto === Object.prototype)
                return proto;
            // If the constructor was not a function, then we cannot determine the heritage.
            var constructor = prototypeProto.constructor;
            if (typeof constructor !== "function")
                return proto;
            // If we have some kind of self-reference, then we cannot determine the heritage.
            if (constructor === O)
                return proto;
            // we have a pretty good guess at the heritage.
            return constructor;
        }
        // naive Map shim
        function CreateMapPolyfill() {
            var cacheSentinel = {};
            var arraySentinel = [];
            var MapIterator = /** @class */ (function () {
                function MapIterator(keys, values, selector) {
                    this._index = 0;
                    this._keys = keys;
                    this._values = values;
                    this._selector = selector;
                }
                MapIterator.prototype["@@iterator"] = function () { return this; };
                MapIterator.prototype[iteratorSymbol] = function () { return this; };
                MapIterator.prototype.next = function () {
                    var index = this._index;
                    if (index >= 0 && index < this._keys.length) {
                        var result = this._selector(this._keys[index], this._values[index]);
                        if (index + 1 >= this._keys.length) {
                            this._index = -1;
                            this._keys = arraySentinel;
                            this._values = arraySentinel;
                        }
                        else {
                            this._index++;
                        }
                        return { value: result, done: false };
                    }
                    return { value: undefined, done: true };
                };
                MapIterator.prototype.throw = function (error) {
                    if (this._index >= 0) {
                        this._index = -1;
                        this._keys = arraySentinel;
                        this._values = arraySentinel;
                    }
                    throw error;
                };
                MapIterator.prototype.return = function (value) {
                    if (this._index >= 0) {
                        this._index = -1;
                        this._keys = arraySentinel;
                        this._values = arraySentinel;
                    }
                    return { value: value, done: true };
                };
                return MapIterator;
            }());
            return /** @class */ (function () {
                function Map() {
                    this._keys = [];
                    this._values = [];
                    this._cacheKey = cacheSentinel;
                    this._cacheIndex = -2;
                }
                Object.defineProperty(Map.prototype, "size", {
                    get: function () { return this._keys.length; },
                    enumerable: true,
                    configurable: true
                });
                Map.prototype.has = function (key) { return this._find(key, /*insert*/ false) >= 0; };
                Map.prototype.get = function (key) {
                    var index = this._find(key, /*insert*/ false);
                    return index >= 0 ? this._values[index] : undefined;
                };
                Map.prototype.set = function (key, value) {
                    var index = this._find(key, /*insert*/ true);
                    this._values[index] = value;
                    return this;
                };
                Map.prototype.delete = function (key) {
                    var index = this._find(key, /*insert*/ false);
                    if (index >= 0) {
                        var size = this._keys.length;
                        for (var i = index + 1; i < size; i++) {
                            this._keys[i - 1] = this._keys[i];
                            this._values[i - 1] = this._values[i];
                        }
                        this._keys.length--;
                        this._values.length--;
                        if (key === this._cacheKey) {
                            this._cacheKey = cacheSentinel;
                            this._cacheIndex = -2;
                        }
                        return true;
                    }
                    return false;
                };
                Map.prototype.clear = function () {
                    this._keys.length = 0;
                    this._values.length = 0;
                    this._cacheKey = cacheSentinel;
                    this._cacheIndex = -2;
                };
                Map.prototype.keys = function () { return new MapIterator(this._keys, this._values, getKey); };
                Map.prototype.values = function () { return new MapIterator(this._keys, this._values, getValue); };
                Map.prototype.entries = function () { return new MapIterator(this._keys, this._values, getEntry); };
                Map.prototype["@@iterator"] = function () { return this.entries(); };
                Map.prototype[iteratorSymbol] = function () { return this.entries(); };
                Map.prototype._find = function (key, insert) {
                    if (this._cacheKey !== key) {
                        this._cacheIndex = this._keys.indexOf(this._cacheKey = key);
                    }
                    if (this._cacheIndex < 0 && insert) {
                        this._cacheIndex = this._keys.length;
                        this._keys.push(key);
                        this._values.push(undefined);
                    }
                    return this._cacheIndex;
                };
                return Map;
            }());
            function getKey(key, _) {
                return key;
            }
            function getValue(_, value) {
                return value;
            }
            function getEntry(key, value) {
                return [key, value];
            }
        }
        // naive Set shim
        function CreateSetPolyfill() {
            return /** @class */ (function () {
                function Set() {
                    this._map = new _Map();
                }
                Object.defineProperty(Set.prototype, "size", {
                    get: function () { return this._map.size; },
                    enumerable: true,
                    configurable: true
                });
                Set.prototype.has = function (value) { return this._map.has(value); };
                Set.prototype.add = function (value) { return this._map.set(value, value), this; };
                Set.prototype.delete = function (value) { return this._map.delete(value); };
                Set.prototype.clear = function () { this._map.clear(); };
                Set.prototype.keys = function () { return this._map.keys(); };
                Set.prototype.values = function () { return this._map.values(); };
                Set.prototype.entries = function () { return this._map.entries(); };
                Set.prototype["@@iterator"] = function () { return this.keys(); };
                Set.prototype[iteratorSymbol] = function () { return this.keys(); };
                return Set;
            }());
        }
        // naive WeakMap shim
        function CreateWeakMapPolyfill() {
            var UUID_SIZE = 16;
            var keys = HashMap.create();
            var rootKey = CreateUniqueKey();
            return /** @class */ (function () {
                function WeakMap() {
                    this._key = CreateUniqueKey();
                }
                WeakMap.prototype.has = function (target) {
                    var table = GetOrCreateWeakMapTable(target, /*create*/ false);
                    return table !== undefined ? HashMap.has(table, this._key) : false;
                };
                WeakMap.prototype.get = function (target) {
                    var table = GetOrCreateWeakMapTable(target, /*create*/ false);
                    return table !== undefined ? HashMap.get(table, this._key) : undefined;
                };
                WeakMap.prototype.set = function (target, value) {
                    var table = GetOrCreateWeakMapTable(target, /*create*/ true);
                    table[this._key] = value;
                    return this;
                };
                WeakMap.prototype.delete = function (target) {
                    var table = GetOrCreateWeakMapTable(target, /*create*/ false);
                    return table !== undefined ? delete table[this._key] : false;
                };
                WeakMap.prototype.clear = function () {
                    // NOTE: not a real clear, just makes the previous data unreachable
                    this._key = CreateUniqueKey();
                };
                return WeakMap;
            }());
            function CreateUniqueKey() {
                var key;
                do
                    key = "@@WeakMap@@" + CreateUUID();
                while (HashMap.has(keys, key));
                keys[key] = true;
                return key;
            }
            function GetOrCreateWeakMapTable(target, create) {
                if (!hasOwn.call(target, rootKey)) {
                    if (!create)
                        return undefined;
                    Object.defineProperty(target, rootKey, { value: HashMap.create() });
                }
                return target[rootKey];
            }
            function FillRandomBytes(buffer, size) {
                for (var i = 0; i < size; ++i)
                    buffer[i] = Math.random() * 0xff | 0;
                return buffer;
            }
            function GenRandomBytes(size) {
                if (typeof Uint8Array === "function") {
                    if (typeof crypto !== "undefined")
                        return crypto.getRandomValues(new Uint8Array(size));
                    if (typeof msCrypto !== "undefined")
                        return msCrypto.getRandomValues(new Uint8Array(size));
                    return FillRandomBytes(new Uint8Array(size), size);
                }
                return FillRandomBytes(new Array(size), size);
            }
            function CreateUUID() {
                var data = GenRandomBytes(UUID_SIZE);
                // mark as random - RFC 4122 § 4.4
                data[6] = data[6] & 0x4f | 0x40;
                data[8] = data[8] & 0xbf | 0x80;
                var result = "";
                for (var offset = 0; offset < UUID_SIZE; ++offset) {
                    var byte = data[offset];
                    if (offset === 4 || offset === 6 || offset === 8)
                        result += "-";
                    if (byte < 16)
                        result += "0";
                    result += byte.toString(16).toLowerCase();
                }
                return result;
            }
        }
        // uses a heuristic used by v8 and chakra to force an object into dictionary mode.
        function MakeDictionary(obj) {
            obj.__ = undefined;
            delete obj.__;
            return obj;
        }
    });
})(Reflect || (Reflect = {}));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../process/browser.js */ "./node_modules/process/browser.js"), __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/selector-set/selector-set.next.js":
/*!********************************************************!*\
  !*** ./node_modules/selector-set/selector-set.next.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SelectorSet; });
// Public: Create a new SelectorSet.
function SelectorSet() {
  // Construct new SelectorSet if called as a function.
  if (!(this instanceof SelectorSet)) {
    return new SelectorSet();
  }

  // Public: Number of selectors added to the set
  this.size = 0;

  // Internal: Incrementing ID counter
  this.uid = 0;

  // Internal: Array of String selectors in the set
  this.selectors = [];

  // Internal: All Object index String names mapping to Index objects.
  this.indexes = Object.create(this.indexes);

  // Internal: Used Object index String names mapping to Index objects.
  this.activeIndexes = [];
}

// Detect prefixed Element#matches function.
var docElem = window.document.documentElement;
var matches = (docElem.matches ||
                docElem.webkitMatchesSelector ||
                docElem.mozMatchesSelector ||
                docElem.oMatchesSelector ||
                docElem.msMatchesSelector);

// Public: Check if element matches selector.
//
// Maybe overridden with custom Element.matches function.
//
// el       - An Element
// selector - String CSS selector
//
// Returns true or false.
SelectorSet.prototype.matchesSelector = function(el, selector) {
  return matches.call(el, selector);
};

// Public: Find all elements in the context that match the selector.
//
// Maybe overridden with custom querySelectorAll function.
//
// selectors - String CSS selectors.
// context   - Element context
//
// Returns non-live list of Elements.
SelectorSet.prototype.querySelectorAll = function(selectors, context) {
  return context.querySelectorAll(selectors);
};


// Public: Array of indexes.
//
// name     - Unique String name
// selector - Function that takes a String selector and returns a String key
//            or undefined if it can't be used by the index.
// element  - Function that takes an Element and returns an Array of String
//            keys that point to indexed values.
//
SelectorSet.prototype.indexes = [];

// Index by element id
var idRe = /^#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/g;
SelectorSet.prototype.indexes.push({
  name: 'ID',
  selector: function matchIdSelector(sel) {
    var m;
    if (m = sel.match(idRe)) {
      return m[0].slice(1);
    }
  },
  element: function getElementId(el) {
    if (el.id) {
      return [el.id];
    }
  }
});

// Index by all of its class names
var classRe = /^\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/g;
SelectorSet.prototype.indexes.push({
  name: 'CLASS',
  selector: function matchClassSelector(sel) {
    var m;
    if (m = sel.match(classRe)) {
      return m[0].slice(1);
    }
  },
  element: function getElementClassNames(el) {
    var className = el.className;
    if (className) {
      if (typeof className === 'string') {
        return className.split(/\s/);
      } else if (typeof className === 'object' && 'baseVal' in className) {
        // className is a SVGAnimatedString
        // global SVGAnimatedString is not an exposed global in Opera 12
        return className.baseVal.split(/\s/);
      }
    }
  }
});

// Index by tag/node name: `DIV`, `FORM`, `A`
var tagRe = /^((?:[\w\u00c0-\uFFFF\-]|\\.)+)/g;
SelectorSet.prototype.indexes.push({
  name: 'TAG',
  selector: function matchTagSelector(sel) {
    var m;
    if (m = sel.match(tagRe)) {
      return m[0].toUpperCase();
    }
  },
  element: function getElementTagName(el) {
    return [el.nodeName.toUpperCase()];
  }
});

// Default index just contains a single array of elements.
SelectorSet.prototype.indexes['default'] = {
  name: 'UNIVERSAL',
  selector: function() {
    return true;
  },
  element: function() {
    return [true];
  }
};


// Use ES Maps when supported
var Map;
if (typeof window.Map === 'function') {
  Map = window.Map;
} else {
  Map = (function() {
    function Map() {
      this.map = {};
    }
    Map.prototype.get = function(key) {
      return this.map[key + ' '];
    };
    Map.prototype.set = function(key, value) {
      this.map[key + ' '] = value;
    };
    return Map;
  })();
}


// Regexps adopted from Sizzle
//   https://github.com/jquery/sizzle/blob/1.7/sizzle.js
//
var chunker = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g;

// Internal: Get indexes for selector.
//
// selector - String CSS selector
//
// Returns Array of {index, key}.
function parseSelectorIndexes(allIndexes, selector) {
  allIndexes = allIndexes.slice(0).concat(allIndexes['default']);

  var allIndexesLen = allIndexes.length,
      i, j, m, dup, rest = selector,
      key, index, indexes = [];

  do {
    chunker.exec('');
    if (m = chunker.exec(rest)) {
      rest = m[3];
      if (m[2] || !rest) {
        for (i = 0; i < allIndexesLen; i++) {
          index = allIndexes[i];
          if (key = index.selector(m[1])) {
            j = indexes.length;
            dup = false;
            while (j--) {
              if (indexes[j].index === index && indexes[j].key === key) {
                dup = true;
                break;
              }
            }
            if (!dup) {
              indexes.push({index: index, key: key});
            }
            break;
          }
        }
      }
    }
  } while (m);

  return indexes;
}

// Internal: Find first item in Array that is a prototype of `proto`.
//
// ary   - Array of objects
// proto - Prototype of expected item in `ary`
//
// Returns object from `ary` if found. Otherwise returns undefined.
function findByPrototype(ary, proto) {
  var i, len, item;
  for (i = 0, len = ary.length; i < len; i++) {
    item = ary[i];
    if (proto.isPrototypeOf(item)) {
      return item;
    }
  }
}

// Public: Log when added selector falls under the default index.
//
// This API should not be considered stable. May change between
// minor versions.
//
// obj - {selector, data} Object
//
//   SelectorSet.prototype.logDefaultIndexUsed = function(obj) {
//     console.warn(obj.selector, "could not be indexed");
//   };
//
// Returns nothing.
SelectorSet.prototype.logDefaultIndexUsed = function() {};

// Public: Add selector to set.
//
// selector - String CSS selector
// data     - Optional data Object (default: undefined)
//
// Returns nothing.
SelectorSet.prototype.add = function(selector, data) {
  var obj, i, indexProto, key, index, objs,
      selectorIndexes, selectorIndex,
      indexes = this.activeIndexes,
      selectors = this.selectors;

  if (typeof selector !== 'string') {
    return;
  }

  obj = {
    id: this.uid++,
    selector: selector,
    data: data
  };

  selectorIndexes = parseSelectorIndexes(this.indexes, selector);
  for (i = 0; i < selectorIndexes.length; i++) {
    selectorIndex = selectorIndexes[i];
    key = selectorIndex.key;
    indexProto = selectorIndex.index;

    index = findByPrototype(indexes, indexProto);
    if (!index) {
      index = Object.create(indexProto);
      index.map = new Map();
      indexes.push(index);
    }

    if (indexProto === this.indexes['default']) {
      this.logDefaultIndexUsed(obj);
    }
    objs = index.map.get(key);
    if (!objs) {
      objs = [];
      index.map.set(key, objs);
    }
    objs.push(obj);
  }

  this.size++;
  selectors.push(selector);
};

// Public: Remove selector from set.
//
// selector - String CSS selector
// data     - Optional data Object (default: undefined)
//
// Returns nothing.
SelectorSet.prototype.remove = function(selector, data) {
  if (typeof selector !== 'string') {
    return;
  }

  var selectorIndexes, selectorIndex, i, j, k, selIndex, objs, obj;
  var indexes = this.activeIndexes;
  var removedIds = {};
  var removeAll = arguments.length === 1;

  selectorIndexes = parseSelectorIndexes(this.indexes, selector);
  for (i = 0; i < selectorIndexes.length; i++) {
    selectorIndex = selectorIndexes[i];

    j = indexes.length;
    while (j--) {
      selIndex = indexes[j];
      if (selectorIndex.index.isPrototypeOf(selIndex)) {
        objs = selIndex.map.get(selectorIndex.key);
        if (objs) {
          k = objs.length;
          while (k--) {
            obj = objs[k];
            if (obj.selector === selector && (removeAll || obj.data === data)) {
              objs.splice(k, 1);
              removedIds[obj.id] = true;
            }
          }
        }
        break;
      }
    }
  }

  this.size -= Object.keys(removedIds).length;
};

// Sort by id property handler.
//
// a - Selector obj.
// b - Selector obj.
//
// Returns Number.
function sortById(a, b) {
  return a.id - b.id;
}

// Public: Find all matching decendants of the context element.
//
// context - An Element
//
// Returns Array of {selector, data, elements} matches.
SelectorSet.prototype.queryAll = function(context) {
  if (!this.selectors.length) {
    return [];
  }

  var matches = {}, results = [];
  var els = this.querySelectorAll(this.selectors.join(', '), context);

  var i, j, len, len2, el, m, match, obj;
  for (i = 0, len = els.length; i < len; i++) {
    el = els[i];
    m = this.matches(el);
    for (j = 0, len2 = m.length; j < len2; j++) {
      obj = m[j];
      if (!matches[obj.id]) {
        match = {
          id: obj.id,
          selector: obj.selector,
          data: obj.data,
          elements: []
        };
        matches[obj.id] = match;
        results.push(match);
      } else {
        match = matches[obj.id];
      }
      match.elements.push(el);
    }
  }

  return results.sort(sortById);
};

// Public: Match element against all selectors in set.
//
// el - An Element
//
// Returns Array of {selector, data} matches.
SelectorSet.prototype.matches = function(el) {
  if (!el) {
    return [];
  }

  var i, j, k, len, len2, len3, index, keys, objs, obj, id;
  var indexes = this.activeIndexes, matchedIds = {}, matches = [];

  for (i = 0, len = indexes.length; i < len; i++) {
    index = indexes[i];
    keys = index.element(el);
    if (keys) {
      for (j = 0, len2 = keys.length; j < len2; j++) {
        if (objs = index.map.get(keys[j])) {
          for (k = 0, len3 = objs.length; k < len3; k++) {
            obj = objs[k];
            id = obj.id;
            if (!matchedIds[id] && this.matchesSelector(el, obj.selector)) {
              matchedIds[id] = true;
              matches.push(obj);
            }
          }
        }
      }
    }
  }

  return matches.sort(sortById);
};


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/app/behaviour/behaviours/scroll/IntersectBehaviour.ts":
/*!*******************************************************************!*\
  !*** ./src/app/behaviour/behaviours/scroll/IntersectBehaviour.ts ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var RegionBehaviour_1 = __webpack_require__(/*! ./RegionBehaviour */ "./src/app/behaviour/behaviours/scroll/RegionBehaviour.ts");

var Events_1 = __webpack_require__(/*! debugbase/events/Events */ "./src/debugbase/events/Events.ts");

var UIThemeChangeEvent_1 = __webpack_require__(/*! app/event/UIThemeChangeEvent */ "./src/app/event/UIThemeChangeEvent.ts");

var SidebarChangeEvent_1 = __webpack_require__(/*! app/event/SidebarChangeEvent */ "./src/app/event/SidebarChangeEvent.ts");

var ActionType;

(function (ActionType) {
  ActionType["UI_THEME"] = "ui-theme";
  ActionType["SIDEBAR"] = "sidebar";
})(ActionType || (ActionType = {}));
/** @class Scroll behaviour class, trigers when a element goes into a 'region' */


var IntersectBehaviour =
/** @class */
function (_super) {
  __extends(IntersectBehaviour, _super);

  function IntersectBehaviour(_config, _container) {
    var _this = _super.call(this, _config, _container) || this;

    _this._config = _config;
    _this._container = _container;
    _this._intersected = false;
    _this._calculateScrollCounter = 1;
    _this._target = document.querySelector(_this._config.selector); //TEST VALID. IF not then destroy this

    if (_this._testValidElements()) {
      _this.resize();
    } else {
      _this.destroy();
    }

    return _this;
  }

  IntersectBehaviour.prototype.destroy = function () {
    _super.prototype.destroy.call(this);
  };

  IntersectBehaviour.prototype.resize = function () {
    this._targetRect = this._target.getBoundingClientRect();

    _super.prototype.resize.call(this);
  };
  /** Update the scroll position (Note this doesn't nessary mean the 'viewport' is scrolled (but it could))
  * @param {number} scroll
  */


  IntersectBehaviour.prototype.update = function (scroll) {
    if (!this._config) {
      return;
    }

    _super.prototype.update.call(this, scroll); //getBoundingClientRect is expensive, so limit with a counter


    this._updateRegionRect();

    if (!this._intersected && this._isIntersected()) {
      this._onIntersect();
    } else if (this._intersected && !this._isIntersected()) {
      this._onExitIntersect();
    }
  }; //PRIVATE 
  //----------------------------------------------------------------------------------------------------


  IntersectBehaviour.prototype._onIntersect = function () {
    //When intersected then fire that event:
    if (this._config.action === ActionType.UI_THEME) {
      Events_1.Events.dispatch(new UIThemeChangeEvent_1.UIThemeChangeEvent({
        theme: this._config.data
      }));
    } else if (this._config.action === ActionType.SIDEBAR) {
      var dataParts = this._config.data.split(',');

      Events_1.Events.dispatch(new SidebarChangeEvent_1.SidebarChangeEvent({
        theme: dataParts[0],
        index: parseInt(dataParts[1], 10)
      }));
    }

    this._intersected = true;
  };

  IntersectBehaviour.prototype._onExitIntersect = function () {
    this._intersected = false;
  };
  /** Update the region client rect on on a counter so its not 60FPS!! */


  IntersectBehaviour.prototype._updateRegionRect = function () {
    this._calculateScrollCounter++;

    if (this._calculateScrollCounter >= 1) {
      this._regionRect = this._region.getBoundingClientRect();
      this._calculateScrollCounter = 0;
    }
  };
  /** Check if the target and the region are intersected
  * https://stackoverflow.com/questions/12066870/how-to-check-if-an-element-is-overlapping-other-elements
  */


  IntersectBehaviour.prototype._isIntersected = function () {
    return !(this._regionRect.right < this._targetRect.left || this._regionRect.left > this._targetRect.right || this._regionRect.bottom < this._targetRect.top || this._regionRect.top > this._targetRect.bottom);
  };
  /** Test if the elements are valid */


  IntersectBehaviour.prototype._testValidElements = function () {
    if (!this._target) {
      try {
        throw new Error("Behaviour intersect target is not valid  : " + JSON.stringify(this._config));
      } catch (e) {
        console.log(e);
      }

      return false;
    }

    return true;
  };

  return IntersectBehaviour;
}(RegionBehaviour_1.RegionBehaviour);

exports.IntersectBehaviour = IntersectBehaviour;

/***/ }),

/***/ "./src/app/behaviour/behaviours/scroll/RegionBehaviour.ts":
/*!****************************************************************!*\
  !*** ./src/app/behaviour/behaviours/scroll/RegionBehaviour.ts ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var Events_1 = __webpack_require__(/*! debugbase/events/Events */ "./src/debugbase/events/Events.ts");

var Enums_1 = __webpack_require__(/*! app/data/Enums */ "./src/app/data/Enums.ts");

var RegionViewportEvent_1 = __webpack_require__(/*! app/event/RegionViewportEvent */ "./src/app/event/RegionViewportEvent.ts");
/** @class Scroll behaviour class, triggers when a region is viewable */


var RegionBehaviour =
/** @class */
function () {
  function RegionBehaviour(_config, _container) {
    this._config = _config;
    this._container = _container;
    this.destoyed = false;
    this._viewable = true;
    this._innerHeight = 0;
    this._scrollY = 0; //Private -----------------------------------------------

    this._viewableTolerence = 0; //+/- When a region is consiedered visible: 

    this._region = _container.querySelector("#" + this._config.id);

    if (!this._testValidRegion()) {
      this.destroy();
    }
  }

  RegionBehaviour.prototype.destroy = function () {
    this._config = null;
    this._container = null;
    this._regionRect = null;
    this.destoyed = false;

    this._region.removeEventListener('resize', this.resize.bind(this));
  };

  RegionBehaviour.prototype.resize = function () {
    if (!this._config) {
      return;
    }

    this._innerHeight = window.innerHeight;
    this._regionRect = this._region.getBoundingClientRect();
    this._regionHeight = this._region.clientHeight;
    this._regionOffsetTop = this._region.offsetTop;
  };

  RegionBehaviour.prototype.update = function (scroll) {
    this._scrollY = scroll;

    this._testInViewport();
  }; //private
  //-----------------------------------------------------------------------------------------

  /** Test if the region is in in viewport (allowing for any tolerences). Can be used for lazy loading, video play/stoping, resting state, hiding, etc */


  RegionBehaviour.prototype._testInViewport = function () {
    if (this._viewable !== this._checkRegionInViewPort()) {
      this._viewable = !this._viewable; //If is setup to hide when outside view viewport then css hide / show 

      if (this._config.hideOutsideViewport && this._config.scrollerType === Enums_1.ScrollerType.CUSTOM) {
        this._region.style.visibility = this._viewable ? 'visible' : 'hidden';
      } //As the region viewable state has changed then, Trigger event that can be acted on


      Events_1.Events.dispatch(new RegionViewportEvent_1.RegionViewportEvent({
        viewable: this._viewable,
        region: this._region,
        config: this._config
      }));
    }
  };
  /** Measure if region is in Viewport
  * @return {boolean}
  */


  RegionBehaviour.prototype._checkRegionInViewPort = function () {
    if (this._scrollY + this._innerHeight > this._regionOffsetTop - this._viewableTolerence && this._scrollY < this._regionOffsetTop + this._regionHeight + this._viewableTolerence) {
      return true;
    } //if (this._innerHeight > (this._region.offsetTop - this._viewableTolerence)  && 
    //	this._scrollY < ((this._region.offsetTop + this._regionRect.height) + this._viewableTolerence) ) {
    //	return true;
    //}


    return false;
  };
  /** Test if the region is actualy valid. Throw an error if not
  * @return {boolean}
  */


  RegionBehaviour.prototype._testValidRegion = function () {
    if (!this._region) {
      try {
        throw new Error("Behaviour region not valid target  : " + JSON.stringify(this._config));
      } catch (e) {
        console.log(e);
      }

      return false;
    }

    return true;
  };

  return RegionBehaviour;
}();

exports.RegionBehaviour = RegionBehaviour;

/***/ }),

/***/ "./src/app/behaviour/managers/ScrollBehaviourManager.ts":
/*!**************************************************************!*\
  !*** ./src/app/behaviour/managers/ScrollBehaviourManager.ts ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var IntersectBehaviour_1 = __webpack_require__(/*! ../behaviours/scroll/IntersectBehaviour */ "./src/app/behaviour/behaviours/scroll/IntersectBehaviour.ts");

var RegionBehaviour_1 = __webpack_require__(/*! ../behaviours/scroll/RegionBehaviour */ "./src/app/behaviour/behaviours/scroll/RegionBehaviour.ts");

var BehaviourType;

(function (BehaviourType) {
  BehaviourType["INTERSECT"] = "intersect";
  BehaviourType["REGION"] = "region";
})(BehaviourType = exports.BehaviourType || (exports.BehaviourType = {}));
/** @class Mananger to manage scroll behaviours */


var ScrollBehaviourManager =
/** @class */
function () {
  function ScrollBehaviourManager() {
    this._behaviours = [];
    this._scroll = 0;
  }

  ScrollBehaviourManager.prototype.setType = function (type) {
    this._scrollerType = type;
  };
  /**
  * Update the scroll
  * @param {number} scroll - Y position of the scroll
  */


  ScrollBehaviourManager.prototype.updateScroll = function (scroll) {
    this._scroll = scroll;

    this._updateBehaviours(this._scroll);
  };
  /**
  * Set target container
  * @param {HTMLElement} container - The container with the elements to apply behaviours to
  */


  ScrollBehaviourManager.prototype.setContainer = function (element) {
    this._destroyBehaviours();

    this._removeListeners();

    this._container = element;

    if (this._container) {
      this._createBehaviours();

      this._container.addEventListener('resize', this.resize.bind(this));
    }
  };
  /** Resize event */


  ScrollBehaviourManager.prototype.resize = function () {
    this._resizeBehaviours();
  }; //Private
  //------------------------------------------------------------------------------

  /** Destroy all 'scroll' behaviours from the old container */


  ScrollBehaviourManager.prototype._destroyBehaviours = function () {
    this._behaviours.forEach(function (behaviour) {
      behaviour.destroy();
    });

    this._behaviours = [];
  };
  /** Remove listeners */


  ScrollBehaviourManager.prototype._removeListeners = function () {
    if (this._container) {
      this._container.removeEventListener('resize', this.resize.bind(this));
    }
  };
  /** Create all 'scroll' behaviours found in the container */


  ScrollBehaviourManager.prototype._createBehaviours = function () {
    var _this = this;

    this._container.querySelectorAll('.behaviour').forEach(function (element) {
      var id = element.getAttribute('id');
      var behaviours = JSON.parse(element.getAttribute('data-behaviour')).behaviours;

      if (_this._checkValidId(id, behaviours)) {
        _this._createElementBehaviours(behaviours, id);
      }
    });
  };
  /** Create all the behaviours in one element
  * @param {Array<BehaviourConfig>} configList - Array of config value
  */


  ScrollBehaviourManager.prototype._createElementBehaviours = function (configList, id) {
    var _this = this;

    configList.forEach(function (config) {
      //Set the id from the 'id' atrr on the tag: 
      config.id = id;
      config.hideOutsideViewport = true;
      config.scrollerType = _this._scrollerType;

      if (config.type === BehaviourType.INTERSECT) {
        _this._behaviours.push(new IntersectBehaviour_1.IntersectBehaviour(config, _this._container));
      } else if (config.type === BehaviourType.REGION) {
        _this._behaviours.push(new RegionBehaviour_1.RegionBehaviour(config, _this._container));
      }
    });
  };
  /** Resize all 'scroll' behaviours from the old container */


  ScrollBehaviourManager.prototype._resizeBehaviours = function () {
    this._behaviours.forEach(function (behaviour) {
      behaviour.resize();
    });

    console.log('FIX OBSERVER !!!!!!');
    window.observer.observe();
  };
  /** Update all the bahviours on scroll
  * @param {number} scroll
  */


  ScrollBehaviourManager.prototype._updateBehaviours = function (scroll) {
    this._behaviours.forEach(function (behaviour) {
      behaviour.update(scroll);
    });
  };
  /** Check if the ID is set
  * @param {string} id
  * @param {Array<BehaviourConfig>} config
  * @throws {Error}
  * @returns {boolean}
  */


  ScrollBehaviourManager.prototype._checkValidId = function (id, config) {
    if (!id || id === '') {
      try {
        throw new Error("Behaviour ID has not been set on region/element : " + JSON.stringify(config));
      } catch (e) {
        console.log(e);
      }

      return false;
    }

    return true;
  };

  return ScrollBehaviourManager;
}();

exports.ScrollBehaviourManager = ScrollBehaviourManager;

/***/ }),

/***/ "./src/app/controller/AppController.ts":
/*!*********************************************!*\
  !*** ./src/app/controller/AppController.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
}); //1.0 Main controller than creates all sub controllers: 

var Controller_1 = __webpack_require__(/*! debugbase/abstract/Controller */ "./src/debugbase/abstract/Controller.ts");

var Events_1 = __webpack_require__(/*! debugbase/events/Events */ "./src/debugbase/events/Events.ts");

var GA_1 = __webpack_require__(/*! debugbase/tracking/GA */ "./src/debugbase/tracking/GA.ts");

var AppEvents_1 = __webpack_require__(/*! app/data/AppEvents */ "./src/app/data/AppEvents.ts");

var ViewReadyEvent_1 = __webpack_require__(/*! app/event/ViewReadyEvent */ "./src/app/event/ViewReadyEvent.ts");

var PixiResourceLoadEvent_1 = __webpack_require__(/*! app/event/PixiResourceLoadEvent */ "./src/app/event/PixiResourceLoadEvent.ts");

var AjaxHTMLLoadedEvent_1 = __webpack_require__(/*! app/event/AjaxHTMLLoadedEvent */ "./src/app/event/AjaxHTMLLoadedEvent.ts");

var HomeDepartmentReachedEvent_1 = __webpack_require__(/*! app/event/HomeDepartmentReachedEvent */ "./src/app/event/HomeDepartmentReachedEvent.ts");

var JSONLoadEvent_1 = __webpack_require__(/*! app/event/JSONLoadEvent */ "./src/app/event/JSONLoadEvent.ts");

var Enums_1 = __webpack_require__(/*! app/data/Enums */ "./src/app/data/Enums.ts"); //import * as PIXI from 'pixi.js';


var AppController =
/** @class */
function (_super) {
  __extends(AppController, _super);

  function AppController() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  AppController.prototype.init = function () {
    this._setControllerRefs();

    this._injectControllerRefs();

    this._addListeners();

    this._setPixiDepencies();
  };

  AppController.prototype.DOMReady = function () {};

  AppController.prototype.modulesMounted = function () {//setTimeout( () =>  this._preload.hide(), 1000);
  };

  Object.defineProperty(AppController.prototype, "pixi", {
    get: function get() {
      return this._pixi.getPixi();
    },
    enumerable: true,
    configurable: true
  }); //Private methods: 
  //------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------

  /** Controllers are created automatically through Debugbase.controllers directive so just need to granb them */

  AppController.prototype._setControllerRefs = function () {
    this._pixi = this.get('Pixi');
    this._preload = this.get('Preload');
    this._mouse = this.get('Mouse');
    this._history = this.get('History');
    this._scrollbar = this.get('Scrollbar');
    this._background = this.get('Background');
    this._ui = this.get('UI');
    this._navMenu = this.get('NavMenu');
    this._home = this.get('Home');
    this._spaces = this.get('Spaces');
    this._screens = this.get('Screens');
    this._project = this.get('Project');
    this._info = this.get('Info');

    this._spaces.setDepartment(Enums_1.DepartmentType.SPACES);

    this._screens.setDepartment(Enums_1.DepartmentType.SCREENS);
  };
  /** Pass required controller refs to each other */


  AppController.prototype._injectControllerRefs = function () {
    this._preload.setControllers(this._ui);

    this._navMenu.setControllers(this._info);

    this._ui.setControllers(this._scrollbar);

    this._spaces.setControllers(this._mouse, this._background, this._pixi);

    this._screens.setControllers(this._mouse, this._background, this._pixi);

    this._home.setControllers(this._mouse, this._background, this._pixi);

    this._info.setControllers(this._scrollbar);

    this._project.setControllers(this._mouse, this._scrollbar, this._pixi, this._screens, this._spaces);

    this._background.setControllers(this._mouse);
  };
  /** Pass PIXI dependecies on Work, Home and background controllers: */


  AppController.prototype._setPixiDepencies = function () {
    this._screens.setPixi(this._pixi.getPixi(), this._pixi.getBackground(), this._pixi.getWork(Enums_1.DepartmentType.SCREENS));

    this._spaces.setPixi(this._pixi.getPixi(), this._pixi.getBackground(), this._pixi.getWork(Enums_1.DepartmentType.SPACES));

    this._home.setPixi(this._pixi.getPixi(), this._pixi.getHome());

    this._background.setPixi(this._pixi.getPixi(), this._pixi.getBackground());
  };
  /** Add all the major app wide style event listeners: */


  AppController.prototype._addListeners = function () {
    //Loading:
    Events_1.Events.on(PixiResourceLoadEvent_1.PixiResourceLoadEvent, this._onPixiResourceLoaded.bind(this));
    Events_1.Events.on(AjaxHTMLLoadedEvent_1.AjaxHTMLLoadedEvent, this._onAjaxHTMLLoaded.bind(this));
    Events_1.Events.on(JSONLoadEvent_1.JSONLoadEvent, this._onJSONLoaded.bind(this));
    Events_1.Events.on(ViewReadyEvent_1.ViewReadyEvent, this._onViewReady.bind(this)); //Navigation / View changes: 

    Events_1.Events.on(AppEvents_1.AppEvents.SET_INTIAL_STATE, this._onSetIntialState.bind(this));
    Events_1.Events.on(AppEvents_1.AppEvents.CHANGE_SECTION, this._onChangeSection.bind(this));
    Events_1.Events.on(AppEvents_1.AppEvents.POP_HISTORY_STATE, this._onPopHistoryState.bind(this));
    Events_1.Events.on(AppEvents_1.AppEvents.DEEP_LINK_LOADER_COMPLETE, this._onDeepLinkLoaderComplete.bind(this));
    Events_1.Events.on(HomeDepartmentReachedEvent_1.HomeDepartmentReachedEvent, this._onHomeDepartmentReached.bind(this)); //UI / NavMenu type events: 

    Events_1.Events.on(AppEvents_1.AppEvents.DEBUG_LOGO_PRESS, this._onDebugLogoPress.bind(this));
    Events_1.Events.on(AppEvents_1.AppEvents.ACTIVE_DEPARTMENT_NAV_MENU_PRESS, this._onActiveDepartmentNavMenuPress.bind(this));
    Events_1.Events.on(AppEvents_1.AppEvents.MENU_STATE_CHANGE, this._onMenuStateChange.bind(this));
    Events_1.Events.on(AppEvents_1.AppEvents.RESET_NAV_MENU, this._onResetNavMenu.bind(this));
  }; //Pixi resource has loaded so pass that resource on the controllers that require it: 


  AppController.prototype._onPixiResourceLoaded = function (resourceEvent) {
    console.log('resourceEvent', resourceEvent); //If background type then tell the background controller free to load the background items  

    if (resourceEvent.type === Enums_1.PixiResourceType.BACKGROUNDS) {
      this._background.pixiBackgroundsLoaded(resourceEvent.resource.spritesheet);
    } else if (resourceEvent.type === Enums_1.PixiResourceType.HOME_PARTCILES) {
      this._home.pixiParticlesLoaded(resourceEvent.resource.spritesheet);
    } else if (resourceEvent.type === Enums_1.PixiResourceType.WORK_PARTICLES) {
      //Work particles are shared so pass to both screens / spaces
      this._screens.pixiParticlesLoaded(resourceEvent.resource.spritesheet);

      this._spaces.pixiParticlesLoaded(resourceEvent.resource.spritesheet);
    } else if (resourceEvent.type === Enums_1.PixiResourceType.WORK_BACKGROUNDS_SCREEN) {
      this._screens.pixiBackgroundsLoaded(resourceEvent.resource.spritesheet, Enums_1.DepartmentType.SCREENS);
    } else if (resourceEvent.type === Enums_1.PixiResourceType.WORK_BACKGROUNDS_SPACES) {
      this._spaces.pixiBackgroundsLoaded(resourceEvent.resource.spritesheet, Enums_1.DepartmentType.SPACES);
    } else if (resourceEvent.type === Enums_1.PixiResourceType.MOTH) {
      this._home.pixiMothLoaded(resourceEvent.resource.spritesheet);
    }
  };
  /** Extrnal HTML has been set so pass to the correct controller that can then use the resource as required */


  AppController.prototype._onAjaxHTMLLoaded = function (event) {
    var id = event.loader.id;
    var html = event.loader.html;

    if (id === '/') {
      this._home.setHTML(html);
    } else if (id === '/about/' || id === '/studio/' || id === '/jobs/' || id === '/contact/') {
      var subSection = id.substring(1, id.length - 1);

      this._info.setHTML(html, subSection);
    } else if (id === '/screens/') {
      this._screens.setHTML(html);
    } else if (id === '/spaces/') {
      this._spaces.setHTML(html);
    } else {
      //No other 'static' type pages left, so must be a project
      this._project.setHTML(id, html);
    }
  };
  /** JSON item is loaded so pass to the required view controller */


  AppController.prototype._onJSONLoaded = function (event) {
    if (event.id === 'json-screens') {
      this._screens.setJSON(event.json);
    } else if (event.id === 'json-spaces') {
      this._spaces.setJSON(event.json);
    } else if (event.id === 'json-home') {
      this._home.setJSON(event.json);
    }
  };
  /**Intial preload is complete. So can show the site */
  //private _onIntialPreloadComlete(): void {
  //this._activeViewController.show();
  //}

  /**
  * View is ready so can then show if the site/preloading is wairing on it
  * @param {ViewReadyEvent} event
  */


  AppController.prototype._onViewReady = function (event) {
    //Pass the event direct to the preload manager.
    //This checks if that view is being currently being waited on 
    var isPreloadingViewReady = this._preload.viewReady(event); //If the active controller is loaded and been waiting on then can show the active controller


    if (isPreloadingViewReady) {
      this._preload.hide();

      this._activeViewController.reset(null, true);

      this._activeViewController.show(null, true);
    }
  }; //** Set intial section / state / active view. Happens straight away, configured by the active 'view' as routed */


  AppController.prototype._onSetIntialState = function (stateObject) {
    //Tell the preloader what the intial state is (So it can decide what order to load assets)
    this._preload.setIntialState(stateObject);

    this._navMenu.setState(stateObject, false);

    this._ui.setState(stateObject); //Get the active view controller by id ref (home, info, screens, spaces, project)


    this._switchControllerToActive(stateObject); //Set the intial state. Will be reached when the users presses back through all history states


    this._history.setIntialState(stateObject);
  };
  /** On change section. This comes form  */


  AppController.prototype._onChangeSection = function (stateObject, pushHistoryState) {
    if (pushHistoryState === void 0) {
      pushHistoryState = true;
    } //Check if the new view is ready to view. 


    var readyToView = this._getControllerFromState(stateObject).isReadyToView(stateObject); //Add the history state if not bypassed (because coming from HistoryState pop() ) :


    if (pushHistoryState) {
      this._history.push(stateObject, stateObject.title, stateObject.href);
    } //Set the UI / breadcrumbs / menu state: 


    this._ui.setState(stateObject);

    this._navMenu.setState(stateObject); //If the menu is showing then hide (If configured on stateObject as don't want mess with navMenu > info processes):


    if (stateObject.hideMenu && this._navMenu.isShowing()) {
      this._navMenu.reset();

      this._onMenuStateChange({
        state: Enums_1.MenuStateType.CLOSED
      });
    } //Check if transitions are bypassed (Because the view has controlled its own state change internally):
    //------------------------------------------------------------------------


    if (stateObject.bypassTransitions) {
      this._switchControllerToActive(stateObject);

      return;
    } //Check if an internal view switch (For example in info moving bewteen tabs, caused by menu action):
    //------------------------------------------------------------------------


    if (this._activeState.section === stateObject.section && this._activeState.section === Enums_1.SectionType.INFO) {
      this._activeState = stateObject;

      this._activeViewController.subsectionStateChange(stateObject);

      this._navMenu.reset();

      return;
    } //Check if a deeplink style: 
    //-------------------------------------------------------------------------


    if (stateObject.isDeepLink || !readyToView) {
      this._onDeepLink(stateObject);

      return;
    } //Organic / mixed transition style switch. I.E going from home > work. Or nav menu to about, or work slider > to project
    ///-------------------------------------------------------------------------
    //Hide the current/old view. Pass the state object of next state, so the view can workout how to hide itself based on where its going next


    this._activeViewController.hide(stateObject); //Set to new view. Then pass the old state in with show, so the new view can work out how to show itsself based on where its comeing from:  


    var oldState = this._activeState;

    this._switchControllerToActive(stateObject);

    this._activeViewController.reset(oldState);

    this._activeViewController.show(oldState);
  };
  /** On change section via back / forward buttons */


  AppController.prototype._onPopHistoryState = function (stateObject) {
    //If the section type is the same then can just trigger. This only applies to 'info' at this point
    if (this._activeState.section === stateObject.section) {
      this._activeState = stateObject;

      this._activeViewController.subsectionStateChange(stateObject);

      return;
    } //Flag that its a deeplink change: 


    stateObject.isDeepLink = true;
    stateObject.fromMenu = false;
    stateObject.bypassTransitions = false; //Treat as a deep link: 

    this._onChangeSection(stateObject, false);
  };
  /** Deep link to new section (Through history state, or far reaching nav action like spaces, screens or home link) */


  AppController.prototype._onDeepLink = function (stateObject) {
    console.log("AppController > _onDeepLink", stateObject); //Freeze active controller, will decativate and hide the view:

    this._activeViewController.freeze(); //2. Set the the new controller to the one defined by the state, then pass that state back so view can be setup as required:


    this._switchControllerToActive(stateObject); //Show a quick preloader to mask:


    this._mouse.setDragCursorActive(false);

    this._preload.showDeepLinkLoader(this._activeViewController);

    this._ui.hide();
  };
  /** Switch controller/state to active  */


  AppController.prototype._switchControllerToActive = function (stateObject) {
    //Get controller view ref, but when work pick between screens / spaces
    this._activeState = stateObject;
    this._activeViewController = this._getControllerFromState(stateObject);

    this._activeViewController.setState(this._activeState);
  };
  /** Get controller from history state */


  AppController.prototype._getControllerFromState = function (state) {
    var controller;
    var viewControllerRef = state.section;

    if (state.section === Enums_1.SectionType.WORK) {
      viewControllerRef = state.subsection;
    }

    return this.get(viewControllerRef);
  }; //** History state loader complete. Essentiall snazzy animation is complete so ready to show section again */


  AppController.prototype._onDeepLinkLoaderComplete = function () {
    //Reset the view to an intial state as defined by the set state then show
    //(This will mean the view is under the preloaded and will show as it hides)
    this._navMenu.reset();

    this._activeViewController.reset(null, true);

    this._activeViewController.show(null, true);
  };
  /** A department has been reached / displayed on the home view. So que that item up for display (Inject HTM) */


  AppController.prototype._onHomeDepartmentReached = function (event) {
    var view = event.department === Enums_1.DepartmentType.SCREENS ? this._screens : this._spaces;
    view.que();
    GA_1.GA.event('Progress', 'Work section qued', event.department);
  }; //** Logo press jump to home > middle */


  AppController.prototype._onDebugLogoPress = function () {
    GA_1.GA.event('UX', 'Logo press'); //If the home section is active then animate to 0.5:

    if (this._activeState.section === Enums_1.SectionType.HOME) {
      this._home.unpause();

      this._home.animateProgressToValue(1);

      this._mouse.setDragCursorActive(true);

      this._navMenu.reset();

      return;
    } //Home is not showing so, so do hard deep link transition to the section:


    var stateObject = {
      section: Enums_1.SectionType.HOME,
      title: 'Home',
      href: '/',
      isDeepLink: true,
      hideMenu: true
    };

    this._onChangeSection(stateObject);
  };
  /** On active deparment menu press. Basically just scroll back to start of the timeline. */


  AppController.prototype._onActiveDepartmentNavMenuPress = function (department) {
    console.log('ACTIVE DEPARTMENT PRESS');

    this._navMenu.reset();

    var viewController = department === Enums_1.DepartmentType.SCREENS ? this._screens : this._spaces;
    viewController.animateProgressToValue(0);
  };
  /** When menu is opened / closed then need to pause/start whatever 'view' controller is active */


  AppController.prototype._onMenuStateChange = function (e) {
    var _this = this;

    var state = e.state;

    if (state === Enums_1.MenuStateType.OPEN) {
      this._activeViewController.pause();

      this._mouse.pause(); //Menu is opened. So its likely that sectiom will be opened next. So inject that HTML
      //Add slight delay so transition can happen without jank


      setTimeout(function () {
        return _this._info.que();
      }, 1000);
    } else if (state === Enums_1.MenuStateType.CLOSED) {
      this._activeViewController.unpause();

      this._mouse.unpause();
    }

    this._ui.setNavState(state); //Tracking 


    GA_1.GA.event('UX', 'Nav Menu', state);
  };
  /** Reset the menu state on returning back to the  */


  AppController.prototype._onResetNavMenu = function () {
    this._navMenu.reset();
  };

  return AppController;
}(Controller_1.Controller);

exports.AppController = AppController;

/***/ }),

/***/ "./src/app/controller/BackgroundController.ts":
/*!****************************************************!*\
  !*** ./src/app/controller/BackgroundController.ts ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Controller_1 = __webpack_require__(/*! debugbase/abstract/Controller */ "./src/debugbase/abstract/Controller.ts");

var Enums_1 = __webpack_require__(/*! app/data/Enums */ "./src/app/data/Enums.ts");

var Debugbase_1 = __webpack_require__(/*! debugbase/Debugbase */ "./src/debugbase/Debugbase.ts"); //import * as PIXI from 'pixi.js';


var BackgroundController =
/** @class */
function (_super) {
  __extends(BackgroundController, _super); //Set Pixi dependcies 


  function BackgroundController(id) {
    var _this = _super.call(this, id) || this;

    _this._$backgrounds = []; //Self sizing. Essentially a best fit to ensure full screen

    _this._activeBackgroundSet = Enums_1.BackgroundSetType.HOME; //What background is currently active 

    _this._y = 0;
    _this._tweening = false; //Parallax tracking

    _this._mouseOffsets = {
      x: 0,
      y: 0
    };
    _this._mouseOffsetTargets = {
      x: 0,
      y: 0
    };
    _this._mouseRatios = {
      x: 0,
      y: 0
    };
    _this._parallaxPowerMouse = 0.02;
    _this._parallaxEasePower = 8;
    _this._parallaxTargetValue = 8;
    _this._parallaxStartValue = 60;
    _this._parallaxTickDecrease = 1;

    _this.resize();

    return _this;
  }

  BackgroundController.prototype.setPixi = function ($pixi, $bgContainer) {
    this._$pixi = $pixi;
    this._$pixiBGContainer = $bgContainer;
  };
  /**Set set Containers */


  BackgroundController.prototype.setControllers = function (mouse) {
    this._mouseController = mouse;
  }; //Resize event, update all the background sizes to be full screen:


  BackgroundController.prototype.resize = function () {
    var _this = this;

    this._innerWidth = window.innerWidth;
    this._innerHeight = window.innerHeight;

    if (this._$backgrounds.length === 0) {
      return;
    }

    this._$backgrounds.forEach(function (backgroundSprite) {
      backgroundSprite.resize(_this._innerWidth, _this._innerHeight);
    });

    this._repositionBackgrounds(this._innerWidth, this._innerHeight);

    if (!this._tweening) {
      this._y = this._y !== 0 ? -1 * window.innerHeight : 0;
      this._$pixiBGContainer.y = this._y;
    }
  }; //Pixi has loaded the backgrounds: 
  //TODO - maybe don't just blanket load all backgrounds (Depding on sprite / home design / etc)


  BackgroundController.prototype.pixiBackgroundsLoaded = function (spriteSheet) {
    this._spritesheet = spriteSheet;
    this.backgroundSetLoaded(Enums_1.BackgroundSetType.HOME);
    this.backgroundSetLoaded(Enums_1.BackgroundSetType.SCREENS);
    this.backgroundSetLoaded(Enums_1.BackgroundSetType.SPACES);
  }; //Background set is fully loaded so can now go ahead and generate the sprites and animation timelines: 


  BackgroundController.prototype.backgroundSetLoaded = function (set) {
    if (set === Enums_1.BackgroundSetType.HOME) {
      this._createHomeStructure();
    } else if (set === Enums_1.BackgroundSetType.SCREENS) {
      this._createWorkStructure(Enums_1.DepartmentType.SCREENS);
    } else if (set === Enums_1.BackgroundSetType.SPACES) {
      this._createWorkStructure(Enums_1.DepartmentType.SPACES);
    }

    this._createBackgroundTimeline(set); //Trigger resize to fix sizing: 


    this.resize(); //Set the max amount that the background will be allowed to scroll: 

    this._setTotalSrollValues();

    this.setXProgress(0.5);
  }; //Set X progress 


  BackgroundController.prototype.setXProgress = function (ratio) {
    if (!this._tweening) {
      this._$pixiBGContainer.x = -1 * (this._totalXScroll * ratio) + this._mouseOffsets.x;
      this._$pixiBGContainer.y = this._y + this._mouseOffsets.y;
      this._ratio = ratio;
    }

    if (this._activeTimeline) {
      this._activeTimeline.progress(this.math.constrain(ratio, 0, 1));
    }
  };

  BackgroundController.prototype.tick = function () {
    //If not tweening on tranition then do parallax logic: 
    if (!this._tweening) {
      this._updateParallaxOffset(this._mouseController.getMouseCords());
    }
  };
  /**
  * Animate to the Work section
  * @param {DepartmentType} - Screens or spaces type.
  */


  BackgroundController.prototype.animateToWork = function (department) {
    var _this = this;

    var x = department === Enums_1.DepartmentType.SCREENS ? 0 : -1 * (this._totalXScroll * this._ratio);
    x = 0;
    this._tweening = true;

    this._resetParallax();

    this._y = -1 * window.innerHeight;
    gsap.TweenMax.to(this._$pixiBGContainer, 2, {
      y: this._y,
      x: x,
      ease: gsap.Power3.easeInOut,
      onComplete: function onComplete() {
        return _this._startParallax();
      }
    });
    this._activeTimeline = department === Enums_1.DepartmentType.SCREENS ? this._screensTimeline : this._spacesTimeline;
  };
  /**
  * Animate to the Work section
  * @param {DepartmentType} - Screens or spaces type.
  */


  BackgroundController.prototype.animateToHome = function (department) {
    var _this = this;

    var x = department === Enums_1.DepartmentType.SCREENS ? 0 : -1 * (this._totalXScroll * this._ratio);
    this._y = 0;
    this._tweening = true;

    this._resetParallax();

    gsap.TweenMax.to(this._$pixiBGContainer, 2, {
      y: this._y,
      x: x,
      ease: gsap.Power3.easeInOut,
      onComplete: function onComplete() {
        return _this._startParallax();
      }
    });
    this._activeTimeline = this._homeTimeline;
  };
  /** Set tweening to stop updates */


  BackgroundController.prototype.setTweening = function (tweening) {
    this._tweening = tweening;
  };
  /** Start the parallax tween in (to stop harsh quick starts after transitions) */


  BackgroundController.prototype.startParallaxEaseIn = function () {
    this._startParallax();
  };
  /** Reset to state */


  BackgroundController.prototype.reset = function (state) {
    if (state === void 0) {
      state = null;
    }

    this._tweening = false;

    this._resetParallax();

    if (state.section === Enums_1.SectionType.HOME) {
      this._ratio = 0.5;
      this._y = 0;
      this._activeTimeline = this._homeTimeline;
    }

    if (state.section === Enums_1.SectionType.WORK) {
      this._ratio = state.subsection === Enums_1.DepartmentType.SCREENS ? 0 : 1;
      this._y = -1 * window.innerHeight;
      this._activeTimeline = state.subsection === Enums_1.DepartmentType.SCREENS ? this._screensTimeline : this._spacesTimeline;
    } //Set the position of PIXI container


    var x = -1 * (this._totalXScroll * this._ratio);
    gsap.TweenMax.set(this._$pixiBGContainer, {
      y: this._y,
      x: x
    }); //Set the timeline to correct position( Which handle colour tweening):

    if (this._activeTimeline) {
      this._activeTimeline.progress(this._ratio);
    }
  }; //Private 
  //--------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------
  //Create the top level for screens <> home <> spaces


  BackgroundController.prototype._createHomeStructure = function () {
    //Add left 'screens' tile 
    var screens = new FullScreenPixiSprite(this._$pixiBGContainer, this._spritesheet.textures['screens-bg.jpg']);
    screens.setType = Enums_1.BackgroundSetType.HOME;
    screens.id = 'home-screens';

    this._$backgrounds.push(screens); //Add right screens side (Flip so can be tiled)


    var spaces = new FullScreenPixiSprite(this._$pixiBGContainer, this._spritesheet.textures['screens-bg.jpg'], true);
    spaces.setType = Enums_1.BackgroundSetType.HOME;
    spaces.id = 'home-spaces'; //spaces.getSprite().alpha = 0;

    this._$backgrounds.push(spaces);
  }; //Create the work structure for the work carosuel: 


  BackgroundController.prototype._createWorkStructure = function (department) {
    if (department === Enums_1.DepartmentType.SCREENS) {
      //Add left 'screens' tile 
      var left = new FullScreenPixiSprite(this._$pixiBGContainer, this._spritesheet.textures['screens-bg.jpg'], false, true);
      left.setType = Enums_1.BackgroundSetType.SCREENS;
      left.id = 'screens-left'; //eft.getSprite().alpha = 0;

      this._$backgrounds.push(left); //Add right screens side (Flip so can be tiled)


      var right = new FullScreenPixiSprite(this._$pixiBGContainer, this._spritesheet.textures['screens-bg.jpg'], true, true);
      right.setType = Enums_1.BackgroundSetType.SCREENS;
      right.id = 'screens-right'; //right.getSprite().alpha = 0;

      this._$backgrounds.push(right);
    } else if (department === Enums_1.DepartmentType.SPACES) {}
  }; //Reposition backgrounds 


  BackgroundController.prototype._repositionBackgrounds = function (innerWidth, innerHeight) {
    //HOME ---------------------------------------------------------------------------------------
    var homeScreensBG = this._getBackgroundById('home-screens');

    if (homeScreensBG) {
      //Postion home screen at center of innerWidth / height 
      homeScreensBG.setPosition(innerWidth / 2, innerHeight / 2); //Postion home so it's tiled with 

      var homeSpacesBG = this._getBackgroundById('home-spaces');

      homeSpacesBG.setPosition(innerWidth / 2 + homeScreensBG.getSize().width, innerHeight / 2);
    } //SCREENS  ------------------------------------------------------------------------------------


    var screensLeftBG = this._getBackgroundById('screens-left');

    if (screensLeftBG) {
      //Postion screens left under the home BG
      //This is so it can animated down to on transition to work section:  
      var screenX_1 = innerWidth / 2;
      var screenY_1 = innerHeight / 2 + homeScreensBG.getSize().height;
      screensLeftBG.setPosition(screenX_1, screenY_1); //Postion 2nd image so it's tiled: 

      var screensRighttBG = this._getBackgroundById('screens-right');

      screensRighttBG.setPosition(screenX_1 + homeScreensBG.getSize().width, screenY_1); //Tiles below to fi
    } //SPACES  ----------------------------------------------------------------------------------------

  }; //Set the amount that can be scrolled to


  BackgroundController.prototype._setTotalSrollValues = function () {
    if (this._activeBackgroundSet === Enums_1.BackgroundSetType.HOME) {
      //Home max scroll is the position of the right tile + the 
      var homeSpacesBG = this._getBackgroundById('home-spaces');

      this._totalXScroll = homeSpacesBG.getSprite().x - homeSpacesBG.getSize().width / 2;
    } else if (this._activeBackgroundSet === Enums_1.BackgroundSetType.SCREENS) {
      //Home max scroll is the position of the right tile + the 
      var rightBG = this._getBackgroundById('screens-right');

      this._totalXScroll = rightBG.getSprite().x + rightBG.getSize().width / 2;
    } else if (this._activeBackgroundSet === Enums_1.BackgroundSetType.SPACES) {}
  }; //Create work bacground timeline (To colour the sprite, only really viable with TweenMax)
  //TODO: actual colours/times needs to be dyanmic based on tile settings 


  BackgroundController.prototype._createBackgroundTimeline = function (set) {
    if (set === Enums_1.BackgroundSetType.HOME) {
      this._homeTimeline = new gsap.TimelineMax();

      this._homeTimeline.pause(); //let backgrounds: Array <PIXI.Sprite> = this._getBackgroundSpitesByType(BackgroundSetType.HOME);


      var backgrounds = this._$pixiBGContainer; //this._homeTimeline
      //.set(backgrounds, {pixi: {colorMatrixFilter: null, ease: gsap.Power0.easeNone}}, 0)								//Reset for base image 
      //.to(backgrounds, 0.2, {pixi: {colorize: 0x333333 , colorizeAmount: 0.7, ease: gsap.Power0.easeNone}}, 0.3)		//Dark grey for landing
      //.set(backgrounds, {pixi: {colorize: 0x333333 , colorizeAmount: 0.7, ease: gsap.Power0.easeNone}}, 0.5)		//Dark grey for landing
      //.to(backgrounds, 0.3, {pixi: {colorize: 0x0ca0ad , colorizeAmount: 1, ease: gsap.Power0.easeNone}}, 0.7)		//Green
      //.set(backgrounds, {pixi: { alpha: 1} }, 1);

      this._activeTimeline = this._homeTimeline;
    } else if (set === Enums_1.BackgroundSetType.SCREENS) {
      this._screensTimeline = new gsap.TimelineMax();

      this._screensTimeline.pause(); //let backgrounds: Array <PIXI.Sprite> = this._getBackgroundSpitesByType(BackgroundSetType.SCREENS);


      var backgrounds = this._$pixiBGContainer;

      this._screensTimeline.from(backgrounds, 0.2, {
        pixi: {
          colorMatrixFilter: null
        },
        ease: gsap.Power0.easeNone
      }, 0) //Reset to base 
      .to(backgrounds, 0.2, {
        pixi: {
          colorize: 0x00c0ff,
          colorizeAmount: 0.5,
          ease: gsap.Power0.easeNone
        }
      }, 0.4) //Toytown blue
      .to(backgrounds, 0.2, {
        pixi: {
          colorize: 0xff0000,
          colorizeAmount: 0.5,
          ease: gsap.Power0.easeNone
        }
      }, 0.6) //Market masters red
      .to(backgrounds, 0.2, {
        pixi: {
          colorize: null,
          colorizeAmount: 0.5,
          ease: gsap.Power0.easeNone
        }
      }, 0.8) //Reset to base 
      .set(backgrounds, {
        pixi: {
          alpha: 1
        }
      }, 1);
    } else if (set === Enums_1.BackgroundSetType.SPACES) {
      this._spacesTimeline = new gsap.TimelineMax();

      this._spacesTimeline.pause(); //let backgrounds: Array <PIXI.Sprite> = this._getBackgroundSpitesByType(BackgroundSetType.SPACES);


      var backgrounds = this._$pixiBGContainer;

      this._spacesTimeline.set(backgrounds, {
        pixi: {
          colorize: 0x0ca0ad,
          colorizeAmount: 0.6
        }
      }, 0).to(backgrounds, 1, {
        pixi: {
          colorize: 0x077ebc,
          colorizeAmount: 0.6
        },
        ease: gsap.Power0.easeNone
      }, 0) //Reset to base 
      .set(backgrounds, {
        pixi: {
          alpha: 1
        }
      }, 1);
    }
  }; //Get all sprites on a background set so they can be tweened with TweenMax


  BackgroundController.prototype._getBackgroundSpitesByType = function (setType) {
    var backgrounds = [];

    for (var i = 0; i < this._$backgrounds.length; i++) {
      if (this._$backgrounds[i].setType === setType) {
        backgrounds.push(this._$backgrounds[i].getSprite());
      }
    }

    return backgrounds;
  };

  BackgroundController.prototype._getBackgroundById = function (id) {
    for (var i = 0; i < this._$backgrounds.length; i++) {
      if (this._$backgrounds[i].id === id) {
        return this._$backgrounds[i];
      }
    }

    return null;
  };
  /**Update the parallax due to mouse OR mobile device acceleromater */


  BackgroundController.prototype._updateParallaxOffset = function (mouseCords) {
    //Movement is slowed after animations to stop harsh jumps to mouse position
    this._setParallaxRate(); //X:


    this._mouseRatios.x = mouseCords.x / this._innerHeight - 0.5;
    this._mouseOffsetTargets.x = -1 * (this._mouseRatios.x * (this._innerHeight * this._parallaxPowerMouse));
    this._mouseOffsets.x = this._mouseOffsets.x + (this._mouseOffsetTargets.x - this._mouseOffsets.x) / this._parallaxEasePower; //Y: 

    this._mouseRatios.y = mouseCords.y / this._innerWidth - 0.5;
    this._mouseOffsetTargets.y = -1 * (this._mouseRatios.y * (this._innerHeight * this._parallaxPowerMouse));
    this._mouseOffsets.y = this._mouseOffsets.y + (this._mouseOffsetTargets.y - this._mouseOffsets.y) / this._parallaxEasePower;
  };
  /** Start parallax working */


  BackgroundController.prototype._startParallax = function () {
    this._tweening = false;
    this._parallaxEasePower = this._parallaxStartValue;
  };
  /** Set the rate of movement. Stop harsh start at begining */


  BackgroundController.prototype._setParallaxRate = function () {
    if (this._parallaxEasePower > this._parallaxTargetValue) {
      this._parallaxEasePower -= this._parallaxTickDecrease;
    }
  };
  /** Reset parallax */


  BackgroundController.prototype._resetParallax = function () {
    this._mouseRatios.x = this._mouseRatios.y = 0;
    this._mouseOffsetTargets.x = this._mouseOffsetTargets.y = 0;
    this._mouseOffsets.x = this._mouseOffsets.y = 0;
  };

  return BackgroundController;
}(Controller_1.Controller);

exports.BackgroundController = BackgroundController;

var FullScreenPixiSprite =
/** @class */
function () {
  function FullScreenPixiSprite($bgContainer, texture, flipX, flipY) {
    if (flipX === void 0) {
      flipX = false;
    }

    if (flipY === void 0) {
      flipY = false;
    }

    this._flipX = 1;
    this._flipY = 1;
    this._$pixiBGContainer = $bgContainer;
    this._flipX = flipX ? -1 : 1;
    this._flipY = flipY ? -1 : 1;

    this._createSprite(texture);
  }

  FullScreenPixiSprite.prototype.getSprite = function () {
    return this._$sprite;
  }; //Set the poistion of the sprite inside the big container: 


  FullScreenPixiSprite.prototype.setPosition = function (x, y) {
    this._$sprite.position.set(x, y);
  }; //Return back a width/height object in px so surrounding backgrounds can be positoned relative: 


  FullScreenPixiSprite.prototype.getSize = function () {
    return {
      width: this._$sprite.texture.width * this._scale,
      height: this._$sprite.texture.height * this._scale
    };
  }; //Resize the sprite so it scales to be 100% 
  //Note does't mask as needs to tile (Does it - depends on final design ???)


  FullScreenPixiSprite.prototype.resize = function (innerWidth, innerHeight) {
    //Work out best scale to use to display the background full screen: 
    this._scale = Debugbase_1.Debugbase.math.getBestFitScale({
      width: this._$sprite.texture.width,
      height: this._$sprite.texture.height
    }, {
      width: innerWidth,
      height: innerHeight
    }); //Set the scale of the sprite: 

    this._$sprite.scale.set(this._scale * this._flipX, this._scale * this._flipY);
  }; //Private 
  //--------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------
  //Create and add the sprite to the stage 


  FullScreenPixiSprite.prototype._createSprite = function (texture) {
    this._$sprite = new PIXI.Sprite(texture);
    this._$sprite.interactive = false;
    this._$sprite.anchor.x = 0.5;
    this._$sprite.anchor.y = 0.5;

    this._$pixiBGContainer.addChild(this._$sprite);
  };

  return FullScreenPixiSprite;
}();

exports.FullScreenPixiSprite = FullScreenPixiSprite;

/***/ }),

/***/ "./src/app/controller/HistoryController.ts":
/*!*************************************************!*\
  !*** ./src/app/controller/HistoryController.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Controller_1 = __webpack_require__(/*! debugbase/abstract/Controller */ "./src/debugbase/abstract/Controller.ts");

var Events_1 = __webpack_require__(/*! debugbase/events/Events */ "./src/debugbase/events/Events.ts");

var AppEvents_1 = __webpack_require__(/*! app/data/AppEvents */ "./src/app/data/AppEvents.ts");
/** @class Controller to manage history state elements  */


var HistoryController =
/** @class */
function (_super) {
  __extends(HistoryController, _super);

  function HistoryController() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  /** As a global controller init will be called on load. So set the intial state. Used when back takes to intial page  website */


  HistoryController.prototype.init = function () {
    //Add listener for popstate: 
    window.onpopstate = this._onPop.bind(this);
  };
  /**
   * Set intial state loadup. Comes from View controller init > event as  logic for working out where loaded is bit tricky to make fully modular
   * @param {HistoryStateModel} stateObject - State object to rebuild the view from
   */


  HistoryController.prototype.setIntialState = function (stateObject) {
    this._initalState = stateObject;
  };
  /**
   * Add a history state in (Because of section change event)
   * @param {HistoryStateModel} stateObject - State object to rebuild the view from
   * @param {string} title - Title of the page.
   * @param {string} string - new page url to switch to.
  */


  HistoryController.prototype.push = function (stateObject, title, url) {
    window.history.pushState(stateObject, this._getFullTitle(title), url);
    document.title = this._getFullTitle(title);

    if (window.ga) {
      window.ga('set', 'page', url);
      window.ga('send', 'pageview');
    }
  }; //PRIVATE 
  //----------------------------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------------------------

  /** User inicated back or forward navigation */


  HistoryController.prototype._onPop = function () {
    this._currentState = window.history.state !== null ? window.history.state : this._initalState;
    Events_1.Events.dispatch(AppEvents_1.AppEvents.POP_HISTORY_STATE, this._currentState);
  };
  /** Get full combined title */


  HistoryController.prototype._getFullTitle = function (post) {
    return post + " | Debug Digital";
  };

  return HistoryController;
}(Controller_1.Controller);

exports.HistoryController = HistoryController;

/***/ }),

/***/ "./src/app/controller/HomeController.ts":
/*!**********************************************!*\
  !*** ./src/app/controller/HomeController.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var GA_1 = __webpack_require__(/*! debugbase/tracking/GA */ "./src/debugbase/tracking/GA.ts");

var Controller_1 = __webpack_require__(/*! debugbase/abstract/Controller */ "./src/debugbase/abstract/Controller.ts");

var Enums_1 = __webpack_require__(/*! app/data/Enums */ "./src/app/data/Enums.ts");

var DragBreakpoints_1 = __webpack_require__(/*! debugbase/util/DragBreakpoints */ "./src/debugbase/util/DragBreakpoints.ts");

var Events_1 = __webpack_require__(/*! debugbase/events/Events */ "./src/debugbase/events/Events.ts");

var AppEvents_1 = __webpack_require__(/*! app/data/AppEvents */ "./src/app/data/AppEvents.ts");

var HomeTimelineMain_1 = __webpack_require__(/*! ./home/HomeTimelineMain */ "./src/app/controller/home/HomeTimelineMain.ts");

var Paging_1 = __webpack_require__(/*! app/module/global/Paging */ "./src/app/module/global/Paging.ts");

var ViewReadyEvent_1 = __webpack_require__(/*! app/event/ViewReadyEvent */ "./src/app/event/ViewReadyEvent.ts");

var HomeDepartmentReachedEvent_1 = __webpack_require__(/*! app/event/HomeDepartmentReachedEvent */ "./src/app/event/HomeDepartmentReachedEvent.ts");

var DebugKeypressEvent_1 = __webpack_require__(/*! app/event/DebugKeypressEvent */ "./src/app/event/DebugKeypressEvent.ts");

var TextScramble_1 = __webpack_require__(/*! app/module/home/homeUtil/TextScramble */ "./src/app/module/home/homeUtil/TextScramble.ts"); //import { TimelineMax, TweenMax, Power0, Power3, Back } from 'gsap';
//import * as PIXI from 'pixi.js';


var HomeController =
/** @class */
function (_super) {
  __extends(HomeController, _super);

  function HomeController() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this._active = false; //Is interative / active

    _this._readyToSetup = false; //Is ready to view. So can be setup for viewing oif required

    _this._isSetup = false; //Is setup up ready to view

    _this._yScrollActive = false;
    _this._resetAndShowQued = false;
    _this._breakpointIndex = 1;
    _this._progressX = 0.5;
    _this._loadFlags = {
      pixi: false,
      moth: false,
      dom: false,
      json: false
    };
    _this._queFlags = {
      screens: false,
      spaces: false
    };
    _this._velocity = 0;
    _this._frameProgress = 0;
    _this._timeouts = {};
    _this._tweens = {};
    _this._intervals = {};
    _this._timeoutInt = 0;
    return _this;
  } //Init is called when routed on /


  HomeController.prototype.init = function () {
    var _this = this;

    this._active = true; //Set the opening state to the homepage: 

    var openingState = {
      section: Enums_1.SectionType.HOME,
      title: '',
      href: '/'
    };
    Events_1.Events.dispatch(AppEvents_1.AppEvents.SET_INTIAL_STATE, openingState);
    this._textScrable = new TextScramble_1.TextScramble(document.querySelector('.home__action__text'), 10);
    this.get('Preload').textScrable = this._textScrable;
    var button = document.querySelector('.home__explore__area .home__action__button__wrapper');
    button.addEventListener('mouseover', function (e) {
      var rect = e.target.parentElement.parentElement.getBoundingClientRect();
      var center = {
        x: rect.left + 50,
        y: rect.top + 80
      };

      _this._mainTimeline.setButtonHover(center);

      _this._mouseController.setHiddenState(true);
    });
    button.addEventListener('mouseout', function () {
      _this._mainTimeline.setButtonOut(Enums_1.DepartmentType.SCREENS);

      _this._mouseController.setHiddenState(false);
    });
    button = document.querySelector('.home__explore__area .home__action__button__wrapper.-spaces');
    button.addEventListener('mouseover', function (e) {
      var rect = e.target.parentElement.parentElement.getBoundingClientRect();
      var center = {
        x: rect.left + 50,
        y: rect.top + 80
      };

      _this._mainTimeline.setButtonHover(center);

      _this._mouseController.setHiddenState(true);
    });
    button.addEventListener('mouseout', function () {
      _this._mainTimeline.setButtonOut(Enums_1.DepartmentType.SPACES);

      _this._mouseController.setHiddenState(false);
    });
  }; //Getters ---------------------------------------------------------------------

  /** Get is section / controller is active */


  HomeController.prototype.isActive = function () {
    return this._active;
  };
  /** Get if ready to setup for view */


  HomeController.prototype.isReadyToSetup = function () {
    return this._readyToSetup;
  };
  /** Check is ready to view. Really needs to check is 'ready to setup' */


  HomeController.prototype.isReadyToView = function (stateObject) {
    return this.isReadyToSetup();
  };

  HomeController.prototype.readyForDeeplink = function () {
    //If this function is being called then process is checking if it can show 
    //So if its ready to setup but not actually been created then can setup here
    if (this._readyToSetup && !this._isSetup) {
      this._setup();
    }

    return this._readyToSetup && this._isSetup;
  }; //Setters-----------------------------------------------------------------------
  //Set controller depencies (set from app controller): 


  HomeController.prototype.setControllers = function (mouse, background, pixi) {
    //Set references to required controllers: 
    this._mouseController = mouse;
    this._backgroundController = background;
    this._pixiController = pixi;
  }; //Pixi dependecy (set in AppController): 


  HomeController.prototype.setPixi = function ($pixi, $homeContainer) {
    this._$pixi = $pixi;
    this._$homeContainer = $homeContainer;
  };
  /** History state has been changed by / back forward */


  HomeController.prototype.setState = function (state) {
    this._state = state;
  };
  /**
  /* HTML has loaded from external, so set as requried:
  * @param {string} html -  raw ajax loaded HTML
  */


  HomeController.prototype.setHTML = function (html) {
    this._html = html;
    this._loadFlags.dom = true;

    this._testReadyToSetup();
  };
  /**
  /* JSON config has loaded so set:
  * @param {HomeJSONModel} json -  JSON data for home view
  */


  HomeController.prototype.setJSON = function (json) {
    this._json = json;

    this._setVirtualWidth();

    this._loadFlags.json = true;

    this._testReadyToSetup();
  }; //Public-------------------------------------------------------------------------

  /** Reset is always called before showing to put in correct state. Seperate from 'show' as a deplay might be needed between the 2 */


  HomeController.prototype.reset = function (oldState, isDeeplink) {
    if (oldState === void 0) {
      oldState = null;
    }

    if (isDeeplink === void 0) {
      isDeeplink = false;
    }

    this._oldState = oldState; //If not setup then do 

    if (!this._isSetup) {
      this._setup();

      this._resetAndShowQued = true;
      return;
    } //0.) Generic across all types of show: 


    this._resetIntervalsAndAnimations();

    this._mouseController.setColour('light');

    this._$homeContainer.visible = true;

    if (this.container) {
      this.DOM.addClass(this.container, '-active');
      gsap.TweenMax.set([this.container, document.querySelector('canvas')], {
        autoAlpha: 1,
        scale: 1
      });
    } //Is a deeplink for get ready to show coming direct from Preoader 


    if (isDeeplink) {
      this._resetForDeeplink();

      return;
    } //If transition is coming back from screens / spaces section


    if (oldState.section === Enums_1.SectionType.WORK) {
      this._resetFromWork(oldState.subsection);
    }
  };
  /** Preloading is complete can be shown / activate dragging: */


  HomeController.prototype.show = function (oldState, isDeeplink) {
    if (oldState === void 0) {
      oldState = null;
    }

    if (isDeeplink === void 0) {
      isDeeplink = false;
    }

    if (!this.container) {
      return;
    }

    this._pixiController.unpause();

    if (isDeeplink) {
      this._showForDeeplink();

      return;
    }

    if (oldState.section === Enums_1.SectionType.WORK) {
      this._showFromWork(oldState.subsection);
    }
  };
  /**
  * Hide after section is moved away from. The new state is passed so can work out how to transition out
  * @param {HistoryStateModel} newState
  */


  HomeController.prototype.hide = function (newState) {
    if (newState === void 0) {
      newState = null;
    }

    if (newState.section === Enums_1.SectionType.INFO) {
      this._hideForInfo();
    } else if (newState.section === Enums_1.SectionType.WORK) {
      this._hideForWork(newState.subsection);
    }

    this._active = false;
  };
  /** Freeze for when transitions are being used */


  HomeController.prototype.freeze = function () {
    var _this = this;

    this._active = false;

    this._setInteractionEnabled(false);

    this._resetIntervalsAndAnimations();

    this._timeouts.freeze = setTimeout(function () {
      return _this._cleanupAfterFreeze();
    }, 500);
  };
  /** Pause (For when nav menu is showing) */


  HomeController.prototype.pause = function () {
    this._setInteractionEnabled(false);

    gsap.TweenMax.to([this.container, document.querySelector('canvas')], 0.45, {
      scale: 1.2,
      ease: gsap.Power3.easeOut
    });
  };
  /** Unpause (For when nav menu is hidden) */


  HomeController.prototype.unpause = function () {
    this._setInteractionEnabled(true);

    gsap.TweenMax.to([this.container, document.querySelector('canvas')], 0.45, {
      scale: 1,
      ease: gsap.Power3.easeOut
    });
  };
  /**  Modules are mounted to the DOM and ready to access */


  HomeController.prototype.modulesMounted = function () {
    if (this._active) {
      this._setupPaging();
    }
  };

  HomeController.prototype.pixiParticlesLoaded = function (spritesheet) {
    this._pixiSpritesheet = spritesheet;
    this._loadFlags.pixi = true;

    this._testReadyToSetup();

    if (this._readyToSetup && this._active) {
      this._setup();
    }
  };
  /** The logo morpth sprite has loaded so create that animation setup */


  HomeController.prototype.pixiMothLoaded = function (spritesheet) {
    this._mothSpritesheet = spritesheet;
    this._loadFlags.moth = true;

    this._testReadyToSetup();

    if (this._readyToSetup && this._active) {
      this._setup();
    }
  };
  /** DOM has loaded / ready so flag and setup as required */


  HomeController.prototype.DOMReady = function () {
    //If active then on home view, so the html will already be on the page
    //Otherwise create container elements to load section to
    if (this._active) {
      this._loadFlags.dom = true;

      this._testReadyToSetup();

      this._setup();
    }
  };

  HomeController.prototype.resize = function () {
    if (this._json) {
      this._setVirtualWidth();
    }

    if (this._isSetup) {
      this._mainTimeline.setVirtualWidth(this._virtualWidth);

      this._mainBreakpoints.setVirtualWidth(this._virtualWidth);

      this._$homeContainer.pivot.y = this._innerHeight / 2;
      this._$homeContainer.y = this._innerHeight / 2; //this._moth.resize(this._virtualWidth, window.innerHeight);
    }
  };

  HomeController.prototype.tick = function () {
    if (!this._active || !this._isSetup) {
      return;
    }

    this._checkWorkQueFlags();

    this._processVelocity();

    this._$homeContainer.scale.set(1.0 + 0.3 * Math.abs(this._velocity), 1.0 + 0.3 * Math.abs(this._velocity));

    if (this._mainTimeline) {
      //this._moth.position
      this._mainTimeline.tick(this._mouseController.getMouseCords(), this._mouseController.mouseIsDown(), this._velocity, false, false);
    } //if ( this._moth ) {
    //this._moth.tick(this._mouseController.getMouseCords(), this._mainTimeline.containerX, this._progressX);
    //}

  }; //The logo morpth sprite has loaded so create that animation setup
  //public pixiLogoMorpthLoaded(spritesheet: PIXI.Spritesheet): void {
  //	this._mainTimeline.createLogoTimelinePixi(this._$homeContainer, spritesheet);
  //}

  /**
  * Animate x to progress to a point in time
  * @param {number} index -  break point Index to animate to (0 Screens | 1 Home | 2 Spaces)
  */


  HomeController.prototype.animateProgressToValue = function (index) {
    this._breakpointIndex = index;

    this._mainBreakpoints.setIndex(index);
  }; //** Stop the paging guide effect animation */


  HomeController.prototype.stopPagingGuide = function () {
    this._paging.removeGuideEffect(1);
  };

  HomeController.prototype.setPagingIndex = function (index) {
    this._breakpointIndex = index;

    this._paging.setActiveIndex(index);
  }; //private 
  //----------------------------------------------------------------------
  //----------------------------------------------------------------------
  //----------------------------------------------------------------------
  //----------------------------------------------------------------------

  /** Work out the virtual container width of view. Used in timeline and drag logic */


  HomeController.prototype._setVirtualWidth = function () {
    this._innerWidth = window.innerWidth;
    this._innerHeight = window.innerHeight;
    this._virtualWidth = this._innerWidth * this._json.containerViewportsDesktop;

    if (this._innerWidth < 1000) {
      this._virtualWidth = this._innerWidth * this._json.containerViewportsTablet;
    }

    if (this._innerWidth < 600) {
      this._virtualWidth = this._innerWidth * this._json.containerViewportsMobile;
    }
  };
  /** Test that the view is ready to show */


  HomeController.prototype._testReadyToSetup = function () {
    var fireEvent = !this._readyToSetup;
    this._readyToSetup = this._loadFlags.dom && this._loadFlags.pixi && this._loadFlags.moth && this._loadFlags.json; //If ready for first time flag this: 

    if (fireEvent && this._readyToSetup) {
      //Trigger the VIEW_SETUP event, which can be picked up by any loading processes: 
      Events_1.Events.dispatch(new ViewReadyEvent_1.ViewReadyEvent({
        view: Enums_1.ViewType.HOME
      }), {
        delay: 1
      });
    }
  };
  /** Check DOM / Pixi requirements are ready, if so can setup */


  HomeController.prototype._setup = function () {
    var _this = this;

    if (!this._readyToSetup || this._isSetup) {
      return;
    } //If page is not ready then get the 


    if (!this.container) {
      this.DOM.append(document.querySelector('body'), this._html, function () {
        _this.container = document.querySelector('.home');

        _this._setup();
      });
      return;
    }

    this._setVirtualWidth();

    this._setupPaging();

    this._addEvents();

    this._createTimelines();

    this._createMoth();

    this._createBreakpoints();

    this._isSetup = true;
    this.resize(); //If reset and show qued then

    if (this._resetAndShowQued) {
      this.reset(this._oldState, false);
      this.show(this._oldState, false);
      this._resetAndShowQued = false;
    }
  };
  /** Setup paging */


  HomeController.prototype._setupPaging = function () {
    //If active then paging module is already auto crated on the page:
    if (this._active) {
      this._paging = this.module.get('home-paging');

      this._paging.setCallbacks(this._pagingClick.bind(this));

      return;
    } //Otherwise manually create:


    this._paging = new Paging_1.Paging();

    this._paging.setContainer(this.container.querySelector('.ui__paging__home'));

    this._paging.id = 'home-paging';

    this._paging.create();

    this._paging.config.activeIndex = 1;

    this._paging.setCallbacks(this._pagingClick.bind(this));
  };
  /** Set interactoon to on/off */


  HomeController.prototype._setInteractionEnabled = function (enabled) {
    this._active = enabled;

    this._mainBreakpoints.setActive(enabled);

    this._mainTimeline.setActive(enabled);
  };

  HomeController.prototype._addEvents = function () {
    //Add the main explore clicks 
    Events_1.Events.on('click', '.home__explorelink', this._onExploreButtonClick.bind(this)); //Events.on(DebugMouseWheelEvent,  this._onMouseWheel.bind(this));

    Events_1.Events.on(DebugKeypressEvent_1.DebugKeypressEvent, this._onKeyPress.bind(this));
  };

  HomeController.prototype._pagingClick = function (index) {
    this._breakpointIndex = index;

    this._mainBreakpoints.setIndex(index);

    this._paging.setActiveIndex(index);
  };

  HomeController.prototype._createBreakpoints = function () {
    var _this = this; //Create the 0% / 50% / 100% for SCREENS <> HOME <> SPACES layout 


    this._mainBreakpoints = new DragBreakpoints_1.DragBreakpoints(3, false, 1, false);

    this._mainBreakpoints.setVirtualWidth(this._virtualWidth);

    this._mainBreakpoints.setDragToMoveRatio(this._json.dragToMoveRatio);

    this._mainBreakpoints.easePower = this._json.dragEasePower;
    this._mainBreakpoints.releaseEasePower = this._json.releaseEasePower;
    this._mainBreakpoints.forceSnap = false;

    this._mainBreakpoints.setProgress(0.5);

    this._mainBreakpoints.onTick = function (progressRatio) {
      _this._frameProgress = progressRatio - _this._progressX;
      _this._progressX = progressRatio;

      _this._backgroundController.setXProgress(progressRatio);

      _this._mainTimeline.setProgress(progressRatio);

      _this._effectVelocity(_this._frameProgress);
    };

    this._mainBreakpoints.onStartDrag = function () {
      _this._mouseController.setDragDown(true); //this._moth.acivate();
      //this._moth.startDrag();

    };

    this._mainBreakpoints.onStopDrag = function () {
      _this._mouseController.setDragDown(false); //this._moth.stopDrag();

    };
  }; //Create the different animations for x and y movement on home: 


  HomeController.prototype._createTimelines = function () {
    var _this = this;

    this._mainTimeline = new HomeTimelineMain_1.HomeTimelineMain(this._mouseController, this._json);

    this._mainTimeline.setVirtualWidth(this._virtualWidth); //Pass the main: 


    this._mainTimeline.setUIRefs(this.container.querySelector('.home__intro'), this.container.querySelector('.home__screens'), this.container.querySelector('.home__spaces'), this.container.querySelector('.ui__paging__home'));

    this._mainTimeline.create();

    this._mainTimeline.setProgress(0.5);

    this._mainTimeline.createParticlesPixi(this._$homeContainer, this._pixiSpritesheet);

    this._mainTimeline.setVirtualWidth(this._virtualWidth);

    this._mainTimeline.onCompleteExit = function () {
      return _this.DOM.removeClass(_this.container, '-active');
    };
  };
  /** Create the animated moth */


  HomeController.prototype._createMoth = function () {//this._moth = new HomeMoth(this._mothSpritesheet, this._$homeContainer, this._virtualWidth, window.innerHeight, this._mainTimeline.containerX);
  }; //Tolerence has been passed so flag that timeline has been selected: 


  HomeController.prototype._departmentSnapped = function (department) {};

  HomeController.prototype._effectVelocity = function (frameMoveRatio) {
    this._velocity += frameMoveRatio * this._json.velocityFactor;
  };
  /** Tick function to effect velcoity and rotation: */


  HomeController.prototype._processVelocity = function () {
    this._velocity *= this._json.velocityFriction;
  };
  /** Work section is qued when the users gets to a certian point on X. This is to allow seamless transitions between home > work */


  HomeController.prototype._checkWorkQueFlags = function () {
    if (!this._queFlags.screens && this._progressX < 0.25) {
      this._queFlags.screens = true;
      Events_1.Events.dispatch(new HomeDepartmentReachedEvent_1.HomeDepartmentReachedEvent({
        department: Enums_1.DepartmentType.SCREENS
      }));
    }

    if (!this._queFlags.spaces && this._progressX > 0.75) {
      this._queFlags.spaces = true;
      Events_1.Events.dispatch(new HomeDepartmentReachedEvent_1.HomeDepartmentReachedEvent({
        department: Enums_1.DepartmentType.SPACES
      }));
    }
  };
  /** On explore press */


  HomeController.prototype._onExploreButtonClick = function (e) {
    e.preventDefault();

    this._setInteractionEnabled(false);

    var $link = e.target;
    var department = $link.getAttribute('data-department');

    if (!department) {
      department = this._mainTimeline.progress <= 0.5 ? Enums_1.DepartmentType.SCREENS : Enums_1.DepartmentType.SPACES;
    }

    this.DOM.addClass($link, '-lineclicked');
    GA_1.GA.event('UX', 'Home > Explore button', department); //Trigger event to switch to 'work' controller for department: 

    var newState = {
      section: Enums_1.SectionType.WORK,
      subsection: department,
      title: department === Enums_1.DepartmentType.SCREENS ? 'Screens' : 'Spaces',
      href: "/" + department + "/"
    };
    Events_1.Events.dispatch(AppEvents_1.AppEvents.CHANGE_SECTION, newState);
    return false;
  }; //Scrollwheel / mouse press 
  //------------------------------------------------------------------------------------


  HomeController.prototype._onMouseWheel = function (event) {
    if (!this._active) {
      return;
    }

    this._mainBreakpoints.setTarget(this.math.constrain(this._progressX + event.delta * 0.33, 0, 1)); //this._moth.clearTrail();
    //this._moth.acivate();

  };

  HomeController.prototype._onKeyPress = function (event) {
    if (!this._active) {
      return;
    }

    var direction = event.keyType === Enums_1.DirectionalKeyType.LEFT || event.keyType === Enums_1.DirectionalKeyType.PAGE_UP ? -1 : 1;
    this._breakpointIndex += direction;
    this.animateProgressToValue(this.math.constrain(this._breakpointIndex, 0, 2)); //this._moth.clearTrail();
    //this._moth.acivate();
  };
  /** After a deeplink / history pop() freeze then reset key things after hidden */


  HomeController.prototype._cleanupAfterFreeze = function () {
    this._$homeContainer.visible = false;
    this._resetAndShowQued = false;
    this.DOM.removeClass(this.container, '-active');
    gsap.TweenMax.set([this.container, document.querySelector('canvas')], {
      autoAlpha: 0,
      scale: 1
    });
  }; //Reset methods
  //----------------------------------------------------------------------------------------------------------

  /** Reset for when coming from the full-screen preloader */


  HomeController.prototype._resetForDeeplink = function () {
    //1.) Reset X positon of the timeline to the middle: 
    this._resetXProgress(0.5); //2.) Reset main timeline: 


    this._mainTimeline.resetForDeeplink(); //3.) Make sure that PIXI background is correct intial state:


    this._backgroundController.reset(this._state);
  };
  /** Reset when coming back from work section (To animate the work items down from top) */


  HomeController.prototype._resetFromWork = function (department) {
    //1.) Set the progress / side to the corret department   
    var progress = department === Enums_1.DepartmentType.SCREENS ? 0 : 1;

    this._resetXProgress(progress); //2.) Reset the main timeline: 


    this._mainTimeline.resetFromWork(department);
  };
  /** Remove all intervals and animations that may have been applied */


  HomeController.prototype._resetIntervalsAndAnimations = function () {
    //1.) Remove any animations/intervals from this main view class:
    clearTimeout(this._timeouts.freeze);

    if (this._tweens.container) {
      this._tweens.container.kill();
    } //2.) Remove any animations/intervals from the main timeline:


    if (this._mainTimeline) {
      this._mainTimeline.resetIntervalsAndAnimations();
    }

    this._resetAndShowQued = false;
  };
  /** Reset the x progress of the timline */


  HomeController.prototype._resetXProgress = function (progress) {
    this._mainTimeline.setProgress(progress, true); //TODO: convert set progress to a 0-1 to ration


    this._mainBreakpoints.setProgress(progress);

    this._progressX = progress;
    this._velocity = 0;
    this._frameProgress = 0;

    if (progress === 0) {
      this._breakpointIndex = 0;
    } else if (progress === 1) {
      this._breakpointIndex = 1;
    } else {
      this._breakpointIndex = 2;
    } //Do an 'instant' update on the timeline. This should move everything the current psoition


    var defaultMouseCords = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2
    };

    this._mainTimeline.tick(defaultMouseCords, false, 0, true, true);
  }; //Show methods 
  //-------------------------------------------------------------------------------------------------------

  /** Show from when coming from the full-screen preloader */


  HomeController.prototype._showForDeeplink = function () {
    //Allow interaction: 
    //this._setInteractionEnabled(true);
    this._setupOpeningAction();

    this._mouseController.homeIntroStart(); //Build in the elements from 


    this._mainTimeline.showForDeeplink();

    this.resize();
  };

  HomeController.prototype._setupOpeningAction = function () {
    //this.DOM.setText(document.querySelector('.home__action__text'), "Click to explore");
    var _this = this;

    this._textScrable.setText('Interact');

    gsap.TweenMax.fromTo('.home__action', 0.45, {
      autoAlpha: 0,
      scale: 0,
      y: -75,
      x: -75
    }, {
      autoAlpha: 1,
      scale: 1,
      x: 0,
      y: 0,
      delay: 0
    });
    Events_1.Events.on('click', '.home__action__button__center', function () {
      return _this._openingActionComplete();
    });
    Events_1.Events.on('mouseover', '.home__action__button__center', function () {
      _this._mainTimeline.homeIntroHover();

      _this._mouseController.homeIntroHover();

      clearTimeout(_this._timeoutInt);
      _this._timeoutInt = setTimeout(function () {
        return _this._textScrable.setText('Enter');
      }, 10);
    });
    Events_1.Events.on('mouseout', '.home__action__button__center', function () {
      _this._mainTimeline.homeIntroMouseOut();

      _this._mouseController.homeIntroMouseOut();

      clearTimeout(_this._timeoutInt);
      _this._timeoutInt = setTimeout(function () {
        return _this._textScrable.setText('Interact');
      }, 10);
    }); //Events.on('mousedown', '.home__action', () => (window as any).touchActive = true );
    //Events.on('mouseup', '.home__action', () => (window as any).touchActive = false );
  };

  HomeController.prototype._openingActionComplete = function () {
    window.touchActive = false;

    this._mainTimeline.introComplete();

    this._setInteractionEnabled(true);

    this._mouseController.introComplete();

    window.introActive = false;
    window.introComplete = true;

    var cords = this._mouseController.getMouseCords();

    var offsetx = cords.x - window.innerWidth / 2;
    var offsety = cords.y - window.innerHeight / 2;
    gsap.TweenMax.to('.home__action', 0.4, {
      autoAlpha: 0,
      scale: 0,
      y: -75 + offsety,
      x: -75 + offsetx
    });
    gsap.TweenMax.to('.home__action__text', 0.3, {
      autoAlpha: 0,
      ease: gsap.Power0.easeNone
    });
    gsap.TweenMax.to('.ui__logo, .ui__hamburger', 0.4, {
      autoAlpha: 1,
      ease: gsap.Power0.easeNone,
      delay: 2
    });
  };
  /** Animate in the work items from the top coming back from work (screens or spaces) view  */


  HomeController.prototype._showFromWork = function (department) {
    var _this = this; //1.) Animate the elements from top: 


    this._mainTimeline.animateFromWork(department, 1.0); //this._moth.animateOn(1.0);
    //2.) Restart interaction on this controller after transition is complete:


    this._timeouts.interaction = setTimeout(function () {
      _this._setInteractionEnabled(true);

      _this._mainTimeline.resetAnimationFreeze();

      _this._mouseController.setDragCursorActive(true);
    }, 2000);
  }; //Hide methods
  //---------------------------------------------------------------------------------------------------------
  //** Hide to move to info section. Means hiding pixi and Home HTML elements */


  HomeController.prototype._hideForInfo = function () {
    var _this = this;

    this._tweens.container = gsap.TweenMax.to([this.container, document.querySelector('canvas')], 0.5, {
      autoAlpha: 0,
      delay: 0.5,
      onComplete: function onComplete() {
        _this._$homeContainer.visible = false;
      }
    });
  }; //** Hide after moving to work. Not too much to do here apart from deactive and hide elements */ 


  HomeController.prototype._hideForWork = function (department) {
    var _this = this; //gsap.TweenMax.set(this.container, {autoAlpha: 0});


    this._mainTimeline.animateToWork(department); //this._moth.animateOff();


    this._backgroundController.animateToWork(department);

    this._timeouts.toWork = setTimeout(function () {
      _this.DOM.removeClass(_this.container, '-active');

      _this._$homeContainer.visible = false;
    }, 1100);
  };

  return HomeController;
}(Controller_1.Controller);

exports.HomeController = HomeController;

/***/ }),

/***/ "./src/app/controller/InfoController.ts":
/*!**********************************************!*\
  !*** ./src/app/controller/InfoController.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var GA_1 = __webpack_require__(/*! debugbase/tracking/GA */ "./src/debugbase/tracking/GA.ts");

var Controller_1 = __webpack_require__(/*! debugbase/abstract/Controller */ "./src/debugbase/abstract/Controller.ts");

var Enums_1 = __webpack_require__(/*! app/data/Enums */ "./src/app/data/Enums.ts");

var Paging_1 = __webpack_require__(/*! app/module/global/Paging */ "./src/app/module/global/Paging.ts");

var Events_1 = __webpack_require__(/*! debugbase/events/Events */ "./src/debugbase/events/Events.ts");

var AppEvents_1 = __webpack_require__(/*! app/data/AppEvents */ "./src/app/data/AppEvents.ts");

var ViewReadyEvent_1 = __webpack_require__(/*! app/event/ViewReadyEvent */ "./src/app/event/ViewReadyEvent.ts");
/** Controller to manage */


var InfoController =
/** @class */
function (_super) {
  __extends(InfoController, _super);

  function InfoController() {
    var _this = _super !== null && _super.apply(this, arguments) || this; //AJAX Loaded HTML


    _this._active = false;
    _this._html = {};
    _this._mainHTMLInjected = false;
    _this._allHTMLLoaded = false;
    _this._sectionHTMLInjected = false;
    _this._injectionQued = false;
    _this._internalHTMLInjectTimerFlag = false;
    _this._pagingScrolledFlagSet = false;
    _this._$subsections = {};
    _this._timeouts = {};
    _this._tweens = {};
    _this._intervals = {};
    _this.INFOSECTIONS = ['about', 'studio', 'jobs', 'contact'];
    _this.INFOSECTIONS_TITLES = {
      about: 'About',
      studio: 'Studio',
      jobs: 'Jobs',
      contact: 'Contact'
    };
    return _this;
  } //Init is only called if the section is deep linked to: 


  InfoController.prototype.init = function () {
    var _this = this; //Info section is active loaded page so flag this 


    this._active = true; //Set HTML to blank value to flag this section is loaded 

    this._html[this._infoSectionType] = '';
    this._mainHTMLInjected = true; //Set the opening state to the homepage: 

    var openingState = {
      section: Enums_1.SectionType.INFO,
      subsection: this._infoSectionType,
      title: this.INFOSECTIONS_TITLES[this._infoSectionType],
      href: "/" + this._infoSectionType + "/"
    };
    Events_1.Events.dispatch(AppEvents_1.AppEvents.SET_INTIAL_STATE, openingState); //Trigger timer. This is stop internal HTML being set to quickly on incorrect section. If its too quick the Google can process the dyanmic content

    this._internalHTMLInjectTimerFlag = true;
    setTimeout(function () {
      _this._internalHTMLInjectTimerFlag = false;

      if (_this._allHTMLLoaded && !_this._sectionHTMLInjected) {
        _this._injectSectionsHTML();
      }
    }, 5000);
  }; //Routes 
  //----------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------

  /** About Deeplink */


  InfoController.prototype.about = function () {
    this._infoSectionType = Enums_1.InfoSectionType.ABOUT;
    this.init();
  };
  /** Studio Deeplink */


  InfoController.prototype.studio = function () {
    this._infoSectionType = Enums_1.InfoSectionType.STUDIO;
    this.init();
  };
  /** Jobs Deeplink */


  InfoController.prototype.jobs = function () {
    this._infoSectionType = Enums_1.InfoSectionType.JOBS;
    this.init();
  };
  /** Contact Deeplink */


  InfoController.prototype.contact = function () {
    this._infoSectionType = Enums_1.InfoSectionType.CONTACT;
    this.init();
  }; //Public 
  //----------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------
  //Getters 
  //-------------------------------------------------


  InfoController.prototype.isReadyToView = function (state) {
    if (state === void 0) {
      state = null;
    } //Check if the subsection has been loaded and is ready to view: 


    if (!this._sectionHTMLInjected) {
      this._injectSectionsHTML();

      return false;
    }

    return true;
  }; //TODO, legacy hack so remove.


  InfoController.prototype.readyForDeeplink = function () {
    return this.isReadyToView();
  }; //Setters 
  //-------------------------------------------------------

  /** Set contoller depencides */


  InfoController.prototype.setControllers = function (scrollbar) {
    this._scrollbar = scrollbar;
  };
  /** DOReady auto event */


  InfoController.prototype.DOMReady = function () {
    //Set the active section to DOM records: 
    if (this._active) {
      this._$subsections[this._infoSectionType] = this.container.querySelector(".info__subsection.-" + this._infoSectionType);
      this.resize();
    }
  };
  /** Reset ready to show */


  InfoController.prototype.reset = function () {
    this.container.style.visibility = 'visible';
    this.container.style.display = 'block';
    gsap.TweenMax.set([this.container], {
      scale: 1
    });

    this._resetIntervalsAndAnimations();
  };
  /** Resize, fix container height */


  InfoController.prototype.resize = function () {
    return;

    if (!this._infoSectionType || !this._$subsections[this._infoSectionType]) {
      return;
    }

    console.log('this._$subsections[this._infoSectionType].clientHeight', this._$subsections[this._infoSectionType].clientHeight);
    this.container.style.height = this._$subsections[this._infoSectionType].clientHeight + "px";
  };
  /** Tick function */


  InfoController.prototype.tick = function () {
    this._checkPageScrolledState();
  };
  /** Pause when menu is shown */


  InfoController.prototype.pause = function () {
    gsap.TweenMax.to([this.container], 0.45, {
      scale: 1.2,
      ease: gsap.Power3.easeOut
    });
  };
  /** Pause when menu is hidden */


  InfoController.prototype.unpause = function () {
    gsap.TweenMax.to([this.container], 0.45, {
      scale: 1,
      ease: gsap.Power3.easeOut
    });
  };
  /** Freeze. View is active when a deep link is jumped to and this is old (current view) */


  InfoController.prototype.freeze = function () {
    var _this = this;

    this._active = false;

    this._paging.setActive(false);

    this._resetIntervalsAndAnimations();

    this._timeouts.freeze = setTimeout(function () {
      return _this._cleanupAfterFreeze();
    }, 500);
  };
  /** Que section up (when nav menu is opened) **/


  InfoController.prototype.que = function () {
    if (!this._mainHTMLInjected) {
      this._createDOMStructure();
    } else if (!this._mainHTMLInjected && this._allHTMLLoaded) {
      this._injectSectionsHTML();
    } else if (!this._mainHTMLInjected) {
      this._injectionQued = true;
    }
  };
  /** Show after preload, or when section changes */


  InfoController.prototype.show = function (oldState) {
    //setState will always be set before show is calle, so we have to state the view should be in
    //So check if the action came from nav menu. This means switching depth, sliding scross and then seting the menu to be closed
    //This will be the most common use case!!
    var _this = this;

    if (oldState === void 0) {
      oldState = null;
    }

    this._active = true;

    if (this._paging) {
      this._paging.setActive(true);
    }

    if (this._state.fromMenu) {
      var sectionIndex = this._getIndexBySection(this._infoSectionType);

      this._paging.setActiveIndex(sectionIndex);

      var sectionTarget_1 = this._$subsections[this._state.subsection];
      this.resize();

      this._showActiveSubsection(sectionTarget_1);

      this.DOM.addClass(this.container, '-abovemenu');
      this._tweens.container = gsap.TweenMax.fromTo(this.container, 0.5, {
        x: '100%',
        autoAlpha: 1,
        display: 'block'
      }, {
        x: '0%'
      });
      this._timeouts.activateScrollbar = setTimeout(function () {
        _this._scrollbar.setFocus(sectionTarget_1, 0, sectionTarget_1.querySelector('.info__subsection__content'));

        _this._scrollbar.setActive(true);
      }, 550);
      this._timeouts.resetNav = setTimeout(function () {
        return Events_1.Events.dispatch(AppEvents_1.AppEvents.RESET_NAV_MENU);
      }, 1000);
      this._timeouts.resetZindex = setTimeout(function () {
        return _this.DOM.removeClass(_this.container, '-abovemenu');
      }, 1500);
      return;
    } //Deep link: 


    this._changeScrollFocus();

    this._scrollbar.setActive(true);

    this.resize();
  };
  /** Hide after section is moved away from */


  InfoController.prototype.hide = function (newState) {
    if (newState === void 0) {
      newState = null;
    }
  };
  /**
  * History state has been changed by a user action
  * @param {HistoryStateModel} state - The current state of the app
  */


  InfoController.prototype.setState = function (state) {
    this._state = state;
    this._infoSectionType = this._state.subsection;

    var sectionIndex = this._getIndexBySection(this._infoSectionType);
  };
  /**
  * History state has been moved to go move inside the info section tions so just internal features to change state
  * @param {HistoryStateModel} state - The current state of the app
  */


  InfoController.prototype.subsectionStateChange = function (state) {
    var _this = this;

    this._state = state;

    var sectionIndex = this._getIndexBySection(state.subsection); //Simulate a tab click. If coming from the nav menu delay this allow menu to transition out


    var delay = state.fromMenu ? 300 : 0;
    this._timeouts.subsectionChange = setTimeout(function () {
      return _this._onPagingClick(sectionIndex, true);
    }, delay);
    gsap.TweenMax.to([this.container], 0.3, {
      scale: 1,
      ease: gsap.Power3.easeOut
    });
  };
  /** HTML has loaded from external, so set to local store:
  * @param {string} html - the raw HTML as a string
  * @param {string} infoSection - the info section that the HTML is for
  */


  InfoController.prototype.setHTML = function (html, section) {
    this._html[section] = html;
    this._allHTMLLoaded = this._checkAllSectionHTMLLoaded(); //Flag that the view is ready to view: 

    if (this._allHTMLLoaded) {
      Events_1.Events.dispatch(new ViewReadyEvent_1.ViewReadyEvent({
        view: Enums_1.ViewType.INFO
      }), {
        delay: 1
      });
    } //If active then Inject the sections around the HTML loaded for the page. Also checked if injection has been requested but not possible (when menu is opned)


    if (this._allHTMLLoaded && (this._active || this._injectionQued)) {
      if (!this._internalHTMLInjectTimerFlag) {
        this._injectSectionsHTML();
      }
    }
  };
  /** Get info section title
  * @param {InfoSectionType} infoSection - the info section
  * @return {string} - Infosection title
  */


  InfoController.prototype.getSubsectionTitle = function (section) {
    return this.INFOSECTIONS_TITLES[section];
  }; //Private 
  //----------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------

  /** Check all HTML is loaded. */


  InfoController.prototype._checkAllSectionHTMLLoaded = function () {
    var _this = this;

    var loaded = true;
    this.INFOSECTIONS.forEach(function (section) {
      if (_this._html[section] === null || _this._html[section] === undefined) {
        loaded = false;
      }
    });
    return loaded;
  };
  /**
  * Page is not deeplinked to generate the info section + paging + any generic elements required
  * Only used when info section is not deep linked directly to (and HTML is served in that way)
  */


  InfoController.prototype._createDOMStructure = function () {
    var _this = this;

    var html = "<section class=\"info\">\n\t\t\t\t<div class='info__background'></div>\n\t\t\t\t" + this._createPagingStructure() + "\n\t\t\t</section>";
    this.DOM.append(document.querySelector('body'), html, function () {
      _this.container = document.querySelector('.info');

      _this._injectSectionsHTML();
    });
    this._mainHTMLInjected = true;
  };
  /** Create the paging element structure for tab navigation: */


  InfoController.prototype._createPagingStructure = function () {
    var _this = this;

    var activeClass = this._active ? '-active' : '';
    var html = "<ul id='info-paging' paging-active-index=\"1\" class=\"ui__paging ui__paging__info -info -show -scrollshow -items-" + this.INFOSECTIONS.length + " " + activeClass + "\">";
    this.INFOSECTIONS.forEach(function (section, index) {
      html += _this._createPagingItemHTML(section, index);
    });
    html += '</ul>';
    return html;
  };
  /** Create single paging item */


  InfoController.prototype._createPagingItemHTML = function (section, index) {
    var label = this.INFOSECTIONS_TITLES[section];
    return "<li class='ui__paging__item -index" + index + " -" + section + "'>\n\t\t\t<a href='/" + section + "/' class='ui__paging__link ui_hidecursor' data-index='" + index + "'>" + label + "</a>\n\t\t\t<i class='ui__paging__track'></i>\n\t\t\t<i class='ui__paging__bar'></i>\n\t\t </li>";
  };
  /**  All subsections (about/studio/jobs/contact) have their html loaded, so inject into the section - called when navMenu is opened (as info section is a likely destination) */


  InfoController.prototype._injectSectionsHTML = function () {
    var _this = this; //If already injected then short circuit


    if (this._sectionHTMLInjected) {
      return;
    } //If all sections are not loaded que injection


    if (!this._allHTMLLoaded) {
      this._injectionQued = true;
      return;
    }

    this._injectionQued = false; //Build all the remaining subsections as one string and append into the .info section: 

    var htmlString = '';
    Object.keys(this._html).forEach(function (key) {
      //If active section then it will just be a blank string (as HTML is on main page load an not needed)
      if (_this._html[key] !== '') {
        htmlString += _this._html[key];
      }
    });
    this.DOM.append(this.container, htmlString, function () {
      _this._sectionHTMLInjected = true;

      _this._coreHTMLReady();

      if (_this._paging) {
        _this._paging.setClass('-htmlloaded');
      }
    });
  }; //** Show active subsection, hide all others 8/


  InfoController.prototype._showActiveSubsection = function ($target) {
    var _this = this;

    Object.keys(this._$subsections).forEach(function ($key) {
      if (_this._$subsections[$key] !== $target) {
        _this._$subsections[$key].style.display = 'none';
      }
    });
    $target.style.display = 'block'; //$target.style.transform = 'translate(0%, 0%)';

    gsap.TweenMax.set($target, {
      x: '0%'
    });
  };
  /** Core HTML ready, so add paging events and set container refs */


  InfoController.prototype._coreHTMLReady = function () {
    var _this = this; //set references to the container: 


    this.container = document.querySelector('.info');
    this.INFOSECTIONS.forEach(function (section) {
      if (!_this._$subsections[section]) {
        _this._$subsections[section] = _this.container.querySelector(".info__subsection.-" + section);
      }
    });

    this._createPagingModule();
  };
  /** Create the paging controls: */


  InfoController.prototype._createPagingModule = function () {
    this._paging = new Paging_1.Paging();

    this._paging.setContainer(this.container.querySelector('.ui__paging__info'));

    this._paging.id = 'info-paging';

    this._paging.create();

    this._paging.config.freezeInteractionOnClick = 0.6;
    this._paging.config.track = false;

    this._paging.setCallbacks(this._onPagingClick.bind(this));

    if (this._active) {
      var sectionIndex = this._getIndexBySection(this._infoSectionType);

      this._paging.setActiveIndex(sectionIndex);

      this._paging.setActive(true);

      if (this._sectionHTMLInjected) {
        this._paging.setClass('-htmlloaded');
      }
    }
  };
  /** On paging click then change info section */


  InfoController.prototype._onPagingClick = function (index, byPassEvent) {
    if (byPassEvent === void 0) {
      byPassEvent = false;
    }

    var section = this._getSectionByIndex(index);

    GA_1.GA.event('UX', 'Info section tab press', section); //If already in section then exit:

    if (this._infoSectionType === section) {
      return;
    } //Switch subsection choosen item: 


    var oldSection = this._infoSectionType;

    var oldSectionIndex = this._getIndexBySection(this._infoSectionType);

    this._infoSectionType = section;

    this._paging.setActiveIndex(index); //Animate across to new subsection


    var direction = oldSectionIndex > index ? 1 : -1;

    this._animateToSubsection(direction, oldSection);

    this._changeScrollFocus(); //Animate backgroud for minor parallax 


    gsap.TweenMax.to('.info__background', 1.2, {
      x: -1 * (index * 10) + "%",
      ease: gsap.Power3.easeOut
    }); //If no section change event is needed then short circuit: 

    if (byPassEvent) {
      return;
    } //Trigger event (Mainly so history state stuff can be managed)


    var newState = {
      section: Enums_1.SectionType.INFO,
      subsection: this._infoSectionType,
      title: this.INFOSECTIONS_TITLES[this._infoSectionType],
      href: "/" + this._infoSectionType + "/",
      bypassTransitions: true
    };
    Events_1.Events.dispatch(AppEvents_1.AppEvents.CHANGE_SECTION, newState);
  };
  /** Get the subsection by index */


  InfoController.prototype._getSectionByIndex = function (index) {
    return this.INFOSECTIONS[index];
  }; //** Get the index by section */ 


  InfoController.prototype._getIndexBySection = function (section) {
    for (var i = 0; i < this.INFOSECTIONS.length; i++) {
      if (this.INFOSECTIONS[i] === section) {
        return i;
      }
    }

    return -1;
  }; //** Animate across to subsection */


  InfoController.prototype._animateToSubsection = function (direction, oldSectionType) {
    var _this = this;

    var offXPos = 100 * direction + "%";
    var onStartXPos = 100 * (-1 * direction) + "%";
    this._tweens.sectionOld = gsap.TweenMax.to(this._$subsections[oldSectionType], 0.7, {
      x: offXPos,
      ease: gsap.Power3.easeOut,
      onComplete: function onComplete() {
        _this.DOM.removeClass(_this._$subsections[oldSectionType], '-active');

        _this._$subsections[oldSectionType].style.display = 'none';
      }
    });
    this._$subsections[this._infoSectionType].style.display = 'block';
    this.DOM.addClass(this._$subsections[this._infoSectionType], '-transitionin');
    this._tweens.sectionNew = gsap.TweenMax.fromTo(this._$subsections[this._infoSectionType], 0.7, {
      x: onStartXPos,
      autoAlpha: 1
    }, {
      x: '0%',
      ease: gsap.Power3.easeOut,
      onComplete: function onComplete() {
        _this.DOM.removeClass(_this._$subsections[_this._infoSectionType], '-transitionin');

        _this.DOM.addClass(_this._$subsections[_this._infoSectionType], '-active');

        _this.resize();
      }
    });
  };
  /**
  /*	Change the scrollbar focus
  /*	Animate the scrollbar between states so its a bit smoother
  */


  InfoController.prototype._changeScrollFocus = function () {
    gsap.TweenMax.set(this._$subsections[this._infoSectionType], {
      y: 0
    }); //Containers are absolute so have no height, sp get the content inside: 

    var $scrollbarHeightTarget = this._$subsections[this._infoSectionType].querySelector('.info__subsection__content');

    this._scrollbar.setFocus(this._$subsections[this._infoSectionType], 0.5, $scrollbarHeightTarget);
  };
  /** Cleanup after freeze */


  InfoController.prototype._cleanupAfterFreeze = function () {
    this._scrollbar.setActive(false);

    this._scrollbar.setFocus(null);

    gsap.TweenMax.set([this.container], {
      scale: 1
    });
    this.container.style.visibility = 'hidden';
    this.container.style.display = 'none';
    this.DOM.removeClass(this.container, '-active');
  };
  /** Reset anything that is happening */


  InfoController.prototype._resetIntervalsAndAnimations = function () {
    var _this = this;

    Object.keys(this._tweens).forEach(function (key) {
      _this._tweens[key].kill();
    });
    Object.keys(this._timeouts).forEach(function (key) {
      clearTimeout(_this._timeouts[key]);
    });
    Object.keys(this._intervals).forEach(function (key) {
      clearInterval(_this._intervals[key]);
    });
  };
  /** Check the scroll amount to see if the scroll state should be flagged on paging (This is to add a black BG so it's visiible over content) */


  InfoController.prototype._checkPageScrolledState = function () {
    if (!this._paging) {
      return;
    }

    if (this._pagingScrolledFlagSet && this._scrollbar.getScroll() < 200) {
      this._pagingScrolledFlagSet = false;

      this._paging.removeClass('-scrolled');
    } else if (!this._pagingScrolledFlagSet && this._scrollbar.getScroll() >= 200) {
      this._paging.setClass('-scrolled');

      this._pagingScrolledFlagSet = true;
    }
  };

  return InfoController;
}(Controller_1.Controller);

exports.InfoController = InfoController;

/***/ }),

/***/ "./src/app/controller/MouseController.ts":
/*!***********************************************!*\
  !*** ./src/app/controller/MouseController.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Controller_1 = __webpack_require__(/*! debugbase/abstract/Controller */ "./src/debugbase/abstract/Controller.ts"); //import {TweenMax, Power0, Power3, Back } from 'gsap';


var Events_1 = __webpack_require__(/*! debugbase/events/Events */ "./src/debugbase/events/Events.ts");

var CustomCursorEvent_1 = __webpack_require__(/*! app/event/CustomCursorEvent */ "./src/app/event/CustomCursorEvent.ts");

var ConstrainAroundCircle_1 = __webpack_require__(/*! app/module/home/homeUtil/ConstrainAroundCircle */ "./src/app/module/home/homeUtil/ConstrainAroundCircle.ts");

var MouseController =
/** @class */
function (_super) {
  __extends(MouseController, _super);

  function MouseController() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this._dragViewActive = false;
    _this._mouseCords = {
      x: 0,
      y: 0
    };
    _this._updateCounter = 1;
    _this._touchActive = false;
    _this._hidden = false;
    _this._introActionActive = false;
    _this._introConstrain = new ConstrainAroundCircle_1.ConstrainAroundCircle();
    return _this;
  }

  MouseController.prototype.init = function () {};

  MouseController.prototype.DOMReady = function () {
    this._$dragCursor = this.container.querySelector('.ui__cursordrag');
    Events_1.Events.on('mouseover', '.ui_hidecursor', this._mouseOver.bind(this));
    Events_1.Events.on('mouseout', '.ui_hidecursor', this._mouseOut.bind(this));
    Events_1.Events.on('touchstart', this.container, this._onTouchStart.bind(this));
    Events_1.Events.on('touchend', this.container, this._onTouchEnd.bind(this));
    Events_1.Events.on('mousemove', this.container, this._onMouseMove.bind(this));
    Events_1.Events.on('touchmove', this.container, this._onTouchMove.bind(this));
    Events_1.Events.on(CustomCursorEvent_1.CustomCursorEvent, this._onCursorEvent.bind(this));
  };

  MouseController.prototype.tick = function () {
    if (this._dragViewActive || this._introActionActive) {
      if (this._introActionActive) {
        var introMousePoint = this._introConstrain.limit(this._mouseCords);

        this._$dragCursor.style.transform = "translate3d(" + introMousePoint.x + "px, " + introMousePoint.y + "px, 0)";
      } else {
        this._$dragCursor.style.transform = "translate3d(" + this._mouseCords.x + "px, " + this._mouseCords.y + "px, 0)";
      }
    }
    /*if (this._introActionActive) {
        gsap.TweenMax.set(this._$homeIntroCursor, {
            x: this._mouseCords.x,
            y: this._mouseCords.y,
            top: 0,
            left: 0
        });
    }*/

  };
  /** When showing nav menu stop special state and save if active at time of pause */


  MouseController.prototype.pause = function () {
    this._pauseHoldingFlag = this._dragViewActive;
    this.setDragCursorActive(false, false);
  };
  /** When hiding nav menu show 'drag' state if it was showing at the time of pausing */


  MouseController.prototype.unpause = function () {
    if (this._pauseHoldingFlag) {
      this.setDragCursorActive(true);
    }
  };
  /** Background can be affected by the parallax in home / work sections */


  MouseController.prototype.setHiddenState = function (hidden) {
    if (this._hidden !== hidden) {
      this.DOM.toggleClass(this._$dragCursor, '-hidden', hidden);
      this._hidden = hidden;
    }
  };
  /**
   * Set the special drag cursor to be active on sections that can be dragged
   * @param {boolean} active - Turn on / off.
   * @param {boolean} [resetPauseHoldingFlag=true] - Reset any flags that hav have been set by pause action.
  */


  MouseController.prototype.setDragCursorActive = function (active, resetPauseHoldingFlag) {
    if (resetPauseHoldingFlag === void 0) {
      resetPauseHoldingFlag = true;
    }

    if (!this.container) {
      return;
    }

    if (resetPauseHoldingFlag) {
      this._pauseHoldingFlag = false;
    }

    this._dragViewActive = active;
    this.DOM.toggleClass(this.container, '-dragcursor', this._dragViewActive);

    this._setupMouseMove();
  };
  /**
  /* Set the special drag cursor to be active on sections that can be dragged (I.E grey on sections because of the white/black mix)
  /* @param {string} colour - Color class to change the curose to
  */


  MouseController.prototype.setColour = function (colour) {
    if (colour === 'light') {
      this.DOM.removeClass(this.container, '-darkcursor');
      return;
    }

    this.DOM.addClass(this.container, '-darkcursor');
  };

  MouseController.prototype.setDragDown = function (isDown, side, animationTime) {
    if (side === void 0) {
      side = null;
    }

    if (animationTime === void 0) {
      animationTime = 0.2;
    }

    var scale = isDown ? 1.4 : 1.0;
    this._dragdown = isDown;
    window.touchActive = isDown; //gsap.TweenMax.to(this._$dragCursor, animationTime, {scale: scale});

    this.DOM.toggleClass(this._$dragCursor, '-pressed', isDown);

    if (isDown) {
      var showRight = void 0,
          showLeft = true;

      if (side === 'left') {
        showRight = false;
      } else if (side === 'right') {
        showLeft = false;
      }

      this.DOM.toggleClass(this._$dragCursor, '-left', showLeft);
      this.DOM.toggleClass(this._$dragCursor, '-right', showRight);
    }
  };

  MouseController.prototype.getMouseCords = function () {
    if (!this._mouseCords) {
      return {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2
      };
    }

    return this._mouseCords;
  };

  MouseController.prototype.mouseIsDown = function () {
    return this._dragdown;
  };

  MouseController.prototype.homeIntroStart = function () {
    //this.setHiddenState(true);
    var _this = this;

    this._introConstrain.setConstraints({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2
    }, 75);

    this._introActionActive = true; //this.setDragCursorActive(true);

    setTimeout(function () {
      return _this.DOM.addClass(_this._$dragCursor, '-intro');
    }, 200);
    gsap.TweenMax.fromTo(this._$dragCursor, 0.5, {
      autoAlpha: 0
    }, {
      autoAlpha: 1,
      delay: 1.5,
      ease: gsap.Power0.easeNone
    });
  };

  MouseController.prototype.homeIntroHover = function () {
    if (!this._introActionActive) {
      return;
    }

    this.DOM.addClass(this._$dragCursor, '-introhover');
    this.DOM.toggleClass(this.container, '-dragcursor', true);
    this.DOM.addClass(document.querySelector('.home__action__text'), '-hover');
    /*if (!this._$homeIntroCursor ) {
        this._$homeIntroCursor  = document.querySelector('.home__action');
    }
    
    this._introActionActive =  true;
    this.setDragCursorActive(true);
    setTimeout(() => this.setHiddenState(false), 350);*/
  };

  MouseController.prototype.homeIntroMouseOut = function () {
    if (!this._introActionActive) {
      return;
    }

    this.DOM.removeClass(this._$dragCursor, '-introhover');
    this.DOM.toggleClass(this.container, '-dragcursor', false);
    this.DOM.removeClass(document.querySelector('.home__action__text'), '-hover');
  };

  MouseController.prototype.introComplete = function () {
    this.setHiddenState(true);
    this.setDragCursorActive(true);
    this.DOM.removeClass(this._$dragCursor, '-introhover');
    this.DOM.removeClass(this._$dragCursor, '-intro');
    this._introActionActive = false;
  };

  MouseController.prototype._setupMouseMove = function () {//$(this.container).off('mousemove', this._onMouseMove.bind(this));
    //if (this._dragViewActive) {
    //	$(this.container).on('mousemove', this._onMouseMove.bind(this));
    //}
  };

  MouseController.prototype._onTouchStart = function (e) {
    this.system.cordsFromTouch = true;
    this._touchActive = true;
    window.touchActive = true;
  };

  MouseController.prototype._onTouchEnd = function (e) {
    window.touchActive = false;
    this._touchActive = false;
  };

  MouseController.prototype._onMouseMove = function (e) {
    if (!this._touchActive) {
      this.system.cordsFromTouch = false;
    }

    this._mouseCords.x = e.clientX;
    this._mouseCords.y = e.clientY;
  };

  MouseController.prototype._onTouchMove = function (e) {
    this.system.cordsFromTouch = true;
    this._mouseCords.x = e.touches[0].clientX;
    this._mouseCords.y = e.touches[0].clientY;
  };

  MouseController.prototype._mouseOver = function (e) {
    if (this._dragViewActive) {
      this.DOM.removeClass(this.container, '-dragcursor');
    }
  };

  MouseController.prototype._mouseOut = function (e) {
    if (this._dragViewActive) {
      this.DOM.addClass(this.container, '-dragcursor');
    }
  };
  /** Pickup event form other modules/controller to activate the cursor */


  MouseController.prototype._onCursorEvent = function (e) {
    if (e.type === 'hitarea') {
      this.setDragCursorActive(e.active, false);

      if (e.theme) {
        this.setColour(e.theme);
      }
    } else if (e.type === 'drag') {
      this.setDragDown(e.active);
    }
  };

  return MouseController;
}(Controller_1.Controller);

exports.MouseController = MouseController;

/***/ }),

/***/ "./src/app/controller/NavMenuController.ts":
/*!*************************************************!*\
  !*** ./src/app/controller/NavMenuController.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var GA_1 = __webpack_require__(/*! debugbase/tracking/GA */ "./src/debugbase/tracking/GA.ts");

var Controller_1 = __webpack_require__(/*! debugbase/abstract/Controller */ "./src/debugbase/abstract/Controller.ts");

var Events_1 = __webpack_require__(/*! debugbase/events/Events */ "./src/debugbase/events/Events.ts");

var AppEvents_1 = __webpack_require__(/*! app/data/AppEvents */ "./src/app/data/AppEvents.ts");

var Enums_1 = __webpack_require__(/*! app/data/Enums */ "./src/app/data/Enums.ts"); //import {TweenMax, Power0, Power3, Back } from 'gsap';


var NavMenuController =
/** @class */
function (_super) {
  __extends(NavMenuController, _super);

  function NavMenuController() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  NavMenuController.prototype.init = function () {}; //** Set controller depencies */


  NavMenuController.prototype.setControllers = function (info) {
    this._infoController = info;
  };

  NavMenuController.prototype.DOMReady = function () {
    var _this = this;

    this._$menuButton = document.querySelector('.ui__hamburger');
    Events_1.Events.on('click', '.ui__hamburger', function (e) {
      e.preventDefault();

      _this._onMenuButtonClick(e);

      return false;
    });
    Events_1.Events.on('click', '.navmenu__link.-departmentlink', function (e) {
      e.preventDefault();

      _this._onMenuDepartmentLinkClick(e);

      return false;
    });
    Events_1.Events.on('click', '.navmenu__link.-infolink', function (e) {
      e.preventDefault();

      _this._onMenuInfoLinkClick(e);

      return false;
    });

    this._setMenuSelectedState(this._state);
  };
  /** Is showing */


  NavMenuController.prototype.isShowing = function () {
    return this.DOM.hasClass(this.container, '-open');
  };
  /** Section has change so set state */


  NavMenuController.prototype.setState = function (state, updateMenuState) {
    if (updateMenuState === void 0) {
      updateMenuState = true;
    }

    this._state = state;

    if (updateMenuState) {
      this._setMenuSelectedState(state);
    }
  };
  /** Reset the overlay nav menu after the transition to */


  NavMenuController.prototype.reset = function () {
    this._setMenuState(Enums_1.MenuStateType.CLOSED);
  }; //PRIVATE 
  //----------------------------------------------------------------------------
  //----------------------------------------------------------------------------
  //----------------------------------------------------------------------------
  //----------------------------------------------------------------------------

  /** Hamburger menu  press */


  NavMenuController.prototype._onMenuButtonClick = function (e) {
    var $hamburger = e.target;
    var state = this.DOM.hasClass($hamburger, '-open') ? Enums_1.MenuStateType.CLOSED : Enums_1.MenuStateType.OPEN;

    this._setMenuState(state); //Dispatch event so active controllers can be 'paused'


    Events_1.Events.dispatch(AppEvents_1.AppEvents.MENU_STATE_CHANGE, {
      state: state
    });
  }; //** Select the selected state of menu */ 


  NavMenuController.prototype._setMenuSelectedState = function (state) {
    this._removeAllSelectClassesFromMenu();

    var $target;

    if (state.section === Enums_1.SectionType.WORK || state.section === Enums_1.SectionType.INFO) {
      $target = this.container.querySelector(".navmenu__link.-" + state.subsection);
      this.DOM.addClass($target, '-selected');
    }
  };
  /** Remove all selected states */


  NavMenuController.prototype._removeAllSelectClassesFromMenu = function () {
    var _this = this;

    this.container.querySelectorAll('.navmenu__link').forEach(function (link) {
      _this.DOM.removeClass(link, '-selected');
    });
  };
  /** Set Menu state */


  NavMenuController.prototype._setMenuState = function (state) {
    var _this = this; //Toogle state from open/close


    if (state === Enums_1.MenuStateType.CLOSED) {
      this.DOM.removeClass(this._$menuButton, '-open');
      this.DOM.removeClass(this.container, '-open');
      setTimeout(function () {
        return _this.DOM.removeClass(_this.container, '-active');
      }, 350);

      this._hideMenuContent();
    } else {
      this.DOM.addClass(this._$menuButton, '-open');
      this.DOM.addClass(this.container, '-open');
      this.DOM.addClass(this.container, '-active'); //Reset the content panel from any animations

      gsap.TweenMax.set('.navmenu__content', {
        x: '0%'
      }); //Show the menu items 

      this._showMenuContent();
    }
  }; //** Spaces / Screens  menu button click */ 


  NavMenuController.prototype._onMenuDepartmentLinkClick = function (e) {
    //Do Change section event: 
    var $link = e.target;
    var workSection = $link.getAttribute('data-department'); //If section is already active then menu is just sliding to start slide / index	

    if (workSection === this._state.subsection && this._state.section !== Enums_1.SectionType.PROJECT) {
      Events_1.Events.dispatch(AppEvents_1.AppEvents.ACTIVE_DEPARTMENT_NAV_MENU_PRESS, workSection);
      return;
    }

    GA_1.GA.event('UX', 'Nav menu big link', workSection); //Its a change of section to screens / spaces: 

    var title = workSection === Enums_1.DepartmentType.SCREENS ? 'Screens' : 'Spaces';
    Events_1.Events.dispatch(AppEvents_1.AppEvents.CHANGE_SECTION, {
      href: e.target.getAttribute('href'),
      section: Enums_1.SectionType.WORK,
      subsection: workSection,
      fromMenu: true,
      title: title,
      isDeepLink: true
    });
  }; //**  Info menu button click - move to the info section and deep link to correct subsection */ 


  NavMenuController.prototype._onMenuInfoLinkClick = function (e) {
    //Animate off the container if not already on info: 
    if (this._state.section !== Enums_1.SectionType.INFO) {
      gsap.TweenMax.to('.navmenu__content', 0.4, {
        x: '-100%'
      });
    }

    var $link = e.target;
    var infoSection = $link.getAttribute('data-infosection');
    GA_1.GA.event('UX', 'Nav menu small link', infoSection); //Do Change section event: 

    Events_1.Events.dispatch(AppEvents_1.AppEvents.CHANGE_SECTION, {
      href: $link.getAttribute('href'),
      section: Enums_1.SectionType.INFO,
      subsection: infoSection,
      fromMenu: true,
      title: this._infoController.getSubsectionTitle(infoSection)
    });
  };
  /** Show menu content */


  NavMenuController.prototype._showMenuContent = function () {
    gsap.TweenMax.staggerFromTo('.navmenu__link', 0.3, {
      y: -30,
      autoAlpha: 0
    }, {
      y: 0,
      autoAlpha: 1,
      delay: 0.2
    }, 0.04);
    gsap.TweenMax.fromTo('.navmenu__contact', 0.3, {
      y: 0,
      autoAlpha: 0
    }, {
      y: 0,
      autoAlpha: 1,
      delay: 0.4
    });
  };
  /** Hide menu content */


  NavMenuController.prototype._hideMenuContent = function () {
    gsap.TweenMax.staggerTo('.navmenu__link', 0.15, {
      y: -30,
      autoAlpha: 0
    }, 0.01);
    gsap.TweenMax.to('.navmenu__contact', 0.15, {
      y: 0,
      autoAlpha: 0
    });
  };

  return NavMenuController;
}(Controller_1.Controller);

exports.NavMenuController = NavMenuController;

/***/ }),

/***/ "./src/app/controller/PixiController.ts":
/*!**********************************************!*\
  !*** ./src/app/controller/PixiController.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Controller_1 = __webpack_require__(/*! debugbase/abstract/Controller */ "./src/debugbase/abstract/Controller.ts");

var Enums_1 = __webpack_require__(/*! app/data/Enums */ "./src/app/data/Enums.ts");

var PixiController =
/** @class */
function (_super) {
  __extends(PixiController, _super);

  function PixiController() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this._$workContainers = {
      screens: null,
      spaces: null
    };
    _this._projectHeaderSize = null;
    return _this;
  }

  PixiController.prototype.init = function () {
    this._createPixiApp();
  };

  PixiController.prototype.resize = function () {
    //Resize the renderer to 100% height and width: 
    this._$pixi.renderer.resize(window.innerWidth, window.innerHeight);
  };

  PixiController.prototype.pause = function () {
    this._$pixi.stop();
  };

  PixiController.prototype.unpause = function () {
    this._$pixi.start();
  };

  PixiController.prototype.getPixi = function () {
    return this._$pixi;
  };

  PixiController.prototype.getBackground = function () {
    return this._$backgroundContainer;
  };

  PixiController.prototype.getWork = function (department) {
    return department === Enums_1.DepartmentType.SCREENS ? this._$workContainers.screens : this._$workContainers.spaces;
  };

  PixiController.prototype.getHome = function () {
    return this._$homeContainer;
  };

  PixiController.prototype.getProjectHeaderSize = function () {
    return this._projectHeaderSize;
  };

  PixiController.prototype.setProjectHeaderSize = function (size) {
    this._projectHeaderSize = size;
  }; //PRIVATE 
  //------------------------------------------------------------------------------------


  PixiController.prototype._createPixiApp = function () {
    //Create a PIXI app to render all the big full screen bits: 
    var resolution = this._getPixiResolution();

    this._$pixi = new PIXI.Application({
      width: window.innerWidth,
      height: window.innerHeight,
      autoResize: true,
      resolution: resolution
    });
    window.pixiResolution = resolution; //Add to the view: 

    document.body.appendChild(this._$pixi.view); //Add the section conatiners for easier layering: 

    this._$backgroundContainer = new PIXI.Container();
    this._$backgroundContainer.interactive = false;
    this._$backgroundContainer.interactiveChildren = false;
    this._$homeContainer = new PIXI.Container();
    this._$homeContainer.interactive = false;
    this._$homeContainer.interactiveChildren = false;
    this._$workContainers.screens = new PIXI.Container();
    this._$workContainers.screens.interactive = false;
    this._$workContainers.screens.interactiveChildren = false;
    this._$workContainers.spaces = new PIXI.Container();
    this._$workContainers.spaces.interactive = false;
    this._$workContainers.spaces.interactiveChildren = false;

    this._$pixi.stage.addChild(this._$backgroundContainer, this._$homeContainer, this._$workContainers.spaces, this._$workContainers.screens);
  }; //Hi-res assets should not be loaded onto mobile, so add  logic here 
  //Also may need to load low res onto Android devices: 


  PixiController.prototype._getPixiResolution = function () {
    var resolution = window.devicePixelRatio || 1; //resolution = 2.0;
    //let resolution = (window.innerWidth < 900) ? 0.5 : 1.0;

    return resolution;
  };

  return PixiController;
}(Controller_1.Controller);

exports.PixiController = PixiController;

/***/ }),

/***/ "./src/app/controller/PreloadController.ts":
/*!*************************************************!*\
  !*** ./src/app/controller/PreloadController.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Controller_1 = __webpack_require__(/*! debugbase/abstract/Controller */ "./src/debugbase/abstract/Controller.ts");

var Enums_1 = __webpack_require__(/*! app/data/Enums */ "./src/app/data/Enums.ts");

var Events_1 = __webpack_require__(/*! debugbase/events/Events */ "./src/debugbase/events/Events.ts");

var CoreEvents_1 = __webpack_require__(/*! debugbase/events/CoreEvents */ "./src/debugbase/events/CoreEvents.ts");

var ImageLoader_1 = __webpack_require__(/*! debugbase/loader/ImageLoader */ "./src/debugbase/loader/ImageLoader.ts");

var HTMLLoader_1 = __webpack_require__(/*! debugbase/loader/HTMLLoader */ "./src/debugbase/loader/HTMLLoader.ts");

var JSONLoader_1 = __webpack_require__(/*! debugbase/loader/JSONLoader */ "./src/debugbase/loader/JSONLoader.ts");

var LoaderGroup_1 = __webpack_require__(/*! debugbase/loader/LoaderGroup */ "./src/debugbase/loader/LoaderGroup.ts");

var PixiLoader_1 = __webpack_require__(/*! debugbase/loader/PixiLoader */ "./src/debugbase/loader/PixiLoader.ts");

var AppEvents_1 = __webpack_require__(/*! app/data/AppEvents */ "./src/app/data/AppEvents.ts");

var PixiResourceLoadEvent_1 = __webpack_require__(/*! app/event/PixiResourceLoadEvent */ "./src/app/event/PixiResourceLoadEvent.ts");

var ViewReadyEvent_1 = __webpack_require__(/*! app/event/ViewReadyEvent */ "./src/app/event/ViewReadyEvent.ts");

var AjaxHTMLLoadedEvent_1 = __webpack_require__(/*! app/event/AjaxHTMLLoadedEvent */ "./src/app/event/AjaxHTMLLoadedEvent.ts");

var JSONLoadEvent_1 = __webpack_require__(/*! app/event/JSONLoadEvent */ "./src/app/event/JSONLoadEvent.ts");

var PreloadController =
/** @class */
function (_super) {
  __extends(PreloadController, _super);

  function PreloadController() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.groupLoadDelay = 20; //Set to larger throttle to simulate slow connections

    _this._openingPreloaderCreated = false;
    _this._openingPreloadComplete = false;
    _this._openingMinTimePassed = false;
    _this._workParticlesLoaded = false;
    _this._section = Enums_1.SectionType.HOME;
    _this._department = Enums_1.DepartmentType.SCREENS; //The department type that its opened on (i.E /spaces/ OR /screens/)

    _this._loaderGroups = [];
    _this._loaderGroupIndex = 0;
    _this._HTMLTemplates = {};
    _this._htmlUrls = [{
      section: 'home',
      path: '/',
      selector: '.home'
    }, //Work section: 
    {
      section: 'screens',
      path: '/screens/',
      selector: '.work.-screens'
    }, {
      section: 'spaces',
      path: '/spaces/',
      selector: '.work.-spaces'
    }, //Info:
    {
      section: 'about',
      path: '/about/',
      selector: '.info__subsection.-about'
    }, {
      section: 'studio',
      path: '/studio/',
      selector: '.info__subsection.-studio'
    }, {
      section: 'jobs',
      path: '/jobs/',
      selector: '.info__subsection.-jobs'
    }, {
      section: 'contact',
      path: '/contact/',
      selector: '.info__subsection.-contact'
    }];
    return _this;
  }

  PreloadController.prototype.setControllers = function (ui) {
    this._uiController = ui;
  };
  /** Set intial state: */


  PreloadController.prototype.setIntialState = function (state) {
    this._section = state.section;
    this._subsection = state.subsection;
  };
  /** Show the view */


  PreloadController.prototype.show = function () {
    gsap.TweenMax.to(this.container, 0.2, {
      autoAlpha: 1
    });

    this._loaderGraphic.animateIn();
  };
  /** Loading is completed so hide: */


  PreloadController.prototype.hide = function () {
    //this.container.style.display = 'none';
    gsap.TweenMax.to(this.container, 0.5, {
      autoAlpha: 0,
      delay: 0.4,
      ease: gsap.Power0.easeNone
    });

    this._uiController.show();

    if (this._loaderGraphic) {
      this._loaderGraphic.animateOut();
    }
  };

  PreloadController.prototype.DOMReady = function () {
    //Section is set as soon as the app via URL routing: 
    if (!this._openingPreloaderCreated) {
      this._setPreloader();

      this._createOpeningTimer();

      this._openingPreloaderCreated = true;
    }
  };

  PreloadController.prototype.modulesMounted = function () {
    if (!this._loaderGraphic) {
      this._loaderGraphic = this.module.get('preload-graphic');
    }
  }; //Set a loaded HTML template: 


  PreloadController.prototype.setHTML = function (section, element) {
    element.innerHTML = this._HTMLTemplates[section];
  };
  /** Show a quick loader to cover over history state changes. When complete triggers an event that is picked up in AppController */


  PreloadController.prototype.showDeepLinkLoader = function (activeController) {
    var _this = this;

    this.show(); //Test 

    clearTimeout(this._historyStateTimeoutId);
    this._historyStateTimeoutId = setInterval(function () {
      if (activeController.readyForDeeplink()) {
        clearTimeout(_this._historyStateTimeoutId);
        Events_1.Events.dispatch(AppEvents_1.AppEvents.DEEP_LINK_LOADER_COMPLETE);

        _this.hide();
      }
    }, 1000);
  };
  /** View is loaded, setup and ready to show */


  PreloadController.prototype.viewReady = function (event) {
    if (event.view === this._waitingForView) {
      return true;
    }

    return false;
  }; //Loaders 
  //(Maybe these should be automated through attributes)
  //-------------------------------------------------------------------------


  PreloadController.prototype._setPreloader = function () {
    //Use this ID to flag the intial load is ready
    this._waitForGroupId = this._section.toString();

    if (this._section === Enums_1.SectionType.HOME) {
      this._waitingForView = Enums_1.ViewType.HOME;

      this._createHomeLoadOrder();
    } else if (this._section === Enums_1.SectionType.INFO) {
      this._waitingForView = Enums_1.ViewType.INFO;

      this._createInfoLoadOrder();
    } else if (this._section === Enums_1.SectionType.WORK) {
      this._waitingForView = this._subsection === Enums_1.DepartmentType.SCREENS ? Enums_1.ViewType.SCREENS : Enums_1.ViewType.SPACES;

      this._createWorkLoadOrder(this._subsection);
    } else if (this._section === Enums_1.SectionType.PROJECT) {
      this._waitingForView = Enums_1.ViewType.PROJECT;

      this._createProjectLoadOrder(this._subsection);
    } //Set the first load group to the 'waitId', (which will be screens/spaces)


    this._loaderGroups[0].id = this._waitForGroupId; //Start primary group loading 

    this._loaderGroups[0].load();
  };
  /** Create an opening timer so intial preload does get caught in cache loading, which will look a bit rough an ready on */


  PreloadController.prototype._createOpeningTimer = function () {
    var _this = this;

    setTimeout(function () {
      _this._openingMinTimePassed = true;

      _this._testOpeningComplete();
    }, 2000);
  };
  /** Test if the opening is 10% complete (timer and content loading) */


  PreloadController.prototype._testOpeningComplete = function () {
    if (!this._openingMinTimePassed || !this._openingPreloadComplete) {
      return;
    } //Hide this 
    //this.hide(); 
    //Flag loaded event
    //Delay to allow the pixi loading to complete


    setTimeout(function () {
      return Events_1.Events.dispatch(AppEvents_1.AppEvents.INTIAL_PRELOAD_COMPLETE);
    }, 100);
  };
  /** Create Home loader - User is at / on top level */


  PreloadController.prototype._createHomeLoadOrder = function () {
    //1.) Load backgrounds, PIXI home particles, moth, etc so home can be shown:
    this._loaderGroups.push(this._createHomeLoaderGroup(true)); //2.) Create a secondary loader group to load all supporting HTML required: 
    //This will include about and both work sections 
    //WHen returned the HTML will be send to the controller which can store ready to set when needed


    this._loaderGroups.push(this._createHTMLLoaderGroup(['/about/', '/studio/', '/jobs/', '/contact/', '/screens/', '/spaces/'])); //3.) Load the work level (Fullscreen images and background )
    //If /spaces/ is set then piortise that content 


    this._createWorkSectionsLoader();
  };
  /** Load all item required to start on the main homepage */


  PreloadController.prototype._createHomeLoaderGroup = function (loadMainBackgrounds) {
    if (loadMainBackgrounds === void 0) {
      loadMainBackgrounds = false;
    }

    var textureSize = window.innerWidth < 900 ? '@0.5' : '@1.0';
    var pixiLoader = new PixiLoader_1.PixiLoader();
    pixiLoader.resources = [//{ref: 'home-particles', path: `/img/home/spritesheet/home-particles${textureSize}.json`, isSpriteSheet: true},
    {
      ref: 'home-particles',
      path: "/img/home/spritesheet/home-particles.json",
      isSpriteSheet: true
    }]; //If the loader group intial load then backgrounds will be needed:

    if (loadMainBackgrounds) {
      pixiLoader.resources.push({
        ref: 'main-backgrounds',
        //path: `/img/home/spritesheet/main-backgrounds${textureSize}.json`,
        path: "/img/home/spritesheet/main-backgrounds.json",
        isSpriteSheet: true
      });
      pixiLoader.resources.push({
        ref: 'moth',
        path: "/img/home/spritesheet/moth.json",
        isSpriteSheet: true
      });
    }

    pixiLoader.id = 'pixi-home';
    pixiLoader.onResourcesReady = this._onPixiLoaderReady.bind(this); //JSON config for home 

    var jsonLoader = new JSONLoader_1.JSONLoader();
    jsonLoader.url = '/json/home.json';
    jsonLoader.id = 'json-home';
    jsonLoader.onComplete = this._onJSONLoaderReady.bind(this);
    var loaderGroup = new LoaderGroup_1.LoaderGroup();
    loaderGroup.add(jsonLoader, pixiLoader);
    loaderGroup.onComplete = this._onLoaderGroupComplete.bind(this);
    loaderGroup.onProgress = this._onLoaderGroupProgress.bind(this);
    loaderGroup.load();
    return loaderGroup;
  };
  /**
  * Create Info Loader order
  * @param {DepartmentType}
  */


  PreloadController.prototype._createWorkLoadOrder = function (department) {
    //1.) Load the assets and HTML for the work section: 
    this._createWorkSectionsLoader(department, true); //2.) Load all the essential HTML 


    var departmentURL = department === Enums_1.DepartmentType.SCREENS ? '/spaces/' : '/screens/';

    this._loaderGroups.push(this._createHTMLLoaderGroup(['/', '/about/', '/studio/', '/jobs/', '/contact/', departmentURL])); //3.) Load Home PIXI content for home 


    this._loaderGroups.push(this._createHomeLoaderGroup(false)); //4.) Load the PIXI content for the other work section 


    var otherWorkSection = department === Enums_1.DepartmentType.SCREENS ? Enums_1.DepartmentType.SPACES : Enums_1.DepartmentType.SCREENS;
    console.log('otherWorkSection', otherWorkSection);

    this._createWorkSectionsLoader(otherWorkSection, false);
  };
  /** Create work / section loader */


  PreloadController.prototype._createWorkSectionsLoader = function (department, loadMainBackgrounds) {
    if (department === void 0) {
      department = null;
    }

    if (loadMainBackgrounds === void 0) {
      loadMainBackgrounds = false;
    } //PIXI JS elements --------------------------------------------------------


    if (!department || department === Enums_1.DepartmentType.SPACES) {
      this._loaderGroups.push(this._createWorkLoaderGroup(Enums_1.DepartmentType.SPACES, null, loadMainBackgrounds)); //only need to load the backgrounds once, so if here then can flag to false: 


      loadMainBackgrounds = false;
    }

    if (!department || department === Enums_1.DepartmentType.SCREENS) {
      this._loaderGroups.push(this._createWorkLoaderGroup(Enums_1.DepartmentType.SCREENS, null, loadMainBackgrounds));
    } //HTML for every section ---------------------------------------------------


    if (!department || department === Enums_1.DepartmentType.SPACES) {
      this._loaderGroups.push(this._createHTMLLoaderGroup(this._getAllProjectURLs(Enums_1.DepartmentType.SPACES)));
    }

    if (!department || department === Enums_1.DepartmentType.SCREENS) {
      this._loaderGroups.push(this._createHTMLLoaderGroup(this._getAllProjectURLs(Enums_1.DepartmentType.SCREENS)));
    }
  };
  /**Create Info Loader order */


  PreloadController.prototype._createInfoLoadOrder = function () {
    var _this = this; //1.) Load all the supporting HTML for site:


    var HTMLToLoad = ['/', '/screens/', '/spaces/'];
    Object.keys(Enums_1.InfoSectionType).forEach(function (key) {
      if (Enums_1.InfoSectionType[key].toString() !== _this._subsection) {
        HTMLToLoad.push("/" + Enums_1.InfoSectionType[key].toString() + "/");
      }
    }); //WHen returned the HTML will be send to the controller which can store ready to set when needed
    //Pass wait so when item loades then page is shown

    this._loaderGroups.push(this._createHTMLLoaderGroup(HTMLToLoad, this._waitForGroupId)); //2.) Load the homepage structure (pass true to load the background pixi eleemnts as well):


    this._loaderGroups.push(this._createHomeLoaderGroup(true)); //3.) Load the spaces / screens:


    this._createWorkSectionsLoader();
  }; //Load the essential HTML used across the site: 
  //Note not all HTML is loaded into the DOM straight away 
  //Create html loader: 


  PreloadController.prototype._createHTMLLoader = function (id, url, element) {
    if (element === void 0) {
      element = null;
    }

    var layout = this.system.isPortraitDevice ? 'mobile' : 'desktop';
    var loader = new HTMLLoader_1.HTMLLoader();
    loader.id = id;
    loader.url = url + ("?headless=1&layout=" + layout);
    loader.element = element;
    loader.onComplete = this._onHTMLLoaderComplete.bind(this);
    return loader;
  };
  /**Load a load page templates (store as varibles so they can ve quickly injected) */


  PreloadController.prototype._createHTMLLoaderGroup = function (urls, groupId) {
    var _this = this;

    if (groupId === void 0) {
      groupId = null;
    }

    var htmlLoaderGroup = new LoaderGroup_1.LoaderGroup();
    htmlLoaderGroup.id = groupId;
    urls.forEach(function (htmlUrl) {
      var loader = _this._createHTMLLoader(htmlUrl, htmlUrl);

      htmlLoaderGroup.add(loader);
    });
    htmlLoaderGroup.onComplete = this._onLoaderGroupComplete.bind(this);
    return htmlLoaderGroup;
  };
  /** Get all project URLS (so HTML can be AJAX loaded) */


  PreloadController.prototype._getAllProjectURLs = function (type) {
    if (type === Enums_1.DepartmentType.SCREENS) {
      return ['/screens/march-for-giants/', '/screens/market-masters/', '/screens/toy-town/', '/screens/toy-store/', '/screens/total-darkness/'];
    } else if (type === Enums_1.DepartmentType.SPACES) {
      return ['/spaces/ready-player-one/', '/spaces/anish-kapoor-into-yourself-fall/'];
    }

    return [];
  }; //Site is deep loaded to work so do that preloading: 
  //TODO and mobile switch and 


  PreloadController.prototype._createWorkLoaderGroup = function (type, groupId, loadMainBackgrounds) {
    if (groupId === void 0) {
      groupId = null;
    }

    if (loadMainBackgrounds === void 0) {
      loadMainBackgrounds = false;
    }

    var resources;
    var id;
    var jsonPath = "/json/" + type + ".json";
    var jsonId = "json-" + type;
    var textureSize = window.innerWidth < 900 ? '@0.5' : '@1.0';

    if (type === Enums_1.DepartmentType.SCREENS) {
      resources = [{
        ref: 'work-background-screens',
        path: "/img/work/spritesheet/work-backgrounds-screens" + textureSize + ".json",
        isSpriteSheet: true
      }];
      id = 'pixi-screens';
    } else {
      resources = [{
        ref: 'work-background-spaces',
        path: "/img/work/spritesheet/work-backgrounds-spaces" + textureSize + ".json",
        isSpriteSheet: true
      }];
      id = 'pixi-spaces-particles';
    } //If the loader group intial load then backgrounds will be needed:
    //Also as the paticles are shared then load those as well


    if (loadMainBackgrounds) {
      resources.push({
        ref: 'main-backgrounds',
        path: "/img/home/spritesheet/main-backgrounds" + textureSize + ".json",
        isSpriteSheet: true
      });
    } //As the partciles spritesheets are shared across items them 


    if (!this._workParticlesLoaded) {
      resources.push({
        ref: 'work-particles',
        path: "/img/work/spritesheet/work-particles" + textureSize + ".json",
        isSpriteSheet: true
      });
      this._workParticlesLoaded = true;
    }

    var pixiLoader = new PixiLoader_1.PixiLoader();
    pixiLoader.resources = resources;
    pixiLoader.id = id;
    pixiLoader.onResourcesReady = this._onPixiLoaderReady.bind(this);
    var jsonLoader = new JSONLoader_1.JSONLoader();
    jsonLoader.url = jsonPath;
    jsonLoader.id = jsonId;
    jsonLoader.onComplete = this._onJSONLoaderReady.bind(this);
    var loaderGroup = new LoaderGroup_1.LoaderGroup();
    loaderGroup.id = groupId;
    loaderGroup.add(pixiLoader, jsonLoader);
    loaderGroup.onComplete = this._onLoaderGroupComplete.bind(this);
    loaderGroup.onProgress = this._onLoaderGroupProgress.bind(this);
    return loaderGroup;
  };

  PreloadController.prototype._createProjectLoadOrder = function (department) {
    //Load all the images on a project: 
    var imageLoader = new ImageLoader_1.ImageLoader();
    imageLoader.element = document.querySelectorAll('.project img');
    var loaderGroup = new LoaderGroup_1.LoaderGroup();
    loaderGroup.id = 'Project';
    loaderGroup.add(imageLoader);
    loaderGroup.onComplete = this._onLoaderGroupComplete.bind(this);
    loaderGroup.onProgress = this._onLoaderGroupProgress.bind(this);

    this._loaderGroups.push(loaderGroup);
  }; //Site is deep loaded direct to a project: 


  PreloadController.prototype._createProjectLoaderGroup = function () {
    var loaderGroup = new LoaderGroup_1.LoaderGroup();
    return loaderGroup;
  }; //Loader group progress, used to update the main loader 


  PreloadController.prototype._onLoaderGroupProgress = function (data, loader) {
    if (this._loaderGraphic) {
      this._loaderGraphic.progress(data.ratio);
    }
  }; //A loader group is complete: 


  PreloadController.prototype._onLoaderGroupComplete = function (id) {
    console.log("_onLoaderGroupComplete", this._loaderGroups[this._loaderGroupIndex]); //Check if opening preload has been completed 

    if (this._waitForGroupId && this._waitForGroupId === id) {
      this._intialGroupLoaded();
    } //Check if there is another loader group to load carry on loading


    this._loadNextGroup();
  };
  /** The intial group is loaded so we are ready to show the app: */


  PreloadController.prototype._intialGroupLoaded = function () {
    //Project has simple preloading, so can trigger from here on intial load: 
    if (this._waitForGroupId === Enums_1.SectionType.PROJECT) {
      Events_1.Events.dispatch(new ViewReadyEvent_1.ViewReadyEvent({
        view: Enums_1.ViewType.PROJECT
      }), {
        delay: 1
      });
    }

    this._waitForGroupId = null; //Show the active controller / home / work / about / etc

    this._openingPreloadComplete = true;

    this._testOpeningComplete();
  };
  /** If there is a new group qued then load */


  PreloadController.prototype._loadNextGroup = function () {
    var _this = this;

    setTimeout(function () {
      _this._loaderGroupIndex += 1;

      if (_this._loaderGroupIndex < _this._loaderGroups.length) {
        _this._loaderGroups[_this._loaderGroupIndex].load();
      }
    }, this.groupLoadDelay);
  }; //Pixi Loader is ready: 


  PreloadController.prototype._onPixiLoaderReady = function (loaderId, resources) {
    //let sheet = PIXI.loader.resources["images/spritesheet.json"];
    if (resources['main-backgrounds']) {
      Events_1.Events.dispatch(new PixiResourceLoadEvent_1.PixiResourceLoadEvent({
        type: Enums_1.PixiResourceType.BACKGROUNDS,
        resource: resources['main-backgrounds']
      }));
    } //Home parallax particles: 


    if (resources['home-particles']) {
      Events_1.Events.dispatch(new PixiResourceLoadEvent_1.PixiResourceLoadEvent({
        type: Enums_1.PixiResourceType.HOME_PARTCILES,
        resource: resources['home-particles']
      }));
    } //Home logo morpth is loaded ready: 

    /*if (resources['home-logo-morph']) {
        Events.dispatch(new PixiResourceLoadEvent({
            type: PixiResourceType.LOGO_MORPH,
            resource: resources['home-logo-morph']
        }));
    }*/
    //Work partciles: 


    if (resources['work-particles']) {
      Events_1.Events.dispatch(new PixiResourceLoadEvent_1.PixiResourceLoadEvent({
        type: Enums_1.PixiResourceType.WORK_PARTICLES,
        resource: resources['work-particles']
      }));
    } //Work backgrounds screen: 


    if (resources['work-background-screens']) {
      Events_1.Events.dispatch(new PixiResourceLoadEvent_1.PixiResourceLoadEvent({
        type: Enums_1.PixiResourceType.WORK_BACKGROUNDS_SCREEN,
        resource: resources['work-background-screens']
      }));
    } //Work backgrounds spaces: 


    if (resources['work-background-spaces']) {
      Events_1.Events.dispatch(new PixiResourceLoadEvent_1.PixiResourceLoadEvent({
        type: Enums_1.PixiResourceType.WORK_BACKGROUNDS_SPACES,
        resource: resources['work-background-spaces']
      }));
    } //Home parallax particles: 


    if (resources['moth']) {
      Events_1.Events.dispatch(new PixiResourceLoadEvent_1.PixiResourceLoadEvent({
        type: Enums_1.PixiResourceType.MOTH,
        resource: resources['moth']
      }));
    }
  }; //HTML loader ready:


  PreloadController.prototype._onHTMLLoaderComplete = function (id, loader) {
    //If there is no element then store the HTML so it can be set when required: 
    Events_1.Events.dispatch(new AjaxHTMLLoadedEvent_1.AjaxHTMLLoadedEvent({
      loader: loader
    }));

    if (!loader.element) {
      this._HTMLTemplates[loader.id] = loader.html;
    } else {
      Events_1.Events.dispatch(CoreEvents_1.CoreEvents.DOM_UPDATED);
    } //Destroy the loader as it's not needed anymore: 


    loader.destroy();
  };
  /** JSON HAS LOADED - fire event
  * @param {loaderId} loaderId
  * @param {any} json
  * @param {JSONLoader} loader
  */


  PreloadController.prototype._onJSONLoaderReady = function (loaderId, json, loader) {
    Events_1.Events.dispatch(new JSONLoadEvent_1.JSONLoadEvent({
      id: loaderId,
      json: json
    }));
  };

  return PreloadController;
}(Controller_1.Controller);

exports.PreloadController = PreloadController;

/***/ }),

/***/ "./src/app/controller/ProjectController.ts":
/*!*************************************************!*\
  !*** ./src/app/controller/ProjectController.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var GA_1 = __webpack_require__(/*! debugbase/tracking/GA */ "./src/debugbase/tracking/GA.ts");

var Controller_1 = __webpack_require__(/*! debugbase/abstract/Controller */ "./src/debugbase/abstract/Controller.ts");

var Events_1 = __webpack_require__(/*! debugbase/events/Events */ "./src/debugbase/events/Events.ts");

var AppEvents_1 = __webpack_require__(/*! app/data/AppEvents */ "./src/app/data/AppEvents.ts");

var Enums_1 = __webpack_require__(/*! app/data/Enums */ "./src/app/data/Enums.ts");

var SidePaging_1 = __webpack_require__(/*! app/module/project/SidePaging */ "./src/app/module/project/SidePaging.ts");

var SidePagingClickEvent_1 = __webpack_require__(/*! app/event/SidePagingClickEvent */ "./src/app/event/SidePagingClickEvent.ts");

var SidebarChangeEvent_1 = __webpack_require__(/*! app/event/SidebarChangeEvent */ "./src/app/event/SidebarChangeEvent.ts");

var QueProjectEvent_1 = __webpack_require__(/*! app/event/QueProjectEvent */ "./src/app/event/QueProjectEvent.ts");

var ProjectController =
/** @class */
function (_super) {
  __extends(ProjectController, _super);

  function ProjectController() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this._active = false;
    _this._isSetup = false;
    _this._DOMStructureSet = false;
    _this._closingProject = false;
    _this._headerVideoPlaying = true;
    _this._headerSized = false;
    _this._queSetProjectHTML = false;
    _this._html = [];
    _this._timeouts = {};
    _this._tweens = {};
    _this._intervals = {};
    return _this;
  }

  ProjectController.prototype.init = function (params) {
    console.log('params', params); //Set the opening state to the homepage:

    this._active = true;
    this._activeSlug = params.project;
    var projectTtle = 'TO SET PROJECT TITLE';
    var openingState = {
      section: Enums_1.SectionType.PROJECT,
      subsection: this._activeDepartment,
      projectSlug: this._activeSlug,
      title: this._activeDepartment === Enums_1.DepartmentType.SPACES ? projectTtle + " | Spaces" : projectTtle + " | Screens",
      href: "/" + this._activeDepartment + "/" + this._activeSlug + "/"
    };
    Events_1.Events.dispatch(AppEvents_1.AppEvents.SET_INTIAL_STATE, openingState); //Direct link so DOM structure / content will be there on page load: 

    this._DOMStructureSet = true;
  };
  /** Screens route */


  ProjectController.prototype.screens = function (params) {
    this._activeDepartment = Enums_1.DepartmentType.SCREENS;
    this.init(params);
  };
  /** Spaces */


  ProjectController.prototype.spaces = function (params) {
    this._activeDepartment = Enums_1.DepartmentType.SPACES;
    this.init(params);
  }; //Getters 
  //-------------------------------------------------


  ProjectController.prototype.isReadyToView = function (state) {
    //Need to check if HTML is loaded in background
    return true;
  }; //Setters 
  //---------------------------------------------------


  ProjectController.prototype.setControllers = function (mouse, scrollbar, pixi, screens, spaces) {
    this._mouseController = mouse;
    this._scrollbarController = scrollbar;
    this._pixiController = pixi;
    this._screensController = screens;
    this._spacesController = spaces;
  }; //Save a projects HTML to record:  


  ProjectController.prototype.setHTML = function (url, html) {
    this._html.push({
      url: url,
      html: html
    }); //If the page is waiting for the HTML to load then 


    if (this._queSetProjectHTML && this._activeHTMLURL === url) {
      this._setProjectHTML(url);

      this._queSetProjectHTML = false; //gsap.TweenMax.to(this._$loading, 0.2, {autoAlpha: 0, ease: gsap.Power0.easeNone, delay: 0.4});
    }
  }; //---------------------------------------------------------------------
  //DOMReady: 


  ProjectController.prototype.DOMReady = function () {
    this._addListeners();

    if (this._active) {
      this._setRefs();

      this._createSidePaging();
    }
  };

  ProjectController.prototype.resize = function () {
    this._innerHeight = window.innerHeight;

    this._matchHeaderToPixi();
  };

  ProjectController.prototype.freeze = function () {
    var _this = this;

    this._queSetProjectHTML = false;
    this._active = false;

    this._scrollbarController.reset();

    this._scrollbarController.setActive(false);

    this._timeouts.freeze = setTimeout(function () {
      return _this._cleanupAfterFreeze();
    }, 500);

    this._activeWorkController.freezeFromProjectView();
  };

  ProjectController.prototype.scroll = function (y) {
    var ratio = y / (window.innerHeight * 0.55);
  };

  ProjectController.prototype.tick = function () {
    this._setHeaderVideoVisible();
  };
  /** reset */


  ProjectController.prototype.reset = function (oldState, isDeeplink) {
    if (oldState === void 0) {
      oldState = null;
    }

    if (isDeeplink === void 0) {
      isDeeplink = false;
    }

    this._queSetProjectHTML = false;
    this._oldState = oldState;
    this._isDeeplink = isDeeplink;

    if (this._activeProjectIsSetup()) {
      this._reset();
    }
  };
  /** Pause when menu is shown */


  ProjectController.prototype.pause = function () {
    gsap.TweenMax.to([this.container], 0.45, {
      scale: 1.2,
      ease: gsap.Power3.easeOut
    });
  };
  /** Pause when menu is hidden */


  ProjectController.prototype.unpause = function () {
    gsap.TweenMax.to([this.container], 0.45, {
      scale: 1,
      ease: gsap.Power3.easeOut
    });
  };
  /** Show the view */


  ProjectController.prototype.show = function (oldState, isDeeplink) {
    if (oldState === void 0) {
      oldState = null;
    }

    if (isDeeplink === void 0) {
      isDeeplink = false;
    }

    this._innerHeight = window.innerHeight;

    if (this._activeProjectIsSetup()) {
      this._show();

      return;
    } //HTML is not loaded so can't be setup: 		


    this._isSetup = false; //Need to load the actual project HTML:

    if (!this._active) {
      this._setProjectHTML(this._state.href);
    } else {
      this._setup();

      this._reset();

      this._show();
    }

    this._active = true;
  };
  /** Hide */


  ProjectController.prototype.hide = function (newState) {
    var _this = this;

    if (newState === void 0) {
      newState = null;
    }

    this._timeouts.showScrollbar = setTimeout(function () {
      _this._scrollbarController.reset();

      _this._scrollbarController.setActive(false);
    }, 700);
    this._timeouts.hideView = setTimeout(function () {
      _this.DOM.removeClass(_this.container, '-active');

      _this._closingProject = false;
    }, 1500);

    this._hideHeaderVideo();

    this._active = false;
  };
  /** Set active department / slug */


  ProjectController.prototype.setState = function (state) {
    this._state = state;
    this._activeDepartment = state.subsection;
    this._activeSlug = state.projectSlug;
    this._activeWorkController = this._activeDepartment === Enums_1.DepartmentType.SCREENS ? this._screensController : this._spacesController;
  }; //Private methods: 
  //-------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------


  ProjectController.prototype._activeProjectIsSetup = function () {
    return this._state.href === this._activeHTMLURL && this._isSetup;
  };
  /** DOM elements for project should be aviable so  */


  ProjectController.prototype._setup = function () {
    this._isSetup = true;
  };

  ProjectController.prototype._setRefs = function () {
    //Header buttons 
    this._$close = this.container.querySelector('.project__close');
    this._$home = this.container.querySelector('.project__home'); //Main full screen header video

    this._$headerVideo = this.container.querySelector('.project__video'); //Content / scroll area

    this._$content = this.container.querySelector('.project__content');
    this._$headerSpacer = this._$content.querySelector('.project__headerspacer');
    this._$dynamicContent = this._$content.querySelector('.project__dynamic__content'); //Loading panel 

    this._$loading = this.container.querySelector('.project__loading');
    this._$headerTitle = this.container.querySelector('.project__intro__title');
    this._$headerSubtitle = this.container.querySelector('.project__intro__subtitle');
    this._$headerSkills = this.container.querySelector('.project__intro__skills');
    this._$headerScroll = this.container.querySelector('.scrolldown-icon');
  };

  ProjectController.prototype._createSidePaging = function () {
    var _this = this;

    this._sidePaging = new SidePaging_1.SidePaging(this.container.querySelector('.project__sidepaging'), this.DOM);
    Events_1.Events.on(SidePagingClickEvent_1.SidePagingClickEvent, function (event) {
      _this._scrollbarController.scrollToSelector(event.targetSelector);
    });
    Events_1.Events.on(SidebarChangeEvent_1.SidebarChangeEvent, function (event) {
      _this._sidePaging.selectIndex(event.index, event.theme);
    });
  };

  ProjectController.prototype._setSidePagingItems = function () {
    var items = [];
    this.container.querySelectorAll('.sidebartarget').forEach(function (element) {
      items.push({
        targetSelector: "#" + element.getAttribute('id'),
        label: element.getAttribute('data-sidebar-label')
      });
    });

    this._sidePaging.create(items);
  };

  ProjectController.prototype._addListeners = function () {
    var _this = this;

    Events_1.Events.on('click', '.project__close__button', this._onCloseClick.bind(this));
    Events_1.Events.on(QueProjectEvent_1.QueProjectEvent, this._onQueProject.bind(this)); //WHen orientation size event fires then can resize the header

    window.addEventListener('orientationchange', function () {
      _this._headerSized = false;

      _this.resize();
    });
  };

  ProjectController.prototype._activateScrollbar = function () {
    this._scrollbarController.setFocus(this._$content, 0.4);

    this._scrollbarController.setActive(true);
  };
  /** Set HTML for project */


  ProjectController.prototype._setProjectHTML = function (url) {
    var _this = this;

    this._activeHTMLURL = url;

    var html = this._getSubsectionHTML(this._activeHTMLURL); //If no is no HTML then que 


    if (!html) {
      this._queSetProjectHTML = true; //gsap.TweenMax.to(this._$loading, 0.3, {autoAlpha: 1, ease: gsap.Power0.easeNone, delay: 0.7});

      this.DOM.addClass(this.container, '-active');
      return;
    }

    this.DOM.setHTML(this._$dynamicContent, html, function () {
      _this.module.destoryByTag('project');

      _this._setup();

      _this._reset();

      _this._show();

      console.log('FIX OBSERVER !!!!!!');
      window.observer.observe();
    });
  };
  /** Get HTML for subsection */


  ProjectController.prototype._getSubsectionHTML = function (url) {
    var html = null;

    this._html.forEach(function (record) {
      if (record.url === url) {
        html = record.html;
      }
    });

    return html;
  };
  /** Que project up as it's focus on work timeline */


  ProjectController.prototype._onQueProject = function (event) {
    var _this = this; //If slug is null the exit (As its firts spacer item)


    if (event.slug === null) {
      return;
    } //If DOM contaner for project is not setup yet then add and call the function again: 


    if (!this._DOMStructureSet) {
      this.DOM.append(document.querySelector('body'), this._createDOMStructure(), function () {
        _this.container = document.querySelector('.project');

        _this._setRefs();

        _this._createSidePaging();

        _this._DOMStructureSet = true;

        _this._onQueProject(event);
      });
      return;
    } //Set the video 
    //console.log('this._$headerVideo', this._$headerVideo);


    var source = this._$headerVideo.querySelector('source');

    source.setAttribute('src', "/video/" + event.slug + ".mp4"); //this._$headerVideo.load();
    //Set other header / first view infomation outside the main content
  };
  /** Create DOM structure to inject when needed */


  ProjectController.prototype._createDOMStructure = function () {
    return "<section class='project'>\n\t\t\t<a href='/spaces/' class='project__close project__close__button'>Close</a>\n\t\t\t<a href='/' class='project__home'></a>\n\t\t\t<div class='project__sidepaging'></div>\n\n\n\t      <div class='project__loading'>\n\t     \t<h6 class='project__loading__text'>Loading</h6>\n\t     \t<h1 class='project__intro__title'>Toy Town</h1>\n\t     \t<h1 class='project__intro__subtitle'>7-Hour game for London's<br/>biggest Toy Store</h1>\n\t     \t<!--<ul class='project__intro__skills'>\n\t     \t\t<li class='-unity'>Unity</li>\n\t     \t\t<li class='-design'>Design</li>\n\t     \t\t<li class='-ux'>UX</li>\n\t     \t</ul>\n\t     \t-->\n\t     \t<dl class='project__intro__skills'>\n\t     \t\t\n\t     \t\t<dt>Debug role</dt>\n\t     \t\t<dd>Concept, Design & Development</dd>\n\t     \t\t<br/>\n\t     \t\t<dt>Platforms</dt>\n\t     \t\t<dd>Web, Mobile, Billboard</dd>\n\t     \t\t<br/>\n\t     \t\t<dt>Collaborators</dt>\n\t     \t\t<dd><a target='_blank' href='http://www.miura.gi/'>Miura</a></dd>\n\n\t     \t</dl>\n\n\t     \t<div class='scrolldown-icon'>\n\t     \t\t<p class='label'>Scroll</p>\n\t     \t\t<svg width=\"21px\" height=\"53px\" viewBox=\"0 0 21 53\"><style>.style0{fill:#fff;}.style1{stroke:#fff;stroke-width:2.5;stroke-linecap:round;}</style><path d=\"M9.42307692,0.085483871 C4.14615385,0.683391195 0,5.64602199 0,11.684886 L0,28.426291 C0,34.8537948 4.71153846,40.0854839 10.5,40.0854839 C16.2884615,40.0854839 21,34.8537948 21,28.426291 L21,11.684886 C21,5.64602199 16.8538462,0.683391195 11.5769231,0.085483871 L9.42307692,0.085483871 Z M19,28.6278568 C19,33.8448059 15.1887097,38.0854839 10.5,38.0854839 C5.81129032,38.0854839 2,33.8448059 2,28.6278568 L2,11.543111 C2,6.32616184 5.81129032,2.08548387 10.5,2.08548387 C15.1887097,2.08548387 19,6.32616184 19,11.543111 L19,28.6278568 L19,28.6278568 Z\" class=\"style0\"/><path d=\"M10.5,11.9188172 C11.6045695,11.9188172 12.5,11.0233867 12.5,9.9188172 C12.5,8.8142477 11.6045695,7.9188172 10.5,7.9188172 C9.3954305,7.9188172 8.5,8.8142477 8.5,9.9188172 C8.5,11.0233867 9.3954305,11.9188172 10.5,11.9188172 Z\" class=\"style0\"/><g class=\"arrows\"><path d=\"M10.5,23.7903226 L10.5,30.0200975\" class=\"style1 a1\"/><path d=\"M10.5,34.7903226 L10.5,41.0200975\" class=\"style1 a2\"/><path d=\"M10.5,45.6717982 L10.5,51.9015732\" class=\"style1 a3\"/><path d=\"M6 48 L10.5 52 \" class=\"style1 a3\"/><path d=\"M15,48 L10.5,51.9999994\" class=\"style1 a3\"/></g></svg>\n\t     \t</div>\n\n\t     </div>\n\n\n     \t\t<div class='project__video__container'>\n\t\t \t \t<video class='project__video' width=\"1920\" height=\"1080\"  muted loop playsinline>\n\t\t \t \t\t<source src='' type='video/mp4' />\n\t\t \t \t</video>\n\t \t \t</div>\n    \t \t<div class='project__content'>\n    \t \t\t<div class='project__headerspacer'></div>\n    \t \t\t<div class='project__dynamic__content'></div>\n    \t \t</div>\n\t\t</section>";
  }; //Reset functions 
  //-------------------------------------------------------------------


  ProjectController.prototype._reset = function () {
    //Generic reset: 
    this._closingProject = false;

    this._mouseController.setDragCursorActive(false); //Set the site bar items; 


    this._setSidePagingItems();

    this._$headerSpacer = this._$content.querySelector('.project__headerspacer'); //Reste scale / Reset scroll of container: 

    gsap.TweenMax.set([this.container], {
      scale: 1
    });
    this._$content.style.transform = "translate3d(0,0,0)"; //Resize to ensure elements are at matching scale / sizes 

    this._headerSized = false;
    this.resize(); //Is a deeplink for get ready to show coming direct from Preoader 

    if (this._isDeeplink) {
      this._resetForDeeplink();

      return;
    }

    if (this._oldState.section === Enums_1.SectionType.WORK) {
      this._resetFromWork(this._oldState.subsection);
    }
  };
  /** Reset from fullscreen loader */


  ProjectController.prototype._resetForDeeplink = function () {};
  /** Reset from Work section */


  ProjectController.prototype._resetFromWork = function (department) {
    this._headerSized = false;
  };
  /** After Freeze hidden to anything that can't be done while showing */


  ProjectController.prototype._cleanupAfterFreeze = function () {
    this.DOM.removeClass(this.container, '-active');
    this.DOM.removeClass(this._$home, '-active');
    this.DOM.removeClass(this._$home, '-show'); //gsap.TweenMax.set(this._$loading, {autoAlpha: 0});

    gsap.TweenMax.set([this.container], {
      scale: 1
    });
    this._closingProject = false;

    if (this._$headerVideo) {
      this._$headerVideo.pause();
    }
  }; //Show functions
  //--------------------------------------------------------------------


  ProjectController.prototype._show = function () {
    var _this = this; //Generic show actions: 


    this.DOM.addClass(this.container, '-active');
    this._timeouts.showScrollbar = setTimeout(function () {
      return _this._activateScrollbar();
    }, 1000);

    if (this._isDeeplink) {
      this._showForDeeplink();

      return;
    }

    if (this._oldState.section === Enums_1.SectionType.WORK) {
      this._showFromWork(this._oldState.subsection);
    }
  };
  /** Show from fullscreen preloader */


  ProjectController.prototype._showForDeeplink = function () {
    //gsap.TweenMax.fromTo(this._$home, 0.3, {autoAlpha: 0}, {autoAlpha: 1, ease: gsap.Power0.easeNone, delay: 0.6});
    this.DOM.addClass(this._$home, '-active');
    this.DOM.addClass(this._$home, '-show');
    gsap.TweenMax.set(this._$close, {
      autoAlpha: 0
    }); //3.) Show the paging 

    this._sidePaging.show();

    this._showHeaderVideo(0.7);

    this._animateInHeaderContent();
  };
  /** Animate in the project */


  ProjectController.prototype._showFromWork = function (department) {
    //1.) Bring in the page lements / top-video 
    var _this = this; //2.) Show the close button 
    //gsap.TweenMax.fromTo(this._$close, 0.3, {autoAlpha: 0}, {autoAlpha: 1, ease: gsap.Power0.easeNone, delay: 0.6});


    this._timeouts.closeButton = setTimeout(function () {
      _this.DOM.addClass(_this._$close, '-active');

      if (_this._scrollbarController.getScroll() === 0) {
        _this.DOM.addClass(_this._$close, '-show');
      }
    }, 2000);
    gsap.TweenMax.set(this._$home, {
      autoAlpha: 0
    });

    this._showHeaderVideo(0.7);

    this._animateInHeaderContent(); ///If mobile then content is visible along bottom


    if (window.innerWidth < 900) {
      gsap.TweenMax.fromTo(this._$dynamicContent, 0.5, {
        y: 200,
        autoAlpha: 1
      }, {
        y: 0,
        autoAlpha: 1,
        delay: 0.7,
        ease: gsap.Power3.easeOut
      });
    } //3.) Show the paging 


    this._sidePaging.show();
  };

  ProjectController.prototype._animateInHeaderContent = function () {
    gsap.TweenMax.fromTo(this._$loading, 0.5, {
      autoAlpha: 0
    }, {
      autoAlpha: 1,
      delay: 0,
      ease: gsap.Power0.easeNone
    });
    gsap.TweenMax.fromTo(this._$headerTitle, 0.5, {
      y: 20,
      autoAlpha: 0
    }, {
      y: 0,
      autoAlpha: 1,
      delay: 0.4,
      ease: gsap.Power3.easeOut
    });
    gsap.TweenMax.fromTo(this._$headerSubtitle, 0.5, {
      y: 20,
      autoAlpha: 0
    }, {
      y: 0,
      autoAlpha: 1,
      delay: 0.6,
      ease: gsap.Power3.easeOut
    });
    gsap.TweenMax.fromTo(this._$headerSkills, 0.5, {
      y: 20,
      autoAlpha: 0
    }, {
      y: 0,
      autoAlpha: 1,
      delay: 0.8,
      ease: gsap.Power3.easeOut
    });
    gsap.TweenMax.fromTo(this._$headerScroll, 0.5, {
      y: 20,
      autoAlpha: 0
    }, {
      y: 0,
      autoAlpha: 1,
      delay: 1.8,
      ease: gsap.Power3.easeOut
    }); //this._$headerTitle = this.container.querySelector('.project__intro__title');
    //this._$headerSubtitle = this.container.querySelector('.project__intro__subtitle');
    //this._$headerSkills = this.container.querySelector('.project__intro__skills');
  };
  /** Show and play the fullscreen header video */


  ProjectController.prototype._showHeaderVideo = function (delay) {
    var _this = this;

    if (delay === void 0) {
      delay = 0;
    }

    this._headerSized = false;

    this._$headerVideo.load();

    gsap.TweenMax.fromTo(this._$headerVideo, 0.3, {
      autoAlpha: 0
    }, {
      autoAlpha: 1,
      ease: gsap.Power0.easeNone,
      delay: delay,
      onComplete: function onComplete() {
        _this._$headerVideo.play();

        _this._headerVideoPlaying = true;
      }
    });
  };
  /** Pause and hide the header video when transiting back to project */


  ProjectController.prototype._hideHeaderVideo = function (delay) {
    if (delay === void 0) {
      delay = 0;
    }

    this._$headerVideo.pause();

    gsap.TweenMax.to(this._$headerVideo, 0.3, {
      autoAlpha: 0,
      ease: gsap.Power0.easeNone,
      delay: delay
    }); //Reset spacer reference = null

    this._$headerSpacer = null;
  }; //----------------------------------------------------------------------------

  /**
  * Close button click
  * @param {MouseEvent} event
  */


  ProjectController.prototype._onCloseClick = function (event) {
    var _this = this;

    event.preventDefault();

    if (this._closingProject) {
      return;
    }

    GA_1.GA.event('UX', 'Close project button', window.location.pathname); //Flag close to stop repeating -------------------------------

    this._closingProject = true;
    var eventDelay = 0.3; //If there is any scroll then whip the project up and delay the change section event: 

    if (this._scrollbarController.getScroll() > 0) {
      setTimeout(function () {
        _this._scrollbarController.scrollTo(0);

        _this._scrollbarController.setPause(true);
      }, 300);
      eventDelay = 0.7;
    }

    gsap.TweenMax.to(this._$loading, 0.4, {
      autoAlpha: 0,
      delay: 0.4,
      ease: gsap.Power0.easeNone
    }); ///If mobile then content is visible along bottom

    if (window.innerWidth < 900) {
      gsap.TweenMax.to(this._$dynamicContent, 0.5, {
        y: 200,
        delay: eventDelay,
        ease: gsap.Power3.easeOut
      });
    } //Animate out close button  ------------------------------------------
    //gsap.TweenMax.to(this._$close, 0.3, {autoAlpha: 0, ease: gsap.Power0.easeNone});


    this.DOM.removeClass(this._$close, '-active');
    this.DOM.removeClass(this._$close, '-show');

    this._sidePaging.hide(); //Fire section change event -------------------------------------------


    var newState = {
      section: Enums_1.SectionType.WORK,
      subsection: this._activeDepartment,
      title: this._activeDepartment === Enums_1.DepartmentType.SCREENS ? 'Screens' : 'Spaces',
      href: "/" + this._activeDepartment + "/"
    };
    Events_1.Events.dispatch(AppEvents_1.AppEvents.CHANGE_SECTION, newState, {
      delay: eventDelay
    });
    return false;
  };
  /** Match Header video to the PIXI tile */


  ProjectController.prototype._matchHeaderToPixi = function () {
    if (!this._$headerVideo || !this._$headerSpacer || this._headerSized) {
      return;
    } //1.) Get the size from the active tile. 
    //Then just match width. The position is sorted via CSS transfrom and the 
    //let rect = null;
    //let rect: any =	this._pixiController.getProjectHeaderSize();
    //If there no valid rect then project has probably been displayed from a deeplink:
    //TODO replace 'video sizes';


    var videoSize = {
      width: 1920,
      height: 1080
    };
    var containerSize = {
      width: window.innerWidth,
      height: window.innerHeight
    };

    if (!this._headerSized || window.innerWidth >= 900) {
      document.querySelector('.project__video__container').style.height = window.innerHeight * 1.0 + "px"; //If on mobile then header video is 100% height + width
      //Otherwise the spacer will be set to a fixed aspect ratio based on width (so it won't jank on mobile resize)

      if (window.innerWidth >= 900) {
        //containerSize = {width: window.innerWidth, height: window.innerHeight};
        this._$headerSpacer.style.height = window.innerHeight * 1.0 + "px";
      }

      var rect = this.math.getCoverSize(videoSize, containerSize);
      this._$headerVideo.style.width = rect.width + "px";
      this._$headerVideo.style.height = rect.height + "px";
      this._headerSized = true;
    }
  };

  ProjectController.prototype._setHeaderVideoVisible = function () {
    if (this._headerVideoPlaying && this._scrollbarController.getScroll() > this._innerHeight) {
      this._headerVideoPlaying = false;

      this._$headerVideo.pause();

      this._$headerVideo.style.visibility = 'hidden';
    } else if (!this._headerVideoPlaying && this._scrollbarController.getScroll() <= this._innerHeight) {
      this._$headerVideo.play();

      this._$headerVideo.style.visibility = 'visible';
      this._headerVideoPlaying = true;
    }
  };

  return ProjectController;
}(Controller_1.Controller);

exports.ProjectController = ProjectController;

/***/ }),

/***/ "./src/app/controller/ScrollbarController.ts":
/*!***************************************************!*\
  !*** ./src/app/controller/ScrollbarController.ts ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Controller_1 = __webpack_require__(/*! debugbase/abstract/Controller */ "./src/debugbase/abstract/Controller.ts");

var Events_1 = __webpack_require__(/*! debugbase/events/Events */ "./src/debugbase/events/Events.ts");

var Enums_1 = __webpack_require__(/*! app/data/Enums */ "./src/app/data/Enums.ts");

var ScrollBehaviourManager_1 = __webpack_require__(/*! app/behaviour/managers/ScrollBehaviourManager */ "./src/app/behaviour/managers/ScrollBehaviourManager.ts");

var DebugMouseWheelEvent_1 = __webpack_require__(/*! app/event/DebugMouseWheelEvent */ "./src/app/event/DebugMouseWheelEvent.ts");

var DebugKeypressEvent_1 = __webpack_require__(/*! app/event/DebugKeypressEvent */ "./src/app/event/DebugKeypressEvent.ts"); //import {TweenMax, Power0, Power3, Back } from 'gsap';

/** Handles custom scrollbar and vertical dragging */


var ScrollbarController =
/** @class */
function (_super) {
  __extends(ScrollbarController, _super);

  function ScrollbarController() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.endFlagged = false;
    _this._active = false;
    _this._paused = false;
    _this._dragging = false;
    _this._hideScroller = true;
    _this._planeY = 0;
    _this._planeTargetY = 0;
    _this._previousY = 0;
    _this._minBarScroll = 0;
    _this._maxTargetScroll = 0;
    _this._easePower = 2; //Scrolling with bar

    _this._dragStartClientY = 0;
    _this._dragStartBarY = 0;
    _this._barY = 0;
    _this._eventIds = {
      move: null,
      up: null
    }; //Touch scrolling 

    _this._touchStartY = 0;
    _this._direction = 0;
    return _this;
  }

  ScrollbarController.prototype.init = function () {
    this._scrollBehaviourManager = new ScrollBehaviourManager_1.ScrollBehaviourManager();
  };

  ScrollbarController.prototype.resize = function () {
    if (!this._active) {
      return;
    }

    this._scrollBehaviourManager.resize();

    this._setSizing();

    this._resizeBar(0.3, false);
  };
  /** Get scroll as ration of max scroll */


  ScrollbarController.prototype.getProgress = function () {
    return this._planeY / this._maxTargetScroll;
  };
  /** Get scroll as a 0-1 value */


  ScrollbarController.prototype.getScroll = function () {
    return Math.abs(this._planeY);
  };
  /** Get scroll */


  ScrollbarController.prototype.scrollTo = function (y) {
    var _this = this;

    if (this._scrollerType === Enums_1.ScrollerType.CUSTOM) {
      this._planeTargetY = this.math.constrain(y, this._maxTargetScroll, 0);

      this._syncBarToTargetY();
    } else {
      var tweenOb_1 = {
        scroll: Math.round(Math.abs(this._planeY))
      };
      gsap.TweenMax.to(tweenOb_1, 0.6, {
        scroll: 0,
        ease: gsap.Power3.easeInOut,
        onUpdate: function onUpdate() {
          _this._planeY = _this._planeTargetY = -1 * tweenOb_1.scroll;
          window.scrollTo(0, tweenOb_1.scroll);
        }
      });
      /*window.scrollBy({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });*/
    }
  };
  /** Scroll to an selector */


  ScrollbarController.prototype.scrollToSelector = function (selector) {
    var element = this._$target.querySelector(selector);

    var y = this._getElementY(element);

    this.scrollTo(y);
  };
  /** reset */


  ScrollbarController.prototype.reset = function () {
    this.setPause(false);
    this._barY = this._planeTargetY = this._planeY = this._previousY = 0;
  };
  /** Set pause state (To allow interaction or not) */


  ScrollbarController.prototype.setPause = function (pause) {
    this._paused = pause;
  };
  /** Set Active */


  ScrollbarController.prototype.setActive = function (active) {
    this._active = active;

    if (active) {
      this.DOM.addClass(this.container, '-active');
    } else {
      this.DOM.removeClass(this.container, '-active');
    }
  };

  ScrollbarController.prototype.getActive = function () {
    return this._active;
  };

  ScrollbarController.prototype.getDirection = function () {
    return this._direction;
  };
  /** Focus a new section */


  ScrollbarController.prototype.setFocus = function ($element, animateTime, $heightTarget) {
    var _this = this;

    if (animateTime === void 0) {
      animateTime = 0;
    }

    if ($heightTarget === void 0) {
      $heightTarget = null;
    }

    var reactivateAfterResize = false;
    this.endFlagged = false;
    this._$target = $element;
    this._$heightTarget = $heightTarget ? $heightTarget : $element;

    if (this._$target) {
      //If animating between targets then decative while animation is working: 
      if (this._active && animateTime !== 0) {
        this._active = false;
        reactivateAfterResize = true;
      }

      this._barY = this._planeTargetY = this._planeY = 0;

      this._setSizing();

      this._resizeBar(animateTime, reactivateAfterResize); //Set the container for the behaviours: 


      this._scrollBehaviourManager.setContainer(this._$target); //If there are modules that neeed to be created do so: 


      this.module.createModulesInTarget(this._$target); //this._$heightTarget.addEventListener('resize', this.resize.bind(this));
      //If the sldier is custom type, then track resizing on the actual alement with ResizeSensor class

      if (this._scrollerType === Enums_1.ScrollerType.CUSTOM) {
        var razor = window.ResizeSensor;
        var sense = new razor(this._$heightTarget, function () {
          return _this.resize();
        });
      }
    } else {
      this._active = false;
      this._planeY = this._barY = this._planeTargetY = 0;

      this._scrollBehaviourManager.setContainer(null);
    }
  }; //** Tick - update scroll position, as there is inernia applied to the planes movement */


  ScrollbarController.prototype.tick = function () {
    if (!this._active) {
      return;
    } //Updatet the y position of scroll panel in occordance


    if (this._scrollerType === Enums_1.ScrollerType.CUSTOM && !this._hideScroller) {
      this._updateTargetScroll();
    }

    this._scrollBehaviourManager.updateScroll(Math.abs(this._planeY));
  };
  /** Scrollbar will always be in global HTML so use DOMReady event to setup */


  ScrollbarController.prototype.DOMReady = function () {
    var _this = this;

    this._testScrollerType();

    this._scrollBehaviourManager.setType(this._scrollerType);

    this._$bar = this.container.querySelector('.scrollbar__bar');

    if (this._scrollerType === Enums_1.ScrollerType.CUSTOM) {
      Events_1.Events.on('mousedown', '.scrollbar__bar', this._onBarClick.bind(this));
      Events_1.Events.on('touchstart', window, this._onTouchStart.bind(this)); //Add mouse wheel events: 

      window.addEventListener('mousewheel', function (e) {
        _this._onMouseWheel(e);
      }, false);
      window.addEventListener('DOMMouseScroll', function (e) {
        _this._onMouseWheel(e);
      }, false); //Add Keyboard events: 

      window.addEventListener('keyup', function (e) {
        _this._onKeyPress(e);
      }, false);
    } //Temp to test 
    //this._active = true;
    //this.setFocus(document.querySelector("#testscroller"));

  };

  ScrollbarController.prototype.scroll = function (y) {
    if (this._scrollerType === Enums_1.ScrollerType.STANDARD) {
      this._planeY = this._planeTargetY = -1 * y;

      this._setDirection();
    }
  }; //private 
  //____________________________________________________________________________________
  //____________________________________________________________________________________
  //____________________________________________________________________________________
  //____________________________________________________________________________________

  /** Set sizing after resize of retarget */


  ScrollbarController.prototype._setSizing = function () {
    this._hideScroller = this._$heightTarget.clientHeight < this._innerHeight;

    if (this._hideScroller) {
      this.DOM.removeClass(this.container, '-active');
      return;
    }

    this._innerHeight = window.innerHeight;
    var ratio = this._innerHeight / this._$heightTarget.clientHeight;
    this._maxTargetScroll = -1 * (this._$heightTarget.clientHeight - this._innerHeight);
    this._barHeight = this._innerHeight * ratio;
    this._maxBarScroll = this._innerHeight - this._barHeight - 20;
    this.DOM.addClass(this.container, '-active');
  };
  /** Resize the bar */


  ScrollbarController.prototype._resizeBar = function (animateTime, reactivateAfterResize) {
    var _this = this;

    if (animateTime === void 0) {
      animateTime = 0;
    }

    if (reactivateAfterResize === void 0) {
      reactivateAfterResize = false;
    }

    var completeCallback = reactivateAfterResize ? function () {
      _this._active = true;
    } : null;
    gsap.TweenMax.to(this._$bar, animateTime, {
      y: this._barY,
      height: this._barHeight,
      onComplete: completeCallback
    });
  };
  /** Bar click event */


  ScrollbarController.prototype._onBarClick = function (e) {
    if (!this._active || this._paused || this._hideScroller) {
      return;
    }

    this._dragStartBarY = this._barY;
    this._dragStartClientY = e.clientY;
    this.DOM.addClass(this.container, '-dragging');
    this._dragging = true;
    this._eventIds.move = Events_1.Events.on('mousemove', window, this._onBarDrag.bind(this));
    this._eventIds.up = Events_1.Events.on('mouseup', window, this._onBarRelease.bind(this));
  };
  /** On drag of bar update the scroll position */


  ScrollbarController.prototype._onBarDrag = function (e) {
    this._barY = this.math.constrain(this._dragStartBarY + (e.clientY - this._dragStartClientY), this._minBarScroll, this._maxBarScroll);
    gsap.TweenMax.set(this._$bar, {
      y: this._barY
    }); //Set the target Y position of the scroller to move the plane: 

    this._planeTargetY = this._maxTargetScroll * (this._barY / this._maxBarScroll);
  }; //** On release of drag bar */ 


  ScrollbarController.prototype._onBarRelease = function () {
    Events_1.Events.offById(this._eventIds.move, this._eventIds.up);
    this.DOM.removeClass(this.container, '-dragging');
    this._dragging = false;
  };

  ScrollbarController.prototype._onTouchStart = function (e) {
    console.log('Touch start');

    if (!this._active || this._paused || this._hideScroller) {
      return;
    }

    this._dragging = true;
    this._touchStartY = e.touches[0].clientY;
    this._easePower = 4;
    this._eventIds.moveTouch = Events_1.Events.on('touchmove', window, this._onTouchMove.bind(this));
    this._eventIds.moveTouchUp = Events_1.Events.on('touchend', window, this._onTouchEnd.bind(this));
  };

  ScrollbarController.prototype._onTouchMove = function (e) {
    //Set the target Y position of the scroller to move the plane: 
    this._planeTargetY = this.math.constrain(this._planeTargetY + (e.touches[0].clientY - this._touchStartY) * 2, this._maxTargetScroll, 0);
    this._touchStartY = e.touches[0].clientY;
  };

  ScrollbarController.prototype._onTouchEnd = function (e) {
    console.log('Touch end');
    Events_1.Events.offById(this._eventIds.moveTouch, this._eventIds.moveTouchUp);
    this._dragging = false;
    this._easePower = 5;
  };
  /** On Touch start
    //** On mouse wheel scrollet */


  ScrollbarController.prototype._onMouseWheel = function (e) {
    if (this._paused) {
      return;
    } //Other controllers will need to use this wheel scroll event 


    var delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail)); //If active or dragging then there is page target that 

    if (!this._active || this._dragging || this._hideScroller) {
      //If no target then send event as it can used by the scenes that have side parallax scrolling 
      if (!this._active) {
        Events_1.Events.dispatch(new DebugMouseWheelEvent_1.DebugMouseWheelEvent({
          delta: delta
        }));
      }

      return;
    }

    this._planeTargetY = this.math.constrain(this._planeTargetY + delta * this._getMouseWheelAmount(), this._maxTargetScroll, 0); //Now sync the bar 

    this._syncBarToTargetY();
  };

  ScrollbarController.prototype._getElementY = function (element) {
    if (!element) {
      try {
        throw new Error('Target element does not exsist in target conatiner');
      } catch (e) {
        console.log(e);
      }

      return 0;
    }

    return element.offsetTop;
  };
  /** Pickup directional key presses to manage down, pageDown, up, pageUp */


  ScrollbarController.prototype._onKeyPress = function (e) {
    var key = e.keyCode ? e.keyCode : e.which;
    var keyType;
    var move;

    if (key === 40) {
      keyType = Enums_1.DirectionalKeyType.DOWN;
    } else if (key === 38) {
      keyType = Enums_1.DirectionalKeyType.UP;
    } else if (key === 34) {
      keyType = Enums_1.DirectionalKeyType.PAGE_DOWN;
    } else if (key === 33) {
      keyType = Enums_1.DirectionalKeyType.PAGE_UP;
    } else if (key === 39) {
      keyType = Enums_1.DirectionalKeyType.RIGHT;
    } else if (key === 37) {
      keyType = Enums_1.DirectionalKeyType.LEFT;
    } // If this scrollbar is not actually active then dispatch the event to be used in other views (I.E in home/work to move the timeline)


    if ((!this._active || this._paused || this._hideScroller) && keyType) {
      Events_1.Events.dispatch(new DebugKeypressEvent_1.DebugKeypressEvent({
        keyType: keyType
      }));
      return;
    }

    move = this._getKeyMoveAmount(keyType);

    if (!move) {
      return;
    }

    this._planeTargetY = this.math.constrain(this._planeTargetY + move, this._maxTargetScroll, 0); //Now sync the bar 

    this._syncBarToTargetY();
  };
  /**  On drag then update scrolling acordingly */


  ScrollbarController.prototype._onPageDrag = function () {
    if (!this._active) {
      return;
    }
  };
  /** Update scroll position of plane */


  ScrollbarController.prototype._updateTargetScroll = function () {
    this._planeY = this.math.constrain(this._planeY + (this._planeTargetY - this._planeY) / this._easePower, this._maxTargetScroll, 0);

    this._setDirection();

    window.scrollTo(0, Math.round(-1 * this._planeY));
    console.log(window.scrollY, this._planeY); //gsap.TweenMax.set(this._$target, {y: Math.round(this._planeY)});
  };
  /** Get a suitable mousewheel scroll amount. Harded to 200 but maybe shoule be based on screen size? **/


  ScrollbarController.prototype._getMouseWheelAmount = function () {
    return 200;
  };
  /** Get a suitable key move amount  **/


  ScrollbarController.prototype._getKeyMoveAmount = function (keyType) {
    //
    if (keyType === Enums_1.DirectionalKeyType.PAGE_UP || keyType === Enums_1.DirectionalKeyType.PAGE_DOWN) {
      return keyType === Enums_1.DirectionalKeyType.PAGE_UP ? this._innerHeight : -1 * this._innerHeight;
    } //Assume up/down key so do mini directional: 


    if (keyType === Enums_1.DirectionalKeyType.UP || keyType === Enums_1.DirectionalKeyType.DOWN) {
      return keyType === Enums_1.DirectionalKeyType.UP ? 100 : -100;
    }

    return 0;
  };
  /** Sync the bar to TargetY position -  when scrollweheel or arrrows are used  */


  ScrollbarController.prototype._syncBarToTargetY = function () {
    var ratio = this._planeTargetY / this._maxTargetScroll;
    this._barY = ratio * this._maxBarScroll;
    gsap.TweenMax.to(this._$bar, 0.3, {
      y: this._barY
    });
  };
  /** Set direction */


  ScrollbarController.prototype._setDirection = function () {
    if (this._previousY < this._planeY) {
      this._direction = -1;
    } else if (this._previousY > this._planeY) {
      this._direction = 1;
    }

    this._previousY = this._planeY;
  };
  /** Test the scroller type */


  ScrollbarController.prototype._testScrollerType = function () {
    this._scrollerType = window.innerWidth < 1030 ? Enums_1.ScrollerType.STANDARD : Enums_1.ScrollerType.CUSTOM; //this._scrollerType = ScrollerType.STANDARD;
    //this._scrollerType = ScrollerType.CUSTOM;

    if (this._scrollerType === Enums_1.ScrollerType.STANDARD) {
      this.DOM.addClass(document.querySelector('body'), '-standardscroller');
    }
  };

  return ScrollbarController;
}(Controller_1.Controller);

exports.ScrollbarController = ScrollbarController;

/***/ }),

/***/ "./src/app/controller/UIController.ts":
/*!********************************************!*\
  !*** ./src/app/controller/UIController.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var GA_1 = __webpack_require__(/*! debugbase/tracking/GA */ "./src/debugbase/tracking/GA.ts");

var Controller_1 = __webpack_require__(/*! debugbase/abstract/Controller */ "./src/debugbase/abstract/Controller.ts");

var Events_1 = __webpack_require__(/*! debugbase/events/Events */ "./src/debugbase/events/Events.ts");

var AppEvents_1 = __webpack_require__(/*! app/data/AppEvents */ "./src/app/data/AppEvents.ts");

var Enums_1 = __webpack_require__(/*! app/data/Enums */ "./src/app/data/Enums.ts");

var UIThemeChangeEvent_1 = __webpack_require__(/*! app/event/UIThemeChangeEvent */ "./src/app/event/UIThemeChangeEvent.ts");

var Enums_2 = __webpack_require__(/*! app/data/Enums */ "./src/app/data/Enums.ts"); //import {TweenMax, Power0, Power3, Back } from 'gsap';


var UIController =
/** @class */
function (_super) {
  __extends(UIController, _super);

  function UIController() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this._animateInSubsection = false;
    _this._subsectionTypeDirection = 1;
    _this._uiShowing = true;
    return _this;
  }

  UIController.prototype.init = function () {
    Events_1.Events.on(UIThemeChangeEvent_1.UIThemeChangeEvent, this._onThemeChange.bind(this));
  };

  UIController.prototype.setControllers = function (scrollbar) {
    this._scrollbarController = scrollbar;
  };

  UIController.prototype.DOMReady = function () {
    var _this = this;

    this._$section = this.container.querySelector('.-section');
    this._$subsection = this.container.querySelector('.-subsection');
    Events_1.Events.on('click', '.ui__breadcrumb', function (e) {
      e.preventDefault();

      _this._onBreadcrumbClick(e);

      return false;
    });
    Events_1.Events.on('click', '.ui__logo__link', function (e) {
      e.preventDefault();
      Events_1.Events.dispatch(AppEvents_1.AppEvents.DEBUG_LOGO_PRESS);
      return false;
    });
    this.setState(this._state);
  };

  UIController.prototype.setNavState = function (state) {
    if (state === Enums_1.MenuStateType.OPEN) {
      this.DOM.addClass(this.container, '-navopen');
      return;
    }

    this.DOM.removeClass(this.container, '-navopen');
  };
  /** Section has change so set state */


  UIController.prototype.setState = function (state) {
    this._state = state;

    if (!this._$section) {
      return;
    }

    console.log('state', state);
    var sectionName = null;
    var sectionURL;
    var subSectionName = null;
    var subSectionURL; //If state is not home then it should have a breadcrumb showing 

    if (state.section === Enums_1.SectionType.PROJECT) {
      sectionName = state.subsection.charAt(0).toUpperCase() + state.subsection.substr(1);
      subSectionName = (state.projectSlug.charAt(0).toUpperCase() + state.projectSlug.substr(1)).replace(new RegExp('-', 'g'), ' ');
      sectionURL = "/" + sectionName.toLowerCase() + "/";
      subSectionURL = state.href;
    } else if (state.section !== Enums_1.SectionType.HOME) {
      if (state.section === Enums_1.SectionType.INFO || state.section === Enums_1.SectionType.WORK) {
        sectionName = state.subsection.charAt(0).toUpperCase() + state.subsection.substr(1);
      } else {
        sectionName = state.section.charAt(0).toUpperCase() + state.section.substr(1);
      }

      if (state.section !== Enums_1.SectionType.INFO) {
        sectionURL = "/" + state.section + "/";
      } else {
        sectionURL = "/" + state.subsection + "/";
      }
    }

    this._setBreadcrumb(this._$section, sectionName, sectionURL); //Set the 2nd subsection breadcrumb: 


    if (!subSectionName && state.subsection && state.section !== Enums_1.SectionType.INFO && state.section !== Enums_1.SectionType.WORK) {
      subSectionName = state.subsection.charAt(0).toUpperCase() + state.subsection.substr(1);
    }

    this._setBreadcrumb(this._$subsection, subSectionName, subSectionURL);

    this._setHomeClassState();
  };
  /** Set the section/subsection breadcrumb */


  UIController.prototype._setBreadcrumb = function ($target, name, href) {
    if (name === void 0) {
      name = null;
    }

    if (href === void 0) {
      href = null;
    }

    if (name) {
      this.DOM.addClass($target, '-show');
      this.DOM.setText($target, name);

      if (href) {
        this.DOM.setAttribute($target, 'href', href);
      }
    } else {
      this.DOM.removeClass($target, '-show');
    }
  };
  /** set the -home class if on home */


  UIController.prototype._setHomeClassState = function () {
    if (this._state.section === Enums_1.SectionType.HOME) {
      this.DOM.addClass(this.container, '-home');
      return;
    }

    this.DOM.removeClass(this.container, '-home');
  };

  UIController.prototype.tick = function () {
    if (this._animateInSubsection) {
      this.DOM.setText(this._$subsection, this._subsection.substr(0, this._subsectionTypeIndex));

      if (this._subsectionTypeDirection === 1) {
        this._subsectionTypeIndex++;

        if (this._subsectionTypeIndex === this._subsection.length + 1) {
          this._animateInSubsection = false;
        }
      } else if (this._subsectionTypeDirection === -1) {
        this._subsectionTypeIndex--;

        if (this._subsectionTypeIndex === -1) {
          this._animateInSubsection = false;
        }
      }
    }

    this._testUIVisiblity();

    if (!this._scrollbarController.endFlagged && this._scrollbarController.getProgress() > 0.95) {
      GA_1.GA.event('Progress', 'End of page reached', window.location.pathname);
      this._scrollbarController.endFlagged = true;
    }
  };

  UIController.prototype.show = function () {
    gsap.TweenMax.fromTo('.ui__logo__link', 0.6, {
      autoAlpha: 0,
      scale: 2
    }, {
      scale: 1,
      autoAlpha: 1,
      delay: 0.3,
      ease: gsap.Power3.easeOut
    });
    gsap.TweenMax.to('.ui__hamburger', 0.4, {
      x: 0,
      ease: gsap.Power3.easeOut,
      delay: 0.3
    });
    gsap.TweenMax.to('.ui__logo__copy', 0.4, {
      autoAlpha: 1,
      ease: gsap.Power3.easeOut,
      delay: 0.3
    });
    this.setState(this._state);
  };

  UIController.prototype.hide = function () {
    gsap.TweenMax.to('.ui__logo__link', 0.4, {
      scale: 0,
      autoAlpha: 0,
      ease: gsap.Power3.easeOut
    });
    gsap.TweenMax.to('.ui__hamburger', 0.4, {
      x: 100,
      ease: gsap.Power3.easeOut
    });
    gsap.TweenMax.to('.ui__logo__copy', 0.4, {
      autoAlpha: 0,
      ease: gsap.Power3.easeOut
    });
  };
  /** Update scroll */


  UIController.prototype.scroll = function (scrollY) {
    //Need to test if the UI should be hidden (when scrolling)
    this._testUIVisiblity();
  }; //PRIVATE 
  //----------------------------------------------------------------------------
  //----------------------------------------------------------------------------
  //----------------------------------------------------------------------------
  //----------------------------------------------------------------------------

  /** Logo area breadcrumb click */


  UIController.prototype._onBreadcrumbClick = function (e) {
    if (!this.DOM.hasClass(e.target, '-active')) {
      return;
    }

    GA_1.GA.event('UX', 'Breadcrumb press');
    Events_1.Events.dispatch(AppEvents_1.AppEvents.CLOSE_PROJECT);
  };
  /** On theme change */


  UIController.prototype._onThemeChange = function (event) {
    //TODO - move 'project close logic from this class'
    if (event.theme === Enums_2.UIThemeColourType.DARK) {
      this.DOM.addClass(this.container, '-dark');
      this.DOM.addClass(document.querySelector('.project__close'), '-dark');
      this.DOM.addClass(document.querySelector('.project__home'), '-dark');
      return;
    }

    this.DOM.removeClass(this.container, '-dark');
    this.DOM.removeClass(document.querySelector('.project__close'), '-dark');
    this.DOM.removeClass(document.querySelector('.project__home'), '-dark');
  };
  /** Check if the UI should be shown / hidden based on scroll state */


  UIController.prototype._testUIVisiblity = function () {
    var scrollY = this._scrollbarController.getScroll();

    var scrollDirection = this._scrollbarController.getDirection(); //1.) If showing then check: 
    //+ If last direction was down (+1) then 
    //- If scroll is moved from top and the 


    if (this._uiShowing && scrollDirection === 1) {
      if (this._testUIHideFromScrollPos(scrollY)) {
        this._setUIVisiblity(false);
      }

      return;
    } //2.) If not showing then check
    //- If direction is going back up then show 
    //- If outside hide zone on scroller then show
    //- If scrolling is not active then show 
    //- If navMenu is open then then show 


    if (!this._uiShowing) {
      var isScrollActive = this._scrollbarController.getActive();

      if (scrollDirection === -1 || !this._testUIHideFromScrollPos(scrollY) || !isScrollActive) {
        this._setUIVisiblity(true);
      }

      return;
    }
  };
  /** SHow / hide all the UI that is triggered by */
  //TODO remove Project concerns like close / home button (Or move these UI controller!!)


  UIController.prototype._setUIVisiblity = function (show) {
    this._uiShowing = show;

    if (this._uiShowing) {
      this.DOM.removeClass(this.container, '-hide');
      this.DOM.addClass(document.querySelector('.project__close'), '-show');
      this.DOM.addClass(document.querySelector('.project__homebutton'), '-show');
      this.DOM.addClass(document.querySelector('#info-paging'), '-scrollshow');
      return;
    } //The UI is hidden so flag this: 


    this.DOM.removeClass(document.querySelector('.project__close'), '-show');
    this.DOM.removeClass(document.querySelector('.project__homebutton'), '-show');
    this.DOM.removeClass(document.querySelector('#info-paging'), '-scrollshow');
    this.DOM.addClass(this.container, '-hide');
  };
  /** Test if scroller is 'hide' zone for the UI elements */


  UIController.prototype._testUIHideFromScrollPos = function (scrollY) {
    var scrollRatio = this._scrollbarController.getProgress();

    return scrollY > 100 && scrollRatio < 0.95;
  };

  return UIController;
}(Controller_1.Controller);

exports.UIController = UIController;

/***/ }),

/***/ "./src/app/controller/WorkController.ts":
/*!**********************************************!*\
  !*** ./src/app/controller/WorkController.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var GA_1 = __webpack_require__(/*! debugbase/tracking/GA */ "./src/debugbase/tracking/GA.ts");

var Controller_1 = __webpack_require__(/*! debugbase/abstract/Controller */ "./src/debugbase/abstract/Controller.ts");

var Events_1 = __webpack_require__(/*! debugbase/events/Events */ "./src/debugbase/events/Events.ts");

var AppEvents_1 = __webpack_require__(/*! app/data/AppEvents */ "./src/app/data/AppEvents.ts");

var Enums_1 = __webpack_require__(/*! app/data/Enums */ "./src/app/data/Enums.ts");

var DragBreakpoints_1 = __webpack_require__(/*! debugbase/util/DragBreakpoints */ "./src/debugbase/util/DragBreakpoints.ts");

var Paging_1 = __webpack_require__(/*! app/module/global/Paging */ "./src/app/module/global/Paging.ts");

var WorkTilePixi_1 = __webpack_require__(/*! app/module/work/WorkTilePixi */ "./src/app/module/work/WorkTilePixi.ts");

var ViewReadyEvent_1 = __webpack_require__(/*! app/event/ViewReadyEvent */ "./src/app/event/ViewReadyEvent.ts");

var DebugMouseWheelEvent_1 = __webpack_require__(/*! app/event/DebugMouseWheelEvent */ "./src/app/event/DebugMouseWheelEvent.ts");

var DebugKeypressEvent_1 = __webpack_require__(/*! app/event/DebugKeypressEvent */ "./src/app/event/DebugKeypressEvent.ts");

var QueProjectEvent_1 = __webpack_require__(/*! app/event/QueProjectEvent */ "./src/app/event/QueProjectEvent.ts");

var WorkController =
/** @class */
function (_super) {
  __extends(WorkController, _super); //private readonly VELOCITY_FACTOR: number = 2.0;				//Every movement across timeline progress is multiplied by this to create the rotation on drag/slide
  //private readonly VELOCITY_FRICTION: number = 0.94;			//The amount the rotation falls back to '0'
  //private readonly ROTATION_FACTOR: number = 30;				//The base level of rotation
  //private readonly MAX_ROTATION: number = 45;					//The max the rotation is allowed to go to +/- - Can be larger than base
  //Called when work is routed directly 
  //(Never actually calls work as there is only /spaces/ and /screens/ routes)


  function WorkController(id) {
    var _this = //Listen for view ready event
    _super.call(this, id) || this;

    _this._active = false;
    _this._readyToSetup = false; //Is ready to view. So can be setup for viewing oif required

    _this._isSetup = false; //Is setup up ready to view

    _this._isHTMLInjected = false; //Flag to stop the HTML inject action trigering twice

    _this._htmlInjectionQeued = false; //Flagged when the view is required but not ready to setup

    _this._homeViewReady = false; //Flagged when home loads 

    _this._canShowBack = false;
    _this._backToHomeIsVisible = false;
    _this._loadFlags = {
      pixi: false,
      dom: false,
      json: false
    };
    _this._pagingGuideActive = false;
    _this._focusedIndex = 0;
    _this._activeProjectIndex = 0;
    _this._dragging = false;
    _this._introShowing = true;
    _this._introX = 0;
    _this._disablePagingAutoUpdate = false;
    _this._autoPagingCounter = 0; //Velocity / Rotation:

    _this._frameProgress = 0;
    _this._velocity = 0;
    _this._velocityRotation = 0;
    _this._rotationRadians = 0;
    _this._velocityScale = 1.2;
    _this._timeouts = {};
    _this._tweens = {};
    _this._intervals = {};
    _this.INNER_TILE_STEP = 0.5;
    Events_1.Events.on(ViewReadyEvent_1.ViewReadyEvent, _this._onViewReady.bind(_this));
    return _this;
  }

  WorkController.prototype.init = function () {
    //this.state.set('section', SectionType.WORK);
    this._active = true; //Set the opening state to the homepage: 

    var openingState = {
      section: Enums_1.SectionType.WORK,
      subsection: this._department,
      title: this._department === Enums_1.DepartmentType.SPACES ? 'Spaces' : 'Screens',
      href: "/" + this._department + "/"
    };
    Events_1.Events.dispatch(AppEvents_1.AppEvents.SET_INTIAL_STATE, openingState);
  }; //Spaces route: 


  WorkController.prototype.spaces = function () {
    this._department = Enums_1.DepartmentType.SPACES;
    this.init();
  }; //Screens route: 


  WorkController.prototype.screens = function () {
    this._department = Enums_1.DepartmentType.SCREENS;
    this.init();
  };
  /** Unless routed then class doesn't know if spaces / screens, so set directly */


  WorkController.prototype.setDepartment = function (department) {
    this._department = department;
  }; //Getters 
  //-----------------------------------------------------------------------

  /** Get if ready to view. This is called when a deep link or loading is happening */


  WorkController.prototype.isReadyToView = function (state) {
    //This is called when checking if the view is ready to load 
    return this._readyToSetup;
  };
  /** Is actually ready to 'show' - allow for delay in WebGL content being ready */


  WorkController.prototype.readyForDeeplink = function (state) {
    //If this function is being called then process is checking if it can show 
    //So if its ready to setup but not actually been created then can setup here
    if (this._readyToSetup && !this._isSetup) {
      this._setup();
    }

    return this._readyToSetup && this._isSetup;
  }; //Setters ----------------------------------------------------------------

  /** AJAX loaded HTML  for the section: */


  WorkController.prototype.setHTML = function (html) {
    this._html = html;
    this._loadFlags.dom = true;

    this._testReadyToSetup();

    if (this._htmlInjectionQeued) {
      this._injectHTML();
    }
  };
  /** Set JSON for project items and settings */


  WorkController.prototype.setJSON = function (json) {
    this._json = json;
    this._loadFlags.json = true;

    this._testReadyToSetup();
  };
  /** History state has been changed by / back forward */


  WorkController.prototype.setState = function (state) {
    this._state = state;
  }; //Set controller depencies (set from app controller): 


  WorkController.prototype.setControllers = function (mouse, background, pixi) {
    this._mouseController = mouse;
    this._backgroundController = background;
    this._pixiController = pixi;
  }; //Pixi dependecies (set in app controller): 


  WorkController.prototype.setPixi = function ($pixi, $backgroundContainer, $workContainer) {
    this._$pixi = $pixi;
    this._$backgroundContainer = $backgroundContainer;
    this._$workContainer = $workContainer;
  }; //Public -------------------------------------------------------------------
  //DOMReady. Add DOM element refs and event listeners: 


  WorkController.prototype.DOMReady = function () {
    this._innerWidth = window.innerWidth;

    if (this._active) {
      //Flag the is active 
      this._loadFlags.dom = true;

      this._testReadyToSetup();
    } //If active then directly loaded so 


    if (this._readyToSetup) {
      this._setup();

      return;
    } //If injection of HTML is queded then preform that that complete the setup


    this._testInjectonQeued();
  };
  /** Que for showing from home screen. Basically inject the HTML, which then triggers the _setup process */


  WorkController.prototype.que = function () {
    if (this._html) {
      this._injectHTML();
    } else {
      this._htmlInjectionQeued = true;
    }
  };
  /** Freeze */


  WorkController.prototype.freeze = function () {
    var _this = this;

    this._active = false;

    this._tileBreakpoints.setActive(false);

    this._mouseController.setDragCursorActive(false);

    this._timeouts.freeze = setTimeout(function () {
      return _this._cleanupAfterFreeze();
    }, 500);
  };
  /** If a deeplink is fired while project is opened then may need to reset this view  */


  WorkController.prototype.freezeFromProjectView = function () {
    if (this._$workContainer) {
      this._resetAllProjects();

      this._$workContainer.visible = false;
      this.DOM.removeClass(this.container, '-active');
    }
  };
  /** Reset is always called before showing to put in correct state. Seperate from 'show' as a deplay might be needed between the 2 */


  WorkController.prototype.reset = function (oldState, isDeeplink) {
    if (oldState === void 0) {
      oldState = null;
    }

    if (isDeeplink === void 0) {
      isDeeplink = false;
    } //0.) Generic across all types of show: 


    this._resetIntervalsAndAnimations();

    this._$workContainer.visible = true;
    gsap.TweenMax.set([this.container, document.querySelector('canvas')], {
      autoAlpha: 1,
      scale: 1
    });
    this._introX = 0;

    this._mouseController.setColour('light');

    if (this._isSetup && (oldState === null || oldState.section !== Enums_1.SectionType.PROJECT)) {
      this._resetProgress();

      this._resetTiles();

      this._paging.reset();

      this._paging.setActiveIndex(0);

      gsap.TweenMax.set(this._paging.$container, {
        y: 100,
        x: '-50%'
      });
    } //Show the container by making it active


    this.DOM.addClass(this.container, '-active'); //Is a deeplink for get ready to show coming direct from Preoader 

    if (isDeeplink) {
      this._resetForDeeplink();

      return;
    } //If transition from gome then the content needs to animate updwards


    if (oldState.section === Enums_1.SectionType.HOME) {
      this._resetForHome();
    } //If transition back from project


    if (oldState.section === Enums_1.SectionType.PROJECT) {
      this._resetForProject();
    }
  };
  /**
  * Show after preload, navigation or seamless transition from other section
  * @param {HistoryStateModel} oldState - The previous view state
  * @param {boolean} isDeepLink - Is coming from the preloader state rather than a seamless transition
  */


  WorkController.prototype.show = function (oldState, isDeeplink) {
    if (isDeeplink === void 0) {
      isDeeplink = false;
    }

    this._pixiController.unpause(); //If no state then coming from the intial preload / deeplink


    if (!oldState || isDeeplink) {
      //this._setInteractionEnabled(true);
      this._showFromDeeplink();

      return;
    } //If coming from home then section needs to aimate updwards


    if (oldState.section === Enums_1.SectionType.HOME) {
      this._showFromHome();
    } //If coming from project then 


    if (oldState.section === Enums_1.SectionType.PROJECT) {
      this._showFromProject();
    }
  };
  /**
  * after section is moved away from. The new state is passed so can work out how to transition out
  * @param {HistoryStateModel} newState
  */


  WorkController.prototype.hide = function (newState) {
    if (newState === void 0) {
      newState = null;
    }

    if (newState.section === Enums_1.SectionType.INFO) {
      this._hideForInfo();
    } else if (newState.section === Enums_1.SectionType.HOME) {
      this._hideForHome();
    }

    this._active = false;
  };
  /** Pause (For when nav menu is showing) */


  WorkController.prototype.pause = function () {
    this._setInteractionEnabled(false);

    gsap.TweenMax.to([this.container, document.querySelector('canvas')], 0.45, {
      scale: 1.2,
      ease: gsap.Power3.easeOut
    });
  };
  /** Unpause (For when nav menu is hidden) */


  WorkController.prototype.unpause = function () {
    this._setInteractionEnabled(true);

    gsap.TweenMax.to([this.container, document.querySelector('canvas')], 0.45, {
      scale: 1,
      ease: gsap.Power3.easeOut
    });
  };
  /**
  * Animate x to progress to a point in time
  * @param {number} index -  will most probbaly '0' be for intro slide:
  */


  WorkController.prototype.animateProgressToValue = function (index) {
    this.unpause();
    this._activeProjectIndex = index;

    this._tileBreakpoints.setIndex(index);
  };
  /** Resize event. Redo all the tiles */


  WorkController.prototype.resize = function () {
    var _this = this;

    if (!this._active) {
      return;
    }

    this._setVirtualWidth();

    this._innerWidth = window.innerWidth;
    var skipUpdates;

    this._tiles.forEach(function (tile) {
      //Don't actually update actiive tile
      if (tile !== _this._activeProjectTile) {
        tile.resize();
      }
    });
  };
  /** RequestAnimationFrame interval tick */


  WorkController.prototype.tick = function () {
    if (this._isSetup && this._active) {
      this._processHitAreaUpdate();

      this._processVelocity();

      this._checkPagingGuidePassed();

      this._checkBackToHomeVisible();
    }
  };
  /**
  * Partciles spritesheet loaded so flag and deal with
  * @param {PIXI.Spritesheet} spritesheet -  spritesheet of particle eleemnts
  */


  WorkController.prototype.pixiParticlesLoaded = function (spritesheet) {
    this._particlesSpritesheet = spritesheet;

    this._checkPixiResourcesAreReady();

    console.log("WORK ", this._department, "loaded", this._loadFlags);
  }; //Background spritesheet loaded so flag and deal with 


  WorkController.prototype.pixiBackgroundsLoaded = function (spritesheet, department) {
    this._backgroundSpritesheet = spritesheet;

    this._checkPixiResourcesAreReady();
  }; //Private methods: 
  //-------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------

  /** Test that the view is ready to setup */


  WorkController.prototype._testReadyToSetup = function () {
    this._readyToSetup = this._loadFlags.dom && this._loadFlags.pixi && this._loadFlags.json;
  };
  /** When background loaded then inject the HTML */


  WorkController.prototype._injectHTML = function (onInjected) {
    var _this = this;

    if (onInjected === void 0) {
      onInjected = null;
    } //Only do this injecton once!


    if (this._isHTMLInjected) {
      return;
    }

    this.DOM.append(document.querySelector('body'), this._html, function () {
      _this.container = document.querySelector(".work.-" + _this._department);
      _this._$intro = _this.container.querySelector('.work__slider__intro');
      _this._$backButton = _this.container.querySelector('.work__homebutton');

      _this.module.createModulesInTarget(_this.container);

      if (onInjected) {
        onInjected();
      }
    });
    this._isHTMLInjected = true;
    this._htmlInjectionQeued = false;
  };
  /** Test if injection is qued. If so then inject the html in. */


  WorkController.prototype._testInjectonQeued = function () {
    if (this._htmlInjectionQeued && this._readyToSetup) {
      this._injectHTML();
    }
  };
  /** DOM/PIXI ready so setup the view to interactive with */


  WorkController.prototype._setup = function () {
    var _this = this;

    if (this._isSetup) {
      return;
    } //If container doesn't exists then create. 


    if (!this.container) {
      this._injectHTML(function () {
        return _this._setup();
      });

      return;
    }

    this._$intro = this.container.querySelector('.work__slider__intro');
    this._$backButton = this.container.querySelector('.work__homebutton');

    this._setupPixi();

    this._setupPaging();

    this._addListeners();

    this._isSetup = true; //Trigger the VIEW_SETUP event, which can be picked up by any loading processes: 

    var view = this._department === Enums_1.DepartmentType.SCREENS ? Enums_1.ViewType.SCREENS : Enums_1.ViewType.SPACES;
    Events_1.Events.dispatch(new ViewReadyEvent_1.ViewReadyEvent({
      view: view
    }), {
      delay: 1
    });
  };
  /** Set the virtual width for the break points */


  WorkController.prototype._setVirtualWidth = function () {
    if (window.innerWidth >= 900) {
      this._tileBreakpoints.setVirtualWidth(this._tiles.length * window.innerWidth);

      return;
    }

    this._tileBreakpoints.setVirtualWidth(this._tiles.length * window.innerWidth * 1.5);
  };
  /** Setup paging */


  WorkController.prototype._setupPaging = function () {
    this._paging = new Paging_1.Paging();

    this._paging.setContainer(this.container.querySelector("#" + this._department + "-paging"));

    this._paging.id = this._department + "-paging";

    this._paging.create();

    this._paging.setCallbacks(this._gotoProject.bind(this));
  };
  /** Add Listeners for */


  WorkController.prototype._addListeners = function () {
    //Listen for tile explore clicks 
    Events_1.Events.on('click', ".work.-" + this._department + " .worktitle__link", this._onExploreProjectClick.bind(this));
    Events_1.Events.on('click', ".work__homebutton", this._onBackToHomeClick.bind(this));
    Events_1.Events.on(DebugMouseWheelEvent_1.DebugMouseWheelEvent, this._onMouseWheel.bind(this));
    Events_1.Events.on(DebugKeypressEvent_1.DebugKeypressEvent, this._onKeyPress.bind(this));
  };
  /** Check the state of availble ressources so can load the */


  WorkController.prototype._checkPixiResourcesAreReady = function () {
    if (this._particlesSpritesheet && this._backgroundSpritesheet && !this._tiles) {
      this._loadFlags.pixi = true;

      this._testReadyToSetup();
    } //If active and ready then setup


    if (this._active && this._readyToSetup) {
      this._setup();

      return;
    } //If injection of HTML is queded then preform that that complete the setup


    this._testInjectonQeued();
  };
  /** Setup PIXI elements */


  WorkController.prototype._setupPixi = function () {
    this._createTilesPixi();

    this._createBreakpoints();
  };
  /** Create all the caoursel tiles: */


  WorkController.prototype._createTilesPixi = function () {
    var _this = this;

    var projects = this._json.projects;
    var tileIndex;
    this._tiles = []; //Add a blank spacer for the intro tile 

    var tile = new WorkTilePixi_1.WorkTilePixi(null, null, null, null, null);

    this._tiles.push(tile); //Add the main set 


    projects.forEach(function (project, index) {
      //Allow for blank spacer in indexing logic: 
      tileIndex = index; //Create the tile

      var tile = new WorkTilePixi_1.WorkTilePixi(_this._pixiController, tileIndex, project, _this._$workContainer, _this.container);
      tile.setSpriteSheets(_this._particlesSpritesheet, _this._backgroundSpritesheet);
      tile.setHitarea(_this.module.get(_this._department + "-hitarea-" + index)); //Explore from holding down on project tile: 

      tile.onExploreProject = function (data) {
        GA_1.GA.event('UX', 'Work > Explore Project Tile hold', data.slug);

        _this._projectSelected(data.slug, data.index + 1, data.href, data.title);
      };

      tile.create();

      _this._tiles.push(tile);
    });
    this._tileRatioShare = 1.0 / this._tiles.length; //1st tile is on at 50% of it's timeline 
    //That means is there are x5 then it starts at 0.1 ratio
    //Set this._activeProjectIndex to debug or jump straight to project)

    this._tileProgress = this._activeProjectIndex * this._tileRatioShare; //Update the progress to move to correct start point 

    this._updateTileProgress(); //Set the intro amount for calulating the animation of that HTMLElement 


    this._introActiveRange = 1 / this._tiles.length;
  };

  WorkController.prototype._createBreakpoints = function () {
    var _this = this;

    if (this._tileBreakpoints) {
      return;
    } //Create the 0% / 50% / 100% for SCREENS <> HOME <> SPACES layout 


    this._tileBreakpoints = new DragBreakpoints_1.DragBreakpoints(this._tiles.length, true, 0, false);
    var allowProgressTo = 1.0 - 1.0 / this._tiles.length;

    this._tileBreakpoints.setConstraints(0, allowProgressTo);

    this._tileBreakpoints.setDragToMoveRatio(this._json.dragToMoveRatio);

    this._tileBreakpoints.easePower = this._json.easePower;
    this._tileBreakpoints.releaseEasePower = this._json.easePower;
    this._tileBreakpoints.forceSnap = false;

    this._tileBreakpoints.setProgress(0);

    this._tileBreakpoints.onTick = function (progressRatio) {
      if (!_this._active) {
        return;
      }

      _this._frameProgress = progressRatio - _this._tileProgress;
      _this._tileProgress = progressRatio;

      _this._updateTileProgress();

      _this._setIntroVisibleState();

      _this._updateIntroProgress();

      _this._setAutoPaging();

      _this._updateBGAnimation();

      _this._effectVelocity(_this._frameProgress);
    };

    this._tileBreakpoints.onStartDrag = function () {
      if (!_this._active) {
        return;
      } //this._mouseController.setDragDown(true);


      _this._mouseController.setDragDown(true, null, 0.7); //Process the tile hit area logic (i.e if not moving too fast, and shoing then check for a click)


      _this._processHitAreaMouseDown(); //User is draging so no longer need to worry about next/back/paging animation


      _this._disablePagingAutoUpdate = false;
    };

    this._tileBreakpoints.onStopDrag = function () {
      _this._mouseController.setDragDown(false); //Process the tile hit area logic (i.e if not moving too fast, and shoing then check for a click)


      _this._processHitAreaMouseUp();
    };

    this._tileBreakpoints.onSnap = function (snapIndex) {
      _this._setProjectIndex(snapIndex);

      _this._mouseController.setDragDown(false);
    };

    this._tileBreakpoints.setActive(false);
  };
  /** Process checking hit area on Drag press */


  WorkController.prototype._processHitAreaMouseDown = function () {
    var _this = this;

    this._tiles.forEach(function (tile) {
      if (tile.isVisible) {
        tile.mouseDown(_this._mouseController.getMouseCords());
      }
    });
  };
  /** Process checking hit area on Drag press */


  WorkController.prototype._processHitAreaMouseUp = function () {
    this._tiles.forEach(function (tile) {
      if (tile.isVisible && tile.hitAreaMouseDown) {
        tile.mouseUp();
      }
    });
  };
  /** Process checking hit area on Drag press */


  WorkController.prototype._processHitAreaUpdate = function () {
    var _this = this;

    this._tiles.forEach(function (tile) {
      if (tile.isVisible && tile.hitAreaMouseDown) {
        tile.updateMouseCords(_this._mouseController.getMouseCords());
      }
    });
  }; //Reset methods 
  //-----------------------------------------------------------------------------------

  /** Reset anything that is happening */


  WorkController.prototype._resetIntervalsAndAnimations = function () {
    var _this = this;

    Object.keys(this._tweens).forEach(function (key) {
      _this._tweens[key].kill();
    });
    Object.keys(this._timeouts).forEach(function (key) {
      clearTimeout(_this._timeouts[key]);
    });
    Object.keys(this._intervals).forEach(function (key) {
      clearInterval(_this._intervals[key]);
    });
  };
  /** Reset for deeplink (opening, nav jump or history state) */


  WorkController.prototype._resetForDeeplink = function () {
    //Need to also reset the background so that it is 
    this._backgroundController.reset(this._state); //2.) Make sure the intro is showing: 


    gsap.TweenMax.set(this._$intro, {
      y: 0
    });
  };
  /** Reset for transition from home where the elements side in  */


  WorkController.prototype._resetForHome = function () {
    this._$workContainer.visible = false;
    gsap.TweenMax.set(this._$intro, {
      y: window.innerHeight + 100
    });
  };
  /** Reset when coming from project. Nothing special needed as it should be in required state */


  WorkController.prototype._resetForProject = function () {//NOTHING NEEDS TO BE RESET HERE. SHOULD BE IN THE REQUIERD STATE ALREADY (Maybe resize?)
  };
  /** Reset the timeline right to start '0' progress */


  WorkController.prototype._resetProgress = function () {
    this._focusedIndex = 0;
    this._tileProgress = 0;
    this._frameProgress = 0;

    this._tileBreakpoints.setProgress(0);
  };
  /** Reset the all the tiles to start state */


  WorkController.prototype._resetTiles = function () {
    this._tiles.forEach(function (tile) {
      return tile.reset();
    });
  };
  /** Cleanup after freezing */


  WorkController.prototype._cleanupAfterFreeze = function () {
    this._$workContainer.visible = false;
    this.DOM.removeClass(this.container, '-active');

    this._resetProgress();

    this._resetTiles();
  }; //Show methods  
  //-----------------------------------------------------------------------------

  /** Show from the preloader state */


  WorkController.prototype._showFromDeeplink = function () {
    var _this = this;

    this._active = true; //Stop scrolling before ui button comes in: 

    this._tileBreakpoints.setActive(true);

    this._mouseController.setDragCursorActive(true); //Set the opening state of the slider: 


    this.resize();

    this._updateTileProgress();

    this._paging.show();

    this._tweens.paging = gsap.TweenMax.to(this._paging.$container, 0.5, {
      y: 0,
      x: '-50%',
      ease: gsap.Power3.easeOut,
      delay: 0.5
    });
    this._timeouts.paging = setTimeout(function () {
      _this._showPagingGuide();
    }, 1500);
    this._timeouts.backButton = setTimeout(function () {
      return _this._canShowBack = true;
    }, 2000);
  };
  /** Show from transition from Home */


  WorkController.prototype._showFromHome = function () {
    var _this = this;

    this._mouseController.setDragCursorActive(false); //1.) Animate in the intro from the bottom. Timeline is off screen so it doesn't need to be amimated


    gsap.TweenMax.set(this._$intro, {
      x: this._introX,
      autoAlpha: 1
    });
    this._tweens.home = gsap.TweenMax.to(this._$intro, 1.0, {
      y: 0,
      ease: gsap.Power3.easeOut,
      delay: 1.0,
      onComplete: function onComplete() {
        if (!_this._isSetup) {
          _this._setup();
        }

        _this._tileBreakpoints.setActive(true);

        _this._mouseController.setDragCursorActive(true);

        _this._$workContainer.visible = true;
        _this._active = true;

        _this.resize();

        _this._updateTileProgress();

        _this._showPagingGuide();

        _this._timeouts.backButton = setTimeout(function () {
          return _this._canShowBack = true;
        }, 1100);
      }
    });

    if (this._paging) {
      this._paging.show();

      this._tweens.paging = gsap.TweenMax.to(this._paging.$container, 0.5, {
        y: 0,
        x: '-50%',
        ease: gsap.Power3.easeOut,
        delay: 1.5
      });
    }
  };
  /** Show from transition from Active / Zoomed in project  */


  WorkController.prototype._showFromProject = function () {
    var _this = this; //1.) Reverse the animation of the tile to zoom back into the timeline 


    if (this._activeProjectTile) {
      this._activeProjectTile.backFromProject();
    } //Hacky to reslove potential resize issues: 


    this._active = true;
    this.resize();
    this._active = false; //2.) Show surrounding tiles again:

    this._tiles.forEach(function (tile, index) {
      if (index !== 0 && tile !== _this._activeProjectTile) {
        tile.showFromProject();
      }
    }); //3.) Reset flags/vars and activate this view controller again


    this._activeProjectTile = null;

    this._backgroundController.setTweening(true);

    this._timeouts.interaction = setTimeout(function () {
      _this._backgroundController.startParallaxEaseIn();

      _this._setInteractionEnabled(true);

      _this._backgroundController.resize();

      _this._paging.show();
    }, 1000);
    this._timeouts.sizeFix = setTimeout(function () {
      _this.resize();
    }, 1200); //Restart the WebGL

    this._pixiController.unpause();
  };
  /** Show homepage guid */


  WorkController.prototype._showPagingGuide = function () {
    this._pagingGuideActive = true;

    this._paging.startGuideEffect();
  }; //Hide methods 
  //-------------------------------------------------------------------------------
  //** Hide to move to info section. Means hiding pixi and Home HTML elements */


  WorkController.prototype._hideForInfo = function () {
    var _this = this;

    this._tweens.container = gsap.TweenMax.to([this.container, document.querySelector('canvas')], 0.5, {
      autoAlpha: 0,
      delay: 0.5,
      onComplete: function onComplete() {
        _this._$workContainer.visible = false;
      }
    });
  }; //** Hide to move to info section. Means hiding pixi and Home HTML elements */


  WorkController.prototype._hideForHome = function () {
    var _this = this;

    this._active = false;

    this._tileBreakpoints.setActive(false);

    this._canShowBack = false;

    this._checkBackToHomeVisible();

    this._backgroundController.animateToHome(this._department); //Reset intro positon for TweenMax then animate off the screen: 


    gsap.TweenMax.set(this._$intro, {
      x: this._introX
    });
    this._tweens.home = gsap.TweenMax.to(this._$intro, 1.0, {
      y: window.innerHeight,
      ease: gsap.Power3.easeIn,
      onComplete: function onComplete() {
        _this.DOM.removeClass(_this.container, '-active');

        _this._$workContainer.visible = false;
      }
    }); //Animate paging down: 

    this._tweens.paging = gsap.TweenMax.to(this._paging.$container, 0.5, {
      y: 200,
      ease: gsap.Power3.easeIn
    });
  }; //-------------------------------------------------------------------------------

  /** Set interactoon to on/off */


  WorkController.prototype._setInteractionEnabled = function (enabled) {
    this._active = enabled;

    this._tileBreakpoints.setActive(enabled);

    this._mouseController.setDragCursorActive(enabled);
  };

  WorkController.prototype._gotoProject = function (index) {
    var _this = this;

    this._tileBreakpoints.setIndex(index);

    this._setProjectIndex(index);

    this._focusIndexChanged(index);

    this._disablePagingAutoUpdate = true;
    clearInterval(this._timeouts.disablePaging);
    this._timeouts.disablePaging = setTimeout(function () {
      _this._disablePagingAutoUpdate = false;
    }, 1000);
  };

  WorkController.prototype._setProjectIndex = function (index) {
    this._activeProjectTile = this._tiles[index];

    this._paging.setActiveIndex(index);
  }; //Explore project has been click 
  //---------------------------------------------------------------


  WorkController.prototype._onExploreProjectClick = function (e) {
    e.preventDefault();
    e.stopPropagation();
    this.DOM.addClass(e.target, '-clicked');
    var slug = this.DOM.getAttribute(e.target, 'data-slug');
    var title = this.DOM.getAttribute(e.target, 'data-title');
    var href = this.DOM.getAttribute(e.target, 'href');
    var index = parseInt(this.DOM.getAttribute(e.target, 'data-index'), 10) + 1;
    GA_1.GA.event('UX', 'Work > Explore Project Button', slug);

    this._projectSelected(slug, index, href, title);

    return false;
  };
  /** Back to home button click */


  WorkController.prototype._onBackToHomeClick = function (e) {
    e.preventDefault(); //Trigger event to switch to home controller view 

    var newState = {
      section: Enums_1.SectionType.HOME,
      title: 'Home',
      href: "/"
    };
    Events_1.Events.dispatch(AppEvents_1.AppEvents.CHANGE_SECTION, newState);
    GA_1.GA.event('UX', 'Work > Back to home button', this._state.subsection);
    return false;
  }; //Let the main controller know which is selected and that handles letting all controllers know what is going on 


  WorkController.prototype._projectSelected = function (slug, index, href, title) {
    var _this = this; //------------------------------------------


    this._paging.hide();

    this._activeProjectTile = this._tiles[index];

    this._activeProjectTile.animateToProject();

    this._tileBreakpoints.setActive(false);

    this._hideAllProjects(index); //Pause the WebGL view because it causes major conflict with fullscreen video playing: 


    this._timeouts.pauseWebGL = setTimeout(function () {
      return _this._pixiController.pause();
    }, 1000);

    this._backgroundController.setTweening(true); //Trigger event to switch to 'work' controller for department: 


    var newState = {
      section: Enums_1.SectionType.PROJECT,
      subsection: this._department,
      projectSlug: slug,
      title: title,
      href: "" + href
    };
    Events_1.Events.dispatch(AppEvents_1.AppEvents.CHANGE_SECTION, newState, {
      delay: 0.9
    });
  };
  /** Hide all projects (APart from spacer tile and actiive index) */


  WorkController.prototype._hideAllProjects = function (skipIndex) {
    if (skipIndex === void 0) {
      skipIndex = -1;
    }

    this._tiles.forEach(function (tile, index) {
      if (index !== 0 && index !== skipIndex) {
        tile.hideForProject();
      }
    });
  };

  WorkController.prototype._resetAllProjects = function (skipIndex) {
    if (skipIndex === void 0) {
      skipIndex = -1;
    }

    this._tiles.forEach(function (tile, index) {
      if (index !== 0 && index !== skipIndex) {
        tile.resetForProject();
      }
    });
  };
  /** Check Paging is passed */


  WorkController.prototype._checkPagingGuidePassed = function () {
    if (!this._pagingGuideActive) {
      return;
    }

    if (this._tileProgress > 0) {
      this._pagingGuideActive = false;

      this._paging.removeGuideEffect();
    }
  };
  /** Set auto paging. Don't check every frame as not animation critical */


  WorkController.prototype._setAutoPaging = function () {
    if (this._pagingGuideActive) {
      return;
    }

    this._autoPagingCounter--;

    if (!this._disablePagingAutoUpdate && this._autoPagingCounter <= 0) {
      var oldIndex = this._paging.getActiveIndex();

      var newIndex = this._paging.checkIndexFromRatio(this._tileProgress % 1);

      this._autoPagingCounter = 30;

      if (oldIndex !== newIndex) {
        this._focusIndexChanged(newIndex);

        GA_1.GA.event('Progress', "Work > " + this._state.subsection + " > project displayed", "index " + newIndex);
      }
    }
  };
  /** Focused index has changed. */


  WorkController.prototype._focusIndexChanged = function (index) {
    //The user is over a project in the line, so que the video (or image) for preloading
    //If project HTML section has not been injected, it will at this point
    this._focusedIndex = index;
    Events_1.Events.dispatch(new QueProjectEvent_1.QueProjectEvent({
      slug: this._paging.getActiveSlug(this._focusedIndex),
      index: index
    }));
  };
  /** Check if the backToHome button should be shown */


  WorkController.prototype._checkBackToHomeVisible = function () {
    if (!this._$backButton) {
      return;
    }

    if (!this._backToHomeIsVisible && this._shouldBackShow()) {
      this._backToHomeIsVisible = true;
      this.DOM.addClass(this._$backButton, '-show');
    } else if (this._backToHomeIsVisible && !this._shouldBackShow()) {
      this._backToHomeIsVisible = false;
      this.DOM.removeClass(this._$backButton, '-show');
    }
  };
  /** Logic for working out if back buttons meets conditions be shown */


  WorkController.prototype._shouldBackShow = function () {
    if (this._canShowBack && this._homeViewReady && this._tileProgress <= this._tileRatioShare * 0.12 && (this._tileProgress < 0.0001 || this._velocity <= 0)) {
      return true;
    }

    return false;
  };
  /** Update each tile progress based on the */


  WorkController.prototype._updateTileProgress = function () {
    //Progress could be <0.0 or >1.0 so get the decimal part: 
    this._actualProgress = this._tileProgress % 1;
    this._reduce = this._actualProgress / this._tileRatioShare * this.INNER_TILE_STEP; //Each tile is active bewteen its share of the ratio:  

    for (var i = 0; i < this._tiles.length; i++) {
      //progress = 0.1 
      //item1 progress = 0.5 
      //item 2 progress = 1.0 
      //item 5 progress = 0.0
      //ratio = 0.3 then item 2 has progress = 0.5 and item 1 has progress = 0
      this._step = (i + 1) * this.INNER_TILE_STEP;
      this._finalStep = this._step - this._reduce;

      this._tiles[i].setTimelineProgress(this._finalStep, false);
    }
  };
  /** Decide if the intro should be shown or hidden */


  WorkController.prototype._setIntroVisibleState = function () {
    if (!this._introShowing && this._tileProgress <= this._introActiveRange) {
      this._$intro.style.visibility = 'visible';
      this._introShowing = true;
    } else if (this._introShowing && this._tileProgress > this._introActiveRange) {
      this._$intro.style.visibility = 'hidden';
      this._introShowing = false;
    }
  };
  /** Update the animation of the intro */


  WorkController.prototype._updateIntroProgress = function () {
    if (!this._introShowing) {
      return;
    }

    if (this._$intro) {
      this._introX = -1 * (this._innerWidth * (this._tileProgress / this._introActiveRange));
      this._$intro.style.transform = "translateX(" + this._introX + "px)";
      this._$intro.style.opacity = "" + (1 - 1 * (this._tileProgress / this._introActiveRange));
    }
  };
  /** Move the main background along the */


  WorkController.prototype._updateBGAnimation = function () {
    if (!this._active) {
      return;
    } //Allow for the intro in the calulations 
    //Intro takes up tile slide share of the movement 


    this._actualProgress = this._tileProgress % 1;

    this._backgroundController.setXProgress(this._actualProgress);
  };
  /** Process velocity speed */


  WorkController.prototype._effectVelocity = function (frameMoveRatio) {
    this._velocity += frameMoveRatio * this._json.velocityFactor;
  };
  /** Tick function to effect velcoity and rotation */


  WorkController.prototype._processVelocity = function () {
    var _this = this;

    this._velocity *= this._json.velocityFriction;
    this._velocityRotation = this.math.constrain(this._velocity * this._json.rotationFactor, this._json.maxRotation * -1, this._json.maxRotation);
    this._velocityRotation *= -1;
    this._rotationRadians = this._velocityRotation * Math.PI / 180;

    this._tiles.forEach(function (tile) {
      return tile.setVelocityRotation(_this._rotationRadians);
    });
  }; //Get active project by slug string 


  WorkController.prototype._getProjectTileBySlug = function (slug) {
    return this._tiles[0];
  }; //Scrollwheel / mouse press 
  //------------------------------------------------------------------------------------


  WorkController.prototype._onMouseWheel = function (event) {
    if (!this._active || this._disablePagingAutoUpdate) {
      return;
    }

    this._gotoProject(this.math.constrain(this._paging.getActiveIndex() + -1 * event.delta, 0, this._tiles.length - 1));
  };

  WorkController.prototype._onKeyPress = function (event) {
    if (!this._active) {
      return;
    }

    var direction = event.keyType === Enums_1.DirectionalKeyType.LEFT || event.keyType === Enums_1.DirectionalKeyType.PAGE_UP ? -1 : 1;

    this._gotoProject(this.math.constrain(this._paging.getActiveIndex() + direction, 0, this._tiles.length - 1));
  };
  /** View ready event */


  WorkController.prototype._onViewReady = function (event) {
    if (event.view === Enums_1.ViewType.HOME) {
      this._homeViewReady = true;
    }
  }; //UTIL (GENERICS): 
  //-------------------------------------------------------------------------------------


  WorkController.prototype._orderByArray = function (values, orderType) {
    values.sort(function (a, b) {
      return a[orderType] - b[orderType];
    });
    return values;
  };

  WorkController.prototype._orderByConfigValue = function (values, orderType) {
    values.sort(function (a, b) {
      return a['config'][orderType] - b['config'][orderType];
    });
    return values;
  };

  return WorkController;
}(Controller_1.Controller);

exports.WorkController = WorkController;

/***/ }),

/***/ "./src/app/controller/home/HomeTimelineMain.ts":
/*!*****************************************************!*\
  !*** ./src/app/controller/home/HomeTimelineMain.ts ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Controller_1 = __webpack_require__(/*! debugbase/abstract/Controller */ "./src/debugbase/abstract/Controller.ts"); //import { TimelineMax, TweenMax, Power0, Power3, Back } from 'gsap';
//import { LogoMorphTimeline } from 'app/module/home/LogoMorphTimeline';


var TimelineItem_1 = __webpack_require__(/*! app/module/home/TimelineItem */ "./src/app/module/home/TimelineItem.ts");

var MaskedText_1 = __webpack_require__(/*! app/module/home/MaskedText */ "./src/app/module/home/MaskedText.ts");

var ParticleField_1 = __webpack_require__(/*! app/module/home/ParticleField */ "./src/app/module/home/ParticleField.ts");

var RelativeChildren_1 = __webpack_require__(/*! app/module/home/RelativeChildren */ "./src/app/module/home/RelativeChildren.ts");

var TimelineRegionManager_1 = __webpack_require__(/*! app/module/home/TimelineRegionManager */ "./src/app/module/home/TimelineRegionManager.ts");

var Debugbase_1 = __webpack_require__(/*! debugbase/Debugbase */ "./src/debugbase/Debugbase.ts");

var Enums_1 = __webpack_require__(/*! app/data/Enums */ "./src/app/data/Enums.ts");

var TextScramble_1 = __webpack_require__(/*! app/module/home/homeUtil/TextScramble */ "./src/app/module/home/homeUtil/TextScramble.ts");

var TimelineStateType;

(function (TimelineStateType) {
  TimelineStateType[TimelineStateType["INTRO"] = 0] = "INTRO";
  TimelineStateType[TimelineStateType["HOME_LOGO_OVER"] = 1] = "HOME_LOGO_OVER";
  TimelineStateType[TimelineStateType["HOME_LOGO_OUT"] = 2] = "HOME_LOGO_OUT";
  TimelineStateType[TimelineStateType["SCREENS_TRANSITION"] = 3] = "SCREENS_TRANSITION";
  TimelineStateType[TimelineStateType["SCREENS"] = 4] = "SCREENS";
  TimelineStateType[TimelineStateType["SPACES_TRANSITION"] = 5] = "SPACES_TRANSITION";
  TimelineStateType[TimelineStateType["SPACES"] = 6] = "SPACES";
  TimelineStateType[TimelineStateType["HOME"] = 7] = "HOME";
})(TimelineStateType = exports.TimelineStateType || (exports.TimelineStateType = {}));

var HomeTimelineMain =
/** @class */
function (_super) {
  __extends(HomeTimelineMain, _super);

  function HomeTimelineMain(mouseController, config) {
    var _this = _super.call(this, 'HomeTimelineMain') || this;

    _this.activeLogoRange = 0.5;
    _this._active = true;
    _this._created = false;
    _this._animatingToWork = false; //private _logoTimeline: LogoMorphTimeline;

    _this._progress = 0.5;
    _this._velocity = 0;
    _this._items = [];
    _this._particles = [];
    _this._cssElements = [];
    _this._timeouts = {};
    _this._tweens = {};
    _this._intervals = {};
    _this._state = TimelineStateType.INTRO;
    _this._screensButtonTextShowing = false;
    _this._spacesButtonTextShowing = false;
    _this._timelineRegionManager = new TimelineRegionManager_1.TimelineRegionManager();
    _this._mouseController = mouseController;
    _this._dom = Debugbase_1.Debugbase.DOM;
    _this._config = config;
    return _this;
  }

  Object.defineProperty(HomeTimelineMain.prototype, "containerX", {
    get: function get() {
      return this._containerX;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(HomeTimelineMain.prototype, "progress", {
    get: function get() {
      return this._progress;
    },
    enumerable: true,
    configurable: true
  });

  HomeTimelineMain.prototype.create = function () {};
  /** Home particle textures are ready so */


  HomeTimelineMain.prototype.createParticlesPixi = function ($homeContainer, spritesheet) {
    this.resize();

    this._setContainerX();

    this._$homeContainer = $homeContainer;

    this._createItems($homeContainer, spritesheet);

    this._created = true;
  };
  /** Set if the timeline is active or not */


  HomeTimelineMain.prototype.setActive = function (active) {
    this._active = active;
  };
  /** Update the progress based on the users X drag */


  HomeTimelineMain.prototype.setProgress = function (ratio, overrideActiveFlag) {
    if (overrideActiveFlag === void 0) {
      overrideActiveFlag = false;
    }

    if (!this._created) {
      return;
    }

    if (!overrideActiveFlag && !this._active) {
      return;
    }

    this._progress = ratio;

    this._setContainerX();
  };
  /** Set the CORE UI refs for elements overlaid over the home screen: */


  HomeTimelineMain.prototype.setUIRefs = function ($intro, $screens, $spaces, $dragToExplore) {
    var _this = this;

    this._domRefs = {
      screens: $screens,
      spaces: $spaces
    };
    this._cssElements = [{
      id: 'intro',
      $target: $intro,
      showing: true,
      min: 0.42,
      max: 0.58,
      syncX: false,
      relativeX: 0.5,
      anchorX: 0.5,
      width: $intro.clientWidth,
      parallaxPower: 0.4
    }, {
      id: 'dragToExplore',
      $target: $dragToExplore,
      showing: true,
      min: 0.47,
      max: 0.53,
      once: false,
      hideCallback: function hideCallback() {
        _this.get('Home').stopPagingGuide();
      }
    }, {
      id: Enums_1.DepartmentType.SCREENS,
      $target: $screens,
      showing: false,
      min: -1,
      max: 0.1,
      syncX: true,
      relativeX: 0.02,
      anchorX: 0,
      width: 0,
      parallaxPower: 0.4
    }, {
      id: Enums_1.DepartmentType.SPACES,
      $target: $spaces,
      showing: false,
      min: 0.9,
      max: 2,
      syncX: true,
      relativeX: 0.985,
      anchorX: 1,
      width: $spaces.clientWidth,
      parallaxPower: 0.4
    }];
    this._screensButtonLabel = document.querySelector('.home__explore__area.-screens .home__explore__area__label');
    console.log('this._screensButtonLabel', this._screensButtonLabel);
    this._spacesButtonLabel = document.querySelector('.home__explore__area.-spaces .home__explore__area__label');
    this._screensTextScrable = new TextScramble_1.TextScramble(this._screensButtonLabel, 15);
    this._spacesTextScrable = new TextScramble_1.TextScramble(this._spacesButtonLabel, 15);
  };
  /** Set virtual width */


  HomeTimelineMain.prototype.setVirtualWidth = function (width) {
    this._virtualWidth = width;
    this.resize();
  };
  /** Resize event */


  HomeTimelineMain.prototype.resize = function () {
    var _this = this;

    this._innerHeight = window.innerHeight;
    this._innerWidth = window.innerWidth;
    this._virtualHeight = window.innerHeight; //Set the scale of the 

    var scale = this._virtualWidth / (1920 * 3);

    if (scale > 1.0) {
      scale = 1.0;
    } //Loop through the items and pass the new values: 


    this._items.forEach(function (item) {
      item.resize(_this._virtualWidth, _this._virtualHeight, scale, _this._innerWidth);
    }); //Reset the width of the tracked elements


    this._cssElements.forEach(function (css) {
      if (css.$target.clientWidth) {
        css.width = css.$target.clientWidth;
      }
    });
  };

  HomeTimelineMain.prototype.tick = function (mousecords, mouseIsDown, velocity, instant, skipCheck) {
    var _this = this;

    if (mousecords === void 0) {
      mousecords = null;
    }

    if (mouseIsDown === void 0) {
      mouseIsDown = null;
    }

    if (velocity === void 0) {
      velocity = null;
    }

    if (instant === void 0) {
      instant = false;
    }

    if (skipCheck === void 0) {
      skipCheck = false;
    }

    if (!skipCheck && this._animatingToWork) {
      return;
    }

    this._velocity = velocity;
    var ratioYPos = mousecords.y / this._innerHeight - 0.5;
    var ratioXPos = mousecords.x / this._innerWidth - 0.5;
    var velocityRatio = this._velocity / 10;

    this._timelineRegionManager.tick(mousecords, this._containerX, this._virtualWidth, this._virtualHeight, this._progress, this._velocity);

    this._items.forEach(function (item) {
      item.tick(_this._progress, _this._containerX, ratioYPos, ratioXPos, mouseIsDown, velocityRatio, instant, mousecords);
    }); //Decide if UI style elements should be shown by setting their class to -show 


    this._setCSSClasses(instant); //Process the explore text scramble effect: 


    this._processExploreButtonHideShow();
  };

  HomeTimelineMain.prototype.animateToWork = function (department) {
    var _this = this; //Freeze normal behaviours:


    this._animatingToWork = true; //Loop through and animate to 
    //todo add a filter to determine what side is in

    var offY = this._getWorkOffY();

    this._items.forEach(function (item) {
      //if (item.department === department) {
      item.animateToWork(offY); //}
    }); //Animate off the UI:
    //Set x/y before as its being handle with style direct to stop TweenMax.set being called on every frame 


    var cssElement = this._getCSSElementById(department);

    var $ui = this._domRefs[department];
    gsap.TweenMax.set($ui, {
      x: cssElement.xRecord,
      y: 0
    });
    this._tweens.ui = gsap.TweenMax.to($ui, 0.8, {
      y: offY,
      ease: gsap.Power3.easeIn
    });
    this._timeouts.out = setTimeout(function () {
      return _this.onCompleteExit();
    }, 1500);
  };

  HomeTimelineMain.prototype.animateFromWork = function (department, delay) {
    var _this = this;

    if (delay === void 0) {
      delay = 1;
    }

    this._progress = department === Enums_1.DepartmentType.SCREENS ? 0 : 1; //Freeze normal behaviours:

    this._animatingToWork = true; //this._setCSSClasses(true);
    //Animate off the UI:

    var $ui = this._domRefs[department];
    setTimeout(function () {
      _this._items.forEach(function (item) {
        if (item.department === department) {
          item.animateFromWork(delay);
        }
      });

      _this._setCSSClasses(true);

      var cssElement = _this._getCSSElementById(department);

      gsap.TweenMax.set($ui, {
        x: cssElement.xRecord,
        y: _this._getWorkOffY()
      });
      _this._tweens.ui = gsap.TweenMax.to($ui, 0.8, {
        y: 0,
        x: cssElement.xRecord,
        ease: gsap.Power3.easeOut,
        delay: delay
      });
    }, 100);
  };
  /** Remove any animations */


  HomeTimelineMain.prototype.resetIntervalsAndAnimations = function () {
    var _this = this; //Loop through and kill any tweens: 


    Object.keys(this._tweens).forEach(function (key) {
      //If active section then it will just be a blank string (as HTML is on main page load an not needed)
      _this._tweens[key].kill();
    }); //Loop through the partciles: 

    this._items.forEach(function (item) {
      item.resetIntervalsAndAnimations();
    });
  };
  /** Reset for deeplink */


  HomeTimelineMain.prototype.resetForDeeplink = function () {
    this._animatingToWork = false; //Loop through home particles at reset: 

    this._items.forEach(function (item) {
      item.reset();
    }); //Reset the y position of the spaces / screens UI elements: 


    gsap.TweenMax.set([this._domRefs.screens, this._domRefs.spaces], {
      y: 0
    });
  };
  /** Reset when coming back from work */


  HomeTimelineMain.prototype.resetFromWork = function (department) {
    this._animatingToWork = false;

    var offY = this._getWorkOffY(); //Loop through home particles at reset 


    this._items.forEach(function (item) {
      //If active department then reset in place for the animation in
      //Otherwise just reset as standard tile 
      if (item.department === department) {
        item.resetFromWork(offY);
      } else {
        item.reset();
      }
    }); //Put the HTML ui element for the department off-screen: 


    var $ui = this._domRefs[department];
    gsap.TweenMax.set($ui, {
      y: offY
    });
  };
  /** Show for deeplink (fullscreen preloader) */


  HomeTimelineMain.prototype.showForDeeplink = function () {//ANIMATE IN MAIN ITEMS AS REQUIRD HERE: 
  };

  HomeTimelineMain.prototype.resetAnimationFreeze = function () {
    this._animatingToWork = false;
  };

  HomeTimelineMain.prototype.homeIntroHover = function () {
    window.introActive = true;

    this._setParticleState('HomeParticles', TimelineStateType.HOME_LOGO_OVER);
  };

  HomeTimelineMain.prototype.setButtonHover = function (center) {
    window.buttonActive = true;

    this._setParticleState('HomeParticles', TimelineStateType.HOME_LOGO_OVER);

    this._setParticleRepellCenter('HomeParticles', center);
  };

  HomeTimelineMain.prototype.setButtonOut = function (type) {
    window.buttonActive = false;
    var stateType = type === Enums_1.DepartmentType.SCREENS ? TimelineStateType.SCREENS : TimelineStateType.SPACES;

    this._setParticleState('HomeParticles', stateType);
  };

  HomeTimelineMain.prototype.homeIntroMouseOut = function () {
    if (window.introComplete) {
      return;
    }

    this._setParticleState('HomeParticles', TimelineStateType.INTRO);
  }; //Private 
  //-----------------------------------------------------------------------------------------------
  //-----------------------------------------------------------------------------------------------
  //-----------------------------------------------------------------------------------------------
  //-----------------------------------------------------------------------------------------------
  //Create the larger items used in the home structure like logos, swirls, etc


  HomeTimelineMain.prototype._createItems = function ($homeContainer, spritesheet) {
    var _this = this; //Loop through and create all particles: 


    this._config.particles.forEach(function (particleData) {
      if (!particleData.disable) {
        _this._createParticle($homeContainer, spritesheet, particleData);
      }
    }); //Loop through and create all particles: 


    this._config.regions.forEach(function (region) {
      _this._createTimelineRegion(region);
    });

    this._setContainerX();

    this.resize();
  };
  /** Create single partcile */


  HomeTimelineMain.prototype._createParticle = function ($homeContainer, spritesheet, particleData) {
    var item;

    if (particleData.type === Enums_1.HomeParticleType.MASKED_TEXT) {
      //Maked text setup
      item = new MaskedText_1.MaskedText();
      item = this._configParticle(item, particleData);
      item.create(particleData, {
        container: $homeContainer,
        maskTexture: spritesheet.textures[particleData.maskTexture],
        backgroundTexture: spritesheet.textures[particleData.backgroundTexture]
      });
    } else if (particleData.type === Enums_1.HomeParticleType.RELATIVE_CHILDREN) {
      //Maked text setup
      console.log('SETUP relative-children');
      item = new RelativeChildren_1.RelativeChildren();
      item = this._configParticle(item, particleData);
      item.create(particleData, {
        container: $homeContainer,
        textures: spritesheet.textures
      });
    } else if (particleData.type === Enums_1.HomeParticleType.FIELD) {
      //Particle fields: 
      //Create a group of textures from the strings 
      var textures_1 = [];
      particleData.textures.forEach(function (textureString) {
        textures_1.push(spritesheet.textures[textureString]);
      }); //Maked text setup

      item = new ParticleField_1.ParticleField();
      item = this._configParticle(item, particleData);
      item.create(particleData, {
        container: $homeContainer,
        textures: textures_1,
        particleCount: particleData.particleCount
      });
    } else {
      //A normal pixi sprite that will be animated along the timeline
      item = new TimelineItem_1.TimelineItem();
      item = this._configParticle(item, particleData);
      item.create(particleData, {
        container: $homeContainer,
        texture: spritesheet.textures[particleData.texture]
      });
    } //Push in the item 


    this._items.push(item);
  };
  /** Config common particle settings */


  HomeTimelineMain.prototype._configParticle = function (item, config) {
    item.relativeX = config.relativeX;
    item.relativeY = config.relativeY;
    item.easePower = config.easePower;
    item.parallaxOffsetPower = config.parallaxOffsetPower;
    item.parallaxPowerMouse = config.parallaxPowerMouse;

    if (config.alpha) {
      item.alpha = config.alpha;
    }

    if (config.tint) {
      item.tint = config.tint;
    }

    return item;
  };
  /** Set the container x Postion */


  HomeTimelineMain.prototype._setContainerX = function () {
    this._containerX = -1 * (this._progress * (this._virtualWidth - this._innerWidth));
  }; //Turn off on CSS classes based on their 
  //Used to hide show the intro para and the screens / spaces UI 


  HomeTimelineMain.prototype._setCSSClasses = function (instant) {
    var _this = this;

    if (instant === void 0) {
      instant = false;
    }

    this._cssElements.forEach(function (element) {
      if (element.syncX) {
        //element.$target.style.transform = this._getCSSXtransform(element, instant);
        //gsap.TweenMax.set(element.$target, {x: this._getCSSY(element, instant)} );
        element.xRecord = _this._getCSSX(element, instant);
        element.$target.style.transform = "translate3d(" + element.xRecord + "px, 0px, 0)";
      }

      if (!element.showing && !element.once && _this._progress > element.min && _this._progress < element.max && _this._velocity < 0.01) {
        _this._dom.addClass(element.$target, '-show');

        element.showing = true;

        if (element.id === 'dragToExplore') {
          //gsap.TweenMax.to('#home-paging .ui__paging__item', 0.4, {autoAlpha: 0, ease: gsap.Power0.easeNone} );
          setTimeout(function () {
            return _this._pagingTextScrable.setText('Drag to explore');
          }, 10);
        }
      } else if (element.showing && (_this._progress < element.min || _this._progress > element.max)) {
        _this._dom.removeClass(element.$target, '-show');

        element.showing = false;

        if (element.hideCallback) {
          element.hideCallback(element);
        }
      }
    });
  };

  HomeTimelineMain.prototype._getCSSX = function (element, instant) {
    if (instant === void 0) {
      instant = false;
    }

    return this._virtualWidth * element.relativeX + this._containerX - element.anchorX * element.$target.clientWidth + this._calculateParallaxDragOffsetX(element.relativeX, element.parallaxPower, instant);
  }; //Calculate the parallax offset caused by draging left <> right: 


  HomeTimelineMain.prototype._calculateParallaxDragOffsetX = function (relativeX, parallaxPower, instant) {
    if (instant === void 0) {
      instant = false;
    } //Correct thing to allow for the fact the start/photoshop point of the timeline is center/0.5/home 


    this._relativeParallaxX = relativeX - 0.5; //Translate this into the current progress 

    this._relativeParallaxXToProgressRatio = this._relativeParallaxX - (this._progress - 0.5); //Set the offset as percentage of the container width (half the width because of the 0.5 logic). 
    //let easePower: number = (instant) ? 1 : 2;

    return this._relativeParallaxXToProgressRatio * parallaxPower * (this._virtualWidth / 2);
  };
  /** Get work off Y for when animating items off screen to work */


  HomeTimelineMain.prototype._getWorkOffY = function () {
    return -1 * this._innerHeight + 100;
  };
  /** Get the CSS element from an ID string */


  HomeTimelineMain.prototype._getCSSElementById = function (id) {
    var element = null;

    this._cssElements.forEach(function (item) {
      if (item.id === id) {
        element = item;
      }
    });

    return element;
  };
  /** Timeline region effects */


  HomeTimelineMain.prototype._createTimelineRegion = function (params) {
    var _this = this;

    params.pixiContainer = this._$homeContainer;

    params.onEnter = function (id) {
      return _this._onTimeRegionEnter(id);
    };

    params.onExit = function (id) {
      return _this._onTimeRegionExit(id);
    };

    this._timelineRegionManager.add(params);
  };

  HomeTimelineMain.prototype.introComplete = function () {
    var _this = this;

    this._state = TimelineStateType.HOME;

    this._setParticleState('HomeParticles', TimelineStateType.HOME_LOGO_OVER);

    this._getParticles('intro')[0].fadeIn(0.8);

    var logoItems = this._getParticles('homeLogoLetter');

    logoItems.forEach(function (item) {
      return item.fadeIn(0.5);
    });
    gsap.TweenMax.to('#home-paging', 0.4, {
      autoAlpha: 1,
      ease: gsap.Power0.easeNone,
      delay: 2
    }); //Scramble in drag to explore: 
    //TODO move to paging class: 

    var pagingCopy = document.querySelector('#home-paging .ui__paging__title'); //this.DOM.setText(pagingCopy, '');

    this._pagingTextScrable = new TextScramble_1.TextScramble(pagingCopy, 15);
    setTimeout(function () {
      return _this._pagingTextScrable.setText('Drag to explore');
    }, 2500);
  };

  HomeTimelineMain.prototype._onTimeRegionEnter = function (id) {
    if (this._state === TimelineStateType.INTRO) {
      return;
    }

    if (id === 'HomeLogoArea' && this._state === TimelineStateType.HOME) {
      this._mouseController.setHiddenState(true);

      this._setParticleState('HomeParticles', TimelineStateType.HOME_LOGO_OVER);
    }

    if (id === 'Screens') {
      this._setParticleState('HomeParticles', TimelineStateType.SCREENS);

      this.get('Home').setPagingIndex(0);
      this._state = TimelineStateType.SCREENS;

      this._mouseController.setHiddenState(false);
    } //if (id === 'SpacesTransition') {
    //	this._setParticleState('HomeParticles', TimelineStateType.SPACES);
    //	this._mouseController.setHiddenState(false);
    //}


    if (id === 'Spaces') {
      this._setParticleState('HomeParticles', TimelineStateType.SPACES);

      this.get('Home').setPagingIndex(2);
      this._state = TimelineStateType.SPACES;

      this._mouseController.setHiddenState(false);
    }

    if (id === 'Home') {
      this._setParticleState('HomeParticles', TimelineStateType.HOME_LOGO_OUT);

      this.get('Home').setPagingIndex(1);
      this._state = TimelineStateType.HOME;

      this._mouseController.setHiddenState(false);
    }
  };

  HomeTimelineMain.prototype._onTimeRegionExit = function (id) {
    if (this._state === TimelineStateType.INTRO) {
      return;
    }

    if (id === 'HomeLogoArea' && this._state === TimelineStateType.HOME) {
      this._mouseController.setHiddenState(false);

      this._setParticleState('HomeParticles', TimelineStateType.HOME_LOGO_OUT);
    }
  };

  HomeTimelineMain.prototype._getParticles = function (id) {
    var particles = [];

    this._items.forEach(function (timelineItem) {
      if (timelineItem.id === id) {
        if (timelineItem.type === TimelineItem_1.TimelineItemType.PARTICLE_FIELD || timelineItem.type === TimelineItem_1.TimelineItemType.RELATIVE_CHILDREN) {
          var particlesItems = timelineItem.getItems();

          for (var i = 0; i < particlesItems.length; i++) {
            particles.push(particlesItems[i]);
          }
        }

        if (timelineItem.type === TimelineItem_1.TimelineItemType.PARTICLE) {
          particles.push(timelineItem);
        }
      }
    });

    return particles;
  };

  HomeTimelineMain.prototype._setParticleState = function (particlesId, timelineState) {
    this._getParticles(particlesId).forEach(function (particle) {
      particle.setTimelineState(timelineState);
    });
  };

  HomeTimelineMain.prototype._setParticleRepellCenter = function (particlesId, center) {
    this._getParticles(particlesId).forEach(function (particle) {
      particle.setParticleRepellCenter(center);
    });
  };

  HomeTimelineMain.prototype._onIntroMouseDown = function () {};

  HomeTimelineMain.prototype._processExploreButtonHideShow = function () {
    if (!this._screensButtonTextShowing && this._progress < 0.02) {
      this._screensButtonTextShowing = true;

      this._screensTextScrable.setText('Explore');
    } else if (this._screensButtonTextShowing && this._progress >= 0.02) {
      this._screensButtonTextShowing = false; //this.DOM.setText(this._screensButtonLabel, '');

      this._screensTextScrable.setText('');
    }

    if (!this._spacesButtonTextShowing && this._progress > 0.98) {
      this._spacesButtonTextShowing = true;

      this._spacesTextScrable.setText('Explore');
    } else if (this._spacesButtonTextShowing && this._progress <= 0.98) {
      this._spacesButtonTextShowing = false; //this.DOM.setText(this._spacesButtonLabel, '');

      this._spacesTextScrable.setText('');
    }
  };

  return HomeTimelineMain;
}(Controller_1.Controller);

exports.HomeTimelineMain = HomeTimelineMain;

/***/ }),

/***/ "./src/app/data/AppEvents.ts":
/*!***********************************!*\
  !*** ./src/app/data/AppEvents.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var AppEvents =
/** @class */
function () {
  function AppEvents() {} //Loading


  AppEvents.PIXI_RESOURCE_LOADED = 'PIXI_RESOURCE_LOADED';
  AppEvents.AJAX_HTML_LOADED = 'AJAX_HTML_LOADED';
  AppEvents.INTIAL_PRELOAD_COMPLETE = 'INTIAL_PRELOAD_COMPLETE';
  AppEvents.DEEP_LINK_LOADER_COMPLETE = 'DEEP_LINK_LOADER_COMPLETE';
  AppEvents.VIEW_SETUP = 'VIEW_SETUP'; //Section chanegs / site naviagtion 

  AppEvents.CHANGE_SECTION = 'CHANGE_SECTION';
  AppEvents.SET_INTIAL_STATE = 'SET_INTIAL_STATE';
  AppEvents.POP_HISTORY_STATE = 'POP_HISTORY_STATE'; //Legacy, siwtch all to use change section...

  AppEvents.WORK_DEPARMENT_SELECTED = 'WORK_DEPARMENT_SELECTED';
  AppEvents.PROJECT_SELECTED = 'PROJECT_SELECTED';
  AppEvents.CLOSE_PROJECT = 'CLOSE_PROJECT';
  AppEvents.DEBUG_LOGO_PRESS = 'DEBUG_LOGO_PRESS';
  AppEvents.SCROLL_WHEEL_NO_TARGET = 'SCROLL_WHEEL_NO_TARGET';
  AppEvents.ACTIVE_DEPARTMENT_NAV_MENU_PRESS = 'ACTIVE_DEPARTMENT_NAV_MENU_PRESS';
  AppEvents.MENU_STATE_CHANGE = 'MENU_STATE_CHANGE';
  AppEvents.RESET_NAV_MENU = 'RESET_NAV_MENU';
  return AppEvents;
}();

exports.AppEvents = AppEvents;

/***/ }),

/***/ "./src/app/data/Enums.ts":
/*!*******************************!*\
  !*** ./src/app/data/Enums.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var SectionType;

(function (SectionType) {
  SectionType["HOME"] = "home";
  SectionType["WORK"] = "work";
  SectionType["PROJECT"] = "project";
  SectionType["INFO"] = "info";
})(SectionType = exports.SectionType || (exports.SectionType = {}));

var InfoSectionType;

(function (InfoSectionType) {
  InfoSectionType["ABOUT"] = "about";
  InfoSectionType["STUDIO"] = "studio";
  InfoSectionType["CONTACT"] = "contact";
  InfoSectionType["JOBS"] = "jobs";
})(InfoSectionType = exports.InfoSectionType || (exports.InfoSectionType = {}));

var DepartmentType;

(function (DepartmentType) {
  DepartmentType["SCREENS"] = "screens";
  DepartmentType["SPACES"] = "spaces";
})(DepartmentType = exports.DepartmentType || (exports.DepartmentType = {}));

var BackgroundSetType;

(function (BackgroundSetType) {
  BackgroundSetType["HOME"] = "home";
  BackgroundSetType["SCREENS"] = "screens";
  BackgroundSetType["SPACES"] = "spaces";
})(BackgroundSetType = exports.BackgroundSetType || (exports.BackgroundSetType = {}));

var ViewType;

(function (ViewType) {
  ViewType["HOME"] = "home";
  ViewType["SCREENS"] = "screens";
  ViewType["SPACES"] = "spaces";
  ViewType["PROJECT"] = "project";
  ViewType["INFO"] = "info";
})(ViewType = exports.ViewType || (exports.ViewType = {}));

var DirectionalKeyType;

(function (DirectionalKeyType) {
  DirectionalKeyType["UP"] = "up";
  DirectionalKeyType["DOWN"] = "down";
  DirectionalKeyType["PAGE_UP"] = "pageup";
  DirectionalKeyType["PAGE_DOWN"] = "pagedown";
  DirectionalKeyType["LEFT"] = "left";
  DirectionalKeyType["RIGHT"] = "right";
})(DirectionalKeyType = exports.DirectionalKeyType || (exports.DirectionalKeyType = {}));

var MenuStateType;

(function (MenuStateType) {
  MenuStateType["OPEN"] = "open";
  MenuStateType["CLOSED"] = "closed";
})(MenuStateType = exports.MenuStateType || (exports.MenuStateType = {}));

var ProjectSlugType;

(function (ProjectSlugType) {
  ProjectSlugType["MARKET_MASTERS"] = "market-masters";
  ProjectSlugType["MARCH_FOR_GIANTS"] = "march-for-giants";
  ProjectSlugType["TOY_TOWN"] = "toy-town";
  ProjectSlugType["TOTAL_DARKNESS"] = "total-darkness";
})(ProjectSlugType = exports.ProjectSlugType || (exports.ProjectSlugType = {}));

var PixiResourceType;

(function (PixiResourceType) {
  PixiResourceType["BACKGROUNDS"] = "backgrounds";
  PixiResourceType["HOME_PARTCILES"] = "home-partciles";
  PixiResourceType["LOGO_MORPH"] = "logo-morph";
  PixiResourceType["WORK_PARTICLES"] = "work-particles-screens";
  PixiResourceType["WORK_BACKGROUNDS_SCREEN"] = "work-background-screens";
  PixiResourceType["WORK_BACKGROUNDS_SPACES"] = "work-background-spaces";
  PixiResourceType["MOTH"] = "moth";
})(PixiResourceType = exports.PixiResourceType || (exports.PixiResourceType = {}));

var HomeParticleType;

(function (HomeParticleType) {
  HomeParticleType["STANDARD"] = "standard";
  HomeParticleType["MASKED_TEXT"] = "masked-text";
  HomeParticleType["FIELD"] = "field";
  HomeParticleType["RELATIVE_CHILDREN"] = "relative-children";
})(HomeParticleType = exports.HomeParticleType || (exports.HomeParticleType = {}));

var UIThemeColourType;

(function (UIThemeColourType) {
  UIThemeColourType["LIGHT"] = "light";
  UIThemeColourType["DARK"] = "dark";
})(UIThemeColourType = exports.UIThemeColourType || (exports.UIThemeColourType = {}));

var ScrollerType;

(function (ScrollerType) {
  ScrollerType["STANDARD"] = "standard";
  ScrollerType["CUSTOM"] = "custom";
})(ScrollerType = exports.ScrollerType || (exports.ScrollerType = {}));

/***/ }),

/***/ "./src/app/event/AjaxHTMLLoadedEvent.ts":
/*!**********************************************!*\
  !*** ./src/app/event/AjaxHTMLLoadedEvent.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var DebugEvent_1 = __webpack_require__(/*! debugbase/abstract/DebugEvent */ "./src/debugbase/abstract/DebugEvent.ts");

var AjaxHTMLLoadedEvent =
/** @class */
function (_super) {
  __extends(AjaxHTMLLoadedEvent, _super);

  function AjaxHTMLLoadedEvent(parameters) {
    return _super.call(this, parameters) || this;
  }

  AjaxHTMLLoadedEvent.eventName = 'AJAX_HTML_LOADED_EVENT';
  return AjaxHTMLLoadedEvent;
}(DebugEvent_1.DebugEvent);

exports.AjaxHTMLLoadedEvent = AjaxHTMLLoadedEvent;

/***/ }),

/***/ "./src/app/event/CustomCursorEvent.ts":
/*!********************************************!*\
  !*** ./src/app/event/CustomCursorEvent.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var DebugEvent_1 = __webpack_require__(/*! debugbase/abstract/DebugEvent */ "./src/debugbase/abstract/DebugEvent.ts");

var CustomCursorEvent =
/** @class */
function (_super) {
  __extends(CustomCursorEvent, _super);

  function CustomCursorEvent(parameters) {
    return _super.call(this, parameters) || this;
  }

  CustomCursorEvent.eventName = 'CUSTOM_CURSOR_EVENT';
  return CustomCursorEvent;
}(DebugEvent_1.DebugEvent);

exports.CustomCursorEvent = CustomCursorEvent;

/***/ }),

/***/ "./src/app/event/DebugKeypressEvent.ts":
/*!*********************************************!*\
  !*** ./src/app/event/DebugKeypressEvent.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var DebugEvent_1 = __webpack_require__(/*! debugbase/abstract/DebugEvent */ "./src/debugbase/abstract/DebugEvent.ts");

var DebugKeypressEvent =
/** @class */
function (_super) {
  __extends(DebugKeypressEvent, _super);

  function DebugKeypressEvent(parameters) {
    return _super.call(this, parameters) || this;
  }

  DebugKeypressEvent.eventName = 'KEYPRESS_EVENT';
  return DebugKeypressEvent;
}(DebugEvent_1.DebugEvent);

exports.DebugKeypressEvent = DebugKeypressEvent;

/***/ }),

/***/ "./src/app/event/DebugMouseWheelEvent.ts":
/*!***********************************************!*\
  !*** ./src/app/event/DebugMouseWheelEvent.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var DebugEvent_1 = __webpack_require__(/*! debugbase/abstract/DebugEvent */ "./src/debugbase/abstract/DebugEvent.ts");

var DebugMouseWheelEvent =
/** @class */
function (_super) {
  __extends(DebugMouseWheelEvent, _super);

  function DebugMouseWheelEvent(parameters) {
    return _super.call(this, parameters) || this;
  }

  DebugMouseWheelEvent.eventName = 'MOUSE_WHEEL_EVENT';
  return DebugMouseWheelEvent;
}(DebugEvent_1.DebugEvent);

exports.DebugMouseWheelEvent = DebugMouseWheelEvent;

/***/ }),

/***/ "./src/app/event/HomeDepartmentReachedEvent.ts":
/*!*****************************************************!*\
  !*** ./src/app/event/HomeDepartmentReachedEvent.ts ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var DebugEvent_1 = __webpack_require__(/*! debugbase/abstract/DebugEvent */ "./src/debugbase/abstract/DebugEvent.ts");

var HomeDepartmentReachedEvent =
/** @class */
function (_super) {
  __extends(HomeDepartmentReachedEvent, _super);

  function HomeDepartmentReachedEvent(parameters) {
    return _super.call(this, parameters) || this;
  }

  HomeDepartmentReachedEvent.eventName = 'HOME_DEPARTMENT_REACHED';
  return HomeDepartmentReachedEvent;
}(DebugEvent_1.DebugEvent);

exports.HomeDepartmentReachedEvent = HomeDepartmentReachedEvent;

/***/ }),

/***/ "./src/app/event/JSONLoadEvent.ts":
/*!****************************************!*\
  !*** ./src/app/event/JSONLoadEvent.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var DebugEvent_1 = __webpack_require__(/*! debugbase/abstract/DebugEvent */ "./src/debugbase/abstract/DebugEvent.ts");

var JSONLoadEvent =
/** @class */
function (_super) {
  __extends(JSONLoadEvent, _super);

  function JSONLoadEvent(parameters) {
    return _super.call(this, parameters) || this;
  }

  JSONLoadEvent.eventName = 'JSON_LOAD_EVENT';
  return JSONLoadEvent;
}(DebugEvent_1.DebugEvent);

exports.JSONLoadEvent = JSONLoadEvent;

/***/ }),

/***/ "./src/app/event/PixiResourceLoadEvent.ts":
/*!************************************************!*\
  !*** ./src/app/event/PixiResourceLoadEvent.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var DebugEvent_1 = __webpack_require__(/*! debugbase/abstract/DebugEvent */ "./src/debugbase/abstract/DebugEvent.ts");

var PixiResourceLoadEvent =
/** @class */
function (_super) {
  __extends(PixiResourceLoadEvent, _super);

  function PixiResourceLoadEvent(parameters) {
    return _super.call(this, parameters) || this;
  }

  PixiResourceLoadEvent.eventName = 'PIXI_RESOURCE_READY_EVENT';
  return PixiResourceLoadEvent;
}(DebugEvent_1.DebugEvent);

exports.PixiResourceLoadEvent = PixiResourceLoadEvent;

/***/ }),

/***/ "./src/app/event/QueProjectEvent.ts":
/*!******************************************!*\
  !*** ./src/app/event/QueProjectEvent.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var DebugEvent_1 = __webpack_require__(/*! debugbase/abstract/DebugEvent */ "./src/debugbase/abstract/DebugEvent.ts");

var QueProjectEvent =
/** @class */
function (_super) {
  __extends(QueProjectEvent, _super);

  function QueProjectEvent(parameters) {
    return _super.call(this, parameters) || this;
  }

  QueProjectEvent.eventName = 'QUE_PROJECT_EVENT';
  return QueProjectEvent;
}(DebugEvent_1.DebugEvent);

exports.QueProjectEvent = QueProjectEvent;

/***/ }),

/***/ "./src/app/event/RegionViewportEvent.ts":
/*!**********************************************!*\
  !*** ./src/app/event/RegionViewportEvent.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var DebugEvent_1 = __webpack_require__(/*! debugbase/abstract/DebugEvent */ "./src/debugbase/abstract/DebugEvent.ts");

var RegionViewportEvent =
/** @class */
function (_super) {
  __extends(RegionViewportEvent, _super);

  function RegionViewportEvent(parameters) {
    return _super.call(this, parameters) || this;
  }

  RegionViewportEvent.eventName = 'REGION_VIEWPORT_EVENT';
  return RegionViewportEvent;
}(DebugEvent_1.DebugEvent);

exports.RegionViewportEvent = RegionViewportEvent;

/***/ }),

/***/ "./src/app/event/SidePagingClickEvent.ts":
/*!***********************************************!*\
  !*** ./src/app/event/SidePagingClickEvent.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var DebugEvent_1 = __webpack_require__(/*! debugbase/abstract/DebugEvent */ "./src/debugbase/abstract/DebugEvent.ts");

var SidePagingClickEvent =
/** @class */
function (_super) {
  __extends(SidePagingClickEvent, _super);

  function SidePagingClickEvent(parameters) {
    return _super.call(this, parameters) || this;
  }

  SidePagingClickEvent.eventName = 'SIDE_PAGING_CLICK_EVENT';
  return SidePagingClickEvent;
}(DebugEvent_1.DebugEvent);

exports.SidePagingClickEvent = SidePagingClickEvent;

/***/ }),

/***/ "./src/app/event/SidebarChangeEvent.ts":
/*!*********************************************!*\
  !*** ./src/app/event/SidebarChangeEvent.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var DebugEvent_1 = __webpack_require__(/*! debugbase/abstract/DebugEvent */ "./src/debugbase/abstract/DebugEvent.ts");

var SidebarChangeEvent =
/** @class */
function (_super) {
  __extends(SidebarChangeEvent, _super);

  function SidebarChangeEvent(parameters) {
    return _super.call(this, parameters) || this;
  }

  SidebarChangeEvent.eventName = 'SIDEBAR_CHANGE_EVENT';
  return SidebarChangeEvent;
}(DebugEvent_1.DebugEvent);

exports.SidebarChangeEvent = SidebarChangeEvent;

/***/ }),

/***/ "./src/app/event/UIThemeChangeEvent.ts":
/*!*********************************************!*\
  !*** ./src/app/event/UIThemeChangeEvent.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var DebugEvent_1 = __webpack_require__(/*! debugbase/abstract/DebugEvent */ "./src/debugbase/abstract/DebugEvent.ts");

var UIThemeChangeEvent =
/** @class */
function (_super) {
  __extends(UIThemeChangeEvent, _super);

  function UIThemeChangeEvent(parameters) {
    return _super.call(this, parameters) || this;
  }

  UIThemeChangeEvent.eventName = 'UI_THEME_CHANGE_EVENT';
  return UIThemeChangeEvent;
}(DebugEvent_1.DebugEvent);

exports.UIThemeChangeEvent = UIThemeChangeEvent;

/***/ }),

/***/ "./src/app/event/ViewReadyEvent.ts":
/*!*****************************************!*\
  !*** ./src/app/event/ViewReadyEvent.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var DebugEvent_1 = __webpack_require__(/*! debugbase/abstract/DebugEvent */ "./src/debugbase/abstract/DebugEvent.ts");

var ViewReadyEvent =
/** @class */
function (_super) {
  __extends(ViewReadyEvent, _super);

  function ViewReadyEvent(parameters) {
    return _super.call(this, parameters) || this;
  }

  ViewReadyEvent.eventName = 'VIEW_READY_EVENT';
  return ViewReadyEvent;
}(DebugEvent_1.DebugEvent);

exports.ViewReadyEvent = ViewReadyEvent;

/***/ }),

/***/ "./src/app/module/global/DragPanel.ts":
/*!********************************************!*\
  !*** ./src/app/module/global/DragPanel.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var DragBreakpoints_1 = __webpack_require__(/*! debugbase/util/DragBreakpoints */ "./src/debugbase/util/DragBreakpoints.ts");

var Module_1 = __webpack_require__(/*! debugbase/abstract/Module */ "./src/debugbase/abstract/Module.ts");

var Events_1 = __webpack_require__(/*! debugbase/events/Events */ "./src/debugbase/events/Events.ts");

var CustomCursorEvent_1 = __webpack_require__(/*! app/event/CustomCursorEvent */ "./src/app/event/CustomCursorEvent.ts");
/** To manage side dragging elements  */


var DragPanel =
/** @class */
function (_super) {
  __extends(DragPanel, _super);

  function DragPanel() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.config = {
      dragToMoveRatio: 0.32,
      dragEasePower: 6,
      releaseEasePower: 10,
      forceSnap: false,
      startProgress: 0,
      cursorTheme: 'dark',
      velocityFriction: 0.8
    };
    _this._x = 0; //X position of the drag in px

    _this._targetX = 0; //X target 

    _this._maxScroll = 0; //Max scroll of the panel (will be a minius number)

    _this._sizeSet = false;
    _this._velocity = 0;
    return _this;
  }

  DragPanel.prototype.create = function () {
    this._easePower = this.config.releaseEasePower;
    this._$draw = this.$container.querySelector('.dragpanel__draw');

    this._$draw.addEventListener('resize', this._onResize.bind(this));

    this.$container.addEventListener('mouseover', this._onMouseOver.bind(this));
    this.$container.addEventListener('mouseout', this._onMouseOut.bind(this));

    this._createDragControl();

    this._onResize();

    if (window.innerWidth < 1030) {
      this.config.dragEasePower = 5;
      this.config.releaseEasePower = 5;
    }
  };

  DragPanel.prototype.destroy = function () {
    this._$draw.removeEventListener('resize', this._onResize.bind(this));

    this.$container.removeEventListener('mouseover', this._onMouseOver.bind(this));
    this.$container.removeEventListener('mouseout', this._onMouseOut.bind(this));
    this._$draw = null;

    _super.prototype.destroy.call(this);
  };

  DragPanel.prototype.resize = function () {
    this._onResize();
  };

  DragPanel.prototype.tick = function () {
    if (!this._sizeSet && this.$container.clientWidth) {
      this._onResize();

      this._sizeSet = true;
    }

    if (this._sizeSet) {
      this._setDrawPosition();
    }
  }; //Private 
  //--------------------------------------------------------------------------------


  DragPanel.prototype._onResize = function () {
    this._width = this._$draw.scrollWidth;
    this._maxScroll = -1 * (this._width - this.$container.clientWidth);

    this._dragController.setVirtualWidth(this._width);

    this.math.constrain(this._targetX, this._maxScroll, 0);
  };

  DragPanel.prototype._onMouseOver = function (e) {
    Events_1.Events.dispatch(new CustomCursorEvent_1.CustomCursorEvent({
      type: 'hitarea',
      active: true,
      id: this.id,
      theme: this.config.cursorTheme
    }));
  };

  DragPanel.prototype._onMouseOut = function (e) {
    Events_1.Events.dispatch(new CustomCursorEvent_1.CustomCursorEvent({
      type: 'hitarea',
      active: false,
      id: this.id,
      theme: this.config.cursorTheme
    }));
  };

  DragPanel.prototype._createDragControl = function () {
    var _this = this;

    this._dragController = new DragBreakpoints_1.DragBreakpoints(8, false, 1, false, this.$container);

    this._dragController.setDragToMoveRatio(this.config.dragToMoveRatio);

    this._dragController.easePower = 1;
    this._dragController.releaseEasePower = 1;

    this._dragController.setStartThreshold(0.02);

    this._dragController.forceSnap = false;

    this._dragController.setProgress(this.config.startProgress);

    this._dragController.setActive(true); //Ticker: 


    this._dragController.onTick = function (progressRatio) {
      _this._targetX = progressRatio * _this._maxScroll;
    };

    this._dragController.onStartDrag = function () {
      Events_1.Events.dispatch(new CustomCursorEvent_1.CustomCursorEvent({
        type: 'drag',
        active: true,
        id: _this.id
      }));
      _this._easePower = _this.config.dragEasePower;
    };

    this._dragController.onStopDrag = function () {
      Events_1.Events.dispatch(new CustomCursorEvent_1.CustomCursorEvent({
        type: 'drag',
        active: false,
        id: _this.id
      }));
      _this._easePower = _this.config.releaseEasePower;
    };
  };

  DragPanel.prototype._setDrawPosition = function () {
    this._x = this._x + (this._targetX - this._x) / this._easePower;
    this._$draw.style.transform = "translate3d(" + this._x + "px, 0, 0)";
  };

  DragPanel.prototype._processVelocity = function () {
    this._velocity *= this.config.velocityFriction;
  };

  return DragPanel;
}(Module_1.Module);

exports.DragPanel = DragPanel;

/***/ }),

/***/ "./src/app/module/global/HitArea.ts":
/*!******************************************!*\
  !*** ./src/app/module/global/HitArea.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});
/** Class that setups a touch / mouse down that resets itself after too long */

var Module_1 = __webpack_require__(/*! debugbase/abstract/Module */ "./src/debugbase/abstract/Module.ts");

var HitArea =
/** @class */
function (_super) {
  __extends(HitArea, _super);

  function HitArea() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.config = {
      onUpdate: null,
      onCancel: null,
      onComplete: null,
      xTolerence: 30,
      yTolerence: 30,
      startAmount: 15,
      completeAmount: 55,
      slug: 'market-masters',
      title: '',
      index: 0,
      href: '/screens/market-masters/'
    };
    _this._tickCount = 0;
    return _this;
  }

  HitArea.prototype.create = function () {
    console.log('Create', this.id);
  };

  Object.defineProperty(HitArea.prototype, "mouseIsDown", {
    get: function get() {
      return this._mouseIsDown;
    },
    enumerable: true,
    configurable: true
  });
  /** Start mousedown of touchstart */

  HitArea.prototype.startMouseDown = function (cords) {
    this._mouseDownCords = {
      x: cords.x,
      y: cords.y
    };

    this._checkIsIntersecting(this._mouseDownCords);

    if (this._isIntersecting) {
      this._mouseIsDown = true;
    }
  };

  HitArea.prototype.mouseUp = function () {
    this._reset();
  };
  /** Update mouse / touchmove cords */


  HitArea.prototype.updateMouseCords = function (cords) {
    this._checkIsIntersecting(cords);

    if (this._mouseIsDown && this._isIntersecting) {
      this._update();

      this._checkComplete();

      this._checkMoveTolerence(cords);
    }
  };
  /** Set x/y/scale of hit area */


  HitArea.prototype.setPosition = function (x, y, scale) {
    this.$container.style.transform = "translate3d(" + x + "px, " + y + ", 0) scale(" + scale + ")";
  }; //Private 
  //---------------------------------------------------------------------

  /** Check if cords are intersecting with this element */


  HitArea.prototype._checkIsIntersecting = function (cords) {
    this._rect = this.$container.getBoundingClientRect();
    this._isIntersecting = this._rect.x <= cords.x && cords.x <= this._rect.x + this._rect.width && this._rect.y <= cords.y && cords.y <= this._rect.y + this._rect.height;
  };
  /** Check if the user moves too far (and therefor resets the action) */


  HitArea.prototype._checkMoveTolerence = function (cords) {
    if (!this._mouseIsDown) {
      return;
    }

    if (Math.abs(cords.x - this._mouseDownCords.x) > this.config.xTolerence || Math.abs(cords.y - this._mouseDownCords.y) > this.config.yTolerence) {
      this._reset();

      if (this.config.onCancel) {
        this.config.onCancel();
      }
    }
  };
  /** Update */


  HitArea.prototype._update = function () {
    this._tickCount += 1;

    if (this.config.onUpdate && this._tickCount > this.config.startAmount) {
      this.config.onUpdate({
        count: this._tickCount,
        ratio: Math.min(1, (this._tickCount - this.config.startAmount) / (this.config.completeAmount - this.config.startAmount))
      });
    }
  };
  /** check if the click is complete */


  HitArea.prototype._checkComplete = function () {
    if (this._tickCount >= this.config.completeAmount) {
      this._reset();

      if (this.config.onComplete) {
        this.config.onComplete(this.config);
      }
    }
  };
  /* reset */


  HitArea.prototype._reset = function () {
    this._tickCount = 0;
    this._mouseIsDown = false;
    this._isIntersecting = false;
    this._mouseDownCords = null;
  };

  return HitArea;
}(Module_1.Module);

exports.HitArea = HitArea;

/***/ }),

/***/ "./src/app/module/global/LoaderGraphic.ts":
/*!************************************************!*\
  !*** ./src/app/module/global/LoaderGraphic.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Module_1 = __webpack_require__(/*! debugbase/abstract/Module */ "./src/debugbase/abstract/Module.ts"); //import {TweenMax} from 'gsap';


var LoaderGraphic =
/** @class */
function (_super) {
  __extends(LoaderGraphic, _super);

  function LoaderGraphic() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  LoaderGraphic.prototype.create = function () {
    this._$maskedLogo = this.$container.querySelector('.home__logo__image.-masked');
  };

  LoaderGraphic.prototype.progress = function (ratio) {
    var width = 278 * ratio;
    gsap.TweenMax.to(this._$maskedLogo, 0, {
      width: width
    });
  };

  LoaderGraphic.prototype.animateOut = function () {
    //gsap.TweenMax.to('.home__logo__image', 0.35, {scale: 1.15});
    //gsap.TweenMax.to('.home__logo__image', 0.35, {scale: 1, delay: 0.35});
    gsap.TweenMax.to('.home__logo__image', 0.6, {
      autoAlpha: 0,
      scale: 2,
      ease: gsap.Power3.easeOut
    });
  };

  LoaderGraphic.prototype.animateIn = function () {
    //gsap.TweenMax.to('.home__logo__image', 0.35, {scale: 1.15});
    //gsap.TweenMax.to('.home__logo__image', 0.35, {scale: 1, delay: 0.35});
    gsap.TweenMax.to('.home__logo__image', 0.6, {
      autoAlpha: 1,
      scale: 1,
      ease: gsap.Power3.easeOut
    });
  };

  return LoaderGraphic;
}(Module_1.Module);

exports.LoaderGraphic = LoaderGraphic;

/***/ }),

/***/ "./src/app/module/global/Paging.ts":
/*!*****************************************!*\
  !*** ./src/app/module/global/Paging.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var GA_1 = __webpack_require__(/*! debugbase/tracking/GA */ "./src/debugbase/tracking/GA.ts");

var Module_1 = __webpack_require__(/*! debugbase/abstract/Module */ "./src/debugbase/abstract/Module.ts"); //import {TweenMax, Back, Power3, Power0} from 'gsap';


var Events_1 = __webpack_require__(/*! debugbase/events/Events */ "./src/debugbase/events/Events.ts");

var Paging =
/** @class */
function (_super) {
  __extends(Paging, _super);

  function Paging() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.config = {
      activeIndex: 0,
      freezeInteractionOnClick: 0,
      track: true
    };
    _this._guideIndex = 0;
    _this._guideDirection = 1;
    _this._freezeClick = false;
    return _this;
  }

  Paging.prototype.create = function () {
    this._$items = this.$container.querySelectorAll('.ui__paging__item');
    this.DOM.addClass(this.$container, "-items-" + this._$items.length);
    this.DOM.addClass(this._$items[this.config.activeIndex], '-selected');
    this._guideIndex = this.config.activeIndex;
    var itemSelector = "#" + this.id + " .ui__paging__link";
    Events_1.Events.on('click', itemSelector, this._itemClick.bind(this));
    Events_1.Events.on('mouseover', itemSelector, function (e) {
      return e.preventDefault();
    });

    if (this.DOM.hasClass(this.$container, '-guide')) {
      this.startGuideEffect();
    }
  };

  Paging.prototype.setCallbacks = function (click) {
    this._onClick = click;
  };
  /** set container  for when manually creating the module */


  Paging.prototype.setContainer = function (element) {
    this.$container = element;
    this.mounted = true;
  };

  Paging.prototype.hide = function (type, delay) {
    if (type === void 0) {
      type = 'cascade';
    }

    if (delay === void 0) {
      delay = 0;
    }

    if (type === 'cascade') {
      gsap.TweenMax.set("#" + this.id + " .ui__paging__item", {
        y: 20,
        autoAlpha: 0
      });
    } else if (type === 'fade') {
      gsap.TweenMax.to(this.$container, 0.2, {
        autoAlpha: 0,
        ease: gsap.Power0.easeNone,
        delay: delay
      });
    }
  };

  Paging.prototype.show = function (type, delay) {
    if (type === void 0) {
      type = 'cascade';
    }

    if (delay === void 0) {
      delay = 0;
    }

    gsap.TweenMax.set(this.$container, {
      display: 'block'
    });

    if (type === 'cascade') {
      gsap.TweenMax.set(this.$container, {
        autoAlpha: 1
      });
      gsap.TweenMax.set("#" + this.id + " .ui__paging__item", {
        y: 20,
        autoAlpha: 0
      });
      gsap.TweenMax.staggerTo("#" + this.id + " .ui__paging__item", 0.4, {
        y: 0,
        autoAlpha: 1,
        ease: gsap.Back.easeOut,
        delay: delay
      }, 0.08);
    } else if (type === 'fade') {
      gsap.TweenMax.set(this.$container, {
        autoAlpha: 0
      });
      gsap.TweenMax.to(this.$container, 0.5, {
        autoAlpha: 1,
        ease: gsap.Power0.easeNone,
        delay: delay
      });
      gsap.TweenMax.set("#" + this.id + " .ui__paging__item", {
        y: 0,
        autoAlpha: 1
      });
    }
  };

  Paging.prototype.setActiveIndex = function (index, forDisplayPurposesOnly) {
    if (forDisplayPurposesOnly === void 0) {
      forDisplayPurposesOnly = false;
    }

    var oldIndex = this.config.activeIndex;

    if (!forDisplayPurposesOnly) {
      this.config.activeIndex = index;
    } else {
      oldIndex = this._oldGuideIndex;
    }

    this.config.activeIndex = index;
    this.DOM.removeClass(this._$items[oldIndex], '-selected');

    if (index > oldIndex) {
      this.DOM.addClass(this._$items[oldIndex], '-reverse');
      this.DOM.removeClass(this._$items[index], '-reverse');
    } else {
      this.DOM.removeClass(this._$items[oldIndex], '-reverse');
      this.DOM.addClass(this._$items[index], '-reverse');
    }

    this.DOM.addClass(this._$items[index], '-selected');
  };

  Paging.prototype.getActiveIndex = function () {
    if (this._guideCycleInt) {
      return 0;
    }

    return this.config.activeIndex;
  };
  /** Get the slug off the paging item */


  Paging.prototype.getActiveSlug = function (index) {
    return this._$items[index].getAttribute('data-slug');
  };
  /** Use a ratio to check what paging should be selected */


  Paging.prototype.checkIndexFromRatio = function (ratio) {
    this._checkIndex = Math.round(this._$items.length * ratio);

    if (this._checkIndex !== this.config.activeIndex) {
      this.setActiveIndex(this._checkIndex);
    }

    return this.config.activeIndex;
  };
  /** Start guid effect */


  Paging.prototype.startGuideEffect = function () {
    var _this = this;

    this.DOM.addClass(this.$container, '-guide');
    clearInterval(this._guideCycleInt);
    this._guideCycleInt = setInterval(function () {
      _this._guideCycle();
    }, 700);
  };
  /** Stop the guide from animating (Used to guide the user) */


  Paging.prototype.removeGuideEffect = function (selectIndex) {
    if (selectIndex === void 0) {
      selectIndex = null;
    }

    clearInterval(this._guideCycleInt);
    this._guideCycleInt = null;
    this.DOM.removeClass(this.$container, '-guide');

    if (selectIndex !== null) {
      this.setActiveIndex(selectIndex);
    }
  };
  /** Reset */


  Paging.prototype.reset = function () {
    clearInterval(this._guideCycleInt);
    this._guideIndex = 0;
  };
  /** Set active */


  Paging.prototype.setActive = function (active) {
    if (active) {
      this.DOM.addClass(this.$container, '-active');
      return;
    }

    this.DOM.removeClass(this.$container, '-active');
  };
  /**Set class on module */


  Paging.prototype.setClass = function (className) {
    this.DOM.addClass(this.$container, className);
  };

  Paging.prototype.removeClass = function (className) {
    this.DOM.removeClass(this.$container, className);
  }; //Private 
  //----------------------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------------------


  Paging.prototype._itemClick = function (e) {
    var _this = this;

    e.preventDefault();

    if (this._freezeClick) {
      return false;
    }

    var index = parseInt(this.DOM.getAttribute(e.target, 'data-index'));

    if (this._onClick) {
      this._onClick(index);
    }

    if (this.config.track) {
      GA_1.GA.event('UX', 'Paging click', "index " + index);
    }

    if (this.config.freezeInteractionOnClick > 0) {
      this._freezeClick = true;
      setTimeout(function () {
        return _this._freezeClick = false;
      }, this.config.freezeInteractionOnClick * 1000);
    }

    return false;
  };

  Paging.prototype._guideCycle = function () {
    this._oldGuideIndex = this._guideIndex;
    this._guideIndex += this._guideDirection;

    if (this._guideIndex === this._$items.length - 1 || this._guideIndex === 0) {
      this._guideDirection *= -1;
    }

    this.setActiveIndex(this._guideIndex, true);
  };

  return Paging;
}(Module_1.Module);

exports.Paging = Paging;

/***/ }),

/***/ "./src/app/module/home/MaskedText.ts":
/*!*******************************************!*\
  !*** ./src/app/module/home/MaskedText.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var TimelineItem_1 = __webpack_require__(/*! app/module/home/TimelineItem */ "./src/app/module/home/TimelineItem.ts"); //import * as PIXI from 'pixi.js';
//Masked text item timeline item used for Debug logo 


var MaskedText =
/** @class */
function (_super) {
  __extends(MaskedText, _super);

  function MaskedText() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  MaskedText.prototype.create = function (jsonConfig, settings) {
    _super.prototype.create.call(this, jsonConfig, settings);

    this._background = new PIXI.Sprite(settings.backgroundTexture);
    this._mask = new PIXI.Sprite(settings.maskTexture);

    this._mask.anchor.set(0.5, 0.5);

    this._background.anchor.set(0.5, 0.5);

    this._sprite.anchor.set(0.5, 0.5);

    this._sprite.addChild(this._background, this._mask);

    this._background.mask = this._mask;
  };

  return MaskedText;
}(TimelineItem_1.TimelineItem);

exports.MaskedText = MaskedText;

/***/ }),

/***/ "./src/app/module/home/ParticleAttract.ts":
/*!************************************************!*\
  !*** ./src/app/module/home/ParticleAttract.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var Debugbase_1 = __webpack_require__(/*! debugbase/Debugbase */ "./src/debugbase/Debugbase.ts");

var HomeTimelineMain_1 = __webpack_require__(/*! app/controller/home/HomeTimelineMain */ "./src/app/controller/home/HomeTimelineMain.ts");

var RelativeTimelinePosition_1 = __webpack_require__(/*! app/module/home/homeUtil/RelativeTimelinePosition */ "./src/app/module/home/homeUtil/RelativeTimelinePosition.ts");

var ParticleAttract =
/** @class */
function () {
  function ParticleAttract(sprite, particlePathOrbit, particlePathSine, particleRepell) {
    if (particlePathOrbit === void 0) {
      particlePathOrbit = null;
    }

    if (particlePathSine === void 0) {
      particlePathSine = null;
    }

    if (particleRepell === void 0) {
      particleRepell = null;
    }

    this._state = HomeTimelineMain_1.TimelineStateType.INTRO;
    this._moveXTarget = 0;
    this._moveYTarget = 0;
    this._moveX = 0;
    this._moveY = 0;
    this._forceX = 0;
    this._forceY = 0;
    this._powerX = 0;
    this._powerY = 0;
    this._offsetTargetX = 0;
    this._offsetTargetY = 0;
    this._introActive = false;
    this._buttonActive = false;
    this._mouse = Debugbase_1.Debugbase.controller.get('Mouse');
    this._math = Debugbase_1.Debugbase.math;
    this._sprite = sprite;
    this._particlePathOrbit = particlePathOrbit;
    this._particlePathSine = particlePathSine;
    this._particleRepell = particleRepell;
    this._attractSeed = 0.8 + Math.random() * 0.9;
    this._attractSeed = 1; //this._attractSeed  = 3;

    this._baseEasePower = 2 + Math.random() * 2; //For hoz split:

    this._distanceTolerence = 500 + Math.random() * 500; //For vertical split: 

    this._distanceTolerence = 1200 + Math.random() * 400; //Points 
    //this._offsetTargetX = (Math.random() * 1  < 0.5) ? -50 : 50;
    //this._offsetTargetY = (Math.random() * 1  < 0.5) ? -50 : 50;
    //Centered

    this._offsetTargetX = 0;
    this._offsetTargetY = 0; //this._screensTargetX = 0 + (Math.random() * 1800);
    //this._screensTargetY = Math.random() * 1000;
    //When screens then target the logo: 
    //this._screensTargetPosition = new RelativeTimelinePosition(0.24, 0.54);

    this._screensTargetPosition = new RelativeTimelinePosition_1.RelativeTimelinePosition(-0.05 + Math.random() * 0.22, 0.6 + Math.random() * 0.4); //When screens then target to position under logo:

    this._spacesTargetPosition = new RelativeTimelinePosition_1.RelativeTimelinePosition(0.78 + Math.random() * 0.22, Math.random() * 1);
  }

  Object.defineProperty(ParticleAttract.prototype, "introActive", {
    set: function set(v) {
      this._introActive = v;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(ParticleAttract.prototype, "buttonActive", {
    set: function set(v) {
      this._buttonActive = v;
    },
    enumerable: true,
    configurable: true
  });

  ParticleAttract.prototype.resize = function (containerWidth, containerHeight) {
    this._screensTargetPosition.resize(containerWidth, containerHeight);

    this._spacesTargetPosition.resize(containerWidth, containerHeight);
  };

  ParticleAttract.prototype.tick = function (mouseCords, absoluteX, containerX, absoluteY, mouseOffsetX, dragOffsetX) {
    //this._repell.distancey = mouseCords.y - (this._absoluteY + this._offsetY);
    this._distance = this._math.distance({
      x: mouseCords.x + this._offsetTargetX,
      y: mouseCords.y + this._offsetTargetY
    }, {
      x: this._sprite.x,
      y: this._sprite.y
    });
    this._distanceToTolerenceRatio = 0;
    var maxVelocity = this._state === HomeTimelineMain_1.TimelineStateType.HOME_LOGO_OVER ? 200 : 50;
    var easePower = 5;

    if (this._state === HomeTimelineMain_1.TimelineStateType.SPACES_TRANSITION) {
      maxVelocity = 100;
    } else if (this._state === HomeTimelineMain_1.TimelineStateType.SPACES) {
      maxVelocity = 1000;
      ;
      easePower = 40;
    } // if (this._state === TimelineStateType.SPACES) {
    //	this._moveXTarget  = 2000;
    //	maxVelocity = 200;
    //} 


    if (this._distance < this._distanceTolerence && this._state === HomeTimelineMain_1.TimelineStateType.HOME_LOGO_OVER || this._state === HomeTimelineMain_1.TimelineStateType.SPACES_TRANSITION || this._state === HomeTimelineMain_1.TimelineStateType.SPACES || this._state === HomeTimelineMain_1.TimelineStateType.SCREENS) {
      this._particlePathOrbit.setActive(true);

      this._particlePathSine.setActive(false);

      this._particleRepell.setActive(true);

      this._distanceToTolerenceRatio = this._distance / this._distanceTolerence;

      if (this._distanceToTolerenceRatio > 1) {
        this._distanceToTolerenceRatio = 1;
      } // Reverse ratio: 


      this._distanceToTolerenceRatio = 1 - this._distanceToTolerenceRatio;
      this._moveXTarget = mouseCords.x - (absoluteX + containerX) + this._offsetTargetX - mouseOffsetX - dragOffsetX;
      this._moveYTarget = mouseCords.y - absoluteY + this._offsetTargetY;

      if (this._state === HomeTimelineMain_1.TimelineStateType.SPACES) {
        //Update the target position based on the drag/mouse/effect offsets: 
        this._spacesTargetPosition.update(containerX + this._offsetTargetX + mouseOffsetX + dragOffsetX, this._offsetTargetY); //this._moveXTarget  = this._screensTargetX - (absoluteX + containerX) + this._offsetTargetX - mouseOffsetX - dragOffsetX;
        //this._moveYTarget  = this._screensTargetY - absoluteY + this._offsetTargetY;


        this._moveXTarget = this._spacesTargetPosition.x - (absoluteX + containerX) + this._offsetTargetX - mouseOffsetX - dragOffsetX;
        this._moveYTarget = this._spacesTargetPosition.y - absoluteY + this._offsetTargetY;
      }

      if (this._state === HomeTimelineMain_1.TimelineStateType.SCREENS) {
        this._screensTargetPosition.update(containerX + mouseOffsetX + dragOffsetX, this._offsetTargetY);

        this._moveXTarget = this._screensTargetPosition.x - (absoluteX + containerX) + this._offsetTargetX - mouseOffsetX - dragOffsetX;
        this._moveYTarget = this._screensTargetPosition.y - absoluteY - this._offsetTargetY;
      }

      if (window.introActive && !this._introActive) {
        this._moveXTarget = 0;
        this._moveYTarget = 0;
      }
    } else {
      this._particlePathOrbit.setActive(false);

      this._particlePathSine.setActive(true);

      this._particleRepell.setActive(false);

      this._moveXTarget = 0;
      this._moveYTarget = 0;
    }

    this._attractEasePower = this._baseEasePower + easePower * this._distanceToTolerenceRatio; //Only allow so much velocity: 
    //For hoz split:
    //For vertical split:
    //let maxVelocity: number = 100;

    if (this._moveXTarget - this._moveX > maxVelocity) {
      this._moveXTarget = this._moveX + maxVelocity;
    } else if (this._moveXTarget - this._moveX < -maxVelocity) {
      this._moveXTarget = this._moveX - maxVelocity;
    }

    if (this._moveYTarget - this._moveY > maxVelocity) {
      this._moveYTarget = this._moveY + maxVelocity;
    } else if (this._moveYTarget - this._moveY < -maxVelocity) {
      this._moveYTarget = this._moveY - maxVelocity;
    }

    this._moveX = this._moveX + (this._moveXTarget - this._moveX) / this._attractEasePower;
    this._moveY = this._moveY + (this._moveYTarget - this._moveY) / this._attractEasePower;
  };

  ParticleAttract.prototype.getX = function () {
    return this._moveX;
  };

  ParticleAttract.prototype.getY = function () {
    return this._moveY;
  };
  /** Set the timeline state for */


  ParticleAttract.prototype.setTimelineState = function (state) {
    this._state = state;
  };

  return ParticleAttract;
}();

exports.ParticleAttract = ParticleAttract;

/***/ }),

/***/ "./src/app/module/home/ParticleField.ts":
/*!**********************************************!*\
  !*** ./src/app/module/home/ParticleField.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var TimelineItem_1 = __webpack_require__(/*! app/module/home/TimelineItem */ "./src/app/module/home/TimelineItem.ts");

var Enums_1 = __webpack_require__(/*! app/data/Enums */ "./src/app/data/Enums.ts"); //import * as PIXI from 'pixi.js';


var LayoutModeType;

(function (LayoutModeType) {
  LayoutModeType["RANDOM"] = "random";
  LayoutModeType["GRID"] = "grid";
})(LayoutModeType = exports.LayoutModeType || (exports.LayoutModeType = {})); //Masked text item timeline item used for Debug logo 


var ParticleField =
/** @class */
function (_super) {
  __extends(ParticleField, _super);

  function ParticleField() {
    var _this = _super !== null && _super.apply(this, arguments) || this; //Child partciles


    _this._childParticles = [];
    _this._textureCount = 0;
    _this._layoutMode = LayoutModeType.RANDOM;
    return _this;
  }

  ParticleField.prototype.create = function (jsonConfig, settings) {
    //Set the department based on postion 
    this._layoutMode = jsonConfig.layoutMode ? jsonConfig.layoutMode : LayoutModeType.RANDOM;
    this.id = jsonConfig.id;
    this.type = TimelineItem_1.TimelineItemType.PARTICLE_FIELD;
    this._repellActive = true;
    this.department = this.relativeX < 0.5 ? Enums_1.DepartmentType.SCREENS : Enums_1.DepartmentType.SPACES;

    this._createChildParticles(jsonConfig, settings);
  };

  ParticleField.prototype.resize = function (containerWidth, containerHeight, displayScale, innerwidth) {
    this._childParticles.forEach(function (particle) {
      particle.resize(containerWidth, containerHeight, displayScale, innerwidth);
    });
  };

  ParticleField.prototype.tick = function (xProgressRatio, containerX, mouseYRatio, mouseXRatio, mouseIsDown, velocityRatio, instant, mousecords, mothcords) {
    if (mouseIsDown === void 0) {
      mouseIsDown = false;
    }

    if (velocityRatio === void 0) {
      velocityRatio = 0;
    }

    if (instant === void 0) {
      instant = false;
    }

    if (mousecords === void 0) {
      mousecords = null;
    }

    if (mothcords === void 0) {
      mothcords = null;
    }

    this._childParticles.forEach(function (particle) {
      particle.tick(xProgressRatio, containerX, mouseYRatio, mouseXRatio, mouseIsDown, velocityRatio, instant, mousecords, mothcords);
    });
  };

  ParticleField.prototype.animateToWork = function (moveY, delay) {
    if (delay === void 0) {
      delay = 0;
    }

    this._childParticles.forEach(function (particle) {
      particle.animateToWork(moveY, delay);
    });
  };

  ParticleField.prototype.animateFromWork = function (delay) {
    if (delay === void 0) {
      delay = 1.0;
    }

    this._childParticles.forEach(function (particle) {
      particle.animateFromWork(delay);
    });
  };

  ParticleField.prototype.resetIntervalsAndAnimations = function () {
    this._childParticles.forEach(function (particle) {
      particle.resetIntervalsAndAnimations();
    });
  };

  ParticleField.prototype.reset = function () {
    this._childParticles.forEach(function (particle) {
      particle.reset();
    });
  };

  ParticleField.prototype.resetFromWork = function (offY) {
    this._childParticles.forEach(function (particle) {
      particle.resetFromWork(offY);
    });
  };

  ParticleField.prototype.getItems = function () {
    return this._childParticles;
  }; //Private 
  //----------------------------------------------------------------------------------------


  ParticleField.prototype._createChildParticles = function (masterConfig, settings) {
    var relativeX;
    var relativeY;
    var easePower;
    var parallaxOffsetPower;
    var parallaxPowerMouse;
    var gridRelativeX = masterConfig.relativeX - masterConfig.relXSeed;
    var gridRelativeY = masterConfig.relativeY - masterConfig.relYSeed;
    var gridRelativeWidth = masterConfig.relXSeed * 2;
    var gridRelativeHeight = masterConfig.relYSeed * 2;
    var cols = 39;
    var rows = Math.round(masterConfig.particleCount / cols);
    var gridSpacingX = gridRelativeWidth / cols;
    var gridSpacingY = gridRelativeHeight / rows;
    var colIndex = 0;
    var rowIndex = 0;
    var pathStartIndexRatio = 0;
    var pathIndexShare = 1 / cols;

    for (var i = 0; i < masterConfig.particleCount; i++) {
      if (this._layoutMode === LayoutModeType.RANDOM) {
        relativeX = this._randomiseParticleAttribute(masterConfig.relativeX, masterConfig.relXSeed, true);
        relativeY = this._randomiseParticleAttribute(masterConfig.relativeY, masterConfig.relYSeed, true);
        easePower = this._randomiseParticleAttribute(masterConfig.easePower, masterConfig.easeSeed);
        parallaxOffsetPower = this._randomiseParticleAttribute(masterConfig.parallaxOffsetPower, masterConfig.offsetSeed);
        parallaxPowerMouse = this._randomiseParticleAttribute(masterConfig.parallaxOffsetPower, masterConfig.parallaxSeed);
      } else if (this._layoutMode === LayoutModeType.GRID) {
        relativeX = gridRelativeX + colIndex * gridSpacingX;
        relativeY = gridRelativeY + rowIndex * gridSpacingY; //easePower = masterConfig.easePower - (rowIndex * 0.02);

        easePower = masterConfig.easePower;
        parallaxOffsetPower = masterConfig.parallaxOffsetPower; //parallaxPowerMouse = -1 *  masterConfig.parallaxPowerMouse + (rowIndex * 0.02);

        parallaxPowerMouse = -1 * masterConfig.parallaxPowerMouse;
        pathStartIndexRatio = colIndex * pathIndexShare;
        colIndex++;

        if (colIndex === cols) {
          colIndex = 0;
          rowIndex++;
        }
      }

      var config = {
        id: masterConfig.id + "-particle-" + i,
        relativeX: relativeX,
        relativeY: relativeY,
        easePower: easePower,
        parallaxOffsetPower: parallaxOffsetPower,
        parallaxPowerMouse: parallaxPowerMouse,
        autoScale: masterConfig.autoScale,
        autoRotate: masterConfig.autoRotate,
        autoAlpha: masterConfig.autoAlpha,
        randomRotation: masterConfig.randomRotation,
        startScale: masterConfig.startScale,
        minScale: masterConfig.minScale,
        maxScale: masterConfig.maxScale,
        autoRange: masterConfig.autoRange,
        repell: true,
        alpha: masterConfig.alpha,
        bioAlphaMax: masterConfig.bioAlphaMax ? masterConfig.bioAlphaMax : null,
        bioAlphaMin: masterConfig.bioAlphaMin ? masterConfig.bioAlphaMin : null,
        tint: masterConfig.tint ? masterConfig.tint : null,
        path: masterConfig.path ? masterConfig.path : null,
        pathDirection: masterConfig.pathDirection ? masterConfig.pathDirection : null,
        pathStartIndexRatio: pathStartIndexRatio
      };

      var texture = this._getTexture(settings.textures);

      this._childParticles.push(this._createChildParticle(config, texture, settings.container));
    }
  };

  ParticleField.prototype._randomiseParticleAttribute = function (base, seed, baseOne) {
    if (baseOne === void 0) {
      baseOne = false;
    }

    var direction = Math.random() < 0.5 ? -1 : 1;
    var seededValue;

    if (baseOne) {
      seededValue = 1 * (seed * Math.random());
    } else {
      seededValue = base * (seed * Math.random());
    }

    return base + seededValue * direction;
  };

  ParticleField.prototype._getTexture = function (textures) {
    var texture = textures[this._textureCount];
    this._textureCount++;

    if (this._textureCount === textures.length) {
      this._textureCount = 0;
    }

    return texture;
  };

  ParticleField.prototype._createChildParticle = function (config, texture, container) {
    //A normal pixi sprite that will be animated along the timeline
    var item = new TimelineItem_1.TimelineItem();
    item.relativeX = config.relativeX;
    item.relativeY = config.relativeY;
    item.easePower = config.easePower;
    item.parallaxOffsetPower = config.parallaxOffsetPower;
    item.parallaxPowerMouse = config.parallaxPowerMouse;

    if (config.alpha) {
      item.alpha = config.alpha;
    }

    if (config.tint) {
      item.tint = config.tint;
    } //if() {
    //config.path = PathShapeType.CIRCLE;
    //}


    item.create(config, {
      container: container,
      texture: texture
    });
    return item;
  };

  return ParticleField;
}(TimelineItem_1.TimelineItem);

exports.ParticleField = ParticleField;

/***/ }),

/***/ "./src/app/module/home/ParticleLamp.ts":
/*!*********************************************!*\
  !*** ./src/app/module/home/ParticleLamp.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var ParticleLamp =
/** @class */
function () {
  function ParticleLamp(sprite, innerRadius, outterRadius, minAlpha, maxAlpha) {
    this._sprite = sprite;
    this._innerRadius = innerRadius;
    this._outterRadius = outterRadius;
    this._minAlpha = minAlpha;
    this._maxAlpha = maxAlpha;
    this._alphaRange = this._maxAlpha - this._minAlpha;
  }

  ParticleLamp.prototype.tick = function (mouseCords) {
    this._distanceX = mouseCords.x - this._sprite.position.x;
    this._distanceY = mouseCords.y - this._sprite.position.y;
    this._distance = Math.sqrt(this._distanceX * this._distanceX + this._distanceY * this._distanceY);

    if (this._distance < this._innerRadius) {
      this._sprite.alpha = this._maxAlpha;
    } else {
      this._sprite.alpha = this._minAlpha + (this._alphaRange - this._alphaRange * (this._distance / this._outterRadius));

      if (this._sprite.alpha < this._minAlpha) {
        this._sprite.alpha = this._minAlpha;
      }
    }
  };

  return ParticleLamp;
}();

exports.ParticleLamp = ParticleLamp;

/***/ }),

/***/ "./src/app/module/home/ParticlePath.ts":
/*!*********************************************!*\
  !*** ./src/app/module/home/ParticlePath.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var HomeTimelineMain_1 = __webpack_require__(/*! app/controller/home/HomeTimelineMain */ "./src/app/controller/home/HomeTimelineMain.ts");

var PathShapeType;

(function (PathShapeType) {
  PathShapeType["CIRCLE"] = "circle";
  PathShapeType["SINE_WAVE"] = "sine_wave";
})(PathShapeType = exports.PathShapeType || (exports.PathShapeType = {}));

var ParticlePath =
/** @class */
function () {
  function ParticlePath(sprite, type, direction, startIndexRatio) {
    if (direction === void 0) {
      direction = 1;
    }

    if (startIndexRatio === void 0) {
      startIndexRatio = null;
    } //Array of 0-1 x/y points around a path


    this._state = HomeTimelineMain_1.TimelineStateType.INTRO;
    this._active = true;
    this._path = [];
    this._pathIndex = 0;
    this._xMuliplier = 100;
    this._yMuliplier = 100;
    this._direction = 1;
    this._scaleIndex = 1;
    this._expandMuliplier = 1;
    this._expandMuliplierTarget = 1;
    this._expandMuliplierBase = 1;
    this._distance = 0;
    this._distanceX = 0;
    this._distanceY = 0;
    this._screensTargetX = 0;
    this._screensTargetY = 0;
    this._introActive = false;
    this._buttonActive = false; //this._direction = direction;

    this._sprite = sprite;
    this._type = type;
    this._direction = Math.random() < 0.5 ? 1 : -1;
    this._direction = 1;
    this._scaleSeed = Math.random();
    this._yMuliplier = 30 + Math.random() * 100;
    this._xMuliplier = 30 + Math.random() * 100; //this._xMuliplier = this._yMuliplier;
    //this._yMuliplier = 10 + (Math.random() * 150);

    if (type === PathShapeType.CIRCLE) {
      this._circle();
    } else if (type === PathShapeType.SINE_WAVE) {
      this._sineWave(startIndexRatio);
    }
  }

  Object.defineProperty(ParticlePath.prototype, "introActive", {
    set: function set(v) {
      this._introActive = v;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(ParticlePath.prototype, "buttonActive", {
    set: function set(v) {
      this._buttonActive = v;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(ParticlePath.prototype, "active", {
    get: function get() {
      return this._active;
    },
    enumerable: true,
    configurable: true
  });

  ParticlePath.prototype.tick = function (mouseCords) {
    if (mouseCords === void 0) {
      mouseCords = null;
    }

    this._pathIndex += this._direction;

    if (this._pathIndex >= this._path.length) {
      this._pathIndex = 0;
    } else if (this._pathIndex <= 0) {
      this._pathIndex = this._path.length - 1;
    }

    this._scaleIndex += this._direction;

    if (this._scaleIndex >= this._path.length) {
      this._scaleIndex = 0;
    } else if (this._scaleIndex <= 0) {
      this._scaleIndex = this._path.length - 1;
    }

    if (!mouseCords) {
      this._expandMuliplierTarget = window.touchActive ? this._expandMuliplierBase * 2 : this._expandMuliplierBase * 1;

      if (window.introActive && !this._introActive) {
        this._expandMuliplierTarget = 0;
      }
    } else {
      /*this._distanceX = mouseCords.x - this._sprite.position.x;
      this._distanceY = mouseCords.y - this._sprite.position.y;
      this._distance = Math.sqrt((this._distanceX * this._distanceX) + (this._distanceY * this._distanceY));
        this._expandMuliplier  = 0.5;
      if (this._distance < 200) {
          this._expandMuliplier =  0.5 + (0.5 - ( 0.5 * (this._distance / 200) ) );
      }*/
      this._expandMuliplierTarget = window.touchActive && this._state !== HomeTimelineMain_1.TimelineStateType.HOME_LOGO_OUT ? this._expandMuliplierBase * 2 : this._expandMuliplierBase * 1;
    }

    if (window.introActive || window.buttonActive) {
      this._expandMuliplierTarget = this._expandMuliplierTarget * 0.5;

      if (window.buttonActive) {
        this._expandMuliplierTarget = this._expandMuliplierTarget * 0.7;
      }

      if (window.touchActive) {//this._expandMuliplierTarget *= 2;
      }
    } //When in transition chill out the ranges: 


    if (this._state === HomeTimelineMain_1.TimelineStateType.SPACES_TRANSITION) {
      this._expandMuliplierTarget = 0.9;
    }

    if (this._state === HomeTimelineMain_1.TimelineStateType.SPACES) {
      this._expandMuliplierTarget = 0.1;
    }

    if (this._state === HomeTimelineMain_1.TimelineStateType.INTRO) {
      this._expandMuliplierTarget = 0.1;
    }

    this._expandMuliplier = this._expandMuliplier + (this._expandMuliplierTarget - this._expandMuliplier) / 10; //this._expandMuliplierTarget = 0;
    //this._expandMuliplier = 0;
  };

  ParticlePath.prototype.setActive = function (active) {
    this._active = active;

    if (this._type === PathShapeType.SINE_WAVE) {
      this._expandMuliplierBase = active ? 1 : 0;
      return;
    }

    this._expandMuliplierBase = active ? 1 : 0.05; //this._expandMuliplierBase = (active) ? 1 : 2;
  };

  ParticlePath.prototype.getX = function () {
    return this._path[this._pathIndex].x * (this._xMuliplier * this._expandMuliplier);
  };

  ParticlePath.prototype.getY = function () {
    return this._path[this._pathIndex].y * (this._yMuliplier * this._expandMuliplier);
  };

  ParticlePath.prototype.getScale = function () {
    if (this._state === HomeTimelineMain_1.TimelineStateType.INTRO) {
      return 0;
    }

    if (this._state === HomeTimelineMain_1.TimelineStateType.SPACES_TRANSITION) {
      return 0.1 + 0.25 * (this._scaleIndex / this._path.length);
    }

    if (this._state === HomeTimelineMain_1.TimelineStateType.SPACES) {
      return 0.1 + 0.15 * (this._scaleIndex / this._path.length);
    }

    if (this._type === PathShapeType.SINE_WAVE && this._active) {
      //return 0.4 + (0.2 * this._expandMuliplier);
      return this._path[this._pathIndex].scale;
    }

    if (window.introActive && !this._introActive) {
      return 0;
    }

    if (window.buttonActive && !this._buttonActive) {
      return 0;
    }

    if (window.buttonActive && this._buttonActive) {
      return 0.1 + 0.2 * (this._scaleIndex / this._path.length);
    }

    return 0.1 + 0.3 * (this._scaleIndex / this._path.length);
  };

  ParticlePath.prototype._circle = function () {
    var steps = 90 + Math.round(Math.random() * 800);

    for (var i = 0; i < steps; i++) {
      this._path.push({
        x: 0 + 1 * Math.cos(2 * Math.PI * i / steps),
        y: 0 + 1 * Math.sin(2 * Math.PI * i / steps)
      });
    }

    this._pathIndex = Math.round(Math.random() * steps - 1); //this._pathIndex = 1;

    this._scaleIndex = Math.round(this._path.length * this._scaleSeed); //this._scaleIndex = this._pathIndex;
  };

  ParticlePath.prototype._sineWave = function (startIndexRatio) {
    if (startIndexRatio === void 0) {
      startIndexRatio = null;
    } //let steps: number = 90 + Math.round(Math.random() * 400);


    this._yMuliplier = 24 + Math.random() * 12;
    this._xMuliplier = -5 + Math.random() * 10;
    var steps = 320;
    var height = 2;
    var xStep = 1;
    var x = 0;
    var y = 0;
    var amplitude = 1.4;
    var frequency = 40;
    var i = 0;
    var exit = false;
    var scaleSeed = 0.2 + Math.round(Math.random() * 0.15);
    var xSeed = Math.random() * 10; //ctx.moveTo(x, y);

    while (i < steps || !exit) {
      y = amplitude * Math.sin(x / frequency);
      x += xStep;

      this._path.push({
        x: y,
        y: y,
        scale: scaleSeed + scaleSeed * ((y + 1.4) / 2.8)
      });

      i++;

      if (i >= steps) {
        if (y > 0 && y < 0.01) {
          exit = true;
        }
      }
    }

    if (startIndexRatio !== null) {
      this._pathIndex = Math.floor(startIndexRatio * steps);
    }
  };
  /** Set the timeline state for */


  ParticlePath.prototype.setTimelineState = function (state) {
    this._state = state;
  };

  return ParticlePath;
}();

exports.ParticlePath = ParticlePath;

/***/ }),

/***/ "./src/app/module/home/ParticleRepell.ts":
/*!***********************************************!*\
  !*** ./src/app/module/home/ParticleRepell.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var Debugbase_1 = __webpack_require__(/*! debugbase/Debugbase */ "./src/debugbase/Debugbase.ts");

var ParticleRepell =
/** @class */
function () {
  function ParticleRepell(sprite, distanceTolerence, easePower) {
    if (distanceTolerence === void 0) {
      distanceTolerence = 50;
    }

    if (easePower === void 0) {
      easePower = 20;
    }

    this._moveXTarget = 0;
    this._moveYTarget = 0;
    this._moveX = 0;
    this._moveY = 0;
    this._powerX = 0;
    this._powerY = 0;
    this._repellSeed = 1;
    this._repellLimit = 50;
    this._active = true;
    this._math = Debugbase_1.Debugbase.math;
    this._sprite = sprite;
    this._distanceTolerence = distanceTolerence;
    this._easePower = easePower;
    this._mouseRepellPower = 20;
    this._repellSeed = 1 + Math.random() * 0.7;
    this._repellAmount = 40 + Math.random() * 20;
    this._repellAmountIntro = 60 + Math.random() * 20;
    this._repellAmountButton = 40 + Math.random() * 10;
    this._center = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2
    };
  }

  ParticleRepell.prototype.setActive = function (active) {
    this._active = active;
  };

  ParticleRepell.prototype.retarget = function (mouseCords, targetCords) {
    if (!this._active) {
      return targetCords;
    }

    this._repellCenter = window.introActive || window.buttonActive ? this._center : mouseCords;
    this._distance = Math.sqrt(Math.pow(targetCords.x - this._repellCenter.x, 2) + Math.pow(targetCords.y - this._repellCenter.y, 2));
    this._repellLimit = window.introActive ? 75 : 50;
    this._repellAmountActive = window.introActive ? this._repellAmountIntro : this._repellAmount;

    if (window.buttonActive) {
      this._repellLimit = 50;
      this._repellAmountActive = this._repellAmountButton; //this._repellAmountActive = 50;
    }

    if (this._distance < this._repellLimit) {
      var radians = Math.atan2(targetCords.y - this._repellCenter.y, targetCords.x - this._repellCenter.x);
      targetCords.x = this._repellCenter.x + Math.cos(radians) * this._repellAmountActive;
      targetCords.y = this._repellCenter.y + Math.sin(radians) * this._repellAmountActive;
    }

    return targetCords;
  };

  ParticleRepell.prototype.setParticleRepellCenter = function (center) {
    this._center = center;
  };

  ParticleRepell.prototype.getY = function () {
    return this._moveY;
  };

  ParticleRepell.prototype.getX = function () {
    return this._moveX;
  };

  return ParticleRepell;
}();

exports.ParticleRepell = ParticleRepell;

/***/ }),

/***/ "./src/app/module/home/RelativeChildren.ts":
/*!*************************************************!*\
  !*** ./src/app/module/home/RelativeChildren.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var TimelineItem_1 = __webpack_require__(/*! app/module/home/TimelineItem */ "./src/app/module/home/TimelineItem.ts");

var Enums_1 = __webpack_require__(/*! app/data/Enums */ "./src/app/data/Enums.ts"); //import * as PIXI from 'pixi.js';


var RelativeChildren =
/** @class */
function (_super) {
  __extends(RelativeChildren, _super);

  function RelativeChildren() {
    var _this = _super !== null && _super.apply(this, arguments) || this; //Child partciles


    _this._childParticles = [];
    return _this;
  }

  RelativeChildren.prototype.create = function (jsonConfig, settings) {
    //Set the department based on postion 
    this.id = jsonConfig.id;
    this.type = TimelineItem_1.TimelineItemType.RELATIVE_CHILDREN;
    this._repellActive = true;
    this.department = this.relativeX < 0.5 ? Enums_1.DepartmentType.SCREENS : Enums_1.DepartmentType.SPACES;

    this._createChildParticles(jsonConfig, settings);
  };

  RelativeChildren.prototype.resize = function (containerWidth, containerHeight, displayScale, innerwidth) {
    this._childParticles.forEach(function (particle) {
      particle.resize(containerWidth, containerHeight, displayScale, innerwidth);
    });
  };

  RelativeChildren.prototype.tick = function (xProgressRatio, containerX, mouseYRatio, mouseXRatio, mouseIsDown, velocityRatio, instant, mousecords, mothcords) {
    if (mouseIsDown === void 0) {
      mouseIsDown = false;
    }

    if (velocityRatio === void 0) {
      velocityRatio = 0;
    }

    if (instant === void 0) {
      instant = false;
    }

    if (mousecords === void 0) {
      mousecords = null;
    }

    if (mothcords === void 0) {
      mothcords = null;
    }

    this._childParticles.forEach(function (particle) {
      particle.tick(xProgressRatio, containerX, mouseYRatio, mouseXRatio, mouseIsDown, velocityRatio, instant, mousecords, mothcords);
    });
  };

  RelativeChildren.prototype.animateToWork = function (moveY, delay) {
    if (delay === void 0) {
      delay = 0;
    }

    this._childParticles.forEach(function (particle) {
      particle.animateToWork(moveY, delay);
    });
  };

  RelativeChildren.prototype.animateFromWork = function (delay) {
    if (delay === void 0) {
      delay = 1.0;
    }

    this._childParticles.forEach(function (particle) {
      particle.animateFromWork(delay);
    });
  };

  RelativeChildren.prototype.resetIntervalsAndAnimations = function () {
    this._childParticles.forEach(function (particle) {
      particle.resetIntervalsAndAnimations();
    });
  };

  RelativeChildren.prototype.reset = function () {
    this._childParticles.forEach(function (particle) {
      particle.reset();
    });
  };

  RelativeChildren.prototype.getItems = function () {
    return this._childParticles;
  };

  RelativeChildren.prototype.resetFromWork = function (offY) {
    this._childParticles.forEach(function (particle) {
      particle.resetFromWork(offY);
    });
  }; //Private 
  //----------------------------------------------------------------------------------------


  RelativeChildren.prototype._createChildParticles = function (parentConfig, settings) {
    var _this = this;

    var baseX = parentConfig.relativeX;
    var rangeX = parentConfig.relativeChildrenWidth;
    var baseY = parentConfig.relativeY;
    var rangeY = parentConfig.relativeChildrenHeight;
    parentConfig.children.forEach(function (child, index) {
      var config = {
        id: parentConfig.id + "-particle-" + index,
        relativeX: baseX + child.relativeX * rangeX,
        relativeY: baseY + child.relativeY * rangeY,
        easePower: parentConfig.easePower,
        parallaxOffsetPower: parentConfig.parallaxOffsetPower,
        parallaxPowerMouse: 0,
        autoScale: parentConfig.autoScale,
        autoRotate: parentConfig.autoRotate,
        autoAlpha: parentConfig.autoAlpha,
        randomRotation: parentConfig.randomRotation,
        startScale: parentConfig.startScale,
        minScale: parentConfig.minScale,
        maxScale: parentConfig.maxScale,
        autoRange: parentConfig.autoRange,
        alpha: parentConfig.alpha,
        tint: parentConfig.tint,
        repell: false,
        repellDistance: parentConfig.repellDistance,
        mouseRepellPower: parentConfig.mouseRepellPower,
        mouseRepelEasePower: parentConfig.mouseRepelEasePower
      };
      var texture = settings.textures[child.texture];

      _this._childParticles.push(_this._createChildParticle(config, texture, settings.container));
    });
  };

  RelativeChildren.prototype._createChildParticle = function (config, texture, container) {
    //A normal pixi sprite that will be animated along the timeline
    var item = new TimelineItem_1.TimelineItem();
    item.relativeX = config.relativeX;
    item.relativeY = config.relativeY;
    item.easePower = config.easePower;
    item.parallaxOffsetPower = config.parallaxOffsetPower;
    item.parallaxPowerMouse = 0;

    if (config.alpha) {
      item.alpha = config.alpha;
    }

    if (config.tint) {
      item.tint = config.tint;
    }

    if (config.mouseRepellPower) {
      item.mouseRepellPower = config.mouseRepellPower;
    }

    if (config.repellDistance) {
      item.repellDistance = config.repellDistance;
    }

    if (config.mouseRepelEasePower) {
      item.mouseRepelEasePower = config.mouseRepelEasePower;
    }

    item.create(config, {
      container: container,
      texture: texture
    });
    return item;
  };

  return RelativeChildren;
}(TimelineItem_1.TimelineItem);

exports.RelativeChildren = RelativeChildren;

/***/ }),

/***/ "./src/app/module/home/TimelineItem.ts":
/*!*********************************************!*\
  !*** ./src/app/module/home/TimelineItem.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 //import * as PIXI from 'pixi.js';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Enums_1 = __webpack_require__(/*! app/data/Enums */ "./src/app/data/Enums.ts");

var Debugbase_1 = __webpack_require__(/*! debugbase/Debugbase */ "./src/debugbase/Debugbase.ts"); //Special partcile events


var RelativeTimelinePosition_1 = __webpack_require__(/*! app/module/home/homeUtil/RelativeTimelinePosition */ "./src/app/module/home/homeUtil/RelativeTimelinePosition.ts");

var ParticlePath_1 = __webpack_require__(/*! app/module/home/ParticlePath */ "./src/app/module/home/ParticlePath.ts");

var ParticleLamp_1 = __webpack_require__(/*! app/module/home/ParticleLamp */ "./src/app/module/home/ParticleLamp.ts");

var ParticleAttract_1 = __webpack_require__(/*! app/module/home/ParticleAttract */ "./src/app/module/home/ParticleAttract.ts");

var ParticleRepell_1 = __webpack_require__(/*! app/module/home/ParticleRepell */ "./src/app/module/home/ParticleRepell.ts");

var TimelineItemType;

(function (TimelineItemType) {
  TimelineItemType[TimelineItemType["PARTICLE"] = 0] = "PARTICLE";
  TimelineItemType[TimelineItemType["PARTICLE_FIELD"] = 1] = "PARTICLE_FIELD";
  TimelineItemType[TimelineItemType["RELATIVE_CHILDREN"] = 2] = "RELATIVE_CHILDREN";
})(TimelineItemType = exports.TimelineItemType || (exports.TimelineItemType = {})); //Item on the timeline 
//Can be a particle of something 
//Will be position relatively across the 
//So an item at 0.5 / 0.5 will be in the center middle 


var TimelineItem =
/** @class */
function () {
  function TimelineItem() {
    this.type = TimelineItemType.PARTICLE;
    this.scale = 1; //Scale when fully visible 

    this.easePower = 10;
    this.parallaxOffsetPower = 0;
    this.parallaxPowerMouse = 0.2; //Ratio to effecy height by	

    this._easePowers = {};
    this._x = 0; //X current value 

    this._dragOffsetX = 0; //The amount the item is moved on X because or dragging inernia or being repelled by  

    this._offsetY = 0; //The amount the item is moved on Y because or dragging inernia or being repelled by  

    this._offsetX = 0;
    this._offsetTargetX = 0; //The target the x offset is moving towaards 

    this._offsetTargetY = 0; //The target the y offset is moving towaards  

    this._mouseOffsetX = 0;
    this._mouseOffsetTargetX = 0;
    this._parallaxMultiplerStartValue = 30;
    this._parallaxEaseMultipler = 1;
    this._scale = 1;
    this._scaleTarget = 1;
    this._displayScale = 1;
    this._rotationTarget = 0;
    this._rotation = 0;
    this._alpha = 1;
    this._hasAutoEffect = false;
    this._effectRange = 200;
    this._startRangeAt = 0;
    this._autoStartRotation = 0;
    this._autoStartAlpha = 0;
    this._autoStartScale = 0.4;
    this._finalScale = 1;
    this._finalRotation = 0;
    this._repellActive = false;
    this._isPortraitDevice = false;
    this._repell = {
      homex: 0,
      homey: 0,
      forcex: 0,
      forcey: 0,
      magnet: 200,
      distancex: 0,
      distancey: 0,
      distance: 0,
      powerx: 0,
      powery: 0,
      moveX: 0,
      moveY: 0,
      //Moth 
      magnetMoth: 200,
      distancexMoth: 0,
      distanceyMoth: 0,
      distanceMoth: 0,
      powerxMoth: 0,
      poweryMoth: 0,
      moveXMoth: 0,
      moveYMoth: 0
    };
    this._repellDistance = 150;
    this._mouseRepellPowerDefault = 10;
    this._mouseRepelEasePower = 10;
    this._bioAlphaMax = null;
    this._bioAlphaMin = null;
    this._attractSeed = 1;
    this._distanceTolerence = 400;
  }

  Object.defineProperty(TimelineItem.prototype, "mouseRepellPower", {
    set: function set(v) {
      this._mouseRepellPowerDefault = v;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(TimelineItem.prototype, "repellDistance", {
    set: function set(v) {
      this._repellDistanceDefault = v;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(TimelineItem.prototype, "mouseRepelEasePower", {
    set: function set(v) {
      this._mouseRepelEasePower = v;
    },
    enumerable: true,
    configurable: true
  });

  TimelineItem.prototype.create = function (jsonConfig, settings) {
    this.id = jsonConfig.id;
    this._json = jsonConfig;
    this._isPortraitDevice = Debugbase_1.Debugbase.system.isPortraitDevice;
    this._hasAutoEffect = this._json.autoAlpha || this._json.autoRotate || this._json.autoScale;
    this._targetPosition = new RelativeTimelinePosition_1.RelativeTimelinePosition(jsonConfig.relativeX, jsonConfig.relativeY);

    if (jsonConfig.randomRotation) {
      this._finalRotation = Math.random() * 120 * Math.PI / 180;

      if (Math.random() < 0.5) {
        this._finalRotation *= -1;
      }
    }

    if (jsonConfig.minScale) {
      var range = jsonConfig.maxScale - jsonConfig.minScale;
      this._finalScale = jsonConfig.minScale + range * Math.random();
    }

    if (this._hasAutoEffect) {
      this._autoStartRotation = this._finalRotation + this._json.startRotation * Math.PI / 180 || this._finalRotation + -1 * (Math.random() * 30 * Math.PI / 180);
      this._autoStartAlpha = this._json.startAlpha || 0;
      this._autoStartScale = this._json.startScale || 0.4;
      this._startRangeAt = this._json.startRangeAt || 0;
    }

    this._sprite = new PIXI.Sprite();
    this._sprite.interactive = false;

    this._sprite.anchor.set(0.5, 0.5);

    if (settings.texture) {
      this._sprite.texture = settings.texture;
    }

    settings.container.addChild(this._sprite);

    if (this._json.tint) {
      this._sprite.tint = this.tint;
    }

    if (this._json.alpha) {
      this._sprite.alpha = this.alpha;
    }

    if (jsonConfig.bioAlphaMax) {
      this._bioAlphaMax = jsonConfig.bioAlphaMax;
      this._bioAlphaMin = jsonConfig.bioAlphaMin;
    }

    var introActive = Math.random() < 0.15;
    var buttonActive = Math.random() < 0.25; //Create animation path if set 

    if (jsonConfig.path) {
      var direction = jsonConfig.pathDirection ? jsonConfig.pathDirection : 1;
      var pathStartIndex = jsonConfig.pathStartIndexRatio ? jsonConfig.pathStartIndexRatio : 0;
      this._particlePathOrbit = new ParticlePath_1.ParticlePath(this._sprite, ParticlePath_1.PathShapeType.CIRCLE, direction);
      this._particlePathOrbit.introActive = introActive;
      this._particlePathOrbit.buttonActive = buttonActive;
      this._particlePathSine = new ParticlePath_1.ParticlePath(this._sprite, ParticlePath_1.PathShapeType.SINE_WAVE, direction, pathStartIndex);
    }

    if (jsonConfig.path) {
      this._particleLamp = new ParticleLamp_1.ParticleLamp(this._sprite, 100, 600, //For hoz split:
      //0.4,
      //For vertical split:
      0.1, 0.7);
    }

    if (jsonConfig.path) {
      this._particleAttractRepell = new ParticleRepell_1.ParticleRepell(this._sprite);
      this._particleAttract = new ParticleAttract_1.ParticleAttract(this._sprite, this._particlePathOrbit, this._particlePathSine, this._particleAttractRepell);
      this._particleAttract.introActive = introActive;
      this._particleAttract.buttonActive = buttonActive;
    } else {
      if (this._json.repell) {
        this._repellActive = true;
      }
    }

    if (jsonConfig.maxScale || jsonConfig.minScale) {
      var minScale = jsonConfig.minScale || jsonConfig.maxScale || 1;
      var maxScale = jsonConfig.maxScale || 1;
      var range = maxScale - minScale;
      this._scaleTarget = this._scale = minScale + Math.random() * range;
    } //Set the department based on postion 


    this.department = this.relativeX < 0.5 ? Enums_1.DepartmentType.SCREENS : Enums_1.DepartmentType.SPACES;
    this._attractSeed = 0.8 + Math.random() * 0.9;
    this._mouseRepelEasePower = 10 + Math.random() * 30;
    this._distanceTolerence = 50 + Math.random() * 350;
  };

  TimelineItem.prototype.fadeIn = function (delay) {
    gsap.TweenMax.to(this._sprite, 0.3, {
      alpha: 1,
      delay: delay,
      ease: gsap.Power0.easeNone
    });
  }; //Resize event. 
  //Pass in the made-up container size of the home partciles container
  //Also pass in displayScale to determine sizing as 


  TimelineItem.prototype.resize = function (containerWidth, containerHeight, displayScale, innerwidth) {
    //Resize the abs postion values in 
    this._containerHeight = containerHeight;
    this._containerWidth = containerWidth;
    this._absoluteY = containerHeight * this.relativeY;

    this._targetPosition.resize(this._containerWidth, this._containerHeight);

    if (this._particleAttract) {
      this._particleAttract.resize(this._containerWidth, this._containerHeight);
    }

    this._displayScale = displayScale;
    this._innerWidth = innerwidth;
    this._repellDistance = this._repellDistanceDefault;
    this._mouseRepellPower = this._mouseRepellPowerDefault;
    this._mothRepellPower = 8;

    if (this._innerWidth < 500) {
      this._repellDistance = this._repellDistanceDefault * 0.4;
      this._mothRepellPower = 2.3;
    } else if (Debugbase_1.Debugbase.system.isSmallDevice) {
      this._repellDistance = this._repellDistanceDefault * 0.5;
      this._mothRepellPower = 5;
    }

    if (this._hasAutoEffect) {
      this._effectRange = this._json.autoRange * this._innerWidth || 0.12 * this._innerWidth;
    }
  }; //Global tick to update animation:


  TimelineItem.prototype.tick = function (xProgressRatio, containerX, mouseYRatio, mouseXRatio, mouseIsDown, velocityRatio, instant, mouseCords, mothPosition) {
    //Deal with inernia on offset (used for things particle repelling)
    //this._offsetX = this._offsetX + ((this._offsetTargetX - this._offsetX ) / this.easePower );
    if (mouseIsDown === void 0) {
      mouseIsDown = false;
    }

    if (velocityRatio === void 0) {
      velocityRatio = 0;
    }

    if (instant === void 0) {
      instant = false;
    }

    if (mouseCords === void 0) {
      mouseCords = null;
    }

    if (mothPosition === void 0) {
      mothPosition = null;
    } //Process X using the virtual containerX poosition 
    //Note container is not actually moved on the x, just the items. This allows each to have their own inernia/ease powers	


    this._setParallaxEaseMultipler();

    this._setEasePowers(mouseIsDown, instant);

    this._calculateParallaxDragOffsetX(xProgressRatio, this._containerWidth);

    if (this._repellActive) {
      this._processRepell(mouseCords, mothPosition);
    } //Get mouseOffsetX to add parallax 
    //Use the _containerHeight value
    //Only process mouse parallax on mouse (as its too extreme on touch actions)
    //if (!Debugbase.system.cordsFromTouch ) {


    if (!Debugbase_1.Debugbase.system.isPortraitDevice) {
      this._offsetTargetY = -1 * (mouseYRatio * (this._containerHeight * (this.parallaxPowerMouse / this._easePowers.y)));
      this._offsetY = this._offsetY + (this._offsetTargetY - this._offsetY) / this._easePowers.mouse;
      this._mouseOffsetTargetX = -1 * (mouseXRatio * (this._containerHeight * (this.parallaxPowerMouse / 2)));
      this._mouseOffsetX = this._mouseOffsetX + (this._mouseOffsetTargetX - this._mouseOffsetX) / this._easePowers.mouse;
    } //Set the offset factors (drag, mouseX, repell)


    this._offsetX = containerX + this._dragOffsetX + this._mouseOffsetX + this._repell.moveX; //Set the new target position passed on time line position 

    this._targetPosition.update(this._offsetX, this._offsetY + this._repell.moveY + this._repell.moveYMoth); //Run through list of modifier to effect the target (attract / repell / etc)
    //------------------------------------------------------------------------------------


    if (this._particlePathOrbit) {
      this._particlePathOrbit.tick();

      if (this._particlePathOrbit.active) {
        this._scaleTarget = this._particlePathOrbit.getScale();
      }

      this._targetPosition.increase(this._particlePathOrbit.getX(), this._particlePathOrbit.getY());
    }

    if (this._particlePathSine) {
      this._particlePathSine.tick(mouseCords);

      this._targetPosition.increase(this._particlePathSine.getX(), this._particlePathSine.getY());

      if (this._particlePathSine.active) {
        this._scaleTarget = this._particlePathSine.getScale();
      }
    }

    var attractEffectX = 0;
    var attractEffectY = 0; //Deal with partcile attracting logic

    if (this._particleAttract) {
      //Pull the particle towards the mouse
      this._particleAttract.tick(mouseCords, this._targetPosition.absoluteX, containerX, this._targetPosition.absoluteY, this._mouseOffsetX, this._dragOffsetX);

      this._targetPosition.increase(this._particleAttract.getX(), this._particleAttract.getY());
    }

    if (this._particleAttract) {
      var target = this._particleAttractRepell.retarget(mouseCords, {
        x: this._targetPosition.x,
        y: this._targetPosition.y
      });

      this._targetPosition.setPosition(target);
    }

    this._x = this._x + (this._targetPosition.x - this._x) / this._easePowers.x; //Effect Y postion. Effect by mouse position and the acceloremeter: 
    //Scale effect (For whoozy-ness) ----------------------------------------:
    //this._scaleTarget = 1.0 +  Math.abs(velocityRatio * 2.0);
    //If autosclaing is on: 

    if (this._hasAutoEffect) {
      if (this._json.autoScale) {
        if (this.department === Enums_1.DepartmentType.SCREENS && this._x < this._effectRange) {
          this._scaleTarget = this._autoStartScale + (this._finalScale - this._autoStartScale) * Math.max(0, Math.min(this._finalScale, this._x / this._effectRange));
        } else if (this.department === Enums_1.DepartmentType.SPACES && this._x > this._innerWidth - this._effectRange) {
          var realRange = this._effectRange;
          var realX = this._x;
          var realWidth = this._innerWidth;

          if (this._startRangeAt) {
            var rangeStartPx = this._innerWidth * this._startRangeAt;
            realRange = this._effectRange - rangeStartPx;
            realWidth = this._innerWidth - rangeStartPx;
          }

          this._scaleTarget = this._autoStartScale + (this._finalScale - this._autoStartScale) * Math.max(0, Math.min(this._finalScale, (realWidth - this._x) / realRange));
        }
      }

      if (this._json.autoAlpha) {
        if (this.department === Enums_1.DepartmentType.SCREENS && this._x < this._effectRange) {
          this._alpha = this._autoStartAlpha + (1.0 - this._autoStartAlpha) * Math.max(0, Math.min(1, this._x / this._effectRange));
        } else if (this.department === Enums_1.DepartmentType.SPACES && this._x > this._innerWidth - this._effectRange) {
          this._alpha = this._autoStartAlpha + (1.0 - this._autoStartAlpha) * Math.max(0, Math.min(1, (this._innerWidth - this._x) / this._effectRange));
        }

        this._sprite.alpha = this._alpha;
      }

      if (this._json.autoRotate) {
        if (this.department === Enums_1.DepartmentType.SCREENS && this._x < this._effectRange) {
          this._rotationTarget = this._finalRotation + this._autoStartRotation * Math.max(0, Math.min(1, (this._effectRange - this._x) / this._effectRange));
        } else if (this.department === Enums_1.DepartmentType.SPACES && this._x > this._innerWidth - this._effectRange) {//this._alpha =  Math.max(0, Math.min(1, (this._innerWidth - this._x) / this._effectRange)); 
        }
      }
    }

    this._scale = this._scale + (this._scaleTarget - this._scale) / this._easePowers.scale; //Rotation: -------------------------------------------------------------
    //this._rotationTarget = velocityRatio * 2.0;
    //this._rotationTarget = velocityRatio * 0.6;

    this._rotation = this._rotation + (this._rotationTarget - this._rotation) / this._easePowers.rotation; //Set the final positions ----------------------------------------------

    this._sprite.position.set(this._x, this._targetPosition.y);

    this._sprite.scale.set(this._scale * this._displayScale, this._scale * this._displayScale);

    this._sprite.rotation = this._rotation; //Deal with partcile lamp lighting: 

    if (this._particleLamp) {
      this._particleLamp.tick(mouseCords);
    }
  };
  /**
  * Animate off for work section
  * @param {number} moveY
  * @param {number} delay
  */


  TimelineItem.prototype.animateToWork = function (moveY, delay) {
    var _this = this;

    if (delay === void 0) {
      delay = 0;
    }

    if (this._particleAttractRepell) {
      this._particleAttractRepell.setActive(false);
    }

    this._tween = gsap.TweenMax.to(this._sprite, 1 - 0.5 * this.parallaxOffsetPower, {
      y: moveY,
      ease: gsap.Power3.easeIn,
      delay: delay,
      onComplete: function onComplete() {
        return _this._startParallaxEaseIn();
      }
    });
  };
  /**
  * Animate back from work. Note reset manages setting start positons
  * @param {number} delay
  */


  TimelineItem.prototype.animateFromWork = function (delay) {
    var _this = this;

    if (delay === void 0) {
      delay = 1.0;
    }

    var y = this._targetPosition.absoluteY + this._offsetY;
    this._tween = gsap.TweenMax.to(this._sprite, 1 - 0.5 * this.parallaxOffsetPower, {
      y: y,
      ease: gsap.Power3.easeOut,
      delay: delay,
      onComplete: function onComplete() {
        return _this._startParallaxEaseIn();
      }
    });
  };
  /** Remove any animations / interval on reset */


  TimelineItem.prototype.resetIntervalsAndAnimations = function () {
    if (this._tween) {
      this._tween.kill();
    }
  };
  /** General reset */


  TimelineItem.prototype.reset = function () {
    this._sprite.y = this._targetPosition.absoluteY + this._offsetY;
  };
  /**
  * Reset when coming back from work. Tiles need to be put off screen. (X position is managed through normal updates)
  * @param {number} offY
  */


  TimelineItem.prototype.resetFromWork = function (offY) {
    this._sprite.y = offY;
  };
  /** Set the timeline state for */


  TimelineItem.prototype.setTimelineState = function (state) {
    if (this._particleAttract) {
      this._particleAttract.setTimelineState(state);
    }

    if (this._particlePathOrbit) {
      this._particlePathOrbit.setTimelineState(state);
    }

    if (this._particlePathSine) {
      this._particlePathSine.setTimelineState(state);
    }
  };

  TimelineItem.prototype.setParticleRepellCenter = function (center) {
    if (this._particleAttractRepell) {
      this._particleAttractRepell.setParticleRepellCenter(center);
    }
  }; //PRIVATE 
  //----------------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------------
  //Calculate the parallax offset caused by draging left <> right: 


  TimelineItem.prototype._calculateParallaxDragOffsetX = function (progress, containerWidth) {
    //Correct thing to allow for the fact the start/photoshop point of the timeline is center/0.5/home 
    this._relativeParallaxX = this.relativeX - 0.5; //Translate this into the current progress 

    this._relativeParallaxXToProgressRatio = this._relativeParallaxX - (progress - 0.5); //Set the offset as percentage of the container width (half the width because of the 0.5 logic). 

    this._dragOffsetX = this._relativeParallaxXToProgressRatio * this.parallaxOffsetPower * (containerWidth / 2);
  };

  TimelineItem.prototype._setEasePowers = function (mouseIsDown, instant) {
    if (instant === void 0) {
      instant = false;
    } //When instant don't any ineria stuff. Just put at the correct state: 


    if (instant) {
      this._easePowers.mouse = 1;
      this._easePowers.x = 1;
      this._easePowers.y = 1;
      this._easePowers.scale = 1;
      this._easePowers.rotation = 1;
      return;
    }

    this._easePowers.mouse = mouseIsDown ? 5 * this._parallaxEaseMultipler : 20 * this._parallaxEaseMultipler;
    this._easePowers.x = 1 * this._parallaxEaseMultipler;
    this._easePowers.y = 4 * this._parallaxEaseMultipler;
    this._easePowers.scale = 8 * this._parallaxEaseMultipler;
    this._easePowers.rotation = 2 * this._parallaxEaseMultipler;
  };
  /** Ease in parallax (To stop harsh movement after tranition tweens complete) */


  TimelineItem.prototype._startParallaxEaseIn = function () {
    this._parallaxEaseMultipler = this._parallaxMultiplerStartValue;
  };
  /** Set the easeMultiple on each frame to reduce back to 1 */


  TimelineItem.prototype._setParallaxEaseMultipler = function () {
    if (this._parallaxEaseMultipler > 1) {
      this._parallaxEaseMultipler -= 0.5;
    }
  };
  /** Process repell force */


  TimelineItem.prototype._processRepell = function (mouseCords, mothCords) {
    //If mouse cords from mouse then process repell
    if (!Debugbase_1.Debugbase.system.isPortraitDevice) {
      this._processRepellMouse(mouseCords);
    }
  };

  TimelineItem.prototype._processRepellMouse = function (mouseCords) {
    //Reworked from: 
    //https://codepen.io/biblos/pen/KRJmey
    this._repell.distancex = mouseCords.x - this._x;
    this._repell.distancey = mouseCords.y - (this._absoluteY + this._offsetY);
    this._repell.distance = Math.sqrt(this._repell.distancex * this._repell.distancex + this._repell.distancey * this._repell.distancey);
    this._repell.powerx = this._repell.distancex / this._repell.distance * this._repell.magnet / this._repell.distance;
    this._repell.powery = this._repell.distancey / this._repell.distance * this._repell.magnet / this._repell.distance; //this._repell.forcex =  ( this._repell.forcex  + (this._x - this._x) / 2) / 2.1;

    var ratio = 0;

    if (this._repell.distance < this._distanceTolerence) {
      this._repell.moveXTarget = this._repell.powerx * -this._mouseRepellPower;
      this._repell.moveYTarget = this._repell.powery * -this._mouseRepellPower; //this._repell.moveXTarget =  this._mouseRepellPower - (this._repell.powerx * -this._mouseRepellPower);
      //this._repell.moveYTarget = this._mouseRepellPower - (this._repell.powery * -this._mouseRepellPower);

      /*ratio = this._repell.distance / this._distanceTolerence;
      if (ratio > 1) {
          ratio = 1;
      }
        ratio = 1 - ratio;
        let x =  (this._repell.distancex) * this._attractSeed;
      let y =  (mouseCords.y - (this._absoluteY + this._offsetY)) * this._attractSeed;
        this._repell.moveXTarget =  x;
      this._repell.moveYTarget = y;*/
      //this._repell.moveX = this._repell.powerx + this._repell.forcex ;
    } else {
      this._repell.moveXTarget = this._repell.moveYTarget = 0;
    }

    var easeP = this._mouseRepelEasePower + 100 * ratio;
    this._repell.moveX = this._repell.moveX + (this._repell.moveXTarget - this._repell.moveX) / easeP;
    this._repell.moveY = this._repell.moveY + (this._repell.moveYTarget - this._repell.moveY) / easeP;
    /*if (this._bioAlphaMax !== null) {
        let alpha =  1 - ( (this._repell.distance / 150) * 0.7);
        if (alpha < this._bioAlphaMin) {
            alpha = this._bioAlphaMin;
        }
        if (alpha > this._bioAlphaMax) {
            alpha = this._bioAlphaMax;
        }
        this._sprite.alpha = alpha;
    }*/
  };

  TimelineItem.prototype._processRepellMoth = function (mothCords) {
    if (!mothCords) {
      return;
    }

    this._repell.distancexMoth = mothCords.x - this._x;
    this._repell.distanceyMoth = mothCords.y - (this._absoluteY + this._offsetY);
    this._repell.distanceMoth = Math.sqrt(this._repell.distancexMoth * this._repell.distancexMoth + this._repell.distanceyMoth * this._repell.distanceyMoth);
    this._repell.powerxMoth = this._repell.distancexMoth / this._repell.distanceMoth * this._repell.magnetMoth / this._repell.distanceMoth;
    this._repell.poweryMoth = this._repell.distanceyMoth / this._repell.distanceMoth * this._repell.magnetMoth / this._repell.distanceMoth;

    if (this._repell.distancexMoth < this._repellDistance) {
      this._repell.moveXTargetMoth = this._repell.powerxMoth * -this._mothRepellPower;
      this._repell.moveYTargetMoth = this._repell.poweryMoth * -this._mothRepellPower;
    } else {
      this._repell.moveXTargetMoth = this._repell.moveYTargetMoth = 0;
    }

    this._repell.moveXMoth = this._repell.moveXMoth + (this._repell.moveXTargetMoth - this._repell.moveXMoth) / 10;
    this._repell.moveYMoth = this._repell.moveYMoth + (this._repell.moveYTargetMoth - this._repell.moveYMoth) / 10;
  };

  return TimelineItem;
}();

exports.TimelineItem = TimelineItem;

/***/ }),

/***/ "./src/app/module/home/TimelineRegion.ts":
/*!***********************************************!*\
  !*** ./src/app/module/home/TimelineRegion.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var TimelineRegionType;

(function (TimelineRegionType) {
  TimelineRegionType["RECTANGLE"] = "rectangle";
  TimelineRegionType["PROGRESS"] = "progress";
})(TimelineRegionType = exports.TimelineRegionType || (exports.TimelineRegionType = {}));

var TimelineRegion =
/** @class */
function () {
  function TimelineRegion(params) {
    this._intersecting = false;
    this._entered = false;
    this._id = params.id;
    this._type = params.type;
    this._rect = params.rect || null;
    this._range = params.range || null;
    this._onEnter = params.onEnter;
    this._onExit = params.onExit;
  }

  Object.defineProperty(TimelineRegion.prototype, "id", {
    get: function get() {
      return this._id;
    },
    enumerable: true,
    configurable: true
  });

  TimelineRegion.prototype.tick = function (mouseCords, progress, velocity) {
    if (this._type === TimelineRegionType.RECTANGLE) {
      this._processRectangle(mouseCords, velocity);
    } else if (this._type === TimelineRegionType.PROGRESS) {
      this._processProgress(progress);
    }
  };

  TimelineRegion.prototype._processRectangle = function (mouseCords, velocity) {
    this._intersecting = mouseCords.relX > this._rect.x && mouseCords.relX < this._rect.x + this._rect.w && mouseCords.relY > this._rect.y && mouseCords.relY < this._rect.y + this._rect.h;

    this._checkEnterState(velocity, true);
  };

  TimelineRegion.prototype._processProgress = function (progress) {
    this._intersecting = progress > this._range.min && progress <= this._range.max;

    this._checkEnterState();
  };

  TimelineRegion.prototype._checkEnterState = function (velocity, checkMouse) {
    if (velocity === void 0) {
      velocity = 0;
    }

    if (checkMouse === void 0) {
      checkMouse = false;
    }

    var mouseDown = checkMouse && window.touchActive;

    if (!this._entered && this._intersecting && Math.abs(velocity) < 0.02 && !mouseDown) {
      this._entered = true;

      this._onEnter(this._id);
    } else if (this._entered && !this._intersecting) {
      this._entered = false;

      this._onExit(this._id);
    }
  };

  return TimelineRegion;
}();

exports.TimelineRegion = TimelineRegion;

/***/ }),

/***/ "./src/app/module/home/TimelineRegionManager.ts":
/*!******************************************************!*\
  !*** ./src/app/module/home/TimelineRegionManager.ts ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var TimelineRegion_1 = __webpack_require__(/*! app/module/home/TimelineRegion */ "./src/app/module/home/TimelineRegion.ts");

var TimelineRegionManager =
/** @class */
function () {
  function TimelineRegionManager() {
    this._regions = [];
  }

  TimelineRegionManager.prototype.add = function (params) {
    this._regions.push(new TimelineRegion_1.TimelineRegion(params));
  };

  TimelineRegionManager.prototype.tick = function (mouseCords, containerX, containerWidth, containerHeight, progress, velocity) {
    this._regions.forEach(function (region) {
      region.tick({
        x: mouseCords.x,
        y: mouseCords.y,
        relX: (Math.abs(containerX) + mouseCords.x) / containerWidth,
        relY: mouseCords.y / containerHeight
      }, progress, velocity);
    });
  };

  return TimelineRegionManager;
}();

exports.TimelineRegionManager = TimelineRegionManager;

/***/ }),

/***/ "./src/app/module/home/homeUtil/ConstrainAroundCircle.ts":
/*!***************************************************************!*\
  !*** ./src/app/module/home/homeUtil/ConstrainAroundCircle.ts ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var DistanceBetweenTwoPoints_1 = __webpack_require__(/*! ./DistanceBetweenTwoPoints */ "./src/app/module/home/homeUtil/DistanceBetweenTwoPoints.ts");
/** https://stackoverflow.com/questions/8515900/how-to-constrain-movement-within-the-area-of-a-circle */


var ConstrainAroundCircle =
/** @class */
function () {
  function ConstrainAroundCircle() {
    this._distanceRuler = new DistanceBetweenTwoPoints_1.DistanceBetweenTwoPoints();
  }

  ConstrainAroundCircle.prototype.setConstraints = function (center, radius) {
    this._center = center;
    this._radius = radius;
  };

  ConstrainAroundCircle.prototype.limit = function (mousePosition) {
    this._distance = this._distanceRuler.measure(mousePosition, this._center);

    if (this._distance <= this._radius) {
      return {
        x: mousePosition.x,
        y: mousePosition.y
      };
    } else {
      this._x = mousePosition.x - this._center.x;
      this._y = mousePosition.y - this._center.y;
      this._radians = Math.atan2(this._y, this._x);
      return {
        x: Math.cos(this._radians) * this._radius + this._center.x,
        y: Math.sin(this._radians) * this._radius + this._center.y
      };
    }
  };

  return ConstrainAroundCircle;
}();

exports.ConstrainAroundCircle = ConstrainAroundCircle;

/***/ }),

/***/ "./src/app/module/home/homeUtil/DistanceBetweenTwoPoints.ts":
/*!******************************************************************!*\
  !*** ./src/app/module/home/homeUtil/DistanceBetweenTwoPoints.ts ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/** https://stackoverflow.com/questions/8515900/how-to-constrain-movement-within-the-area-of-a-circle */

var DistanceBetweenTwoPoints =
/** @class */
function () {
  function DistanceBetweenTwoPoints() {}

  DistanceBetweenTwoPoints.prototype.measure = function (p1, p2) {
    return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
  };

  return DistanceBetweenTwoPoints;
}();

exports.DistanceBetweenTwoPoints = DistanceBetweenTwoPoints;

/***/ }),

/***/ "./src/app/module/home/homeUtil/RelativeTimelinePosition.ts":
/*!******************************************************************!*\
  !*** ./src/app/module/home/homeUtil/RelativeTimelinePosition.ts ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/** Calculate the actual position of an element from relative cords (Allowing for offsets) */

var RelativeTimelinePosition =
/** @class */
function () {
  function RelativeTimelinePosition(_relativeX, _relativeY) {
    this._relativeX = _relativeX;
    this._relativeY = _relativeY;
  }

  Object.defineProperty(RelativeTimelinePosition.prototype, "x", {
    get: function get() {
      return this._x;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(RelativeTimelinePosition.prototype, "y", {
    get: function get() {
      return this._y;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(RelativeTimelinePosition.prototype, "absoluteX", {
    get: function get() {
      return this._absoluteX;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(RelativeTimelinePosition.prototype, "absoluteY", {
    get: function get() {
      return this._absoluteY;
    },
    enumerable: true,
    configurable: true
  });

  RelativeTimelinePosition.prototype.resize = function (containerWidth, containerHeight) {
    this._absoluteX = containerWidth * this._relativeX;
    this._absoluteY = containerHeight * this._relativeY;
  };

  RelativeTimelinePosition.prototype.update = function (offsetX, offsetY) {
    this._x = this._absoluteX + offsetX;
    this._y = this._absoluteY + offsetY;
  };

  RelativeTimelinePosition.prototype.increase = function (x, y) {
    this._x += x;
    this._y += y;
  };

  RelativeTimelinePosition.prototype.setPosition = function (point) {
    this._x = point.x;
    this._y = point.y;
  };

  return RelativeTimelinePosition;
}();

exports.RelativeTimelinePosition = RelativeTimelinePosition;

/***/ }),

/***/ "./src/app/module/home/homeUtil/TextScramble.ts":
/*!******************************************************!*\
  !*** ./src/app/module/home/homeUtil/TextScramble.ts ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 //Justin Windle:
//https://codepen.io/soulwire/pen/mErPAK

Object.defineProperty(exports, "__esModule", {
  value: true
}); // ——————————————————————————————————————————————————
// TextScramble
// ——————————————————————————————————————————————————

var TextScramble =
/** @class */
function () {
  function TextScramble(el, speed) {
    this.speed = 10;
    this.el = el;
    this.chars = '!<>-_\\/[]{}—=+*^?#________';
    this.update = this.update.bind(this);

    if (speed) {
      this.speed = speed;
    }
  }

  TextScramble.prototype.setText = function (newText) {
    var _this = this;

    var oldText = this.el.innerText;
    var length = Math.max(oldText.length, newText.length);
    var promise = new Promise(function (resolve) {
      return _this.resolve = resolve;
    });
    this.queue = [];

    for (var i = 0; i < length; i++) {
      var from = oldText[i] || '';
      var to = newText[i] || '';
      var start = Math.floor(Math.random() * this.speed);
      var end = start + Math.floor(Math.random() * this.speed);
      this.queue.push({
        from: from,
        to: to,
        start: start,
        end: end
      });
    }

    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  };

  TextScramble.prototype.update = function () {
    var output = '';
    var complete = 0;

    for (var i = 0, n = this.queue.length; i < n; i++) {
      var _a = this.queue[i],
          from = _a.from,
          to = _a.to,
          start = _a.start,
          end = _a.end,
          char = _a.char;

      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar();
          this.queue[i].char = char;
        }

        output += "<span class=\"dud\">" + char + "</span>";
      } else {
        output += from;
      }
    }

    this.el.innerHTML = output;

    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  };

  TextScramble.prototype.randomChar = function () {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  };

  return TextScramble;
}();

exports.TextScramble = TextScramble;

/***/ }),

/***/ "./src/app/module/info/GoogleMap.ts":
/*!******************************************!*\
  !*** ./src/app/module/info/GoogleMap.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Module_1 = __webpack_require__(/*! debugbase/abstract/Module */ "./src/debugbase/abstract/Module.ts");

var Events_1 = __webpack_require__(/*! debugbase/events/Events */ "./src/debugbase/events/Events.ts");

var GoogleMap =
/** @class */
function (_super) {
  __extends(GoogleMap, _super);

  function GoogleMap() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.config = {
      lat: 51.5491144,
      long: -0.076880,
      style: [{
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [{
          "saturation": 36
        }, {
          "color": "#000000"
        }, {
          "lightness": 40
        }]
      }, {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [{
          "visibility": "on"
        }, {
          "color": "#000000"
        }, {
          "lightness": 16
        }]
      }, {
        "featureType": "all",
        "elementType": "labels.icon",
        "stylers": [{
          "visibility": "off"
        }]
      }, {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [{
          "color": "#000000"
        }, {
          "lightness": 20
        }]
      }, {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [{
          "color": "#000000"
        }, {
          "lightness": 17
        }, {
          "weight": 1.2
        }]
      }, {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [{
          "color": "#000000"
        }, {
          "lightness": 20
        }]
      }, {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [{
          "color": "#000000"
        }, {
          "lightness": 21
        }]
      }, {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [{
          "color": "#000000"
        }, {
          "lightness": 17
        }]
      }, {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [{
          "color": "#000000"
        }, {
          "lightness": 29
        }, {
          "weight": 0.2
        }]
      }, {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [{
          "color": "#000000"
        }, {
          "lightness": 18
        }]
      }, {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [{
          "color": "#000000"
        }, {
          "lightness": 16
        }]
      }, {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [{
          "color": "#000000"
        }, {
          "lightness": 19
        }]
      }, {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [{
          "color": "#000000"
        }, {
          "lightness": 17
        }]
      }],
      zoom: 16,
      type: 'ROADMAP',
      control: 'LEFT_BOTTOM',
      backgroundColour: '#333333',
      markerImage: '/img/ui/google-map-marker.png',
      scrollWheel: false,
      directionsSelector: null,
      replaceAtWidth: 1000,
      replaceImage: '/img/ui/mobile-map.jpg',
      replaceSelector: null
    };
    _this._markerData = []; //Mapping features: 

    _this._directionsStep = 1;
    return _this;
  }

  GoogleMap.prototype.create = function () {
    if (this.config.replaceImage && window.innerWidth <= this.config.replaceAtWidth) {
      this._replaceMap();

      this.destroy();
      return;
    }

    this._createMap(); //if (this.config.markerImage) {


    this._setupMainMarker();

    this._createMarkers(); //}


    if (this.config.directionsSelector) {
      this._setupDirections();
    }

    this.resize();
  };

  GoogleMap.prototype.resize = function () {
    this.$container.style.height = window.innerHeight * 0.9 + "px";
  }; //Private 
  //------------------------------------------------------------------------------------------


  GoogleMap.prototype._createMap = function () {
    var center = new google.maps.LatLng(this.config.lat, this.config.long);
    var mapOptions = {
      zoom: this.config.zoom,
      center: center,
      mapTypeId: google.maps.MapTypeId[this.config.type],
      mapTypeControl: false,
      panControl: false,
      scrollwheel: this.config.scrollWheel,
      styles: this.config.style,
      zoomControlOptions: {
        style: google.maps.ZoomControlStyle.LARGE,
        position: google.maps.ControlPosition[this.config.control]
      },
      streetViewControlOptions: {
        position: google.maps.ControlPosition[this.config.control]
      },
      backgroundColor: this.config.backgroundColour
    };
    this._map = new google.maps.Map(this.$container, mapOptions);
  };

  GoogleMap.prototype._setupMainMarker = function () {
    this._markerData.push({
      lat: this.config.lat,
      long: this.config.long,
      image: this.config.markerImage
    });
  };

  GoogleMap.prototype._createMarkers = function () {
    var _this = this;

    if (this._markerData.length === 0) {
      return;
    }

    this._markerData.forEach(function (data) {
      return _this._createMarker(data);
    });
  };

  GoogleMap.prototype._createMarker = function (data) {
    var icon = {
      url: data.image,
      scaledSize: new google.maps.Size(74, 96),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(37, 96) // anchor

    };
    var point = new google.maps.LatLng(data.lat, data.long);
    var marker = new google.maps.Marker({
      draggable: false,
      icon: icon,
      map: this._map,
      position: point
    });
  };

  GoogleMap.prototype._setupDirections = function () {
    var _this = this;

    this._$directionsContainer = document.querySelector(this.config.directionsSelector);
    this._directionsService = new google.maps.DirectionsService();
    this._directionsDisplay = new google.maps.DirectionsRenderer({
      polylineOptions: {
        strokeColor: '#01dcf7',
        strokeWeight: 5
      },
      markerOptions: {
        visible: false,
        position: null
      }
    });

    this._directionsDisplay.setMap(this._map); //Add auto comlete feature ----------------------------------------------------------------


    this._autocomplete = new google.maps.places.Autocomplete(this._$directionsContainer.querySelector('.googlemap__autocomplete'), {
      types: ['geocode']
    }); // When the user selects an address from the dropdown, populate the address
    // fields in the form.

    this._autocomplete.addListener('place_changed', function () {
      return _this._fillInAddress();
    }); //Add travel type button events: 


    Events_1.Events.on('click', this.config.directionsSelector + " .googlemap__traveltype", function (e) {
      //Get the type number: 
      var type = e.target.getAttribute('data-travel-type');
      var travelMode = google.maps.TravelMode[type];

      _this._setTravelMode(travelMode);

      return false;
    });
    Events_1.Events.on('click', "" + this.config.directionsSelector, function (e) {
      _this._directionsHolderPress();

      return false;
    }); //Set refs 

    this._$directionsTypes = this._$directionsContainer.querySelector(".googlemap__traveltypes");
    this._$directionsAutoComplete = this._$directionsContainer.querySelector(".googlemap__autocomplete");
    this._$directionsTitle = this._$directionsContainer.querySelector(".googlemap__title");
  };

  GoogleMap.prototype._directionsHolderPress = function () {
    if (this._directionsStep > 1) {
      return;
    }

    this._setupDirectionsStep(this._directionsStep + 1);
  };

  GoogleMap.prototype._fillInAddress = function () {
    // Get the place details from the autocomplete object.
    this._place = this._autocomplete.getPlace();
    var point;

    if (this._place.geometry) {
      var lat = this._place.geometry.location.lat();

      var lng = this._place.geometry.location.lng();

      point = new google.maps.LatLng(lat, lng);
    } else {
      point = this._place.name;
    }

    this._calculateAndDisplayRoute(point);
  };

  GoogleMap.prototype._onUserSelectLocationCallback = function () {//Select location logic ------
  };

  GoogleMap.prototype._onTravelTypeSelectCallback = function () {//Select Travel type logic ------
  };

  GoogleMap.prototype._setTravelMode = function (mode) {
    this._travelMode = mode;

    this._setupDirectionsStep(this._directionsStep + 1);
  };

  GoogleMap.prototype._calculateAndDisplayRoute = function (destinationPoint) {
    var _this = this;

    var originPoint = new google.maps.LatLng(this.config.lat, this.config.long);

    this._directionsService.route({
      origin: originPoint,
      destination: destinationPoint,
      travelMode: this._travelMode
    }, function (response, status) {
      if (status === google.maps.DirectionsStatus.OK) {
        _this._directionsDisplay.setDirections(response);

        _this._setupDirectionsStep(1);
      } else {
        window.alert('Sorry location not found, please try again.'); //$pop.app.getModule('contact').onLocationErrorCallback();
      }
    });
  };

  GoogleMap.prototype._setupDirectionsStep = function (step) {
    this._directionsStep = step;

    if (this._directionsStep === 1) {
      //Reset / show start
      this._$directionsAutoComplete.style.display = 'none';
      gsap.TweenMax.to(this._$directionsContainer, 0.3, {
        height: 70
      });
      this.DOM.setText(this._$directionsTitle, 'Get new directions?');
    } else if (this._directionsStep === 2) {
      //Show Travel types
      this._$directionsTypes.style.display = 'inline-block';
      this.DOM.setText(this._$directionsTitle, 'How you traveling?'); //Animate in -------------------------------------------

      gsap.TweenMax.to(this._$directionsContainer, 0.3, {
        height: 180
      });
      gsap.TweenMax.set(this._$directionsTypes, {
        autoAlpha: 1
      });
      this.DOM.addClass(this._$directionsTypes, '-active');
      gsap.TweenMax.staggerFromTo(this.config.directionsSelector + " .googlemap__traveltype", 0.4, {
        scale: 0
      }, {
        scale: 1,
        delay: 0.25
      }, 0.06);
    } else if (this._directionsStep === 3) {
      //Show location input
      this._$directionsTypes.style.display = 'none';
      this._$directionsAutoComplete.style.display = 'inline-block';
      this._$directionsAutoComplete.value = '';
      gsap.TweenMax.fromTo(this._$directionsAutoComplete, 0.3, {
        autoAlpha: 0,
        y: 10
      }, {
        autoAlpha: 1,
        y: 0
      });
      this.DOM.setText(this._$directionsTitle, 'Where you coming from?');
    }

    gsap.TweenMax.fromTo(this._$directionsTitle, 0.3, {
      autoAlpha: 0
    }, {
      autoAlpha: 1
    });
  };

  GoogleMap.prototype._replaceMap = function () {
    var replaceElement = this.config.replaceSelector ? document.querySelector(this.config.replaceSelector) : this.DOM.parent(this.$container);
    var newElement = "<img src='" + this.config.replaceImage + "' class='googlemap__replacement'  />";

    if (this.config.replaceSelector) {
      this.DOM.setHTML(replaceElement, newElement);
    } else {
      this.$container.remove();
      this.DOM.append(replaceElement, newElement);
    }
  };

  return GoogleMap;
}(Module_1.Module);

exports.GoogleMap = GoogleMap;

/***/ }),

/***/ "./src/app/module/media/LazyLoadImage.ts":
/*!***********************************************!*\
  !*** ./src/app/module/media/LazyLoadImage.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Module_1 = __webpack_require__(/*! debugbase/abstract/Module */ "./src/debugbase/abstract/Module.ts");

var LazyLoadImage =
/** @class */
function (_super) {
  __extends(LazyLoadImage, _super);

  function LazyLoadImage() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.config = {
      ratio: 'square',
      fade: true,
      fadeTime: 0.25
    };
    return _this;
  }

  LazyLoadImage.prototype.create = function () {
    var _this = this;

    if (this.config.fade) {
      var image_1 = this.$container.querySelector('img');
      gsap.TweenMax.set(image_1, {
        autoAlpha: 0
      });
      image_1.addEventListener('load', function (e) {
        image_1.onload = null;
        gsap.TweenMax.to(image_1, _this.config.fadeTime, {
          autoAlpha: 1,
          ease: gsap.Power0.easeNone
        });

        _this.destroy();
      });
    }
  };

  return LazyLoadImage;
}(Module_1.Module);

exports.LazyLoadImage = LazyLoadImage;

/***/ }),

/***/ "./src/app/module/project/SidePaging.ts":
/*!**********************************************!*\
  !*** ./src/app/module/project/SidePaging.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var Events_1 = __webpack_require__(/*! debugbase/events/Events */ "./src/debugbase/events/Events.ts");

var SidePagingClickEvent_1 = __webpack_require__(/*! app/event/SidePagingClickEvent */ "./src/app/event/SidePagingClickEvent.ts");

var Enums_1 = __webpack_require__(/*! app/data/Enums */ "./src/app/data/Enums.ts");

var SidePaging =
/** @class */
function () {
  function SidePaging(container, dom) {
    this.container = container;
    this.dom = dom;
    this._activeIndex = 1;
    Events_1.Events.on('click', '.project__sidepaging__item', this._onItemClick.bind(this));
  }

  SidePaging.prototype.create = function (itemsData) {
    this._createItemsHTML(itemsData);
  };

  SidePaging.prototype.destroy = function () {
    this._items = null;
  };

  SidePaging.prototype.show = function () {
    gsap.TweenMax.fromTo(this.container, 0.3, {
      autoAlpha: 0
    }, {
      autoAlpha: 1,
      ease: gsap.Power0.easeNone,
      delay: 0.6
    });
  };

  SidePaging.prototype.hide = function () {
    gsap.TweenMax.to(this.container, 0.3, {
      autoAlpha: 0,
      ease: gsap.Power0.easeNone,
      delay: 0
    });
  };

  SidePaging.prototype.selectIndex = function (index, theme) {
    if (theme === Enums_1.UIThemeColourType.DARK) {
      this.dom.addClass(this.container, '-dark');
    } else {
      this.dom.removeClass(this.container, '-dark');
    }

    this._selectIndex(index);
  }; //Private 
  //----------------------------------------------------------------


  SidePaging.prototype._onItemClick = function (e) {
    e.preventDefault();

    this._selectIndex(parseInt(e.target.getAttribute('data-index'), 10));

    Events_1.Events.dispatch(new SidePagingClickEvent_1.SidePagingClickEvent({
      index: this._activeIndex,
      targetSelector: this._items[this._activeIndex].targetSelector
    }));
    return false;
  };

  SidePaging.prototype._selectIndex = function (index) {
    this._activeIndex = index;

    this._setSelectedState();
  };

  SidePaging.prototype._createItemsHTML = function (itemsData) {
    var _this = this;

    var html = '';
    itemsData.forEach(function (config, index) {
      html += _this._createItemHTML(config, index);
    });
    this.dom.setHTML(this.container, html, function () {
      return _this._createItems(itemsData);
    });
  };

  SidePaging.prototype._createItemHTML = function (config, index) {
    return "<a class='project__sidepaging__item -index" + index + "' data-index='" + index + "' href='#'>\n\t\t" + config.label + "\n\t\t</a>";
  };

  SidePaging.prototype._createItems = function (itemsData) {
    var _this = this;

    this._items = [];
    itemsData.forEach(function (config, index) {
      _this._items.push({
        target: _this.container.querySelector(".project__sidepaging__item.-index" + index),
        targetSelector: config.targetSelector
      });
    });
  };

  SidePaging.prototype._setSelectedState = function () {
    var _this = this;

    this._items.forEach(function (item, index) {
      if (index === _this._activeIndex) {
        _this.dom.addClass(item.target, '-selected');
      } else {
        _this.dom.removeClass(item.target, '-selected');
      }
    });
  };

  return SidePaging;
}();

exports.SidePaging = SidePaging;

/***/ }),

/***/ "./src/app/module/project/VideoSwitch.ts":
/*!***********************************************!*\
  !*** ./src/app/module/project/VideoSwitch.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Module_1 = __webpack_require__(/*! debugbase/abstract/Module */ "./src/debugbase/abstract/Module.ts");

var VideoSwitch =
/** @class */
function (_super) {
  __extends(VideoSwitch, _super);

  function VideoSwitch() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.config = {
      desktopSrc: null,
      mobileSrc: null
    };
    return _this;
  }

  VideoSwitch.prototype.create = function () {
    var src = this.system.isPortraitDevice ? this.config.mobileSrc : this.config.desktopSrc;
    this.$container.querySelector('source').setAttribute('src', src);
    this.$container.load(); //Not needed for anything else at the moment so destroy 

    this.destroy();
  };

  return VideoSwitch;
}(Module_1.Module);

exports.VideoSwitch = VideoSwitch;

/***/ }),

/***/ "./src/app/module/widget/LoadMore.ts":
/*!*******************************************!*\
  !*** ./src/app/module/widget/LoadMore.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Module_1 = __webpack_require__(/*! debugbase/abstract/Module */ "./src/debugbase/abstract/Module.ts");

var Events_1 = __webpack_require__(/*! debugbase/events/Events */ "./src/debugbase/events/Events.ts");

var Debugbase_1 = __webpack_require__(/*! debugbase/Debugbase */ "./src/debugbase/Debugbase.ts");

var LoadMore =
/** @class */
function (_super) {
  __extends(LoadMore, _super);

  function LoadMore() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.config = {
      total: null,
      activeCount: 0,
      loadCount: 0,
      imgSrc: '',
      selector: '.load-more__items',
      buttonSelector: 'load-more__button'
    };
    return _this;
  }

  LoadMore.prototype.create = function () {
    var _this = this;

    this._$contentContainer = this.$container.querySelector(this.config.selector);
    this._$button = document.querySelector(this.config.buttonSelector);
    this._eventId = Events_1.Events.on('click', this._$button, function () {
      return _this._loadMore();
    });
  };

  LoadMore.prototype.destroy = function () {
    Events_1.Events.offById(this._eventId);
    this._$contentContainer = null;
    this._$button = null;

    _super.prototype.destroy.call(this);
  };

  LoadMore.prototype._loadMore = function () {
    var html = '';
    var startCount = this.config.activeCount + 1;
    this.config.activeCount = startCount + this.config.loadCount < this.config.total ? startCount + this.config.loadCount : this.config.total;

    for (var i = startCount; i <= this.config.activeCount; i++) {
      var imgSrc = Debugbase_1.Debugbase.string.template(this.config.imgSrc, {
        n: i
      });
      html += this._img(imgSrc);
    }

    Debugbase_1.Debugbase.DOM.append(this._$contentContainer, html);

    if (this.config.activeCount >= this.config.total) {
      gsap.TweenMax.to(this._$button, 0.5, {
        autoAlpha: 0
      });
    }
  };

  LoadMore.prototype._img = function (src) {
    return "<div class='grid__item'>\n\t\t\t<div class='lazy-load-image -ratio-square'>\n\t\t\t\t<div class=\"lazy-load-image__inner\">\n\t\t\t\t\t<img src=\"" + src + "\">\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>";
  };

  return LoadMore;
}(Module_1.Module);

exports.LoadMore = LoadMore;

/***/ }),

/***/ "./src/app/module/work/WorkTileImagePixi.ts":
/*!**************************************************!*\
  !*** ./src/app/module/work/WorkTileImagePixi.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var WorkTileImagePixi =
/** @class */
function () {
  function WorkTileImagePixi(_$pixi, _$container, _config) {
    this._$pixi = _$pixi;
    this._$container = _$container;
    this._config = _config;
    this._mouseDownScale = 0;
    this._displayScale = 1;
    this._tweens = {};
    this._timeouts = {};
    this._fullRange = 0.2; //The amount the image is at 100% for

    this._config.scaleStart = 0.5;
    this._config.scaleEnd = 0.4;
    this._config.alphaStart = 0.01;
    this._config.alphaEnd = 0.01;
    this._config.startScaleRange = 1.0 - this._config.scaleStart;
    this._config.endScaleRange = 1.0 - this._config.scaleEnd;
    this._config.startAlphaRange = 1.0 - this._config.alphaStart;
    this._config.endAlphaRange = 1.0 - this._config.alphaEnd;
  } //Set the glow tint: 


  WorkTileImagePixi.prototype.setTint = function (tint) {
    this._tint = tint;
  }; //Set required textures: 


  WorkTileImagePixi.prototype.setTextures = function (textures) {
    this._textures = textures;
  }; //All dependies set so create the image: 


  WorkTileImagePixi.prototype.create = function () {
    this._createMaskedImage();

    this._createTintTweens();
  }; //Update the item ro animate 
  //Rotation of image is determined by velocity of movement and so passed in: 


  WorkTileImagePixi.prototype.update = function (progress, rotation, skipPixiUpdate) {
    if (rotation === void 0) {
      rotation = 0.0;
    }

    if (skipPixiUpdate === void 0) {
      skipPixiUpdate = false;
    }

    if (progress < 0.5 - this._fullRange / 2) {
      this._processedProgress = progress / (0.5 - this._fullRange / 2);
      this._scale = this._config.scaleStart + this._config.startScaleRange * this._processedProgress;
      this._alpha = this._config.alphaStart + this._config.startAlphaRange * this._processedProgress;
    } else if (progress > 0.5 + this._fullRange / 2) {
      progress -= 0.5 + this._fullRange / 2;
      this._processedProgress = progress / (0.5 + this._fullRange / 2);
      this._scale = 1.0 - this._processedProgress * this._config.endScaleRange;
      this._alpha = 1.0 - this._processedProgress * this._config.endAlphaRange;
    } else {
      this._scale = 1.0;
      this._alpha = 1.0;
    }

    if (skipPixiUpdate) {
      return;
    }

    if (this._mouseDownScale > 0) {
      this._mouseDownScale -= 0.015;
    }

    this._scale += this._mouseDownScale; //Set the state of the image: 
    //this._$image.alpha = this._alpha;
    //this._$image.scale.x = this._$image.scale.y = this._scale * this._displayScale;
    //this._$image.rotation = this._$mask.rotation = rotation;
    //this._$innerContainer.alpha = this._alpha;

    this._$blackout.alpha = 1.0 - this._alpha;

    this._$innerContainer.scale.set(this._scale * this._displayScale, this._scale * this._displayScale);

    this._$glow.scale.set(this._scale * this._displayScale, this._scale * this._displayScale);

    this._$blackout.scale.set(this._scale * this._displayScale, this._scale * this._displayScale);

    this._$glow.alpha = 0;
    this._$innerContainer.rotation = this._$glow.rotation = this._$blackout.rotation = rotation;
  }; //Zoom into project, save the tweens so they can reversved 


  WorkTileImagePixi.prototype.zoomToProject = function (instant, config, delay) {
    if (instant === void 0) {
      instant = false;
    }

    if (delay === void 0) {
      delay = 0.0;
    }

    this._$innerContainer.cacheAsBitmap = false;
    var tweenTime = instant ? 0.0 : 0.8;
    this._tweens.image = gsap.TweenMax.to(this._$image, tweenTime, {
      pixi: {
        scaleX: config.imageScale,
        scaleY: config.imageScale
      },
      ease: gsap.Power3.easeInOut,
      delay: delay
    });
    this._tweens.mask = gsap.TweenMax.to([this._$mask, this._$glow, this._$bevel, this._$blackout], tweenTime, {
      pixi: {
        scaleX: config.maskScaleX,
        scaleY: config.maskScaleY
      },
      ease: gsap.Power3.easeInOut,
      delay: delay
    });
    this._tweens.support = gsap.TweenMax.to([this._$innerContainer, this._$glow, this._$blackout], tweenTime, {
      x: config.imageX,
      y: config.imageY,
      ease: gsap.Power3.easeInOut,
      delay: delay,
      pixi: {
        scaleX: 1,
        scaleY: 1
      }
    });
    this._tweens.blackout = gsap.TweenMax.to(this._$blackout, tweenTime, {
      alpha: 0
    });
  }; //Exit out of a project 


  WorkTileImagePixi.prototype.zoomFromProject = function () {
    /*this._tweens.image.reverse();
    this._tweens.mask.reverse();
    this._tweens.support.reverse();
    this._tweens.blackout.reverse();
    */
    var _this = this; //Update the values based (Doesn't actually update display, but just gives access to the values)
    //this.update();

    /*
    this._tweens.image = gsap.TweenMax.to(this._$image,  0.8,
    {pixi: {scaleX: 1,  scaleY: 1}, ease: gsap.Power3.easeInOut, delay: 0,
    });
    this._tweens.mask = gsap.TweenMax.to([this._$mask, this._$glow, this._$bevel, this._$blackout],  0.8, {
    pixi: {scaleX: 1,  scaleY: 1} , ease: gsap.Power3.easeInOut, delay: 0,
    });
    this._tweens.support  = gsap.TweenMax.to([this._$innerContainer, this._$glow,  this._$blackout],  0.8,
    {x: this._availbleMaskSize.width / 2, y: this._availbleMaskSize.height / 2, ease: gsap.Power3.easeInOut, delay: 0,
    pixi: {scaleX: 1 * this._displayScale,  scaleY: 1 * this._displayScale},
    } );
    this._tweens.blackout  = gsap.TweenMax.to(this._$blackout,  0.8, {alpha: 0} );
    //Turning caching back on for the tile as transition will be complete:
    */


    this._tweens.image.reverse();

    this._tweens.mask.reverse();

    this._tweens.support.reverse();

    this._tweens.blackout.reverse();

    this._timeouts.zoom = setTimeout(function () {
      return _this._$innerContainer.cacheAsBitmap = true;
    }, 1000);
  }; //Get the native image sizes: 


  WorkTileImagePixi.prototype.getImageSizes = function () {
    return {
      width: this._$image.texture.width,
      height: this._$image.texture.height
    };
  }; //Get the native mask sizes: 


  WorkTileImagePixi.prototype.getMaskSizes = function () {
    return {
      width: this._$mask.texture.width,
      height: this._$mask.texture.height
    };
  }; //Get the display scale (Used to scale particle logic to keep relative to the main image): 


  WorkTileImagePixi.prototype.getDisplayScale = function () {
    return this._displayScale;
  };

  WorkTileImagePixi.prototype.getActualScale = function () {
    return this._scale * this._displayScale;
  };

  WorkTileImagePixi.prototype.setMouseDownScale = function (ratio) {
    this._mouseDownScale = ratio * 0.25;
  }; //Set the aviable mask size on resize: 


  WorkTileImagePixi.prototype.resize = function (availbleMaskSize, skipChanges) {
    if (skipChanges === void 0) {
      skipChanges = false;
    }

    this._availbleMaskSize = availbleMaskSize;

    this._setDisplayScale();

    if (skipChanges) {
      return;
    }

    this._positionImages();

    this._setContainerPivot();
  }; //Get the native mask sizes: 


  WorkTileImagePixi.prototype.getMaskAvailableSizes = function () {
    return this._availbleMaskSize;
  }; //Private 
  //--------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------
  //Add the masked image to the container:


  WorkTileImagePixi.prototype._createMaskedImage = function () {
    //Note: anchors 0.5 / 0.5  are set in spritesheet / texture packer for all 'particle' items
    this._$innerContainer = new PIXI.Container();
    this._$mask = new PIXI.Sprite(this._textures.mask);
    this._$bevel = new PIXI.Sprite(this._textures.bevel);
    this._$bevel.visible = false;
    this._$blackout = new PIXI.Sprite(this._textures.black);
    this._$glow = new PIXI.Sprite(this._textures.glow);
    this._$glow.tint = this._tint;
    this._$image = new PIXI.Sprite(this._textures.image);

    this._$image.anchor.set(0.5, 0.5);

    this._$image.mask = this._$mask;
    this._$image.interactive = true;
    this._$image.hitArea = new PIXI.Rectangle(0, 0, 100000, 100000);

    this._$image.on('mousedown', function () {
      return console.log('mouse down on tile');
    }).on('touchstart', function () {
      return console.log('touch on tile');
    });

    this._$mask.on('mousedown', function () {
      return console.log('mouse down on tile');
    }).on('touchstart', function () {
      return console.log('touch on tile');
    });

    this._$container.addChild(this._$glow, this._$innerContainer, this._$blackout);

    this._$innerContainer.addChild(this._$image, this._$mask, this._$bevel); //Scale and size image as needed


    this._setDisplayScale();

    this._positionImages(); //Cache the container


    this._$innerContainer.cacheAsBitmap = true;
  };

  WorkTileImagePixi.prototype._createTintTweens = function () {//this._tweens.imageLeft = TweenMax.fromTo(1, {}, {} );
    //this._tweens.imageRight = TweenMax.fromTo(1, {}, {} );
  }; //Set the pivot of the image/mask/dropshadow container 


  WorkTileImagePixi.prototype._setContainerPivot = function () {
    if (!this._$innerContainer) {
      return;
    }

    var bounds = this._$innerContainer.getBounds();

    this._$innerContainer.pivot.x = bounds.width / 2;
    this._$innerContainer.pivot.y = bounds.height / 2;
  }; //Scale the scaling so the image scaling will stay in sync


  WorkTileImagePixi.prototype._setDisplayScale = function () {
    var maskSize = this.getMaskSizes();

    if (!maskSize.width || !this._availbleMaskSize) {
      return;
    }

    this._displayScale = 1.0;

    if (maskSize.width > this._availbleMaskSize.width || maskSize.height > this._availbleMaskSize.height) {
      var wR = this._availbleMaskSize.width / maskSize.width;
      var hR = this._availbleMaskSize.height / maskSize.height;
      this._displayScale = hR < wR ? hR : wR;
    }
  }; //Position element in the middle of the area available for the mask on the Tile: 


  WorkTileImagePixi.prototype._positionImages = function () {
    if (!this._availbleMaskSize) {
      return;
    }

    this._$innerContainer.x = this._$glow.x = this._$blackout.x = this._availbleMaskSize.width / 2;
    this._$innerContainer.y = this._$glow.y = this._$blackout.y = this._availbleMaskSize.height / 2;
    this._$mask.x = this._$mask.scale.x * this._$mask.width / 2;
    this._$mask.y = this._$mask.scale.y * this._$mask.height / 2;
    this._$image.x = this._$bevel.x = this._$mask.x;
    this._$image.y = this._$bevel.y = this._$mask.y;

    this._$image.scale.set(0.65, 0.65);
  };

  WorkTileImagePixi.prototype._playZoomTween = function () {
    //Replaying so reverse last time: 
    this._tweens.image.reverse();

    this._tweens.mask.reverse();
  };

  return WorkTileImagePixi;
}();

exports.WorkTileImagePixi = WorkTileImagePixi;

/***/ }),

/***/ "./src/app/module/work/WorkTileParticlePixi.ts":
/*!*****************************************************!*\
  !*** ./src/app/module/work/WorkTileParticlePixi.ts ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var WorkTileParticlePixi =
/** @class */
function () {
  function WorkTileParticlePixi(_$pixi, _$container, config) {
    this._$pixi = _$pixi;
    this._$container = _$container;
    this._parallaxSpeed = 0;
    this._parallaxEasePower = 10;
    this._displayScale = 1;
    this._config = {
      texture: config.texture
    };
    var s = 1.0;
    this._config.scale = {
      value: s,
      start: !config.autoScale ? 1 : 0,
      end: !config.autoScale ? 1 : 0
    };
    this._config.scale.startRange = this._config.scale.value - this._config.scale.start;
    this._config.scale.endRange = this._config.scale.value - this._config.scale.end;
    s = 1;
    this._config.alpha = {
      value: 1,
      start: !config.autoAlpha ? 1 : 0,
      end: !config.autoAlpha ? 1 : 0
    };
    this._config.alpha.startRange = this._config.alpha.value - this._config.alpha.start;
    this._config.alpha.endRange = this._config.alpha.value - this._config.alpha.end;
    var x = 50 + Math.random() * 1000; //X/Y values need to be calculated releative to image:
    //TODO has releance on resize running to work - so fix. 

    this._config.x = {
      value: 0,
      start: 0,
      end: 0,
      org: config.xOrg
    };
    var startY = config.leftY ? config.leftY : config.yOrg;
    var endY = config.rightY ? config.rightY : config.yOrg;
    this._config.y = {
      value: 0,
      start: startY,
      end: endY,
      org: config.yOrg
    }; //var r = -180 + Math.random() * 180 * Math.PI / 180;

    var r = 0;
    this._config.rotation = {
      value: r,
      start: !config.autoRotate ? 0 : r + Math.random() * 60 * Math.PI / 180,
      end: !config.autoRotate ? 0 : r - Math.random() * 60 * Math.PI / 180
    };
    this._config.rotation.startRange = this._config.rotation.value - this._config.rotation.start;
    this._config.rotation.endRange = this._config.rotation.value - this._config.rotation.end; //Set the parallax speed if passed. Determinds how much the partcile will move on the x (to create a sense of parallax)

    if (config.speed) {
      this._parallaxSpeed = config.speed;
    }

    this._createParticle();
  } //Update the item ro animate 
  //Rotation of image is determined by velocity of movement and so passed in: 


  WorkTileParticlePixi.prototype.update = function (progress) {
    if (progress < 0.5) {
      this._processedProgress = progress / 0.5;
      this._scale = this._config.scale.start + this._config.scale.startRange * this._processedProgress;
      this._alpha = this._config.alpha.start + this._config.alpha.startRange * this._processedProgress;
      this._x = this._config.x.start - (this._config.x.startRange - this._config.x.startRange * this._processedProgress);
      this._y = this._config.y.value + this._config.y.startRange * (1.0 - this._processedProgress);
      this._rotation = this._config.rotation.start + this._config.rotation.startRange * this._processedProgress;
    } else {
      progress -= 0.5;
      this._processedProgress = progress / 0.5;
      this._scale = this._config.scale.value - this._processedProgress * this._config.scale.endRange;
      this._alpha = this._config.alpha.value - this._processedProgress * this._config.alpha.endRange;
      this._x = this._config.x.value + this._processedProgress * this._config.x.endRange;
      this._y = this._config.y.value - this._processedProgress * this._config.y.endRange;
      this._rotation = this._config.rotation.value - this._processedProgress * this._config.rotation.endRange;
    } //Set the state of the image:


    this._$image.alpha = this._alpha;

    this._$image.scale.set(this._scale * this._displayScale, this._scale * this._displayScale);

    this._$image.position.set(this._$image.x + (this._x - this._$image.x) / this._parallaxEasePower, this._y);

    this._$image.rotation = this._rotation;
  }; //App has been sized so save the new scale of the tile (As all partciles are scale and move relative to the image)


  WorkTileParticlePixi.prototype.resize = function (imageDisplayScale, imageSize, imageArea) {
    this._displayScale = imageDisplayScale;

    this._calculateParticlePositions(imageSize, imageArea);
  };
  /** Zoom to project on click */


  WorkTileParticlePixi.prototype.zoomToProject = function () {
    gsap.TweenMax.to(this._$image, 0.4, {
      pixi: {
        scaleY: 0,
        scaleX: 0,

        /*y: this._$image.y - 100,*/
        alpha: 0
      }
    });
  };
  /** Zoom back from project on close press */


  WorkTileParticlePixi.prototype.zoomFromProject = function () {
    gsap.TweenMax.to(this._$image, 0.5, {
      delay: 0.4,
      ease: gsap.Power3.easeOut,
      pixi: {
        scaleY: this._scale * this._displayScale,
        scaleX: this._scale * this._displayScale,
        alpha: 1
      }
    });
  }; //Private 
  //--------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------
  //Add the masked image to the container:


  WorkTileParticlePixi.prototype._createParticle = function () {
    this._$image = new PIXI.Sprite(this._config.texture);
    this._$image.anchor.x = 0.5;
    this._$image.anchor.y = 0.5;

    this._$container.addChild(this._$image);

    this._$image.x = this._config.x.value;
    this._$image.y = this._config.y.value;
  }; //Particle positions are calculated dynamically on every resize:


  WorkTileParticlePixi.prototype._calculateParticlePositions = function (imageSize, imageArea) {
    //Recalculate start/on/off x/y of paricles 
    //These are all set as relative to the center of the image space 
    this._config.x.value = imageArea.width / 2 + imageSize.width / 2 * this._config.x.org;
    this._config.y.value = imageArea.height / 2 + imageSize.height / 2 * this._config.y.org;
    this._config.x.start = this._config.x.value; //this._config.y.start = this._config.y.value;
    //Set the x and y ranges: 

    this._config.x.endRange = imageSize.width * this._parallaxSpeed; //Work out the end range of movement for +0.5 range 

    this._config.y.endRange = this._config.y.value - (imageArea.height / 2 + imageSize.height / 2 * this._config.y.end);
    this._config.x.startRange = imageSize.width * this._parallaxSpeed;
    this._config.y.startRange = imageArea.height / 2 + imageSize.height / 2 * this._config.y.start - this._config.y.value;
  };

  return WorkTileParticlePixi;
}();

exports.WorkTileParticlePixi = WorkTileParticlePixi;

/***/ }),

/***/ "./src/app/module/work/WorkTilePixi.ts":
/*!*********************************************!*\
  !*** ./src/app/module/work/WorkTilePixi.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var Debugbase_1 = __webpack_require__(/*! debugbase/Debugbase */ "./src/debugbase/Debugbase.ts");

var WorkTileImagePixi_1 = __webpack_require__(/*! ./WorkTileImagePixi */ "./src/app/module/work/WorkTileImagePixi.ts");

var WorkTileParticlePixi_1 = __webpack_require__(/*! ./WorkTileParticlePixi */ "./src/app/module/work/WorkTileParticlePixi.ts");

var WorkTilePixi =
/** @class */
function () {
  function WorkTilePixi(_pixi, _index, _data, _$workContainer, parentContainer) {
    this._pixi = _pixi;
    this._index = _index;
    this._data = _data;
    this._$workContainer = _$workContainer;
    this._particles = [];
    this._copyVisible = false;
    this._hitScale = 1;
    this._exploreProgressRatio = 0;
    this._width = 1000;
    this._height = 600;
    this.WIDTH_RATIO = 0.68;
    this.HEIGHT_RATIO = 0.68;
    this.MAX_WIDTH = 1200;
    this.MAX_HEIGHT = 900;
    this.MOBILE_BREAKPOINT = 800;
    this._progress = 0.0;
    this._disortProgress = 0.0;
    this._maxProgress = 2.0;
    this._progressFlip = 1.2;
    this._minProgress = -1.0;
    this._minProgressFlip = -0.2;
    this._velocityRotation = 0.0;
    this._hiddenForProject = false;
    this._isBlankSpacer = false;
    this._timeouts = {};
    this._tweens = {};
    this._intervals = {};
    this._indentationSizes = {
      ratio: 0.3,
      max: 200,
      value: 0
    }; //DEBUG 
    //-------------

    this._displayBackgroundGuide = false; //If Pixi is not set this is a 'blank' spacer 		

    if (!_pixi) {
      this._isBlankSpacer = true;
      return;
    }

    this._innerWidth = window.innerWidth;
    this._innerHeight = window.innerHeight;
    this._$pixi = _pixi.getPixi();
    this._$copy = parentContainer.querySelector(".worktitle__copy.-index" + _index);
    this._$exploreProgress = this._$copy.querySelector(".ui__explore__progress"); //if ( !this._testCopyIsValidElement() ) {
    //	this._isBlankSpacer = true;
    //}
  } //Set the spritesheet refs to load backgrounds and images from 


  WorkTilePixi.prototype.setSpriteSheets = function (particles, backgrounds) {
    this._spritesheets = {
      particles: particles,
      backgrounds: backgrounds
    };
  };
  /** Set the hit area for the space over the tile */


  WorkTilePixi.prototype.setHitarea = function (area) {
    var _this = this;

    this._$hitarea = area;

    if (this._$hitarea) {
      this._$hitarea.config.onUpdate = function (updateOb) {
        _this._maskedimage.setMouseDownScale(updateOb.ratio);

        _this._exploreProgressRatio = updateOb.ratio;
        _this._$exploreProgress.style.transform = "scaleX(" + _this._exploreProgressRatio + ")";
      };

      this._$hitarea.config.onComplete = function (data) {
        _this.onExploreProject(data);
      };
    }
  };

  Object.defineProperty(WorkTilePixi.prototype, "isVisible", {
    get: function get() {
      return this._$container && this._$container.visible;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(WorkTilePixi.prototype, "hitAreaMouseDown", {
    get: function get() {
      return this._$hitarea && this._$hitarea.mouseIsDown;
    },
    enumerable: true,
    configurable: true
  }); //Create the tile 

  WorkTilePixi.prototype.create = function () {
    this._createContainer(); //Add partciles below, then image, then top partciles: 


    this._createParticles(-1);

    this._createMaskedImage();

    this._createParticles(1); //Trigger resize to make sure everything is in place: 


    this.resize();
  }; ///Set the 


  WorkTilePixi.prototype.setTimelineProgress = function (ratio, skipchecks) {
    if (skipchecks === void 0) {
      skipchecks = false;
    }

    if (this._isBlankSpacer) {
      return;
    } //Exit if ratio has not changed: 


    if (!skipchecks) {
      if (ratio === this._progress || this._projectActive) {
        return;
      }
    }

    if (this._exploreProgressRatio > 0 && !this.hitAreaMouseDown) {
      this._exploreProgressRatio = Math.max(0, this._exploreProgressRatio - 0.05);
      this._$exploreProgress.style.transform = "scaleX(" + this._exploreProgressRatio + ")";
    }

    this._progress = ratio; //Update animation progress and set container visible: 

    this._animate(this._progress);

    this._setContainerVisible(this._progress);

    this._setCopyVisible(this._progress);
  };

  WorkTilePixi.prototype.resize = function (skipChanges) {
    if (skipChanges === void 0) {
      skipChanges = false;
    }

    if (this._isBlankSpacer) {
      return;
    } //Set the height and width refs: 


    this._innerWidth = window.innerWidth;
    this._innerHeight = window.innerHeight; //Size the tile to fit layout and other dependant sizes: 

    this._resizeTile();

    this._resizeMaskArea(skipChanges);

    this._resizePartciles();

    this._setContainerX(this._progress);

    this._setContainerY();

    this._setCopyX();

    this._setHitAreaPosition();

    this._animate(this._progress);
  };

  WorkTilePixi.prototype.animateToProject = function () {
    this._projectActive = true;

    this._zoomToProject();

    Debugbase_1.Debugbase.DOM.removeClass(this._$copy, '-show');
  };

  WorkTilePixi.prototype.backFromProject = function () {
    var _this = this;

    this._zoomFromProject();

    this._timeouts.projectActive = setTimeout(function () {
      return _this._projectActive = false;
    }, 1000);
    this._timeouts.showDOM = setTimeout(function () {
      return Debugbase_1.Debugbase.DOM.addClass(_this._$copy, '-show');
    }, 500);
  };
  /** Flag mouse/touch down for hit area */


  WorkTilePixi.prototype.mouseDown = function (cords) {
    if (this._$hitarea) {
      this._$hitarea.startMouseDown(cords);
    }
  };

  WorkTilePixi.prototype.mouseUp = function () {
    if (this._$hitarea) {
      this._$hitarea.mouseUp();
    }
  };
  /** Flag mouse move for hit area */


  WorkTilePixi.prototype.updateMouseCords = function (cords) {
    if (this._$hitarea.mouseIsDown) {
      this._$hitarea.updateMouseCords(cords);
    }
  }; //Reset methods -------------------------------------------------------------

  /** All transitions in never show timeline item so just need one to reset to default state: */


  WorkTilePixi.prototype.reset = function () {
    Debugbase_1.Debugbase.DOM.removeClass(this._$copy, '-show');
  }; //-----------------------------------------------------------------------------


  WorkTilePixi.prototype.hideForProject = function () {
    var _this = this;

    this._hiddenForProject = true;
    gsap.TweenMax.to(this._$container, 0.2, {
      alpha: 0,
      onComplete: function onComplete() {
        return _this._$container.visible = false;
      },
      ease: gsap.Power0.easeNone
    });
  };
  /** Reset deep settings on the tile. Called after a user moves away from project using deeplink methods (NAV, logom, etc) */


  WorkTilePixi.prototype.resetForProject = function () {
    this._hiddenForProject = false;
    this._$container.visible = true;
    gsap.TweenMax.set(this._$container, {
      alpha: 1
    }); //HAck, animate the project to set the animation state...

    if (this._projectActive) {
      this._zoomFromProject();
    }

    this._projectActive = false;
  };

  WorkTilePixi.prototype.showFromProject = function () {
    this._hiddenForProject = false;
    this._$container.visible = true, gsap.TweenMax.to(this._$container, 0.4, {
      alpha: 1,
      delay: 0.4,
      ease: gsap.Power0.easeNone
    });
  };

  WorkTilePixi.prototype.setVelocityRotation = function (rotation) {
    if (this._isBlankSpacer) {
      return;
    }

    this._velocityRotation = rotation;
  }; //private 
  //-------------------------------------------------------------
  //-------------------------------------------------------------
  //-------------------------------------------------------------
  //-------------------------------------------------------------
  //The tile has a 'virtual' size. This can be seen by setting _displayBackgroundGuide to true


  WorkTilePixi.prototype._resizeTile = function () {
    //Set width / height to limits 
    //TODO - may need to be keept to fixed ratio 
    this._width = this.WIDTH_RATIO * this._innerWidth < this.MAX_WIDTH ? this.WIDTH_RATIO * this._innerWidth : this.MAX_WIDTH;
    this._height = this.HEIGHT_RATIO * this._innerHeight < this.MAX_HEIGHT ? this.HEIGHT_RATIO * this._innerHeight : this.MAX_HEIGHT;

    if (Debugbase_1.Debugbase.system.isSmallDevice) {
      this._width = this._innerWidth * 1.5;
    }

    if (this._displayBackgroundGuide && this._$bgGraphicGuide) {
      this._renderBackgroundGuide();
    }
  }; //Set the availble mask area on the tile 
  //Sizes differently at breakpoints to allow for mobile / desktop 


  WorkTilePixi.prototype._resizeMaskArea = function (skipChanges) {
    if (skipChanges === void 0) {
      skipChanges = false;
    } //Assume desktop size, 60% width:


    var wR = 0.6;
    var hR = 1.0; //On mobile then switch to a portriat layout on 

    if (Debugbase_1.Debugbase.system.isPortraitDevice) {
      wR = 1.0;
      hR = 0.6;
    }

    this._maskArea = {
      width: this._width * wR,
      height: this._height * hR
    };

    this._maskedimage.resize(this._maskArea, skipChanges);
  }; //Resize the partciles relative to the image: 


  WorkTilePixi.prototype._resizePartciles = function () {
    var _this = this;

    var imageDisplayScale = this._maskedimage.getDisplayScale();

    var currentImageSize = this._maskedimage.getMaskSizes(); //Correct the image size to allow for scale: 


    currentImageSize.width *= imageDisplayScale;
    currentImageSize.height *= imageDisplayScale;

    this._particles.forEach(function (particle) {
      particle.resize(imageDisplayScale, currentImageSize, _this._maskArea);
    });
  }; //Add the tile container to PIXI stage:


  WorkTilePixi.prototype._createContainer = function () {
    this._$container = new PIXI.Container(); //this._$container.interactive = false;
    //this._$container.interactiveChildren = false;

    this._$container.visible = false;

    this._$workContainer.addChild(this._$container);

    if (this._displayBackgroundGuide) {
      this._$bgGraphicGuide = new PIXI.Graphics();

      this._$container.addChild(this._$bgGraphicGuide);

      this._renderBackgroundGuide();
    }

    this._$workContainer.visible = true;
  }; //Render the background guide to size of tile: 


  WorkTilePixi.prototype._renderBackgroundGuide = function () {
    //let colours = [0x9b59b6, 0xf1c40f, 0xe74c3c, 0x9b59b6];
    var colours = [0x333333, 0x333333, 0x333333, 0x333333, 0x333333, 0x333333, 0x333333, 0x333333];

    this._$bgGraphicGuide.clear();

    this._$bgGraphicGuide.beginFill(colours[this._index]); // Purple
    // Draw a rectangle


    this._$bgGraphicGuide.drawRect(60, 100, this._width, this._height - 220); // drawRect(x, y, width, height)


    this._$bgGraphicGuide.endFill();

    this._$bgGraphicGuide.alpha = 0.4;
  }; //Add the masked image to stage. Handles it's own timeline and exit timeline


  WorkTilePixi.prototype._createMaskedImage = function () {
    var config = {};
    this._maskedimage = new WorkTileImagePixi_1.WorkTileImagePixi(this._$pixi, this._$container, config);

    this._maskedimage.setTint(this._data.tint);

    this._maskedimage.setTextures({
      'image': this._spritesheets.backgrounds.textures[this._data.image],
      'mask': this._spritesheets.particles.textures['mask.png'],
      //'mask': this._spritesheets.particles.textures['mask-square.png'],
      'bevel': this._spritesheets.particles.textures['bevel.png'],
      'black': this._spritesheets.particles.textures['black.png'],
      'glow': this._spritesheets.particles.textures['glow.png']
    });

    this._maskedimage.create();
  };
  /** Add the masked image to stage. Handles it's own timeline and exit timeline. Pass depth to create layering */


  WorkTilePixi.prototype._createParticles = function (depth) {
    var _this = this;

    if (depth === void 0) {
      depth = 1;
    }

    this._data.particles.forEach(function (particle) {
      if (depth === particle.depth) {
        var config = {
          texture: _this._spritesheets.particles.textures[particle.texture],
          xOrg: particle.x,
          yOrg: particle.y,
          speed: particle.speed,
          autoScale: particle.autoScale,
          autoRotate: particle.autoRotate,
          autoAlpha: particle.autoAlpha
        };

        if (particle.leftY) {
          config.leftY = particle.leftY;
        }

        if (particle.rightY) {
          config.rightY = particle.rightY;
        }

        var particlePixi = new WorkTileParticlePixi_1.WorkTileParticlePixi(_this._$pixi, _this._$container, config);

        _this._particles.push(particlePixi);
      }
    });
  };

  WorkTilePixi.prototype._animate = function (progres) {
    if (this._$container.visible) {
      //Move the cotainer left to right <--------->
      this._setContainerX(progres);

      this._setCopyX();

      this._setHitAreaPosition(); //Update the inner elements of the tile so they can handle their own motion/scale/alpha: 


      var progressContained_1 = Debugbase_1.Debugbase.math.constrain(progres, 0, 1.0);

      this._maskedimage.update(progressContained_1, this._velocityRotation);

      this._particles.forEach(function (particle) {
        particle.update(progressContained_1);
      });

      if (this._$bgGraphicGuide) {
        this._$bgGraphicGuide.scale.y = 1 - Math.abs(0.5 - progressContained_1) * 2;
        this._$bgGraphicGuide.y = 300 * (1 - this._$bgGraphicGuide.scale.y);
      } //		this._$bgGraphicGuide

    }
  };

  WorkTilePixi.prototype._setContainerVisible = function (progress) {
    if (this._hiddenForProject) {
      return;
    }

    if (this._$container.visible && (progress < -0.2 || progress > 1.4)) {
      this._$container.visible = false;
    } else if (!this._$container.visible && progress >= -0.2 && progress <= 1.4) {
      this._$container.visible = true;
    }
  }; //Create the main slide timeline
  //------------------------------------------------------------
  //Because of sizing / design issues position the main continer with pixel rather than percetages: 
  //At 0.0 it will be off left but showing ident 
  //At ~-0.1 it will hidden fully 
  //At 0.5 there will be no transform applied and will be middle of screen
  //At 1 it will be off right but showing ident 
  ///At ~1.1 it will be off right hidden


  WorkTilePixi.prototype._setContainerX = function (progress) {
    this._$container.x = Debugbase_1.Debugbase.math.getRangeRatio(progress, -1 * this._width, this._innerWidth);
  };

  WorkTilePixi.prototype._setContainerY = function () {
    this._$container.y = Debugbase_1.Debugbase.system.isPortraitDevice ? 270 : (this._innerHeight - 60 - this._height) / 2;
  }; //Set in the copy visible: 


  WorkTilePixi.prototype._setCopyVisible = function (processProgress) {
    if (this._copyVisible && (processProgress < 0.25 || processProgress > 0.65)) {
      this._copyVisible = false;
      Debugbase_1.Debugbase.DOM.removeClass(this._$copy, '-show');

      this._setCopyDisplay('none', 400);
    } else if (!this._copyVisible && processProgress >= 0.25 && processProgress <= 0.65) {
      this._copyVisible = true;
      Debugbase_1.Debugbase.DOM.addClass(this._$copy, '-show');

      this._setCopyDisplay('block', 0);
    }
  }; //Move the copy in sync with the container: 


  WorkTilePixi.prototype._setCopyX = function () {
    this._copyX = Debugbase_1.Debugbase.system.isPortraitDevice ? 40 : this._$container.x + this._width * 0.63;

    if (this._$container.visible && this._copyX < this._innerWidth + 100 && this._copyX > -400) {
      this._copyY = Debugbase_1.Debugbase.system.isPortraitDevice ? '0%' : '-50%';
      this._$copy.style.transform = "translateX(" + this._copyX + "px) translateY(" + this._copyY + ")";
    }
  }; //Set the display state on a timer to allow transition (Having it on page creates redraws layers)


  WorkTilePixi.prototype._setCopyDisplay = function (display, time) {
    var _this = this;

    clearTimeout(this._hitCopyInt);

    if (time === 0) {
      this._$copy.style.display = display;
      return;
    }

    this._hitCopyInt = setTimeout(function () {
      _this._$copy.style.display = display;
    }, time);
  };
  /** Set hit area position */


  WorkTilePixi.prototype._setHitAreaPosition = function () {
    if (!this._$hitarea) {
      return;
    }

    this._hitX = !Debugbase_1.Debugbase.system.isPortraitDevice ? this._$container.x + this._width * 0.30 : this._$container.x + this._width * 0.5;
    this._hitY = !Debugbase_1.Debugbase.system.isPortraitDevice ? '69%' : '59%';

    this._$hitarea.setPosition(this._hitX, this._hitY, this._maskedimage.getActualScale());
  };

  WorkTilePixi.prototype._zoomToProject = function (instant) {
    if (instant === void 0) {
      instant = false;
    }

    var config = this._getZoomConfig();

    var tileTime = instant ? 0.0 : 0.8;
    this._zoomTween = gsap.TweenMax.to(this._$container, tileTime, {
      pixi: {
        x: config.tileX,
        y: config.tileY
      },
      ease: gsap.Power3.easeInOut,
      delay: 0
    });

    this._maskedimage.zoomToProject(instant, config);

    this._particles.forEach(function (particle) {
      particle.zoomToProject();
    }); //Save to the pixi controller the sizes of the image, they are needed to match the full screen video on the project
    //Debugbase.math.getBestFitScale(this._maskedimage.getImageSizes(),  {width: this._innerWidth, height: this._innerHeight}), 


    var imageSizes = this._maskedimage.getImageSizes();

    this._pixi.setProjectHeaderSize({
      width: config.imageScale * imageSizes.width,
      height: config.imageScale * imageSizes.height
    });
  }; //Zoom back from the project on exit press: 


  WorkTilePixi.prototype._zoomFromProject = function () {
    this._zoomTween.reverse();

    this._maskedimage.zoomFromProject();

    this._particles.forEach(function (particle) {
      particle.zoomFromProject();
    });
  }; //Get the config for a project zoom: 


  WorkTilePixi.prototype._getZoomConfig = function () {
    var maskSizes = this._maskedimage.getMaskSizes();

    return {
      tileX: this._innerWidth / 2 - this._width / 2,
      tileY: this._innerHeight / 2 - this._height / 2,
      imageX: this._width / 2,
      imageY: this._height / 2,
      //Fit image to full scale and width: 
      imageScale: Debugbase_1.Debugbase.math.getBestFitScale(this._maskedimage.getImageSizes(), {
        width: this._innerWidth,
        height: this._innerHeight
      }),
      //Mask width / height. Allow 5% extra for curve edge
      maskScaleX: (this._innerWidth + this._innerWidth * 0.05) / maskSizes.width,
      maskScaleY: (this._innerHeight + this._innerHeight * 0.05) / maskSizes.height
    };
  };
  /** Check copy is a valid element
  * @throws {Error}
  * @returns {boolean}
  */


  WorkTilePixi.prototype._testCopyIsValidElement = function () {
    if (!this._$copy) {
      try {
        throw new Error("Work tile is not valid. Index = " + this._index + ". Check HTML exsists in template");
      } catch (e) {
        console.log(e);
      }

      return false;
    }

    return true;
  };

  return WorkTilePixi;
}();

exports.WorkTilePixi = WorkTilePixi;

/***/ }),

/***/ "./src/app/services/debug/ComplexLoggerService.ts":
/*!********************************************************!*\
  !*** ./src/app/services/debug/ComplexLoggerService.ts ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");

var ComplexLoggerService =
/** @class */
function () {
  function ComplexLoggerService() {}

  ComplexLoggerService.prototype.log = function (mgs) {
    console.log(mgs);
  };

  ComplexLoggerService.prototype.logToString = function (mgs) {
    console.log('logToString ', mgs);
  };

  ComplexLoggerService = __decorate([inversify_1.injectable()], ComplexLoggerService);
  return ComplexLoggerService;
}();

exports.ComplexLoggerService = ComplexLoggerService;

/***/ }),

/***/ "./src/app/services/debug/LoggerService.ts":
/*!*************************************************!*\
  !*** ./src/app/services/debug/LoggerService.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __metadata = this && this.__metadata || function (k, v) {
  if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");

var types_1 = __webpack_require__(/*! types */ "./src/types.ts");

var LoggerService =
/** @class */
function () {
  function LoggerService() {}

  LoggerService.prototype.log = function (mgs) {
    this._complexLogger.logToString(mgs);
  };

  __decorate([inversify_1.inject(types_1.TYPES.ComplexLogger), __metadata("design:type", Object)], LoggerService.prototype, "_complexLogger", void 0);

  LoggerService = __decorate([inversify_1.injectable()], LoggerService);
  return LoggerService;
}();

exports.LoggerService = LoggerService;

/***/ }),

/***/ "./src/debugbase/Debugbase.ts":
/*!************************************!*\
  !*** ./src/debugbase/Debugbase.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
}); //V1.0.0
//Static singleton style 
//Creates and instance of the app and allows access to 
//Debugbase.state.set('project.title', 'Market Masters');

var DebugbaseApp_1 = __webpack_require__(/*! ./DebugbaseApp */ "./src/debugbase/DebugbaseApp.ts");

var Debugbase =
/** @class */
function () {
  function Debugbase() {}

  Object.defineProperty(Debugbase, "controller", {
    get: function get() {
      return Debugbase.app.controller;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Debugbase, "route", {
    get: function get() {
      return Debugbase.app.route;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Debugbase, "state", {
    get: function get() {
      return Debugbase.app.state;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Debugbase, "module", {
    get: function get() {
      return Debugbase.app.module;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Debugbase, "behaviour", {
    get: function get() {
      return Debugbase.app.behaviour;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Debugbase, "DOM", {
    get: function get() {
      return Debugbase.app.DOM;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Debugbase, "string", {
    get: function get() {
      return Debugbase.app.string;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Debugbase, "math", {
    get: function get() {
      return Debugbase.app.math;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Debugbase, "framework", {
    get: function get() {
      return Debugbase.app.framework;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Debugbase, "system", {
    get: function get() {
      return Debugbase.app.system;
    },
    enumerable: true,
    configurable: true
  });

  Debugbase.init = function () {
    Debugbase.app.init();
  };

  return Debugbase;
}();

exports.Debugbase = Debugbase;

if (!Debugbase.app) {
  Debugbase.app = new DebugbaseApp_1.DebugbaseApp();
}

/***/ }),

/***/ "./src/debugbase/DebugbaseApp.ts":
/*!***************************************!*\
  !*** ./src/debugbase/DebugbaseApp.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
}); //V1.0.0
//Instance of a debugbase app 
//Creates instances of the main helpers and 

__webpack_require__(/*! reflect-metadata */ "./node_modules/reflect-metadata/Reflect.js");

var ControllerManager_1 = __webpack_require__(/*! debugbase/managers/ControllerManager */ "./src/debugbase/managers/ControllerManager.ts");

var RouteManager_1 = __webpack_require__(/*! debugbase/managers/RouteManager */ "./src/debugbase/managers/RouteManager.ts");

var StateManager_1 = __webpack_require__(/*! debugbase/managers/StateManager */ "./src/debugbase/managers/StateManager.ts");

var ModuleManager_1 = __webpack_require__(/*! debugbase/managers/ModuleManager */ "./src/debugbase/managers/ModuleManager.ts");

var BehaviourManager_1 = __webpack_require__(/*! debugbase/managers/BehaviourManager */ "./src/debugbase/managers/BehaviourManager.ts"); //import {EventsManager} from  'debugbase/managers/EventsManager';


var SystemHelper_1 = __webpack_require__(/*! debugbase/helper/SystemHelper */ "./src/debugbase/helper/SystemHelper.ts");

var DOMHelper_1 = __webpack_require__(/*! debugbase/helper/DOMHelper */ "./src/debugbase/helper/DOMHelper.ts");

var StringHelper_1 = __webpack_require__(/*! debugbase/helper/StringHelper */ "./src/debugbase/helper/StringHelper.ts");

var MathHelper_1 = __webpack_require__(/*! debugbase/helper/MathHelper */ "./src/debugbase/helper/MathHelper.ts");

var FrameworkHelper_1 = __webpack_require__(/*! debugbase/helper/FrameworkHelper */ "./src/debugbase/helper/FrameworkHelper.ts");

var Events_1 = __webpack_require__(/*! debugbase/events/Events */ "./src/debugbase/events/Events.ts");

var inversify_config_1 = __webpack_require__(/*! inversify.config */ "./src/inversify.config.ts");

var types_1 = __webpack_require__(/*! types */ "./src/types.ts");

var DebugbaseApp =
/** @class */
function () {
  function DebugbaseApp() {
    this.count = 0;
    Events_1.Events.init();

    this._createContainer();

    this._createManagers();

    this._addListeners();
  }

  DebugbaseApp.prototype.init = function () {
    this._controllerManager.init();

    this._routeManager.init();
  };

  Object.defineProperty(DebugbaseApp.prototype, "controller", {
    get: function get() {
      return this._controllerManager;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(DebugbaseApp.prototype, "route", {
    get: function get() {
      return this._routeManager;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(DebugbaseApp.prototype, "state", {
    get: function get() {
      return this._stateManager;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(DebugbaseApp.prototype, "behaviour", {
    get: function get() {
      return this._behaviourManager;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(DebugbaseApp.prototype, "module", {
    get: function get() {
      return this._moduleManager;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(DebugbaseApp.prototype, "DOM", {
    get: function get() {
      return this._domHelper;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(DebugbaseApp.prototype, "string", {
    get: function get() {
      return this._stringHelper;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(DebugbaseApp.prototype, "math", {
    get: function get() {
      return this._mathHelper;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(DebugbaseApp.prototype, "framework", {
    get: function get() {
      return this._frameworkHelper;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(DebugbaseApp.prototype, "system", {
    get: function get() {
      return this._systemHelper;
    },
    enumerable: true,
    configurable: true
  });

  DebugbaseApp.prototype._createManagers = function () {
    this._controllerManager = new ControllerManager_1.ControllerManager();
    this._routeManager = new RouteManager_1.RouteManager();
    this._routeManager.controllerManager = this._controllerManager;
    this._stateManager = new StateManager_1.StateManager();
    this._moduleManager = new ModuleManager_1.ModuleManager();
    this._behaviourManager = new BehaviourManager_1.BehaviourManager();
    this._systemHelper = new SystemHelper_1.SystemHelper();
    this._stringHelper = new StringHelper_1.StringHelper();
    this._mathHelper = new MathHelper_1.MathHelper(); //this._eventsManager = new EventsManager();

    this._domHelper = new DOMHelper_1.DOMHelper();
    this._frameworkHelper = new FrameworkHelper_1.FrameworkHelper();
  }; //Add high level listeners: 


  DebugbaseApp.prototype._addListeners = function () {
    Events_1.Events.ready(this._onDOMReady.bind(this));
    Events_1.Events.tick(this._onTick.bind(this));
    Events_1.Events.DOMUpdate(this._onDOMUpdate.bind(this));
    Events_1.Events.scroll(this._onScroll.bind(this));
    Events_1.Events.resize(this._onResize.bind(this));
  }; //Heartbeat ticker: 


  DebugbaseApp.prototype._onTick = function () {
    this._moduleManager.tick();

    this._controllerManager.tick();
  };

  DebugbaseApp.prototype._onDOMReady = function () {
    this._controllerManager.DOMReady();

    this._moduleManager.DOMReady(); //this._behaviourManager.DOMReady();

  };

  DebugbaseApp.prototype._onDOMUpdate = function () {
    this._controllerManager.DOMUpdated();

    this._moduleManager.DOMUpdated(); //this._behaviourManager.DOMUpdated();

  };

  DebugbaseApp.prototype._onScroll = function (y) {
    this._domHelper.scroll(y);

    this._controllerManager.scroll(y);

    this._moduleManager.scroll(y); //this._behaviourManager.scroll(y);

  };

  DebugbaseApp.prototype._onResize = function (sizes) {
    this._systemHelper.resize();

    this._domHelper.resize(sizes);

    this._controllerManager.resize(sizes);

    this._moduleManager.resize(sizes); //this._behaviourManager.resize(sizes);

  };

  DebugbaseApp.prototype._createContainer = function () {
    this._LoggerService = inversify_config_1.iocContainer.get(types_1.TYPES.Logger);

    this._LoggerService.log('Hello');
  };

  return DebugbaseApp;
}();

exports.DebugbaseApp = DebugbaseApp;

/***/ }),

/***/ "./src/debugbase/abstract/Controller.ts":
/*!**********************************************!*\
  !*** ./src/debugbase/abstract/Controller.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
}); //v1.0 
//AbstractController that controllers can extend to get key functionality 

var Debugbase_1 = __webpack_require__(/*! ../Debugbase */ "./src/debugbase/Debugbase.ts");

var Controller =
/** @class */
function () {
  //public tags: Array<string>; 
  function Controller(id) {
    this.global = false;
    this.DOMIsReady = false;
    this.app = Debugbase_1.Debugbase;
    this.id = id;
    this.state = Debugbase_1.Debugbase.state;
    this.DOM = Debugbase_1.Debugbase.DOM;
    this.math = Debugbase_1.Debugbase.math;
    this.module = Debugbase_1.Debugbase.module;
    this.system = Debugbase_1.Debugbase.system;
  } //Public 
  //--------------------------------------------------------------
  //--------------------------------------------------------------
  //Triggered when the DOM is ready:


  Controller.prototype.init = function (params) {};

  ;

  Controller.prototype.DOMReady = function () {};

  ;

  Controller.prototype.DOMUpdated = function () {};

  ;

  Controller.prototype.modulesMounted = function () {};

  ;

  Controller.prototype.resize = function () {};

  ;

  Controller.prototype.scroll = function (windowY) {};

  ;

  Controller.prototype.reset = function (previouState, isDeeplink) {
    if (isDeeplink === void 0) {
      isDeeplink = false;
    }
  };

  ;

  Controller.prototype.show = function (previouState, isDeeplink) {
    if (isDeeplink === void 0) {
      isDeeplink = false;
    }
  };

  ;

  Controller.prototype.hide = function (nextState) {};

  ;

  Controller.prototype.tick = function () {};

  ;

  Controller.prototype.pause = function () {};

  ;

  Controller.prototype.unpause = function () {};

  ;

  Controller.prototype.DOMReadyCore = function () {
    if (this.containerSelector) {
      this.container = document.querySelector(this.containerSelector);
    }

    this.DOMIsReady = true;
    this.DOMReady();
  };

  Controller.prototype.destory = function () {
    this.id = null;
    this.app = null;
    this.state = null;
    this.module = null;
  }; //Protected 
  //--------------------------------------------------------------
  //--------------------------------------------------------------
  //Allows other controllers to get refernces to other controllers
  //Allow any so controllers can just be instance of anything: 


  Controller.prototype.get = function (controllerId) {
    return Debugbase_1.Debugbase.controller.get(controllerId);
  };

  Controller.prototype.all = function () {
    //return Debugbase.controller.all();
    return null;
  };

  return Controller;
}();

exports.Controller = Controller;

/***/ }),

/***/ "./src/debugbase/abstract/DebugEvent.ts":
/*!**********************************************!*\
  !*** ./src/debugbase/abstract/DebugEvent.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var DebugEvent =
/** @class */
function () {
  function DebugEvent(parameters) {
    if (parameters === void 0) {
      parameters = null;
    }

    for (var i in parameters) {
      this[i] = parameters[i];
    }
  }

  Object.defineProperty(DebugEvent.prototype, "eventNameFromStatic", {
    /**
    * Get event name from the child item ('this' can used get static values in Typescript)
    * @return {string} eventName
    */
    get: function get() {
      return this.constructor['eventName'];
    },
    enumerable: true,
    configurable: true
  });
  return DebugEvent;
}();

exports.DebugEvent = DebugEvent;

/***/ }),

/***/ "./src/debugbase/abstract/Module.ts":
/*!******************************************!*\
  !*** ./src/debugbase/abstract/Module.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var Debugbase_1 = __webpack_require__(/*! ../Debugbase */ "./src/debugbase/Debugbase.ts");

var Module =
/** @class */
function () {
  function Module() {
    this.mounted = false;
    this.destroyed = false;
    this.removed = false;
    this.active = true;
    this.config = {};
    this.state = Debugbase_1.Debugbase.state;
    this.math = Debugbase_1.Debugbase.math;
    this.DOM = Debugbase_1.Debugbase.DOM;
    this.system = Debugbase_1.Debugbase.system;
  }

  Module.prototype.create = function () {};

  Module.prototype.tick = function () {};

  Module.prototype.DOMReady = function () {};

  Module.prototype.destroy = function () {
    this.state = null;
    this.DOM = null;
    this.system = null;
    this.math = null;
  };

  Module.prototype.scroll = function (windowY) {};

  Module.prototype.resize = function (sizes) {}; //Convert an elements attributes to 


  Module.prototype.attributesToConfig = function (prefix, item, element) {
    if (item === void 0) {
      item = null;
    }

    if (element === void 0) {
      element = null;
    }

    if (!element && this.$container) {
      element = this.$container;
    }

    if (!item) {
      item = this;
    }

    if (!element) {
      return;
    }
  };

  Module.prototype._onDOMReady = function () {
    this.attributesToConfig(this.moduleName);
    this.DOMReady();

    this._onMounted();
  };

  Module.prototype._onMounted = function () {};

  return Module;
}();

exports.Module = Module;

/***/ }),

/***/ "./src/debugbase/events/CoreEvents.ts":
/*!********************************************!*\
  !*** ./src/debugbase/events/CoreEvents.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var CoreEvents =
/** @class */
function () {
  function CoreEvents() {}

  CoreEvents.READY = 'READY';
  CoreEvents.SCROLL = 'SCROLL';
  CoreEvents.RESIZE = 'RESIZE';
  CoreEvents.TICK = 'TICK';
  CoreEvents.DOM_READY = 'DOM_READY';
  CoreEvents.DOM_UPDATED = 'DOM_UPDATED';
  CoreEvents.MODULE_MOUNTED = 'MODULE_MOUNTED';
  CoreEvents.MODULES_MOUNTED = 'MODULES_MOUNTED';
  CoreEvents.MODULE_DESTOYED = 'MODULE_DESTOYED';
  CoreEvents.BEHAVIOUR_MOUNTED = 'BEHAVIOUR_MOUNTED';
  return CoreEvents;
}();

exports.CoreEvents = CoreEvents;

/***/ }),

/***/ "./src/debugbase/events/EventListener.ts":
/*!***********************************************!*\
  !*** ./src/debugbase/events/EventListener.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var delegated_events_1 = __webpack_require__(/*! delegated-events */ "./node_modules/delegated-events/dist/index.esm.js");

var SelectorTypes;

(function (SelectorTypes) {
  SelectorTypes[SelectorTypes["STRING"] = 0] = "STRING";
  SelectorTypes[SelectorTypes["ELEMENT"] = 1] = "ELEMENT";
  SelectorTypes[SelectorTypes["NODE_LIST"] = 2] = "NODE_LIST";
})(SelectorTypes || (SelectorTypes = {}));

var EventListener =
/** @class */
function () {
  function EventListener(type, action, selector, settings) {
    if (selector === void 0) {
      selector = null;
    }

    if (settings === void 0) {
      settings = null;
    }

    this.type = type;
    this.action = action;
    this.selector = selector;
    this.selectorType = null; //If an Event on an actual element like a click then 

    if (this.selector !== null) {
      this.selectorType = this._getSelectorType(this.selector);

      this._on();
    }

    if (this.action) {
      this._actionAsString = this.action.toString();
    }
  }

  EventListener.prototype.destroy = function () {
    if (this.selectorType !== null) {
      this._off();
    }

    this.type = null;
    this.selector = null;
    this.action = null;
    this._actionAsString = null;
  };

  EventListener.prototype.dispatch = function (data, settings) {
    var _this = this;

    if (data === void 0) {
      data = null;
    }

    if (settings === void 0) {
      settings = null;
    }

    if (settings && settings.delay) {
      setTimeout(function () {
        return _this.action(data);
      }, settings.delay * 1000);
      return;
    } //Hit the callback straight away: 


    this.action(data);
  };

  EventListener.prototype.match = function (type, selector, action) {
    if (selector === void 0) {
      selector = null;
    }

    if (action === void 0) {
      action = null;
    }

    var listenerMatch = true; //let stamp: string = `${type}${selector.toString()}${action.toString()}`;
    //if (action && action.toString() !== this._actionAsString) {

    if (action && action !== this.action) {
      listenerMatch = false;
    }

    if (this.type === type && selector === this.selector && listenerMatch) {
      return true;
    }

    return false;
  }; //Private methods 
  //-------------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------------


  EventListener.prototype._on = function () {
    var _this = this;

    if (this.selectorType === SelectorTypes.STRING) {
      delegated_events_1.on(this.type, this.selector, this.action);
    } else if (this.selectorType === SelectorTypes.ELEMENT) {
      this.selector.addEventListener(this.type, this.action);
    } else if (this.selectorType === SelectorTypes.NODE_LIST) {
      this.selector.forEach(function (item) {
        item.addEventListener(_this.type, _this.action);
      });
    }
  };

  EventListener.prototype._off = function () {
    var _this = this;

    if (this.selectorType === SelectorTypes.STRING) {
      delegated_events_1.off(this.type, this.selector, this.action);
    } else if (this.selectorType === SelectorTypes.ELEMENT) {
      this.selector.removeEventListener(this.type, this.action);
    } else if (this.selectorType === SelectorTypes.NODE_LIST) {
      this.selector.forEach(function (item) {
        item.removeEventListener(_this.type, _this.action);
      });
    }
  };

  EventListener.prototype._getSelectorType = function (selector) {
    if (typeof selector === 'string' || selector instanceof String) {
      return SelectorTypes.STRING;
    } else if (selector instanceof Element || selector instanceof Document || selector instanceof Window) {
      return SelectorTypes.ELEMENT;
    }

    return SelectorTypes.NODE_LIST;
  };

  return EventListener;
}();

exports.EventListener = EventListener;

/***/ }),

/***/ "./src/debugbase/events/Events.ts":
/*!****************************************!*\
  !*** ./src/debugbase/events/Events.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
}); //v1.0 

var EventListener_1 = __webpack_require__(/*! ./EventListener */ "./src/debugbase/events/EventListener.ts");

var CoreEvents_1 = __webpack_require__(/*! ./CoreEvents */ "./src/debugbase/events/CoreEvents.ts");

var fastdom = __webpack_require__(/*! fastdom */ "./node_modules/fastdom/fastdom.js");

var Events =
/** @class */
function () {
  function Events() {}

  Events.init = function () {
    Events._addCoreListeners();
  };

  Events.on = function (type, selectorOrAction, action) {
    if (action === void 0) {
      action = null;
    }

    var typeAsString; //If an event then pull the eventname value from the class / instace:

    if (!(typeof type === 'string')) {
      var typeAsEvent = type;
      typeAsString = typeAsEvent.eventName || typeAsEvent.eventNameFromStatic;

      Events._checkValidEvent(typeAsEvent);
    } else {
      typeAsString = type;
    }

    var selectorElement = null;

    if (action === null) {
      action = selectorOrAction;
    } else {
      selectorElement = selectorOrAction;
    }

    if (action !== undefined && Events.match(typeAsString, selectorElement, action).length === 0) {
      var listener = new EventListener_1.EventListener(typeAsString, action, selectorElement);
      listener.id = this._idCount;

      Events._listeners.push(listener);

      this._idCount++;
      return listener.id;
    }

    return null;
  };

  Events.off = function (type, selectorOrAction, action) {
    if (action === void 0) {
      action = null;
    }

    var typeAsString; //If an event then pull the eventname value from the class / instace:

    if (!(typeof type === 'string')) {
      var typeAsEvent = type;
      typeAsString = typeAsEvent.eventName || typeAsEvent.eventNameFromStatic;

      Events._checkValidEvent(typeAsEvent);
    } else {
      typeAsString = type;
    }

    var selectorElement = null;

    if (action === null) {
      action = selectorOrAction;
    } else {
      selectorElement = selectorOrAction;
    }

    var matches = Events.match(typeAsString, selectorElement, action);

    for (var i = 0; i < matches.length; i++) {
      matches[i].destroy();
    }

    Events._purge();
  };

  Events.offById = function () {
    var ids = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      ids[_i] = arguments[_i];
    }

    for (var i = 0; i < Events._listeners.length; i++) {
      if (ids.indexOf(Events._listeners[i].id) !== -1) {
        Events._listeners[i].destroy();
      }
    }

    Events._purge();
  };

  Events.dispatch = function (event, data, settings) {
    if (data === void 0) {
      data = null;
    }

    if (settings === void 0) {
      settings = null;
    }

    var typeAsString;
    var dataAsAny; //If an event then pull the eventname value from the class / instace:

    if (!(typeof event === 'string')) {
      var typeAsEvent = event;
      typeAsString = typeAsEvent.eventName || typeAsEvent.eventNameFromStatic;
      dataAsAny = typeAsEvent;

      Events._checkValidEvent(typeAsEvent); //Switch settings with data (as the event contains the params for the event)


      settings = data;
    } else {
      typeAsString = event;
      dataAsAny = data;
    }

    var matches = this.match(typeAsString, null);
    matches.forEach(function (match) {
      match.dispatch(dataAsAny, settings);
    });
  };

  Events.match = function (type, selector, action) {
    if (selector === void 0) {
      selector = null;
    }

    if (action === void 0) {
      action = null;
    }

    return Events._listeners.filter(function (listener) {
      return listener.match(type, selector, action);
    });
  };

  Events.ready = function (callback) {
    Events.on(CoreEvents_1.CoreEvents.READY, callback);
  };

  Events.tick = function (callback) {
    Events.on(CoreEvents_1.CoreEvents.TICK, callback);
  };

  Events.DOMUpdate = function (callback) {
    Events.on(CoreEvents_1.CoreEvents.DOM_UPDATED, callback);
  };

  Events.scroll = function (callback) {
    Events.on(CoreEvents_1.CoreEvents.SCROLL, callback);
  };

  Events.resize = function (callback) {
    Events.on(CoreEvents_1.CoreEvents.RESIZE, callback);
  }; //Private methods 
  //-------------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------------
  //-------------------------------------------------------------------------------------------


  Events._addCoreListeners = function () {
    this._ready();

    this._scroll();

    this._resize();

    this._tick();
  };

  Events._ready = function () {
    document.onreadystatechange = function () {
      if (document.readyState === 'interactive') {
        Events.dispatch(CoreEvents_1.CoreEvents.READY); //Destroy ready listeners: 

        Events.match(CoreEvents_1.CoreEvents.READY).forEach(function (listener) {
          return listener.destroy();
        }); //Purge:

        Events._purge();
      }
    };
  };

  Events._scroll = function () {
    var scrollTicking = false;
    var scrollY = 0;
    window.addEventListener('scroll', function (e) {
      fastdom.mutate(function () {
        scrollY = window.scrollY;
      });

      if (!scrollTicking) {
        window.requestAnimationFrame(function () {
          Events.dispatch(CoreEvents_1.CoreEvents.SCROLL, scrollY);
          scrollTicking = false;
        });
        scrollTicking = true;
      }
    });
  };

  Events._resize = function () {
    var queId = null;
    window.addEventListener('resize', function (e) {
      fastdom.clear(queId);
      queId = fastdom.mutate(function () {
        Events.dispatch(CoreEvents_1.CoreEvents.RESIZE, {
          width: window.innerWidth,
          height: window.innerHeight
        });
        queId = null;
      });
    });
  };

  Events._tick = function () {
    window.requestAnimationFrame(this._dotick.bind(this));
  };

  Events._dotick = function () {
    Events.dispatch(CoreEvents_1.CoreEvents.TICK);
    window.requestAnimationFrame(this._dotick.bind(this));
  };

  Events._purge = function () {
    Events._listeners = Events._listeners.filter(function (listener) {
      return listener.type;
    });
  };
  /**
  * Check a valid event setup (by checking has eventName set)
  * @param {DebugEvent} event
  * @throws {Error}
  */


  Events._checkValidEvent = function (event) {
    var eventName = event.eventName || event.eventNameFromStatic;

    if (!eventName || eventName === '') {
      try {
        var name_1 = event.name || event.constructor.name;
        throw new Error("Event class " + name_1 + " has no static 'eventName' set");
      } catch (e) {
        console.log(e);
      }
    }
  };

  Events._listeners = [];
  Events._idCount = 1;
  return Events;
}();

exports.Events = Events;

/***/ }),

/***/ "./src/debugbase/helper/DOMHelper.ts":
/*!*******************************************!*\
  !*** ./src/debugbase/helper/DOMHelper.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 //v1.0.0
//jquery transition
//Also implements fastdom to split read/write operations 

Object.defineProperty(exports, "__esModule", {
  value: true
}); //import {DebugHelper} from 'debugbase/debug/DebugHelper';

var fastdom = __webpack_require__(/*! fastdom */ "./node_modules/fastdom/fastdom.js");

var DOMHelper =
/** @class */
function () {
  function DOMHelper() {
    this._measureCore(); //fastdom.catch = (error) => {
    // Do something if you want
    //	console.log("error = " + error);
    //};	

  }

  DOMHelper.prototype.setAttribute = function (element, name, value) {
    element.setAttribute(name, value);
  };

  DOMHelper.prototype.removeAttributte = function (element, name) {
    element.removeAttribute(name);
  };

  DOMHelper.prototype.getAttribute = function (element, attrName) {
    if (!element || !attrName) {
      //DebugHelper.throw(`Null element set no attr set. attrName = ${attrName}`);
      return;
    }

    return element.getAttribute(attrName);
  };

  DOMHelper.prototype.getAttributes = function (element) {
    if (!element) {
      //DebugHelper.throw('Null element set.');
      return;
    }

    var attr = {};

    for (var i = 0; i < element.attributes.length; i++) {
      attr[element.attributes[i].name] = element.attributes[i].value;
    }

    return attr;
  }; //Set config to 
  //TODO - should be a standard Rectangle or Size class


  DOMHelper.prototype.resize = function (rect) {
    this.innerHeight = rect.width;
    this.innerWidth = rect.height;
  };

  DOMHelper.prototype.scroll = function (y) {
    this.scrollY = y;
  };

  DOMHelper.prototype.setHTML = function (element, html, complete) {
    if (complete === void 0) {
      complete = null;
    }

    if (!element || !html) {
      //DebugHelper.throw(`No element or html set`);
      return;
    }

    fastdom.mutate(function () {
      element.innerHTML = html;

      if (complete) {
        complete();
      }
    });
  };

  DOMHelper.prototype.setText = function (element, text) {
    if (!element || !text) {
      //DebugHelper.throw(`No element or text set`);
      return;
    }

    fastdom.mutate(function () {
      element.innerText = text;
    });
  };

  DOMHelper.prototype.append = function (element, addElement, complete) {
    if (complete === void 0) {
      complete = null;
    }

    if (!addElement) {
      //DebugHelper.throw('Append has no element to add.');
      return;
    }

    if (typeof addElement === 'string') {
      fastdom.mutate(function () {
        element.insertAdjacentHTML('beforeend', addElement);

        if (complete) {
          complete();
        }
      });
    } else {
      fastdom.mutate(function () {
        element.appendChild(addElement);

        if (complete) {
          complete();
        }
      });
    }
  };

  DOMHelper.prototype.removeElement = function (element, complete) {
    if (complete === void 0) {
      complete = null;
    }

    if (!element) {
      //DebugHelper.throw('Null element set.');
      return;
    }

    fastdom.mutate(function () {
      element.parentNode.removeChild(element);

      if (complete) {
        complete();
      }
    });
  };

  DOMHelper.prototype.addClass = function (element, className) {
    if (!element) {
      //DebugHelper.throw('Null element set.');
      return;
    }

    fastdom.mutate(function () {
      if (element.classList) {
        element.classList.add(className);
      } else {
        element.className += ' ' + className;
      }
    });
  };

  DOMHelper.prototype.removeClass = function (element, className) {
    if (!element || !className || className === '') {
      //DebugHelper.throw('Null element or no classname set.');
      return;
    }

    fastdom.mutate(function () {
      if (element.classList) {
        element.classList.remove(className);
      } else {
        element.className = element.className.replace(' ' + className, '');
      }
    });
  };

  DOMHelper.prototype.toggleClass = function (element, className, add) {
    if (add === void 0) {
      add = true;
    }

    if (!element || !className || className === '') {
      //DebugHelper.throw('Null element or no classname set.');
      return;
    }

    if (add) {
      this.addClass(element, className);
    } else {
      this.removeClass(element, className);
    }
  };

  DOMHelper.prototype.que = function (callback) {
    return fastdom.mutate(function () {
      callback();
    });
  };

  DOMHelper.prototype.clearQue = function (id) {
    fastdom.clear(id);
  };

  DOMHelper.prototype.hasClass = function (element, className) {
    return element.classList.contains(className);
  };

  DOMHelper.prototype.parent = function (element) {
    return element.parentNode;
  };

  DOMHelper.prototype.contains = function (element, scope) {
    if (scope === void 0) {
      scope = null;
    }

    if (scope === null) {
      scope = document.body;
    }

    return scope.contains(element);
  };

  DOMHelper.prototype.sizes = function (element, callback) {
    fastdom.measure(function () {
      var rect = element.getBoundingClientRect();
      callback({
        position: {
          left: element.offsetLeft,
          top: element.offsetTop
        },
        rect: rect,
        width: rect.width,
        height: rect.height
      });
    });
  };

  DOMHelper.prototype._measureCore = function () {
    var _this = this;

    fastdom.measure(function () {
      _this.innerHeight = window.innerHeight;
      _this.innerWidth = window.innerWidth;
    });
  };

  return DOMHelper;
}();

exports.DOMHelper = DOMHelper;

/***/ }),

/***/ "./src/debugbase/helper/FrameworkHelper.ts":
/*!*************************************************!*\
  !*** ./src/debugbase/helper/FrameworkHelper.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var Debugbase_1 = __webpack_require__(/*! ./../Debugbase */ "./src/debugbase/Debugbase.ts");

var FrameworkHelper =
/** @class */
function () {
  function FrameworkHelper() {} //Fairly cpu itensive 


  FrameworkHelper.prototype.getParsedAttributes = function (element) {
    var attr = Debugbase_1.Debugbase.DOM.getAttributes(element);

    for (var i in attr) {
      attr[i] = Debugbase_1.Debugbase.string.convert(attr[i]);
    }

    return attr;
  };

  FrameworkHelper.prototype.attributesToConfig = function (instance, attributes, match) {
    if (match === void 0) {
      match = null;
    }

    var name;
    var i;
    var matches;
    var clean;

    for (i in attributes) {
      matches = true;

      if (match && !Debugbase_1.Debugbase.string.contains(i, match)) {
        matches = false;
      }

      if (matches) {
        clean = Debugbase_1.Debugbase.string.remove(i, match + '-');
        name = Debugbase_1.Debugbase.string.snakeToCamelCase(clean);
        instance.config[name] = attributes[i];
      }
    }
  };

  return FrameworkHelper;
}();

exports.FrameworkHelper = FrameworkHelper;

/***/ }),

/***/ "./src/debugbase/helper/MathHelper.ts":
/*!********************************************!*\
  !*** ./src/debugbase/helper/MathHelper.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var MathHelper =
/** @class */
function () {
  function MathHelper() {}

  Object.defineProperty(MathHelper.prototype, "distanceX", {
    get: function get() {
      return this._distanceX;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(MathHelper.prototype, "distanceY", {
    get: function get() {
      return this._distanceY;
    },
    enumerable: true,
    configurable: true
  }); //https://stackoverflow.com/questions/42110701/how-to-calculate-percentage-between-the-range-of-two-values-a-third-value-is-in

  MathHelper.prototype.mapBetween = function (currentNum, minAllowed, maxAllowed, min, max) {
    return (maxAllowed - minAllowed) * (currentNum - min) / (max - min) + minAllowed;
  };

  MathHelper.prototype.getInbetween = function (value, bottom_value, top_value) {
    var range = top_value - bottom_value;
    var percent = (value - bottom_value) / range;
    return percent;
  };

  MathHelper.prototype.constrain = function (value, min, max) {
    if (value > max) {
      value = max;
    } else if (value < min) {
      value = min;
    }

    return value;
  }; //Get a ratio value between two values by passing a ratio
  //i.e between -1.2 and 2 
  ///getRangeRatio(0.4, -1.2, 2);


  MathHelper.prototype.getRangeRatio = function (ratio, lowerValue, topValue) {
    var range = topValue - lowerValue;
    return lowerValue + ratio * range;
  }; //fit scale
  //Get the scale an item should be to fit into a space: 


  MathHelper.prototype.getBestFitScale = function (imageDimensions, containerDimensions) {
    var scale = 1.0;
    var aspectRatio = imageDimensions.width / imageDimensions.height;
    var targetRatio = containerDimensions.width / containerDimensions.height;

    if (targetRatio > aspectRatio) {
      scale = containerDimensions.width / imageDimensions.width;
    } else {
      scale = containerDimensions.height / imageDimensions.height;
    }

    return scale;
  };
  /** Emulate CSS cover logic */


  MathHelper.prototype.getCoverSize = function (imageDimensions, containerDimensions) {
    var originalRatios = {
      width: containerDimensions.width / imageDimensions.width,
      height: containerDimensions.height / imageDimensions.height
    }; // formula for cover:

    var coverRatio = Math.max(originalRatios.width, originalRatios.height); // result:

    return {
      width: imageDimensions.width * coverRatio,
      height: imageDimensions.height * coverRatio
    };
  };

  MathHelper.prototype.distance = function (point1, point2) {
    this._distanceX = point1.x - point2.x;
    this._distanceY = point1.y - point2.y;
    return Math.sqrt(this._distanceX * this._distanceX + this._distanceY * this._distanceY);
  };

  return MathHelper;
}();

exports.MathHelper = MathHelper;

/***/ }),

/***/ "./src/debugbase/helper/StringHelper.ts":
/*!**********************************************!*\
  !*** ./src/debugbase/helper/StringHelper.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var StringHelper =
/** @class */
function () {
  function StringHelper() {}

  StringHelper.prototype.snakeToCamelCase = function (str) {
    return str.replace(/(\-\w)/g, function (m) {
      return m[1].toUpperCase();
    });
  };

  StringHelper.prototype.snakeToClassName = function (str) {
    return this.capitalizeFirstLetter(this.snakeToCamelCase(str));
  };

  StringHelper.prototype.capitalizeFirstLetter = function (str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  StringHelper.prototype.contains = function (str, check, start) {
    if (start === void 0) {
      start = 0;
    }

    return str.indexOf(check, start) !== -1;
  };

  StringHelper.prototype.remove = function (str, remove) {
    var re = new RegExp(this._escapeRegExp(remove), 'g');
    return str.replace(re, '');
  };

  StringHelper.prototype.isNumeric = function (str) {
    return !isNaN(parseFloat(str)) && isFinite(str);
  }; //Convert string to number or boolean 


  StringHelper.prototype.convert = function (str, convertBlankStringToBoolean) {
    if (convertBlankStringToBoolean === void 0) {
      convertBlankStringToBoolean = true;
    }

    var converted = str; //If a blank string then most likely a boolean i.e created by attribute-name

    if (convertBlankStringToBoolean && str === '' || str.toLowerCase() === 'true') {
      converted = true;
    } else if (str.toLowerCase() === 'false') {
      converted = false;
    } else if (this.isNumeric(str)) {
      converted = parseFloat(str);
    }

    return converted;
  };

  StringHelper.prototype.template = function (str, map) {
    for (var i in map) {
      var re = new RegExp('%%' + i + '%%', 'g');
      str = str.replace(re, map[i]);
    }

    return str;
  };

  StringHelper.prototype._escapeRegExp = function (str) {
    return str.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  };

  return StringHelper;
}();

exports.StringHelper = StringHelper;

/***/ }),

/***/ "./src/debugbase/helper/SystemHelper.ts":
/*!**********************************************!*\
  !*** ./src/debugbase/helper/SystemHelper.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var SystemHelper =
/** @class */
function () {
  function SystemHelper() {
    this.cordsFromTouch = false;
    this.resize();
  }

  Object.defineProperty(SystemHelper.prototype, "innerWidth", {
    get: function get() {
      return this._innerWidth;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(SystemHelper.prototype, "innerHeight", {
    get: function get() {
      return this._innerHeight;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(SystemHelper.prototype, "isPortraitDevice", {
    get: function get() {
      return this._isPortraitDevice;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(SystemHelper.prototype, "isSmallDevice", {
    get: function get() {
      return this._isSmallDevice;
    },
    enumerable: true,
    configurable: true
  });

  SystemHelper.prototype.resize = function () {
    this._innerWidth = window.innerWidth;
    this._innerHeight = window.innerHeight;
    this._isPortraitDevice = window.innerWidth < 1000 && window.innerWidth < window.innerHeight;
    this._isSmallDevice = window.innerWidth < 800;
  };

  return SystemHelper;
}();

exports.SystemHelper = SystemHelper;

/***/ }),

/***/ "./src/debugbase/loader/DataLoader.ts":
/*!********************************************!*\
  !*** ./src/debugbase/loader/DataLoader.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
}); //v1.0 - Dataloader is proxy for AXIOM. 
//All loaders that need AJAX / Form post style stuff should use this

var Loader_1 = __webpack_require__(/*! ./Loader */ "./src/debugbase/loader/Loader.ts");

var axios_1 = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");

var DataLoader =
/** @class */
function (_super) {
  __extends(DataLoader, _super);

  function DataLoader() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.method = 'GET';
    _this.data = null;
    return _this;
  }

  DataLoader.prototype.load = function () {
    this._load();
  }; //protected 
  //--------------------------------------------------------
  //--------------------------------------------------------
  //--------------------------------------------------------
  //--------------------------------------------------------


  DataLoader.prototype.dataLoadComplete = function (data) {
    this.complete(data);
  };

  Object.defineProperty(DataLoader.prototype, "getParams", {
    //private 
    //--------------------------------------------------------
    //--------------------------------------------------------
    //--------------------------------------------------------
    //--------------------------------------------------------
    get: function get() {
      return this.method === 'GET' ? this.data : null;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(DataLoader.prototype, "postData", {
    get: function get() {
      return this.method !== 'GET' ? this.data : null;
    },
    enumerable: true,
    configurable: true
  }); // Want to use async/await? Add the `async` keyword to your outer function/metho

  DataLoader.prototype._load = function () {
    var _this = this;

    axios_1.default({
      method: this.method,
      url: this.url,
      data: this.postData,
      params: this.getParams,
      onDownloadProgress: this.onProgress
    }).then(function (response) {
      _this.dataLoadComplete(response);
    }).catch(function (error) {
      _this.error(error);
    });
  };

  return DataLoader;
}(Loader_1.Loader);

exports.DataLoader = DataLoader;

/***/ }),

/***/ "./src/debugbase/loader/HTMLLoader.ts":
/*!********************************************!*\
  !*** ./src/debugbase/loader/HTMLLoader.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
}); //v1.0 - HTML loader for loading HTML items in 

var DataLoader_1 = __webpack_require__(/*! ./DataLoader */ "./src/debugbase/loader/DataLoader.ts");

var HTMLLoader =
/** @class */
function (_super) {
  __extends(HTMLLoader, _super);

  function HTMLLoader() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  HTMLLoader.prototype.dataLoadComplete = function (response) {
    this.html = response.data;

    if (this.element) {
      this.element.innerHTML = this.html;
    }

    this.complete(this.id);
  };

  return HTMLLoader;
}(DataLoader_1.DataLoader);

exports.HTMLLoader = HTMLLoader;

/***/ }),

/***/ "./src/debugbase/loader/ImageLoader.ts":
/*!*********************************************!*\
  !*** ./src/debugbase/loader/ImageLoader.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
}); //v1.0 - HTML loader for loading scripts in 

var Loader_1 = __webpack_require__(/*! ./Loader */ "./src/debugbase/loader/Loader.ts");

var ImageLoader =
/** @class */
function (_super) {
  __extends(ImageLoader, _super);

  function ImageLoader() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.loaded = 0;
    return _this;
  }

  ImageLoader.prototype.load = function () {
    for (var i = 0; i < this.element.length; i++) {
      this._addListener(this.element[i]);
    }
  };

  ImageLoader.prototype.getTotalAssets = function () {
    return this.element ? this.element.length : 0;
  };

  ImageLoader.prototype.getLoadedAssets = function () {
    return this.loaded;
  }; //private 
  //--------------------------------------------------------
  //--------------------------------------------------------
  //--------------------------------------------------------
  //--------------------------------------------------------


  ImageLoader.prototype.onImgLoaded = function (img) {
    var _this = this;

    this.loaded++;
    this.assetLoaded(img);
    img.removeEventListener('load', function (e) {
      return _this._onImgLoaded(e.target);
    });
    img.removeEventListener('error', function (error) {
      return _this._onImgError(error);
    });
    var totalAssets = this.getTotalAssets();
    var loadedAssets = this.getLoadedAssets();
    var ratio = loadedAssets / totalAssets;
    this.progress({
      id: this.id,
      ratio: ratio,
      total: totalAssets,
      loaded: loadedAssets
    });

    if (totalAssets === loadedAssets) {
      this.complete(this.id);
    }
  };

  ImageLoader.prototype.onImgError = function (error) {
    this.onError(error);
  };

  ImageLoader.prototype._onImgLoaded = function (target) {};

  ImageLoader.prototype._onImgError = function (error) {};

  ImageLoader.prototype._addListener = function (img) {
    var _this = this;

    if (img.complete) {
      this.onImgLoaded(img);
    } else {
      img.addEventListener('load', function (e) {
        return _this.onImgLoaded(e.target);
      });
      img.addEventListener('error', function (error) {
        return _this.onImgError(error);
      });
    }
  };

  return ImageLoader;
}(Loader_1.Loader);

exports.ImageLoader = ImageLoader;

/***/ }),

/***/ "./src/debugbase/loader/InstanceLoader.ts":
/*!************************************************!*\
  !*** ./src/debugbase/loader/InstanceLoader.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var InstanceLoader =
/** @class */
function () {
  function InstanceLoader(context) {
    this.context = context;
  }

  InstanceLoader.prototype.getInstance = function (name) {
    var args = [];

    for (var _i = 1; _i < arguments.length; _i++) {
      args[_i - 1] = arguments[_i];
    }

    var instance = Object.create(this.context[name].prototype);
    instance.constructor.apply(instance, args);
    return instance;
  };

  return InstanceLoader;
}();

exports.InstanceLoader = InstanceLoader;

/***/ }),

/***/ "./src/debugbase/loader/JSONLoader.ts":
/*!********************************************!*\
  !*** ./src/debugbase/loader/JSONLoader.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
}); //v1.0 - HTML loader for loading scripts in 

var DataLoader_1 = __webpack_require__(/*! ./DataLoader */ "./src/debugbase/loader/DataLoader.ts");

var JSONLoader =
/** @class */
function (_super) {
  __extends(JSONLoader, _super);

  function JSONLoader() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  JSONLoader.prototype.onLoaderComplete = function (response) {
    this.complete(response);
  };

  JSONLoader.prototype.complete = function (data) {
    if (data === void 0) {
      data = null;
    }

    this._complete = true;

    if (this.onComplete) {
      this.onComplete(this.id, data.data, this);
    }

    if (this.onGroupAssetComplete) {
      this.onGroupAssetComplete(data, this);
    }
  };

  return JSONLoader;
}(DataLoader_1.DataLoader);

exports.JSONLoader = JSONLoader;

/***/ }),

/***/ "./src/debugbase/loader/Loader.ts":
/*!****************************************!*\
  !*** ./src/debugbase/loader/Loader.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var Loader =
/** @class */
function () {
  function Loader() {
    this._complete = false;
  }

  Loader.prototype.load = function () {};

  Loader.prototype.destroy = function () {
    return;
    this.onProgress = null;
    this.onComplete = null;
    this.onError = null;
    this.onGroupAssetComplete = null;
    this.onGroupError = null;
  };

  Loader.prototype.getTotalAssets = function () {
    return 1;
  };

  Loader.prototype.getLoadedAssets = function () {
    return this._complete ? 1 : 0;
  }; //LoaderGroup needs to manage callbacks on its own so it doesn't 


  Loader.prototype.setLoaderGroupCallbacks = function (assetComplete, error) {
    this.onGroupAssetComplete = assetComplete;
    this.onGroupError = error;
  }; //protected 
  //--------------------------------------------------------
  //--------------------------------------------------------
  //--------------------------------------------------------
  //--------------------------------------------------------


  Loader.prototype.complete = function (data) {
    if (data === void 0) {
      data = null;
    }

    this._complete = true;

    if (this.onComplete) {
      this.onComplete(data, this);
    }

    if (this.onGroupAssetComplete) {
      this.onGroupAssetComplete(data, this);
    }
  };

  Loader.prototype.assetLoaded = function (data) {
    if (data === void 0) {
      data = null;
    }

    if (this.onAssetLoaded) {
      this.onAssetLoaded(data, this);
    }

    if (this.onGroupAssetComplete) {
      this.onGroupAssetComplete(data, this);
    }
  };

  Loader.prototype.progress = function (data) {
    if (this.onProgress) {
      this.onProgress(data, this);
    }
  };

  Loader.prototype.error = function (error) {
    if (this.onError) {
      this.onError(error, this);
    }

    if (this.onGroupError) {
      this.onGroupError(error, this);
    }
  };

  return Loader;
}();

exports.Loader = Loader;

/***/ }),

/***/ "./src/debugbase/loader/LoaderGroup.ts":
/*!*********************************************!*\
  !*** ./src/debugbase/loader/LoaderGroup.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var LoaderGroup =
/** @class */
function () {
  function LoaderGroup() {
    this._group = [];
  }

  LoaderGroup.prototype.add = function () {
    var loaders = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      loaders[_i] = arguments[_i];
    }

    this._group = this._group.concat(loaders);
  };

  LoaderGroup.prototype.load = function () {
    var _this = this;

    for (var i = 0; i < this._group.length; i++) {
      this._group[i].setLoaderGroupCallbacks(function () {
        return _this._onAssetComplete();
      }, function (error) {
        return _this._onError(error);
      });

      this._group[i].load();
    }
  }; //private 
  //--------------------------------------------------------
  //--------------------------------------------------------
  //--------------------------------------------------------
  //--------------------------------------------------------
  //Single loader has completed 	


  LoaderGroup.prototype._onAssetComplete = function (data) {
    if (data === void 0) {
      data = null;
    }

    var totalAssets = this._getTotalAssets();

    var loadedAssets = this._getLoadedAssets();

    var ratio = loadedAssets / totalAssets;

    if (this.onProgress) {
      this.onProgress({
        id: this.id,
        ratio: ratio,
        total: totalAssets,
        loaded: loadedAssets
      });
    }

    if (totalAssets === loadedAssets) {
      this._groupComplete();
    }
  }; //The whole group has completed: 


  LoaderGroup.prototype._groupComplete = function () {
    if (this.onComplete) {
      this.onComplete(this.id);
    }

    this._destroy();
  }; //On assets error: 


  LoaderGroup.prototype._onError = function (error) {
    if (this.onError) {
      this.onError(error);
    }
  }; //Get total assets. This can be more than the amout of loaders as ImageLoader can have many images


  LoaderGroup.prototype._destroy = function () {
    return;

    if (!this._group) {
      return;
    }

    for (var i = 0; i < this._group.length; i++) {
      this._group[i].destroy();
    }

    this._group = null;
  }; //Get total assets in the whole group 


  LoaderGroup.prototype._getTotalAssets = function () {
    var count = 0;

    for (var i = 0; i < this._group.length; i++) {
      count += this._group[i].getTotalAssets();
    }

    return count;
  }; //Get total assets in the whole group 


  LoaderGroup.prototype._getLoadedAssets = function () {
    var count = 0;

    for (var i = 0; i < this._group.length; i++) {
      count += this._group[i].getLoadedAssets();
    }

    return count;
  };

  return LoaderGroup;
}();

exports.LoaderGroup = LoaderGroup;

/***/ }),

/***/ "./src/debugbase/loader/PixiLoader.ts":
/*!********************************************!*\
  !*** ./src/debugbase/loader/PixiLoader.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
}); //v1.0 - Pixi loader for loading PIXI resources into 
//import * as PIXI from 'pixi.js';

var Loader_1 = __webpack_require__(/*! ./Loader */ "./src/debugbase/loader/Loader.ts");

var PixiLoader =
/** @class */
function (_super) {
  __extends(PixiLoader, _super);

  function PixiLoader() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.resources = [{
      ref: 'spritesheet',
      path: '/img/work/spritesheetspritesheet.json'
    }];
    _this.loaded = 0;
    _this._pixicomplete = false;
    return _this;
  } //Load all the resources via the built in PIXI loader:


  PixiLoader.prototype.load = function () {
    var _this = this;

    this._loader = new PIXI.loaders.Loader();
    this.resources.forEach(function (resource) {
      _this._loader.add(resource.ref, resource.path);
    });

    this._loader.onLoad.add(function (loader, resources) {
      return _this.onResourceLoaded(loader, resources);
    });

    this._loader.onComplete.add(function (loader, resources) {
      return _this._onComplete(loader, resources);
    });

    this._loader.onError.add(function (loader, data) {
      return _this._onError();
    }); // called once per errored file


    this._loader.load();
  }; //Check total assets 
  //Spritesheets count for x2 assets as there is JSON and Image to load


  PixiLoader.prototype.getTotalAssets = function () {
    var count = 0;

    for (var i = 0; i < this.resources.length; i++) {
      var add = this.resources[i].isSpriteSheet ? 2 : 1;
      count += add;
    }

    return count;
  };

  PixiLoader.prototype.getLoadedAssets = function () {
    return this.loaded;
  }; //private 
  //--------------------------------------------------------
  //--------------------------------------------------------
  //--------------------------------------------------------
  //--------------------------------------------------------
  //Single resource has loaded so update the progress: 


  PixiLoader.prototype.onResourceLoaded = function (loader, data) {
    var totalAssets = this.getTotalAssets();
    this.loaded = Math.round(loader.progress / 100 * totalAssets);
    var loadedAssets = this.getLoadedAssets();
    var ratio = loadedAssets / totalAssets;
    this.progress({
      id: this.id,
      ratio: ratio,
      total: totalAssets,
      loaded: loadedAssets
    });
  }; //Loader is 100% complete so flag complete 


  PixiLoader.prototype._onComplete = function (loader, resources) {
    if (this._pixicomplete) {
      return;
    }

    this._pixicomplete = true;
    this.complete(this.id);

    if (this.onResourcesReady) {
      this.onResourcesReady(this.id, resources);
    }
  }; //Error callback


  PixiLoader.prototype._onError = function () {
    this.error("PIXI LOADING ERROR LOADER ID = " + this.id + "}");
  };

  return PixiLoader;
}(Loader_1.Loader);

exports.PixiLoader = PixiLoader;

/***/ }),

/***/ "./src/debugbase/managers/BehaviourManager.ts":
/*!****************************************************!*\
  !*** ./src/debugbase/managers/BehaviourManager.ts ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var BehaviourManager =
/** @class */
function () {
  function BehaviourManager() {}

  return BehaviourManager;
}();

exports.BehaviourManager = BehaviourManager;

/***/ }),

/***/ "./src/debugbase/managers/ControllerManager.ts":
/*!*****************************************************!*\
  !*** ./src/debugbase/managers/ControllerManager.ts ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var Events_1 = __webpack_require__(/*! debugbase/events/Events */ "./src/debugbase/events/Events.ts");

var CoreEvents_1 = __webpack_require__(/*! debugbase/events/CoreEvents */ "./src/debugbase/events/CoreEvents.ts");

var ControllerManager =
/** @class */
function () {
  function ControllerManager() {
    this._controllers = [];
  }

  ControllerManager.prototype.init = function () {
    //Loop through all the controllers. 
    //If they are global then they can be started up straight away
    for (var i = 0; i < this._controllers.length; i++) {
      if (this._controllers[i].global) {
        this._controllers[i].init();
      }
    }

    Events_1.Events.on(CoreEvents_1.CoreEvents.MODULES_MOUNTED, this._onModulesMounted.bind(this));
  };

  ControllerManager.prototype.add = function () {
    var controllersConfig = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      controllersConfig[_i] = arguments[_i];
    }

    for (var i = 0; i < controllersConfig.length; i++) {
      if (controllersConfig[i].global) {
        controllersConfig[i].instance.global = true;
      }

      if (controllersConfig[i].selector) {
        controllersConfig[i].instance.containerSelector = controllersConfig[i].selector;
      }

      this._controllers.push(controllersConfig[i].instance);
    }
  };

  ControllerManager.prototype.get = function (id) {
    for (var i = 0; i < this._controllers.length; i++) {
      if (this._controllers[i].id.toLowerCase() === id.toLowerCase()) {
        return this._controllers[i];
      }
    }

    return null;
  };

  ControllerManager.prototype.DOMReady = function () {
    this._controllers.forEach(function (controller) {
      if (controller.DOMReady) {
        controller.DOMReadyCore();
      }
    });
  };

  ControllerManager.prototype.DOMUpdated = function () {
    this._controllers.forEach(function (controller) {
      if (controller.DOMUpdated) {
        controller.DOMUpdated();
      }
    });
  };

  ControllerManager.prototype.scroll = function (windowY) {
    this._controllers.forEach(function (controller) {
      if (controller.scroll) {
        controller.scroll(windowY);
      }
    });
  };

  ControllerManager.prototype.resize = function (sizes) {
    this._controllers.forEach(function (controller) {
      if (controller.resize) {
        controller.resize();
      }
    });
  };

  ControllerManager.prototype.tick = function () {
    this._controllers.forEach(function (controllerInstance) {
      if (controllerInstance.tick) {
        controllerInstance.tick();
      }
    });
  };

  ControllerManager.prototype._onModulesMounted = function () {
    this._controllers.forEach(function (controller) {
      if (controller.modulesMounted) {
        controller.modulesMounted();
      }
    });
  };

  return ControllerManager;
}();

exports.ControllerManager = ControllerManager;

/***/ }),

/***/ "./src/debugbase/managers/ModuleManager.ts":
/*!*************************************************!*\
  !*** ./src/debugbase/managers/ModuleManager.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var Debugbase_1 = __webpack_require__(/*! debugbase/Debugbase */ "./src/debugbase/Debugbase.ts");

var InstanceLoader_1 = __webpack_require__(/*! debugbase/loader/InstanceLoader */ "./src/debugbase/loader/InstanceLoader.ts");

var Events_1 = __webpack_require__(/*! debugbase/events/Events */ "./src/debugbase/events/Events.ts");

var CoreEvents_1 = __webpack_require__(/*! debugbase/events/CoreEvents */ "./src/debugbase/events/CoreEvents.ts");

var ClearType;

(function (ClearType) {
  ClearType[ClearType["DESTROY"] = 0] = "DESTROY";
  ClearType[ClearType["REMOVE"] = 1] = "REMOVE";
})(ClearType || (ClearType = {}));

var ModuleManager =
/** @class */
function () {
  function ModuleManager() {
    this._modules = []; //All active modules
  }

  ModuleManager.prototype.create = function () {};

  ModuleManager.prototype.get = function (id) {
    return this._getModuleById(id);
  };

  ModuleManager.prototype.getByTag = function (tag) {
    return this._getModulesByTag(tag);
  };

  ModuleManager.prototype.getByModuleName = function (name) {
    return this._getByModuleName(name);
  };

  ModuleManager.prototype.remove = function (id) {
    this._clearById(id, ClearType.REMOVE);
  };

  ModuleManager.prototype.destoryByTag = function (tag) {
    this._clearByTag(tag);

    this._purge();
  };

  ModuleManager.prototype.destroy = function (id) {
    this._clearById(id, ClearType.DESTROY);
  };

  ModuleManager.prototype.DOMReady = function () {
    this._queAutoCreate();
  };

  ModuleManager.prototype.DOMUpdated = function () {
    this._quePurge();

    this._queAutoCreate();
  };

  ModuleManager.prototype.tick = function () {
    this._modules.forEach(function (moduleInstance) {
      if (moduleInstance.tick) {
        moduleInstance.tick();
      }
    });
  };

  ModuleManager.prototype.scroll = function (windowY) {
    this._modules.forEach(function (moduleInstance) {
      if (moduleInstance.scroll) {
        moduleInstance.scroll(windowY);
      }
    });
  };

  ModuleManager.prototype.resize = function (sizes) {
    this._modules.forEach(function (moduleInstance) {
      if (moduleInstance.resize) {
        moduleInstance.resize(sizes);
      }
    });
  };

  ModuleManager.prototype.createModulesInTarget = function ($target) {
    this._createModulesInTarget($target);
  }; //private 
  //--------------------------------------------------


  ModuleManager.prototype._getModuleById = function (id) {
    for (var i = 0; i < this._modules.length; i++) {
      if (this._modules[i].id === id) {
        return this._modules[i];
      }
    }

    return null;
  };

  ModuleManager.prototype._getModulesByTag = function (tag) {
    return this._modules.filter(function (moduleItem) {
      return moduleItem.tag === tag;
    });
  };

  ModuleManager.prototype._getByModuleName = function (name) {
    return this._modules.filter(function (moduleItem) {
      return moduleItem.moduleName === name;
    });
  };

  ModuleManager.prototype._queAutoCreate = function () {
    Debugbase_1.Debugbase.DOM.clearQue(this._autoCreateQueId);
    this._autoCreateQueId = Debugbase_1.Debugbase.DOM.que(this._autoCreateModules.bind(this));
  }; //Grab any module that haven't been created
  //Create modules are assigned the m-mounted="true" attribute and stop being selected again


  ModuleManager.prototype._autoCreateModules = function (target) {
    if (target === void 0) {
      target = document;
    } //Create a dyamic instance loader on the window.Debugbase scope: 


    if (!this._instanceLoader) {
      this._instanceLoader = new InstanceLoader_1.InstanceLoader(window.DebugbaseModules);
    }

    this._createModulesInTarget(document);

    Events_1.Events.dispatch(CoreEvents_1.CoreEvents.MODULES_MOUNTED);
  };

  ModuleManager.prototype._createModulesInTarget = function (target) {
    var _this = this;

    var modules = target.querySelectorAll('[m]:not([m-mounted=\'true\'])');
    modules.forEach(function (moduleElement) {
      try {
        _this._createModule(moduleElement);
      } catch (e) {
        console.log('MODULE LOAD ERROR !!!!!!!!!!!!!!!!!!!!!!', moduleElement, e);
      }
    });
  }; //Create a single module to push into the the 
  //This is a special case (Like behaviours) where modules classes are set to set window.scope and create at runtime
  //So those classes need to be imported to app or relevant scope


  ModuleManager.prototype._createModule = function (element) {
    //Get a list of attbuites parsed into numbers/booleans/strings: 
    var attributes = Debugbase_1.Debugbase.framework.getParsedAttributes(element); //Create the instance: 

    var instance = this._getInstance(attributes.m);

    instance.$container = element;
    instance.id = element.getAttribute('id');

    if (attributes['m-tag']) {
      instance.tag = attributes['m-tag'];
    }

    Debugbase_1.Debugbase.framework.attributesToConfig(instance, attributes, attributes.m);
    instance.moduleName = attributes.m;
    instance.create(); //Flag mounted:  

    instance.mounted = true;
    Debugbase_1.Debugbase.DOM.setAttribute(element, 'm-mounted', 'true'); //Add to stack: 

    this._modules.push(instance);
  };

  ModuleManager.prototype._quePurge = function () {
    Debugbase_1.Debugbase.DOM.clearQue(this._purgeQueId);
    this._purgeQueId = Debugbase_1.Debugbase.DOM.que(this._purge.bind(this));
  };

  ModuleManager.prototype._purge = function () {
    var i = 0;

    while (i < this._modules.length) {
      //Check if module removed/missing but not destroyed: 
      if (!this._modules[i].destroyed && this._isRemoved(this._modules[i])) {
        this._destroyModule(this._modules[i]);
      }

      if (this._modules[i].destroyed) {
        Events_1.Events.dispatch(CoreEvents_1.CoreEvents.MODULE_DESTOYED, this._modules[i].id);

        this._modules.splice(i, 1);
      } else {
        i++;
      }
    }
  };

  ModuleManager.prototype._getInstance = function (moduleName) {
    var className = Debugbase_1.Debugbase.string.snakeToClassName(moduleName);
    console.log('className', className);
    return this._instanceLoader.getInstance(className);
  };

  ModuleManager.prototype._isRemoved = function (moduleInstance) {
    return moduleInstance.removed || !Debugbase_1.Debugbase.DOM.contains(moduleInstance.$container);
  };

  ModuleManager.prototype._clearById = function (id, type) {
    var module = this._getModuleById(id);

    if (!module) {
      return;
    } //Remove OR destroy module: 


    if (type === ClearType.DESTROY) {
      this._destroyModule(module);
    } else {
      this._removeModule(module);
    } //Remove (Que asnc so it only happens once no matter how much its called): 


    this._quePurge();
  };

  ModuleManager.prototype._clearByTag = function (tag) {
    var _this = this;

    this._getModulesByTag(tag).forEach(function (item) {
      return _this._destroyModule(item);
    });
  };

  ModuleManager.prototype._removeModule = function (moduleInstance) {
    if (!moduleInstance.$container) {
      return;
    }

    moduleInstance.removed = true;
    Debugbase_1.Debugbase.DOM.removeElement(moduleInstance.$container);
    Debugbase_1.Debugbase.DOM.removeAttributte(moduleInstance.$container, 'm');
    Debugbase_1.Debugbase.DOM.removeAttributte(moduleInstance.$container, 'm-mouted');
    moduleInstance.$container = null;

    if (!moduleInstance.destroyed) {
      this._destroyModule(moduleInstance);
    }
  };

  ModuleManager.prototype._destroyModule = function (moduleInstance) {
    console.log('Destroy Module', moduleInstance);
    moduleInstance.destroy();
    moduleInstance.active = false;
    moduleInstance.$container = null;
    moduleInstance.destroyed = true;
  };

  return ModuleManager;
}();

exports.ModuleManager = ModuleManager;

if ('NodeList' in window && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = function (callback, thisArg) {
    thisArg = thisArg || window;

    for (var i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  };
}

/***/ }),

/***/ "./src/debugbase/managers/RouteManager.ts":
/*!************************************************!*\
  !*** ./src/debugbase/managers/RouteManager.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var Navigo = __webpack_require__(/*! navigo */ "./node_modules/navigo/lib/navigo.min.js");

var RouteManager =
/** @class */
function () {
  function RouteManager() {
    this.openingRouteOnly = true;
    this._routes = [];
  }

  Object.defineProperty(RouteManager.prototype, "controllerManager", {
    set: function set(manager) {
      this._controllerManager = manager;
    },
    enumerable: true,
    configurable: true
  });

  RouteManager.prototype.set = function (routes) {
    this._routes = routes;
  };

  RouteManager.prototype.init = function () {
    if (this._routes.length) {
      this._createRouter();
    }
  };

  RouteManager.prototype._createRouter = function () {
    var _this = this;

    var router = new Navigo(null);
    var navigoRoutes = {};

    var _loop_1 = function _loop_1(i) {
      var url = this_1._routes[i].path;

      var controller = this_1._controllerManager.get(this_1._routes[i].controller);

      var func = this_1._routes[i].function ? this_1._routes[i].function : 'init';

      navigoRoutes[url] = function (params, query) {
        if (params === void 0) {
          params = null;
        }

        if (query === void 0) {
          query = null;
        }

        controller[func](params); //Only want to route first load:

        if (_this.openingRouteOnly) {
          router.pause();
        }
      };
    };

    var this_1 = this;

    for (var i = 0; i < this._routes.length; i++) {
      _loop_1(i);
    }

    router.notFound(function (query) {
      console.log("ROUTE NOT FOUND----");
    });
    router.on(navigoRoutes).resolve();
  };

  return RouteManager;
}();

exports.RouteManager = RouteManager;

/***/ }),

/***/ "./src/debugbase/managers/StateManager.ts":
/*!************************************************!*\
  !*** ./src/debugbase/managers/StateManager.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 //StateManager. Hold states, broadcast changes and update binded elements
//1.0 

Object.defineProperty(exports, "__esModule", {
  value: true
});

var StateManager =
/** @class */
function () {
  function StateManager() {
    this._states = []; //States

    this._refs = {}; //Refs for direct access to states 
  }

  Object.defineProperty(StateManager.prototype, "data", {
    //Direct access data objects (quicker than string)
    get: function get() {
      return this._refs;
    },
    enumerable: true,
    configurable: true
  });

  StateManager.prototype.set = function (id, value) {
    return null;
    return this._getById(id).setValue(value);
  };

  StateManager.prototype.get = function (id) {
    return null;
    return this._getById(id).getValue();
  };

  StateManager.prototype.DOMReady = function () {//this._createAutoStateBinds();
  };

  StateManager.prototype.DOMUpdated = function () {//this._createAutoStateBinds();
  };

  StateManager.prototype.bind = function (id, $target, setHTMLFromState) {
    this._getById(id).bind($target, setHTMLFromState);
  }; //private 
  //------------------------------------------------------------
  //------------------------------------------------------------
  //------------------------------------------------------------
  //------------------------------------------------------------


  StateManager.prototype._getById = function (id) {
    for (var i = 0; i < this._states.length; i++) {
      if (this._states[i].config.id === id) {
        return this._states[i];
      }
    }

    return this._createState(id);
  }; //Select all states in the HTML: 
  //<h1 s='project-title' s-created></h1>

  /*private  _createAutoStateBinds(): void {
      
      var $targets = $('[s]');
      var id, instance;
      
      $targets.each(function(index) {
          id = $(this).data('s');
          instance = this.get(id);
          instance.config = FrameworkTools.createConfig($(this), instance, 's-{prop}'');
          instance.props.$target = $(this);
          instance.init();
      });
    }
  */


  StateManager.prototype._createState = function (id) {
    this._refs[id] = this._states[this._states.length - 1];
    return this._refs[id];
  };

  return StateManager;
}();

exports.StateManager = StateManager;

/***/ }),

/***/ "./src/debugbase/tracking/GA.ts":
/*!**************************************!*\
  !*** ./src/debugbase/tracking/GA.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var GA =
/** @class */
function () {
  function GA() {}

  GA.event = function (eventCategory, eventAction, eventLabel, eventValue) {
    if (eventLabel === void 0) {
      eventLabel = null;
    }

    if (eventValue === void 0) {
      eventValue = null;
    }

    window.ga('send', 'event', eventCategory, eventAction, eventLabel, eventValue);
  };

  return GA;
}();

exports.GA = GA;

/***/ }),

/***/ "./src/debugbase/util/DragBreakpoints.ts":
/*!***********************************************!*\
  !*** ./src/debugbase/util/DragBreakpoints.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var InertiaDrag_1 = __webpack_require__(/*! debugbase/util/InertiaDrag */ "./src/debugbase/util/InertiaDrag.ts");

var Debugbase_1 = __webpack_require__(/*! debugbase/Debugbase */ "./src/debugbase/Debugbase.ts");

var axisType;

(function (axisType) {
  axisType[axisType["X"] = 0] = "X";
  axisType[axisType["Y"] = 1] = "Y";
})(axisType = exports.axisType || (exports.axisType = {}));

var DragBreakpoints =
/** @class */
function () {
  function DragBreakpoints(count, loop, startIndex, snap, $target) {
    if (loop === void 0) {
      loop = false;
    }

    if (startIndex === void 0) {
      startIndex = 0;
    }

    if (snap === void 0) {
      snap = true;
    }

    if ($target === void 0) {
      $target = null;
    }

    this.loop = loop;
    this.snap = snap;
    this.easePower = 10.0;
    this.releaseEasePower = 15.0;
    this.axis = axisType.X; //public tolerance: number = 1200;

    this.forceSnap = true;
    this._active = false;
    this._progress = 0;
    this._targetProgress = 0;
    this._breakpoints = [];
    this._breakpointIndex = 0;
    this._easePower = 10;
    this._virtualWidth = 2000; //Fake width to allow

    this._dragToMoveRatio = 0.25; //User needs to move 25% of the screen to do a full move across								

    this._overflowZoneTolerence = 0.05; //If drag is started  

    this._overflowAmount = 0.04;
    this._overflowZoneActive = false;
    this._defaultConstraints = {
      min: 0,
      max: 1
    };
    this._constraints = {
      min: 0,
      max: 1
    };
    this._breakpointShare = 1.0 / count;
    this._breakpointIndex = startIndex;

    this._createBreakpoints(count);

    this._addInertiaDrag($target);
  }

  DragBreakpoints.prototype.setActive = function (active) {
    if (!this._active && active) {
      window.requestAnimationFrame(this._tick.bind(this));
    }

    this._active = active;

    this._inertiaDrag.setActive(this._active);
  };
  /** Set the imaginary width of the container being moved. I.E x3 screen width */


  DragBreakpoints.prototype.setVirtualWidth = function (width) {
    this._virtualWidth = width;
  };
  /** Set the ratio on mouch the user needs to move to drag the screen. I smaller number means more responsive */


  DragBreakpoints.prototype.setDragToMoveRatio = function (ratio) {
    this._dragToMoveRatio = ratio;
  };
  /** Set default contrains of drag action. Useful to stop early like on Work section */


  DragBreakpoints.prototype.setConstraints = function (min, max) {
    if (min === void 0) {
      min = 0;
    }

    if (max === void 0) {
      max = 1;
    }

    this._defaultConstraints = {
      min: min,
      max: max
    };
  }; //** Override the progress */


  DragBreakpoints.prototype.setProgress = function (ratio) {
    this._breakpointIndex = 0; //this._progress = this._targetProgress = (ratio * this.tolerance);

    this._progress = this._targetProgress = ratio;
  }; //**Set a new target. Usefull to animate */


  DragBreakpoints.prototype.setTarget = function (ratio) {
    //this._targetProgress = ratio * this.tolerance;
    this._targetProgress = ratio;
  }; //Force the index from external event 


  DragBreakpoints.prototype.setIndex = function (index) {
    this._snap(index, false);
  }; //Set the require move thershold as a ratio of total amount 


  DragBreakpoints.prototype.setStartThreshold = function (thershold) {
    this._thresholdTolerence = thershold;
    this._requiresThreshold = this._thresholdTolerence > 0;
  }; //Create the breakpoints: 


  DragBreakpoints.prototype._createBreakpoints = function (count) {
    if (this.loop) {
      this._createLoopBreakPoints(count);
    } else {
      this._createNonLoopBreakPoints(count);
    }
  };

  DragBreakpoints.prototype._createLoopBreakPoints = function (count) {
    var ratio, lower, upper;
    ratio = 0.0; // -0. | 0.0 | 0.125 |   

    for (var i = 0; i < count; i++) {
      this._breakpoints.push({
        ratio: ratio,
        upper: ratio + this._breakpointShare / 2,
        lower: ratio - this._breakpointShare / 2
      });

      ratio += this._breakpointShare;
    }

    this._breakpoints.push({
      ratio: 1.0,
      upper: 1.0 + this._breakpointShare / 2,
      lower: 1.0 - this._breakpointShare / 2
    });
  };

  DragBreakpoints.prototype._createNonLoopBreakPoints = function (count) {
    var ratio, lower, upper;

    for (var i = 0; i < count; i++) {
      if (i === 0) {
        ratio = 0;
        lower = 0;
        upper = this._breakpointShare;
      } else if (i === count - 1) {
        ratio = 1.0;
        lower = 1.0 - this._breakpointShare;
        upper = 1.0;
      } else {
        ratio = i * this._breakpointShare + this._breakpointShare / 2;
        lower = ratio - this._breakpointShare / 2;
        upper = ratio + this._breakpointShare / 2;
      }

      this._breakpoints.push({
        ratio: ratio,
        upper: upper,
        lower: lower
      });
    }
  };

  DragBreakpoints.prototype._addInertiaDrag = function ($target) {
    if ($target === void 0) {
      $target = null;
    }

    this._inertiaDrag = new InertiaDrag_1.InertiaDrag($target); //this._inertiaDrag.axis = (this.axis === axisType.X) ? 'x' : 'y';

    this._inertiaDrag.simulate = true;
    this._inertiaDrag.simulateSteps = 60;
    this._inertiaDrag.stepAfterRelease = false;
    this._inertiaDrag.onPress = this._onInertiaDragPress.bind(this);
    this._inertiaDrag.onStep = this._onInertiaDragStep.bind(this);
    this._inertiaDrag.onRelease = this._onInertiaDragRelease.bind(this);
  };

  DragBreakpoints.prototype._onInertiaDragPress = function () {
    if (!this._active) {
      return;
    }

    this._thresholdReached = false;
    this._thresholdCount = 0;

    this._testInOverflowZone();

    this.onStartDrag();
  };

  DragBreakpoints.prototype._onInertiaDragStep = function (stepProgress) {
    if (!this._active) {
      return;
    } //Reset Ease power 


    this._easePower = this.easePower;

    var increaseRatio = -1 * this._getMoveRatio(stepProgress); //If a drag thershold is required to start. This required when there is also paging scrolling as it's too senstive with out some sort of tolerence 


    if (this._requiresThreshold && !this._thresholdReached) {
      this._thresholdCount += increaseRatio; //Check if the thershold is lower than required value

      if (Math.abs(this._thresholdCount) < this._thresholdTolerence) {
        return;
      } //Made it past the check for this mouse down so allow the user to drag sideways 
      //TODO should it now try and prevent default on touch move???


      this._thresholdReached = true;
    }

    this._increaseProgress(increaseRatio);
  };

  DragBreakpoints.prototype._increaseProgress = function (increaseRatio) {
    this._targetProgress = Debugbase_1.Debugbase.math.constrain(this._targetProgress + increaseRatio, this._constraints.min, this._constraints.max);
  }; //Tick function, manages setting progress: 


  DragBreakpoints.prototype._tick = function () {
    //When not using Tweenmax to tween to snap then use stand inernia
    if (!this._tweening) {
      this._progress = this._progress + (this._targetProgress - this._progress) / this._easePower;
    } //Snap as soon as thersold is crossed


    if (!this._snapping) {
      var snapbreakPointIndex = this._getBreakpoint(this._progress);

      if (snapbreakPointIndex !== this._breakpointIndex) {
        this._breakpointIndex = snapbreakPointIndex;

        if (this.forceSnap) {
          this._inertiaDrag.forceStop();

          this._snap(this._breakpointIndex);
        }
      }
    }

    this.onTick(this._progress);

    if (this._overflowZoneActive) {
      this._testInOverflowZone();
    }

    if (this._active) {
      window.requestAnimationFrame(this._tick.bind(this));
    }
  }; //User has release mouse, check what needs to be snapped to: 


  DragBreakpoints.prototype._onInertiaDragRelease = function (simuatedProgress) {
    var _this = this;

    this._overflowZoneActive = false;

    this._setConstraints();

    this._constrain();

    if (this.onStopDrag) {
      this.onStopDrag();
    }

    if (!this.snap) {
      setTimeout(function () {
        return _this._inertiaDrag.setActive(true);
      }, 300);
      setTimeout(function () {
        return _this._snapping = false;
      }, 600);
      return;
    }

    var increaseRatio = this._getMoveRatio(simuatedProgress);

    var finalProgress = Debugbase_1.Debugbase.math.constrain(this._targetProgress - increaseRatio, 0, 1);

    var snapbreakPointIndex = this._getBreakpoint(finalProgress);

    if (snapbreakPointIndex > this._breakpointIndex) {
      snapbreakPointIndex = this._breakpointIndex + 1;
    } else if (snapbreakPointIndex < this._breakpointIndex) {
      snapbreakPointIndex = this._breakpointIndex - 1;
    }

    this._snap(snapbreakPointIndex);
  };
  /** Get swipe move ratio. By comparing to width of container. */


  DragBreakpoints.prototype._getMoveRatio = function (point) {
    var increase = this.axis === axisType.X ? point.x : point.y;
    return increase / (this._virtualWidth * this._dragToMoveRatio);
  };
  /** Snap to point: */


  DragBreakpoints.prototype._snap = function (snapIndex, broadcastEvent) {
    var _this = this;

    if (broadcastEvent === void 0) {
      broadcastEvent = true;
    }

    if (!this._active) {
      return;
    }

    this._snapping = true;
    this._easePower = this.releaseEasePower;
    this._breakpointIndex = snapIndex;
    this._targetProgress = this._breakpoints[this._breakpointIndex].ratio;

    if (broadcastEvent) {
      this.onSnap(this._breakpointIndex);
    }

    setTimeout(function () {
      return _this._inertiaDrag.setActive(true);
    }, 300);
    setTimeout(function () {
      return _this._snapping = false;
    }, 600);
  }; //Get the breakpoint for a ratio: 


  DragBreakpoints.prototype._getBreakpoint = function (ratio) {
    for (var i = 0; i < this._breakpoints.length; i++) {
      if (ratio >= this._breakpoints[i].lower && ratio <= this._breakpoints[i].upper) {
        return i;
      }
    }
  };
  /** Test if drag is starting in overflow zone */


  DragBreakpoints.prototype._testInOverflowZone = function () {
    var lower = this._defaultConstraints.min + this._overflowZoneTolerence;
    var upper = this._defaultConstraints.max - this._overflowZoneTolerence;
    this._overflowZoneActive = this._progress < lower || this._progress > upper;

    this._setConstraints();
  };
  /** Set the constraints for the amount the drag is allowed to progress to */


  DragBreakpoints.prototype._setConstraints = function () {
    if (this._overflowZoneActive) {
      this._constraints.min = this._defaultConstraints.min - this._overflowAmount;
      this._constraints.max = this._defaultConstraints.max + this._overflowAmount;
      return;
    }

    this._constraints.min = this._defaultConstraints.min;
    this._constraints.max = this._defaultConstraints.max;
  };
  /** Constrain the values to meaningful */


  DragBreakpoints.prototype._constrain = function () {
    this._targetProgress = Debugbase_1.Debugbase.math.constrain(this._targetProgress, this._constraints.min, this._constraints.max);
  };

  return DragBreakpoints;
}();

exports.DragBreakpoints = DragBreakpoints;

/***/ }),

/***/ "./src/debugbase/util/InertiaDrag.ts":
/*!*******************************************!*\
  !*** ./src/debugbase/util/InertiaDrag.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
}); //v1.0.0 - Drag controller to 

var Events_1 = __webpack_require__(/*! debugbase/events/Events */ "./src/debugbase/events/Events.ts"); // ——————————————————————————————————————————————————
// ProgressTimeline.js
// ——————————————————————————————————————————————————


var FRICTION_COEFF = 0.96;

var InertiaDrag =
/** @class */
function () {
  function InertiaDrag($target) {
    this.disableOnRelease = true;
    this.friction = 0.96;
    this.axis = 'both';
    this.simulate = false;
    this.simulateSteps = 60;
    this.stepAfterRelease = true;
    this.onPress = null;
    this.onStep = null;
    this.onRelease = null;
    this._active = false;
    this._stopFlag = false;
    this._active = false; //this.$container = document.querySelector( selector );

    this.$container = $target || window; //this.bounds =  this.$container.getBoundingClientRect();

    this.position = {
      x: 0,
      y: 0
    };
    this.previous = {
      x: 0,
      y: 0
    };
    this.mouse = {
      x: 0,
      y: 0
    };
    this.velocity = {
      x: 0,
      y: 0
    };
    this.dragging = false;

    this._addEvents();

    this._step();
  }

  InertiaDrag.prototype.setActive = function (active) {
    if (!this._active && active) {
      this._active = true;
      requestAnimationFrame(this._step.bind(this));
    }

    this._active = active;
  };

  InertiaDrag.prototype.forceStop = function () {
    this.dragging = this._active = false;
    this._stopFlag = true;
  };

  InertiaDrag.prototype._addEvents = function () {
    var _this = this;

    this.$container.addEventListener('mousedown', function (e) {
      if (!_this._active) {
        return;
      }

      _this._stopFlag = false;
      _this.position.x = _this.previous.x = _this.mouse.x = e.pageX;
      _this.position.y = _this.previous.y = _this.mouse.y = e.pageY;
      _this.dragging = true;

      if (_this.onPress) {
        _this.onPress();
      }
    });
    this.$container.addEventListener('touchstart', function (e) {
      if (!_this._active) {
        return;
      }

      _this._stopFlag = false;
      _this.position.x = _this.previous.x = _this.mouse.x = e.touches[0].pageX;
      _this.position.y = _this.previous.y = _this.mouse.y = e.touches[0].pageY;
      _this.dragging = true;

      if (_this.onPress) {
        _this.onPress();
      }
    });
    this.$container.addEventListener('touchmove', function (e) {
      if (!_this._active || _this._stopFlag) {
        return;
      }

      _this.mouse.x = e.touches[0].clientX;
      _this.mouse.y = e.touches[0].clientY;
    }); //$(window).on('mouseup', () => {

    Events_1.Events.on('mouseup', window, function () {
      if (!_this._active || _this._stopFlag) {
        return;
      }

      _this.dragging = false;

      var simulatedSteps = _this._simulateSteps();

      if (_this.onRelease) {
        _this.onRelease(simulatedSteps);
      }

      if (_this.disableOnRelease) {
        _this._active = false;
      }
    });
    Events_1.Events.on('touchend', window, function () {
      if (!_this._active || _this._stopFlag) {
        return;
      }

      _this.dragging = false;
      var simulatedSteps = {
        x: 0,
        y: 0
      };

      if (_this.onRelease) {
        _this.onRelease(simulatedSteps);
      }

      if (_this.disableOnRelease) {
        _this._active = false;
      }
    });
    Events_1.Events.on('mousemove', window, function (event) {
      if (!_this._active || _this._stopFlag) {
        return;
      }

      _this.mouse.x = event.clientX;
      _this.mouse.y = event.clientY;
    });
  };

  InertiaDrag.prototype._step = function () {
    if (this._active) {
      requestAnimationFrame(this._step.bind(this));
    }

    if (!this._active || this._stopFlag) {
      return;
    }

    if (this.dragging) {
      this.previous.x = this.position.x;
      this.previous.y = this.position.y;
      this.position.x = this.mouse.x;
      this.position.y = this.mouse.y;
      this.velocity.x = this.position.x - this.previous.x;
      this.velocity.y = this.position.y - this.previous.y;
    } else {
      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;
      this.velocity.x *= this.friction;
      this.velocity.y *= this.friction;
    }

    this._fireStep = true;

    if (this.velocity.x === 0 && this.velocity.y === 0) {
      this._fireStep = false;
    } else if (!this.dragging && !this.stepAfterRelease) {
      this._fireStep = false;
    }

    if (this._fireStep) {
      this.onStep({
        x: this.velocity.x,
        y: this.velocity.y
      });
    }
  }; //After the user has released mouse simulates release to see where it wouyld het 


  InertiaDrag.prototype._simulateSteps = function () {
    if (!this.simulate || this.simulateSteps === 0) {
      return {
        x: 0,
        y: 0
      };
    }

    var tempPosition = {
      x: 0,
      y: 0
    };
    var tempVelocity = {
      x: this.velocity.x,
      y: this.velocity.y
    };

    for (var i = 0; i < this.simulateSteps; i++) {
      tempPosition.x += tempVelocity.x;
      tempPosition.y += tempVelocity.y;
      tempVelocity.x *= this.friction;
      tempVelocity.y *= this.friction;
    }

    return tempPosition;
  };

  InertiaDrag.STEP = 'STEP';
  return InertiaDrag;
}();

exports.InertiaDrag = InertiaDrag;

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var Debugbase_1 = __webpack_require__(/*! debugbase/Debugbase */ "./src/debugbase/Debugbase.ts"); //Load all the controllers 


var AppController_1 = __webpack_require__(/*! app/controller/AppController */ "./src/app/controller/AppController.ts");

var PixiController_1 = __webpack_require__(/*! app/controller/PixiController */ "./src/app/controller/PixiController.ts");

var PreloadController_1 = __webpack_require__(/*! app/controller/PreloadController */ "./src/app/controller/PreloadController.ts");

var UIController_1 = __webpack_require__(/*! app/controller/UIController */ "./src/app/controller/UIController.ts");

var NavMenuController_1 = __webpack_require__(/*! app/controller/NavMenuController */ "./src/app/controller/NavMenuController.ts");

var MouseController_1 = __webpack_require__(/*! app/controller/MouseController */ "./src/app/controller/MouseController.ts");

var BackgroundController_1 = __webpack_require__(/*! app/controller/BackgroundController */ "./src/app/controller/BackgroundController.ts");

var HomeController_1 = __webpack_require__(/*! app/controller/HomeController */ "./src/app/controller/HomeController.ts");

var WorkController_1 = __webpack_require__(/*! app/controller/WorkController */ "./src/app/controller/WorkController.ts");

var ProjectController_1 = __webpack_require__(/*! app/controller/ProjectController */ "./src/app/controller/ProjectController.ts");

var InfoController_1 = __webpack_require__(/*! app/controller/InfoController */ "./src/app/controller/InfoController.ts");

var ScrollbarController_1 = __webpack_require__(/*! app/controller/ScrollbarController */ "./src/app/controller/ScrollbarController.ts");

var HistoryController_1 = __webpack_require__(/*! app/controller/HistoryController */ "./src/app/controller/HistoryController.ts");

__webpack_require__(/*! module.imports */ "./src/module.imports.ts"); //Controller needs to 
//1.) Load all app controllers 
//2.) Decide what needs to run as core 
//3.) Decide what needs to run as 


Debugbase_1.Debugbase.controller.add( //Global and UI:
{
  instance: new PixiController_1.PixiController('Pixi'),
  global: true
}, {
  instance: new AppController_1.AppController('App'),
  global: true
}, {
  instance: new PreloadController_1.PreloadController('Preload'),
  global: true,
  selector: '.preload'
}, {
  instance: new UIController_1.UIController('UI'),
  global: true,
  selector: '.ui'
}, {
  instance: new NavMenuController_1.NavMenuController('NavMenu'),
  global: true,
  selector: '.navmenu'
}, {
  instance: new HistoryController_1.HistoryController('History'),
  global: true
}, {
  instance: new MouseController_1.MouseController('Mouse'),
  global: true,
  selector: 'body'
}, {
  instance: new ScrollbarController_1.ScrollbarController('Scrollbar'),
  global: true,
  selector: '.scrollbar'
}, {
  instance: new BackgroundController_1.BackgroundController('Background'),
  global: true
}, //Main views: 
{
  instance: new HomeController_1.HomeController('Home'),
  selector: '.home'
}, {
  instance: new WorkController_1.WorkController('Screens'),
  selector: '.work.-screens'
}, {
  instance: new WorkController_1.WorkController('Spaces'),
  selector: '.work.-spaces'
}, {
  instance: new ProjectController_1.ProjectController('Project'),
  selector: '.project'
}, {
  instance: new InfoController_1.InfoController('Info'),
  selector: '.info'
});
Debugbase_1.Debugbase.route.set([{
  path: '/',
  controller: 'Home'
}, {
  path: 'screens',
  controller: 'Screens',
  function: 'screens'
}, {
  path: 'spaces',
  controller: 'Spaces',
  function: 'spaces'
}, {
  path: 'screens/:project',
  controller: 'Project',
  function: 'screens'
}, {
  path: 'spaces/:project',
  controller: 'Project',
  function: 'spaces'
}, {
  path: 'about',
  controller: 'Info',
  function: 'about'
}, {
  path: 'studio',
  controller: 'Info',
  function: 'studio'
}, {
  path: 'jobs',
  controller: 'Info',
  function: 'jobs'
}, {
  path: 'contact',
  controller: 'Info',
  function: 'contact'
}]);
Debugbase_1.Debugbase.init();

/***/ }),

/***/ "./src/inversify.config.ts":
/*!*********************************!*\
  !*** ./src/inversify.config.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var inversify_1 = __webpack_require__(/*! inversify */ "./node_modules/inversify/lib/inversify.js");

var types_1 = __webpack_require__(/*! ./types */ "./src/types.ts");

var LoggerService_1 = __webpack_require__(/*! app/services/debug/LoggerService */ "./src/app/services/debug/LoggerService.ts");

var ComplexLoggerService_1 = __webpack_require__(/*! app/services/debug/ComplexLoggerService */ "./src/app/services/debug/ComplexLoggerService.ts");

var iocContainer = new inversify_1.Container();
exports.iocContainer = iocContainer;
iocContainer.bind(types_1.TYPES.Logger).to(LoggerService_1.LoggerService);
iocContainer.bind(types_1.TYPES.ComplexLogger).to(ComplexLoggerService_1.ComplexLoggerService);

/***/ }),

/***/ "./src/module.imports.ts":
/*!*******************************!*\
  !*** ./src/module.imports.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var LoaderGraphic_1 = __webpack_require__(/*! app/module/global/LoaderGraphic */ "./src/app/module/global/LoaderGraphic.ts");

var Paging_1 = __webpack_require__(/*! app/module/global/Paging */ "./src/app/module/global/Paging.ts");

var DragPanel_1 = __webpack_require__(/*! app/module/global/DragPanel */ "./src/app/module/global/DragPanel.ts");

var HitArea_1 = __webpack_require__(/*! app/module/global/HitArea */ "./src/app/module/global/HitArea.ts");

var VideoSwitch_1 = __webpack_require__(/*! app/module/project/VideoSwitch */ "./src/app/module/project/VideoSwitch.ts");

var GoogleMap_1 = __webpack_require__(/*! app/module/info/GoogleMap */ "./src/app/module/info/GoogleMap.ts");

var LazyLoadImage_1 = __webpack_require__(/*! app/module/media/LazyLoadImage */ "./src/app/module/media/LazyLoadImage.ts");

var LoadMore_1 = __webpack_require__(/*! app/module/widget/LoadMore */ "./src/app/module/widget/LoadMore.ts");

window.DebugbaseModules = {
  //ParallaxGroup: ParallaxGroup,
  LoaderGraphic: LoaderGraphic_1.LoaderGraphic,
  Paging: Paging_1.Paging,
  DragPanel: DragPanel_1.DragPanel,
  HitArea: HitArea_1.HitArea,
  VideoSwitch: VideoSwitch_1.VideoSwitch,
  GoogleMap: GoogleMap_1.GoogleMap,
  LazyLoadImage: LazyLoadImage_1.LazyLoadImage,
  LoadMore: LoadMore_1.LoadMore
};

/***/ }),

/***/ "./src/types.ts":
/*!**********************!*\
  !*** ./src/types.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var TYPES = {
  Logger: Symbol.for('Logger'),
  ComplexLogger: Symbol.for('ComplexLogger')
};
exports.TYPES = TYPES;

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map