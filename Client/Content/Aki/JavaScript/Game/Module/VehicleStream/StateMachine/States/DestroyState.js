"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DestroyState = undefined;
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const VehicleStateBase_1 = require("./VehicleStateBase");
class DestroyState extends VehicleStateBase_1.VehicleStateBase {
  OnEnter(e) {
    ControllerHolder_1.ControllerHolder.VehicleStreamController.RequestNetworkEntityUpdateCurRoadPush(this.BlackBoard.CreatureDataId, this.BlackBoard.DestRoadId, this.BlackBoard.DestRoadIndex);
  }
}
exports.DestroyState = DestroyState;
//# sourceMappingURL=DestroyState.js.map