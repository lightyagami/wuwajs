"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelPlayConfig = undefined;
const Log_1 = require("../../../Core/Common/Log");
const ExchangeRewardById_1 = require("../../../Core/Define/ConfigQuery/ExchangeRewardById");
const LevelPlayDataById_1 = require("../../../Core/Define/ConfigQuery/LevelPlayDataById");
const LevelPlayNodeDataByKey_1 = require("../../../Core/Define/ConfigQuery/LevelPlayNodeDataByKey");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class LevelPlayConfig extends ConfigBase_1.ConfigBase {
  GetExchangeRewardInfo(e) {
    var a = ExchangeRewardById_1.configExchangeRewardById.GetConfig(e);
    if (!a) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SceneGameplay", 18, "找不到兑换奖励表配置", ["配置表路径", "Source/Config/Raw/Tables/d.兑换奖励配置"], ["Id", e]);
      }
    }
    return a;
  }
  GetLevelPlayConfig(e) {
    var a = LevelPlayDataById_1.configLevelPlayDataById.GetConfig(e, false);
    if (!a) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SceneGameplay", 18, "找不到任务配置", ["玩法Id", e]);
      }
    }
    return a;
  }
  GetLevelPlayNodeConfig(e, a) {
    var o = LevelPlayNodeDataByKey_1.configLevelPlayNodeDataByKey.GetConfig(e + "_" + a, false);
    if (!o) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Quest", 18, "找不到玩法节点配置", ["玩法Id", e], ["节点Id", a]);
      }
    }
    return o;
  }
}
exports.LevelPlayConfig = LevelPlayConfig;
//# sourceMappingURL=LevelPlayConfig.js.map