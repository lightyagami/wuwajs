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
    this.ZMm = undefined;
    this.yLm = undefined;
    this._Lm = -1;
    this.vzi = undefined;
    this.tEm = 1;
    this.wKs = -1;
    this.lwm = -1;
    this.Wee = new Map();
    this.U5c = new Map();
    this.iEm = new Map();
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
    this.iEm.set(t, e);
  }
  SetCurItem(t) {
    this.ZMm = t;
    this._Lm = t?.GetData()?.GetIncId() ?? -1;
  }
  SetScrollingPosition(t) {
    this.lwm = t;
  }
  GetCurItem() {
    return this.ZMm;
  }
  GetSelectItem() {}
  GetScrollingPosition() {
    return this.lwm;
  }
  GetGridItemByAnyItem(t) {
    let e = undefined;
    return e = (e = this.U5c.get(t)) || this.iEm.get(t);
  }
  GetGridItemByBtnItem(t) {
    return this.U5c.get(t);
  }
  GetCurPanelIndex() {
    return this.tEm;
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
  uLm() {
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
    var [t, e] = this.uLm();
    let i = -1;
    i = e ? t - 1 < 0 ? this.vzi.PanelBaseList.length - 1 : t - 1 : t < 0 ? this.vzi.PanelBaseList.length - 1 : t;
    e = this.vzi.PanelBaseList[i];
    if (e) {
      ControllerHolder_1.ControllerHolder.UiNavigationNewController.SetNavigationMousePositionForView(e.GetRootItem());
    }
  }
  JumpToNextPanelNew() {
    var [t] = this.uLm();
    var t = t + 1 > this.vzi.PanelBaseList.length - 1 ? 0 : t + 1;
    var t = this.vzi.PanelBaseList[t];
    if (t) {
      ControllerHolder_1.ControllerHolder.UiNavigationNewController.SetNavigationMousePositionForView(t.GetRootItem());
    }
  }
  SetPanelIndexByGridItem(t) {
    this.tEm = this.vzi.GetPanelIndexByGridItem(t);
    var e = t.GetData();
    this.wKs = e ? e.GetPosition() : t.GetEmptyPosition();
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("HonamiStory", 78, "当前导航到的Panel Index", ["panelIndex", this.tEm]);
    }
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("HonamiStory", 78, "当前导航到的Position", ["position", this.wKs]);
    }
  }
  SetFocusByGridItem(t) {
    if (t.Data && t.Data.GetIncId() === this._Lm && (t = t.GetBtnItem())) {
      ControllerHolder_1.ControllerHolder.UiNavigationNewController.SetNavigationMousePositionForView(t);
    }
  }
  rEm(t) {
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
    var t = this.GetBackpackTypeByPanelIndex(this.tEm);
    var e = this.Wee.get(this.tEm);
    if (e) {
      this.SetFocusByGridItem(e);
    } else {
      e = this.vzi.GetGridItemListByBackpackType(t);
      if (t = this.rEm(e)) {
        this.SetFocusByGridItem(t);
      }
    }
  }
  PickUp(t) {
    this.yLm = t.GetItemGridItem();
    this.vzi.OnPickUp(t);
  }
  PutDown(t) {
    this.vzi.OnPutDown(t);
    this.yLm = undefined;
  }
  oEm() {
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
    if (this.yLm && (t = this.GetGridItemByAnyItem(this.yLm.GetRootItem()))) {
      t.MarkUseCancel();
    }
    this.Cancel();
  }
  SetDefaultFocus(t = false) {
    this.tEm = t ? 3 : 2;
    this.SetFocusByCurPanelIndex();
  }
  SLm() {
    var t;
    return !!this.ZMm && !!(t = LguiEventSystemManager_1.LguiEventSystemManager.GetPointerEventData(0)) && !!HonamiStoryUtil_1.HonamiStoryUtil.CheckEventDataInItemViewport(t, this.ZMm.GetRootItem(), true);
  }
  Cancel() {
    var t;
    if (this.yLm && (t = this.GetGridItemByAnyItem(this.yLm.GetRootItem()))) {
      this.SetPanelIndexByGridItem(t);
    }
    this.oEm();
    this.vzi.Reset();
    if (this.SLm()) {
      this.TriggerCurItemEnterGrid();
    } else {
      this.ZMm = undefined;
      this._Lm = -1;
    }
    this.yLm = undefined;
  }
  Discard() {
    var t;
    var e;
    if (this.ZMm && (t = this.ZMm.GetData())) {
      e = this.ZMm.GetBackpackType() === 1 ? 2 : 4;
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
    if (this.ZMm && (t = this.ZMm.GetData())) {
      e = this.ZMm.GetBackpackType() === 0 ? 1 : 4;
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
    if (this.ZMm && (t = this.ZMm.GetData())) {
      e = this.ZMm.GetBackpackType();
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
    if (this.ZMm && (t = this.ZMm.GetData())) {
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
    if (this.ZMm && (t = this.ZMm.GetData()) && (e = this.ZMm.GetBackpackType(), i = t.IsLock(), r = HonamiStoryDefine_1.HonamiBackpackTypeMap.get(e), await HonamiStoryController_1.HonamiStoryController.RequestHonamiStoryLockItem(t.GetIncId(), r, !i), t.SetIsLock(!i), r = ModelManager_1.ModelManager.HonamiStoryModel.GetBackpackLogic())) {
      r.RefreshItemLockState(t, e);
    }
  }
  Collect() {
    var t;
    var e;
    if (this.ZMm && (t = this.ZMm.GetData())) {
      e = t.GetPosition();
      ModelManager_1.ModelManager.HonamiStoryModel.QuickPickUpFromPickUpBox(t, e);
    }
  }
  TriggerCurItemEnterGrid() {
    var t;
    if (this.ZMm && (t = this.GetGridItemByAnyItem(this.ZMm.GetRootItem()))) {
      t.TriggerOnEnterGridCb();
    }
  }
}
exports.HonamiStoryGamepadLogicController = HonamiStoryGamepadLogicController;
//# sourceMappingURL=HonamiStoryGamepadLogicController.js.map