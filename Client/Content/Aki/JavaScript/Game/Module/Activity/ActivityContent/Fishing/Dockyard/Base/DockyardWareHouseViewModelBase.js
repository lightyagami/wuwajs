"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DockyardWareHouseViewModelBase = undefined;
const CustomPromise_1 = require("../../../../../../../Core/Common/CustomPromise");
const ControllerHolder_1 = require("../../../../../../Manager/ControllerHolder");
const ScrollingTipsController_1 = require("../../../../../ScrollingTips/ScrollingTipsController");
const DockyardPanelUtil_1 = require("../DockyardPanelUtil");
class DockyardWareHouseViewModelBase {
  constructor() {
    this.View = undefined;
    this.ViewTitle = "";
    this.CloseClick = () => {
      if (this.BackpackPanelModel?.IsInSelectState) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("Fishing_SelectingQuit");
      } else {
        this.OnCloseClick();
      }
    };
    this.CheckCurrencyItemClick = () => !this.BackpackPanelModel.IsInSelectState || (ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("Fishing_SelectingQuit"), false);
  }
  RegisterView(t) {
    this.View = t;
    this.BackpackPanelModel.RegisterViewModel(this);
    this.ListPanelModel.RegisterBackpackPanelModel(this.BackpackPanelModel);
    this.OnInit();
  }
  ItemBlockClick(t) {
    this.View?.ShowTipsPanel(t);
  }
  SetInSelectState(t) {
    if (!t) {
      this.View?.HideTipsPanel();
      this.ListPanelModel.Panel?.SetDragTipsActive(false);
    }
  }
  HandleDragResult() {
    if (this.BackpackPanelModel.IsDragFail) {
      if (this.BackpackPanelModel.Panel.IsWareHouseDragToBackpack()) {
        this.BackpackPanelModel.Panel.SetItemBlockToWareHouse();
      } else if (this.ListPanelModel.CanDragToListPanel(false)) {
        this.bXl();
      } else {
        this.BackpackPanelModel.Panel.HandleDragFail();
        this.ListPanelModel.RefreshDragTips(false, true);
      }
    } else {
      this.BackpackPanelModel.Panel.HandleDragSuccess();
    }
  }
  DeleteClick() {
    var t = this.TXl();
    var i = this.BackpackPanelModel.Panel.GetItemBlockDataListExcludeSelected();
    var t = {
      Type: this.RequestCabinType,
      RequestId: this.RequestId,
      LeftDataList: t,
      RightDataList: i,
      RemoveIncId: this.BackpackPanelModel.InSelectedBlockId,
      Callback: t => {
        if (t) {
          this.ListPanelModel.DeleteSelectedItemBlockAndRefresh();
          this.BackpackPanelModel.Panel.DestroySelectItemBlock();
        }
      }
    };
    ControllerHolder_1.ControllerHolder.FishingController.RequestFishingCabinPut(t);
  }
  RotateClick() {
    if (!this.BackpackPanelModel.IsOutOfRange) {
      this.BackpackPanelModel.Panel.RotateClick();
    }
  }
  ConfirmClick() {
    if (this.BackpackPanelModel.CanConfirm()) {
      if (this.BackpackPanelModel.IsOverlap()) {
        this.BackpackPanelModel.Panel.HandleOverlapConfirm();
      } else {
        this.TrySetSelectedItemBlockToBackpack();
      }
    } else {
      ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("Fishing_CantPutDown");
    }
  }
  NotifyItemBlockToWareHouse(t) {
    this.ListPanelModel.SetItemBlockToWareHouse(t);
  }
  BackpackTick(t) {
    this.BackpackPanelModel.Tick();
    this.ListPanelModel.RefreshDragTips(this.BackpackPanelModel.IsInDragState, !this.BackpackPanelModel.IsDragFail);
  }
  GetQuicklySellPanelParentItem() {
    return this.View.GetPanelParentItem();
  }
  NotifyQuicklySellActive(t) {
    this.View.NotifyQuicklySellActive(t);
  }
  async TrySetSelectedItemBlockToWareHouse() {
    return !!this.ListPanelModel.CanDragToListPanel(true) && this.bXl();
  }
  async TrySetSelectedItemBlockToBackpack() {
    const i = new CustomPromise_1.CustomPromise();
    var t = this.LXl();
    var e = this.BackpackPanelModel.Panel.GetItemBlockDataList();
    var t = {
      Type: this.RequestCabinType,
      RequestId: this.RequestId,
      LeftDataList: t,
      RightDataList: e,
      Callback: t => {
        if (t) {
          this.ListPanelModel.DeleteSelectedItemBlockAndRefresh();
          this.BackpackPanelModel.Panel.HandleFinishConfirm();
        }
        i.SetResult(t);
      }
    };
    ControllerHolder_1.ControllerHolder.FishingController.RequestFishingCabinPut(t);
    return i.Promise;
  }
  LXl() {
    var t = [];
    for (const i of this.ListPanelModel.ShowItemList) {
      if (i.IncId !== this.ListPanelModel.InSelectedBlockId) {
        t.push(i.GetServerData());
      }
    }
    return t;
  }
  TXl() {
    var t = [];
    for (const i of this.ListPanelModel.ShowItemList) {
      if (i.IncId !== this.ListPanelModel.InSelectedBlockId && i.IncId !== this.BackpackPanelModel.InSelectedBlockId) {
        t.push(i.GetServerData());
      }
    }
    return t;
  }
  async bXl() {
    if (this.ListPanelModel.HasItemBlockInWareHouse(this.BackpackPanelModel.InSelectedBlockId)) {
      this.ListPanelModel.ResetSelectedBlock();
      this.ListPanelModel.Panel.RefreshListItemStateByIncId(this.BackpackPanelModel.InSelectedBlockId);
      this.BackpackPanelModel.Panel.DestroySelectItemBlock();
      return true;
    }
    const i = new CustomPromise_1.CustomPromise();
    var t = this.LXl();
    var e = this.BackpackPanelModel.Panel.GetItemBlockDataListExcludeSelected();
    var s = this.BackpackPanelModel.Panel.InSelectItemBlock.GetData();
    var s = DockyardPanelUtil_1.DockyardPanelUtil.CreateFishingItemInfo(s.Data, s.Rotate, s.LeftTopPosInPanel);
    t.push(s);
    var s = {
      Type: this.RequestCabinType,
      RequestId: this.RequestId,
      LeftDataList: t,
      RightDataList: e,
      Callback: t => {
        if (t) {
          this.BackpackPanelModel.Panel.SetItemBlockToWareHouse();
        } else {
          this.BackpackPanelModel.Panel.HandleDragFail();
        }
        i.SetResult(t);
      }
    };
    ControllerHolder_1.ControllerHolder.FishingController.RequestFishingCabinPut(s);
    return i.Promise;
  }
  OnInit() {}
  async BeforeStartAsync() {
    await this.View?.CreateQuestPanel(false);
  }
  OnCloseClick() {
    this.View?.CloseMe();
  }
  get RequestId() {
    return 0;
  }
}
exports.DockyardWareHouseViewModelBase = DockyardWareHouseViewModelBase;
//# sourceMappingURL=DockyardWareHouseViewModelBase.js.map