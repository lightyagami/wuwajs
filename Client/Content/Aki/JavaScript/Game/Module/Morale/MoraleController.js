"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoraleController = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../Core/Net/Net");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const MORALE_CHARACTER_BUFF_TIPS_PARAM = "0";
class MoraleController extends UiControllerBase_1.UiControllerBase {
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnAddCommonItemNotify, this.oiu);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnCommonItemCountRefresh, this.niu);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnResponseCommonItemFinished, this.w_d);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnMoraleActiveChanged, this.k$1);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnMoraleSumLevelChanged, this.siu);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CharOnBuffAddShowMoraleBuffTips, this._fu);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OpenTreasureBox, this.nDu);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnAddCommonItemNotify, this.oiu);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnCommonItemCountRefresh, this.niu);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnResponseCommonItemFinished, this.w_d);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnMoraleActiveChanged, this.k$1);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnMoraleSumLevelChanged, this.siu);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CharOnBuffAddShowMoraleBuffTips, this._fu);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OpenTreasureBox, this.nDu);
  }
  static async RequestProgressReward(e) {
    var o = Protocol_1.Aki.Protocol.F91.create();
    o.BVn = e ?? [];
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Morale", 69, "F91", ["", o]);
    }
    var e = await Net_1.Net.CallAsync(25951, o);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Morale", 69, "N91", ["", e]);
    }
    if (!ControllerHolder_1.ControllerHolder.ErrorCodeController.CheckErrorCode(e, 19691)) {
      ModelManager_1.ModelManager.MoraleModel?.ProtoProgressRewardResponse(e);
    }
  }
  static async RequestGetPlayerMoraleAreaId() {
    var e = Protocol_1.Aki.Protocol.duu.create();
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Morale", 69, "duu", ["", e]);
    }
    var e = await Net_1.Net.CallAsync(25132, e);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Morale", 69, "muu", ["", e]);
    }
    ModelManager_1.ModelManager.MoraleModel?.ProtoMoralePosResponse(e);
  }
  static async RequestGetExplorerBoxTrackList(e) {
    var o = Protocol_1.Aki.Protocol.pUu.create();
    o.puu = e;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Morale", 69, "pUu", ["", o]);
    }
    var e = await Net_1.Net.CallAsync(16151, o);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Morale", 69, "vUu", ["", e]);
    }
    if (!ControllerHolder_1.ControllerHolder.ErrorCodeController.CheckErrorCode(e, 29977)) {
      ModelManager_1.ModelManager.MoraleModel?.ProtoMoraleTreasureBoxTraceResponse(e);
    }
  }
}
(exports.MoraleController = MoraleController).k$1 = e => {
  if (e) {
    ModelManager_1.ModelManager.MoraleModel?.InitData();
  }
};
MoraleController.siu = (e, o, t, r) => {
  if (e !== o) {
    ModelManager_1.ModelManager.MoraleModel?.CheckSumLevelChanged(e, o);
  }
  if (t !== 0 || r !== 0) {
    if ((e = Math.max(e + t, o)) !== (t = o + r)) {
      ModelManager_1.ModelManager.MoraleModel?.CheckSumLevelChanged(e, t);
    }
  }
};
MoraleController.oiu = e => {
  e = e.find(e => ModelManager_1.ModelManager.MoraleModel?.IsProgressScoreId(e.s5n));
  if (e) {
    ModelManager_1.ModelManager.MoraleModel.CheckProgressScoreChange(e.s5n, e.m9n);
  }
};
MoraleController.niu = (e, o, t) => {
  if (ModelManager_1.ModelManager.MoraleModel?.IsProgressScoreId(e.s5n)) {
    ModelManager_1.ModelManager.MoraleModel.CheckProgressScoreChange(e.s5n, o - t, o);
  }
};
MoraleController.w_d = () => {
  if (ModelManager_1.ModelManager.MoraleModel?.IsInitData) {
    ModelManager_1.ModelManager.MoraleModel.UpdateProgressScore();
  }
};
MoraleController._fu = (e, o, t, r) => {
  if (t && o.Parameters[0] === MORALE_CHARACTER_BUFF_TIPS_PARAM && (t = o.Parameters[1] ?? 0) && (o = Number(t))) {
    ModelManager_1.ModelManager.MoraleModel?.TryAddAreaBuffActiveState(o);
  }
};
MoraleController.nDu = e => {
  ModelManager_1.ModelManager.MoraleModel?.CheckExplorerBoxOpen(e);
}; //# sourceMappingURL=MoraleController.js.map