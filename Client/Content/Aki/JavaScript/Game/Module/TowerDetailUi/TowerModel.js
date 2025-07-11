"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TowerModel = exports.TOWER_LOOP_ACTIVITY_ID = exports.LOCK_COLOR = exports.NORMOL_COLOR = exports.FINISH_COLOR = exports.FLOOR_STAR = undefined;
const CommonDefine_1 = require("../../../Core/Define/CommonDefine");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../Common/LocalStorageDefine");
const TimeUtil_1 = require("../../Common/TimeUtil");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const UiManager_1 = require("../../Ui/UiManager");
const EditBattleTeamController_1 = require("../EditBattleTeam/EditBattleTeamController");
const TowerData_1 = require("./TowerData");
exports.FLOOR_STAR = 3;
exports.FINISH_COLOR = "#FFD12F";
exports.NORMOL_COLOR = "#ECE5D8";
exports.LOCK_COLOR = "#ADADAD";
exports.TOWER_LOOP_ACTIVITY_ID = 100300002;
class TowerModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.TowerBeginTime = undefined;
    this.TowerEndTime = undefined;
    this.CurrentSeason = -1;
    this.DataSeason = 0;
    this.CurrentSelectDifficulties = -1;
    this.CurrentTowerId = -1;
    this.CurrentTowerFormation = undefined;
    this.NeedChangeFormation = false;
    this.CurrentNotConfirmedFloor = undefined;
    this.NeedOpenConfirmViewTowerId = -1;
    this.NeedOpenConfirmView = false;
    this.CurrentSelectFloor = -1;
    this.RoleDifficultyFormationMap = new Map();
    this.RecommendFormation = undefined;
    this.CurrentTowerLock = false;
    this.DefaultFloor = -1;
    this.HLo = 0;
    this.TowerGuideDelayTime = 0;
    this.TowerSettlementDelayTime = 0;
    this.jLo = new Map();
    this.WLo = undefined;
    this.KLo = -1;
    this.QLo = new Map();
    this.XLo = new Map();
    this.$Lo = undefined;
    this.NeedOpenReviveView = false;
    this.MaxUnlockDifficulty = 0;
    this.IsWaitTowerStart = false;
    this.IsWaitTowerSettlement = false;
  }
  OnInit() {
    this.HLo = CommonParamById_1.configCommonParamById.GetIntConfig("TowerRoleTotalCost");
    this.TowerGuideDelayTime = CommonParamById_1.configCommonParamById.GetIntConfig("TowerGuideDelayTime");
    this.TowerSettlementDelayTime = CommonParamById_1.configCommonParamById.GetIntConfig("TowerSettleDelayTime");
    this.FGt();
    return true;
  }
  OnLeaveLevel() {
    this.CurrentSelectFloor = -1;
    return true;
  }
  FGt() {
    this.YLo(TowerData_1.LOW_RISK_DIFFICULTY, undefined);
    this.YLo(TowerData_1.HIGH_RISK_DIFFICULTY, undefined);
    this.YLo(TowerData_1.VARIATION_RISK_DIFFICULTY, undefined);
    this.YLo(TowerData_1.OVERLOCK_RISK_DIFFICULTY, undefined);
  }
  RefreshTowerInfo(t) {
    this.TowerBeginTime = t.cps;
    this.TowerEndTime = t.dps;
    this.MaxUnlockDifficulty = t.wGs;
    if (this.CurrentSeason !== t.EGs) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, exports.TOWER_LOOP_ACTIVITY_ID);
    }
    this.CurrentSeason = t.EGs;
    this.DataSeason = t.yGs;
    this.RefreshTowerInfoByDifficulty(t.IGs);
  }
  RefreshTowerInfoByFloor(t) {
    for (const e of t) {
      this.JLo(e);
    }
  }
  RefreshTowerInfoByDifficulty(t) {
    for (const e of t) {
      this.YLo(e.ljn, e.I9n);
      this.zLo(e.TGs);
      this.XLo.set(e.ljn, e.LGs);
    }
  }
  DeleteVariationTowerInfo() {
    for (var [t, e] of this.jLo) {
      if (e.Difficulties === TowerData_1.VARIATION_RISK_DIFFICULTY) {
        this.jLo.delete(t);
      }
    }
    this.YLo(TowerData_1.VARIATION_RISK_DIFFICULTY, undefined);
    this.XLo.set(TowerData_1.VARIATION_RISK_DIFFICULTY, 0);
    for (var [, r] of this.RoleDifficultyFormationMap) {
      r.set(TowerData_1.VARIATION_RISK_DIFFICULTY, 0);
    }
  }
  GetFloorStars(t) {
    return this.jLo.get(t)?.Star;
  }
  GetFloorStarsIndex(t) {
    return this.jLo.get(t)?.StarIndex;
  }
  GetAreaStars(t, e, r = false) {
    let i = 0;
    if (r) {
      for (var [, o] of this.WLo) {
        if (o.Difficulties === t && o.Area === e) {
          i += o.Star;
        }
      }
    } else {
      for (var [, a] of this.jLo) {
        if (a.Difficulties === t && a.Area === e) {
          i += a.Star;
        }
      }
    }
    return i;
  }
  GetDifficultyMaxStars(t, e = false) {
    let r = undefined;
    return (r = e ? this.$Lo?.get(t) : this.XLo.get(t)) ?? 0;
  }
  GetDifficultyStars(t) {
    let e = 0;
    for (var [, r] of this.jLo) {
      if (r.Difficulties === t) {
        e += r.Star;
      }
    }
    return e;
  }
  GetAreaAllStars(t, e) {
    return exports.FLOOR_STAR * ConfigManager_1.ConfigManager.TowerClimbConfig.GetAreaFloorNumber(this.CurrentSeason, t, e);
  }
  GetDifficultyAllStars(t, e = false) {
    return exports.FLOOR_STAR * ConfigManager_1.ConfigManager.TowerClimbConfig.GetDifficultyFloorNumber(e ? this.KLo : this.CurrentSeason, t);
  }
  GetDifficultyReward(t) {
    t = this.QLo.get(t);
    if (t) {
      return t;
    }
  }
  GetHaveChallengeFloor(t) {
    return !!this.jLo.get(t);
  }
  GetHaveChallengeFloorAndFormation(t) {
    t = this.jLo.get(t);
    return !!t && !!t.Formation && t.Formation.length !== 0;
  }
  GetFloorData(t) {
    return this.jLo.get(t);
  }
  YLo(t, e) {
    var r = this.GetDifficultyReward(t);
    if (r) {
      for (const n of r) {
        n.IsReceived = e?.includes(n.Index);
      }
    } else {
      var i = ConfigManager_1.ConfigManager.TowerClimbConfig.GetDifficultyReward(t);
      var o = i.length;
      var a = [];
      for (let t = 0; t < o; t++) {
        var s = i[t];
        var s = new TowerData_1.TowerReward(s.Item1, s.Item2, t);
        s.IsReceived = e?.includes(t);
        a.push(s);
      }
      this.QLo.set(t, a);
    }
  }
  zLo(t) {
    for (const e of t) {
      for (const r of e.DGs) {
        this.JLo(r);
      }
    }
  }
  JLo(t) {
    let e = this.jLo.get(t.hjn);
    if (e) {
      e.Star = t.rxs;
      e.StarIndex = t.AGs;
      for (const r of e.Formation) {
        this.ReduceRoleFormationCost(r.Q6n, e.Difficulties, e.Cost);
      }
      e.Formation = t.ajn;
    } else {
      e = new TowerData_1.TowerFloorInfo(t.hjn, t.rxs, t.ajn, t.AGs);
      this.jLo.set(t.hjn, e);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnTowerRecordUpdate, t.hjn, e.Difficulties);
    }
    for (const i of e.Formation) {
      this.ZLo(i.Q6n, e.Difficulties, e.Cost);
    }
  }
  ZLo(t, e, r) {
    let i = this.RoleDifficultyFormationMap.get(t);
    var o;
    if (i) {
      if (o = i.get(e)) {
        o += r;
        i.set(e, o);
      } else {
        i.set(e, r);
      }
    } else {
      (i = new Map()).set(e, r);
    }
    this.RoleDifficultyFormationMap.set(t, i);
  }
  ReduceRoleFormationCost(t, e, r) {
    var i;
    var t = this.RoleDifficultyFormationMap.get(t);
    if (t && (i = t.get(e))) {
      t.set(e, i -= r);
    }
  }
  GetDifficultyProgress(t) {
    t = ConfigManager_1.ConfigManager.TowerClimbConfig.GetDifficultyAllFloor(this.CurrentSeason, t);
    let e = 0;
    for (const r of t) {
      if (this.jLo.get(r) !== undefined) {
        e++;
      }
    }
    return [e, t.length];
  }
  GetDifficultyIsClear(t) {
    if (!(this.MaxUnlockDifficulty > t)) {
      for (const e of ConfigManager_1.ConfigManager.TowerClimbConfig.GetDifficultyAllFloor(this.CurrentSeason, t)) {
        if (!this.jLo.get(e)) {
          return false;
        }
      }
    }
    return true;
  }
  GetMaxDifficulty() {
    if (this.GetDifficultyIsClear(TowerData_1.LOW_RISK_DIFFICULTY)) {
      if (this.GetDifficultyIsClear(TowerData_1.HIGH_RISK_DIFFICULTY)) {
        if (this.GetDifficultyRewardProgress(TowerData_1.VARIATION_RISK_DIFFICULTY) !== 1 || this.GetDifficultyRewardProgress(TowerData_1.OVERLOCK_RISK_DIFFICULTY) === 1) {
          return TowerData_1.VARIATION_RISK_DIFFICULTY;
        } else {
          return TowerData_1.OVERLOCK_RISK_DIFFICULTY;
        }
      } else {
        return TowerData_1.HIGH_RISK_DIFFICULTY;
      }
    } else {
      return TowerData_1.LOW_RISK_DIFFICULTY;
    }
  }
  GetDifficultyAllAreaFirstFloor(t, e = false) {
    return ConfigManager_1.ConfigManager.TowerClimbConfig.GetDifficultyAllAreaFirstFloor(e ? this.KLo : this.CurrentSeason, t);
  }
  GetDifficultyAreaAllFloor(t, e) {
    return ConfigManager_1.ConfigManager.TowerClimbConfig.GetDifficultyAreaAllFloor(this.CurrentSeason, t, e);
  }
  GetFloorIsUnlock(t) {
    return !!this.GetHaveChallengeFloor(t) || !(t = ConfigManager_1.ConfigManager.TowerClimbConfig.GetLastFloorInArea(t)) || this.GetHaveChallengeFloor(t);
  }
  GetRoleRemainCost(t, e) {
    var t = this.RoleDifficultyFormationMap.get(t);
    if (t = t && t.get(e)) {
      return this.HLo - t;
    } else {
      return this.HLo;
    }
  }
  GetFloorIncludeRole(t, e) {
    e = this.jLo.get(e);
    if (e) {
      for (const r of e.Formation) {
        if (r.Q6n === t) {
          return true;
        }
      }
    }
    return false;
  }
  OpenTowerFormationView(t) {
    this.CurrentSelectFloor = t;
    t = ConfigManager_1.ConfigManager.TowerClimbConfig.GetTowerInfo(t);
    EditBattleTeamController_1.EditBattleTeamController.PlayerOpenEditBattleTeamView(t.InstanceId);
  }
  IsOpenFloorFormation() {
    return this.CurrentSelectFloor !== -1;
  }
  GetCurrentFloorName() {
    var t = ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById("TowerAreaFloor");
    var t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t);
    var e = ConfigManager_1.ConfigManager.TowerClimbConfig.GetTowerInfo(this.CurrentTowerId);
    var r = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.AreaName);
    return t.replace("{0}", r).replace("{1}", "" + e.Floor);
  }
  GetFloorFormation(t) {
    var e = [];
    var t = this.jLo.get(t);
    if (t && t.Formation) {
      for (const r of t.Formation) {
        e.push(r.Q6n);
      }
    }
    return e;
  }
  SaveNeedOpenConfirmView() {
    this.NeedOpenConfirmViewTowerId = this.CurrentTowerId;
    this.NeedOpenConfirmView = true;
  }
  ClearNotConfirmedData() {
    this.NeedOpenConfirmViewTowerId = -1;
    this.NeedOpenConfirmView = false;
    this.CurrentNotConfirmedFloor = undefined;
  }
  OpenReviewView() {
    if (this.NeedOpenReviveView) {
      this.NeedOpenReviveView = false;
      if (this.GetDifficultyMaxStars(TowerData_1.VARIATION_RISK_DIFFICULTY, true) > 0) {
        UiManager_1.UiManager.OpenView("TowerReviewView");
      }
      this.DataSeason = this.CurrentSeason;
    }
  }
  SaveHandleData() {
    this.WLo = new Map(this.jLo);
    this.$Lo = new Map(this.XLo);
    this.KLo = this.CurrentSeason;
  }
  ClearHandleData() {
    this.WLo?.clear();
    this.WLo = undefined;
    this.$Lo?.clear();
    this.$Lo = undefined;
    this.KLo = -1;
  }
  CheckInTower() {
    return this.CurrentTowerId !== -1;
  }
  GetSeasonCountDownData() {
    let t = MathUtils_1.MathUtils.LongToNumber(this.TowerEndTime) - TimeUtil_1.TimeUtil.GetServerTime();
    var e = (t = t <= 1 ? 1 : t) >= CommonDefine_1.SECOND_PER_DAY ? 3 : t >= CommonDefine_1.SECOND_PER_HOUR ? 2 : 1;
    var r = t >= CommonDefine_1.SECOND_PER_DAY ? 2 : t >= CommonDefine_1.SECOND_PER_HOUR ? 1 : 0;
    return TimeUtil_1.TimeUtil.GetCountDownDataFormat2(t, e, r);
  }
  CanGetReward() {
    var t = this.GetDifficultyReward(this.CurrentSelectDifficulties);
    if (t) {
      var e = this.GetDifficultyMaxStars(this.CurrentSelectDifficulties);
      for (const r of t) {
        if (e >= r.Target && !r.IsReceived) {
          return true;
        }
      }
    }
    return false;
  }
  CanGetRewardByDifficulties(t) {
    var e = this.GetDifficultyReward(t);
    if (e) {
      var r = this.GetDifficultyMaxStars(t);
      for (const i of e) {
        if (r >= i.Target && !i.IsReceived) {
          return true;
        }
      }
    }
    return false;
  }
  CanGetRewardAllDifficulties() {
    for (let t = TowerData_1.LOW_RISK_DIFFICULTY; t <= TowerData_1.VARIATION_RISK_DIFFICULTY; t++) {
      var e = this.GetDifficultyReward(t);
      var r = this.GetDifficultyMaxStars(t);
      if (e) {
        for (const i of e) {
          if (r >= i.Target && !i.IsReceived) {
            return true;
          }
        }
      }
    }
    return false;
  }
  IsRoleCostEnough(t) {
    return !!this.GetFloorIncludeRole(t, this.CurrentSelectFloor) || (t = this.GetRoleRemainCost(t, this.CurrentSelectDifficulties), ConfigManager_1.ConfigManager.TowerClimbConfig.GetTowerInfo(this.CurrentSelectFloor)?.Cost <= t);
  }
  GetIsInOnceTower() {
    var t = ConfigManager_1.ConfigManager.TowerClimbConfig.GetTowerInfo(this.CurrentTowerId);
    return t.Difficulty === TowerData_1.LOW_RISK_DIFFICULTY || t.Difficulty === TowerData_1.HIGH_RISK_DIFFICULTY;
  }
  GetDifficultyRewardProgress(t) {
    t = this.GetDifficultyReward(t);
    let e = 0;
    for (const r of t) {
      if (r.IsReceived) {
        e++;
      }
    }
    return e / t.length;
  }
  GetOverLockHasShow() {
    return LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.TowerOverLockArea) ?? false;
  }
  SetOverLockHasShow() {
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.TowerOverLockArea, true);
  }
}
exports.TowerModel = TowerModel;
//# sourceMappingURL=TowerModel.js.map