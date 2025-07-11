"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DragInteractComponent = undefined;
const Time_1 = require("../../../../../Core/Common/Time");
const MathCommon_1 = require("../../../../../Core/Utils/Math/MathCommon");
const Vector2D_1 = require("../../../../../Core/Utils/Math/Vector2D");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const InputDistributeController_1 = require("../../../../Ui/InputDistribute/InputDistributeController");
const InputMappingsDefine_1 = require("../../../../Ui/InputDistribute/InputMappingsDefine");
const LguiEventSystemManager_1 = require("../../../../Ui/LguiEventSystem/LguiEventSystemManager");
const UiLayer_1 = require("../../../../Ui/UiLayer");
const MULTI_TOUCH_DELAY_TIME = 0.5;
class DragInteractComponent {
  constructor(t) {
    this.Zgt = undefined;
    this.Xj1 = undefined;
    this.zIu = undefined;
    this.JIu = undefined;
    this.SFo = false;
    this.yFo = false;
    this.IFo = -0;
    this.RFo = "";
    this.TFo = false;
    this.LFo = false;
    this.DFo = false;
    this.AFo = undefined;
    this.PFo = undefined;
    this.xFo = -0;
    this.wFo = undefined;
    this.UFo = Vector2D_1.Vector2D.Create();
    this.Ngo = t => {
      this.SFo = false;
      if (t && !this.IsMultiFingerControl && (t = this.Yj1(t.pointerPosition.X, t.pointerPosition.Y), this.AFo.DeepCopy(t), this.xFo = Time_1.Time.NowSeconds, this.zIu)) {
        this.zIu();
      }
    };
    this.vKe = t => {
      var i;
      if (!t || this.IsMultiFingerControl || this.wFo.size > 1) {
        this.SFo = false;
        this.PFo.Reset();
      } else {
        this.SFo = true;
        t = this.Yj1(t.pointerPosition.X, t.pointerPosition.Y);
        if ((i = Vector2D_1.Vector2D.Create(t.X, t.Y).SubtractionEqual(this.AFo)).X !== 0 || i.Y !== 0) {
          this.PFo.DeepCopy(i);
          this.AFo.DeepCopy(t);
          if (this.Xj1) {
            this.Xj1(this.PFo);
          }
        }
      }
    };
    this.GFo = t => {
      var i = Time_1.Time.NowSeconds;
      if (!this.IsMultiFingerControl && !(i - this.IFo < MULTI_TOUCH_DELAY_TIME)) {
        this.SFo = false;
        this.NFo();
      }
    };
    this.Eqt = (t, i) => {
      var e = i.TouchType;
      var s = Number(t);
      switch (e) {
        case 0:
          this.Mgt(true, s, i);
          break;
        case 1:
          this.Mgt(false, s);
      }
    };
    this.OFo = t => {};
    this.VFo = (t, i) => {
      if (i === 0) {
        if (this.RFo === t) {
          this.RFo = "";
        }
      } else {
        this.RFo = t;
      }
    };
    this.kFo = t => {
      if (t) {
        this.LFo = true;
        this.DFo = false;
      } else {
        this.LFo = false;
      }
    };
    this.FFo = t => {
      if (t) {
        this.TFo = true;
        this.DFo = false;
      } else {
        this.TFo = false;
      }
    };
    this.Zgt = t.Draggable;
    this.zIu = t.CallbackOnDown;
    this.Xj1 = t.CallbackOnDrag;
    this.JIu = t.CallbackOnInertia;
    this.wFo = new Map();
    this.Zgt.OnPointerDownCallBack.Bind(this.Ngo);
    this.Zgt.OnPointerDragCallBack.Bind(this.vKe);
    this.Zgt.OnPointerUpCallBack.Bind(this.GFo);
    this.Zgt.OnPointerScrollCallBack.Bind(this.OFo);
    this.PFo = Vector2D_1.Vector2D.Create();
    this.AFo = Vector2D_1.Vector2D.Create();
  }
  get IsJoystickZoom() {
    return this.RFo !== "";
  }
  get MultiTouchOriginCenter() {
    return this.UFo;
  }
  get IsDragging() {
    return this.SFo;
  }
  get zj1() {
    return Vector2D_1.Vector2D.Create(this.Zgt?.RootUIComp.Width ?? 0, this.Zgt?.RootUIComp.Height ?? 0);
  }
  get IsJoystickMoving() {
    return this.TFo || this.LFo;
  }
  get IsJoystickFocus() {
    return this.DFo;
  }
  SetJoystickFocus(t) {
    this.DFo = t;
  }
  get IsMultiFingerControl() {
    return this.yFo;
  }
  set IsMultiFingerControl(t) {
    if (t !== this.yFo && (!!t || !(this.wFo.size > 0)) && !(this.yFo = t, this.yFo)) {
      this.IFo = Time_1.Time.NowSeconds;
    }
  }
  Enable() {
    this.dde();
  }
  Disable() {
    this.Cde();
  }
  dde() {
    InputDistributeController_1.InputDistributeController.BindTouches([InputMappingsDefine_1.touchIdMappings.Touch1, InputMappingsDefine_1.touchIdMappings.Touch2], this.Eqt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.NavigationTriggerMapForward, this.kFo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.NavigationTriggerMapRight, this.FFo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.NavigationTriggerMapZoom, this.VFo);
  }
  Cde() {
    InputDistributeController_1.InputDistributeController.UnBindTouches([InputMappingsDefine_1.touchIdMappings.Touch1, InputMappingsDefine_1.touchIdMappings.Touch2], this.Eqt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.NavigationTriggerMapForward, this.kFo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.NavigationTriggerMapRight, this.FFo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.NavigationTriggerMapZoom, this.VFo);
  }
  Mgt(t, i, e) {
    if (t) {
      if (LguiEventSystemManager_1.LguiEventSystemManager.IsPressComponentIsValid(i)) {
        this.wFo.set(i, e);
      }
    } else {
      this.wFo.delete(i);
    }
    this.UFo.Reset();
    this.wFo.forEach(t => {
      t = Vector2D_1.Vector2D.Create(t.TouchPosition.X, t.TouchPosition.Y);
      this.UFo.AdditionEqual(t);
    });
    if (this.wFo.size > 0) {
      this.UFo.DivisionEqual(this.wFo.size);
    }
  }
  Yj1(t, i) {
    t = Vector2D_1.Vector2D.Create(t, i);
    t.FromUeVector2D(UiLayer_1.UiLayer.UiRootItem.GetCanvasScaler().ConvertPositionFromViewportToLGUICanvas(t.ToUeVector2D(true)));
    return t;
  }
  NFo() {
    if (this.PFo.X !== 0 || this.PFo.Y !== 0) {
      var i = Time_1.Time.NowSeconds - this.xFo;
      let t = this.PFo.Size() * 2 / (i * i) * i;
      if (!this.zj1.IsNearlyZero()) {
        t = MathCommon_1.MathCommon.Clamp(t, 0, this.zj1.Size());
      }
      if (this.PFo.Normalize(0) && (i = Vector2D_1.Vector2D.Create(), this.PFo.Multiply(t, i), this.JIu)) {
        this.JIu(i);
      }
      this.PFo.Reset();
    }
  }
}
exports.DragInteractComponent = DragInteractComponent;
//# sourceMappingURL=DragInteractComponent.js.map