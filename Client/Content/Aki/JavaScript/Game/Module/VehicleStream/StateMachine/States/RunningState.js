"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RunningState = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const MathCommon_1 = require("../../../../../Core/Utils/Math/MathCommon");
const Rotator_1 = require("../../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const Global_1 = require("../../../../Global");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const VehicleStreamDefine_1 = require("../../VehicleStreamDefine");
const VehicleStateBase_1 = require("./VehicleStateBase");
class RunningState extends VehicleStateBase_1.VehicleStateBase {
  constructor() {
    super(...arguments);
    this.DSf = 0;
    this.USf = new VehicleStreamDefine_1.MoveCheckInfo();
    this.p9m = Vector_1.Vector.Create();
    this.v9m = Vector_1.Vector.Create();
    this.Knr = Vector_1.Vector.Create();
    this.cce = Rotator_1.Rotator.Create();
    this.y9m = Vector_1.Vector.Create();
    this.I1e = Vector_1.Vector.Create();
    this.gFf = {
      Distance: 0,
      Roadway: undefined
    };
    this.f2f = 0;
    this.g2f = 0;
    this.C2f = false;
  }
  OnCreate() {}
  OnEnter(e) {
    this.BlackBoard.CurrentAcceleratedSpeed = this.BlackBoard.AcceleratedSpeedConfig;
    this.DSf = 1;
    if (this.BlackBoard.EngineAudio && !this.f2f) {
      this.f2f = this.BlackBoard.OpenAudio(this.BlackBoard.EngineAudio, true);
    }
  }
  OnExit(e) {
    this.DSf = 0;
    this.BlackBoard.StopAudio(this.g2f);
    this.g2f = 0;
  }
  OnDestroy() {
    this.BlackBoard.StopAudio(this.f2f);
    this.f2f = 0;
  }
  OnEnterPlayerRange() {
    if (this.BlackBoard.EngineAudio && !this.f2f) {
      this.f2f = this.BlackBoard.OpenAudio(this.BlackBoard.EngineAudio, true);
    }
  }
  OnLeavePlayerRange() {
    this.BlackBoard.StopAudio(this.f2f);
    this.f2f = 0;
  }
  OnUpdate(e) {
    if (this.S9m(e)) {
      this.xSf();
    }
    this.exm();
    e = this.CheckGetNextState();
    if (e) {
      this.BlackBoard.SwitchState(e, this.USf.BeforeMoveCheckResult);
    }
  }
  CheckGetNextState() {
    if (this.BlackBoard.CheckArrivedDestination()) {
      return 4;
    } else if (this.BlackBoard.CurrentSpeed <= 0) {
      return 3;
    } else {
      return 0;
    }
  }
  S9m(e) {
    this.e3m();
    this.V8g();
    if (this.BlackBoard.WaitingModelBuffer) {
      this.DSf = 4;
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("VehicleStream", 18, "RunningState.WaitingModelBuffer", ["CreatureDataId", this.BlackBoard.CreatureDataId], ["currentSpeed", this.BlackBoard.CurrentSpeed], ["IsComponentTickEnabled", this.BlackBoard.RoadNetworkNavigationComponent.IsModelBufferCompTickEnabled()]);
      }
      return false;
    } else {
      return this.DSf !== 0 && (this.BYm(e), this.BlackBoard.CurrentSpeed !== 0) && (e = this.H8g(e), this.BSf(), ModelManager_1.ModelManager.VehicleStreamModel.EnableDebug && Log_1.Log.CheckDebug() && Log_1.Log.Debug("VehicleStream", 18, "RunningState.实时信息", ["CreatureDataId", this.BlackBoard.CreatureDataId], ["CurrentRootDistance", this.BlackBoard.CurrentRootDistance], ["CurrentMeshCenterDistance", this.BlackBoard.CurrentMeshCenterDistance], ["currentSpeed", this.BlackBoard.CurrentSpeed], ["CurrentAcceleratedSpeed", this.BlackBoard.CurrentAcceleratedSpeed]), e);
    }
  }
  e3m() {
    return !(this.BlackBoard.CurrentSplineLength - this.BlackBoard.CurrentRootDistance > 10) && !(this.EnterNextRoadway(), 0);
  }
  V8g() {
    var e = this.USf.BeforeMoveCheckResult;
    this.USf.Reset();
    var t = this.kSf(this.BlackBoard.CurrentRootDistance);
    this.CFf(e, t);
  }
  BYm(e) {
    e = MathCommon_1.MathCommon.Clamp(this.BlackBoard.CurrentSpeed + this.BlackBoard.CurrentAcceleratedSpeed * e * TimeUtil_1.TimeUtil.Millisecond, 0, this.BlackBoard.NormalSpeed);
    this.BlackBoard.CurrentSpeed = e;
  }
  H8g(e) {
    var t = this.BlackBoard.CurrentRootDistance;
    var e = e * TimeUtil_1.TimeUtil.Millisecond * this.BlackBoard.CurrentSpeed * VehicleStreamDefine_1.METER_TO_CENTIMETER;
    var e = Math.min(t + e, this.BlackBoard.CurrentSplineLength);
    this.USf.AfterMoveCheckResult = this.OSf(t, e);
    let i = e;
    if (this.USf.AfterMoveCheckResult !== "None" && (i = this.USf.AfterMoveCheckInfo.AfterAdjustDistance, Log_1.Log.CheckDebug())) {
      Log_1.Log.Debug("VehicleStream", 18, "AdjustDistance", ["checkResultType", this.USf.AfterMoveCheckResult], ["CreatureDataId", this.BlackBoard.CreatureDataId], ["beforeMoveDistance", t], ["CurrentMeshCenterDistance", this.BlackBoard.CurrentMeshCenterDistance], ["AfterMoveDistance", e], ["AfterAdjustDistance", this.USf.AfterMoveCheckInfo.AfterAdjustDistance]);
    }
    this.BlackBoard.CurrentRootDistance = Math.min(i, this.BlackBoard.CurrentSplineLength);
    return t !== this.BlackBoard.CurrentRootDistance;
  }
  kSf(e) {
    e = this.CheckObstruction(e, "VehicleStream.Running");
    if (e !== "None") {
      return e;
    } else if (this.GSf()) {
      return "Intersection";
    } else {
      return "None";
    }
  }
  GSf() {
    var e = this.BlackBoard.NextRoadway;
    if (e && e instanceof UE.KuroRoadwayIntersection) {
      e = ModelManager_1.ModelManager.VehicleStreamModel.CheckIntersectionRoadwayOccupied(e.Id);
      if (e) {
        if ((this.BlackBoard.CurrentSplineLength - this.BlackBoard.CurrentRootHeadDistance) * VehicleStreamDefine_1.CENTIMETER_TO_METER <= VehicleStreamDefine_1.INTERSECTION_CEHCKDISTANCE) {
          return true;
        }
      }
    }
    return false;
  }
  CFf(e, t) {
    switch (this.USf.BeforeMoveCheckResult = t) {
      case "None":
        this.DSf = 1;
        this.BlackBoard.CurrentAcceleratedSpeed = this.BlackBoard.AcceleratedSpeedConfig;
        if (this.g2f && this.C2f) {
          this.BlackBoard.StopAudio(this.g2f);
        }
        this.g2f = 0;
        this.BlackBoard.BlockTarget = undefined;
        break;
      case "TraceBlock":
      case "CheckPlayerBlock":
      case "SameRoadwayVehicleBlock":
      case "NextRoadwayVehicleBlock":
        this.BlackBoard.BlockTarget = this.ObstructionCheckInfo.HitEntityType;
        this.DSf = 2;
        this.USf.BrakingDistance = Math.max(this.ObstructionCheckInfo.HitDistance - this.ObstructionCheckInfo.DistanceToKeep, VehicleStreamDefine_1.MIN_BRAKING_DISTANCE);
        var i = this.i3m(this.USf.BrakingDistance);
        if ((i = Math.min(i, -1)) < this.BlackBoard.CurrentAcceleratedSpeed && (this.BlackBoard.CurrentAcceleratedSpeed = i, Log_1.Log.CheckDebug())) {
          Log_1.Log.Debug("VehicleStream", 18, "RunningState.:CurrentAcceleratedSpeedChanged,", ["checkResultType", t], ["CreatureDataId", this.BlackBoard.CreatureDataId], ["brakingDistance", this.USf.BrakingDistance], ["CurrentAcceleratedSpeed", this.BlackBoard.CurrentAcceleratedSpeed], ["HitChanged", this.ObstructionCheckInfo.HitChanged], ["HitDistance", this.ObstructionCheckInfo.HitDistance], ["HitTarget", this.ObstructionCheckInfo.HitEntityCreatureDataId], ["CurrentDistance", this.BlackBoard.CurrentRootDistance]);
        }
        break;
      case "Intersection":
        this.BlackBoard.BlockTarget = undefined;
        if (this.DSf !== 3 && (this.DSf = 3, i = (this.BlackBoard.CurrentSplineLength - this.BlackBoard.CurrentRootHeadDistance) * VehicleStreamDefine_1.CENTIMETER_TO_METER, this.USf.BrakingDistance = Math.max(i, VehicleStreamDefine_1.MIN_BRAKING_DISTANCE), this.BlackBoard.CurrentAcceleratedSpeed = this.i3m(this.USf.BrakingDistance), Log_1.Log.CheckDebug())) {
          Log_1.Log.Debug("VehicleStream", 18, "RunningState.CheckBraking:RoadwayIntersection", ["CreatureDataId", this.BlackBoard.CreatureDataId], ["CurrentDistance", this.BlackBoard.CurrentRootDistance], ["CurrentMeshCenterDistance", this.BlackBoard.CurrentMeshCenterDistance], ["brakingDistance", this.USf.BrakingDistance], ["CurrentSpeed", this.BlackBoard.CurrentSpeed], ["CurrentAcceleratedSpeed", this.BlackBoard.CurrentAcceleratedSpeed]);
        }
    }
    if (t !== "None") {
      this.p2f(this.USf.BrakingDistance);
    }
    if (ModelManager_1.ModelManager.VehicleStreamModel.EnableDebug && Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("VehicleStream", 18, "RunningState:BeforeMoveCheckResult", ["CreatureDataId", this.BlackBoard.CreatureDataId], ["checkResultType", t], ["lastMoveCheckResult", e], ["HitChanged", this.ObstructionCheckInfo.HitChanged], ["HitEntityType", this.ObstructionCheckInfo.HitEntityType], ["CurrentDistance", this.BlackBoard.CurrentRootDistance]);
    }
    var s = e !== "TraceBlock" && t === "TraceBlock";
    if (s || e === "TraceBlock" && t !== "TraceBlock") {
      EventSystem_1.EventSystem.EmitWithTarget(this.BlackBoard.RoadNetworkNavigationComponent, EventDefine_1.EEventName.VehicleMemberBlockByTraceTarget, s);
    }
  }
  OSf(e, t) {
    this.j8g(e, t);
    this.r3m(e, t);
    this.O3f(e, t);
    this.o3m(t);
    return this.USf.AfterMoveCheckInfo.Result;
  }
  j8g(t, i) {
    var s = Global_1.Global.BaseCharacter?.CharacterActorComponent;
    if (this.BlackBoard.IsInPlayerRange && !this.BlackBoard.RoadNetworkNavigationComponent.WasRecentlyRenderedOnScreen() && s) {
      var h = this.BlackBoard.BlockTarget === Protocol_1.Aki.Protocol.kks.Proto_Player;
      if (!h) {
        h = this.BlackBoard.CurrentRoadway?.RoadSpline;
        if (h) {
          var s = s.ActorLocation;
          let e = 0;
          if (this.ObstructionCheckInfo.PlayerHitDistance) {
            e = this.ObstructionCheckInfo.PlayerHitDistance;
          } else {
            const r = h.D_GetTransformAtDistanceAlongSpline(i, 1).InverseTransformPosition(s);
            e = (r.X - this.BlackBoard.RootCenterToHead) * VehicleStreamDefine_1.CENTIMETER_TO_METER;
          }
          if (!(e <= 0)) {
            const r = h.D_GetTransformAtDistanceAlongSpline(i, 1).InverseTransformPosition(s);
            if (!((r.X - this.BlackBoard.RootCenterToHead) * VehicleStreamDefine_1.CENTIMETER_TO_METER >= 0)) {
              i = h.D_FindInputKeyClosestToWorldLocation(s);
              s = h.GetDistanceAlongSplineAtSplineInputKey(i);
              h = VehicleStreamDefine_1.DISTANCE_BETWEEN_PLAYER * VehicleStreamDefine_1.METER_TO_CENTIMETER + this.BlackBoard.RootCenterToHead;
              i = Math.max(s - h, t);
              this.USf.TryUpdateAdjustDistance("CrossPlayer", i);
            }
          }
        }
      }
    }
  }
  r3m(s, h) {
    var e = this.BlackBoard.CurrentRoadway;
    if (e) {
      var r = ModelManager_1.ModelManager.VehicleStreamModel;
      var e = r.GetAllVehicleInRoadway(e.Id);
      if (e) {
        let t = false;
        let i = h;
        for (const l of e) {
          if (l !== this.BlackBoard.CreatureDataId) {
            var a = r.GetVehicleTeamMember(l);
            if (a) {
              var n = a.GetRelativeLocation();
              var n = Math.abs(n.Y - this.BlackBoard.RelativeLocationToStart.Y);
              if (!(n > (a.GetVehicleSize().Y + this.BlackBoard.VehicleSize.Y) * 0.5)) {
                let e = true;
                switch (this.CheckPositionalRelationshipToTarget(s, a.GetCurrentMeshHeadDistance(), a.GetCurrentMeshTailDistance())) {
                  case 1:
                    t = true;
                    if (s < i) {
                      i = s;
                    }
                    e = false;
                    if (Log_1.Log.CheckError()) {
                      Log_1.Log.Error("VehicleStream", 18, "发现载具重叠", ["SelfCreatureDataId", this.BlackBoard.CreatureDataId], ["TargetCreatureDataId", this.BlackBoard.CreatureDataId]);
                    }
                    break;
                  case 2:
                  case 3:
                  case 4:
                    e = false;
                }
                if (e) {
                  switch (this.CheckPositionalRelationshipToTarget(h, a.GetCurrentMeshHeadDistance(), a.GetCurrentMeshTailDistance())) {
                    case 0:
                      break;
                    case 1:
                    case 3:
                    case 4:
                      t = true;
                      var o = a.GetCurrentMeshCenterDistance();
                      var c = this.BlackBoard.RootCenterToHead + a.GetMeshCenterToTail();
                      var c = VehicleStreamDefine_1.DISTANCE_BE_TO_OBSTRUCTION * VehicleStreamDefine_1.METER_TO_CENTIMETER + c;
                      if (c < o - s && (o = o - c + 100) < i) {
                        i = o;
                      }
                  }
                }
              }
            }
          }
        }
        if (t) {
          this.USf.TryUpdateAdjustDistance("CrossSameRoadwayVehicle", i);
        }
      }
    }
  }
  O3f(i, s) {
    var h = this.BlackBoard.NextRoadway;
    if (h) {
      var r = ModelManager_1.ModelManager.VehicleStreamModel;
      var h = r.GetAllVehicleInRoadway(h.Id);
      if (h) {
        let e = false;
        let t = s;
        for (const d of h) {
          if (d !== this.BlackBoard.CreatureDataId) {
            var a = r.GetVehicleTeamMember(d);
            if (a) {
              var n = a.GetRelativeLocation();
              var n = Math.abs(n.Y - this.BlackBoard.RelativeLocationToStart.Y);
              if (!(n > (a.GetVehicleSize().Y + this.BlackBoard.VehicleSize.Y) * 0.5)) {
                var o = this.BlackBoard.CurrentSplineLength;
                switch (this.CheckPositionalRelationshipToTarget(s, o + a.GetCurrentMeshHeadDistance(), o + a.GetCurrentMeshTailDistance())) {
                  case 0:
                    break;
                  case 1:
                  case 3:
                  case 4:
                    e = true;
                    var c = a.GetCurrentMeshCenterDistance();
                    var l = o - i;
                    var _ = this.BlackBoard.RootCenterToHead + a.GetMeshCenterToTail();
                    var _ = VehicleStreamDefine_1.DISTANCE_BE_TO_NEXTVEHICLE * VehicleStreamDefine_1.METER_TO_CENTIMETER + _;
                    if (_ < c + l) {
                      let e = c - _;
                      if (e < 0) {
                        e += o;
                      }
                      if (e < t) {
                        t = e;
                      }
                    }
                }
              }
            }
          }
        }
        if (e) {
          this.USf.TryUpdateAdjustDistance("CrossNextRoadwayVehicle", t);
        }
      }
    }
  }
  o3m(e) {
    var t = this.BlackBoard.NextRoadway;
    if (t && t instanceof UE.KuroRoadwayIntersection && ModelManager_1.ModelManager.VehicleStreamModel.CheckIntersectionRoadwayOccupied(t.Id) && e + (t = this.BlackBoard.RootCenterToHead) >= this.BlackBoard.CurrentSplineLength && this.DSf !== 3) {
      e = this.BlackBoard.CurrentSplineLength - t;
      this.USf.TryUpdateAdjustDistance("HeadOverRoadOnWaitIntersection", e);
    }
  }
  BSf() {
    if (this.DSf !== 3 && this.DSf !== 2) {
      this.FSf();
      this.NSf();
      this.VSf();
    }
  }
  FSf() {}
  NSf() {}
  VSf() {}
  xSf() {
    var e;
    var t = this.BlackBoard.CurrentRoadway;
    if (t) {
      e = this.BlackBoard.LastRoadway?.RoadSpline !== undefined || this.BlackBoard.CurrentRootTailDistance >= 0;
      if (ModelManager_1.ModelManager.VehicleStreamModel.EnableRotationOptimize && e) {
        this.BlackBoard.GetHeadDistanceAndRoadway(this.BlackBoard.CurrentRootDistance, this.gFf);
        if (this.I9m(this.gFf.Roadway, this.gFf.Distance, this.p9m) && (this.BlackBoard.GetTailDistanceAndRoadway(this.BlackBoard.CurrentRootDistance, this.gFf), this.I9m(this.gFf.Roadway, this.gFf.Distance, this.v9m))) {
          this.p9m.Subtraction(this.v9m, this.Knr);
          this.Knr.Normalize();
          this.Knr.Rotation(this.cce);
          this.BlackBoard.DesireRotator.DeepCopy(this.cce);
          this.Knr.Multiply(this.BlackBoard.RootCenterToTail, this.y9m);
          this.v9m.Addition(this.y9m, this.I1e);
          this.BlackBoard.DesireLocation.DeepCopy(this.I1e);
          this.BlackBoard.UpdateMoved = true;
        }
      } else if (e = t.RoadSpline?.D_GetTransformAtDistanceAlongSpline(this.BlackBoard.CurrentRootDistance, 1)) {
        t = e.TransformPositionNoScale(this.BlackBoard.RelativeLocationToStartWithoutX.ToUeVector());
        this.BlackBoard.DesireLocation.DeepCopy(t);
        this.BlackBoard.DesireRotator.DeepCopy(e.GetRotation().Rotator());
        this.BlackBoard.UpdateMoved = true;
      }
    }
  }
  exm() {
    var e = this.BlackBoard.KeyPointDistances.findIndex((e, t) => !this.BlackBoard.KeyPointDistanceSyncRecord.get(t) && this.BlackBoard.CurrentMeshHeadDistance >= e);
    if (e >= 0 && (this.BlackBoard.KeyPointDistanceSyncRecord.set(e, true), ControllerHolder_1.ControllerHolder.VehicleStreamController.RequestNetworkEntityUpdateCurRoadPush(this.BlackBoard.CreatureDataId, this.BlackBoard.CurrentRoadway?.Id ?? 0, e), Log_1.Log.CheckDebug())) {
      Log_1.Log.Debug("VehicleStream", 18, "同步keyPoint", ["CreatureDataId", this.BlackBoard.CreatureDataId], ["CurrentRoadwayId", this.BlackBoard.CurrentRoadway?.Id], ["keyPointIndex", e]);
    }
  }
  I9m(e, t, i) {
    return !!e && !!(e = e.RoadSpline?.D_GetTransformAtDistanceAlongSpline(t, 1)) && (t = e.TransformPositionNoScale(this.BlackBoard.RelativeLocationToStartWithoutX.ToUeVector()), i.DeepCopy(t), true);
  }
  i3m(e) {
    return -(this.BlackBoard.CurrentSpeed * this.BlackBoard.CurrentSpeed) / (e * 2);
  }
  p2f(e) {
    this.C2f = e > VehicleStreamDefine_1.MIN_BRAKING_DISTANCE;
    e = this.C2f ? this.BlackBoard.BrakingAudio : this.BlackBoard.BrakingShortAudio;
    if (e && !this.g2f) {
      this.g2f = this.BlackBoard.OpenAudio(e, this.C2f);
    }
  }
}
exports.RunningState = RunningState;
//# sourceMappingURL=RunningState.js.map