"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.MoraleController = void 0;
const Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../Core/Net/Net"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
  MORALE_CHARACTER_BUFF_TIPS_PARAM = "0";
class MoraleController extends UiControllerBase_1.UiControllerBase {
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnAddCommonItemNotify, this.Oeu), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnCommonItemCountRefresh, this.qeu), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnMoraleActiveChanged, this.ZH1), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnMoraleSumLevelChanged, this.Geu), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CharOnBuffAddShowMoraleBuffTips, this.Yau), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OpenTreasureBox, this.Emu)
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnAddCommonItemNotify, this.Oeu), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnCommonItemCountRefresh, this.qeu), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnMoraleActiveChanged, this.ZH1), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnMoraleSumLevelChanged, this.Geu), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CharOnBuffAddShowMoraleBuffTips, this.Yau), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OpenTreasureBox, this.Emu)
  }
  static async RequestProgressReward(e) {
    var o = Protocol_1.Aki.Protocol.r91.create(),
      e = (o.BVn = e ?? [], Log_1.Log.CheckDebug() && Log_1.Log.Debug("Morale", 69, "r91", ["", o]), await Net_1.Net.CallAsync(18430, o));
    Log_1.Log.CheckDebug() && Log_1.Log.Debug("Morale", 69, "o91", ["", e]), ControllerHolder_1.ControllerHolder.ErrorCodeController.CheckErrorCode(e, 22133) || ModelManager_1.ModelManager.MoraleModel?.ProtoProgressRewardResponse(e)
  }
  static async RequestGetPlayerMoraleAreaId() {
    var e = Protocol_1.Aki.Protocol.Onu.create(),
      e = (Log_1.Log.CheckDebug() && Log_1.Log.Debug("Morale", 69, "Onu", ["", e]), await Net_1.Net.CallAsync(17183, e));
    Log_1.Log.CheckDebug() && Log_1.Log.Debug("Morale", 69, "qnu", ["", e]), ModelManager_1.ModelManager.MoraleModel?.ProtoMoralePosResponse(e)
  }
  static async RequestGetExplorerBoxTrackList(e) {
    var o = Protocol_1.Aki.Protocol.Cmu.create(),
      e = (o.Vnu = e, Log_1.Log.CheckInfo() && Log_1.Log.Info("Morale", 69, "Cmu", ["", o]), await Net_1.Net.CallAsync(27708, o));
    Log_1.Log.CheckInfo() && Log_1.Log.Info("Morale", 69, "pmu", ["", e]), ControllerHolder_1.ControllerHolder.ErrorCodeController.CheckErrorCode(e, 26122) || ModelManager_1.ModelManager.MoraleModel?.ProtoMoraleTreasureBoxTraceResponse(e)
  }
}(exports.MoraleController = MoraleController).ZH1 = e => {
  e && ModelManager_1.ModelManager.MoraleModel?.InitData()
}, MoraleController.Geu = (e, o, r, t) => {
  e !== o && ModelManager_1.ModelManager.MoraleModel?.CheckSumLevelChanged(e, o), 0 === r && 0 === t || (e = Math.max(e + r, o)) !== (r = o + t) && ModelManager_1.ModelManager.MoraleModel?.CheckSumLevelChanged(e, r)
}, MoraleController.Oeu = e => {
  e = e.find(e => ModelManager_1.ModelManager.MoraleModel?.IsProgressScoreId(e.s5n));
  e && ModelManager_1.ModelManager.MoraleModel.CheckProgressScoreChange(e.s5n, e.m9n)
}, MoraleController.qeu = (e, o, r) => {
  ModelManager_1.ModelManager.MoraleModel?.IsProgressScoreId(e.s5n) && ModelManager_1.ModelManager.MoraleModel.CheckProgressScoreChange(e.s5n, o - r, o)
}, MoraleController.Yau = (e, o, r, t) => {
  ModelManager_1.ModelManager.MoraleBattleModel?.IsMoraleActive() && (r || o.Parameters[0] === MORALE_CHARACTER_BUFF_TIPS_PARAM) && (r = o.Parameters[1] ?? 0) && (o = Number(r)) && ModelManager_1.ModelManager.MoraleModel?.TryAddAreaBuffActiveState(o)
}, MoraleController.Emu = e => {
  ModelManager_1.ModelManager.MoraleModel?.CheckExplorerBoxOpen(e)
};
//# sourceMappingURL=MoraleController.js.map