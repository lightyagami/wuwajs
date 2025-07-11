"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionCheckEntityReward = undefined;
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckEntityReward extends LevelGeneralBase_1.LevelConditionBase {
  CheckNew(e, r, a) {
    if (!e) {
      return false;
    }
    let t = 0;
    let n = undefined;
    if (e.EntityId) {
      n = ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(e.EntityId);
    } else {
      if (!a) {
        return false;
      }
      switch (a.Type) {
        case 1:
          t = a?.EntityId || 0;
          break;
        case 5:
          t = a?.TriggerEntityId || 0;
          break;
        default:
          return false;
      }
      if (!t) {
        return false;
      }
      n = ModelManager_1.ModelManager.CreatureModel?.GetEntityById(t);
    }
    return n?.Entity?.GetComponent(0)?.CanGetReward ?? false;
  }
}
exports.LevelConditionCheckEntityReward = LevelConditionCheckEntityReward;
//# sourceMappingURL=LevelConditionCheckEntityReward.js.map