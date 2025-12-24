"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MOTORCYCLE_DEVELOP_LEVEL_PRESS_INTERVAL = exports.MOTORCYCLE_DEVELOP_LEVEL_MAX_PROGRESS = exports.MOTORCYCLE_DEVELOP_LEVEL_MIN_PROGRESS = exports.MOTORCYCLE_DEVELOP_HELP_DIY = exports.MOTORCYCLE_DEVELOP_HELP_TASK = exports.MOTORCYCLE_DEVELOP_HELP_TECHTREE = exports.MOTORCYCLE_DEVELOP_HELP = exports.MotorTechTaskReward = exports.MotorTechTaskProcess = exports.MotorTechTaskNode = exports.MotorTechTask = exports.MotorTechTreeNode = undefined;
class MotorTechTreeNode {
  constructor(s, t, o) {
    this.NodeId = s;
    this.TreeType = t;
    this.PreNodeIds = o;
    this.NodeLevel = 0;
    this.CurrentValue = 0;
    this.TargetValue = 0;
    this.Status = -1;
  }
}
exports.MotorTechTreeNode = MotorTechTreeNode;
class MotorTechTask {
  constructor() {
    this.TaskList = [];
    this.RewardedCount = 0;
  }
}
exports.MotorTechTask = MotorTechTask;
class MotorTechTaskNode {
  constructor() {
    this.TaskId = 0;
    this.TreeType = 0;
    this.Type = 0;
    this.StartTime = 0;
    this.EndTime = 0;
    this.ProcessInfo = new MotorTechTaskProcess();
    this.RewardInfo = new MotorTechTaskReward();
  }
}
exports.MotorTechTaskNode = MotorTechTaskNode;
class MotorTechTaskProcess {
  constructor() {
    this.Current = 0;
    this.Target = 0;
  }
}
exports.MotorTechTaskProcess = MotorTechTaskProcess;
class MotorTechTaskReward {
  constructor() {
    this.RewardedCount = 0;
    this.WaitRewardCount = 0;
    this.MaxRewardCount = 0;
  }
}
exports.MotorTechTaskReward = MotorTechTaskReward;
exports.MOTORCYCLE_DEVELOP_HELP = 466;
exports.MOTORCYCLE_DEVELOP_HELP_TECHTREE = 470;
exports.MOTORCYCLE_DEVELOP_HELP_TASK = 471;
exports.MOTORCYCLE_DEVELOP_HELP_DIY = 424;
exports.MOTORCYCLE_DEVELOP_LEVEL_MIN_PROGRESS = 0.12;
exports.MOTORCYCLE_DEVELOP_LEVEL_MAX_PROGRESS = 0.88;
exports.MOTORCYCLE_DEVELOP_LEVEL_PRESS_INTERVAL = 0.5; //# sourceMappingURL=MotorcycleDevelopDefine.js.map