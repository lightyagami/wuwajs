"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventClaimLevelPlayReward = undefined;
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventClaimLevelPlayReward extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, r, l) {
    if (r && r.Type === 1) {
      r = EntitySystem_1.EntitySystem.Get(r.EntityId);
      if (r?.Valid) {
        r = r.GetComponent(0);
        let e = -1;
        var a = ModelManager_1.ModelManager.CreatureModel.GetEntityOwner(ModelManager_1.ModelManager.GameModeModel.MapConfig.MapId, r.GetPbDataId());
        if (a && a?.Type === "LevelPlay") {
          e = a.LevelPlayId;
        }
        ControllerHolder_1.ControllerHolder.LevelPlayController.ReceiveReward(r.GetCreatureDataId(), e);
      }
    }
  }
}
exports.LevelEventClaimLevelPlayReward = LevelEventClaimLevelPlayReward;
//# sourceMappingURL=LevelEventClaimLevelPlayReward.js.map