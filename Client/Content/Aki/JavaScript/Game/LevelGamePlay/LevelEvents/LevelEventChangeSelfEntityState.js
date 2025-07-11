"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventChangeSelfEntityState = undefined;
const GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
const LevelGeneralCommons_1 = require("../LevelGeneralCommons");
class LevelEventChangeSelfEntityState extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments);
    this.tRl = 0;
    this.wDe = 0;
  }
  ExecuteNew(e, t, a) {
    var e = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e.EntityState);
    let s = undefined;
    switch (t.Type) {
      case 1:
        s = t.EntityId;
        break;
      case 5:
        s = t.TriggerEntityId;
        break;
      default:
        return;
    }
    if (e && s) {
      this.tRl = e;
      e = ModelManager_1.ModelManager.CreatureModel.GetEntityById(s);
      this.wDe = ModelManager_1.ModelManager.CreatureModel.GetPbDataIdByEntity(e);
      this.CreateWaitEntityTask(this.wDe);
    }
  }
  ExecuteWhenEntitiesReady() {
    LevelGeneralCommons_1.LevelGeneralCommons.PrechangeStateTag(this.wDe, this.tRl, "LevelEventChangeSelfEntityState");
    this.FinishExecute(true);
  }
  OnReset() {
    this.tRl = 0;
    this.wDe = 0;
  }
}
exports.LevelEventChangeSelfEntityState = LevelEventChangeSelfEntityState;
//# sourceMappingURL=LevelEventChangeSelfEntityState.js.map