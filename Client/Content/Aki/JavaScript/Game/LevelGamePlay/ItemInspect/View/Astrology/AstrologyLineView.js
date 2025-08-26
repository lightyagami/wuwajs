"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AstrologyLineView = undefined;
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const UiSequencePlayer_1 = require("../../../../Ui/Base/UiSequencePlayer");
class AstrologyLineView extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.$pt = undefined;
    this.dce = false;
    this.Nno = e => {
      if (e === "Close") {
        this.SetActive(false);
      }
    };
  }
  OnStart() {
    this.$pt = new UiSequencePlayer_1.UiSequencePlayer(this.RootItem);
    this.$pt.BindOnEndSequenceEvent(this.Nno);
  }
  OnBeforeDestroy() {
    this.$pt?.Clear();
    this.$pt = undefined;
  }
  SetLineActive(e) {
    if (e !== this.dce) {
      this.dce = e;
      this.$pt.StopPrevSequence(false, true);
      if (e) {
        this.SetActive(true);
        this.$pt.PlaySequencePurely("Start");
      } else {
        this.$pt.PlaySequencePurely("Close");
      }
    }
  }
}
exports.AstrologyLineView = AstrologyLineView;
//# sourceMappingURL=AstrologyLineView.js.map