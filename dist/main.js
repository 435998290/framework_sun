/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ var __webpack_modules__ = ({

/***/ "./framework/class/data-publisher.ts":
/*!*******************************************!*\
  !*** ./framework/class/data-publisher.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"DataPublisher\": () => (/* binding */ DataPublisher)\n/* harmony export */ });\nvar DataPublisher = (function () {\r\n    function DataPublisher(key, value) {\r\n        this.key = key;\r\n        this.value = value;\r\n        this.subscriberList = [];\r\n    }\r\n    DataPublisher.prototype.subscribe = function (subscriber) {\r\n        if (this.subscriberList.indexOf(subscriber) === -1) {\r\n            this.subscriberList.push(subscriber);\r\n        }\r\n    };\r\n    DataPublisher.prototype.publish = function (key, value) {\r\n        console.error('start publish', key, value);\r\n        console.error('subscriberList', this.subscriberList);\r\n        this.subscriberList.forEach(function (subscriber) {\r\n            subscriber.publish(key, value);\r\n        });\r\n    };\r\n    return DataPublisher;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack://sun/./framework/class/data-publisher.ts?");

/***/ }),

/***/ "./framework/class/element-subscriber.ts":
/*!***********************************************!*\
  !*** ./framework/class/element-subscriber.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ElementSubscriber\": () => (/* binding */ ElementSubscriber)\n/* harmony export */ });\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ \"./framework/utils.ts\");\n\r\nvar ElementSubscriber = (function () {\r\n    function ElementSubscriber(element) {\r\n        var _this = this;\r\n        console.log(\"elementSubscriber initialized\");\r\n        this.element = element;\r\n        this.initData = { textContent: element.textContent };\r\n        this.bindMap = {};\r\n        var bindItems = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getBindItem)(element.textContent || \"\");\r\n        bindItems.forEach(function (bindItem) {\r\n            _this.bindMap[bindItem.slice(2, -2)] = \"\";\r\n        });\r\n    }\r\n    ElementSubscriber.prototype.publish = function (key, value) {\r\n        console.error(\"start generateTextContent\", key, value);\r\n        this.bindMap[key] = value;\r\n        console.log('bindMap', this.bindMap);\r\n        var textContent = this.generateTextContent();\r\n        console.error(\"update text content\", textContent);\r\n        this.element.textContent = textContent;\r\n    };\r\n    ElementSubscriber.prototype.generateTextContent = function () {\r\n        for (var key in this.bindMap) {\r\n            return this.initData.textContent.replace(\"{{\".concat(key, \"}}\"), this.bindMap[key]);\r\n        }\r\n    };\r\n    return ElementSubscriber;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack://sun/./framework/class/element-subscriber.ts?");

/***/ }),

/***/ "./framework/sun.ts":
/*!**************************!*\
  !*** ./framework/sun.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Sun\": () => (/* binding */ Sun)\n/* harmony export */ });\n/* harmony import */ var _class_data_publisher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./class/data-publisher */ \"./framework/class/data-publisher.ts\");\n/* harmony import */ var _class_element_subscriber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./class/element-subscriber */ \"./framework/class/element-subscriber.ts\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ \"./framework/utils.ts\");\n\r\n\r\n\r\nvar Sun = (function () {\r\n    function Sun(sunObj) {\r\n        this.data = sunObj.data || {};\r\n        this.publisherPool = {};\r\n        this.initData();\r\n    }\r\n    Sun.prototype.initData = function () {\r\n        var _this = this;\r\n        console.log(\"start initData\");\r\n        this.publisherPool = {};\r\n        var _loop_1 = function (item) {\r\n            var dataPublisher = new _class_data_publisher__WEBPACK_IMPORTED_MODULE_0__.DataPublisher(item, this_1.data[item]);\r\n            this_1.publisherPool[item] = dataPublisher;\r\n            console.error(\"publisherPool initialized successfully\", this_1.publisherPool);\r\n            Object.defineProperty(this_1.data, item, {\r\n                set: function (data) {\r\n                    console.log(\"data changed\", data);\r\n                    _this.publisherPool[item].publish(item, data);\r\n                }\r\n            });\r\n        };\r\n        var this_1 = this;\r\n        for (var item in this.data) {\r\n            _loop_1(item);\r\n        }\r\n        this.initBindings();\r\n    };\r\n    Sun.prototype.initBindings = function () {\r\n        var _this = this;\r\n        var elements = document.getElementById(\"app\");\r\n        var fragment = document.createDocumentFragment();\r\n        if (elements) {\r\n            var elementAttrs = elements.attributes;\r\n            var sModel = elementAttrs.getNamedItem(\"s-model\").value;\r\n            console.error(sModel);\r\n            var nodesList = elements.childNodes;\r\n            nodesList.forEach(function (node) {\r\n                if (node.nodeType === Node.ELEMENT_NODE) {\r\n                    var elementSubscriber_1 = new _class_element_subscriber__WEBPACK_IMPORTED_MODULE_1__.ElementSubscriber(node);\r\n                    var attributesMap = node.attributes;\r\n                    var nodeValue = node.textContent;\r\n                    var bindVModel = attributesMap.getNamedItem(\"s-model\");\r\n                    var bindItems = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.getBindItem)(nodeValue);\r\n                    if (bindItems) {\r\n                        bindItems.forEach(function (item) {\r\n                            var dataKey = item.slice(2, -2);\r\n                            var bindData = _this.publisherPool[dataKey];\r\n                            console.error(\"bindData\", item, bindData);\r\n                            if (bindData) {\r\n                                bindData.subscribe(elementSubscriber_1);\r\n                            }\r\n                        });\r\n                    }\r\n                }\r\n                console.error(\"attr\", node);\r\n            });\r\n        }\r\n    };\r\n    return Sun;\r\n}());\r\n\r\n\n\n//# sourceURL=webpack://sun/./framework/sun.ts?");

/***/ }),

/***/ "./framework/utils.ts":
/*!****************************!*\
  !*** ./framework/utils.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getBindItem\": () => (/* binding */ getBindItem)\n/* harmony export */ });\nvar getBindItem = function (textContent) {\r\n    var rules = /{{[\\w]+}}/g;\r\n    return textContent.match(rules);\r\n};\r\n\n\n//# sourceURL=webpack://sun/./framework/utils.ts?");

/***/ }),

/***/ "./src/test.ts":
/*!*********************!*\
  !*** ./src/test.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _framework_sun__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../framework/sun */ \"./framework/sun.ts\");\n\r\nvar sun = new _framework_sun__WEBPACK_IMPORTED_MODULE_0__.Sun({\r\n    data: {\r\n        name: 'Sun',\r\n        age: 24\r\n    }\r\n});\r\nconsole.log('hello world');\r\nsun.data.name = 'swy';\r\nsun.data.age = 25;\r\n\n\n//# sourceURL=webpack://sun/./src/test.ts?");

/***/ })

/******/ });
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __webpack_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/******/ /* webpack/runtime/make namespace object */
/******/ (() => {
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ })();
/******/ 
/************************************************************************/
/******/ 
/******/ // startup
/******/ // Load entry module and return exports
/******/ // This entry module can't be inlined because the eval devtool is used.
/******/ var __webpack_exports__ = __webpack_require__("./src/test.ts");
/******/ 
