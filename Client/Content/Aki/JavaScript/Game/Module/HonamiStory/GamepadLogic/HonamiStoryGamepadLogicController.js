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
    this.ckm = undefined;
    this.sSf = undefined;
    this.epf = -1;
    this.vzi = undefined;
    this.mkm = 1;
    this.wKs = -1;
    this.Zof = -1;
    this.Wee = new Map();
    this.U5c = new Map();
    this.fkm = new Map();
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
    this.fkm.set(t, e);
  }
  SetCurItem(t) {
    this.ckm = t;
    this.epf = t?.GetData()?.GetIncId() ?? -1;
  }
  SetScrollingPosition(t) {
    this.Zof = t;
  }
  GetCurItem() {
    return this.ckm;
  }
  GetSelectItem() {}
  GetScrollingPosition() {
    return this.Zof;
  }
  GetGridItemByAnyItem(t) {
    let e = undefined;
    return e = (e = this.U5c.get(t)) || this.fkm.get(t);
  }
  GetGridItemByBtnItem(t) {
    return this.U5c.get(t);
  }
  GetCurPanelIndex() {
    return this.mkm;
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
  tpf() {
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
    var [t, e] = this.tpf();
    let i = -1;
    i = e ? t - 1 < 0 ? this.vzi.PanelBaseList.length - 1 : t - 1 : t < 0 ? this.vzi.PanelBaseList.length - 1 : t;
    e = this.vzi.PanelBaseList[i];
    if (e) {
      ControllerHolder_1.ControllerHolder.UiNavigationNewController.SetNavigationMousePositionForView(e.GetRootItem());
    }
  }
  JumpToNextPanelNew() {
    var [t] = this.tpf();
    var t = t + 1 > this.vzi.PanelBaseList.length - 1 ? 0 : t + 1;
    var t = this.vzi.PanelBaseList[t];
    if (t) {
      ControllerHolder_1.ControllerHolder.UiNavigationNewController.SetNavigationMousePositionForView(t.GetRootItem());
    }
  }
  SetPanelIndexByGridItem(t) {
    this.mkm = this.vzi.GetPanelIndexByGridItem(t);
    var e = t.GetData();
    this.wKs = e ? e.GetPosition() : t.GetEmptyPosition();
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("HonamiStory", 78, "当前导航到的Panel Index", ["panelIndex", this.mkm]);
    }
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("HonamiStory", 78, "当前导航到的Position", ["position", this.wKs]);
    }
  }
  SetFocusByGridItem(t) {
    if (t.Data && t.Data.GetIncId() === this.epf && (t = t.GetBtnItem())) {
      ControllerHolder_1.ControllerHolder.UiNavigationNewController.SetNavigationMousePositionForView(t);
    }
  }
  gkm(t) {
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
    var t = this.GetBackpackTypeByPanelIndex(this.mkm);
    var e = this.Wee.get(this.mkm);
    if (e) {
      this.SetFocusByGridItem(e);
    } else {
      e = this.vzi.GetGridItemListByBackpackType(t);
      if (t = this.gkm(e)) {
        this.SetFocusByGridItem(t);
      }
    }
  }
  PickUp(t) {
    this.sSf = t.GetItemGridItem();
    this.vzi.OnPickUp(t);
  }
  PutDown(t) {
    this.vzi.OnPutDown(t);
    this.sSf = undefined;
  }
  Ckm() {
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
    if (this.sSf && (t = this.GetGridItemByAnyItem(this.sSf.GetRootItem()))) {
      t.MarkUseCancel();
    }
    this.Cancel();
  }
  SetDefaultFocus(t = false) {
    this.mkm = t ? 3 : 2;
    this.SetFocusByCurPanelIndex();
  }
  aSf() {
    var t;
    return !!this.ckm && !!(t = LguiEventSystemManager_1.LguiEventSystemManager.GetPointerEventData(0)) && !!HonamiStoryUtil_1.HonamiStoryUtil.CheckEventDataInItemViewport(t, this.ckm.GetRootItem(), true);
  }
  Cancel() {
    var t;
    if (this.sSf && (t = this.GetGridItemByAnyItem(this.sSf.GetRootItem()))) {
      this.SetPanelIndexByGridItem(t);
    }
    this.Ckm();
    this.vzi.Reset();
    if (this.aSf()) {
      this.TriggerCurItemEnterGrid();
    } else {
      this.ckm = undefined;
      this.epf = -1;
    }
    this.sSf = undefined;
  }
  Discard() {
    var t;
    var e;
    if (this.ckm && (t = this.ckm.GetData())) {
      e = this.ckm.GetBackpackType() === 1 ? 2 : 4;
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
    if (this.ckm && (t = this.ckm.GetData())) {
      e = this.ckm.GetBackpackType() === 0 ? 1 : 4;
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
    if (this.ckm && (t = this.ckm.GetData())) {
      e = this.ckm.GetBackpackType();
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
    if (this.ckm && (t = this.ckm.GetData())) {
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
    if (this.ckm && (t = this.ckm.GetData()) && (e = this.ckm.GetBackpackType(), i = t.IsLock(), r = HonamiStoryDefine_1.HonamiBackpackTypeMap.get(e), await HonamiStoryController_1.HonamiStoryController.RequestHonamiStoryLockItem(t.GetIncId(), r, !i), t.SetIsLock(!i), r = ModelManager_1.ModelManager.HonamiStoryModel.GetBackpackLogic())) {
      r.RefreshItemLockState(t, e);
    }
  }
  Collect() {
    var t;
    var e;
    if (this.ckm && (t = this.ckm.GetData())) {
      e = t.GetPosition();
      ModelManager_1.ModelManager.HonamiStoryModel.QuickPickUpFromPickUpBox(t, e);
    }
  }
  TriggerCurItemEnterGrid() {
    var t;
    if (this.ckm && (t = this.GetGridItemByAnyItem(this.ckm.GetRootItem()))) {
      t.TriggerOnEnterGridCb();
    }
  }
}
exports.HonamiStoryGamepadLogicController = HonamiStoryGamepadLogicController;
//# sourceMappingURL=HonamiStoryGamepadLogicController.js.map