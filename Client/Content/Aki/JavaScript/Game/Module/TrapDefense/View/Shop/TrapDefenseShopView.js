"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseShopView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem");
const ButtonItem_1 = require("../../../Common/Button/ButtonItem");
const NumberSelectComponent_1 = require("../../../Common/NumberSelect/NumberSelectComponent");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew");
const TrapDefenseGoldCostItem_1 = require("../TrapDefenseGoldCostItem");
const TrapDefenseShopCheckBuffItem_1 = require("./TrapDefenseShopCheckBuffItem");
const TrapDefenseShopGoodsContainerItem_1 = require("./TrapDefenseShopGoodsContainerItem");
class TrapDefenseShopView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Qyi = undefined;
    this.LZc = undefined;
    this.AZc = undefined;
    this.U1a = undefined;
    this.Ztd = undefined;
    this.xqe = undefined;
    this.sld = undefined;
    this.rId = undefined;
    this.p7d = false;
    this._Xc = e => {
      this.PZc(e);
    };
    this.DZc = e => {
      var t;
      var i = ModelManager_1.ModelManager.TrapDefenseModel.ViewModelShop.SelectedGoods ?? this.sld;
      if (i) {
        t = ModelManager_1.ModelManager.TrapDefenseModel.BattleData.GetGoldNum() >= i.CurrentPrice * e;
        this.GetText(14).SetText((i.CurrentPrice * e).toString());
        this.GetText(14).SetColor(t ? this.rId : UE.Color.FromHex("9D2437FF"));
        this.GetText(15).SetUIActive(i.OriginalPrice !== i.CurrentPrice);
        this.GetText(15).SetText(`<s>${(i.OriginalPrice ?? 0) * e}</s>`);
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(12), "Text_ItemSelectShopQuantityTip_text", e);
      }
    };
    this.xZc = () => {
      var e;
      var t = ModelManager_1.ModelManager.TrapDefenseModel.ViewModelShop.SelectedGoods;
      if (!!t && !((e = this.LZc.GetSelectNumber()) <= 0)) {
        if (ModelManager_1.ModelManager.TrapDefenseModel.BattleData.GetGoldNum() >= t.CurrentPrice * e) {
          ControllerHolder_1.ControllerHolder.TrapDefenseController.RequestTrapDefenseShopPurchase(t.Id, t.Type, e);
        } else {
          ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("TrapDefenseNotEnoughGold");
        }
      }
    };
    this.UZc = () => {
      if (ModelManager_1.ModelManager.TrapDefenseModel.BattleData.GetGoldNum() < ModelManager_1.ModelManager.TrapDefenseModel.ShopData.RefreshCost) {
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("TrapDefenseShopNoCost");
      } else {
        ControllerHolder_1.ControllerHolder.TrapDefenseController.RequestTrapDefenseShopRefresh();
      }
    };
    this.BZc = () => {
      this.kZc();
      var e = ModelManager_1.ModelManager.TrapDefenseModel.ViewModelShop.SelectedGoods;
      var t = ModelManager_1.ModelManager.TrapDefenseModel.ShopData;
      var t = t.ItemGoodsMap.has(e.Id) || t.BuffGoodsMap.has(e.Id);
      ModelManager_1.ModelManager.TrapDefenseModel.ViewModelShop.SelectGoods(t ? e : this.sld);
      this.U1a.UpdateGoldCostNum();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIButtonComponent], [2, UE.UIScrollViewWithScrollbarComponent], [3, UE.UIText], [4, UE.UITexture], [5, UE.UIText], [6, UE.UIText], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIText], [11, UE.UIItem], [12, UE.UIText], [13, UE.UITexture], [14, UE.UIText], [15, UE.UIText], [16, UE.UIItem], [17, UE.UIText]];
    this.BtnBindInfo = [[1, this.UZc]];
  }
  async OnBeforeStartAsync() {
    ModelManager_1.ModelManager.TrapDefenseModel.ViewModelShop.AddOnSelectGoodsDelegate(this._Xc);
    this.rId = this.GetText(14).GetColor();
    var e = [];
    this.Qyi = new PopupCaptionItem_1.PopupCaptionItem();
    this.Qyi.SetCloseCallBack(() => {
      this.CloseMe();
    });
    e.push(this.Qyi.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()));
    var t = ConfigManager_1.ConfigManager.TrapDefenseConfig.GetBattleGoldToItemId();
    e.push(this.SetItemIconAsync(this.GetTexture(4), t));
    e.push(this.SetItemIconAsync(this.GetTexture(13), t));
    e.push(this.LZc = new NumberSelectComponent_1.NumberSelectComponent(this.GetItem(16)));
    this.AZc = new ButtonItem_1.ButtonItem();
    this.AZc.SetFunction(this.xZc);
    e.push(this.AZc.CreateThenShowByActorAsync(this.GetItem(8).GetOwner()));
    this.AZc.TrySetLocalTextNew("TrapDefenseShopPurchase");
    await Promise.all(e);
    var t = ConfigManager_1.ConfigManager.TrapDefenseConfig.GetBattleGoldToItemId();
    this.U1a = new TrapDefenseGoldCostItem_1.TrapDefenseGoldCostItem();
    var e = this.Qyi.GetCostContent();
    await this.U1a.Init(e);
    this.U1a.ShowWithoutText(t);
    this.Ztd = new TrapDefenseShopCheckBuffItem_1.TrapDefenseShopCheckBuffItem();
    var e = this.Qyi.GetToggleRootItem();
    await this.Ztd.CreateThenShowByResourceIdAsync("UiItem_Cost", e);
    this.xqe = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(2), () => new TrapDefenseShopGoodsContainerItem_1.TrapDefenseShopGoodsContainerItem());
    await this.kZc();
    if (this.sld) {
      this.PZc(this.sld);
    }
  }
  OnStart() {
    var e = {
      UiText: this.GetText(10),
      ViewType: 1,
      ReportType: 9,
      AttachDirection: 1
    };
    ControllerHolder_1.ControllerHolder.TermExplanationController.RegisterTextHyperlinkByParam(e);
  }
  OnAfterShow() {
    if (this.p7d) {
      this.p7d = false;
      this.BZc();
    } else if (this.sld && !ModelManager_1.ModelManager.TrapDefenseModel.ViewModelShop.SelectedGoods) {
      ModelManager_1.ModelManager.TrapDefenseModel.ViewModelShop.SelectGoods(this.sld);
    }
  }
  OnBeforeHide() {
    this.p7d = true;
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TrapDefenseShopRefresh, this.BZc);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TrapDefenseShopRefresh, this.BZc);
  }
  OnBeforeDestroy() {
    ModelManager_1.ModelManager.TrapDefenseModel.ViewModelShop.RemoveOnSelectGoodsDelegate(this._Xc);
    ModelManager_1.ModelManager.TrapDefenseModel.ViewModelShop.OnViewClose();
    ControllerHolder_1.ControllerHolder.TermExplanationController.UnRegisterTextHyperlink(this.GetText(10));
    this.p7d = false;
  }
  async kZc() {
    var e = {
      Type: 0,
      GoodsList: ModelManager_1.ModelManager.TrapDefenseModel.ShopData.ItemGoodsList
    };
    var t = {
      Type: 1,
      GoodsList: ModelManager_1.ModelManager.TrapDefenseModel.ShopData.BuffGoodsList
    };
    e.GoodsList.sort(ModelManager_1.ModelManager.TrapDefenseModel.ShopData.SortGoods);
    t.GoodsList.sort(ModelManager_1.ModelManager.TrapDefenseModel.ShopData.SortGoods);
    var i = [];
    if (e.GoodsList.length > 0) {
      i.push(e);
    }
    if (t.GoodsList.length > 0) {
      i.push(t);
    }
    await this.xqe.RefreshByDataAsync(i);
    ControllerHolder_1.ControllerHolder.UiNavigationNewController.MarkViewHandleRefreshNavigationDirty();
    this.sld = (e.GoodsList.length > 0 ? e : t).GoodsList[0];
    var i = ModelManager_1.ModelManager.TrapDefenseModel.ShopData.RefreshCost;
    this.GetText(5).SetText(i.toString());
    var e = ModelManager_1.ModelManager.TrapDefenseModel.ShopData.RemainingRefreshCount;
    var t = ModelManager_1.ModelManager.TrapDefenseModel.ShopData.TotalRefreshCount;
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), "TrapDefenseShopGoodsRefresh", e + "/" + t);
    this.GetButton(1).GetRootComponent().SetUIActive(ModelManager_1.ModelManager.TrapDefenseModel.ShopData.RemainingRefreshCount > 0);
  }
  PZc(e) {
    var t;
    if (e) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), e.Name);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(10), e.Desc, ...(e.DescArgs ?? []));
      t = {
        MaxNumber: e.CanPurchaseNum,
        ValueChangeFunction: this.DZc
      };
      this.LZc.Init(t);
      this.LZc.SetUiActive(e.CanPurchaseNum > 1);
      this.GetItem(11).SetUIActive(!e.Disable);
      this.AZc.SetUiActive(!e.Disable);
      this.GetItem(9).SetUIActive(e.Disable);
      if (e.DisableReason === 2) {
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(17), "TrapDefenseShopGoodsInventoryCountReachLimit");
      } else if (e.DisableReason === 1) {
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(17), "TrapDefenseShopGoodsSoldOut");
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("TowerDefense", 74, "刷新塔防商店时，商品信息不存在");
    }
  }
}
exports.TrapDefenseShopView = TrapDefenseShopView;
//# sourceMappingURL=TrapDefenseShopView.js.map