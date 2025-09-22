"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShipTowerCountDownView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
class ShipTowerCountDownView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.OpenParam = undefined;
    this.t9_ = undefined;
    this.pZc = [];
    this.vZc = false;
    this.aq_ = (e, t) => {
      var i = Math.floor(e % TimeUtil_1.TimeUtil.Hour / TimeUtil_1.TimeUtil.Minute);
      var s = Math.floor(e % TimeUtil_1.TimeUtil.Minute);
      var e = Math.floor((e - Math.floor(e)) * 100);
      var i = this.hq_(i);
      var s = this.hq_(s);
      var e = this.hq_(e);
      this.GetText(0)?.SetText(`${i}:${s}:${e}`);
    };
    this.lq_ = e => {
      this.pZc.push(e);
      this.yZc();
    };
    this._q_ = () => {
      this.GetItem(1)?.SetUIActive(false);
      this.vZc = false;
      this.yZc();
    };
    this.r9_ = () => {
      this.o9_();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIItem], [2, UE.UIText]];
  }
  Es_() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Temp", 69, "", ["DataParam", this.OpenParam]);
    }
  }
  async OnBeforeStartAsync() {
    this.Es_();
    await super.OnBeforeStartAsync();
  }
  OnStart() {
    this._q_();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnGamePlayCdChanged, this.aq_);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ShipTowerBattleTip, this.lq_);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnGamePlayCdChanged, this.aq_);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ShipTowerBattleTip, this.lq_);
  }
  OnBeforeDestroy() {
    this.i9_();
  }
  hq_(e) {
    return (e < 10 ? "0" : "") + e;
  }
  yZc() {
    var e;
    if (!this.vZc && this.pZc.length !== 0) {
      e = this.pZc.shift();
      this.vZc = true;
      this.GetItem(1)?.SetUIActive(true);
      this.GetText(2)?.ShowTextNew(e);
      this.i9_();
      this.t9_ = TimerSystem_1.TimerSystem.Delay(this.r9_, 3000);
      this.PlaySequence("WaveIn");
    }
  }
  async o9_() {
    await this.PlaySequenceAsync("WaveOut");
    this._q_();
  }
  i9_() {
    if (this.t9_ !== undefined) {
      TimerSystem_1.TimerSystem.Remove(this.t9_);
      this.t9_ = undefined;
    }
  }
}
exports.ShipTowerCountDownView = ShipTowerCountDownView;
//# sourceMappingURL=ShipTowerCountDownView.js.map