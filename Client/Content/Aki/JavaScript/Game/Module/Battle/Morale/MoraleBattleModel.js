"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoraleBattleModel = undefined;
const ModelBase_1 = require("../../../../Core/Framework/ModelBase");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const EXTRA_TEMP_MORALE_MAX_LEVEL_BUFF_ID = 632400018;
const EXTRA_TEMP_MORALE_MAX_LEVEL = 100;
class MoraleBattleModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.NH1 = 0;
    this.vL1 = 0;
    this.Squ = 0;
    this.yL1 = 1;
    this.C91 = 0;
    this.p91 = 0;
    this.KN1 = 1;
    this.ML1 = false;
    this.EL1 = false;
    this.v91 = undefined;
    this.VH1 = undefined;
    this.NW1 = undefined;
    this.VW1 = undefined;
    this.Xdu = 0;
    this.Iyu = 1;
    this.r2u = false;
    this.o2u = false;
  }
  OnInit() {
    return true;
  }
  OnLeaveLevel() {
    this.v91 = undefined;
    this.VH1 = undefined;
    this.NW1 = undefined;
    this.VW1 = undefined;
    return !(this.r2u = false);
  }
  IsMoraleActive() {
    return this.ML1;
  }
  SetMoraleActive(t) {
    this.ML1 = t;
  }
  GetMoraleLevel() {
    return this.yL1;
  }
  GetMoraleMaxLevel() {
    var t = this.y91();
    if (t) {
      return t.length - 1;
    } else {
      return 1;
    }
  }
  GetLastMoraleLevel() {
    return this.Iyu;
  }
  GetMoraleIndomitableLevel() {
    return this.KN1;
  }
  GetTempMoraleLevel() {
    return this.C91;
  }
  GetTempMoraleExp() {
    return this.p91;
  }
  GetExpRatio() {
    return this.Xdu;
  }
  GetTempMoraleMaxLevel() {
    var t = this.jW1();
    if (t) {
      if (!this.r2u) {
        this.r2u = true;
        if (ModelManager_1.ModelManager.SceneTeamModel?.GetCurrentEntity?.Entity?.GetComponent(175)?.HasBuff(EXTRA_TEMP_MORALE_MAX_LEVEL_BUFF_ID)) {
          this.o2u = true;
        } else {
          this.o2u = false;
        }
      }
      if (this.o2u) {
        return t.length;
      } else {
        return Math.max(1, t.length - EXTRA_TEMP_MORALE_MAX_LEVEL);
      }
    } else {
      return 1;
    }
  }
  GetMoraleMaxExp() {
    if (this.Squ === 0) {
      this.Squ = this.GetLevelExp(this.GetMoraleMaxLevel());
    }
    return this.Squ;
  }
  SetIsUnlockTempMoraleMaxLevel(t) {
    this.o2u = t;
  }
  y91() {
    this.v91 ||= ConfigManager_1.ConfigManager.MoraleBattleConfig?.GetAllExpConfig() ?? [];
    return this.v91;
  }
  jW1() {
    var t;
    if (!this.VH1 && (t = ConfigManager_1.ConfigManager.MoraleBattleConfig.GetMoraleConfig(this.NH1)?.BattleScoreId ?? 0, t = ConfigManager_1.ConfigManager.BattleScoreConfig.GetBattleScoreConfig(t))) {
      this.VH1 = ConfigManager_1.ConfigManager.BattleScoreConfig.GetBattleScoreActionConfigByGroupId(t.LevelGroupId);
    }
    return this.VH1;
  }
  GetLevelExp(t) {
    var e = this.NW1?.get(t);
    if (e !== undefined) {
      return e;
    }
    e = this.y91();
    if (t >= 0 && t < e.length) {
      e = ConfigManager_1.ConfigManager.MoraleBattleConfig?.GetExpConfig(t);
      if (e) {
        this.NW1 ||= new Map();
        this.NW1.set(t, e.Experience);
        return e.Experience;
      }
    }
    return 0;
  }
  GetTempLevelExpRange(t) {
    const e = this.VW1?.get(t);
    if (e !== undefined) {
      return e;
    }
    for (const i of this.jW1()) {
      if (i.Level === t || i.Level === 1 && t === 0) {
        this.VW1 ||= new Map();
        const e = [i.LowerUpperLimits[0], i.LowerUpperLimits[1]];
        if (t === 0) {
          e[0] = 0;
          e[1] = i.LowerUpperLimits[0];
        }
        this.VW1.set(t, e);
        return e;
      }
    }
    return [0, 0];
  }
  GetMoraleLevelUpExp(t) {
    let e = t ?? this.yL1;
    var t = this.GetMoraleMaxLevel();
    if (e >= t) {
      e = t - 1;
    }
    var t = this.GetLevelExp(e);
    var i = this.GetLevelExp(e + 1);
    return Math.max(0, i - t);
  }
  GetMoraleCurrentLevelExp() {
    var t;
    if (this.yL1 === 1) {
      return this.vL1;
    } else if (this.yL1 === this.GetMoraleMaxLevel()) {
      return this.GetMoraleLevelUpExp(this.yL1 - 1);
    } else {
      t = this.GetLevelExp(this.yL1 - 1);
      return Math.max(0, this.vL1 - t);
    }
  }
  GetMoraleCurrentExpProgress() {
    var t;
    var e;
    if (this.yL1 === this.GetMoraleMaxLevel()) {
      return 1;
    } else {
      t = this.GetMoraleCurrentLevelExp();
      if ((e = this.GetMoraleLevelUpExp()) !== 0) {
        return t / e;
      } else {
        return 0;
      }
    }
  }
  GetTempMoraleLevelUpExp(t) {
    t = t ?? this.C91;
    t = this.GetTempLevelExpRange(t);
    return Math.max(0, t[1] - t[0]);
  }
  GetTempMoraleLevelExp() {
    var t = this.GetTempLevelExpRange(this.C91);
    return Math.max(0, this.p91 - t[0]);
  }
  GetTempMoraleExpProgress() {
    var t = this.GetTempMoraleLevelExp();
    var e = this.GetTempMoraleLevelUpExp();
    if (e !== 0) {
      return Math.min(1, t / e);
    } else {
      return 0;
    }
  }
  HandleMoraleInfoNotify(t) {
    this.NH1 = t.RR1;
    this.Xdu = t.o_u;
    var e;
    var i;
    var s;
    var r;
    var h = t.g9n;
    if (!this.EL1) {
      this.y91();
      this.GetMoraleMaxExp();
      this.S91(t);
      this.EL1 = true;
    }
    if (this.IsMoraleActive() !== h) {
      this.SetMoraleActive(h);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnMoraleActiveChanged, h);
    }
    if (h) {
      i = (h = this.yL1) + (e = this.C91) !== t.wR1 + t.PR1;
      s = Math.min(this.Squ, t.AR1);
      if (this.vL1 !== s) {
        r = this.vL1;
        this.vL1 = s;
        this.yL1 = t.wR1;
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnMoraleExpChanged, r, this.vL1, h, this.yL1);
      }
      if (this.p91 !== t.xR1) {
        s = this.p91;
        this.p91 = t.xR1;
        this.C91 = t.PR1;
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnMoraleTempExpChanged, s, this.p91, e, this.C91);
      }
      if (i) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnMoraleSumLevelChanged, h, this.yL1, e, this.C91);
      }
      if (this.KN1 !== t.LR1) {
        r = this.KN1;
        this.KN1 = t.LR1;
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnMoraleIndomitableLevelChanged, r, this.KN1);
      }
      if (t.x9n === 1) {
        this.Iyu = h;
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnMoraleBattleFail);
      }
    } else {
      this.S91(t);
    }
  }
  S91(t) {
    this.vL1 = Math.min(this.Squ, t.AR1);
    this.yL1 = t.wR1;
    this.KN1 = t.LR1;
    this.C91 = t.PR1;
    this.p91 = t.xR1;
  }
  GetMoraleLevelDiffType(t, e) {
    var i = (e ?? this.GetMoraleLevel() + this.GetTempMoraleLevel()) - t;
    var e = ConfigManager_1.ConfigManager.MoraleBattleConfig.GetAllLevelDiffShowConfig();
    let s = 0;
    if (e) {
      for (const r of e) {
        if (i >= r.LevelDiffLower && i < r.LevelDiffUpper) {
          if ((s = r.MonsterLevelPattern) > 2) {
            s = 2;
          } else if (s < 0) {
            s = 0;
          }
          break;
        }
      }
    }
    return s;
  }
}
exports.MoraleBattleModel = MoraleBattleModel;
//# sourceMappingURL=MoraleBattleModel.js.map