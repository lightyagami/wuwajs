"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchEntityBase = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const FloroRanchEntityDataBaseComponent_1 = require("./Component/FloroRanchEntityDataBaseComponent");
const FloroRanchUiItemBaseComponent_1 = require("./Component/FloroRanchUiItemBaseComponent");
class FloroRanchEntityBase {
  constructor(o) {
    this.EntityId = 0;
    this.EntityType = 0;
    this.xxo = new Array();
    this.EntityId = o.Ziu;
    this.EntityType = o.h5n;
  }
  AddComponent(o) {
    var t = o.Id;
    if (t < 0) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("FloroRanchGamePlay", 58, "组件未注册, 请检查是否使用装饰器RegisterFloroRanchEntityComponent注册", ["entityName", this.constructor.name], ["componentName", o.name]);
      }
    } else {
      if (t >= this.xxo.length) {
        for (let o = this.xxo.length; o <= t; o++) {
          this.xxo.push(undefined);
        }
      }
      if (this.xxo[t]) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("FloroRanchGamePlay", 58, "添加组件失败：组件已存在，请勿重复添加！", ["entityName", this.constructor.name], ["componentName", o.name]);
        }
      } else {
        (o = new o()).Create(this);
        this.xxo[t] = o;
      }
    }
  }
  GetComponent(o) {
    return this.xxo[o];
  }
  CheckGetComponent(o) {
    var t = this.GetComponent(o);
    if (!t) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("FloroRanchGamePlay", 58, "获取组件失败", ["entityId", this.EntityId], ["entityName", this.constructor.name], ["component", o]);
      }
    }
    return t;
  }
  GetDataComponentList() {
    var o = [];
    for (const t of this.xxo) {
      if (t !== undefined && t instanceof FloroRanchEntityDataBaseComponent_1.FloroRanchEntityDataBaseComponent) {
        o.push(t);
      }
    }
    return o;
  }
  GetUiItemComponent() {
    for (const o of this.xxo) {
      if (o !== undefined && o instanceof FloroRanchUiItemBaseComponent_1.FloroRanchUiItemBaseComponent) {
        return o;
      }
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("FloroRanchGamePlay", 58, "获取组件失败", ["entityId", this.EntityId], ["entityName", this.constructor.name], ["component", "FloroRanchUiItemBaseComponent"]);
    }
  }
  Init() {
    for (const o of this.xxo) {
      o?.Init();
    }
  }
  Tick(o) {
    for (const t of this.xxo) {
      t?.Tick(o);
    }
  }
  End() {
    for (const o of this.xxo) {
      o?.End();
    }
  }
  RefreshEntityData(o) {
    for (const t of this.GetDataComponentList()) {
      t.RefreshEntityData(o);
    }
  }
  GetPoint() {
    var o = this.CheckGetComponent(0);
    if (o) {
      return o.Point;
    } else {
      return -1;
    }
  }
  Info() {
    var t = this.GetDataComponentList();
    var n = [];
    for (let o = t.length - 1; o >= 0; o--) {
      var e = t[o];
      n.push(e.Info());
    }
    return n.join(" ");
  }
  DebugInfo() {
    var o = [];
    for (const t of this.GetDataComponentList()) {
      o.push(t.DebugInfo());
    }
    return `<color=Orange>【${o.join(" ")}】</color>`;
  }
  DebugUiShowInfo() {
    var o = [];
    for (const t of this.GetDataComponentList()) {
      o.push(t.DebugInfo());
    }
    return `<color=Red>${o.join("\n")}</color>`;
  }
}
exports.FloroRanchEntityBase = FloroRanchEntityBase;
//# sourceMappingURL=FloroRanchEntityBase.js.map