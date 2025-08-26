"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaDeckBuilderTabView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../Ui/UiManager");
const CommonInputViewController_1 = require("../../../Common/InputView/Controller/CommonInputViewController");
const ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine");
const ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LoopScrollView_1 = require("../../../Util/ScrollView/LoopScrollView");
const DeckBuilderCardItem_1 = require("../../Common/CardItem/Item/DeckBuilderCardItem");
const PhantomArenaController_1 = require("../../PhantomArenaController");
const PhantomArenaDefine_1 = require("../../PhantomArenaDefine");
const PhantomArenaChildViewBase_1 = require("../PhantomArenaChildViewBase");
const DeckBuilderDeckSlotsPanel_1 = require("./DeckBuilderDeckSlotsPanel");
const DeckBuilderElementTabItem_1 = require("./DeckBuilderElementTabItem");
const DeckBuilderSortFilterEntrance_1 = require("./DeckBuilderSortFilterEntrance");
class PhantomArenaDeckBuilderTabView extends PhantomArenaChildViewBase_1.PhantomArenaChildViewBase {
  constructor() {
    super(...arguments);
    this.LibraryCardDataMap = new Map();
    this.LibraryCardDataList = [];
    this.AllPageCardDataList = [];
    this.CurPageCardDataList = [];
    this.CurSelectedCardIndex = -1;
    this.CurPage = 0;
    this.MinPage = 0;
    this.MaxPage = 0;
    this.MaxCardCountPerPage = PhantomArenaDefine_1.CARD_COUNT_PER_PAGE;
    this.TabDataList = [];
    this.CurSelectedElementTabIndex = -1;
    this.CurCostFilter = 1;
    this.IncludeLockedCard = false;
    this.CurSlotSortType = 1;
    this.IsAscending = true;
    this.DeckInfo = undefined;
    this.NV1 = undefined;
    this.CardLayout = undefined;
    this.ShowLockedSwitchItem = undefined;
    this.SlotSortEntrance = undefined;
    this.CardFilterEntrance = undefined;
    this.DeckSlotsPanel = undefined;
    this.jV1 = e => {
      var t = {
        CurCardId: e,
        CardList: this.AllPageCardDataList,
        DeckInfo: this.DeckInfo,
        AddCardToDeck: this.AddCardToDeck,
        RemoveCardFromDeck: this.RemoveCardSlotByCardId,
        CurCardIndex: this.AllPageCardDataList.findIndex(t => t.CardId === e),
        CurrencyId: ModelManager_1.ModelManager.PhantomArenaModel.GetDustItemId(),
        SelectedTabIndex: 0,
        NeedOutlookTab: true
      };
      UiManager_1.UiManager.OpenView("DeckBuilderCardInfoView", t);
    };
    this.AddCardToDeck = (t, e = 1) => {
      var i;
      var s;
      var h;
      if (this.DeckInfo) {
        if (t.IsLocked) {
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("PhantomBattle_1071");
        } else {
          h = this.DeckInfo.GetCardCount(t.CardId);
          e = {
            CardId: t.CardId,
            Cost: t.Cost,
            Element: t.Element,
            MaxCount: t.MaxCount,
            AddCount: e
          };
          if ((e = this.DeckInfo.AddCard(e)) === 0) {
            i = this.LibraryCardDataMap.get(t.CardId);
            s = this.DeckInfo.GetCardCount(t.CardId);
            i.LeftCount = i.MaxCount - s;
            this.CardLayout?.GetLayoutItemByKey(i.CardId)?.RefreshLeftCount();
            s = h === 0 ? t.CardId : undefined;
            if (i.Cost === ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomArenaCardCoreCost()) {
              this.DeckSlotsPanel.RefreshCoreCardSlot(s);
              this.DeckSlotsPanel?.SwitchMaskState(1);
            } else {
              this.DeckSlotsPanel.RefreshNormalCardSlot(s, true, t.CardId);
              this.DeckSlotsPanel?.SwitchMaskState(2);
            }
            this.DeckSlotsPanel.RefreshCardSlotElements();
            this.Fau();
            this.RefreshElementTab();
            this.RefreshDeckFullTip();
            this.RefreshElementFullTip();
          } else if (h = PhantomArenaDefine_1.addCardFailedResultToTipTextId[e]) {
            ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(h);
          }
        }
      }
    };
    this.RemoveCardSlotByCardId = (t, e = 1) => {
      if (this.DeckInfo) {
        if (this.DeckInfo.RemoveCard({
          CardId: t,
          RemoveCount: e
        })) {
          e = this.LibraryCardDataMap.get(t);
          t = this.DeckInfo.GetCardCount(t);
          e.LeftCount = e.MaxCount - t;
          this.CardLayout?.GetLayoutItemByKey(e.CardId)?.RefreshLeftCount();
          if (e.Cost === ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomArenaCardCoreCost()) {
            this.DeckSlotsPanel.RefreshCoreCardSlot();
          } else {
            this.DeckSlotsPanel.RefreshNormalCardSlot(undefined, true);
          }
          this.DeckSlotsPanel.RefreshCardSlotElements();
          this.RefreshElementTab();
          this.Fau();
          this.RefreshDeckFullTip();
          this.RefreshElementFullTip();
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("PhantomArena", 43, "移除卡牌异常");
        }
      }
    };
    this.QV1 = t => {
      this.KV1(t);
      this.XV1();
      this.YV1();
      this.zV1();
      this.JV1();
      this.RefreshElementFullTip();
    };
    this.ZV1 = () => {
      var t = new DeckBuilderElementTabItem_1.DeckBuilderElementTabItem();
      t.OnToggleSelect = this.QV1;
      return t;
    };
    this.Y5i = () => new DeckBuilderCardItem_1.DeckBuilderCardItem();
    this.t61 = t => {
      t = t.GetData();
      if (t) {
        this.RemoveCardSlotByCardId(t.CardId);
      }
    };
    this.Vlu = t => {
      var t = t.GetData();
      if (t) {
        t = {
          CurCardId: t.CardId,
          NeedOutlookTab: false
        };
        UiManager_1.UiManager.OpenView("DeckBuilderCardInfoView", t);
      }
    };
    this.i61 = t => false;
    this.ibu = t => {
      t = t.GetData();
      if (t) {
        this.RemoveCardSlotByCardId(t.CardId);
      }
    };
    this.rbu = t => {
      var t = t.GetData();
      if (t) {
        t = {
          CurCardId: t.CardId,
          NeedOutlookTab: false
        };
        UiManager_1.UiManager.OpenView("DeckBuilderCardInfoView", t);
      }
    };
    this.KTu = t => false;
    this.s61 = () => {
      if (this.MaxPage !== 0) {
        if (this.CurPage === this.MinPage) {
          this.CurPage = this.MaxPage;
        } else {
          this.CurPage--;
        }
        this.YV1();
        this.zV1();
        this.JV1();
      }
    };
    this.a61 = () => {
      if (this.MaxPage !== 0) {
        if (this.CurPage === this.MaxPage) {
          this.CurPage = this.MinPage;
        } else {
          this.CurPage++;
        }
        this.YV1();
        this.zV1();
        this.JV1();
      }
    };
    this.h61 = () => {
      var t;
      if (this.DeckInfo && this.DeckInfo.GetTotalCardCount() !== 0) {
        t = {
          EnabledElementSet: new Set(this.DeckInfo.GetElementSetWithPhysical()),
          DeleteFunc: t => {
            this.RemoveCardSlotByElements(t);
          }
        };
        UiManager_1.UiManager.OpenView("DeckBuilderCardDeleteView", t);
      } else {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("PhantomBattle_Delect_Empty");
      }
    };
    this.l61 = t => {
      this.IncludeLockedCard = t === 1;
      this.XV1();
      this.YV1();
      this.zV1();
      this.JV1();
    };
    this._61 = t => {
      this.CurCostFilter = t;
      this.XV1();
      this.YV1();
      this.zV1();
      this.JV1();
    };
    this.u61 = (t, e) => {
      this.CurSlotSortType = t;
      this.IsAscending = e;
      this.DeckSlotsPanel?.RefreshBySortContext({
        SortType: t,
        IsAscending: e
      });
    };
    this.PV1 = t => {
      var e = this.LibraryCardDataMap.get(t);
      if (e) {
        e.IsLocked = false;
        this.SNu(e);
        this.CardLayout?.GetLayoutItemByKey(t)?.Refresh(e);
      }
    };
    this.xiu = t => {
      var e = this.LibraryCardDataMap.get(t);
      if (e) {
        e.OutlookUnlocked = true;
        this.SNu(e);
        this.CardLayout?.GetLayoutItemByKey(t)?.Refresh(e);
        this.DeckSlotsPanel?.RefreshOutlookByCardId(t);
      }
    };
    this.vNu = t => {
      this.DeckSlotsPanel?.GamepadTriggerDeckBuilderCardInfoView(t);
    };
    this.A81 = () => {
      if (this.DeckInfo) {
        this.Efu();
      }
    };
    this.Efu = () => {
      var t;
      var e;
      if (this.DeckInfo) {
        t = ModelManager_1.ModelManager.PhantomArenaModel.ActivityId;
        if (this.DeckInfo.GetDeckServerId() < 0) {
          PhantomArenaController_1.PhantomArenaController.CardGroupAddRequest(this.DeckInfo.GetName(), this.DeckInfo.CoverToCardIdList(), t, t => {
            this.ViewModel?.UpdateEditableDeckList();
            t = ModelManager_1.ModelManager.PhantomArenaModel.GetDeckByDeckId(t);
            if (t) {
              this.ViewModel.ReportDeckCreate(t);
            }
            this.CloseMe();
          });
        } else {
          t = this.DeckInfo.GetDeckServerId();
          e = this.DeckInfo.CoverToCardIdList();
          PhantomArenaController_1.PhantomArenaController.CardGroupUpdateRequest(t, e, t => {
            this.ViewModel?.UpdateEditableDeckList();
            t = ModelManager_1.ModelManager.PhantomArenaModel.GetDeckByDeckId(t);
            if (t) {
              this.ViewModel.ReportDeckCover(t);
            }
            this.CloseMe();
          });
        }
      }
    };
    this.AMo = () => {
      var t;
      if (this.ViewModel) {
        if (this.ViewModel?.CheckCurEditDeckHasChange()) {
          (t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(314)).FunctionMap.set(1, () => {
            this.CloseMe();
          });
          t.FunctionMap.set(2, () => {
            this.A81();
          });
          t.IsEscViewTriggerCallBack = false;
          PhantomArenaController_1.PhantomArenaController.OpenPhantomArenaConfirmBoxView(t);
        } else {
          this.CloseMe();
        }
      }
    };
    this.TK1 = () => {
      var t = StringUtils_1.StringUtils.Format(MultiTextLang_1.configMultiTextLang.GetLocalTextNew("PhantomBattle_1077"));
      CommonInputViewController_1.CommonInputViewController.OpenSetPhantomArenaDeckName(t, async t => {
        var e;
        var i = this.DeckInfo?.GetDeckServerId() ?? -1;
        if (i < 0) {
          this.DeckInfo?.SetDeckName(t);
          this.DeckSlotsPanel.RefreshNameText();
          return Protocol_1.Aki.Protocol.Q4n.KRs;
        } else {
          e = ModelManager_1.ModelManager.PhantomArenaModel.ActivityId;
          if ((i = await PhantomArenaController_1.PhantomArenaController.CardGroupNameRequest(t, i, e)) === Protocol_1.Aki.Protocol.Q4n.KRs) {
            this.DeckInfo?.SetDeckName(t);
            this.DeckSlotsPanel.RefreshNameText();
          }
          return i;
        }
      }, this.DeckInfo?.GetName() ?? "");
    };
    this.RK1 = () => {
      var t = {
        ConfirmCallback: t => {
          let e = false;
          for (const i of t.GetCardSlotList()) {
            if (!ModelManager_1.ModelManager.PhantomArenaModel.IsCardUnlock(i.CardId)) {
              e = true;
              break;
            }
          }
          if (e) {
            ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("PhantomBattle_1080");
          }
          this.tY1(t);
          this.ViewModel.RecordQuicklyBuildClick(t.GetDeckConfigId());
        }
      };
      UiManager_1.UiManager.OpenView("DeckBuilderQuicklyBuildView", t);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UILoopScrollViewComponent], [1, UE.UIItem], [2, UE.UILayoutBase], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIText], [7, UE.UIButtonComponent], [8, UE.UIButtonComponent], [9, UE.UIItem], [10, UE.UIButtonComponent], [11, UE.UIButtonComponent], [12, UE.UIItem], [13, UE.UIButtonComponent], [14, UE.UIButtonComponent], [15, UE.UIItem], [16, UE.UIItem]];
    this.BtnBindInfo = [[7, this.s61], [8, this.a61], [10, this.RK1], [11, this.A81], [13, this.TK1], [14, this.h61]];
  }
  async OnBeforeStartAsync() {
    this.CurSelectedElementTabIndex = 0;
    this.IncludeLockedCard = false;
    this.TabDataList = this.c61();
    this.NV1 = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(0), this.GetItem(1).GetOwner(), this.ZV1);
    this.CardLayout = new GenericLayout_1.GenericLayout(this.GetLayoutBase(2), this.Y5i, undefined, true, false);
    this.CardFilterEntrance = new DeckBuilderSortFilterEntrance_1.DeckBuilderSortFilterEntrance(true);
    this.SlotSortEntrance = new DeckBuilderSortFilterEntrance_1.DeckBuilderSortFilterEntrance(false);
    this.DeckSlotsPanel = new DeckBuilderDeckSlotsPanel_1.DeckBuilderDeckSlotsPanel();
    await Promise.all([this.NV1.RefreshByDataAsync(this.TabDataList), this.CardFilterEntrance.CreateThenShowByActorAsync(this.GetItem(4).GetOwner()), this.SlotSortEntrance.CreateThenShowByActorAsync(this.GetItem(9).GetOwner()), this.DeckSlotsPanel.CreateThenShowByActorAsync(this.GetItem(12).GetOwner())]);
    this.CardFilterEntrance.OnResultCallBack = this._61;
    this.SlotSortEntrance.OnResultCallBack = this.u61;
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPhantomArenaCardUnlock, this.PV1);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPhantomArenaCardOutlookUnlock, this.xiu);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.GamepadTriggerCardInfo, this.vNu);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPhantomArenaCardUnlock, this.PV1);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPhantomArenaCardOutlookUnlock, this.xiu);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.GamepadTriggerCardInfo, this.vNu);
  }
  async OnBeforeShowAsyncImplement() {
    this.ViewModel.SetViewTitle?.("PhantomArenaDeckOverviewTabView_Name");
    this.ViewModel.SetViewHelpId?.(336);
    this.ViewModel.SetViewHelpBtnActive?.(true);
    this.ViewModel.SetViewIcon?.("SP_IconSoundRemnantArena3");
    this.DeckInfo = this.ViewModel?.GetCurEditDeck();
    if (this.DeckInfo) {
      this.Pj1();
      this.ShowLockedSwitchItem = this.ViewModel?.GetSwitchItem();
      this.ShowLockedSwitchItem?.SetActive(true);
      this.ShowLockedSwitchItem?.SetToggleState(false);
      this.ShowLockedSwitchItem?.SetOnStateChangedCallback(this.l61);
      this.DeckSlotsPanel?.SetMaskAreaEnabled(1, false);
      this.DeckSlotsPanel?.SetMaskAreaEnabled(2, false);
      this.d61();
      this.KV1(0);
      this.XV1();
      this.YV1();
      this.zV1();
      await this.yNu(false);
      this.LK1();
      this.RefreshElementTab();
      this.RefreshDeckFullTip();
      this.RefreshElementFullTip();
      this.f61();
      this.g61();
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("PhantomArena", 43, "当前编辑卡组不存在");
    }
  }
  async OnPlayingShowSequenceAsync() {
    this.CardLayout?.PlayGridAnim();
  }
  async OnPlayingStartSequenceAsync() {
    this.CardLayout?.PlayGridAnim();
  }
  OnBeforeHide() {
    this.xj1();
    this.ShowLockedSwitchItem?.SetActive(false);
    this.ShowLockedSwitchItem?.SetOnStateChangedCallback(undefined);
  }
  c61() {
    var t = [];
    for (const i of [0, 1, 2, 3, 4, 5, 6]) {
      var e = this.C61(i);
      t.push(e);
    }
    return t;
  }
  C61(t) {
    let e = undefined;
    var i;
    return e = t === 0 ? {
      TabType: 0,
      TabTexturePath: PhantomArenaDefine_1.CARD_ALL_ELEMENT_TAB_ICON_PATH,
      TabElementColor: PhantomArenaDefine_1.CARD_ALL_ELEMENT_TAB_COLOR,
      ShowRedDot: false,
      IsDisable: false,
      IsArrivedMax: false
    } : (i = PhantomArenaDefine_1.cardTabTypeToElementConfigId[t], {
      TabType: t,
      TabTexturePath: (t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleElementConfig(i)).TabIcon,
      TabElementColor: t.TabElementColor,
      ShowRedDot: false,
      IsDisable: false,
      IsArrivedMax: false
    });
  }
  d61() {
    this.LibraryCardDataList.length = 0;
    this.LibraryCardDataMap.clear();
    for (const r of ConfigManager_1.ConfigManager.PhantomArenaConfig.GetAllPhantomBattleCard()) {
      var t = r.Id;
      var e = r.Element;
      var i = r.InitAttack;
      var s = r.CardGroupNum;
      var h = s - this.DeckInfo.GetCardCount(t);
      var e = {
        CardId: t,
        CardFaceTexturePath: r.CardFaceTexture,
        Cost: r.Cost,
        Element: e,
        Attack: i.get(Protocol_1.Aki.Protocol.GC1.Proto_AttackAbility) ?? 0,
        Life: i.get(Protocol_1.Aki.Protocol.GC1.Proto_LifeAbility) ?? 0,
        IsLocked: !ModelManager_1.ModelManager.PhantomArenaModel.IsCardUnlock(t),
        LeftCount: h,
        MaxCount: s,
        AddCardToDeck: this.AddCardToDeck,
        DeckInfo: this.DeckInfo,
        OpenCardInfoView: this.jV1,
        CardSpineData: ModelManager_1.ModelManager.PhantomArenaModel.CreateCardSpineData(t),
        OutlookUnlocked: ModelManager_1.ModelManager.PhantomArenaModel.IsCardOutlookUnlock(t),
        CardFaceType: ModelManager_1.ModelManager.PhantomArenaModel.GetCardFaceType(t),
        Disabled: false,
        IsAllInDeck: false
      };
      this.SNu(e);
      this.LibraryCardDataList.push(e);
      this.LibraryCardDataMap.set(t, e);
    }
    this.LibraryCardDataList.sort(PhantomArenaDefine_1.cardSlotDefaultSortFunc);
  }
  XV1() {
    var t = {
      CostFilter: this.CurCostFilter,
      ElementFilter: this.TabDataList[this.CurSelectedElementTabIndex].TabType,
      IncludeLocked: this.IncludeLockedCard
    };
    this.AllPageCardDataList = ModelManager_1.ModelManager.PhantomArenaModel.FilterCardList(this.LibraryCardDataList, t);
    var t = Math.ceil(this.AllPageCardDataList.length / this.MaxCardCountPerPage);
    this.MaxPage = t;
    this.MinPage = Math.min(this.MaxPage, 1);
    this.CurPage = this.MinPage;
  }
  YV1() {
    this.CurPageCardDataList = this.AllPageCardDataList.slice((this.CurPage - 1) * this.MaxCardCountPerPage, this.CurPage * this.MaxCardCountPerPage);
  }
  zV1() {
    this.GetText(6).SetText(this.CurPage + "/" + this.MaxPage);
  }
  JV1() {
    var t = this.CurPageCardDataList.length === 0;
    this.CardLayout.RefreshByData(this.CurPageCardDataList, undefined, true);
    this.GetItem(5).SetUIActive(t);
  }
  async yNu(t) {
    var e = this.CurPageCardDataList.length === 0;
    await this.CardLayout.RefreshByDataAsync(this.CurPageCardDataList, t);
    this.GetItem(5).SetUIActive(e);
  }
  p61() {
    for (const t of this.LibraryCardDataList) {
      t.LeftCount = t.MaxCount - this.DeckInfo.GetCardCount(t.CardId);
      this.CardLayout?.GetLayoutItemByKey(t.CardId)?.RefreshLeftCount();
    }
  }
  SNu(t) {
    t.IsAllInDeck = t.LeftCount === 0;
    var e = {
      CardId: t.CardId,
      Cost: t.Cost,
      Element: t.Element,
      MaxCount: t.MaxCount,
      AddCount: 1
    };
    t.Disabled = this.DeckInfo.CheckCanAddCard(e) !== 0;
  }
  Fau() {
    for (const e of this.LibraryCardDataList) {
      this.SNu(e);
      var t = this.CardLayout?.GetLayoutItemByKey(e.CardId);
      if (t) {
        t.RefreshAllInDeckComponent();
        t.RefreshDisabledComponent();
      }
    }
  }
  LK1() {
    var t = {
      DeckInfo: this.DeckInfo,
      SlotLongPressTime: ConfigManager_1.ConfigManager.PhantomArenaConfig.GetSlotLongPressTime(ModelManager_1.ModelManager.PhantomArenaModel.ActivityId),
      OnCoreSlotItemSortClick: this.ibu,
      OnCoreSlotItemLongPress: this.rbu,
      CanCoreSlotItemToggleChange: this.KTu,
      OnNormalSlotItemSortClick: this.t61,
      OnNormalSlotItemLongPress: this.Vlu,
      CanNormalSlotItemToggleChange: this.i61,
      SortContext: {
        SortType: this.CurSlotSortType,
        IsAscending: this.IsAscending
      },
      ShowLocked: false,
      ShowOutlook: true
    };
    this.DeckSlotsPanel?.RefreshByData(t);
  }
  RefreshElementTab() {
    var t = this.DeckInfo.GetElementList();
    for (const i of this.TabDataList) {
      if (i.TabType === 0) {
        i.IsArrivedMax = this.DeckInfo.IsDeckFull();
      } else {
        const s = PhantomArenaDefine_1.cardTabTypeToElementConfigId[i.TabType];
        var e = this.DeckInfo.CheckCanAddElement(s);
        i.IsDisable = !e;
        i.ShowRedDot = t.findIndex(t => t === s) !== -1;
      }
    }
    this.NV1?.RefreshAllGridProxies();
  }
  RefreshElementFullTip() {
    var t = this.TabDataList[this.CurSelectedElementTabIndex].TabType;
    var t = PhantomArenaDefine_1.cardTabTypeToElementConfigId[t];
    this.GetItem(16).SetUIActive(t !== undefined && !this.DeckInfo.CheckCanAddElement(t));
  }
  RefreshDeckFullTip() {
    this.GetItem(15).SetUIActive(this.DeckInfo.IsDeckFull());
  }
  RemoveCardSlotByElements(t) {
    if (this.DeckInfo) {
      if (this.DeckInfo.RemoveCardByElements(t)) {
        this.p61();
        this.Fau();
        this.DeckSlotsPanel.RefreshCardSlot();
        this.DeckSlotsPanel.RefreshCardSlotElements();
        this.RefreshElementTab();
        this.RefreshDeckFullTip();
        this.RefreshElementFullTip();
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("PhantomArena", 43, "移除卡牌异常");
      }
    }
  }
  RemoveAllCardSlot() {
    if (this.DeckInfo) {
      if (this.DeckInfo.RemoveAllCard()) {
        this.p61();
        this.Fau();
        this.DeckSlotsPanel.RefreshCardSlot();
        this.DeckSlotsPanel.RefreshCardSlotElements();
        this.RefreshElementTab();
        this.RefreshDeckFullTip();
        this.RefreshElementFullTip();
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("PhantomArena", 43, "移除卡牌异常");
      }
    }
  }
  KV1(t) {
    this.CurSelectedElementTabIndex = t;
    this.NV1?.SelectGridProxy(t);
  }
  f61() {
    var t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetAllPhantomBattleCardFilter();
    var e = [];
    for (const s of t) {
      var i = {
        ConfigId: s.Id,
        Name: s.Name
      };
      e.push(i);
    }
    this.CardFilterEntrance.UpdateDataList(e);
    t = t.findIndex(t => t.Id === this.CurCostFilter);
    this.CardFilterEntrance.SelectItemByIndex(t, false);
  }
  g61() {
    var t = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetAllPhantomBattleCardSlotSort();
    var e = [];
    for (const s of t) {
      var i = {
        ConfigId: s.Id,
        Name: s.Name
      };
      e.push(i);
    }
    this.SlotSortEntrance.UpdateDataList(e);
    t = t.findIndex(t => t.Id === this.CurSlotSortType);
    this.SlotSortEntrance.SelectItemByIndex(t, false);
    this.SlotSortEntrance.ChangeSortAscending(this.IsAscending, true, false);
  }
  Pj1() {
    if (this.ViewModel) {
      this.ViewModel.SetOverrideCloseFunc(this.AMo);
    }
  }
  xj1() {
    if (this.ViewModel) {
      this.ViewModel.ResetOverrideCloseFunc();
    }
  }
  tY1(t) {
    this.DeckInfo?.RemoveAllCard();
    for (const i of t.GetCardSlotList()) {
      var e;
      if (ModelManager_1.ModelManager.PhantomArenaModel.IsCardUnlock(i.CardId)) {
        e = {
          CardId: i.CardId,
          Cost: i.Cost,
          Element: i.Element,
          MaxCount: i.Count,
          AddCount: i.Count
        };
        this.DeckInfo?.AddCard(e);
      }
    }
    this.p61();
    this.Fau();
    this.LK1();
    this.RefreshElementTab();
    this.RefreshDeckFullTip();
    this.RefreshElementFullTip();
  }
  OnBeforeDestroy() {
    this.ViewModel?.EndEditDeck();
  }
  GetGuideUiItemAndUiItemForShowEx(t) {
    var e;
    var i;
    if (t && t.length !== 0) {
      if ((e = t[0]) === "Card") {
        i = Number(t[1]);
        if (i = this.CardLayout?.GetLayoutItemByIndex(i)?.GetRootItem()) {
          return [i, i];
        } else {
          return undefined;
        }
      } else if (e === "CardDetail" || e === "New:CardDetail") {
        i = Number(t[1]);
        return this.CardLayout?.GetLayoutItemByIndex(i)?.GetGuideUiItemAndUiItemForShowEx(t);
      } else if (e === "CardInGroup") {
        return this.DeckSlotsPanel?.GetGuideUiItemAndUiItemForShowEx(t);
      } else {
        return undefined;
      }
    }
  }
}
exports.PhantomArenaDeckBuilderTabView = PhantomArenaDeckBuilderTabView;
//# sourceMappingURL=PhantomArenaDeckBuilderTabView.js.map