"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaHandAreaItem = undefined;
const CustomPromise_1 = require("../../../../../../Core/Common/CustomPromise");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const UiSequencePlayer_1 = require("../../../../../Ui/Base/UiSequencePlayer");
class PhantomArenaHandAreaItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Sequence = undefined;
  }
  OnStart() {
    this.Sequence = new UiSequencePlayer_1.UiSequencePlayer(this.RootItem);
  }
  OnBeforeDestroy() {
    this.Sequence.Clear();
  }
  async PlayMoveOutSequence() {
    var e = new CustomPromise_1.CustomPromise();
    await this.Sequence.PlaySequenceAsync("MoveOut", e);
    await this.DestroyAsync();
  }
  async PlayMoveInSequence() {
    var e = new CustomPromise_1.CustomPromise();
    await this.Sequence.PlaySequenceAsync("MoveIn", e);
  }
}
exports.PhantomArenaHandAreaItem = PhantomArenaHandAreaItem;
//# sourceMappingURL=PhantomArenaHandAreaItem.js.map