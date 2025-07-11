"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputKeyHandle = undefined;
const InputDistributeHandle_1 = require("./InputDistributeHandle");
class InputKeyHandle extends InputDistributeHandle_1.InputDistributeHandle {
  BindAction(t) {
    this.Bind(t);
  }
  UnBindAction(t) {
    this.UnBind(t);
  }
  InputKey(t) {
    if (t) {
      this.Call(0);
    } else {
      this.Call(1);
    }
  }
}
exports.InputKeyHandle = InputKeyHandle;
//# sourceMappingURL=InputKeyHandle.js.map