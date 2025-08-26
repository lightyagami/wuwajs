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
    var _ = this.BulletInfo.MoveInfo;
    _.BulletSpeedRatio = 1;
    var i = this.BulletInfo.AttackerSkillComp;
    if (this.BulletInfo.TargetActorComp?.Valid && i?.Valid && (this.BulletInfo.BulletInitParams.CreateSource === 1 || i.CurrentSkill) && i.SkillTargetSocket) {
      this.BulletInfo.SkillBoneName = FNameUtil_1.FNameUtil.GetDynamicFName(i.SkillTargetSocket);
    }
    _.BulletSpeed = l.Speed;
    _.ObstaclesOffset.FromUeVector(o.Center);
    BulletActionInitMove.nVo.Start();
    this.sVo();
    this.aVo();
    BulletActionInitMove.nVo.Stop();
    BulletActionInitMove.hVo.Start();
    var i = e.Base;
    var o = e.Aimed;
    if (!i.StickGround && o.AimedCtrlDir) {
      if (t.FromRemote) {
        _.BeginSpeedRotator.FromUeRotator(t.InitialTransform.Rotator());
      } else {
        this.lVo(_.BeginSpeedRotator);
      }
      this.BulletInfo.SetActorRotation(_.BeginSpeedRotator.ToUeRotator());
    }
    var i = this.BulletInfo.AttackerMoveComp?.IsStandardGravity ?? true;
    if (i) {
      this.p3c();
    } else {
      this._Vo();
    }
    this.uVo();
    if (i) {
      this.v3c();
    } else {
      this.cVo();
    }
    this.mVo();
    if (l.TrackParams.length > 0) {
      const e = l.TrackParams[0];
      _.MinFollowHeight = e.Y;
      _.SpeedFollowTarget = e.X;
      if (e.Z > 0) {
        _.FollowTargetBottom = false;
      }
    }
    BulletActionInitMove.hVo.Stop();
    _.LastFramePosition.FromUeVector(this.BulletInfo.GetActorLocation());
    _.FollowBoneBulletRotator.FromUeRotator(this.BulletInfo.GetActorRotation());
    this.BulletInfo.ApplyCacheLocationAndRotation();
  }
  oVo(t, e) {
    if (e !== StringUtils_1.NONE_STRING) {
      var l = t.Actor.K2_GetComponentsByClass(UE.SkeletalMeshComponent.StaticClass());
      var o = l ? l.Num() : 0;
      for (let t = 0; t < o; t++) {
        var _ = l.Get(t);
        if (_?.IsValid() && _.GetName() === e) {
          return _;
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
        this.gVo(t.BaseTransformEntity?.Entity?.GetComponent(1));
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
  gVo(t) {
    var e = BulletMoveInfo_1.BulletMoveInfo.TempTransform1;
    this.SVo(t, e);
    this.MVo(e);
    if ((0, RegisterComponent_1.isComponentInstance)(t, 3)) {
      this.dVo(t);
    }
  }
  fVo(t, e = false) {
    var l = BulletMoveInfo_1.BulletMoveInfo.TempTransform1;
    var t = t?.Entity?.GetComponent(1);
    if ((0, RegisterComponent_1.isComponentInstance)(t, 3)) {
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
    var _;
    if (this.Pe.Move.FollowType === 4) {
      this.yVo(t);
    } else {
      e = BulletMoveInfo_1.BulletMoveInfo.TempTransform1;
      o = t.BulletInitParams;
      _ = this.Pe.Base;
      l = BulletPool_1.BulletPool.CreateVector();
      e.FromUeTransform(o.InitialTransform);
      l.FromUeVector(e.GetLocation());
      if (l.Equals(Vector_1.Vector.ZeroVectorProxy)) {
        this.MVo(e);
      } else {
        if (!t.BulletInitParams.FromRemote) {
          o = _.BornPositionRandom;
          _ = BulletPool_1.BulletPool.CreateVector(true);
          if (!o.Equals(Vector_1.Vector.ZeroVectorProxy)) {
            _.X = this.HY(o.X);
            _.Y = this.HY(o.Y);
            _.Z = this.HY(o.Z);
          }
          if (!t.BornLocationOffset.Equals(Vector_1.Vector.ZeroVectorProxy)) {
            _.AdditionEqual(t.BornLocationOffset);
          }
          if (!_.Equals(Vector_1.Vector.ZeroVectorProxy)) {
            e.TransformPosition(_, l);
          }
          BulletPool_1.BulletPool.RecycleVector(_);
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
    var _ = this.Pe.Move;
    var i = o.BornPositionRandom;
    var r = e.AttackerActorComp;
    var a = BulletPool_1.BulletPool.CreateVector();
    if (i.Equality(Vector_1.Vector.ZeroVectorProxy)) {
      a.FromUeVector(e.BornLocationOffset);
    } else {
      if (e.BulletInitParams.FromRemote) {
        a.FromUeVector(e.RandomPosOffset);
      } else {
        a.X = this.HY(i.X);
        a.Y = this.HY(i.Y);
        a.Z = this.HY(i.Z);
        e.RandomPosOffset.FromUeVector(a);
      }
      a.AdditionEqual(e.BornLocationOffset);
    }
    var i = BulletPool_1.BulletPool.CreateVector();
    var s = BulletPool_1.BulletPool.CreateVector();
    if (FNameUtil_1.FNameUtil.IsNothing(_.BoneName) || !this.iVo) {
      if (o.BornPositionStandard === 0) {
        a.Z -= r.ScaledHalfHeight;
      }
      (t || ((o = BulletMoveInfo_1.BulletMoveInfo.TempTransform1).SetRotation(r.ActorQuatProxy), o.SetLocation(r.ActorLocationProxy), o.SetScale3D(r.ActorScaleProxy), o)).TransformPosition(a, i);
    } else {
      l.SocketTransform.FromUeTransform(this.iVo.D_GetSocketTransform(_.BoneName, 0));
      i.FromUeVector(l.SocketTransform.GetLocation());
      r.ActorQuatProxy.RotateVector(a, s);
      i.AdditionEqual(s);
    }
    e.SetActorLocation(i);
    e.InitPosition.FromUeVector(i);
    BulletPool_1.BulletPool.RecycleVector(a);
    BulletPool_1.BulletPool.RecycleVector(i);
    BulletPool_1.BulletPool.RecycleVector(s);
  }
  SVo(t, e, l = false) {
    var o = this.BulletInfo;
    var _ = o.AttackerActorComp;
    if (t?.Valid) {
      e.FromUeTransform(t.GetSocketTransform(o.SkillBoneName));
      (t = BulletPool_1.BulletPool.CreateVector()).FromUeVector(e.GetLocation());
      this.IVo(t);
      e.SetLocation(t);
      BulletPool_1.BulletPool.RecycleVector(t);
    } else {
      if (l && Log_1.Log.CheckError()) {
        Log_1.Log.Error("Bullet", 20, "出生位置需要完全基于目标, 但是目标不存在", ["子弹ID", o.BulletRowName]);
      }
      e.Reset();
      (t = BulletPool_1.BulletPool.CreateVector()).FromUeVector(_.ActorLocation);
      this.IVo(t);
      e.SetLocation(t);
      BulletPool_1.BulletPool.RecycleVector(t);
    }
    if (!l) {
      e.SetRotation(_.ActorQuat);
    }
  }
  IVo(t) {
    var e;
    var l;
    var o = this.BulletInfo;
    var _ = this.BulletInfo.BulletDataMain.Base;
    this.tVo = false;
    var i = BulletPool_1.BulletPool.CreateVector();
    i.FromUeVector(_.BornDistLimit);
    var _ = i.Y;
    var r = i.X;
    var a = i.Z;
    if (!i.IsZero()) {
      e = o.AttackerActorComp.ActorLocationProxy;
      i.FromUeVector(t);
      if (_ < (l = Vector_1.Vector.Dist(i, e))) {
        i.SubtractionEqual(e);
        i.Normalize();
        i.MultiplyEqual(_);
        i.AdditionEqual(e);
        this.tVo = true;
      } else if (l <= r) {
        this.tVo = true;
        if (o.TargetActorComp?.Valid) {
          i.SubtractionEqual(e);
          i.Normalize();
          i.MultiplyEqual(r);
        } else {
          i.FromUeVector(o.AttackerActorComp.ActorForward);
          i.MultiplyEqual(a);
        }
        i.AdditionEqual(e);
      } else {
        i.FromUeVector(t);
      }
      t.FromUeVector(i);
    }
    BulletPool_1.BulletPool.RecycleVector(i);
  }
  lVo(t) {
    var e = this.BulletInfo;
    var l = this.BulletInfo.BulletDataMain.Aimed;
    var o = Global_1.Global.CharacterCameraManager;
    var _ = BulletPool_1.BulletPool.CreateVector();
    var i = BulletPool_1.BulletPool.CreateVector();
    var r = BulletPool_1.BulletPool.CreateVector();
    var a = BulletPool_1.BulletPool.CreateVector();
    _.FromUeVector(o.D_GetCameraLocation());
    i.FromUeVector(o.GetActorForwardVector());
    i.MultiplyEqual(l.DistLimit);
    i.AdditionEqual(_);
    e.MoveInfo.AimedLineTraceElement ||= BulletTraceElementPool_1.BulletTraceElementPool.GetTraceLineElement(ModelManager_1.ModelManager.BulletModel.ObjectTypeTakeAim, e.AttackerId, e.CollisionInfo.IgnoreQueries);
    var l = e.MoveInfo.AimedLineTraceElement;
    TraceElementCommon_1.TraceElementCommon.SetStartLocation(l, _);
    TraceElementCommon_1.TraceElementCommon.SetEndLocation(l, i);
    var s = TraceElementCommon_1.TraceElementCommon.LineTrace(l, PROFILE_AIMED_TOWARD);
    let n = -1;
    if (s) {
      var u = l.HitResult;
      var h = u.GetHitCount();
      var B = BulletPool_1.BulletPool.CreateVector();
      var c = BulletPool_1.BulletPool.CreateVector();
      c.FromUeVector(o.GetActorForwardVector());
      for (let t = 0; t < h; t++) {
        if (BulletConstant_1.BulletConstant.OpenMoveLog && Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Bullet", 20, "BulletAimedToward", ["ActorLabel", GlobalData_1.GlobalData.IsPlayInEditor ? u.Actors.Get(t)?.ActorLabel : u.Actors.Get(t)?.GetName()]);
        }
        var m = u.Components.Get(t).GetCollisionProfileName();
        if (!BulletConstant_1.BulletConstant.ProfileNameWater.op_Equality(m)) {
          TraceElementCommon_1.TraceElementCommon.GetHitLocation(u, t, r);
          B.FromUeVector(r);
          B.SubtractionEqual(e.GetActorLocation());
          B.Normalize();
          if (Vector_1.Vector.DotProduct(c, B) > 0) {
            m = u.Actors?.Get(t);
            if (m?.IsValid()) {
              m = ActorUtils_1.ActorUtils.GetEntityByActor(m, false)?.Entity?.GetComponent(3);
              if (!m || BulletUtil_1.BulletUtil.AttackedCondition(e, m)) {
                n = t;
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
      UE.KismetSystemLibrary.D_DrawDebugSphere(GlobalData_1.GlobalData.World, (n < 0 ? i : r).ToUeVector(), 10, 10, ColorUtils_1.ColorUtils.LinearGreen, 10);
    }
    a.FromUeVector(e.GetActorLocation());
    s = n < 0 ? i : r;
    a.SubtractionEqual(s);
    a.MultiplyEqual(-1);
    l = UE.KismetMathLibrary.FindLookAtRotation(e.GetActorLocation().ToUeVectorOld(), s.ToUeVectorOld());
    o = e.AttackerActorComp?.ActorForwardProxy;
    if (o) {
      o.Normalize(MathCommon_1.MathCommon.KindaSmallNumber);
    }
    a.Normalize(MathCommon_1.MathCommon.KindaSmallNumber);
    t.FromUeRotator(l);
    BulletPool_1.BulletPool.RecycleVector(_);
    BulletPool_1.BulletPool.RecycleVector(i);
    BulletPool_1.BulletPool.RecycleVector(r);
    BulletPool_1.BulletPool.RecycleVector(a);
  }
  aVo() {
    var t;
    var e;
    var l;
    var o;
    var _;
    var i = this.Pe.Aimed;
    var r = this.Pe.Move;
    if (!i.AimedCtrlDir && r.FollowType !== 3 && r.Trajectory !== 5 && r.Trajectory !== 4) {
      t = (i = this.BulletInfo).MoveInfo;
      e = this.Pe.Base;
      this.TVo(t.BeginSpeedRotator);
      l = BulletPool_1.BulletPool.CreateRotator();
      if (!r.InitVelocityRot.IsNearlyZero()) {
        l.FromUeRotator(t.BeginSpeedRotator);
        MathUtils_1.MathUtils.ComposeRotator(r.InitVelocityRot, l, t.BeginSpeedRotator);
      }
      if (o = i.BulletInitParams.BeginRotatorOffset) {
        (_ = BulletPool_1.BulletPool.CreateRotator()).FromUeRotator(o);
        l.FromUeRotator(t.BeginSpeedRotator);
        MathUtils_1.MathUtils.ComposeRotator(_, l, t.BeginSpeedRotator);
        BulletPool_1.BulletPool.RecycleRotator(_);
      }
      if (e.StickGround && !e.IgnoreGradient) {
        BulletPool_1.BulletPool.RecycleRotator(l);
      } else {
        if (!e.Rotator.IsNearlyZero()) {
          i.IsCollisionRelativeRotationModify = true;
        }
        if (!r.InitVelocityDirRandom.IsZero()) {
          this.LVo(t.BeginSpeedRotator, r.InitVelocityDirRandom);
        }
        BulletUtil_1.BulletUtil.ClampBeginRotator(i);
        i.SetActorRotation(t.BeginSpeedRotator);
        BulletPool_1.BulletPool.RecycleRotator(l);
        if (BulletConstant_1.BulletConstant.OpenMoveLog && Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Bullet", 20, "BulletActionInitMove OnStartSpeedRotator", ["Rot", i.GetActorRotation()], ...BulletLog_1.BulletLog.ToPairs(i));
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
    var _ = this.Pe.Move;
    var i = _.InitVelocityDirParam;
    switch (_.InitVelocityDirStandard) {
      case 0:
        if (FNameUtil_1.FNameUtil.IsEmpty(_.BoneName) || _.FollowType === 0) {
          t.FromUeRotator(l.AttackerActorComp.ActorRotationProxy);
          return;
        }
        o.SocketTransform.GetRotation().Rotator(t);
        var r = _.FollowSkeletonRotLimit;
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
          e = i !== StringUtils_1.NONE_STRING ? r.Actor.Mesh.D_GetSocketLocation(FNameUtil_1.FNameUtil.GetDynamicFName(i)) : r.ActorLocation;
          t.FromUeRotator(l.AttackerMoveComp?.IsStandardGravity ?? true ? BulletUtil_1.BulletUtil.FindLookAtRotDoubleStandard(l.GetActorLocation(), e, _.InitVelocityKeepUp) : BulletUtil_1.BulletUtil.FindLookAtRotDouble(l.GetActorLocation(), e, _.InitVelocityKeepUp, l.AttackerMoveComp?.GravityUp.ToUeVector() ?? Vector_1.Vector.UpVectorDouble));
          return;
        }
        break;
      case 1:
        if (e = BulletUtil_1.BulletUtil.GetTargetLocation(l.TargetActorComp, StringUtils_1.StringUtils.IsNothing(i) ? l.SkillBoneName : FNameUtil_1.FNameUtil.GetDynamicFName(i), l)) {
          t.FromUeRotator(l.AttackerMoveComp?.IsStandardGravity ?? true ? BulletUtil_1.BulletUtil.FindLookAtRotDoubleStandard(l.GetActorLocation(), e, _.InitVelocityKeepUp) : BulletUtil_1.BulletUtil.FindLookAtRotDouble(l.GetActorLocation(), e, _.InitVelocityKeepUp, l.AttackerMoveComp?.GravityUp.ToUeVector() ?? Vector_1.Vector.UpVectorDouble));
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
          e = a.GetSocketLocation(FNameUtil_1.FNameUtil.GetDynamicFName(i));
          t.FromUeRotator(l.AttackerMoveComp?.IsStandardGravity ?? true ? BulletUtil_1.BulletUtil.FindLookAtRotDoubleStandard(l.GetActorLocation(), e, _.InitVelocityKeepUp) : BulletUtil_1.BulletUtil.FindLookAtRotDouble(l.GetActorLocation(), e, _.InitVelocityKeepUp, l.AttackerMoveComp?.GravityUp.ToUeVector() ?? Vector_1.Vector.UpVectorDouble));
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
          e = a.GetSocketLocation(FNameUtil_1.FNameUtil.GetDynamicFName(i));
          t.FromUeRotator(l.AttackerMoveComp?.IsStandardGravity ?? true ? BulletUtil_1.BulletUtil.FindLookAtRotDoubleStandard(l.GetActorLocation(), e, _.InitVelocityKeepUp) : BulletUtil_1.BulletUtil.FindLookAtRotDouble(l.GetActorLocation(), e, _.InitVelocityKeepUp, l.AttackerMoveComp?.GravityUp.ToUeVector() ?? Vector_1.Vector.UpVectorDouble));
          return;
        } else {
          t.FromUeRotator(l.AttackerActorComp.ActorRotationProxy);
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
      var _ = o.TrackParams;
      var i = _.length;
      var r = _[0];
      var _ = i > 1 ? _[1] : undefined;
      var a = BulletPool_1.BulletPool.CreateVector();
      let t = 0;
      const s = e.AttackerMoveComp?.IsStandardGravity ?? true;
      if (o.TrackTarget === 0 || o.TrackTarget === 10) {
        o = BulletUtil_1.BulletUtil.GetCurrentRole(e);
        if (!o) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Bullet", 20, "围绕中心旋转子弹获取不到当前玩家控制的角色", ["Id", e.BulletRowName], ["Attacker", e.AttackerActorComp.Actor.GetName()]);
          }
          BulletController_1.BulletController.DestroyBullet(e.BulletEntityId, false);
          BulletPool_1.BulletPool.RecycleVector(a);
          return;
        }
        l.RoundCenter.FromUeVector(e.InitPosition);
        if (_) {
          BulletUtil_1.BulletUtil.AroundBulletAxisAndBeginVector(r, _, l.RoundOnceAxis, a, o, s ? undefined : e.AttackerMoveComp.GravityUp);
        } else {
          t = o.ActorRotation.Yaw;
          a.FromUeVector(Vector_1.Vector.ForwardVectorProxy);
        }
      } else {
        o = e.TargetActorComp;
        if (o?.Valid) {
          this.DVo(o);
          if (_) {
            BulletUtil_1.BulletUtil.AroundBulletAxisAndBeginVector(r, _, l.RoundOnceAxis, a, o, s ? undefined : e.AttackerMoveComp.GravityUp);
          } else {
            t = o.ActorRotation.Yaw;
            a.FromUeVector(o.ActorForward);
          }
        } else {
          l.RoundCenter.FromUeVector(e.InitPosition);
          if (_) {
            BulletUtil_1.BulletUtil.AroundBulletAxisAndBeginVector(r, _, l.RoundOnceAxis, a, undefined, s ? undefined : e.AttackerMoveComp.GravityUp);
          } else {
            a.FromUeVector(Vector_1.Vector.ForwardVectorProxy);
          }
        }
      }
      o = BulletPool_1.BulletPool.CreateVector();
      if (i > 1) {
        a.RotateAngleAxis(r.Y, l.RoundOnceAxis, o);
        o.MultiplyEqual(r.X);
        o.AdditionEqual(l.RoundCenter);
        e.SetActorLocation(o);
      } else {
        const s = e.AttackerMoveComp?.IsStandardGravity ?? true;
        if (s) {
          a.RotateAngleAxis(r.Y, Vector_1.Vector.UpVectorProxy, o);
          _ = r.Z * MathCommon_1.MathCommon.DegToRad;
          o.Z = -Math.sin((t + r.Y) * MathCommon_1.MathCommon.DegToRad) * Math.tan(_);
          o.Normalize();
          o.MultiplyEqual(r.X);
          o.AdditionEqual(l.RoundCenter);
          e.SetActorLocation(o);
          l.RoundOnceAxis.Set(0, Math.sin(_), Math.cos(_));
        } else {
          i = e.AttackerMoveComp.GravityUp;
          a.RotateAngleAxis(r.Y, i, o);
          o.Normalize();
          o.MultiplyEqual(r.X);
          o.AdditionEqual(l.RoundCenter);
          e.SetActorLocation(o);
          _ = BulletPool_1.BulletPool.CreateVector();
          Vector_1.Vector.CrossProduct(i, Vector_1.Vector.ForwardVectorProxy, _);
          Vector_1.Vector.Lerp(i, _, MathUtils_1.MathUtils.Clamp(r.Z, 0, 90) / 90, l.RoundOnceAxis);
          BulletPool_1.BulletPool.RecycleVector(_);
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
    var i = _.Trajectory;
    var r = i === 4;
    if (r || i === 5) {
      i = _.TrackParams;
      if (i && !(i.length < 2)) {
        var a = this.BulletInfo;
        var s = a.MoveInfo;
        let e = 0;
        let l = false;
        let t = 0;
        let o = undefined;
        if (r) {
          n = i[2];
          o = i[3];
          if (n) {
            e = n.X;
            l = n.Z > 0;
            t = n.Y;
          }
        } else {
          n = i[1];
          o = i[2];
          if (n) {
            e = n.Y;
          }
        }
        s.GravityMoveRotator.Reset();
        var n = a.Attacker?.GetComponent(3);
        var u = a.TargetActorComp;
        var h = BulletPool_1.BulletPool.CreateVector();
        var B = FNameUtil_1.FNameUtil.GetDynamicFName(_.TrackTargetBlackboardKey);
        var B = BulletUtil_1.BulletUtil.GetTargetLocation(u, FNameUtil_1.FNameUtil.IsNothing(B) ? a.SkillBoneName : B, a);
        var c = a.AttackerMoveComp?.GravityUp ?? Vector_1.Vector.UpVectorProxy;
        if (B) {
          if (u?.Valid && (0, RegisterComponent_1.isComponentInstance)(u, 3)) {
            h.FromUeVector(B);
            let t = 0;
            if (e !== 0) {
              t = u.Actor.CapsuleComponent.CapsuleHalfHeight * e;
            }
            if (l && (m = u.Entity?.GetComponent(179))) {
              t -= m.GetHeightAboveGround();
            }
            var m = a.Target?.GetComponent(45);
            var v = BulletPool_1.BulletPool.CreateVector();
            v.FromUeVector(m?.GravityUp ?? Vector_1.Vector.UpVectorProxy);
            v.MultiplyEqual(t);
            h.AdditionEqual(v);
            BulletPool_1.BulletPool.RecycleVector(v);
          } else {
            h.FromUeVector(B);
          }
          var M = BulletPool_1.BulletPool.CreateVector();
          switch (_.DestOffsetForward) {
            case 0:
              M.FromUeVector(a.AttackerActorComp.ActorForwardProxy);
              break;
            case 2:
              var P = BulletPool_1.BulletPool.CreateVector();
              h.Subtraction(a.AttackerActorComp.ActorLocationProxy, P);
              P.Normalize();
              Vector_1.Vector.VectorPlaneProject(P, c, M);
              BulletPool_1.BulletPool.RecycleVector(P);
              M.Normalize();
              break;
            case 1:
              M.FromUeVector(u.ActorForwardProxy);
          }
          var m = BulletPool_1.BulletPool.CreateVector(true);
          var v = _.DestOffset.X;
          var B = _.DestOffset.Y;
          var U = _.DestOffset.Z;
          if (B !== 0) {
            C = BulletPool_1.BulletPool.CreateVector();
            Vector_1.Vector.CrossProduct(c, M, C);
            C.MultiplyEqual(B);
            m.AdditionEqual(C);
            BulletPool_1.BulletPool.RecycleVector(C);
          }
          if (v !== 0) {
            M.MultiplyEqual(v);
            m.AdditionEqual(M);
          }
          if (U !== 0) {
            (B = BulletPool_1.BulletPool.CreateVector()).FromUeVector(c);
            B.MultiplyEqual(U);
            m.AdditionEqual(B);
            BulletPool_1.BulletPool.RecycleVector(B);
          }
          h.AdditionEqual(m);
          BulletPool_1.BulletPool.RecycleVector(m);
          BulletPool_1.BulletPool.RecycleVector(M);
        } else {
          h.FromUeVector(n.ActorForwardProxy);
          h.MultiplyEqual(i[0].X);
          h.AdditionEqual(n.ActorLocationProxy);
        }
        var C = BulletPool_1.BulletPool.CreateVector();
        h.Subtraction(a.GetActorLocation(), C);
        C.Normalize();
        var v = s.GravityMoveRotator;
        Vector_1.Vector.VectorPlaneProject(C, c, a.MoveInfo.GravityMoveForward);
        MathUtils_1.MathUtils.LookRotationUpFirst(a.MoveInfo.GravityMoveForward, c, v);
        BulletPool_1.BulletPool.RecycleVector(C);
        var U = i[0];
        if (r) {
          m = (B = i[1]).Z > 0 ? B.Z : 1;
          s.Gravity = U.Z !== 0 ? U.Z : DEFAULT_GRAVITY;
          n = BulletPool_1.BulletPool.CreateVector();
          h.Subtraction(a.GetActorLocation(), n);
          C = Vector_1.Vector.DotProduct(n, a.MoveInfo.GravityMoveForward);
          C += t;
          C = Math.max(C, U.X);
          C = Math.min(C, U.Y);
          s.BulletSpeed2D = C / m;
          BulletPool_1.BulletPool.RecycleVector(n);
          r = Vector_1.Vector.DotProduct(n, c);
          r = Math.max(r, B.X);
          r = Math.min(r, B.Y);
          s.BulletSpeedZ = r / m - s.Gravity * 0.5 * m;
          s.BulletSpeed = Math.sqrt(Math.pow(s.BulletSpeed2D, 2) + Math.pow(s.BulletSpeedZ, 2));
        } else {
          C = i[1].X;
          s.Gravity = U.Z !== 0 ? U.Z : DEFAULT_GRAVITY;
          n = BulletPool_1.BulletPool.CreateVector();
          h.Subtraction(a.GetActorLocation(), n);
          B = Vector_1.Vector.DotProduct(n, a.MoveInfo.GravityMoveForward);
          r = Vector_1.Vector.DotProduct(n, c);
          BulletPool_1.BulletPool.RecycleVector(n);
          s.BulletSpeed2D = Math.sqrt(Math.abs(B * B * s.Gravity / (r * 2 - Math.tan(C * MathCommon_1.MathCommon.DegToRad) * 2 * B)));
          s.BulletSpeedZ = Math.tan(C * MathCommon_1.MathCommon.DegToRad) * s.BulletSpeed2D;
          s.BulletSpeed = Math.sqrt(Math.pow(s.BulletSpeed2D, 2) + Math.pow(s.BulletSpeedZ, 2));
          s.BulletSpeed = Math.max(U.X, s.BulletSpeed);
          s.BulletSpeed = Math.min(U.Y, s.BulletSpeed);
          s.BulletSpeedZ = Math.sin(C * MathCommon_1.MathCommon.DegToRad) * s.BulletSpeed;
          s.BulletSpeed2D = Math.cos(C * MathCommon_1.MathCommon.DegToRad) * s.BulletSpeed;
        }
        if (!_.InitVelocityRot.IsNearlyZero()) {
          (m = BulletPool_1.BulletPool.CreateRotator()).FromUeRotator(v);
          MathUtils_1.MathUtils.ComposeRotator(_.InitVelocityRot, m, v);
          BulletPool_1.BulletPool.RecycleRotator(m);
        }
        if (!!o && (o.X === 1 || o.X === 2)) {
          a.SetActorRotation(v);
          s.ActorRotateParabola = o.X === 2;
        }
        BulletPool_1.BulletPool.RecycleVector(h);
      }
    }
  }
  v3c() {
    var i = this.Pe.Move;
    var r = i.Trajectory;
    var a = r === 4;
    if (a || r === 5) {
      r = i.TrackParams;
      if (r && !(r.length < 2)) {
        var s = this.BulletInfo;
        var n = s.MoveInfo;
        let t = 0;
        let e = false;
        let l = 0;
        let o = undefined;
        if (a) {
          u = r[2];
          o = r[3];
          if (u) {
            t = u.X;
            e = u.Z > 0;
            l = u.Y;
          }
        } else {
          u = r[1];
          o = r[2];
          if (u) {
            t = u.Y;
          }
        }
        n.GravityMoveRotator.Reset();
        var u = s.Attacker?.GetComponent(3);
        var h = s.TargetActorComp;
        var B = BulletPool_1.BulletPool.CreateVector();
        var c = FNameUtil_1.FNameUtil.GetDynamicFName(i.TrackTargetBlackboardKey);
        var c = BulletUtil_1.BulletUtil.GetTargetLocation(h, FNameUtil_1.FNameUtil.IsNothing(c) ? s.SkillBoneName : c, s);
        if (c) {
          if (h?.Valid && (0, RegisterComponent_1.isComponentInstance)(h, 3)) {
            B.FromUeVector(c);
            if (t !== 0) {
              B.Z += h.Actor.CapsuleComponent.CapsuleHalfHeight * t;
            }
            if (e && (m = h.Entity?.GetComponent(179))) {
              B.Z -= m.GetHeightAboveGround();
            }
          } else {
            B.FromUeVector(c);
          }
          var m = BulletPool_1.BulletPool.CreateVector(true);
          const U = BulletPool_1.BulletPool.CreateVector();
          switch (i.DestOffsetForward) {
            case 0:
              U.FromUeVector(s.AttackerActorComp.ActorForwardProxy);
              break;
            case 2:
              B.Subtraction(s.AttackerActorComp.ActorLocationProxy, U);
              U.Z = 0;
              U.Normalize();
              break;
            case 1:
              U.FromUeVector(h.ActorForwardProxy);
          }
          var c = i.DestOffset.X;
          var v = i.DestOffset.Y;
          var M = i.DestOffset.Z;
          if (v !== 0) {
            P = BulletPool_1.BulletPool.CreateVector();
            Vector_1.Vector.CrossProduct(Vector_1.Vector.UpVectorProxy, U, P);
            P.MultiplyEqual(v);
            m.AdditionEqual(P);
            BulletPool_1.BulletPool.RecycleVector(P);
          }
          if (c !== 0) {
            U.MultiplyEqual(c);
            m.AdditionEqual(U);
          }
          if (M !== 0) {
            (v = BulletPool_1.BulletPool.CreateVector()).FromUeVector(Vector_1.Vector.UpVectorProxy);
            v.MultiplyEqual(M);
            m.AdditionEqual(v);
            BulletPool_1.BulletPool.RecycleVector(v);
          }
          B.AdditionEqual(m);
          BulletPool_1.BulletPool.RecycleVector(m);
          BulletPool_1.BulletPool.RecycleVector(U);
        } else {
          B.FromUeVector(u.ActorForwardProxy);
          B.MultiplyEqual(r[0].X);
          B.AdditionEqual(u.ActorLocationProxy);
        }
        let _ = 0;
        var P = r[0];
        if (a) {
          M = (c = r[1]).Z > 0 ? c.Z : 1;
          n.Gravity = P.Z !== 0 ? P.Z : DEFAULT_GRAVITY;
          v = Vector_1.Vector.Dist2D(B, s.GetActorLocation());
          v += l;
          v = Math.max(v, P.X);
          v = Math.min(v, P.Y);
          n.BulletSpeed2D = v / M;
          m = B.Z - s.GetActorLocation().Z;
          m = Math.max(m, c.X);
          m = Math.min(m, c.Y);
          n.BulletSpeedZ = m / M - n.Gravity * 0.5 * M;
          n.BulletSpeed = Math.sqrt(Math.pow(n.BulletSpeed2D, 2) + Math.pow(n.BulletSpeedZ, 2));
          _ = Math.atan(n.BulletSpeedZ / n.BulletSpeed2D) * MathCommon_1.MathCommon.RadToDeg;
        } else {
          _ = r[1].X;
          n.Gravity = P.Z !== 0 ? P.Z : DEFAULT_GRAVITY;
          u = Vector_1.Vector.Dist2D(B, s.GetActorLocation());
          a = B.Z - s.GetActorLocation().Z;
          n.BulletSpeed2D = Math.sqrt(Math.abs(u * u * n.Gravity / (a * 2 - Math.tan(_ * MathCommon_1.MathCommon.DegToRad) * 2 * u)));
          n.BulletSpeedZ = Math.tan(_ * MathCommon_1.MathCommon.DegToRad) * n.BulletSpeed2D;
          n.BulletSpeed = Math.sqrt(Math.pow(n.BulletSpeed2D, 2) + Math.pow(n.BulletSpeedZ, 2));
          n.BulletSpeed = Math.max(P.X, n.BulletSpeed);
          n.BulletSpeed = Math.min(P.Y, n.BulletSpeed);
          n.BulletSpeedZ = Math.sin(_ * MathCommon_1.MathCommon.DegToRad) * n.BulletSpeed;
          n.BulletSpeed2D = Math.cos(_ * MathCommon_1.MathCommon.DegToRad) * n.BulletSpeed;
        }
        var v = n.GravityMoveRotator;
        const U = BulletPool_1.BulletPool.CreateVector();
        B.Subtraction(s.GetActorLocation(), U);
        U.Normalize();
        MathUtils_1.MathUtils.LookRotationUpFirst(U, Vector_1.Vector.UpVectorProxy, v);
        BulletPool_1.BulletPool.RecycleVector(U);
        v.Pitch = _;
        if (!i.InitVelocityRot.IsNearlyZero()) {
          (c = BulletPool_1.BulletPool.CreateRotator()).FromUeRotator(v);
          MathUtils_1.MathUtils.ComposeRotator(i.InitVelocityRot, c, v);
          BulletPool_1.BulletPool.RecycleRotator(c);
        }
        if (!!o && (o.X === 1 || o.X === 2)) {
          s.SetActorRotation(v);
          n.ActorRotateParabola = o.X === 2;
        }
        BulletPool_1.BulletPool.RecycleVector(B);
      }
    }
  }
  mVo() {
    var t = this.BulletInfo;
    var e = t.MoveInfo;
    var l = t.AttackerMoveComp;
    var o = this.Pe.Move;
    var _ = o.FollowType;
    if (_ === 0 || _ === 3) {
      t.ActorComponent.NeedDetach = true;
    }
    if (l?.HasBaseMovement && !this.Pe.Base.NotFollowMovePlatform) {
      if (o.Speed === 0) {
        if (!t.ActorComponent.NeedDetach) {
          t.ApplyCacheLocationAndRotation();
          t.ActorComponent.SetAttachToComponent(t.AttackerActorComp.Actor.BasedMovement.MovementBase, FNameUtil_1.FNameUtil.NONE, 1, 1, 1, false);
          t.ActorComponent.NeedDetach = true;
        }
      } else {
        e.IsOnBaseMovement = true;
        if (_ = l.DeltaBaseMovementSpeed) {
          e.LastBaseMovementSpeed.FromUeVector(_);
        }
      }
    }
  }
  _Vo() {
    var o = this.BulletInfo;
    var _ = this.Pe.Base;
    if (_.StickGround) {
      var i = BulletPool_1.BulletPool.CreateVector();
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
      var n = BulletPool_1.BulletPool.CreateVector();
      var u = o.AttackerMoveComp?.GravityUp ?? Vector_1.Vector.UpVectorProxy;
      var h = BulletPool_1.BulletPool.CreateVector();
      if (s) {
        n.FromUeVector(a.GetSocketLocation(o.SkillBoneName));
      } else {
        u.Multiply(DEFAULT_UP_DISTANCE, h);
        e.AdditionEqual(h);
        n.FromUeVector(o.GetActorLocation());
      }
      var s = e.X;
      var B = e.Y;
      var c = e.Z;
      r.SetStartLocation(s, B, c);
      u.Multiply(_.StickTraceLen + DEFAULT_UP_DISTANCE, h);
      e.SubtractionEqual(h);
      var m = e.X;
      var v = e.Y;
      var M = e.Z;
      BulletPool_1.BulletPool.RecycleVector(e);
      r.SetEndLocation(m, v, M);
      var e = TraceElementCommon_1.TraceElementCommon.LineTrace(r, PROFILE_STICK_GROUND);
      const T = r.HitResult;
      let t = false;
      let l = Number.MAX_VALUE;
      var P = BulletPool_1.BulletPool.CreateVector();
      if (e) {
        var U = T.GetHitCount();
        if (U > 0) {
          TraceElementCommon_1.TraceElementCommon.GetHitLocation(T, 0, P);
          l = Vector_1.Vector.DistSquared(P, n);
          let e = 0;
          t = true;
          for (let t = 1; t < U; t++) {
            TraceElementCommon_1.TraceElementCommon.GetHitLocation(T, t, P);
            var C = Vector_1.Vector.DistSquared(P, n);
            if (l > C) {
              l = C;
              e = t;
            }
          }
          TraceElementCommon_1.TraceElementCommon.GetHitLocation(T, e, i);
          o.SetActorLocation(i);
          if (!_.IgnoreGradient) {
            TraceElementCommon_1.TraceElementCommon.GetImpactNormal(T, e, i);
          }
        }
      }
      if (_.StickWater) {
        BulletMoveInfo_1.BulletMoveInfo.StickWaterLineTrace ||= BulletTraceElementPool_1.BulletTraceElementPool.NewTraceElementByTraceChannel(UE.TraceLineElement.StaticClass(), QueryTypeDefine_1.KuroTraceTypeQuery.Water);
        r = BulletMoveInfo_1.BulletMoveInfo.StickWaterLineTrace;
        r.SetStartLocation(s, B, c);
        r.SetEndLocation(m, v, M);
        e = TraceElementCommon_1.TraceElementCommon.LineTrace(r, PROFILE_STICK_WATER);
        if (e) {
          const T = r.HitResult;
          var f = T.GetHitCount();
          if (f > 0) {
            let e = -1;
            t = true;
            for (let t = 0; t < f; t++) {
              TraceElementCommon_1.TraceElementCommon.GetHitLocation(T, t, P);
              var E = Vector_1.Vector.DistSquared(P, n);
              if (l > E) {
                l = E;
                e = t;
              }
            }
            if (e > -1) {
              TraceElementCommon_1.TraceElementCommon.GetHitLocation(T, e, i);
              o.SetActorLocation(i);
              if (!_.IgnoreGradient) {
                TraceElementCommon_1.TraceElementCommon.GetImpactNormal(T, e, i);
              }
            }
          }
        }
      }
      BulletPool_1.BulletPool.RecycleVector(n);
      BulletPool_1.BulletPool.RecycleVector(P);
      if (t) {
        if (_.IgnoreGradient) {
          i.FromUeVector(u);
        }
      } else {
        h.FromUeVector(u);
        (a?.Valid ? (h.MultiplyEqual(a.ScaledHalfHeight), a.ActorLocationProxy) : (h.MultiplyEqual(o.Size.Z), o.GetActorLocation())).Subtraction(h, i);
        o.SetActorLocation(i);
        i.FromUeVector(u);
      }
      if (!_.IgnoreGradient) {
        s = BulletPool_1.BulletPool.CreateRotator();
        MathUtils_1.MathUtils.LookRotationUpFirst(Vector_1.Vector.ForwardVectorProxy, i, s);
        o.SetActorRotation(s);
        if (o.AttackerActorComp.ActorRotationProxy.Yaw !== 0) {
          s.Set(0, o.AttackerActorComp.ActorRotationProxy.Yaw, 0);
          o.AddBulletLocalRotator(s.ToUeRotator());
        }
        BulletPool_1.BulletPool.RecycleRotator(s);
      }
      BulletPool_1.BulletPool.RecycleVector(h);
      BulletPool_1.BulletPool.RecycleVector(i);
    }
  }
  p3c() {
    var _ = this.BulletInfo;
    var i = this.Pe.Base;
    if (i.StickGround) {
      var r = BulletPool_1.BulletPool.CreateVector();
      var e = BulletPool_1.BulletPool.CreateVector();
      BulletMoveInfo_1.BulletMoveInfo.StickGroundLineTrace ||= BulletTraceElementPool_1.BulletTraceElementPool.NewTraceElementByTraceChannel(UE.TraceLineElement.StaticClass(), QueryTypeDefine_1.KuroTraceTypeQuery.IkGround);
      if (Info_1.Info.IsBuildDevelopmentOrDebug && (a = (s = ModelManager_1.ModelManager.BulletModel.ShowBulletTrace(this.BulletInfo.Attacker.Id)) ? 2 : 0, BulletMoveInfo_1.BulletMoveInfo.StickGroundLineTrace.SetDrawDebugTrace(a), s)) {
        TraceElementCommon_1.TraceElementCommon.SetTraceColor(BulletMoveInfo_1.BulletMoveInfo.StickGroundLineTrace, ColorUtils_1.ColorUtils.LinearGreen);
        TraceElementCommon_1.TraceElementCommon.SetTraceHitColor(BulletMoveInfo_1.BulletMoveInfo.StickGroundLineTrace, ColorUtils_1.ColorUtils.LinearRed);
      }
      var a = BulletMoveInfo_1.BulletMoveInfo.StickGroundLineTrace;
      var s = _.BaseTransformEntity?.Entity?.GetComponent(3);
      e.FromUeVector(_.GetActorLocation());
      var n = s?.Valid && !this.tVo && (0, RegisterComponent_1.isComponentInstance)(s, 3);
      let l = 0;
      l = (n ? s.GetSocketLocation(_.SkillBoneName) : (e.Z += DEFAULT_UP_DISTANCE, _.GetActorLocation())).Z;
      var n = e.X;
      var u = e.Y;
      var h = e.Z;
      a.SetStartLocation(n, u, h);
      e.Z -= i.StickTraceLen + DEFAULT_UP_DISTANCE;
      var B = e.X;
      var c = e.Y;
      var m = e.Z;
      a.SetEndLocation(B, c, m);
      var v = TraceElementCommon_1.TraceElementCommon.LineTrace(a, PROFILE_STICK_GROUND);
      const f = a.HitResult;
      let t = false;
      let o = Number.MAX_VALUE;
      if (v) {
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
          _.SetActorLocation(r);
          if (!i.IgnoreGradient) {
            TraceElementCommon_1.TraceElementCommon.GetImpactNormal(f, e, r);
          }
        }
      }
      if (i.StickWater) {
        BulletMoveInfo_1.BulletMoveInfo.StickWaterLineTrace ||= BulletTraceElementPool_1.BulletTraceElementPool.NewTraceElementByTraceChannel(UE.TraceLineElement.StaticClass(), QueryTypeDefine_1.KuroTraceTypeQuery.Water);
        a = BulletMoveInfo_1.BulletMoveInfo.StickWaterLineTrace;
        a.SetStartLocation(n, u, h);
        a.SetEndLocation(B, c, m);
        v = TraceElementCommon_1.TraceElementCommon.LineTrace(a, PROFILE_STICK_WATER);
        if (v) {
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
              _.SetActorLocation(r);
              if (!i.IgnoreGradient) {
                TraceElementCommon_1.TraceElementCommon.GetImpactNormal(f, e, r);
              }
            }
          }
        }
      }
      if (t) {
        if (i.IgnoreGradient) {
          r.FromUeVector(Vector_1.Vector.UpVectorProxy);
        }
      } else {
        if (s?.Valid) {
          r.FromUeVector(s.ActorLocationProxy);
          r.Z -= s.ScaledHalfHeight;
        } else {
          r.FromUeVector(_.GetActorLocation());
          r.Z -= _.Size.Z;
        }
        _.SetActorLocation(r);
        r.FromUeVector(Vector_1.Vector.UpVectorProxy);
      }
      n = BulletPool_1.BulletPool.CreateRotator();
      if (!i.IgnoreGradient) {
        MathUtils_1.MathUtils.LookRotationUpFirst(Vector_1.Vector.ForwardVectorProxy, r, n);
        _.SetActorRotation(n);
        if (_.AttackerActorComp.ActorRotationProxy.Yaw !== 0) {
          n.Set(0, _.AttackerActorComp.ActorRotationProxy.Yaw, 0);
          _.AddBulletLocalRotator(n.ToUeRotator());
        }
      }
      BulletPool_1.BulletPool.RecycleVector(r);
      BulletPool_1.BulletPool.RecycleVector(e);
      BulletPool_1.BulletPool.RecycleRotator(n);
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