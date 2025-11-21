"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryInteractController = undefined;
const UE = require("ue");
const AudioSystem_1 = require("../../../../../Core/Audio/AudioSystem");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const HonamiStoryController_1 = require("../../HonamiStoryController");
const HonamiStoryDefine_1 = require("../../HonamiStoryDefine");
const HonamiStoryUtil_1 = require("../../HonamiStoryUtil");
const HonamiStoryInteractOperateAgent_1 = require("./HonamiStoryInteractOperateAgent");
const HonamiStoryGridItemBase_1 = require("./Item/HonamiStoryGridItemBase");
class HonamiStoryInteractController {
  constructor() {
    this.dCd = undefined;
    this.Ugo = undefined;
    this.TLm = undefined;
    this.bLm = undefined;
    this.RLm = undefined;
    this.wLm = -1;
    this.Xpt = undefined;
    this.PanelBaseList = [];
    this.BackpackView = undefined;
    this.PickUpBackpackView = undefined;
    this.IsSellDragging = false;
    this.Tgd = new HonamiStoryInteractOperateAgent_1.HonamiStoryInteractOperateAgent();
  }
  async Init(t) {
    var i = [];
    this.dCd = t;
    this.Ugo = new HonamiStoryGridItemBase_1.HonamiStoryGridItemBase(false);
    this.Ugo.SetIsForDrag(true);
    i.push(this.Ugo.CreateByResourceIdAsync("UiItem_HonamiStoryGrid", this.dCd));
    this.TLm = new UiPanelBase_1.UiPanelBase();
    this.bLm = new UiPanelBase_1.UiPanelBase();
    this.RLm = new UiPanelBase_1.UiPanelBase();
    i.push(this.TLm.CreateByResourceIdAsync("UiItem_HonamiStoryGridState", this.dCd));
    i.push(this.bLm.CreateByResourceIdAsync("UiItem_HonamiStoryItemState", this.dCd));
    i.push(this.RLm.CreateByResourceIdAsync("UiItem_HonamiStoryItemState", this.dCd));
    await Promise.all(i);
    this.Ugo.SetUiActive(false);
    this.TLm.SetUiActive(false);
    this.bLm.SetUiActive(false);
    this.RLm.SetUiActive(false);
  }
  OnBeforeShow() {
    this.Ugo.GetRootItem().SetPivot(new UE.Vector2D(0.5, 0.5));
    this.Ugo.GetOriginalItem().SetUIParent(this.dCd);
  }
  RegisterPanel(t) {
    this.PanelBaseList.push(t);
  }
  RegisterBackpackView(t) {
    this.BackpackView = t;
  }
  RegisterPickUpView(t) {
    this.PickUpBackpackView = t;
  }
  ClearPanel() {
    this.PanelBaseList = [];
  }
  RefreshDragItem(t, i) {
    var e = t.OperateData;
    var r = this.Ugo.GetData();
    var s = r?.GetIsDragCross();
    if (e !== r || i !== s) {
      e.SetIsDragCross(i);
      this.Ugo.Refresh(e, -1);
      r = i ? t.BaseHeight : t.BaseWidth;
      s = i ? t.BaseWidth : t.BaseHeight;
      (e = this.Ugo.GetRootItem()).SetWidth(r);
      e.SetHeight(s);
    }
  }
  SetDragItemPositionByItem(t) {
    t = t.GetRootItem().K2_GetComponentLocation();
    this.SetDragItemLocation(t);
  }
  SetDragItemLocation(t) {
    var i = this.Ugo.GetData();
    var e = i.GetIsDragCross();
    var r = HonamiStoryUtil_1.HonamiStoryUtil.IsMobileView();
    var s = r ? HonamiStoryDefine_1.HONAMI_GRID_ITEM_WIDTH_MOBILE : HonamiStoryDefine_1.HONAMI_GRID_ITEM_WIDTH;
    var r = r ? HonamiStoryDefine_1.HONAMI_GRID_ITEM_HEIGHT_MOBILE : HonamiStoryDefine_1.HONAMI_GRID_ITEM_HEIGHT;
    var s = i.GetBaseGridWidth(e) * s;
    var i = i.GetBaseGridHeight(e) * r;
    t.X = t.X - s / 2;
    t.Z = t.Z + i / 2;
    this.Ugo.GetRootItem().K2_SetWorldLocation(t, false, undefined, false);
  }
  GetDragTipsRoot() {
    return this.Ugo.GetItemGridItem().GetTipsRoot();
  }
  GetDragItemLocation() {
    return this.Ugo.GetRootItem().K2_GetComponentToWorld().GetLocation();
  }
  GetDragItemIncId() {
    return this.Ugo.GetIncId();
  }
  DragBegin(t, i) {
    this.Tgd.Clear();
    this.Tgd.BaseWidth = 0;
    this.Tgd.BaseHeight = 0;
    this.Tgd.StartOperateBackpack = t;
    this.Tgd.OperateData = i.GetData();
    this.RefreshDragItem(this.Tgd, false);
    for (const e of this.PanelBaseList) {
      if (e.GetBackpackType() === 4) {
        e.OnDragBegin(undefined, i);
        break;
      }
    }
    if (this.BackpackView) {
      this.BackpackView.OnDragBegin();
    }
    if (this.PickUpBackpackView) {
      this.PickUpBackpackView.OnDragBegin();
    }
    return true;
  }
  OnDrag(i) {
    if (i) {
      var e = this.Ugo.IsUiActiveInHierarchy();
      this.Ugo.SetUiActive(true);
      if (!e && HonamiStoryUtil_1.HonamiStoryUtil.IsMobileView()) {
        this.Ugo.PlayMoveItemSeq();
      }
      this.SetDragItemLocation(i.GetWorldPointInPlane());
      let t = undefined;
      for (const r of this.PanelBaseList) {
        if (r.CheckDragItemInViewport(i)) {
          if (!HonamiStoryUtil_1.HonamiStoryUtil.IsMobileView()) {
            t = r;
            break;
          }
          if (r.GetBackpackType() !== 3) {
            t = r;
            break;
          }
          t = r;
        }
      }
      if (t) {
        if (this.Tgd.TargetOperateBackpack !== t) {
          this.Tgd.TargetOperateBackpack?.OnHoverEnd();
          this.Tgd.TargetOperateBackpack = t;
          this.Tgd.TargetOperateBackpack?.OnHover(i, this.Tgd);
        } else {
          this.Tgd.TargetOperateBackpack.OnHover(i, this.Tgd);
        }
      } else {
        this.Tgd.TargetOperateBackpack?.OnHoverEnd();
        this.Tgd.TargetOperateBackpack = undefined;
        this.Tgd.TargetPosition = -1;
      }
    }
  }
  DragEnd(t, i) {
    this.Ugo.SetUiActive(false);
    this.bgd(t, i);
    if (this.Tgd.TargetOperateBackpack) {
      this.Tgd.TargetOperateBackpack.OnHoverEnd();
    }
    for (const e of this.PanelBaseList) {
      if (e.GetBackpackType() === 4) {
        e.OnDragEnd(undefined, i);
        break;
      }
    }
    if (this.BackpackView) {
      this.BackpackView.OnDragEnd();
    }
    if (this.PickUpBackpackView) {
      this.PickUpBackpackView.OnDragEnd();
    }
  }
  bgd(t, i) {
    if (t) {
      if (this.Tgd.TargetOperateBackpack && this.Tgd.StartOperateBackpack) {
        if (!i.GetIsUseCancel()) {
          i = [];
          if (this.Tgd.TargetOperateBackpack.GetBackpackType() === 4) {
            if (this.Tgd.OperateData.IsLock()) {
              ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("HonamiStory_TryDiscardLockItem");
            } else {
              if (!ModelManager_1.ModelManager.HonamiStoryModel.GetBackpackLogic().IsBackpackView()) {
                var e = this.Tgd.StartOperateBackpack.GetBackpackType();
                if (e === 2) {
                  return;
                }
                e = e === 3 ? 4 : 2;
                ModelManager_1.ModelManager.HonamiStoryModel.SetItemIntoBag(this.Tgd.OperateData, e, 3);
              } else {
                e = this.Tgd.TargetOperateBackpack.GetExchangeItemSet(t, this.Tgd.OperateData);
                if (!e) {
                  return;
                }
                e = this.Tgd.StartOperateBackpack.GetUpdateInfoInSendBackpack(t, this.Tgd.OperateData, e);
                if (!e) {
                  return;
                }
                HonamiStoryController_1.HonamiStoryController.SendHonamiStoryDiscardItemRequest(e);
              }
              AudioSystem_1.AudioSystem.PostEvent("play_ui_honamistory_backpack_discard");
            }
          } else {
            if (this.Tgd.TargetOperateBackpack === this.Tgd.StartOperateBackpack) {
              e = this.Tgd.TargetOperateBackpack.GetUpdateInfoInSameBackpack(t, this.Tgd.OperateData);
              if (!e) {
                return;
              }
              i.push(e);
            } else {
              e = this.Tgd.TargetOperateBackpack.GetExchangeItemSet(t, this.Tgd.OperateData);
              if (!e) {
                return;
              }
              if (this.Tgd.StartOperateBackpack.GetBackpackType() === 0 && e.size > 0) {
                var r = ModelManager_1.ModelManager.HonamiStoryModel.GetBackPackData(1).GetCapacity();
                if (this.Tgd.OperateData.GetPosition() >= r) {
                  ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("HonamiStory_NoSpaceForQuickAll");
                  return;
                }
              }
              if (!this.Kwm(e)) {
                ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("HonamiStory_TryDiscardLockItem");
                return;
              }
              r = this.Tgd.TargetOperateBackpack.GetUpdateInfoInReceiveBackpack(t, this.Tgd.OperateData, e);
              if (!r) {
                return;
              }
              i.push(r);
              r = this.Tgd.StartOperateBackpack.GetUpdateInfoInSendBackpack(t, this.Tgd.OperateData, e);
              if (!r) {
                return;
              }
              i.push(r);
            }
            HonamiStoryController_1.HonamiStoryController.SendHonamiStoryBagOperateRequest(i);
          }
        }
      } else if (t = this.Tgd.OperateData) {
        t.SetIsDragCross(t.GetIsCross());
      }
    }
  }
  Kwm(t) {
    var i = this.Tgd.StartOperateBackpack.GetBackpackType() === 2;
    var e = this.Tgd.TargetOperateBackpack.GetBackpackType() === 2;
    if (i || e) {
      if (e) {
        if (this.Tgd.OperateData.IsLock()) {
          return false;
        }
        ModelManager_1.ModelManager.HonamiStoryModel.ShowDiscardTips(this.Tgd.OperateData);
      } else {
        for (const r of t) {
          if (r.IsLock()) {
            return false;
          }
        }
      }
    }
    return true;
  }
  OnHoverItem(t, i) {
    if (!HonamiStoryUtil_1.HonamiStoryUtil.IsMobileView() && (!this.Xpt || i !== this.Xpt.GetPanelForHover())) {
      (t ? this.TLm : this.bLm).GetOriginalItem().SetUIParent(i);
      this.TLm.SetUiActive(t);
      this.bLm.SetUiActive(!t);
    }
  }
  OnUnHover() {
    if (!HonamiStoryUtil_1.HonamiStoryUtil.IsMobileView()) {
      this.TLm.SetUiActive(false);
      this.bLm.SetUiActive(false);
    }
  }
  OnClickedItem(t, i, e) {
    this.wLm = i;
    this.RLm.SetUiActive(t);
    this.Xpt = e;
    if (t && e) {
      this.RLm.GetOriginalItem().SetUIParent(e.GetPanelForHover());
    }
  }
  RefreshSelectedUiItem() {
    var t;
    if (this.Xpt && this.Xpt.IsUiActiveInHierarchy() && !(this.wLm <= 0) && (t = this.Xpt.GetData())) {
      this.RLm.SetUiActive(t.GetIncId() === this.wLm);
    } else {
      this.RLm.SetUiActive(false);
    }
  }
}
exports.HonamiStoryInteractController = HonamiStoryInteractController;
//# sourceMappingURL=HonamiStoryInteractController.js.map