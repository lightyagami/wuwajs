"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapComponent = undefined;
const PropertyMap_1 = require("../Container/PropertyMap");
const MapLogger_1 = require("../Misc/MapLogger");
class MapComponent {
  constructor(t) {
    this.Parent = t;
    this.PropertyMap = new PropertyMap_1.PropertyMap();
    this.mYa = 0;
  }
  static GenComponentId() {
    MapComponent._Xe = MapComponent._Xe + 1;
    return MapComponent._Xe;
  }
  get ComponentId() {
    if (this.mYa === 0) {
      this.mYa = MapComponent.GenComponentId();
    }
    return this.mYa;
  }
  set ComponentId(t) {
    this.mYa = t;
  }
  get ParentEntity() {
    return this.Parent;
  }
  get Enable() {
    return this.PropertyMap.tryGet("Enable", false);
  }
  set Enable(t) {
    this.PropertyMap.set("Enable", t);
    if (this.PropertyMap.isDirty("Enable")) {
      if (t) {
        if (this.dYa) {
          this.dYa = false;
          this.OnStart();
        }
        this.OnEnable();
      } else {
        this.OnDisable();
      }
    }
  }
  get dYa() {
    return this.PropertyMap.tryGet("FirstEnable", true);
  }
  set dYa(t) {
    this.PropertyMap.set("FirstEnable", t);
  }
  get CYa() {
    return this.PropertyMap.tryGet("EnableTick", false);
  }
  set CYa(t) {
    this.PropertyMap.set("EnableTick", t);
  }
  Remove() {
    this.OnRemove();
  }
  OnRemove() {}
  Add() {
    this.OnAdd();
  }
  OnAdd() {}
  OnEnable() {}
  OnStart() {}
  OnDisable() {}
  Init() {
    this.OnInit();
  }
  OnInit() {}
  Tick(t) {
    if (this.Enable && this.CYa) {
      this.OnTick(t);
    }
  }
  OnTick(t) {}
  Update() {
    if (this.Enable) {
      this.OnUpdate();
    }
  }
  OnUpdate() {}
  LogInfo(t, e, ...n) {
    MapLogger_1.MapLogger.Info(t, e, ...n);
  }
  LogWarn(t, e, ...n) {
    MapLogger_1.MapLogger.Warn(t, e, ...n);
  }
  LogError(t, e, ...n) {
    MapLogger_1.MapLogger.Error(t, e, ...n);
  }
}
(exports.MapComponent = MapComponent)._Xe = 0;
//# sourceMappingURL=MapComponent.js.map