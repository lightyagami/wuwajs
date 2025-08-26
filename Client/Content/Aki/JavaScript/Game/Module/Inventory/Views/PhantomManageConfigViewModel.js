"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomManageConfigViewModel = undefined;
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
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
    this.DataMap.set(0, Protocol_1.Aki.Protocol.Oxu.Proto_AutoLock);
    this.DataMap.set(1, undefined);
    this.DataMap.set(2, undefined);
    this.DataMap.set(3, false);
    this.DataMap.set(4, undefined);
    this.DataMap.set(5, false);
  }
  SetSelectType(t, e) {
    this.SetData(0, t, e);
  }
  GetSelectType() {
    return this.GetData(0);
  }
  SetSelectIndex(t, e, i) {
    let s = this.GetData(1);
    (s = s || new Map()).set(t, e);
    this.SetData(1, s, i);
  }
  GetSelectIndex(t) {
    var e = this.GetData(1);
    if (e) {
      return e.get(t) ?? 0;
    } else {
      return 0;
    }
  }
  SetSelectConfig(t, e) {
    this.SetData(2, t, e);
  }
  GetSelectConfig() {
    return this.GetData(2);
  }
  GetEditState() {
    return this.GetData(3);
  }
  SetEditState(t, e) {
    this.SetData(3, t, e);
  }
  InitEditDataSwitch(t, e) {
    this.SetData(5, t.GetIsOn(), e);
    this.SetData(4, t.GetRuleIdMapValueList(), e);
  }
  SetEditSwitch(t, e) {
    this.SetData(5, t, e);
  }
  GetEditSwitch() {
    return this.GetData(5);
  }
  GetEditData() {
    return this.GetData(4);
  }
  GetEditDataByRuleId(t) {
    var e = this.GetData(4);
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
    r = i ? this.KGu(r, e) : this.XGu(r, e);
    var h;
    var o = this.GetData(4);
    for ([h] of o) {
      if (t === h) {
        o.set(h, r);
      }
    }
    if (!s) {
      this.Notify(4);
    }
  }
  SetEditDataByIdList(t, e, i) {
    var s;
    var r = this.GetData(4);
    for ([s] of r) {
      if (t === s) {
        r.set(s, e);
      }
    }
    if (!i) {
      this.Notify(4);
    }
  }
  XGu(t, e) {
    return t.filter(t => t !== e);
  }
  KGu(t, e) {
    if (new Set(t).has(e)) {
      return t;
    } else {
      return [...t, e];
    }
  }
}
exports.PhantomManageConfigViewModel = PhantomManageConfigViewModel;
//# sourceMappingURL=PhantomManageConfigViewModel.js.map