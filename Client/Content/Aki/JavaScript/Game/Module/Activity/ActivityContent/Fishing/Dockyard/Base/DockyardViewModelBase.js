"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DockyardViewModelBase = undefined;
const CustomPromise_1 = require("../../../../../../../Core/Common/CustomPromise");
const Protocol_1 = require("../../../../../../../Core/Define/Net/Protocol");
const ControllerHolder_1 = require("../../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const ScrollingTipsController_1 = require("../../../../../ScrollingTips/ScrollingTipsController");
const DockyardPanelUtil_1 = require("../DockyardPanelUtil");
class DockyardViewModelBase {
  constructor() {
    this.Yzt = undefined;
    this.IsInTrawlState = false;
    this.CloseClick = () => {
      if (this.BackpackPanelModel?.IsInSelectState) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("Fishing_SelectingQuit");
      } else {
        this.Yzt?.CloseMe();
      }
    };
    this.CheckCurrencyItemClick = () => !this.BackpackPanelModel?.IsInSelectState || (ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("Fishing_SelectingQuit"), false);
  }
  get RequestCabinType() {
    if (this.IsInTrawlState) {
      return Protocol_1.Aki.Protocol.IXl.Proto_NetCabin;
    } else {
      return Protocol_1.Aki.Protocol.IXl.Proto_ShipCabin;
    }
  }
  RegisterView(t) {
    this.Yzt = t;
    this.BackpackPanelModel.RegisterViewModel(this);
    this.ListPanelModel.RegisterBackpackPanelModel(this.BackpackPanelModel);
  }
  AllSellClick() {}
  IsTrawlInteractive() {
    return this.IsInTrawlState;
  }
  SetInSelectState(t) {
    if (!t) {
      this.Yzt?.HideTipsPanel();
      this.ListPanelModel.Panel?.SetDragTipsActive(false);
    }
  }
  TrawlClick(t) {
    this.IsInTrawlState = t;
    this.Yzt?.SetTrawlState(t);
  }
  ItemBlockClick(t) {
    this.Yzt?.ShowTipsPanel(t);
  }
  DeleteClick() {
    var t = this.TXl();
    var e = this.BackpackPanelModel.Panel.GetItemBlockDataListExcludeSelected();
    var t = {
      Type: this.RequestCabinType,
      LeftDataList: t,
      RightDataList: e,
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
  HandleDragResult() {
    if (this.BackpackPanelModel?.IsDragFail) {
      if (this.IsInTrawlState) {
        if (this.BackpackPanelModel.Panel.IsWareHouseDragToBackpack()) {
          this.BackpackPanelModel.Panel.SetItemBlockToWareHouse();
          return;
        }
        if (this.ListPanelModel.CanDragToListPanel(false)) {
          this.bXl();
          return;
        }
        this.ListPanelModel.RefreshDragTips(false, true);
      }
      this.BackpackPanelModel.Panel.HandleDragFail();
    } else {
      this.BackpackPanelModel?.Panel.HandleDragSuccess();
    }
  }
  BackpackTick(t) {
    this.BackpackPanelModel.Tick();
    this.ListPanelModel.RefreshDragTips(this.BackpackPanelModel.IsInDragState, !this.BackpackPanelModel.IsDragFail);
  }
  NotifyItemBlockToWareHouse(t) {
    this.ListPanelModel.SetItemBlockToWareHouse(t);
  }
  GetQuicklySellPanelParentItem() {
    return this.Yzt.GetQuicklySellPanelParentItem?.();
  }
  NotifyQuicklySellActive(t) {
    this.Yzt.NotifyQuicklySellActive?.(t);
  }
  async TrySetSelectedItemBlockToWareHouse() {
    return !!this.ListPanelModel.CanDragToListPanel(true) && this.bXl();
  }
  async TrySetSelectedItemBlockToBackpack() {
    const e = new CustomPromise_1.CustomPromise();
    var t = this.GetLeftPanelItemBlockDataList();
    var i = this.BackpackPanelModel.Panel.GetItemBlockDataList();
    var t = {
      Type: this.RequestCabinType,
      LeftDataList: t,
      RightDataList: i,
      Callback: t => {
        if (t) {
          this.ListPanelModel.DeleteSelectedItemBlockAndRefresh();
          this.BackpackPanelModel.Panel.HandleFinishConfirm();
        }
        e.SetResult(t);
      }
    };
    ControllerHolder_1.ControllerHolder.FishingController.RequestFishingCabinPut(t);
    return e.Promise;
  }
  GetLeftPanelItemBlockDataList() {
    var t = [];
    if (this.IsInTrawlState) {
      for (const e of this.ListPanelModel.ShowItemList) {
        if (e.IncId !== this.ListPanelModel.InSelectedBlockId) {
          t.push(e.GetServerData());
        }
      }
    }
    return t;
  }
  TXl() {
    var t = [];
    if (this.IsInTrawlState) {
      for (const e of this.ListPanelModel.ShowItemList) {
        if (e.IncId !== this.ListPanelModel.InSelectedBlockId && e.IncId !== this.BackpackPanelModel.InSelectedBlockId) {
          t.push(e.GetServerData());
        }
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
    const e = new CustomPromise_1.CustomPromise();
    var t = this.GetLeftPanelItemBlockDataList();
    var i = this.BackpackPanelModel.Panel.GetItemBlockDataListExcludeSelected();
    var s = this.BackpackPanelModel.Panel.InSelectItemBlock.GetData();
    var s = DockyardPanelUtil_1.DockyardPanelUtil.CreateFishingItemInfo(s.Data, s.Rotate, s.LeftTopPosInPanel);
    t.push(s);
    var s = {
      Type: this.RequestCabinType,
      LeftDataList: t,
      RightDataList: i,
      Callback: t => {
        if (t) {
          this.BackpackPanelModel.Panel.SetItemBlockToWareHouse();
        } else {
          this.BackpackPanelModel.Panel.HandleDragFail();
        }
        e.SetResult(t);
      }
    };
    ControllerHolder_1.ControllerHolder.FishingController.RequestFishingCabinPut(s);
    return e.Promise;
  }
  GetItemBlockData(t) {
    var e = ModelManager_1.ModelManager.DockyardModel.GetItemBlockData(t);
    return e || ModelManager_1.ModelManager.DockyardModel.GetDataByTrawl(t);
  }
}
exports.DockyardViewModelBase = DockyardViewModelBase;
//# sourceMappingURL=DockyardViewModelBase.js.map