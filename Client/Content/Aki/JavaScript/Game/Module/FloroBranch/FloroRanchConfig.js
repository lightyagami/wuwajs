"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchConfig = undefined;
const Log_1 = require("../../../Core/Common/Log");
const FloroRanchActionById_1 = require("../../../Core/Define/ConfigQuery/FloroRanchActionById");
const FloroRanchActivityById_1 = require("../../../Core/Define/ConfigQuery/FloroRanchActivityById");
const FloroRanchAudioAll_1 = require("../../../Core/Define/ConfigQuery/FloroRanchAudioAll");
const FloroRanchBuffById_1 = require("../../../Core/Define/ConfigQuery/FloroRanchBuffById");
const FloroRanchCardAll_1 = require("../../../Core/Define/ConfigQuery/FloroRanchCardAll");
const FloroRanchCardGroupAll_1 = require("../../../Core/Define/ConfigQuery/FloroRanchCardGroupAll");
const FloroRanchCurrencyAll_1 = require("../../../Core/Define/ConfigQuery/FloroRanchCurrencyAll");
const FloroRanchEventAll_1 = require("../../../Core/Define/ConfigQuery/FloroRanchEventAll");
const FloroRanchFilterTypeAll_1 = require("../../../Core/Define/ConfigQuery/FloroRanchFilterTypeAll");
const FloroRanchInsByActivityId_1 = require("../../../Core/Define/ConfigQuery/FloroRanchInsByActivityId");
const FloroRanchRaceAll_1 = require("../../../Core/Define/ConfigQuery/FloroRanchRaceAll");
const FloroRanchRarityAll_1 = require("../../../Core/Define/ConfigQuery/FloroRanchRarityAll");
const FloroRanchRewardByActivityId_1 = require("../../../Core/Define/ConfigQuery/FloroRanchRewardByActivityId");
const FloroRanchSkillAll_1 = require("../../../Core/Define/ConfigQuery/FloroRanchSkillAll");
const FloroRanchSubInsById_1 = require("../../../Core/Define/ConfigQuery/FloroRanchSubInsById");
const FloroRanchTagById_1 = require("../../../Core/Define/ConfigQuery/FloroRanchTagById");
const FloroRanchTaskByActivityId_1 = require("../../../Core/Define/ConfigQuery/FloroRanchTaskByActivityId");
const FloroRanchTaskTabAll_1 = require("../../../Core/Define/ConfigQuery/FloroRanchTaskTabAll");
const FloroRanchTechByActivityId_1 = require("../../../Core/Define/ConfigQuery/FloroRanchTechByActivityId");
const FloroRanchTerrainAll_1 = require("../../../Core/Define/ConfigQuery/FloroRanchTerrainAll");
const FloroRanchToyAll_1 = require("../../../Core/Define/ConfigQuery/FloroRanchToyAll");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class FloroRanchConfig extends ConfigBase_1.ConfigBase {
  GetFloroRanchActivityConfig(o) {
    var r = FloroRanchActivityById_1.configFloroRanchActivityById.GetConfig(o);
    if (r !== undefined) {
      return r;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("FloroRanch", 58, "FloroRanchActivity表无效id", ["activityId", o]);
    }
  }
  GetFloroRanchDungeonConfigList(o) {
    var r = FloroRanchInsByActivityId_1.configFloroRanchInsByActivityId.GetConfigList(o);
    if (r === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("FloroRanch", 58, "FloroRanchIns表 无效activityId", ["activityId", o]);
      }
      return [];
    } else {
      return r;
    }
  }
  GetFloroRanchSubDungeonConfig(o) {
    var r = FloroRanchSubInsById_1.configFloroRanchSubInsById.GetConfig(o);
    if (r !== undefined) {
      return r;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("FloroRanch", 58, "FloroRanchSubIns表无效id", ["id", o]);
    }
  }
  GetFloroRanchRarityConfigList() {
    var o = FloroRanchRarityAll_1.configFloroRanchRarityAll.GetConfigList();
    if (o === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("FloroRanch", 58, "FloroRanchRarity表获取失败");
      }
      return [];
    } else {
      return o;
    }
  }
  GetFloroRanchRaceConfigList() {
    var o = FloroRanchRaceAll_1.configFloroRanchRaceAll.GetConfigList();
    if (o === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("FloroRanch", 58, "FloroRanchRace表获取失败");
      }
      return [];
    } else {
      return o;
    }
  }
  GetFloroRanchCardConfigList() {
    var o = FloroRanchCardAll_1.configFloroRanchCardAll.GetConfigList();
    if (o === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("FloroRanch", 58, "FloroRanchCard表获取失败");
      }
      return [];
    } else {
      return o;
    }
  }
  GetFloroRanchToyConfigList() {
    var o = FloroRanchToyAll_1.configFloroRanchToyAll.GetConfigList();
    if (o === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("FloroRanch", 58, "FloroRanchToy表获取失败");
      }
      return [];
    } else {
      return o;
    }
  }
  GetFloroRanchTerrainConfigList() {
    var o = FloroRanchTerrainAll_1.configFloroRanchTerrainAll.GetConfigList();
    if (o === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("FloroRanch", 58, "FloroRanchTerrain表获取失败");
      }
      return [];
    } else {
      return o;
    }
  }
  GetFloroRanchSkillConfigList() {
    var o = FloroRanchSkillAll_1.configFloroRanchSkillAll.GetConfigList();
    if (o === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("FloroRanch", 58, "FloroRanchSkill表获取失败");
      }
      return [];
    } else {
      return o;
    }
  }
  GetFloroRanchTechnologyConfigList(o) {
    var r = FloroRanchTechByActivityId_1.configFloroRanchTechByActivityId.GetConfigList(o);
    if (r === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("FloroRanch", 58, "FloroRanchTech表无效activityId", ["activityId", o]);
      }
      return [];
    } else {
      return r;
    }
  }
  GetFloroRanchTaskConfigList(o) {
    var r = FloroRanchTaskByActivityId_1.configFloroRanchTaskByActivityId.GetConfigList(o);
    if (r === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("FloroRanch", 58, "FloroRanchTask表无效activityId", ["activityId", o]);
      }
      return [];
    } else {
      return r;
    }
  }
  GetFloroRanchRewardConfigList(o) {
    var r = FloroRanchRewardByActivityId_1.configFloroRanchRewardByActivityId.GetConfigList(o);
    if (r === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("FloroRanch", 58, "FloroRanchReward表无效activityId", ["activityId", o]);
      }
      return [];
    } else {
      return r;
    }
  }
  GetFloroRanchFilterTypeConfigList() {
    var o = FloroRanchFilterTypeAll_1.configFloroRanchFilterTypeAll.GetConfigList();
    if (o === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("FloroRanch", 78, "FloroRanchFilterType表获取失败");
      }
      return [];
    } else {
      return o;
    }
  }
  GetFloroRanchCardGroupConfigList() {
    var o = FloroRanchCardGroupAll_1.configFloroRanchCardGroupAll.GetConfigList();
    if (o === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("FloroRanch", 58, "FloroRanchCardGroup表获取失败");
      }
      return [];
    } else {
      return o;
    }
  }
  GetFloroRanchCurrencyConfigList() {
    var o = FloroRanchCurrencyAll_1.configFloroRanchCurrencyAll.GetConfigList();
    if (o === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("FloroRanch", 78, "FloroRanchCurrency表获取失败");
      }
      return [];
    } else {
      return o;
    }
  }
  GetFloroRanchBuffById(o) {
    var r = FloroRanchBuffById_1.configFloroRanchBuffById.GetConfig(o);
    if (r !== undefined) {
      return r;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("FloroRanch", 78, "FloroRanchBuff表无效id", ["id", o]);
    }
  }
  GetFloroRanchEventConfigList() {
    var o = FloroRanchEventAll_1.configFloroRanchEventAll.GetConfigList();
    if (o === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("FloroRanch", 78, "FloroRanchEvent表获取失败");
      }
      return [];
    } else {
      return o;
    }
  }
  GetFloroRanchAudioConfigList() {
    var o = FloroRanchAudioAll_1.configFloroRanchAudioAll.GetConfigList();
    if (o === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("FloroRanch", 58, "FloroRanchAudio表获取失败");
      }
      return [];
    } else {
      return o;
    }
  }
  GetFloroRanchTaskTabConfigList() {
    var o = FloroRanchTaskTabAll_1.configFloroRanchTaskTabAll.GetConfigList();
    if (o === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("FloroRanch", 71, "FloroRanchTaskTab表获取失败");
      }
      return [];
    } else {
      return o;
    }
  }
  GetFloroRanchTagConfig(o) {
    var r = FloroRanchTagById_1.configFloroRanchTagById.GetConfig(o);
    if (r !== undefined) {
      return r;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("FloroRanch", 58, "FloroRanchTag表无效tagId", ["tagId", o]);
    }
  }
  GetFloroRanchActionConfig(o) {
    var r = FloroRanchActionById_1.configFloroRanchActionById.GetConfig(o);
    if (r !== undefined) {
      return r;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("FloroRanch", 58, "FloroRanchAction表无效actionId", ["actionId", o]);
    }
  }
}
exports.FloroRanchConfig = FloroRanchConfig;
//# sourceMappingURL=FloroRanchConfig.js.map