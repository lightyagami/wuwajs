"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaFieldEffectItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const UiSequencePlayer_1 = require("../../../../../Ui/Base/UiSequencePlayer");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
class PhantomArenaFieldEffectItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Sequence = undefined;
    this.Nno = e => {
      if (e === "Start") {
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
  SetName(e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e);
  }
  PlayStart() {
    this.SetActive(true);
    this.Sequence.PlaySequencePurely("Start");
  }
}
exports.PhantomArenaFieldEffectItem = PhantomArenaFieldEffectItem;
//# sourceMappingURL=PhantomArenaFieldEffectItem.js.map