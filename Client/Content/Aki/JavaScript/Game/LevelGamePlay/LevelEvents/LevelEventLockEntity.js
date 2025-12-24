"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventLockEntity = undefined;
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventLockEntity extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments);
    this.Lo = undefined;
  }
  ExecuteNew(e, t, s) {
    if (t.Type === 1 && t.ClientExecuteActions) {
      this.Lo = e;
      this.CreateWaitEntityTask(this.Lo.EntityIds);
    } else {
      this.FinishExecute(true);
    }
  }
  ExecuteWhenEntitiesReady() {
    for (const t of this.Lo.EntityIds) {
      var e = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(t);
      if (e?.IsInit) {
        e.Entity.GetComponent(206)?.AddServerTagByIdLocal(-662723379, "LevelEventLockEntity");
      }
    }
    this.FinishExecute(true);
  }
  OnReset() {
    this.Lo = undefined;
  }
}
exports.LevelEventLockEntity = LevelEventLockEntity;
//# sourceMappingURL=LevelEventLockEntity.js.map