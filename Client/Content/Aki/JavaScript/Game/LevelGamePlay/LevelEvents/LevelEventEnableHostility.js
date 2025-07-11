"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventEnableHostility = undefined;
const Log_1 = require("../../../Core/Common/Log");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventEnableHostility extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments);
    this.fLe = undefined;
    this.vq = false;
  }
  ExecuteNew(e, t) {
    if (e) {
      this.vq = e.IsEnable;
      this.fLe = e.EntityIds;
      for (const o of this.fLe) {
        var s = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(o);
        if (s?.Valid) {
          if (this.vq) {
            s.Entity.GetComponent(47)?.SetAiHateConfig("");
            s.Entity.GetComponent(47)?.SetAiTickLock(false);
          } else {
            s.Entity.GetComponent(47)?.SetAiTickLock(true);
            s.Entity.GetComponent(47)?.SetAiHateConfig("10");
          }
        } else if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("LevelEvent", 33, "实体不存在 可能已被销毁", ["entityId", o]);
        }
      }
      this.FinishExecute(true);
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelEvent", 33, "参数不合法");
      }
      this.FinishExecute(false);
    }
  }
}
exports.LevelEventEnableHostility = LevelEventEnableHostility;
//# sourceMappingURL=LevelEventEnableHostility.js.map