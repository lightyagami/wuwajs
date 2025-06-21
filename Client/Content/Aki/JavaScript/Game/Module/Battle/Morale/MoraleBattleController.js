"use strict";
var _a;
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.MoraleBattleController = void 0;
const Log_1 = require("../../../../Core/Common/Log"),
  ControllerBase_1 = require("../../../../Core/Framework/ControllerBase"),
  Net_1 = require("../../../../Core/Net/Net"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiManager_1 = require("../../../Ui/UiManager"),
  MORALE_CHARACTER_BUFF_TIPS_PARAM = "0",
  EXTRA_TEMP_MORALE_MAX_LEVEL_BUFF_ID = 632400018;
class MoraleBattleController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return Net_1.Net.Register(24723, this.WR1), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnCloseLoadingView, this.jJa), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnMoraleIndomitableLevelChanged, this.d1u), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CharOnBuffAddShowMoraleBuffTips, this.sfu), !0
  }
  static OnClear() {
    return Net_1.Net.UnRegister(24723), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnCloseLoadingView, this.jJa), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnMoraleIndomitableLevelChanged, this.d1u), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CharOnBuffAddShowMoraleBuffTips, this.sfu), !0
  }
  static OnLeaveLevel() {
    return !(this.m1u = !1)
  }
  static SetReviveFromMoraleBattle(e) {
    this.m1u = e
  }
}
exports.MoraleBattleController = MoraleBattleController, (_a = MoraleBattleController).m1u = !1, MoraleBattleController.WR1 = e => {
  ModelManager_1.ModelManager.CreatureModel?.GetPlayerId() !== e.W5n ? Log_1.Log.CheckDebug() && Log_1.Log.Debug("Battle", 67, "[MoraleBattle]收到了不属于玩家的士气信息", ["MyPlayerId", ModelManager_1.ModelManager.CreatureModel.GetPlayerId()], ["NotifyPlayerId", e.W5n], ["IsStart", e.g9n], ["MoraleId", e.tR1], ["MoraleLevel", e.rR1], ["MoraleExp", e.oR1], ["TempLevel", e.nR1], ["TempExp", e.sR1], ["IndomitableLevel", e.iR1], ["ExpRatio", e.snu]) : (Log_1.Log.CheckDebug() && Log_1.Log.Debug("Battle", 67, "[MoraleBattle]士气信息改变", ["PlayerId", e.W5n], ["IsStart", e.g9n], ["MoraleId", e.tR1], ["MoraleLevel", e.rR1], ["MoraleExp", e.oR1], ["TempLevel", e.nR1], ["TempExp", e.sR1], ["IndomitableLevel", e.iR1], ["ExpRatio", e.snu], ["Reason", e.x9n]), ModelManager_1.ModelManager.MoraleBattleModel?.HandleMoraleInfoNotify(e))
}, MoraleBattleController.jJa = () => {
  _a.m1u && (_a.m1u = !1, ModelManager_1.ModelManager.MoraleBattleModel?.IsMoraleActive()) && 1 < ModelManager_1.ModelManager.MoraleBattleModel.GetLastMoraleLevel() && UiManager_1.UiManager.OpenView("MoraleLevelDecreaseView")
}, MoraleBattleController.d1u = (e, t) => {
  UiManager_1.UiManager.IsViewOpen("MoraleOccupiedSuccessView") ? UiManager_1.UiManager.CloseView("MoraleOccupiedSuccessView", e => {
    e && UiManager_1.UiManager.OpenView("MoraleOccupiedSuccessView")
  }) : UiManager_1.UiManager.OpenView("MoraleOccupiedSuccessView")
}, MoraleBattleController.sfu = (e, t, r, a) => {
  t.Parameters[0] === MORALE_CHARACTER_BUFF_TIPS_PARAM && (t = t.Parameters[1] ?? 0) && Number(t) === EXTRA_TEMP_MORALE_MAX_LEVEL_BUFF_ID && ModelManager_1.ModelManager.MoraleBattleModel?.SetIsUnlockTempMoraleMaxLevel(r)
};
//# sourceMappingURL=MoraleBattleController.js.map