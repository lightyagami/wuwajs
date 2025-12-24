"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelAiTaskMoveTo = undefined;
const LevelAiTask_1 = require("../LevelAiTask");
class LevelAiTaskMoveTo extends LevelAiTask_1.LevelAiTask {
  constructor() {
    super(...arguments);
    this.Target = undefined;
    this.MoveState = 2;
    this.MoveSpeed = 0;
    this.Gce = undefined;
  }
  ExecuteTask() {
    var e;
    this.Gce = this.CreatureDataComponent.Entity.GetComponent(46);
    if (this.Gce) {
      e = {
        Index: 0,
        Position: this.Target,
        MoveSpeed: this.MoveSpeed,
        MoveState: this.MoveState
      };
      this.Gce.MoveAlongPath({
        Points: [e],
        Navigation: true,
        IsFly: false,
        DebugMode: true,
        Loop: false,
        Callback: e => {
          this.wTe(e);
        },
        ReturnFalseWhenNavigationFailed: false
      });
      return 3;
    } else {
      return 1;
    }
  }
  AbortTask() {
    this.Gce.StopMoveNew();
    return 2;
  }
  wTe(e) {
    this.Gce.StopMoveNew();
    switch (e) {
      case 1:
        this.FinishLatentTask(0);
        break;
      case 2:
      case 3:
        this.FinishLatentTask(1);
    }
  }
}
exports.LevelAiTaskMoveTo = LevelAiTaskMoveTo;
//# sourceMappingURL=LevelAiTaskMoveTo.js.map