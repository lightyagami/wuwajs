"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CardCommonComponent = undefined;
const UiSequencePlayer_1 = require("../../../../../Ui/Base/UiSequencePlayer");
const CardComponentBase_1 = require("../CardComponentBase");
class CardCommonComponent extends CardComponentBase_1.CardComponentBase {
  constructor() {
    super(...arguments);
    this.Sequence = undefined;
    this.Nno = e => {
      if (e === "Close") {
        this.SetActive(false);
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
  SetComponentActive(e) {
    this.Sequence.StopPrevSequence(false, true);
    if (e) {
      this.SetActive(true);
      this.Sequence.PlaySequencePurely("Start");
    } else {
      this.Sequence.PlaySequencePurely("Close");
    }
  }
  Refresh(e) {}
}
exports.CardCommonComponent = CardCommonComponent;
//# sourceMappingURL=CardCommonComponent.js.map