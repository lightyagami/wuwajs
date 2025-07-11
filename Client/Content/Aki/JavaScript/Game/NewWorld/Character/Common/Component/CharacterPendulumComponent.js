"use strict";

var CharacterPendulumComponent_1;
var __decorate = this && this.__decorate || function (t, e, n, i) {
  var r;
  var s = arguments.length;
  var o = s < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, n) : i;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    o = Reflect.decorate(t, e, n, i);
  } else {
    for (var h = t.length - 1; h >= 0; h--) {
      if (r = t[h]) {
        o = (s < 3 ? r(o) : s > 3 ? r(e, n, o) : r(e, n)) || o;
      }
    }
  }
  if (s > 3 && o) {
    Object.defineProperty(e, n, o);
  }
  return o;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterPendulumComponent = undefined;
const UE = require("ue");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const GlobalData_1 = require("../../../../GlobalData");
const LIMIT_FRAME_TIME = 33;
const LIMIT_FRAME_TIME2 = 50;
const UPDATE_UP_Z = 5;
const UPDATE_UP_Z2 = 11;
const LIMIT_FORCE = 600000;
let CharacterPendulumComponent = CharacterPendulumComponent_1 = class CharacterPendulumComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.ujr = undefined;
    this.cjr = false;
    this.mjr = 0;
    this.djr = Vector_1.Vector.Create();
    this.kCe = "";
    this.Cjr = 0;
    this.gjr = 0;
    this.fjr = 0;
    this.pjr = 0;
    this.vjr = 0;
    this.Anr = Vector_1.Vector.Create();
    this.Mjr = t => {};
    this.Ejr = (t, e, n, i, r) => {};
  }
  set Hooked(t) {
    this.cjr = t;
  }
  get Hooked() {
    return this.cjr;
  }
  set UpLength(t) {
    this.mjr = t;
  }
  get UpLength() {
    return this.mjr;
  }
  set GrabPoint(t) {
    this.djr.FromUeVector(t);
  }
  get GrabPoint() {
    return this.djr.ToUeVector();
  }
  set SocketName(t) {
    this.kCe = t;
  }
  get SocketName() {
    return this.kCe;
  }
  set RopeForce(t) {
    this.Cjr = t;
  }
  get RopeForce() {
    return this.Cjr;
  }
  set DistanceRopeToActor(t) {
    this.gjr = t;
  }
  get DistanceRopeToActor() {
    return this.gjr;
  }
  set AirControl(t) {
    this.fjr = t;
  }
  get AirControl() {
    return this.fjr;
  }
  OnStart() {
    var t = this.Entity.CheckGetComponent(3);
    this.ujr = t.Actor;
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CustomMovePendulum, this.Mjr);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharMovementModeChanged, this.Ejr);
    var t = this.Entity.GetComponent(178).CharacterMovement;
    this.vjr = t.AirControl;
    return true;
  }
  OnEnd() {
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CustomMovePendulum, this.Mjr);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharMovementModeChanged, this.Ejr);
    this.Sjr();
    return true;
  }
  OnTick(t) {
    if (this.pjr === 1) {
      this.pjr = 0;
    } else {
      this.yjr(t);
    }
  }
  DrawCube(t, e) {
    var n;
    var i;
    var r;
    var s;
    if (t) {
      n = 156;
      n = new UE.LinearColor(n, n, n, n);
      i = t.GetLocation();
      r = new UE.Vector(10, 10, 10);
      r = new UE.VectorDouble(r.X * 0.5, r.Y * 0.5, r.Z * 0.5);
      s = t.Rotator();
      UE.KismetSystemLibrary.D_DrawDebugBox(GlobalData_1.GlobalData.World, i, r, n, s, e, 30);
      i = 0.5;
      r = UE.KismetMathLibrary.D_TransformLocation(t, new UE.VectorDouble(i, i, i));
      s = UE.KismetMathLibrary.D_TransformLocation(t, new UE.VectorDouble(-i, -i, -i));
      UE.KismetSystemLibrary.D_DrawDebugLine(GlobalData_1.GlobalData.World, r, s, n, e, 15);
      r = UE.KismetMathLibrary.D_TransformLocation(t, new UE.VectorDouble(i, -i, i));
      s = UE.KismetMathLibrary.D_TransformLocation(t, new UE.VectorDouble(-i, i, i));
      UE.KismetSystemLibrary.D_DrawDebugLine(GlobalData_1.GlobalData.World, r, s, n, e, 15);
    }
  }
  yjr(t) {
    var e;
    var n;
    var i;
    if (this.cjr) {
      this.Anr.FromUeVector(this.ujr.D_GetVelocity());
      e = 1;
      if (t > LIMIT_FRAME_TIME && (i = t > LIMIT_FRAME_TIME2 ? t / LIMIT_FRAME_TIME2 : t / LIMIT_FRAME_TIME, (e = this.Anr.Size() / i) > 1) && this.Anr.Z < 0) {
        i = this.Entity.GetComponent(178);
        n = t > LIMIT_FRAME_TIME2 ? UPDATE_UP_Z2 : UPDATE_UP_Z;
        CharacterPendulumComponent_1.TmpVector.Set(0, 0, Math.abs(this.Anr.Z) / e * n);
        i.MoveCharacter(CharacterPendulumComponent_1.TmpVector, t * MathUtils_1.MathUtils.MillisecondToSecond, "钩锁.ThrowRopeAndSwing");
      }
      (e = Vector_1.Vector.Create(this.ujr.D_K2_GetActorLocation())).Subtraction(this.djr, e);
      n = Vector_1.Vector.DotProduct(this.Anr, e);
      e.Normalize();
      i = Vector_1.Vector.Create();
      e.Multiply(n, i);
      i.Multiply(this.RopeForce, i);
      t = this.Entity.GetComponent(178).CharacterMovement;
      if (i.Size() > LIMIT_FORCE) {
        i.Normalize();
        i.Multiply(LIMIT_FORCE, i);
      }
      t.AddForce(i.ToUeVectorOld());
      t.AirControl = this.fjr;
    }
  }
  Sjr() {
    this.cjr = false;
    this.Entity.GetComponent(178).CharacterMovement.AirControl = this.vjr;
  }
  SetPendulumData(t, e, n, i, r, s, o, h, _, a, E) {
    this.cjr = true;
    this.pjr = 1;
  }
  Reset() {
    this.pjr = 0;
    this.Sjr();
  }
};
CharacterPendulumComponent.TmpVector = Vector_1.Vector.Create();
CharacterPendulumComponent = CharacterPendulumComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(71)], CharacterPendulumComponent);
exports.CharacterPendulumComponent = CharacterPendulumComponent; //# sourceMappingURL=CharacterPendulumComponent.js.map