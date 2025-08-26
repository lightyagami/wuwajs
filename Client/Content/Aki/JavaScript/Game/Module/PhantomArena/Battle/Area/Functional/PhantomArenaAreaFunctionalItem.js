"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaAreaFunctionalItem = undefined;
const UE = require("ue");
const UiSequencePlayer_1 = require("../../../../../Ui/Base/UiSequencePlayer");
const PhantomArenaCardComponentLogic_1 = require("../../Card/PhantomArenaCardComponentLogic");
const PhantomArenaCardShowComponent_1 = require("../../Card/PhantomArenaCardShowComponent");
const PhantomArenaAreaItemBase_1 = require("./PhantomArenaAreaItemBase");
class PhantomArenaAreaFunctionalItem extends PhantomArenaAreaItemBase_1.PhantomArenaAreaItemBase {
  constructor() {
    super(...arguments);
    this.HRr = undefined;
    this.Sequence = undefined;
    this.vK1 = e => {
      if (e === "Close") {
        this.GetSprite(0).SetUIActive(false);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIItem], [2, UE.UIItem]];
  }
  OnStartImplement() {
    this.Sequence = new UiSequencePlayer_1.UiSequencePlayer(this.RootItem);
    this.Sequence.BindOnEndSequenceEvent(this.vK1);
  }
  OnBeforeDestroy() {
    this.Sequence.Clear();
  }
  Refresh(e) {}
  SetHoverStateActive(e) {}
  SetCanUseStateActive(e) {
    this.Sequence.StopPrevSequence(false, true);
    if (e) {
      this.GetSprite(0).SetUIActive(true);
      this.Sequence.PlaySequence("Start");
    } else {
      this.Sequence.PlaySequence("Close");
    }
  }
  async SetIncreaseActive(e) {
    var t;
    if (!this.HRr) {
      this.HRr = new PhantomArenaCardComponentLogic_1.PhantomArenaCardComponentLogic();
      this.HRr.IsNeedAutoHide = false;
      await (t = new PhantomArenaCardShowComponent_1.PhantomArenaCardShowComponent()).CreateByResourceIdAsync("PnlStateIncrease", this.GetItem(2));
      this.HRr.SetCardShowComponent(t);
    }
    this.HRr.SetActive(e);
  }
  GetCardRootItem() {
    return this.GetItem(1);
  }
}
exports.PhantomArenaAreaFunctionalItem = PhantomArenaAreaFunctionalItem;
//# sourceMappingURL=PhantomArenaAreaFunctionalItem.js.map