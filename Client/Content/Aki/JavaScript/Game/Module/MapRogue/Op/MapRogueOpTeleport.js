"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapRogueOpTeleport = undefined;
const MapRogueOp_1 = require("./MapRogueOp");
class MapRogueOpTeleport extends MapRogueOp_1.MapRogueOp {
  constructor() {
    super(...arguments);
    this.StepSize = 1;
    this.ExecuteInMapView = true;
    this.ExecuteAfterMapViewShow = true;
  }
  ToString() {
    return `[Teleport] IncId:${this.IncId} GridId:${this.Data.r41?.UEc}`;
  }
  OnStartExecute(e) {
    this.Execute(e);
  }
  OnExecute(e) {
    var t = this.Data.r41;
    if (t) {
      e.TeleportFlow(t.UEc, t.jEc).then(() => {
        this.Execute(e);
      });
    }
  }
  OnFinish(e) {}
}
exports.MapRogueOpTeleport = MapRogueOpTeleport;
//# sourceMappingURL=MapRogueOpTeleport.js.map