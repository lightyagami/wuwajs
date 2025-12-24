"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BornState = undefined;
const AudioSystem_1 = require("../../../../../Core/Audio/AudioSystem");
const Log_1 = require("../../../../../Core/Common/Log");
const MathCommon_1 = require("../../../../../Core/Utils/Math/MathCommon");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const VehicleStateBase_1 = require("./VehicleStateBase");
class BornState extends VehicleStateBase_1.VehicleStateBase {
  OnEnter() {
    this.EnterNextRoadway();
    this.pUm();
    this.vUm();
    var t = this.UFm(this.BlackBoard.CurrentRootDistance);
    if (t?.length !== 0 && Log_1.Log.CheckError()) {
      Log_1.Log.Error("VehicleStream", 18, "载具出生时与其他载具重叠", ["selfCreatureDataId", this.BlackBoard.CreatureDataId], ["重叠载具", t]);
    }
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("VehicleStream", 18, "BornState.初始位置", ["CreatureDataId", this.BlackBoard.CreatureDataId], ["RootDis", this.BlackBoard.CurrentRootDistance], ["StartRoadwayId", this.BlackBoard.StartRoadway.Id], ["actorLocation", this.BlackBoard.StartActorLocation], ["RelativeLocationToStart", this.BlackBoard.RelativeLocationToStart]);
    }
  }
  OnUpdate(t) {
    var e;
    var i = this.CheckGetNextState();
    if (i) {
      if ((e = this.UFm(this.BlackBoard.CurrentRootDistance))?.length !== 0 && Log_1.Log.CheckError()) {
        Log_1.Log.Error("VehicleStream", 18, "载具启动时与其他载具重叠", ["selfCreatureDataId", this.BlackBoard.CreatureDataId], ["重叠载具", e]);
      }
      this.BlackBoard.SwitchState(i);
    }
  }
  OnExit(t) {
    this.rAf();
  }
  CheckGetNextState() {
    if (this.BlackBoard.IsLaunch) {
      return 2;
    } else {
      return 0;
    }
  }
  UFm(t) {
    var e = this.BlackBoard.CurrentRoadway;
    if (e) {
      var i = ModelManager_1.ModelManager.VehicleStreamModel;
      var e = i.GetAllVehicleInRoadway(e.Id);
      if (e) {
        var a = [];
        for (const o of e) {
          if (o !== this.BlackBoard.CreatureDataId) {
            var s = i.GetVehicleTeamMember(o);
            if (s) {
              var h = s.GetRelativeLocation();
              var h = Math.abs(h.Y - this.BlackBoard.RelativeLocationToStart.Y);
              if (!(h > (s.GetVehicleSize().Y + this.BlackBoard.VehicleSize.Y) * 0.5)) {
                switch (this.CheckPositionalRelationshipToTarget(t, s.GetCurrentMeshHeadDistance(), s.GetCurrentMeshTailDistance())) {
                  case 1:
                  case 3:
                    a.push(o);
                }
              }
            }
          }
        }
        return a;
      }
    }
  }
  pUm() {
    var t;
    var e;
    var i = this.BlackBoard.StartRoadway;
    if (i?.RoadSpline) {
      t = i.RoadSpline.D_FindInputKeyClosestToWorldLocation(this.BlackBoard.StartActorLocation.ToUeVector());
      e = i.RoadSpline.D_GetTransformAtSplineInputKey(t, 0).InverseTransformPosition(this.BlackBoard.StartActorLocation.ToUeVector());
      this.BlackBoard.RelativeLocationToStart.DeepCopy(e);
      this.xFm(this.BlackBoard.RelativeLocationToStart);
      this.BlackBoard.RelativeLocationToStartWithoutX.DeepCopy(this.BlackBoard.RelativeLocationToStart);
      this.BlackBoard.RelativeLocationToStartWithoutX.X = 0;
      this.BlackBoard.CurrentSplineLength = i.RoadSpline.GetSplineLength();
      this.BlackBoard.CurrentRootDistance = i.RoadSpline.GetDistanceAlongSplineAtSplineInputKey(t);
    }
  }
  vUm() {
    var t;
    var e = this.BlackBoard.EndRoadway;
    if (e?.RoadSpline) {
      t = e.RoadSpline.D_FindInputKeyClosestToWorldLocation(this.BlackBoard.EndLocationInRoad.ToUeVector());
      this.BlackBoard.EndPointInSplineDistance = e.RoadSpline.GetDistanceAlongSplineAtSplineInputKey(t);
    }
  }
  rAf() {
    var t = this.BlackBoard.RoadNetworkNavigationComponent.Entity;
    if (t && t.Valid && (t = t.GetComponent(141)) && (t = t.GetAudioControlConfig()) && t.Type === "Traffic") {
      this.BlackBoard.HornAudio = (0, AudioSystem_1.parseAudioEventPath)(t.HornAudio);
      this.BlackBoard.BrakingAudio = (0, AudioSystem_1.parseAudioEventPath)(t.BrakingAudio);
      this.BlackBoard.BrakingShortAudio = (0, AudioSystem_1.parseAudioEventPath)(t.BrakingShortAudio);
      this.BlackBoard.EngineAudio = (0, AudioSystem_1.parseAudioEventPath)(t.EngineAudio);
    }
  }
  xFm(t) {
    if (Math.abs(t.X) < MathCommon_1.MathCommon.KindaSmallNumber) {
      t.X = 0;
    }
    if (Math.abs(t.Y) < MathCommon_1.MathCommon.KindaSmallNumber) {
      t.Y = 0;
    }
    if (Math.abs(t.Z) < MathCommon_1.MathCommon.KindaSmallNumber) {
      t.Z = 0;
    }
  }
}
exports.BornState = BornState;
//# sourceMappingURL=BornState.js.map