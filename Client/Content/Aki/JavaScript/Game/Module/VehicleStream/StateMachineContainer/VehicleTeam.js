"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VehicleTeam = undefined;
const ModelManager_1 = require("../../../Manager/ModelManager");
const StateMachineContainer_1 = require("./StateMachineContainer");
class VehicleTeam extends StateMachineContainer_1.StateMachineContainer {
  constructor(e) {
    super();
    this.TeamId = e;
    this.rxm = new Map();
  }
  get Type() {
    return 1;
  }
  get Id() {
    return this.TeamId;
  }
  GetVehicleMember(e) {
    return this.rxm.get(e);
  }
  AddVehicleMember(e, t) {
    this.rxm.set(e, t);
    ModelManager_1.ModelManager.VehicleStreamModel.OnAddVehicleTeamMember(e, t);
  }
  RemoveVehicleMember(e) {
    this.rxm.delete(e);
    ModelManager_1.ModelManager.VehicleStreamModel.OnRemoveVehicleTeamMember(e);
  }
}
exports.VehicleTeam = VehicleTeam;
//# sourceMappingURL=VehicleTeam.js.map