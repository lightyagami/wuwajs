"use strict";

var __decorate = this && this.__decorate || function (e, t, o, n) {
  var s;
  var i = arguments.length;
  var r = i < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, o) : n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    r = Reflect.decorate(e, t, o, n);
  } else {
    for (var h = e.length - 1; h >= 0; h--) {
      if (s = e[h]) {
        r = (i < 3 ? s(r) : i > 3 ? s(t, o, r) : s(t, o)) || r;
      }
    }
  }
  if (i > 3 && r) {
    Object.defineProperty(t, o, r);
  }
  return r;
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
    this.Kwr = new AnsContextSet();
  }
  OnInit() {
    this.NeedTick = true;
  }
  RegisterAnsTrigger(e, t, o) {
    this.jwr.set(e, new AnsContextTrigger(t, o));
  }
  AddAns(e, t) {
    let o = this.Hwr.get(e);
    if (!o) {
      o = new AnsContextSet();
      this.Hwr.set(e, o);
    }
    let n = o.Has(t);
    if (!n) {
      o.Add(t);
      n = t;
    }
    this.Qwr(n);
    n.ExistCount++;
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
          this.Qwr(e);
          e.ExistCount--;
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Character", 43, "Ans不成对,查找不到对应的AnsContext");
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Character", 43, "Ans不成对,Set不存在");
    }
  }
  Qwr(e) {
    if (!this.Wwr.Has(e) && !this.Kwr.Has(e)) {
      this.Kwr.Add(e);
      e.CacheCount = e.ExistCount;
    }
  }
  Tick(e) {
    var t = this.Wwr.AnsContextSet;
    if (t.size > 0) {
      for (const i of t) {
        var o;
        var n = i.CacheCount;
        var s = i.ExistCount;
        if (n === 0 && s > 0) {
          if (o = this.jwr.get(i.constructor.name)) {
            o.OnBegin(i);
          }
        } else if (n > 0 && s === 0) {
          o = i.constructor.name;
          if (n = this.jwr.get(o)) {
            n.OnEnd(i);
          }
          this.Hwr.get(o)?.Delete(i);
        }
      }
      this.Wwr.Clear();
    }
    t = this.Kwr.AnsContextSet;
    if (t.size > 0) {
      for (const r of t) {
        this.Wwr.Add(r);
      }
      this.Kwr.Clear();
    }
  }
};
UiModelAnsControllerComponent = __decorate([(0, UiModelComponentDefine_1.RegisterUiModelComponent)(6)], UiModelAnsControllerComponent);
exports.UiModelAnsControllerComponent = UiModelAnsControllerComponent; //# sourceMappingURL=UiModelAnsControllerComponent.js.map