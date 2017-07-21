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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 28);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(7);

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
 *  typeof document.createElement -> undefined
 */
function isStandardBrowserEnv() {
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined' &&
    typeof document.createElement === 'function'
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
  if (typeof obj !== 'object' && !isArray(obj)) {
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
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(0);
var normalizeHeaderName = __webpack_require__(25);

var PROTECTION_PREFIX = /^\)\]\}',?\n/;
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
    adapter = __webpack_require__(3);
  } else if (typeof process !== 'undefined') {
    // For node use HTTP adapter
    adapter = __webpack_require__(3);
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
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
      data = data.replace(PROTECTION_PREFIX, '');
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

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

utils.forEach(['delete', 'get', 'head'], function forEachMehtodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(11);

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(0);
var settle = __webpack_require__(17);
var buildURL = __webpack_require__(20);
var parseHeaders = __webpack_require__(26);
var isURLSameOrigin = __webpack_require__(24);
var createError = __webpack_require__(6);
var btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || __webpack_require__(19);

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();
    var loadEvent = 'onreadystatechange';
    var xDomain = false;

    // For IE 8/9 CORS support
    // Only supports POST and GET calls and doesn't returns the response headers.
    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
    if (process.env.NODE_ENV !== 'test' &&
        typeof window !== 'undefined' &&
        window.XDomainRequest && !('withCredentials' in request) &&
        !isURLSameOrigin(config.url)) {
      request = new window.XDomainRequest();
      loadEvent = 'onload';
      xDomain = true;
      request.onprogress = function handleProgress() {};
      request.ontimeout = function handleTimeout() {};
    }

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
    request[loadEvent] = function handleLoad() {
      if (!request || (request.readyState !== 4 && !xDomain)) {
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
        // IE sends 1223 instead of 204 (https://github.com/mzabriskie/axios/issues/201)
        status: request.status === 1223 ? 204 : request.status,
        statusText: request.status === 1223 ? 'No Content' : request.statusText,
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
      reject(createError('Network Error', config));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED'));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(22);

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
        if (request.responseType !== 'json') {
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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)))

/***/ }),
/* 4 */
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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(16);

/**
 * Create an Error with the specified message, config, error code, and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 @ @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, response);
};


/***/ }),
/* 7 */
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
/* 8 */
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
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _axios = __webpack_require__(2);

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SR_REMOTE_URL = 'https://apps.sunriseintegration.com/a/teelaunch';
var GOOGLE_FONT_URL = 'https://fonts.googleapis.com/css?family=';

var modalTemplate = '\n<div class="modal" id="sunrise_integration_modal">\n  <div class="modal-background"></div>\n  <div class="modal-card">\n    <header class="modal-card-head">\n      <p class="modal-card-title">Personalization - <small id="sunrise_variantTitle"></small></p>\n      <button class="delete"></button>\n    </header>\n    <section class="modal-card-body" id="personalizationApp">\n      <div class="box">\n        <figure class="image" id="personalizationImage">\n           <div id="textZone" class="text-zone">\n               <div id="innerTextZone">\n                    <span class="personalization-text"></span>\n                    <div id="textZoneImg"></div>\n                </div>\n            </div>\n          <img src="" width="350" height="350">\n        </figure>\n      </div>\n      <div class="box">\n        <div class="field has-addons">\n          <p class="control">\n            <input class="input" type="text" placeholder="Enter text here" id="personalizationText" maxlength="20">\n          </p>\n          <p class="control">\n    <span class="select">\n      <select id="personalizationColor">\n        <option value="white">White</option>\n        <option value="black">Black</option>\n        <option value="red">Red</option>\n        <option value="orange">Orange</option>\n        <option value="yellow">Yellow</option>\n        <option value="green">Green</option>\n        <option value="blue">Blue</option>\n        <option value="indigo">Indigo</option>\n      </select>\n    </span>\n  </p>\n        </div>\n\n      </div>\n    </section>\n    <footer class="modal-card-foot">\n      <a class="button is-success button-add-to-cart">Add To Cart</a>\n      <a class="button button-cancel">Cancel</a>\n    </footer>\n  </div>\n</div>\n';

