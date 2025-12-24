"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoadBookLockAreaData = exports.FinalTravelTaskData = exports.MotorChallengePlayData = exports.RoadBookAreaData = exports.roadBookPhantomColorText = undefined;
exports.roadBookPhantomColorText = {
  [0]: "#5F5F62",
  1: "#384BFF",
  2: "#8A00FF",
  3: "#A7974D",
  4: "#BE1327"
};
class RoadBookAreaData {
  constructor(t) {
    this.AreaId = t;
    this.TravelTaskIdSet = new Set();
    this.PhantomTaskIdSet = new Set();
    this.IsUnlock = false;
  }
}
exports.RoadBookAreaData = RoadBookAreaData;
class MotorChallengePlayData {
  constructor() {
    this.TabIndex = 0;
    this.PlayId = 0;
    this.JumpId = 0;
    this.NameTextId = "";
    this.RewardIds = [];
    this.IsUnlock = false;
    this.IsNew = false;
    this.HighestPoint = 0;
    this.ClassId = 0;
    this.CheckRedDot = undefined;
    this.CheckFinished = undefined;
  }
  get HasRedDot() {
    return this.CheckRedDot(this.RewardIds);
  }
  get IsFinished() {
    return this.CheckFinished(this.RewardIds);
  }
}
exports.MotorChallengePlayData = MotorChallengePlayData;
class FinalTravelTaskData {
  constructor() {
    this.Target = 1;
    this.FinishedIdSet = new Set();
    this.IsReceived = false;
  }
  get Current() {
    return this.FinishedIdSet.size;
  }
  CanReceive() {
    return !this.IsReceived && this.Current === this.Target;
  }
}
exports.FinalTravelTaskData = FinalTravelTaskData;
class RoadBookLockAreaData {
  constructor(t) {
    this.AreaId = t;
    this.ConditionGroupId = 0;
    this.JumpId = 0;
  }
}
exports.RoadBookLockAreaData = RoadBookLockAreaData;
//# sourceMappingURL=ActivityRoadBookDefine.js.map