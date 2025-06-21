"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaDiscardCardItem = void 0;
const ScrollingTipsController_1 = require("../../../../ScrollingTips/ScrollingTipsController"),
  GridProxyAbstract_1 = require("../../../../Util/Grid/GridProxyAbstract"),
  PhantomArenaCard_1 = require("../../Card/PhantomArenaCard");
class PhantomArenaDiscardCardItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments), this.Card = void 0, this.ClickCallback = void 0
  }
  async OnBeforeStartAsync() {
    this.Card = new PhantomArenaCard_1.PhantomArenaCard, this.Card.SetCardProxy(this), await this.Card.CreateThenShowByActorAsync(this.GetRootActor())
  }
  Refresh(r, t, e) {
    this.SetSelectState(!1), this.Card.Refresh(r);
    r = 0 === r.UseCost ? 2 : 0;
    this.Card.SetToggleState(r, !1)
  }
  PointerClickCard(r, t) {
    0 === this.Card.Data.UseCost ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("PhantomBattle_1072") : 1 === t ? this.ClickCallback?.(r, !0) : this.ClickCallback?.(r, !1)
  }
  SetSelectState(r) {
    this.Card.SetSelectedState(r)
  }
  PointerEnterCard(r) {}
  PointerDownCard(r) {}
  GetKey(r, t) {
    return r.CardId
  }
}
exports.PhantomArenaDiscardCardItem = PhantomArenaDiscardCardItem;
//# sourceMappingURL=PhantomArenaDiscardCardItem.js.map