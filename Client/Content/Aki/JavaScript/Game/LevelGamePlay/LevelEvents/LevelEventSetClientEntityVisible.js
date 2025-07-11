"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventSetClientEntityVisible = undefined;
const Log_1 = require("../../../Core/Common/Log");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventSetClientEntityVisible extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, t) {
    var l = e;
    if (l) {
      if (l.EntityIds && l.EntityIds.length !== 0) {
        for (const o of l.EntityIds) {
          var r = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(o)?.Entity;
          if (r?.Valid) {
            ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(r, l.Visible, "LevelEventSetClientEntityVisible", true);
          } else if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("LevelEvent", 31, "目标Entity不存在", ["PbDataId", o]);
          }
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelEvent", 31, "目标Entity未配置");
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("LevelEvent", 31, "参数类型错误");
    }
  }
}
exports.LevelEventSetClientEntityVisible = LevelEventSetClientEntityVisible;
//# sourceMappingURL=LevelEventSetClientEntityVisible.js.map