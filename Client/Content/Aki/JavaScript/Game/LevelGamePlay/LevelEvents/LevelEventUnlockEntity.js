"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventUnlockEntity = undefined;
const Log_1 = require("../../../Core/Common/Log");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventUnlockEntity extends LevelGeneralBase_1.LevelEventBase {
  ExecuteAction(e, o, t) {
    if (o.Type === 1 && o.ClientExecuteActions) {
      for (const l of e.EntityIds) {
        var n = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(l)?.Entity?.GetComponent(197);
        if (n) {
          n.RemoveServerTagByIdLocal(-662723379, "LevelEventUnlockEntity");
        } else if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Plot", 31, "找不对对应的实体", ["pbDataId", l]);
        }
      }
    } else {
      this.FinishExecute(true);
    }
  }
}
exports.LevelEventUnlockEntity = LevelEventUnlockEntity;
//# sourceMappingURL=LevelEventUnlockEntity.js.map