"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TouchUiEditViewModel = undefined;
class TouchUiEditViewModel {
  static SetCurrentSelectedItem(t) {
    if (this.UVi = t) {
      this.NotifySelectedItemChange(t);
    }
  }
  static GetCurrentSelectedItem() {
    return this.UVi;
  }
  static AddTouchFingerData(t) {
    var e = t.GetFingerIndex();
    this.mgt.set(e, t);
  }
  static RemoveTouchFingerData(t) {
    t = t.GetFingerIndex();
    this.mgt.delete(t);
  }
  static GetTouchFingerData(t) {
    return this.mgt.get(t);
  }
  static GetTouchFingerDataCount() {
    return this.mgt.size;
  }
  static SetRootItem(t) {
    this.xTt = t;
  }
  static GetRootItem() {
    return this.xTt;
  }
  static AddDelegateOnSelectedItemChange(t) {
    this.THu.push(t);
  }
  static RemoveDelegateOnSelectedItemChange(t) {
    t = this.THu.indexOf(t);
    if (t !== -1) {
      this.THu.splice(t, 1);
    }
  }
  static NotifySelectedItemChange(e) {
    this.THu.forEach(t => {
      t(e);
    });
  }
}
(exports.TouchUiEditViewModel = TouchUiEditViewModel).UVi = undefined;
TouchUiEditViewModel.xTt = undefined;
TouchUiEditViewModel.mgt = new Map();
TouchUiEditViewModel.THu = []; //# sourceMappingURL=TouchUiEditViewModel.js.map