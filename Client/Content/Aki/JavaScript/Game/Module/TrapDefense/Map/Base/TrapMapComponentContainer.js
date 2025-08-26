"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapMapComponentContainer = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const TrapDefenseDefine_1 = require("../../TrapDefenseDefine");
class TrapMapComponentContainer {
  constructor() {
    this.gYa = new Map();
    this.fYa = new Map();
  }
  AddComponent(e, t) {
    t = new TrapDefenseDefine_1.towerMapComponentConstructors[e](t);
    this.YW(e, t);
    return t;
  }
  YW(e, t) {
    var o = t.ComponentId;
    if (this.gYa.has(o)) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("TowerDefense", 86, "[塔防地图]TrapMapComponentContainer.AddInternal->添加组件失败，重复组件Id", ["componentId", o]);
      }
      return false;
    } else {
      this.gYa.set(o, t);
      if (!this.fYa.has(e)) {
        this.fYa.set(e, []);
      }
      this.fYa.get(e).push(t);
      t.Add();
      return t.Enable = true;
    }
  }
  GetComponent(e) {
    e = this.GetAllGeneric(e);
    if (e !== undefined) {
      return e[0];
    }
  }
  GetComponentById(e) {
    if (this.gYa.has(e)) {
      return this.gYa.get(e);
    }
    if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("TowerDefense", 86, "[塔防地图]TrapMapComponentContainer.GetById->获取组件失败，不存在该组件Id", ["componentId", e]);
    }
  }
  GetComponentByFilter(e, t) {
    e = this.GetAllGeneric(e);
    if (e) {
      for (const o of e) {
        if (t(o)) {
          return o;
        }
      }
    }
  }
  GetAllGeneric(e) {
    e = this.GetAll(e);
    if (e !== undefined) {
      return e;
    }
  }
  GetAll(e) {
    if (this.fYa.has(e)) {
      var t = this.fYa.get(e);
      if (!(t.length <= 0) || this.fYa.has(e)) {
        return t;
      }
    }
    if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("TowerDefense", 86, "[塔防地图]MapComponentContainer.Get->获取组件失败，不存在该类型组件", ["componentType", e]);
    }
  }
  RemoveComponent(e) {
    var t = this.GetAll(e);
    if (t !== undefined) {
      for (let e = t.length - 1; e >= 0; --e) {
        var o = t[e];
        var n = o.ComponentId;
        this.gYa.delete(n);
        t.splice(e, 1);
        o.Enable = false;
        o.Remove();
      }
    }
  }
  RemoveAll() {
    for (var [, e] of this.gYa) {
      e.Enable = false;
      e.Remove();
    }
    this.gYa.clear();
    this.fYa.clear();
  }
  Init() {
    for (var [, e] of this.gYa) {
      e.Init();
    }
  }
  Tick(e) {
    for (var [, t] of this.gYa) {
      t.Tick(e);
    }
  }
}
exports.TrapMapComponentContainer = TrapMapComponentContainer;
//# sourceMappingURL=TrapMapComponentContainer.js.map