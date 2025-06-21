"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaCardShowComponent = void 0;
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  UiSequencePlayer_1 = require("../../../../Ui/Base/UiSequencePlayer");
class PhantomArenaCardShowComponent extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), this.Sequence = void 0, this.SkipDisActive = !1, this.Nno = t => {
      "Start" !== t || this.SkipDisActive ? "Close" === t && this.SetActive(!1) : this.PlayClose()
    }
  }
  OnStart() {
    this.Sequence = new UiSequencePlayer_1.UiSequencePlayer(this.RootItem), this.Sequence.BindOnEndSequenceEvent(this.Nno)
  }
  OnDestroy() {
    this.Sequence.Clear()
  }
  PlayStart() {
    this.SkipDisActive = !1, this.SetActive(!0), this.Sequence.StopPrevSequence(!1, !0), this.Sequence.PlaySequencePurely("Start")
  }
  PlayClose() {
    this.Sequence.StopPrevSequence(!1, !0), this.Sequence.PlaySequencePurely("Close")
  }
  PlayLoop() {
    this.SkipDisActive = !0, this.SetActive(!0), this.Sequence.StopPrevSequence(!1, !0), this.Sequence.PlaySequencePurely("Start"), this.Sequence.PlaySequencePurely("Loop")
  }
}
exports.PhantomArenaCardShowComponent = PhantomArenaCardShowComponent;
//# sourceMappingURL=PhantomArenaCardShowComponent.js.map