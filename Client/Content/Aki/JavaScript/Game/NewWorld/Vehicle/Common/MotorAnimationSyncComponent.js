"use strict";

var MotorAnimationSyncComponent_1;
var __decorate = this && this.__decorate || function (t, o, e, n) {
  var i;
  var r = arguments.length;
  var s = r < 3 ? o : n === null ? n = Object.getOwnPropertyDescriptor(o, e) : n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    s = Reflect.decorate(t, o, e, n);
  } else {
    for (var a = t.length - 1; a >= 0; a--) {
      if (i = t[a]) {
        s = (r < 3 ? i(s) : r > 3 ? i(o, e, s) : i(o, e)) || s;
      }
    }
  }
  if (r > 3 && s) {
    Object.defineProperty(o, e, s);
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
const ANIM_SYNC_IMPACT_INTERVAL = 0.1;
let MotorAnimationSyncComponent = MotorAnimationSyncComponent_1 = class MotorAnimationSyncComponent extends CharacterAnimationSyncComponent_1.CharacterAnimationSyncComponent {
  constructor() {
    super(...arguments);
    this.VehicleMovement = undefined;
    this.Nog = undefined;
    this.PendingAnimInfos = [];
    this.ZHr = new Deque_1.Deque();
    this.Vog = undefined;
    this.Hog = 0;
    this.Cxg = 0;
    this.jog = 0;
    this.$og = false;
  }
  OnActivate() {
    var t = super.OnActivate();
    this.Nog = this.Entity.CheckGetComponent(250);
    this.VehicleMovement = this.ActorComp.Owner.GetComponentByClass(UE.KuroVehicleMovementComponent.StaticClass());
    return t;
  }
  AfterTickInner(t) {
    super.AfterTickInner(t);
    this.Wog();
    this.Qog();
  }
  OnTick(t) {
    this.Kog();
  }
  Wog() {
    var t;
    var o;
    var e;
    var n;
    return !!ModelManager_1.ModelManager.GameModeModel.IsMulti && !!this.ActorComp?.IsMoveAutonomousProxy && !!this.VehicleMovement && (!!(t = this.Nog?.IsBeingImpacted ?? false) && !(Time_1.Time.NowSeconds - this.Cxg < ANIM_SYNC_IMPACT_INTERVAL) || !(Time_1.Time.NowSeconds - this.Hog < ANIMSYNCUDPSENDINTERVAL)) && (!!t || this.VehicleMovement.MotorSubState !== 0) && !(o = Protocol_1.Aki.Protocol.wog.create(), (e = this.VehicleMovement.WheelDisplayInfosObj) ? ((n = e.DisplayInfos.Get(0)) && (o.vog = {
      Cog: n.WheelAccel,
      pog: n.WheelSpeed,
      P5n: n.WheelLocation
    }), (n = e.DisplayInfos.Get(1)) && (o.yog = {
      Cog: n.WheelAccel,
      pog: n.WheelSpeed,
      P5n: n.WheelLocation
    })) : Log_1.Log.CheckWarn() && Log_1.Log.Warn("Vehicle", 35, "MotorAnimParam NoWheelInfoObj"), this.Nog && t !== this.$og && (this.$og = t, e = this.Nog, o.Sog = t) && (o.Mog = {
      X: e.ImpactedVelocity.X,
      Y: e.ImpactedVelocity.Y,
      Z: e.ImpactedVelocity.Z
    }, e.CacheImpactHitResult && (n = Vector_1.Vector.Create(e.CacheImpactHitResult.Normal), o.Eog = {
      X: n.X,
      Y: n.Y,
      Z: n.Z
    }), this.Cxg = Time_1.Time.NowSeconds), this.Vog ||= this.MainAnimInstance, this.Vog && (o.Iog = {
      X: this.Vog.移动混合.X,
      Y: this.Vog.移动混合.Y,
      Z: 0
    }), this.PendingAnimInfos.push(o), 0);
  }
  Qog() {
    var t;
    var o;
    if (this.PendingAnimInfos.length !== 0) {
      (t = Protocol_1.Aki.Protocol.Pog.create()).F4n = MathUtils_1.MathUtils.NumberToLong(this.ActorComp.CreatureData.GetCreatureDataId());
      t.Tog = this.PendingAnimInfos;
      (o = Protocol_1.Aki.Protocol.mog.create()).bog.push(t);
      o.uhh = ModelManager_1.ModelManager.OnlineModel.OwnerId;
      Net_1.Net.Send(28342, o);
      this.Hog = Time_1.Time.NowSeconds;
      this.PendingAnimInfos = [];
    }
  }
  ReceiveMotorAnimSample(t) {
    for (const o of t) {
      this.ZHr.AddRear(o);
    }
  }
  Kog() {
    if (ModelManager_1.ModelManager.GameModeModel.IsMulti && !this.ActorComp?.IsMoveAutonomousProxy && this.Nog && this.VehicleMovement && !this.ZHr.Empty) {
      while (!this.ZHr.Empty) {
        var t;
        var o;
        var e = this.ZHr.RemoveFront();
        if (!MotorAnimationSyncComponent_1.Xog) {
          MotorAnimationSyncComponent_1.Xog = UE.NewArray(UE.MotorWheelDisplayInfo);
          MotorAnimationSyncComponent_1.Xog.Add(new UE.MotorWheelDisplayInfo());
          MotorAnimationSyncComponent_1.Xog.Add(new UE.MotorWheelDisplayInfo());
        }
        var n = MotorAnimationSyncComponent_1.Xog.Get(0);
        if (n) {
          t = e.vog;
          n.WheelSpeed = t.pog;
          n.WheelAccel = t.Cog;
          t = t.P5n;
          n.WheelLocation = new UE.Vector(t.X, t.Y, t.Z);
        }
        var n = MotorAnimationSyncComponent_1.Xog.Get(1);
        if (n) {
          t = e.yog;
          n.WheelSpeed = t.pog ?? 0;
          n.WheelAccel = t.Cog ?? 0;
          o = t.P5n;
          n.WheelLocation = new UE.Vector(o.X, o.Y, o.Z);
        }
        MotorAnimationSyncComponent_1.Yog = (0, puerts_1.$ref)(MotorAnimationSyncComponent_1.Xog);
        this.VehicleMovement.SetSimulatedMotorWheelInfos(MotorAnimationSyncComponent_1.Yog);
        (0, puerts_1.$unref)(MotorAnimationSyncComponent_1.Yog);
        var n = this.Nog;
        n.IsBeingImpacted = e.Sog ?? false;
        if (e.Sog && Time_1.Time.NowSeconds - this.jog >= COLLISIONANIMSYNCUDPSENDINTERVAL) {
          this.jog = Time_1.Time.NowSeconds;
          n.SimulatedImpactInfo(e.Mog?.X ?? 0, e.Mog?.Y ?? 0, e.Mog?.Z ?? 0, e.Eog?.X ?? 0, e.Eog?.Y ?? 0, e.Eog?.Z ?? 0);
        }
        this.Vog ||= this.MainAnimInstance;
        if (this.Vog && e.Iog) {
          this.Vog.移动混合 = new UE.Vector2D(e.Iog.X, e.Iog.Y);
        }
      }
    }
  }
};
MotorAnimationSyncComponent.Yog = (0, puerts_1.$ref)(undefined);
MotorAnimationSyncComponent.Xog = undefined;
MotorAnimationSyncComponent = MotorAnimationSyncComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(273)], MotorAnimationSyncComponent);
exports.MotorAnimationSyncComponent = MotorAnimationSyncComponent; //# sourceMappingURL=MotorAnimationSyncComponent.js.map