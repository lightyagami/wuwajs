"use strict";

var FreeCameraLogicComponent_1;
var __decorate = this && this.__decorate || function (t, i, s, h) {
  var e;
  var r = arguments.length;
  var o = r < 3 ? i : h === null ? h = Object.getOwnPropertyDescriptor(i, s) : h;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    o = Reflect.decorate(t, i, s, h);
  } else {
    for (var a = t.length - 1; a >= 0; a--) {
      if (e = t[a]) {
        o = (r < 3 ? e(o) : r > 3 ? e(i, s, o) : e(i, s)) || o;
      }
    }
  }
  if (r > 3 && o) {
    Object.defineProperty(i, s, o);
  }
  return o;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FreeCameraLogicComponent = undefined;
const Info_1 = require("../../Core/Common/Info");
const EntityComponent_1 = require("../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../Core/Entity/RegisterComponent");
const CurveUtils_1 = require("../../Core/Utils/Curve/CurveUtils");
const DataTableUtil_1 = require("../../Core/Utils/DataTableUtil");
const Quat_1 = require("../../Core/Utils/Math/Quat");
const Rotator_1 = require("../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../Core/Utils/MathUtils");
const YAW_MAX = 180;
const PITCH_MAX = 90;
const FOV_MIN = 0;
const FOV_MAX = 170;
let FreeCameraLogicComponent = FreeCameraLogicComponent_1 = class FreeCameraLogicComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.ZPr = undefined;
    this.qne = Vector_1.Vector.Create();
    this.jCn = Rotator_1.Rotator.Create();
    this.cn1 = 0;
    this.n7i = 0;
    this.cwr = 0;
    this.ii1 = 0;
    this.ri1 = undefined;
    this.oi1 = undefined;
    this.ZHa = Rotator_1.Rotator.Create();
    this.nL1 = Rotator_1.Rotator.Create();
    this.sL1 = Rotator_1.Rotator.Create();
    this.ni1 = false;
    this.si1 = 0;
    this.ai1 = 0;
    this.E_e = 0;
    this.Usr = Vector_1.Vector.Create();
    this.hi1 = Vector_1.Vector.Create();
    this.Kxr = Vector_1.Vector.Create();
    this.LYe = Vector_1.Vector.Create();
    this.Bon = Vector_1.Vector.Create();
    this.bon = Vector_1.Vector.Create();
    this.DB1 = Vector_1.Vector.Create();
    this.UB1 = Vector_1.Vector.Create();
    this.Ok1 = Vector_1.Vector.Create();
    this.cie = Rotator_1.Rotator.Create();
    this.e7o = Quat_1.Quat.Create();
    this.TLn = Rotator_1.Rotator.Create();
    this.k6r = Quat_1.Quat.Create();
    this.LimitConfigs = new Map();
  }
  get Ic() {
    return this.ZPr?.CameraActor;
  }
  OnInit() {
    this.ZPr = this.Entity.GetComponent(317);
    return true;
  }
  InitConfig(t) {
    var i = Info_1.Info.IsMobileInputModel();
    let s = undefined;
    for (const e of t) {
      var h = DataTableUtil_1.DataTableUtil.GetDataTableRowFromName(25, e.toString());
      if (h && (!i && h.PC生效 || i && h.手机生效)) {
        s = h;
      }
    }
    if (s) {
      this.qne.FromUeVector(s.初始位置);
      this.jCn.FromUeRotator(s.初始旋转);
      this.LimitConfigs = FreeCameraLogicComponent_1.TMapToMap(s.限制);
      this.cn1 = s.初始FOV;
      this.ResetToInit();
    }
  }
  ResetToInit(t = 0, i, s) {
    this.ApplyCameraBlend(this.qne, this.jCn, 0, t, i, this.cn1, s);
  }
  ReceiveCameraInput(t, i, s, h, e, r, o = 0, a) {
    this.HandleCameraInput(t, i, s, h, e, r, o, a);
  }
  HandleCameraInput(t, i, s, h, e, r, o, a, _) {
    if (this.n7i === 1) {
      this.li1();
    }
    var n = this.Ic;
    var c = n?.CameraComponent;
    if (n?.IsValid() && c?.IsValid()) {
      this.ZHa.Quaternion(this.e7o);
      (t.IsMoveBySelf ? this.e7o : (this.TLn.DeepCopy(this.ZHa), this.TLn.Pitch = 0, this.TLn.Quaternion(this.k6r), this.k6r)).RotateVector(Vector_1.Vector.ForwardVectorProxy, this.LYe);
      (i.IsMoveBySelf ? this.e7o : (this.TLn.DeepCopy(this.ZHa), this.TLn.Roll = 0, this.TLn.Quaternion(this.k6r), this.k6r)).RotateVector(Vector_1.Vector.RightVectorProxy, this.Bon);
      (s.IsMoveBySelf ? this.e7o : (this.TLn.DeepCopy(this.ZHa), this.TLn.Yaw = 0, this.TLn.Quaternion(this.k6r), this.k6r)).RotateVector(Vector_1.Vector.UpVectorProxy, this.bon);
      this.LYe.Multiply(t.Distance, this.DB1);
      this.Bon.Multiply(i.Distance, this.UB1);
      this.bon.Multiply(s.Distance, this.Ok1);
      this.Kxr.Addition(this.DB1, this.hi1);
      this.hi1.Addition(this.UB1, this.hi1);
      this.hi1.Addition(this.Ok1, this.hi1);
      this.cie.Set(h, e, 0);
      this.cie.AdditionEqual(this.ZHa);
      n = this.cie;
      t = this.CorrectFOV(this.E_e - r);
      this.sL1.DeepCopy(n);
      if (o === 0) {
        this.CorrectLocation(this.hi1);
        this.CorrectRotation(n);
        this.Kxr.DeepCopy(this.hi1);
        this.ZHa.DeepCopy(n);
        if (t > 0) {
          c.FieldOfView = t;
          this.E_e = t;
        }
        _?.();
      } else {
        this.cwr = o;
        this.ii1 = 0;
        this.ri1 = a || CurveUtils_1.CurveUtils.CreateCurve(0);
        this.si1 = c.FieldOfView;
        if (t > 0) {
          this.ai1 = t;
          this.ni1 = true;
        }
        this.CorrectLocation(this.Kxr);
        this.CorrectRotation(this.ZHa);
        this.oi1 = _;
        this.Usr.DeepCopy(this.Kxr);
        this.nL1.DeepCopy(this.ZHa);
        this.n7i = 1;
      }
    } else {
      _?.();
    }
  }
  ApplyCameraBlend(i, s, h, e, r, o = -1, a) {
    if (this.n7i === 1) {
      this.li1();
    }
    var _ = this.Ic;
    var n = _?.CameraComponent;
    if (_?.IsValid() && n?.IsValid()) {
      this.ZHa.Quaternion(this.e7o);
      this.e7o.RotateVector(Vector_1.Vector.ForwardVectorProxy, this.LYe);
      this.e7o.RotateVector(Vector_1.Vector.RightVectorProxy, this.Bon);
      this.LYe.Multiply(-h, this.DB1);
      i.Addition(this.DB1, this.hi1);
      this.hi1.Addition(this.UB1, this.hi1);
      let t = s;
      if (t === undefined) {
        t = this.jCn;
      }
      _ = o > 0 ? o : this.cn1;
      this.sL1.DeepCopy(t);
      if (e === 0) {
        this.Kxr.DeepCopy(this.hi1);
        this.ZHa.DeepCopy(t);
        if (_ > 0) {
          n.FieldOfView = _;
          this.E_e = _;
        }
        a?.();
      } else {
        this.cwr = e;
        this.ii1 = 0;
        this.ri1 = r || CurveUtils_1.CurveUtils.CreateCurve(0);
        this.si1 = n.FieldOfView;
        if (_ > 0) {
          this.ai1 = _;
          this.ni1 = true;
        }
        this.oi1 = a;
        this.Usr.DeepCopy(this.Kxr);
        this.nL1.DeepCopy(this.ZHa);
        this.n7i = 1;
      }
    } else {
      a?.();
    }
  }
  li1() {
    this.ai1 = -1;
    this.ni1 = false;
    this.cwr = 0;
    this.ii1 = 0;
    this.ri1 = undefined;
    this.n7i = 0;
    this.oi1?.();
    this.oi1 = undefined;
  }
  OnAfterTick(t) {
    var i = this.Ic;
    var s = i?.CameraComponent;
    if (i?.IsValid() && s?.IsValid()) {
      if (this.ni1) {
        s.FieldOfView = this.E_e;
      }
      i = t * MathUtils_1.MathUtils.MillisecondToSecond;
      this._i1(i);
      this.Ic?.D_K2_SetActorLocationAndRotation(this.Kxr.ToUeVector(true), this.ZHa.ToUeRotator(), false, undefined, true);
    }
  }
  _i1(t) {
    if (this.n7i !== 0) {
      if (this.ii1 >= this.cwr) {
        this.li1();
      } else {
        this.ii1 += t;
        t = this.ri1.GetCurrentValue(this.ii1 / this.cwr);
        Vector_1.Vector.Lerp(this.Usr, this.hi1, t, this.Kxr);
        Rotator_1.Rotator.Lerp(this.nL1, this.sL1, t, this.ZHa);
        if (this.ni1) {
          this.E_e = MathUtils_1.MathUtils.Lerp(this.si1, this.ai1, t);
        }
      }
    }
  }
  static TMapToMap(i) {
    var s = new Map();
    if (!(i.Num() < 0)) {
      for (let t = 0; t < i.Num(); t++) {
        var h = i.GetKey(t);
        s.set(h, i.Get(h));
      }
    }
    return s;
  }
  CorrectLocation(t) {
    var i;
    if (this.LimitConfigs.has(1)) {
      i = this.qne.X + this.LimitConfigs.get(1);
      t.X = Math.min(i, t.X);
    }
    if (this.LimitConfigs.has(2)) {
      i = this.qne.X + this.LimitConfigs.get(2);
      t.X = Math.max(i, t.X);
    }
    if (this.LimitConfigs.has(3)) {
      i = this.qne.Y + this.LimitConfigs.get(3);
      t.Y = Math.min(i, t.Y);
    }
    if (this.LimitConfigs.has(4)) {
      i = this.qne.Y + this.LimitConfigs.get(4);
      t.Y = Math.max(i, t.Y);
    }
    if (this.LimitConfigs.has(5)) {
      i = this.qne.Z + this.LimitConfigs.get(5);
      t.Z = Math.min(i, t.Z);
    }
    if (this.LimitConfigs.has(6)) {
      i = this.qne.Z + this.LimitConfigs.get(6);
      t.Z = Math.max(i, t.Z);
    }
  }
  CorrectRotation(t) {
    var i = this.LimitConfigs.has(10) ? MathUtils_1.MathUtils.WrapAngle(this.LimitConfigs.get(10)) : YAW_MAX;
    var s = this.LimitConfigs.has(9) ? MathUtils_1.MathUtils.WrapAngle(this.LimitConfigs.get(9)) : -YAW_MAX;
    t.Yaw = MathUtils_1.MathUtils.Clamp(t.Yaw, s, i);
    var s = this.LimitConfigs.has(12) ? MathUtils_1.MathUtils.WrapAngle(this.LimitConfigs.get(12)) : PITCH_MAX;
    var i = this.LimitConfigs.has(11) ? MathUtils_1.MathUtils.WrapAngle(this.LimitConfigs.get(11)) : -PITCH_MAX;
    t.Pitch = MathUtils_1.MathUtils.Clamp(t.Pitch, i, s);
  }
  CorrectFOV(t) {
    var i = this.LimitConfigs.has(7) ? this.LimitConfigs.get(7) : FOV_MIN;
    var s = this.LimitConfigs.has(8) ? this.LimitConfigs.get(8) : FOV_MAX;
    return MathUtils_1.MathUtils.Clamp(t, i, s);
  }
};
FreeCameraLogicComponent = FreeCameraLogicComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(318)], FreeCameraLogicComponent);
exports.FreeCameraLogicComponent = FreeCameraLogicComponent; //# sourceMappingURL=FreeCameraLogicComponent.js.map