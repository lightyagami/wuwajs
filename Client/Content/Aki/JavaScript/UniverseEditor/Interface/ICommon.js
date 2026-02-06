"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EEntityLogic = exports.ENightmareSettlementSystemVarType = exports.EMotorParkourSystemVarType = exports.getNpcPerformStatesByType = exports.getNpcPerformStateTypes = exports.npcPerformStateConfig = undefined;
exports.npcPerformStateConfig = {
  幽灵态: ["常态", "幽灵"],
  禁锢态: ["常态", "禁锢"],
  库洛洛异色态: ["常态", "异色"]
};
const npcPerformStatesMap = new Map();
function getNpcPerformStateMap() {
  if (npcPerformStatesMap.size <= 0) {
    npcPerformStatesMap.clear();
    for (const t of Object.entries(exports.npcPerformStateConfig)) {
      var e = new Set();
      npcPerformStatesMap.set(t[0], e);
      for (const r of t[1]) {
        e.add(r);
      }
    }
  }
  return npcPerformStatesMap;
}
function getNpcPerformStateTypes() {
  return Array.from(getNpcPerformStateMap().keys());
}
function getNpcPerformStatesByType(e) {
  e = getNpcPerformStateMap().get(e);
  if (e) {
    return Array.from(e.keys());
  } else {
    return [];
  }
}
var EMotorParkourSystemVarType;
var ENightmareSettlementSystemVarType;
var EEntityLogic;
exports.getNpcPerformStateTypes = getNpcPerformStateTypes;
exports.getNpcPerformStatesByType = getNpcPerformStatesByType;
(function (e) {
  e.CurLap = "CurLap";
  e.TotalTime = "TotalTime";
  e.ParkourFinished = "ParkourFinished";
  e.BestTime = "BestTime";
  e.CurCostTime = "CurCostTime";
})(EMotorParkourSystemVarType = exports.EMotorParkourSystemVarType ||= {});
(function (e) {
  e.MonsterKilled = "MonsterKilled";
  e.TotalMonsterPerDay = "TotalMonsterPerDay";
})(ENightmareSettlementSystemVarType = exports.ENightmareSettlementSystemVarType ||= {});
(function (e) {
  e.Item = "Item";
  e.Npc = "Npc";
  e.Monster = "Monster";
  e.Custom = "Custom";
  e.ClientOnly = "ClientOnly";
  e.ServerOnly = "ServerOnly";
  e.Vision = "Vision";
  e.Animal = "Animal";
  e.Vehicle = "Vehicle";
  e.SimpleCombat = "SimpleCombat";
})(EEntityLogic = exports.EEntityLogic ||= {}); //# sourceMappingURL=ICommon.js.map