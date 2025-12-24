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
    this.dif = -1;
    this.mif = undefined;
    this.fif = -1;
    this.EndlessMode = false;
    this.SelectedRound = -1;
    this.SelectedBuff = -1;
    this.SelectedRoleList = [];
    this.SelectedEnergyInfo = undefined;
    this.TmpSelectedRoleMap = new Map();
    this.hff = new Map();
    this.BlockEndlessUnlockTips = true;
    this.s9f = false;
    this.CachedRoundInProgress = -1;
    this.IsTimeStopBanned = false;
    this.pif = new Map();
    this.vif = new Map();
    this.yif = new Set();
    this.TmpSelectRoleId = 0;
  }
  OnInit() {
    this.$Nr();
    return true;
  }
  OnClear() {
    this.Sif();
    return true;
  }
  SetActivityId(e) {
    this.dif = e;
  }
  get ActivityData() {
    return ModelManager_1.ModelManager.ActivityModel.GetActivityById(this.dif);
  }
  GetTowerConfig() {
    return ConfigManager_1.ConfigManager.WheelTowerConfig.GetTowerConfig(this.ActivityData.CycleId);
  }
  GetTeamMaxRoleCount() {
    return this.GetTowerConfig().RoleCount;
  }
  GetRoleCost(e) {
    if (!this.mif) {
      this.mif = new Map();
      this.GetTowerConfig().CostEnergy.forEach((e, t) => {
        this.mif.set(t, e);
      });
      this.fif = this.GetTowerConfig().DefaultCostEnergy;
    }
    return this.mif.get(e) ?? this.fif;
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
    return !e && !!(e = this.ActivityData.GetLevelRecord(false).kef) && !(this.GetBossHpPercentage(e) > 0);
  }
  GetLastChallengeRound() {
    return this.GetCurrentLevelRecord().qef.length - 1;
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
    return (t = i ? r.qef[e].Hef : r.kef).UJ_;
  }
  GetRoundBossInfo(e) {
    let t = undefined;
    var r = this.GetCurrentLevelRecord();
    var i = this.IsRoundChallenged(e);
    const s = (t = i ? r.qef[e].Hef : r.kef).Gef;
    const n = t.UJ_;
    const o = this.GetBossHpPercentage(t);
    i = this.GetWaveBatch(r.gG_, s);
    const h = i.findIndex(e => e === s);
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
        Round: n,
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
    var s = this.GetCurrentLevelRecord();
    for (let e = Math.min(t, s.qef.length); e >= 0; e--) {
      var n = s.qef[e].Hef;
      if (n?.Gef === r && n?.UJ_ === i) {
        return this.GetBossHpPercentage(n);
      }
    }
    return 100;
  }
  GetBossHpPercentage(e) {
    if (e.$7s) {
      return 0;
    } else {
      e = e.Fef;
      return MathUtils_1.MathUtils.Clamp(e / 100, 0.01, 100);
    }
  }
  GetWaveBatch(e, t) {
    var t = ConfigManager_1.ConfigManager.WheelTowerConfig.GetWaveConfigById(t).Wave;
    var r = WheelTowerDefine_1.LEVEL_BOSS_NUM;
    var t = Math.floor((t - 1) / r) * r + 1;
    var i = t + r - 1;
    var s = [];
    for (let e = t; e <= i; e++) {
      s.push(e);
    }
    const n = ConfigManager_1.ConfigManager.WheelTowerConfig.GetWaveConfigListByLevelId(e);
    const o = [];
    s.forEach(e => {
      for (const t of n) {
        if (t.Wave === e) {
          o.push(t.Id);
          break;
        }
      }
    });
    return o;
  }
  GetRoundSelectBuffList(e) {
    return this.GetCurrentLevelRecord().qef[e].$As;
  }
  GetRoundSelectRoleIdList(e) {
    return this.GetCurrentLevelRecord().qef[e].Vef.map(e => e.Q6n);
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
        var s = !i.GetWeaponCanUse(r.Weapon, t);
        let e = false;
        for (const n of r.Phantom) {
          if (!i.GetPhantomCanUse(n, t)) {
            e = true;
            break;
          }
        }
        if (s || e) {
          return {
            RoleId: t,
            WeaponConflict: s,
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
      if ((t = this.Mif()) >= 0) {
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
    return this.Mif() >= 0;
  }
  Mif() {
    for (let e = 0; e < this.GetTeamMaxRoleCount(); e++) {
      if (!this.TmpSelectedRoleMap.has(e)) {
        return e;
      }
    }
    return -1;
  }
  GetRecordPopupData() {
    return this.hff.get(this.EndlessMode);
  }
  SetRecordPopupData(e) {
    this.hff.set(this.EndlessMode, e);
  }
  DeleteRecordPopupData() {
    this.hff.delete(this.EndlessMode);
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
    let s = 0;
    for ([t, r] of ConfigManager_1.ConfigManager.WheelTowerConfig.GetLevelConfigById(i).ScoreLevelRule) {
      if (!(e >= r)) {
        break;
      }
      s = t;
    }
    return s;
  }
  CheckInInstanceDungeon() {
    var e;
    return !!ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() && (e = ModelManager_1.ModelManager.CreatureModel.GetInstanceId(), ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e)?.InstSubType === 47);
  }
  GetIsEndlessUnlockedInInstance() {
    return !!this.s9f && !(this.s9f = false);
  }
  SetIsEndlessUnlockedInInstance(e) {
    this.s9f = e;
  }
  $Nr() {
    ConfigManager_1.ConfigManager.WheelTowerConfig.GetRoleConfigList()?.forEach(e => {
      if (e.AddBuffs.length > 0) {
        this.yif.add(e.Id);
      }
      if (e.TemplateRoleId !== 0) {
        this.pif.set(e.Id, e.TemplateRoleId);
        this.vif.set(e.TemplateRoleId, e.Id);
      }
    });
  }
  Sif() {
    this.pif.clear();
    this.vif.clear();
    this.yif.clear();
  }
  IsTemplateRole(e) {
    return this.vif.has(e);
  }
  GetTemplateRoleId(e) {
    return this.pif.get(e) ?? 0;
  }
  GetRealRoleId(e) {
    return this.vif.get(e) ?? 0;
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
    return this.yif.has(e);
  }
  GetRoleEnhanceDesc(e) {
    const r = ConfigManager_1.ConfigManager.WheelTowerConfig.GetRoleConfigByRoleId(e);
    const i = [];
    displaySkillTypes.forEach(e => {
      var t = r.EnhanceSkillDesc.get(e);
      var e = r.EnhanceSkillDescParam.get(e);
      if (t !== undefined && e !== undefined) {
        i.push(this.Yuf(t, e.ArrayString));
      }
    });
    return i;
  }
  Yuf(e, t) {
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