"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SignalDeviceModel = exports.ROWNUM = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const Net_1 = require("../../../Core/Net/Net");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const Rotator_1 = require("../../../Core/Utils/Math/Rotator");
const IAction_1 = require("../../../UniverseEditor/Interface/IAction");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../Common/TimeUtil");
const SignalDeviceController_1 = require("./SignalDeviceController");
exports.ROWNUM = 5;
class SignalDeviceModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.GridNum = exports.ROWNUM * exports.ROWNUM;
    this.uPe = [];
    this.cPe = [];
    this.CurrentColor = IAction_1.EPieceColorType.White;
    this.CacheRotator = Rotator_1.Rotator.Create(0, 0, 0);
    this.ViewType = 0;
    this.RotateMap = new Map([[0, 0], [4, -90], [3, 90], [1, 180], [2, 0]]);
  }
  InitData(e) {
    this.uPe = new Array(this.GridNum);
    for (let t = 0; t < this.GridNum; t++) {
      this.uPe[t] = {
        IsFinished: false,
        Color: e[t].Color
      };
    }
    this.mPe();
  }
  ResetData() {
    for (const t of this.uPe) {
      t.IsFinished = false;
    }
    this.mPe();
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSignalDeviceReset);
  }
  IsGridFinished(t) {
    return this.uPe[t]?.IsFinished;
  }
  GetGridColor(t) {
    return this.uPe[t]?.Color;
  }
  LinkingStart(t, e) {
    this.CurrentColor = e;
    this.cPe = [t];
  }
  Linking(t) {
    var e = this.cPe[this.cPe.length - 1];
    if (!this.cPe.includes(t) && this.NeighboringType(e, t) !== 0 && this.dPe(t)) {
      this.cPe.push(t);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSignalDeviceLinking, true, e, this.uPe[e].Color === this.CurrentColor, t, this.uPe[t].Color === this.CurrentColor);
      if (this.uPe[t].Color === this.CurrentColor) {
        this.CheckLinking(t);
      }
    } else if (this.cPe.length > 1 && this.cPe.indexOf(t) === this.cPe.length - 2) {
      this.cPe.pop();
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSignalDeviceLinking, false, e, this.uPe[e].Color === this.CurrentColor, t, this.uPe[t].Color === this.CurrentColor);
    } else if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Temp", 35, "Linking Fail", ["index", t]);
    }
  }
  NeighboringType(t, e) {
    var i = t - e;
    if (i == -1 && e % exports.ROWNUM == 0 || i == 1 && t % exports.ROWNUM == 0) {
      return 0;
    }
    switch (i) {
      case 1:
        return 1;
      case -1:
        return 2;
      case exports.ROWNUM:
        return 3;
      case -exports.ROWNUM:
        return 4;
      default:
        return 0;
    }
  }
  dPe(t) {
    return this.uPe[t].Color === IAction_1.EPieceColorType.White && !this.uPe[t].IsFinished || this.uPe[t].Color === this.CurrentColor;
  }
  CheckLinking(t) {
    var e;
    if (this.cPe.length !== 0) {
      e = this.cPe[this.cPe.length - 1];
      if (this.GetGridColor(e) !== this.CurrentColor || this.cPe.length === 1) {
        this.CancelCurrentLinking();
      } else {
        this.MarkCurrentLinking();
      }
    }
  }
  MarkCurrentLinking() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSignalDeviceLinkingCheck, true, Array.from(this.cPe));
    for (const t of this.cPe) {
      this.uPe[t].IsFinished = true;
    }
    this.mPe();
    if (this.CPe()) {
      this.EDe();
    }
  }
  CancelCurrentLinking() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSignalDeviceLinkingCheck, false, Array.from(this.cPe));
    this.mPe();
  }
  CPe() {
    for (const t of this.uPe) {
      if (t.Color !== IAction_1.EPieceColorType.White && !t.IsFinished) {
        return false;
      }
    }
    return true;
  }
  EDe() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSignalDeviceFinish);
    TimerSystem_1.TimerSystem.Delay(() => {
      var t = Protocol_1.Aki.Protocol.wJn.create();
      t.a5n = "0";
      t.h5n = Protocol_1.Aki.Protocol.h3s.Proto_SignalDevice;
      Net_1.Net.Call(25221, t, t => {
        if (t.BEs === Protocol_1.Aki.Protocol.Q4n.KRs) {
          this.gPe();
          SignalDeviceController_1.SignalDeviceController.CallFinishCallback();
        }
      });
    }, TimeUtil_1.TimeUtil.InverseMillisecond * 1.7);
  }
  gPe() {
    this.uPe.length = 0;
    this.mPe();
  }
  mPe() {
    this.cPe.length = 0;
    this.CurrentColor = IAction_1.EPieceColorType.White;
  }
}
exports.SignalDeviceModel = SignalDeviceModel;
//# sourceMappingURL=SignalDeviceModel.js.map