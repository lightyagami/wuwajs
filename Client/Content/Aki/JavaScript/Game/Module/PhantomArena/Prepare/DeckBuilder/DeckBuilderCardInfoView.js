"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.DeckBuilderCardInfoView = void 0;
const UE = require("ue"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem"),
  GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
  DeckBuilderCardDetailPanel_1 = require("./DeckBuilderCardDetailPanel"),
  DeckBuilderCardInfoTabItem_1 = require("./DeckBuilderCardInfoTabItem"),
  DeckBuilderCardOutlookUnlockPanel_1 = require("./DeckBuilderCardOutlookUnlockPanel");
class TabData {
  constructor() {
    this.TabIndex = 0, this.TabNameTextId = "", this.Panel = void 0, this.SequencePlayer = void 0, this.OnShow = void 0
  }
}
class DeckBuilderCardInfoView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments), this.Data = void 0, this.TabItemDataList = void 0, this.TabDataList = void 0, this.DetailPanelData = void 0, this.OutlookUnlockPanelData = void 0, this.$n1 = void 0, this._tu = void 0, this.B7t = void 0, this.lqe = void 0, this.Hwn = () => new DeckBuilderCardInfoTabItem_1.DeckBuilderCardInfoTabItem, this.SA1 = i => {
      this.Btu(i, !0)
    }, this.MA1 = () => {}, this.EA1 = () => {}, this.IA1 = () => {
      var i;
      this.Data && this.Data.CardList && void 0 !== this.Data.CurCardIndex && (i = 0 === this.Data.CurCardIndex ? this.Data.CardList.length - 1 : this.Data.CurCardIndex - 1, this.Data.CurCardIndex = i, this.RefreshView(), this.sFe())
    }, this.TA1 = () => {
      var i;
      this.Data && this.Data.CardList && void 0 !== this.Data.CurCardIndex && (i = this.Data.CurCardIndex === this.Data.CardList.length - 1 ? 0 : this.Data.CurCardIndex + 1, this.Data.CurCardIndex = i, this.RefreshView(), this.sFe())
    }, this.AMo = () => {
      this.CloseMe()
    }, this.eV1 = i => {
      i === this.Data.CurCardId && this.RefreshView()
    }, this.utu = i => {
      i === this.Data.CurCardId && this.RefreshView()
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UILayoutBase],
      [1, UE.UIItem],
      [2, UE.UIButtonComponent],
      [3, UE.UIButtonComponent],
      [4, UE.UIItem]
    ], this.BtnBindInfo = [
      [2, this.IA1],
      [3, this.TA1]
    ]
  }
  async OnBeforeStartAsync() {
    var i = this.OpenParam,
      t = (this.Data = i, this.lqe = new PopupCaptionItem_1.PopupCaptionItem, this.lqe.SetCloseCallBack(this.AMo), this.$n1 = new DeckBuilderCardDetailPanel_1.DeckBuilderCardDetailPanel, this._tu = new DeckBuilderCardOutlookUnlockPanel_1.DeckBuilderCardOutlookUnlockPanel, this.B7t = new GenericLayout_1.GenericLayout(this.GetLayoutBase(0), this.Hwn), this.TabDataList = [], new TabData);
    t.TabNameTextId = "PhantomBattle_1013", t.Panel = this.$n1, t.SequencePlayer = this.$n1, t.OnShow = this.MA1, this.TabDataList.push(t), i.NeedOutlookTab && ((t = new TabData).TabNameTextId = "PhantomBattle_1014", t.Panel = this._tu, t.SequencePlayer = this._tu, t.OnShow = this.EA1, this.TabDataList.push(t)), this.TabItemDataList = new Array(this.TabDataList.length);
    for (let i = 0; i < this.TabDataList.length; i++) {
      var e = this.TabDataList[i],
        s = (e.TabIndex = i, new DeckBuilderCardInfoTabItem_1.DeckBuilderCardInfoTabItemData);
      s.TabIndex = i, s.TabNameTextId = e.TabNameTextId, s.OnSelect = this.SA1, this.TabItemDataList[i] = s
    }
    await Promise.all([this.$n1.CreateByResourceIdAsync("UiItem_CardDetail", this.GetItem(4)), this._tu.CreateByResourceIdAsync("UiItem_CardLevelUp", this.GetItem(4)), this.B7t.RefreshByDataAsync(this.TabItemDataList), this.lqe.CreateThenShowByActorAsync(this.GetItem(1).GetOwner())]), i.CurrencyId && await this.lqe.SetCurrencyItemList([i.CurrencyId]);
    t = void 0 !== i.DeckInfo;
    this.GetButton(2).RootUIComp.SetUIActive(t), this.GetButton(3).RootUIComp.SetUIActive(t)
  }
  OnStart() {
    this.RefreshView(), this.Btu(0, !1)
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPhantomArenaCardUnlock, this.eV1), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPhantomArenaCardOutlookUnlock, this.utu)
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPhantomArenaCardUnlock, this.eV1), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPhantomArenaCardOutlookUnlock, this.utu)
  }
  OnBeforeShow() {
    var i = this.Data.SelectedTabIndex;
    void 0 !== i && 0 <= i && this.TabDataList[i].SequencePlayer?.PlayShowSequence()
  }
  RefreshView() {
    if (this.Data) {
      let i = 0,
        t = void 0;
      this.Data.CardList && void 0 !== this.Data.CurCardIndex ? (t = this.Data.CardList[this.Data.CurCardIndex], i = t.CardId, this.Data.CurCardId = i) : i = this.Data.CurCardId;
      var e, s = {
        DeckInfo: this.Data.DeckInfo,
        CardItemData: ModelManager_1.ModelManager.PhantomArenaModel.GetDetailViewCardData(i),
        EntryIdList: ModelManager_1.ModelManager.PhantomArenaModel.GetDetailViewEntryData(i),
        DetailItemData: ModelManager_1.ModelManager.PhantomArenaModel.GetDetailViewDetailItemData(i),
        IsCardUnlocked: ModelManager_1.ModelManager.PhantomArenaModel.IsCardUnlock(i)
      };
      this.Data.DeckInfo && (e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(i), s.CurrencyId = e.UnlockConsumeItems[0].ItemId, s.UnlockCost = e.UnlockConsumeItems[0].Count, s.CardLimit = e.CardGroupNum), this.Data.AddCardToDeck && t && (s.AddCardToDeck = () => {
        t && this.Data?.AddCardToDeck?.(t, 1)
      }), this.Data.RemoveCardFromDeck && (s.RemoveCardFromDeck = () => {
        this.Data?.RemoveCardFromDeck?.(i, 1)
      }), this.DetailPanelData = s, this.$n1?.Refresh(s), this.Data.NeedOutlookTab && (e = {
        CardId: i
      }, this.OutlookUnlockPanelData = e, this._tu?.Refresh(e))
    }
  }
  Btu(i, t) {
    var e = this.Data.SelectedTabIndex,
      e = (void 0 !== e && 0 <= e && this.TabDataList[e].Panel?.SetActive(!1), this.Data.SelectedTabIndex = i, this.B7t?.SelectGridProxy(i), this.TabDataList[i]);
    e.Panel.SetActive(!0), e.OnShow?.(), t && e.SequencePlayer?.PlayShowSequence()
  }
  sFe() {
    void 0 !== this.Data.SelectedTabIndex && this.TabDataList[this.Data.SelectedTabIndex].SequencePlayer?.PlaySwitchSequence()
  }
  GetGuideUiItemAndUiItemForShowEx(i) {
    return i && !(i.length <= 0) && "UnlockCard" === i[0] ? this.$n1?.GetGuideUiItemAndUiItemForShowEx(i) : void 0
  }
}
exports.DeckBuilderCardInfoView = DeckBuilderCardInfoView;
//# sourceMappingURL=DeckBuilderCardInfoView.js.map