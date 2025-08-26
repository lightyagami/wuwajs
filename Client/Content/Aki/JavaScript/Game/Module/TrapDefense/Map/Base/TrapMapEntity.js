"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapMapEntity = undefined;
const TrapMapComponentContainer_1 = require("./TrapMapComponentContainer");
class TrapMapEntity {
  constructor() {
    this.MapComponentContainer = new TrapMapComponentContainer_1.TrapMapComponentContainer();
  }
  Init() {
    this.OnInit();
    this.MapComponentContainer.Init();
  }
  Tick(t) {
    this.MapComponentContainer.Tick(t);
    this.OnTick();
  }
  Dispose() {
    this.MapComponentContainer.RemoveAll();
    this.OnDispose();
  }
  OnInit() {}
  OnTick() {}
  OnDispose() {}
  AddComponent(t) {
    return this.MapComponentContainer.AddComponent(t, this);
  }
  GetComponent(t) {
    return this.MapComponentContainer.GetComponent(t);
  }
  RemoveComponent(t) {
    this.MapComponentContainer.RemoveComponent(t);
  }
}
exports.TrapMapEntity = TrapMapEntity;
//# sourceMappingURL=TrapMapEntity.js.map