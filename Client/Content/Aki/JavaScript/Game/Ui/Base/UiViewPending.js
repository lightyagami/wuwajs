"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiViewPending = undefined;
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
class UiViewPending {
  constructor(s, i) {
    this.PendingType = 1;
    this.ExecutePromise = undefined;
    this.View = s;
    this.PendingType = i;
    this.ExecutePromise = new CustomPromise_1.CustomPromise();
  }
  Equal(s) {
    return this.View.Info.Name === s.View.Info.Name && this.PendingType === s.PendingType;
  }
  IsPairWith(s) {
    return this.View.Info.Name === s.View.Info.Name && this.PendingType === 1 && (s.PendingType === 2 || s.PendingType === 3);
  }
}
exports.UiViewPending = UiViewPending;
//# sourceMappingURL=UiViewPending.js.map