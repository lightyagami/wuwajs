"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaCardShowComponent = undefined;
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const UiSequencePlayer_1 = require("../../../../Ui/Base/UiSequencePlayer");
class PhantomArenaCardShowComponent extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Sequence = undefined;
    this.SkipDisActive = false;
    this.Nno = t => {
      if (t !== "Start" || this.SkipDisActive) {
        if (t === "Close") {
          this.SetActive(false);
        }
      } else {
        this.PlayClose();
      }
    };
  }
  OnStart() {
    this.Sequence = new UiSequencePlayer_1.UiSequencePlayer(this.RootItem);
    this.Sequence.BindOnEndSequenceEvent(this.Nno);
  }
  OnDestroy() {
    this.Sequence.Clear();
  }
  PlayStart() {
    this.SkipDisActive = false;
    this.SetActive(true);
    this.Sequence.StopPrevSequence(false, true);
    this.Sequence.PlaySequencePurely("Start");
  }
  PlayClose() {
    this.Sequence.StopPrevSequence(false, true);
    this.Sequence.PlaySequencePurely("Close");
  }
  PlayLoop() {
    this.SkipDisActive = true;
    this.SetActive(true);
    this.Sequence.StopPrevSequence(false, true);
    this.Sequence.PlaySequencePurely("Start");
    this.Sequence.PlaySequencePurely("Loop");
  }
}
exports.PhantomArenaCardShowComponent = PhantomArenaCardShowComponent;
//# sourceMappingURL=PhantomArenaCardShowComponent.js.map