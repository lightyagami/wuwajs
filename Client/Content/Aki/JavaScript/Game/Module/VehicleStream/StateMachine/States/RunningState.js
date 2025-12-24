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
    this.Xpf = 0;
    this.Ypf = new VehicleStreamDefine_1.MoveCheckInfo();
    this.g7m = Vector_1.Vector.Create();
    this.C7m = Vector_1.Vector.Create();
    this.Knr = Vector_1.Vector.Create();
    this.cce = Rotator_1.Rotator.Create();
    this.p7m = Vector_1.Vector.Create();
    this.I1e = Vector_1.Vector.Create();
    this.Lxf = {
      Distance: 0,
      Roadway: undefined
    };
    this.sAf = 0;
    this.aAf = 0;
    this.hAf = false;
  }
  OnCreate() {}
  OnEnter(e) {
    this.BlackBoard.CurrentAcceleratedSpeed = this.BlackBoard.AcceleratedSpeedConfig;
    this.Xpf = 1;
    if (this.BlackBoard.EngineAudio && !this.sAf) {
      this.sAf = this.BlackBoard.OpenAudio(this.BlackBoard.EngineAudio, true);
    }
  }
  OnExit(e) {
    this.Xpf = 0;
    this.BlackBoard.StopAudio(this.aAf);
    this.aAf = 0;
  }
  OnDestroy() {
    this.BlackBoard.StopAudio(this.sAf);
    this.sAf = 0;
  }
  OnEnterPlayerRange() {
    if (this.BlackBoard.EngineAudio && !this.sAf) {
      this.sAf = this.BlackBoard.OpenAudio(this.BlackBoard.EngineAudio, true);
    }
  }
  OnLeavePlayerRange() {
    this.BlackBoard.StopAudio(this.sAf);
    this.sAf = 0;
  }
  OnUpdate(e) {
    if (this.v7m(e)) {
      this.zpf();
    }
    this.RUm();
    e = this.CheckGetNextState();
    if (e) {
      this.BlackBoard.SwitchState(e, this.Ypf.BeforeMoveCheckResult);
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
  v7m(e) {
    this.BFm();
    this.dKm(e);
    return this.BlackBoard.CurrentSpeed !== 0 && (e = this.mKm(e), this.Jpf(), ModelManager_1.ModelManager.VehicleStreamModel.EnableDebug && Log_1.Log.CheckDebug() && Log_1.Log.Debug("VehicleStream", 18, "RunningState.实时信息", ["CreatureDataId", this.BlackBoard.CreatureDataId], ["CurrentRootDistance", this.BlackBoard.CurrentRootDistance], ["CurrentMeshCenterDistance", this.BlackBoard.CurrentMeshCenterDistance], ["currentSpeed", this.BlackBoard.CurrentSpeed], ["CurrentAcceleratedSpeed", this.BlackBoard.CurrentAcceleratedSpeed]), e);
  }
  BFm() {
    return !(this.BlackBoard.CurrentSplineLength - this.BlackBoard.CurrentRootDistance > 10) && !(this.EnterNextRoadway(), 0);
  }
  dKm(e) {
    e = MathCommon_1.MathCommon.Clamp(this.BlackBoard.CurrentSpeed + this.BlackBoard.CurrentAcceleratedSpeed * e * TimeUtil_1.TimeUtil.Millisecond, 0, this.BlackBoard.NormalSpeed);
    this.BlackBoard.CurrentSpeed = e;
  }
  mKm(e) {
    var t = this.Ypf.BeforeMoveCheckResult;
    this.Ypf.Reset();
    var e = e * TimeUtil_1.TimeUtil.Millisecond * this.BlackBoard.CurrentSpeed * VehicleStreamDefine_1.METER_TO_CENTIMETER;
    var i = this.BlackBoard.CurrentRootDistance;
    var s = this.Zpf(i, e);
    this.wxf(t, s);
    if (this.BlackBoard.WaitingModelBuffer) {
      this.Xpf = 0;
    }
    if (this.Xpf === 0) {
      return false;
    }
    t = Math.min(i + e, this.BlackBoard.CurrentSplineLength);
    this.Ypf.AfterMoveCheckResult = this.tvf(i, t);
    let h = t;
    if (this.Ypf.AfterMoveCheckResult !== "None" && (h = this.Ypf.AfterMoveCheckInfo.AfterAdjustDistance, Log_1.Log.CheckDebug())) {
      Log_1.Log.Debug("VehicleStream", 18, "AdjustDistance", ["checkResultType", this.Ypf.AfterMoveCheckResult], ["CreatureDataId", this.BlackBoard.CreatureDataId], ["CurrentRootDistance", this.BlackBoard.CurrentRootDistance], ["CurrentMeshCenterDistance", this.BlackBoard.CurrentMeshCenterDistance], ["AfterAdjustDistance", this.Ypf.AfterMoveCheckInfo.AfterAdjustDistance]);
    }
    this.BlackBoard.CurrentRootDistance = Math.min(h, this.BlackBoard.CurrentSplineLength);
    return i !== this.BlackBoard.CurrentRootDistance;
  }
  Zpf(e, t) {
    e = this.CheckObstruction(e, "VehicleStream.Running", t);
    if (e !== "None") {
      return e;
    } else if (this.ivf()) {
      return "Intersection";
    } else {
      return "None";
    }
  }
  ivf() {
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
  wxf(e, t) {
    switch (this.Ypf.BeforeMoveCheckResult = t) {
      case "None":
        this.Xpf = 1;
        this.BlackBoard.CurrentAcceleratedSpeed = this.BlackBoard.AcceleratedSpeedConfig;
        if (this.aAf && this.hAf) {
          this.BlackBoard.StopAudio(this.aAf);
        }
        this.aAf = 0;
        this.BlackBoard.BlockTarget = undefined;
        break;
      case "TraceBlock":
      case "SameRoadwayVehicleBlock":
      case "NextRoadwayVehicleBlock":
        {
          let e = 0;
          if (t === "TraceBlock") {
            if (this.YLe(this.ObstructionCheckInfo.HitEntityCreatureDataId) && this.dGf()) {
              this.Xpf = 0;
              break;
            }
            e = VehicleStreamDefine_1.DISTANCE_BETWEEN_PLAYER;
            this.BlackBoard.BlockTarget = this.ObstructionCheckInfo.HitEntityType;
          } else if (t === "SameRoadwayVehicleBlock") {
            e = VehicleStreamDefine_1.DISTANCE_BE_TO_OBSTRUCTION;
            this.BlackBoard.BlockTarget = Protocol_1.Aki.Protocol.kks.Proto_SceneItem;
          } else if (t === "NextRoadwayVehicleBlock") {
            e = VehicleStreamDefine_1.DISTANCE_BE_TO_NEXTVEHICLE;
            this.BlackBoard.BlockTarget = Protocol_1.Aki.Protocol.kks.Proto_SceneItem;
          }
          this.Xpf = 2;
          this.Ypf.BrakingDistance = Math.max(this.ObstructionCheckInfo.HitDistance - e, VehicleStreamDefine_1.MIN_BRAKING_DISTANCE);
          var i = this.qFm(this.Ypf.BrakingDistance);
          if ((i = Math.min(i, -1)) < this.BlackBoard.CurrentAcceleratedSpeed && (this.BlackBoard.CurrentAcceleratedSpeed = i, Log_1.Log.CheckDebug())) {
            Log_1.Log.Debug("VehicleStream", 18, "RunningState.:CurrentAcceleratedSpeedChanged,", ["checkResultType", t], ["CreatureDataId", this.BlackBoard.CreatureDataId], ["brakingDistance", this.Ypf.BrakingDistance], ["CurrentAcceleratedSpeed", this.BlackBoard.CurrentAcceleratedSpeed], ["HitChanged", this.ObstructionCheckInfo.HitChanged], ["HitDistance", this.ObstructionCheckInfo.HitDistance], ["HitTarget", this.ObstructionCheckInfo.HitEntityCreatureDataId], ["CurrentDistance", this.BlackBoard.CurrentRootDistance]);
          }
          break;
        }
      case "Intersection":
        this.BlackBoard.BlockTarget = undefined;
        if (this.Xpf !== 3 && (this.Xpf = 3, i = (this.BlackBoard.CurrentSplineLength - this.BlackBoard.CurrentRootHeadDistance) * VehicleStreamDefine_1.CENTIMETER_TO_METER, this.Ypf.BrakingDistance = Math.max(i, VehicleStreamDefine_1.MIN_BRAKING_DISTANCE), this.BlackBoard.CurrentAcceleratedSpeed = this.qFm(this.Ypf.BrakingDistance), Log_1.Log.CheckDebug())) {
          Log_1.Log.Debug("VehicleStream", 18, "RunningState.CheckBraking:RoadwayIntersection", ["CreatureDataId", this.BlackBoard.CreatureDataId], ["CurrentDistance", this.BlackBoard.CurrentRootDistance], ["CurrentMeshCenterDistance", this.BlackBoard.CurrentMeshCenterDistance], ["brakingDistance", this.Ypf.BrakingDistance], ["CurrentSpeed", this.BlackBoard.CurrentSpeed], ["CurrentAcceleratedSpeed", this.BlackBoard.CurrentAcceleratedSpeed]);
        }
    }
    if (t !== "None") {
      this.lAf(this.Ypf.BrakingDistance);
    }
    var s = e !== "TraceBlock" && t === "TraceBlock";
    if (s || e === "TraceBlock" && t !== "TraceBlock") {
      EventSystem_1.EventSystem.EmitWithTarget(this.BlackBoard.RoadNetworkNavigationComponent, EventDefine_1.EEventName.VehicleMemberBlockByTraceTarget, s);
    }
  }
  tvf(e, t) {
    this.OFm(e, t);
    this.Hkf(e, t);
    this.GFm(t);
    return this.Ypf.AfterMoveCheckInfo.Result;
  }
  OFm(s, h) {
    var e = this.BlackBoard.CurrentRoadway;
    if (e) {
      var r = ModelManager_1.ModelManager.VehicleStreamModel;
      var e = r.GetAllVehicleInRoadway(e.Id);
      if (e) {
        let t = false;
        let i = s;
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
          this.Ypf.TryUpdateAdjustDistance("CrossSameRoadwayVehicle", i);
        }
      }
    }
  }
  Hkf(i, s) {
    var h = this.BlackBoard.NextRoadway;
    if (h) {
      var r = ModelManager_1.ModelManager.VehicleStreamModel;
      var h = r.GetAllVehicleInRoadway(h.Id);
      if (h) {
        let e = false;
        let t = i;
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
          this.Ypf.TryUpdateAdjustDistance("CrossNextRoadwayVehicle", t);
        }
      }
    }
  }
  GFm(e) {
    var t = this.BlackBoard.NextRoadway;
    if (t && t instanceof UE.KuroRoadwayIntersection && ModelManager_1.ModelManager.VehicleStreamModel.CheckIntersectionRoadwayOccupied(t.Id) && e + (t = this.BlackBoard.RootCenterToHead) >= this.BlackBoard.CurrentSplineLength && this.Xpf !== 3) {
      e = this.BlackBoard.CurrentSplineLength - t;
      this.Ypf.TryUpdateAdjustDistance("HeadOverRoadOnWaitIntersection", e);
    }
  }
  Jpf() {
    if (this.Xpf !== 3 && this.Xpf !== 2) {
      this.rvf();
      this.ovf();
      this.nvf();
    }
  }
  rvf() {}
  ovf() {}
  nvf() {}
  zpf() {
    var e;
    var t = this.BlackBoard.CurrentRoadway;
    if (t) {
      e = this.BlackBoard.LastRoadway?.RoadSpline !== undefined || this.BlackBoard.CurrentRootTailDistance >= 0;
      if (ModelManager_1.ModelManager.VehicleStreamModel.EnableRotationOptimize && e) {
        this.BlackBoard.GetHeadDistanceAndRoadway(this.BlackBoard.CurrentRootDistance, this.Lxf);
        if (this.M7m(this.Lxf.Roadway, this.Lxf.Distance, this.g7m) && (this.BlackBoard.GetTailDistanceAndRoadway(this.BlackBoard.CurrentRootDistance, this.Lxf), this.M7m(this.Lxf.Roadway, this.Lxf.Distance, this.C7m))) {
          this.g7m.Subtraction(this.C7m, this.Knr);
          this.Knr.Normalize();
          this.Knr.Rotation(this.cce);
          this.BlackBoard.DesireRotator.DeepCopy(this.cce);
          this.Knr.Multiply(this.BlackBoard.RootCenterToTail, this.p7m);
          this.C7m.Addition(this.p7m, this.I1e);
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
  RUm() {
    var e = this.BlackBoard.KeyPointDistances.findIndex((e, t) => !this.BlackBoard.KeyPointDistanceSyncRecord.get(t) && this.BlackBoard.CurrentMeshHeadDistance >= e);
    if (e >= 0 && (this.BlackBoard.KeyPointDistanceSyncRecord.set(e, true), ControllerHolder_1.ControllerHolder.VehicleStreamController.RequestNetworkEntityUpdateCurRoadPush(this.BlackBoard.CreatureDataId, this.BlackBoard.CurrentRoadway?.Id ?? 0, e), Log_1.Log.CheckDebug())) {
      Log_1.Log.Debug("VehicleStream", 18, "同步keyPoint", ["CreatureDataId", this.BlackBoard.CreatureDataId], ["CurrentRoadwayId", this.BlackBoard.CurrentRoadway?.Id], ["keyPointIndex", e]);
    }
  }
  M7m(e, t, i) {
    return !!e && !!(e = e.RoadSpline?.D_GetTransformAtDistanceAlongSpline(t, 1)) && (t = e.TransformPositionNoScale(this.BlackBoard.RelativeLocationToStartWithoutX.ToUeVector()), i.DeepCopy(t), true);
  }
  qFm(e) {
    return -(this.BlackBoard.CurrentSpeed * this.BlackBoard.CurrentSpeed) / (e * 2);
  }
  YLe(e) {
    return e === Global_1.Global.BaseCharacter?.CharacterActorComponent?.CreatureData.GetCreatureDataId();
  }
  dGf() {
    var e = this.BlackBoard.RoadNetworkNavigationComponent.GetShowActor();
    return !!e?.IsValid && !e.WasRecentlyRenderedOnScreen();
  }
  lAf(e) {
    this.hAf = e > VehicleStreamDefine_1.MIN_BRAKING_DISTANCE;
    e = this.hAf ? this.BlackBoard.BrakingAudio : this.BlackBoard.BrakingShortAudio;
    if (e && !this.aAf) {
      this.aAf = this.BlackBoard.OpenAudio(e, this.hAf);
    }
  }
}
exports.RunningState = RunningState;
//# sourceMappingURL=RunningState.js.map