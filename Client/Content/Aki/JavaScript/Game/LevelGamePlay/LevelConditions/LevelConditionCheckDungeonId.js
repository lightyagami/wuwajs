"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionCheckDungeonId = undefined;
const Log_1 = require("../../../Core/Common/Log");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckDungeonId extends LevelGeneralBase_1.LevelConditionBase {
  CheckNew(e, o) {
    var n;
    var r;
    return !!e && (e = e, (n = ModelManager_1.ModelManager.CreatureModel.GetInstanceId()) && e.DungeonId ? (r = n === e.DungeonId, e.Compare === "Eq" ? r : !r) : (Log_1.Log.CheckError() && Log_1.Log.Error("LevelCondition", 7, "判断当前副本条件错误:(若当前ID为空找程序,配置ID为空找TD或策划)", ["当前副本ID", n], ["配置副本ID", e.DungeonId]), false));
  }
}
exports.LevelConditionCheckDungeonId = LevelConditionCheckDungeonId;
//# sourceMappingURL=LevelConditionCheckDungeonId.js.map