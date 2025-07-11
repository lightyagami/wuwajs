"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputActionHandle = undefined;
const InputDistributeHandle_1 = require("./InputDistributeHandle");
class InputActionHandle extends InputDistributeHandle_1.InputDistributeHandle {
  constructor() {
    super(...arguments);
    this.wut = false;
  }
  SetIsPress(t) {
    this.wut = t;
  }
  GetIsPress() {
    return this.wut;
  }
  BindAction(t) {
    this.Bind(t);
  }
  UnBindAction(t) {
    this.UnBind(t);
  }
  BindActionIgnoreLimit(t) {
    this.BindIgnoreLimit(t);
  }
  UnBindActionIgnoreLimit(t) {
    this.UnBindIgnoreLimit(t);
  }
  InputAction(t) {
    if (t) {
      this.Call(0);
    } else {
      this.Call(1);
    }
  }
  InputActionIgnoreLimit(t) {
    if (t) {
      this.CallIgnoreLimit(0);
    } else {
      this.CallIgnoreLimit(1);
    }
  }
}
exports.InputActionHandle = InputActionHandle;
//# sourceMappingURL=InputActionHandle.js.map