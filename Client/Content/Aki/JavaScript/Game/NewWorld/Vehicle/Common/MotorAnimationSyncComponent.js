"use strict";

var MotorAnimationSyncComponent_1;
var __decorate = this && this.__decorate || function (o, t, e, n) {
  var i;
  var r = arguments.length;
  var s = r < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, e) : n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    s = Reflect.decorate(o, t, e, n);
  } else {
    for (var a = o.length - 1; a >= 0; a--) {
      if (i = o[a]) {
        s = (r < 3 ? i(s) : r > 3 ? i(t, e, s) : i(t, e)) || s;
      }
    }
  }
  if (r > 3 && s) {
    Object.defineProperty(t, e, s);
  }
  return s;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorAnimationSyncComponent = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const Time_1 = require("../../../../Core/Common/Time");
const Deque_1 = require("../../../../Core/Container/Deque");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const Net_1 = require("../../../../Core/Net/Net");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const ModelManager_1 = require("../../../Manager/ModelManager");
const CharacterAnimationSyncComponent_1 = require("../../Character/Common/Component/CharacterAnimationSyncComponent");
const ANIMSYNCUDPSENDINTERVAL = 0.03;
const COLLISIONANIMSYNCUDPSENDINTERVAL = 1;
let MotorAnimationSyncComponent = MotorAnimationSyncComponent_1 = class MotorAnimationSyncComponent extends CharacterAnimationSyncComponent_1.CharacterAnimationSyncComponent {
  constructor() {
    super(...arguments);
    this.VehicleMovement = undefined;
    this.sWf = undefined;
    this.PendingAnimInfos = [];
    this.ZHr = new Deque_1.Deque();
    this.aWf = undefined;
    this.hWf = 0;
    this.lWf = 0;
    this._Wf = false;
  }
  OnActivate() {
    var o = super.OnActivate();
    this.sWf = this.Entity.CheckGetComponent(250);
    this.VehicleMovement = this.ActorComp.Owner.GetComponentByClass(UE.KuroVehicleMovementComponent.StaticClass());
    return o;
  }
  AfterTickInner(o) {
    super.AfterTickInner(o);
    this.uWf();
    this.cWf();
  }
  OnTick(o) {
    this.dWf();
  }
  uWf() {
    var o;
    var t;
    var e;
    if (!!ModelManager_1.ModelManager.GameModeModel.IsMulti && !(Time_1.Time.NowSeconds - this.hWf < ANIMSYNCUDPSENDINTERVAL)) {
      if (this.ActorComp?.IsMoveAutonomousProxy && this.VehicleMovement && this.VehicleMovement.MotorSubState !== 0) {
        o = Protocol_1.Aki.Protocol.Q$f.create();
        if (e = this.VehicleMovement.WheelDisplayInfosObj) {
          if (t = e.DisplayInfos.Get(0)) {
            o.O$f = {
              k$f: t.WheelAccel,
              q$f: t.WheelSpeed,
              P5n: t.WheelLocation
            };
          }
          if (t = e.DisplayInfos.Get(1)) {
            o.G$f = {
              k$f: t.WheelAccel,
              q$f: t.WheelSpeed,
              P5n: t.WheelLocation
            };
          }
        } else if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Vehicle", 35, "MotorAnimParam NoWheelInfoObj");
        }
        e = this.sWf?.IsBeingImpacted ?? false;
        if (this.sWf && e !== this._Wf && (this._Wf = e, t = this.sWf, o.F$f = e) && (o.N$f = {
          X: t.ImpactedVelocity.X,
          Y: t.ImpactedVelocity.Y,
          Z: t.ImpactedVelocity.Z
        }, t.CacheImpactHitResult)) {
          e = Vector_1.Vector.Create(t.CacheImpactHitResult.Normal);
          o.V$f = {
            X: e.X,
            Y: e.Y,
            Z: e.Z
          };
        }
        this.aWf ||= this.MainAnimInstance;
        if (this.aWf) {
          o.H$f = {
            X: this.aWf.移动混合.X,
            Y: this.aWf.移动混合.Y,
            Z: 0
          };
        }
        this.PendingAnimInfos.push(o);
      }
    }
  }
  cWf() {
    var o;
    var t;
    if (this.PendingAnimInfos.length !== 0) {
      (o = Protocol_1.Aki.Protocol.K$f.create()).F4n = MathUtils_1.MathUtils.NumberToLong(this.ActorComp.CreatureData.GetCreatureDataId());
      o.j$f = this.PendingAnimInfos;
      (t = Protocol_1.Aki.Protocol.X$f.create()).$$f.push(o);
      t.uhh = ModelManager_1.ModelManager.OnlineModel.OwnerId;
      Net_1.Net.Send(26931, t);
      this.hWf = Time_1.Time.NowSeconds;
      this.PendingAnimInfos = [];
    }
  }
  ReceiveMotorAnimSample(o) {
    for (const t of o) {
      this.ZHr.AddRear(t);
    }
  }
  dWf() {
    if (ModelManager_1.ModelManager.GameModeModel.IsMulti && !this.ActorComp?.IsMoveAutonomousProxy && this.sWf && this.VehicleMovement && !this.ZHr.Empty) {
      while (!this.ZHr.Empty) {
        var o;
        var t;
        var e = this.ZHr.RemoveFront();
        if (!MotorAnimationSyncComponent_1.mWf) {
          MotorAnimationSyncComponent_1.mWf = UE.NewArray(UE.MotorWheelDisplayInfo);
          MotorAnimationSyncComponent_1.mWf.Add(new UE.MotorWheelDisplayInfo());
          MotorAnimationSyncComponent_1.mWf.Add(new UE.MotorWheelDisplayInfo());
        }
        var n = MotorAnimationSyncComponent_1.mWf.Get(0);
        if (n) {
          o = e.O$f;
          n.WheelSpeed = o.q$f;
          n.WheelAccel = o.k$f;
          o = o.P5n;
          n.WheelLocation = new UE.Vector(o.X, o.Y, o.Z);
        }
        var n = MotorAnimationSyncComponent_1.mWf.Get(1);
        if (n) {
          o = e.G$f;
          n.WheelSpeed = o.q$f ?? 0;
          n.WheelAccel = o.k$f ?? 0;
          t = o.P5n;
          n.WheelLocation = new UE.Vector(t.X, t.Y, t.Z);
        }
        MotorAnimationSyncComponent_1.fWf = (0, puerts_1.$ref)(MotorAnimationSyncComponent_1.mWf);
        this.VehicleMovement.SetSimulatedMotorWheelInfos(MotorAnimationSyncComponent_1.fWf);
        (0, puerts_1.$unref)(MotorAnimationSyncComponent_1.fWf);
        var n = this.sWf;
        n.IsBeingImpacted = e.F$f ?? false;
        if (e.F$f && Time_1.Time.NowSeconds - this.lWf >= COLLISIONANIMSYNCUDPSENDINTERVAL) {
          this.lWf = Time_1.Time.NowSeconds;
          n.SimulatedImpactInfo(e.N$f?.X ?? 0, e.N$f?.Y ?? 0, e.N$f?.Z ?? 0, e.V$f?.X ?? 0, e.V$f?.Y ?? 0, e.V$f?.Z ?? 0);
        }
        this.aWf ||= this.MainAnimInstance;
        if (this.aWf && e.H$f) {
          this.aWf.移动混合 = new UE.Vector2D(e.H$f.X, e.H$f.Y);
        }
      }
    }
  }
};
MotorAnimationSyncComponent.fWf = (0, puerts_1.$ref)(undefined);
MotorAnimationSyncComponent.mWf = undefined;
MotorAnimationSyncComponent = MotorAnimationSyncComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(272)], MotorAnimationSyncComponent);
exports.MotorAnimationSyncComponent = MotorAnimationSyncComponent; //# sourceMappingURL=MotorAnimationSyncComponent.js.map