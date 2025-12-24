"use strict";

var __decorate = this && this.__decorate || function (t, e, i, s) {
  var r;
  var o = arguments.length;
  var h = o < 3 ? e : s === null ? s = Object.getOwnPropertyDescriptor(e, i) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    h = Reflect.decorate(t, e, i, s);
  } else {
    for (var n = t.length - 1; n >= 0; n--) {
      if (r = t[n]) {
        h = (o < 3 ? r(h) : o > 3 ? r(e, i, h) : r(e, i)) || h;
      }
    }
  }
  if (o > 3 && h) {
    Object.defineProperty(e, i, h);
  }
  return h;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleMoveComponent = undefined;
const puerts_1 = require("puerts");
const Info_1 = require("../../../../Core/Common/Info");
const Log_1 = require("../../../../Core/Common/Log");
const Stats_1 = require("../../../../Core/Common/Stats");
const Time_1 = require("../../../../Core/Common/Time");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const EntitySystem_1 = require("../../../../Core/Entity/EntitySystem");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const Quat_1 = require("../../../../Core/Utils/Math/Quat");
const Rotator_1 = require("../../../../Core/Utils/Math/Rotator");
const Transform_1 = require("../../../../Core/Utils/Math/Transform");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const TraceElementCommon_1 = require("../../../../Core/Utils/TraceElementCommon");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const LogReportController_1 = require("../../../Module/LogReport/LogReportController");
const LogReportDefine_1 = require("../../../Module/LogReport/LogReportDefine");
const CharacterDriveVehicleComponent_1 = require("../../Character/Common/Component/CharacterDriveVehicleComponent");
const VehicleMoveComponent_1 = require("../Common/VehicleMoveComponent");
const VehiclePathMoveController_1 = require("../Controller/VehiclePathMoveController");
const BRAKE_FORWARD_SPEED_THRESHOLD = 200;
const BRAKE_RIGHT_SPEED_THRESHOLD = 500;
const BACK_TIME_THRESHOLD = 100;
const DRIFT_INPUT_X_THRESHOLD = -MathUtils_1.MathUtils.SmallNumber;
const DRIFT_INPUT_Y_THRESHOLD = 0.5;
const DRIFT_SPEED_THRESHOLD = 500;
const tmpTrans = Transform_1.Transform.Create();
const tmpQuat = Quat_1.Quat.Create();
const tmpQuat2 = Quat_1.Quat.Create();
const tmpVector = Vector_1.Vector.Create();
const leftTurn90 = Rotator_1.Rotator.Create(0, -90, 0).Quaternion();
const motorSubStateTagMap = new Map([[0, 902684215], [2, -1024257441], [1, -1024257441], [4, -1024257441], [3, -1330336472]]);
let MotorcycleMoveComponent = class MotorcycleMoveComponent extends VehicleMoveComponent_1.VehicleMoveComponent {
  constructor() {
    super(...arguments);
    this.Nce = undefined;
    this.$zo = undefined;
    this.Ydl = Vector_1.Vector.Create();
    this.oVf = Transform_1.Transform.Create();
    this.VHf = (0, puerts_1.$ref)(undefined);
    this.HHf = new Set();
    this.jHf = new Set();
    this.iCu = 0;
    this.rCu = false;
    this.uAf = false;
    this.yLf = 0;
    this.SLf = 0;
    this.MLf = Vector_1.Vector.Create();
    this.cAf = false;
    this.dAf = false;
    this.Aom = 1;
    this.bnf = 0;
    this.Rnf = 0;
    this.wnf = false;
    this.Lnf = new Array();
    this.Pnf = new Array();
    this.Anf = 0;
    this.OnSkill = t => {
      var e;
      if (this.ActorComp?.IsAutonomousProxy) {
        (e = new LogReportDefine_1.MotorSkillLogEvent()).i_skill_id = t.toString();
        LogReportController_1.LogReportController.LogReport(e);
      }
    };
    this.qz = Stats_1.Stat.Create("BackingMotor");
    this.wz = Stats_1.Stat.Create("super.OnTick");
    this.Bz = Stats_1.Stat.Create("UpdateMoveState");
    this.bz = Stats_1.Stat.Create("UpdateMoveBuff");
    this.$Hf = Stats_1.Stat.Create("UpdateBaseMovement");
  }
  get BackBraking() {
    return this.rCu;
  }
  set BackBraking(t) {
    this.rCu = t;
  }
  get DriftingState() {
    return this.uAf;
  }
  set DriftingState(t) {
    if (this.uAf !== t) {
      if (this.uAf = t) {
        this.SLf = Time_1.Time.NowSeconds;
        this.yLf = 0;
        this.MLf.DeepCopy(this.ActorComp.ActorLocationProxy);
        this.TagComponent?.AddTag(312204375);
        if (this.bnf > 0) {
          this.$zo?.AddBuff(this.bnf, {
            InstigatorId: this.$zo.CreatureDataId,
            Reason: "漂移buff"
          });
        }
      } else {
        (t = new LogReportDefine_1.MotorDriftLogEvent()).i_drift_distance = Math.round(this.yLf / 100);
        t.i_drift_time = Math.round(Time_1.Time.NowSeconds - this.SLf);
        LogReportController_1.LogReportController.LogReport(t);
        this.TagComponent?.RemoveTag(312204375);
        if (this.bnf > 0) {
          this.$zo?.RemoveBuff(this.bnf, -1, "漂移buff");
        }
      }
    }
  }
  get FrontBrakingState() {
    return this.cAf;
  }
  set FrontBrakingState(t) {
    if (this.cAf !== t) {
      if (this.cAf = t) {
        this.TagComponent?.AddTag(-1797666683);
      } else {
        this.TagComponent?.RemoveTag(-1797666683);
      }
    }
  }
  get BackBrakingState() {
    return this.dAf;
  }
  set BackBrakingState(t) {
    if (this.dAf !== t) {
      if (this.dAf = t) {
        this.TagComponent?.AddTag(399362418);
      } else {
        this.TagComponent?.RemoveTag(399362418);
      }
    }
  }
  get MotorSubState() {
    return this.Aom;
  }
  set MotorSubState(t) {
    var e;
    var i;
    if (this.Aom !== t) {
      if (this.TagComponent && (e = motorSubStateTagMap.get(this.Aom)) !== (i = motorSubStateTagMap.get(t))) {
        this.TagComponent.RemoveTag(e);
        this.TagComponent.AddTag(i);
      }
      EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.MotorSubStateModeChange, t, this.Aom);
      this.Aom = t;
    }
  }
  get Dnf() {
    return this.wnf;
  }
  set Dnf(t) {
    if (this.wnf !== t && (this.wnf = t, this.Rnf > 0)) {
      if (this.wnf) {
        this.$zo?.AddBuff(this.Rnf, {
          InstigatorId: this.$zo.CreatureDataId,
          Reason: "倒车buff"
        });
      } else {
        this.$zo?.RemoveBuff(this.Rnf, -1, "倒车buff");
      }
    }
  }
  get CurrentMoveBuff() {
    return this.Anf;
  }
  set CurrentMoveBuff(t) {
    if (this.Anf !== t && (this.Anf > 0 && (this.$zo?.RemoveBuff(this.Anf, -1, "摩托移动buff"), Log_1.Log.CheckWarn()) && Log_1.Log.Warn("Test", 6, "MotorMoveBuff RemoveBuff " + this.Anf), this.Anf = t, this.Anf > 0) && (this.$zo?.AddBuff(this.Anf, {
      InstigatorId: this.$zo.CreatureDataId,
      Reason: "摩托移动buff"
    }), Log_1.Log.CheckWarn())) {
      Log_1.Log.Warn("Test", 6, "MotorMoveBuff AddBuff " + this.Anf);
    }
  }
  OnStart() {
    var t = super.OnStart();
    this.Nce = this.Entity.GetComponent(264);
    this.$zo = this.Entity.GetComponent(257);
    this.VehicleMovement?.ResetMotorcycle();
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Movement", 6, "Motorcycle Move OnStart", ["Result", t]);
    }
    this.TagComponent.AddTag(-1024257441);
    var i = this.Entity.GetComponent(246)?.Config?.Asset;
    if (i) {
      let e = i.非加速状态buff.Num();
      for (let t = this.Lnf.length = 0; t < e; ++t) {
        var s = i.非加速状态buff.Get(t);
        this.Lnf.push([s.Threshold, Number(s.BuffId)]);
      }
      e = i.加速状态buff.Num();
      for (let t = this.Pnf.length = 0; t < e; ++t) {
        var r = i.加速状态buff.Get(t);
        this.Pnf.push([r.Threshold, Number(r.BuffId)]);
      }
      this.bnf = Number(i.漂移buff);
      this.Rnf = Number(i.倒车buff);
      this.nVf();
      EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharBeforeSkillWithTarget, this.OnSkill);
    }
    return t;
  }
  OnEnd() {
    var t = super.OnEnd();
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharBeforeSkillWithTarget, this.OnSkill);
    this.TKf();
    return t;
  }
  OnDisable(t) {
    super.OnDisable(t);
    this.TKf();
  }
  TKf() {
    this.Dnf = false;
    this.DriftingState = false;
    if ((this.CurrentMoveBuff = 0) < this.HHf.size) {
      this.HHf.clear();
      EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.MotorcycleBaseMovementChanged, this.HHf);
    }
  }
  SetInputOrder() {
    var i = this.ActorComp?.Actor.VehicleMovementComponent;
    if (i) {
      this.Ydl.DeepCopy(this.ActorComp.InputDirectProxy);
      let t = 0;
      let e = this.BackBraking ? 1 : 0;
      if (this.TagComponent?.HasTag(-595765206)) {
        this.Ydl.X = 1;
      }
      if (this.Ydl.X < 0 && !this.Dnf) {
        t = -this.Ydl.X;
        this.Ydl.X = 0;
      }
      if (this.TagComponent?.HasTag(1325228559)) {
        this.Ydl.X = 0;
        t = 1;
        e = 1;
      }
      if (t >= 0.99 && e >= 0.99 || this.TagComponent?.HasTag(-2030050217)) {
        this.Ydl.Y = 0;
      }
      if (this.Nce) {
        this.TmpVector.DeepCopy(this.Nce.MotorInputCache);
        if (Info_1.Info.IsPcInputModel() && !Info_1.Info.IsInGamepad()) {
          this.TmpVector.X = Math.min(0, this.TmpVector.X) + this.Nce.AirRotateInput;
        }
        i.SetMotorInput(this.Ydl.ToUeVectorOld(), t, e, this.TmpVector.ToUeVectorOld());
      } else {
        i.SetMotorInput(this.Ydl.ToUeVectorOld(), t, e, this.Ydl.ToUeVectorOld());
      }
    }
  }
  OnTick(t) {
    var e;
    var i;
    this.qz.Start();
    this.Ydl.DeepCopy(this.ActorComp.InputDirectProxy);
    if (this.Ydl.X >= 0 || this.BackBraking) {
      this.iCu = 0;
      this.Dnf = false;
    } else if (this.iCu < BACK_TIME_THRESHOLD) {
      e = this.ActorComp.ActorVelocityProxy.DotProduct(this.ActorComp.ActorForwardProxy);
      i = this.ActorComp.ActorVelocityProxy.DotProduct(this.ActorComp.ActorRightProxy);
      if (Math.abs(i) > BRAKE_RIGHT_SPEED_THRESHOLD || e > BRAKE_FORWARD_SPEED_THRESHOLD) {
        this.iCu = 0;
      } else {
        this.iCu += Time_1.Time.DeltaTime;
      }
      this.Dnf = this.iCu >= BACK_TIME_THRESHOLD;
    } else {
      this.Dnf = true;
    }
    this.qz.Stop();
    this.wz.Start();
    super.OnTick(t);
    this.wz.Stop();
    this.Bz.Start();
    this.XFr();
    this.Bz.Stop();
    this.bz.Start();
    this.UpdateMoveBuff();
    this.bz.Stop();
    this.$Hf.Start();
    this.WHf();
    this.$Hf.Stop();
  }
  MoveAlongPath(e) {
    const i = VehiclePathMoveController_1.VehiclePathMoveController.CreateMotorcycleMoveTaskFromSplineId(this.Entity, e.SplineId);
    var t;
    if (i?.IsValid()) {
      if (e.ForceToFirstPoint) {
        i.NeedSync = e.NeedSync ?? true;
        i.SimulateRotation = e.SimulateRotation ?? true;
        i.KeepForward = e.KeepForward ?? false;
        i.EnableDynamicGravity(!!e.DynamicGravity);
        i.OnMoveEndHandle = t => {
          if (e.OnMoveEndHandle) {
            e.OnMoveEndHandle(t);
          }
          this.DebugCurve = undefined;
        };
        VehiclePathMoveController_1.VehiclePathMoveController.AddSplineMoveTask(i);
        this.DebugCurve = i.CurveInfo?.SplineCurve;
      } else {
        t = e.StartFromNearest ? this.FindNearestNextPoint(i.CurveInfo.SplineCurve) : 0;
        i.JumpToPoint(t);
        i.GetTransformAtSplineIndex(t, this.TmpTrans);
        t = i.CurveInfo.SplineConfig?.TransitionSpeed || i.CurveInfo.SplineCurve.GetSplineLength() / i.CurveInfo.TotalTime;
        if ((t = VehiclePathMoveController_1.VehiclePathMoveController.CreateMotorcycleMoveToTask(this.Entity, this.TmpTrans, t))?.IsValid()) {
          t.CurveInfo.SplineId = -e.SplineId;
          t.NeedSync = e.NeedSync ?? true;
          t.SimulateRotation = false;
          t.KeepForward = e.KeepForward ?? false;
          t.OnMoveEndHandle = t => {
            if (t) {
              VehiclePathMoveController_1.VehiclePathMoveController.AddSplineMoveTask(i);
              this.DebugCurve = i.CurveInfo?.SplineCurve;
              if (e.OnArriveStartPointHandle) {
                e.OnArriveStartPointHandle(t);
              }
            } else if (e.OnMoveEndHandle) {
              e.OnMoveEndHandle(false);
            }
          };
          i.NeedSync = e.NeedSync ?? true;
          i.SimulateRotation = e.SimulateRotation ?? true;
          i.KeepForward = e.KeepForward ?? false;
          i.EnableDynamicGravity(!!e.DynamicGravity);
          i.OnMoveEndHandle = t => {
            if (e.OnMoveEndHandle) {
              e.OnMoveEndHandle(t);
            }
            this.DebugCurve = undefined;
          };
          VehiclePathMoveController_1.VehiclePathMoveController.AddSplineMoveTask(t);
          this.DebugCurve = t.CurveInfo?.SplineCurve;
        } else {
          VehiclePathMoveController_1.VehiclePathMoveController.AddSplineMoveTask(i);
          this.DebugCurve = i.CurveInfo?.SplineCurve;
        }
      }
    }
  }
  UpdateMoveBuff() {
    var t;
    var e;
    var i = this.VehicleMovement.MotorAccelConfig.MaxSpeed;
    var s = this.ActorComp.ActorVelocityProxy.DotProduct(this.ActorComp.ActorForwardProxy) / i;
    let r = false;
    for ([t, e] of this.TagComponent?.HasTag(-595765206) ? this.Pnf : this.Lnf) {
      if (s < t) {
        this.CurrentMoveBuff = e;
        r = true;
        break;
      }
    }
    if (!r) {
      this.CurrentMoveBuff = 0;
    }
  }
  XFr() {
    this.MotorSubState = this.VehicleMovement.MotorSubState;
    this.DriftingState = this.BackBraking && this.ActorComp.InputDirectProxy.X > DRIFT_INPUT_X_THRESHOLD && Math.abs(this.ActorComp.InputDirectProxy.Y) > DRIFT_INPUT_Y_THRESHOLD && this.Speed > DRIFT_SPEED_THRESHOLD && this.MotorSubState === 1;
    if (this.DriftingState) {
      this.yLf += Vector_1.Vector.Dist(this.ActorComp.ActorLocationProxy, this.MLf);
      this.MLf.DeepCopy(this.ActorComp.ActorLocationProxy);
    }
    var t = this.ActorComp.ActorVelocityProxy.DotProduct(this.ActorComp.ActorForwardProxy);
    if (this.DriftingState || t < BRAKE_FORWARD_SPEED_THRESHOLD || this.TagComponent?.HasTag(1325228559) || this.MotorSubState !== 1 && this.MotorSubState !== 2) {
      this.FrontBrakingState = false;
      this.BackBrakingState = false;
    } else {
      this.FrontBrakingState = !this.Dnf && this.ActorComp.InputDirectProxy.X < 0;
      this.BackBrakingState = this.BackBraking;
    }
  }
  WHf() {
    this.VehicleMovement?.GetBaseMovement(this.VHf);
    var t;
    var e = (0, puerts_1.$unref)(this.VHf);
    var i = e.Num();
    let s = true;
    this.jHf.clear();
    for (let t = 0; t < i; ++t) {
      var r = e.Get(t);
      this.jHf.add(r);
      s &&= this.HHf.has(r);
    }
    if (!(s &&= this.HHf.size === this.jHf.size)) {
      t = this.HHf;
      this.HHf = this.jHf;
      this.jHf = t;
      this.jHf.clear();
      EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.MotorcycleBaseMovementChanged, this.HHf);
    }
  }
  nVf() {
    var t;
    var e;
    var i = CommonParamById_1.configCommonParamById.GetFloatArrayConfig("MotorGetOnSeatTrans");
    if (i && i.length >= 9) {
      t = Vector_1.Vector.Create(i[0], i[1], i[2]);
      e = Rotator_1.Rotator.Create(i[3], i[4], i[5]);
      i = Vector_1.Vector.Create(i[6], i[7], i[8]);
      this.oVf.SetLocation(t);
      this.oVf.SetRotation(e.Quaternion());
      this.oVf.SetScale3D(i);
    }
  }
  GetMotorcycleSummonTrans(t, e) {
    var i = EntitySystem_1.EntitySystem.GetComponent(t, 3);
    if (i) {
      e = e || this.oVf.ToUeTransformOld();
      tmpTrans.FromUeTransform(e);
      leftTurn90.Multiply(tmpTrans.GetRotation(), tmpQuat2);
      tmpQuat2.Inverse(tmpQuat);
      i.ActorQuatProxy.Multiply(tmpQuat, tmpQuat2);
      tmpTrans.SetRotation(tmpQuat2);
      leftTurn90.RotateVector(tmpTrans.GetLocation(), tmpVector);
      tmpVector.Z += i.HalfHeight - CharacterDriveVehicleComponent_1.DEFAULT_SITTING_HEIGHT;
      tmpQuat2.RotateVector(tmpVector, tmpVector);
      i.ActorLocationProxy.Subtraction(tmpVector, tmpVector);
      tmpTrans.SetLocation(tmpVector);
      e = ModelManager_1.ModelManager.TraceElementModel.GetActorTrace();
      e.WorldContextObject = this.VehicleMovement?.GetOwner();
      e.Radius = 5;
      TraceElementCommon_1.TraceElementCommon.SetStartLocation(e, i.ActorLocationProxy);
      TraceElementCommon_1.TraceElementCommon.SetEndLocation(e, tmpVector);
      if (TraceElementCommon_1.TraceElementCommon.ShapeTrace(i.Actor.CapsuleComponent, e, "SummonAndRideMotorcycle", "SummonAndRideMotorcycle")) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Vehicle", 6, "SummonAndRideMotorcycle  Error. Block.", ["Actor", i.Actor.GetName()], ["tmpTrans", tmpTrans]);
        }
      } else {
        if (this.VehicleMovement?.IsValidTransform(tmpTrans.ToUeTransform(), undefined)) {
          return tmpTrans;
        }
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Vehicle", 6, "SummonAndRideMotorcycle Error. Not ValidTrans.", ["Actor", i.Actor.GetName()], ["tmpTrans", tmpTrans]);
        }
      }
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("Vehicle", 6, "SummonAndRideMotorcycle Error. No ActorComp.", ["ActorEntityId", t]);
    }
  }
  UpdateUeMovementDisableState(t) {
    if (this.HHf.size > 0) {
      this.StopMoveContinuousTime = 0;
      this.EnableUeMovementTick("CurrentBaseMovement不为空");
    } else {
      super.UpdateUeMovementDisableState(t);
    }
  }
};
MotorcycleMoveComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(265)], MotorcycleMoveComponent);
exports.MotorcycleMoveComponent = MotorcycleMoveComponent; //# sourceMappingURL=MotorcycleMoveComponent.js.map