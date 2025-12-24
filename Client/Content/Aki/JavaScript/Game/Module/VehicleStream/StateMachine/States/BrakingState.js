"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BrakingState = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const VehicleStreamDefine_1 = require("../../VehicleStreamDefine");
const VehicleStateBase_1 = require("./VehicleStateBase");
class BrakingState extends VehicleStateBase_1.VehicleStateBase {
  constructor() {
    super(...arguments);
    this.oAf = 0;
  }
  OnEnter(e, t) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("VehicleStream", 18, "BrakingState.OnEnter", ["CreatureDataId", this.BlackBoard.CreatureDataId], ["CurrentRunDistance", this.BlackBoard.CurrentRootDistance], ["CurrentMeshDistance", this.BlackBoard.CurrentMeshCenterDistance], ["brakingReason", t]);
    }
  }
  OnUpdate(e) {
    var t = this.CheckGetNextState();
    if (t) {
      this.BlackBoard.SwitchState(t);
    }
  }
  CheckGetNextState() {
    var e = this.CheckObstruction(this.BlackBoard.CurrentRootDistance, "VehicleStream.braking");
    if (e !== "None") {
      if (e === "TraceBlock" && (this.BlackBoard.BlockTarget = Protocol_1.Aki.Protocol.kks.Proto_Player, this.BlackBoard.HornAudio) && TimeUtil_1.TimeUtil.GetServerTimeStamp() - this.oAf >= VehicleStreamDefine_1.HORN_AUDIO_PLAY_INTERVAL_TIME) {
        this.BlackBoard.OpenAudio(this.BlackBoard.HornAudio, false);
        this.oAf = TimeUtil_1.TimeUtil.GetServerTimeStamp();
      }
      this.BlackBoard.BlockTarget = Protocol_1.Aki.Protocol.kks.Proto_SceneItem;
      return 0;
    }
    this.BlackBoard.BlockTarget = undefined;
    e = this.BlackBoard.NextRoadway;
    if (e && e instanceof UE.KuroRoadwayIntersection) {
      if (!this.BlackBoard.CheckArrivedSplineEndPoint()) {
        return 2;
      }
      if (ModelManager_1.ModelManager.VehicleStreamModel.CheckIntersectionRoadwayOccupied(e.Id)) {
        return 0;
      }
    }
    return 2;
  }
}
exports.BrakingState = BrakingState;
//# sourceMappingURL=BrakingState.js.map