"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaDeckBuilderTabView = void 0;
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  CommonInputViewController_1 = require("../../../Common/InputView/Controller/CommonInputViewController"),
  ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine"),
  ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController"),
  GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
  LoopScrollView_1 = require("../../../Util/ScrollView/LoopScrollView"),
  DeckBuilderCardItem_1 = require("../../Common/CardItem/Item/DeckBuilderCardItem"),
  PhantomArenaController_1 = require("../../PhantomArenaController"),
  PhantomArenaDefine_1 = require("../../PhantomArenaDefine"),
  PhantomArenaChildViewBase_1 = require("../PhantomArenaChildViewBase"),
  DeckBuilderDeckSlotsPanel_1 = require("./DeckBuilderDeckSlotsPanel"),
  DeckBuilderElementTabItem_1 = require("./DeckBuilderElementTabItem"),
  DeckBuilderSortFilterEntrance_1 = require("./DeckBuilderSortFilterEntrance");
class PhantomArenaDeckBuilderTabView extends PhantomArenaChildViewBase_1.PhantomArenaChildViewBase {
  constructor() {
    super(...arguments), this.LibraryCardDataMap = new Map, this.LibraryCardDataList = [], this.AllPageCardDataList = [], this.CurPageCardDataList = [], this.CurSelectedCardIndex = -1, this.CurPage = 0, this.MinPage = 0, this.MaxPage = 0, this.MaxCardCountPerPage = PhantomArenaDefine_1.CARD_COUNT_PER_PAGE, this.TabDataList = [], this.CurSelectedElementTabIndex = -1, this.CurCostFilter = 1, this.IncludeLockedCard = !1, this.CurSlotSortType = 1, this.IsAscending = !0, this.DeckInfo = void 0, this._V1 = void 0, this.CardLayout = void 0, this.ShowLockedSwitchItem = void 0, this.SlotSortEntrance = void 0, this.CardFilterEntrance = void 0, this.DeckSlotsPanel = void 0, this.cV1 = e => {
      var t = {
        CurCardId: e,
        CardList: this.AllPageCardDataList,
        DeckInfo: this.DeckInfo,
        AddCardToDeck: this.AddCardToDeck,
        RemoveCardFromDeck: this.RemoveCardSlotByCardId,
        CurCardIndex: this.AllPageCardDataList.findIndex(t => t.CardId === e),
        CurrencyId: ModelManager_1.ModelManager.PhantomArenaModel.GetDustItemId(),
        SelectedTabIndex: 0,
        NeedOutlookTab: !0
      };
      UiManager_1.UiManager.OpenView("DeckBuilderCardInfoView", t)
    }, this.AddCardToDeck = (t, e = 1) => {
      var i, s, h;
      this.DeckInfo && (t.IsLocked ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("PhantomBattle_1071") : (h = this.DeckInfo.GetCardCount(t.CardId), e = {
        CardId: t.CardId,
        Cost: t.Cost,
        Element: t.Element,
        MaxCount: t.MaxCount,
        AddCount: e
      }, 0 === (e = this.DeckInfo.AddCard(e)) ? (i = this.LibraryCardDataMap.get(t.CardId), s = this.DeckInfo.GetCardCount(t.CardId), i.LeftCount = i.MaxCount - s, this.CardLayout?.GetLayoutItemByKey(i.CardId)?.RefreshLeftCount(), s = 0 === h ? t.CardId : void 0, i.Cost === ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomArenaCardCoreCost() ? (this.DeckSlotsPanel.RefreshCoreCardSlot(s), this.DeckSlotsPanel?.SwitchMaskState(1)) : (this.DeckSlotsPanel.RefreshNormalCardSlot(s, !0, t.CardId), this.DeckSlotsPanel?.SwitchMaskState(2)), this.DeckSlotsPanel.RefreshCardSlotElements(), this.Tru(), this.RefreshElementTab(), this.RefreshDeckFullTip(), this.RefreshElementFullTip()) : (h = PhantomArenaDefine_1.addCardFailedResultToTipTextId[e]) && ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(h)))
    }, this.RemoveCardSlotByCardId = (t, e = 1) => {
      this.DeckInfo && (this.DeckInfo.RemoveCard({
        CardId: t,
        RemoveCount: e
      }) ? (e = this.LibraryCardDataMap.get(t), t = this.DeckInfo.GetCardCount(t), e.LeftCount = e.MaxCount - t, this.CardLayout?.GetLayoutItemByKey(e.CardId)?.RefreshLeftCount(), e.Cost === ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomArenaCardCoreCost() ? this.DeckSlotsPanel.RefreshCoreCardSlot() : this.DeckSlotsPanel.RefreshNormalCardSlot(void 0, !0), this.DeckSlotsPanel.RefreshCardSlotElements(), this.RefreshElementTab(), this.Tru(), this.RefreshDeckFullTip(), this.RefreshElementFullTip()) : Log_1.Log.CheckError() && Log_1.Log.Error("PhantomArena", 43, "移除卡牌异常"))
    }, this.gV1 = t => {
      this.CV1(t), this.pV1(), this.vV1(), this.yV1(), this.SV1(), this.RefreshElementFullTip()
    }, this.MV1 = () => {
      var t = new DeckBuilderElementTabItem_1.DeckBuilderElementTabItem;
      return t.OnToggleSelect = this.gV1, t
    }, this.Y5i = () => new DeckBuilderCardItem_1.DeckBuilderCardItem, this.IV1 = t => {
      t = t.GetData();
      t && this.RemoveCardSlotByCardId(t.CardId)
    }, this.enu = t => {
      var t = t.GetData();
      t && (t = {
        CurCardId: t.CardId,
        NeedOutlookTab: !1
      }, UiManager_1.UiManager.OpenView("DeckBuilderCardInfoView", t))
    }, this.TV1 = t => !1, this.tdu = t => {
      t = t.GetData();
      t && this.RemoveCardSlotByCardId(t.CardId)
    }, this.idu = t => {
      var t = t.GetData();
      t && (t = {
        CurCardId: t.CardId,
        NeedOutlookTab: !1
      }, UiManager_1.UiManager.OpenView("DeckBuilderCardInfoView", t))
    }, this.Qcu = t => !1, this.wV1 = () => {
      0 !== this.MaxPage && (this.CurPage === this.MinPage ? this.CurPage = this.MaxPage : this.CurPage--, this.vV1(), this.yV1(), this.SV1())
    }, this.AV1 = () => {
      0 !== this.MaxPage && (this.CurPage === this.MaxPage ? this.CurPage = this.MinPage : this.CurPage++, this.vV1(), this.yV1(), this.SV1())
    }, this.PV1 = () => {
      var t;
      this.DeckInfo && 0 !== this.DeckInfo.GetTotalCardCount() ? (t = {
        EnabledElementSet: new Set(this.DeckInfo.GetElementSetWithPhysical()),
        DeleteFunc: t => {
          this.RemoveCardSlotByElements(t)
        }
      }, UiManager_1.UiManager.OpenView("DeckBuilderCardDeleteView", t)) : ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("PhantomBattle_Delect_Empty")
    }, this.xV1 = t => {
      this.IncludeLockedCard = 1 === t, this.pV1(), this.vV1(), this.yV1(), this.SV1()
    }, this.DV1 = t => {
      this.CurCostFilter = t, this.pV1(), this.vV1(), this.yV1(), this.SV1()
    }, this.UV1 = (t, e) => {
      this.CurSlotSortType = t, this.IsAscending = e, this.DeckSlotsPanel?.RefreshBySortContext({
        SortType: t,
        IsAscending: e
      })
    }, this.eV1 = t => {
      var e = this.LibraryCardDataMap.get(t);
      e && (e.IsLocked = !1, this.CardLayout?.GetLayoutItemByKey(t)?.RefreshLockComponent())
    }, this.utu = t => {
      var e = this.LibraryCardDataMap.get(t);
      e && (e.OutlookUnlocked = !0, this.CardLayout?.GetLayoutItemByKey(t)?.RefreshOutlook(), this.DeckSlotsPanel?.RefreshOutlookByCardId(t))
    }, this.Vfu = t => {
      this.DeckSlotsPanel?.GamepadTriggerDeckBuilderCardInfoView(t)
    }, this.X51 = () => {
      this.DeckInfo && this.lhu()
    }, this.lhu = () => {
      var t, e;
      this.DeckInfo && (t = ModelManager_1.ModelManager.PhantomArenaModel.ActivityId, this.DeckInfo.GetDeckServerId() < 0 ? PhantomArenaController_1.PhantomArenaController.CardGroupAddRequest(this.DeckInfo.GetName(), this.DeckInfo.CoverToCardIdList(), t, t => {
        this.ViewModel?.UpdateEditableDeckList();
        t = ModelManager_1.ModelManager.PhantomArenaModel.GetDeckByDeckId(t);
        t && this.ViewModel.ReportDeckCreate(t), this.CloseMe()
      }) : (t = this.DeckInfo.GetDeckServerId(), e = this.DeckInfo.CoverToCardIdList(), PhantomArenaController_1.PhantomArenaController.CardGroupUpdateRequest(t, e, t => {
        this.ViewModel?.UpdateEditableDeckList();
        t = ModelManager_1.ModelManager.PhantomArenaModel.GetDeckByDeckId(t);
        t && this.ViewModel.ReportDeckCover(t), this.CloseMe()
      })))
    }, this.AMo = () => {
      var t;
      this.ViewModel && (this.ViewModel?.CheckCurEditDeckHasChange() ? ((t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(314)).FunctionMap.set(1, () => {
        this.CloseMe()
      }), t.FunctionMap.set(2, () => {
        this.X51()
      }), t.IsEscViewTriggerCallBack = !1, PhantomArenaController_1.PhantomArenaController.OpenPhantomArenaConfirmBoxView(t)) : this.CloseMe())
    }, this.qQ1 = () => {
      var t = StringUtils_1.StringUtils.Format(MultiTextLang_1.configMultiTextLang.GetLocalTextNew("PhantomBattle_1077"));
      CommonInputViewController_1.CommonInputViewController.OpenSetPhantomArenaDeckName(t, async t => {
        var e, i = this.DeckInfo?.GetDeckServerId() ?? -1;
        return i < 0 ? (this.DeckInfo?.SetDeckName(t), this.DeckSlotsPanel.RefreshNameText(), Protocol_1.Aki.Protocol.Q4n.KRs) : (e = ModelManager_1.ModelManager.PhantomArenaModel.ActivityId, (i = await PhantomArenaController_1.PhantomArenaController.CardGroupNameRequest(t, i, e)) === Protocol_1.Aki.Protocol.Q4n.KRs && (this.DeckInfo?.SetDeckName(t), this.DeckSlotsPanel.RefreshNameText()), i)
      }, this.DeckInfo?.GetName() ?? "")
    }, this.FQ1 = () => {
      var t = {
        ConfirmCallback: t => {
          let e = !1;
          for (const i of t.GetCardSlotList())
            if (!ModelManager_1.ModelManager.PhantomArenaModel.IsCardUnlock(i.CardId)) {
              e = !0;
              break
            } e && ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("PhantomBattle_1080"), this.kK1(t), this.ViewModel.RecordQuicklyBuildClick(t.GetDeckConfigId())
        }
      };
      UiManager_1.UiManager.OpenView("DeckBuilderQuicklyBuildView", t)
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UILoopScrollViewComponent],
      [1, UE.UIItem],
      [2, UE.UILayoutBase],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIText],
      [7, UE.UIButtonComponent],
      [8, UE.UIButtonComponent],
      [9, UE.UIItem],
      [10, UE.UIButtonComponent],
      [11, UE.UIButtonComponent],
      [12, UE.UIItem],
      [13, UE.UIButtonComponent],
      [14, UE.UIButtonComponent],
      [15, UE.UIItem],
      [16, UE.UIItem]
    ], this.BtnBindInfo = [
      [7, this.wV1],
      [8, this.AV1],
      [10, this.FQ1],
      [11, this.X51],
      [13, this.qQ1],
      [14, this.PV1]
    ]
  }
  async OnBeforeStartAsync() {
    this.CurSelectedElementTabIndex = 0, this.IncludeLockedCard = !1, this.TabDataList = this.BV1(), this._V1 = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(0), this.GetItem(1).GetOwner(), this.MV1), this.CardLayout = new GenericLayout_1.GenericLayout(this.GetLayoutBase(2), this.Y5i, void 0, !0, !1), this.CardFilterEntrance = new DeckBuilderSortFilterEntrance_1.DeckBuilderSortFilterEntrance(!0), this.SlotSortEntrance = new DeckBuilderSortFilterEntrance_1.DeckBuilderSortFilterEntrance(!1), this.DeckSlotsPanel = new DeckBuilderDeckSlotsPanel_1.DeckBuilderDeckSlotsPanel, await Promise.all([this._V1.RefreshByDataAsync(this.TabDataList), this.CardFilterEntrance.CreateThenShowByActorAsync(this.GetItem(4).GetOwner()), this.SlotSortEntrance.CreateThenShowByActorAsync(this.GetItem(9).GetOwner()), this.DeckSlotsPanel.CreateThenShowByActorAsync(this.GetItem(12).GetOwner())]), this.CardFilterEntrance.OnResultCallBack = this.DV1, this.SlotSortEntrance.OnResultCallBack = this.UV1
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPhantomArenaCardUnlock, this.eV1), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPhantomArenaCardOutlookUnlock, this.utu), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.GamepadTriggerCardInfo, this.Vfu)
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPhantomArenaCardUnlock, this.eV1), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPhantomArenaCardOutlookUnlock, this.utu), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.GamepadTriggerCardInfo, this.Vfu)
  }
  async OnBeforeShowAsyncImplement() {
    this.ViewModel.SetViewTitle?.("PhantomArenaDeckOverviewTabView_Name"), this.ViewModel.SetViewHelpId?.(336), this.ViewModel.SetViewHelpBtnActive?.(!0), this.ViewModel.SetViewIcon?.("SP_IconSoundRemnantArena3"), this.DeckInfo = this.ViewModel?.GetCurEditDeck(), this.DeckInfo ? (this.Y81(), this.ShowLockedSwitchItem = this.ViewModel?.GetSwitchItem(), this.ShowLockedSwitchItem?.SetActive(!0), this.ShowLockedSwitchItem?.SetToggleState(!1), this.ShowLockedSwitchItem?.SetOnStateChangedCallback(this.xV1), this.DeckSlotsPanel?.SetMaskAreaEnabled(1, !1), this.DeckSlotsPanel?.SetMaskAreaEnabled(2, !1), this.kV1(), this.CV1(0), this.pV1(), this.vV1(), this.yV1(), await this.Qmu(!1), this.NQ1(), this.RefreshElementTab(), this.RefreshDeckFullTip(), this.RefreshElementFullTip(), this.qV1(), this.GV1()) : Log_1.Log.CheckError() && Log_1.Log.Error("PhantomArena", 43, "当前编辑卡组不存在")
  }
  async OnPlayingShowSequenceAsync() {
    this.CardLayout?.PlayGridAnim()
  }
  async OnPlayingStartSequenceAsync() {
    this.CardLayout?.PlayGridAnim()
  }
  OnBeforeHide() {
    this.z81(), this.ShowLockedSwitchItem?.SetActive(!1), this.ShowLockedSwitchItem?.SetOnStateChangedCallback(void 0)
  }
  BV1() {
    var t = [];
    for (const i of [0, 1, 2, 3, 4, 5, 6]) {
      var e = this.FV1(i);
      t.push(e)
    }
    return t
  }
  FV1(t) {
    let e = void 0;
    var i;
    return e = 0 === t ? {
      TabType: 0,
      TabTexturePath: PhantomArenaDefine_1.CARD_ALL_ELEMENT_TAB_ICON_PATH,
      TabElementColor: PhantomArenaDefine_1.CARD_ALL_ELEMENT_TAB_COLOR,
      ShowRedDot: !1,
      IsDisable: !1,
      IsArrivedMax: !1
    } : (i = PhantomArenaDefine_1.cardTabTypeToElementConfigId[t], {
      TabType: t,
      TabTexturePath: (t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleElementConfig(i)).TabIcon,
      TabElementColor: t.TabElementColor,
      ShowRedDot: !1,
      IsDisable: !1,
      IsArrivedMax: !1
    })
  }
  kV1() {
    this.LibraryCardDataList.length = 0, this.LibraryCardDataMap.clear();
    for (const r of ConfigManager_1.ConfigManager.PhantomArenaConfig.GetAllPhantomBattleCard()) {
      var t = r.Id,
        e = r.Element,
        i = r.InitAttack,
        s = r.CardGroupNum,
        h = s - this.DeckInfo.GetCardCount(t),
        e = {
          CardId: t,
          CardFaceTexturePath: r.CardFaceTexture,
          Cost: r.Cost,
          Element: e,
          Attack: i.get(Protocol_1.Aki.Protocol.gC1.Proto_AttackAbility) ?? 0,
          Life: i.get(Protocol_1.Aki.Protocol.gC1.Proto_LifeAbility) ?? 0,
          IsLocked: !ModelManager_1.ModelManager.PhantomArenaModel.IsCardUnlock(t),
          LeftCount: h,
          MaxCount: s,
          AddCardToDeck: this.AddCardToDeck,
          DeckInfo: this.DeckInfo,
          OpenCardInfoView: this.cV1,
          CardSpineData: ModelManager_1.ModelManager.PhantomArenaModel.CreateCardSpineData(t),
          OutlookUnlocked: ModelManager_1.ModelManager.PhantomArenaModel.IsCardOutlookUnlock(t),
          CardFaceType: ModelManager_1.ModelManager.PhantomArenaModel.GetCardFaceType(t),
          Disabled: !1,
          IsAllInDeck: !1
        };
      this.Kmu(e), this.LibraryCardDataList.push(e), this.LibraryCardDataMap.set(t, e)
    }
    this.LibraryCardDataList.sort(PhantomArenaDefine_1.cardSlotDefaultSortFunc)
  }
  pV1() {
    var t = {
        CostFilter: this.CurCostFilter,
        ElementFilter: this.TabDataList[this.CurSelectedElementTabIndex].TabType,
        IncludeLocked: this.IncludeLockedCard
      },
      t = (this.AllPageCardDataList = ModelManager_1.ModelManager.PhantomArenaModel.FilterCardList(this.LibraryCardDataList, t), Math.ceil(this.AllPageCardDataList.length / this.MaxCardCountPerPage));
    this.MaxPage = t, this.MinPage = Math.min(this.MaxPage, 1), this.CurPage = this.MinPage
  }
  vV1() {
    this.CurPageCardDataList = this.AllPageCardDataList.slice((this.CurPage - 1) * this.MaxCardCountPerPage, this.CurPage * this.MaxCardCountPerPage)
  }
  yV1() {
    this.GetText(6).SetText(this.CurPage + "/" + this.MaxPage)
  }
  SV1() {
    var t = 0 === this.CurPageCardDataList.length;
    this.CardLayout.RefreshByData(this.CurPageCardDataList, void 0, !0), this.GetItem(5).SetUIActive(t)
  }
  async Qmu(t) {
    var e = 0 === this.CurPageCardDataList.length;
    await this.CardLayout.RefreshByDataAsync(this.CurPageCardDataList, t), this.GetItem(5).SetUIActive(e)
  }
  NV1() {
    for (const t of this.LibraryCardDataList) t.LeftCount = t.MaxCount - this.DeckInfo.GetCardCount(t.CardId), this.CardLayout?.GetLayoutItemByKey(t.CardId)?.RefreshLeftCount()
  }
  Kmu(t) {
    t.IsAllInDeck = 0 === t.LeftCount;
    var e = {
      CardId: t.CardId,
      Cost: t.Cost,
      Element: t.Element,
      MaxCount: t.MaxCount,
      AddCount: 1
    };
    t.Disabled = 0 !== this.DeckInfo.CheckCanAddCard(e)
  }
  Tru() {
    for (const e of this.LibraryCardDataList) {
      this.Kmu(e);
      var t = this.CardLayout?.GetLayoutItemByKey(e.CardId);
      t && (t.RefreshAllInDeckComponent(), t.RefreshDisabledComponent())
    }
  }
  NQ1() {
    var t = {
      DeckInfo: this.DeckInfo,
      SlotLongPressTime: ConfigManager_1.ConfigManager.PhantomArenaConfig.GetSlotLongPressTime(ModelManager_1.ModelManager.PhantomArenaModel.ActivityId),
      OnCoreSlotItemSortClick: this.tdu,
      OnCoreSlotItemLongPress: this.idu,
      CanCoreSlotItemToggleChange: this.Qcu,
      OnNormalSlotItemSortClick: this.IV1,
      OnNormalSlotItemLongPress: this.enu,
      CanNormalSlotItemToggleChange: this.TV1,
      SortContext: {
        SortType: this.CurSlotSortType,
        IsAscending: this.IsAscending
      },
      ShowLocked: !1,
      ShowOutlook: !0
    };
    this.DeckSlotsPanel?.RefreshByData(t)
  }
  RefreshElementTab() {
    var t = this.DeckInfo.GetElementList();
    for (const i of this.TabDataList)
      if (0 === i.TabType) i.IsArrivedMax = this.DeckInfo.IsDeckFull();
      else {
        const s = PhantomArenaDefine_1.cardTabTypeToElementConfigId[i.TabType];
        var e = this.DeckInfo.CheckCanAddElement(s);
        i.IsDisable = !e, i.ShowRedDot = -1 !== t.findIndex(t => t === s)
      } this._V1?.RefreshAllGridProxies()
  }
  RefreshElementFullTip() {
    var t = this.TabDataList[this.CurSelectedElementTabIndex].TabType,
      t = PhantomArenaDefine_1.cardTabTypeToElementConfigId[t];
    this.GetItem(16).SetUIActive(void 0 !== t && !this.DeckInfo.CheckCanAddElement(t))
  }
  RefreshDeckFullTip() {
    this.GetItem(15).SetUIActive(this.DeckInfo.IsDeckFull())
  }
  RemoveCardSlotByElements(t) {
    this.DeckInfo && (this.DeckInfo.RemoveCardByElements(t) ? (this.NV1(), this.Tru(), this.DeckSlotsPanel.RefreshCardSlot(), this.DeckSlotsPanel.RefreshCardSlotElements(), this.RefreshElementTab(), this.RefreshDeckFullTip(), this.RefreshElementFullTip()) : Log_1.Log.CheckError() && Log_1.Log.Error("PhantomArena", 43, "移除卡牌异常"))
  }
  RemoveAllCardSlot() {
    this.DeckInfo && (this.DeckInfo.RemoveAllCard() ? (this.NV1(), this.Tru(), this.DeckSlotsPanel.RefreshCardSlot(), this.DeckSlotsPanel.RefreshCardSlotElements(), this.RefreshElementTab(), this.RefreshDeckFullTip(), this.RefreshElementFullTip()) : Log_1.Log.CheckError() && Log_1.Log.Error("PhantomArena", 43, "移除卡牌异常"))
  }
  CV1(t) {
    this.CurSelectedElementTabIndex = t, this._V1?.SelectGridProxy(t)
  }
  qV1() {
    var t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetAllPhantomBattleCardFilter(),
      e = [];
    for (const s of t) {
      var i = {
        ConfigId: s.Id,
        Name: s.Name
      };
      e.push(i)
    }
    this.CardFilterEntrance.UpdateDataList(e);
    t = t.findIndex(t => t.Id === this.CurCostFilter);
    this.CardFilterEntrance.SelectItemByIndex(t, !1)
  }
  GV1() {
    var t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetAllPhantomBattleCardSlotSort(),
      e = [];
    for (const s of t) {
      var i = {
        ConfigId: s.Id,
        Name: s.Name
      };
      e.push(i)
    }
    this.SlotSortEntrance.UpdateDataList(e);
    t = t.findIndex(t => t.Id === this.CurSlotSortType);
    this.SlotSortEntrance.SelectItemByIndex(t, !1), this.SlotSortEntrance.ChangeSortAscending(this.IsAscending, !0, !1)
  }
  Y81() {
    this.ViewModel && this.ViewModel.SetOverrideCloseFunc(this.AMo)
  }
  z81() {
    this.ViewModel && this.ViewModel.ResetOverrideCloseFunc()
  }
  kK1(t) {
    this.DeckInfo?.RemoveAllCard();
    for (const i of t.GetCardSlotList()) {
      var e;
      ModelManager_1.ModelManager.PhantomArenaModel.IsCardUnlock(i.CardId) && (e = {
        CardId: i.CardId,
        Cost: i.Cost,
        Element: i.Element,
        MaxCount: i.Count,
        AddCount: i.Count
      }, this.DeckInfo?.AddCard(e))
    }
    this.NV1(), this.Tru(), this.NQ1(), this.RefreshElementTab(), this.RefreshDeckFullTip(), this.RefreshElementFullTip()
  }
  OnBeforeDestroy() {
    this.ViewModel?.EndEditDeck()
  }
  GetGuideUiItemAndUiItemForShowEx(t) {
    var e, i;
    if (t && 0 !== t.length) return "Card" === (e = t[0]) ? (i = Number(t[1]), (i = this.CardLayout?.GetLayoutItemByIndex(i)?.GetRootItem()) ? [i, i] : void 0) : "CardDetail" === e || "New:CardDetail" === e ? (i = Number(t[1]), this.CardLayout?.GetLayoutItemByIndex(i)?.GetGuideUiItemAndUiItemForShowEx(t)) : "CardInGroup" === e ? this.DeckSlotsPanel?.GetGuideUiItemAndUiItemForShowEx(t) : void 0
  }
}
exports.PhantomArenaDeckBuilderTabView = PhantomArenaDeckBuilderTabView;
//# sourceMappingURL=PhantomArenaDeckBuilderTabView.js.map