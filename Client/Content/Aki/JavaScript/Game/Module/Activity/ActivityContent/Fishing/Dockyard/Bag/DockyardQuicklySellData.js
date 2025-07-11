"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DockyardQuicklySellData = undefined;
const ConfigManager_1 = require("../../../../../../Manager/ConfigManager");
class DockyardQuicklySellData {
  constructor(a) {
    this.PosDataDoublyList = [];
    var e = ConfigManager_1.ConfigManager.FishingConfig.GetFishingShapeConfig(a);
    for (let a = 0; a < e.FillState.length; a++) {
      this.PosDataDoublyList[a] = [];
      for (const o of e.FillState[a].ArrayInt) {
        this.PosDataDoublyList[a].push(o);
      }
    }
  }
}
exports.DockyardQuicklySellData = DockyardQuicklySellData;
//# sourceMappingURL=DockyardQuicklySellData.js.map