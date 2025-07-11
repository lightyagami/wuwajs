"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputTouchHandle = undefined;
const InputDistributeHandle_1 = require("./InputDistributeHandle");
class InputTouchHandle extends InputDistributeHandle_1.InputDistributeHandle {
  BindTouch(t) {
    this.Bind(t);
  }
  UnBindTouch(t) {
    this.UnBind(t);
  }
  InputTouch(t) {
    this.Call(t);
  }
}
exports.InputTouchHandle = InputTouchHandle;
//# sourceMappingURL=InputTouchHandle.js.map