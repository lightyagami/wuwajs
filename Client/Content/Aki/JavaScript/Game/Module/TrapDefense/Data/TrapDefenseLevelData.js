"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseLevelData = undefined;
const Json_1 = require("../../../../Core/Common/Json");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const LevelGeneralDefine_1 = require("../../../LevelGamePlay/LevelGeneralDefine");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const TrapDefenseDefine_1 = require("../TrapDefenseDefine");
class TrapDefenseLevelData {
  constructor(e) {
    this.Id = 0;
    this.Config = undefined;
    this.IsUnlockCondition = false;
    this.IsPassed = false;
    this.IsRewarded = false;
    this.UnlockTime = 0;
    this.IsLeaved = false;
    this.ReachTargetIndexList = [];
    this.MaxFinishWaveTimes = 0;
    this.Position = 1;
    this.IsEndless = false;
    this.HasShop = false;
    this.Id = e;
  }
  static Create(e) {
    var t = new TrapDefenseLevelData(e.Id);
    t.Config = e;
    t.AU();
    return t;
  }
  AU() {
    for (const e of this.Config.RewardAuxiliaryTypes) {
      ModelManager_1.ModelManager.TrapDefenseModel.ViewModelBuildingDevelop.LevelUnlockAuxiliary.set(e, this.Id);
    }
    for (const t of this.Config.RewardBuildingTypes) {
      ModelManager_1.ModelManager.TrapDefenseModel.ViewModelBuildingDevelop.LevelUnlockBuilding.set(t, this.Id);
    }
    this.IsEndless = this.Config.ModeType === 3;
    this.HasShop = this.j0d();
  }
  j0d() {
    for (const e of ConfigManager_1.ConfigManager.TrapDefenseConfig.GetTrapDefenseWavesByLevelId(this.Id)) {
      if (e.ShopConfigId > 0) {
        return true;
      }
    }
    return false;
  }
  get IsUnlock() {
    return this.IsUnlockCondition && this.IsReachOpenTime();
  }
  SetPosition(e) {
    this.Position = e;
  }
  ProtoUpdateData(e) {
    this.IsUnlockCondition = e.CMs;
    this.ReachTargetIndexList = e.j6n;
    this.IsPassed = e.Ezs;
    this.IsRewarded = e.mLs;
    if (this.Config.OpenDay > 0) {
      this.UnlockTime = MathUtils_1.MathUtils.LongToNumber(e.yzs) * TimeUtil_1.TimeUtil.Millisecond;
    }
    this.IsLeaved = e.vHc;
    this.MaxFinishWaveTimes = e.nJc;
  }
  GetStarStateList() {
    const i = this.ReachTargetIndexList.length;
    return this.Config.StarRatingConditions.map((e, t) => i > t);
  }
  IsDifficulty(e) {
    return this.Config.Difficulty === e;
  }
  GetPositionFormat(e = 2) {
    return this.Position.toString().padStart(e, "0");
  }
  GetTargetInfoList() {
    const r = this.ReachTargetIndexList.length;
    return this.Config.StarRatingConditions.map((e, t) => {
      var [e, i] = e.ArrayInt;
      var t = t + 1;
      return {
        Info: TrapDefenseDefine_1.trapDefenseLevelTargetRecord[e] ?? TrapDefenseDefine_1.trapDefenseLevelTargetRecord[1],
        TargetValue: i,
        TargetStar: t,
        IsFinish: r >= t
      };
    });
  }
  GetRewardShowList() {
    var e = [];
    if (this.Config.RewardMoneyCount) {
      e.push({
        TypeNameKey: "TrapDefenseLevelRewardTitleTalent",
        ItemType: 0,
        LevelData: this
      });
    }
    if (this.Config.RewardBuildingTypes.length > 0 || this.Config.RewardAuxiliaryTypes.length > 0) {
      e.push({
        TypeNameKey: "TrapDefenseLevelRewardTitleMachine",
        ItemType: 1,
        LevelData: this
      });
    }
    if (this.Config.RewardBd.length > 0) {
      e.push({
        TypeNameKey: "TrapDefenseLevelRewardTitleBdBuff",
        ItemType: 2,
        LevelData: this
      });
    }
    return e;
  }
  GetRewardShowListMachineData() {
    const t = [];
    this.Config.RewardAuxiliaryTypes.forEach(e => {
      t.push({
        Type: 0,
        IsFinish: this.IsPassed,
        Id: ModelManager_1.ModelManager.TrapDefenseModel.ComposeMachineId({
          MachineType: 2,
          DataType: e,
          Level: 1,
          Branch: 0
        })
      });
    });
    this.Config.RewardBuildingTypes.forEach(e => {
      t.push({
        Type: 0,
        IsFinish: this.IsPassed,
        Id: ModelManager_1.ModelManager.TrapDefenseModel.ComposeMachineId({
          MachineType: 1,
          DataType: e,
          Level: 1,
          Branch: 0
        })
      });
    });
    return t;
  }
  GetRewardShowListBdBuffData() {
    const t = [];
    this.Config.RewardBd.forEach(e => {
      t.push({
        Type: 1,
        Id: e,
        IsFinish: this.IsPassed
      });
    });
    return t;
  }
  IsReachOpenTime() {
    return this.UnlockTime <= 0 || TimeUtil_1.TimeUtil.GetServerTime() >= this.UnlockTime;
  }
  IsReachOpenTimeIgnoreZero() {
    return !(this.UnlockTime <= 0) && TimeUtil_1.TimeUtil.GetServerTime() >= this.UnlockTime;
  }
  GetUnlockTimeFormat() {
    return TimeUtil_1.TimeUtil.DateFormat4String(this.UnlockTime);
  }
  GetShowActorLabelStr() {
    return `Level_${this.Id}_ModeType-${this.Config.ModeType}_IsUnlock-${this.IsUnlock}_IsPassed-${this.IsPassed}_IsRewarded-${this.IsRewarded}_MaxWave-${this.MaxFinishWaveTimes}_UnlockTime-${this.UnlockTime}(${this.GetUnlockTimeFormat()})`;
  }
  GetDifficultyUiInfo() {
    var e = this.Config.Difficulty;
    return TrapDefenseDefine_1.trapDefenseDifficultyLevelRecord[e] ?? TrapDefenseDefine_1.trapDefenseDifficultyLevelRecord[1];
  }
  GetPreviewMapResource() {
    return this.Config.LevelMapUiShow;
  }
  GetShowBdList() {
    return this.Config.UseBdList.map(e => ModelManager_1.ModelManager.TrapDefenseModel.RougeModeData.BdDataMap.get(e)).filter(e => e && !e.IsZeroBdType());
  }
  IsFullStarPassed() {
    return !!this.IsPassed && this.Config.StarRatingConditions.length >= this.ReachTargetIndexList.length;
  }
  GetOpenConditionLockCondition() {
    var e = this.Config.OpenCondition;
    var t = ConfigManager_1.ConfigManager.ConditionConfig?.GetConditionGroupConfig(e);
    for (const r of t?.GroupId ?? []) {
      var i = ConfigManager_1.ConfigManager.ConditionConfig.GetConditionConfig(r);
      if (!ControllerHolder_1.ControllerHolder.LevelGeneralController.HandleCondition(i, undefined, e.toString())) {
        return [i.Type, i.NeedNum, t.HintText, i.LimitParams];
      }
    }
    return [LevelGeneralDefine_1.ELevelGeneralCondition.AlwaysFalse, 0, "", new Map()];
  }
  IsBossWave(e) {
    if (e <= 0) {
      return false;
    }
    if (ModelManager_1.ModelManager.TrapDefenseModel.ViewModelMonster.LevelData?.Id === this.Id) {
      var t = ModelManager_1.ModelManager.TrapDefenseModel.ViewModelMonster.GetMonsterWaveDataList()[e - 1];
      if (t) {
        return t.HaveBoss();
      }
    }
    return this.pwd(this.Config.MonsterWaveMainId, e);
  }
  pwd(e, t) {
    let i = 1;
    for (const a of ConfigManager_1.ConfigManager.TrapDefenseConfig.GetCsvMainConfigByMonsterWaveMainId(e)) {
      var r = Math.max(a.RepeatTimes, 1);
      var r = Array.from({
        length: r
      }).flatMap(() => a.Ids);
      if (r.length > t - i) {
        var s = ConfigManager_1.ConfigManager.TrapDefenseConfig.GetCsvWaveConfigByWaveId(r[t - i]);
        var s = Json_1.Json.Parse(s.SpawnMonsters);
        const n = ModelManager_1.ModelManager.TrapDefenseModel.ViewModelMonster.GetMonsterMap();
        return s.some(e => {
          e = e.MonsterGroup;
          return ConfigManager_1.ConfigManager.TrapDefenseConfig.GetCsvMonsterGroupConfigByMonsterId(e.Id).some(e => !!n.get(e.Id)?.IsBoss());
        });
      }
      i += r.length;
    }
    return false;
  }
}
exports.TrapDefenseLevelData = TrapDefenseLevelData;
//# sourceMappingURL=TrapDefenseLevelData.js.map