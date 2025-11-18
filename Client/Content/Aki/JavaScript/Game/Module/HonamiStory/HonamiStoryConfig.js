"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryConfig = undefined;
const Log_1 = require("../../../Core/Common/Log");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const HonamiStoryActivityAll_1 = require("../../../Core/Define/ConfigQuery/HonamiStoryActivityAll");
const HonamiStoryActivityByActivityId_1 = require("../../../Core/Define/ConfigQuery/HonamiStoryActivityByActivityId");
const HonamiStoryAreaByActivityId_1 = require("../../../Core/Define/ConfigQuery/HonamiStoryAreaByActivityId");
const HonamiStoryAreaById_1 = require("../../../Core/Define/ConfigQuery/HonamiStoryAreaById");
const HonamiStoryAreaTaskById_1 = require("../../../Core/Define/ConfigQuery/HonamiStoryAreaTaskById");
const HonamiStoryBackPackById_1 = require("../../../Core/Define/ConfigQuery/HonamiStoryBackPackById");
const HonamiStoryBuffTempById_1 = require("../../../Core/Define/ConfigQuery/HonamiStoryBuffTempById");
const HonamiStoryBuffTempLibraryById_1 = require("../../../Core/Define/ConfigQuery/HonamiStoryBuffTempLibraryById");
const HonamiStoryDangerLevelById_1 = require("../../../Core/Define/ConfigQuery/HonamiStoryDangerLevelById");
const HonamiStoryEffectById_1 = require("../../../Core/Define/ConfigQuery/HonamiStoryEffectById");
const HonamiStoryEquipById_1 = require("../../../Core/Define/ConfigQuery/HonamiStoryEquipById");
const HonamiStoryItemById_1 = require("../../../Core/Define/ConfigQuery/HonamiStoryItemById");
const HonamiStoryItemCollectionByActivityId_1 = require("../../../Core/Define/ConfigQuery/HonamiStoryItemCollectionByActivityId");
const HonamiStoryItemQualityById_1 = require("../../../Core/Define/ConfigQuery/HonamiStoryItemQualityById");
const HonamiStoryLifeSupportByActivityId_1 = require("../../../Core/Define/ConfigQuery/HonamiStoryLifeSupportByActivityId");
const HonamiStoryLifeSupportById_1 = require("../../../Core/Define/ConfigQuery/HonamiStoryLifeSupportById");
const HonamiStoryLimitTaskByActivityId_1 = require("../../../Core/Define/ConfigQuery/HonamiStoryLimitTaskByActivityId");
const HonamiStoryLimitTaskById_1 = require("../../../Core/Define/ConfigQuery/HonamiStoryLimitTaskById");
const HonamiStoryLoadingPerformByBTIdAndTiming_1 = require("../../../Core/Define/ConfigQuery/HonamiStoryLoadingPerformByBTIdAndTiming");
const HonamiStoryLoadingPerformById_1 = require("../../../Core/Define/ConfigQuery/HonamiStoryLoadingPerformById");
const HonamiStoryLoadingPerformByTiming_1 = require("../../../Core/Define/ConfigQuery/HonamiStoryLoadingPerformByTiming");
const HonamiStoryMapMarkAll_1 = require("../../../Core/Define/ConfigQuery/HonamiStoryMapMarkAll");
const HonamiStoryMapMarkById_1 = require("../../../Core/Define/ConfigQuery/HonamiStoryMapMarkById");
const HonamiStoryMarkWhiteListAll_1 = require("../../../Core/Define/ConfigQuery/HonamiStoryMarkWhiteListAll");
const HonamiStoryMarkWhiteListById_1 = require("../../../Core/Define/ConfigQuery/HonamiStoryMarkWhiteListById");
const HonamiStoryMascotByActivityId_1 = require("../../../Core/Define/ConfigQuery/HonamiStoryMascotByActivityId");
const HonamiStoryMascotById_1 = require("../../../Core/Define/ConfigQuery/HonamiStoryMascotById");
const HonamiStoryOutDialogByActivityId_1 = require("../../../Core/Define/ConfigQuery/HonamiStoryOutDialogByActivityId");
const HonamiStoryPluginBoxItemByActivityId_1 = require("../../../Core/Define/ConfigQuery/HonamiStoryPluginBoxItemByActivityId");
const HonamiStoryPluginBoxItemById_1 = require("../../../Core/Define/ConfigQuery/HonamiStoryPluginBoxItemById");
const HonamiStoryPluginSlotById_1 = require("../../../Core/Define/ConfigQuery/HonamiStoryPluginSlotById");
const HonamiStoryPluginSubTypeById_1 = require("../../../Core/Define/ConfigQuery/HonamiStoryPluginSubTypeById");
const HonamiStoryPluginTagById_1 = require("../../../Core/Define/ConfigQuery/HonamiStoryPluginTagById");
const HonamiStoryPropById_1 = require("../../../Core/Define/ConfigQuery/HonamiStoryPropById");
const HonamiStoryPropLibraryById_1 = require("../../../Core/Define/ConfigQuery/HonamiStoryPropLibraryById");
const HonamiStoryResidentTaskByActivityId_1 = require("../../../Core/Define/ConfigQuery/HonamiStoryResidentTaskByActivityId");
const HonamiStoryResidentTaskById_1 = require("../../../Core/Define/ConfigQuery/HonamiStoryResidentTaskById");
const HonamiStoryScanMachineById_1 = require("../../../Core/Define/ConfigQuery/HonamiStoryScanMachineById");
const HonamiStoryScoreRewardByActivityId_1 = require("../../../Core/Define/ConfigQuery/HonamiStoryScoreRewardByActivityId");
const HonamiStoryScoreRewardById_1 = require("../../../Core/Define/ConfigQuery/HonamiStoryScoreRewardById");
const HonamiStoryTalentByActivityId_1 = require("../../../Core/Define/ConfigQuery/HonamiStoryTalentByActivityId");
const HonamiStoryWeaponByActivityId_1 = require("../../../Core/Define/ConfigQuery/HonamiStoryWeaponByActivityId");
const HonamiStoryWeaponById_1 = require("../../../Core/Define/ConfigQuery/HonamiStoryWeaponById");
const HonamiStoryWeaponSuitById_1 = require("../../../Core/Define/ConfigQuery/HonamiStoryWeaponSuitById");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
const HonamiStoryUtil_1 = require("./HonamiStoryUtil");
class HonamiStoryConfig extends ConfigBase_1.ConfigBase {
  GetHonamiStoryBackPack(o) {
    var i = HonamiStoryBackPackById_1.configHonamiStoryBackPackById.GetConfig(o);
    if (i !== undefined) {
      return i;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("HonamiStory", 58, "HonamiStoryBackPack表无效id", ["id", o]);
    }
  }
  GetHonamiStoryItem(o) {
    var i = HonamiStoryItemById_1.configHonamiStoryItemById.GetConfig(o);
    if (i !== undefined) {
      return i;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("HonamiStory", 58, "HonamiStoryItem表无效itemId", ["itemId", o]);
    }
  }
  GetHonamiStoryEquip(o) {
    var i = HonamiStoryEquipById_1.configHonamiStoryEquipById.GetConfig(o);
    if (i !== undefined) {
      return i;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("HonamiStory", 58, "HonamiStoryEquip表无效itemId", ["itemId", o]);
    }
  }
  GetHonamiStoryPropLibrary(o) {
    var i = HonamiStoryPropLibraryById_1.configHonamiStoryPropLibraryById.GetConfig(o);
    if (i === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("HonamiStory", 58, "HonamiStoryPropLibrary表无效Id", ["id", o]);
      }
      return [];
    } else {
      return i.HonamiStoryPropId;
    }
  }
  GetHonamiStoryProp(o) {
    var i = HonamiStoryPropById_1.configHonamiStoryPropById.GetConfig(o);
    if (i !== undefined) {
      return i;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("HonamiStory", 58, "HonamiStoryProp表无效Id", ["id", o]);
    }
  }
  GetHonamiStoryBuffTempLibrary(o) {
    var i = HonamiStoryBuffTempLibraryById_1.configHonamiStoryBuffTempLibraryById.GetConfig(o);
    if (i !== undefined) {
      return i.BuffTermpId;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("HonamiStory", 58, "HonamiStoryBuffTempLibrary表无效Id", ["id", o]);
    }
  }
  GetHonamiStoryBuffTempDescFromLibrary(o) {
    o = this.GetHonamiStoryBuffTempLibrary(o);
    if (o) {
      var i = HonamiStoryBuffTempById_1.configHonamiStoryBuffTempById.GetConfig(o);
      if (i !== undefined) {
        return i.Desc;
      }
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("HonamiStory", 58, "HonamiStoryBuffTemp表无效Id", ["id", o]);
      }
    }
  }
  GetHonamiStoryBuffTemp(o) {
    var i = HonamiStoryBuffTempById_1.configHonamiStoryBuffTempById.GetConfig(o);
    if (i !== undefined) {
      return i;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("HonamiStory", 78, "HonamiStoryBuffTemp表无效Id", ["id", o]);
    }
  }
  GetHonamiStoryQuality(o) {
    var i = HonamiStoryItemQualityById_1.configHonamiStoryItemQualityById.GetConfig(o);
    if (i !== undefined) {
      return i;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("HonamiStory", 58, "HonamiStoryItemQuality表无效Id", ["id", o]);
    }
  }
  GetHonamiStoryActivityConfig(o) {
    var i = HonamiStoryActivityByActivityId_1.configHonamiStoryActivityByActivityId.GetConfig(o);
    if (i !== undefined) {
      return i;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("HonamiStory", 78, "HonamiStoryActivity表无效activityId", ["activityId", o]);
    }
  }
  GetAllActivityConfig() {
    var o = HonamiStoryActivityAll_1.configHonamiStoryActivityAll.GetConfigList();
    if (o === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("HonamiStory", 77, "HonamiStoryActivity表无效All");
      }
      return [];
    } else {
      return o;
    }
  }
  GetHonamiStoryMascotConfig(o) {
    var i = HonamiStoryMascotById_1.configHonamiStoryMascotById.GetConfig(o);
    if (i !== undefined) {
      return i;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("HonamiStory", 78, "HonamiStoryMascot表无效id", ["id", o]);
    }
  }
  GetHonamiStoryMascotConfigList(o) {
    var i = HonamiStoryMascotByActivityId_1.configHonamiStoryMascotByActivityId.GetConfigList(o);
    if (i === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("HonamiStory", 78, "HonamiStoryMascot表无效activityId", ["activityId", o]);
      }
      return [];
    } else {
      return i;
    }
  }
  GetHonamiStoryAreaConfig(o) {
    var i = HonamiStoryAreaById_1.configHonamiStoryAreaById.GetConfig(o);
    if (i !== undefined) {
      return i;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("HonamiStory", 78, "HonamiStoryArea表无效areaId", ["areaId", o]);
    }
  }
  GetHonamiStoryAreaConfigList(o) {
    var i = HonamiStoryAreaByActivityId_1.configHonamiStoryAreaByActivityId.GetConfigList(o);
    if (i === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("HonamiStory", 78, "HonamiStoryArea表无效activityId", ["activityId", o]);
      }
      return [];
    } else {
      return i;
    }
  }
  GetHonamiStoryLimitTaskConfigList(o) {
    var i = HonamiStoryLimitTaskByActivityId_1.configHonamiStoryLimitTaskByActivityId.GetConfigList(o);
    if (i === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("HonamiStory", 78, "HonamiStoryLimitTask表无效activityId", ["activityId", o]);
      }
      return [];
    } else {
      return i;
    }
  }
  GetHonamiStoryPermanentTaskConfigList(o) {
    var i = HonamiStoryResidentTaskByActivityId_1.configHonamiStoryResidentTaskByActivityId.GetConfigList(o);
    if (i === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("HonamiStory", 78, "HonamiStoryResidentTask表无效activityId", ["activityId", o]);
      }
      return [];
    } else {
      return i;
    }
  }
  GetHonamiStoryScoreRewardConfigList(o) {
    var i = HonamiStoryScoreRewardByActivityId_1.configHonamiStoryScoreRewardByActivityId.GetConfigList(o);
    if (i === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("HonamiStory", 78, "HonamiStoryScoreReward表无效activityId", ["activityId", o]);
      }
      return [];
    } else {
      return i;
    }
  }
  GetHonamiStoryTalentConfigList(o) {
    var i = HonamiStoryTalentByActivityId_1.configHonamiStoryTalentByActivityId.GetConfigList(o);
    if (i === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("HonamiStory", 78, "HonamiStoryTalent表无效activityId", ["activityId", o]);
      }
      return [];
    } else {
      return i;
    }
  }
  GetHonamiStoryItemCollectionConfigList(o) {
    var i = HonamiStoryItemCollectionByActivityId_1.configHonamiStoryItemCollectionByActivityId.GetConfigList(o);
    if (i === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("HonamiStory", 78, "HonamiStoryItemCollection表无效activityId", ["activityId", o]);
      }
      return [];
    } else {
      return i;
    }
  }
  GetHonamiStoryAreaTaskById(o) {
    var i = HonamiStoryAreaTaskById_1.configHonamiStoryAreaTaskById.GetConfig(o);
    if (i !== undefined) {
      return i;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("HonamiStory", 78, "HonamiStoryAreaTask表无效id", ["id", o]);
    }
  }
  GetHonamiStoryLimitTaskConfig(o) {
    var i = HonamiStoryLimitTaskById_1.configHonamiStoryLimitTaskById.GetConfig(o);
    if (i !== undefined) {
      return i;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("HonamiStory", 78, "HonamiStoryLimitTask表无效id", ["id", o]);
    }
  }
  GetHonamiStoryPermanentTaskConfig(o) {
    var i = HonamiStoryResidentTaskById_1.configHonamiStoryResidentTaskById.GetConfig(o);
    if (i !== undefined) {
      return i;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("HonamiStory", 78, "HonamiStoryResidentTask表无效id", ["id", o]);
    }
  }
  GetHonamiStoryScoreRewardConfig(o) {
    var i = HonamiStoryScoreRewardById_1.configHonamiStoryScoreRewardById.GetConfig(o);
    if (i !== undefined) {
      return i;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("HonamiStory", 78, "HonamiStoryScoreReward表无效id", ["id", o]);
    }
  }
  GetWeaponSuit(o) {
    var i = HonamiStoryWeaponSuitById_1.configHonamiStoryWeaponSuitById.GetConfig(o);
    if (i !== undefined) {
      return i;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("HonamiStory", 78, "HonamiStoryWeaponSuit表无效id", ["id", o]);
    }
  }
  GetPluginSubType(o) {
    var i = HonamiStoryPluginSubTypeById_1.configHonamiStoryPluginSubTypeById.GetConfig(o);
    if (i !== undefined) {
      return i;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("HonamiStory", 78, "HonamiStoryPluginSubType表无效id", ["id", o]);
    }
  }
  GetPluginTag(o) {
    var i = HonamiStoryPluginTagById_1.configHonamiStoryPluginTagById.GetConfig(o);
    if (i !== undefined) {
      return i;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("HonamiStory", 78, "HonamiStoryPluginTag表无效id", ["id", o]);
    }
  }
  GetLifeSupport(o) {
    var i = HonamiStoryLifeSupportById_1.configHonamiStoryLifeSupportById.GetConfig(o);
    if (i !== undefined) {
      return i;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("HonamiStory", 78, "HonamiStoryLifeSupport表无效id", ["id", o]);
    }
  }
  GetLifeSupportList(o) {
    var i = HonamiStoryLifeSupportByActivityId_1.configHonamiStoryLifeSupportByActivityId.GetConfigList(o);
    if (i === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("HonamiStory", 78, "HonamiStoryLifeSupport表无效id", ["activityId", o]);
      }
      return [];
    } else {
      return i;
    }
  }
  GetWeaponConfig(o) {
    if (o !== 0) {
      var i = HonamiStoryWeaponById_1.configHonamiStoryWeaponById.GetConfig(o);
      if (!(o > 0) || i !== undefined) {
        return i;
      }
    }
  }
  GetHonamiStoryWeaponConfigList(o) {
    var i = HonamiStoryWeaponByActivityId_1.configHonamiStoryWeaponByActivityId.GetConfigList(o);
    if (i === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("HonamiStory", 78, "HonamiStoryWeapon表无效activityId", ["activityId", o]);
      }
      return [];
    } else {
      return i;
    }
  }
  GetHonamiStoryOutDialogList(o) {
    var i = HonamiStoryOutDialogByActivityId_1.configHonamiStoryOutDialogByActivityId.GetConfigList(o);
    if (i === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("HonamiStory", 78, "HonamiStoryOutDialog表无效id", ["activityId", o]);
      }
      return [];
    } else {
      return i;
    }
  }
  GetEffectConfig(o) {
    var i = HonamiStoryEffectById_1.configHonamiStoryEffectById.GetConfig(o);
    if (!(o > 0) || i !== undefined) {
      return i;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("HonamiStory", 78, "HonamiStoryEffect表无效id", ["id", o]);
    }
  }
  GetDoubleClickDelay() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("HonamiStoryBackpackClickInterval") ?? 300;
  }
  GetSlotUnlockConfig(o) {
    var i = HonamiStoryPluginSlotById_1.configHonamiStoryPluginSlotById.GetConfig(o);
    if (!(o > 0) || i !== undefined) {
      return i;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("HonamiStory", 78, "HonamiStoryPluginSlot表无效id", ["id", o]);
    }
  }
  GetDangerLevelConfig(o) {
    var i = HonamiStoryDangerLevelById_1.configHonamiStoryDangerLevelById.GetConfig(o);
    if (!(o > 0) || i !== undefined) {
      return i;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("HonamiStory", 78, "HonamiStoryEffect表无效id", ["id", o]);
    }
  }
  GetLoadingPerformConfigById(o) {
    var i = HonamiStoryLoadingPerformById_1.configHonamiStoryLoadingPerformById.GetConfig(o);
    if (i !== undefined) {
      return i;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("HonamiStory", 78, "HonamiStoryLoadingPerform表无效id", ["id", o]);
    }
  }
  GetLoadingPerformConfigByBtAndTime(o, i) {
    var r = HonamiStoryLoadingPerformByBTIdAndTiming_1.configHonamiStoryLoadingPerformByBTIdAndTiming.GetConfig(o, i);
    if (r !== undefined) {
      return r;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("HonamiStory", 78, "HonamiStoryLoadingPerform表无效BtId/timing", ["BtId", o], ["Timing", i]);
    }
  }
  GetLoadingPerformConfigListByTiming(o) {
    var i = HonamiStoryLoadingPerformByTiming_1.configHonamiStoryLoadingPerformByTiming.GetConfigList(o);
    if (i === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("HonamiStory", 78, "HonamiStoryLoadingPerform表无效timing", ["timing", o]);
      }
      return [];
    } else {
      return i;
    }
  }
  GetHonamiMapMarkList() {
    var o = HonamiStoryMapMarkAll_1.configHonamiStoryMapMarkAll.GetConfigList();
    if (o === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("HonamiStory", 86, "HonamiStoryMapMark表无效");
      }
      return [];
    } else {
      return o;
    }
  }
  GetHonamiMapMarkById(o) {
    var i = HonamiStoryMapMarkById_1.configHonamiStoryMapMarkById.GetConfig(o);
    if (!(o > 0) || i !== undefined) {
      return i;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("HonamiStory", 86, "HonamiStoryMapMark表无效id", ["id", o]);
    }
  }
  GetHonamiScanItemWhiteListConfigByEntityConfigId(o) {
    return HonamiStoryMarkWhiteListById_1.configHonamiStoryMarkWhiteListById.GetConfig(o);
  }
  GetHonamiScanItemWhileListIds() {
    return HonamiStoryMarkWhiteListAll_1.configHonamiStoryMarkWhiteListAll.GetConfigList()?.map(o => o.Id) ?? [];
  }
  GetHonamiStoryPluginBoxItemById(o) {
    var i = HonamiStoryPluginBoxItemById_1.configHonamiStoryPluginBoxItemById.GetConfig(o);
    if (i !== undefined) {
      return i;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("HonamiStory", 58, "HonamiStoryPluginBoxItem表无效Id", ["Id", o]);
    }
  }
  GetHonamiStoryPluginBoxItemList(o) {
    var i = HonamiStoryPluginBoxItemByActivityId_1.configHonamiStoryPluginBoxItemByActivityId.GetConfigList(o);
    if (i === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("HonamiStory", 58, "HonamiStoryPluginBoxItem表无效ActivityId", ["activityId", o]);
      }
      return [];
    } else {
      return i;
    }
  }
  GetScrollingSpeed() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("HonamiStoryScrollMoveSpeed") ?? 10;
  }
  GetDragThresholdSpeed() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("HonamiStoryDragBeginDistanceThreshold") ?? 9;
  }
  GetDragOffset() {
    if (HonamiStoryUtil_1.HonamiStoryUtil.IsMobileView()) {
      return [CommonParamById_1.configCommonParamById.GetIntConfig("HonamiStoryMobileDragOffsetX") ?? 0, CommonParamById_1.configCommonParamById.GetIntConfig("HonamiStoryMobileDragOffsetY") ?? 140];
    } else {
      return [0, 0];
    }
  }
  GetPickUpRange() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("HonamiStoryMobilePickUpRange") ?? 1000;
  }
  GetScanMachineById(o) {
    var i = HonamiStoryScanMachineById_1.configHonamiStoryScanMachineById.GetConfig(o);
    if (i !== undefined) {
      return i;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("HonamiStory", 86, "HonamiStoryScanMachine表无效id", ["id", o]);
    }
  }
}
exports.HonamiStoryConfig = HonamiStoryConfig;
//# sourceMappingURL=HonamiStoryConfig.js.map