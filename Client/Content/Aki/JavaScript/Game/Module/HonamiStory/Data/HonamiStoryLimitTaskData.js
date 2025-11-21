"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryLimitTaskData = undefined;
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ActivityCommonDefine_1 = require("../../Activity/ActivityCommonDefine");
class HonamiStoryLimitTaskData {
  constructor(t) {
    this.ConfigId = 0;
    this.h0i = 1;
    this.Current = 0;
    this.Target = 1;
    this.ConfigId = t;
  }
  rTo() {
    return ConfigManager_1.ConfigManager.HonamiStoryConfig.GetHonamiStoryLimitTaskConfig(this.ConfigId);
  }
  UpdateData(t) {
    this.h0i = ActivityCommonDefine_1.taskStateResolver[t.H6n];
    this.Current = t.lMs;
    this.Target = t.j6n;
  }
  UpdateState(t) {
    this.h0i = t;
  }
  get Id() {
    return this.rTo().Id;
  }
  get DropId() {
    return this.rTo().DropId;
  }
  get JumpId() {
    return this.rTo().JumpId;
  }
  get Status() {
    return this.h0i;
  }
  get TaskName() {
    return this.rTo().RewardName;
  }
}
exports.HonamiStoryLimitTaskData = HonamiStoryLimitTaskData;
//# sourceMappingURL=HonamiStoryLimitTaskData.js.map