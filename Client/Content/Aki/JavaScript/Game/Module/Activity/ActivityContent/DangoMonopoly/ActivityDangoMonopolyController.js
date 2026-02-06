"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityDangoMonopolyController = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../../../Core/Net/Net");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ActivityControllerBase_1 = require("../../ActivityControllerBase");
const ActivityManager_1 = require("../../ActivityManager");
const ActivityDangoMonopolyData_1 = require("./ActivityDangoMonopolyData");
const ActivitySubViewDangoMonopoly_1 = require("./ActivitySubViewDangoMonopoly");
class ActivityDangoMonopolyController extends ActivityControllerBase_1.ActivityControllerBase {
  constructor() {
    super(...arguments);
    this.Data = undefined;
    this.Jn_ = () => {
      this.Data?.DelayUpdateCameraMove();
      if (this.Data?.IsInTheDungeon()) {
        this.Data.RecordKismetSetting();
      }
    };
    this.vB1 = o => {
      if (o === this.Data?.DiceItemId) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RedDotUpdateDangoMonopolyNum);
        this.RefreshActivityRedDot();
      }
    };
  }
  OnGetIsOpeningActivityRelativeView() {
    return false;
  }
  OnOpenView(o) {}
  OnGetActivityResource(o) {
    return "UiItem_ActivityMonopoly";
  }
  OnCreateSubPageComponent(o) {
    return new ActivitySubViewDangoMonopoly_1.ActivitySubViewDangoMonopoly();
  }
  OnCreateActivityData(o) {
    this.Data = new ActivityDangoMonopolyData_1.ActivityDangoMonopolyData();
    return this.Data;
  }
  OnRegisterNetEvent() {
    Net_1.Net.Register(18142, o => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("DangoMonopoly", 69, "$Uc", ["", o]);
      }
      this.Data?.ProtoTaskUpdateNotify(o.CJ_);
    });
    Net_1.Net.Register(26388, o => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("DangoMonopoly", 69, "TBc", ["", o]);
      }
      this.Data?.ProtoSceneGridInfoNotify(o);
    });
    Net_1.Net.Register(17025, o => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("DangoMonopoly", 69, "qa1", ["", o]);
      }
      this.Data?.ProtoTaskAddNotify(o.CJ_);
    });
    Net_1.Net.Register(19180, o => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("DangoMonopoly", 69, "Ga1", ["", o]);
      }
      this.Data?.ProtoTaskRemoveNotify(o.B6n);
    });
    Net_1.Net.Register(19598, o => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("DangoMonopoly", 69, "Yp1", ["", o]);
      }
      this.Data?.ProtoRewardNotify(o);
    });
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(18142);
    Net_1.Net.UnRegister(26388);
    Net_1.Net.UnRegister(17025);
    Net_1.Net.UnRegister(19180);
    Net_1.Net.UnRegister(19598);
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDone, this.Jn_);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnCommonItemCountAnyChange, this.vB1);
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDone, this.Jn_);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnCommonItemCountAnyChange, this.vB1);
  }
  static UU_() {
    return ActivityManager_1.ActivityManager.GetActivityController(Protocol_1.Aki.Protocol.uks.Proto_DangoMonopoly);
  }
  static GetData() {
    return this.UU_()?.Data;
  }
  RefreshActivityRedDot() {
    var o = this.Data?.Id;
    if (o) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, o);
    }
  }
  async RequestReceiveTaskReward(o) {
    var e = this.Data;
    var t = Protocol_1.Aki.Protocol.lPc.create();
    t.w6n = e?.Id ?? 0;
    t.B6n = o;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("DangoMonopoly", 69, "lPc", ["", t]);
    }
    var e = await Net_1.Net.CallAsync(26366, t);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("DangoMonopoly", 69, "_Pc", ["", e]);
    }
    ControllerHolder_1.ControllerHolder.ErrorCodeController.CheckErrorCode(e, 15633);
  }
  async RequestReceiveBoardReward(o) {
    var e = this.Data;
    var t = Protocol_1.Aki.Protocol.aPc.create();
    t.w6n = e?.Id ?? 0;
    t.pPc = o;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("DangoMonopoly", 69, "aPc", ["", t]);
    }
    var t = await Net_1.Net.CallAsync(16261, t);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("DangoMonopoly", 69, "hPc", ["", t]);
    }
    if (!ControllerHolder_1.ControllerHolder.ErrorCodeController.CheckErrorCode(t, 27151)) {
      e?.ProtoReceiveBoardRewardResponse(o);
      this.RefreshActivityRedDot();
    }
  }
  async RequestReceiveGridReward() {
    var o = this.Data;
    var e = Protocol_1.Aki.Protocol.nPc.create();
    e.w6n = o?.Id ?? 0;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("DangoMonopoly", 69, "nPc", ["", e]);
    }
    var e = await Net_1.Net.CallAsync(28731, e);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("DangoMonopoly", 69, "sPc", ["", e]);
    }
    if (!ControllerHolder_1.ControllerHolder.ErrorCodeController.CheckErrorCode(e, 23021)) {
      o?.ProtoReceiveGridRewardResponse();
    }
  }
  async RequestDice() {
    var o = this.Data;
    var e = Protocol_1.Aki.Protocol.rPc.create();
    e.w6n = o?.Id ?? 0;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("DangoMonopoly", 69, "rPc", ["", e]);
    }
    var e = await Net_1.Net.CallAsync(22127, e);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("DangoMonopoly", 69, "oPc", ["", e]);
    }
    if (ControllerHolder_1.ControllerHolder.ErrorCodeController.CheckErrorCode(e, 16997, false)) {
      o?.SetIsDangoMoveProcess(false);
    } else {
      o?.ProtoDiceResponse(e);
      this.RefreshActivityRedDot();
    }
  }
  async RequestEnterNextBoard() {
    var o = this.Data;
    var e = Protocol_1.Aki.Protocol.bBc.create();
    e.w6n = o?.Id ?? 0;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("DangoMonopoly", 69, "bBc", ["", e]);
    }
    var e = await Net_1.Net.CallAsync(16120, e);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("DangoMonopoly", 69, "LBc", ["", e]);
    }
    if (!ControllerHolder_1.ControllerHolder.ErrorCodeController.CheckErrorCode(e, 22079)) {
      o?.ProtoEnterNextBoardResponse(e);
      this.RefreshActivityRedDot();
    }
  }
}
exports.ActivityDangoMonopolyController = ActivityDangoMonopolyController;
//# sourceMappingURL=ActivityDangoMonopolyController.js.map