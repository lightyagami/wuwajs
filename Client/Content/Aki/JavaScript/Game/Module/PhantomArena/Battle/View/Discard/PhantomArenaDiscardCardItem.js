"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaDiscardCardItem = undefined;
const ScrollingTipsController_1 = require("../../../../ScrollingTips/ScrollingTipsController");
const GridProxyAbstract_1 = require("../../../../Util/Grid/GridProxyAbstract");
const PhantomArenaCard_1 = require("../../Card/PhantomArenaCard");
class PhantomArenaDiscardCardItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Card = undefined;
    this.ClickCallback = undefined;
  }
  async OnBeforeStartAsync() {
    this.Card = new PhantomArenaCard_1.PhantomArenaCard();
    this.Card.SetCardProxy(this);
    await this.Card.CreateThenShowByActorAsync(this.GetRootActor());
  }
  Refresh(r, t, e) {
    this.SetSelectState(false);
    this.Card.Refresh(r);
    r = r.UseCost === 0 ? 2 : 0;
    this.Card.SetToggleState(r, false);
  }
  PointerClickCard(r, t) {
    if (this.Card.Data.UseCost === 0) {
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("PhantomBattle_1072");
    } else if (t === 1) {
      this.ClickCallback?.(r, true);
    } else {
      this.ClickCallback?.(r, false);
    }
  }
  SetSelectState(r) {
    this.Card.SetSelectedState(r);
  }
  PointerEnterCard(r) {}
  PointerDownCard(r) {}
  GetKey(r, t) {
    return r.CardId;
  }
}
exports.PhantomArenaDiscardCardItem = PhantomArenaDiscardCardItem;
//# sourceMappingURL=PhantomArenaDiscardCardItem.js.map