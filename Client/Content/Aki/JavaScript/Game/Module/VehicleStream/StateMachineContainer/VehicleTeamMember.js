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
      var v = (0, puerts_1.$unref)(d);
      _.AddIntersection(g, v);
      l.GetCrossingRoads(M.Id, d);
      var g = (0, puerts_1.$unref)(d);
      _.RecordCrossingRoadways(M.Id, g);
    }
    var C = Vector_1.Vector.Create();
    C.DeepCopy(u.RoadStartPoint);
    var p = Vector_1.Vector.Create();
    p.DeepCopy(u.RoadEndPoint);
    var B = ModelManager_1.ModelManager.CreatureModel.GetEntity(i).Entity.GetComponent(338);
    this.eXt = new VehicleSmBlackBoard_1.VehicleSmBlackBoard(t, e, i, r, a, s, h, S, C, p, n, o, B, c, this.p5r);
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
        UE.KismetSystemLibrary.D_DrawDebugString(GlobalData_1.GlobalData.World, t, `${i.toString()}_${e}_${this.eXt?.WaitingModelBuffer}`, undefined, r);
      }
    }
  }
  OnTick(t, e, i) {
    if (this.eXt.LastTickNum !== this.eXt.TickNum) {
      this.eXt.TimeSinceLastTick = 0;
      this.eXt.UpdateMoved = false;
      this.uvf();
      this.Lle.Update(e);
      if (this.eXt.UpdateMoved) {
        this.AUm(t, e, i);
      }
      this.eXt.LastTickNum = this.eXt.TickNum;
    }
  }
  OnEnterPlayerRange() {
    this.eXt.EnableAudio = true;
    this.eXt.EnableTrace = true;
    this.Lle.OnEnterPlayerRange();
  }
  OnLeavePlayerRange() {
    this.eXt.EnableAudio = false;
    this.eXt.EnableTrace = false;
    this.Lle.OnLeavePlayerRange();
    for (const t of this.eXt.AudioHandleSet) {
      this.eXt.StopAudio(t, false);
    }
    this.eXt.AudioHandleSet.clear();
  }
  uvf() {
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
  AUm(t, e, i) {
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