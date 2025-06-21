"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.ActivityDangoMonopolyController = void 0;
const Log_1 = require("../../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../../../Core/Net/Net"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ActivityControllerBase_1 = require("../../ActivityControllerBase"),
  ActivityManager_1 = require("../../ActivityManager"),
  ActivityDangoMonopolyData_1 = require("./ActivityDangoMonopolyData"),
  ActivitySubViewDangoMonopoly_1 = require("./ActivitySubViewDangoMonopoly");
class ActivityDangoMonopolyController extends ActivityControllerBase_1.ActivityControllerBase {
  constructor() {
    super(...arguments), this.Data = void 0, this.Jn_ = () => {
      this.Data?.DelayUpdateCameraMove(), this.Data?.IsInTheDungeon() && this.Data.RecordKismetSetting()
    }, this.VU1 = o => {
      o === this.Data?.DiceItemId && (EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RedDotUpdateDangoMonopolyNum), this.RefreshActivityRedDot())
    }
  }
  OnGetIsOpeningActivityRelativeView() {
    return !1
  }
  OnOpenView(o) {}
  OnGetActivityResource(o) {
    return "UiItem_ActivityMonopoly"
  }
  OnCreateSubPageComponent(o) {
    return new ActivitySubViewDangoMonopoly_1.ActivitySubViewDangoMonopoly
  }
  OnCreateActivityData(o) {
    return this.Data = new ActivityDangoMonopolyData_1.ActivityDangoMonopolyData, this.Data
  }
  OnRegisterNetEvent() {
    Net_1.Net.Register(27158, o => {
      Log_1.Log.CheckDebug() && Log_1.Log.Debug("DangoMonopoly", 69, "$Uc", ["", o]), this.Data?.ProtoTaskUpdateNotify(o.CJ_)
    }), Net_1.Net.Register(19724, o => {
      Log_1.Log.CheckDebug() && Log_1.Log.Debug("DangoMonopoly", 69, "TBc", ["", o]), this.Data?.ProtoSceneGridInfoNotify(o)
    }), Net_1.Net.Register(20011, o => {
      Log_1.Log.CheckDebug() && Log_1.Log.Debug("DangoMonopoly", 69, "fa1", ["", o]), this.Data?.ProtoTaskAddNotify(o.CJ_)
    }), Net_1.Net.Register(28741, o => {
      Log_1.Log.CheckDebug() && Log_1.Log.Debug("DangoMonopoly", 69, "ga1", ["", o]), this.Data?.ProtoTaskRemoveNotify(o.B6n)
    }), Net_1.Net.Register(20547, o => {
      Log_1.Log.CheckDebug() && Log_1.Log.Debug("DangoMonopoly", 69, "Rp1", ["", o]), this.Data?.ProtoRewardNotify(o)
    })
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(27158), Net_1.Net.UnRegister(19724), Net_1.Net.UnRegister(20011), Net_1.Net.UnRegister(28741), Net_1.Net.UnRegister(20547)
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDone, this.Jn_), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnCommonItemCountAnyChange, this.VU1)
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDone, this.Jn_), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnCommonItemCountAnyChange, this.VU1)
  }
  static UU_() {
    return ActivityManager_1.ActivityManager.GetActivityController(Protocol_1.Aki.Protocol.uks.Proto_DangoMonopoly)
  }
  static GetData() {
    return this.UU_()?.Data
  }
  RefreshActivityRedDot() {
    var o = this.Data?.Id;
    o && EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, o)
  }
  async RequestReceiveTaskReward(o) {
    var e = this.Data,
      t = Protocol_1.Aki.Protocol.lPc.create(),
      e = (t.w6n = e?.Id ?? 0, t.B6n = o, Log_1.Log.CheckDebug() && Log_1.Log.Debug("DangoMonopoly", 69, "lPc", ["", t]), await Net_1.Net.CallAsync(18183, t));
    Log_1.Log.CheckDebug() && Log_1.Log.Debug("DangoMonopoly", 69, "_Pc", ["", e]), ControllerHolder_1.ControllerHolder.ErrorCodeController.CheckErrorCode(e, 28231)
  }
  async RequestReceiveBoardReward(o) {
    var e = this.Data,
      t = Protocol_1.Aki.Protocol.aPc.create(),
      t = (t.w6n = e?.Id ?? 0, t.pPc = o, Log_1.Log.CheckDebug() && Log_1.Log.Debug("DangoMonopoly", 69, "aPc", ["", t]), await Net_1.Net.CallAsync(20364, t));
    Log_1.Log.CheckDebug() && Log_1.Log.Debug("DangoMonopoly", 69, "hPc", ["", t]), ControllerHolder_1.ControllerHolder.ErrorCodeController.CheckErrorCode(t, 15321) || (e?.ProtoReceiveBoardRewardResponse(o), this.RefreshActivityRedDot())
  }
  async RequestReceiveGridReward() {
    var o = this.Data,
      e = Protocol_1.Aki.Protocol.nPc.create(),
      e = (e.w6n = o?.Id ?? 0, Log_1.Log.CheckDebug() && Log_1.Log.Debug("DangoMonopoly", 69, "nPc", ["", e]), await Net_1.Net.CallAsync(21826, e));
    Log_1.Log.CheckDebug() && Log_1.Log.Debug("DangoMonopoly", 69, "sPc", ["", e]), ControllerHolder_1.ControllerHolder.ErrorCodeController.CheckErrorCode(e, 20548) || o?.ProtoReceiveGridRewardResponse()
  }
  async RequestDice() {
    var o = this.Data,
      e = Protocol_1.Aki.Protocol.rPc.create(),
      e = (e.w6n = o?.Id ?? 0, Log_1.Log.CheckDebug() && Log_1.Log.Debug("DangoMonopoly", 69, "rPc", ["", e]), await Net_1.Net.CallAsync(18401, e));
    Log_1.Log.CheckDebug() && Log_1.Log.Debug("DangoMonopoly", 69, "oPc", ["", e]), ControllerHolder_1.ControllerHolder.ErrorCodeController.CheckErrorCode(e, 28290, !1) ? o?.SetIsDangoMoveProcess(!1) : (o?.ProtoDiceResponse(e), this.RefreshActivityRedDot())
  }
  async RequestEnterNextBoard() {
    var o = this.Data,
      e = Protocol_1.Aki.Protocol.bBc.create(),
      e = (e.w6n = o?.Id ?? 0, Log_1.Log.CheckDebug() && Log_1.Log.Debug("DangoMonopoly", 69, "bBc", ["", e]), await Net_1.Net.CallAsync(25026, e));
    Log_1.Log.CheckDebug() && Log_1.Log.Debug("DangoMonopoly", 69, "LBc", ["", e]), ControllerHolder_1.ControllerHolder.ErrorCodeController.CheckErrorCode(e, 19086) || (o?.ProtoEnterNextBoardResponse(e), this.RefreshActivityRedDot())
  }
}
exports.ActivityDangoMonopolyController = ActivityDangoMonopolyController;
//# sourceMappingURL=ActivityDangoMonopolyController.js.map