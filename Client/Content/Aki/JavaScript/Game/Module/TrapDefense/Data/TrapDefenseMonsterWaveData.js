"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseMonsterWaveData = undefined;
const Json_1 = require("../../../../Core/Common/Json");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
class TrapDefenseMonsterWaveData {
  constructor(e) {
    this.Wave = 0;
    this.Config = undefined;
    this.ConfigWave = undefined;
    this.G9c = new Map();
    this.q9c = [];
    this.IsEndlessStart = false;
    this.EndlessWaveDesc = undefined;
    this.Wave = e;
  }
  static Create(e, t) {
    t = new TrapDefenseMonsterWaveData(t);
    t.Config = e;
    t.AU();
    return t;
  }
  AU() {}
  SetWaveConfig(e) {
    this.ConfigWave = e;
  }
  SetIsEndlessStart(e) {
    this.IsEndlessStart = e;
  }
  SetEndlessWaveDesc(e) {
    this.EndlessWaveDesc = e;
  }
  GetMonsterDataList() {
    if (this.q9c.length <= 0) {
      var e = this.F9c();
      const t = ModelManager_1.ModelManager.TrapDefenseModel.ViewModelMonster.GetMonsterMap();
      e = e.map(e => t.get(e));
      e.sort((e, t) => e.SortId - t.SortId);
      this.q9c.push(...e);
    }
    return this.q9c;
  }
  F9c() {
    if (this.G9c.size <= 0) {
      Json_1.Json.Parse(this.Config.SpawnMonsters)?.forEach(e => {
        const s = e.MonsterGroup;
        ConfigManager_1.ConfigManager.TrapDefenseConfig.GetCsvMonsterGroupConfigByMonsterId(s.Id).forEach(e => {
          var t = this.G9c.get(e.Id) ?? 0;
          this.G9c.set(e.Id, t + s.RepeatTimes);
        });
      });
    }
    return Array.from(this.G9c.keys());
  }
  GetWaveFormat(e = 2) {
    return this.Wave.toString().padStart(e, "0");
  }
  IsFinish() {
    return !!this.IsSameLevel() && (ModelManager_1.ModelManager.TrapDefenseModel?.BattleData.GetBatch() ?? 0) > this.Wave;
  }
  IsInTheCurrentWave() {
    return !!this.IsSameLevel() && (ModelManager_1.ModelManager.TrapDefenseModel?.BattleData.GetBatch() ?? 0) === this.Wave;
  }
  IsSameLevel() {
    return !!ModelManager_1.ModelManager.TrapDefenseModel?.ViewModelMonster.IsSameLevel(this.ConfigWave?.TrapDefenseLevelId);
  }
  GetEnhanceTipsInfoKey() {
    return this.ConfigWave?.WaveEnhanceTips;
  }
  GetMonsterNum(e) {
    if (this.G9c.size <= 0) {
      this.F9c();
    }
    return this.G9c.get(e.Id) ?? 0;
  }
  HaveBoss() {
    return this.GetMonsterDataList().some(e => e.IsBoss());
  }
}
exports.TrapDefenseMonsterWaveData = TrapDefenseMonsterWaveData;
//# sourceMappingURL=TrapDefenseMonsterWaveData.js.map