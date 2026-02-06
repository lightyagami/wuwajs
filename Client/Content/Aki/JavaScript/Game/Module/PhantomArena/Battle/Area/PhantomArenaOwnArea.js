"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaOwnArea = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const Info_1 = require("../../../../../Core/Common/Info");
const Log_1 = require("../../../../../Core/Common/Log");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController");
const LoadAsyncPromise_1 = require("../../../UiComponent/LoadAsyncPromise");
const PhantomArenaLogicFactory_1 = require("../Card/Logic/PhantomArenaLogicFactory");
const PhantomArenaCard_1 = require("../Card/PhantomArenaCard");
const PhantomArenaDefine_1 = require("../PhantomArenaDefine");
const PhantomArenaFieldArea_1 = require("../View/Field/PhantomArenaFieldArea");
const PhantomArenaFieldEffectItem_1 = require("../View/Field/PhantomArenaFieldEffectItem");
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
    this.FiledArea = undefined;
    this.FieldEffect = undefined;
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
  async InitArea(t, a, i, e) {
    await Promise.all([this.Ai1(t), this.Pi1(a), this.nFe(i), this.Iiu(), this.GNm(e)]);
  }
  RegisterViewProxy(t) {
    this.ViewProxy = t;
  }
  RefreshAll(t) {
    this.RolePanel.RefreshAll(t);
    this.FunctionalArea.RefreshAllBattleCard();
    this.RefreshFiledArea();
  }
  IsCanDragCard(t) {
    return !ModelManager_1.ModelManager.PhantomArenaBattleModel.InWaitCallCardIdList(t) && !this.ViewProxy.InCantDragState();
  }
  CardClick(t) {
    var a;
    if (this.HandArea.IsLayoutHoist) {
      a = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.GetHandCardDataByCardId(t);
      this.ViewProxy.ShowCardTips(a, true);
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
  y2u(t) {
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
    this.y2u(t);
    this.pfu();
  }
  CardBeginDragByFunctional(t) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "从场上拖动卡牌", ["Id", t.Data.CardId], ["Index", t.Data.Index]);
    }
    t.SetUiParent(this.ViewProxy.GetDragRootItem());
    this.FunctionalArea.RefreshStateByDragCard(t);
    this.y2u(t);
  }
  async HandCardBeginDragByGamepad(t, a, i) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "手柄从手上拖动卡牌", ["Id", t.Data.CardId], ["SlotIndex", a]);
    }
    this.FunctionalArea.RefreshStateByGamepad(t, a);
    this.y2u(t);
    a = this.FunctionalArea.GetCardProxyByIndex(a);
    await this.HandArea.HandCardToFunctionalTop(t, a.AreaItem.GetRootItem(), i);
  }
  async BattleCardBeginDragByGamepad(t, a, i) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "手柄从场上拖动卡牌", ["Id", t.Data.CardId], ["Index", t.Data.Index], ["SlotIndex", a]);
    }
    this.FunctionalArea.RefreshStateByGamepad(t, a);
    this.y2u(t);
    await this.FunctionalArea.FunctionalCardToFunctionalTop(t, a, i);
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
      const a = this.FunctionalArea.GetNearlyAreaItemProxyByCard(t);
      if (a) {
        const i = a.GetSettingFailReason();
        if (!StringUtils_1.StringUtils.IsBlank(i)) {
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(i);
          a.ResetSettingFailReason();
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
      const i = this.ViewProxy.CardRecycle.GetSettingFailReason();
      if (!StringUtils_1.StringUtils.IsBlank(i)) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(i);
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
      const a = this.FunctionalArea.GetNearlyAreaItemProxyByCard(t);
      a?.SetHoverStateActive(false);
      this.yfu();
      await this.HandArea.ResetCardPosition(t);
      this.ViewProxy.CardRecycle.SetEffectActive(1);
    }
    return false;
  }
  async CardEndDragByFunctional(t, a) {
    this.ViewProxy.BanButtonClickModule.ResumeButtonList("Drag");
    this.FunctionalArea.RefreshStateByDragCard(t);
    if (await this.FunctionalArea.TryChangeCard(t, a)) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PhantomArena", 10, "卡牌从场上交换成功", ["Id", t.Data.CardId], ["OriginalIndex", a], ["TargetIndex", t.Data.Index]);
      }
      if (t.Data.Index !== a) {
        this.ViewProxy.RoundOverCheck.RepeatCheck();
      }
      this.ViewProxy.CardRecycle.SetEffectActive(1);
      return true;
    }
    var i = this.FunctionalArea.GetNearlyAreaItemProxyByCard(t);
    if (i) {
      const e = i.GetSettingFailReason();
      if (!StringUtils_1.StringUtils.IsBlank(e)) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(e);
        i.ResetSettingFailReason();
      }
    }
    if (await this.ViewProxy.CardRecycle.TrySettingCardByFunctional(t, a)) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PhantomArena", 10, "卡牌从场上回收成功", ["Id", t.Data.CardId], ["Index", a]);
      }
      this.ViewProxy.RoundOverCheck.RepeatCheck();
      this.ViewProxy.CardRecycle.SetEffectActive(2);
      this.FunctionalArea.DestroyCardByLibrary(a);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshHandCardState);
      return true;
    }
    const e = this.ViewProxy.CardRecycle.GetSettingFailReason();
    if (!StringUtils_1.StringUtils.IsBlank(e)) {
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(e);
      this.ViewProxy.CardRecycle.ResetSettingFailReason();
    }
    this.ViewProxy.CardRecycle.SetEffectActive(1);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "卡牌拖拽失败,返回场上位置", ["Id", t.Data.CardId], ["Index", a]);
    }
    await this.FunctionalArea.ResetCardPosition(a);
    return false;
  }
  async MoveHandCardToRecycle(t, a) {
    this.ViewProxy.BanButtonClickModule.ResumeButtonList("Drag");
    var i = await this.ViewProxy.CardRecycle.TrySettingCardByHand(t, true);
    this.FunctionalArea.GetCardProxyByIndex(a)?.SetHoverStateActive(false);
    this.FunctionalArea.SetAllCardProxyUseActiveState(false, t);
    if (i) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PhantomArena", 10, "怪物区卡牌通过手柄从场上回收成功", ["Id", t.Data.CardId], ["Index", a]);
      }
      this.ViewProxy.RoundOverCheck.RepeatCheck();
      this.ViewProxy.CardRecycle.SetEffectActive(2);
      await this.HandArea.HandToRecycle(t);
    } else {
      i = this.ViewProxy.CardRecycle.GetSettingFailReason();
      if (!StringUtils_1.StringUtils.IsBlank(i)) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(i);
        this.ViewProxy.CardRecycle.ResetSettingFailReason();
      }
      this.ViewProxy.CardRecycle.SetEffectActive(1);
      await this.HandArea.ResetCardPosition(t);
    }
  }
  async MoveFunctionalCardToRecycle(t, a, i) {
    this.ViewProxy.BanButtonClickModule.ResumeButtonList("Drag");
    var e = await this.ViewProxy.CardRecycle.TrySettingCardByFunctional(t, a, true);
    this.FunctionalArea.GetCardProxyByIndex(i)?.SetHoverStateActive(false);
    this.FunctionalArea.SetAllCardProxyUseActiveState(false, t);
    if (e) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("PhantomArena", 10, "变化区卡牌通过手柄从场上回收成功", ["Id", t.Data.CardId], ["Index", i]);
      }
      this.ViewProxy.RoundOverCheck.RepeatCheck();
      this.ViewProxy.CardRecycle.SetEffectActive(2);
      await this.FunctionalArea.FunctionalToRecycle(t);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshHandCardState);
    } else {
      e = this.ViewProxy.CardRecycle.GetSettingFailReason();
      if (!StringUtils_1.StringUtils.IsBlank(e)) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(e);
        this.ViewProxy.CardRecycle.ResetSettingFailReason();
      }
      this.ViewProxy.CardRecycle.SetEffectActive(1);
      await this.FunctionalArea.ResetCardPosition(a);
    }
  }
  P2u(t, a) {
    this.FunctionalArea.GetCardProxyByIndex(a)?.SetHoverStateActive(false);
    this.FunctionalArea.SetAllCardProxyUseActiveState(false, t);
    this.ViewProxy.CardRecycle.SetEffectActive(1);
    this.ViewProxy.BanButtonClickModule.ResumeButtonList("Drag");
  }
  async ResetSelectCardToHand(t, a) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "手柄重置卡牌到手上", ["Id", t.Data.CardId], ["Index", a]);
    }
    this.P2u(t, a);
    await this.HandArea.ResetCardPosition(t);
  }
  async ResetSelectCardToFunctional(t, a) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("PhantomArena", 10, "手柄重置卡牌到场上", ["Id", t.Data.CardId], ["Index", a]);
    }
    this.P2u(t, a);
    await this.FunctionalArea.ResetCardPosition(t.Data.Index);
  }
  ResetFunctionalToHand(t, a) {
    this.FunctionalArea.RemoveCard(a);
    this.HandArea.FunctionalToHand(t);
  }
  async TBm(t, a) {
    var i = new PhantomArenaCard_1.PhantomArenaCard();
    i.RegisterCardLogic(PhantomArenaLogicFactory_1.PhantomArenaLogicFactory.CreateLogic(i, t.GetCardType(), this.ViewProxy));
    await i.InitializePhantomArenaCard(t, a);
    return i;
  }
  async bBm(t, a, i) {
    const e = await this.TBm(t, i.AreaItem.GetRootItem());
    await i.SetCard(e);
    const n = new CustomPromise_1.CustomPromise();
    t = {
      StartCallback: () => {
        e.SetActive(true);
      },
      CompleteCallback: () => {
        e.StopSequence("DragUpHandtoTable");
        e.PlaySequenceAsync("PutDownHandtoTable").finally(() => {
          n.SetResult();
        });
      },
      LocationCurveX: this.RecycleCurve,
      LocationCurveY: this.RecycleCurve,
      DurationTime: PhantomArenaDefine_1.PLAY_MOVE_DURATION
    };
    e.PlayLocationByItem(a, i.AreaItem.GetRootItem(), t);
    e.PlaySequenceWithoutStop("DragUpHandtoTable");
    await n.Promise;
  }
  async RBm(t, a) {
    var t = this.HandArea.GetCardProxy(t.CardId);
    var i = t.GetCard();
    await t.CallHandCardToFight(a.AreaItem.GetRootItem());
    await Promise.all([this.HandArea.RemoveCard(i), a.SetCard(i)]);
  }
  async CallHandCardListToFight(t) {
    var a = [];
    for (const n of t) {
      var i;
      var e = n.kg1;
      var e = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.GetBattleCardByCardId(e);
      if (e) {
        i = this.FunctionalArea.GetCardProxyByIndex(e.Index);
        a.push(this.RBm(e, i));
      }
    }
    await Promise.all(a);
  }
  async CallLibraryCardListToFight(t) {
    var a = [];
    for (const n of t) {
      var i;
      var e = n.kg1;
      var e = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.GetBattleCardByCardId(e);
      if (e) {
        i = this.FunctionalArea.GetCardProxyByIndex(e.Index);
        a.push(this.bBm(e, this.ViewProxy.GetOwnCardLibraryItem(), i));
      }
    }
    await Promise.all(a);
  }
  async GNm(t) {
    if (!ModelManager_1.ModelManager.PhantomArenaBattleModel.IsOldBvb) {
      this.FiledArea = new PhantomArenaFieldArea_1.PhantomArenaFieldArea();
      this.FiledArea.RegisterViewProxy(this.ViewProxy);
      await this.FiledArea.CreateThenShowByActorAsync(t.GetOwner());
    }
  }
  async tnf() {
    var t;
    if (!this.FieldEffect) {
      t = ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.FieldData;
      this.FieldEffect = new PhantomArenaFieldEffectItem_1.PhantomArenaFieldEffectItem();
      await this.FieldEffect.CreateByPathAsync(t.FieldEffectResource, this.ViewProxy.GetSkillTriggerAttachItem());
      this.FieldEffect.SetName(t.FieldName);
    }
    this.FieldEffect.PlayStart();
    await this.ViewProxy.PlayShowFieldEffect();
  }
  async RefreshFiledArea() {
    await this.FiledArea?.Refresh(ModelManager_1.ModelManager.PhantomArenaBattleModel.OwnData.FieldData);
    this.RolePanel.RefreshField();
  }
  async ShowField() {
    await this.tnf();
    await this.ShowFiledArea();
  }
  async ShowFiledArea() {
    await this.RefreshFiledArea();
    this.SwitchFieldState(Info_1.Info.IsInGamepad());
  }
  async UnlockFiledArea() {
    await this.RefreshFiledArea();
    this.SwitchFieldState(Info_1.Info.IsInGamepad());
  }
  SwitchFieldState(t) {
    this.FiledArea?.SwitchFieldState(!t);
    this.RolePanel.SwitchFieldState(t);
  }
}
exports.PhantomArenaOwnArea = PhantomArenaOwnArea;
//# sourceMappingURL=PhantomArenaOwnArea.js.map