"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BuildingMapMoveComponent = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../../../../../Core/Common/Log");
const Time_1 = require("../../../../../../../Core/Common/Time");
const MathCommon_1 = require("../../../../../../../Core/Utils/Math/MathCommon");
const Vector_1 = require("../../../../../../../Core/Utils/Math/Vector");
const Vector2D_1 = require("../../../../../../../Core/Utils/Math/Vector2D");
const MathUtils_1 = require("../../../../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../../Common/Event/EventSystem");
const Global_1 = require("../../../../../../Global");
const GlobalData_1 = require("../../../../../../GlobalData");
const InputDistributeController_1 = require("../../../../../../Ui/InputDistribute/InputDistributeController");
const LguiEventSystemManager_1 = require("../../../../../../Ui/LguiEventSystem/LguiEventSystemManager");
const TouchFingerDefine_1 = require("../../../../../../Ui/TouchFinger/TouchFingerDefine");
const TouchFingerManager_1 = require("../../../../../../Ui/TouchFinger/TouchFingerManager");
const UiLayer_1 = require("../../../../../../Ui/UiLayer");
const TWEEN_TIME = 2;
const DRAG_TWEEN_TIME = 0.8;
class BuildingMapMoveComponent {
  constructor(t, i = true, s = true, h = false) {
    this.xFo = 0;
    this.IsDragging = false;
    this.IsTweening = false;
    this.TCa = undefined;
    this.uGo = undefined;
    this.KMf = undefined;
    this.XMf = undefined;
    this.YMf = Vector2D_1.Vector2D.Create();
    this.zMf = Vector_1.Vector.Create();
    this.JMf = Vector_1.Vector.Create();
    this.LCa = Vector2D_1.Vector2D.Create();
    this.DCa = Vector2D_1.Vector2D.Create();
    this.ScaleStep = 0.05;
    this.MapScaleSafeArea = {
      Min: 0,
      Max: 0
    };
    this.HCa = 1;
    this.PYe = Vector2D_1.Vector2D.Create();
    this.ACa = Vector2D_1.Vector2D.Create();
    this.RCa = {
      MinX: 0,
      MaxX: 0,
      MinY: 0,
      MaxY: 0
    };
    this.UCa = {
      MinX: 0,
      MaxX: 0,
      MinY: 0,
      MaxY: 0
    };
    this.Yjs = Vector2D_1.Vector2D.Create();
    this.Jjs = undefined;
    this.Q_t = Vector2D_1.Vector2D.Create();
    this.cz = Vector_1.Vector.Create();
    this.jCa = 1;
    this.zjs = undefined;
    this.PointerBeginDragExtraCallBack = undefined;
    this.PointerUpExtraCallBack = undefined;
    this.w8i = t => {
      var i;
      if (!this.IsInMultiTouch) {
        this.xCa();
        i = t.pointerPosition;
        i = this.PCa(i.X, i.Y);
        this.LCa.DeepCopy(i);
        this.PointerBeginDragExtraCallBack?.(t);
      }
    };
    this.B8i = t => {
      var i;
      var s;
      var h;
      if (this.IsInMultiTouch) {
        this.IsDragging = false;
        this.DCa.Reset();
      } else {
        this.IsDragging = true;
        t = t.pointerPosition;
        t = this.PCa(t.X, t.Y);
        if ((i = Vector2D_1.Vector2D.Create(t.X, t.Y).SubtractionEqual(this.LCa)).X !== 0 || i.Y !== 0) {
          s = t.X - this.LCa.X;
          h = t.Y - this.LCa.Y;
          this.DCa.DeepCopy(i);
          this.LCa.DeepCopy(t);
          this.Q_t.FromUeVector2D(this.Jjs.GetAnchorOffset());
          this.Q_t.X = this.Q_t.X + s;
          this.Q_t.Y = this.Q_t.Y + h;
          this.wCa(this.Q_t, 1);
        }
      }
    };
    this.Ngo = t => {
      if (t && !this.IsInMultiTouch && this.bFo(t.pointerPosition)) {
        this.IsDragging = true;
        this.xFo = Time_1.Time.NowSeconds;
      }
    };
    this.GFo = t => {
      if (!this.IsInMultiTouch && !(this.IsDragging = false, this.DCa.X === 0 && this.DCa.Y === 0)) {
        if (this.bFo(t.pointerPosition)) {
          this.BCa();
          this.PointerUpExtraCallBack?.(t);
        }
      }
    };
    this.jDn = t => {
      var t = t.scrollAxisValue;
      if (t !== 0) {
        this.Yjs.Reset();
        this.Yjs.AdditionEqual(this.Zjs());
        t = t * this.ScaleStep;
        this.SetScale(this.HCa + t, 0);
      }
    };
    this.YFo = t => {
      this.Jjs.SetAnchorOffset(t);
    };
    this.ZMf = t => {
      this.YMf.Set(t.Y, t.Z);
      this.SetScale(t.X, 4, this.YMf);
    };
    this.dUa = (t, i) => {
      this.Q_t.FromUeVector2D(this.Jjs.GetAnchorOffset());
      this.Q_t.X = this.Q_t.X - t;
      this.Q_t.Y = this.Q_t.Y - i;
      this.wCa(this.Q_t, 1);
    };
    this.eWs = Vector2D_1.Vector2D.Create();
    this.wFo = new Map();
    this.Eqt = (t, i) => {
      var s = i.TouchType;
      if (s === 2) {
        this.tWs();
      } else if (s === 0) {
        this.Mgt(true, i);
      } else {
        this.Mgt(false, i);
      }
    };
    this.MoveSpeed = 1;
    this.QFo = new Vector2D_1.Vector2D();
    this.XFo = new Vector2D_1.Vector2D();
    this.QR1 = Vector2D_1.Vector2D.Create();
    this.e3o = false;
    this.t3o = false;
    this.GE1 = false;
    this.i3o = t => {
      if (this.GE1) {
        this.QFo.Y = t * this.MapScale * -this.MoveSpeed;
        this.e3o = true;
      }
    };
    this.o3o = t => {
      if (this.GE1) {
        this.XFo.X = t * this.MapScale * -this.MoveSpeed;
        this.t3o = true;
      }
    };
    this.Jjs = t.GetRootComponent();
    if (i) {
      t.OnPointerBeginDragCallBack.Bind(this.w8i);
      (h ? t.OnPointerEndDragCallBack : t.OnPointerUpCallBack).Bind(this.GFo);
      t.OnPointerDragCallBack.Bind(this.B8i);
      t.OnPointerDownCallBack.Bind(this.Ngo);
      t.OnPointerCancelCallBack.Bind(this.GFo);
    }
    if (s) {
      t.OnPointerScrollCallBack.Bind(this.jDn);
    }
    this.Fq();
  }
  get MapScale() {
    return this.HCa;
  }
  set MapScale(t) {
    this.HCa = t;
  }
  get IsInDrag() {
    return this.IsDragging;
  }
  Fq() {
    this.bCa();
    this.eEf();
    this.oRn();
    this.nRn();
    this.qCa();
    this.rRn();
  }
  bCa() {
    this.uGo = (0, puerts_1.toManualReleaseDelegate)(this.YFo);
  }
  eEf() {
    this.XMf = (0, puerts_1.toManualReleaseDelegate)(this.ZMf);
  }
  oRn() {
    this.PYe.X = UiLayer_1.UiLayer.UiRootItem.GetWidth();
    this.PYe.Y = UiLayer_1.UiLayer.UiRootItem.GetHeight();
    var t = UiLayer_1.UiLayer.UiRootItem.GetCanvasScaler();
    var i = t.ReferenceResolution.X / t.ReferenceResolution.Y;
    var s = this.PYe.X / this.PYe.Y;
    var h = s / i;
    this.jCa = h > 1 ? h : i / s;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("MoonChasing", 10, "[MapMoveComponent]初始化Viewport", ["Viewport大小", this.PYe.Tuple], ["ReferenceResolution大小", t.ReferenceResolution], ["Viewport与ReferenceResolution比值", h], ["实际应用的比值", this.jCa]);
    }
  }
  qCa() {
    var t = this.Jjs.GetWidth() * this.HCa;
    var i = this.Jjs.GetHeight() * this.HCa;
    var t = t < this.PYe.X ? this.PYe.X : t;
    var i = i < this.PYe.Y ? this.PYe.Y : i;
    var t = Math.abs(t - this.PYe.X) / 2;
    var i = Math.abs(i - this.PYe.Y) / 2;
    this.UCa.MinX = -t;
    this.UCa.MaxX = t;
    this.UCa.MinY = -i;
    this.UCa.MaxY = i;
  }
  rRn() {
    var t = (this.Jjs.GetWidth() - this.ACa.X * 2) * this.HCa;
    var i = (this.Jjs.GetHeight() - this.ACa.Y * 2) * this.HCa;
    var t = t < this.PYe.X ? this.PYe.X : t;
    var i = i < this.PYe.Y ? this.PYe.Y : i;
    var t = Math.abs(t - this.PYe.X) / 2;
    var i = Math.abs(i - this.PYe.Y) / 2;
    this.RCa.MinX = -t;
    this.RCa.MaxX = t;
    this.RCa.MinY = -i;
    this.RCa.MaxY = i;
  }
  nRn() {
    this.SetScaleSafeArea(0.5, 2);
    this.ACa.X = 400;
    this.ACa.Y = 300;
  }
  sRn(t) {
    t.X = MathUtils_1.MathUtils.Clamp(t.X, this.RCa.MinX, this.RCa.MaxX);
    t.Y = MathUtils_1.MathUtils.Clamp(t.Y, this.RCa.MinY, this.RCa.MaxY);
  }
  GCa(t) {
    t.X = MathUtils_1.MathUtils.Clamp(t.X, this.UCa.MinX, this.UCa.MaxX);
    t.Y = MathUtils_1.MathUtils.Clamp(t.Y, this.UCa.MinY, this.UCa.MaxY);
  }
  SetScale(t, i, s) {
    var h;
    var t = MathUtils_1.MathUtils.Clamp(t, this.MapScaleSafeArea.Min, this.MapScaleSafeArea.Max);
    if (t !== this.HCa || i === 4) {
      this.xCa();
      h = this.HCa;
      this.HCa = t;
      this.qCa();
      this.rRn();
      this.cz.Set(t, t, t);
      this.Jjs.SetUIRelativeScale3D(this.cz.ToUeVectorOld());
      t = this.iWs(t, h, i, s);
      this.Q_t.Reset();
      this.Q_t.AdditionEqual(t);
      this.wCa(this.Q_t);
      this.zjs?.(i);
    }
  }
  iWs(t, i, s, h) {
    var e = Vector2D_1.Vector2D.Create(this.Jjs.GetAnchorOffset());
    switch (s) {
      case 0:
      case 1:
        var r = this.PCa(this.Yjs.X, this.Yjs.Y);
        r.Set(r.X - this.PYe.X / 2, r.Y - this.PYe.Y / 2);
        return e.SubtractionEqual(r).MultiplyEqual(t / i).AdditionEqual(r);
      case 4:
        if (h) {
          return h.MultiplyEqual(-1).MultiplyEqual(this.MapScale);
        } else {
          return e.MultiplyEqual(t / i);
        }
      default:
        return e.MultiplyEqual(t / i);
    }
  }
  PCa(t, i) {
    var s = UiLayer_1.UiLayer.UiRootItem.GetCanvasScaler();
    if (s) {
      t = Vector2D_1.Vector2D.Create(t, i);
      i = s.ConvertPositionFromViewportToLGUICanvas(t.ToUeVector2D());
      t.FromUeVector2D(i);
      t.X = MathCommon_1.MathCommon.Clamp(t.X, 0, this.PYe.X);
      t.Y = MathCommon_1.MathCommon.Clamp(t.Y, 0, this.PYe.Y);
      return t;
    } else {
      return Vector2D_1.Vector2D.Create();
    }
  }
  EmitPointerDown() {
    this.xFo = Time_1.Time.NowSeconds;
  }
  bFo(t) {
    t = this.PCa(t.X, t.Y);
    return !(t.X < 0) && !(t.X > this.PYe.X) && !(t.Y < 0) && !(t.Y > this.PYe.Y);
  }
  BCa() {
    var t;
    var i = Time_1.Time.NowSeconds - this.xFo;
    let s = this.DCa.Size() / i;
    if (!this.PYe.IsNearlyZero()) {
      s = MathCommon_1.MathCommon.Clamp(s, 0, this.PYe.Size());
    }
    if (this.DCa.Normalize(0)) {
      i = Vector2D_1.Vector2D.Create();
      this.DCa.Multiply(s, i);
      t = Vector2D_1.Vector2D.Create();
      i.Multiply(TWEEN_TIME, t);
      i = Vector2D_1.Vector2D.Create(this.Jjs.GetAnchorOffset()).AdditionEqual(t);
      this.OCa(i, 2, DRAG_TWEEN_TIME);
    } else {
      this.DCa.Reset();
    }
  }
  xCa() {
    if (this.TCa) {
      this.TCa.Kill();
      this.TCa = undefined;
    }
  }
  VCa() {
    if (this.KMf) {
      this.KMf.Kill();
      this.KMf = undefined;
    }
  }
  OCa(t, i = 0, s = TWEEN_TIME) {
    this.sRn(t);
    this.IsTweening = true;
    this.xCa();
    this.TCa = UE.LTweenBPLibrary.Vector2To(GlobalData_1.GlobalData.World, this.uGo, this.Jjs.GetAnchorOffset(), t.ToUeVector2D(true), s, 0, i);
    this.TCa.OnCompleteCallBack.Bind(() => {
      this.IsTweening = false;
    });
  }
  wCa(t, i = 0) {
    if (i === 0) {
      this.sRn(t);
    } else if (i === 1) {
      this.GCa(t);
    }
    this.Jjs.SetAnchorOffset(t.ToUeVector2D());
  }
  MoveToTarget([t, i], s = 0, h = TWEEN_TIME, e) {
    this.Q_t.Reset();
    this.Q_t.X = -t * this.MapScale;
    this.Q_t.Y = -i * this.MapScale;
    if (h !== 0) {
      this.OCa(this.Q_t, s, h);
    } else {
      this.wCa(this.Q_t);
    }
    e?.();
  }
  ScaleToTarget(t, i, s = 0, h = TWEEN_TIME, e = 0, r) {
    let o = t;
    if (e === 1) {
      o = this.MapScale > t ? this.MapScale : t;
    } else if (e === 2) {
      o = this.MapScale < t ? this.MapScale : t;
    }
    if (h !== 0) {
      this.tEf(o, i, s, h);
    } else {
      this.YMf.Set(i[0], i[1]);
      this.SetScale(t, 4, this.YMf);
    }
    r?.();
  }
  tEf(t, i, s = 0, h = TWEEN_TIME) {
    this.IsTweening = true;
    this.VCa();
    var e = this.Jjs.GetAnchorOffset();
    this.zMf.Set(this.HCa, -e.X / this.HCa, -e.Y / this.HCa);
    this.JMf.Set(t, i[0], i[1]);
    this.KMf = UE.LTweenBPLibrary.Vector3To(GlobalData_1.GlobalData.World, this.XMf, this.zMf.ToUeVectorOld(), this.JMf.ToUeVectorOld(), h, 0, s);
    this.KMf.OnCompleteCallBack.Bind(() => {
      this.IsTweening = false;
    });
  }
  Zjs() {
    var t = Global_1.Global.CharacterController;
    if (t) {
      this.Q_t.Reset();
      return this.Q_t.AdditionEqual(t.GetCursorPosition());
    } else {
      this.Q_t.Reset();
      return this.Q_t;
    }
  }
  LongPressScroll(t) {
    this.Yjs.Reset();
    this.SetScale(this.HCa + t, 2);
  }
  SliderScroll(t) {
    this.SetScale(t, 3);
  }
  SetChangeScaleCallback(t) {
    this.zjs = t;
  }
  SetScaleSafeArea(t, i) {
    if (i < t) {
      this.MapScaleSafeArea.Min = i * this.jCa;
      this.MapScaleSafeArea.Max = t * this.jCa;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("MoonChasing", 10, "[MapMoveComponent]按照分辨率比例设置真实大小", ["设置最小", i], ["设置最大", t], ["真实最小", this.MapScaleSafeArea.Min], ["真实最大", this.MapScaleSafeArea.Max]);
      }
    } else {
      this.MapScaleSafeArea.Min = t * this.jCa;
      this.MapScaleSafeArea.Max = i * this.jCa;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("MoonChasing", 10, "[MapMoveComponent]按照分辨率比例设置真实大小", ["设置最小", t], ["设置最大", i], ["真实最小", this.MapScaleSafeArea.Min], ["真实最大", this.MapScaleSafeArea.Max]);
      }
    }
  }
  SetMapMoveRebound(t, i) {
    this.ACa.X = t;
    this.ACa.Y = i;
  }
  Destroy() {
    this.xCa();
    this.VCa();
    (0, puerts_1.releaseManualReleaseDelegate)(this.YFo);
    (0, puerts_1.releaseManualReleaseDelegate)(this.ZMf);
  }
  AddGamepadEvent() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.GamepadMoveOverScreen, this.dUa);
  }
  RemoveGamepadEvent() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.GamepadMoveOverScreen, this.dUa);
  }
  get IsInTouch() {
    return this.wFo.size > 0;
  }
  get IsInMultiTouch() {
    return this.wFo.size > 1;
  }
  Mgt(t, i) {
    var s = i.TouchId;
    if (t) {
      if (LguiEventSystemManager_1.LguiEventSystemManager.IsPressComponentIsValid(s)) {
        this.wFo.set(s, i);
      }
    } else {
      this.wFo.delete(s);
    }
    this.Yjs.Reset();
    this.wFo.forEach(t => {
      this.eWs.Set(t.TouchPosition.X, t.TouchPosition.Y);
      this.Yjs.AdditionEqual(this.eWs);
    });
    if (this.wFo.size > 0) {
      this.Yjs.DivisionEqual(this.wFo.size);
    }
  }
  tWs() {
    var t;
    var i;
    if (this.IsInMultiTouch && ({
      State: t,
      ChangeRate: i
    } = TouchFingerManager_1.TouchFingerManager.GetFingerExpandCloseType(TouchFingerDefine_1.EFingerIndex.One, TouchFingerDefine_1.EFingerIndex.Two), t !== TouchFingerDefine_1.EFingerExpandCloseType.None)) {
      this.SetScale(this.HCa + i, 1);
    }
  }
  BindTouch() {
    InputDistributeController_1.InputDistributeController.BindTouches([TouchFingerDefine_1.EFingerIndex.One, TouchFingerDefine_1.EFingerIndex.Two], this.Eqt);
  }
  UnbindTouch() {
    InputDistributeController_1.InputDistributeController.UnBindTouches([TouchFingerDefine_1.EFingerIndex.One, TouchFingerDefine_1.EFingerIndex.Two], this.Eqt);
  }
  GetMapItem() {
    return this.Jjs;
  }
  SwitchOnMove(t) {
    this.GE1 = t;
  }
  AddMoveListener(t = true) {
    this.SwitchOnMove(t);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.MapDragMoveForward, this.i3o);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.MapDragMoveRight, this.o3o);
  }
  RemoveMoveListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.MapDragMoveForward, this.i3o);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.MapDragMoveRight, this.o3o);
  }
  TickMove() {
    if (this.e3o || this.t3o) {
      this.QR1.FromUeVector2D(this.Jjs.GetAnchorOffset());
      if (this.e3o) {
        this.QR1.AdditionEqual(this.QFo);
        this.e3o = false;
      }
      if (this.t3o) {
        this.QR1.AdditionEqual(this.XFo);
        this.t3o = false;
      }
      this.wCa(this.QR1, 0);
    }
  }
  GetOffsetDisRelativeToViewportCenterRatio(t, i) {
    return [Math.abs(t) * this.MapScale / (this.PYe.X / 2), Math.abs(i) * this.MapScale / (this.PYe.Y / 2)];
  }
}
exports.BuildingMapMoveComponent = BuildingMapMoveComponent;
//# sourceMappingURL=BuildingMapMoveComponent.js.map