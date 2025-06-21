"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaAreaMonsterProxy = void 0;
const Log_1 = require("../../../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../../../Core/Define/Net/Protocol"),
  ControllerHolder_1 = require("../../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  PhantomArenaAssetManager_1 = require("../../PhantomArenaAssetManager"),
  PhantomArenaDefine_1 = require("../../PhantomArenaDefine"),
  PhantomArenaAreaProxyBase_1 = require("./PhantomArenaAreaProxyBase"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem");
class PhantomArenaAreaMonsterProxy extends PhantomArenaAreaProxyBase_1.PhantomArenaAreaProxyBase {
  constructor() {
    super(...arguments), this.AreaItem = void 0, this.AreaType = 0, this.e31 = void 0, this.WD_ = !1, this.IsInSkillInteract = !1
  }
  Ox1(t) {
    if (t.Data.Index === PhantomArenaDefine_1.HAND_PHANTOMARENA_INDEX) {
      if (ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.CanEvolveNum <= 0) return !(this.SettingFailReason = "PhantomBattle_1049");
      t = this.Card.Data.IsOtherCardCanEvolve(t.Data);
      if (!t[0]) return this.SettingFailReason = t[1], !1
    }
    return !0
  }
  qx1(t) {
    if (t.Data.Index === PhantomArenaDefine_1.HAND_PHANTOMARENA_INDEX) {
      if (ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.BattleCardLength >= PhantomArenaDefine_1.LIMIT_BATTLE_CARD_NUM) return !(this.SettingFailReason = "PhantomBattle_1048");
      if (t.Data.ConfigCost === PhantomArenaDefine_1.COST_THREE) return !(this.SettingFailReason = "PhantomBattle_1066")
    }
    return !0
  }
  CheckEvolveGuideCondition(t, e) {
    return e !== PhantomArenaDefine_1.HAND_PHANTOMARENA_INDEX || (e = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.GetHandIndexByCardId(t), this.ParentArea.ParentArea.ViewProxy.GuideManager.CheckCanExecuteAndShowFailTips("BvbEvolution", e, this.Index))
  }
  CheckSettingGuideCondition(t, e) {
    return e !== PhantomArenaDefine_1.HAND_PHANTOMARENA_INDEX || (e = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.GetHandIndexByCardId(t), this.ParentArea.ParentArea.ViewProxy.GuideManager.CheckCanExecuteAndShowFailTips("BvbDeploy", e, this.Index))
  }
  CheckGuideCondition(t) {
    return void 0 !== this.Card && void 0 !== t && this.Card !== t ? this.CheckEvolveGuideCondition(t.Data.CardId, t.Data.Index) : this.CheckSettingGuideCondition(t.Data.CardId, t.Data.Index)
  }
  CheckSettingCardCondition(t) {
    if (t.Data.Index === PhantomArenaDefine_1.HAND_PHANTOMARENA_INDEX && ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.GetBattleStatusValue(Protocol_1.Aki.Protocol.fC1.Proto_PhantomBattleCostPoint) - t.Data.UseCost < 0) return !(this.SettingFailReason = "PhantomBattle_1051");
    return t.Data.CanUse ? this.Card ? this.Ox1(t) : this.qx1(t) : (this.SettingFailReason = "", !1)
  }
  async OnHandleAreaByEvolve(t) {
    if (this.SetCardResetPosition(t), !await ControllerHolder_1.ControllerHolder.PhantomArenaBattleController.RequestPhantomBattleEvolve(t.Data.CardId, this.Index)) return !1;
    Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "执行因子继承", ["被继承卡牌", this.Card?.Data.CardId], ["继承卡牌", t?.Data.CardId]);
    var e = this.Card;
    return await this.SetCard(t), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshHandCardState), e && await e.DestroyAsync(), this.AreaItem.SetEvolveActive(!0), this.ParentArea.ParentArea.ViewProxy.GuideManager.FinishCurrentGuide(), !0
  }
  async OnHandleAreaBySetCard(t) {
    return this.SetCardResetPosition(t), !!await ControllerHolder_1.ControllerHolder.PhantomArenaBattleController.RequestPhantomBattleEnterSlot(t.Data.CardId, this.Index) && (await this.SetCard(t), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshHandCardState), this.ParentArea.ParentArea.ViewProxy.GuideManager.FinishCurrentGuide(), !0)
  }
  async OnHandleCardSetting(t) {
    return void 0 !== this.Card && void 0 !== t && this.Card !== t ? this.OnHandleAreaByEvolve(t) : this.OnHandleAreaBySetCard(t)
  }
  GetCardRootItem() {
    return this.AreaItem.GetCardRootItem()
  }
  async SetCard(t) {
    var e = t?.Data.ConfigId,
      i = this.Card?.Data.ConfigId;
    e !== i && (i && PhantomArenaAssetManager_1.PhantomArenaAssetManager.RemovePhantomArenaAssetByCardConfigId(i), e) && PhantomArenaAssetManager_1.PhantomArenaAssetManager.PreloadPhantomArenaAssetByCardConfigId(e), await super.SetCard(t)
  }
  PointerClickCard(t, e) {
    this.e31 ? this.e31.ReceiveClickData(2, t, this.Index, e = 1 === e) ? e ? this.Card?.PlaySequence("Point") : this.Card?.PlaySequence("PointClose") : this.Card?.SetToggleState(0, !1) : this.Card && (this.ParentArea.ParentArea.ViewProxy.ShowCardTips(this.Card.Data), this.ParentArea.ParentArea.ViewProxy.SetSelectedCardId(t, 2))
  }
  PointerEnterCard() {}
  PointerDownCard(t, e) {
    this.WD_ = this.ParentArea.ParentArea.IsCanDragCard(), this.WD_ && this.Card?.RecordLastDragPos(e.pointerPosition)
  }
  PointerBeginDrag(t, e) {
    this.Card && this.WD_ && (Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "开始拖动手牌"), this.Card?.PlayStateSequence("SeleStart"), this.ParentArea.ParentArea.CardBeginDragByFunctional(this.Card), this.Card.PlaySequence("DragUpTabletoHand"))
  }
  PointerDragCard(t, e) {
    this.Card && this.WD_ && (e = e.pointerPosition, this.Card.MoveCard(e), this.ParentArea.ParentArea.CardDraggingByFunctional(this))
  }
  PointerEndDrag(t, e) {
    this.Card && this.WD_ && this.ParentArea.ParentArea.CardEndDragByFunctional(this.Card, this.Index)
  }
  CheckCanvasSortOrder(t, e) {
    return !!this.Card && !!e.SelectFightIdList.includes(this.Card.Data.FightId) && !!t.includes(0)
  }
  HandleSortOrder() {
    this.Card && (this.Card.OverrideCanvasSortOrder(!0), this.Card.PlayStateSequence("PointStart"), this.IsInSkillInteract = !0)
  }
  CancelSortOrder() {
    this.Card && (this.Card.OverrideCanvasSortOrder(!1), this.Card.PlayStateSequence("PointClose"), 1 === this.Card.GetToggleState() && (this.Card.PlaySequence("PointClose"), this.Card.SetToggleState(0, !1)), this.IsInSkillInteract = !1)
  }
  ReceiveUiInteract(t) {
    this.e31 = t
  }
}
exports.PhantomArenaAreaMonsterProxy = PhantomArenaAreaMonsterProxy;
//# sourceMappingURL=PhantomArenaAreaMonsterProxy.js.map