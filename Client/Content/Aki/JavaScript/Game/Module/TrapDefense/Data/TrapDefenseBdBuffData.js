"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseBdBuffData = undefined;
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
class TrapDefenseBdBuffData {
  constructor(t) {
    this.Id = 0;
    this.Level = 1;
    this.Config = undefined;
    this.BdBuffConfig = undefined;
    this.IsShowStrengthen = false;
    this.IsActive = false;
    this.IsUnlock = false;
    this.MaxLevel = 1;
    this.Id = t;
  }
  static Create(t) {
    var e = new TrapDefenseBdBuffData(t.Id);
    e.AU(t);
    return e;
  }
  AU(t) {
    this.Config = t;
    this.MaxLevel = ConfigManager_1.ConfigManager.TrapDefenseConfig.GetBdBuffListByGroupId(t.Id).length;
    this.qVu();
  }
  qVu() {
    var t = this.Level;
    var e = this.Config.Id;
    var i = this.BdBuffConfig;
    this.BdBuffConfig = ConfigManager_1.ConfigManager.TrapDefenseConfig.GetBdBuffByLevelAndGroup(t, e) ?? i;
  }
  SetLevel(t) {
    if (this.Level !== t && !(t < 1) && !(t > this.MaxLevel)) {
      this.Level = t;
      this.qVu();
    }
  }
  SetActive(t) {
    this.IsActive = t;
  }
  SetUnlock(t) {
    this.IsUnlock = t;
  }
  GetActiveBdProgressNum() {
    if (this.IsActive) {
      return this.BdBuffConfig.Level;
    } else {
      return 0;
    }
  }
  IsStrengthenFinish() {
    return this.IsStrengthen(this.BdBuffConfig);
  }
  IsCanStrengthen() {
    return this.MaxLevel > 1;
  }
  IsStrengthen(t) {
    return t.Level > 1;
  }
  GetBelongBdData() {
    var t = this.Config.BelongBd;
    return ModelManager_1.ModelManager.TrapDefenseModel.RougeModeData.BdDataMap.get(t);
  }
  SetIsShowStrengthen(t) {
    this.IsShowStrengthen = t;
  }
  GetStrengthenConfig() {
    return !this.IsStrengthenFinish() && this.IsCanStrengthen() && ConfigManager_1.ConfigManager.TrapDefenseConfig.GetBdBuffByLevelAndGroup(this.Level + 1, this.Config.Id) || this.BdBuffConfig;
  }
  GetStrengthenBeforeConfig() {
    if (this.IsStrengthenFinish()) {
      var t = ConfigManager_1.ConfigManager.TrapDefenseConfig.GetBdBuffByLevelAndGroup(1, this.Config.Id);
      if (t) {
        return t;
      }
    }
    return this.BdBuffConfig;
  }
  GetShowBdBuffConfig(t) {
    if (t) {
      return this.BdBuffConfig;
    } else if (this.IsShowStrengthen) {
      return this.GetStrengthenConfig();
    } else {
      return this.GetStrengthenBeforeConfig();
    }
  }
  IsCanSwitchStrengthen(t) {
    return !t && !!this.IsCanStrengthen() && this.IsUnlock;
  }
  ActiveAddBuff() {
    if (this.IsActive) {
      this.SetLevel(2);
    } else {
      this.SetActive(true);
    }
  }
  GetShowActorLabelStr() {
    var t = this.Id;
    var e = this.Config.Quality;
    return `BdBuff_${t}_Bid-${this.BdBuffConfig.Id}_Quality-${e}_Lv-${this.BdBuffConfig.Level}_Active-${this.IsActive}_Unlock-${this.IsUnlock}_MaxLv-${this.MaxLevel}`;
  }
}
exports.TrapDefenseBdBuffData = TrapDefenseBdBuffData;
//# sourceMappingURL=TrapDefenseBdBuffData.js.map