"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityTrapDefenseData = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ActivityData_1 = require("../../ActivityData");
class ActivityTrapDefenseData extends ActivityData_1.ActivityBaseData {
  GetExDataRedPointShowState() {
    return !!ModelManager_1.ModelManager.RedDotModel.GetRedDot("TrapDefense")?.IsRedDotActive() || ModelManager_1.ModelManager.TrapDefenseModel.RougeModeData.IsShowRougeModeTipsToActivity();
  }
  PhraseEx(e) {
    var e = e._Hc;
    if (e && (ModelManager_1.ModelManager.TrapDefenseModel?.InitData(this.Id), ModelManager_1.ModelManager.TrapDefenseModel?.UpdateActivityData(e), Log_1.Log.CheckDebug() && Log_1.Log.Debug("TowerDefenseEvent", 69, "Data PhraseEx", ["", e], ["Id", this.Id], ["Type", this.Type]), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RedDotUpdateTrapDefenseRougeModeOpen), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RedDotUpdateTrapDefenseLevelModeLevelReachOpenTime), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RedDotUpdateTrapDefenseRougeModeLevelReachOpenTime), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RedDotUpdateTrapDefenseBdBuffNewUnlock), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RedDotUpdateTrapDefenseTalentTree), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RedDotUpdateTrapDefenseLimitReward), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RedDotUpdateTrapDefenseFixedReward), ControllerHolder_1.ControllerHolder.TrapDefenseController.IsActivityInited = true, e = ControllerHolder_1.ControllerHolder.TrapDefenseController.ResultNotifyCache)) {
      ControllerHolder_1.ControllerHolder.TrapDefenseController.OpenDefenseChallengeResultView(e, true);
      ControllerHolder_1.ControllerHolder.TrapDefenseController.ResultNotifyCache = undefined;
    }
  }
  GetExDataFinishShowState() {
    return ModelManager_1.ModelManager.TrapDefenseModel.RewardData.IsAllRewardClaimed();
  }
}
exports.ActivityTrapDefenseData = ActivityTrapDefenseData;
//# sourceMappingURL=ActivityTrapDefenseData.js.map