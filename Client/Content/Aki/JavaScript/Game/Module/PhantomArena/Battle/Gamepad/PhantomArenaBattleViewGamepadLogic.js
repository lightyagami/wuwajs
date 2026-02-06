"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaBattleViewGamepadLogic = undefined;
const ModelManager_1 = require("../../../../Manager/ModelManager");
const PhantomArenaDefine_1 = require("../PhantomArenaDefine");
class PhantomArenaBattleViewGamepadLogic {
  constructor(t) {
    this.Proxy = t;
    this.SelectedCard = undefined;
    this.SlotIndex = PhantomArenaDefine_1.HAND_PHANTOMARENA_INDEX;
    this.HandIndex = -1;
    this.u3u = false;
    this.OwnBattleShowTipsCard = undefined;
  }
  get IsInHandCardSelectState() {
    return this.SelectedCard !== undefined && this.SelectedCard.Data.Index === PhantomArenaDefine_1.HAND_PHANTOMARENA_INDEX;
  }
  get IsInBattleCardSelectState() {
    return this.SelectedCard !== undefined && this.SelectedCard.Data.Index !== PhantomArenaDefine_1.HAND_PHANTOMARENA_INDEX;
  }
  get IsInCardSelectState() {
    return this.IsInHandCardSelectState || this.IsInBattleCardSelectState;
  }
  y7c() {
    this.SelectedCard = undefined;
    this.SlotIndex = PhantomArenaDefine_1.HAND_PHANTOMARENA_INDEX;
    this.HandIndex = -1;
    this.Proxy.OwnArea.FunctionalArea.ResetLastProxyIndexByGamepad();
  }
  async S7c(t, i) {
    var e = this.SlotIndex === PhantomArenaDefine_1.HAND_PHANTOMARENA_INDEX;
    this.SelectedCard = t;
    this.SlotIndex = i;
    await this.Proxy.OwnArea.HandCardBeginDragByGamepad(this.SelectedCard, this.SlotIndex, e);
  }
  async M7c(t, i) {
    var e = this.SlotIndex === PhantomArenaDefine_1.HAND_PHANTOMARENA_INDEX;
    this.SelectedCard = t;
    this.SlotIndex = i;
    await this.Proxy.OwnArea.BattleCardBeginDragByGamepad(this.SelectedCard, this.SlotIndex, e);
  }
  async E7c(t) {
    await this.Proxy.OwnArea.MoveHandCardToRecycle(t, this.SlotIndex);
  }
  async I7c(t) {
    await this.Proxy.OwnArea.MoveFunctionalCardToRecycle(t, t.Data.Index, this.SlotIndex);
  }
  $hg(t) {
    if (t) {
      (this.OwnBattleShowTipsCard = t).SetSelectedStateByGamepad(true);
    } else {
      this.Whg();
    }
  }
  Whg() {
    if (this.OwnBattleShowTipsCard) {
      this.OwnBattleShowTipsCard.SetSelectedStateByGamepad(false);
      this.OwnBattleShowTipsCard = undefined;
    }
  }
  CancelSelectedCard() {
    if (this.SelectedCard) {
      if (this.SelectedCard.Data.Index === PhantomArenaDefine_1.HAND_PHANTOMARENA_INDEX) {
        this.Proxy.OwnArea.ResetSelectCardToHand(this.SelectedCard, this.SlotIndex);
      } else {
        this.Proxy.OwnArea.ResetSelectCardToFunctional(this.SelectedCard, this.SlotIndex);
      }
      this.y7c();
    }
  }
  ResetGamepadOperation() {
    this.CancelSelectedCard();
    this.Whg();
  }
  SwitchCardLayoutHoist() {
    this.Proxy.OwnArea.HandArea.SwitchLayoutHoist();
  }
  TriggerRecycleCard() {
    if (this.SelectedCard) {
      if (this.SelectedCard.Data.Index === PhantomArenaDefine_1.HAND_PHANTOMARENA_INDEX) {
        this.E7c(this.SelectedCard);
      } else {
        this.I7c(this.SelectedCard);
      }
      this.y7c();
    }
  }
  async SelectHandCard(t) {
    var i;
    return !this.Proxy.InCantDragState() && !!(i = this.Proxy.OwnArea.HandArea.GetCardProxyByIndex(t)) && !!ModelManager_1.ModelManager.PhantomArenaBattleModel.CanDragCard(i.GetCard().Data.CardId) && !(this.HandIndex = t, await this.S7c(i.GetCard(), 0), 0);
  }
  async SelectBattleCard(t) {
    var i;
    return !this.Proxy.InCantDragState() && !!(i = this.Proxy.OwnArea.FunctionalArea.GetCardProxyByIndex(t)) && !!i.Card && !i.IsInCardTween && !(this.Whg(), await this.M7c(i.Card, t), 0);
  }
  async MoveHandCardToFunctional(t) {
    if (!!this.SelectedCard && this.SelectedCard.Data.Index === PhantomArenaDefine_1.HAND_PHANTOMARENA_INDEX && this.SlotIndex !== t && !this.u3u) {
      this.SlotIndex = t;
      await this.Proxy.OwnArea.HandCardBeginDragByGamepad(this.SelectedCard, this.SlotIndex, false);
    }
  }
  async MoveBattleCardToFunctional(t) {
    if (!!this.SelectedCard && this.SelectedCard.Data.Index !== PhantomArenaDefine_1.HAND_PHANTOMARENA_INDEX && this.SlotIndex !== t && !this.u3u) {
      this.SlotIndex = t;
      await this.Proxy.OwnArea.BattleCardBeginDragByGamepad(this.SelectedCard, this.SlotIndex, false);
    }
  }
  async PutDownCardToFunctional() {
    let t = false;
    if (this.SelectedCard) {
      this.u3u = true;
      t = this.SelectedCard.Data.Index === PhantomArenaDefine_1.HAND_PHANTOMARENA_INDEX ? await this.Proxy.OwnArea.CardEndDragByHand(this.SelectedCard) : await this.Proxy.OwnArea.CardEndDragByFunctional(this.SelectedCard, this.SelectedCard.Data.Index);
      this.y7c();
      this.u3u = false;
    }
    return t;
  }
  SwitchHandCardTips(t) {
    t = this.Proxy.OwnArea.HandArea.GetCardProxyByIndex(t);
    if (t) {
      this.Proxy.SwitchCardTips(t.GetCard().Data);
    }
  }
  SwitchOwnBattleCardTips(t) {
    var i;
    var t = this.Proxy.OwnArea.FunctionalArea.GetCardProxyByIndex(t);
    if (t && t.Card) {
      i = this.Proxy.SwitchCardTips(t.Card.Data);
      this.$hg(i ? t.Card : undefined);
    }
  }
  SwitchOpponentBattleCardTips(t) {
    t = this.Proxy.OpponentArea.FunctionalArea.GetCardProxyByIndex(t);
    if (t && t.Card) {
      this.Proxy.SwitchCardTips(t.Card.Data);
    }
  }
  HideCardTips() {
    this.Proxy.HideCardTips();
    this.Whg();
  }
  IsInSkillInteractByOpponentIndex(t) {
    t = this.Proxy.OpponentArea.FunctionalArea.GetCardProxyByIndex(t);
    return !!t && !!t.Card && t.IsInSkillInteract;
  }
  IsInSkillInteractByOwnIndex(t) {
    t = this.Proxy.OwnArea.FunctionalArea.GetCardProxyByIndex(t);
    return !!t && t.IsInSkillInteract;
  }
}
exports.PhantomArenaBattleViewGamepadLogic = PhantomArenaBattleViewGamepadLogic;
//# sourceMappingURL=PhantomArenaBattleViewGamepadLogic.js.map