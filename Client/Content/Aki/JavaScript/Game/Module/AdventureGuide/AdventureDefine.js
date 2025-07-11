"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WORLD_LEVEL_MAX = exports.WORLD_LEVEL_MIN = exports.EDEFAULTCATEGORY = exports.matTypeDes = exports.QuestRewardViewParam = exports.BigWorldID = exports.Monster062DetectConfID = exports.SoundAreaDetectionRecord = exports.SilentAreaDetectionRecord = exports.DungeonDetectionRecord = exports.MonsterDetectionRecord = exports.AdventureTaskRecord = undefined;
const AdventureTask_1 = require("../../../Core/Define/Config/AdventureTask");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
class AdventureTaskRecord {
  constructor(e, t) {
    this.AdventureTaskBase = new AdventureTask_1.AdventureTask();
    this.Status = Protocol_1.Aki.Protocol.Aks.Proto_UnFinish;
    this.Progress = 0;
    this.AdventureTaskBase = e;
    this.Status = t;
  }
  GetTotalNum() {
    return this.AdventureTaskBase.NeedProgress;
  }
}
exports.AdventureTaskRecord = AdventureTaskRecord;
class DetectionRecord {
  constructor(e, t, s) {
    this.Mat = undefined;
    this.IsLock = false;
    this.RefreshTime = 0;
    this.IsTargeting = false;
    this.IsLock = t;
    this.RefreshTime = s;
    this.Mat = e;
  }
  get Conf() {
    return this.Mat;
  }
}
class MonsterDetectionRecord extends DetectionRecord {}
exports.MonsterDetectionRecord = MonsterDetectionRecord;
class DungeonDetectionRecord extends DetectionRecord {}
exports.DungeonDetectionRecord = DungeonDetectionRecord;
class SilentAreaDetectionRecord extends DetectionRecord {}
exports.SilentAreaDetectionRecord = SilentAreaDetectionRecord;
class SoundAreaDetectionRecord {
  constructor(e, t, s) {
    this.Type = undefined;
    this.DungeonDetectionRecord = undefined;
    this.SilentAreaDetectionRecord = undefined;
    this.Type = e;
    this.DungeonDetectionRecord = t;
    this.SilentAreaDetectionRecord = s;
  }
  get Conf() {
    switch (this.Type) {
      case 0:
        return this.DungeonDetectionRecord?.Conf;
      case 1:
        return this.SilentAreaDetectionRecord?.Conf;
      default:
        return;
    }
  }
  get IsLock() {
    switch (this.Type) {
      case 0:
        return this.DungeonDetectionRecord?.IsLock;
      case 1:
        return this.SilentAreaDetectionRecord?.IsLock;
      default:
        return false;
    }
  }
}
exports.SoundAreaDetectionRecord = SoundAreaDetectionRecord;
exports.Monster062DetectConfID = 10010053;
exports.BigWorldID = 8;
class QuestRewardViewParam {
  constructor() {
    this.IsShowExpItem = false;
    this.RewardList = undefined;
    this.AreaId = 0;
    this.BeforeContributionLevel = 0;
    this.BeforeContributionValue = 0;
  }
}
exports.QuestRewardViewParam = QuestRewardViewParam;
exports.matTypeDes = {
  [0]: "AdventureMatType_All",
  1: "AdventureMatType_Weapon",
  2: "AdventureMatType_Character",
  3: "AdventureMatType_Experience"
};
exports.EDEFAULTCATEGORY = 16;
exports.WORLD_LEVEL_MIN = 1;
exports.WORLD_LEVEL_MAX = 8; //# sourceMappingURL=AdventureDefine.js.map