"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TaskData = undefined;
class TaskData {
  constructor() {
    this.TaskId = 0;
    this.Status = 1;
    this.IsFinished = false;
    this.IsTaken = false;
    this.DoingTextId = "";
    this.JumpId = 0;
    this.Current = 0;
    this.Target = 0;
    this.TitleTextId = "";
    this.RewardList = [];
    this.ReceiveDelegate = undefined;
  }
  DeepCopy(s) {
    var t = new TaskData();
    t.TaskId = s.TaskId;
    t.Status = s.Status;
    t.IsFinished = s.IsFinished;
    t.IsTaken = s.IsTaken;
    t.DoingTextId = s.DoingTextId;
    t.JumpId = s.JumpId;
    t.Current = s.Current;
    t.Target = s.Target;
    t.TitleTextId = s.TitleTextId;
    t.RewardList = s.RewardList;
    t.ReceiveDelegate = s.ReceiveDelegate;
    return t;
  }
}
exports.TaskData = TaskData;
//# sourceMappingURL=TaskData.js.map