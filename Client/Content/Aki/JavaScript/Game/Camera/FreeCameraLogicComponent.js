"use strict";
var FreeCameraLogicComponent_1, __decorate = this && this.__decorate || function(t, i, s, h) {
  var e, r = arguments.length,
    o = r < 3 ? i : null === h ? h = Object.getOwnPropertyDescriptor(i, s) : h;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o = Reflect.decorate(t, i, s, h);
  else
    for (var a = t.length - 1; 0 <= a; a--)(e = t[a]) && (o = (r < 3 ? e(o) : 3 < r ? e(i, s, o) : e(i, s)) || o);
  return 3 < r && o && Object.defineProperty(i, s, o), o
};
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.FreeCameraLogicComponent = void 0;
const Info_1 = require("../../Core/Common/Info"),
  EntityComponent_1 = require("../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../Core/Entity/RegisterComponent"),
  CurveUtils_1 = require("../../Core/Utils/Curve/CurveUtils"),
  DataTableUtil_1 = require("../../Core/Utils/DataTableUtil"),
  Quat_1 = require("../../Core/Utils/Math/Quat"),
  Rotator_1 = require("../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../Core/Utils/MathUtils"),
  YAW_MAX = 180,
  PITCH_MAX = 90,
  FOV_MIN = 0,
  FOV_MAX = 170;
