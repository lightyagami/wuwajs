"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventSetInteractionLockState = undefined;
const Log_1 = require("../../../Core/Common/Log");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventSetInteractionLockState extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, o) {
    if (e) {
      if (e = e) {
        if (o = o) {
          if (ModelManager_1.ModelManager.InteractionModel.InteractingEntity !== o.EntityId) {
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("LevelEvent", 36, "当前申请交互锁定的实体与记录的正在交互的实体不一致，可能是因为服务器重发，交互锁定行为不响应服务器重发");
            }
          } else {
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("LevelEvent", 36, "设置交互锁定状态", ["IsLock", e.IsLock]);
            }
            if (e.IsLock) {
              ModelManager_1.ModelManager.InteractionModel.LockInteract(o.EntityId);
            } else {
              ModelManager_1.ModelManager.InteractionModel.RecoverInteractFromLock();
            }
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LevelEvent", 36, "此LevelEvent只能接受以EntityContext为上下文");
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelEvent", 36, "参数类型错误");
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("LevelEvent", 36, "参数为空");
    }
  }
}
exports.LevelEventSetInteractionLockState = LevelEventSetInteractionLockState;
//# sourceMappingURL=LevelEventSetInteractionLockState.js.map