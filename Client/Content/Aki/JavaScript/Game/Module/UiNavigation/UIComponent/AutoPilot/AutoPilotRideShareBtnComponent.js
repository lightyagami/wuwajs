"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AutoPilotRideShareBtnComponent = undefined;
const ModelManager_1 = require("../../../../Manager/ModelManager");
const LongPressWithProgressComponent_1 = require("../LongPressWithProgressComponent");
class AutoPilotRideShareBtnComponent extends LongPressWithProgressComponent_1.LongPressWithProgressComponent {
  OnGetProgress() {
    return ModelManager_1.ModelManager.AutoPilotModel.RideShareBtnProgress;
  }
}
exports.AutoPilotRideShareBtnComponent = AutoPilotRideShareBtnComponent;
//# sourceMappingURL=AutoPilotRideShareBtnComponent.js.map