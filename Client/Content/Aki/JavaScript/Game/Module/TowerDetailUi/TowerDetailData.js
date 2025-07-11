"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TowerInformationData = exports.TowerSwitchData = exports.TowerDetailMonster = exports.TowerDetailMonsterData = exports.TowerDetailBuff = exports.TowerDetailBuffData = undefined;
class TowerDetailBuffData {
  constructor() {
    this.Buffs = undefined;
    this.Title = "";
    this.Priority = 0;
  }
}
exports.TowerDetailBuffData = TowerDetailBuffData;
class TowerDetailBuff {
  constructor() {
    this.Desc = "";
    this.Name = "";
    this.IconPath = "";
  }
}
exports.TowerDetailBuff = TowerDetailBuff;
class TowerDetailMonsterData {
  constructor() {
    this.Title = "";
    this.MonsterInfos = undefined;
    this.Priority = 0;
  }
}
exports.TowerDetailMonsterData = TowerDetailMonsterData;
class TowerDetailMonster {
  constructor() {
    this.MonsterId = 0;
    this.ShowLevel = 0;
  }
}
exports.TowerDetailMonster = TowerDetailMonster;
class TowerSwitchData {
  constructor() {
    this.Name = "";
    this.Index = 0;
  }
}
exports.TowerSwitchData = TowerSwitchData;
class TowerInformationData {
  constructor() {
    this.Type = 0;
    this.Title = "";
    this.Priority = 0;
    this.MonsterData = undefined;
    this.TowerDetailBuffData = undefined;
  }
}
exports.TowerInformationData = TowerInformationData;
//# sourceMappingURL=TowerDetailData.js.map