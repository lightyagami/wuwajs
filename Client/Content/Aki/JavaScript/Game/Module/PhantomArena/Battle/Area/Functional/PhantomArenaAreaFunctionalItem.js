"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaAreaFunctionalItem = void 0;
const UE = require("ue"),
  UiSequencePlayer_1 = require("../../../../../Ui/Base/UiSequencePlayer"),
  PhantomArenaCardComponentLogic_1 = require("../../Card/PhantomArenaCardComponentLogic"),
  PhantomArenaCardShowComponent_1 = require("../../Card/PhantomArenaCardShowComponent"),
  PhantomArenaAreaItemBase_1 = require("./PhantomArenaAreaItemBase");
class PhantomArenaAreaFunctionalItem extends PhantomArenaAreaItemBase_1.PhantomArenaAreaItemBase {
  constructor() {
    super(...arguments), this.HRr = void 0, this.Sequence = void 0, this.xQ1 = e => {
      "Close" === e && this.GetSprite(0).SetUIActive(!1)
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UIItem],
      [2, UE.UIItem]
    ]
  }
  OnStartImplement() {
    this.Sequence = new UiSequencePlayer_1.UiSequencePlayer(this.RootItem), this.Sequence.BindOnEndSequenceEvent(this.xQ1)
  }
  OnBeforeDestroy() {
    this.Sequence.Clear()
  }
  Refresh(e) {}
  SetHoverStateActive(e) {}
  SetCanUseStateActive(e) {
    this.Sequence.StopPrevSequence(!1, !0), e ? (this.GetSprite(0).SetUIActive(!0), this.Sequence.PlaySequence("Start")) : this.Sequence.PlaySequence("Close")
  }
  async SetIncreaseActive(e) {
    var t;
    this.HRr || (this.HRr = new PhantomArenaCardComponentLogic_1.PhantomArenaCardComponentLogic, this.HRr.IsNeedAutoHide = !1, await (t = new PhantomArenaCardShowComponent_1.PhantomArenaCardShowComponent).CreateByResourceIdAsync("PnlStateIncrease", this.GetItem(2)), this.HRr.SetCardShowComponent(t)), this.HRr.SetActive(e)
  }
  GetCardRootItem() {
    return this.GetItem(1)
  }
}
exports.PhantomArenaAreaFunctionalItem = PhantomArenaAreaFunctionalItem;
//# sourceMappingURL=PhantomArenaAreaFunctionalItem.js.map