"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Log_1 = require("../../Core/Common/Log");
const EntitySystem_1 = require("../../Core/Entity/EntitySystem");
const FNameUtil_1 = require("../../Core/Utils/FNameUtil");
const Quat_1 = require("../../Core/Utils/Math/Quat");
const Rotator_1 = require("../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../Core/Utils/MathUtils");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
const GlobalData_1 = require("../GlobalData");
const ControllerHolder_1 = require("../Manager/ControllerHolder");
const ModelManager_1 = require("../Manager/ModelManager");
const GravityUtils_1 = require("../Utils/GravityUtils");
const INVALID_LAST_LOCATION_THRESHOLD_SQUARED = 4000000;
class PositionBranchTargetParams {
  constructor() {
    this.CharActorComp = undefined;
    this.CharUnifiedComp = undefined;
    this.CharSkillComp = undefined;
    this.TargetBaseActorComp = undefined;
    this.TargetCharActorComp = undefined;
    this.TargetPos = undefined;
    this.NowTime = -0;
    this.TotalTime = -0;
    this.SocketName = "";
    this.LastLocation = Vector_1.Vector.Create();
  }
  RefreshTarget(t, i, s) {
    if (!this.TargetBaseActorComp?.Entity?.Valid) {
      this.TargetBaseActorComp = undefined;
      this.TargetCharActorComp = undefined;
    }
    if (t) {
      switch (i) {
        case 0:
          var h = ControllerHolder_1.ControllerHolder.BlackboardController.GetEntityIdByEntity(this.CharActorComp.Entity.Id, t);
          if (!h) {
            return false;
          }
          h = EntitySystem_1.EntitySystem.Get(h);
          if (!h?.Valid) {
            return false;
          }
          if (this.TargetBaseActorComp?.Entity?.Valid && this.TargetBaseActorComp.Entity.Id === h.Id) {
            return true;
          }
          this.TargetBaseActorComp = h.GetComponent(1);
          this.TargetCharActorComp = h.GetComponent(3);
          this.SocketName = s;
          break;
        case 1:
          h = ControllerHolder_1.ControllerHolder.BlackboardController.GetVectorValueByEntity(this.CharActorComp.Entity.Id, t);
          if (!h) {
            return false;
          }
          this.TargetPos = Vector_1.Vector.Create(h);
          break;
        default:
          return false;
      }
    } else {
      i = this.CharSkillComp?.GetSkillTargetForAns();
      if (!i?.Valid) {
        return false;
      }
      if (this.TargetBaseActorComp?.Entity?.Valid && i.Id === this.TargetBaseActorComp.Entity.Id) {
        return true;
      }
      this.TargetBaseActorComp = i.Entity.GetComponent(1);
      this.TargetCharActorComp = i.Entity.GetComponent(3);
      this.SocketName = this.CharSkillComp.SkillTargetSocket;
    }
    this.LastLocation.DeepCopy(this.CharActorComp.LastActorLocation);
    return true;
  }
  Clear() {
    this.CharActorComp = undefined;
    this.CharUnifiedComp = undefined;
    this.CharSkillComp = undefined;
    this.TargetBaseActorComp = undefined;
    this.TargetCharActorComp = undefined;
    this.TargetPos = undefined;
    this.SocketName = "";
  }
}
const paramPool = new Array();
const paramMap = new Map();
class TsAnimNotifyStatePositionBranchTarget extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments);
    this.MoveCurve = undefined;
    this.Distance = 30;
    this.MaxSpeed = 2000;
    this.是否永远面向目标 = true;
    this.忽略Z轴方向 = true;
    this.永远修正Z轴 = false;
    this.忽略双方半径 = false;
    this.IsShareTarget = false;
    this.TargetOffset = undefined;
    this.TargetRotation = undefined;
    this.MinHeightFromTargetFloor = 0;
    this.允许反向移动 = false;
    this.允许正向移动 = true;
    this.黑板类型 = 0;
    this.黑板值 = "";
    this.黑板目标Socket = "";
    this.最小吸附距离 = -0;
    this.最大吸附距离 = -0;
    this.IsInitialize = false;
    this.TsMoveCurve = undefined;
    this.TsDistance = -0;
    this.TsMaxDistance = -0;
    this.TsMinDistance = -0;
    this.TsMaxSpeed = -0;
    this.TsLookAtTarget = false;
    this.TsIgnoreZ = false;
    this.TsAlwaysMoveZ = false;
    this.TsIgnoreRadius = false;
    this.TsIsShareTarget = false;
    this.TsTargetOffset = Vector_1.Vector.Create();
    this.TsMinHeightFromTargetFloor = 0;
    this.TargetPos = Vector_1.Vector.Create();
    this.TmpVector = Vector_1.Vector.Create();
    this.TmpVector2 = Vector_1.Vector.Create();
    this.TmpRotator = Rotator_1.Rotator.Create();
    this.TmpQuat = Quat_1.Quat.Create();
    this.TsAllowReverseMovement = false;
    this.TsAllowForwardMovement = true;
    this.TsBlackboardKey = "";
    this.TsBlackboardSocket = "";
    this.TsBlackboardType = 0;
  }
  Constructor() {
    this.IsInitialize = false;
    this.TsMoveCurve = undefined;
    this.TsDistance = -0;
    this.TsMaxDistance = -0;
    this.TsMinDistance = -0;
    this.TsMaxSpeed = -0;
    this.TsLookAtTarget = false;
    this.TsIgnoreZ = false;
    this.TsAlwaysMoveZ = false;
    this.TsIgnoreRadius = false;
    this.TsIsShareTarget = false;
    this.TsTargetOffset = Vector_1.Vector.Create();
    this.TsMinHeightFromTargetFloor = 0;
    this.TargetPos = Vector_1.Vector.Create();
    this.TmpVector = Vector_1.Vector.Create();
    this.TmpVector2 = Vector_1.Vector.Create();
    this.TmpRotator = Rotator_1.Rotator.Create();
    this.TmpQuat = Quat_1.Quat.Create();
    this.TsAllowReverseMovement = false;
    this.TsAllowForwardMovement = true;
    this.TsBlackboardKey = "";
    this.TsBlackboardSocket = "";
    this.TsBlackboardType = 0;
  }
  Initialize() {
    if (!this.IsInitialize || !!GlobalData_1.GlobalData.IsPlayInEditor) {
      this.IsInitialize = true;
      this.TsMoveCurve = this.MoveCurve;
      this.TsDistance = this.Distance;
      this.TsMaxDistance = this.最大吸附距离;
      this.TsMinDistance = this.最小吸附距离;
      this.TsMaxSpeed = this.MaxSpeed;
      this.TsLookAtTarget = this.是否永远面向目标;
      this.TsIgnoreZ = this.忽略Z轴方向;
      this.TsAlwaysMoveZ = this.永远修正Z轴;
      this.TsIgnoreRadius = this.忽略双方半径;
      this.TsIsShareTarget = this.IsShareTarget;
      this.TsAllowReverseMovement = this.允许反向移动;
      this.TsAllowForwardMovement = this.允许正向移动;
      this.TsBlackboardKey = this.黑板值;
      this.TsBlackboardType = this.黑板类型;
      this.TsBlackboardSocket = this.黑板目标Socket;
      this.TsTargetOffset = Vector_1.Vector.Create(this.TargetOffset);
      this.TmpRotator = Rotator_1.Rotator.Create(this.TargetRotation);
      this.TmpQuat.Reset();
      this.TmpRotator.Quaternion(this.TmpQuat);
      this.TmpQuat.RotateVector(this.TsTargetOffset, this.TsTargetOffset);
      this.TsMinHeightFromTargetFloor = this.MinHeightFromTargetFloor;
      this.TargetPos.Reset();
      this.TmpVector.Reset();
      this.TmpVector2.Reset();
    }
  }
  K2_NotifyBegin(t, i, s) {
    this.Initialize();
    t = t.GetOwner();
    if (!(t instanceof TsBaseCharacter_1.default)) {
      return false;
    }
    t = t.CharacterActorComponent;
    if (!t) {
      return false;
    }
    var h;
    var r = t.Entity.GetComponent(40);
    let e = undefined;
    if (!(e = this.TsIsShareTarget && (h = t.Entity.GetComponent(0), h = ModelManager_1.ModelManager.CreatureModel.GetEntity(h.GetSummonerId())?.Entity, e = h?.GetComponent(40)) || r)) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Test", 6, "No SkillComponent", ["Actor", t.Actor.GetName()]);
      }
      return false;
    }
    let a = paramMap.get(t.Entity.Id);
    (a = a || (paramPool.length ? paramPool.pop() : new PositionBranchTargetParams())).CharActorComp = t;
    a.CharUnifiedComp = t.Entity.GetComponent(175);
    a.CharSkillComp = e;
    a.NowTime = 0;
    a.TotalTime = s;
    if (a.RefreshTarget(this.TsBlackboardKey, this.TsBlackboardType, this.TsBlackboardSocket)) {
      paramMap.set(t.Entity.Id, a);
    } else if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Movement", 6, "BranchTarget No Target");
    }
    return true;
  }
  K2_NotifyTick(t, i, s) {
    return !(s < MathUtils_1.MathUtils.KindaSmallNumber) && (t = t.GetOwner()) instanceof TsBaseCharacter_1.default && (t = t.CharacterActorComponent, !!(t = paramMap.get(t.Entity.Id))) && (t.RefreshTarget(this.TsBlackboardKey, this.TsBlackboardType, this.TsBlackboardSocket) && (this.MoveToTarget(s, t), t.LastLocation.DeepCopy(t.CharActorComp.ActorLocationProxy)), t.NowTime += s, true);
  }
  K2_NotifyEnd(t, i) {
    var s;
    var t = t.GetOwner();
    return t instanceof TsBaseCharacter_1.default && (t = t.CharacterActorComponent, !!(s = paramMap.get(t.Entity.Id))) && (paramMap.delete(t.Entity.Id), s.Clear(), paramPool.push(s), true);
  }
  GetTargetPos(t, i) {
    var s;
    var h;
    if (t.TargetPos) {
      i.DeepCopy(t.TargetPos);
    } else {
      if (t.SocketName && t.TargetCharActorComp?.Actor) {
        i.FromUeVector(t.TargetCharActorComp.Actor.Mesh.D_GetSocketLocation(FNameUtil_1.FNameUtil.GetDynamicFName(t.SocketName)));
      } else {
        i.DeepCopy(t.TargetBaseActorComp.ActorLocationProxy);
      }
      t.TargetBaseActorComp.ActorQuatProxy.RotateVector(this.TsTargetOffset, this.TmpVector);
      i.AdditionEqual(this.TmpVector);
      if (t.TargetCharActorComp && (s = GravityUtils_1.GravityUtils.GetZnInGravityForActor(t.TargetBaseActorComp, t.TargetCharActorComp.FloorLocation) + this.TsMinHeightFromTargetFloor, (h = GravityUtils_1.GravityUtils.GetZnInGravityForActor(t.TargetBaseActorComp, i)) < s)) {
        GravityUtils_1.GravityUtils.AddZnInGravityForActor(t.TargetBaseActorComp, i, s - h);
      }
    }
  }
  GetTowardVector(t, i) {
    this.GetTargetPos(t, this.TargetPos);
    this.TargetPos.Subtraction(t.CharActorComp.ActorLocationProxy, this.TmpVector);
    this.TargetPos.Subtraction(t.LastLocation, this.TmpVector2);
    var s = this.TmpVector.DotProduct(this.TmpVector2);
    i.DeepCopy(this.TmpVector);
    if (this.TsIgnoreZ) {
      GravityUtils_1.GravityUtils.ConvertToPlanarVectorForActor(t.CharActorComp, i);
      if (s < 0) {
        return -1;
      } else {
        return i.Size();
      }
    } else if (s < 0) {
      return -1;
    } else {
      return Math.sqrt(GravityUtils_1.GravityUtils.GetPlanarSizeSquared2dForActor(t.CharActorComp, i));
    }
  }
  GetRate(t, i) {
    let s = 1;
    t = i.NowTime + t;
    if (i.TotalTime <= t) {
      s = 1;
    } else if (this.TsMoveCurve) {
      var h = this.TsMoveCurve.GetFloatValue(i.NowTime / i.TotalTime);
      var r = this.TsMoveCurve.GetFloatValue(t / i.TotalTime);
      if (h >= 1) {
        return 0;
      }
      s = (r - h) / (1 - h);
    } else {
      r = MathUtils_1.MathUtils.GetCubicValue(i.NowTime / i.TotalTime);
      h = MathUtils_1.MathUtils.GetCubicValue(t / i.TotalTime);
      if (r >= 1) {
        return 0;
      }
      s = (h - r) / (1 - r);
    }
    return s;
  }
  MoveToTarget(i, s) {
    var h = this.GetTowardVector(s, this.TmpVector);
    if ((!(this.TsMinDistance > 0) || !(h < this.TsMinDistance)) && (!(this.TsMaxDistance > 0) || !(h > this.TsMaxDistance))) {
      let t = this.TsDistance;
      if (!this.TsIgnoreRadius) {
        t += s.CharActorComp.ScaledRadius;
        if (s.TargetCharActorComp && !s.SocketName) {
          t += s.TargetCharActorComp.ScaledRadius;
        }
      }
      if (h > MathUtils_1.MathUtils.KindaSmallNumber && (t < h && this.TsAllowForwardMovement || t > h && this.TsAllowReverseMovement)) {
        if (this.TsMaxSpeed <= 0) {
          return;
        }
        var h = this.GetRate(i, s);
        if (h <= 0) {
          return;
        }
        var r = this.TmpVector.Size();
        var h = MathUtils_1.MathUtils.Clamp((r - t) * h, -this.TsMaxSpeed * i, this.TsMaxSpeed * i);
        this.TmpVector.MultiplyEqual(h / r);
      } else {
        s.LastLocation.Subtraction(s.CharActorComp.ActorLocationProxy, this.TmpVector);
        if (this.TsAlwaysMoveZ && !this.TsIgnoreZ) {
          h = this.GetRate(i, s);
          this.TargetPos.Subtraction(s.CharActorComp.ActorLocationProxy, this.TmpVector2);
          r = MathUtils_1.MathUtils.Clamp(GravityUtils_1.GravityUtils.GetZnInGravityForActor(s.CharActorComp, this.TmpVector2) * h, -this.TsMaxSpeed * i, this.TsMaxSpeed * i);
          GravityUtils_1.GravityUtils.SetZnInGravityForActor(s.CharActorComp, this.TmpVector, r);
        } else {
          GravityUtils_1.GravityUtils.ConvertToPlanarVectorForActor(s.CharActorComp, this.TmpVector);
        }
        if (this.TmpVector.SizeSquared() > INVALID_LAST_LOCATION_THRESHOLD_SQUARED && (this.TmpVector.Reset(), Log_1.Log.CheckWarn())) {
          Log_1.Log.Warn("Movement", 6, "LastLocation太远，很危险，无视掉", ["Actor", s.CharActorComp?.Actor.GetName()], ["Last", s.LastLocation], ["ActorLast", s.CharActorComp?.LastActorLocation], ["Now", s.CharActorComp?.ActorLocationProxy]);
        }
      }
      s.CharActorComp.MoveComp.MoveCharacter(this.TmpVector, i, "TsAnimNotifyStatePositionBranchTarget");
      if (this.TsLookAtTarget) {
        this.TargetPos.Subtraction(s.CharActorComp.ActorLocationProxy, this.TmpVector);
        h = s.CharActorComp.MoveComp ? s.CharActorComp.MoveComp.GravityUp : Vector_1.Vector.UpVectorProxy;
        MathUtils_1.MathUtils.LookRotationUpFirst(this.TmpVector, h, this.TmpQuat);
        this.TmpQuat.Rotator(this.TmpRotator);
        s.CharActorComp.SetActorRotation(this.TmpRotator.ToUeRotator(), "TsAnimNotifyStatePositionBranchTarget", false);
      }
    }
  }
  GetNotifyName() {
    return "位移吸附到目标位置";
  }
}
exports.default = TsAnimNotifyStatePositionBranchTarget;
//# sourceMappingURL=TsAnimNotifyStatePositionBranchTarget.js.map