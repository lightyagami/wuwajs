"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonTouchUiEditView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
const TouchUiEditViewModel_1 = require("../TouchUiEditViewModel");
class CommonTouchUiEditView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.lHu = undefined;
    this.pgt = undefined;
    this.vgt = undefined;
    this._Hu = undefined;
    this.Ogt = () => {
      this.lHu.Reset();
    };
    this.Fgt = () => {
      this.lHu.Save();
    };
    this.Vgt = () => {
      this.CloseMe();
    };
    this.qgt = i => {
      this.lHu.SetScale(i);
    };
    this.Ngt = i => {
      this.lHu.SetAlpha(i);
    };
    this.Sgt = () => {
      this.lHu.SetOffsetDeltaY(-1);
    };
    this.ygt = () => {
      this.lHu.SetOffsetDeltaY(0);
    };
    this.Igt = () => {
      this.lHu.SetOffsetDeltaY(1);
    };
    this.Tgt = () => {
      this.lHu.SetOffsetDeltaY(0);
    };
    this.Lgt = () => {
      this.lHu.SetOffsetDeltaX(-1);
    };
    this.Dgt = () => {
      this.lHu.SetOffsetDeltaX(0);
    };
    this.Rgt = () => {
      this.lHu.SetOffsetDeltaX(1);
    };
    this.Ugt = () => {
      this.lHu.SetOffsetDeltaX(0);
    };
    this.Agt = i => {
      var t = i.GetLocalPointInPlane();
      var s = i.dragComponent.GetOwner().GetUIItem().GetDisplayName();
      var h = this.GetItem(11);
      if (s === h.GetDisplayName()) {
        if (this.pgt) {
          s = i.dragComponent.GetOwner().D_GetActorScale3D();
          h = t.X - this.pgt.X;
          i = t.Y - this.pgt.Y;
          if (h == 0 || i == 0) {
            return;
          }
          this.vgt.X += h * s.X;
          this.vgt.Y += i * s.Y;
          this.uHu(this.vgt);
        }
        this.pgt = t;
      }
    };
    this.Pgt = () => {
      this.pgt = undefined;
    };
    this.xgt = () => {
      this.pgt = undefined;
    };
    this.cHu = i => {
      var t;
      this.GetSlider(2).SetValue(i.Data.Scale);
      this.GetSlider(1).SetValue(i.Data.Alpha);
      if (this._Hu !== i) {
        i = (this._Hu = i).RootItem;
        (t = this.GetItem(12)).GetOwner().K2_AttachToActor(i.GetOwner(), undefined, 2, 0, 0, false);
        t.SetAnchorAlign(4, 4);
        t.SetStretchLeft(0);
        t.SetStretchRight(0);
        t.SetStretchTop(0);
        t.SetStretchBottom(0);
        t.SetUIActive(true);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UISliderComponent], [2, UE.UISliderComponent], [3, UE.UIButtonComponent], [4, UE.UIButtonComponent], [5, UE.UIButtonComponent], [6, UE.UIButtonComponent], [7, UE.UIButtonComponent], [8, UE.UIButtonComponent], [9, UE.UIButtonComponent], [10, UE.UIDraggableComponent], [11, UE.UIItem], [12, UE.UIItem]];
    this.BtnBindInfo = [[7, this.Ogt], [8, this.Fgt], [9, this.Vgt]];
  }
  async OnBeforeStartAsync() {
    if (this.OpenParam) {
      this.lHu = this.OpenParam;
      this.lHu.SetView(this);
      await this.lHu.OnBeforeStartAsync();
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("TouchUiEdit", 74, "打开CommonTouchUiEditView时未指定OpenParam");
    }
  }
  OnStart() {
    this.vgt = this.GetItem(11).RelativeLocation;
    this.lHu.OnStart();
    this.GetItem(12).SetUIActive(false);
  }
  OnTick(i) {
    this.lHu.OnTick(i);
  }
  OnAddEventListener() {
    this.GetSlider(2).OnValueChangeCb.Bind(this.qgt);
    this.GetSlider(1).OnValueChangeCb.Bind(this.Ngt);
    var i = this.GetButton(3);
    i.OnPointDownCallBack.Bind(this.Sgt);
    i.OnPointCancelCallBack.Bind(this.ygt);
    i.OnPointUpCallBack.Bind(this.ygt);
    var i = this.GetButton(4);
    i.OnPointDownCallBack.Bind(this.Igt);
    i.OnPointCancelCallBack.Bind(this.Tgt);
    i.OnPointUpCallBack.Bind(this.Tgt);
    var i = this.GetButton(6);
    i.OnPointDownCallBack.Bind(this.Lgt);
    i.OnPointCancelCallBack.Bind(this.Dgt);
    i.OnPointUpCallBack.Bind(this.Dgt);
    var i = this.GetButton(5);
    i.OnPointDownCallBack.Bind(this.Rgt);
    i.OnPointCancelCallBack.Bind(this.Ugt);
    i.OnPointUpCallBack.Bind(this.Ugt);
    var i = this.GetDraggable(10);
    i.OnPointerBeginDragCallBack.Bind(this.Pgt);
    i.OnPointerDragCallBack.Bind(this.Agt);
    i.OnPointerEndDragCallBack.Bind(this.xgt);
    TouchUiEditViewModel_1.TouchUiEditViewModel.AddDelegateOnSelectedItemChange(this.cHu);
    var i = TouchUiEditViewModel_1.TouchUiEditViewModel.GetCurrentSelectedItem();
    if (i) {
      TouchUiEditViewModel_1.TouchUiEditViewModel.NotifySelectedItemChange(i);
    }
  }
  OnRemoveEventListener() {
    this.GetSlider(2).OnValueChangeCb.Unbind();
    this.GetSlider(1).OnValueChangeCb.Unbind();
    var i = this.GetButton(3);
    i.OnPointDownCallBack.Unbind();
    i.OnPointUpCallBack.Unbind();
    var i = this.GetButton(4);
    i.OnPointDownCallBack.Unbind();
    i.OnPointUpCallBack.Unbind();
    var i = this.GetButton(6);
    i.OnPointDownCallBack.Unbind();
    i.OnPointUpCallBack.Unbind();
    var i = this.GetButton(5);
    i.OnPointDownCallBack.Unbind();
    i.OnPointUpCallBack.Unbind();
    var i = this.GetDraggable(10);
    i.OnPointerBeginDragCallBack.Unbind();
    i.OnPointerDragCallBack.Unbind();
    i.OnPointerEndDragCallBack.Unbind();
    TouchUiEditViewModel_1.TouchUiEditViewModel.RemoveDelegateOnSelectedItemChange(this.cHu);
  }
  OnBeforeDestroy() {
    this.lHu.OnBeforeDestroy();
  }
  GetAttachRoot() {
    return this.GetItem(0);
  }
  GetScaleSlider() {
    return this.GetSlider(2);
  }
  t0t(i) {
    var t = this.GetItem(11);
    var s = t.GetOwner().D_GetActorScale3D().X;
    var h = t.GetPivot();
    var e = h.Y;
    var h = h.X;
    var o = this.RootItem.GetRenderCanvas().GetOwner().GetUIItem();
    var r = o.Width / 2;
    var o = o.Height / 2;
    var U = t.Width * s;
    var t = t.Height * s;
    i.X = MathUtils_1.MathUtils.Clamp(i.X, U * h - r, r - U * (1 - h));
    i.Y = MathUtils_1.MathUtils.Clamp(i.Y, t * e - o, o - t * (1 - e));
  }
  uHu(i) {
    var t = this.GetItem(11);
    this.t0t(i);
    t.SetUIRelativeLocation(i);
  }
}
exports.CommonTouchUiEditView = CommonTouchUiEditView;
//# sourceMappingURL=CommonTouchUiEditView.js.map