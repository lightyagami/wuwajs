"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionCheckInstanceMatchAble = undefined;
const InstOnlineType_1 = require("../../../Core/Define/Config/SubType/InstOnlineType");
const InstanceDungeonById_1 = require("../../../Core/Define/ConfigQuery/InstanceDungeonById");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckInstanceMatchAble extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, n) {
    var r;
    var a;
    return !!e.LimitParams && !!(e = e.LimitParams.get("EntranceId")) && (e = parseInt(e), a = (r = ModelManager_1.ModelManager.InstanceDungeonEntranceModel).SelectInstanceId, e === r.EntranceId) && InstanceDungeonById_1.configInstanceDungeonById.GetConfig(a)?.OnlineType !== InstOnlineType_1.InstOnlineType.Single;
  }
}
exports.LevelConditionCheckInstanceMatchAble = LevelConditionCheckInstanceMatchAble;
//# sourceMappingURL=LevelConditionCheckInstanceMatchAble.js.map