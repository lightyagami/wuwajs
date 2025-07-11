"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionCheckDungeonHasSaveConfig = undefined;
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckDungeonHasSaveConfig extends LevelGeneralBase_1.LevelConditionBase {
  CheckNew(e, a) {
    return !!e && (e = e, (ModelManager_1.ModelManager.InstanceDungeonModel?.GetIfInstanceHasSaveData(e.DungeonId) ?? false) === e.IsHasSaveConfig);
  }
}
exports.LevelConditionCheckDungeonHasSaveConfig = LevelConditionCheckDungeonHasSaveConfig;
//# sourceMappingURL=LevelConditionCheckDungeonHasSaveConfig.js.map