"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GiftPackageSupplyPackItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const ShopSkinData_1 = require("../../../Skin/Data/ShopSkinData");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const GenericScrollView_1 = require("../../../Util/ScrollView/GenericScrollView");
const GiftPackageItem_1 = require("./GiftPackageItem");
const COLOR = "FED12E";
class GiftPackageSupplyPackItem extends UiPanelBase_1.UiPanelBase {
  constructor(i, t, e) {
    super();
    this.m4i = false;
    this.d4i = false;
    this.C4i = undefined;
    this.xqe = undefined;
    this.ZOi = new Array();
    this.g4i = 0;
    this.sGe = (i, t, e) => {
      var s = new GiftPackageItem_1.GiftPackageItem();
      s.Initialize(t);
      s.SetBelongViewName("GiftPackageDetailsView");
      if (i && i.length >= 2) {
        s.UpdateItem(i[0], i[1]);
      }
      return {
        Key: e,
        Value: s
      };
    };
    this.SetEndTime = () => {
      var i;
      var t = this.C4i.GetCountDownData();
      if (t[2] === 0) {
        this.GetItem(3).SetUIActive(false);
        this.d4i = false;
      } else {
        i = this.C4i.GetCountDownData()[1];
        if (t[0] === 3) {
          this.GetText(4).ShowTextNew("DownShopItem");
          this.GetText(4).SetUIActive(true);
        } else if (t[0] === 2) {
          this.GetText(4).ShowTextNew("ReUpShopItem");
          this.GetText(4).SetUIActive(true);
        } else if (t[0] === 1) {
          this.GetText(4).ShowTextNew("DiscountItem");
          this.GetText(4).SetUIActive(true);
        } else {
          this.GetText(4).SetUIActive(false);
        }
        this.d4i = i !== undefined;
        if (i) {
          this.GetItem(3).SetUIActive(true);
          t = this.GetText(5);
          if (typeof i == "string") {
            t.SetText(i);
          } else {
            LguiUtil_1.LguiUtil.SetLocalText(t, i.TextId, i.TimeValue);
          }
        } else {
          this.GetItem(3).SetUIActive(false);
        }
      }
    };
    this.g4i = i;
    this.C4i = e;
    this.CreateThenShowByResourceIdAsync("UiItem_GiftPackageSupplyPack", t);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIScrollViewWithScrollbarComponent], [1, UE.UIItem], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIText], [5, UE.UIText], [6, UE.UIItem], [7, UE.UIText]];
  }
  OnStart() {
    this.xqe = new GenericScrollView_1.GenericScrollView(this.GetScrollViewWithScrollbar(0), this.sGe);
    this.Refresh();
  }
  Refresh() {
    if (!this.InAsyncLoading()) {
      var t;
      var e;
      var s;
      var h;
      let i = 0;
      for ([t, e] of ConfigManager_1.ConfigManager.GiftPackageConfig.GetGiftPackageConfig(this.g4i).Content) {
        if (ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(t) === 11) {
          i = t;
          break;
        }
        this.ZOi.push([t, e]);
      }
      if (i > 0) {
        this.ZOi = [];
        for ([s, h] of ShopSkinData_1.ShopSkinData.Create(this.C4i).GetAllReward()) {
          this.ZOi.push([s.ItemId, h]);
        }
      }
      this.xqe.RefreshByData(this.ZOi);
      this.SetEndTime();
      this.mGe();
      this.K3i();
      this.f4i();
    }
  }
  mGe() {}
  f4i() {
    this.GetItem(6).SetUIActive(this.m4i || this.d4i);
  }
  K3i() {
    this.GetText(2).SetUIActive(false);
    this.GetText(7).SetUIActive(false);
    var i = this.C4i.GetExchangeViewShopTipsText();
    let t = undefined;
    (t = this.d4i ? this.GetText(2) : this.GetText(7)).SetUIActive(i !== "");
    t.SetText(i);
    t.SetColor(UE.Color.FromHex(COLOR));
    this.m4i = i !== "";
  }
  OnBeforeDestroy() {}
}
exports.GiftPackageSupplyPackItem = GiftPackageSupplyPackItem;
//# sourceMappingURL=GiftPackageSupplyPackItem.js.map