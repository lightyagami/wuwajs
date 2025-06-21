"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaOwnArea = void 0;
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController"),
  LoadAsyncPromise_1 = require("../../../UiComponent/LoadAsyncPromise"),
  PhantomArenaDefine_1 = require("../PhantomArenaDefine"),
  PhantomArenaOwnRolePanel_1 = require("../View/Panel/PhantomArenaOwnRolePanel"),
  PhantomArenaFunctionalArea_1 = require("./Functional/PhantomArenaFunctionalArea"),
  PhantomArenaHandArea_1 = require("./Hand/PhantomArenaHandArea");
class PhantomArenaOwnArea {
  constructor() {
    this.ViewProxy = void 0, this.HandArea = void 0, this.FunctionalArea = void 0, this.RolePanel = void 0, this.DrawCardCurveX = void 0, this.DrawCardCurveY = void 0, this.DiscardCardCurveX = void 0, this.DiscardCardCurveY = void 0, this.MoveLocationCurve = void 0, this.RecycleCurve = void 0, this.rhu = !1
  }
  async _i1(t) {
    this.HandArea = new PhantomArenaHandArea_1.PhantomArenaHandArea, this.HandArea.RegisterBattleArea(this), await this.HandArea.CreateThenShowByActorAsync(t.GetOwner())
  }
  async ci1(t) {
    this.FunctionalArea = new PhantomArenaFunctionalArea_1.PhantomArenaFunctionalArea, this.FunctionalArea.RegisterBattleArea(this), await this.FunctionalArea.CreateThenShowByActorAsync(t.GetOwner())
  }
  async nFe(t) {
    this.RolePanel = new PhantomArenaOwnRolePanel_1.PhantomArenaOwnRolePanel, this.RolePanel.RegisterBattleArea(this), await this.RolePanel.CreateThenShowByActorAsync(t.GetOwner())
  }
  async mtu() {
    var t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("CardBattleCurveX"),
      t = new LoadAsyncPromise_1.LoadAsyncPromise(t, UE.CurveFloat, 102);
    this.DrawCardCurveX = await t.Promise
  }
  async ftu() {
    var t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("CardBattleCurveY"),
      t = new LoadAsyncPromise_1.LoadAsyncPromise(t, UE.CurveFloat, 102);
    this.DrawCardCurveY = await t.Promise
  }
  async gtu() {
    var t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("CardBattleCurveX_1"),
      t = new LoadAsyncPromise_1.LoadAsyncPromise(t, UE.CurveFloat, 102);
    this.DiscardCardCurveX = await t.Promise
  }
  async Ctu() {
    var t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("CardBattleCurveY_1"),
      t = new LoadAsyncPromise_1.LoadAsyncPromise(t, UE.CurveFloat, 102);
    this.DiscardCardCurveY = await t.Promise
  }
  async aru() {
    var t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("CardBattleNPCPlayCurve"),
      t = new LoadAsyncPromise_1.LoadAsyncPromise(t, UE.CurveFloat, 102);
    this.MoveLocationCurve = await t.Promise
  }
  async iou() {
    var t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("CardBattleNPCRecycle"),
      t = new LoadAsyncPromise_1.LoadAsyncPromise(t, UE.CurveFloat, 102);
    this.RecycleCurve = await t.Promise
  }
  async rtu() {
    await Promise.all([this.mtu(), this.ftu(), this.gtu(), this.Ctu(), this.aru(), this.iou()])
  }
  i41(t) {
    this.HandArea.CheckCardOutHandArea(t) && (this.ViewProxy.HideCardTips(), this.ViewProxy.CancelSelectedCard())
  }
  r41(t) {
    t.Distance > PhantomArenaDefine_1.HIDETIPS_BY_FUNCTIONALDRAG_DISTANCE && (this.ViewProxy.HideCardTips(), this.ViewProxy.CancelSelectedCard())
  }
  async InitArea(t, i, a) {
    await Promise.all([this._i1(t), this.ci1(i), this.nFe(a), this.rtu()])
  }
  RegisterViewProxy(t) {
    this.ViewProxy = t
  }
  IsCanDragCard() {
    return !this.ViewProxy.InCantDragState()
  }
  CardClick(t) {
    var i;
    this.HandArea.IsLayoutHoist ? (i = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.GetHandCardDataByCardId(t), this.ViewProxy.ShowCardTips(i), this.ViewProxy.SetSelectedCardId(t, 1)) : this.HandArea.HoistLayout()
  }
  HideCardList() {
    this.ViewProxy.HideCardTips(), this.ViewProxy.CancelSelectedCard(), this.HandArea.IsLayoutHoist && this.HandArea.LowerLayout()
  }
  ohu() {
    this.rhu = this.HandArea.IsLayoutHoist, this.rhu && this.HandArea.LowerLayout()
  }
  nhu() {
    this.rhu && this.HandArea.HoistLayout()
  }
  shu() {
    this.rhu && this.HandArea.HoistLayout()
  }
  wfu(t) {
    this.ViewProxy.CardRecycle.RefreshCardRecycleArea(t), this.ViewProxy.CardRecycle.SetEffectActive(0), this.ViewProxy.BanButtonClickModule.BanButtonList("Drag")
  }
  CardBeginDragByHand(t) {
    Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "从手上拖动卡牌", ["Id", t.Data.CardId]), t.SetUiParent(this.ViewProxy.GetDragRootItem()), this.FunctionalArea.RefreshStateByDragCard(t), this.wfu(t), this.ohu()
  }
  CardBeginDragByFunctional(t) {
    Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "从场上拖动卡牌", ["Id", t.Data.CardId], ["Index", t.Data.Index]), t.SetUiParent(this.ViewProxy.GetDragRootItem()), this.FunctionalArea.RefreshStateByDragCard(t), this.wfu(t)
  }
  async HandCardBeginDragByGamepad(t, i, a) {
    Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "手柄从手上拖动卡牌", ["Id", t.Data.CardId], ["SlotIndex", i]), this.FunctionalArea.RefreshStateByGamepad(t, i), this.wfu(t);
    i = this.FunctionalArea.GetCardProxyByIndex(i);
    await this.HandArea.HandCardToFunctionalTop(t, i.AreaItem.GetRootItem(), a)
  }
  async BattleCardBeginDragByGamepad(t, i, a) {
    Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "手柄从场上拖动卡牌", ["Id", t.Data.CardId], ["Index", t.Data.Index], ["SlotIndex", i]), this.FunctionalArea.RefreshStateByGamepad(t, i), this.wfu(t), await this.FunctionalArea.FunctionalCardToFunctionalTop(t, i, a)
  }
  CardDraggingByHand(t) {
    this.FunctionalArea.RefreshStateByDragCard(t), this.ViewProxy.CardRecycle.RefreshCardRecycleArea(t), this.i41(t)
  }
  CardDraggingByFunctional(t) {
    this.FunctionalArea.RefreshStateByDragCard(t.Card), this.ViewProxy.CardRecycle.RefreshCardRecycleArea(t.Card), this.r41(t)
  }
  async CardEndDragByHand(t) {
    if (this.ViewProxy.BanButtonClickModule.ResumeButtonList("Drag"), this.FunctionalArea.RefreshStateByDragCard(t), this.FunctionalArea.CheckGuideCondition(t)) {
      if (await this.FunctionalArea.TrySettingCard(t, PhantomArenaDefine_1.HAND_PHANTOMARENA_INDEX, !0)) return Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "卡牌从手上放置成功", ["Id", t.Data.CardId], ["Index", t.Data.Index]), this.ViewProxy.RoundOverCheck.RepeatCheck(), this.nhu(), await this.HandArea.RemoveCard(t), this.ViewProxy.CardRecycle.SetEffectActive(1), !0;
      const i = this.FunctionalArea.GetNearlyAreaItemProxyByCard(t);
      if (i) {
        const a = i.GetSettingFailReason();
        StringUtils_1.StringUtils.IsBlank(a) || (ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(a), i.ResetSettingFailReason())
      }
      if (await this.ViewProxy.CardRecycle.TrySettingCardByHand(t)) return Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "卡牌从手上回收成功", ["Id", t.Data.CardId], ["Index", t.Data.Index]), this.ViewProxy.RoundOverCheck.RepeatCheck(), this.nhu(), this.ViewProxy.CardRecycle.SetEffectActive(2), await this.HandArea.DestroyCardByLibrary(t.Data.CardId), !0;
      const a = this.ViewProxy.CardRecycle.GetSettingFailReason();
      StringUtils_1.StringUtils.IsBlank(a) || (ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(a), this.ViewProxy.CardRecycle.ResetSettingFailReason()), this.ViewProxy.CardRecycle.SetEffectActive(1), Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "卡牌拖拽失败,返回手上", ["Id", t.Data.CardId]), await this.HandArea.ResetCardPosition(t), this.shu()
    } else {
      Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "引导拦截,卡牌回到手上", ["Id", t.Data.CardId]), this.FunctionalArea.SetAllCardProxyUseActiveState(!1, t);
      const i = this.FunctionalArea.GetNearlyAreaItemProxyByCard(t);
      i?.SetHoverStateActive(!1), this.shu(), await this.HandArea.ResetCardPosition(t), this.ViewProxy.CardRecycle.SetEffectActive(1)
    }
    return !1
  }
  async CardEndDragByFunctional(t, i) {
    if (this.ViewProxy.BanButtonClickModule.ResumeButtonList("Drag"), this.FunctionalArea.RefreshStateByDragCard(t), await this.FunctionalArea.TryChangeCard(t, i)) return Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "卡牌从场上交换成功", ["Id", t.Data.CardId], ["OriginalIndex", i], ["TargetIndex", t.Data.Index]), t.Data.Index !== i && this.ViewProxy.RoundOverCheck.RepeatCheck(), this.ViewProxy.CardRecycle.SetEffectActive(1), !0;
    var a = this.FunctionalArea.GetNearlyAreaItemProxyByCard(t);
    if (a) {
      const n = a.GetSettingFailReason();
      StringUtils_1.StringUtils.IsBlank(n) || (ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(n), a.ResetSettingFailReason())
    }
    if (await this.ViewProxy.CardRecycle.TrySettingCardByFunctional(t, i)) return Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "卡牌从场上回收成功", ["Id", t.Data.CardId], ["Index", i]), this.ViewProxy.RoundOverCheck.RepeatCheck(), this.ViewProxy.CardRecycle.SetEffectActive(2), this.FunctionalArea.DestroyCardByLibrary(i), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshHandCardState), !0;
    const n = this.ViewProxy.CardRecycle.GetSettingFailReason();
    return StringUtils_1.StringUtils.IsBlank(n) || (ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(n), this.ViewProxy.CardRecycle.ResetSettingFailReason()), this.ViewProxy.CardRecycle.SetEffectActive(1), Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "卡牌拖拽失败,返回场上位置", ["Id", t.Data.CardId], ["Index", i]), await this.FunctionalArea.ResetCardPosition(i), !1
  }
  async MoveHandCardToRecycle(t, i) {
    this.ViewProxy.BanButtonClickModule.ResumeButtonList("Drag");
    var a = await this.ViewProxy.CardRecycle.TrySettingCardByHand(t, !0);
    this.FunctionalArea.GetCardProxyByIndex(i)?.SetHoverStateActive(!1), this.FunctionalArea.SetAllCardProxyUseActiveState(!1, t), a ? (Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "怪物区卡牌通过手柄从场上回收成功", ["Id", t.Data.CardId], ["Index", i]), this.ViewProxy.RoundOverCheck.RepeatCheck(), this.ViewProxy.CardRecycle.SetEffectActive(2), await this.HandArea.HandToRecycle(this.ViewProxy.CardRecycle.GetRootItem(), t)) : (a = this.ViewProxy.CardRecycle.GetSettingFailReason(), StringUtils_1.StringUtils.IsBlank(a) || (ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(a), this.ViewProxy.CardRecycle.ResetSettingFailReason()), this.ViewProxy.CardRecycle.SetEffectActive(1), await this.HandArea.ResetCardPosition(t))
  }
  async MoveFunctionalCardToRecycle(t, i, a) {
    this.ViewProxy.BanButtonClickModule.ResumeButtonList("Drag");
    var n = await this.ViewProxy.CardRecycle.TrySettingCardByFunctional(t, i, !0);
    this.FunctionalArea.GetCardProxyByIndex(a)?.SetHoverStateActive(!1), this.FunctionalArea.SetAllCardProxyUseActiveState(!1, t), n ? (Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "变化区卡牌通过手柄从场上回收成功", ["Id", t.Data.CardId], ["Index", a]), this.ViewProxy.RoundOverCheck.RepeatCheck(), this.ViewProxy.CardRecycle.SetEffectActive(2), await this.FunctionalArea.FunctionalToRecycle(this.ViewProxy.CardRecycle.GetRootItem(), t), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshHandCardState)) : (n = this.ViewProxy.CardRecycle.GetSettingFailReason(), StringUtils_1.StringUtils.IsBlank(n) || (ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(n), this.ViewProxy.CardRecycle.ResetSettingFailReason()), this.ViewProxy.CardRecycle.SetEffectActive(1), await this.FunctionalArea.ResetCardPosition(i))
  }
  xfu(t, i) {
    this.FunctionalArea.GetCardProxyByIndex(i)?.SetHoverStateActive(!1), this.FunctionalArea.SetAllCardProxyUseActiveState(!1, t), this.ViewProxy.CardRecycle.SetEffectActive(1), this.ViewProxy.BanButtonClickModule.ResumeButtonList("Drag")
  }
  async ResetSelectCardToHand(t, i) {
    Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "手柄重置卡牌到手上", ["Id", t.Data.CardId], ["Index", i]), this.xfu(t, i), await this.HandArea.ResetCardPosition(t)
  }
  async ResetSelectCardToFunctional(t, i) {
    Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "手柄重置卡牌到场上", ["Id", t.Data.CardId], ["Index", i]), this.xfu(t, i), await this.FunctionalArea.ResetCardPosition(t.Data.Index)
  }
  ResetFunctionalToHand(t, i) {
    this.FunctionalArea.RemoveCard(i), this.HandArea.FunctionalToHand(t)
  }
}
exports.PhantomArenaOwnArea = PhantomArenaOwnArea;
//# sourceMappingURL=PhantomArenaOwnArea.js.map