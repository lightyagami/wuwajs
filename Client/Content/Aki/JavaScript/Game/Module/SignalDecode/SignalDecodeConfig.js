"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SignalDecodeConfig = undefined;
const Log_1 = require("../../../Core/Common/Log");
const CatchSignalDifficultyById_1 = require("../../../Core/Define/ConfigQuery/CatchSignalDifficultyById");
const CatchSignalGameplayById_1 = require("../../../Core/Define/ConfigQuery/CatchSignalGameplayById");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class SignalDecodeConfig extends ConfigBase_1.ConfigBase {
  GetGameplayConfig(e) {
    var i = CatchSignalGameplayById_1.configCatchSignalGameplayById.GetConfig(e);
    if (!i) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("GeneralLogicTree", 18, "无法找到捕捉信号的配置", ["id", e]);
      }
    }
    return i;
  }
  GetDifficultyConfig(e) {
    var i = CatchSignalDifficultyById_1.configCatchSignalDifficultyById.GetConfig(e);
    if (!i) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("GeneralLogicTree", 18, "无法找到捕捉信号难度的配置", ["id", e]);
      }
    }
    return i;
  }
}
exports.SignalDecodeConfig = SignalDecodeConfig;
//# sourceMappingURL=SignalDecodeConfig.js.map