"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelRangeDebugDrawModel = exports.LevelRangeDrawVolumeCache = exports.LevelRangeDrawData = exports.LevelRangeTreeReferenceData = undefined;
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
class LevelRangeTreeReferenceData {
  constructor() {
    this.LevelPlayIds = new Set();
    this.PbDataIds = new Set();
  }
}
exports.LevelRangeTreeReferenceData = LevelRangeTreeReferenceData;
class LevelRangeDrawData {
  constructor() {
    this.Enable = true;
    this.LinearColor = undefined;
  }
}
exports.LevelRangeDrawData = LevelRangeDrawData;
class LevelRangeDrawVolumeCache {
  constructor() {
    this.Actor = undefined;
    this.DrawData = undefined;
  }
}
exports.LevelRangeDrawVolumeCache = LevelRangeDrawVolumeCache;
class LevelRangeDebugDrawModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.DrawDataMap = undefined;
    this.DrawMode = 0;
    this.DrawRemainTime = 0;
    this.QuestReferenceDataMap = undefined;
    this.LevelPlayReferenceDataMap = undefined;
    this.DrawVolumeCache = undefined;
  }
}
exports.LevelRangeDebugDrawModel = LevelRangeDebugDrawModel;
//# sourceMappingURL=LevelRangeDebugDrawModel.js.map