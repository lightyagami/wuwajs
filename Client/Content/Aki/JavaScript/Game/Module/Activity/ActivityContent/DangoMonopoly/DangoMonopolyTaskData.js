"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DangoMonopolyTaskData = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const Macro_1 = require("../../../../../Core/Preprocessor/Macro");
const SkipTaskManager_1 = require("../../../SkipInterface/SkipTaskManager");
class DangoMonopolyTaskData {
  constructor(t) {
    this.Id = 0;
    this.TaskType = 0;
    this.TaskDesc = "";
    this.RewardItemId = 0;
    this.RewardItemCount = 0;
    this.TaskState = Protocol_1.Aki.Protocol.IPc.Proto_NotCompleted;
    this.EndTime = 0;
    this.Progress = 0;
    this.TotalProgress = 0;
    this.Sort = 0;
    this.Source = 0;
    this.Id = t;
  }
  static Create(t) {
    if (this.GVc.length) {
      const o = this.GVc.shift();
      o.AU(t);
      return o;
    }
    const o = new DangoMonopolyTaskData(t.TaskId);
    o.AU(t);
    return o;
  }
  Recycle() {
    DangoMonopolyTaskData.GVc.push(this);
  }
  AU(t) {
    this.Id = t.TaskId;
    this.TaskType = t.TaskType;
    this.TaskDesc = t.Desc;
    this.RewardItemId = t.ItemId;
    this.RewardItemCount = t.ItemNum;
    this.Sort = t.Sort;
    this.Source = t.Source;
  }
  ProtoUpdateData(t) {
    this.TaskState = t.Y4n;
    this.Progress = t.nvs;
    this.TotalProgress = t.j6n;
  }
  GetTaskStateSort() {
    if (this.TaskState === Protocol_1.Aki.Protocol.IPc.Proto_Completed) {
      return 0;
    } else if (this.TaskState === Protocol_1.Aki.Protocol.IPc.Proto_NotCompleted) {
      return 1;
    } else {
      return 2;
    }
  }
  GetSortResult(t) {
    if (this.TaskState !== t.TaskState) {
      return this.GetTaskStateSort() - t.GetTaskStateSort();
    } else {
      return this.Sort - t.Sort;
    }
  }
  JumpSource() {
    if (this.Source) {
      SkipTaskManager_1.SkipTaskManager.RunByConfigId(this.Source);
    }
  }
  IsCanReceive() {
    return this.TaskState === Protocol_1.Aki.Protocol.IPc.Proto_Completed;
  }
  SetEndTime(t) {
    this.EndTime = t;
  }
}
(exports.DangoMonopolyTaskData = DangoMonopolyTaskData).GVc = [];
//# sourceMappingURL=DangoMonopolyTaskData.js.map