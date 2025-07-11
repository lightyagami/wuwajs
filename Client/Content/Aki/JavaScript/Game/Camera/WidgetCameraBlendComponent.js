"use strict";

var __decorate = this && this.__decorate || function (t, e, i, s) {
  var h;
  var r = arguments.length;
  var n = r < 3 ? e : s === null ? s = Object.getOwnPropertyDescriptor(e, i) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    n = Reflect.decorate(t, e, i, s);
  } else {
    for (var o = t.length - 1; o >= 0; o--) {
      if (h = t[o]) {
        n = (r < 3 ? h(n) : r > 3 ? h(e, i, n) : h(e, i)) || n;
      }
    }
  }
  if (r > 3 && n) {
    Object.defineProperty(e, i, n);
  }
  return n;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WidgetCameraBlendComponent = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const EntityComponent_1 = require("../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../Core/Entity/RegisterComponent");
const Vector_1 = require("../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../Core/Utils/MathUtils");
let WidgetCameraBlendComponent = class WidgetCameraBlendComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.uwr = -0;
    this.cwr = -0;
    this.mwr = 0;
    this.dwr = -0;
    this.Due = Vector_1.Vector.Create();
    this.U$o = undefined;
    this.Cwr = false;
    this.gwr = false;
    this.fwr = undefined;
    this.pwr = undefined;
    this.vwr = false;
    this.Mwr = false;
    this.ele = undefined;
  }
  get ZPr() {
    return this.ele;
  }
  SetBlendParams(t, e, i, s, h, r, n, o, a, p, c) {
    this.cwr = t;
    this.uwr = t;
    this.mwr = e;
    this.dwr = i;
    this.Cwr = s;
    if (this.Cwr && (this.vwr = h, t = this.ZPr.CineCamera, this.vwr ? (e = UE.KismetMathLibrary.Conv_VectorToVectorDouble(t.SceneComponent.RelativeLocation), this.pwr = e) : this.pwr = t.D_K2_GetActorLocation(), r ? this.Due.FromUeVector(n) : this.Due.FromUeVector(this.pwr.op_Addition(n)), this.gwr = o, this.gwr)) {
      this.Mwr = a;
      if (this.Mwr) {
        this.fwr = t.SceneComponent.RelativeRotation;
      } else {
        this.fwr = t.K2_GetActorRotation();
      }
      this.U$o = p ? c : c.op_Addition(this.fwr);
    }
  }
  OnStart() {
    this.ele = this.Entity.GetComponent(12);
    return this.ele.Valid;
  }
  OnEnd() {
    return !(this.ele = undefined);
  }
  OnTick(t) {
    t = this.uwr - t;
    this.uwr = Math.max(t, 0);
    t = this.Ewr();
    this.Swr(t);
    this.T_e(t);
  }
  Swr(t) {
    var e;
    var i;
    if (this.Cwr) {
      t = UE.KismetMathLibrary.D_VLerp(this.pwr, this.Due.ToUeVector(), t);
      e = this.ZPr.CineCamera;
      if (this.vwr) {
        i = new UE.HitResult();
        i = (0, puerts_1.$ref)(i);
        e.D_K2_SetActorRelativeLocation(t, false, i, false);
        if (Vector_1.Vector.Create(e.SceneComponent.RelativeLocation).Equals(this.Due, 0.1)) {
          this.Cwr = false;
        }
      } else {
        i = new UE.HitResult();
        i = (0, puerts_1.$ref)(i);
        e.D_K2_SetActorRelativeLocation(t, false, i, false);
        if (Vector_1.Vector.Create(e.D_K2_GetActorLocation()).Equals(this.Due, 0.1)) {
          this.Cwr = false;
        }
      }
    }
  }
  T_e(t) {
    var e;
    var i;
    if (this.gwr) {
      t = UE.KismetMathLibrary.RLerp(this.fwr, this.U$o, t, true);
      e = this.ZPr.CineCamera;
      if (this.Mwr) {
        i = new UE.HitResult();
        i = (0, puerts_1.$ref)(i);
        e.K2_SetActorRelativeRotation(t, false, i, false);
        if (UE.KismetMathLibrary.EqualEqual_RotatorRotator(e.SceneComponent.RelativeRotation, this.U$o, 0.1)) {
          this.Cwr = false;
        }
      } else {
        i = new UE.HitResult();
        i = (0, puerts_1.$ref)(i);
        e.K2_SetActorRelativeRotation(t, false, i, false);
        if (UE.KismetMathLibrary.EqualEqual_RotatorRotator(e.K2_GetActorRotation(), this.U$o, 0.1)) {
          this.Cwr = false;
        }
      }
    }
  }
  Ewr() {
    var t = MathUtils_1.MathUtils.SafeDivide(this.cwr - this.uwr, this.cwr);
    let e = 0;
    switch (this.mwr) {
      case 1:
        e = UE.KismetMathLibrary.FInterpEaseInOut(0, 1, t, 3);
        break;
      case 2:
      case 4:
      case 3:
        e = UE.KismetMathLibrary.Ease(0, 1, t, this.dwr);
        break;
      case 0:
        e = MathUtils_1.MathUtils.Lerp(0, 1, t);
    }
    return e;
  }
};
WidgetCameraBlendComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(11)], WidgetCameraBlendComponent);
exports.WidgetCameraBlendComponent = WidgetCameraBlendComponent; //# sourceMappingURL=WidgetCameraBlendComponent.js.map