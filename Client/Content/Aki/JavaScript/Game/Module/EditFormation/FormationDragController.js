"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormationDragData = exports.FormationDragController = undefined;
const UE = require("ue");
const Info_1 = require("../../../Core/Common/Info");
const Log_1 = require("../../../Core/Common/Log");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const Vector2D_1 = require("../../../Core/Utils/Math/Vector2D");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const UiNavigationViewManager_1 = require("../UiNavigation/New/UiNavigationViewManager");
const LguiUtil_1 = require("../Util/LguiUtil");
class FormationDragController extends UiControllerBase_1.UiControllerBase {
  static InitDragData(t) {
    this.HLg = t;
    this.Oze = Info_1.Info.IsInGamepad();
    this.DraggingIndex = 0;
    this.GamePadSelectModel = false;
  }
  static SetCustomShield(t) {
    ModelManager_1.ModelManager.UiNavigationModel.CustomShieldHotKeyComponent(this.HLg.CustomShieldHotKeyComponentSet, t);
  }
  static AddCustomShieldHotKeyComponentSetData(t) {
    this.HLg?.CustomShieldHotKeyComponentSet.add(t);
  }
  static ClearDragData() {
    this.HLg?.ClearData();
    this.HLg = undefined;
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.InputControllerChange, this.XBo);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.InputControllerChange, this.XBo);
  }
  static OnGamePadPress() {
    if (this.HLg) {
      this.HLg.FormationRoleViewList[this.HLg.DragItemPosition - 1].GamePadPress();
    }
  }
  static OnGamePadRelease() {
    if (this.HLg) {
      this.HLg.FormationRoleViewList[this.HLg.DragItemPosition - 1].GamePadRelease();
    }
  }
  static GetPositionInRange(t) {
    var o;
    var a;
    var r;
    var i;
    return !!this.HLg && !(o = t.GetLGUISpaceAbsolutePosition(), r = t.GetWidth() / 2, i = o.X + r, r = o.X - r, (a = this.HLg.DragRoleItem.GetRootItem().GetLGUISpaceAbsolutePosition()).X < r) && !(a.X > i) && !(r = t.GetHeight() / 2, i = o.Y + r, t = o.Y - r, a.Y < t) && !(a.Y > i);
  }
  static SetGamePadSelectPosition(o) {
    if (this.HLg) {
      if (this.GamePadSelectModel) {
        this.gPg = o;
      } else {
        this.HLg.DragItemPosition = o;
        for (const t of this.HLg.FormationRoleViewList) {
          t.GamePadUp();
        }
      }
      this.y6g = this.HLg.FormationRoleViewList[o - 1].GetRootItem().GetUIWorldPosition();
      this.y6g.Set(this.y6g.X + 30, this.y6g.Y, this.y6g.Z - 50);
      this.HLg.DragRoleItem?.GetRootItem().SetUIWorldLocation(this.y6g);
      if (this.HLg.DragRoleItem.GetRootItem().IsUIActiveSelf()) {
        for (let t = 0; t < this.HLg.FormationRoleViewList.length; t++) {
          var a = this.HLg.FormationRoleViewList[t];
          if (t === o - 1) {
            a.ShowOtherItemUpState();
          } else {
            a.EndShowDragItem();
          }
        }
      }
    }
  }
  static SetGamePadSelectModel(t) {
    this.GamePadSelectModel = t;
    if (this.HLg) {
      if (this.GamePadSelectModel) {
        this.gPg = this.HLg.DragItemPosition;
      } else {
        this.HLg.DragItemPosition = this.gPg;
      }
      ModelManager_1.ModelManager.UiNavigationModel.CustomShieldHotKeyComponent(this.HLg.CustomShieldHotKeyComponentSet, !this.GamePadSelectModel);
    }
  }
  static GetDragItemUiActive() {
    return this.HLg?.DragRoleItem?.GetRootItem().IsUIActiveSelf() ?? false;
  }
}
exports.FormationDragController = FormationDragController;
(_a = FormationDragController).HLg = undefined;
FormationDragController.Oze = false;
FormationDragController.XBo = () => {
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("Formation", 5, "Formation-InputControllerChange");
  }
  if (_a.Oze !== Info_1.Info.IsInGamepad()) {
    if (_a.Oze) {
      _a.CancelDrag();
    } else {
      _a.HLg?.FormationRoleViewList[_a.HLg?.DragItemPosition - 1]?.MouseCancelDrag();
    }
  }
  _a.Oze = Info_1.Info.IsInGamepad();
};
FormationDragController.OnFormationRoleViewPointDown = (t, o, a, r) => {
  if (_a.HLg && t) {
    var i = _a.HLg;
    LguiUtil_1.LguiUtil.ConvertPointerPositionToLguiCenterPosition(t.pointerPosition, i.LastDragPos);
    i.TempPointerPosition.Set(i.LastDragPos.X, 0, i.LastDragPos.Y);
    i.DragRoleItem?.GetRootItem().SetUIWorldLocation(i.TempPointerPosition.ToUeVectorOld());
    i.DragRoleItem?.RefreshRoleIcon(o, a);
    i.DragItemPosition = r;
    for (const e of i.FormationRoleViewList) {
      if (i.FormationRoleViewList.indexOf(e) + 1 !== i.DragItemPosition) {
        e.EndShowDragItem();
      }
    }
  }
};
FormationDragController.OnFormationRoleViewGamePadDown = (t, o, a, r) => {
  if (_a.HLg) {
    var i = _a.HLg;
    _a.y6g = t.GetUIWorldPosition();
    _a.y6g.Set(_a.y6g.X + 30, _a.y6g.Y, _a.y6g.Z - 50);
    i.DragRoleItem?.RefreshRoleIcon(o, a);
    i.DragItemPosition = r;
    for (const t of i.FormationRoleViewList) {
      if (i.FormationRoleViewList.indexOf(t) + 1 !== i.DragItemPosition) {
        t.EndShowDragItem();
      }
    }
  }
};
FormationDragController.OnFormationRoleViewEndDrag = a => {
  if (_a.HLg) {
    for (const e of _a.HLg?.FormationRoleViewList ?? []) {
      e.RefreshLockItemState(false);
    }
    var r = _a.HLg;
    r.DragRoleItem?.GetRootItem().SetUIActive(false);
    let t = -1;
    let o = 0;
    var i = ModelManager_1.ModelManager.PlayerInfoModel.GetId();
    for (const n of r.FormationRoleViewList) {
      if (n.GetPlayerId() === i && _a.GetPositionInRange(n.GetRootItem())) {
        t = r.FormationRoleViewList.indexOf(n) + 1;
        o = n.GetConfigId() ?? 0;
      }
      n.EndShowDragItem();
    }
    if (!(t <= 0) && !(o <= 0) && t !== r.DragItemPosition && !a) {
      a = r.FormationRoleViewList[r.DragItemPosition - 1].GetConfigId() ?? 0;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Formation", 5, "编队角色更换-拖拽");
      }
      r.ExchangeRoleCallBack?.(t, r.DragItemPosition, a, o);
    }
  }
};
FormationDragController.OnFormationRoleViewMoveDrag = t => {
  if (_a.HLg && t) {
    var o = _a.HLg;
    LguiUtil_1.LguiUtil.ConvertPointerPositionToLguiCenterPosition(t.pointerPosition, o.CurDragPos);
    var t = Vector2D_1.Vector2D.Create(o.CurDragPos.X, o.CurDragPos.Y).SubtractionEqual(o.LastDragPos);
    if (!t.IsNearlyZero(0)) {
      var t = o.CurDragPos.X - o.LastDragPos.X;
      var a = o.CurDragPos.Y - o.LastDragPos.Y;
      o.TempAnchorOffset.FromUeVector2D(o.DragRoleItem.GetRootItem().GetAnchorOffset());
      o.TempAnchorOffset.X += t;
      o.TempAnchorOffset.Y += a;
      o.DragRoleItem.GetRootItem().SetAnchorOffset(o.TempAnchorOffset.ToUeVector2D());
      o.LastDragPos.DeepCopy(o.CurDragPos);
      for (const r of o.FormationRoleViewList) {
        if ((r.GetConfigId() ?? 0) > 0 && _a.GetPositionInRange(r.GetRootItem())) {
          r.ShowOtherItemUpState();
        } else {
          r.EndShowDragItem();
        }
      }
    }
  }
};
FormationDragController.DraggingIndex = 0;
FormationDragController.DragStartMoveFirstRelease = false;
FormationDragController.OnFormationRoleViewStartDrag = () => {
  _a.HLg?.DragRoleItem?.GetRootItem().SetUIActive(true);
  for (const t of _a.HLg?.FormationRoleViewList ?? []) {
    t.RefreshLockItemState(true);
  }
  UiNavigationViewManager_1.UiNavigationViewManager.RefreshCurrentHotKey();
  if (Info_1.Info.IsInGamepad()) {
    _a.DragStartMoveFirstRelease = true;
    _a.SetGamePadSelectModel(true);
  }
};
FormationDragController.gPg = 0;
FormationDragController.y6g = new UE.Vector();
FormationDragController.GamePadSelectModel = false;
FormationDragController.DragConfirm = () => {
  if (_a.HLg) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Formation", 5, "Formation-GamePad-DragConfirm");
    }
    _a.HLg.FormationRoleViewList[_a.HLg.DragItemPosition - 1].GamePadUp();
    _a.SetGamePadSelectModel(false);
  }
};
FormationDragController.CancelDrag = () => {
  if (_a.HLg && _a.GamePadSelectModel) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Formation", 5, "Formation-GamePad-CancelDrag");
    }
    _a.HLg.FormationRoleViewList[_a.HLg.DragItemPosition - 1].GamePadUp(true);
    _a.SetGamePadSelectModel(false);
  }
};
class FormationDragData {
  constructor() {
    this.FormationRoleViewList = [];
    this.DragRoleItem = undefined;
    this.CustomShieldHotKeyComponentSet = new Set();
    this.ExchangeRoleCallBack = undefined;
    this.DragItemPosition = 0;
    this.CurDragPos = Vector2D_1.Vector2D.Create();
    this.LastDragPos = Vector2D_1.Vector2D.Create();
    this.TempAnchorOffset = Vector2D_1.Vector2D.Create();
    this.TempPointerPosition = Vector_1.Vector.Create();
  }
  ClearData() {
    this.DragRoleItem = undefined;
    for (const t of this.FormationRoleViewList) {
      t.Reset();
    }
    this.FormationRoleViewList = [];
    this.CustomShieldHotKeyComponentSet.clear();
  }
}
exports.FormationDragData = FormationDragData;
//# sourceMappingURL=FormationDragController.js.map