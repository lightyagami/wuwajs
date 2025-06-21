"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaHandAreaItem = void 0;
const CustomPromise_1 = require("../../../../../../Core/Common/CustomPromise"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase"),
  UiSequencePlayer_1 = require("../../../../../Ui/Base/UiSequencePlayer");
class PhantomArenaHandAreaItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), this.Sequence = void 0
  }
  OnStart() {
    this.Sequence = new UiSequencePlayer_1.UiSequencePlayer(this.RootItem)
  }
  OnBeforeDestroy() {
    this.Sequence.Clear()
  }
  async PlayMoveOutSequence() {
    var e = new CustomPromise_1.CustomPromise;
    await this.Sequence.PlaySequenceAsync("MoveOut", e), await this.DestroyAsync()
  }
  async PlayMoveInSequence() {
    var e = new CustomPromise_1.CustomPromise;
    await this.Sequence.PlaySequenceAsync("MoveIn", e)
  }
}
exports.PhantomArenaHandAreaItem = PhantomArenaHandAreaItem;
//# sourceMappingURL=PhantomArenaHandAreaItem.js.map