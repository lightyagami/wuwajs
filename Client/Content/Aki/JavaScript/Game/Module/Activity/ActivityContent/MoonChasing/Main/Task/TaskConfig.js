"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TaskConfig = undefined;
const BranchLineAll_1 = require("../../../../../../../Core/Define/ConfigQuery/BranchLineAll");
const BranchLineById_1 = require("../../../../../../../Core/Define/ConfigQuery/BranchLineById");
const MainLineAll_1 = require("../../../../../../../Core/Define/ConfigQuery/MainLineAll");
const MainLineById_1 = require("../../../../../../../Core/Define/ConfigQuery/MainLineById");
const ConfigBase_1 = require("../../../../../../../Core/Framework/ConfigBase");
class TaskConfig extends ConfigBase_1.ConfigBase {
  GetAllMainLineTask() {
    return MainLineAll_1.configMainLineAll.GetConfigList();
  }
  GetMainLineTaskById(e) {
    return MainLineById_1.configMainLineById.GetConfig(e);
  }
  GetAllBranchLineTask() {
    return BranchLineAll_1.configBranchLineAll.GetConfigList();
  }
  GetBranchLineTaskById(e) {
    return BranchLineById_1.configBranchLineById.GetConfig(e);
  }
  GetBranchLineTaskByRealTaskId(n) {
    return this.GetAllBranchLineTask().find(e => e.TaskId === n);
  }
}
exports.TaskConfig = TaskConfig;
//# sourceMappingURL=TaskConfig.js.map