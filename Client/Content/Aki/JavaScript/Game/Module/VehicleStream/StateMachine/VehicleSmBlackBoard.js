"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VehicleSmBlackBoard = undefined;
const UE = require("ue");
const AudioSystem_1 = require("../../../../Core/Audio/AudioSystem");
const Log_1 = require("../../../../Core/Common/Log");
const QueryTypeDefine_1 = require("../../../../Core/Define/QueryTypeDefine");
const MathCommon_1 = require("../../../../Core/Utils/Math/MathCommon");
const Rotator_1 = require("../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const TraceElementCommon_1 = require("../../../../Core/Utils/TraceElementCommon");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ColorUtils_1 = require("../../../Utils/ColorUtils");
const VehicleStreamDefine_1 = require("../VehicleStreamDefine");
class VehicleSmBlackBoard {
  constructor(t, i, e, s, h, r, o, a, n, u, d, c, l, _, m) {
    this.TeamId = t;
    this.MemberId = i;
    this.CreatureDataId = e;
    this.PbDataId = s;
    this.StartActorLocation = h;
    this.StartActorRotator = r;
    this.DestinationLocation = o;
    this.Roadways = a;
    this.StartLocationInRoad = n;
    this.EndLocationInRoad = u;
    this.DestRoadId = d;
    this.DestRoadIndex = c;
    this.RoadNetworkNavigationComponent = l;
    this.LUm = m;
    this.DesireLocation = Vector_1.Vector.Create();
    this.DesireRotator = Rotator_1.Rotator.Create();
    this.VehicleSize = Vector_1.Vector.Create();
    this.RelativeLocationToStart = Vector_1.Vector.Create();
    this.RelativeLocationToStartWithoutX = Vector_1.Vector.Create();
    this.SkeletalMeshRelativeLocation = Vector_1.Vector.Create();
    this.ModelCenterOffset = Vector_1.Vector.Create();
    this.RootCenterToHead = 0;
    this.RootCenterToTail = 0;
    this.MeshCenterToHead = 0;
    this.MeshCenterToTail = 0;
    this.NormalSpeed = 0.5;
    this.AcceleratedSpeedConfig = 0.3;
    this.EngineAudio = undefined;
    this.BrakingAudio = undefined;
    this.BrakingShortAudio = undefined;
    this.HornAudio = undefined;
    this.EnableAudio = false;
    this.EnableTrace = false;
    this.AudioHandleSet = new Set();
    this.CurrentRoadwayIndex = -1;
    this.CurrentRootDistance = 0;
    this.CurrentSkeletalMeshDistance = 0;
    this.CurrentSplineLength = 0;
    this.EndPointInSplineDistance = 0;
    this.CurrentSpeed = 0;
    this.CurrentAcceleratedSpeed = 0;
    this.j2f = 0;
    this.nAf = 0;
    this.LastRenderOnScreen = false;
    this.WaitingModelBuffer = false;
    this.UpdateMoved = false;
    this.TimeSinceLastTick = 0;
    this.TickNum = 0;
    this.LastTickNum = 0;
    this.BlockTarget = undefined;
    this.BoxTrace = undefined;
    this.IsLaunch = false;
    this.BoxTracePosition = Vector_1.Vector.Create();
    this.BoxTraceEndPosition = Vector_1.Vector.Create();
    this.KeyPointDistances = [];
    this.KeyPointDistanceSyncRecord = new Map();
    this.SkeletalMeshComponent = undefined;
    this.Q5f = {
      Actor: undefined
    };
    this.DesireLocation.DeepCopy(h);
    this.DesireRotator.DeepCopy(r);
    this.NormalSpeed = _.MaxSpeed;
    this.AcceleratedSpeedConfig = _.Acceleration;
    if (_.BoundingVolume.Type === "Box") {
      t = _.BoundingVolume;
      this.VehicleSize.Set((t.Size.X ?? 0) * 2, (t.Size.Y ?? 0) * 2, (t.Size.Z ?? 0) * 2);
      this.ModelCenterOffset.Set(t.Center.X ?? 0, t.Center.Y ?? 0, t.Center.Z ?? 0);
    }
    this.Q5f.Actor = this.RoadNetworkNavigationComponent.GetActor();
  }
  get StartRoadway() {
    return this.Roadways[0];
  }
  get EndRoadway() {
    return this.Roadways[this.Roadways.length - 1];
  }
  get CurrentRoadway() {
    if (!(this.Roadways.length <= this.CurrentRoadwayIndex)) {
      return this.Roadways[this.CurrentRoadwayIndex];
    }
  }
  get LastRoadway() {
    if (!(this.Roadways.length <= this.CurrentRoadwayIndex - 1)) {
      return this.Roadways[this.CurrentRoadwayIndex - 1];
    }
  }
  get NextRoadway() {
    if (!(this.Roadways.length <= this.CurrentRoadwayIndex + 1)) {
      return this.Roadways[this.CurrentRoadwayIndex + 1];
    }
  }
  get CurrentMeshCenterDistance() {
    if (this.SkeletalMeshComponent) {
      return this.CurrentSkeletalMeshDistance;
    } else {
      return this.CurrentRootDistance;
    }
  }
  get CurrentRootHeadDistance() {
    return this.CurrentRootDistance + this.RootCenterToHead;
  }
  get CurrentRootTailDistance() {
    return this.CurrentRootDistance - this.RootCenterToTail;
  }
  get CurrentMeshHeadDistance() {
    return this.CurrentMeshCenterDistance + this.MeshCenterToHead;
  }
  get CurrentMeshTailDistance() {
    return this.CurrentMeshCenterDistance - this.MeshCenterToTail;
  }
  InitTrace() {
    this.BoxTrace = UE.NewObject(UE.TraceBoxElement.StaticClass());
    this.BoxTrace.bIsSingle = false;
    this.BoxTrace.bIgnoreSelf = true;
    this.BoxTrace.AddObjectTypeQuery(QueryTypeDefine_1.KuroObjectTypeQuery.WorldDynamic);
    this.BoxTrace.AddObjectTypeQuery(QueryTypeDefine_1.KuroObjectTypeQuery.Pawn);
    this.BoxTrace.AddObjectTypeQuery(QueryTypeDefine_1.KuroObjectTypeQuery.PawnPlayer);
    this.BoxTrace.AddObjectTypeQuery(QueryTypeDefine_1.KuroObjectTypeQuery.PawnMonster);
    TraceElementCommon_1.TraceElementCommon.SetTraceColor(this.BoxTrace, ColorUtils_1.ColorUtils.LinearGreen);
    TraceElementCommon_1.TraceElementCommon.SetTraceHitColor(this.BoxTrace, ColorUtils_1.ColorUtils.LinearRed);
    var t = this.RootCenterToHead;
    var i = this.RoadNetworkNavigationComponent.GetExtraBoxTrigger();
    var e = (i?.Size.X ?? 0) + Math.abs(i?.Center.X ?? 0);
    var s = (VehicleStreamDefine_1.DISTANCE_BETWEEN_PLAYER + VehicleStreamDefine_1.MAX_BRAKING_DISTANCE_WHEN_CHECKOBSTRUCTION) * 100 + t + e;
    this.BoxTrace.SetBoxHalfSize(s / 2, this.VehicleSize.Y / 2, this.VehicleSize.Z / 2);
    this.BoxTrace.SetDrawDebugTrace(0);
    if (i) {
      this.BoxTracePosition.Set(this.BoxTrace.HalfSizeX - e, 0, this.VehicleSize.Z / 2);
    } else {
      this.BoxTracePosition.Set(t + this.BoxTrace.HalfSizeX, 0, this.VehicleSize.Z / 2);
    }
    this.BoxTraceEndPosition.DeepCopy(this.BoxTracePosition);
  }
  SwitchState(t, ...i) {
    return this.LUm(t, ...i);
  }
  EnterNextRoadway() {
    var t = this.CurrentRoadwayIndex + 1;
    if (!(t >= this.Roadways.length)) {
      this.CurrentRoadwayIndex = t;
      t = this.CurrentRoadway;
      if (t?.RoadSpline) {
        this.CurrentRootDistance = Math.max(this.CurrentRootDistance - this.CurrentSplineLength, 0);
        this.UpdateSkeletalMeshDistance();
        this.CurrentSplineLength = t.RoadSpline.GetSplineLength();
        return t;
      }
    }
  }
  GetHeadDistanceAndRoadway(t, i) {
    var e = t + this.RootCenterToHead;
    if (e > this.CurrentSplineLength) {
      if (this.NextRoadway && this.NextRoadway.RoadSpline) {
        i.Distance = e - this.CurrentSplineLength;
        i.Roadway = this.NextRoadway;
      } else {
        i.Distance = t;
      }
    } else {
      i.Distance = e;
      i.Roadway = this.CurrentRoadway;
    }
  }
  GetTailDistanceAndRoadway(t, i) {
    t -= this.RootCenterToTail;
    if (t < 0) {
      if (this.LastRoadway?.RoadSpline) {
        i.Distance = this.LastRoadway.RoadSpline.GetSplineLength() + t;
        i.Roadway = this.LastRoadway;
      } else {
        i.Distance = this.CurrentRootDistance;
      }
    } else {
      i.Distance = t;
      i.Roadway = this.CurrentRoadway;
    }
  }
  CheckArrivedDestination() {
    return !this.NextRoadway && this.CurrentMeshHeadDistance >= this.EndPointInSplineDistance;
  }
  CheckArrivedSplineEndPoint() {
    return this.CurrentRootHeadDistance + 100 >= this.CurrentSplineLength;
  }
  UpdateSkeletalMeshDistance() {
    var t;
    var i;
    if (this.SkeletalMeshComponent && (i = this.SkeletalMeshComponent.D_K2_GetComponentToWorld().GetLocation(), t = this.CurrentRoadway) && t.RoadSpline && (i = t.RoadSpline.D_FindInputKeyClosestToWorldLocation(i), this.CurrentSkeletalMeshDistance = t.RoadSpline.GetDistanceAlongSplineAtSplineInputKey(i), this.CurrentRootDistance === this.CurrentSplineLength) && this.SkeletalMeshRelativeLocation.X > 0) {
      this.CurrentSkeletalMeshDistance += this.SkeletalMeshRelativeLocation.X;
    }
  }
  OpenAudio(t, i) {
    var e;
    if (this.EnableAudio) {
      e = AudioSystem_1.AudioSystem.PostEvent(t, this.RoadNetworkNavigationComponent.GetActor());
      if (i) {
        this.AudioHandleSet.add(e);
      }
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("VehicleStream", 18, "OpenAudio", ["CreatureDataId", this.CreatureDataId], ["event", t], ["eventHandle", e], ["bLoopAudio", i]);
      }
      return e;
    } else {
      return 0;
    }
  }
  StopAudio(t, i = true) {
    if (t && (i && this.AudioHandleSet.delete(t), AudioSystem_1.AudioSystem.ExecuteAction(t, 0), Log_1.Log.CheckDebug())) {
      Log_1.Log.Debug("VehicleStream", 18, "StopAudio", ["CreatureDataId", this.CreatureDataId], ["eventHandle", t], ["bLoopAudio", i]);
    }
  }
  UpdateRtpc(t) {
    var i;
    if (this.EnableAudio) {
      i = this.CurrentSpeed > this.j2f ? this.AcceleratedSpeedConfig : -this.AcceleratedSpeedConfig;
      this.j2f = MathCommon_1.MathCommon.Clamp(this.j2f + i * t * TimeUtil_1.TimeUtil.Millisecond, 0, this.CurrentSpeed);
      if (!(Math.abs(this.nAf - this.j2f) < VehicleStreamDefine_1.CHANGE_VEHICLE_SPEED_TOLERENCE) || this.nAf !== 0 && this.j2f === 0) {
        this.nAf = this.j2f;
        AudioSystem_1.AudioSystem.SetRtpcValue("vehicle_speed", this.j2f, this.Q5f);
      }
    }
  }
  ModelCenterOffsetX() {
    return this.ModelCenterOffset.X;
  }
}
exports.VehicleSmBlackBoard = VehicleSmBlackBoard;
//# sourceMappingURL=VehicleSmBlackBoard.js.map