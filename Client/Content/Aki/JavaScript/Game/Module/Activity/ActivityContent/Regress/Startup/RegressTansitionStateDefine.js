"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RecallFinishState = exports.RecallRequestRewardState = exports.RecallShowRewardState = undefined;
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const ActivityControllerHolder_1 = require("../../../ActivityControllerHolder");
class RecallShowRewardState {
  constructor(t) {
    this.EndCallBack = t;
  }
  Transition(t) {}
  GetNextStatus() {
    return 1;
  }
  End() {
    this.EndCallBack(this);
  }
}
exports.RecallShowRewardState = RecallShowRewardState;
class RecallRequestRewardState {
  constructor(t) {
    this.EndCallBack = t;
  }
  Transition(t) {
    if (!ModelManager_1.ModelManager.ActivityRegressModel.DisposableReward) {
      ActivityControllerHolder_1.ActivityControllerHolder.ActivityRegressController.RegressDisposableRewardRequest();
    }
  }
  GetNextStatus() {
    return 2;
  }
  End() {
    this.EndCallBack(this);
  }
}
exports.RecallRequestRewardState = RecallRequestRewardState;
class RecallFinishState {
  constructor(t) {
    this.EndCallBack = t;
  }
  Transition(t) {
    t.GotoActivityViewAndCloseSelf();
    this.End();
  }
  GetNextStatus() {
    return 3;
  }
  End() {
    this.EndCallBack(this);
  }
}
exports.RecallFinishState = RecallFinishState;
//# sourceMappingURL=RegressTansitionStateDefine.js.map