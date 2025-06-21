"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.LevelEventStopUiScreenEffect = void 0;
const UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  CommonDefine_1 = require("../../../Core/Define/CommonDefine"),
  ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventStopUiScreenEffect extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, r) {
    ModelManager_1.ModelManager.ScreenEffectModel?.EndScreenEffectByPath(e.EffectDaPath), this.IsAsync ? this.FinishExecute(!0) : (e = ResourceSystem_1.ResourceSystem.GetLoadedAsset(e.EffectDaPath, UE.EffectScreenPlayData_C))?.IsValid() ? (e = e.End * CommonDefine_1.MILLIONSECOND_PER_SECOND) < TimerSystem_1.MIN_TIME ? this.FinishExecute(!0) : TimerSystem_1.TimerSystem.Delay(() => {
      this.FinishExecute(!0)
    }, e) : (Log_1.Log.CheckError() && Log_1.Log.Error("LevelEvent", 39, "[LevelEventStopUiScreenEffect] 特效资源未加载"), this.FinishExecute(!1))
  }
}
exports.LevelEventStopUiScreenEffect = LevelEventStopUiScreenEffect;
//# sourceMappingURL=LevelEventStopUiScreenEffect.js.map