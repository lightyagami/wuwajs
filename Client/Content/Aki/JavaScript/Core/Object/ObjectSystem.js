"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ObjectSystem = undefined;
const Log_1 = require("../Common/Log");
const Stats_1 = require("../Common/Stats");
class ObjectSystem {
  constructor() {}
  static Initialize() {
    this.Objects.length = 0;
    this.rY.length = 0;
    return !(this.nY.length = 0);
  }
  static IsValid(t) {
    var e;
    return !!t && t.Index !== undefined && t.Id !== undefined && (e = this.Objects[t.Index]) && e.Id === t.Id;
  }
  static Create(t) {
    let e = undefined;
    if (!!Stats_1.Stat.Enable && !(e = this.sY.get(t))) {
      e = Stats_1.Stat.CreateNoFlameGraph("ObjectSystem.Create." + t.name);
      this.sY.set(t, e);
    }
    let s = undefined;
    let i = 0;
    let h = 0;
    if (this.Objects.length <= this.aY) {
      i = this.Objects.length;
      e?.Start();
      s = new t(0, i);
      e?.Stop();
      this.Objects.push(s);
      this.rY.push(1);
      h = 1;
    } else {
      if (!(this.nY.length > 0)) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("RenderEffect", 3, "无法分配Object的Id，超出设计最大数量", ["MaxIndex", this.aY], ["Effects.length", this.Objects.length]);
        }
        return;
      }
      i = this.nY.pop();
      e?.Start();
      s = new t(0, i);
      e?.Stop();
      this.Objects[i] = s;
      if ((h = ++this.rY[i]) > this.hY) {
        h = 1;
        this.rY[i] = h;
      }
    }
    t = i << this.VersionDigit | h;
    s.Id = t;
    return s;
  }
  static CreateExternal(t) {
    let e = 0;
    let s = 0;
    if (this.Objects.length < this.aY) {
      e = this.Objects.length;
      this.Objects.push(t);
      this.rY.push(1);
      s = 1;
    } else {
      if (!(this.nY.length > 0)) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("RenderEffect", 3, "无法分配Object的Id，超出设计最大数量", ["MaxIndex", this.aY], ["Effects.length", this.Objects.length]);
        }
        return;
      }
      e = this.nY.pop();
      this.Objects[e] = t;
      if ((s = ++this.rY[e]) > this.hY) {
        s = 1;
        this.rY[e] = s;
      }
    }
    var i = e << this.VersionDigit | s;
    t.Id = i;
    t.Index = e;
    return true;
  }
  static Destroy(t) {
    if (this.IsValid(t)) {
      this.Objects[t.Index] = undefined;
      this.nY.push(t.Index);
      return true;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Object", 1, "对象重复销毁", ["class", t.constructor.name]);
      }
      return false;
    }
  }
}
(exports.ObjectSystem = ObjectSystem).sY = new WeakMap();
ObjectSystem.lY = 32;
ObjectSystem._Y = 16;
ObjectSystem.VersionDigit = ObjectSystem.lY - ObjectSystem._Y;
ObjectSystem.aY = (1 << ObjectSystem._Y - 1) - 1;
ObjectSystem.hY = (1 << ObjectSystem.VersionDigit) - 1;
ObjectSystem.Objects = new Array();
ObjectSystem.rY = new Array();
ObjectSystem.nY = new Array(); //# sourceMappingURL=ObjectSystem.js.map