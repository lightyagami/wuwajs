"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.CardCommonComponent = void 0;
const UiSequencePlayer_1 = require("../../../../../Ui/Base/UiSequencePlayer"),
  CardComponentBase_1 = require("../CardComponentBase");
class CardCommonComponent extends CardComponentBase_1.CardComponentBase {
  constructor() {
    super(...arguments), this.Sequence = void 0, this.Nno = e => {
      "Close" === e && this.SetActive(!1)
    }
  }
  OnStart() {
    this.Sequence = new UiSequencePlayer_1.UiSequencePlayer(this.RootItem), this.Sequence.BindOnEndSequenceEvent(this.Nno)
  }
  OnDestroy() {
    this.Sequence.Clear()
  }
  SetComponentActive(e) {
    this.Sequence.StopPrevSequence(!1, !0), e ? (this.SetActive(!0), this.Sequence.PlaySequencePurely("Start")) : this.Sequence.PlaySequencePurely("Close")
  }
  Refresh(e) {}
}
exports.CardCommonComponent = CardCommonComponent;
//# sourceMappingURL=CardCommonComponent.js.map