var toastTemplate = '\n<div class="modal" id="sunrise_integration_toast">\n  <div class="modal-background"></div>\n  <div class="modal-card">\n    <header class="modal-card-head">\n      <p class="modal-card-title" id="toastText"></p>\n      <button class="delete"></button>\n    </header>\n  </div>\n</div>\n';

var Personalization = function () {
  function Personalization(details) {
    _classCallCheck(this, Personalization);

    this.details = details;
    console.log(this.details);

    // originally saved for placement on 500x500 image
    this.ratio = 350 / 500;

    this.inject();
  }

  _createClass(Personalization, [{
    key: 'inject',
    value: function inject() {

      var first = this.details[Object.keys(this.details)[0]];
      this.font = first.fontGooleUrlVar;

      if ($('#SR_modal_css').length === 0) {
        $('head').append('<link href="' + SR_REMOTE_URL + '/remote/css/modal.css" rel="stylesheet" id="SR_modal_css">');
      }

      $('head').append('<link href="' + GOOGLE_FONT_URL + this.font + '" rel="stylesheet">');

      if ($('#teelaunch_modals').length === 0) {
        modalTemplate = '<div id="teelaunch_modals">' + modalTemplate + '</div>';
        $('body').append(modalTemplate);
        $('#teelaunch_modals').append(toastTemplate);
      } else {
        $('#teelaunch_modals').append(modalTemplate);
        $('#teelaunch_modals').append(toastTemplate);
      }

      var $addToCart = $('[name=add]');
      var $parent = $addToCart.parent();
      var button_color = $addToCart.css('color');
      var button_background = $addToCart.css('background-color');
      var font_size = $addToCart.css('font-size');

      var buttonTemplate = $addToCart.outerHTML();

      buttonTemplate = buttonTemplate.replace(/(addToCart|AddToCart[^\"$]*)/, 'personalizeProduct');
      buttonTemplate = buttonTemplate.replace('name="add"', 'name="personalize"');
      buttonTemplate = buttonTemplate.replace('value="Add to Cart"', 'value="Personalize"');
      buttonTemplate = buttonTemplate.replace(/Add to Cart/i, 'Personalize');

      $addToCart.after(buttonTemplate);

      $('[name=personalize]').attr('id', 'personalizeProduct');

      $('#personalizeProduct').css({
        color: button_color,
        backgroundColor: button_background,
        width: '100%',
        fontSize: font_size
      }).addClass('btn');

      $addToCart.css({ display: 'none' });

      var $img = $('#personalizationImage img');
      var variantId = $('[name=id]').val();
      var $textZone = $('#textZone');
      var $textInput = $('#personalizationText');
      var $colorSelect = $('#personalizationColor');

      $colorSelect.val(first.fontColor.toLowerCase());
      $textInput.attr('data-initial-font', first.font);
      $textInput.attr('data-initial-text', first.placeholderText);
      $colorSelect.attr('data-initial-font', first.font);
      $textInput.val(first.placeholderText);
      $textInput.trigger('change');
      $colorSelect.trigger('change');

      $img.attr('src', this.details[variantId].variantImageNoTextUrl);

      var scaled_top = this.details[variantId].textTop;
      var scaled_left = this.details[variantId].textLeft;
      var scaled_width = this.details[variantId].width;
      var scaled_height = this.details[variantId].height;
      var font = this.details[variantId].font.ucwords();

      $textZone.css({ 'top': scaled_top + 'px' }).css({ 'left': scaled_left + 'px' }).css({ 'width': scaled_width + 'px' }).css({ 'height': scaled_height + 'px' }).css({ 'font-family': font });
    }
  }, {
    key: 'openModal',
    value: function openModal(variantId) {
      var $img = $('#personalizationImage img');

      var $variantTitle = $('#sunrise_variantTitle');

      var $textZone = $('#textZone');

      $img.attr('src', this.details[variantId].variantImageNoTextUrl);

      $variantTitle.text(this.details[variantId].variantTitle);

      console.log(this.details[variantId]);

      var scaled_top = this.details[variantId].textTop * this.ratio;
      var scaled_left = this.details[variantId].textLeft * this.ratio;

      var scaled_width = this.details[variantId].textWidth * this.ratio;
      var scaled_height = this.details[variantId].textHeight * this.ratio;

      var font = this.details[variantId].font.ucwords();

      $textZone.css({ 'top': scaled_top + 'px' }).css({ 'left': scaled_left + 'px' }).css({ 'width': scaled_width + 'px' }).css({ 'height': scaled_height + 'px' }).css({ 'font-family': font });

      $textZone.find('#textZoneImg').css({ 'height': scaled_height + 'px' });
    }
  }], [{
    key: 'addToCart',
    value: function addToCart(variantId, shop) {

      var quantity = $('[name=quantity]').val();

      _axios2.default.post('/cart/add.js', {
        quantity: quantity,
        id: variantId,
        properties: {
          'Custom Text': $('#personalizationText').val(),
          'Font Color': $('#personalizationColor').val()
        }
      }).then(function (response) {
        console.log(response);
        $('#sunrise_integration_modal').removeClass('is-active');
        if (response.status === 200) {
          $('#toastText').text('Product successfully added to cart!');
        } else {
          $('#toastText').text('Failed to add product to cart');
        }

        $('#sunrise_integration_toast').addClass('is-active');
        setTimeout(function () {
          $('#sunrise_integration_toast').removeClass('is-active');
        }, 2000);

        window.location = 'https://' + shop + '/cart';
      });
    }
  }, {
    key: 'resizeText',
    value: function resizeText() {
      var $textZone = $('#textZone');
      var HEIGHT_RATIO = 0.9;
      var $textSpan = $('#innerTextZone span');
      var height = $textZone.height();
      var fontSize = Math.round(height * HEIGHT_RATIO);

      $textSpan.css('font-size', fontSize + 'px').css('line-height', fontSize + 'px');

      var textZoneWidth = $textZone.width();

      while ($textSpan.width() > textZoneWidth && fontSize > 0) {

        console.log('Text Zone Width: ' + textZoneWidth + 'px');
        console.log('Text Span Width: ' + $textSpan.width() + 'px');

        console.log('Font size is ' + fontSize + 'px');
        fontSize = fontSize - 1;
        $textSpan.css('font-size', fontSize + 'px');
      }
    }
  }]);

  return Personalization;
}();

exports.default = Personalization;


String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

String.prototype.ucwords = function () {
  return (this + '').replace(/^([a-z\u00E0-\u00FC])|\s+([a-z\u00E0-\u00FC])/g, function ($1) {
    return $1.toUpperCase();
  });
};

String.prototype.lcwords = function () {
  return (this + '').replace(/^([a-z\u00E0-\u00FC])|\s+([a-z\u00E0-\u00FC])/g, function ($1) {
    return $1.toLowerCase();
  });
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SR_REMOTE_URL = 'https://apps.sunriseintegration.com/a/teelaunch';

var modalTemplate = '\n<div class="modal" id="sunrise_integration_sizing_modal">\n  <div class="modal-background"></div>\n  <div class="modal-card">\n    <header class="modal-card-head">\n      <p class="modal-card-title">Sizing Chart<small class="sunrise_variant_title"></small></p>\n      <button class="delete"></button>\n    </header>\n    <section class="modal-card-body" id="sizingApp">\n    <div class="box">\n    <div class="columns">\n    <div class="column">\n        <span>Please select:</span>\n    </div>\n    <div class="column">\n        <p class="control">\n    <span class="select">\n      <select name="sizingProducts" id="sizingProduct">\n    <option value="">Select Product</option>\n    </select>\n    </span>\n</p>\n    </div>\n    <div class="column">\n        <p class="control">\n    <span class="select">\n    <select name="sizingUnit" id="sizingUnit">\n    <option value="">Select Unit</option>\n    </select>\n</span>\n</p>\n    </div>\n    </div>\n    </div>\n      <div class="box">\n      <div class="columns">\n      <div class="column">\n      <table class="table is-bordered">\n      <thead id="sizingHeaders">\n      </thead>\n      <tbody id="sizingRows">\n      </tbody>\n      </table>\n</div>\n<div class="column">\n   <figure class="image" id="sizingImage">\n          <img src="">\n        </figure>\n</div>\n</div>\n      </div>\n    </section>\n    <footer class="modal-card-foot">\n    </footer>\n  </div>\n</div>\n';

var Sizing = function () {
  function Sizing(options) {
    _classCallCheck(this, Sizing);

    this.options = options;

    this.unit = {
      abbreviation: '',
      name: ''
    };

    this.init();
  }

  _createClass(Sizing, [{
    key: 'init',
    value: function init() {
      var first = this.options[Object.keys(this.options)[0]];

      this.setUnit(first.units[0]);

      if ($('#SR_modal_css').length === 0) {
        $('head').append('<link href="' + SR_REMOTE_URL + '/remote/css/modal.css" rel="stylesheet" id="SR_modal_css">');
      }

      if ($('#teelaunch_modals').length === 0) {
        modalTemplate = '<div id="teelaunch_modals">' + modalTemplate + '</div>';
        $('body').append(modalTemplate);
      } else {
        $('#teelaunch_modals').append(modalTemplate);
      }

      this.setActiveProduct(first.productSKU);
      this.setSizingImage();

      this.renderHeaders();
      this.renderRows();

      this.renderProductSelections();
      this.renderProductUnits(first.units);

      var $addToCart = $('[name=add]');
      var buttonTemplate = $addToCart.outerHTML();

      buttonTemplate = buttonTemplate.replace(/(id="([^"]*)")/, 'id="sizingChart"');
      buttonTemplate = buttonTemplate.replace(/(name="([^"]*)")/, 'name="sizingChart"');
      buttonTemplate = buttonTemplate.replace(/(value="([^"]*)")/, 'value="Sizing Chart"');
      buttonTemplate = buttonTemplate.replace(/Add to Cart/i, 'Sizing Chart');

      $addToCart.after(buttonTemplate);
    }
  }, {
    key: 'openModal',
    value: function openModal(sku) {}
  }, {
    key: 'renderHeaders',
    value: function renderHeaders() {
      var markup = ['<tr>', '<th>' + this.activeProduct.sizeLabel + '</th>', '<th>' + this.activeProduct.column1Header + '</th>'];
      if (this.activeProduct.column2Header) {
        markup.push('<th>' + this.activeProduct.column2Header + '</th>');
      }
      if (this.activeProduct.column3Header) {
        markup.push('<th>' + this.activeProduct.column3Header + '</th>');
      }
      markup.push('</tr>');
      $('#sizingHeaders').html(markup.join());
    }
  }, {
    key: 'renderRows',
    value: function renderRows() {
      var _this = this;

      var markup = [];

      this.activeProduct.rows.forEach(function (row, i) {
        if (row.unit_id == _this.unit.id) {
          var html = '<tr>\n        <td>' + row.sizeName + '</td>\n        <td>' + row.column1Value + '</td>\n      ';

          if (row.column2Value !== null) {
            html += '<td>' + row.column2Value + '</td>';
          }
          if (row.column3Value !== null) {
            html += '<td>' + row.column3Value + '</td>';
          }
          html += '</tr>';
          markup.push(html);
        }
      });
      $('#sizingRows').html(markup.join());
    }
  }, {
    key: 'renderProductSelections',
    value: function renderProductSelections() {
      var markup = [];
      for (var prop in this.options) {
        var option = '<option value="' + prop + '">' + this.options[prop].title + '</option>';
        markup.push(option);
      }
      $('#sizingProduct').html(markup.join());
    }
  }, {
    key: 'renderProductUnits',
    value: function renderProductUnits(units) {
      var markup = [];
      units.forEach(function (unit, i) {
        var option = '<option value="' + i + '">' + unit.name + '</option>';
        markup.push(option);
      });
      $('#sizingUnit').html(markup.join());
    }
  }, {
    key: 'setActiveProduct',
    value: function setActiveProduct(sku) {
      this.activeProduct = this.options[sku];
      this.setUnit(this.activeProduct.units[0]);
      this.renderProductUnits(this.activeProduct.units);

      console.log(this.activeProduct);
    }
  }, {
    key: 'setSizingImage',
    value: function setSizingImage() {
      console.log(this.activeProduct.imageUrl);
      $('#sizingImage img').attr('src', this.activeProduct.imageUrl);
    }
  }, {
    key: 'setUnit',
    value: function setUnit(_ref) {
      var abbreviation = _ref.abbreviation,
          name = _ref.name,
          id = _ref.id;

      console.log(id);
      this.unit.abbreviation = abbreviation;
      this.unit.name = name;
      this.unit.id = id;
    }
  }]);

  return Sizing;
}();

exports.default = Sizing;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);
var bind = __webpack_require__(7);
var Axios = __webpack_require__(13);
var defaults = __webpack_require__(1);

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
axios.Cancel = __webpack_require__(4);
axios.CancelToken = __webpack_require__(12);
axios.isCancel = __webpack_require__(5);

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(27);

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(4);

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
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defaults = __webpack_require__(1);
var utils = __webpack_require__(0);
var InterceptorManager = __webpack_require__(14);
var dispatchRequest = __webpack_require__(15);
var isAbsoluteURL = __webpack_require__(23);
var combineURLs = __webpack_require__(21);

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

  config = utils.merge(defaults, this.defaults, { method: 'get' }, config);

  // Support baseURL config
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

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
utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
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
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

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
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);
var transformData = __webpack_require__(18);
var isCancel = __webpack_require__(5);
var defaults = __webpack_require__(1);

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
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 @ @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }
  error.response = response;
  return error;
};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(6);

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
      response
    ));
  }
};


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

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
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function E() {
  this.message = 'String contains an invalid character';
}
E.prototype = new Error;
E.prototype.code = 5;
E.prototype.name = 'InvalidCharacterError';

