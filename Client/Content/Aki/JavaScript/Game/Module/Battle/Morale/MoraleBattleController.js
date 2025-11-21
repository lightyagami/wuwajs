"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoraleBattleController = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const ControllerBase_1 = require("../../../../Core/Framework/ControllerBase");
const Net_1 = require("../../../../Core/Net/Net");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiManager_1 = require("../../../Ui/UiManager");
const MORALE_CHARACTER_BUFF_TIPS_PARAM = "0";
const EXTRA_TEMP_MORALE_MAX_LEVEL_BUFF_ID = 632400018;
class MoraleBattleController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    Net_1.Net.Register(24723, this.pL1);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnCloseLoadingView, this.jJa);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnMoraleIndomitableLevelChanged, this.Myu);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CharOnBuffAddShowMoraleBuffTips, this.i2u);
    return true;
  }
  static OnClear() {
    Net_1.Net.UnRegister(24723);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnCloseLoadingView, this.jJa);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnMoraleIndomitableLevelChanged, this.Myu);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CharOnBuffAddShowMoraleBuffTips, this.i2u);
    return true;
  }
  static OnLeaveLevel() {
    return !(this.Eyu = false);
  }
  static SetReviveFromMoraleBattle(e) {
    this.Eyu = e;
  }
}
exports.MoraleBattleController = MoraleBattleController;
(_a = MoraleBattleController).Eyu = false;
MoraleBattleController.pL1 = e => {
  if (ModelManager_1.ModelManager.CreatureModel?.GetPlayerId() !== e.W5n) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 67, "[MoraleBattle]收到了不属于玩家的士气信息", ["MyPlayerId", ModelManager_1.ModelManager.CreatureModel.GetPlayerId()], ["NotifyPlayerId", e.W5n], ["IsStart", e.g9n], ["MoraleId", e.RR1], ["MoraleLevel", e.wR1], ["MoraleExp", e.AR1], ["TempLevel", e.PR1], ["TempExp", e.xR1], ["IndomitableLevel", e.LR1], ["ExpRatio", e.o_u]);
    }
  } else {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 67, "[MoraleBattle]士气信息改变", ["PlayerId", e.W5n], ["IsStart", e.g9n], ["MoraleId", e.RR1], ["MoraleLevel", e.wR1], ["MoraleExp", e.AR1], ["TempLevel", e.PR1], ["TempExp", e.xR1], ["IndomitableLevel", e.LR1], ["ExpRatio", e.o_u], ["Reason", e.x9n]);
    }
    ModelManager_1.ModelManager.MoraleBattleModel?.HandleMoraleInfoNotify(e);
  }
};
MoraleBattleController.jJa = () => {
  if (_a.Eyu && (_a.Eyu = false, ModelManager_1.ModelManager.MoraleBattleModel?.IsMoraleActive()) && ModelManager_1.ModelManager.MoraleBattleModel.GetLastMoraleLevel() > 1) {
    UiManager_1.UiManager.OpenView("MoraleLevelDecreaseView");
  }
};
MoraleBattleController.Myu = (e, t) => {
  if (UiManager_1.UiManager.IsViewOpen("MoraleOccupiedSuccessView")) {
    UiManager_1.UiManager.CloseView("MoraleOccupiedSuccessView", e => {
      if (e) {
        UiManager_1.UiManager.OpenView("MoraleOccupiedSuccessView");
      }
    });
  } else {
    UiManager_1.UiManager.OpenView("MoraleOccupiedSuccessView");
  }
};
MoraleBattleController.i2u = (e, t, r, a) => {
  if (t.Parameters[0] === MORALE_CHARACTER_BUFF_TIPS_PARAM && (t = t.Parameters[1] ?? 0) && Number(t) === EXTRA_TEMP_MORALE_MAX_LEVEL_BUFF_ID) {
    ModelManager_1.ModelManager.MoraleBattleModel?.SetIsUnlockTempMoraleMaxLevel(r);
  }
}; //# sourceMappingURL=MoraleBattleController.js.map