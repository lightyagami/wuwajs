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
const Global_1 = require("../../../../Global");
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
    this.T9m = new VehicleStreamDefine_1.ObstructionCheckInfo();
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
    this.OnDestroy();
  }
  OnEnterPlayerRange() {}
  OnLeavePlayerRange() {}
  CheckGetNextState() {
    return 0;
  }
  CheckObstruction(e, t) {
    this.ObstructionCheckInfo.Reset();
    this.b9m(e, t);
    this.ObstructionCheckInfo.HitChanged = this.T9m.IsHitTargetChanged(this.ObstructionCheckInfo);
    this.T9m.DeepCopy(this.ObstructionCheckInfo);
    return this.ObstructionCheckInfo.CheckResultType;
  }
  b9m(e, t) {
    if (!this.lue(t)) {
      this.$8g();
    }
    if (!this.txm(e)) {
      this.R9m(e);
    }
  }
  lue(e) {
    var i = this.BlackBoard.BoxTrace;
    if (!i) {
      return false;
    }
    const r = this.BlackBoard.RoadNetworkNavigationComponent;
    var t = r.SkeletalMeshComponentToWorld;
    if (!t) {
      return false;
    }
    this.TmpTransform.FromUeTransform(t);
    i.WorldContextObject = r.GetActor();
    this.TmpTransform.TransformPositionNoScale(this.BlackBoard.BoxTracePosition, this.StartTracePosition);
    this.TmpTransform.TransformPositionNoScale(this.BlackBoard.BoxTraceEndPosition, this.EndTracePosition);
    TraceElementCommon_1.TraceElementCommon.SetStartLocation(i, this.StartTracePosition);
    TraceElementCommon_1.TraceElementCommon.SetEndLocation(i, this.EndTracePosition);
    TraceElementCommon_1.TraceElementCommon.SetBoxOrientation(i, this.TmpTransform.ToUeTransform().Rotator());
    TraceElementCommon_1.TraceElementCommon.BoxTrace(i, e);
    if (!i.HitResult) {
      return false;
    }
    var h = i.HitResult.Actors;
    var s = i.HitResult.GetHitCount();
    if (!s) {
      return false;
    }
    var a = r.GetObstacleDetectionType();
    for (let t = 0; t < s; t++) {
      var o = h.Get(t);
      if (o?.IsValid()) {
        let e = ActorUtils_1.ActorUtils.GetEntityByActor(o, false);
        if ((e = e || ModelManager_1.ModelManager.SceneInteractionModel.GetEntityByActor(o, true)) && e.Entity) {
          var n;
          var o = e.Entity.GetComponent(0);
          if (o && o?.GetCreatureDataId() !== this.BlackBoard.CreatureDataId) {
            const r = e.Entity.GetComponent(340);
            if (!r && (o = o.GetEntityType(), a === undefined || (0, VehicleStreamDefine_1.checkObstacleDetectionTypeMatch)(a, o))) {
              TraceElementCommon_1.TraceElementCommon.GetImpactPoint(i.HitResult, t, this.HitLocation);
              this.TmpTransform.InverseTransformPosition(this.HitLocation, this.LocalHitPoint);
              if ((n = (this.LocalHitPoint.X - this.BlackBoard.RootCenterToHead) * VehicleStreamDefine_1.CENTIMETER_TO_METER) <= 0) {
                if (o === Protocol_1.Aki.Protocol.kks.Proto_Player) {
                  this.ObstructionCheckInfo.TryUpdateHitDistance("TraceBlock", e.CreatureDataId, o, VehicleStreamDefine_1.DISTANCE_BETWEEN_PLAYER * 2, true);
                }
              } else {
                this.ObstructionCheckInfo.TryUpdateHitDistance("TraceBlock", e.CreatureDataId, o, n, this.YLe(e.CreatureDataId));
              }
            }
          }
        }
      }
    }
    return this.ObstructionCheckInfo.CheckResultType === "TraceBlock";
  }
  $8g() {
    var e;
    var t;
    var i = Global_1.Global.BaseCharacter?.CharacterActorComponent;
    return !!this.BlackBoard.IsInPlayerRange && !!i && !!(t = this.BlackBoard.RoadNetworkNavigationComponent.GetActorComponent()) && !(e = i.ActorLocation, t = t.ActorTransform.InverseTransformPosition(e), Math.abs(t.Y) > this.BlackBoard.VehicleSize.Y * 0.5) && !(this.ObstructionCheckInfo.PlayerHitDistance = (t.X - this.BlackBoard.RootCenterToHead) * VehicleStreamDefine_1.CENTIMETER_TO_METER, this.ObstructionCheckInfo.PlayerHitDistance < 0) && !(this.ObstructionCheckInfo.PlayerHitDistance > VehicleStreamDefine_1.DISTANCE_BETWEEN_PLAYER + VehicleStreamDefine_1.MAX_BRAKING_DISTANCE_WHEN_CHECKOBSTRUCTION) && !(this.ObstructionCheckInfo.TryUpdateHitDistance("CheckPlayerBlock", i.CreatureData.GetCreatureDataId(), Protocol_1.Aki.Protocol.kks.Proto_Player, this.ObstructionCheckInfo.PlayerHitDistance, true), 0);
  }
  txm(e) {
    var t = this.BlackBoard.CurrentRoadway;
    if (!t) {
      return false;
    }
    var i;
    var r;
    var h;
    var s = ModelManager_1.ModelManager.VehicleStreamModel;
    var t = s.GetAllVehicleInRoadway(t.Id);
    if (!t || t.size === 0) {
      return false;
    }
    let a = false;
    for (const o of t) {
      if (o !== this.BlackBoard.CreatureDataId && (i = s.GetVehicleTeamMember(o))) {
        h = i.GetRelativeLocation();
        if (!(Math.abs(h.Y - this.BlackBoard.RelativeLocationToStart.Y) > (i.GetVehicleSize().Y + this.BlackBoard.VehicleSize.Y) * 0.5) && !(h = e + this.BlackBoard.RootCenterToHead, r = i.GetCurrentMeshHeadDistance(), i = i.GetVehicleSize().X * VehicleStreamDefine_1.CENTIMETER_TO_METER, r = (r - h) * VehicleStreamDefine_1.CENTIMETER_TO_METER, h = VehicleStreamDefine_1.DISTANCE_BE_TO_OBSTRUCTION + VehicleStreamDefine_1.MAX_BRAKING_DISTANCE_WHEN_CHECKOBSTRUCTION + i, r <= 0) && !(h <= r)) {
          a = true;
          h = r - i;
          this.ObstructionCheckInfo.TryUpdateHitDistance("SameRoadwayVehicleBlock", o, Protocol_1.Aki.Protocol.kks.Proto_SceneItem, h);
        }
      }
    }
    return a;
  }
  R9m(e) {
    var t = this.BlackBoard.NextRoadway;
    if (!t) {
      return false;
    }
    var i;
    var r;
    var h;
    var s;
    var a = ModelManager_1.ModelManager.VehicleStreamModel;
    var t = a.GetAllVehicleInRoadway(t.Id);
    if (!t || t.size === 0) {
      return false;
    }
    let o = false;
    for (const n of t) {
      if (n !== this.BlackBoard.CreatureDataId && (i = a.GetVehicleTeamMember(n))) {
        s = i.GetRelativeLocation();
        if (!(Math.abs(s.Y - this.BlackBoard.RelativeLocationToStart.Y) > (i.GetVehicleSize().Y + this.BlackBoard.VehicleSize.Y) * 0.5) && !(s = e + this.BlackBoard.RootCenterToHead, h = i.GetCurrentMeshHeadDistance(), s = this.BlackBoard.CurrentSplineLength - s, i = i.GetVehicleSize().X * VehicleStreamDefine_1.CENTIMETER_TO_METER, r = VehicleStreamDefine_1.DISTANCE_BE_TO_NEXTVEHICLE + VehicleStreamDefine_1.MAX_BRAKING_DISTANCE_WHEN_CHECKOBSTRUCTION + i, (h = (h + s) * VehicleStreamDefine_1.CENTIMETER_TO_METER) <= 0) && !(r <= h)) {
          o = true;
          s = h - i;
          this.ObstructionCheckInfo.TryUpdateHitDistance("SameRoadwayVehicleBlock", n, Protocol_1.Aki.Protocol.kks.Proto_SceneItem, s);
        }
      }
    }
    return o;
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
  YLe(e) {
    return e === Global_1.Global.BaseCharacter?.CharacterActorComponent?.CreatureData.GetCreatureDataId();
  }
  OnCreate() {}
  OnUpdate(e) {}
  OnEnter(e) {}
  OnExit(e) {}
  OnDestroy() {}
}
exports.VehicleStateBase = VehicleStateBase;
//# sourceMappingURL=VehicleStateBase.js.map