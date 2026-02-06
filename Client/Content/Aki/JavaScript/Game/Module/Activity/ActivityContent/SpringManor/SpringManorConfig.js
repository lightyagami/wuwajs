"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpringManorConfig = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById");
const AtmosphereLevelAll_1 = require("../../../../../Core/Define/ConfigQuery/AtmosphereLevelAll");
const AtmosphereLevelById_1 = require("../../../../../Core/Define/ConfigQuery/AtmosphereLevelById");
const BookItemById_1 = require("../../../../../Core/Define/ConfigQuery/BookItemById");
const BrochureByActivityIdAndType_1 = require("../../../../../Core/Define/ConfigQuery/BrochureByActivityIdAndType");
const BrochureById_1 = require("../../../../../Core/Define/ConfigQuery/BrochureById");
const ConditionById_1 = require("../../../../../Core/Define/ConfigQuery/ConditionById");
const ExhibitPhantomByBodyType_1 = require("../../../../../Core/Define/ConfigQuery/ExhibitPhantomByBodyType");
const SpringFestivalByActivityId_1 = require("../../../../../Core/Define/ConfigQuery/SpringFestivalByActivityId");
const SpringFestivalMainTaskAll_1 = require("../../../../../Core/Define/ConfigQuery/SpringFestivalMainTaskAll");
const SpringFestivalMainTaskById_1 = require("../../../../../Core/Define/ConfigQuery/SpringFestivalMainTaskById");
const SpringFestivalMainTaskByQuestId_1 = require("../../../../../Core/Define/ConfigQuery/SpringFestivalMainTaskByQuestId");
const SpringFestivalRewardByActivityId_1 = require("../../../../../Core/Define/ConfigQuery/SpringFestivalRewardByActivityId");
const SpringFestivalRewardById_1 = require("../../../../../Core/Define/ConfigQuery/SpringFestivalRewardById");
const SpringFestivalRewardTabByActivityId_1 = require("../../../../../Core/Define/ConfigQuery/SpringFestivalRewardTabByActivityId");
const SpringFestivalRewardTabById_1 = require("../../../../../Core/Define/ConfigQuery/SpringFestivalRewardTabById");
const SpringFestivalScoreRewardByActivityId_1 = require("../../../../../Core/Define/ConfigQuery/SpringFestivalScoreRewardByActivityId");
const SpringFestivalScoreRewardById_1 = require("../../../../../Core/Define/ConfigQuery/SpringFestivalScoreRewardById");
const SpringFestivalSkipEntryById_1 = require("../../../../../Core/Define/ConfigQuery/SpringFestivalSkipEntryById");
const SpringFestivalSubTaskAll_1 = require("../../../../../Core/Define/ConfigQuery/SpringFestivalSubTaskAll");
const SpringFestivalSubTaskByQuestId_1 = require("../../../../../Core/Define/ConfigQuery/SpringFestivalSubTaskByQuestId");
const SpringFestivalUnlockById_1 = require("../../../../../Core/Define/ConfigQuery/SpringFestivalUnlockById");
const ConfigBase_1 = require("../../../../../Core/Framework/ConfigBase");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
class SpringManorConfig extends ConfigBase_1.ConfigBase {
  GetActivityConfigByActivityId(e) {
    return SpringFestivalByActivityId_1.configSpringFestivalByActivityId.GetConfig(e);
  }
  GetWorldTeleportId() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("Spring26WorldTeleportId");
  }
  GetMainTaskConfigById(e) {
    return SpringFestivalMainTaskById_1.configSpringFestivalMainTaskById.GetConfig(e);
  }
  GetMainTaskConfigByQuestId(e) {
    return SpringFestivalMainTaskByQuestId_1.configSpringFestivalMainTaskByQuestId.GetConfig(e);
  }
  GetAllMainTaskConfig() {
    return SpringFestivalMainTaskAll_1.configSpringFestivalMainTaskAll.GetConfigList();
  }
  GetSubTaskConfigByQuestId(e) {
    return SpringFestivalSubTaskByQuestId_1.configSpringFestivalSubTaskByQuestId.GetConfig(e);
  }
  GetAllSubTaskConfig() {
    return SpringFestivalSubTaskAll_1.configSpringFestivalSubTaskAll.GetConfigList();
  }
  GetLevelConfigById(e) {
    return AtmosphereLevelById_1.configAtmosphereLevelById.GetConfig(e);
  }
  GetLevelConfigByActivityId(r) {
    const i = [];
    AtmosphereLevelAll_1.configAtmosphereLevelAll.GetConfigList()?.forEach(e => {
      if (e.ActivityId === r) {
        i.push(e);
      }
    });
    return i;
  }
  GetSkipEntryConfigById(e) {
    return SpringFestivalSkipEntryById_1.configSpringFestivalSkipEntryById.GetConfig(e);
  }
  GetRewardTaskConfigById(e) {
    return SpringFestivalRewardById_1.configSpringFestivalRewardById.GetConfig(e);
  }
  GetRewardTaskConfigByActivityId(e) {
    return SpringFestivalRewardByActivityId_1.configSpringFestivalRewardByActivityId.GetConfigList(e);
  }
  GetRewardTabConfigById(e) {
    return SpringFestivalRewardTabById_1.configSpringFestivalRewardTabById.GetConfig(e);
  }
  GetRewardTabConfigByActivityId(e) {
    return SpringFestivalRewardTabByActivityId_1.configSpringFestivalRewardTabByActivityId.GetConfigList(e);
  }
  GetScoreRewardConfigById(e) {
    return SpringFestivalScoreRewardById_1.configSpringFestivalScoreRewardById.GetConfig(e);
  }
  GetScoreRewardConfigListByActivityId(e) {
    return SpringFestivalScoreRewardByActivityId_1.configSpringFestivalScoreRewardByActivityId.GetConfigList(e);
  }
  GetMapIdByActivityId(e) {
    var e = this.GetActivityConfigByActivityId(e);
    if (e = e && e.InstanceId) {
      return ConfigManager_1.ConfigManager.InstanceDungeonConfig?.GetInstanceMapConfigId(e) ?? 0;
    } else {
      return 0;
    }
  }
  GetPhantomExtraConfigByBodySize(e) {
    var r = ExhibitPhantomByBodyType_1.configExhibitPhantomByBodyType.GetConfigList(e);
    if (r === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Phantom", 58, "PhantomExtraConfig Invalid size", ["size", e]);
      }
      return [];
    } else {
      return r;
    }
  }
  GetFunctionConfigById(e) {
    return SpringFestivalUnlockById_1.configSpringFestivalUnlockById.GetConfig(e);
  }
  GetSpringManorBrochureByActivityAndType(e, r) {
    return BrochureByActivityIdAndType_1.configBrochureByActivityIdAndType.GetConfig(e, r);
  }
  GetSpringManorBookItemById(e) {
    return BookItemById_1.configBookItemById.GetConfig(e);
  }
  GetSpringManorBrochureById(e) {
    return BrochureById_1.configBrochureById.GetConfig(e);
  }
  GetRewardItem(e) {
    var r = [];
    if (e && e !== 0) {
      e = ConfigManager_1.ConfigManager.RewardConfig.GetDropPackage(e)?.DropPreview;
      if (e) {
        for (var [i, n] of e) {
          i = [{
            IncId: 0,
            ItemId: i
          }, n];
          r.push(i);
        }
      }
    }
    return r;
  }
  GetConditionGroupQuestId(e) {
    e = ConditionById_1.configConditionById.GetConfig(e);
    if (e) {
      return Number(e.LimitParams.get("NewQuestId"));
    } else {
      return 0;
    }
  }
  GetConditionGroupLevelPlayId(e) {
    e = ConditionById_1.configConditionById.GetConfig(e);
    if (e) {
      return Number(e.LimitParams.get("LevelPlayId"));
    } else {
      return 0;
    }
  }
}
exports.SpringManorConfig = SpringManorConfig;
//# sourceMappingURL=SpringManorConfig.js.map