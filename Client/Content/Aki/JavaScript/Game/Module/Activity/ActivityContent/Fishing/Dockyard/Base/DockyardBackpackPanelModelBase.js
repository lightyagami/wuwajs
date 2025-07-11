"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DockyardBackpackPanelModelBase = undefined;
const ControllerHolder_1 = require("../../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const ConfirmBoxDefine_1 = require("../../../../../ConfirmBox/ConfirmBoxDefine");
const ScrollingTipsController_1 = require("../../../../../ScrollingTips/ScrollingTipsController");
const FishingDefine_1 = require("../../FishingDefine");
const DockyardBackpackData_1 = require("../Bag/DockyardBackpackData");
class DockyardBackpackPanelModelBase {
  constructor() {
    this.fXl = false;
    this.InSelectedBlockId = FishingDefine_1.UNVALID_ITEM_BLOCK_ID;
    this.IsInDragState = false;
    this.IsOutOfRange = false;
    this.IsSetFail = false;
    this.Panel = undefined;
    this.ViewModel = undefined;
    this.PreviewBackpackMap = new Map();
    this.TempQuicklySellType = 0;
    this.TempQuicklySellIncIdSet = new Set();
    this.BackpackData = undefined;
    this.IsDragFail = false;
    this.IsMoved = false;
    this.QuicklySellClick = () => {
      var i;
      if (this.IsInSelectState) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("Fishing_SelectingQuit");
      } else {
        i = this.Panel.GetQuicklySellItemIdList();
        if (!ModelManager_1.ModelManager.FishingQuestModel.OnFishingItemSell(i, this.IsInSelectState, () => {
          this.Nv1();
        })) {
          this.Nv1();
        }
      }
    };
    this.OnSellClick = i => {
      if (i === 1) {
        this.ViewModel?.NotifyQuicklySellActive?.(true);
        this.Panel.ShowQuicklySellPanel();
      } else {
        this.ViewModel?.NotifyQuicklySellActive?.(false);
        this.Panel.HideQuicklySellPanel();
      }
    };
    this.OnTrawlClick = i => {
      if (this.IsInSelectState) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("Fishing_SelectingQuit");
      } else {
        this.ViewModel?.TrawlClick?.(i === 1);
      }
    };
    this.OnDeleteClick = () => {
      var i;
      if (ModelManager_1.ModelManager.FunctionModel.IsOpen(10076)) {
        (i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(235)).FunctionMap.set(2, () => {
          this.ViewModel?.DeleteClick?.();
        });
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(i);
      } else {
        ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("NotOpen");
      }
    };
    this.OnRotateClick = () => {
      this.ViewModel?.RotateClick?.();
    };
    this.OnConfirmClick = () => {
      this.ViewModel?.ConfirmClick?.();
    };
    this.OnAllSellClick = () => {
      this.ViewModel?.AllSellClick?.();
    };
    this.OnBackToWareHouseClick = () => {
      this.TrySetItemBlockBackToWareHouse();
    };
    this.OnMaskClick = () => {
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("Fishing_SelectingQuit");
    };
    this.BackpackTick = i => {
      if (this.IsInSelectState && this.IsInDragState && this.InSelectedBlockId !== FishingDefine_1.UNVALID_ITEM_BLOCK_ID) {
        this.ViewModel?.BackpackTick?.(i);
      }
    };
    this.IsAllSellOpen = false;
    this.IsDeleteOpen = true;
    this.BackpackData = new DockyardBackpackData_1.DockyardBackpackData(this.IsQuickSellOpen());
  }
  get IsInSelectState() {
    return this.fXl;
  }
  set IsInSelectState(i) {
    this.fXl = i;
    this.Panel.SetAllSellBtnState(i);
    this.Panel.SetItemBlockTextureMaskActive(i);
    this.ViewModel?.SetInSelectState?.(i);
    if (!i) {
      this.Panel.SetButtonsState(false);
    }
  }
  get IsInHighlight() {
    return !this.IsInCanConfirm;
  }
  get IsInCanConfirm() {
    return !this.IsSetFail && !this.IsOverlap();
  }
  yXl() {
    for (const i of this.BackpackData.GetBackpackDataList()) {
      this.PreviewBackpackMap.set(i, FishingDefine_1.UNVALID_ITEM_BLOCK_ID);
    }
  }
  SetPreviewBackpackData(i, t) {
    this.PreviewBackpackMap.set(i, t);
  }
  GetPreviewBackpackData(i) {
    return this.PreviewBackpackMap.get(i);
  }
  RefreshBackpackQuicklySellData() {
    this.BackpackData.RefreshQuicklySellOpen(this.IsQuickSellOpen());
  }
  InitPanel(i) {
    this.Panel = i;
    this.yXl();
  }
  RegisterViewModel(i) {
    this.ViewModel = i;
  }
  SetItemBlockToWareHouse(i) {
    this.ViewModel?.NotifyItemBlockToWareHouse?.(i);
  }
  Nv1() {
    ControllerHolder_1.ControllerHolder.FishingController.RequestFishingQuickSell(i => {
      if (i) {
        this.Panel.CloseQuicklySellPanel();
        for (const t of this.TempQuicklySellIncIdSet) {
          this.Panel.DestroyItemBlockById(t);
        }
        this.TempQuicklySellIncIdSet.clear();
      }
    });
  }
  Tick() {
    this.RefreshPanel();
  }
  RefreshPanel(i = true) {
    this.Panel.RefreshAllBackpackGridState(i);
    i = this.ViewModel?.IsConfirmInteractive ? this.ViewModel.IsConfirmInteractive() : !this.IsSetFail;
    this.Panel.SetConfirmInteractive(i);
    i = this.ViewModel?.IsConfirmNiagaraActive ? this.ViewModel.IsConfirmNiagaraActive() : this.IsInCanConfirm;
    this.Panel.SetConfirmNiagaraActive(i);
  }
  CanConfirm() {
    return this.Panel.CanConfirm();
  }
  IsOverlap() {
    return this.Panel.IsOverlap();
  }
  GetQuicklySellPanelParentItem() {
    return this.ViewModel.GetQuicklySellPanelParentItem?.();
  }
  OnItemBlockClick(i) {
    if (!this.IsInSelectState) {
      this.Panel.ItemBlockClick(i);
      this.ViewModel?.ItemBlockClick(i);
    }
  }
  CanDrag(i) {
    return this.Panel.CanDrag(i);
  }
  DragBegin(i) {
    return !this.IsInDragState && (this.IsInDragState = true, this.IsMoved = false, this.ViewModel?.HandleDragBegin?.(), this.Panel.SetButtonsState(false), true);
  }
  DragEnd(i) {
    return !!this.IsInDragState && (this.IsInDragState = false, this.ViewModel?.HandleDragResult(), true);
  }
  WareHouseItemClick(i) {
    this.Panel.CreateItemBlockByView(i);
  }
  WareHouseItemDragBegin(i) {
    this.Panel.CreateItemBlockByViewAndFollow(i);
  }
  IsWareHouseItemCanClick(i) {
    return !this.IsInSelectState;
  }
  GetSelectedId() {
    return this.InSelectedBlockId;
  }
  async TrySetItemBlockBackToWareHouse() {
    return this.InSelectedBlockId === FishingDefine_1.UNVALID_ITEM_BLOCK_ID || ((await this.ViewModel?.TrySetSelectedItemBlockToWareHouse?.()) ?? true);
  }
  async TrySetSelectedItemBlockConfirm() {
    return this.InSelectedBlockId === FishingDefine_1.UNVALID_ITEM_BLOCK_ID || (this.IsInCanConfirm ? (await this.ViewModel?.TrySetSelectedItemBlockToBackpack?.()) ?? true : (await this.ViewModel?.TrySetSelectedItemBlockToWareHouse?.()) ?? true);
  }
  IsQuickSellOpen() {
    return !ModelManager_1.ModelManager.FishingModel.IsInDock && ModelManager_1.ModelManager.DockyardModel.IsQuicklySellOpen;
  }
  GetIsTrawlOpen() {
    return false;
  }
  GetIsBackToWareHouseOpen() {
    return true;
  }
}
exports.DockyardBackpackPanelModelBase = DockyardBackpackPanelModelBase;
//# sourceMappingURL=DockyardBackpackPanelModelBase.js.map