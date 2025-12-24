"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryGamepadLogicController = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const LguiEventSystemManager_1 = require("../../../Ui/LguiEventSystem/LguiEventSystemManager");
const UiManager_1 = require("../../../Ui/UiManager");
const HonamiStoryController_1 = require("../HonamiStoryController");
const HonamiStoryDefine_1 = require("../HonamiStoryDefine");
const HonamiStoryUtil_1 = require("../HonamiStoryUtil");
const HonamiStoryGamepadInteractController_1 = require("../View/Backpack/HonamiStoryGamepadInteractController");
class HonamiStoryGamepadLogicController {
  constructor() {
    this.l2m = undefined;
    this.Epf = undefined;
    this.zgf = -1;
    this.vzi = undefined;
    this.u2m = 1;
    this.wKs = -1;
    this.Oif = -1;
    this.Wee = new Map();
    this.U5c = new Map();
    this.c2m = new Map();
    this.MYl = Vector2D_1.Vector2D.Create();
  }
  InitInteract(t) {
    this.vzi ||= new HonamiStoryGamepadInteractController_1.HonamiStoryGamepadInteractController();
  }
  RegisterPanel(t) {
    this.vzi.RegisterPanel(t);
  }
  RegisterBtnToGrid(t, e) {
    this.U5c.set(t, e);
  }
  RegisterItemToGrid(t, e) {
    this.c2m.set(t, e);
  }
  SetCurItem(t) {
    this.l2m = t;
    this.zgf = t?.GetData()?.GetIncId() ?? -1;
  }
  SetScrollingPosition(t) {
    this.Oif = t;
  }
  GetCurItem() {
    return this.l2m;
  }
  GetSelectItem() {}
  GetScrollingPosition() {
    return this.Oif;
  }
  GetGridItemByAnyItem(t) {
    let e = undefined;
    return e = (e = this.U5c.get(t)) || this.c2m.get(t);
  }
  GetGridItemByBtnItem(t) {
    return this.U5c.get(t);
  }
  GetCurPanelIndex() {
    return this.u2m;
  }
  GetInteractController() {
    return this.vzi;
  }
  GetBackpackTypeByPanelIndex(t) {
    let e = -1;
    if (t === 1) {
      e = 3;
    } else if (t === 2) {
      e = this.IsInGame() ? 1 : 0;
    } else if (t === 3) {
      e = 2;
    }
    return e;
  }
  IsInGame() {
    return HonamiStoryUtil_1.HonamiStoryUtil.CheckInHonamiStoryDungeon();
  }
  Jgf() {
    var i = ControllerHolder_1.ControllerHolder.UiNavigationNewController.GetMouseViewportPosition();
    if (!i) {
      return [-1, false];
    }
    let r = -1;
    let o = false;
    for (let t = 0, e = this.vzi.PanelBaseList.length; t < e; ++t) {
      var a = this.vzi.PanelBaseList[t];
      this.MYl.Set(0, 0);
      var n = a.GetRootItem().GetPositionInViewportWithPivot(true, this.MYl.ToUeVector2D());
      this.MYl.Set(1, 1);
      var a = a.GetRootItem().GetPositionInViewportWithPivot(true, this.MYl.ToUeVector2D());
      if (i.X < n.X) {
        break;
      }
      o = i.X <= a.X;
      r = t;
    }
    return [r, o];
  }
  JumpToPrevPanelNew() {
    var [t, e] = this.Jgf();
    let i = -1;
    i = e ? t - 1 < 0 ? this.vzi.PanelBaseList.length - 1 : t - 1 : t < 0 ? this.vzi.PanelBaseList.length - 1 : t;
    e = this.vzi.PanelBaseList[i];
    if (e) {
      ControllerHolder_1.ControllerHolder.UiNavigationNewController.SetNavigationMousePositionForView(e.GetRootItem());
    }
  }
  JumpToNextPanelNew() {
    var [t] = this.Jgf();
    var t = t + 1 > this.vzi.PanelBaseList.length - 1 ? 0 : t + 1;
    var t = this.vzi.PanelBaseList[t];
    if (t) {
      ControllerHolder_1.ControllerHolder.UiNavigationNewController.SetNavigationMousePositionForView(t.GetRootItem());
    }
  }
  SetPanelIndexByGridItem(t) {
    this.u2m = this.vzi.GetPanelIndexByGridItem(t);
    var e = t.GetData();
    this.wKs = e ? e.GetPosition() : t.GetEmptyPosition();
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("HonamiStory", 78, "当前导航到的Panel Index", ["panelIndex", this.u2m]);
    }
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("HonamiStory", 78, "当前导航到的Position", ["position", this.wKs]);
    }
  }
  SetFocusByGridItem(t) {
    if (t.Data && t.Data.GetIncId() === this.zgf && (t = t.GetBtnItem())) {
      ControllerHolder_1.ControllerHolder.UiNavigationNewController.SetNavigationMousePositionForView(t);
    }
  }
  d2m(t) {
    let e = t[0];
    for (const i of t) {
      if (i.GetItemGridItem() !== undefined) {
        e = i;
        break;
      }
    }
    return e;
  }
  SetFocusByCurPanelIndex() {
    var t = this.GetBackpackTypeByPanelIndex(this.u2m);
    var e = this.Wee.get(this.u2m);
    if (e) {
      this.SetFocusByGridItem(e);
    } else {
      e = this.vzi.GetGridItemListByBackpackType(t);
      if (t = this.d2m(e)) {
        this.SetFocusByGridItem(t);
      }
    }
  }
  PickUp(t) {
    this.Epf = t.GetItemGridItem();
    this.vzi.OnPickUp(t);
  }
  PutDown(t) {
    this.vzi.OnPutDown(t);
    this.Epf = undefined;
  }
  m2m() {
    var t = UiManager_1.UiManager.GetViewByName("HonamiStoryBackpackView");
    if (t) {
      t.HideAllTips();
    }
    var t = UiManager_1.UiManager.GetViewByName("HonamiStoryBackpackView");
    if (t) {
      t.HideAllTips();
    }
  }
  Reset() {
    this.Cancel();
  }
  SwitchToKeyboardState() {
    this.Cancel();
  }
  SwitchToGamepadState(t = false) {
    var e = ModelManager_1.ModelManager.HonamiStoryModel.GetBackpackLogicState() === 4;
    ControllerHolder_1.ControllerHolder.UiNavigationNewController.SetLockUseDragState(e);
    this.SetDefaultFocus(t);
  }
  CancelOperationByGamepad() {
    var t;
    if (this.Epf && (t = this.GetGridItemByAnyItem(this.Epf.GetRootItem()))) {
      t.MarkUseCancel();
    }
    this.Cancel();
  }
  SetDefaultFocus(t = false) {
    this.u2m = t ? 3 : 2;
    this.SetFocusByCurPanelIndex();
  }
  Ipf() {
    var t;
    return !!this.l2m && !!(t = LguiEventSystemManager_1.LguiEventSystemManager.GetPointerEventData(0)) && !!HonamiStoryUtil_1.HonamiStoryUtil.CheckEventDataInItemViewport(t, this.l2m.GetRootItem(), true);
  }
  Cancel() {
    var t;
    if (this.Epf && (t = this.GetGridItemByAnyItem(this.Epf.GetRootItem()))) {
      this.SetPanelIndexByGridItem(t);
    }
    this.m2m();
    this.vzi.Reset();
    if (this.Ipf()) {
      this.TriggerCurItemEnterGrid();
    } else {
      this.l2m = undefined;
      this.zgf = -1;
    }
    this.Epf = undefined;
  }
  Discard() {
    var t;
    var e;
    if (this.l2m && (t = this.l2m.GetData())) {
      e = this.l2m.GetBackpackType() === 1 ? 2 : 4;
      if (ModelManager_1.ModelManager.HonamiStoryModel.GetBackPackData(3).GetCapacity() > 0) {
        if (ModelManager_1.ModelManager.HonamiStoryModel.SetItemIntoBag(t, e, 3)) {
          ModelManager_1.ModelManager.HonamiStoryModel.SetBackpackLogicState(0);
        }
      } else {
        HonamiStoryController_1.HonamiStoryController.RequestDiscardItem(t, e);
        ModelManager_1.ModelManager.HonamiStoryModel.SetBackpackLogicState(0);
      }
    }
  }
  SellSingleOne() {
    var t;
    var e;
    if (this.l2m && (t = this.l2m.GetData())) {
      e = this.l2m.GetBackpackType() === 0 ? 1 : 4;
      ModelManager_1.ModelManager.HonamiStoryModel.SellSingleItem(t, e).then(t => {
        if (t) {
          ModelManager_1.ModelManager.HonamiStoryModel.SetBackpackLogicState(0);
        }
      });
    }
  }
  QuickEquipOn() {
    var t;
    var e;
    var i;
    if (this.l2m && (t = this.l2m.GetData())) {
      e = this.l2m.GetBackpackType();
      i = t.GetPosition();
      if (e === 1 || e === 0) {
        if (t.GetItemType() === 1) {
          if (!ModelManager_1.ModelManager.HonamiStoryModel.QuickEquipFromBackpack(t, i)) {
            ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("HonamiStory_ShowTips_CantQuickEquip");
          }
        } else {
          ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("HonamiStory_CantEquipNormalItem");
        }
      } else if (e === 2) {
        ModelManager_1.ModelManager.HonamiStoryModel.QuickPickUpFromPickUpBox(t, i);
      }
    }
  }
  QuickEquipOff() {
    var t;
    var e;
    if (this.l2m && (t = this.l2m.GetData())) {
      e = this.IsInGame() ? 2 : 1;
      if (!ModelManager_1.ModelManager.HonamiStoryModel.SetItemIntoBag(t, 4, e)) {
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("HonamiStory_NoEnoughSpace");
      }
    }
  }
  async SetLockStatus() {
    var t;
    var e;
    var i;
    var r;
    if (this.l2m && (t = this.l2m.GetData()) && (e = this.l2m.GetBackpackType(), i = t.IsLock(), r = HonamiStoryDefine_1.HonamiBackpackTypeMap.get(e), await HonamiStoryController_1.HonamiStoryController.RequestHonamiStoryLockItem(t.GetIncId(), r, !i), t.SetIsLock(!i), r = ModelManager_1.ModelManager.HonamiStoryModel.GetBackpackLogic())) {
      r.RefreshItemLockState(t, e);
    }
  }
  Collect() {
    var t;
    var e;
    if (this.l2m && (t = this.l2m.GetData())) {
      e = t.GetPosition();
      ModelManager_1.ModelManager.HonamiStoryModel.QuickPickUpFromPickUpBox(t, e);
    }
  }
  TriggerCurItemEnterGrid() {
    var t;
    if (this.l2m && (t = this.GetGridItemByAnyItem(this.l2m.GetRootItem()))) {
      t.TriggerOnEnterGridCb();
    }
  }
}
exports.HonamiStoryGamepadLogicController = HonamiStoryGamepadLogicController;
//# sourceMappingURL=HonamiStoryGamepadLogicController.js.map