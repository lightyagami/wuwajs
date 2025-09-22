"use strict";

var __decorate = this && this.__decorate || function (e, t, n, o) {
  var s;
  var r = arguments.length;
  var i = r < 3 ? t : o === null ? o = Object.getOwnPropertyDescriptor(t, n) : o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    i = Reflect.decorate(e, t, n, o);
  } else {
    for (var h = e.length - 1; h >= 0; h--) {
      if (s = e[h]) {
        i = (r < 3 ? s(i) : r > 3 ? s(t, n, i) : s(t, n)) || i;
      }
    }
  }
  if (r > 3 && i) {
    Object.defineProperty(t, n, i);
  }
  return i;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiModelAnsControllerComponent = undefined;
const Log_1 = require("../../../../../../Core/Common/Log");
const UiModelComponentDefine_1 = require("../../../Define/UiModelComponentDefine");
const UiModelComponentBase_1 = require("../../UiModelComponentBase");
class AnsContextSet {
  constructor() {
    this.AnsContextSet = new Set();
  }
  Has(e) {
    if (this.AnsContextSet.has(e)) {
      return e;
    }
    for (const t of this.AnsContextSet) {
      if (t.IsEqual(e)) {
        return t;
      }
    }
  }
  Add(e) {
    if (!this.Has(e)) {
      this.AnsContextSet.add(e);
    }
  }
  Delete(e) {
    return this.AnsContextSet.delete(e);
  }
  Clear() {
    this.AnsContextSet.clear();
  }
}
class AnsContextTrigger {
  constructor(e, t) {
    this.OnBegin = e;
    this.OnEnd = t;
  }
}
let UiModelAnsControllerComponent = class UiModelAnsControllerComponent extends UiModelComponentBase_1.UiModelComponentBase {
  constructor() {
    super(...arguments);
    this.Hwr = new Map();
    this.jwr = new Map();
    this.Wwr = new AnsContextSet();
  }
  OnInit() {
    this.NeedTick = true;
  }
  RegisterAnsTrigger(e, t, n) {
    this.jwr.set(e, new AnsContextTrigger(t, n));
  }
  AddAns(e, t) {
    let n = this.Hwr.get(e);
    if (!n) {
      n = new AnsContextSet();
      this.Hwr.set(e, n);
    }
    let o = n.Has(t);
    if (!o) {
      n.Add(t);
      o = t;
    }
    this.LDd(o);
    o.ExistCount++;
  }
  ReduceAns(e, t) {
    var e = this.Hwr.get(e);
    if (e) {
      if (e = e.Has(t)) {
        if ((t = e.ExistCount) <= 0) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Character", 43, "Ans不成对,Ans数量为0,无法减少", ["AnsCount", t]);
          }
        } else {
          this.LDd(e);
          e.ExistCount--;
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Character", 43, "Ans不成对,查找不到对应的AnsContext");
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Character", 43, "Ans不成对,Set不存在");
    }
  }
  LDd(e) {
    if (!this.Wwr.Has(e)) {
      this.Wwr.Add(e);
      e.CacheCount = e.ExistCount;
    }
  }
  Tick(e) {
    var t = this.Wwr.AnsContextSet;
    if (t.size > 0) {
      for (const r of t) {
        var n;
        var o = r.CacheCount;
        var s = r.ExistCount;
        if (o === 0 && s > 0) {
          if (n = this.jwr.get(r.constructor.name)) {
            n.OnBegin(r);
          }
        } else if (o > 0 && s === 0) {
          n = r.constructor.name;
          if (o = this.jwr.get(n)) {
            o.OnEnd(r);
          }
          this.Hwr.get(n)?.Delete(r);
        }
      }
      this.Wwr.Clear();
    }
  }
  GetAnsContextSet(e) {
    var t = this.Hwr.get(e);
    return t || (Log_1.Log.CheckError() && Log_1.Log.Error("Character", 43, "获取AnsContextSet失败, Set不存在", ["Type", e]), new AnsContextSet());
  }
};
UiModelAnsControllerComponent = __decorate([(0, UiModelComponentDefine_1.RegisterUiModelComponent)(6)], UiModelAnsControllerComponent);
exports.UiModelAnsControllerComponent = UiModelAnsControllerComponent; //# sourceMappingURL=UiModelAnsControllerComponent.js.map