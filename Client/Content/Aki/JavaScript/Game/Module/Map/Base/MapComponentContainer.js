"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapComponentContainer = undefined;
const MapLogger_1 = require("../Misc/MapLogger");
const MapBaseDefine_1 = require("./MapBaseDefine");
class MapComponentContainer {
  constructor() {
    this.gYa = new Map();
    this.fYa = new Map();
  }
  AddComponent(e, t) {
    var o = MapBaseDefine_1.mapComponentRegisterInfo.get(e);
    if (o !== undefined) {
      o = new o(t ?? this);
      this.YW(e, o);
      return o;
    }
    MapLogger_1.MapLogger.ErrorOnce(e, 63, "[世界地图]MapComponentContainer.Add->构造组件失败, 请检查类型是否已经注册到MapBaseDefine.mapComponentRegisterInfo中", ["componentType", e]);
  }
  YW(e, t) {
    var o = t.ComponentId;
    if (this.gYa.has(o)) {
      MapLogger_1.MapLogger.WarnOnce(o, 63, "[世界地图]MapComponentContainer.AddInternal->添加组件失败，重复组件Id", ["componentId", o]);
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
    MapLogger_1.MapLogger.WarnOnce(e, 63, "[世界地图]MapComponentContainer.GetById->获取组件失败，不存在该组件Id", ["componentId", e]);
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
    MapLogger_1.MapLogger.WarnOnce(e, 63, "[世界地图]MapComponentContainer.Get->获取组件失败，不存在该类型组件", ["componentType", e]);
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
  RemoveById(e) {
    var t;
    var o = this.gYa.get(e);
    if (o !== undefined) {
      this.gYa.delete(e);
      e = o.ComponentType;
      t = (e = this.GetAll(e)).indexOf(o);
      e.splice(t, 1);
      o.Enable = false;
      o.Remove();
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
  Update() {
    for (var [, e] of this.gYa) {
      e.Update();
    }
  }
}
exports.MapComponentContainer = MapComponentContainer;
//# sourceMappingURL=MapComponentContainer.js.map