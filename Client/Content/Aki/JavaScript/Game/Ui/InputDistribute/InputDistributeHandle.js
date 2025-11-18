"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputDistributeHandle = exports.InputIdentification = undefined;
const InputEnums_1 = require("../../../Game/Input/InputEnums");
class InputIdentification {
  constructor(t) {
    this.Hmr = InputEnums_1.EInputAction.None;
    this.jmr = InputEnums_1.EInputAxis.None;
    this.FGi = t;
  }
  get Name() {
    return this.FGi;
  }
  GetInputAction(t) {
    if (this.Hmr) {
      return this.Hmr;
    }
    if (t) {
      t = t.GetAction(this.FGi);
      if (t) {
        this.Hmr = t;
        return this.Hmr;
      }
    }
  }
  GetInputAxis(t) {
    if (this.jmr) {
      return this.jmr;
    }
    if (t) {
      t = t.GetAxis(this.FGi);
      if (t) {
        this.jmr = t;
        return this.jmr;
      }
    }
  }
}
exports.InputIdentification = InputIdentification;
class InputCallback {
  constructor(t) {
    this.fIo = [];
    this.Wmr = [];
    this.izd = [];
    this.Kmr = false;
    this.Qmr = new InputIdentification(t);
  }
  Call(t) {
    this.Kmr = true;
    for (const i of this.fIo) {
      i(this.Qmr.Name, t, this.Qmr);
    }
    this.Xmr();
    this.rzd();
    this.Kmr = false;
  }
  Add(t) {
    (this.Kmr ? this.Wmr : this.fIo).push(t);
  }
  Xmr() {
    if (!(this.Wmr.length <= 0)) {
      for (const t of this.Wmr) {
        this.fIo.push(t);
      }
      this.Wmr.length = 0;
    }
  }
  Remove(t) {
    if (this.Kmr) {
      this.izd.push(t);
    } else if (!((t = this.fIo.indexOf(t)) < 0)) {
      this.fIo.splice(t, 1);
    }
  }
  rzd() {
    if (!(this.izd.length <= 0)) {
      for (const i of this.izd) {
        var t = this.fIo.indexOf(i);
        if (!(t < 0)) {
          this.fIo.splice(t, 1);
        }
      }
      this.izd.length = 0;
    }
  }
  Clear() {
    this.Qmr = undefined;
    this.fIo.length = 0;
  }
  Length() {
    return this.fIo.length;
  }
}
class InputDistributeHandle {
  constructor(t, i) {
    this.$mr = "";
    this.B7 = undefined;
    this.jkl = undefined;
    this.$mr = t;
    this.B7 = new InputCallback(i);
    this.jkl = new InputCallback(i);
  }
  Reset() {
    this.B7.Clear();
    this.B7 = undefined;
    this.jkl.Clear();
    this.jkl = undefined;
  }
  Bind(t) {
    this.B7.Add(t);
  }
  UnBind(t) {
    this.B7.Remove(t);
  }
  Call(t) {
    this.B7.Call(t);
  }
  BindIgnoreLimit(t) {
    this.jkl.Add(t);
  }
  UnBindIgnoreLimit(t) {
    this.jkl.Remove(t);
  }
  CallIgnoreLimit(t) {
    this.jkl.Call(t);
  }
  GetInputDistributeTag() {
    return this.$mr;
  }
}
exports.InputDistributeHandle = InputDistributeHandle;
//# sourceMappingURL=InputDistributeHandle.js.map