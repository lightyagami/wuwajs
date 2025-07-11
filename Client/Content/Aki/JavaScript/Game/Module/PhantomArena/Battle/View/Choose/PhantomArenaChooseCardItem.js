"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaChooseCardItem = undefined;
const GridProxyAbstract_1 = require("../../../../Util/Grid/GridProxyAbstract");
const PhantomArenaCard_1 = require("../../Card/PhantomArenaCard");
class PhantomArenaChooseCardItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Card = undefined;
    this.ClickCallback = undefined;
  }
  async OnBeforeStartAsync() {
    this.Card = new PhantomArenaCard_1.PhantomArenaCard();
    this.Card.AddComponentsRegisterInfoByResourceId([4, "PnlStateChoose"]);
    this.Card.SetCardProxy(this);
    await this.Card.CreateThenShowByActorAsync(this.GetRootActor());
  }
  Refresh(t) {
    this.Card.Refresh(t);
    this.Card.SetToggleState(0, false);
    this.SetSelectState(false);
    this.SetChooseState(false);
  }
  SetSelectState(t) {
    this.Card.SetSelectedState(t);
  }
  SetChooseState(t) {
    this.Card.GetComponent(4).SetComponentActive(t);
  }
  PointerClickCard(t, e) {
    if (e === 1) {
      this.ClickCallback?.(this.Card.Data, true);
    } else {
      this.ClickCallback?.(this.Card.Data, false);
    }
  }
  PointerEnterCard(t) {}
  PointerDownCard(t, e) {}
  GetKey(t, e) {
    return t.CardId;
  }
}
exports.PhantomArenaChooseCardItem = PhantomArenaChooseCardItem;
//# sourceMappingURL=PhantomArenaChooseCardItem.js.map