"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AstrologyDotView = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const UiSequencePlayer_1 = require("../../../../Ui/Base/UiSequencePlayer");
class AstrologyDotView extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.$pt = undefined;
    this.dce = false;
    this.Dzu = undefined;
    this.Nno = e => {
      if (e === "Close") {
        this.SetActive(false);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem]];
  }
  OnStart() {
    this.$pt = new UiSequencePlayer_1.UiSequencePlayer(this.RootItem);
    this.$pt.BindOnEndSequenceEvent(this.Nno);
  }
  OnBeforeDestroy() {
    this.$pt?.Clear();
    this.$pt = undefined;
  }
  SetDotActive(e, t = undefined) {
    if (e !== this.dce) {
      this.dce = e;
      this.Dzu = t;
      this.$pt.StopPrevSequence(false, true);
      if (e) {
        this.SetActive(true);
        this.$pt.PlaySequencePurely("Start");
        this.$pt.PlaySequencePurely("Loop");
      } else {
        this.$pt.PlaySequencePurely("Close");
      }
    }
  }
  SetChecked(e) {
    this.GetItem(0).SetUIActive(!e);
    this.GetItem(1).SetUIActive(e);
  }
  GetPointTagId() {
    return this.Dzu;
  }
}
exports.AstrologyDotView = AstrologyDotView;
//# sourceMappingURL=AstrologyDotView.js.map