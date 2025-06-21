"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaChooseCardItem = void 0;
const GridProxyAbstract_1 = require("../../../../Util/Grid/GridProxyAbstract"),
  PhantomArenaCard_1 = require("../../Card/PhantomArenaCard");
class PhantomArenaChooseCardItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments), this.Card = void 0, this.ClickCallback = void 0
  }
  async OnBeforeStartAsync() {
    this.Card = new PhantomArenaCard_1.PhantomArenaCard, this.Card.AddComponentsRegisterInfoByResourceId([4, "PnlStateChoose"]), this.Card.SetCardProxy(this), await this.Card.CreateThenShowByActorAsync(this.GetRootActor())
  }
  Refresh(t) {
    this.Card.Refresh(t), this.Card.SetToggleState(0, !1), this.SetSelectState(!1), this.SetChooseState(!1)
  }
  SetSelectState(t) {
    this.Card.SetSelectedState(t)
  }
  SetChooseState(t) {
    this.Card.GetComponent(4).SetComponentActive(t)
  }
  PointerClickCard(t, e) {
    1 === e ? this.ClickCallback?.(this.Card.Data, !0) : this.ClickCallback?.(this.Card.Data, !1)
  }
  PointerEnterCard(t) {}
  PointerDownCard(t, e) {}
  GetKey(t, e) {
    return t.CardId
  }
}
exports.PhantomArenaChooseCardItem = PhantomArenaChooseCardItem;
//# sourceMappingURL=PhantomArenaChooseCardItem.js.map