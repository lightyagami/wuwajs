"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchEntityBase = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const FloroRanchEntityDataBaseComponent_1 = require("./Component/FloroRanchEntityDataBaseComponent");
const FloroRanchUiItemBaseComponent_1 = require("./Component/FloroRanchUiItemBaseComponent");
class FloroRanchEntityBase {
  constructor(t) {
    this.EntityId = 0;
    this.EntityType = 0;
    this.xxo = new Array();
    this.EntityId = t.Tru;
    this.EntityType = t.h5n;
  }
  AddComponent(t) {
    var o = t.Id;
    if (o < 0) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("FloroRanchGamePlay", 58, "组件未注册, 请检查是否使用装饰器RegisterFloroRanchEntityComponent注册", ["entityName", this.constructor.name], ["componentName", t.name]);
      }
    } else {
      if (o >= this.xxo.length) {
        for (let t = this.xxo.length; t <= o; t++) {
          this.xxo.push(undefined);
        }
      }
      if (this.xxo[o]) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("FloroRanchGamePlay", 58, "添加组件失败：组件已存在，请勿重复添加！", ["entityName", this.constructor.name], ["componentName", t.name]);
        }
      } else {
        (t = new t()).Create(this);
        this.xxo[o] = t;
      }
    }
  }
  GetComponent(t) {
    return this.xxo[t];
  }
  CheckGetComponent(t) {
    var o = this.GetComponent(t);
    if (!o) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("FloroRanchGamePlay", 58, "获取组件失败", ["entityId", this.EntityId], ["entityName", this.constructor.name], ["component", t]);
      }
    }
    return o;
  }
  GetDataComponentList() {
    var t = [];
    for (const o of this.xxo) {
      if (o !== undefined && o instanceof FloroRanchEntityDataBaseComponent_1.FloroRanchEntityDataBaseComponent) {
        t.push(o);
      }
    }
    return t;
  }
  GetUiItemComponent() {
    for (const t of this.xxo) {
      if (t !== undefined && t instanceof FloroRanchUiItemBaseComponent_1.FloroRanchUiItemBaseComponent) {
        return t;
      }
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("FloroRanchGamePlay", 58, "获取组件失败", ["entityId", this.EntityId], ["entityName", this.constructor.name], ["component", "FloroRanchUiItemBaseComponent"]);
    }
  }
  Init() {
    for (const t of this.xxo) {
      t?.Init();
    }
  }
  Tick(t) {
    for (const o of this.xxo) {
      o?.Tick(t);
    }
  }
  End() {
    for (const t of this.xxo) {
      t?.End();
    }
  }
  RefreshEntityData(t) {
    for (const o of this.GetDataComponentList()) {
      o.RefreshEntityData(t);
    }
  }
  GetPoint() {
    var t = this.CheckGetComponent(0);
    if (t) {
      return t.Point;
    } else {
      return -1;
    }
  }
  GetRarity() {
    let t = -1;
    switch (this.EntityType) {
      case 1:
        t = this.CheckGetComponent(1).CardData?.GetRarity() ?? -1;
        break;
      case 2:
        t = this.CheckGetComponent(3).ToyData?.GetRarity() ?? -1;
    }
    return t;
  }
  GetRace() {
    let t = -1;
    switch (this.EntityType) {
      case 1:
        t = this.CheckGetComponent(1).CardData?.GetRace() ?? -1;
        break;
      case 2:
        t = this.CheckGetComponent(3).ToyData?.GetRace() ?? -1;
    }
    return t;
  }
  Info() {
    var o = this.GetDataComponentList();
    var e = [];
    for (let t = o.length - 1; t >= 0; t--) {
      var n = o[t];
      e.push(n.Info());
    }
    return e.join(" ");
  }
  DebugInfo() {
    var t = [];
    for (const o of this.GetDataComponentList()) {
      t.push(o.DebugInfo());
    }
    return `<color=Orange>【${t.join(" ")}】</color>`;
  }
  DebugUiShowInfo() {
    var t = [];
    for (const o of this.GetDataComponentList()) {
      t.push(o.DebugInfo());
    }
    return `<color=Red>${t.join("\n")}</color>`;
  }
}
exports.FloroRanchEntityBase = FloroRanchEntityBase;
//# sourceMappingURL=FloroRanchEntityBase.js.map