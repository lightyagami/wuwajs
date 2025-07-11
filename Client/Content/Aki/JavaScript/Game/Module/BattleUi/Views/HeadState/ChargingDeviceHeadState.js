"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChargingDeviceHeadState = undefined;
const UE = require("ue");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const HeadStateViewBase_1 = require("./HeadStateViewBase");
class ChargingDeviceHeadState extends HeadStateViewBase_1.HeadStateViewBase {
  constructor() {
    super(...arguments);
    this.Wlt = 0;
    this.SPe = undefined;
    this.uOa = false;
    this.OnProgressControlDataChange = e => {
      if (e.ProgressCtrlType === "ChargingDevice") {
        this.x_t(e.CurrentValue / e.MaxValue);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UITexture], [2, UE.UITexture]];
  }
  OnStart() {
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.SPe?.PlayLevelSequenceByName("Start");
  }
  GetResourceId() {
    return "UiItem_HpClean";
  }
  ActiveBattleHeadState(e) {
    super.ActiveBattleHeadState(e);
    var t = this.GetTexture(1);
    var i = this.GetText(0);
    var s = t.GetStretchLeft();
    var a = t.GetParentAsUIItem().GetWidth();
    this.Wlt = a - s * 2;
    t.SetUIActive(true);
    i.SetUIActive(true);
    var a = e.GetProgressControlData();
    if (a.ProgressCtrlType === "ChargingDevice") {
      this.x_t(a.CurrentValue / a.MaxValue);
    }
  }
  BindCallback() {
    super.BindCallback();
    this.HeadStateData.BindOnProgressControlDataChange(this.OnProgressControlDataChange);
  }
  x_t(e) {
    this.GetTexture(1).SetFillAmount(e);
    var t = MathUtils_1.MathUtils.Clamp(e, 0, 1) * this.Wlt - this.Wlt / 2;
    this.GetTexture(2).SetUIRelativeLocation(new UE.Vector(t, 0, 0));
    var t = Math.round(MathUtils_1.MathUtils.RangeClamp(e, 0, 1, 0, 100));
    this.GetText(0).SetText(t + "%");
    if (e >= 1 && !this.uOa) {
      this.SPe?.PlayLevelSequenceByName("Full");
      this.uOa = true;
    }
  }
}
exports.ChargingDeviceHeadState = ChargingDeviceHeadState;
//# sourceMappingURL=ChargingDeviceHeadState.js.map