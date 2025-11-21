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
    this.Njc = new Map();
    this.Fjc = [];
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
    if (this.Fjc.length <= 0) {
      var e = this.Vjc();
      const t = ModelManager_1.ModelManager.TrapDefenseModel.ViewModelMonster.GetMonsterMap();
      e = e.map(e => t.get(e));
      e.sort((e, t) => e.SortId - t.SortId);
      this.Fjc.push(...e);
    }
    return this.Fjc;
  }
  Vjc() {
    if (this.Njc.size <= 0) {
      Json_1.Json.Parse(this.Config.SpawnMonsters)?.forEach(e => {
        const s = e.MonsterGroup;
        ConfigManager_1.ConfigManager.TrapDefenseConfig.GetCsvMonsterGroupConfigByMonsterId(s.Id).forEach(e => {
          var t = this.Njc.get(e.Id) ?? 0;
          this.Njc.set(e.Id, t + s.RepeatTimes);
        });
      });
    }
    return Array.from(this.Njc.keys());
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
    if (this.Njc.size <= 0) {
      this.Vjc();
    }
    return this.Njc.get(e.Id) ?? 0;
  }
  HaveBoss() {
    return this.GetMonsterDataList().some(e => e.IsBoss());
  }
}
exports.TrapDefenseMonsterWaveData = TrapDefenseMonsterWaveData;
//# sourceMappingURL=TrapDefenseMonsterWaveData.js.map