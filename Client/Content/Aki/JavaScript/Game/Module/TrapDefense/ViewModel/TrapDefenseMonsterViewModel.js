"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseMonsterViewModel = undefined;
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const TrapDefenseMonsterData_1 = require("../Data/TrapDefenseMonsterData");
const TrapDefenseMonsterTypeData_1 = require("../Data/TrapDefenseMonsterTypeData");
const TrapDefenseMonsterWaveData_1 = require("../Data/TrapDefenseMonsterWaveData");
class TrapDefenseMonsterViewModel {
  constructor() {
    this.Model = undefined;
    this.JumpTabType = undefined;
    this.Hjc = [];
    this.MonsterTypeDataMap = new Map();
    this.$jc = new Map();
    this.Wjc = new Map();
    this.Qjc = undefined;
    this.kGr = new Map();
    this.LevelData = undefined;
    this.IsInstance = false;
    this.WaveSelectMonsterData = undefined;
    this.WaveSelectWaveData = undefined;
  }
  static Create(e) {
    var t = new TrapDefenseMonsterViewModel();
    t.Model = e;
    return t;
  }
  OnViewClose() {
    this.Qjc = undefined;
  }
  GetTabList() {
    return [{
      TabType: 0,
      TabNameKey: "TrapDefense_MonsterType"
    }, {
      TabType: 1,
      TabNameKey: "TrapDefense_MonsterWave"
    }];
  }
  GetMonsterMap() {
    if (!(this.kGr.size > 0)) {
      ConfigManager_1.ConfigManager.TrapDefenseConfig.GetAllMonsterConfigList().forEach(e => {
        e = TrapDefenseMonsterData_1.TrapDefenseMonsterData.Create(e);
        this.kGr.set(e.Id, e);
      });
    }
    return this.kGr;
  }
  GetMonsterBodyMap() {
    if (this.$jc.size <= 0) {
      ConfigManager_1.ConfigManager.TrapDefenseConfig.GetAllMonsterBodyList().forEach(e => {
        this.$jc.set(e.Id, e);
      });
    }
    return this.$jc;
  }
  GetMonsterTagMap() {
    if (this.Wjc.size <= 0) {
      ConfigManager_1.ConfigManager.TrapDefenseConfig.GetAllMonsterTagList().forEach(e => {
        this.Wjc.set(e.Id, e);
      });
    }
    return this.Wjc;
  }
  GetMonsterTypeDataList(e = true) {
    if (this.Hjc.length <= 0) {
      ConfigManager_1.ConfigManager.TrapDefenseConfig.GetAllMonsterRiskList().forEach(e => {
        e = TrapDefenseMonsterTypeData_1.TrapDefenseMonsterTypeData.Create(e);
        this.Hjc.push(e);
        this.MonsterTypeDataMap.set(e.Id, e);
      });
      this.Hjc.sort((e, t) => t.Id - e.Id);
    }
    if (e) {
      return this.jod();
    } else {
      return this.Hjc;
    }
  }
  jod() {
    const s = new Set();
    this.GetMonsterWaveDataList().forEach(e => {
      e.GetMonsterDataList().forEach(e => {
        s.add(e);
      });
    });
    const t = [];
    this.Hjc.forEach(e => {
      let a = false;
      e.GetMonsterDataList(false).forEach(e => {
        var t = s.has(e);
        a = a || t;
        e.SetIsInTheInstance(t);
      });
      if (a) {
        t.push(e);
      }
    });
    return t;
  }
  GetMonsterWaveDataList() {
    if (this.Qjc === undefined) {
      this.GetMonsterMap();
      const s = this.LevelData;
      const r = new Map();
      if (s) {
        this.Qjc = [];
        const n = [];
        n.push(...ConfigManager_1.ConfigManager.TrapDefenseConfig.GetWaveListByLevelId(s.Id));
        n.sort((e, t) => e.WaveId - t.WaveId);
        var e = ConfigManager_1.ConfigManager.TrapDefenseConfig.GetCsvMainConfigByMonsterWaveMainId(s.Config.MonsterWaveMainId);
        let a = 0;
        const i = s.Config.LoopStartWaveId;
        e.forEach(e => {
          var t = Math.max(e.RepeatTimes, 1);
          Array.from({
            length: t
          }).flatMap(() => e.Ids).forEach(e => {
            var t;
            if (!r.has(e)) {
              t = ConfigManager_1.ConfigManager.TrapDefenseConfig.GetCsvWaveConfigByWaveId(e);
              r.set(t.Id, t);
            }
            if ((i <= 0 || a < i) && (t = TrapDefenseMonsterWaveData_1.TrapDefenseMonsterWaveData.Create(r.get(e), ++a), e = a === i, t.SetWaveConfig(n[a - 1]), this.Qjc.push(t), t.SetIsEndlessStart(e), e)) {
              t.SetEndlessWaveDesc(s.Config.LoopStartWaveDesc);
            }
          });
        });
      }
    }
    return this.Qjc ?? [];
  }
  SetJumpTabType(e) {
    this.JumpTabType = e;
  }
  SetSelectLevelData(e) {
    this.LevelData = e ?? ModelManager_1.ModelManager.TrapDefenseModel.GetCurInstToLevelData();
    this.Qjc = undefined;
    this.WaveSelectMonsterData = undefined;
    this.WaveSelectWaveData = undefined;
  }
  SetIsInstance(e) {
    this.IsInstance = e;
  }
  IsSameLevel(e) {
    return !!this.IsInstance && (e ?? this.LevelData?.Id) === ModelManager_1.ModelManager.TrapDefenseModel.GetCurInstToLevelData()?.Id;
  }
  SetWaveSelectMonsterData(e, t) {
    this.WaveSelectWaveData = e;
    this.WaveSelectMonsterData = t;
  }
  IsSameWaveAndMonster(e, t) {
    return this.WaveSelectWaveData?.Wave === e.Wave && this.WaveSelectMonsterData?.Id === t.Id;
  }
}
exports.TrapDefenseMonsterViewModel = TrapDefenseMonsterViewModel;
//# sourceMappingURL=TrapDefenseMonsterViewModel.js.map