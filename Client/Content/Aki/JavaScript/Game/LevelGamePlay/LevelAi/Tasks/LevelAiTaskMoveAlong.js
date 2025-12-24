"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelAiTaskMoveAlong = undefined;
const LevelAiTask_1 = require("../LevelAiTask");
class LevelAiTaskMoveAlong extends LevelAiTask_1.LevelAiTask {
  constructor() {
    super(...arguments);
    this.PathPoint = undefined;
    this.Navigation = true;
    this.ResetAllPoints = false;
    this.Gce = undefined;
  }
  ExecuteTask() {
    var s;
    this.Gce = this.CreatureDataComponent.Entity.GetComponent(46);
    if (this.Gce) {
      s = {
        Points: this.PathPoint,
        Navigation: this.Navigation,
        IsFly: false,
        DebugMode: true,
        Loop: false,
        Callback: s => {
          this.wTe(s);
        },
        UsePreviousIndex: true,
        UseNearestPoint: true,
        ReturnFalseWhenNavigationFailed: false,
        ResetAllPoints: this.ResetAllPoints
      };
      this.Gce.MoveAlongPath(s);
      return 3;
    } else {
      return 1;
    }
  }
  AbortTask() {
    this.Gce.StopMoveNew();
    return 2;
  }
  wTe(s) {
    this.Gce.StopMoveNew();
    switch (s) {
      case 1:
        this.FinishLatentTask(0);
        break;
      case 2:
      case 3:
        this.FinishLatentTask(1);
    }
  }
}
exports.LevelAiTaskMoveAlong = LevelAiTaskMoveAlong;
//# sourceMappingURL=LevelAiTaskMoveAlong.js.map