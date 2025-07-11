"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventEnableAi = undefined;
const Log_1 = require("../../../Core/Common/Log");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventEnableAi extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, l) {
    var n = e;
    if (n) {
      if (n.EntityIds) {
        for (const a of n.EntityIds) {
          var o = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(a);
          if (o) {
            if ((o = o.Entity.GetComponent(45)) && o.Valid) {
              o.StopMove(!n.IsEnable);
            } else if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("LevelEvent", 18, "LevelEventEnableAi行为执行时,实体不存在CharacterMoveComponent", ["实体Id", a]);
            }
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("LevelEvent", 18, "LevelEventEnableAi行为执行时找不到实体", ["实体Id", a]);
          }
        }
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LevelEvent", 18, "LevelEventEnableAi行为执行失败：配置的实体Id列表为空");
        }
        this.FinishExecute(false);
      }
    } else {
      this.FinishExecute(false);
    }
  }
}
exports.LevelEventEnableAi = LevelEventEnableAi;
//# sourceMappingURL=LevelEventEnableAi.js.map