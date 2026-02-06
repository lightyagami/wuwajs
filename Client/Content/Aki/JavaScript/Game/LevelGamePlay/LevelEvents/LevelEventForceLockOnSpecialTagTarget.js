"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventForceLockOnSpecialTagTarget = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Global_1 = require("../../Global");
const ModelManager_1 = require("../../Manager/ModelManager");
const BaseLockOnComponent_1 = require("../../NewWorld/Character/Common/Component/LockOn/BaseLockOnComponent");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventForceLockOnSpecialTagTarget extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, o) {
    var a;
    var n;
    var r;
    if (e) {
      if (!e.EntityId) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Level", 22, "LevelEventForceLockOnSpecialTagTarget 事件EntityId为空");
        }
      }
      if ((a = Global_1.Global.BaseCharacter.CharacterActorComponent.Entity.GetComponent(34))?.Valid) {
        n = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(e.EntityId);
        (r = new BaseLockOnComponent_1.LockOnInfo()).EntityHandle = n;
        a.ForceLookAt(r, e.IsLocked);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Level", 22, "LevelEventForceLockOnSpecialTagTarget 获取不到玩家lockon组件");
      }
    }
  }
}
exports.LevelEventForceLockOnSpecialTagTarget = LevelEventForceLockOnSpecialTagTarget;
//# sourceMappingURL=LevelEventForceLockOnSpecialTagTarget.js.map