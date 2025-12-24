"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const QueryTypeDefine_1 = require("../../../../Core/Define/QueryTypeDefine");
const Rotator_1 = require("../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const TraceElementCommon_1 = require("../../../../Core/Utils/TraceElementCommon");
const Global_1 = require("../../../Global");
const GlobalData_1 = require("../../../GlobalData");
const TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
const UPDATE_ROTATE_OFFSET_INTERVAL = 200;
class TsTaskFollowPlayerHardMode extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments);
    this.MoveSpeed = 0;
    this.RotateSpeed = 0;
    this.LocationOffset = undefined;
    this.ForceMoveDistance = 0;
    this.LookAtTarget = false;
    this.DetectTargetDistance = 0;
    this.DetectTargetTypes = undefined;
    this.TsMoveSpeed = 0;
    this.TsRotateSpeed = 0;
    this.TsLocationOffset = Vector_1.Vector.Create();
    this.TsForceMoveDistance = 0;
    this.TsLookAtTarget = false;
    this.TsDetectTargetDistance = 0;
    this.MoveComp = undefined;
    this.TraceElement = undefined;
    this.LineElement = undefined;
    this.RotateOffset = Rotator_1.Rotator.Create();
    this.UpdateRotateOffsetTime = 0;
    this.TempRotator = Rotator_1.Rotator.Create();
    this.TempTargetLocation = Vector_1.Vector.Create();
    this.TempTargetForward = Vector_1.Vector.Create();
    this.TempMoveVector = Vector_1.Vector.Create();
    this.TempVector = Vector_1.Vector.Create();
    this.IsInitTsVariables = false;
  }
  Constructor() {
    super.Constructor();
    this.TsMoveSpeed = 0;
    this.TsRotateSpeed = 0;
    this.TsLocationOffset = Vector_1.Vector.Create();
    this.TsForceMoveDistance = 0;
    this.TsLookAtTarget = false;
    this.TsDetectTargetDistance = 0;
    this.MoveComp = undefined;
    this.TraceElement = undefined;
    this.LineElement = undefined;
    this.RotateOffset = Rotator_1.Rotator.Create();
    this.UpdateRotateOffsetTime = 0;
    this.TempRotator = Rotator_1.Rotator.Create();
    this.TempTargetLocation = Vector_1.Vector.Create();
    this.TempTargetForward = Vector_1.Vector.Create();
    this.TempMoveVector = Vector_1.Vector.Create();
    this.TempVector = Vector_1.Vector.Create();
    this.IsInitTsVariables = false;
  }
  InitTsVariables() {
    if (!this.IsInitTsVariables || !!GlobalData_1.GlobalData.IsPlayInEditor) {
      this.IsInitTsVariables = true;
      this.TsMoveSpeed = this.MoveSpeed;
      this.TsRotateSpeed = this.RotateSpeed;
      this.TsForceMoveDistance = this.ForceMoveDistance;
      this.TsLookAtTarget = this.LookAtTarget;
      this.TsDetectTargetDistance = this.DetectTargetDistance;
      this.RotateOffset = Rotator_1.Rotator.Create();
      this.TempRotator = Rotator_1.Rotator.Create();
      this.TsLocationOffset = Vector_1.Vector.Create();
      this.TempTargetLocation = Vector_1.Vector.Create();
      this.TempTargetForward = Vector_1.Vector.Create();
      this.TempMoveVector = Vector_1.Vector.Create();
      this.TempVector = Vector_1.Vector.Create();
      if (this.LocationOffset) {
        this.TsLocationOffset.FromUeVector(this.LocationOffset);
      } else {
        this.TsLocationOffset.Set(0, 0, 0);
      }
    }
  }
  ReceiveExecuteAI(t, i) {
    var s = t.AiController;
    if (s) {
      var h = s.CharActorComp;
      if (h?.Valid) {
        this.InitTsVariables();
        this.MoveComp = h.Entity?.GetComponent(46);
        s.CharActorComp?.Actor.KuroSetMovementMode({
          Mode: 5,
          Context: "[TsTaskFollowPlayerHardMode.ReceiveExecuteAI]"
        });
        this.UpdateRotateOffsetTime = 0;
        this.RotateOffset.Reset();
        if (!this.TraceElement) {
          this.TraceElement = UE.NewObject(UE.TraceCapsuleElement.StaticClass());
          this.TraceElement.bIsSingle = true;
          this.TraceElement.bIgnoreSelf = true;
          this.TraceElement.WorldContextObject = h.Owner;
          this.TraceElement.HalfHeight = h.DefaultHalfHeight;
          this.TraceElement.Radius = h.DefaultRadius;
          this.TraceElement.AddObjectTypeQuery(QueryTypeDefine_1.KuroObjectTypeQuery.WorldStatic);
          this.TraceElement.AddObjectTypeQuery(QueryTypeDefine_1.KuroObjectTypeQuery.WorldStaticIgnoreBullet);
        }
        if (this.TsLookAtTarget && !this.LineElement && this.DetectTargetTypes && this.DetectTargetTypes.Num() > 0) {
          this.LineElement = UE.NewObject(UE.TraceLineElement.StaticClass());
          this.LineElement.bIsSingle = true;
          this.LineElement.bIgnoreSelf = true;
          this.LineElement.WorldContextObject = h.Owner;
          for (let t = 0; t < this.DetectTargetTypes.Num(); t++) {
            this.LineElement.AddObjectTypeQuery(this.DetectTargetTypes.Get(t));
          }
        }
      } else {
        this.FinishExecute(false);
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("BehaviorTree", 48, "错误的Controller类型", ["Type", t.GetClass().GetName()]);
      }
      this.FinishExecute(false);
    }
  }
  ReceiveTickAI(t, i, s) {
    var h;
    var e;
    var o;
    var r = t.AiController;
    if (r) {
      r = r.CharActorComp;
      if ((e = Global_1.Global.BaseCharacter?.CharacterActorComponent)?.Valid && r?.Valid) {
        s = s * r.Actor.CustomTimeDilation;
        o = e.ActorLocationProxy;
        h = r.ActorLocationProxy;
        e = e.ActorUpProxy;
        this.TempRotator.FromUeRotator(Global_1.Global.CharacterCameraManager.GetCameraRotation());
        if (this.TsLookAtTarget) {
          this.UpdateRotateOffset(s, h);
        }
        this.TempRotator.AdditionEqual(this.RotateOffset);
        this.MoveComp?.SmoothCharacterRotation(this.TempRotator.ToUeRotator(), this.TsRotateSpeed, s, false, "FollowPlayerHardMode");
        this.TempTargetLocation.DeepCopy(o);
        this.TempTargetForward.FromUeVector(Global_1.Global.CharacterCameraManager.GetActorForwardVector());
        Vector_1.Vector.VectorPlaneProject(this.TempTargetForward, e, this.TempVector);
        this.TempTargetForward.DeepCopy(this.TempVector);
        this.TempTargetForward.Normalize();
        this.TempTargetForward.Multiply(this.TsLocationOffset.X, this.TempVector);
        this.TempTargetLocation.AdditionEqual(this.TempVector);
        this.TempTargetForward.RotateAngleAxis(90, e, this.TempTargetForward);
        this.TempTargetForward.Multiply(this.TsLocationOffset.Y, this.TempVector);
        this.TempTargetLocation.AdditionEqual(this.TempVector);
        e.Multiply(this.TsLocationOffset.Z, this.TempVector);
        this.TempTargetLocation.AdditionEqual(this.TempVector);
        h.Subtraction(o, this.TempVector);
        if (this.TempVector.SizeSquared() > this.TsForceMoveDistance * this.TsForceMoveDistance) {
          if (this.CheckObstacle(o, this.TempTargetLocation)) {
            r.SetActorLocation(o.ToUeVector(), "FollowPlayerHardMode", false);
          } else {
            r.SetActorLocation(this.TempTargetLocation.ToUeVector(), "FollowPlayerHardMode", false);
          }
        } else {
          this.TempTargetLocation.Subtraction(h, this.TempMoveVector);
          e = this.TempMoveVector.SizeSquared();
          if ((o = this.TsMoveSpeed * s) * o < e) {
            this.TempMoveVector.Normalize();
            this.TempMoveVector.MultiplyEqual(o);
          }
          this.MoveComp?.MoveCharacter(this.TempMoveVector, 0, "FollowPlayerHardMode");
        }
      } else {
        this.FinishExecute(false);
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("BehaviorTree", 48, "错误的Controller类型", ["Type", t.GetClass().GetName()]);
      }
      this.FinishExecute(false);
    }
  }
  CheckObstacle(t, i) {
    return !!this.TraceElement && (TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.TraceElement, t), TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.TraceElement, i), (TraceElementCommon_1.TraceElementCommon.CapsuleTrace(this.TraceElement, "FollowPlayerHardMode") && this.TraceElement.HitResult?.bBlockingHit) ?? false);
  }
  UpdateRotateOffset(t, i) {
    var s;
    if (this.LineElement) {
      this.UpdateRotateOffsetTime += t * MathUtils_1.MathUtils.SecondToMillisecond;
      if (!(this.UpdateRotateOffsetTime < UPDATE_ROTATE_OFFSET_INTERVAL)) {
        this.UpdateRotateOffsetTime = 0;
        this.TempVector.FromUeVector(Global_1.Global.CharacterCameraManager.D_GetCameraLocation());
        this.TempMoveVector.FromUeVector(Global_1.Global.CharacterCameraManager.GetActorForwardVector());
        this.TempMoveVector.MultiplyEqual(this.TsDetectTargetDistance);
        this.TempMoveVector.AdditionEqual(this.TempVector);
        TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.LineElement, this.TempVector);
        TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.LineElement, this.TempMoveVector);
        t = TraceElementCommon_1.TraceElementCommon.LineTrace(this.LineElement, "FollowPlayerHardMode DetectTarget");
        s = this.LineElement.HitResult;
        if (t && s?.bBlockingHit) {
          TraceElementCommon_1.TraceElementCommon.GetHitLocation(s, 0, this.TempVector);
          this.RotateOffset.FromUeRotator(UE.KismetMathLibrary.D_FindLookAtRotation(i.ToUeVector(), this.TempVector.ToUeVector()));
        } else {
          this.RotateOffset.FromUeRotator(UE.KismetMathLibrary.D_FindLookAtRotation(i.ToUeVector(), this.TempMoveVector.ToUeVector()));
        }
        this.RotateOffset.SubtractionEqual(this.TempRotator);
      }
    }
  }
}
exports.default = TsTaskFollowPlayerHardMode;
//# sourceMappingURL=TsTaskFollowPlayerHardMode.js.map