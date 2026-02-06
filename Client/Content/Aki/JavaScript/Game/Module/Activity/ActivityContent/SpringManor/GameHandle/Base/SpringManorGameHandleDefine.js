"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.springManorGameHandleDefine = undefined;
const SpringManorBrochureHandle_1 = require("../SpringManorBrochureHandle");
const SpringManorDrawHandle_1 = require("../SpringManorDrawHandle");
const SpringManorDrinkHandle_1 = require("../SpringManorDrinkHandle");
const SpringManorGuessJokerHandle_1 = require("../SpringManorGuessJokerHandle");
exports.springManorGameHandleDefine = new Map([[1, new SpringManorGuessJokerHandle_1.SpringManorGuessJokerHandle()], [2, new SpringManorDrinkHandle_1.SpringManorDrinkHandle()], [8, new SpringManorBrochureHandle_1.SpringManorBrochureHandle()], [7, new SpringManorDrawHandle_1.SpringManorDrawHandle()]]);
//# sourceMappingURL=SpringManorGameHandleDefine.js.map