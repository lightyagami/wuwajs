"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventSetClientEntityVisibleSave = undefined;
const Log_1 = require("../../../Core/Common/Log");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventSetClientEntityVisibleSave extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, l) {
    var t = e;
    if (t) {
      if (l.Type === 1 && l.ClientExecuteActions) {
        if (t.EntityIds && t.EntityIds.length !== 0) {
          for (const r of t.EntityIds) {
            var o = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(r)?.Entity;
            if (o?.Valid) {
              ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(o, t.Visible, "LevelEventSetClientEntityVisible");
            } else if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("LevelEvent", 31, "目标Entity不存在", ["PbDataId", r]);
            }
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LevelEvent", 31, "目标Entity未配置");
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelEvent", 26, "不是场景引用的帧事件");
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("LevelEvent", 31, "参数类型错误");
    }
  }
}
exports.LevelEventSetClientEntityVisibleSave = LevelEventSetClientEntityVisibleSave;
//# sourceMappingURL=LevelEventSetClientEntityVisibleSave.js.map