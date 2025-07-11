"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventSetExploreState = undefined;
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventSetExploreState extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, a, r) {
    var l;
    if (e && (l = e.Config.TeleControlType, e.Config.Type === "TeleControl")) {
      if (l === 0) {
        ModelManager_1.ModelManager.ManipulaterModel.SetManipulateMode(0);
      } else if (l === 1) {
        ModelManager_1.ModelManager.ManipulaterModel.SetManipulateMode(1);
      }
    }
  }
}
exports.LevelEventSetExploreState = LevelEventSetExploreState;
//# sourceMappingURL=LevelEventSetExploreState.js.map