function btoa(input) {
  var str = String(input);
  var output = '';
  for (
    // initialize result and counter
    var block, charCode, idx = 0, map = chars;
    // if the next str index does not exist:
    //   change the mapping table to "="
    //   check if d has no fractional digits
    str.charAt(idx | 0) || (map = '=', idx % 1);
    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
  ) {
    charCode = str.charCodeAt(idx += 3 / 4);
    if (charCode > 0xFF) {
      throw new E();
    }
    block = block << 8 | charCode;
  }
  return output;
}

module.exports = btoa;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

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
      }

      if (!utils.isArray(val)) {
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
/* 21 */
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
  return baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '');
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

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
/* 23 */
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
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

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
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

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
      parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
    }
  });

  return parsed;
};


/***/ }),
/* 27 */
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
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _axios = __webpack_require__(2);

var _axios2 = _interopRequireDefault(_axios);

var _Personalization = __webpack_require__(9);

var _Personalization2 = _interopRequireDefault(_Personalization);

var _Sizing = __webpack_require__(10);

var _Sizing2 = _interopRequireDefault(_Sizing);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bulma_url = 'https://cdnjs.cloudflare.com/ajax/libs/bulma/0.4.0/css/bulma.min.css';
var sr_remote_url = 'https://apps.sunriseintegration.com/a/teelaunch';

