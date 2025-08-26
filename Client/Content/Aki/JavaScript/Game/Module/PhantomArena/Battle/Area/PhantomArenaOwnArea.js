"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaOwnArea = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController");
const LoadAsyncPromise_1 = require("../../../UiComponent/LoadAsyncPromise");
const PhantomArenaDefine_1 = require("../PhantomArenaDefine");
const PhantomArenaOwnRolePanel_1 = require("../View/Panel/PhantomArenaOwnRolePanel");
const PhantomArenaFunctionalArea_1 = require("./Functional/PhantomArenaFunctionalArea");
const PhantomArenaHandArea_1 = require("./Hand/PhantomArenaHandArea");
class PhantomArenaOwnArea {
  constructor() {
    this.ViewProxy = undefined;
    this.HandArea = undefined;
    this.FunctionalArea = undefined;
    this.RolePanel = undefined;
    this.DrawCardCurveX = undefined;
    this.DrawCardCurveY = undefined;
    this.DiscardCardCurveX = undefined;
    this.DiscardCardCurveY = undefined;
    this.MoveLocationCurve = undefined;
    this.RecycleCurve = undefined;
    this.Cfu = false;
  }
  async Ai1(t) {
    this.HandArea = new PhantomArenaHandArea_1.PhantomArenaHandArea();
    this.HandArea.RegisterBattleArea(this);
    await this.HandArea.CreateThenShowByActorAsync(t.GetOwner());
  }
  async Pi1(t) {
    this.FunctionalArea = new PhantomArenaFunctionalArea_1.PhantomArenaFunctionalArea();
    this.FunctionalArea.RegisterBattleArea(this);
    await this.FunctionalArea.CreateThenShowByActorAsync(t.GetOwner());
  }
  async nFe(t) {
    this.RolePanel = new PhantomArenaOwnRolePanel_1.PhantomArenaOwnRolePanel();
    this.RolePanel.RegisterBattleArea(this);
    await this.RolePanel.CreateThenShowByActorAsync(t.GetOwner());
  }
  async Biu() {
    var t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("CardBattleCurveX");
    var t = new LoadAsyncPromise_1.LoadAsyncPromise(t, UE.CurveFloat, 102);
    this.DrawCardCurveX = await t.Promise;
  }
  async kiu() {
    var t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("CardBattleCurveY");
    var t = new LoadAsyncPromise_1.LoadAsyncPromise(t, UE.CurveFloat, 102);
    this.DrawCardCurveY = await t.Promise;
  }
  async Oiu() {
    var t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("CardBattleCurveX_1");
    var t = new LoadAsyncPromise_1.LoadAsyncPromise(t, UE.CurveFloat, 102);
    this.DiscardCardCurveX = await t.Promise;
  }
  async qiu() {
    var t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("CardBattleCurveY_1");
    var t = new LoadAsyncPromise_1.LoadAsyncPromise(t, UE.CurveFloat, 102);
    this.DiscardCardCurveY = await t.Promise;
  }
  async hau() {
    var t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("CardBattleNPCPlayCurve");
    var t = new LoadAsyncPromise_1.LoadAsyncPromise(t, UE.CurveFloat, 102);
    this.MoveLocationCurve = await t.Promise;
  }
  async Chu() {
    var t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("CardBattleNPCRecycle");
    var t = new LoadAsyncPromise_1.LoadAsyncPromise(t, UE.CurveFloat, 102);
    this.RecycleCurve = await t.Promise;
  }
  async Iiu() {
    await Promise.all([this.Biu(), this.kiu(), this.Oiu(), this.qiu(), this.hau(), this.Chu()]);
  }
  U41(t) {
    if (this.HandArea.CheckCardOutHandArea(t)) {
      this.ViewProxy.HideCardTips();
      this.ViewProxy.CancelSelectedCard();
    }
  }
  B41(t) {
    if (t.Distance > PhantomArenaDefine_1.HIDETIPS_BY_FUNCTIONALDRAG_DISTANCE) {
      this.ViewProxy.HideCardTips();
      this.ViewProxy.CancelSelectedCard();
    }
  }
  async InitArea(t, i, a) {
    await Promise.all([this.Ai1(t), this.Pi1(i), this.nFe(a), this.Iiu()]);
  }
  RegisterViewProxy(t) {
    this.ViewProxy = t;
  }
  IsCanDragCard() {
    return !this.ViewProxy.InCantDragState();
  }
  CardClick(t) {
    var i;
    if (this.HandArea.IsLayoutHoist) {
      i = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.GetHandCardDataByCardId(t);
      this.ViewProxy.ShowCardTips(i);
      this.ViewProxy.SetSelectedCardId(t, 1);
    } else {
      this.HandArea.HoistLayout();
    }
  }
  HideCardList() {
    this.ViewProxy.HideCardTips();
    this.ViewProxy.CancelSelectedCard();
    if (this.HandArea.IsLayoutHoist) {
      this.HandArea.LowerLayout();
    }
  }
  pfu() {
    this.Cfu = this.HandArea.IsLayoutHoist;
    if (this.Cfu) {
      this.HandArea.LowerLayout();
    }
  }
  vfu() {
    if (this.Cfu) {
      this.HandArea.HoistLayout();
    }
  }
  yfu() {
    if (this.Cfu) {
      this.HandArea.HoistLayout();
    }
  }
  rNu(t) {
    this.ViewProxy.CardRecycle.RefreshCardRecycleArea(t);
    this.ViewProxy.CardRecycle.SetEffectActive(0);
    this.ViewProxy.BanButtonClickModule.BanButtonList("Drag");
  }
  CardBeginDragByHand(t) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "从手上拖动卡牌", ["Id", t.Data.CardId]);
    }
    t.SetUiParent(this.ViewProxy.GetDragRootItem());
    this.FunctionalArea.RefreshStateByDragCard(t);
    this.rNu(t);
    this.pfu();
  }
  CardBeginDragByFunctional(t) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "从场上拖动卡牌", ["Id", t.Data.CardId], ["Index", t.Data.Index]);
    }
    t.SetUiParent(this.ViewProxy.GetDragRootItem());
    this.FunctionalArea.RefreshStateByDragCard(t);
    this.rNu(t);
  }
  async HandCardBeginDragByGamepad(t, i, a) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "手柄从手上拖动卡牌", ["Id", t.Data.CardId], ["SlotIndex", i]);
    }
    this.FunctionalArea.RefreshStateByGamepad(t, i);
    this.rNu(t);
    i = this.FunctionalArea.GetCardProxyByIndex(i);
    await this.HandArea.HandCardToFunctionalTop(t, i.AreaItem.GetRootItem(), a);
  }
  async BattleCardBeginDragByGamepad(t, i, a) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "手柄从场上拖动卡牌", ["Id", t.Data.CardId], ["Index", t.Data.Index], ["SlotIndex", i]);
    }
    this.FunctionalArea.RefreshStateByGamepad(t, i);
    this.rNu(t);
    await this.FunctionalArea.FunctionalCardToFunctionalTop(t, i, a);
  }
  CardDraggingByHand(t) {
    this.FunctionalArea.RefreshStateByDragCard(t);
    this.ViewProxy.CardRecycle.RefreshCardRecycleArea(t);
    this.U41(t);
  }
  CardDraggingByFunctional(t) {
    this.FunctionalArea.RefreshStateByDragCard(t.Card);
    this.ViewProxy.CardRecycle.RefreshCardRecycleArea(t.Card);
    this.B41(t);
  }
  async CardEndDragByHand(t) {
    this.ViewProxy.BanButtonClickModule.ResumeButtonList("Drag");
    this.FunctionalArea.RefreshStateByDragCard(t);
    if (this.FunctionalArea.CheckGuideCondition(t)) {
      if (await this.FunctionalArea.TrySettingCard(t, PhantomArenaDefine_1.HAND_PHANTOMARENA_INDEX, true)) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("PhantomArena", 10, "卡牌从手上放置成功", ["Id", t.Data.CardId], ["Index", t.Data.Index]);
        }
        this.ViewProxy.RoundOverCheck.RepeatCheck();
        this.vfu();
        await this.HandArea.RemoveCard(t);
        this.ViewProxy.CardRecycle.SetEffectActive(1);
        return true;
      }
      const i = this.FunctionalArea.GetNearlyAreaItemProxyByCard(t);
      if (i) {
        const a = i.GetSettingFailReason();
        if (!StringUtils_1.StringUtils.IsBlank(a)) {
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(a);
          i.ResetSettingFailReason();
        }
      }
      if (await this.ViewProxy.CardRecycle.TrySettingCardByHand(t)) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("PhantomArena", 10, "卡牌从手上回收成功", ["Id", t.Data.CardId], ["Index", t.Data.Index]);
        }
        this.ViewProxy.RoundOverCheck.RepeatCheck();
        this.vfu();
        this.ViewProxy.CardRecycle.SetEffectActive(2);
        await this.HandArea.DestroyCardByLibrary(t.Data.CardId);
        return true;
      }
      const a = this.ViewProxy.CardRecycle.GetSettingFailReason();
      if (!StringUtils_1.StringUtils.IsBlank(a)) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(a);
        this.ViewProxy.CardRecycle.ResetSettingFailReason();
      }
      this.ViewProxy.CardRecycle.SetEffectActive(1);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PhantomArena", 10, "卡牌拖拽失败,返回手上", ["Id", t.Data.CardId]);
      }
      await this.HandArea.ResetCardPosition(t);
      this.yfu();
    } else {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PhantomArena", 10, "引导拦截,卡牌回到手上", ["Id", t.Data.CardId]);
      }
      this.FunctionalArea.SetAllCardProxyUseActiveState(false, t);
      const i = this.FunctionalArea.GetNearlyAreaItemProxyByCard(t);
      i?.SetHoverStateActive(false);
      this.yfu();
      await this.HandArea.ResetCardPosition(t);
      this.ViewProxy.CardRecycle.SetEffectActive(1);
    }
    return false;
  }
  async CardEndDragByFunctional(t, i) {
    this.ViewProxy.BanButtonClickModule.ResumeButtonList("Drag");
    this.FunctionalArea.RefreshStateByDragCard(t);
    if (await this.FunctionalArea.TryChangeCard(t, i)) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PhantomArena", 10, "卡牌从场上交换成功", ["Id", t.Data.CardId], ["OriginalIndex", i], ["TargetIndex", t.Data.Index]);
      }
      if (t.Data.Index !== i) {
        this.ViewProxy.RoundOverCheck.RepeatCheck();
      }
      this.ViewProxy.CardRecycle.SetEffectActive(1);
      return true;
    }
    var a = this.FunctionalArea.GetNearlyAreaItemProxyByCard(t);
    if (a) {
      const n = a.GetSettingFailReason();
      if (!StringUtils_1.StringUtils.IsBlank(n)) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(n);
        a.ResetSettingFailReason();
      }
    }
    if (await this.ViewProxy.CardRecycle.TrySettingCardByFunctional(t, i)) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PhantomArena", 10, "卡牌从场上回收成功", ["Id", t.Data.CardId], ["Index", i]);
      }
      this.ViewProxy.RoundOverCheck.RepeatCheck();
      this.ViewProxy.CardRecycle.SetEffectActive(2);
      this.FunctionalArea.DestroyCardByLibrary(i);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshHandCardState);
      return true;
    }
    const n = this.ViewProxy.CardRecycle.GetSettingFailReason();
    if (!StringUtils_1.StringUtils.IsBlank(n)) {
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(n);
      this.ViewProxy.CardRecycle.ResetSettingFailReason();
    }
    this.ViewProxy.CardRecycle.SetEffectActive(1);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "卡牌拖拽失败,返回场上位置", ["Id", t.Data.CardId], ["Index", i]);
    }
    await this.FunctionalArea.ResetCardPosition(i);
    return false;
  }
  async MoveHandCardToRecycle(t, i) {
    this.ViewProxy.BanButtonClickModule.ResumeButtonList("Drag");
    var a = await this.ViewProxy.CardRecycle.TrySettingCardByHand(t, true);
    this.FunctionalArea.GetCardProxyByIndex(i)?.SetHoverStateActive(false);
    this.FunctionalArea.SetAllCardProxyUseActiveState(false, t);
    if (a) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PhantomArena", 10, "怪物区卡牌通过手柄从场上回收成功", ["Id", t.Data.CardId], ["Index", i]);
      }
      this.ViewProxy.RoundOverCheck.RepeatCheck();
      this.ViewProxy.CardRecycle.SetEffectActive(2);
      await this.HandArea.HandToRecycle(this.ViewProxy.CardRecycle.GetRootItem(), t);
    } else {
      a = this.ViewProxy.CardRecycle.GetSettingFailReason();
      if (!StringUtils_1.StringUtils.IsBlank(a)) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(a);
        this.ViewProxy.CardRecycle.ResetSettingFailReason();
      }
      this.ViewProxy.CardRecycle.SetEffectActive(1);
      await this.HandArea.ResetCardPosition(t);
    }
  }
  async MoveFunctionalCardToRecycle(t, i, a) {
    this.ViewProxy.BanButtonClickModule.ResumeButtonList("Drag");
    var n = await this.ViewProxy.CardRecycle.TrySettingCardByFunctional(t, i, true);
    this.FunctionalArea.GetCardProxyByIndex(a)?.SetHoverStateActive(false);
    this.FunctionalArea.SetAllCardProxyUseActiveState(false, t);
    if (n) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PhantomArena", 10, "变化区卡牌通过手柄从场上回收成功", ["Id", t.Data.CardId], ["Index", a]);
      }
      this.ViewProxy.RoundOverCheck.RepeatCheck();
      this.ViewProxy.CardRecycle.SetEffectActive(2);
      await this.FunctionalArea.FunctionalToRecycle(this.ViewProxy.CardRecycle.GetRootItem(), t);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshHandCardState);
    } else {
      n = this.ViewProxy.CardRecycle.GetSettingFailReason();
      if (!StringUtils_1.StringUtils.IsBlank(n)) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(n);
        this.ViewProxy.CardRecycle.ResetSettingFailReason();
      }
      this.ViewProxy.CardRecycle.SetEffectActive(1);
      await this.FunctionalArea.ResetCardPosition(i);
    }
  }
  oNu(t, i) {
    this.FunctionalArea.GetCardProxyByIndex(i)?.SetHoverStateActive(false);
    this.FunctionalArea.SetAllCardProxyUseActiveState(false, t);
    this.ViewProxy.CardRecycle.SetEffectActive(1);
    this.ViewProxy.BanButtonClickModule.ResumeButtonList("Drag");
  }
  async ResetSelectCardToHand(t, i) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "手柄重置卡牌到手上", ["Id", t.Data.CardId], ["Index", i]);
    }
    this.oNu(t, i);
    await this.HandArea.ResetCardPosition(t);
  }
  async ResetSelectCardToFunctional(t, i) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "手柄重置卡牌到场上", ["Id", t.Data.CardId], ["Index", i]);
    }
    this.oNu(t, i);
    await this.FunctionalArea.ResetCardPosition(t.Data.Index);
  }
  ResetFunctionalToHand(t, i) {
    this.FunctionalArea.RemoveCard(i);
    this.HandArea.FunctionalToHand(t);
  }
}
exports.PhantomArenaOwnArea = PhantomArenaOwnArea;
//# sourceMappingURL=PhantomArenaOwnArea.js.map