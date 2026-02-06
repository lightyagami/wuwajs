"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WheelTowerModel = undefined;
const CommonDefine_1 = require("../../../../../Core/Define/CommonDefine");
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const ModelBase_1 = require("../../../../../Core/Framework/ModelBase");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const WheelTowerDefine_1 = require("./WheelTowerDefine");
const displaySkillTypes = [11, 2, 3, 6];
class WheelTowerModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.yof = -1;
    this.Sof = undefined;
    this.Mof = -1;
    this.EndlessMode = false;
    this.SelectedRound = -1;
    this.SelectedBuff = -1;
    this.SelectedRoleList = [];
    this.SelectedEnergyInfo = undefined;
    this.TmpSelectedRoleMap = new Map();
    this.T0f = new Map();
    this.BlockEndlessUnlockTips = true;
    this.lZf = false;
    this.CachedRoundInProgress = -1;
    this.IsTimeStopBanned = false;
    this.Tof = new Map();
    this.bof = new Map();
    this.Rof = new Set();
    this.TmpSelectRoleId = 0;
  }
  OnInit() {
    this.$Nr();
    return true;
  }
  OnClear() {
    this.wof();
    return true;
  }
  SetActivityId(e) {
    this.yof = e;
  }
  get ActivityData() {
    return ModelManager_1.ModelManager.ActivityModel.GetActivityById(this.yof);
  }
  GetTowerConfig() {
    return ConfigManager_1.ConfigManager.WheelTowerConfig.GetTowerConfig(this.ActivityData.CycleId);
  }
  GetTeamMaxRoleCount() {
    return this.GetTowerConfig().RoleCount;
  }
  GetRoleCost(e) {
    if (!this.Sof) {
      this.Sof = new Map();
      this.GetTowerConfig().CostEnergy.forEach((e, t) => {
        this.Sof.set(t, e);
      });
      this.Mof = this.GetTowerConfig().DefaultCostEnergy;
    }
    return this.Sof.get(e) ?? this.Mof;
  }
  GetSeasonCountDownData() {
    var e = this.ActivityData.EndOpenTime;
    let t = MathUtils_1.MathUtils.LongToNumber(e) - TimeUtil_1.TimeUtil.GetServerTime();
    var e = (t = t <= 1 ? 1 : t) >= CommonDefine_1.SECOND_PER_DAY ? 3 : t >= CommonDefine_1.SECOND_PER_HOUR ? 2 : 1;
    var r = t >= CommonDefine_1.SECOND_PER_DAY ? 2 : t >= CommonDefine_1.SECOND_PER_HOUR ? 1 : 0;
    return TimeUtil_1.TimeUtil.GetCountDownDataFormat2(t, e, r);
  }
  GetCurrentLevelRecord() {
    return this.ActivityData.GetLevelRecord(this.EndlessMode);
  }
  GetTotalScore() {
    return this.ActivityData.GetTotalScore(this.EndlessMode);
  }
  GetBestTotalScore() {
    return this.ActivityData.GetHistoryBestScore(this.EndlessMode);
  }
  GetLevelBuffList() {
    var e = this.GetCurrentLevelRecord().gG_;
    return ConfigManager_1.ConfigManager.WheelTowerConfig.GetLevelConfigById(e).NewTowerBuffs;
  }
  GetLevelCanSelectBuffCount() {
    var e = this.GetCurrentLevelRecord().gG_;
    return ConfigManager_1.ConfigManager.WheelTowerConfig.GetLevelConfigById(e).NewTowerBuffCount;
  }
  IsLevelCompleted(e) {
    return !e && !!(e = this.ActivityData.GetLevelRecord(false).Hif) && !(this.GetBossHpPercentage(e) > 0);
  }
  GetLastChallengeRound() {
    return this.GetCurrentLevelRecord().jif.length - 1;
  }
  IsRoundChallenged(e) {
    return e <= this.GetLastChallengeRound();
  }
  HasChallengeAnyRound() {
    return this.GetLastChallengeRound() >= 0;
  }
  GetMaxChallengeRound() {
    var e = this.GetLastChallengeRound();
    if (this.IsLastRound(e)) {
      return e;
    } else {
      return e + 1;
    }
  }
  IsLastRound(e) {
    var t;
    return !this.EndlessMode && !((t = this.GetLastChallengeRound()) < 0) && !(e < t) && (t = this.GetCurrentLevelRecord(), this.GetRoundBossInfo(e).findIndex(e => e.HpPercentage > 0) < 0 || this.IsLastRoundCheckLimit(t.gG_, e));
  }
  IsLastRoundCheckLimit(e, t) {
    e = ConfigManager_1.ConfigManager.WheelTowerConfig.GetLevelConfigById(e).TeamLimit;
    return e !== 0 && t === e - 1;
  }
  GetRoundBossRound(e) {
    let t = undefined;
    var r = this.GetCurrentLevelRecord();
    var i = this.IsRoundChallenged(e);
    return (t = i ? r.jif[e].Yif : r.Hif).UJ_;
  }
  GetRoundBossInfo(e) {
    let t = undefined;
    var r = this.GetCurrentLevelRecord();
    var i = this.IsRoundChallenged(e);
    const n = (t = i ? r.jif[e].Yif : r.Hif).Wif;
    const s = t.UJ_;
    const o = this.GetBossHpPercentage(t);
    i = this.GetWaveBatch(r.gG_, n);
    const h = i.findIndex(e => e === n);
    const a = [];
    i.forEach((e, t) => {
      let r = 0;
      if (t === h) {
        r = o;
      } else if (t > h) {
        r = 100;
      }
      a.push({
        WaveConfigId: e,
        Round: s,
        HpPercentage: r
      });
    });
    return a;
  }
  GetPrevRoundBossInfo(e) {
    var t = this.GetRoundBossInfo(e);
    if (e === 0) {
      t.forEach(e => {
        e.HpPercentage = 100;
      });
    } else {
      e = this.GetRoundBossInfo(e - 1);
      if (t[0].Round === e[0].Round) {
        return e;
      }
      t.forEach(e => {
        e.HpPercentage = 100;
      });
    }
    return t;
  }
  GetRecordPrevBossHpPercentage(t, r, i) {
    var n = this.GetCurrentLevelRecord();
    for (let e = Math.min(t, n.jif.length); e >= 0; e--) {
      var s = n.jif[e].Yif;
      if (s?.Wif === r && s?.UJ_ === i) {
        return this.GetBossHpPercentage(s);
      }
    }
    return 100;
  }
  GetBossHpPercentage(e) {
    if (e.$7s) {
      return 0;
    } else {
      e = e.Qif;
      return MathUtils_1.MathUtils.Clamp(e / 100, 0.01, 100);
    }
  }
  GetWaveBatch(e, t) {
    var t = ConfigManager_1.ConfigManager.WheelTowerConfig.GetWaveConfigById(t).Wave;
    var r = WheelTowerDefine_1.LEVEL_BOSS_NUM;
    var t = Math.floor((t - 1) / r) * r + 1;
    var i = t + r - 1;
    var n = [];
    for (let e = t; e <= i; e++) {
      n.push(e);
    }
    const s = ConfigManager_1.ConfigManager.WheelTowerConfig.GetWaveConfigListByLevelId(e);
    const o = [];
    n.forEach(e => {
      for (const t of s) {
        if (t.Wave === e) {
          o.push(t.Id);
          break;
        }
      }
    });
    return o;
  }
  GetRoundSelectBuffList(e) {
    return this.GetCurrentLevelRecord().jif[e].$As;
  }
  GetRoundSelectRoleIdList(e) {
    return this.GetCurrentLevelRecord().jif[e].Xif.map(e => e.Q6n);
  }
  GetRoundScore(e) {
    return this.ActivityData.GetRoundScore(this.EndlessMode, e);
  }
  GetRoundTotalScore(e) {
    return this.ActivityData.GetRoundTotalScore(this.EndlessMode, e);
  }
  GetSelectedRoundTotalScore() {
    return this.GetRoundTotalScore(this.SelectedRound);
  }
  SetEndlessMode(e) {
    if (this.EndlessMode !== e) {
      this.EndlessMode = e;
      this.ResetSelectedData();
    }
  }
  UpdateSelectRound(e, t = false) {
    if ((this.SelectedRound !== e || t) && (this.ResetSelectedData(), this.SelectedEnergyInfo = this.ActivityData.GetRoundEnergyInfo(this.EndlessMode, e), this.SelectedRound = e, this.IsRoundChallenged(e))) {
      this.SelectedBuff = this.GetRoundSelectBuffList(e)[0];
      this.SelectedRoleList = this.GetRoundSelectRoleIdList(e);
    }
  }
  ResetSelectedData() {
    this.SelectedRound = -1;
    this.SelectedBuff = -1;
    this.SelectedRoleList.length = 0;
  }
  CheckSelectTeamIsFull() {
    return this.SelectedRoleList.length >= this.GetTeamMaxRoleCount();
  }
  CheckSelectedRoleEnergyEnough() {
    var e = this.SelectedEnergyInfo;
    for (const t of this.SelectedRoleList) {
      if (e.GetRoleEnergy(t) <= 0) {
        return false;
      }
    }
    return true;
  }
  CheckBuffIsSelected() {
    return this.SelectedBuff > 0;
  }
  CheckSelectedIsConflict() {
    return this.CheckCurrentSelectConflict().length !== 0;
  }
  CheckCurrentSelectConflict() {
    return this.CheckConflictList(this.SelectedRoleList);
  }
  CheckConflictList(e) {
    const t = [];
    e.forEach(e => {
      e = this.CheckConflict(e);
      if (e) {
        t.push(e);
      }
    });
    return t;
  }
  CheckConflict(t) {
    if (!(t <= 0)) {
      var r = this.IsTemplateRole(t);
      if (!r) {
        var i = this.SelectedEnergyInfo;
        var r = this.GetRoleInfo(t);
        var n = !i.GetWeaponCanUse(r.Weapon, t);
        let e = false;
        for (const s of r.Phantom) {
          if (!i.GetPhantomCanUse(s, t)) {
            e = true;
            break;
          }
        }
        if (n || e) {
          return {
            RoleId: t,
            WeaponConflict: n,
            PhantomConflict: e
          };
        } else {
          return undefined;
        }
      }
    }
  }
  GetRoleInfo(e) {
    return {
      RoleId: e,
      Weapon: ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByRoleDataId(e).GetIncId(),
      Phantom: [...ModelManager_1.ModelManager.PhantomBattleModel.GetBattleDataById(e).GetIncrIdList()]
    };
  }
  TmpToSelect() {
    var t = [];
    for (let e = this.SelectedRoleList.length = 0; e < this.GetTeamMaxRoleCount(); e++) {
      var r = this.TmpSelectedRoleMap.get(e);
      if (r !== undefined) {
        t.push(r);
      }
    }
    this.SelectedRoleList.push(...t);
  }
  SelectToTmp() {
    this.TmpSelectedRoleMap.clear();
    this.SelectedRoleList.forEach((e, t) => {
      this.TmpSelectedRoleMap.set(t, e);
    });
  }
  SetTmpSelectRoleList(e) {
    this.TmpSelectedRoleMap.clear();
    e.forEach((e, t) => {
      this.TmpSelectedRoleMap.set(t, e);
    });
  }
  TryAddOrDeleteRole(e) {
    var t;
    var r = this.GetRoleSlot(e);
    if (r === -1) {
      if ((t = this.Lof()) >= 0) {
        this.TmpSelectedRoleMap.set(t, e);
      } else {
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("WheelTower_TeamSelectFullTips");
      }
    } else {
      this.TmpSelectedRoleMap.delete(r);
    }
  }
  GetRoleSlot(t) {
    if (!(t <= 0)) {
      for (let e = 0; e < this.GetTeamMaxRoleCount(); e++) {
        if (this.TmpSelectedRoleMap.get(e) === t) {
          return e;
        }
      }
    }
    return -1;
  }
  IsSelectRole(e) {
    return this.GetRoleSlot(e) >= 0;
  }
  IsTempHasAnyEmptySlot() {
    return this.Lof() >= 0;
  }
  Lof() {
    for (let e = 0; e < this.GetTeamMaxRoleCount(); e++) {
      if (!this.TmpSelectedRoleMap.has(e)) {
        return e;
      }
    }
    return -1;
  }
  GetRecordPopupData() {
    return this.T0f.get(this.EndlessMode);
  }
  SetRecordPopupData(e) {
    this.T0f.set(this.EndlessMode, e);
  }
  DeleteRecordPopupData() {
    this.T0f.delete(this.EndlessMode);
  }
  GetScoreResourceIdByLevel(e) {
    return WheelTowerDefine_1.levelItemMappingTable.get(e) ?? "";
  }
  GetRoundScoreLevel(e) {
    return 0;
  }
  GetTotalScoreLevel(e) {
    var t;
    var r;
    var i = this.GetCurrentLevelRecord().gG_;
    let n = 0;
    for ([t, r] of ConfigManager_1.ConfigManager.WheelTowerConfig.GetLevelConfigById(i).ScoreLevelRule) {
      if (!(e >= r)) {
        break;
      }
      n = t;
    }
    return n;
  }
  CheckInInstanceDungeon() {
    var e;
    return !!ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() && (e = ModelManager_1.ModelManager.CreatureModel.GetInstanceId(), ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e)?.InstSubType === 47);
  }
  GetIsEndlessUnlockedInInstance() {
    return !!this.lZf && !(this.lZf = false);
  }
  SetIsEndlessUnlockedInInstance(e) {
    this.lZf = e;
  }
  GetNextCycleRemainTime() {
    var e;
    var t = this.ActivityData.CycleBeginTime;
    if (t !== -1) {
      e = TimeUtil_1.TimeUtil.GetServerTime();
      return this.F0g(t - e);
    }
  }
  F0g(e) {
    var t = (e = e <= 1 ? 1 : e) >= CommonDefine_1.SECOND_PER_DAY ? 3 : e >= CommonDefine_1.SECOND_PER_HOUR ? 2 : 1;
    var r = e >= CommonDefine_1.SECOND_PER_DAY ? 2 : e >= CommonDefine_1.SECOND_PER_HOUR ? 1 : 0;
    return TimeUtil_1.TimeUtil.GetCountDownDataFormat2(e, t, r).CountDownText;
  }
  $Nr() {
    ConfigManager_1.ConfigManager.WheelTowerConfig.GetRoleConfigList()?.forEach(e => {
      if (e.AddBuffs.length > 0) {
        this.Rof.add(e.Id);
      }
      if (e.TemplateRoleId !== 0) {
        this.Tof.set(e.Id, e.TemplateRoleId);
        this.bof.set(e.TemplateRoleId, e.Id);
      }
    });
  }
  wof() {
    this.Tof.clear();
    this.bof.clear();
    this.Rof.clear();
  }
  IsTemplateRole(e) {
    return this.bof.has(e);
  }
  GetTemplateRoleId(e) {
    return this.Tof.get(e) ?? 0;
  }
  GetRealRoleId(e) {
    return this.bof.get(e) ?? 0;
  }
  TryGetRealRoleId(e) {
    if (this.IsTemplateRole(e)) {
      return this.GetRealRoleId(e);
    } else {
      return e;
    }
  }
  GetTemplateRoleDesc(e) {
    e = this.TryGetRealRoleId(e);
    return ConfigManager_1.ConfigManager.WheelTowerConfig.GetRoleConfigByRoleId(e).TemplateDesc;
  }
  IsEnhanceRole(e) {
    e = this.TryGetRealRoleId(e);
    return this.Rof.has(e);
  }
  GetRoleEnhanceDesc(e) {
    const r = ConfigManager_1.ConfigManager.WheelTowerConfig.GetRoleConfigByRoleId(e);
    const i = [];
    displaySkillTypes.forEach(e => {
      var t = r.EnhanceSkillDesc.get(e);
      var e = r.EnhanceSkillDescParam.get(e);
      if (t !== undefined && e !== undefined) {
        i.push(this.Qdf(t, e.ArrayString));
      }
    });
    return i;
  }
  Qdf(e, t) {
    e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e);
    return StringUtils_1.StringUtils.Format(e, ...t);
  }
  IsEnhanceSkill(e, t) {
    return !!this.IsEnhanceRole(e) && (t = ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillConfigById(t).SkillType, this.GetRoleSkillEnhanceDescAndParam(e, t) !== undefined);
  }
  GetRoleSkillEnhanceDescAndParam(e, t) {
    var e = ConfigManager_1.ConfigManager.WheelTowerConfig.GetRoleConfigByRoleId(e);
    var r = e.EnhanceSkillDesc.get(t);
    if (r) {
      e = e.EnhanceSkillDescParam.get(t);
      if (e) {
        return [r, e.ArrayString];
      }
    }
  }
}
exports.WheelTowerModel = WheelTowerModel;
//# sourceMappingURL=WheelTowerModel.js.map