"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaChooseCardItem = undefined;
const ModelManager_1 = require("../../../../../Manager/ModelManager");
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
    var t = ModelManager_1.ModelManager.PhantomArenaBattleModel.IsOldBvb ? "PnlStateChoose" : "PnlStateChoose_New";
    this.Card.AddComponentsRegisterInfoByResourceId([6, t]);
    this.Card.SetCardProxy(this);
    await this.Card.CreateThenShowByActorAsync(this.GetRootActor());
  }
  Refresh(t) {
    this.Card.Refresh(t);
    this.Card.SetToggleState(0, false);
    this.SetSelectStateWithoutSequence();
    this.SetChooseStateWithoutSequence();
  }
  SetSelectStateWithoutSequence() {
    this.Card.SetSelectedStateWithoutSequence();
  }
  SetSelectState(t) {
    this.Card.SetSelectedState(t);
  }
  SetChooseStateWithoutSequence() {
    this.Card.GetComponent(6).SetComponentDisActiveWithoutSequence();
  }
  SetChooseState(t) {
    this.Card.GetComponent(6).SetComponentActive(t);
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