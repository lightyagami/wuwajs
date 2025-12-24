"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaReplaceCard = undefined;
const ModelManager_1 = require("../../../../Manager/ModelManager");
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
    var e = ModelManager_1.ModelManager.PhantomArenaBattleModel.IsOldBvb ? "PnlStateChange" : "PnlStateChange_New";
    this.Card.AddComponentsRegisterInfoByResourceId([5, e]);
    this.Card.SetCardProxy(this);
    await this.Card.CreateThenShowByActorAsync(this.GetRootActor());
  }
  Refresh(e, t, r) {
    this.Card.Refresh(e);
  }
  Oi1() {
    this.Card.GetComponent(5)?.SetActive(true);
  }
  qi1() {
    this.Card.GetComponent(5)?.SetActive(false);
  }
  PointerClickCard(e, t) {
    if (t === 1) {
      this.Oi1();
      this.ClickCallback?.(e, true);
    } else {
      this.qi1();
      this.ClickCallback?.(e, false);
    }
  }
  SetSelectState(e) {
    this.Card.SetSelectedState(e);
  }
  PointerEnterCard(e) {}
  PointerDownCard(e) {}
  GetKey(e, t) {
    return e.CardId;
  }
}
exports.PhantomArenaReplaceCard = PhantomArenaReplaceCard;
//# sourceMappingURL=PhantomArenaReplaceCard.js.map