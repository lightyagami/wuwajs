"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventStopUiScreenEffect = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const CommonDefine_1 = require("../../../Core/Define/CommonDefine");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventStopUiScreenEffect extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, r) {
    if (ResourceSystem_1.ResourceSystem.CheckAssetLoaded(e.EffectDaPath, UE.EffectScreenPlayData_C)) {
      ModelManager_1.ModelManager.ScreenEffectModel?.EndScreenEffectByPath(e.EffectDaPath);
      if (this.IsAsync) {
        this.FinishExecute(true);
      } else if (e = ResourceSystem_1.ResourceSystem.GetLoadedAsset(e.EffectDaPath, UE.EffectScreenPlayData_C)) {
        if ((e = e.End * CommonDefine_1.MILLIONSECOND_PER_SECOND) < TimerSystem_1.MIN_TIME) {
          this.FinishExecute(true);
        } else {
          TimerSystem_1.GameplayTimerSystem.Delay(() => {
            this.FinishExecute(true);
          }, e);
        }
      } else {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("LevelEvent", 39, "[LevelEventStopUiScreenEffect] 特效资源未加载, 无法获取End时间");
        }
        this.FinishExecute(true);
      }
    } else {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("LevelEvent", 39, "[LevelEventStopUiScreenEffect] 特效资源未加载");
      }
      this.FinishExecute(true);
    }
  }
}
exports.LevelEventStopUiScreenEffect = LevelEventStopUiScreenEffect;
//# sourceMappingURL=LevelEventStopUiScreenEffect.js.map