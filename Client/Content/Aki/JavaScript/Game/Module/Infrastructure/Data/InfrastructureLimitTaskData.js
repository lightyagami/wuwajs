"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InfrastructureLimitTaskData = undefined;
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
class InfrastructureLimitTaskData {
  constructor(t) {
    this.ConfigId = 0;
    this.Current = 0;
    this.Target = 1;
    this.Index = 0;
    this.Status = Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskRunning;
    this.ConfigId = t;
  }
  get Lo() {
    return ConfigManager_1.ConfigManager.InfrastructureConfig.GetInfrActivityTaskConfig(this.ConfigId);
  }
  get TaskReward() {
    return this.Lo.TaskReward;
  }
  get JumpId() {
    return this.Lo.JumpId;
  }
  UpdateData(t) {
    this.Current = t.lMs;
    this.Target = t.j6n;
    this.Status = t.H6n;
  }
}
exports.InfrastructureLimitTaskData = InfrastructureLimitTaskData;
//# sourceMappingURL=InfrastructureLimitTaskData.js.map