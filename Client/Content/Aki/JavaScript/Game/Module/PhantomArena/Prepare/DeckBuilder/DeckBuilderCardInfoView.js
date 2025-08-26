"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeckBuilderCardInfoView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const DeckBuilderCardDetailPanel_1 = require("./DeckBuilderCardDetailPanel");
const DeckBuilderCardInfoTabItem_1 = require("./DeckBuilderCardInfoTabItem");
const DeckBuilderCardOutlookUnlockPanel_1 = require("./DeckBuilderCardOutlookUnlockPanel");
class TabData {
  constructor() {
    this.TabIndex = 0;
    this.TabNameTextId = "";
    this.Panel = undefined;
    this.SequencePlayer = undefined;
    this.OnShow = undefined;
  }
}
class DeckBuilderCardInfoView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Data = undefined;
    this.TabItemDataList = undefined;
    this.TabDataList = undefined;
    this.DetailPanelData = undefined;
    this.OutlookUnlockPanelData = undefined;
    this.cs1 = undefined;
    this.Piu = undefined;
    this.B7t = undefined;
    this.lqe = undefined;
    this.Hwn = () => new DeckBuilderCardInfoTabItem_1.DeckBuilderCardInfoTabItem();
    this.XA1 = i => {
      this.Qou(i, true);
    };
    this.YA1 = () => {};
    this.zA1 = () => {};
    this.JA1 = () => {
      var i;
      if (this.Data && this.Data.CardList && this.Data.CurCardIndex !== undefined) {
        i = this.Data.CurCardIndex === 0 ? this.Data.CardList.length - 1 : this.Data.CurCardIndex - 1;
        this.Data.CurCardIndex = i;
        this.RefreshView();
        this.sFe();
      }
    };
    this.ZA1 = () => {
      var i;
      if (this.Data && this.Data.CardList && this.Data.CurCardIndex !== undefined) {
        i = this.Data.CurCardIndex === this.Data.CardList.length - 1 ? 0 : this.Data.CurCardIndex + 1;
        this.Data.CurCardIndex = i;
        this.RefreshView();
        this.sFe();
      }
    };
    this.AMo = () => {
      this.CloseMe();
    };
    this.PV1 = i => {
      if (i === this.Data.CurCardId) {
        this.RefreshView();
      }
    };
    this.xiu = i => {
      if (i === this.Data.CurCardId) {
        this.RefreshView();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UILayoutBase], [1, UE.UIItem], [2, UE.UIButtonComponent], [3, UE.UIButtonComponent], [4, UE.UIItem]];
    this.BtnBindInfo = [[2, this.JA1], [3, this.ZA1]];
  }
  async OnBeforeStartAsync() {
    var i = this.OpenParam;
    this.Data = i;
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem();
    this.lqe.SetCloseCallBack(this.AMo);
    this.cs1 = new DeckBuilderCardDetailPanel_1.DeckBuilderCardDetailPanel();
    this.Piu = new DeckBuilderCardOutlookUnlockPanel_1.DeckBuilderCardOutlookUnlockPanel();
    this.B7t = new GenericLayout_1.GenericLayout(this.GetLayoutBase(0), this.Hwn);
    this.TabDataList = [];
    var t = new TabData();
    t.TabNameTextId = "PhantomBattle_1013";
    t.Panel = this.cs1;
    t.SequencePlayer = this.cs1;
    t.OnShow = this.YA1;
    this.TabDataList.push(t);
    if (i.NeedOutlookTab) {
      (t = new TabData()).TabNameTextId = "PhantomBattle_1014";
      t.Panel = this.Piu;
      t.SequencePlayer = this.Piu;
      t.OnShow = this.zA1;
      this.TabDataList.push(t);
    }
    this.TabItemDataList = new Array(this.TabDataList.length);
    for (let i = 0; i < this.TabDataList.length; i++) {
      var e = this.TabDataList[i];
      e.TabIndex = i;
      var s = new DeckBuilderCardInfoTabItem_1.DeckBuilderCardInfoTabItemData();
      s.TabIndex = i;
      s.TabNameTextId = e.TabNameTextId;
      s.OnSelect = this.XA1;
      this.TabItemDataList[i] = s;
    }
    await Promise.all([this.cs1.CreateByResourceIdAsync("UiItem_CardDetail", this.GetItem(4)), this.Piu.CreateByResourceIdAsync("UiItem_CardLevelUp", this.GetItem(4)), this.B7t.RefreshByDataAsync(this.TabItemDataList), this.lqe.CreateThenShowByActorAsync(this.GetItem(1).GetOwner())]);
    if (i.CurrencyId) {
      await this.lqe.SetCurrencyItemList([i.CurrencyId]);
    }
    t = i.DeckInfo !== undefined;
    this.GetButton(2).RootUIComp.SetUIActive(t);
    this.GetButton(3).RootUIComp.SetUIActive(t);
  }
  OnStart() {
    this.RefreshView();
    this.Qou(0, false);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPhantomArenaCardUnlock, this.PV1);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPhantomArenaCardOutlookUnlock, this.xiu);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPhantomArenaCardUnlock, this.PV1);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPhantomArenaCardOutlookUnlock, this.xiu);
  }
  OnBeforeShow() {
    var i = this.Data.SelectedTabIndex;
    if (i !== undefined && i >= 0) {
      this.TabDataList[i].SequencePlayer?.PlayShowSequence();
    }
  }
  RefreshView() {
    if (this.Data) {
      let i = 0;
      let t = undefined;
      if (this.Data.CardList && this.Data.CurCardIndex !== undefined) {
        t = this.Data.CardList[this.Data.CurCardIndex];
        i = t.CardId;
        this.Data.CurCardId = i;
      } else {
        i = this.Data.CurCardId;
      }
      var e;
      var s = {
        DeckInfo: this.Data.DeckInfo,
        CardItemData: ModelManager_1.ModelManager.PhantomArenaModel.GetDetailViewCardData(i),
        EntryIdList: ModelManager_1.ModelManager.PhantomArenaModel.GetDetailViewEntryData(i),
        DetailItemData: ModelManager_1.ModelManager.PhantomArenaModel.GetDetailViewDetailItemData(i),
        IsCardUnlocked: ModelManager_1.ModelManager.PhantomArenaModel.IsCardUnlock(i)
      };
      if (this.Data.DeckInfo) {
        e = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(i);
        s.CurrencyId = e.UnlockConsumeItems[0].ItemId;
        s.UnlockCost = e.UnlockConsumeItems[0].Count;
        s.CardLimit = e.CardGroupNum;
      }
      if (this.Data.AddCardToDeck && t) {
        s.AddCardToDeck = () => {
          if (t) {
            this.Data?.AddCardToDeck?.(t, 1);
          }
        };
      }
      if (this.Data.RemoveCardFromDeck) {
        s.RemoveCardFromDeck = () => {
          this.Data?.RemoveCardFromDeck?.(i, 1);
        };
      }
      this.DetailPanelData = s;
      this.cs1?.Refresh(s);
      if (this.Data.NeedOutlookTab) {
        e = {
          CardId: i
        };
        this.OutlookUnlockPanelData = e;
        this.Piu?.Refresh(e);
      }
    }
  }
  Qou(i, t) {
    var e = this.Data.SelectedTabIndex;
    if (e !== undefined && e >= 0) {
      this.TabDataList[e].Panel?.SetActive(false);
    }
    this.Data.SelectedTabIndex = i;
    this.B7t?.SelectGridProxy(i);
    var e = this.TabDataList[i];
    e.Panel.SetActive(true);
    e.OnShow?.();
    if (t) {
      e.SequencePlayer?.PlayShowSequence();
    }
  }
  sFe() {
    if (this.Data.SelectedTabIndex !== undefined) {
      this.TabDataList[this.Data.SelectedTabIndex].SequencePlayer?.PlaySwitchSequence();
    }
  }
  GetGuideUiItemAndUiItemForShowEx(i) {
    if (i && !(i.length <= 0) && i[0] === "UnlockCard") {
      return this.cs1?.GetGuideUiItemAndUiItemForShowEx(i);
    } else {
      return undefined;
    }
  }
}
exports.DeckBuilderCardInfoView = DeckBuilderCardInfoView;
//# sourceMappingURL=DeckBuilderCardInfoView.js.map