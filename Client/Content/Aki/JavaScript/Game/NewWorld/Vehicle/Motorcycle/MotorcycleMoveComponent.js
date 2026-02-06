"use strict";

var __decorate = this && this.__decorate || function (t, e, i, s) {
  var o;
  var r = arguments.length;
  var h = r < 3 ? e : s === null ? s = Object.getOwnPropertyDescriptor(e, i) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    h = Reflect.decorate(t, e, i, s);
  } else {
    for (var n = t.length - 1; n >= 0; n--) {
      if (o = t[n]) {
        h = (r < 3 ? o(h) : r > 3 ? o(e, i, h) : o(e, i)) || h;
      }
    }
  }
  if (r > 3 && h) {
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
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
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
    this.ph_ = undefined;
    this.Ydl = Vector_1.Vector.Create();
    this.KQf = Transform_1.Transform.Create();
    this.tig = (0, puerts_1.$ref)(undefined);
    this.iig = new Set();
    this.rig = new Set();
    this.iCu = 0;
    this.rCu = false;
    this.y2f = false;
    this.ABf = 0;
    this.DBf = 0;
    this.UBf = Vector_1.Vector.Create();
    this.S2f = false;
    this.M2f = false;
    this.Aom = 1;
    this.Waf = 0;
    this.Qaf = 0;
    this.Kaf = false;
    this.Xaf = new Array();
    this.Yaf = new Array();
    this.zaf = 0;
    this.vvg = undefined;
    this.OnSkill = t => {
      var e;
      if (this.ActorComp?.IsAutonomousProxy) {
        (e = new LogReportDefine_1.MotorSkillLogEvent()).i_skill_id = t.toString();
        LogReportController_1.LogReportController.LogReport(e);
      }
    };
    this.OnSprintTagChange = (t, e) => {
      if (e && this.ph_?.Driver?.GetComponent(3)?.IsRoleAndCtrlByMe) {
        if (this.TagComponent?.HasTag(-1636232993)) {
          ControllerHolder_1.ControllerHolder.CameraController.PlayForceFeedbackFromCameraShake(this.vvg);
        } else {
          ControllerHolder_1.ControllerHolder.CameraController.PlayCameraShake(this.vvg, undefined, undefined, undefined, true);
        }
      }
    };
    this.qz = Stats_1.Stat.Create("BackingMotor");
    this.wz = Stats_1.Stat.Create("super.OnTick");
    this.Bz = Stats_1.Stat.Create("UpdateMoveState");
    this.bz = Stats_1.Stat.Create("UpdateMoveBuff");
    this.oig = Stats_1.Stat.Create("UpdateBaseMovement");
  }
  get BackBraking() {
    return this.rCu;
  }
  set BackBraking(t) {
    this.rCu = t;
  }
  get DriftingState() {
    return this.y2f;
  }
  set DriftingState(t) {
    if (this.y2f !== t) {
      if (this.y2f = t) {
        this.DBf = Time_1.Time.NowSeconds;
        this.ABf = 0;
        this.UBf.DeepCopy(this.ActorComp.ActorLocationProxy);
        this.TagComponent?.AddTag(312204375);
        if (this.Waf > 0) {
          this.$zo?.AddBuff(this.Waf, {
            InstigatorId: this.$zo.CreatureDataId,
            Reason: "漂移buff"
          });
        }
      } else {
        (t = new LogReportDefine_1.MotorDriftLogEvent()).i_drift_distance = Math.round(this.ABf / 100);
        t.i_drift_time = Math.round(Time_1.Time.NowSeconds - this.DBf);
        LogReportController_1.LogReportController.LogReport(t);
        this.TagComponent?.RemoveTag(312204375);
        if (this.Waf > 0) {
          this.$zo?.RemoveBuff(this.Waf, -1, "漂移buff");
        }
      }
    }
  }
  get FrontBrakingState() {
    return this.S2f;
  }
  set FrontBrakingState(t) {
    if (this.S2f !== t) {
      if (this.S2f = t) {
        this.TagComponent?.AddTag(-1797666683);
      } else {
        this.TagComponent?.RemoveTag(-1797666683);
      }
    }
  }
  get BackBrakingState() {
    return this.M2f;
  }
  set BackBrakingState(t) {
    if (this.M2f !== t) {
      if (this.M2f = t) {
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
  get Jaf() {
    return this.Kaf;
  }
  set Jaf(t) {
    if (this.Kaf !== t && (this.Kaf = t, this.Qaf > 0)) {
      if (this.Kaf) {
        this.$zo?.AddBuff(this.Qaf, {
          InstigatorId: this.$zo.CreatureDataId,
          Reason: "倒车buff"
        });
      } else {
        this.$zo?.RemoveBuff(this.Qaf, -1, "倒车buff");
      }
    }
  }
  get CurrentMoveBuff() {
    return this.zaf;
  }
  set CurrentMoveBuff(t) {
    if (this.zaf !== t && (this.zaf > 0 && (this.$zo?.RemoveBuff(this.zaf, -1, "摩托移动buff"), Log_1.Log.CheckWarn()) && Log_1.Log.Warn("Test", 6, "MotorMoveBuff RemoveBuff " + this.zaf), this.zaf = t, this.zaf > 0) && (this.$zo?.AddBuff(this.zaf, {
      InstigatorId: this.$zo.CreatureDataId,
      Reason: "摩托移动buff"
    }), Log_1.Log.CheckWarn())) {
      Log_1.Log.Warn("Test", 6, "MotorMoveBuff AddBuff " + this.zaf);
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
    this.ph_ = this.Entity.GetComponent(246);
    var i = this.ph_?.Config?.Asset;
    if (i) {
      let e = i.非加速状态buff.Num();
      for (let t = this.Xaf.length = 0; t < e; ++t) {
        var s = i.非加速状态buff.Get(t);
        this.Xaf.push([s.Threshold, Number(s.BuffId)]);
      }
      e = i.加速状态buff.Num();
      for (let t = this.Yaf.length = 0; t < e; ++t) {
        var o = i.加速状态buff.Get(t);
        this.Yaf.push([o.Threshold, Number(o.BuffId)]);
      }
      this.Waf = Number(i.漂移buff);
      this.Qaf = Number(i.倒车buff);
      this.vvg = i.冲刺震屏;
      this.XQf();
      EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharBeforeSkillWithTarget, this.OnSkill);
      if (this.vvg) {
        this.TagComponent?.AddTagAddOrRemoveListener(-595765206, this.OnSprintTagChange);
      }
    }
    return t;
  }
  OnEnd() {
    var t = super.OnEnd();
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharBeforeSkillWithTarget, this.OnSkill);
    if (this.vvg) {
      this.TagComponent?.RemoveTagAddOrRemoveListener(-595765206, this.OnSprintTagChange);
    }
    this.Slg();
    return t;
  }
  OnDisable(t) {
    super.OnDisable(t);
    this.Slg();
  }
  Slg() {
    this.Jaf = false;
    this.DriftingState = false;
    if ((this.CurrentMoveBuff = 0) < this.iig.size) {
      this.iig.clear();
      EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.MotorcycleBaseMovementChanged, this.iig);
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
      if (this.Ydl.X < 0 && !this.Jaf) {
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
      this.Jaf = false;
    } else if (this.iCu < BACK_TIME_THRESHOLD) {
      e = this.ActorComp.ActorVelocityProxy.DotProduct(this.ActorComp.ActorForwardProxy);
      i = this.ActorComp.ActorVelocityProxy.DotProduct(this.ActorComp.ActorRightProxy);
      if (Math.abs(i) > BRAKE_RIGHT_SPEED_THRESHOLD || e > BRAKE_FORWARD_SPEED_THRESHOLD) {
        this.iCu = 0;
      } else {
        this.iCu += Time_1.Time.DeltaTime;
      }
      this.Jaf = this.iCu >= BACK_TIME_THRESHOLD;
    } else {
      this.Jaf = true;
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
    this.oig.Start();
    this.nig();
    this.oig.Stop();
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
    let o = false;
    for ([t, e] of this.TagComponent?.HasTag(-595765206) ? this.Yaf : this.Xaf) {
      if (s < t) {
        this.CurrentMoveBuff = e;
        o = true;
        break;
      }
    }
    if (!o) {
      this.CurrentMoveBuff = 0;
    }
  }
  XFr() {
    this.MotorSubState = this.VehicleMovement.MotorSubState;
    this.DriftingState = this.BackBraking && this.ActorComp.InputDirectProxy.X > DRIFT_INPUT_X_THRESHOLD && Math.abs(this.ActorComp.InputDirectProxy.Y) > DRIFT_INPUT_Y_THRESHOLD && this.Speed > DRIFT_SPEED_THRESHOLD && this.MotorSubState === 1;
    if (this.DriftingState) {
      this.ABf += Vector_1.Vector.Dist(this.ActorComp.ActorLocationProxy, this.UBf);
      this.UBf.DeepCopy(this.ActorComp.ActorLocationProxy);
    }
    var t = this.ActorComp.ActorVelocityProxy.DotProduct(this.ActorComp.ActorForwardProxy);
    if (this.DriftingState || t < BRAKE_FORWARD_SPEED_THRESHOLD || this.TagComponent?.HasTag(1325228559) || this.MotorSubState !== 1 && this.MotorSubState !== 2) {
      this.FrontBrakingState = false;
      this.BackBrakingState = false;
    } else {
      this.FrontBrakingState = !this.Jaf && this.ActorComp.InputDirectProxy.X < 0;
      this.BackBrakingState = this.BackBraking;
    }
  }
  nig() {
    this.VehicleMovement?.GetBaseMovement(this.tig);
    var t;
    var e = (0, puerts_1.$unref)(this.tig);
    var i = e.Num();
    let s = true;
    this.rig.clear();
    for (let t = 0; t < i; ++t) {
      var o = e.Get(t);
      this.rig.add(o);
      s &&= this.iig.has(o);
    }
    if (!(s &&= this.iig.size === this.rig.size)) {
      t = this.iig;
      this.iig = this.rig;
      this.rig = t;
      this.rig.clear();
      EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.MotorcycleBaseMovementChanged, this.iig);
    }
  }
  XQf() {
    var t;
    var e;
    var i = CommonParamById_1.configCommonParamById.GetFloatArrayConfig("MotorGetOnSeatTrans");
    if (i && i.length >= 9) {
      t = Vector_1.Vector.Create(i[0], i[1], i[2]);
      e = Rotator_1.Rotator.Create(i[3], i[4], i[5]);
      i = Vector_1.Vector.Create(i[6], i[7], i[8]);
      this.KQf.SetLocation(t);
      this.KQf.SetRotation(e.Quaternion());
      this.KQf.SetScale3D(i);
    }
  }
  GetMotorcycleSummonTrans(t, e) {
    var i = EntitySystem_1.EntitySystem.GetComponent(t, 3);
    if (i) {
      e = e || this.KQf.ToUeTransformOld();
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
    if (this.iig.size > 0) {
      this.StopMoveContinuousTime = 0;
      this.EnableUeMovementTick("CurrentBaseMovement不为空");
    } else {
      super.UpdateUeMovementDisableState(t);
    }
  }
};
MotorcycleMoveComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(265)], MotorcycleMoveComponent);
exports.MotorcycleMoveComponent = MotorcycleMoveComponent; //# sourceMappingURL=MotorcycleMoveComponent.js.map