"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryTechNodeData = undefined;
const ModelManager_1 = require("../../../Manager/ModelManager");
class HonamiStoryTechNodeData {
  constructor(t) {
    this.Lo = undefined;
    this.M0m = 0;
    this.Lo = t;
  }
  SetNodeStatus(t) {
    if (t === 1) {
      this.M0m = 1;
    } else if (t === 2) {
      this.M0m = 2;
    }
  }
  get GetNodeStatus() {
    return this.M0m;
  }
  get PreNodeIsActive() {
    for (const t of this.Lo.PreId) {
      if (ModelManager_1.ModelManager.HonamiStoryModel.GetTechNodeData(t).GetNodeStatus !== 2) {
        return false;
      }
    }
    return true;
  }
  get Id() {
    return this.Lo.Id;
  }
  get GetConfig() {
    return this.Lo;
  }
}
exports.HonamiStoryTechNodeData = HonamiStoryTechNodeData;
//# sourceMappingURL=HonamiStoryTechNodeData.js.map