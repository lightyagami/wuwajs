"use strict";

var MotorcycleRailComponent_1;
var __decorate = this && this.__decorate || function (e, t, i, o) {
  var l;
  var s = arguments.length;
  var r = s < 3 ? t : o === null ? o = Object.getOwnPropertyDescriptor(t, i) : o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    r = Reflect.decorate(e, t, i, o);
  } else {
    for (var n = e.length - 1; n >= 0; n--) {
      if (l = e[n]) {
        r = (s < 3 ? l(r) : s > 3 ? l(t, i, r) : l(t, i)) || r;
      }
    }
  }
  if (s > 3 && r) {
    Object.defineProperty(t, i, r);
  }
  return r;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleRailComponent = undefined;
const EntityComponent_1 = require("../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const SplineCurve_1 = require("../../../../Core/Utils/Curve/SplineCurve");
const Transform_1 = require("../../../../Core/Utils/Math/Transform");
const IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const LevelGeneralContextDefine_1 = require("../../../LevelGamePlay/LevelGeneralContextDefine");
const LevelGeneralController_1 = require("../../../LevelGamePlay/LevelGeneralController");
const ModelManager_1 = require("../../../Manager/ModelManager");
const MotorcycleAccelerateAlongRailMoveData_1 = require("../../Vehicle/Motorcycle/MotorcycleRailMove/MotorcycleAccelerateAlongRailMoveData");
const MotorcycleRailMoveConfigs_1 = require("../../Vehicle/Motorcycle/MotorcycleRailMove/MotorcycleRailMoveConfigs");
const MotorcycleRailMoveDefine_1 = require("../../Vehicle/Motorcycle/MotorcycleRailMove/MotorcycleRailMoveDefine");
const MotorcycleRailMoveUtils_1 = require("../../Vehicle/Motorcycle/MotorcycleRailMove/MotorcycleRailMoveUtils");
let MotorcycleRailComponent = MotorcycleRailComponent_1 = class MotorcycleRailComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.PRm = false;
    this.zie = undefined;
    this.Hnr = undefined;
    this.i1g = undefined;
    this.EIe = undefined;
    this.Hte = undefined;
    this.fEf = undefined;
    this.Pxf = undefined;
    this.xrg = MotorcycleRailMoveDefine_1.DEFAULT_MOTOR_RAIL_MOVE_CONFIG_NAME;
    this.Brg = undefined;
    this.Dxf = [];
    this.Uxf = [];
    this.iFf = [];
    this.GCg = undefined;
    this.kRm = e => {
      if (this.PRm !== e) {
        if (this.PRm = e) {
          MotorcycleRailComponent_1.AllRailsThatPlayerInRange.add(this);
        } else {
          MotorcycleRailComponent_1.AllRailsThatPlayerInRange.delete(this);
        }
      }
    };
    this.qRm = () => {
      EventSystem_1.EventSystem.RemoveAllTargetUseKey(this);
      if (this.PRm) {
        this.kRm(false);
      }
      if (this.EIe) {
        ModelManager_1.ModelManager.GameSplineModel?.ReleaseSpline(this.EIe.GetPbDataId(), this.Entity.Id, 1);
      }
    };
    this.xxf = () => this.PRm && MotorcycleRailComponent_1.AllRailsThatPlayerInRange.has(this);
  }
  OnInitData(e) {
    e = e.GetParam(MotorcycleRailComponent_1)[0];
    this.fEf = e.EnableConditions;
    this.Pxf = e.MaxAngle;
    if (e.MotorSlideDtName) {
      this.xrg = e.MotorSlideDtName;
    }
    this.EIe = this.Entity.GetComponent(0);
    return !!this.EIe && (this.Bxf(), true);
  }
  OnInit() {
    this.Hte = this.Entity.GetComponent(214);
    this.zie = ModelManager_1.ModelManager.GameSplineModel?.LoadAndGetSplineComponent(this.EIe.GetPbDataId(), this.Entity.Id, 1);
    return !!this.zie?.IsValid() && !(this.Hnr = ModelManager_1.ModelManager.GameSplineModel?.GetSplineActorBySplineId(this.EIe.GetPbDataId()), !this.Hnr?.IsValid()) && this.Hnr.SplineData?.Type === IComponent_1.ESplineType.MotorSlide;
  }
  OnStart() {
    if (this.Entity.GetComponent(91) && !EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnMyPlayerInOutRangeLocal, this.kRm)) {
      EventSystem_1.EventSystem.AddWithTargetUseHoldKey(this, this.Entity, EventDefine_1.EEventName.OnMyPlayerInOutRangeLocal, this.kRm);
    }
    var e = ModelManager_1.ModelManager.CreatureModel?.GetEntityById(this.Entity.Id);
    if (e && !EventSystem_1.EventSystem.HasWithTarget(e, EventDefine_1.EEventName.RemoveEntity, this.qRm)) {
      EventSystem_1.EventSystem.AddWithTargetUseHoldKey(this, e, EventDefine_1.EEventName.RemoveEntity, this.qRm);
    }
    return true;
  }
  OnActivate() {
    if (!this.Entity.GetComponent(91)) {
      this.kRm(true);
    }
  }
  OnEnd() {
    this.qRm();
    return true;
  }
  Bxf() {
    this.Dxf.length = 0;
    this.Dxf.push(this.xxf, MotorcycleRailMoveUtils_1.MotorcycleRailMoveUtils.RailMoveCheckerCheckVehicleNotReverseMove, MotorcycleRailMoveUtils_1.MotorcycleRailMoveUtils.RailMoveCheckerCheckAngleBetweenVehicleUpAndRailUp, MotorcycleRailMoveUtils_1.MotorcycleRailMoveUtils.RailMoveCheckerCheckAngleBetweenVehicleForwardAndRailTangent, MotorcycleRailMoveUtils_1.MotorcycleRailMoveUtils.RailMoveCheckerCheckAngleBetweenVehicleVelocityAndRailTangent, MotorcycleRailMoveUtils_1.MotorcycleRailMoveUtils.RailMoveCheckerCheckRailLenLeft, MotorcycleRailMoveUtils_1.MotorcycleRailMoveUtils.RailMoveCheckerCheckRelativeLocation);
    this.Uxf.length = 0;
    this.Uxf.push(MotorcycleRailMoveUtils_1.MotorcycleRailMoveUtils.RailMoveCheckerCheckVehicleNotReverseMove, MotorcycleRailMoveUtils_1.MotorcycleRailMoveUtils.RailMoveCheckerCheckAngleBetweenVehicleUpAndRailUp, MotorcycleRailMoveUtils_1.MotorcycleRailMoveUtils.RailMoveCheckerCheckAngleBetweenVehicleForwardAndRailTangent, MotorcycleRailMoveUtils_1.MotorcycleRailMoveUtils.RailMoveCheckerCheckAngleBetweenVehicleVelocityAndRailTangent, MotorcycleRailMoveUtils_1.MotorcycleRailMoveUtils.RailMoveCheckerCheckRailLenLeft, MotorcycleRailMoveUtils_1.MotorcycleRailMoveUtils.RailMoveCheckerCheckRelativeLocation);
    this.iFf.length = 0;
    this.iFf.push(MotorcycleRailMoveUtils_1.MotorcycleRailMoveUtils.RailMoveCheckerCheckVehicleNotReverseMove, MotorcycleRailMoveUtils_1.MotorcycleRailMoveUtils.RailMoveCheckerCheckRailLenLeft);
  }
  GetIsRailEnable() {
    return !!this.zie?.IsValid() && !!this.Hnr?.IsValid() && !this.EIe?.GetRemoveState() && (!this.Hte || !!this.Hte?.GetIsSceneInteractionLoadCompleted()) && (!this.fEf || !!LevelGeneralController_1.LevelGeneralController.CheckConditionNew(this.fEf, undefined, LevelGeneralContextDefine_1.EntityContext.Create(this.Entity.Id)));
  }
  CheckIsRailCanJumpEnter(e) {
    return this.CheckIsRailCanJumpEnterAtDirection(e, true) || this.CheckIsRailCanJumpEnterAtDirection(e, false);
  }
  CheckIsRailCanJumpEnterAtDirection(e, t, i) {
    var o;
    var l;
    var s;
    var r;
    return !!this.zie?.IsValid() && !!this.Hnr?.IsValid() && !!this.GetIsRailEnable() && !!(o = this.GetRailSplineCurve()) && !!this.Brg && !!(s = (l = this.Brg.JumpToRailConfig).EnterRailCondition, (r = i ?? this.GCg ?? (this.GCg = new MotorcycleRailMoveDefine_1.RailMoveContext())).RailSpline = o, r.IsForward = t, e(r.SourceLoc, r.SourceRot, r.SourceVel)) && !!(r.SourceVel.IsNearlyZero(1) && r.SourceVel.Reset(), MotorcycleRailMoveUtils_1.MotorcycleRailMoveUtils.CalcRailMoveTargetNotAdvanceBySpeed(r, l.ParabolaMoveConfig.MinSpeedAlongRail, l.ParabolaMoveConfig.MaxSpeedAlongRail)) && MotorcycleRailMoveUtils_1.MotorcycleRailMoveUtils.ExecCheckList(r, s, this.Dxf, (ModelManager_1.ModelManager.SundryModel?.GetModuleDebugLevel(MotorcycleRailMoveDefine_1.MOTOR_RAIL_MOVE_DEBUG_KEY) ?? 0) >= 2, "CheckIsRailCanJumpEnterAtDirection");
  }
  CheckIsRailCanDirectlyEnter(e) {
    return this.CheckIsRailCanDirectlyEnterAtDirection(e, true) || this.CheckIsRailCanDirectlyEnterAtDirection(e, false);
  }
  CheckIsRailCanDirectlyEnterAtDirection(e, t, i) {
    var o;
    var l;
    var s;
    var r;
    return !!this.zie?.IsValid() && !!this.Hnr?.IsValid() && !!this.GetIsRailEnable() && !!(o = this.GetRailSplineCurve()) && !!this.Brg && !!(s = (l = this.Brg.DirectlyEnterRailConfig).EnterRailCondition, !(this.GetDistanceToRail(e) > l.MaxAbsorbDist)) && !!((r = i ?? this.GCg ?? (this.GCg = new MotorcycleRailMoveDefine_1.RailMoveContext())).RailSpline = o, r.IsForward = t, e(r.SourceLoc, r.SourceRot, r.SourceVel)) && !!(r.SourceVel.IsNearlyZero(1) && r.SourceVel.Reset(), MotorcycleRailMoveUtils_1.MotorcycleRailMoveUtils.CalcRailMoveTargetNotAdvanceBySpeed(r, l.LinearMoveConfig.MinSpeed, l.LinearMoveConfig.MaxSpeed)) && MotorcycleRailMoveUtils_1.MotorcycleRailMoveUtils.ExecCheckList(r, s, this.Dxf, (ModelManager_1.ModelManager.SundryModel?.GetModuleDebugLevel(MotorcycleRailMoveDefine_1.MOTOR_RAIL_MOVE_DEBUG_KEY) ?? 0) >= 2, "CheckIsRailCanDirectlyEnterAtDirection");
  }
  CheckIsRailCanSwitch(e) {
    return this.CheckIsRailCanSwitchAtDirection(e, true) || this.CheckIsRailCanSwitchAtDirection(e, false);
  }
  CheckIsRailCanSwitchAtDirection(e, t, i) {
    var o;
    var l;
    var s;
    var r;
    return !!this.zie?.IsValid() && !!this.Hnr?.IsValid() && !!this.GetIsRailEnable() && !!(o = this.GetRailSplineCurve()) && !!this.Brg && !!(s = (l = this.Brg.SwitchRailConfig).EnterRailCondition, (r = i ?? this.GCg ?? (this.GCg = new MotorcycleRailMoveDefine_1.RailMoveContext())).RailSpline = o, r.IsForward = t, e(r.SourceLoc, r.SourceRot, r.SourceVel)) && !!(r.SourceVel.IsNearlyZero(1) && r.SourceVel.Reset(), MotorcycleRailMoveUtils_1.MotorcycleRailMoveUtils.CalcRailMoveTargetAdvanceBySpeed(r, l.ParabolaMoveConfig.Duration, l.ParabolaMoveConfig.MinSpeedAlongRail, l.ParabolaMoveConfig.MaxSpeedAlongRail)) && MotorcycleRailMoveUtils_1.MotorcycleRailMoveUtils.ExecCheckList(r, s, this.Uxf, (ModelManager_1.ModelManager.SundryModel?.GetModuleDebugLevel(MotorcycleRailMoveDefine_1.MOTOR_RAIL_MOVE_DEBUG_KEY) ?? 0) >= 2, "CheckIsRailCanSwitchAtDirection");
  }
  CheckIsRailCanJumpAlongAtDirection(e, t, i) {
    var o;
    var l;
    var s;
    return !!this.zie?.IsValid() && !!this.Hnr?.IsValid() && !!this.GetIsRailEnable() && t instanceof MotorcycleAccelerateAlongRailMoveData_1.MotorcycleAccelerateAlongRailMoveData && t.RelatedRail === this && !t.IsFinishMove && !!(o = this.GetRailSplineCurve()) && !!this.Brg && !!(l = this.Brg.JumpAlongRailConfig, (s = i ?? this.GCg ?? (this.GCg = new MotorcycleRailMoveDefine_1.RailMoveContext())).RailSpline = o, s.IsForward = t.GetIsMoveAlongSplineForward(), e(s.SourceLoc, s.SourceRot, s.SourceVel)) && !!(s.SourceVel.IsNearlyZero(1) && s.SourceVel.Reset(), MotorcycleRailMoveUtils_1.MotorcycleRailMoveUtils.CalcRailMoveTargetAdvanceBySpeed(s, l.ParabolaMoveConfig.Duration, l.ParabolaMoveConfig.MinSpeedAlongRail, l.ParabolaMoveConfig.MaxSpeedAlongRail)) && MotorcycleRailMoveUtils_1.MotorcycleRailMoveUtils.ExecCheckList(s, undefined, this.iFf, (ModelManager_1.ModelManager.SundryModel?.GetModuleDebugLevel(MotorcycleRailMoveDefine_1.MOTOR_RAIL_MOVE_DEBUG_KEY) ?? 0) >= 2, "CheckIsRailCanJumpAlongAtDirection");
  }
  GetDistanceToRail(e) {
    if (this.zie?.IsValid() && this.Hnr?.IsValid()) {
      return MotorcycleRailMoveUtils_1.MotorcycleRailMoveUtils.GetDistanceFromTargetToRail(this.zie, e);
    } else {
      return -1;
    }
  }
  GetRelativeSideOfTarget(e) {
    if (this.zie?.IsValid() && this.Hnr?.IsValid()) {
      return MotorcycleRailMoveUtils_1.MotorcycleRailMoveUtils.GetRailRelativeSideOfTarget(this.zie, e);
    }
  }
  GetRailSplineComp() {
    if (this.zie?.IsValid() && this.Hnr?.IsValid()) {
      return this.zie;
    }
  }
  GetRailSplineCurve() {
    return this.i1g || (this.zie?.IsValid() && this.Hnr?.IsValid() ? (this.i1g = new SplineCurve_1.SplineCurve(), this.i1g.Init(this.zie.SplineCurves.Position, this.zie.SplineCurves.ReparamTable.Points, this.zie.SplineCurves.Rotation, this.zie.SplineCurves.Scale), this.i1g.SetSplineTransform(Transform_1.Transform.Create(this.zie.D_GetSocketTransform(undefined)), true), this.i1g) : undefined);
  }
  GetRailSplineId() {
    if (this.EIe) {
      return this.EIe.GetPbDataId();
    } else {
      return 0;
    }
  }
  GetRailCreatureDataId() {
    if (this.EIe) {
      return this.EIe.GetCreatureDataId();
    } else {
      return 0;
    }
  }
  GetRailSplineData() {
    if (this.zie?.IsValid() && this.Hnr?.IsValid()) {
      return this.Hnr.SplineData;
    }
  }
  GetRailSplineType() {
    if (this.zie?.IsValid() && this.Hnr?.IsValid()) {
      return this.Hnr.SplineData?.Type;
    }
  }
  GetRailMoveConfigRowName() {
    return this.xrg;
  }
  GetRailMoveConfig() {
    return this.Brg;
  }
  InitRailMoveConfig(e) {
    this.Brg ||= new MotorcycleRailMoveConfigs_1.MotorcycleRailMoveConfig();
    MotorcycleRailMoveUtils_1.MotorcycleRailMoveUtils.UpdateRailMoveConfig(this.xrg, this.Brg, e);
    if (this.Pxf !== undefined) {
      this.Brg.DirectlyEnterRailConfig.EnterRailCondition.MaxAngleBetweenForwardAndRailTangent = this.Pxf;
      this.Brg.JumpToRailConfig.EnterRailCondition.MaxAngleBetweenForwardAndRailTangent = this.Pxf;
    }
  }
};
MotorcycleRailComponent.AllRailsThatPlayerInRange = new Set();
MotorcycleRailComponent = MotorcycleRailComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(339)], MotorcycleRailComponent);
exports.MotorcycleRailComponent = MotorcycleRailComponent; //# sourceMappingURL=MotorcycleRailComponent.js.map