"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CustomConditionListener = undefined;
class CustomConditionListener {
  constructor(t) {
    this.OnConditionChange = undefined;
    this.OnConditionChange = t;
  }
  Clear() {
    this.SetListenerEnable(false);
    this.OnConditionChange = undefined;
  }
}
exports.CustomConditionListener = CustomConditionListener;
//# sourceMappingURL=CustomConditionListener.js.map