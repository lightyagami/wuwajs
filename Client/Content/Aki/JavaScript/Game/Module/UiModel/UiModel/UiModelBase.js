"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiModelBase = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const UiModelComponentInterface_1 = require("../UiModelComponent/UiModelComponentInterface");
class UiModelBase {
  constructor(t, e) {
    this.Id = t;
    this.xxo = new Array();
    this.ajm = new Map();
    this.UseWay = undefined;
    this.UseWay = e;
  }
  GetComponent(t) {
    return this.xxo[t];
  }
  GetComponentByCtor(t) {
    for (const e of this.xxo) {
      if (e instanceof t) {
        return e;
      }
    }
  }
  CheckGetComponent(t) {
    var e = this.GetComponent(t);
    if (!e) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Character", 43, "获取组件失败", ["Id", this.Id], ["uiModelName", this.constructor.name], ["component", t]);
      }
    }
    return e;
  }
  AddComponent(t) {
    var e = t.Id;
    if (e < 0) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("UiComponent", 43, "组件未注册, 请检查是否使用装饰器RegisterUiModelComponent注册", ["uiModelName", this.constructor.name], ["componentName", t.name]);
      }
    } else {
      if (e >= this.xxo.length) {
        for (let t = this.xxo.length; t <= e; t++) {
          this.xxo.push(undefined);
        }
      }
      if (this.xxo[e]) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("UiComponent", 43, "添加组件失败：组件已存在，请勿重复添加！", ["uiModelName", this.constructor.name], ["componentName", t.name]);
        }
      } else {
        var o = new t();
        o.Create(this);
        this.xxo[e] = o;
        var t = (0, UiModelComponentInterface_1.getImplementedInterfaces)(o);
        for (const i of t) {
          if (!this.ajm.has(i)) {
            this.ajm.set(i, []);
          }
          this.ajm.get(i).push(o);
        }
      }
    }
  }
  Init() {
    for (const t of this.xxo) {
      t?.Init();
    }
  }
  Start() {
    for (const t of this.xxo) {
      t?.Start();
    }
  }
  Tick(t) {
    for (const e of this.xxo) {
      if (e && e.NeedTick) {
        e.Tick(t);
      }
    }
  }
  End() {
    for (const t of this.xxo) {
      t?.End();
    }
  }
  Clear() {
    for (const t of this.xxo) {
      t?.Clear();
    }
    this.ajm.clear();
  }
  OnVisibleChange(e) {
    this.hjm(0, t => {
      t.OnModelVisibleChange(e);
    });
  }
  OnSetDitherEffect(e) {
    this.hjm(1, t => {
      t.OnModelDitherEffectChange(e);
    });
  }
  ljm(t) {
    return this.ajm.get(t) ?? [];
  }
  hjm(t, e) {
    t = this.ljm(t);
    if (t) {
      t.forEach(e);
    }
  }
}
exports.UiModelBase = UiModelBase;
//# sourceMappingURL=UiModelBase.js.map