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
    this.wQu.push(t);
  }
  static RemoveDelegateOnSelectedItemChange(t) {
    t = this.wQu.indexOf(t);
    if (t !== -1) {
      this.wQu.splice(t, 1);
    }
  }
  static NotifySelectedItemChange(e) {
    if (this.UVi === e) {
      this.wQu.forEach(t => {
        t(e);
      });
    }
  }
}
(exports.TouchUiEditViewModel = TouchUiEditViewModel).UVi = undefined;
TouchUiEditViewModel.xTt = undefined;
TouchUiEditViewModel.mgt = new Map();
TouchUiEditViewModel.wQu = []; //# sourceMappingURL=TouchUiEditViewModel.js.map