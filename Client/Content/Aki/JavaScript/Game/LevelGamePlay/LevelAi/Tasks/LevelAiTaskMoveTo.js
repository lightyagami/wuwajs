"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.LevelAiTaskMoveTo = void 0;
const LevelAiTask_1 = require("../LevelAiTask");
class LevelAiTaskMoveTo extends LevelAiTask_1.LevelAiTask {
  constructor() {
    super(...arguments), this.Target = void 0, this.MoveState = 2, this.MoveSpeed = 0, this.Gce = void 0
  }
  ExecuteTask() {
    var e;
    return this.Gce = this.CreatureDataComponent.Entity.GetComponent(45), this.Gce ? (e = {
      Index: 0,
      Position: this.Target,
      MoveSpeed: this.MoveSpeed,
      MoveState: this.MoveState
    }, this.Gce.MoveAlongPath({
      Points: [e],
      Navigation: !0,
      IsFly: !1,
      DebugMode: !0,
      Loop: !1,
      Callback: e => {
        this.wTe(e)
      },
      ReturnFalseWhenNavigationFailed: !1
    }), 3) : 1
  }
  AbortTask() {
    return this.Gce.StopMoveNew(), 2
  }
  wTe(e) {
    switch (this.Gce.StopMoveNew(), e) {
      case 1:
        this.FinishLatentTask(0);
        break;
      case 2:
      case 3:
        this.FinishLatentTask(1)
    }
  }
}
exports.LevelAiTaskMoveTo = LevelAiTaskMoveTo;
//# sourceMappingURL=LevelAiTaskMoveTo.js.map