var Personalizer = void 0;
var SizingChart = void 0;

(function ($) {
  console.log(meta);

  if (typeof __st.p !== 'undefined' && __st.p === 'product' && __st.rid > 0 && meta.product.vendor === 'teelaunch') {
    var shop_url = __st.pageurl;
    shop_url = shop_url.substr(0, shop_url.indexOf('/'));

    var $modal = $('#sunrise_integration_modal');
    var skus = [];

    if (meta.product.variants.length > 0) {
      meta.product.variants.forEach(function (cur) {
        if (skus.indexOf(cur.sku) === -1) {
          skus.push(cur.sku);
        }
      });
    }

    if ($modal.length === 0) {
      var product_check = _axios2.default.get(sr_remote_url + '/remote/ajax.php', {
        params: {
          action: 'getProduct',
          product_id: __st.rid,
          shop: shop_url,
          sku: skus
        }
      });

      product_check.then(function (response) {
        console.log(response.data);

        if (response.status === 200) {
          if (typeof response.data.sizing !== 'undefined') {
            console.log(response.data.sizing);
            SizingChart = new _Sizing2.default(response.data.sizing);
          }

          if (typeof response.data.personalization !== 'undefined') {
            Personalizer = new _Personalization2.default(response.data.personalization);
          }
        }
      });
    }
  }

  $(function () {
    // sizing event listeners

    $(document).on('change', '#sizingProduct', function (e) {
      SizingChart.setActiveProduct(e.target.value);
      SizingChart.setSizingImage();
      SizingChart.renderHeaders();
      SizingChart.renderRows();
    });

    $(document).on('change', '#sizingUnit', function (e) {
      SizingChart.setUnit(SizingChart.activeProduct.units[e.target.value]);
      SizingChart.renderHeaders();
      SizingChart.renderRows();
    });

    $(document).on('click', '#sizingChart', function (e) {
      e.preventDefault();

      var variant_id = $('[name=id]').val();
      var sku = meta.product.variants.find(function (variant) {
        return variant.id == variant_id;
      }).sku;

      if (typeof SizingChart !== 'undefined') SizingChart.openModal(sku);

      $('#sunrise_integration_sizing_modal').addClass('is-active');
    });

    // personalization event listeners
    $(document).on('click', '#personalizeProduct', function (e) {
      e.preventDefault();

      var variant_id = $('[name=id]').val();

      if (typeof Personalizer !== 'undefined') Personalizer.openModal(variant_id);

      $('#sunrise_integration_modal').addClass('is-active');
    });

    $(document).on('change paste keyup', '#personalizationText', function (e) {
      var personalized_text = encodeURIComponent($(this).val()).replace(/'/g, '%27').replace(/\(/, '%28').replace(/\)/, '%29').replace(/</g, '%3C').replace(/>/g, '%3E');
      var color = encodeURIComponent($('#personalizationColor').val());
      var variant_id = encodeURIComponent($('[name=id]').val());
      var font = encodeURIComponent($(this).data('initial-font'));

      if (typeof Personalizer !== 'undefined') {
        font = encodeURIComponent(Personalizer.details[variant_id].font);
      }

      if ($(this).val().length === 0) {
        personalized_text = Personalizer.details[variant_id].placeholderText;
        console.log(personalized_text);
        $('.button-add-to-cart').attr('disabled', 'disabled');
      } else {
        $('.button-add-to-cart').removeAttr('disabled');
      }

      var dynamic_img_url = sr_remote_url + '/images/font-preview-img.php?size=100&text=' + personalized_text + '&color=' + color + '&font=' + font;

      $('#textZoneImg').css({
        'background-image': 'url(' + dynamic_img_url + ')'
      });

      _Personalization2.default.resizeText();
    });

    $(document).on('change', '#personalizationColor', function (e) {
      var personalized_text = encodeURI($('#personalizationText').val());
      var color = $(this).val();
      var variant_id = $('[name=id]').val();
      var font = $(this).data('initial-font');

      if (typeof Personalizer !== 'undefined') {
        font = Personalizer.details[variant_id].font;
      }

      var dynamic_img_url = sr_remote_url + '/images/font-preview-img.php?size=100&text=' + personalized_text + '&color=' + color + '&font=' + font;

      $('#textZoneImg').css({
        'background-image': 'url(' + dynamic_img_url + ')'
      });
      $('#personalizationText').trigger('change');
      $('#textZone').css('color', $(this).val());
    });

    $(document).on('click', '.button.button-cancel', function (e) {
      e.preventDefault();

      $(this).parent().parent().parent().removeClass('is-active');
    });

    $(document).on('click', '.button.button-add-to-cart', function (e) {
      e.preventDefault();

      var val = $('[name=id]').val();
      _Personalization2.default.addToCart(val, Shopify.shop);
    });

    $(document).on('click', 'button.delete', function (e) {
      e.preventDefault();

      $(this).parent().parent().parent().removeClass('is-active');
    });

    $(document).on('change', 'select,input', function (e) {
      if ($('#addToCart').prop('disabled')) {
        $('#personalizeProduct').prop('disabled', true).text('Unavailable').val('Unavailable');
      } else {
        $('#personalizeProduct').prop('disabled', false).text('Personalize').val('Personalize');
      }
    });
  });

  // extend jQuery to allow for grabbing the outer html of an element
  $.fn.outerHTML = function (s) {
    return s ? this.before(s).remove() : $('<p>').append(this.eq(0).clone()).html();
  };
})(jQuery);

/***/ })
/******/ ]);