let FreeCameraLogicComponent = FreeCameraLogicComponent_1 = class FreeCameraLogicComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments), this.ZPr = void 0, this.qne = Vector_1.Vector.Create(), this.jCn = Rotator_1.Rotator.Create(), this.Ho1 = 0, this.n7i = 0, this.cwr = 0, this.kt1 = 0, this.Ot1 = void 0, this.qt1 = void 0, this.ZHa = Rotator_1.Rotator.Create(), this.DR1 = Rotator_1.Rotator.Create(), this.UR1 = Rotator_1.Rotator.Create(), this.Gt1 = !1, this.Ft1 = 0, this.Nt1 = 0, this.E_e = 0, this.Usr = Vector_1.Vector.Create(), this.Vt1 = Vector_1.Vector.Create(), this.Kxr = Vector_1.Vector.Create(), this.LYe = Vector_1.Vector.Create(), this.Bon = Vector_1.Vector.Create(), this.bon = Vector_1.Vector.Create(), this.iB1 = Vector_1.Vector.Create(), this.rB1 = Vector_1.Vector.Create(), this.sk1 = Vector_1.Vector.Create(), this.cie = Rotator_1.Rotator.Create(), this.e7o = Quat_1.Quat.Create(), this.TLn = Rotator_1.Rotator.Create(), this.k6r = Quat_1.Quat.Create(), this.LimitConfigs = new Map
  }
  get Ic() {
    return this.ZPr?.CameraActor
  }
  OnInit() {
    return this.ZPr = this.Entity.GetComponent(285), !0
  }
  InitConfig(t) {
    var i = Info_1.Info.IsMobileInputModel();
    let s = void 0;
    for (const e of t) {
      var h = DataTableUtil_1.DataTableUtil.GetDataTableRowFromName(24, e.toString());
      h && (!i && h.PC生效 || i && h.手机生效) && (s = h)
    }
    s && (this.qne.FromUeVector(s.初始位置), this.jCn.FromUeRotator(s.初始旋转), this.LimitConfigs = FreeCameraLogicComponent_1.TMapToMap(s.限制), this.Ho1 = s.初始FOV, this.ResetToInit())
  }
  ResetToInit(t = 0, i, s) {
    this.ApplyCameraBlend(this.qne, this.jCn, 0, t, i, this.Ho1, s)
  }
  ReceiveCameraInput(t, i, s, h, e, r, o = 0, a) {
    this.HandleCameraInput(t, i, s, h, e, r, o, a)
  }
  HandleCameraInput(t, i, s, h, e, r, o, a, _) {
    1 === this.n7i && this.jt1();
    var n = this.Ic,
      c = n?.CameraComponent;
    n?.IsValid() && c?.IsValid() ? (this.ZHa.Quaternion(this.e7o), (t.IsMoveBySelf ? this.e7o : (this.TLn.DeepCopy(this.ZHa), this.TLn.Pitch = 0, this.TLn.Quaternion(this.k6r), this.k6r)).RotateVector(Vector_1.Vector.ForwardVectorProxy, this.LYe), (i.IsMoveBySelf ? this.e7o : (this.TLn.DeepCopy(this.ZHa), this.TLn.Roll = 0, this.TLn.Quaternion(this.k6r), this.k6r)).RotateVector(Vector_1.Vector.RightVectorProxy, this.Bon), (s.IsMoveBySelf ? this.e7o : (this.TLn.DeepCopy(this.ZHa), this.TLn.Yaw = 0, this.TLn.Quaternion(this.k6r), this.k6r)).RotateVector(Vector_1.Vector.UpVectorProxy, this.bon), this.LYe.Multiply(t.Distance, this.iB1), this.Bon.Multiply(i.Distance, this.rB1), this.bon.Multiply(s.Distance, this.sk1), this.Kxr.Addition(this.iB1, this.Vt1), this.Vt1.Addition(this.rB1, this.Vt1), this.Vt1.Addition(this.sk1, this.Vt1), this.cie.Set(h, e, 0), this.cie.AdditionEqual(this.ZHa), n = this.cie, t = this.CorrectFOV(this.E_e - r), this.UR1.DeepCopy(n), 0 === o ? (this.CorrectLocation(this.Vt1), this.CorrectRotation(n), this.Kxr.DeepCopy(this.Vt1), this.ZHa.DeepCopy(n), 0 < t && (c.FieldOfView = t, this.E_e = t), _?.()) : (this.cwr = o, this.kt1 = 0, this.Ot1 = a || CurveUtils_1.CurveUtils.CreateCurve(0), this.Ft1 = c.FieldOfView, 0 < t && (this.Nt1 = t, this.Gt1 = !0), this.CorrectLocation(this.Kxr), this.CorrectRotation(this.ZHa), this.qt1 = _, this.Usr.DeepCopy(this.Kxr), this.DR1.DeepCopy(this.ZHa), this.n7i = 1)) : _?.()
  }
  ApplyCameraBlend(i, s, h, e, r, o = -1, a) {
    1 === this.n7i && this.jt1();
    var _ = this.Ic,
      n = _?.CameraComponent;
    if (_?.IsValid() && n?.IsValid()) {
      this.ZHa.Quaternion(this.e7o), this.e7o.RotateVector(Vector_1.Vector.ForwardVectorProxy, this.LYe), this.e7o.RotateVector(Vector_1.Vector.RightVectorProxy, this.Bon), this.LYe.Multiply(-h, this.iB1), i.Addition(this.iB1, this.Vt1), this.Vt1.Addition(this.rB1, this.Vt1);
      let t = s;
      void 0 === t && (t = this.jCn);
      _ = 0 < o ? o : this.Ho1;
      this.UR1.DeepCopy(t), 0 === e ? (this.Kxr.DeepCopy(this.Vt1), this.ZHa.DeepCopy(t), 0 < _ && (n.FieldOfView = _, this.E_e = _), a?.()) : (this.cwr = e, this.kt1 = 0, this.Ot1 = r || CurveUtils_1.CurveUtils.CreateCurve(0), this.Ft1 = n.FieldOfView, 0 < _ && (this.Nt1 = _, this.Gt1 = !0), this.qt1 = a, this.Usr.DeepCopy(this.Kxr), this.DR1.DeepCopy(this.ZHa), this.n7i = 1)
    } else a?.()
  }
  jt1() {
    this.Nt1 = -1, this.Gt1 = !1, this.cwr = 0, this.kt1 = 0, this.Ot1 = void 0, this.n7i = 0, this.qt1?.(), this.qt1 = void 0
  }
  OnAfterTick(t) {
    var i = this.Ic,
      s = i?.CameraComponent;
    i?.IsValid() && s?.IsValid() && (this.Gt1 && (s.FieldOfView = this.E_e), i = t * MathUtils_1.MathUtils.MillisecondToSecond, this.Ht1(i), this.Ic?.D_K2_SetActorLocationAndRotation(this.Kxr.ToUeVector(!0), this.ZHa.ToUeRotator(), !1, void 0, !0))
  }
  Ht1(t) {
    0 !== this.n7i && (this.kt1 >= this.cwr ? this.jt1() : (this.kt1 += t, t = this.Ot1.GetCurrentValue(this.kt1 / this.cwr), Vector_1.Vector.Lerp(this.Usr, this.Vt1, t, this.Kxr), Rotator_1.Rotator.Lerp(this.DR1, this.UR1, t, this.ZHa), this.Gt1 && (this.E_e = MathUtils_1.MathUtils.Lerp(this.Ft1, this.Nt1, t))))
  }
  static TMapToMap(i) {
    var s = new Map;
    if (!(i.Num() < 0))
      for (let t = 0; t < i.Num(); t++) {
        var h = i.GetKey(t);
        s.set(h, i.Get(h))
      }
    return s
  }
  CorrectLocation(t) {
    var i;
    this.LimitConfigs.has(1) && (i = this.qne.X + this.LimitConfigs.get(1), t.X = Math.min(i, t.X)), this.LimitConfigs.has(2) && (i = this.qne.X + this.LimitConfigs.get(2), t.X = Math.max(i, t.X)), this.LimitConfigs.has(3) && (i = this.qne.Y + this.LimitConfigs.get(3), t.Y = Math.min(i, t.Y)), this.LimitConfigs.has(4) && (i = this.qne.Y + this.LimitConfigs.get(4), t.Y = Math.max(i, t.Y)), this.LimitConfigs.has(5) && (i = this.qne.Z + this.LimitConfigs.get(5), t.Z = Math.min(i, t.Z)), this.LimitConfigs.has(6) && (i = this.qne.Z + this.LimitConfigs.get(6), t.Z = Math.max(i, t.Z))
  }
  CorrectRotation(t) {
    var i = this.LimitConfigs.has(10) ? MathUtils_1.MathUtils.WrapAngle(this.LimitConfigs.get(10)) : YAW_MAX,
      s = this.LimitConfigs.has(9) ? MathUtils_1.MathUtils.WrapAngle(this.LimitConfigs.get(9)) : -YAW_MAX,
      s = (t.Yaw = MathUtils_1.MathUtils.Clamp(t.Yaw, s, i), this.LimitConfigs.has(12) ? MathUtils_1.MathUtils.WrapAngle(this.LimitConfigs.get(12)) : PITCH_MAX),
      i = this.LimitConfigs.has(11) ? MathUtils_1.MathUtils.WrapAngle(this.LimitConfigs.get(11)) : -PITCH_MAX;
    t.Pitch = MathUtils_1.MathUtils.Clamp(t.Pitch, i, s)
  }
  CorrectFOV(t) {
    var i = this.LimitConfigs.has(7) ? this.LimitConfigs.get(7) : FOV_MIN,
      s = this.LimitConfigs.has(8) ? this.LimitConfigs.get(8) : FOV_MAX;
    return MathUtils_1.MathUtils.Clamp(t, i, s)
  }
};
FreeCameraLogicComponent = FreeCameraLogicComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(286)], FreeCameraLogicComponent), exports.FreeCameraLogicComponent = FreeCameraLogicComponent;
//# sourceMappingURL=FreeCameraLogicComponent.js.map