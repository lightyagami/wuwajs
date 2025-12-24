"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BulletActionInitMove = undefined;
const UE = require("ue");
const Info_1 = require("../../../../Core/Common/Info");
const Log_1 = require("../../../../Core/Common/Log");
const Stats_1 = require("../../../../Core/Common/Stats");
const QueryTypeDefine_1 = require("../../../../Core/Define/QueryTypeDefine");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const FNameUtil_1 = require("../../../../Core/Utils/FNameUtil");
const MathCommon_1 = require("../../../../Core/Utils/Math/MathCommon");
const Rotator_1 = require("../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const TraceElementCommon_1 = require("../../../../Core/Utils/TraceElementCommon");
const EffectSystem_1 = require("../../../Effect/EffectSystem");
const Global_1 = require("../../../Global");
const GlobalData_1 = require("../../../GlobalData");
const ModelManager_1 = require("../../../Manager/ModelManager");
const ActorUtils_1 = require("../../../Utils/ActorUtils");
const ColorUtils_1 = require("../../../Utils/ColorUtils");
const BulletConstant_1 = require("../../Bullet/BulletConstant");
const BulletController_1 = require("../BulletController");
const BulletLog_1 = require("../BulletStaticMethod/BulletLog");
const BulletUtil_1 = require("../BulletUtil");
const BulletMoveInfo_1 = require("../Model/BulletMoveInfo");
const BulletPool_1 = require("../Model/BulletPool");
const BulletTraceElementPool_1 = require("../Model/BulletTraceElementPool");
const BulletActionBase_1 = require("./BulletActionBase");
const DEFAULT_GRAVITY = -1000;
const DEFAULT_UP_DISTANCE = 500;
const PROFILE_AIMED_TOWARD = "BulletMoveAimedToward";
const PROFILE_STICK_GROUND = "BulletMoveStickGround";
const PROFILE_STICK_WATER = "BulletMoveStickWater";
class BulletActionInitMove extends BulletActionBase_1.BulletActionBase {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.z5o = false;
    this.Z5o = undefined;
    this.eVo = undefined;
    this.tVo = false;
  }
  get iVo() {
    if (!this.z5o) {
      this.z5o = true;
      this.Z5o = this.oVo(this.rVo, this.Pe.Move.SkeletonComponentName);
    }
    return this.Z5o;
  }
  set rVo(t) {
    if (this.eVo !== t) {
      this.eVo = t;
      this.z5o = false;
      this.Z5o = undefined;
    }
  }
  get rVo() {
    this.eVo ||= this.BulletInfo.AttackerActorComp;
    return this.eVo;
  }
  Clear() {
    super.Clear();
    this.Pe = undefined;
    this.z5o = false;
    this.Z5o = undefined;
    this.eVo = undefined;
    this.tVo = false;
  }
  OnExecute() {
    var t = this.BulletInfo.BulletInitParams;
    const e = this.BulletInfo.BulletDataMain;
    var l = (this.Pe = e).Move;
    var o = e.Obstacle;
    var i = this.BulletInfo.MoveInfo;
    i.BulletSpeedRatio = 1;
    var _ = this.BulletInfo.AttackerSkillComp;
    if (this.BulletInfo.Target?.Valid && _?.Valid && (this.BulletInfo.BulletInitParams.CreateSource === 1 || _.CurrentSkill) && _.SkillTargetSocket) {
      this.BulletInfo.SkillBoneName = FNameUtil_1.FNameUtil.GetDynamicFName(_.SkillTargetSocket);
    }
    i.BulletSpeed = l.Speed;
    i.ObstaclesOffset.FromUeVector(o.Center);
    BulletActionInitMove.nVo.Start();
    this.sVo();
    this.aVo();
    BulletActionInitMove.nVo.Stop();
    BulletActionInitMove.hVo.Start();
    var _ = e.Base;
    var o = e.Aimed;
    if (!_.StickGround && o.AimedCtrlDir) {
      if (t.FromRemote) {
        i.BeginSpeedRotator.FromUeRotator(t.InitialTransform.Rotator());
      } else {
        this.lVo(i.BeginSpeedRotator);
      }
      this.BulletInfo.SetActorRotation(i.BeginSpeedRotator.ToUeRotator());
    }
    var _ = this.BulletInfo.AttackerMoveComp?.IsStandardGravity ?? true;
    if (_) {
      this.p3c();
    } else {
      this._Vo();
    }
    this.uVo();
    if (_) {
      this.v3c();
    } else {
      this.cVo();
    }
    this.mVo();
    if (l.TrackParams.length > 0) {
      const e = l.TrackParams[0];
      i.MinFollowHeight = e.Y;
      i.SpeedFollowTarget = e.X;
      if (e.Z > 0) {
        i.FollowTargetBottom = false;
      }
    }
    BulletActionInitMove.hVo.Stop();
    i.LastFramePosition.FromUeVector(this.BulletInfo.GetActorLocation());
    i.FollowBoneBulletRotator.FromUeRotator(this.BulletInfo.GetActorRotation());
    this.BulletInfo.ApplyCacheLocationAndRotation();
  }
  oVo(t, e) {
    if (e !== StringUtils_1.NONE_STRING) {
      var l = t.Owner?.K2_GetComponentsByClass(UE.SkeletalMeshComponent.StaticClass());
      var o = l ? l.Num() : 0;
      for (let t = 0; t < o; t++) {
        var i = l.Get(t);
        if (i?.IsValid() && i.GetName() === e) {
          return i;
        }
      }
    }
    return t.SkeletalMesh;
  }
  dVo(t) {
    var e;
    var l;
    var o = this.Pe.Move;
    if (o.FollowType === 0) {
      l = this.BulletInfo;
      e = this.oVo(t?.Valid ? t : l.AttackerActorComp, o.SkeletonComponentName);
      if (o.IsLockScale) {
        l.Actor.RootComponent.SetAbsolute(false, false, true);
      }
      l.ApplyCacheLocationAndRotation();
      l.ActorComponent.SetAttachToComponent(e, o.BoneName, 1, 1, 1, true);
      l.InitPosition.FromUeVector(l.ActorComponent.ActorLocationProxy);
    } else if (o.FollowType === 3) {
      e = this.BulletInfo;
      l = this.oVo(t?.Valid ? t : e.AttackerActorComp, o.SkeletonComponentName);
      if (o.IsLockScale) {
        e.Actor.RootComponent.SetAbsolute(false, false, true);
      }
      e.ApplyCacheLocationAndRotation();
      e.ActorComponent.SetAttachToComponent(l, o.BoneName, 0, 0, 0, true);
      e.Actor.D_K2_SetActorRelativeLocation(e.BornLocationOffset.ToUeVector(), false, undefined, false);
      e.Actor.K2_SetActorRelativeRotation(Rotator_1.Rotator.ZeroRotator, false, undefined, true);
      e.InitPosition.FromUeVector(e.ActorComponent.ActorLocationProxy);
    }
  }
  sVo() {
    var t = this.BulletInfo;
    switch (this.Pe.Base.BornPositionStandard) {
      case 0:
        this.CVo(t.AttackerActorComp);
        break;
      case 1:
        this.gVo(t.BaseTransformEntity?.Entity?.GetComponent(1), false);
        break;
      case 12:
        this.gVo(t.BaseTransformEntity?.Entity?.GetComponent(1), true);
        break;
      case 7:
      case 8:
      case 5:
      case 10:
      case 9:
      case 4:
        this.fVo(t.BaseTransformEntity);
        break;
      case 11:
        this.fVo(t.BaseTransformEntity, true);
        break;
      case 3:
        this.vVo(t);
        break;
      case 2:
        this.MVo(MathUtils_1.MathUtils.DefaultTransformProxy);
        break;
      case 6:
        this.EVo();
    }
    if (BulletConstant_1.BulletConstant.OpenMoveLog && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Bullet", 20, "BulletActionInitMove OnStartBaseLocation", ["Location", this.BulletInfo?.GetActorLocation()], ...BulletLog_1.BulletLog.ToPairs(this.BulletInfo));
    }
  }
  CVo(t) {
    this.MVo(undefined);
    this.dVo(t);
  }
  gVo(t, e) {
    var l = BulletMoveInfo_1.BulletMoveInfo.TempTransform1;
    this.SVo(t, l, false, e);
    this.MVo(l);
    if (t?.Owner?.IsA(UE.BaseCharacter.StaticClass())) {
      this.dVo(t);
    }
  }
  fVo(t, e = false) {
    var l = BulletMoveInfo_1.BulletMoveInfo.TempTransform1;
    var t = t?.Entity?.GetComponent(1);
    if (t?.Owner?.IsA(UE.BaseCharacter.StaticClass())) {
      this.SVo(t, l, e);
      this.rVo = t;
      if (e) {
        this.j2a(l);
      } else {
        this.MVo(l);
      }
      this.dVo(t);
    } else {
      this.SVo(t, l);
      this.MVo(l);
    }
  }
  vVo(t) {
    var e;
    var l;
    var o;
    var i;
    if (this.Pe.Move.FollowType === 4) {
      this.yVo(t);
    } else {
      e = BulletMoveInfo_1.BulletMoveInfo.TempTransform1;
      o = t.BulletInitParams;
      i = this.Pe.Base;
      l = BulletPool_1.BulletPool.CreateVector();
      e.FromUeTransform(o.InitialTransform);
      l.FromUeVector(e.GetLocation());
      if (l.Equals(Vector_1.Vector.ZeroVectorProxy)) {
        this.MVo(e);
      } else {
        if (!t.BulletInitParams.FromRemote) {
          o = i.BornPositionRandom;
          i = BulletPool_1.BulletPool.CreateVector(true);
          if (!o.Equals(Vector_1.Vector.ZeroVectorProxy)) {
            i.X = this.HY(o.X);
            i.Y = this.HY(o.Y);
            i.Z = this.HY(o.Z);
          }
          if (!t.BornLocationOffset.Equals(Vector_1.Vector.ZeroVectorProxy)) {
            i.AdditionEqual(t.BornLocationOffset);
          }
          if (!i.Equals(Vector_1.Vector.ZeroVectorProxy)) {
            e.TransformPosition(i, l);
          }
          BulletPool_1.BulletPool.RecycleVector(i);
        }
        t.SetActorLocation(l);
        t.InitPosition.FromUeVector(l);
      }
      BulletPool_1.BulletPool.RecycleVector(l);
    }
  }
  yVo(t) {
    var e;
    var l = ModelManager_1.ModelManager.BulletModel.GetBulletEntityById(t.ParentEntityId);
    if (l) {
      l = l.GetBulletInfo();
      t.ParentEffect = l.EffectInfo.Effect;
      if (e = EffectSystem_1.EffectSystem.GetSureEffectActor(t.ParentEffect)) {
        if (BulletUtil_1.BulletUtil.AttachParentEffectSkeleton(t, e, t.ParentEffect)) {
          t.InitPosition.FromUeVector(t.ActorComponent.ActorLocationProxy);
        }
      } else {
        e = l.MoveInfo.LastFramePosition;
        t.SetActorLocation(e);
        t.InitPosition.FromUeVector(e);
        BulletController_1.BulletController.AddSimpleAction(t, 10);
      }
    } else {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Temp", 17, "子弹为跟随父子弹特效骨骼，但是找不到父子弹", ["EntityId", t.BulletEntityId], ["BulletRowName", t.BulletRowName], ["ParentEntityId", t.ParentEntityId]);
      }
      this.MVo(undefined);
    }
  }
  EVo() {
    var t = BulletUtil_1.BulletUtil.GetCurrentRole(this.BulletInfo);
    var e = BulletMoveInfo_1.BulletMoveInfo.TempTransform1;
    e.FromUeTransform(t.ActorTransform);
    this.rVo = t;
    this.MVo(e);
    this.dVo(t);
  }
  j2a(t) {
    var e = this.BulletInfo;
    var l = this.Pe.Base;
    var o = BulletPool_1.BulletPool.CreateVector();
    var l = l.BornPositionRandom;
    if (l.Equality(Vector_1.Vector.ZeroVectorProxy)) {
      o.FromUeVector(e.BornLocationOffset);
    } else {
      if (e.BulletInitParams.FromRemote) {
        o.FromUeVector(e.RandomPosOffset);
      } else {
        o.X = this.HY(l.X);
        o.Y = this.HY(l.Y);
        o.Z = this.HY(l.Z);
        e.RandomPosOffset.FromUeVector(o);
      }
      o.AdditionEqual(e.BornLocationOffset);
    }
    var l = BulletPool_1.BulletPool.CreateVector();
    t.TransformPosition(o, l);
    e.SetActorLocation(l);
    e.InitPosition.FromUeVector(l);
    BulletPool_1.BulletPool.RecycleVector(o);
    BulletPool_1.BulletPool.RecycleVector(l);
  }
  MVo(t) {
    var e = this.BulletInfo;
    var l = e.MoveInfo;
    var o = this.Pe.Base;
    var i = this.Pe.Move;
    var _ = o.BornPositionRandom;
    var r = e.AttackerActorComp;
    var a = BulletPool_1.BulletPool.CreateVector();
    if (_.Equality(Vector_1.Vector.ZeroVectorProxy)) {
      a.FromUeVector(e.BornLocationOffset);
    } else {
      if (e.BulletInitParams.FromRemote) {
        a.FromUeVector(e.RandomPosOffset);
      } else {
        a.X = this.HY(_.X);
        a.Y = this.HY(_.Y);
        a.Z = this.HY(_.Z);
        e.RandomPosOffset.FromUeVector(a);
      }
      a.AdditionEqual(e.BornLocationOffset);
    }
    var _ = BulletPool_1.BulletPool.CreateVector();
    var s = BulletPool_1.BulletPool.CreateVector();
    if (FNameUtil_1.FNameUtil.IsNothing(i.BoneName) || !this.iVo) {
      if (o.BornPositionStandard === 0) {
        a.Z -= r.ScaledHalfHeight;
      }
      (t || ((o = BulletMoveInfo_1.BulletMoveInfo.TempTransform1).SetRotation(r.ActorQuatProxy), o.SetLocation(r.ActorLocationProxy), o.SetScale3D(r.ActorScaleProxy), o)).TransformPosition(a, _);
    } else {
      l.SocketTransform.FromUeTransform(this.iVo.D_GetSocketTransform(i.BoneName, 0));
      _.FromUeVector(l.SocketTransform.GetLocation());
      r.ActorQuatProxy.RotateVector(a, s);
      _.AdditionEqual(s);
    }
    e.SetActorLocation(_);
    e.InitPosition.FromUeVector(_);
    BulletPool_1.BulletPool.RecycleVector(a);
    BulletPool_1.BulletPool.RecycleVector(_);
    BulletPool_1.BulletPool.RecycleVector(s);
  }
  SVo(t, e, l = false, o = false) {
    var i = this.BulletInfo;
    var _ = i.AttackerActorComp;
    if (t?.Valid) {
      if (o) {
        e.FromUeTransform(t.ActorTransform);
      } else {
        e.FromUeTransform(t.GetSocketTransform(i.SkillBoneName));
      }
      (t = BulletPool_1.BulletPool.CreateVector()).FromUeVector(e.GetLocation());
      this.IVo(t);
      e.SetLocation(t);
      BulletPool_1.BulletPool.RecycleVector(t);
    } else {
      if (l && Log_1.Log.CheckError()) {
        Log_1.Log.Error("Bullet", 20, "出生位置需要完全基于目标, 但是目标不存在", ["子弹ID", i.BulletRowName]);
      }
      e.Reset();
      (t = BulletPool_1.BulletPool.CreateVector()).FromUeVector(_.ActorLocation);
      this.IVo(t);
      e.SetLocation(t);
      BulletPool_1.BulletPool.RecycleVector(t);
    }
    if (!l && !o) {
      e.SetRotation(_.ActorQuat);
    }
  }
  IVo(t) {
    var e;
    var l;
    var o = this.BulletInfo;
    var i = this.BulletInfo.BulletDataMain.Base;
    this.tVo = false;
    var _ = BulletPool_1.BulletPool.CreateVector();
    _.FromUeVector(i.BornDistLimit);
    var i = _.Y;
    var r = _.X;
    var a = _.Z;
    if (!_.IsZero()) {
      e = o.AttackerActorComp.ActorLocationProxy;
      _.FromUeVector(t);
      if (i < (l = Vector_1.Vector.Dist(_, e))) {
        _.SubtractionEqual(e);
        _.Normalize();
        _.MultiplyEqual(i);
        _.AdditionEqual(e);
        this.tVo = true;
      } else if (l <= r) {
        this.tVo = true;
        if (o.Target?.Valid) {
          _.SubtractionEqual(e);
          _.Normalize();
          _.MultiplyEqual(r);
        } else {
          _.FromUeVector(o.AttackerActorComp.ActorForward);
          _.MultiplyEqual(a);
        }
        _.AdditionEqual(e);
      } else {
        _.FromUeVector(t);
      }
      t.FromUeVector(_);
    }
    BulletPool_1.BulletPool.RecycleVector(_);
  }
  lVo(t) {
    var e = this.BulletInfo;
    var l = this.BulletInfo.BulletDataMain.Aimed;
    var o = Global_1.Global.CharacterCameraManager;
    var i = BulletPool_1.BulletPool.CreateVector();
    var _ = BulletPool_1.BulletPool.CreateVector();
    var r = BulletPool_1.BulletPool.CreateVector();
    var a = BulletPool_1.BulletPool.CreateVector();
    i.FromUeVector(o.D_GetCameraLocation());
    _.FromUeVector(o.GetActorForwardVector());
    _.MultiplyEqual(l.DistLimit);
    _.AdditionEqual(i);
    e.MoveInfo.AimedLineTraceElement ||= BulletTraceElementPool_1.BulletTraceElementPool.GetTraceLineElement(ModelManager_1.ModelManager.BulletModel.ObjectTypeTakeAim, e.AttackerId, e.CollisionInfo.IgnoreQueries);
    var l = e.MoveInfo.AimedLineTraceElement;
    TraceElementCommon_1.TraceElementCommon.SetStartLocation(l, i);
    TraceElementCommon_1.TraceElementCommon.SetEndLocation(l, _);
    var s = TraceElementCommon_1.TraceElementCommon.LineTrace(l, PROFILE_AIMED_TOWARD);
    let u = -1;
    if (s) {
      var n = l.HitResult;
      var h = n.GetHitCount();
      var B = BulletPool_1.BulletPool.CreateVector();
      var c = BulletPool_1.BulletPool.CreateVector();
      c.FromUeVector(o.GetActorForwardVector());
      var v = n.ItemArray;
      for (let t = 0; t < h; t++) {
        if (BulletConstant_1.BulletConstant.OpenMoveLog && Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Bullet", 20, "BulletAimedToward", ["ActorLabel", GlobalData_1.GlobalData.IsPlayInEditor ? n.Actors.Get(t)?.ActorLabel : n.Actors.Get(t)?.GetName()]);
        }
        var m = UE.KuroCollisionLibrary.GetCollisionProfileName(n.Components.Get(t), v.Get(t));
        if (!BulletConstant_1.BulletConstant.ProfileNameWater.op_Equality(m)) {
          TraceElementCommon_1.TraceElementCommon.GetHitLocation(n, t, r);
          B.FromUeVector(r);
          B.SubtractionEqual(e.GetActorLocation());
          B.Normalize();
          if (Vector_1.Vector.DotProduct(c, B) > 0) {
            m = n.Actors?.Get(t);
            if (m?.IsValid()) {
              m = ActorUtils_1.ActorUtils.GetEntityByActor(m, false)?.Entity?.GetComponent(1);
              if (!m || BulletUtil_1.BulletUtil.AttackedCondition(e, m)) {
                u = t;
                break;
              }
            }
          }
        }
      }
      BulletPool_1.BulletPool.RecycleVector(B);
      BulletPool_1.BulletPool.RecycleVector(c);
    }
    if (BulletConstant_1.BulletConstant.OpenMoveLog) {
      UE.KismetSystemLibrary.D_DrawDebugSphere(GlobalData_1.GlobalData.World, (u < 0 ? _ : r).ToUeVector(), 10, 10, ColorUtils_1.ColorUtils.LinearGreen, 10);
    }
    a.FromUeVector(e.GetActorLocation());
    s = u < 0 ? _ : r;
    a.SubtractionEqual(s);
    a.MultiplyEqual(-1);
    l = UE.KismetMathLibrary.FindLookAtRotation(e.GetActorLocation().ToUeVectorOld(), s.ToUeVectorOld());
    o = e.AttackerActorComp?.ActorForwardProxy;
    if (o) {
      o.Normalize(MathCommon_1.MathCommon.KindaSmallNumber);
    }
    a.Normalize(MathCommon_1.MathCommon.KindaSmallNumber);
    t.FromUeRotator(l);
    BulletPool_1.BulletPool.RecycleVector(i);
    BulletPool_1.BulletPool.RecycleVector(_);
    BulletPool_1.BulletPool.RecycleVector(r);
    BulletPool_1.BulletPool.RecycleVector(a);
  }
  aVo() {
    var t;
    var e;
    var l;
    var o;
    var i;
    var _ = this.Pe.Aimed;
    var r = this.Pe.Move;
    if (!_.AimedCtrlDir && r.FollowType !== 3 && r.Trajectory !== 5 && r.Trajectory !== 4) {
      t = (_ = this.BulletInfo).MoveInfo;
      e = this.Pe.Base;
      this.TVo(t.BeginSpeedRotator);
      l = BulletPool_1.BulletPool.CreateRotator();
      if (!r.InitVelocityRot.IsNearlyZero()) {
        l.FromUeRotator(t.BeginSpeedRotator);
        MathUtils_1.MathUtils.ComposeRotator(r.InitVelocityRot, l, t.BeginSpeedRotator);
      }
      if (o = _.BulletInitParams.BeginRotatorOffset) {
        (i = BulletPool_1.BulletPool.CreateRotator()).FromUeRotator(o);
        l.FromUeRotator(t.BeginSpeedRotator);
        MathUtils_1.MathUtils.ComposeRotator(i, l, t.BeginSpeedRotator);
        BulletPool_1.BulletPool.RecycleRotator(i);
      }
      if (e.StickGround && !e.IgnoreGradient) {
        BulletPool_1.BulletPool.RecycleRotator(l);
      } else {
        if (!e.Rotator.IsNearlyZero()) {
          _.IsCollisionRelativeRotationModify = true;
        }
        if (!r.InitVelocityDirRandom.IsZero()) {
          this.LVo(t.BeginSpeedRotator, r.InitVelocityDirRandom);
        }
        BulletUtil_1.BulletUtil.ClampBeginRotator(_);
        _.SetActorRotation(t.BeginSpeedRotator);
        BulletPool_1.BulletPool.RecycleRotator(l);
        if (BulletConstant_1.BulletConstant.OpenMoveLog && Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Bullet", 20, "BulletActionInitMove OnStartSpeedRotator", ["Rot", _.GetActorRotation()], ...BulletLog_1.BulletLog.ToPairs(_));
        }
      }
    }
  }
  LVo(t, e) {
    var l;
    var o;
    if (e.X > 0) {
      o = BulletPool_1.BulletPool.CreateVector();
      if (this.BulletInfo.BulletInitParams.FromRemote) {
        o.FromUeVector(this.BulletInfo.RandomInitSpeedOffset);
      } else {
        l = UE.KismetMathLibrary.RandomUnitVectorInConeInDegrees(Vector_1.Vector.ForwardVector, e.X);
        o.FromUeVector(l);
        this.BulletInfo.RandomInitSpeedOffset.FromUeVector(o);
      }
      t.Quaternion().RotateVector(o, o);
      MathUtils_1.MathUtils.VectorToRotator(o, t);
      BulletPool_1.BulletPool.RecycleVector(o);
    } else if (e.Y > 0 || e.Z > 0) {
      l = BulletPool_1.BulletPool.CreateRotator();
      if (this.BulletInfo?.BulletInitParams.FromRemote) {
        l.Set(this.BulletInfo.RandomInitSpeedOffset.Y, this.BulletInfo.RandomInitSpeedOffset.Z, 0);
      } else {
        o = this.HY(e.Y);
        e = this.HY(e.Z);
        l.Set(o, e, 0);
        this.BulletInfo.RandomInitSpeedOffset.Set(0, o, e);
      }
      (o = BulletPool_1.BulletPool.CreateRotator()).FromUeRotator(t);
      MathUtils_1.MathUtils.ComposeRotator(l, o, t);
      BulletPool_1.BulletPool.RecycleRotator(l);
      BulletPool_1.BulletPool.RecycleRotator(o);
    }
  }
  TVo(t) {
    let e = undefined;
    var l = this.BulletInfo;
    var o = l.MoveInfo;
    var i = this.Pe.Move;
    var _ = i.InitVelocityDirParam;
    switch (i.InitVelocityDirStandard) {
      case 0:
        if (FNameUtil_1.FNameUtil.IsEmpty(i.BoneName) || i.FollowType === 0) {
          t.FromUeRotator(l.AttackerActorComp.ActorRotationProxy);
          return;
        }
        o.SocketTransform.GetRotation().Rotator(t);
        var r = i.FollowSkeletonRotLimit;
        var a = l.GetActorRotation();
        if (r.X >= 1) {
          t.Roll = a.Roll;
        }
        if (r.Y >= 1) {
          t.Pitch = a.Pitch;
        }
        if (r.Z >= 1) {
          t.Yaw = l.AttackerActorComp.ActorRotationProxy.Yaw;
        }
        return;
      case 3:
        a = l.TransformCreate.Rotator();
        if (Rotator_1.Rotator.ZeroRotatorProxy.Equals2(a)) {
          break;
        }
        t.FromUeRotator(a);
        return;
      case 2:
        r = l.AttackerActorComp;
        if (r) {
          e = r.GetSocketLocation(FNameUtil_1.FNameUtil.GetDynamicFName(_));
          t.FromUeRotator(l.AttackerMoveComp?.IsStandardGravity ?? true ? BulletUtil_1.BulletUtil.FindLookAtRotDoubleStandard(l.GetActorLocation(), e, i.InitVelocityKeepUp) : BulletUtil_1.BulletUtil.FindLookAtRotDouble(l.GetActorLocation(), e, i.InitVelocityKeepUp, l.AttackerMoveComp?.GravityUp.ToUeVector() ?? Vector_1.Vector.UpVectorDouble));
          return;
        }
        break;
      case 1:
        if (e = BulletUtil_1.BulletUtil.GetTargetLocation(l.TargetActorComp, StringUtils_1.StringUtils.IsNothing(_) ? l.SkillBoneName : FNameUtil_1.FNameUtil.GetDynamicFName(_), l)) {
          t.FromUeRotator(l.AttackerMoveComp?.IsStandardGravity ?? true ? BulletUtil_1.BulletUtil.FindLookAtRotDoubleStandard(l.GetActorLocation(), e, i.InitVelocityKeepUp) : BulletUtil_1.BulletUtil.FindLookAtRotDouble(l.GetActorLocation(), e, i.InitVelocityKeepUp, l.AttackerMoveComp?.GravityUp.ToUeVector() ?? Vector_1.Vector.UpVectorDouble));
          return;
        } else {
          t.FromUeRotator(l.AttackerActorComp.ActorRotationProxy);
          return;
        }
      case 4:
        t.FromUeRotator(l.GetActorRotation());
        return;
      case 5:
      case 8:
      case 9:
      case 11:
      case 6:
      case 10:
        a = l.GetBaseVelocityTarget();
        if (a?.Valid) {
          e = a.GetSocketLocation(FNameUtil_1.FNameUtil.GetDynamicFName(_));
          t.FromUeRotator(l.AttackerMoveComp?.IsStandardGravity ?? true ? BulletUtil_1.BulletUtil.FindLookAtRotDoubleStandard(l.GetActorLocation(), e, i.InitVelocityKeepUp) : BulletUtil_1.BulletUtil.FindLookAtRotDouble(l.GetActorLocation(), e, i.InitVelocityKeepUp, l.AttackerMoveComp?.GravityUp.ToUeVector() ?? Vector_1.Vector.UpVectorDouble));
          return;
        } else {
          t.FromUeRotator(l.AttackerActorComp.ActorRotationProxy);
          return;
        }
      case 12:
        r = l.GetBaseVelocityTarget();
        if (r?.Valid) {
          t.FromUeRotator(r.ActorRotationProxy);
          return;
        } else {
          t.FromUeRotator(l.AttackerActorComp.ActorRotationProxy);
          return;
        }
      case 7:
        a = BulletUtil_1.BulletUtil.GetCurrentRole(this.BulletInfo);
        if (a?.Valid) {
          e = a.GetSocketLocation(FNameUtil_1.FNameUtil.GetDynamicFName(_));
          t.FromUeRotator(l.AttackerMoveComp?.IsStandardGravity ?? true ? BulletUtil_1.BulletUtil.FindLookAtRotDoubleStandard(l.GetActorLocation(), e, i.InitVelocityKeepUp) : BulletUtil_1.BulletUtil.FindLookAtRotDouble(l.GetActorLocation(), e, i.InitVelocityKeepUp, l.AttackerMoveComp?.GravityUp.ToUeVector() ?? Vector_1.Vector.UpVectorDouble));
          return;
        } else {
          t.FromUeRotator(l.AttackerActorComp.ActorRotationProxy);
          return;
        }
      case 13:
        if (l.TransformCreate) {
          t.FromUeRotator(l.TransformCreate.Rotator());
          return;
        }
        break;
      case 14:
        r = l.GetBaseVelocityTarget();
        if (r?.Valid) {
          t.FromUeRotator(r.ActorRotation);
          return;
        }
    }
    t.FromUeRotator(Rotator_1.Rotator.ZeroRotatorProxy);
  }
  uVo() {
    var e = this.BulletInfo;
    var l = e.MoveInfo;
    var o = e.BulletDataMain.Move;
    if (o.Trajectory === 3) {
      var i = o.TrackParams;
      var _ = i.length;
      var r = i[0];
      var i = _ > 1 ? i[1] : undefined;
      var a = BulletPool_1.BulletPool.CreateVector();
      let t = 0;
      const s = e.AttackerMoveComp?.IsStandardGravity ?? true;
      if (o.TrackTarget === 0 || o.TrackTarget === 10) {
        var o = BulletUtil_1.BulletUtil.GetCurrentRole(e);
        if (!o) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Bullet", 20, "围绕中心旋转子弹获取不到当前玩家控制的角色", ["Id", e.BulletRowName], ["Attacker", e.AttackerActorComp.Owner?.GetName()]);
          }
          BulletController_1.BulletController.DestroyBullet(e.BulletEntityId, false);
          BulletPool_1.BulletPool.RecycleVector(a);
          return;
        }
        l.RoundCenter.FromUeVector(e.InitPosition);
        if (i) {
          BulletUtil_1.BulletUtil.AroundBulletAxisAndBeginVector(r, i, l.RoundOnceAxis, a, o, s ? undefined : e.AttackerMoveComp.GravityUp);
        } else {
          t = o.ActorRotation.Yaw;
          a.FromUeVector(Vector_1.Vector.ForwardVectorProxy);
        }
      } else if (e.Target?.Valid) {
        o = e.TargetActorComp;
        this.DVo(o);
        if (i) {
          BulletUtil_1.BulletUtil.AroundBulletAxisAndBeginVector(r, i, l.RoundOnceAxis, a, o, s ? undefined : e.AttackerMoveComp.GravityUp);
        } else {
          t = o.ActorRotation.Yaw;
          a.FromUeVector(o.ActorForward);
        }
      } else {
        l.RoundCenter.FromUeVector(e.InitPosition);
        if (i) {
          BulletUtil_1.BulletUtil.AroundBulletAxisAndBeginVector(r, i, l.RoundOnceAxis, a, undefined, s ? undefined : e.AttackerMoveComp.GravityUp);
        } else {
          a.FromUeVector(Vector_1.Vector.ForwardVectorProxy);
        }
      }
      o = BulletPool_1.BulletPool.CreateVector();
      if (_ > 1) {
        a.RotateAngleAxis(r.Y, l.RoundOnceAxis, o);
        o.MultiplyEqual(r.X);
        o.AdditionEqual(l.RoundCenter);
        e.SetActorLocation(o);
      } else {
        const s = e.AttackerMoveComp?.IsStandardGravity ?? true;
        if (s) {
          a.RotateAngleAxis(r.Y, Vector_1.Vector.UpVectorProxy, o);
          i = r.Z * MathCommon_1.MathCommon.DegToRad;
          o.Z = -Math.sin((t + r.Y) * MathCommon_1.MathCommon.DegToRad) * Math.tan(i);
          o.Normalize();
          o.MultiplyEqual(r.X);
          o.AdditionEqual(l.RoundCenter);
          e.SetActorLocation(o);
          l.RoundOnceAxis.Set(0, Math.sin(i), Math.cos(i));
        } else {
          _ = e.AttackerMoveComp.GravityUp;
          a.RotateAngleAxis(r.Y, _, o);
          o.Normalize();
          o.MultiplyEqual(r.X);
          o.AdditionEqual(l.RoundCenter);
          e.SetActorLocation(o);
          i = BulletPool_1.BulletPool.CreateVector();
          Vector_1.Vector.CrossProduct(_, Vector_1.Vector.ForwardVectorProxy, i);
          Vector_1.Vector.Lerp(_, i, MathUtils_1.MathUtils.Clamp(r.Z, 0, 90) / 90, l.RoundOnceAxis);
          BulletPool_1.BulletPool.RecycleVector(i);
        }
      }
      l.AroundAngle = r.Y;
      BulletPool_1.BulletPool.RecycleVector(a);
      BulletPool_1.BulletPool.RecycleVector(o);
    }
  }
  DVo(t) {
    var e = this.BulletInfo;
    var l = e.MoveInfo;
    e.ClearCacheLocationAndRotation();
    e.ActorComponent.SetActorTransform(t.ActorTransform);
    l.RoundCenter.FromUeVector(t.ActorTransform.TransformPosition(e.BornLocationOffset.ToUeVector()));
    l.RoundCenterLastLocation.FromUeVector(t.ActorLocation);
  }
  cVo() {
    var _ = this.Pe.Move;
    var r = _.Trajectory;
    var a = r === 4;
    if (a || r === 5) {
      r = _.TrackParams;
      if (r && !(r.length < 2)) {
        var s = this.BulletInfo;
        var u = s.MoveInfo;
        let e = 0;
        let l = false;
        let t = 0;
        let o = undefined;
        let i = 0;
        if (a) {
          n = r[2];
          o = r[3];
          i = r[0].X;
          if (n) {
            e = n.X;
            l = n.Z > 0;
            t = n.Y;
          }
        } else {
          n = r[1];
          o = r[2];
          if (n) {
            e = n.Y;
          }
          i = o ? o.Y : r[0].X;
        }
        u.GravityMoveRotator.Reset();
        var n = s.AttackerActorComp;
        var h = s.Target?.Valid ? s.TargetActorComp : undefined;
        var B = BulletPool_1.BulletPool.CreateVector();
        var c = FNameUtil_1.FNameUtil.GetDynamicFName(_.TrackTargetBlackboardKey);
        var c = BulletUtil_1.BulletUtil.GetTargetLocation(h, FNameUtil_1.FNameUtil.IsNothing(c) ? s.SkillBoneName : c, s);
        var v = s.AttackerMoveComp?.GravityUp ?? Vector_1.Vector.UpVectorProxy;
        if (c) {
          if (h?.Valid && (0, RegisterComponent_1.isComponentInstance)(h, 3)) {
            B.FromUeVector(c);
            let t = 0;
            if (e !== 0) {
              t = h.Actor.CapsuleComponent.CapsuleHalfHeight * e;
            }
            if (l && (m = h.Entity?.GetComponent(187))) {
              t -= m.GetHeightAboveGround();
            }
            var m = s.Target?.GetComponent(46);
            var M = BulletPool_1.BulletPool.CreateVector();
            M.FromUeVector(m?.GravityUp ?? Vector_1.Vector.UpVectorProxy);
            M.MultiplyEqual(t);
            B.AdditionEqual(M);
            BulletPool_1.BulletPool.RecycleVector(M);
          } else {
            B.FromUeVector(c);
          }
          var P = BulletPool_1.BulletPool.CreateVector();
          switch (_.DestOffsetForward) {
            case 0:
              P.FromUeVector(s.AttackerActorComp.ActorForwardProxy);
              break;
            case 2:
              var U = BulletPool_1.BulletPool.CreateVector();
              B.Subtraction(s.AttackerActorComp.ActorLocationProxy, U);
              U.Normalize();
              Vector_1.Vector.VectorPlaneProject(U, v, P);
              BulletPool_1.BulletPool.RecycleVector(U);
              P.Normalize();
              break;
            case 1:
              P.FromUeVector(h.ActorForwardProxy);
          }
          var m = BulletPool_1.BulletPool.CreateVector(true);
          var M = _.DestOffset.X;
          var c = _.DestOffset.Y;
          var C = _.DestOffset.Z;
          if (c !== 0) {
            f = BulletPool_1.BulletPool.CreateVector();
            Vector_1.Vector.CrossProduct(v, P, f);
            f.MultiplyEqual(c);
            m.AdditionEqual(f);
            BulletPool_1.BulletPool.RecycleVector(f);
          }
          if (M !== 0) {
            P.MultiplyEqual(M);
            m.AdditionEqual(P);
          }
          if (C !== 0) {
            (c = BulletPool_1.BulletPool.CreateVector()).FromUeVector(v);
            c.MultiplyEqual(C);
            m.AdditionEqual(c);
            BulletPool_1.BulletPool.RecycleVector(c);
          }
          B.AdditionEqual(m);
          BulletPool_1.BulletPool.RecycleVector(m);
          BulletPool_1.BulletPool.RecycleVector(P);
        } else {
          B.FromUeVector(n.ActorForwardProxy);
          B.MultiplyEqual(i);
          B.AdditionEqual(n.ActorLocationProxy);
        }
        var f = BulletPool_1.BulletPool.CreateVector();
        B.Subtraction(s.GetActorLocation(), f);
        f.Normalize();
        var M = u.GravityMoveRotator;
        Vector_1.Vector.VectorPlaneProject(f, v, s.MoveInfo.GravityMoveForward);
        MathUtils_1.MathUtils.LookRotationUpFirst(s.MoveInfo.GravityMoveForward, v, M);
        BulletPool_1.BulletPool.RecycleVector(f);
        var C = r[0];
        if (a) {
          m = (c = r[1]).Z > 0 ? c.Z : 1;
          u.Gravity = C.Z !== 0 ? C.Z : DEFAULT_GRAVITY;
          n = BulletPool_1.BulletPool.CreateVector();
          B.Subtraction(s.GetActorLocation(), n);
          f = Vector_1.Vector.DotProduct(n, s.MoveInfo.GravityMoveForward);
          f += t;
          f = Math.max(f, C.X);
          f = Math.min(f, C.Y);
          u.BulletSpeed2D = f / m;
          BulletPool_1.BulletPool.RecycleVector(n);
          a = Vector_1.Vector.DotProduct(n, v);
          a = Math.max(a, c.X);
          a = Math.min(a, c.Y);
          u.BulletSpeedZ = a / m - u.Gravity * 0.5 * m;
          u.BulletSpeed = Math.sqrt(Math.pow(u.BulletSpeed2D, 2) + Math.pow(u.BulletSpeedZ, 2));
        } else {
          f = r[1].X;
          u.Gravity = C.Z !== 0 ? C.Z : DEFAULT_GRAVITY;
          n = BulletPool_1.BulletPool.CreateVector();
          B.Subtraction(s.GetActorLocation(), n);
          c = Vector_1.Vector.DotProduct(n, s.MoveInfo.GravityMoveForward);
          a = Vector_1.Vector.DotProduct(n, v);
          BulletPool_1.BulletPool.RecycleVector(n);
          u.BulletSpeed2D = Math.sqrt(Math.abs(c * c * u.Gravity / (a * 2 - Math.tan(f * MathCommon_1.MathCommon.DegToRad) * 2 * c)));
          u.BulletSpeedZ = Math.tan(f * MathCommon_1.MathCommon.DegToRad) * u.BulletSpeed2D;
          u.BulletSpeed = Math.sqrt(Math.pow(u.BulletSpeed2D, 2) + Math.pow(u.BulletSpeedZ, 2));
          u.BulletSpeed = Math.max(C.X, u.BulletSpeed);
          u.BulletSpeed = Math.min(C.Y, u.BulletSpeed);
          u.BulletSpeedZ = Math.sin(f * MathCommon_1.MathCommon.DegToRad) * u.BulletSpeed;
          u.BulletSpeed2D = Math.cos(f * MathCommon_1.MathCommon.DegToRad) * u.BulletSpeed;
        }
        if (!_.InitVelocityRot.IsNearlyZero()) {
          (m = BulletPool_1.BulletPool.CreateRotator()).FromUeRotator(M);
          MathUtils_1.MathUtils.ComposeRotator(_.InitVelocityRot, m, M);
          BulletPool_1.BulletPool.RecycleRotator(m);
        }
        if (!!o && (o.X === 1 || o.X === 2)) {
          s.SetActorRotation(M);
          u.ActorRotateParabola = o.X === 2;
        }
        BulletPool_1.BulletPool.RecycleVector(B);
      }
    }
  }
  v3c() {
    var r = this.Pe.Move;
    var a = r.Trajectory;
    var s = a === 4;
    if (s || a === 5) {
      a = r.TrackParams;
      if (a && !(a.length < 2)) {
        var u = this.BulletInfo;
        var n = u.MoveInfo;
        let t = 0;
        let e = false;
        let l = 0;
        let o = undefined;
        let i = 0;
        if (s) {
          h = a[2];
          o = a[3];
          i = a[0].X;
          if (h) {
            t = h.X;
            e = h.Z > 0;
            l = h.Y;
          }
        } else {
          h = a[1];
          o = a[2];
          if ((i = o ? o.Y : i) <= 0) {
            i = a[0].X;
          }
          if (h) {
            t = h.Y;
          }
        }
        n.GravityMoveRotator.Reset();
        var h = u.AttackerActorComp;
        var B = u.Target?.Valid ? u.TargetActorComp : undefined;
        var c = BulletPool_1.BulletPool.CreateVector();
        var v = FNameUtil_1.FNameUtil.GetDynamicFName(r.TrackTargetBlackboardKey);
        var v = BulletUtil_1.BulletUtil.GetTargetLocation(B, FNameUtil_1.FNameUtil.IsNothing(v) ? u.SkillBoneName : v, u);
        if (v) {
          if (B?.Valid && (0, RegisterComponent_1.isComponentInstance)(B, 3)) {
            c.FromUeVector(v);
            if (t !== 0) {
              c.Z += B.Actor.CapsuleComponent.CapsuleHalfHeight * t;
            }
            if (e && (m = B.Entity?.GetComponent(187))) {
              c.Z -= m.GetHeightAboveGround();
            }
          } else {
            c.FromUeVector(v);
          }
          var m = BulletPool_1.BulletPool.CreateVector(true);
          const C = BulletPool_1.BulletPool.CreateVector();
          switch (r.DestOffsetForward) {
            case 0:
              C.FromUeVector(u.AttackerActorComp.ActorForwardProxy);
              break;
            case 2:
              c.Subtraction(u.AttackerActorComp.ActorLocationProxy, C);
              C.Z = 0;
              C.Normalize();
              break;
            case 1:
              C.FromUeVector(B.ActorForwardProxy);
          }
          var v = r.DestOffset.X;
          var M = r.DestOffset.Y;
          var P = r.DestOffset.Z;
          if (M !== 0) {
            U = BulletPool_1.BulletPool.CreateVector();
            Vector_1.Vector.CrossProduct(Vector_1.Vector.UpVectorProxy, C, U);
            U.MultiplyEqual(M);
            m.AdditionEqual(U);
            BulletPool_1.BulletPool.RecycleVector(U);
          }
          if (v !== 0) {
            C.MultiplyEqual(v);
            m.AdditionEqual(C);
          }
          if (P !== 0) {
            (M = BulletPool_1.BulletPool.CreateVector()).FromUeVector(Vector_1.Vector.UpVectorProxy);
            M.MultiplyEqual(P);
            m.AdditionEqual(M);
            BulletPool_1.BulletPool.RecycleVector(M);
          }
          c.AdditionEqual(m);
          BulletPool_1.BulletPool.RecycleVector(m);
          BulletPool_1.BulletPool.RecycleVector(C);
        } else {
          c.FromUeVector(h.ActorForwardProxy);
          c.MultiplyEqual(i);
          c.AdditionEqual(h.ActorLocationProxy);
        }
        let _ = 0;
        var U = a[0];
        if (s) {
          P = (v = a[1]).Z > 0 ? v.Z : 1;
          n.Gravity = U.Z !== 0 ? U.Z : DEFAULT_GRAVITY;
          M = Vector_1.Vector.Dist2D(c, u.GetActorLocation());
          M += l;
          M = Math.max(M, U.X);
          M = Math.min(M, U.Y);
          n.BulletSpeed2D = M / P;
          m = c.Z - u.GetActorLocation().Z;
          m = Math.max(m, v.X);
          m = Math.min(m, v.Y);
          n.BulletSpeedZ = m / P - n.Gravity * 0.5 * P;
          n.BulletSpeed = Math.sqrt(Math.pow(n.BulletSpeed2D, 2) + Math.pow(n.BulletSpeedZ, 2));
          _ = Math.atan(n.BulletSpeedZ / n.BulletSpeed2D) * MathCommon_1.MathCommon.RadToDeg;
        } else {
          _ = a[1].X;
          n.Gravity = U.Z !== 0 ? U.Z : DEFAULT_GRAVITY;
          h = Vector_1.Vector.Dist2D(c, u.GetActorLocation());
          s = c.Z - u.GetActorLocation().Z;
          n.BulletSpeed2D = Math.sqrt(Math.abs(h * h * n.Gravity / (s * 2 - Math.tan(_ * MathCommon_1.MathCommon.DegToRad) * 2 * h)));
          n.BulletSpeedZ = Math.tan(_ * MathCommon_1.MathCommon.DegToRad) * n.BulletSpeed2D;
          n.BulletSpeed = Math.sqrt(Math.pow(n.BulletSpeed2D, 2) + Math.pow(n.BulletSpeedZ, 2));
          n.BulletSpeed = Math.max(U.X, n.BulletSpeed);
          n.BulletSpeed = Math.min(U.Y, n.BulletSpeed);
          n.BulletSpeedZ = Math.sin(_ * MathCommon_1.MathCommon.DegToRad) * n.BulletSpeed;
          n.BulletSpeed2D = Math.cos(_ * MathCommon_1.MathCommon.DegToRad) * n.BulletSpeed;
        }
        var M = n.GravityMoveRotator;
        const C = BulletPool_1.BulletPool.CreateVector();
        c.Subtraction(u.GetActorLocation(), C);
        C.Normalize();
        MathUtils_1.MathUtils.LookRotationUpFirst(C, Vector_1.Vector.UpVectorProxy, M);
        BulletPool_1.BulletPool.RecycleVector(C);
        M.Pitch = _;
        if (!r.InitVelocityRot.IsNearlyZero()) {
          (v = BulletPool_1.BulletPool.CreateRotator()).FromUeRotator(M);
          MathUtils_1.MathUtils.ComposeRotator(r.InitVelocityRot, v, M);
          BulletPool_1.BulletPool.RecycleRotator(v);
        }
        if (!!o && (o.X === 1 || o.X === 2)) {
          u.SetActorRotation(M);
          n.ActorRotateParabola = o.X === 2;
        }
        BulletPool_1.BulletPool.RecycleVector(c);
      }
    }
  }
  mVo() {
    var t = this.BulletInfo;
    var e = t.MoveInfo;
    var l = t.AttackerMoveComp;
    var o = this.Pe.Move;
    var i = o.FollowType;
    if (i === 0 || i === 3) {
      t.ActorComponent.NeedDetach = true;
    }
    if (l?.HasBaseMovement && !this.Pe.Base.NotFollowMovePlatform) {
      if (o.Speed === 0) {
        if (!t.ActorComponent.NeedDetach) {
          t.ApplyCacheLocationAndRotation();
          if ((i = t.AttackerActorComp?.Owner)?.IsA(UE.BaseCharacter.StaticClass())) {
            t.ActorComponent.SetAttachToComponent(i.BasedMovement.MovementBase, FNameUtil_1.FNameUtil.NONE, 1, 1, 1, false);
            t.ActorComponent.NeedDetach = true;
          }
        }
      } else {
        e.IsOnBaseMovement = true;
        if (o = l.DeltaBaseMovementSpeed) {
          e.LastBaseMovementSpeed.FromUeVector(o);
        }
      }
    }
  }
  _Vo() {
    var o = this.BulletInfo;
    var i = this.Pe.Base;
    if (i.StickGround) {
      var _ = BulletPool_1.BulletPool.CreateVector();
      var e = BulletPool_1.BulletPool.CreateVector();
      BulletMoveInfo_1.BulletMoveInfo.StickGroundLineTrace ||= BulletTraceElementPool_1.BulletTraceElementPool.NewTraceElementByTraceChannel(UE.TraceLineElement.StaticClass(), QueryTypeDefine_1.KuroTraceTypeQuery.IkGround);
      if (Info_1.Info.IsBuildDevelopmentOrDebug && (r = (a = ModelManager_1.ModelManager.BulletModel.ShowBulletTrace(this.BulletInfo.Attacker.Id)) ? 2 : 0, BulletMoveInfo_1.BulletMoveInfo.StickGroundLineTrace.SetDrawDebugTrace(r), a)) {
        TraceElementCommon_1.TraceElementCommon.SetTraceColor(BulletMoveInfo_1.BulletMoveInfo.StickGroundLineTrace, ColorUtils_1.ColorUtils.LinearGreen);
        TraceElementCommon_1.TraceElementCommon.SetTraceHitColor(BulletMoveInfo_1.BulletMoveInfo.StickGroundLineTrace, ColorUtils_1.ColorUtils.LinearRed);
      }
      var r = BulletMoveInfo_1.BulletMoveInfo.StickGroundLineTrace;
      var a = o.BaseTransformEntity?.Entity?.GetComponent(3);
      e.FromUeVector(o.GetActorLocation());
      var s = a?.Valid && !this.tVo && (0, RegisterComponent_1.isComponentInstance)(a, 3);
      var u = BulletPool_1.BulletPool.CreateVector();
      var n = o.AttackerMoveComp?.GravityUp ?? Vector_1.Vector.UpVectorProxy;
      var h = BulletPool_1.BulletPool.CreateVector();
      if (s) {
        u.FromUeVector(a.GetSocketLocation(o.SkillBoneName));
      } else {
        n.Multiply(DEFAULT_UP_DISTANCE, h);
        e.AdditionEqual(h);
        u.FromUeVector(o.GetActorLocation());
      }
      var s = e.X;
      var B = e.Y;
      var c = e.Z;
      r.SetStartLocation(s, B, c);
      n.Multiply(i.StickTraceLen + DEFAULT_UP_DISTANCE, h);
      e.SubtractionEqual(h);
      var v = e.X;
      var m = e.Y;
      var M = e.Z;
      BulletPool_1.BulletPool.RecycleVector(e);
      r.SetEndLocation(v, m, M);
      var e = TraceElementCommon_1.TraceElementCommon.LineTrace(r, PROFILE_STICK_GROUND);
      const d = r.HitResult;
      let t = false;
      let l = Number.MAX_VALUE;
      var P = BulletPool_1.BulletPool.CreateVector();
      if (e) {
        var U = d.GetHitCount();
        if (U > 0) {
          TraceElementCommon_1.TraceElementCommon.GetHitLocation(d, 0, P);
          l = Vector_1.Vector.DistSquared(P, u);
          let e = 0;
          t = true;
          for (let t = 1; t < U; t++) {
            TraceElementCommon_1.TraceElementCommon.GetHitLocation(d, t, P);
            var C = Vector_1.Vector.DistSquared(P, u);
            if (l > C) {
              l = C;
              e = t;
            }
          }
          TraceElementCommon_1.TraceElementCommon.GetHitLocation(d, e, _);
          o.SetActorLocation(_);
          if (!i.IgnoreGradient) {
            TraceElementCommon_1.TraceElementCommon.GetImpactNormal(d, e, _);
          }
        }
      }
      if (i.StickWater) {
        BulletMoveInfo_1.BulletMoveInfo.StickWaterLineTrace ||= BulletTraceElementPool_1.BulletTraceElementPool.NewTraceElementByTraceChannel(UE.TraceLineElement.StaticClass(), QueryTypeDefine_1.KuroTraceTypeQuery.Water);
        r = BulletMoveInfo_1.BulletMoveInfo.StickWaterLineTrace;
        r.SetStartLocation(s, B, c);
        r.SetEndLocation(v, m, M);
        e = TraceElementCommon_1.TraceElementCommon.LineTrace(r, PROFILE_STICK_WATER);
        if (e) {
          const d = r.HitResult;
          var f = d.GetHitCount();
          if (f > 0) {
            let e = -1;
            t = true;
            for (let t = 0; t < f; t++) {
              TraceElementCommon_1.TraceElementCommon.GetHitLocation(d, t, P);
              var E = Vector_1.Vector.DistSquared(P, u);
              if (l > E) {
                l = E;
                e = t;
              }
            }
            if (e > -1) {
              TraceElementCommon_1.TraceElementCommon.GetHitLocation(d, e, _);
              o.SetActorLocation(_);
              if (!i.IgnoreGradient) {
                TraceElementCommon_1.TraceElementCommon.GetImpactNormal(d, e, _);
              }
            }
          }
        }
      }
      BulletPool_1.BulletPool.RecycleVector(u);
      BulletPool_1.BulletPool.RecycleVector(P);
      if (t) {
        if (i.IgnoreGradient) {
          _.FromUeVector(n);
        }
      } else {
        h.FromUeVector(n);
        (a?.Valid ? (h.MultiplyEqual(a.ScaledHalfHeight), a.ActorLocationProxy) : (h.MultiplyEqual(o.Size.Z), o.GetActorLocation())).Subtraction(h, _);
        o.SetActorLocation(_);
        _.FromUeVector(n);
      }
      if (!i.IgnoreGradient) {
        s = BulletPool_1.BulletPool.CreateRotator();
        MathUtils_1.MathUtils.LookRotationUpFirst(Vector_1.Vector.ForwardVectorProxy, _, s);
        o.SetActorRotation(s);
        if (o.AttackerActorComp.ActorRotationProxy.Yaw !== 0) {
          s.Set(0, o.AttackerActorComp.ActorRotationProxy.Yaw, 0);
          o.AddBulletLocalRotator(s.ToUeRotator());
        }
        BulletPool_1.BulletPool.RecycleRotator(s);
      }
      BulletPool_1.BulletPool.RecycleVector(h);
      BulletPool_1.BulletPool.RecycleVector(_);
    }
  }
  p3c() {
    var i = this.BulletInfo;
    var _ = this.Pe.Base;
    if (_.StickGround) {
      var r = BulletPool_1.BulletPool.CreateVector();
      var e = BulletPool_1.BulletPool.CreateVector();
      BulletMoveInfo_1.BulletMoveInfo.StickGroundLineTrace ||= BulletTraceElementPool_1.BulletTraceElementPool.NewTraceElementByTraceChannel(UE.TraceLineElement.StaticClass(), QueryTypeDefine_1.KuroTraceTypeQuery.IkGround);
      if (Info_1.Info.IsBuildDevelopmentOrDebug && (a = (s = ModelManager_1.ModelManager.BulletModel.ShowBulletTrace(this.BulletInfo.Attacker.Id)) ? 2 : 0, BulletMoveInfo_1.BulletMoveInfo.StickGroundLineTrace.SetDrawDebugTrace(a), s)) {
        TraceElementCommon_1.TraceElementCommon.SetTraceColor(BulletMoveInfo_1.BulletMoveInfo.StickGroundLineTrace, ColorUtils_1.ColorUtils.LinearGreen);
        TraceElementCommon_1.TraceElementCommon.SetTraceHitColor(BulletMoveInfo_1.BulletMoveInfo.StickGroundLineTrace, ColorUtils_1.ColorUtils.LinearRed);
      }
      var a = BulletMoveInfo_1.BulletMoveInfo.StickGroundLineTrace;
      var s = i.BaseTransformEntity?.Entity?.GetComponent(3);
      e.FromUeVector(i.GetActorLocation());
      var u = s?.Valid && !this.tVo && (0, RegisterComponent_1.isComponentInstance)(s, 3);
      let l = 0;
      l = (u ? s.GetSocketLocation(i.SkillBoneName) : (e.Z += DEFAULT_UP_DISTANCE, i.GetActorLocation())).Z;
      var u = e.X;
      var n = e.Y;
      var h = e.Z;
      a.SetStartLocation(u, n, h);
      e.Z -= _.StickTraceLen + DEFAULT_UP_DISTANCE;
      var B = e.X;
      var c = e.Y;
      var v = e.Z;
      a.SetEndLocation(B, c, v);
      var m = TraceElementCommon_1.TraceElementCommon.LineTrace(a, PROFILE_STICK_GROUND);
      const f = a.HitResult;
      let t = false;
      let o = Number.MAX_VALUE;
      if (m) {
        var M = f.GetHitCount();
        if (M > 0) {
          o = Math.abs(f.LocationZ_Array.Get(0) - l);
          let e = 0;
          t = true;
          for (let t = 1; t < M; t++) {
            var P = f.LocationZ_Array.Get(t);
            var P = Math.abs(P - l);
            if (o > P) {
              o = P;
              e = t;
            }
          }
          TraceElementCommon_1.TraceElementCommon.GetHitLocation(f, e, r);
          i.SetActorLocation(r);
          if (!_.IgnoreGradient) {
            TraceElementCommon_1.TraceElementCommon.GetImpactNormal(f, e, r);
          }
        }
      }
      if (_.StickWater) {
        BulletMoveInfo_1.BulletMoveInfo.StickWaterLineTrace ||= BulletTraceElementPool_1.BulletTraceElementPool.NewTraceElementByTraceChannel(UE.TraceLineElement.StaticClass(), QueryTypeDefine_1.KuroTraceTypeQuery.Water);
        a = BulletMoveInfo_1.BulletMoveInfo.StickWaterLineTrace;
        a.SetStartLocation(u, n, h);
        a.SetEndLocation(B, c, v);
        m = TraceElementCommon_1.TraceElementCommon.LineTrace(a, PROFILE_STICK_WATER);
        if (m) {
          const f = a.HitResult;
          var U = f.GetHitCount();
          if (U > 0) {
            let e = -1;
            t = true;
            for (let t = 0; t < U; t++) {
              var C = f.LocationZ_Array.Get(t);
              var C = Math.abs(C - l);
              if (o > C) {
                o = C;
                e = t;
              }
            }
            if (e > -1) {
              TraceElementCommon_1.TraceElementCommon.GetHitLocation(f, e, r);
              i.SetActorLocation(r);
              if (!_.IgnoreGradient) {
                TraceElementCommon_1.TraceElementCommon.GetImpactNormal(f, e, r);
              }
            }
          }
        }
      }
      if (t) {
        if (_.IgnoreGradient) {
          r.FromUeVector(Vector_1.Vector.UpVectorProxy);
        }
      } else {
        if (s?.Valid) {
          r.FromUeVector(s.ActorLocationProxy);
          r.Z -= s.ScaledHalfHeight;
        } else {
          r.FromUeVector(i.GetActorLocation());
          r.Z -= i.Size.Z;
        }
        i.SetActorLocation(r);
        r.FromUeVector(Vector_1.Vector.UpVectorProxy);
      }
      u = BulletPool_1.BulletPool.CreateRotator();
      if (!_.IgnoreGradient) {
        MathUtils_1.MathUtils.LookRotationUpFirst(Vector_1.Vector.ForwardVectorProxy, r, u);
        i.SetActorRotation(u);
        if (i.AttackerActorComp.ActorRotationProxy.Yaw !== 0) {
          u.Set(0, i.AttackerActorComp.ActorRotationProxy.Yaw, 0);
          i.AddBulletLocalRotator(u.ToUeRotator());
        }
      }
      BulletPool_1.BulletPool.RecycleVector(r);
      BulletPool_1.BulletPool.RecycleVector(e);
      BulletPool_1.BulletPool.RecycleRotator(u);
    }
  }
  HY(t) {
    if (t === 0) {
      return 0;
    } else {
      return Math.random() * t;
    }
  }
}
(exports.BulletActionInitMove = BulletActionInitMove).nVo = Stats_1.Stat.Create("BulletInitMoveBase");
BulletActionInitMove.hVo = Stats_1.Stat.Create("BulletInitMoveSpecial"); //# sourceMappingURL=BulletActionInitMove.js.map