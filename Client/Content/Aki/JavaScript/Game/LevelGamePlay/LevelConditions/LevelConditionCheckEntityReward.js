"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.LevelConditionCheckEntityReward = void 0;
const ModelManager_1 = require("../../Manager/ModelManager"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckEntityReward extends LevelGeneralBase_1.LevelConditionBase {
  CheckNew(e, r, a) {
    if (!e) return !1;
    let t = 0,
      n = void 0;
    if (e.EntityId) n = ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(e.EntityId);
    else {
      if (!a) return !1;
      switch (a.Type) {
        case 1:
          t = a?.EntityId || 0;
          break;
        case 5:
          t = a?.TriggerEntityId || 0;
          break;
        default:
          return !1
      }
      if (!t) return !1;
      n = ModelManager_1.ModelManager.CreatureModel?.GetEntityById(t)
    }
    return n?.Entity?.GetComponent(0)?.CanGetReward ?? !1
  }
}
exports.LevelConditionCheckEntityReward = LevelConditionCheckEntityReward;
//# sourceMappingURL=LevelConditionCheckEntityReward.js.map