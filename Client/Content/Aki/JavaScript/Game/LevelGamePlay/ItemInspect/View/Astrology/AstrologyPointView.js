"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AstrologyPointView = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const UiSequencePlayer_1 = require("../../../../Ui/Base/UiSequencePlayer");
class AstrologyPointView extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.$pt = undefined;
    this.Mod = undefined;
    this.xzu = undefined;
    this.Sod = undefined;
    this.Dzu = 0;
    this.dce = false;
    this.yWd = false;
    this.Nno = t => {
      if (t === "Close") {
        this.SetActive(false);
      } else if (t === "Start2") {
        this.Prr();
      }
    };
    this.Uzu = () => {
      if (this.Sod && this.Sod()) {
        this.Mod?.();
        this.yWd = true;
        this.$pt.PlaySequencePurely("Start2");
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIItem], [2, UE.UIItem]];
    this.BtnBindInfo = [[0, this.Uzu]];
  }
  OnStart() {
    this.$pt = new UiSequencePlayer_1.UiSequencePlayer(this.RootItem);
    this.$pt.BindOnEndSequenceEvent(this.Nno);
  }
  OnBeforeHide() {
    this.Prr();
  }
  OnBeforeDestroy() {
    this.Mod = undefined;
    this.xzu = undefined;
    this.Dzu = 0;
    this.$pt?.Clear();
    this.$pt = undefined;
  }
  Prr() {
    if (this.yWd) {
      this.yWd = false;
      this.xzu?.(this.Dzu);
    }
  }
  Init(t, i, s) {
    this.Mod = t;
    this.xzu = i;
    this.Sod = s;
  }
  BindPoint(t, i) {
    this.Dzu = t;
    this.GetItem(1).SetUIActive(!i);
    this.GetItem(2).SetUIActive(i);
  }
  SetPointActive(t) {
    if (t !== this.dce) {
      this.dce = t;
      this.$pt.StopPrevSequence(false, true);
      if (t) {
        this.SetActive(true);
        this.$pt.PlaySequencePurely("Start");
        this.$pt.PlaySequencePurely("Loop");
      } else {
        this.$pt.PlaySequencePurely("Close");
      }
    }
  }
}
exports.AstrologyPointView = AstrologyPointView;
//# sourceMappingURL=AstrologyPointView.js.map