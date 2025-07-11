"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RacingBetsConfig = undefined;
const Log_1 = require("../../../Core/Common/Log");
const DangoBroadcastById_1 = require("../../../Core/Define/ConfigQuery/DangoBroadcastById");
const RacingBetConversionRateById_1 = require("../../../Core/Define/ConfigQuery/RacingBetConversionRateById");
const RacingBetConversionRateBySeasonId_1 = require("../../../Core/Define/ConfigQuery/RacingBetConversionRateBySeasonId");
const RacingBetMapPointBySeasonId_1 = require("../../../Core/Define/ConfigQuery/RacingBetMapPointBySeasonId");
const RacingBetRankOpenTimeById_1 = require("../../../Core/Define/ConfigQuery/RacingBetRankOpenTimeById");
const RacingBetsBulletScreenById_1 = require("../../../Core/Define/ConfigQuery/RacingBetsBulletScreenById");
const RacingBetsBulletScreenBySeasonId_1 = require("../../../Core/Define/ConfigQuery/RacingBetsBulletScreenBySeasonId");
const RacingBetsGroupMatchById_1 = require("../../../Core/Define/ConfigQuery/RacingBetsGroupMatchById");
const RacingBetsLegMatchesById_1 = require("../../../Core/Define/ConfigQuery/RacingBetsLegMatchesById");
const RacingBetsRewardById_1 = require("../../../Core/Define/ConfigQuery/RacingBetsRewardById");
const RacingBetsRewardBySeasonId_1 = require("../../../Core/Define/ConfigQuery/RacingBetsRewardBySeasonId");
const RacingBetsSeasonById_1 = require("../../../Core/Define/ConfigQuery/RacingBetsSeasonById");
const RacingBettingGearBySeasonId_1 = require("../../../Core/Define/ConfigQuery/RacingBettingGearBySeasonId");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class RacingBetsConfig extends ConfigBase_1.ConfigBase {
  GetRacingBetsSeasonConfig(e) {
    var n = RacingBetsSeasonById_1.configRacingBetsSeasonById.GetConfig(e);
    if (n !== undefined) {
      return n;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("RacingBets", 58, "RacingBetsSeason表无效id", ["SeasonId", e]);
    }
  }
  GetRacingBetsGroupMatch(e) {
    var n = RacingBetsGroupMatchById_1.configRacingBetsGroupMatchById.GetConfig(e);
    if (n !== undefined) {
      return n;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("RacingBets", 58, "RacingBetsGroupMatch表无效MatchId", ["MatchId", e]);
    }
  }
  GetRacingBetsLegMatches(e) {
    var n = RacingBetsLegMatchesById_1.configRacingBetsLegMatchesById.GetConfig(e);
    if (n !== undefined) {
      return n;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("RacingBets", 58, "RacingBetsLegMatches表无效Id", ["id", e]);
    }
  }
  GetRacingBetsRewardList(e) {
    var n = RacingBetsRewardBySeasonId_1.configRacingBetsRewardBySeasonId.GetConfigList(e);
    if (n !== undefined) {
      return n;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("RacingBets", 58, "RacingBetsReward表无效seasonId", ["seasonId", e]);
    }
  }
  GetRacingBetsReward(e) {
    var n = RacingBetsRewardById_1.configRacingBetsRewardById.GetConfig(e);
    if (n !== undefined) {
      return n;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("RacingBets", 58, "RacingBetsReward表无效id", ["id", e]);
    }
  }
  GetRacingBetsBulletScreen(e) {
    var n = RacingBetsBulletScreenById_1.configRacingBetsBulletScreenById.GetConfig(e);
    if (n !== undefined) {
      return n;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("RacingBets", 58, "RacingBetsBulletScreen表无效bulletScreenId", ["bulletScreenId", e]);
    }
  }
  GetRacingBetsBulletScreenList(e) {
    var n = RacingBetsBulletScreenBySeasonId_1.configRacingBetsBulletScreenBySeasonId.GetConfigList(e);
    if (n !== undefined) {
      return n;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("RacingBets", 58, "RacingBetsBulletScreen表无效seasonId", ["seasonId", e]);
    }
  }
  GetRacingBettingGearList(e) {
    var n = RacingBettingGearBySeasonId_1.configRacingBettingGearBySeasonId.GetConfigList(e);
    if (n !== undefined) {
      return n;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("RacingBets", 58, "RacingBettingGear表无效seasonId", ["seasonId", e]);
    }
  }
  GetRacingBetConversionRateList(e) {
    var n = RacingBetConversionRateBySeasonId_1.configRacingBetConversionRateBySeasonId.GetConfigList(e);
    if (n !== undefined) {
      return n;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("RacingBets", 58, "RacingBetConversionRate表无效seasonId", ["seasonId", e]);
    }
  }
  GetRacingBetMapPointList(e) {
    var n = RacingBetMapPointBySeasonId_1.configRacingBetMapPointBySeasonId.GetConfigList(e);
    if (n !== undefined) {
      return n;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("RacingBets", 58, "RacingBetMapPoint表无效seasonId", ["seasonId", e]);
    }
  }
  GetRacingBetRankOpenTime(e) {
    var n = RacingBetRankOpenTimeById_1.configRacingBetRankOpenTimeById.GetConfig(e);
    if (n !== undefined) {
      return n;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("RacingBets", 58, "RacingBetRankOpenTime表无效legMatchId", ["legMatchId", e]);
    }
  }
  GetRacingBetsDangoBroadcast(e) {
    var n = DangoBroadcastById_1.configDangoBroadcastById.GetConfig(e);
    if (n !== undefined) {
      return n;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("RacingBets", 58, "DangoBroadcast表无效dangoId", ["dangoId", e]);
    }
  }
  GetRacingBetConversionRate(e) {
    var n = RacingBetConversionRateById_1.configRacingBetConversionRateById.GetConfig(e);
    if (n === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("RacingBets", 78, "RacingBetConversionRate表无效rank", ["rank", e]);
      }
      return 0;
    } else {
      return n.ConversionRate;
    }
  }
}
exports.RacingBetsConfig = RacingBetsConfig;
//# sourceMappingURL=RacingBetsConfig.js.map