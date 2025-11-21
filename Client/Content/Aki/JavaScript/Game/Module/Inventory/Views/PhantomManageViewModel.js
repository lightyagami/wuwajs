"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomManageViewModel = undefined;
const ModelManager_1 = require("../../../Manager/ModelManager");
class ViewModelBase {
  constructor() {
    this.DataMap = new Map();
    this.CallbackList = [];
  }
  SetData(t, e, s) {
    this.DataMap.set(t, e);
    if (!s) {
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
  Notify(e) {
    this.CallbackList.forEach(t => {
      t(e);
    });
  }
}
class PhantomManageViewModel extends ViewModelBase {
  constructor() {
    super();
    var t = new Set();
    this.DataMap.set(0, t);
    this.DataMap.set(1, []);
  }
  SetSelectState(t, e, s) {
    var i = this.GetSelectSet();
    if (e && !i.has(t)) {
      i.add(t);
    } else if (!e && i.has(t)) {
      i.delete(t);
    }
    this.SSd(i, s);
  }
  SwitchSelectState(t, e) {
    var s = this.GetSelectSet();
    if (s.has(t)) {
      s.delete(t);
    } else {
      s.add(t);
    }
    this.SSd(s, e);
  }
  GetSelectSet() {
    return this.GetData(0);
  }
  SSd(t, e) {
    this.SetData(0, t, e);
    ModelManager_1.ModelManager.InventoryModel.SetPhantomManageSelectSet(t);
  }
  ClearSelectSet() {
    this.SSd(undefined);
  }
  SetItemDataList(t, e) {
    this.SetData(1, t, e);
  }
  GetItemDataList() {
    return this.GetData(1);
  }
}
exports.PhantomManageViewModel = PhantomManageViewModel;
//# sourceMappingURL=PhantomManageViewModel.js.map