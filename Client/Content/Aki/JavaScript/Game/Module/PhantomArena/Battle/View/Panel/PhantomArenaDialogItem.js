"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaDialogItem = void 0;
const UE = require("ue"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase"),
  UiSequencePlayer_1 = require("../../../../../Ui/Base/UiSequencePlayer");
class PhantomArenaDialogItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), this.Sequence = void 0, this.Nno = e => {
      "Close" === e && this.SetActive(!1)
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText]
    ]
  }
  OnStart() {
    this.Sequence = new UiSequencePlayer_1.UiSequencePlayer(this.RootItem), this.Sequence.BindOnEndSequenceEvent(this.Nno)
  }
  OnDestroy() {
    this.Sequence.Clear()
  }
  GetDialog() {
    return this.GetText(0)
  }
  SetDialogActive(e) {
    e ? (this.SetActive(!0), this.Sequence.StopPrevSequence(!1, !0), this.Sequence.PlaySequencePurely("Start")) : (this.Sequence.StopPrevSequence(!1, !0), this.Sequence.PlaySequencePurely("Close"))
  }
}
exports.PhantomArenaDialogItem = PhantomArenaDialogItem;
//# sourceMappingURL=PhantomArenaDialogItem.js.map