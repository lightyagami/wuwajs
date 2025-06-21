"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.DragInteractComponent = void 0;
const Time_1 = require("../../../../../Core/Common/Time"),
  MathCommon_1 = require("../../../../../Core/Utils/Math/MathCommon"),
  Vector2D_1 = require("../../../../../Core/Utils/Math/Vector2D"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  InputDistributeController_1 = require("../../../../Ui/InputDistribute/InputDistributeController"),
  InputMappingsDefine_1 = require("../../../../Ui/InputDistribute/InputMappingsDefine"),
  LguiEventSystemManager_1 = require("../../../../Ui/LguiEventSystem/LguiEventSystemManager"),
  UiLayer_1 = require("../../../../Ui/UiLayer"),
  MULTI_TOUCH_DELAY_TIME = .5;
class DragInteractComponent {
  constructor(t) {
    this.Zgt = void 0, this.mj1 = void 0, this.Ucu = void 0, this.Dcu = void 0, this.SFo = !1, this.yFo = !1, this.IFo = -0, this.RFo = "", this.TFo = !1, this.LFo = !1, this.DFo = !1, this.AFo = void 0, this.PFo = void 0, this.xFo = -0, this.wFo = void 0, this.UFo = Vector2D_1.Vector2D.Create(), this.Ngo = t => {
      this.SFo = !1, t && !this.IsMultiFingerControl && (t = this.fj1(t.pointerPosition.X, t.pointerPosition.Y), this.AFo.DeepCopy(t), this.xFo = Time_1.Time.NowSeconds, this.Ucu) && this.Ucu()
    }, this.vKe = t => {
      var i;
      !t || this.IsMultiFingerControl || 1 < this.wFo.size ? (this.SFo = !1, this.PFo.Reset()) : (this.SFo = !0, t = this.fj1(t.pointerPosition.X, t.pointerPosition.Y), 0 === (i = Vector2D_1.Vector2D.Create(t.X, t.Y).SubtractionEqual(this.AFo)).X && 0 === i.Y || (this.PFo.DeepCopy(i), this.AFo.DeepCopy(t), this.mj1 && this.mj1(this.PFo)))
    }, this.GFo = t => {
      var i = Time_1.Time.NowSeconds;
      this.IsMultiFingerControl || i - this.IFo < MULTI_TOUCH_DELAY_TIME || (this.SFo = !1, this.NFo())
    }, this.Eqt = (t, i) => {
      var e = i.TouchType,
        s = Number(t);
      switch (e) {
        case 0:
          this.Mgt(!0, s, i);
          break;
        case 1:
          this.Mgt(!1, s)
      }
    }, this.OFo = t => {}, this.VFo = (t, i) => {
      0 === i ? this.RFo === t && (this.RFo = "") : this.RFo = t
    }, this.kFo = t => {
      t ? (this.LFo = !0, this.DFo = !1) : this.LFo = !1
    }, this.FFo = t => {
      t ? (this.TFo = !0, this.DFo = !1) : this.TFo = !1
    }, this.Zgt = t.Draggable, this.Ucu = t.CallbackOnDown, this.mj1 = t.CallbackOnDrag, this.Dcu = t.CallbackOnInertia, this.wFo = new Map, this.Zgt.OnPointerDownCallBack.Bind(this.Ngo), this.Zgt.OnPointerDragCallBack.Bind(this.vKe), this.Zgt.OnPointerUpCallBack.Bind(this.GFo), this.Zgt.OnPointerScrollCallBack.Bind(this.OFo), this.PFo = Vector2D_1.Vector2D.Create(), this.AFo = Vector2D_1.Vector2D.Create()
  }
  get IsJoystickZoom() {
    return "" !== this.RFo
  }
  get MultiTouchOriginCenter() {
    return this.UFo
  }
  get IsDragging() {
    return this.SFo
  }
  get gj1() {
    return Vector2D_1.Vector2D.Create(this.Zgt?.RootUIComp.Width ?? 0, this.Zgt?.RootUIComp.Height ?? 0)
  }
  get IsJoystickMoving() {
    return this.TFo || this.LFo
  }
  get IsJoystickFocus() {
    return this.DFo
  }
  SetJoystickFocus(t) {
    this.DFo = t
  }
  get IsMultiFingerControl() {
    return this.yFo
  }
  set IsMultiFingerControl(t) {
    t === this.yFo || !t && 0 < this.wFo.size || (this.yFo = t, this.yFo) || (this.IFo = Time_1.Time.NowSeconds)
  }
  Enable() {
    this.dde()
  }
  Disable() {
    this.Cde()
  }
  dde() {
    InputDistributeController_1.InputDistributeController.BindTouches([InputMappingsDefine_1.touchIdMappings.Touch1, InputMappingsDefine_1.touchIdMappings.Touch2], this.Eqt), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.NavigationTriggerMapForward, this.kFo), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.NavigationTriggerMapRight, this.FFo), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.NavigationTriggerMapZoom, this.VFo)
  }
  Cde() {
    InputDistributeController_1.InputDistributeController.UnBindTouches([InputMappingsDefine_1.touchIdMappings.Touch1, InputMappingsDefine_1.touchIdMappings.Touch2], this.Eqt), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.NavigationTriggerMapForward, this.kFo), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.NavigationTriggerMapRight, this.FFo), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.NavigationTriggerMapZoom, this.VFo)
  }
  Mgt(t, i, e) {
    t ? LguiEventSystemManager_1.LguiEventSystemManager.IsPressComponentIsValid(i) && this.wFo.set(i, e) : this.wFo.delete(i), this.UFo.Reset(), this.wFo.forEach(t => {
      t = Vector2D_1.Vector2D.Create(t.TouchPosition.X, t.TouchPosition.Y);
      this.UFo.AdditionEqual(t)
    }), 0 < this.wFo.size && this.UFo.DivisionEqual(this.wFo.size)
  }
  fj1(t, i) {
    t = Vector2D_1.Vector2D.Create(t, i);
    return t.FromUeVector2D(UiLayer_1.UiLayer.UiRootItem.GetCanvasScaler().ConvertPositionFromViewportToLGUICanvas(t.ToUeVector2D(!0))), t
  }
  NFo() {
    if (0 !== this.PFo.X || 0 !== this.PFo.Y) {
      var i = Time_1.Time.NowSeconds - this.xFo;
      let t = 2 * this.PFo.Size() / (i * i) * i;
      this.gj1.IsNearlyZero() || (t = MathCommon_1.MathCommon.Clamp(t, 0, this.gj1.Size())), this.PFo.Normalize(0) && (i = Vector2D_1.Vector2D.Create(), this.PFo.Multiply(t, i), this.Dcu) && this.Dcu(i), this.PFo.Reset()
    }
  }
}
exports.DragInteractComponent = DragInteractComponent;
//# sourceMappingURL=DragInteractComponent.js.map