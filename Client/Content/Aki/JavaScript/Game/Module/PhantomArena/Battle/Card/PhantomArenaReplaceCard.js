"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaReplaceCard = undefined;
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const PhantomArenaCard_1 = require("./PhantomArenaCard");
class PhantomArenaReplaceCard extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Card = undefined;
    this.ClickCallback = undefined;
  }
  async OnBeforeStartAsync() {
    this.Card = new PhantomArenaCard_1.PhantomArenaCard();
    this.Card.AddComponentsRegisterInfoByResourceId([3, "PnlStateChange"]);
    this.Card.SetCardProxy(this);
    await this.Card.CreateThenShowByActorAsync(this.GetRootActor());
  }
  Refresh(t, e, r) {
    this.Card.Refresh(t);
  }
  Oi1() {
    this.Card.GetComponent(3)?.SetActive(true);
  }
  qi1() {
    this.Card.GetComponent(3)?.SetActive(false);
  }
  PointerClickCard(t, e) {
    if (e === 1) {
      this.Oi1();
      this.ClickCallback?.(t, true);
    } else {
      this.qi1();
      this.ClickCallback?.(t, false);
    }
  }
  SetSelectState(t) {
    this.Card.SetSelectedState(t);
  }
  PointerEnterCard(t) {}
  PointerDownCard(t) {}
  GetKey(t, e) {
    return t.CardId;
  }
}
exports.PhantomArenaReplaceCard = PhantomArenaReplaceCard;
//# sourceMappingURL=PhantomArenaReplaceCard.js.map