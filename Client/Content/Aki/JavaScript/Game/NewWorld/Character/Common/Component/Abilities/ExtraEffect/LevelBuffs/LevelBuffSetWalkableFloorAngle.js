"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelBuffSetWalkableFloorAngle = undefined;
const Log_1 = require("../../../../../../../../Core/Common/Log");
const LevelBuffBase_1 = require("./LevelBuffBase");
class LevelBuffSetWalkableFloorAngle extends LevelBuffBase_1.LevelBuffBase {
  constructor() {
    super(...arguments);
    this.s$o = 0;
  }
  OnCreated() {
    var e = this.Entity.CheckGetComponent(178).CharacterMovement;
    this.s$o = e.WalkableFloorAngle;
    var l = Number(this.Params[0]);
    if (l) {
      e.SetWalkableFloorAngle(l);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Level", 28, "LevelBuffSetWalkableFloorAngle玩法效果缺少参数", ["Buff", this.BuffId]);
    }
  }
  OnRemoved(e) {
    this.Entity.CheckGetComponent(178).CharacterMovement.SetWalkableFloorAngle(this.s$o);
  }
}
exports.LevelBuffSetWalkableFloorAngle = LevelBuffSetWalkableFloorAngle;
//# sourceMappingURL=LevelBuffSetWalkableFloorAngle.js.map