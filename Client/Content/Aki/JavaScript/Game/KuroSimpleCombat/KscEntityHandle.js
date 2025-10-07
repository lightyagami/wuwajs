"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KscEntityHandle = undefined;
const ModelManager_1 = require("../Manager/ModelManager");
class KscEntityHandle {
  constructor(t, e = 0) {
    this.KscEntity = t;
    this.CreatureDataId = e;
  }
  get Valid() {
    return this.KscEntity?.IsValid() ?? false;
  }
  SetKscEntity(t) {
    this.KscEntity = t;
  }
  SetCreatureDataId(t) {
    this.CreatureDataId = t;
  }
  eWu() {
    var t;
    return !!this.CreatureDataId && !!(t = ModelManager_1.ModelManager.CreatureModel?.GetEntity(this.CreatureDataId)) && !!t.Entity && !!this.Valid && !!t.Entity.GetComponent(3)?.Actor?.D_GetTransform();
  }
  SyncEntityLocation() {
    var t;
    if (this.eWu()) {
      t = ModelManager_1.ModelManager.CreatureModel.GetEntity(this.CreatureDataId).Entity.GetComponent(3).Actor.D_GetTransform();
      this.KscEntity.SetTransformByWorld(t);
    }
  }
}
exports.KscEntityHandle = KscEntityHandle;
//# sourceMappingURL=KscEntityHandle.js.map