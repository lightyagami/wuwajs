"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaReplaceCard = void 0;
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
  PhantomArenaCard_1 = require("./PhantomArenaCard");
class PhantomArenaReplaceCard extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments), this.Card = void 0, this.ClickCallback = void 0
  }
  async OnBeforeStartAsync() {
    this.Card = new PhantomArenaCard_1.PhantomArenaCard, this.Card.AddComponentsRegisterInfoByResourceId([3, "PnlStateChange"]), this.Card.SetCardProxy(this), await this.Card.CreateThenShowByActorAsync(this.GetRootActor())
  }
  Refresh(t, e, r) {
    this.Card.Refresh(t)
  }
  Ci1() {
    this.Card.GetComponent(3)?.SetActive(!0)
  }
  pi1() {
    this.Card.GetComponent(3)?.SetActive(!1)
  }
  PointerClickCard(t, e) {
    1 === e ? (this.Ci1(), this.ClickCallback?.(t, !0)) : (this.pi1(), this.ClickCallback?.(t, !1))
  }
  SetSelectState(t) {
    this.Card.SetSelectedState(t)
  }
  PointerEnterCard(t) {}
  PointerDownCard(t) {}
  GetKey(t, e) {
    return t.CardId
  }
}
exports.PhantomArenaReplaceCard = PhantomArenaReplaceCard;
//# sourceMappingURL=PhantomArenaReplaceCard.js.map