"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelPlayModel = exports.NightmareKillInfo = undefined;
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const PublicUtil_1 = require("../../../Game/Common/PublicUtil");
const ICondition_1 = require("../../../UniverseEditor/Interface/ICondition");
const IGlobal_1 = require("../../../UniverseEditor/Interface/IGlobal");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const GeneralLogicTreeConfigUtil_1 = require("../GeneralLogicTree/GeneralLogicTreeConfigUtil");
const RangeCheck_1 = require("../Util/RangeCheck");
const LevelPlay_1 = require("./LevelPlay");
const LevelPlayDefine_1 = require("./LevelPlayDefine");
class NightmareKillInfo {
  constructor(e = false, i = 0, t = 0, r = []) {
    this.Enable = e;
    this.CurrentKillCount = i;
    this.CurrentIntervalIndex = t;
    this.IntervalKillNumber = r;
  }
}
exports.NightmareKillInfo = NightmareKillInfo;
class LevelPlayModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.Xpi = undefined;
    this.$pi = undefined;
    this.Ypi = 0;
    this.Jpi = undefined;
    this.zpi = undefined;
    this.NightmareLevelPlayInfos = undefined;
    this.NightmareLevelPlayWaitEntityTask = undefined;
    this.IsInReceiveReward = false;
    this.EntityPositionRangeCheck = undefined;
    this.Zpi = e => {
      for (const i of JSON.parse(e).LevelPlays) {
        this.Jpi.set(i.Id, i);
        if (i.Tree) {
          GeneralLogicTreeConfigUtil_1.GeneralLogicTreeConfigUtil.InitBehaviorNodeConfig(this.zpi, i.Id, i.Tree);
        }
      }
    };
  }
  OnInit() {
    this.Xpi = new Map();
    this.$pi = new Map();
    this.Jpi = new Map();
    this.zpi = new Map();
    this.NightmareLevelPlayInfos = new Map();
    this.NightmareLevelPlayWaitEntityTask = new Map();
    this.Ypi = LevelPlayDefine_1.INVALID_LEVELPLAYID;
    this.EntityPositionRangeCheck = new RangeCheck_1.RangeCheck();
    this.InitLevelPlayConfig();
    PublicUtil_1.PublicUtil.RegisterEditorLocalConfig();
    return true;
  }
  OnClear() {
    this.Xpi = undefined;
    this.$pi = undefined;
    this.Jpi.clear();
    this.Jpi = undefined;
    this.zpi.clear();
    this.zpi = undefined;
    this.NightmareLevelPlayInfos?.clear();
    this.NightmareLevelPlayInfos = undefined;
    this.NightmareLevelPlayWaitEntityTask?.clear();
    this.NightmareLevelPlayWaitEntityTask = undefined;
    this.EntityPositionRangeCheck?.OnClear();
    return !(this.EntityPositionRangeCheck = undefined);
  }
  OnLeaveLevel() {
    this.SetTrackLevelPlayId(0);
    return true;
  }
  InitLevelPlayConfig() {
    var e;
    if (!PublicUtil_1.PublicUtil.UseDbConfig()) {
      this.Jpi.clear();
      this.zpi.clear();
      e = (0, PublicUtil_1.getConfigPath)(IGlobal_1.globalConfig.LevelPlayListDir);
      GeneralLogicTreeConfigUtil_1.GeneralLogicTreeConfigUtil.InitConfig(e, this.Zpi);
    }
  }
  GetLevelPlayConfig(e) {
    if (!PublicUtil_1.PublicUtil.UseDbConfig()) {
      return this.Jpi.get(e);
    }
    let i = this.Jpi.get(e);
    var t;
    if (!i) {
      t = ConfigManager_1.ConfigManager.LevelPlayConfig.GetLevelPlayConfig(e);
      i = JSON.parse(t.Data);
      this.Jpi.set(e, i);
    }
    return i;
  }
  GetLevelPlayNodeConfig(e, i) {
    if (!PublicUtil_1.PublicUtil.UseDbConfig()) {
      return this.zpi.get(e)?.get(i);
    }
    let t = this.zpi.get(e);
    let r = (t = t || new Map()).get(i);
    if (!r) {
      e = ConfigManager_1.ConfigManager.LevelPlayConfig.GetLevelPlayNodeConfig(e, i);
      r = JSON.parse(e.Data);
      t.set(i, r);
    }
    return r;
  }
  CreateLevelPlayInfo(e) {
    var i = new LevelPlay_1.LevelPlayInfo(e);
    i.InitConfig();
    this.Xpi.set(e, i);
    return i;
  }
  EnterLevelPlayRange(e) {
    var i = this.SafeCreateLevelPlayInfo(e);
    this.$pi.set(e, i);
    return i;
  }
  LeaveLevelPlayRange(e) {
    var i = this.GetProcessingLevelPlayInfo(e);
    if (i) {
      i.Destroy();
      this.$pi.delete(e);
      if (!i.NeedShowInMap) {
        this.Xpi.delete(e);
      }
    }
  }
  LevelPlayFinish(e) {
    var i = this.GetProcessingLevelPlayInfo(e);
    if (i && (i.Destroy(), i.UpdateState(3), this.$pi.delete(e), this.Ypi === e)) {
      i.SetTrack(false);
      this.Ypi = LevelPlayDefine_1.INVALID_LEVELPLAYID;
    }
  }
  LevelPlayClose(e) {
    if (e && (e.UpdateState(0), e.Destroy(), this.$pi.delete(e.Id), e.Id === this.Ypi)) {
      this.Ypi = 0;
    }
  }
  SetTrackLevelPlayId(e) {
    if (this.Ypi !== e) {
      this.GetProcessingLevelPlayInfo(this.Ypi)?.SetTrack(false);
      this.Ypi = e;
      this.GetProcessingLevelPlayInfo(this.Ypi)?.SetTrack(true);
    }
  }
  ChangeLevelPlayTrackRange(e, i) {
    e = this.GetProcessingLevelPlayInfo(e);
    if (e) {
      e.ChangeLevelPlayTrackRange(i);
    }
  }
  CheckLevelPlayState(e, i, t) {
    let r = false;
    var s = this.GetLevelPlayInfo(e)?.PlayState;
    switch (i) {
      case ICondition_1.ELevelPlayState.Close:
        r = s === undefined || s === 0 || s === 1;
        break;
      case ICondition_1.ELevelPlayState.Running:
        r = s === 2;
        break;
      case ICondition_1.ELevelPlayState.Complete:
        r = s === 3;
    }
    if (t === "Eq") {
      return r;
    } else {
      return !r;
    }
  }
  SafeCreateLevelPlayInfo(e) {
    let i = this.GetLevelPlayInfo(e);
    return i = i || this.CreateLevelPlayInfo(e);
  }
  GetLevelPlayInfo(e) {
    return this.Xpi.get(e);
  }
  GetProcessingLevelPlayInfo(e) {
    return this.$pi.get(e);
  }
  GetProcessingLevelPlayInfos() {
    return this.$pi;
  }
  GetTrackLevelPlayInfo() {
    if (this.Ypi !== LevelPlayDefine_1.INVALID_LEVELPLAYID) {
      return this.GetProcessingLevelPlayInfo(this.Ypi);
    }
  }
  GetTrackLevelPlayId() {
    return this.Ypi;
  }
  GetLevelPlayInfoByRewardEntityId(e) {
    for (var [, i] of this.Xpi) {
      if (i.RewardEntityId === e) {
        return i;
      }
    }
  }
  GetLevelPlayAllEntities(e) {
    e = this.GetLevelPlayConfig(e);
    if (!e) {
      return [];
    }
    const i = new Set();
    var t = e => {
      if (e.startsWith("e")) {
        e = e.split("_");
        e = parseInt(e[2]);
        i.add(e);
      }
      return true;
    };
    e.Children?.forEach(t);
    e.Reference?.forEach(t);
    e.WeakReference?.forEach(t);
    return Array.from(i);
  }
}
exports.LevelPlayModel = LevelPlayModel;
//# sourceMappingURL=LevelPlayModel.js.map