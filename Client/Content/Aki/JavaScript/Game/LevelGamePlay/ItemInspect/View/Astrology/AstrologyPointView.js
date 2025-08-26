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
    this.ood = undefined;
    this.fWu = undefined;
    this.rod = undefined;
    this.gWu = 0;
    this.dce = false;
    this.Nno = i => {
      if (i === "Close") {
        this.SetActive(false);
      } else if (i === "Start2") {
        this.fWu?.(this.gWu);
      }
    };
    this.CWu = () => {
      if (this.rod && this.rod()) {
        this.ood?.();
        this.$pt.PlaySequencePurely("Start2");
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIItem], [2, UE.UIItem]];
    this.BtnBindInfo = [[0, this.CWu]];
  }
  OnStart() {
    this.$pt = new UiSequencePlayer_1.UiSequencePlayer(this.RootItem);
    this.$pt.BindOnEndSequenceEvent(this.Nno);
  }
  OnBeforeDestroy() {
    this.ood = undefined;
    this.fWu = undefined;
    this.gWu = 0;
    this.$pt?.Clear();
    this.$pt = undefined;
  }
  Init(i, t, s) {
    this.ood = i;
    this.fWu = t;
    this.rod = s;
  }
  BindPoint(i, t) {
    this.gWu = i;
    this.GetItem(1).SetUIActive(!t);
    this.GetItem(2).SetUIActive(t);
  }
  SetPointActive(i) {
    if (i !== this.dce) {
      this.dce = i;
      this.$pt.StopPrevSequence(false, true);
      if (i) {
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