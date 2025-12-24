"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionCheckDungeonTypes = undefined;
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
const paramList = [["Type1", "SubType1"], ["Type2", "SubType2"], ["Type3", "SubType3"], ["Type4", "SubType4"], ["Type5", "SubType5"], ["Type6", "SubType6"], ["Type7", "SubType7"], ["Type8", "SubType8"]];
const typeSet = new Set();
const subTypeSet = new Set();
class LevelConditionCheckDungeonTypes extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, a) {
    typeSet.clear();
    subTypeSet.clear();
    for (const t of paramList) {
      var r = e?.LimitParams?.get(t[0]);
      if (r !== undefined) {
        break;
      }
      var p = e?.LimitParams?.get(t[1]);
      if (p !== undefined) {
        break;
      }
      r = Number(r);
      p = Number(p);
      if (!isNaN(r) && !isNaN(p)) {
        typeSet.add(r);
        subTypeSet.add(p);
      }
    }
    var n = ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
    var n = ConfigManager_1.ConfigManager.InstanceDungeonConfig?.GetConfig(n);
    return !!n && !!typeSet.has(n.InstType) && !!subTypeSet.has(n.InstSubType);
  }
}
exports.LevelConditionCheckDungeonTypes = LevelConditionCheckDungeonTypes;
//# sourceMappingURL=LevelConditionCheckDungeonTypes.js.map