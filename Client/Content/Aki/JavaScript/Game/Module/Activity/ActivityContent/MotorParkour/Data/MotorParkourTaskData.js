"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorParkourTaskData = undefined;
const Log_1 = require("../../../../../../Core/Common/Log");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
class MotorParkourTaskData {
  constructor(e) {
    this.Lo = undefined;
    this.RewardList = [];
    this.jGi = 0;
    this.Status = 1;
    var t = ConfigManager_1.ConfigManager.MotorParkourConfig.GetMotorParkourTaskById(e);
    if (t) {
      this.Lo = t;
      this.RewardList = ConfigManager_1.ConfigManager.RewardConfig.GetDropPackagePreviewItemList(t.DropId);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("MotorParkour", 71, "摩托跑酷任务不存在", ["id", e]);
    }
  }
  get IsRunning() {
    return this.Status === 1;
  }
  get IsFinished() {
    return this.Status === 0;
  }
  get IsReceived() {
    return this.Status === 2;
  }
  set LevelId(e) {
    this.jGi = e;
  }
  get LevelId() {
    return this.jGi;
  }
  get RecordId() {
    return this.Lo.RecordId;
  }
  get Desc() {
    return this.Lo.Desc;
  }
}
exports.MotorParkourTaskData = MotorParkourTaskData;
//# sourceMappingURL=MotorParkourTaskData.js.map