"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SolarSpeedConfigContext = undefined;
const DropPackageById_1 = require("../../../../../../Core/Define/ConfigQuery/DropPackageById");
const InstanceDungeonById_1 = require("../../../../../../Core/Define/ConfigQuery/InstanceDungeonById");
const SettleFlagAll_1 = require("../../../../../../Core/Define/ConfigQuery/SettleFlagAll");
const TeamParKOurCfgAll_1 = require("../../../../../../Core/Define/ConfigQuery/TeamParKOurCfgAll");
const TeamParKOurRewardAll_1 = require("../../../../../../Core/Define/ConfigQuery/TeamParKOurRewardAll");
const TeamParKOurRewardById_1 = require("../../../../../../Core/Define/ConfigQuery/TeamParKOurRewardById");
const ActivityData_1 = require("../../../ActivityData");
const SolarSpeedDefine_1 = require("../SolarSpeedDefine");
class SolarSpeedConfigContext extends ActivityData_1.ActivityBaseData {
  constructor(e) {
    super();
    this.i5l = undefined;
    this.p3_ = undefined;
    this.v3_ = undefined;
    this.y3_ = undefined;
    this.S3_ = undefined;
    this.i5l = e;
  }
  get CurrentCfgCache() {
    if (this.p3_ === undefined) {
      this.M3_();
    }
    return this.p3_;
  }
  get CurrentRewardCache() {
    if (this.v3_ === undefined) {
      this.E3_();
    }
    return this.v3_;
  }
  get SortedSettleCfgCache() {
    if (this.S3_ === undefined) {
      this.S3_ = [];
      var e = SettleFlagAll_1.configSettleFlagAll.GetConfigList();
      if (e !== undefined) {
        for (const t of e) {
          this.S3_.push(t);
        }
        this.S3_.sort((e, t) => e.Priority - t.Priority);
      }
    }
    return this.S3_;
  }
  get I3_() {
    if (this.y3_ === undefined) {
      this.M3_();
    }
    return this.y3_;
  }
  M3_() {
    this.p3_ = new Map();
    this.y3_ = new Map();
    for (const e of TeamParKOurCfgAll_1.configTeamParKOurCfgAll.GetConfigList()) {
      if (e.ActivityId === this.i5l.CurrentActivityId) {
        this.p3_.set(e.Id, e);
        this.y3_.set(e.InstId, e.Id);
      }
    }
  }
  E3_() {
    this.v3_ = new Map();
    for (const e of TeamParKOurRewardAll_1.configTeamParKOurRewardAll.GetConfigList()) {
      if (e.ActivityId === this.i5l.CurrentActivityId) {
        this.v3_.set(e.Id, e);
      }
    }
  }
  Dispose() {
    this.CurrentCfgCache.clear();
    this.CurrentRewardCache.clear();
  }
  GetInfoPicturePathById(e) {
    return this.CurrentCfgCache.get(e)?.DescPicPath;
  }
  GetLevelIdByInstanceId(e) {
    return this.I3_.get(e);
  }
  GetInfoPicturePathByInstanceId(e) {
    e = this.GetLevelIdByInstanceId(e);
    if (e !== undefined) {
      return this.GetInfoPicturePathById(e);
    }
  }
  GetTitleTextIdById(e) {
    e = this.CurrentCfgCache.get(e)?.InstId;
    if (e !== undefined) {
      return InstanceDungeonById_1.configInstanceDungeonById.GetConfig(e)?.MapName;
    }
  }
  GetRomePathById(e) {
    e = this.CurrentCfgCache.get(e)?.InstId;
    if (e !== undefined) {
      return InstanceDungeonById_1.configInstanceDungeonById.GetConfig(e)?.DifficultyIcon;
    }
  }
  GetTaskListById(e) {
    if (e === SolarSpeedDefine_1.SOLAR_SPEED_BONUS_LEVEL_ID) {
      return SolarSpeedDefine_1.bonusRewardList;
    } else {
      return this.CurrentCfgCache.get(e)?.TaskList ?? [];
    }
  }
  GetRewardThresholdById(e) {
    return this.CurrentRewardCache.get(e)?.RewardThreshold ?? 0;
  }
  GetRewardItemDataListById(e) {
    var t = [];
    var e = TeamParKOurRewardById_1.configTeamParKOurRewardById.GetConfig(e);
    if (e !== undefined) {
      e = DropPackageById_1.configDropPackageById.GetConfig(e.Reward);
      if (e !== undefined) {
        for (var [r, i] of e.DropPreview) {
          r = [{
            IncId: 0,
            ItemId: r
          }, i];
          t.push(r);
        }
      }
    }
    return t;
  }
  GetRewardTitleTextId(e) {
    return TeamParKOurRewardById_1.configTeamParKOurRewardById.GetConfig(e)?.TaskTitle;
  }
}
exports.SolarSpeedConfigContext = SolarSpeedConfigContext;
//# sourceMappingURL=SolarSpeedConfigContext.js.map