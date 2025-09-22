"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputAxisHandle = undefined;
const InputDistributeHandle_1 = require("./InputDistributeHandle");
class InputAxisHandle extends InputDistributeHandle_1.InputDistributeHandle {
  constructor() {
    super(...arguments);
    this.qmr = 0;
    this.FZu = 0;
  }
  BindAxis(i) {
    this.Bind(i);
  }
  UnBindAxis(i) {
    this.UnBind(i);
  }
  BindAxisIgnoreLimit(i) {
    this.BindIgnoreLimit(i);
  }
  UnBindAxisIgnoreLimit(i) {
    this.UnBindIgnoreLimit(i);
  }
  InputAxis(i) {
    this.InputCacheAxisValue(i);
    this.Call(i);
  }
  InputAxisIgnoreLimit(i) {
    this.InputCacheAxisValueIgnoreLimit(i);
    this.CallIgnoreLimit(i);
  }
  InputCacheAxisValue(i) {
    this.qmr = i;
  }
  InputCacheAxisValueIgnoreLimit(i) {
    this.FZu = i;
  }
  GetCacheAxisValue() {
    return this.qmr;
  }
  GetCacheAxisValueIgnoreLimit() {
    return this.FZu;
  }
}
exports.InputAxisHandle = InputAxisHandle;
//# sourceMappingURL=InputAxisHandle.js.map