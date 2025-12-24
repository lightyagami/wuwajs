"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryItemGridItem = undefined;
const UE = require("ue");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const UiManager_1 = require("../../../../../Ui/UiManager");
const LevelSequencePlayer_1 = require("../../../../Common/LevelSequencePlayer");
const ScrollingTipsController_1 = require("../../../../ScrollingTips/ScrollingTipsController");
const HonamiStoryDefine_1 = require("../../../HonamiStoryDefine");
const HonamiStoryUtil_1 = require("../../../HonamiStoryUtil");
const HonamiStoryGridDynamic_1 = require("./HonamiStoryGridDynamic");
class HonamiStoryItemGridItem extends UiPanelBase_1.UiPanelBase {
  constructor(i) {
    super();
    this.ItemData = i;
    this.SPe = undefined;
    this.OnClickedGridTipsCb = undefined;
    this.DraggableComponent = undefined;
    this.BackpackType = 1;
    this.LockItem = undefined;
    this.SellItem = undefined;
    this.SellValueItem = undefined;
    this.OverflowItem = undefined;
    this.DragGridFrame = undefined;
    this.Lnm = false;
    this.Ekm = true;
    this.OnTipsCallback = () => {
      if (this.OnClickedGridTipsCb) {
        this.OnClickedGridTipsCb();
      }
    };
    this.OnClickedToggle = () => {
      var i;
      var t;
      if (this.Ekm) {
        if ((t = (i = ModelManager_1.ModelManager.HonamiStoryModel.GetBackpackLogic()).GetLogicState()) === 0) {
          if (i.OnClickGrid(this.ItemData, this.OnTipsCallback, this)) {
            i.TipsItem.SetItemDataOut(undefined);
            this.ExecuteDoubleClickLogic();
          }
        } else {
          this.DoLogicStateFunc(t);
        }
      } else {
        this.CancelToggleSelect();
      }
    };
    this.OnHideCallback = () => {
      this.CancelToggleSelect();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UITexture], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem]];
    this.BtnBindInfo = [[0, this.OnClickedToggle]];
  }
  OnStart() {
    if (this.Lnm) {
      this.GetExtendToggle(0)?.SetEnable(false);
    } else {
      this.DraggableComponent = this.GetExtendToggle(0);
    }
  }
  OnBeforeDestroy() {
    this.LockItem = undefined;
  }
  Refresh(e, i) {
    this.ItemData = e;
    var s = ModelManager_1.ModelManager.HonamiStoryModel;
    var h = this.GetTexture(1);
    if (h) {
      var r;
      var o = this.Lnm ? e.GetIsDragCross() : e.GetIsCross();
      var a = e.GetBaseGridWidth(o);
      var n = e.GetBaseGridHeight(o);
      let i = 0;
      let t = 0;
      t = this.BackpackType !== 3 ? (r = HonamiStoryDefine_1.HonamiBackpackTypeMap.get(this.BackpackType), r = s.GetBackPackData(r), i = r.GetCellWidth() * a + (a - 1) * r.GetCellHorizontalInterval(), r.GetCellHeight() * n + (n - 1) * r.GetCellVerticalInterval()) : (r = s.GetPlayerBackpackData(), i = r.GetCellWidth() * a + (a - 1) * r.GetCellHorizontalInterval(), r.GetCellHeight() * n + (n - 1) * r.GetCellVerticalInterval());
      this.RootItem.SetWidth(i);
      this.RootItem.SetHeight(t);
      h.SetWidth(o ? t : i);
      h.SetHeight(o ? i : t);
      this.SetTextureShowUntilLoaded(e.GetIconBackpack(), h);
      h.SetUIActive(true);
      a = o ? s.TransRotation : s.NormalRotation;
      h.SetUIRelativeRotation(a);
      this.RefreshLogicData();
    }
  }
  GetPanelForHover() {
    return this.GetItem(5);
  }
  SetLockItemEnable(i, t) {
    if (!this.Lnm) {
      this.LockItem?.SetUiActive(i);
      this.LockItem?.RefreshMask(t, this.ItemData, this.BackpackType);
      if (i && !this.LockItem) {
        this.LockItem = new HonamiStoryGridDynamic_1.HonamiStoryItemLockStateItem();
        this.LockItem.CreateThenShowByResourceIdAsync("UiItem_HonamiStoryItemTagLock", this.RootItem).then(() => {
          this.LockItem?.SetUiActive(i);
          this.LockItem?.RefreshMask(t, this.ItemData, this.BackpackType);
        });
      }
    }
  }
  SetSellItemEnable(i) {
    this.SellItem?.SetUiActive(i);
    this.SellItem?.SetSelected(this.ItemData.GetIsSelected());
    this.SetSellItemValueEnable(i);
    if (i && !this.SellItem) {
      this.SellItem = new HonamiStoryGridDynamic_1.HonamiStoryItemSellAllItem();
      this.SellItem.CreateThenShowByResourceIdAsync("UiItem_HonamiStoryItemTagSell", this.GetItem(2)).then(() => {
        var i = ModelManager_1.ModelManager.HonamiStoryModel.GetBackpackLogicState() === 4 && !this.ItemData.IsLock();
        this.SellItem?.SetUiActive(i);
        this.SellItem?.SetSelected(i && this.ItemData.GetIsSelected());
      });
    }
  }
  SetSellItemValueEnable(i) {
    this.SellValueItem?.SetUiActive(i);
    if (i) {
      this.SellValueItem?.Refresh(this.ItemData);
    }
    if (i && !this.SellItem) {
      this.SellValueItem = new HonamiStoryGridDynamic_1.HonamiStoryItemSellValueItem();
      this.SellValueItem.CreateThenShowByResourceIdAsync("PnlItemCost", this.GetItem(2)).then(() => {
        var i = ModelManager_1.ModelManager.HonamiStoryModel.GetBackpackLogicState() === 4 && !this.ItemData.IsLock();
        this.SellValueItem?.SetUiActive(i);
        if (i && this.ItemData !== undefined) {
          this.SellValueItem?.Refresh(this.ItemData);
        }
      });
    }
  }
  GetTipsRoot() {
    return this.GetItem(4);
  }
  GetData() {
    return this.ItemData;
  }
  GetIncId() {
    return this.ItemData?.GetIncId() ?? -1;
  }
  SetBackpackType(i) {
    this.BackpackType = i;
  }
  GetBackpackType() {
    return this.BackpackType;
  }
  SetIsForDrag(i) {
    if (this.Lnm = i) {
      this.GetItem(3)?.SetUIActive(false);
      this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
      i = HonamiStoryUtil_1.HonamiStoryUtil.CheckInHonamiStoryDungeon();
      this.BackpackType = i ? 1 : 0;
      this.GetExtendToggle(0)?.SetSelfInteractive(false);
      this.DragGridFrame = new HonamiStoryGridDynamic_1.HonamiStoryDragItemFrameItem();
      this.DragGridFrame.CreateThenShowByResourceIdAsync("UiItem_HonamiStoryItemDrag", this.GetItem(2));
    }
  }
  SetCanOpenTips(i) {
    this.Ekm = i;
  }
  SetOverFlowEnable(i) {
    if (i) {
      if (this.OverflowItem) {
        if (!this.OverflowItem.InAsyncLoading()) {
          this.OverflowItem?.SetUiActive(true);
        }
      } else {
        this.OverflowItem = new UiPanelBase_1.UiPanelBase();
        this.OverflowItem.CreateThenShowByResourceIdAsync("UiItem_HonamiStoryItemTagOverflow", this.GetItem(2)).then(() => {
          var i = ModelManager_1.ModelManager.HonamiStoryModel.GetBackPackData(1);
          var t = this.ItemData.GetRow();
          var i = i.GetHeightCount(false);
          var t = t + this.ItemData.GetGridHeight() > i;
          this.OverflowItem?.SetUiActive(t);
        });
      }
    } else {
      this.OverflowItem?.SetUiActive(false);
    }
  }
  RefreshLogicData() {
    var i = ModelManager_1.ModelManager.HonamiStoryModel.GetBackpackLogicState();
    this.SetLockItemEnable(this.ItemData.IsLock(), i === 4);
    if (i === 0) {
      this.SetSellItemEnable(false);
      this.SellItem?.SetUiActive(false);
    } else if (i === 4) {
      if (this.ItemData.IsLock()) {
        this.SetSellItemEnable(false);
      } else {
        this.SetSellItemEnable(true);
      }
    }
  }
  ExecuteDoubleClickLogic() {
    var i;
    if (this.BackpackType === 0) {
      this.NormalBagDoubleClick();
    } else if (this.BackpackType === 1) {
      if (UiManager_1.UiManager.GetViewByName("HonamiStoryBackpackView") === undefined) {
        if (this.ItemData.IsLock()) {
          ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("HonamiStory_TryDiscardLockItem");
        } else {
          ModelManager_1.ModelManager.HonamiStoryModel.SetItemIntoBag(this.ItemData, 2, 3);
        }
      } else {
        this.NormalBagDoubleClick();
      }
    } else if (this.BackpackType === 2) {
      i = this.ItemData.GetPosition();
      ModelManager_1.ModelManager.HonamiStoryModel.QuickPickUpFromPickUpBox(this.ItemData, i);
    }
  }
  NormalBagDoubleClick() {
    var i;
    if (this.ItemData.GetItemType() === 1) {
      i = this.ItemData.GetPosition();
      if (!ModelManager_1.ModelManager.HonamiStoryModel.QuickEquipFromBackpack(this.ItemData, i)) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("HonamiStory_ShowTips_CantQuickEquip");
      }
    } else {
      ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("HonamiStory_CantEquipNormalItem");
    }
  }
  DoLogicStateFunc(i) {
    var t;
    var e;
    var s;
    if (i === 4) {
      this.DoSellLogic();
    } else if (i === 1 || i === 2) {
      s = (e = (t = ModelManager_1.ModelManager.HonamiStoryModel.GetBackpackLogic()).TipsItem).GetItemDataOut();
      t?.CloseTips();
      if (this.ItemData === s) {
        e.SetItemDataOut(s);
      }
      this.OnClickedToggle();
    } else if (i === 3 && (this.DraggableComponent?.SetToggleState(0), ModelManager_1.ModelManager.HonamiStoryModel.SetBackpackLogicState(0), ModelManager_1.ModelManager.HonamiStoryModel.GetBackpackLogic().OnClickGrid(this.ItemData, this.OnTipsCallback, this))) {
      this.ExecuteDoubleClickLogic();
    }
  }
  DoSellLogic() {
    if (this.ItemData.IsLock()) {
      this.DraggableComponent.SetToggleState(0);
    } else {
      ModelManager_1.ModelManager.HonamiStoryModel.GetBackpackLogic().RegisterSingleSellItem(this.ItemData);
      this.RefreshLogicData();
      this.DraggableComponent?.SetToggleState(0);
    }
  }
  CancelToggleSelect() {
    this.DraggableComponent.SetToggleState(0);
  }
  PlayMoveItemSeq() {
    if (this.Lnm && HonamiStoryUtil_1.HonamiStoryUtil.IsMobileView()) {
      this.SPe?.PlayOrReplaySequenceByName("MoveUp");
    }
  }
  SetIsEnable(i) {
    this.DraggableComponent?.SetSelfInteractive(i);
  }
}
exports.HonamiStoryItemGridItem = HonamiStoryItemGridItem;
//# sourceMappingURL=HonamiStoryItemGridItem.js.map