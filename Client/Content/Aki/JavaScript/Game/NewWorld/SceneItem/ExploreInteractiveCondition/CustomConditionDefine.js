"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createConditionListener = undefined;
const QuantumDiffusionConditionListener_1 = require("./QuantumDiffusionConditionListener");
const customConditionMap = new Map([[0, QuantumDiffusionConditionListener_1.QuantumDiffusionConditionListener]]);
function createConditionListener(n, i) {
  return new (customConditionMap.get(n))(i);
}
exports.createConditionListener = createConditionListener;
//# sourceMappingURL=CustomConditionDefine.js.map