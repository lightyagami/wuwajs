"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventDestroySelf = undefined;
const Log_1 = require("../../../Core/Common/Log");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
const LevelGeneralCommons_1 = require("../LevelGeneralCommons");
class LevelEventDestroySelf extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, r) {
    if (r) {
      if (r = ModelManager_1.ModelManager.CreatureModel.GetEntityById(r.TriggerEntityId)) {
        LevelGeneralCommons_1.LevelGeneralCommons.ChangeToDestroyState(ModelManager_1.ModelManager.CreatureModel.GetPbDataIdByEntity(r));
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("LevelEvent", 65, "此LevelEvent只能配置在Trigger中");
    }
  }
}
exports.LevelEventDestroySelf = LevelEventDestroySelf;
//# sourceMappingURL=LevelEventDestroySelf.js.map