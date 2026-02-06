"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VehicleTeamMember = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const GlobalData_1 = require("../../../GlobalData");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const BornState_1 = require("../StateMachine/States/BornState");
const BrakingState_1 = require("../StateMachine/States/BrakingState");
const DestroyState_1 = require("../StateMachine/States/DestroyState");
const RunningState_1 = require("../StateMachine/States/RunningState");
const VehicleSmBlackBoard_1 = require("../StateMachine/VehicleSmBlackBoard");
const VehicleStateMachine_1 = require("../StateMachine/VehicleStateMachine");
const StateMachineContainer_1 = require("./StateMachineContainer");
class VehicleTeamMember extends StateMachineContainer_1.StateMachineContainer {
  constructor(t, e, i, r, a, s, h, n, o, c, u) {
    super();
    this.Lle = new VehicleStateMachine_1.VehicleStateMachine();
    this.eXt = undefined;
    this.p5r = (t, ...e) => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("VehicleStream", 18, "VehicleTeamMember.SwitchState", ["CreatureDataId", this.eXt.CreatureDataId], ["state", t]);
      }
      return this.Lle.Switch(t, ...e) ?? false;
    };
    var l = ControllerHolder_1.ControllerHolder.TransportController.GetTransportSystem();
    var _ = ModelManager_1.ModelManager.VehicleStreamModel;
    var S = [];
    for (let t = 0; t < u.Roadways.Num(); t++) {
      var M = u.Roadways.Get(t);
      S.push(M);
      var d = (0, puerts_1.$ref)(UE.NewArray(UE.BuiltinInt));
      var g = l.GetIntersectionId(M.Id);
      l.GetRoadwaysAtSameIntersection(g, d);
      var C = (0, puerts_1.$unref)(d);
      _.AddIntersection(g, C);
      l.GetCrossingRoads(M.Id, d);
      var g = (0, puerts_1.$unref)(d);
      _.RecordCrossingRoadways(M.Id, g);
    }
    var v = Vector_1.Vector.Create();
    v.DeepCopy(u.RoadStartPoint);
    var D = Vector_1.Vector.Create();
    D.DeepCopy(u.RoadEndPoint);
    var V = ModelManager_1.ModelManager.CreatureModel.GetEntity(i).Entity.GetComponent(340);
    this.eXt = new VehicleSmBlackBoard_1.VehicleSmBlackBoard(t, e, i, r, a, s, h, S, v, D, n, o, V, c, this.p5r);
  }
  get Type() {
    return 0;
  }
  get Id() {
    return this.eXt.PbDataId;
  }
  get TeamId() {
    return this.eXt.TeamId;
  }
  J0(t, e) {
    e = new e(t, this.eXt);
    e.Create();
    this.Lle.AddState(t, e);
  }
  Init() {
    this.J0(1, BornState_1.BornState);
    this.J0(2, RunningState_1.RunningState);
    this.J0(3, BrakingState_1.BrakingState);
    this.J0(4, DestroyState_1.DestroyState);
    this.Lle.Start(1);
  }
  Launch(t) {
    this.eXt.SkeletalMeshComponent = t;
    this.eXt.SkeletalMeshRelativeLocation.Reset();
    this.eXt.SkeletalMeshRelativeLocation.DeepCopy(t.RelativeLocation);
    t = this.eXt.ModelCenterOffsetX();
    this.eXt.MeshCenterToHead = this.eXt.VehicleSize.X / 2 + t;
    this.eXt.MeshCenterToTail = this.eXt.VehicleSize.X / 2 - t;
    this.eXt.RootCenterToHead = this.eXt.MeshCenterToHead + this.eXt.SkeletalMeshRelativeLocation.X;
    this.eXt.RootCenterToTail = this.eXt.MeshCenterToTail - this.eXt.SkeletalMeshRelativeLocation.X;
    this.eXt.InitTrace();
    this.eXt.IsLaunch = true;
  }
  Destroy() {
    this.Lle.Destroy();
    var t = this.eXt.CurrentRoadway;
    if (t) {
      ModelManager_1.ModelManager.VehicleStreamModel.ExitRoadway(t.Id, this.eXt.CreatureDataId);
    }
  }
  OnForceTick(e) {
    this.eXt.TickNum++;
    this.eXt.TimeSinceLastTick += e;
    this.eXt.UpdateSkeletalMeshDistance();
    this.eXt.UpdateRtpc(e);
    if (ModelManager_1.ModelManager.VehicleStreamModel.EnableDebug) {
      var e = this.eXt.RoadNetworkNavigationComponent;
      var i = e.GetActorComponent()?.ActorTransform.GetLocation();
      let t = i;
      i.Z += this.eXt.VehicleSize.Z;
      if (this.eXt.SkeletalMeshComponent) {
        (t = this.eXt.SkeletalMeshComponent.D_K2_GetComponentToWorld().GetLocation()).Z += this.eXt.VehicleSize.Z;
      }
      var r = new UE.LinearColor(1, 0, 0, 1);
      UE.KismetSystemLibrary.D_DrawDebugArrow(GlobalData_1.GlobalData.World, t, i, 2000, r, 0.05, 10);
      var i = this.Lle.GetCurrentState();
      if (i) {
        e = e.GetModelBufferTime().toFixed(2);
        UE.KismetSystemLibrary.D_DrawDebugString(GlobalData_1.GlobalData.World, t, `${i.toString()}_${e}_${this.eXt?.WaitingModelBuffer}_${this.eXt.RoadNetworkNavigationComponent.IsModelBufferCompTickEnabled()}`, undefined, r);
      }
    }
  }
  OnTick(t, e, i) {
    if (this.eXt.LastTickNum !== this.eXt.TickNum) {
      this.eXt.TimeSinceLastTick = 0;
      this.eXt.UpdateMoved = false;
      this.yMf();
      this.Lle.Update(e);
      if (this.eXt.UpdateMoved) {
        this.oxm(t, e, i);
      }
      this.eXt.LastTickNum = this.eXt.TickNum;
    }
  }
  OnEnterPlayerRange() {
    this.eXt.IsInPlayerRange = true;
    this.Lle.OnEnterPlayerRange();
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("VehicleStream", 18, "进入玩家感知范围", ["CreatureDataId", this.eXt.CreatureDataId]);
    }
  }
  OnLeavePlayerRange() {
    this.eXt.IsInPlayerRange = false;
    this.Lle.OnLeavePlayerRange();
    for (const t of this.eXt.AudioHandleSet) {
      this.eXt.StopAudio(t, false);
    }
    this.eXt.AudioHandleSet.clear();
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("VehicleStream", 18, "离开玩家感知范围", ["CreatureDataId", this.eXt.CreatureDataId]);
    }
  }
  yMf() {
    var t = this.eXt.RoadNetworkNavigationComponent;
    if (this.eXt.WaitingModelBuffer && t.HasModelBuffer()) {
      return true;
    }
    this.eXt.WaitingModelBuffer = false;
    var e = t.WasRecentlyRenderedOnScreen();
    if (e && !this.eXt.LastRenderOnScreen && t.HasModelBuffer()) {
      this.eXt.WaitingModelBuffer = true;
    }
    this.eXt.LastRenderOnScreen = e;
    return this.eXt.WaitingModelBuffer;
  }
  oxm(t, e, i) {
    this.eXt.RoadNetworkNavigationComponent.SetLocationAndRotation(this.eXt.DesireLocation.ToUeVector(), this.eXt.DesireRotator.ToUeRotator(), t, e, i);
  }
  GetCurrentRootDistance() {
    return this.eXt.CurrentRootDistance;
  }
  GetCurrentMeshCenterDistance() {
    return this.eXt.CurrentMeshCenterDistance;
  }
  GetCurrentMeshHeadDistance() {
    return this.eXt.CurrentMeshHeadDistance;
  }
  GetCurrentMeshTailDistance() {
    return this.eXt.CurrentMeshTailDistance;
  }
  GetRelativeLocation() {
    return this.eXt.RelativeLocationToStart;
  }
  GetDesireLocation() {
    return this.eXt.DesireLocation;
  }
  GetDesireRotator() {
    return this.eXt.DesireRotator;
  }
  GetVehicleSize() {
    return this.eXt.VehicleSize;
  }
  GetMeshCenterToTail() {
    return this.eXt.MeshCenterToTail;
  }
  GetSpeed() {
    return this.eXt.CurrentSpeed;
  }
  GetBlockTarget() {
    return this.eXt.BlockTarget;
  }
  IsInBrakeState() {
    return this.Lle.GetCurrentState() === 3;
  }
}
exports.VehicleTeamMember = VehicleTeamMember;
//# sourceMappingURL=VehicleTeamMember.js.map