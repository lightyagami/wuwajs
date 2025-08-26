"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseCountDownTips = undefined;
const UE = require("ue");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const UiSequencePlayer_1 = require("../../../Ui/Base/UiSequencePlayer");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
class TrapDefenseCountDownTips extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.Data = undefined;
    this.nZ1 = 0;
    this.RYu = 0;
    this.vDe = true;
    this.L0e = undefined;
    this.Cxo = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIArtText], [1, UE.UINiagara]];
  }
  OnStart() {
    this.Cxo = new UiSequencePlayer_1.UiSequencePlayer(this.RootItem);
    this.Data = this.OpenParam;
    this.nZ1 = this.Data.CountDownTime * TimeUtil_1.TimeUtil.InverseMillisecond;
    this.RYu = this.Data.CountDownTime;
    this.L0e = this.GetUiNiagara(1);
    this.w6e(this.RYu);
  }
  OnBeforeDestroy() {
    this.Cxo.Clear();
    var i = this.Data?.Callback;
    if (i) {
      i();
    }
  }
  OnTick(i) {
    if (this.vDe) {
      this.nZ1 -= i;
      if (this.nZ1 <= 0) {
        this.vDe = false;
        this.CloseMe();
      } else if (this.RYu - this.nZ1 / TimeUtil_1.TimeUtil.InverseMillisecond >= 1) {
        --this.RYu;
        this.w6e(this.RYu);
      }
    }
  }
  w6e(i) {
    this.L0e.SetNiagaraVarInt("Number_Start Frame", i - 1);
    this.L0e.SetNiagaraVarInt("Number_End Frame", i);
    this.GetArtText(0)?.SetText(i.toString());
    this.Cxo.PlaySequencePurely("Change");
  }
}
exports.TrapDefenseCountDownTips = TrapDefenseCountDownTips;
//# sourceMappingURL=TrapDefenseCountDownTips.js.map