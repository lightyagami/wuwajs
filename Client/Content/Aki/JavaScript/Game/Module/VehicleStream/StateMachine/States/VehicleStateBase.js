"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VehicleStateBase = undefined;
const UE = require("ue");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const Transform_1 = require("../../../../../Core/Utils/Math/Transform");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const TraceElementCommon_1 = require("../../../../../Core/Utils/TraceElementCommon");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ActorUtils_1 = require("../../../../Utils/ActorUtils");
const VehicleStreamDefine_1 = require("../../VehicleStreamDefine");
class VehicleStateBase {
  constructor(e, t) {
    this.State = e;
    this.BlackBoard = t;
    this.HitLocation = Vector_1.Vector.Create();
    this.StartTracePosition = Vector_1.Vector.Create();
    this.EndTracePosition = Vector_1.Vector.Create();
    this.LocalHitPoint = Vector_1.Vector.Create();
    this.TraceRotator = new UE.Rotator();
    this.E7m = new VehicleStreamDefine_1.ObstructionCheckInfo();
    this.ObstructionCheckInfo = new VehicleStreamDefine_1.ObstructionCheckInfo();
    this.TmpTransform = Transform_1.Transform.Create();
  }
  Create() {
    this.OnCreate();
  }
  Update(e) {
    this.OnUpdate(e);
  }
  Enter(e, ...t) {
    this.OnEnter(e, ...t);
  }
  Exit(e) {
    this.OnExit(e);
  }
  Destroy() {
    var e = this.BlackBoard.CurrentRoadway;
    if (e) {
      ModelManager_1.ModelManager.VehicleStreamModel.ExitRoadway(e.Id, this.BlackBoard.CreatureDataId);
    }
    this.OnDestroy();
  }
  OnEnterPlayerRange() {}
  OnLeavePlayerRange() {}
  CheckGetNextState() {
    return 0;
  }
  CheckObstruction(e, t, i) {
    this.ObstructionCheckInfo.Reset();
    e = this.I7m(e, t, i);
    this.ObstructionCheckInfo.HitChanged = this.E7m.IsHitTargetChanged(this.ObstructionCheckInfo);
    this.E7m.DeepCopy(this.ObstructionCheckInfo);
    return e;
  }
  I7m(e, t, i) {
    if (this.lue(t, i)) {
      this.ObstructionCheckInfo.CheckResultType = "TraceBlock";
    } else if (this.wUm(e)) {
      this.ObstructionCheckInfo.CheckResultType = "SameRoadwayVehicleBlock";
    } else if (this.T7m(e)) {
      this.ObstructionCheckInfo.CheckResultType = "NextRoadwayVehicleBlock";
    }
    return this.ObstructionCheckInfo.CheckResultType;
  }
  lue(e, t) {
    var i = this.BlackBoard.BoxTrace;
    if (!i) {
      return false;
    }
    const r = this.BlackBoard.RoadNetworkNavigationComponent;
    var s = r.SkeletalMeshComponentToWorld;
    if (!s) {
      return false;
    }
    this.TmpTransform.FromUeTransform(s);
    i.WorldContextObject = r.GetActor();
    this.TmpTransform.TransformPositionNoScale(this.BlackBoard.BoxTracePosition, this.StartTracePosition);
    let h = 0;
    if (t) {
      h = Math.min(t, this.BlackBoard.NormalSpeed * 2 * VehicleStreamDefine_1.METER_TO_CENTIMETER);
    }
    this.BlackBoard.BoxTraceEndPosition.X = this.BlackBoard.BoxTracePosition.X + h;
    this.TmpTransform.TransformPositionNoScale(this.BlackBoard.BoxTraceEndPosition, this.EndTracePosition);
    TraceElementCommon_1.TraceElementCommon.SetStartLocation(i, this.StartTracePosition);
    TraceElementCommon_1.TraceElementCommon.SetEndLocation(i, this.EndTracePosition);
    TraceElementCommon_1.TraceElementCommon.SetBoxOrientation(i, this.TmpTransform.ToUeTransform().Rotator());
    TraceElementCommon_1.TraceElementCommon.BoxTrace(i, e);
    if (!i.HitResult) {
      return false;
    }
    var a = i.HitResult.Actors;
    var n = i.HitResult.GetHitCount();
    if (!n) {
      return false;
    }
    var o = r.GetObstacleDetectionType();
    let l = false;
    this.ObstructionCheckInfo.HitDistance = Number.MAX_SAFE_INTEGER;
    for (let t = 0; t < n; t++) {
      var c = a.Get(t);
      if (c?.IsValid()) {
        let e = ActorUtils_1.ActorUtils.GetEntityByActor(c, false);
        if ((e = e || ModelManager_1.ModelManager.SceneInteractionModel.GetEntityByActor(c, true)) && e.Entity) {
          var _;
          var m;
          var c = e.Entity.GetComponent(0);
          if (c && c?.GetCreatureDataId() !== this.BlackBoard.CreatureDataId) {
            const r = e.Entity.GetComponent(338);
            if (!r && (c = c.GetEntityType(), o === undefined || (0, VehicleStreamDefine_1.checkObstacleDetectionTypeMatch)(o, c))) {
              TraceElementCommon_1.TraceElementCommon.GetImpactPoint(i.HitResult, t, this.HitLocation);
              this.TmpTransform.InverseTransformPosition(this.HitLocation, this.LocalHitPoint);
              if ((_ = (this.LocalHitPoint.X - this.BlackBoard.RootCenterToHead) * VehicleStreamDefine_1.CENTIMETER_TO_METER) <= 0) {
                if (c === Protocol_1.Aki.Protocol.kks.Proto_Player && (l = true, (m = VehicleStreamDefine_1.DISTANCE_BETWEEN_PLAYER * 2) < this.ObstructionCheckInfo.HitDistance)) {
                  this.ObstructionCheckInfo.HitEntityCreatureDataId = e.CreatureDataId;
                  this.ObstructionCheckInfo.HitDistance = m;
                  this.ObstructionCheckInfo.HitEntityType = c;
                }
              } else {
                l = true;
                if (_ < this.ObstructionCheckInfo.HitDistance) {
                  this.ObstructionCheckInfo.HitEntityCreatureDataId = e.CreatureDataId;
                  this.ObstructionCheckInfo.HitDistance = _;
                  this.ObstructionCheckInfo.HitEntityType = c;
                }
              }
            }
          }
        }
      }
    }
    return l;
  }
  wUm(e) {
    var t = this.BlackBoard.CurrentRoadway;
    if (!t) {
      return false;
    }
    var i;
    var r;
    var s;
    var h = ModelManager_1.ModelManager.VehicleStreamModel;
    var t = h.GetAllVehicleInRoadway(t.Id);
    if (!t || t.size === 0) {
      return false;
    }
    let a = false;
    this.ObstructionCheckInfo.HitDistance = Number.MAX_SAFE_INTEGER;
    for (const n of t) {
      if (n !== this.BlackBoard.CreatureDataId && (i = h.GetVehicleTeamMember(n))) {
        s = i.GetRelativeLocation();
        if (!(Math.abs(s.Y - this.BlackBoard.RelativeLocationToStart.Y) > (i.GetVehicleSize().Y + this.BlackBoard.VehicleSize.Y) * 0.5) && !(s = e + this.BlackBoard.RootCenterToHead, r = i.GetCurrentMeshHeadDistance(), i = i.GetVehicleSize().X * VehicleStreamDefine_1.CENTIMETER_TO_METER, r = (r - s) * VehicleStreamDefine_1.CENTIMETER_TO_METER, s = VehicleStreamDefine_1.DISTANCE_BE_TO_OBSTRUCTION + VehicleStreamDefine_1.MAX_BRAKING_DISTANCE_WHEN_CHECKOBSTRUCTION + i, r <= 0) && !(s <= r)) {
          a = true;
          if ((s = r - i) < this.ObstructionCheckInfo.HitDistance) {
            this.ObstructionCheckInfo.HitEntityCreatureDataId = n;
            this.ObstructionCheckInfo.HitDistance = s;
          }
        }
      }
    }
    return a;
  }
  T7m(e) {
    var t = this.BlackBoard.NextRoadway;
    if (!t) {
      return false;
    }
    var i;
    var r;
    var s;
    var h;
    var a = ModelManager_1.ModelManager.VehicleStreamModel;
    var t = a.GetAllVehicleInRoadway(t.Id);
    if (!t || t.size === 0) {
      return false;
    }
    let n = false;
    for (const o of t) {
      if (o !== this.BlackBoard.CreatureDataId && (i = a.GetVehicleTeamMember(o))) {
        h = i.GetRelativeLocation();
        if (!(Math.abs(h.Y - this.BlackBoard.RelativeLocationToStart.Y) > (i.GetVehicleSize().Y + this.BlackBoard.VehicleSize.Y) * 0.5) && !(h = e + this.BlackBoard.RootCenterToHead, s = i.GetCurrentMeshHeadDistance(), h = this.BlackBoard.CurrentSplineLength - h, i = i.GetVehicleSize().X * VehicleStreamDefine_1.CENTIMETER_TO_METER, r = VehicleStreamDefine_1.DISTANCE_BE_TO_NEXTVEHICLE + VehicleStreamDefine_1.MAX_BRAKING_DISTANCE_WHEN_CHECKOBSTRUCTION + i, (s = (s + h) * VehicleStreamDefine_1.CENTIMETER_TO_METER) <= 0) && !(r <= s)) {
          n = true;
          if ((h = s - i) < this.ObstructionCheckInfo.HitDistance) {
            this.ObstructionCheckInfo.HitEntityCreatureDataId = o;
            this.ObstructionCheckInfo.HitDistance = h;
          }
        }
      }
    }
    return n;
  }
  CheckPositionalRelationshipToTarget(e, t, i) {
    var r = e + this.BlackBoard.RootCenterToHead;
    var e = e - this.BlackBoard.RootCenterToTail;
    if (t < e) {
      return 4;
    } else if (r < i) {
      return 0;
    } else if (r === t && e === i) {
      return 2;
    } else if (t < r) {
      return 3;
    } else {
      return 1;
    }
  }
  EnterNextRoadway() {
    var e = this.BlackBoard.CurrentRoadway;
    if (e) {
      ModelManager_1.ModelManager.VehicleStreamModel.ExitRoadway(e.Id, this.BlackBoard.CreatureDataId);
    }
    var e = this.BlackBoard.EnterNextRoadway();
    if (e) {
      ModelManager_1.ModelManager.VehicleStreamModel.EnterRoadway(e.Id, this.BlackBoard.CreatureDataId);
      var t = e.RoadSpline;
      var i = t.GetNumberOfSplinePoints();
      this.BlackBoard.KeyPointDistances.length = 0;
      this.BlackBoard.KeyPointDistanceSyncRecord.clear();
      for (let e = 0; e < i; e++) {
        var r = t.GetDistanceAlongSplineAtSplinePoint(e);
        this.BlackBoard.KeyPointDistances.push(r);
        this.BlackBoard.KeyPointDistanceSyncRecord.set(e, false);
      }
    }
  }
  OnCreate() {}
  OnUpdate(e) {}
  OnEnter(e) {}
  OnExit(e) {}
  OnDestroy() {}
}
exports.VehicleStateBase = VehicleStateBase;
//# sourceMappingURL=VehicleStateBase.js.map