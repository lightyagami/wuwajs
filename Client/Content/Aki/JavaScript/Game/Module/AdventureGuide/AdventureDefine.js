"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NewSoundDetectTabItemData = exports.WORLD_LEVEL_MAX = exports.WORLD_LEVEL_MIN = exports.EDEFAULTCATEGORY = exports.matTypeDes = exports.QuestRewardViewParam = exports.BigWorldID = exports.Monster062DetectConfID = exports.SoundAreaDetectionRecord = exports.SilentAreaDetectionRecord = exports.DungeonDetectionRecord = exports.MonsterDetectionRecord = exports.periodicityChallengeTypeToTarget = exports.AdventureTaskRecord = undefined;
const AdventureTask_1 = require("../../../Core/Define/Config/AdventureTask");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ModelManager_1 = require("../../Manager/ModelManager");
const TowerData_1 = require("../TowerDetailUi/TowerData");
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
exports.periodicityChallengeTypeToTarget = {
  [0]: 0,
  1: TowerData_1.LOW_RISK_DIFFICULTY,
  2: TowerData_1.HIGH_RISK_DIFFICULTY,
  3: TowerData_1.VARIATION_RISK_DIFFICULTY,
  4: TowerData_1.OVERLOCK_RISK_DIFFICULTY,
  5: 0,
  6: 0,
  7: 0
};
class DetectionRecord {
  constructor(e, t, r) {
    this.Mat = undefined;
    this.IsLock = false;
    this.RefreshTime = 0;
    this.IsTargeting = false;
    this.IsLock = t;
    this.RefreshTime = r;
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
  constructor(e, t, r) {
    this.Type = undefined;
    this.DungeonDetectionRecord = undefined;
    this.SilentAreaDetectionRecord = undefined;
    this.Type = e;
    this.DungeonDetectionRecord = t;
    this.SilentAreaDetectionRecord = r;
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
  GetTargetTowerDifficulty() {
    return exports.periodicityChallengeTypeToTarget[this.Conf.PeriodicityChallengeType];
  }
  GetTargetTowerIsUnlock() {
    var e = this.GetTargetTowerDifficulty();
    return !(e <= 0) && (!(e - 1 > 0) || ModelManager_1.ModelManager.TowerModel.GetDifficultyIsClear(e - 1));
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
exports.WORLD_LEVEL_MAX = 8;
class NewSoundDetectTabItemData {
  constructor() {
    this.Area = 0;
    this.TabTextId = "";
    this.IconPath = "";
    this.Dungeon = undefined;
    this.Sort = 0;
    this.IsVisible = true;
  }
}
exports.NewSoundDetectTabItemData = NewSoundDetectTabItemData;
//# sourceMappingURL=AdventureDefine.js.map