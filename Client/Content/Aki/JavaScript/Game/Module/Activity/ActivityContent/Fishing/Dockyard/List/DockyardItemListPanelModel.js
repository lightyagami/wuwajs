"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DockyardItemListPanelModel = undefined;
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const ScrollingTipsController_1 = require("../../../../../ScrollingTips/ScrollingTipsController");
const FishingDefine_1 = require("../../FishingDefine");
class DockyardItemListPanelModel {
  constructor() {
    this.Panel = undefined;
    this.BackpackPanelModel = undefined;
    this.GYl = new Map();
    this.ShowItemList = [];
    this.InSelectedBlockId = FishingDefine_1.UNVALID_ITEM_BLOCK_ID;
    this.ComponentData = {
      TitleText: "",
      GetCountText: undefined,
      HelpBtnId: 0,
      TimeText: ""
    };
    this.DragClick = t => {
      this.Ek_(t);
    };
    this.DragBegin = t => {
      if (this.mRo(t.IncId)) {
        this.InSelectedBlockId = t.IncId;
        ModelManager_1.ModelManager.DockyardModel.AddListItemReadFlag(t.ItemId);
        this.BackpackPanelModel?.WareHouseItemDragBegin(t);
        this.Panel.RefreshListItemRedDot(t.ItemId);
        this.Panel.RefreshListItemStateByIncId(t.IncId);
        this.Panel.RefreshListItem();
      }
    };
  }
  RegisterPanel(t) {
    this.Panel = t;
    this.OnInit();
  }
  RefreshShowItemList() {
    this.GYl.clear();
    this.ShowItemList = this.GetShowItemList();
    for (const t of this.ShowItemList) {
      this.GYl.set(t.IncId, t);
    }
  }
  RegisterBackpackPanelModel(t) {
    this.BackpackPanelModel = t;
  }
  async Ek_(t) {
    if (t.IncId !== this.InSelectedBlockId) {
      if ((await this.BackpackPanelModel?.TrySetSelectedItemBlockConfirm()) ?? true) {
        this.InSelectedBlockId = t.IncId;
        ModelManager_1.ModelManager.DockyardModel.AddListItemReadFlag(t.ItemId);
        this.BackpackPanelModel?.WareHouseItemClick(t);
        this.Panel.RefreshListItemRedDot(t.ItemId);
      }
      this.Panel.RefreshListItemStateByIncId(t.IncId);
    }
  }
  mRo(t) {
    return t !== this.InSelectedBlockId && (this.BackpackPanelModel?.IsWareHouseItemCanClick(t) ?? true);
  }
  W7_() {
    var t;
    return this.InSelectedBlockId !== FishingDefine_1.UNVALID_ITEM_BLOCK_ID && (t = this.FYl(this.InSelectedBlockId), this.InSelectedBlockId = FishingDefine_1.UNVALID_ITEM_BLOCK_ID, t);
  }
  SetItemBlockToWareHouse(t) {
    this.W7_();
    this.NYl(t);
    this.Panel?.RefreshListItem();
  }
  DeleteItemBlockListFromWareHouse(t) {
    let e = false;
    for (const s of t) {
      var i = this.FYl(s);
      e = e || i;
    }
    if (e) {
      this.Panel?.RefreshListItem();
    }
  }
  DeleteSelectedItemBlockAndRefresh() {
    if (this.W7_()) {
      this.Panel?.RefreshListItem();
    }
  }
  ResetSelectedBlock() {
    this.InSelectedBlockId = FishingDefine_1.UNVALID_ITEM_BLOCK_ID;
  }
  HasItemBlockInWareHouse(t) {
    return this.GYl.has(t);
  }
  NYl(t) {
    this.ShowItemList.unshift(t);
    this.GYl.set(t.IncId, t);
  }
  FYl(t) {
    var e = this.GYl.get(t);
    var e = this.ShowItemList.indexOf(e);
    if (e >= 0) {
      this.ShowItemList.splice(e, 1);
    }
    var e = this.GYl.delete(t);
    return e;
  }
  Yq_() {
    return ModelManager_1.ModelManager.FunctionModel.IsOpen(10076);
  }
  CheckSelectedInList() {
    const e = this.BackpackPanelModel?.GetSelectedId();
    return e !== FishingDefine_1.UNVALID_ITEM_BLOCK_ID && this.GetShowItemList().filter(t => t.IncId === e).length > 0;
  }
  CanDragToListPanel(t) {
    return (!!t || !!this.Panel?.CheckInViewport()) && !!this.CheckOtherCanDragCondition(true) && (!!this.Yq_() || !!this.CheckSelectedInList() || !(ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("Fishing_FishingBanMoveBack"), 1));
  }
  RefreshDragTips(t, e) {
    var i;
    if (this.Panel) {
      i = this.Panel.CheckInViewport() && this.CheckOtherCanDragCondition(false);
      this.Panel.SetDragTipsActive(t && !e && i);
    }
  }
  CheckOtherCanDragCondition(t) {
    return true;
  }
  OnInit() {}
}
exports.DockyardItemListPanelModel = DockyardItemListPanelModel;
//# sourceMappingURL=DockyardItemListPanelModel.js.map