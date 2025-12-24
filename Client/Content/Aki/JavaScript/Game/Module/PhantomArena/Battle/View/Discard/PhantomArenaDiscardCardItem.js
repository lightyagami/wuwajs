"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaDiscardCardItem = undefined;
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const ScrollingTipsController_1 = require("../../../../ScrollingTips/ScrollingTipsController");
const GridProxyAbstract_1 = require("../../../../Util/Grid/GridProxyAbstract");
const PhantomArenaCard_1 = require("../../Card/PhantomArenaCard");
class PhantomArenaDiscardCardItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Card = undefined;
    this.ClickCallback = undefined;
    this.IsChoose = false;
  }
  async OnBeforeStartAsync() {
    this.Card = new PhantomArenaCard_1.PhantomArenaCard();
    var t = ModelManager_1.ModelManager.PhantomArenaBattleModel.IsOldBvb ? "PnlStateChoose" : "PnlStateChoose_New";
    this.Card.AddComponentsRegisterInfoByResourceId([6, t]);
    this.Card.SetCardProxy(this);
    await this.Card.CreateThenShowByActorAsync(this.GetRootActor());
  }
  Refresh(t, e, r) {
    this.Card.Refresh(t);
    t = t.UseCost === 0 ? 2 : 0;
    this.Card.SetToggleState(t, false);
    this.SetSelectStateWithoutSequence();
    this.SetChooseStateWithoutSequence();
  }
  PointerClickCard(t, e) {
    if (this.Card.Data.IsField) {
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("PhantomBattle_1187");
    } else if (this.Card.Data.UseCost === 0) {
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("PhantomBattle_1186");
    } else {
      this.ClickCallback?.(this.Card.Data, !this.IsChoose);
    }
  }
  SetSelectStateWithoutSequence() {
    this.Card.SetSelectedStateWithoutSequence();
  }
  SetSelectState(t) {
    this.Card.SetSelectedState(t);
  }
  SetChooseStateWithoutSequence() {
    this.Card.GetComponent(6).SetComponentDisActiveWithoutSequence();
    this.IsChoose = false;
  }
  SetChooseState(t) {
    this.Card.GetComponent(6).SetComponentActive(t);
    this.IsChoose = t;
  }
  PointerEnterCard(t) {}
  PointerDownCard(t) {}
  GetKey(t, e) {
    return t.CardId;
  }
}
exports.PhantomArenaDiscardCardItem = PhantomArenaDiscardCardItem;
//# sourceMappingURL=PhantomArenaDiscardCardItem.js.map