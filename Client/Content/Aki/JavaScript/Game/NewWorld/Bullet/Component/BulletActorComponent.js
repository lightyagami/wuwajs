"use strict";

var __decorate = this && this.__decorate || function (t, o, e, i) {
  var r;
  var s = arguments.length;
  var l = s < 3 ? o : i === null ? i = Object.getOwnPropertyDescriptor(o, e) : i;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    l = Reflect.decorate(t, o, e, i);
  } else {
    for (var h = t.length - 1; h >= 0; h--) {
      if (r = t[h]) {
        l = (s < 3 ? r(l) : s > 3 ? r(o, e, l) : r(o, e)) || l;
      }
    }
  }
  if (s > 3 && l) {
    Object.defineProperty(o, e, l);
  }
  return l;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BulletActorComponent = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const MathCommon_1 = require("../../../../Core/Utils/Math/MathCommon");
const Rotator_1 = require("../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const GlobalData_1 = require("../../../GlobalData");
const BaseActorComponent_1 = require("../../Common/Component/BaseActorComponent");
const BulletActorPool_1 = require("../BulletActorPool");
let BulletActorComponent = class BulletActorComponent extends BaseActorComponent_1.BaseActorComponent {
  constructor() {
    super(...arguments);
    this.bjo = undefined;
    this.NeedDetach = false;
    this.ChildrenAttached = [];
    this.VBr = false;
  }
  OnStart() {
    var t = this.Entity.GetBulletInfo();
    var o = t.BulletDataMain;
    this.bjo = o.Base.Shape;
    this.VBr = o.Move.IsLockScale;
    var o = BulletActorPool_1.BulletActorPool.Get(this.bjo);
    if (GlobalData_1.GlobalData.IsPlayInEditor) {
      o.ActorLabel = `BulletActor_${this.bjo}_${t.BulletRowName}`;
    }
    o.EntityId = this.Entity.Id;
    t.Actor = o;
    this.ActorInternal = t.Actor;
    t.ActorComponent = this;
    return super.OnStart();
  }
  OnActivate() {
    this.ActorInternal.Kuro_SetRole(2);
    this.LastActorLocation.DeepCopy(this.ActorLocationProxy);
  }
  OnClear() {
    if (this.ActorInternal) {
      if (this.VBr) {
        this.ActorInternal.RootComponent.SetAbsolute(false, false, false);
      }
      if (this.ChildrenAttached.length > 0) {
        for (const e of this.ChildrenAttached) {
          if (e?.IsValid() && e.GetParentActor() === this.ActorInternal) {
            e.K2_DetachFromActor(1, 1, 1);
          }
        }
      }
      var t = this.Entity?.GetBulletInfo();
      var o = t?.CollisionInfo?.CollisionComponent;
      if (o) {
        if (!t.IsCollisionRelativeLocationZero) {
          o.D_K2_SetRelativeLocation(Vector_1.Vector.ZeroVectorDouble, false, undefined, true);
        }
        if (t.IsCollisionRelativeRotationModify) {
          o.K2_SetRelativeRotation(Rotator_1.Rotator.ZeroRotator, false, undefined, true);
        }
        if (!o.bHiddenInGame) {
          o.SetHiddenInGame(true);
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Bullet", 20, "子弹碰撞盒显隐被修改", ["Bullet", t.BulletRowName]);
          }
        }
      }
      var o = t?.CollisionInfo?.RegionComponent;
      if (o && (t.IsCollisionRelativeLocationZero || o.D_K2_SetRelativeLocation(Vector_1.Vector.ZeroVectorDouble, false, undefined, true), t.IsCollisionRelativeRotationModify)) {
        o.K2_SetRelativeRotation(Rotator_1.Rotator.ZeroRotator, false, undefined, true);
      }
      if (GlobalData_1.GlobalData.IsPlayInEditor && (this.NeedDetach || Vector_1.Vector.OneVectorDouble.Equals(this.ActorInternal.D_GetActorScale3D(), MathCommon_1.MathCommon.KindaSmallNumber) || Log_1.Log.CheckError() && Log_1.Log.Error("Bullet", 17, "子弹回收时发现子弹缩放值异常", ["EntityId", this.Entity?.Id], ["BulletRowName", t?.BulletRowName]), !this.NeedDetach) && this.ActorInternal.GetAttachParentActor() && Log_1.Log.CheckError()) {
        Log_1.Log.Error("Bullet", 17, "子弹回收时发现子弹仍Attach在别的实体上", ["EntityId", this.Entity?.Id], ["BulletRowName", t?.BulletRowName]);
      }
      BulletActorPool_1.BulletActorPool.Recycle(this.ActorInternal, this.bjo, this.NeedDetach);
    }
    this.bjo = undefined;
    this.ChildrenAttached.length = 0;
    this.NeedDetach = false;
    return super.OnClear();
  }
  SetAttachToComponent(t, o, e, i, r, s) {
    this.ActorInternal.K2_AttachToComponent(t, o, e, i, r, s);
    this.ResetAllCachedTime();
  }
  AddBulletLocalRotator(t) {
    this.ActorInternal.K2_AddActorLocalRotation(t, true, undefined, false);
    this.ResetAllCachedTime();
  }
  SetBulletCustomTimeDilation(t) {
    this.ActorInternal.CustomTimeDilation = t;
  }
};
BulletActorComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(169)], BulletActorComponent);
exports.BulletActorComponent = BulletActorComponent; //# sourceMappingURL=BulletActorComponent.js.map