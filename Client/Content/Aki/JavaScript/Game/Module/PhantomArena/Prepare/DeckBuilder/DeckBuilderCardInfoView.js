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
    this.XA1 = t => {
      this.Qou(t, true);
    };
    this.YA1 = () => {};
    this.zA1 = () => {};
    this.JA1 = () => {
      var t;
      if (this.Data && this.Data.CardList && this.Data.CurCardIndex !== undefined) {
        t = this.Data.CurCardIndex === 0 ? this.Data.CardList.length - 1 : this.Data.CurCardIndex - 1;
        this.Data.CurCardIndex = t;
        this.RefreshView();
        this.sFe();
      }
    };
    this.ZA1 = () => {
      var t;
      if (this.Data && this.Data.CardList && this.Data.CurCardIndex !== undefined) {
        t = this.Data.CurCardIndex === this.Data.CardList.length - 1 ? 0 : this.Data.CurCardIndex + 1;
        this.Data.CurCardIndex = t;
        this.RefreshView();
        this.sFe();
      }
    };
    this.AMo = () => {
      this.CloseMe();
    };
    this.PV1 = t => {
      if (t === this.Data.CurCardId) {
        this.RefreshView();
      }
    };
    this.xiu = t => {
      if (t === this.Data.CurCardId) {
        this.RefreshView();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UILayoutBase], [1, UE.UIItem], [2, UE.UIButtonComponent], [3, UE.UIButtonComponent], [4, UE.UIItem], [5, UE.UIItem]];
    this.BtnBindInfo = [[2, this.JA1], [3, this.ZA1]];
  }
  async OnBeforeStartAsync() {
    var t = this.OpenParam;
    this.Data = t;
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem();
    this.lqe.SetCloseCallBack(this.AMo);
    var i = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(t.CurCardId).ActivityId;
    var i = ModelManager_1.ModelManager.PhantomArenaModel.IsNewPhantomArenaActivity(i);
    this.cs1 = new DeckBuilderCardDetailPanel_1.DeckBuilderCardDetailPanel();
    this.cs1.IsNewPhantomArenaActivity = i;
    this.Piu = new DeckBuilderCardOutlookUnlockPanel_1.DeckBuilderCardOutlookUnlockPanel();
    this.B7t = new GenericLayout_1.GenericLayout(this.GetLayoutBase(0), this.Hwn);
    this.TabDataList = [];
    var e = new TabData();
    e.TabNameTextId = "PhantomBattle_1013";
    e.Panel = this.cs1;
    e.SequencePlayer = this.cs1;
    e.OnShow = this.YA1;
    this.TabDataList.push(e);
    if (t.NeedOutlookTab) {
      (e = new TabData()).TabNameTextId = "PhantomBattle_1014";
      e.Panel = this.Piu;
      e.SequencePlayer = this.Piu;
      e.OnShow = this.zA1;
      this.TabDataList.push(e);
    }
    this.TabItemDataList = new Array(this.TabDataList.length);
    for (let t = 0; t < this.TabDataList.length; t++) {
      var s = this.TabDataList[t];
      s.TabIndex = t;
      var h = new DeckBuilderCardInfoTabItem_1.DeckBuilderCardInfoTabItemData();
      h.TabIndex = t;
      h.TabNameTextId = s.TabNameTextId;
      h.OnSelect = this.XA1;
      this.TabItemDataList[t] = h;
    }
    e = [];
    if (i) {
      e.push(this.cs1.CreateByResourceIdAsync("UiItem_CardDetailNew", this.GetItem(4)));
    } else {
      e.push(this.cs1.CreateByResourceIdAsync("UiItem_CardDetail", this.GetItem(4)));
      e.push(this.Piu.CreateByResourceIdAsync("UiItem_CardLevelUp", this.GetItem(4)));
    }
    e.push(this.B7t.RefreshByDataAsync(this.TabItemDataList));
    e.push(this.lqe.CreateThenShowByActorAsync(this.GetItem(1).GetOwner()));
    await Promise.all(e);
    if (t.CurrencyId) {
      await this.lqe.SetCurrencyItemList([t.CurrencyId]);
    }
    e = t.NeedOutlookTab;
    this.GetButton(2).RootUIComp.SetUIActive(e);
    this.GetButton(3).RootUIComp.SetUIActive(e);
    this.GetItem(5)?.SetUIActive(!i);
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
    var t = this.Data.SelectedTabIndex;
    if (t !== undefined && t >= 0) {
      this.TabDataList[t].SequencePlayer?.PlayShowSequence();
    }
  }
  RefreshView() {
    if (this.Data) {
      let t = 0;
      if (this.Data.CardList && this.Data.CurCardIndex !== undefined) {
        e = this.Data.CardList[this.Data.CurCardIndex];
        t = e.CardId;
        this.Data.CurCardId = t;
      } else {
        t = this.Data.CurCardId;
      }
      var i;
      var e = {
        DeckInfo: this.Data.DeckInfo,
        CardItemData: ModelManager_1.ModelManager.PhantomArenaModel.GetDetailViewCardData(t),
        EntryIdList: ModelManager_1.ModelManager.PhantomArenaModel.GetDetailViewEntryData(t),
        DetailItemData: ModelManager_1.ModelManager.PhantomArenaModel.GetDetailViewDetailItemData(t, this.Data.DeckInfo),
        IsCardUnlocked: ModelManager_1.ModelManager.PhantomArenaModel.IsCardUnlock(t)
      };
      if (this.Data.DeckInfo) {
        i = ConfigManager_1.ConfigManager.PhantomArenaConfig.GetPhantomBattleCardConfig(t);
        e.CurrencyId = i.UnlockConsumeItems[0].ItemId;
        e.UnlockCost = i.UnlockConsumeItems[0].Count;
        e.CardLimit = i.CardGroupNum;
      }
      if (this.Data.AddCardToDeck) {
        e.AddCardToDeck = () => {
          this.Data?.AddCardToDeck?.(t, 1);
        };
      }
      if (this.Data.RemoveCardFromDeck) {
        e.RemoveCardFromDeck = () => {
          this.Data?.RemoveCardFromDeck?.(t, 1);
        };
      }
      this.DetailPanelData = e;
      this.cs1?.Refresh(e);
      if (this.Data.NeedOutlookTab) {
        i = {
          CardId: t
        };
        this.OutlookUnlockPanelData = i;
        this.Piu?.Refresh(i);
      }
    }
  }
  Qou(t, i) {
    var e = this.Data.SelectedTabIndex;
    if (e !== undefined && e >= 0) {
      this.TabDataList[e].Panel?.SetActive(false);
    }
    this.Data.SelectedTabIndex = t;
    this.B7t?.SelectGridProxy(t);
    var e = this.TabDataList[t];
    e.Panel.SetActive(true);
    e.OnShow?.();
    if (i) {
      e.SequencePlayer?.PlayShowSequence();
    }
  }
  sFe() {
    if (this.Data.SelectedTabIndex !== undefined) {
      this.TabDataList[this.Data.SelectedTabIndex].SequencePlayer?.PlaySwitchSequence();
    }
  }
  GetGuideUiItemAndUiItemForShowEx(t) {
    if (t && !(t.length <= 0) && t[0] === "UnlockCard") {
      return this.cs1?.GetGuideUiItemAndUiItemForShowEx(t);
    } else {
      return undefined;
    }
  }
}
exports.DeckBuilderCardInfoView = DeckBuilderCardInfoView;
//# sourceMappingURL=DeckBuilderCardInfoView.js.map