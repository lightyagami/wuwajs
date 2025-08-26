"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BulletAdditionInfo = exports.BulletInfo = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const Time_1 = require("../../../../Core/Common/Time");
const EntitySystem_1 = require("../../../../Core/Entity/EntitySystem");
const PerformanceController_1 = require("../../../../Core/Performance/PerformanceController");
const Rotator_1 = require("../../../../Core/Utils/Math/Rotator");
const Transform_1 = require("../../../../Core/Utils/Math/Transform");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const BulletConstant_1 = require("../../Bullet/BulletConstant");
const BulletController_1 = require("../BulletController");
const BulletStaticFunction_1 = require("../BulletStaticMethod/BulletStaticFunction");
const BulletCollisionInfo_1 = require("./BulletCollisionInfo");
const BulletEffectInfo_1 = require("./BulletEffectInfo");
const BulletMoveInfo_1 = require("./BulletMoveInfo");
const BulletRayInfo_1 = require("./BulletRayInfo");
class BulletInfo {
  constructor() {
    this.xe = 0;
    this.Entity = undefined;
    this.EHo = false;
    this.SHo = undefined;
    this.Lo = undefined;
    this.ActionInfoList = [];
    this.NextActionInfoList = [];
    this.PersistentActionList = [];
    this.Actor = undefined;
    this.ActorComponent = undefined;
    this.ActionLogicComponent = undefined;
    this.IsInit = false;
    this.NeedDestroy = false;
    this.IsDestroyByCharSkillEnd = false;
    this.GenerateTime = -0;
    this.BulletCamp = 0;
    this.ShakeNumbers = 0;
    this.IsFrozen = false;
    this.FrozenTime = undefined;
    this.IsShield = false;
    this.yHo = undefined;
    this.Fyn = false;
    this.RandomPosOffset = Vector_1.Vector.Create();
    this.RandomInitSpeedOffset = Vector_1.Vector.Create();
    this.IHo = false;
    this.THo = false;
    this.LHo = Vector_1.Vector.Create();
    this.gii = Rotator_1.Rotator.Create();
    this.InitPosition = Vector_1.Vector.Create();
    this.DHo = new Array();
    this.CreateFrame = 0;
    this.LiveTimeRatio = 1;
    this.LiveTimeAddDelta = 0;
    this.LiveTime = 0;
    this.LiveTimeCurHit = 0;
    this.IsTimeNotEnough = false;
    this.BaseSize = Vector_1.Vector.Create();
    this.Size = Vector_1.Vector.Create();
    this.RHo = Vector_1.Vector.Create();
    this.UHo = undefined;
    this.CloseCollision = false;
    this.CollisionInfo = new BulletCollisionInfo_1.BulletCollisionInfo();
    this.AHo = Vector_1.Vector.Create();
    this.GetCollisionLocationFrame = 0;
    this.IsCollisionRelativeLocationZero = false;
    this.IsCollisionRelativeRotationModify = false;
    this.MoveInfo = new BulletMoveInfo_1.BulletMoveInfo();
    this.EffectInfo = new BulletEffectInfo_1.BulletEffectInfo();
    this.PHo = 0;
    this.xHo = undefined;
    this.wHo = undefined;
    this.eVo = undefined;
    this.BHo = undefined;
    this.bHo = undefined;
    this.qHo = undefined;
    this.GHo = undefined;
    this.IsAutonomousProxy = false;
    this.AttackerCamp = 0;
    this.AttackerPlayerId = 0;
    this.SkillBoneName = undefined;
    this.SkillLevel = 0;
    this.TargetId = 0;
    this.TargetIdLast = 0;
    this.NHo = undefined;
    this.OHo = undefined;
    this.ParentBulletInfo = undefined;
    this.ChildEntityIds = undefined;
    this.ChildInfo = undefined;
    this.ParentEffect = 0;
    this.NeedNotifyChildrenWhenDestroy = false;
    this.HitNumberAll = 0;
    this.EntityHitCount = new Map();
    this.CountByParent = false;
    this.TimeScaleList = undefined;
    this.TimeScaleMap = undefined;
    this.TimeScaleId = 0;
    this.SummonSkillId = 0;
    this.SummonAttackerId = 0;
    this.SummonServerEntityId = 0;
    this.BornFrameCount = undefined;
    this.PreContextId = undefined;
    this.ContextId = undefined;
    this.HHo = () => {
      this.ClearAttacker();
      BulletController_1.BulletController.DestroyBullet(this.BulletEntityId, false);
    };
    this.jHo = () => {
      this.ClearTarget();
    };
    this.BornLocationOffset = Vector_1.Vector.Create();
    this.AdditionInfo = undefined;
    this.y6o = 0;
    this.ParentIds = undefined;
  }
  get BulletEntityId() {
    return this.xe;
  }
  get HasCheckedPosition() {
    return this.EHo;
  }
  CheckedPosition() {
    this.EHo = true;
  }
  get BulletInitParams() {
    return this.SHo;
  }
  get TransformCreate() {
    return this.SHo.InitialTransform;
  }
  get BaseVelocityEntityId() {
    return this.SHo.BaseVelocityId;
  }
  get BulletRowName() {
    return this.SHo.BulletRowName;
  }
  GetBaseVelocityTarget() {
    return EntitySystem_1.EntitySystem.Get(this.SHo.BaseVelocityId)?.GetComponent(1);
  }
  get BulletDataMain() {
    return this.Lo;
  }
  get IsTensile() {
    return this.BulletDataMain.Move.FollowType === 2;
  }
  get BaseTransformEntity() {
    var t;
    if (!this.Fyn && !this.yHo) {
      if ((t = ModelManager_1.ModelManager.CharacterModel.GetHandle(this.SHo.BaseTransformId))?.Valid) {
        this.yHo = t;
      }
      this.Fyn = true;
    }
    return this.yHo;
  }
  SetActorLocation(t) {
    if (isNaN(t.X) || isNaN(t.Y) || isNaN(t.Z)) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Bullet", 17, "设置子弹坐标为Nan,直接销毁", ["location", t], ["BulletEntityId", this.BulletEntityId], ["BulletRowName", this.BulletRowName]);
      }
      BulletController_1.BulletController.DestroyBullet(this.BulletEntityId, false);
    } else {
      this.LHo.FromUeVector(t);
      this.IHo = true;
    }
  }
  SetActorRotation(t) {
    if (isNaN(t.Pitch) || isNaN(t.Yaw) || isNaN(t.Roll)) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Bullet", 17, "设置子弹朝向为Nan,直接销毁", ["rotation", t], ["BulletEntityId", this.BulletEntityId], ["BulletRowName", this.BulletRowName]);
      }
      BulletController_1.BulletController.DestroyBullet(this.BulletEntityId, false);
    } else {
      this.gii.FromUeRotator(t);
      this.THo = true;
    }
  }
  GetActorLocation() {
    if (this.IHo) {
      return this.LHo;
    } else {
      return this.ActorComponent.ActorLocationProxy;
    }
  }
  GetActorRotation() {
    if (this.THo) {
      return this.gii;
    } else {
      return this.ActorComponent.ActorRotationProxy;
    }
  }
  GetActorForward(t) {
    if (this.THo) {
      this.gii.Vector(t);
    } else {
      t.FromUeVector(this.ActorComponent.ActorForwardProxy);
    }
  }
  ActorRotateVector(t, i) {
    (this.THo ? this.gii : this.ActorComponent.ActorRotationProxy).Quaternion().RotateVector(t, i);
  }
  AddBulletLocalRotator(t) {
    this.ApplyCacheLocationAndRotation();
    this.ActorComponent.AddBulletLocalRotator(t);
  }
  ApplyCacheLocationAndRotation() {
    if (this.IHo) {
      if (this.THo) {
        this.ActorComponent.SetActorLocationAndRotation(this.LHo.ToUeVector(), this.gii.ToUeRotator(), this.constructor.name, false);
        this.IHo = false;
        this.THo = false;
      } else {
        this.ActorComponent.SetActorLocation(this.LHo.ToUeVector(), this.constructor.name, false);
        this.IHo = false;
      }
      this.GetCollisionLocationFrame = 0;
    } else if (this.THo) {
      this.ActorComponent.SetActorRotation(this.gii.ToUeRotator(), this.constructor.name, false);
      this.THo = false;
      this.GetCollisionLocationFrame = 0;
    }
  }
  ClearCacheLocationAndRotation() {
    this.IHo = false;
    this.THo = false;
  }
  get Tags() {
    return this.DHo;
  }
  AddTag(t) {
    this.DHo.push(t.TagId);
  }
  AddTagId(t) {
    this.DHo.push(t);
  }
  HasTag(t) {
    if (this.DHo && this.DHo.length > 0) {
      for (const i of this.DHo) {
        if (i === t.TagId) {
          return true;
        }
      }
    }
    return false;
  }
  HasTagId(t) {
    return !!this.DHo && this.DHo.includes(t);
  }
  get CenterLocation() {
    this.ActorComponent.ActorQuatProxy.RotateVector(this.CollisionInfo.CenterLocalLocation, this.RHo);
    this.RHo.AdditionEqual(this.ActorComponent.ActorLocationProxy);
    return this.RHo;
  }
  get RayInfo() {
    this.UHo ||= new BulletRayInfo_1.BulletRayInfo();
    return this.UHo;
  }
  get CollisionRotator() {
    if (this.CollisionInfo.CollisionComponent) {
      return this.CollisionInfo.CollisionComponent.K2_GetComponentRotation();
    } else {
      return this.ActorComponent.ActorRotation;
    }
  }
  GetCollisionLocation(t = true) {
    if (t && !BulletInfo.InAfterTick) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Bullet", 20, "GetCollisionLocation只能在AfterTick中使用", ["BulletEntityId", this.BulletEntityId], ["BulletRowName", this.BulletRowName]);
      }
    } else if (this.GetCollisionLocationFrame < Time_1.Time.Frame) {
      this.GetCollisionLocationFrame = Time_1.Time.Frame;
      if (!this.IsCollisionRelativeLocationZero && this.CollisionInfo.CollisionComponent) {
        this.AHo.FromUeVector(this.CollisionInfo.CollisionComponent.D_K2_GetComponentLocation());
      } else {
        this.AHo.FromUeVector(this.ActorComponent.ActorLocationProxy);
      }
    }
    return this.AHo;
  }
  get AttackerId() {
    return this.PHo;
  }
  get AttackerHandle() {
    return this.xHo;
  }
  get Attacker() {
    return this.xHo?.Entity;
  }
  ClearAttacker() {
    this.KHo();
    this.xHo = undefined;
    this.wHo = undefined;
    this.eVo = undefined;
    this.BHo = undefined;
    this.bHo = undefined;
    this.qHo = undefined;
    this.GHo = undefined;
  }
  get AttackerCreatureDataComp() {
    this.wHo ||= this.Attacker?.GetComponent(0);
    return this.wHo;
  }
  get AttackerActorComp() {
    this.eVo ||= this.Attacker?.GetComponent(3);
    return this.eVo;
  }
  get AttackerSkillComp() {
    this.BHo ||= this.Attacker?.GetComponent(40);
    return this.BHo;
  }
  get AttackerBuffComp() {
    this.bHo ||= this.Attacker?.GetComponent(175);
    return this.bHo;
  }
  get AttackerMoveComp() {
    this.qHo ||= this.Attacker?.GetComponent(179);
    return this.qHo;
  }
  get AttackerAudioComponent() {
    this.GHo ||= this.Attacker?.GetComponent(51);
    return this.GHo;
  }
  get Target() {
    if (this.NHo) {
      return this.NHo?.Entity;
    }
  }
  SetTargetById(t) {
    t = ModelManager_1.ModelManager.CharacterModel.GetHandle(t);
    if (t?.Valid) {
      this.QHo();
      this.NHo = t;
      this.OHo = undefined;
      this.XHo();
    } else {
      this.ClearTarget();
    }
  }
  ClearTarget() {
    this.QHo();
    this.NHo = undefined;
    this.TargetId = 0;
    this.OHo = undefined;
  }
  get TargetActorComp() {
    this.OHo ||= this.Target?.GetComponent(1);
    return this.OHo;
  }
  GetLockOnTargetDynamic() {
    return this.xHo?.Entity?.GetComponent(32)?.GetCurrentTarget()?.Entity?.GetComponent(1);
  }
  get ParentEntityId() {
    return this.SHo.ParentId;
  }
  Init(t, i) {
    this.SHo = t;
    this.Lo = i;
    this.ActionInfoList.length = 0;
    this.NextActionInfoList.length = 0;
    this.PersistentActionList.length = 0;
    this.PHo = this.SHo.Owner?.Id;
    this.xHo = ModelManager_1.ModelManager.CharacterModel.GetHandle(this.PHo);
    this.IsInit = false;
    this.NeedDestroy = false;
    this.ShakeNumbers = 0;
    this.HitNumberAll = 0;
    this.GetCollisionLocationFrame = 0;
    this.SkillBoneName = BulletConstant_1.BulletConstant.HitCase;
    this.PreContextId = undefined;
    this.ContextId = undefined;
    if (t.LocationOffset) {
      this.BornLocationOffset.FromUeVector(t.LocationOffset);
      this.BornLocationOffset.AdditionEqual(i.Base.BornPosition);
    } else {
      this.BornLocationOffset.FromUeVector(i.Base.BornPosition);
    }
    this.JHo();
    if (PerformanceController_1.PerformanceController.IsEntityTickPerformanceTest) {
      this.BornFrameCount = UE.KismetSystemLibrary.GetFrameCount();
    }
  }
  InitEntity(t) {
    this.Entity = t;
    this.xe = t.Id;
  }
  Clear() {
    this.xe = 0;
    this.Entity = undefined;
    this.SHo = undefined;
    this.Lo = undefined;
    var t = BulletController_1.BulletController.GetActionCenter();
    for (const i of this.ActionInfoList) {
      t.RecycleBulletActionInfo(i);
    }
    for (const s of this.NextActionInfoList) {
      t.RecycleBulletActionInfo(s);
    }
    for (const e of this.PersistentActionList) {
      t.RecycleBulletAction(e);
    }
    this.ActionInfoList.length = 0;
    this.NextActionInfoList.length = 0;
    this.PersistentActionList.length = 0;
    this.Actor = undefined;
    this.ActorComponent = undefined;
    this.ActionLogicComponent = undefined;
    this.IsInit = false;
    this.EHo = false;
    this.NeedDestroy = false;
    this.IsDestroyByCharSkillEnd = false;
    this.GenerateTime = 0;
    this.BulletCamp = 0;
    this.yHo = undefined;
    this.IHo = false;
    this.THo = false;
    this.LHo.Reset();
    this.gii.Reset();
    this.RandomInitSpeedOffset.Reset();
    this.RandomPosOffset.Reset();
    this.ShakeNumbers = 0;
    this.IsFrozen = false;
    this.FrozenTime = undefined;
    this.IsShield = false;
    this.InitPosition.Reset();
    this.DHo.length = 0;
    this.CreateFrame = 0;
    this.LiveTimeAddDelta = 0;
    this.LiveTime = 0;
    this.IsTimeNotEnough = false;
    this.BaseSize.Reset();
    this.Size.Reset();
    this.RHo.Reset();
    this.CloseCollision = false;
    this.AHo.Reset();
    this.GetCollisionLocationFrame = 0;
    this.IsCollisionRelativeLocationZero = false;
    this.IsCollisionRelativeRotationModify = false;
    this.PHo = 0;
    this.ClearAttacker();
    this.IsAutonomousProxy = false;
    this.AttackerCamp = 0;
    this.AttackerPlayerId = 0;
    this.SkillBoneName = undefined;
    this.SkillLevel = 0;
    this.ClearTarget();
    this.TargetIdLast = 0;
    this.ParentBulletInfo = undefined;
    this.ChildEntityIds = undefined;
    this.ParentEffect = 0;
    this.NeedNotifyChildrenWhenDestroy = false;
    this.HitNumberAll = 0;
    this.EntityHitCount.clear();
    this.CountByParent = false;
    this.TimeScaleList = undefined;
    this.TimeScaleMap = undefined;
    this.TimeScaleId = 0;
    this.SummonSkillId = 0;
    this.SummonAttackerId = 0;
    this.SummonServerEntityId = 0;
    this.CollisionInfo.Clear();
    this.MoveInfo.Clear();
    BulletStaticFunction_1.BulletStaticFunction.DestroyEffect(this);
    this.EffectInfo.Clear();
    this.AdditionInfo?.Clear();
    this.ChildInfo = undefined;
    this.UHo = undefined;
    this.BornLocationOffset.Reset();
    this.ContextId = undefined;
    this.PreContextId = undefined;
    this.Fyn = false;
    this.ParentIds = undefined;
    if (BulletConstant_1.BulletConstant.OpenClearCheck) {
      BulletInfo.zHo(this);
    }
  }
  SwapActionInfoList() {
    var t;
    if ((this.ActionInfoList.length = 0) < this.NextActionInfoList.length) {
      t = this.ActionInfoList;
      this.ActionInfoList = this.NextActionInfoList;
      this.NextActionInfoList = t;
    }
  }
  JHo() {
    if (this.AttackerHandle) {
      EventSystem_1.EventSystem.AddWithTarget(this.AttackerHandle, EventDefine_1.EEventName.RemoveEntity, this.HHo);
    }
  }
  KHo() {
    if (this.AttackerHandle) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.AttackerHandle, EventDefine_1.EEventName.RemoveEntity, this.HHo);
    }
  }
  XHo() {
    if (this.NHo) {
      EventSystem_1.EventSystem.AddWithTarget(this.NHo, EventDefine_1.EEventName.RemoveEntity, this.jHo);
    }
  }
  QHo() {
    if (this.NHo) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.NHo, EventDefine_1.EEventName.RemoveEntity, this.jHo);
    }
  }
  static zHo(t) {
    for (const e in t) {
      var i = t[e];
      var s = typeof i;
      if (i !== undefined && s != "function" && (s != "number" || i !== 0) && (s != "boolean" || i !== false)) {
        if (i instanceof BulletCollisionInfo_1.BulletCollisionInfo || i instanceof BulletMoveInfo_1.BulletMoveInfo || i instanceof BulletEffectInfo_1.BulletEffectInfo) {
          this.zHo(i);
        } else if (i instanceof Vector_1.Vector) {
          if (!i.IsZero()) {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Bullet", 17, "BulletInfo回收时，Vector没重置", ["key", e]);
            }
          }
        } else if (i instanceof Rotator_1.Rotator) {
          if (!i.IsNearlyZero()) {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Bullet", 17, "BulletInfo回收时，Rotator没重置", ["key", e]);
            }
          }
        } else if (i instanceof Transform_1.Transform) {
          if (!i.GetLocation().IsZero() || !i.GetScale3D().IsZero() || i.GetRotation().X !== 0 || i.GetRotation().Y !== 0 || i.GetRotation().Z !== 0 || i.GetRotation().W !== 1) {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Bullet", 17, "BulletInfo回收时，Transform没重置", ["key", e]);
            }
          }
        } else if (i instanceof Array) {
          if (i.length !== 0 && Log_1.Log.CheckError()) {
            Log_1.Log.Error("Bullet", 17, "BulletInfo回收时，Array没清空", ["key", e]);
          }
        } else if (i instanceof Map) {
          if (i.size !== 0 && Log_1.Log.CheckError()) {
            Log_1.Log.Error("Bullet", 17, "BulletInfo回收时，Map没清空", ["key", e]);
          }
        } else if (i instanceof Set) {
          if (i.size !== 0 && Log_1.Log.CheckError()) {
            Log_1.Log.Error("Bullet", 17, "BulletInfo回收时，Set没清空", ["key", e]);
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Bullet", 17, "BulletInfo回收时，该变量不为undefined", ["type", s], ["key", e]);
        }
      }
    }
  }
  OnTargetInValid() {
    switch (this.BulletDataMain.Move.TrackTarget) {
      case 6:
      case 2:
      case 11:
      case 7:
      case 8:
      case 5:
      case 9:
      case 4:
        this.SetTargetById(0);
    }
  }
  get Duration() {
    return this.y6o;
  }
  set Duration(t) {
    this.y6o = t;
  }
}
(exports.BulletInfo = BulletInfo).InAfterTick = false;
class BulletAdditionInfo {
  constructor() {
    this.SizeScale = Vector_1.Vector.Create();
    this.IntervalScale = 0;
    this.DurationAddition = 0;
    this.iMc = false;
  }
  get Valid() {
    return this.iMc;
  }
  Clear() {
    this.iMc = false;
    this.SizeScale.Reset();
    this.IntervalScale = 0;
    this.DurationAddition = 0;
  }
  Init() {
    this.iMc = true;
  }
}
exports.BulletAdditionInfo = BulletAdditionInfo;
//# sourceMappingURL=BulletInfo.js.map