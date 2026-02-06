"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ViewModelBase = undefined;
class ViewModelBase {
  constructor() {
    this.DataMap = new Map();
    this.CallbackList = [];
  }
  SetData(t, s, e) {
    this.DataMap.set(t, s);
    if (!e) {
      this.Notify(t);
    }
  }
  GetData(t) {
    return this.DataMap.get(t);
  }
  Bind(t) {
    if (!this.CallbackList.includes(t)) {
      this.CallbackList.push(t);
    }
  }
  UnBind(t) {
    t = this.CallbackList.indexOf(t);
    if (t !== -1) {
      this.CallbackList.splice(t, 1);
    }
  }
  Clear() {
    this.CallbackList = [];
  }
  Notify(s) {
    this.CallbackList.forEach(t => {
      t(s);
    });
  }
}
exports.ViewModelBase = ViewModelBase;
//# sourceMappingURL=SkinViewModelBase.js.map