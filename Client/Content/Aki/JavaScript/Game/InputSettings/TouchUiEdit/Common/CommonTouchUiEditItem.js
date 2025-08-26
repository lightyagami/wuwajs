"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonTouchUiEditItem = undefined;
const UE = require("ue");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const TouchUiEditViewModel_1 = require("../TouchUiEditViewModel");
const disableChildCompClasses = [UE.UIDraggableComponent.StaticClass(), UE.UISelectableComponent.StaticClass()];
class CommonTouchUiEditItem {
  constructor(t, i) {
    this.RootItem = t;
    this.Data = undefined;
    this.rHu = new UE.Vector(1, 1, 1);
    this.pgt = undefined;
    this.vgt = undefined;
    this.oHu = 0;
    this.nHu = 0;
    this.OnDrag = t => {
      var i;
      var s;
      if (!!this.Data && !!this.pgt && !(TouchUiEditViewModel_1.TouchUiEditViewModel.GetTouchFingerDataCount() >= 2)) {
        i = t.GetLocalPointInPlane();
        t = t.dragComponent.GetOwner().D_GetActorScale3D();
        s = (i.X - this.pgt.X) * t.X;
        t = (i.Y - this.pgt.Y) * t.Z;
        if (s != 0 && t != 0) {
          this.vgt.X += s;
          this.vgt.Y += t;
          this.vgt.Z = 0;
          this.b_d(this.vgt);
          this.pgt = i;
        }
      }
    };
    this.OnDragBegin = t => {
      this.pgt = t.GetLocalPointInPlane();
      t = this.RootItem.GetLGUISpaceAbsolutePosition();
      this.vgt = new UE.Vector(t.X, t.Y, t.Z);
    };
    this.OnDragEnd = t => {
      this.pgt = undefined;
    };
    this.OnButtonPress = () => {
      var t;
      if (this.Data) {
        this.pgt = undefined;
        t = this.RootItem.GetLGUISpaceAbsolutePosition();
        this.vgt = new UE.Vector(t.X, t.Y, t.Z);
        TouchUiEditViewModel_1.TouchUiEditViewModel.SetCurrentSelectedItem(this);
      } else {
        ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("NotEdit");
      }
    };
    this.OnButtonRelease = () => {
      this.pgt = undefined;
    };
    this.OnExtendToggleStateChanged = t => {
      if (this.Data && t === 1) {
        TouchUiEditViewModel_1.TouchUiEditViewModel.SetCurrentSelectedItem(this);
      }
    };
    this.OnCheckCanExecuteChange = () => {
      var t;
      if (this.Data) {
        return !(t = TouchUiEditViewModel_1.TouchUiEditViewModel.GetCurrentSelectedItem()) || t !== this;
      } else {
        ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("NotEdit");
        return false;
      }
    };
    var s = this.RootItem.GetOwner();
    let h = s.GetComponentByClass(UE.UIDraggableComponent.StaticClass());
    let e = s.GetComponentByClass(UE.UIButtonComponent.StaticClass());
    t = s.GetComponentByClass(UE.UIExtendToggle.StaticClass());
    if (i?.Editable) {
      this.RootItem.SetRaycastTarget(true);
      for (const r of disableChildCompClasses) {
        var o = UE.LGUIBPLibrary.GetComponentsInChildren(s, r, false);
        for (let t = 0; t < o.Num(); t++) {
          o.Get(t)?.GetOwner()?.GetComponentByClass(UE.UIItem.StaticClass())?.SetRaycastTarget(false);
        }
      }
    }
    (h = !h && i?.Editable ? s.AddComponentByClass(UE.UIDraggableComponent.StaticClass(), false, MathUtils_1.MathUtils.DefaultTransform, false) : h)?.OnPointerDragCallBack.Bind(this.OnDrag);
    h?.OnPointerBeginDragCallBack.Bind(this.OnDragBegin);
    h?.OnPointerEndDragCallBack.Bind(this.OnDragEnd);
    (e = !e && i?.Editable ? s.AddComponentByClass(UE.UIButtonComponent.StaticClass(), false, MathUtils_1.MathUtils.DefaultTransform, false) : e)?.OnPointDownCallBack.Bind(this.OnButtonPress);
    e?.OnPointUpCallBack.Bind(this.OnButtonRelease);
    if (t) {
      t.OnStateChange.Add(this.OnExtendToggleStateChanged);
      t.CanExecuteChange.Bind(this.OnCheckCanExecuteChange);
    }
    this.oHu = this.RootItem.GetAnchorOffsetX();
    this.nHu = this.RootItem.GetAnchorOffsetY();
  }
  SetData(t) {
    this.Data = t;
    this.aHu();
    var i = this.RootItem.GetLGUISpaceAbsolutePosition();
    this.vgt = new UE.Vector(i.X + (t?.OffsetX ?? 0), i.Y + (t?.OffsetY ?? 0), i.Z);
  }
  SetOffset(t, i) {
    var s = this.RootItem.GetOwner().D_GetActorScale3D();
    var t = (t - this.Data.OffsetX) * s.X;
    var i = (i - this.Data.OffsetY) * s.Y;
    if (t != 0 || i != 0) {
      this.vgt.X += t;
      this.vgt.Y += i;
      this.vgt.Z = 0;
      this.b_d(this.vgt);
    }
  }
  SetScale(t) {
    this.rHu.X = t;
    this.rHu.Y = t;
    this.rHu.Z = t;
    this.hHu("Scale", t);
  }
  SetAlpha(t) {
    this.hHu("Alpha", t);
  }
  SetHierarchyIndex(t) {
    this.hHu("HierarchyIndex", t);
  }
  OnViewDestroy() {
    var t;
    var i = this.RootItem.GetOwner();
    if (i && ((t = i.GetComponentByClass(UE.UIDraggableComponent.StaticClass())) && (t.OnPointerDragCallBack.Unbind(), t.OnPointerBeginDragCallBack.Unbind(), t.OnPointerEndDragCallBack.Unbind()), (t = i.GetComponentByClass(UE.UIButtonComponent.StaticClass())) && (t.OnPointDownCallBack.Unbind(), t.OnPointUpCallBack.Unbind()), t = i.GetComponentByClass(UE.UIExtendToggle.StaticClass()))) {
      t.OnStateChange.Remove(this.OnExtendToggleStateChanged);
      t.CanExecuteChange.Unbind();
    }
  }
  hHu(t, i) {
    if (this.Data) {
      this.Data[t] = i;
    }
    this.aHu();
  }
  aHu() {
    if (this.RootItem && this.Data) {
      this.RootItem.SetAnchorOffsetX(this.oHu + this.Data.OffsetX);
      this.RootItem.SetAnchorOffsetY(this.nHu + this.Data.OffsetY);
      this.rHu.X = this.Data.Scale;
      this.rHu.Y = this.Data.Scale;
      this.RootItem.SetUIItemScale(this.rHu);
      this.RootItem.SetUIItemAlpha(this.Data.Alpha);
      this.RootItem.SetHierarchyIndex(this.Data.HierarchyIndex);
      TouchUiEditViewModel_1.TouchUiEditViewModel.NotifySelectedItemChange(this);
    }
  }
  t0t(t) {
    var i = this.RootItem.GetOwner().D_GetActorScale3D().X;
    var s = this.RootItem.GetPivot();
    var h = s.Y;
    var s = s.X;
    var e = TouchUiEditViewModel_1.TouchUiEditViewModel.GetRootItem();
    var o = e.Width;
    var e = e.Height;
    var r = this.RootItem.Width * i;
    var i = this.RootItem.Height * i;
    var l = 0 + r * s;
    var o = o - r * (1 - s);
    var r = 0 + i * h;
    var s = e - i * (1 - h);
    t.X = MathUtils_1.MathUtils.Clamp(t.X, l, o);
    t.Y = MathUtils_1.MathUtils.Clamp(t.Y, r, s);
    return t;
  }
  b_d(t) {
    var t = this.t0t(t);
    var i = this.RootItem.GetAnchorOffsetX();
    var s = this.RootItem.GetAnchorOffsetY();
    this.RootItem.SetLGUISpaceAbsolutePosition(t);
    var t = this.RootItem.GetAnchorOffsetX();
    var h = this.RootItem.GetAnchorOffsetY();
    this.Data.OffsetX += t - i;
    this.Data.OffsetY += h - s;
  }
}
exports.CommonTouchUiEditItem = CommonTouchUiEditItem;
//# sourceMappingURL=CommonTouchUiEditItem.js.map