"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AvignonTaskData = undefined;
class AvignonTaskData {
  constructor(s) {
    this.TaskId = s;
    this.Status = 1;
    this.Current = 0;
    this.Target = 0;
    this.JumpId = 0;
    this.TitleTextId = "";
    this.RewardList = [];
    this.ReceiveDelegate = undefined;
  }
  get IsFinished() {
    return this.Status !== 1;
  }
  get IsTaken() {
    return this.Status === 2;
  }
}
exports.AvignonTaskData = AvignonTaskData;
//# sourceMappingURL=AvignonTaskData.js.map