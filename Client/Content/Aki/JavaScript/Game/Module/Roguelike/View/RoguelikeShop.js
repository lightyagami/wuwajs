"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoguelikeShop = undefined;
const UE = require("ue");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem");
const UiManager_1 = require("../../../Ui/UiManager");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
const LguiUtil_1 = require("../../Util/LguiUtil");
const LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView");
const RoguelikeDefine_1 = require("../Define/RoguelikeDefine");
const RogueSelectResult_1 = require("../Define/RogueSelectResult");
const RoguelikeController_1 = require("../RoguelikeController");
const ElementPanel_1 = require("./ElementPanel");
const RogueInfoViewTokenDetail_1 = require("./RogueInfoViewTokenDetail");
const RoguelikeShopDetail_1 = require("./RoguelikeShopDetail");
class RoguelikeShop extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.LoopScrollView = undefined;
    this.ElementPanel = undefined;
    this.ShopDetailPanel = undefined;
    this.Data = undefined;
    this.ShopIndex = 0;
    this.LevelSequencePlayer = undefined;
    this.CaptionItem = undefined;
    this.vlo = () => {
      var e = this.Data.CostCurrency;
      if (e.length > 0) {
        e = e[0];
        if (!(ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(e.s5n) >= e.m9n)) {
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("RogueSpecialRefreshCost_NotEnough");
          return;
        }
      }
      RoguelikeController_1.RoguelikeController.RoguelikeRefreshGainRequest(Protocol_1.Aki.Protocol.s8s.Proto_ShopBindId);
    };
    this.Mlo = () => {
      RoguelikeController_1.RoguelikeController.OpenRogueInfoView();
    };
    this.Elo = (e, i, t) => {
      this.Slo(this.ShopIndex);
      this.ElementPanel?.Refresh();
      this.CaptionItem?.SetCurrencyItemList([RoguelikeDefine_1.INSIDE_CURRENCY_ID]);
      UiManager_1.UiManager.OpenView("CommonSelectResultView", new RogueSelectResult_1.RogueSelectResult(ModelManager_1.ModelManager.RoguelikeModel.RogueInfo?.PhantomEntry, i, e, true));
    };
    this.bho = (e, i) => {
      ModelManager_1.ModelManager.RoguelikeModel.CurrentRogueGainEntry = e;
      this.LoopScrollView.SelectGridProxy(i, false);
      this.ShopDetailPanel.Refresh(e);
    };
    this.Slo = e => {
      this.ShopIndex = e;
      this.Data = ModelManager_1.ModelManager.RoguelikeModel.GetRoguelikeChooseDataById(e);
      this.UpdateItemList();
      this.DDn();
    };
    this.Oho = () => {
      return new RogueInfoViewTokenDetail_1.RogueInfoViewTokenDetailGrid();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[5, UE.UILoopScrollViewComponent], [6, UE.UIItem], [1, UE.UIItem], [3, UE.UIButtonComponent], [2, UE.UIItem], [0, UE.UIItem], [4, UE.UIText], [7, UE.UITexture], [8, UE.UIText], [9, UE.UIButtonComponent]];
    this.BtnBindInfo = [[3, this.vlo], [9, this.Mlo]];
  }
  OnAfterShow() {
    this.LevelSequencePlayer.PlayLevelSequenceByName("Show");
    this.Slo(this.ShopIndex);
  }
  async OnBeforeStartAsync() {
    this.ElementPanel = new ElementPanel_1.ElementPanel();
    await this.ElementPanel.CreateThenShowByActorAsync(this.GetItem(2).GetOwner());
    this.ShopDetailPanel = new RoguelikeShopDetail_1.RoguelikeShopDetail();
    await this.ShopDetailPanel.CreateThenShowByActorAsync(this.GetItem(1).GetOwner());
    this.CaptionItem = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    this.CaptionItem.SetCloseCallBack(() => {
      UiManager_1.UiManager.CloseView(this.Info.Name);
    });
    await this.CaptionItem.SetCurrencyItemList([RoguelikeDefine_1.INSIDE_CURRENCY_ID]);
  }
  OnStart() {
    this.ElementPanel.Refresh();
    this.LoopScrollView = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(5), this.GetItem(6).GetOwner(), this.Oho);
    this.Data = this.OpenParam;
    this.ShopIndex = this.Data.Index;
    this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetRootItem());
    this.UpdateItemList();
    this.DDn();
  }
  UpdateItemList() {
    var e = this.Data.RogueGainEntryList;
    e.sort((e, i) => e.IsSell !== i.IsSell ? e.IsSell ? 1 : -1 : e.IsDiscounted() !== i.IsDiscounted() ? e.IsDiscounted() ? -1 : 1 : e.IsDiscounted() && i.IsDiscounted() ? e.CurrentPrice - i.CurrentPrice : e.IsDiscounted() || i.IsDiscounted() ? e.Index - i.Index : e.OriginalPrice - i.OriginalPrice);
    this.LoopScrollView.RefreshByData(e);
    if (this.Data.RogueGainEntryList.length > 0) {
      ModelManager_1.ModelManager.RoguelikeModel.CurrentRogueGainEntry = this.Data.RogueGainEntryList[0];
      this.LoopScrollView.SelectGridProxy(0, false);
      this.ShopDetailPanel.Refresh(this.Data.RogueGainEntryList[0]);
    }
  }
  DDn() {
    var e = this.Data.UseTime;
    var i = this.Data.MaxTime;
    this.GetButton(3).RootUIComp.SetUIActive(i > 0);
    var e = i - e;
    const t = this.GetText(4);
    if (e <= 0) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(t, "RoguelikeView_29_Text", e, i);
    } else {
      LguiUtil_1.LguiUtil.SetLocalTextNew(t, "RoguelikeView_28_Text", e, i);
    }
    e = this.Data.CostCurrency;
    if (e.length > 0) {
      i = e[0];
      const t = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(i.s5n) >= i.m9n ? "RogueSpecialRefreshCost" : "RogueSpecialRefreshCost_Not";
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), t, i.m9n);
      e = ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueCurrencyConfig(i.s5n);
      this.SetTextureByPath(e.IconSmall, this.GetTexture(7));
    }
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RoguelikeInfoSelectedToken, this.bho);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RoguelikeRefreshGain, this.Slo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RoguelikeChooseDataResult, this.Elo);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RoguelikeInfoSelectedToken, this.bho);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RoguelikeRefreshGain, this.Slo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RoguelikeChooseDataResult, this.Elo);
  }
  OnBeforeHide() {
    this.LevelSequencePlayer.PlayLevelSequenceByName("Hide");
  }
}
exports.RoguelikeShop = RoguelikeShop;
//# sourceMappingURL=RoguelikeShop.js.map