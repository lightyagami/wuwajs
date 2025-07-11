"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WorldMapInteractComponent = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const Time_1 = require("../../../../Core/Common/Time");
const MathCommon_1 = require("../../../../Core/Utils/Math/MathCommon");
const Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D");
const ObjectUtils_1 = require("../../../../Core/Utils/ObjectUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const InputDistributeController_1 = require("../../../Ui/InputDistribute/InputDistributeController");
const InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine");
const LguiEventSystemManager_1 = require("../../../Ui/LguiEventSystem/LguiEventSystemManager");
const TouchFingerDefine_1 = require("../../../Ui/TouchFinger/TouchFingerDefine");
const TouchFingerManager_1 = require("../../../Ui/TouchFinger/TouchFingerManager");
const UiLayer_1 = require("../../../Ui/UiLayer");
const MapComponent_1 = require("../../Map/Base/MapComponent");
const WorldMapUtil_1 = require("../WorldMapUtil");
const MULTI_TOUCH_DELAY_TIME = 0.5;
const SCALE_STEP = 0.05;
class WorldMapInteractComponent extends MapComponent_1.MapComponent {
  constructor() {
    super(...arguments);
    this.SFo = false;
    this.yFo = false;
    this.IFo = -0;
    this.TFo = false;
    this.LFo = false;
    this.DFo = false;
    this.RFo = "";
    this.UFo = Vector2D_1.Vector2D.Create();
    this.AFo = undefined;
    this.PFo = undefined;
    this.xFo = -0;
    this.wFo = undefined;
    this.Ngo = t => {
      this.SFo = false;
      if (t && !this.IsMultiFingerControl && this.bFo(t.pointerPosition)) {
        t = this.qFo(t.pointerPosition.X, t.pointerPosition.Y);
        this.AFo.DeepCopy(t);
        this.xFo = Time_1.Time.NowSeconds;
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.WorldMapPointerDown);
      }
    };
    this.vKe = t => {
      var e;
      if (!t || this.IsMultiFingerControl || this.wFo.size > 1) {
        this.SFo = false;
        this.PFo.Reset();
      } else {
        this.SFo = true;
        t = this.qFo(t.pointerPosition.X, t.pointerPosition.Y);
        if ((e = Vector2D_1.Vector2D.Create(t.X, t.Y).SubtractionEqual(this.AFo)).X !== 0 || e.Y !== 0) {
          this.PFo.DeepCopy(e);
          this.AFo.DeepCopy(t);
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.WorldMapPointerDrag, this.PFo);
        }
      }
    };
    this.GFo = t => {
      var e = Time_1.Time.NowSeconds;
      if (this.IsMultiFingerControl || e - this.IFo < MULTI_TOUCH_DELAY_TIME) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Map", 18, "正在进行双指缩放");
        }
      } else if (this.bFo(t.pointerPosition)) {
        if (this.SFo) {
          this.SFo = false;
          this.NFo();
        } else {
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.WorldMapPointerUp, t);
        }
      } else {
        this.SFo = false;
      }
    };
    this.Eqt = (t, e) => {
      var i = e.TouchType;
      var s = Number(t);
      switch (i) {
        case 0:
          this.Mgt(true, s, e);
          break;
        case 1:
          this.Mgt(false, s);
      }
    };
    this.OFo = t => {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.WorldMapWheelAxisInput, t.scrollAxisValue * SCALE_STEP, 5);
    };
    this.kFo = t => {
      if (t) {
        this.LFo = true;
        this.DFo = false;
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.WorldMapJoystickMoveForward, -this.BFo.GamePadMoveSpeed * t);
      } else {
        this.LFo = false;
      }
    };
    this.FFo = t => {
      if (t) {
        this.TFo = true;
        this.DFo = false;
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.WorldMapJoystickMoveRight, -this.BFo.GamePadMoveSpeed * t);
      } else {
        this.TFo = false;
      }
    };
    this.VFo = (t, e) => {
      if (e === 0) {
        if (this.RFo === t) {
          this.RFo = "";
        }
      } else {
        this.RFo = t;
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.WorldMapHandleTriggerAxisInput, SCALE_STEP * e, 2);
      }
    };
  }
  get ComponentType() {
    return 2;
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
  get IsJoystickZoom() {
    return this.RFo !== "";
  }
  get MultiTouchOriginCenter() {
    return this.UFo;
  }
  get IsDragging() {
    return this.SFo;
  }
  get IsMultiFingerControl() {
    return this.yFo;
  }
  set IsMultiFingerControl(t) {
    if (t !== this.yFo && (!!t || !(this.wFo.size > 0)) && !(this.yFo = t, this.yFo)) {
      this.IFo = Time_1.Time.NowSeconds;
    }
  }
  get NYa() {
    var t = this.Parent;
    if (t !== undefined) {
      return t;
    }
    this.LogError(63, "[地图系统]->二级界面组件没有附加到容器下！");
  }
  get BFo() {
    return this.NYa.UiParams;
  }
  get PYe() {
    return this.NYa.ViewPortSize;
  }
  OnAdd() {
    var t = this.NYa.Map.GetRootActor().GetComponentByClass(UE.UIDraggableComponent.StaticClass());
    if (ObjectUtils_1.ObjectUtils.IsValid(t)) {
      this.wFo = new Map();
      t.OnPointerDownCallBack.Bind(this.Ngo);
      t.OnPointerDragCallBack.Bind(this.vKe);
      t.OnPointerUpCallBack.Bind(this.GFo);
      t.OnPointerScrollCallBack.Bind(this.OFo);
      this.PFo = Vector2D_1.Vector2D.Create();
      this.AFo = Vector2D_1.Vector2D.Create();
    }
  }
  OnEnable() {
    this.dde();
  }
  OnDisable() {
    this.Cde();
  }
  OnRemove() {
    this.AFo = undefined;
    this.PFo = undefined;
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
  CheckTouch() {
    var t = this.wFo.get(TouchFingerDefine_1.EFingerIndex.One);
    var e = this.wFo.get(TouchFingerDefine_1.EFingerIndex.Two);
    this.IsMultiFingerControl = t !== undefined && e !== undefined;
    if (this.IsMultiFingerControl) {
      var {
        State: t,
        ChangeRate: i
      } = TouchFingerManager_1.TouchFingerManager.GetFingerExpandCloseType(TouchFingerDefine_1.EFingerIndex.One, TouchFingerDefine_1.EFingerIndex.Two);
      switch (t) {
        case TouchFingerDefine_1.EFingerExpandCloseType.Expand:
        case TouchFingerDefine_1.EFingerExpandCloseType.Close:
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.WorldMapFingerExpandClose, i, 4);
      }
    }
  }
  NFo() {
    if (this.PFo.X !== 0 || this.PFo.Y !== 0) {
      var e = Time_1.Time.NowSeconds - this.xFo;
      let t = this.PFo.Size() * 2 / (e * e) * e;
      var e = WorldMapUtil_1.WorldMapUtil.GetViewportSizeByPool();
      if (!e.IsNearlyZero()) {
        t = MathCommon_1.MathCommon.Clamp(t, 0, e.Size());
      }
      var e = this.PFo.Normalize(0);
      if (e) {
        e = Vector2D_1.Vector2D.Create();
        this.PFo.Multiply(t, e);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.WorldMapDragInertia, e);
      }
      this.PFo.Reset();
    }
  }
  Mgt(t, e, i) {
    if (t) {
      if (LguiEventSystemManager_1.LguiEventSystemManager.IsPressComponentIsValid(e)) {
        this.wFo.set(e, i);
      }
    } else {
      this.wFo.delete(e);
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
  bFo(t) {
    t = this.qFo(t.X, t.Y);
    return !(t.X < 0) && !(t.X > this.PYe.X) && !(t.Y < 0) && !(t.Y > this.PYe.Y);
  }
  qFo(t, e) {
    t = Vector2D_1.Vector2D.Create(t, e);
    t.FromUeVector2D(UiLayer_1.UiLayer.UiRootItem.GetCanvasScaler().ConvertPositionFromViewportToLGUICanvas(t.ToUeVector2D(true)));
    t.X = MathCommon_1.MathCommon.Clamp(t.X, 0, this.PYe.X);
    t.Y = MathCommon_1.MathCommon.Clamp(t.Y, 0, this.PYe.Y);
    return t;
  }
}
exports.WorldMapInteractComponent = WorldMapInteractComponent;
//# sourceMappingURL=WorldMapInteractComponent.js.map