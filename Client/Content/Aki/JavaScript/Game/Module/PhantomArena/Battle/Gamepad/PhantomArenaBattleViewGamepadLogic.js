"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaBattleViewGamepadLogic = void 0;
const PhantomArenaDefine_1 = require("../PhantomArenaDefine");
class PhantomArenaBattleViewGamepadLogic {
  constructor(t) {
    this.Proxy = t, this.SelectedCard = void 0, this.SlotIndex = PhantomArenaDefine_1.HAND_PHANTOMARENA_INDEX, this.HandIndex = -1, this.sgu = !1
  }
  get IsInHandCardSelectState() {
    return void 0 !== this.SelectedCard && this.SelectedCard.Data.Index === PhantomArenaDefine_1.HAND_PHANTOMARENA_INDEX
  }
  get IsInBattleCardSelectState() {
    return void 0 !== this.SelectedCard && this.SelectedCard.Data.Index !== PhantomArenaDefine_1.HAND_PHANTOMARENA_INDEX
  }
  get IsInCardSelectState() {
    return this.IsInHandCardSelectState || this.IsInBattleCardSelectState
  }
  cuu() {
    this.SelectedCard = void 0, this.SlotIndex = PhantomArenaDefine_1.HAND_PHANTOMARENA_INDEX, this.HandIndex = -1, this.Proxy.OwnArea.FunctionalArea.ResetLastProxyIndexByGamepad()
  }
  async duu(t, i) {
    var e = this.SlotIndex === PhantomArenaDefine_1.HAND_PHANTOMARENA_INDEX;
    this.SelectedCard = t, this.SlotIndex = i, await this.Proxy.OwnArea.HandCardBeginDragByGamepad(this.SelectedCard, this.SlotIndex, e)
  }
  async muu(t, i) {
    var e = this.SlotIndex === PhantomArenaDefine_1.HAND_PHANTOMARENA_INDEX;
    this.SelectedCard = t, this.SlotIndex = i, await this.Proxy.OwnArea.BattleCardBeginDragByGamepad(this.SelectedCard, this.SlotIndex, e)
  }
  async fuu(t) {
    await this.Proxy.OwnArea.MoveHandCardToRecycle(t, this.SlotIndex)
  }
  async guu(t) {
    await this.Proxy.OwnArea.MoveFunctionalCardToRecycle(t, t.Data.Index, this.SlotIndex)
  }
  CancelSelectedCard() {
    this.SelectedCard && (this.SelectedCard.Data.Index === PhantomArenaDefine_1.HAND_PHANTOMARENA_INDEX ? this.Proxy.OwnArea.ResetSelectCardToHand(this.SelectedCard, this.SlotIndex) : this.Proxy.OwnArea.ResetSelectCardToFunctional(this.SelectedCard, this.SlotIndex), this.cuu())
  }
  ResetGamepadOperation() {
    this.CancelSelectedCard()
  }
  SwitchCardLayoutHoist() {
    this.Proxy.OwnArea.HandArea.SwitchLayoutHoist()
  }
  TriggerRecycleCard() {
    this.SelectedCard && (this.SelectedCard.Data.Index === PhantomArenaDefine_1.HAND_PHANTOMARENA_INDEX ? this.fuu(this.SelectedCard) : this.guu(this.SelectedCard), this.cuu())
  }
  async SelectHandCard(t) {
    var i;
    return !this.Proxy.InCantDragState() && !!(i = this.Proxy.OwnArea.HandArea.GetCardProxyByIndex(t)) && (this.HandIndex = t, await this.duu(i.GetCard(), 0), !0)
  }
  async SelectBattleCard(t) {
    var i;
    return !this.Proxy.InCantDragState() && !(!(i = this.Proxy.OwnArea.FunctionalArea.GetCardProxyByIndex(t)) || !i.Card || (await this.muu(i.Card, t), 0))
  }
  async MoveHandCardToFunctional(t) {
    !this.SelectedCard || this.SelectedCard.Data.Index !== PhantomArenaDefine_1.HAND_PHANTOMARENA_INDEX || this.SlotIndex === t || this.sgu || (this.SlotIndex = t, await this.Proxy.OwnArea.HandCardBeginDragByGamepad(this.SelectedCard, this.SlotIndex, !1))
  }
  async MoveBattleCardToFunctional(t) {
    !this.SelectedCard || this.SelectedCard.Data.Index === PhantomArenaDefine_1.HAND_PHANTOMARENA_INDEX || this.SlotIndex === t || this.sgu || (this.SlotIndex = t, await this.Proxy.OwnArea.BattleCardBeginDragByGamepad(this.SelectedCard, this.SlotIndex, !1))
  }
  async PutDownCardToFunctional() {
    let t = !1;
    return this.SelectedCard && (this.sgu = !0, t = this.SelectedCard.Data.Index === PhantomArenaDefine_1.HAND_PHANTOMARENA_INDEX ? await this.Proxy.OwnArea.CardEndDragByHand(this.SelectedCard) : await this.Proxy.OwnArea.CardEndDragByFunctional(this.SelectedCard, this.SelectedCard.Data.Index), this.cuu(), this.sgu = !1), t
  }
  SwitchHandCardTips(t) {
    t = this.Proxy.OwnArea.HandArea.GetCardProxyByIndex(t);
    t && this.Proxy.SwitchCardTips(t.GetCard().Data)
  }
  SwitchOwnBattleCardTips(t) {
    t = this.Proxy.OwnArea.FunctionalArea.GetCardProxyByIndex(t);
    t && t.Card && this.Proxy.SwitchCardTips(t.Card.Data)
  }
  SwitchOpponentBattleCardTips(t) {
    t = this.Proxy.OpponentArea.FunctionalArea.GetCardProxyByIndex(t);
    t && t.Card && this.Proxy.SwitchCardTips(t.Card.Data)
  }
  HideCardTips() {
    this.Proxy.HideCardTips()
  }
  IsInSkillInteractByOpponentIndex(t) {
    t = this.Proxy.OpponentArea.FunctionalArea.GetCardProxyByIndex(t);
    return !(!t || !t.Card) && t.IsInSkillInteract
  }
  IsInSkillInteractByOwnIndex(t) {
    t = this.Proxy.OwnArea.FunctionalArea.GetCardProxyByIndex(t);
    return !!t && t.IsInSkillInteract
  }
}
exports.PhantomArenaBattleViewGamepadLogic = PhantomArenaBattleViewGamepadLogic;
//# sourceMappingURL=PhantomArenaBattleViewGamepadLogic.js.map