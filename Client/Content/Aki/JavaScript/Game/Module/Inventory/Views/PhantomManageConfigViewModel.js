"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomManageConfigViewModel = undefined;
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const ModelManager_1 = require("../../../Manager/ModelManager");
class ViewModelBase {
  constructor() {
    this.DataMap = new Map();
    this.CallbackList = [];
  }
  SetData(t, e, i) {
    this.DataMap.set(t, e);
    if (!i) {
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
class PhantomManageConfigViewModel extends ViewModelBase {
  constructor() {
    super();
    this.DataMap.set(0, Protocol_1.Aki.Protocol._xu.Proto_AutoLock);
    this.DataMap.set(1, undefined);
    this.DataMap.set(2, false);
    this.DataMap.set(3, undefined);
    this.DataMap.set(4, false);
  }
  SetSelectType(t, e) {
    this.SetData(0, t, e);
  }
  GetSelectType() {
    return this.GetData(0);
  }
  SetSelectConfig(t, e) {
    this.SetData(1, t, e);
  }
  GetSelectConfig() {
    return this.GetData(1);
  }
  GetEditState() {
    return this.GetData(2);
  }
  SetEditState(t, e) {
    this.SetData(2, t, e);
  }
  InitEditDataSwitch(t, e) {
    this.SetData(4, t.GetIsOn(), e);
    this.SetData(3, t.GetRuleIdMapValueList(), e);
  }
  SetEditSwitch(t, e) {
    this.SetData(4, t, e);
  }
  GetEditSwitch() {
    return this.GetData(4);
  }
  GetEditData() {
    return this.GetData(3);
  }
  GetEditDataByRuleId(t) {
    var e = this.GetData(3);
    if (e) {
      var i;
      var s;
      var r = new Map();
      for ([i, s] of e) {
        if (t === i) {
          r.set(i, s);
          return r;
        }
      }
    }
  }
  SetEditDataById(t, e, i, s) {
    let r = this.GetEditDataByRuleId(t).get(t) ?? [];
    r = i ? this.d2u(r, e) : this.m2u(r, e);
    var a;
    var o = this.GetData(3);
    for ([a] of o) {
      if (t === a) {
        o.set(a, r);
      }
    }
    if (!s) {
      this.Notify(3);
    }
  }
  SetEditDataByIdList(t, e, i) {
    var s;
    var r = this.GetData(3);
    for ([s] of r) {
      if (t === s) {
        r.set(s, e);
      }
    }
    if (!i) {
      this.Notify(3);
    }
  }
  m2u(t, e) {
    return t.filter(t => t !== e);
  }
  d2u(t, e) {
    if (new Set(t).has(e)) {
      return t;
    } else {
      return [...t, e];
    }
  }
  RefreshSelectConfig() {
    var t = this.GetData(1);
    var t = ModelManager_1.ModelManager.InventoryModel.GetPhantomManageConfigByTypeAndIndex(t.GetType(), t.GetIndex());
    if (t) {
      this.SetSelectConfig(t);
    }
  }
}
exports.PhantomManageConfigViewModel = PhantomManageConfigViewModel;
//# sourceMappingURL=PhantomManageConfigViewModel.js.map