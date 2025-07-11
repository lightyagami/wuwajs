"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaDialogItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const UiSequencePlayer_1 = require("../../../../../Ui/Base/UiSequencePlayer");
class PhantomArenaDialogItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Sequence = undefined;
    this.Nno = e => {
      if (e === "Close") {
        this.SetActive(false);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  OnStart() {
    this.Sequence = new UiSequencePlayer_1.UiSequencePlayer(this.RootItem);
    this.Sequence.BindOnEndSequenceEvent(this.Nno);
  }
  OnDestroy() {
    this.Sequence.Clear();
  }
  GetDialog() {
    return this.GetText(0);
  }
  SetDialogActive(e) {
    if (e) {
      this.SetActive(true);
      this.Sequence.StopPrevSequence(false, true);
      this.Sequence.PlaySequencePurely("Start");
    } else {
      this.Sequence.StopPrevSequence(false, true);
      this.Sequence.PlaySequencePurely("Close");
    }
  }
}
exports.PhantomArenaDialogItem = PhantomArenaDialogItem;
//# sourceMappingURL=PhantomArenaDialogItem.js.map