"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DockyardShopTabViewModel = undefined;
const ControllerHolder_1 = require("../../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const ScrollingTipsController_1 = require("../../../../../ScrollingTips/ScrollingTipsController");
const FishingDefine_1 = require("../../FishingDefine");
const DockyardViewModelBase_1 = require("../Base/DockyardViewModelBase");
const DockyardShopBackpackPanelModel_1 = require("./DockyardShopBackpackPanelModel");
const DockyardShopListPanelModel_1 = require("./DockyardShopListPanelModel");
class DockyardShopTabViewModel extends DockyardViewModelBase_1.DockyardViewModelBase {
  constructor() {
    super(...arguments);
    this.BackpackPanelModel = new DockyardShopBackpackPanelModel_1.DockyardShopBackpackPanelModel();
    this.ListPanelModel = new DockyardShopListPanelModel_1.DockyardShopListPanelModel();
    this.uOn = undefined;
    this.SellClick = (e, o) => {
      var r;
      if (this.BackpackPanelModel.IsInDragState || !this.BackpackPanelModel.IsInSelectState || this.BackpackPanelModel.InSelectedBlockId === FishingDefine_1.UNVALID_ITEM_BLOCK_ID) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("GenericPrompt_NotAllowOpenPhotograph_TipsText");
      } else {
        r = this.BackpackPanelModel.IsInSelectState;
        ControllerHolder_1.ControllerHolder.FishingController.TryRequestFishingSell([e], [o], r, e => {
          if (e) {
            this.ListPanelModel.DeleteSelectedItemBlockAndRefresh();
            this.BackpackPanelModel.Panel.DestroySelectItemBlock();
            this.uOn.ShowPlotPanel("SellItem");
          }
        });
      }
    };
  }
  RegisterMainView(e) {
    this.uOn = e;
  }
  ItemBlockClick(e) {
    super.ItemBlockClick(e);
    this.uOn.HidePlotPanel();
  }
  AllSellClick() {
    var e = this.GetLeftPanelItemBlockDataList();
    const r = this.QYl(e);
    var e = this.cH_(e);
    var o = this.BackpackPanelModel.Panel.GetItemBlockDataList();
    const i = this.QYl(o);
    var l;
    var o = this.cH_(o);
    if (r.length + i.length === 0) {
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("Fishing_SellAllFailed");
    } else {
      l = this.BackpackPanelModel.IsInSelectState;
      ControllerHolder_1.ControllerHolder.FishingController.TryRequestFishingSell([...r, ...i], [...e, ...o], l, e => {
        if (e) {
          if (r.length > 0) {
            this.ListPanelModel.DeleteItemBlockListFromWareHouse(r);
          }
          for (const o of i) {
            this.BackpackPanelModel.Panel.DestroyItemBlockById(o);
          }
          this.uOn.ShowPlotPanel("SellAllItem");
        }
      });
    }
  }
  NotifyMainViewClose() {
    this.uOn.CloseMe();
  }
  QYl(e) {
    var o = [];
    for (const r of e) {
      if (r.MBs > 0) {
        o.push(r.b9n);
      }
    }
    return o;
  }
  cH_(e) {
    var o = [];
    for (const r of e) {
      if (r.MBs > 0) {
        o.push(r.L8n);
      }
    }
    return o;
  }
  NotifyMainViewUiBlur(e) {
    this.uOn.NotifyUiBlur(e);
  }
  get HasFishingCanSell() {
    var e = this.ListPanelModel.GetShowItemList();
    var o = ModelManager_1.ModelManager.DockyardModel.GetBackpackItemList();
    var r = [];
    for (const i of e) {
      if (i.Price > 0) {
        r.push(i.IncId);
      }
    }
    for (const l of o) {
      if (l.Price > 0) {
        r.push(l.IncId);
      }
    }
    return r.length > 0;
  }
}
exports.DockyardShopTabViewModel = DockyardShopTabViewModel;
//# sourceMappingURL=DockyardShopTabViewModel.js.map