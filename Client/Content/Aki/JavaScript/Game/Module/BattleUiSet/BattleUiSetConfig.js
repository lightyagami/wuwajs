"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattleUiSetConfig = undefined;
const MobileBattleUiSetByPanelIndex_1 = require("../../../Core/Define/ConfigQuery/MobileBattleUiSetByPanelIndex");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class BattleUiSetConfig extends ConfigBase_1.ConfigBase {
  GetMobileBattleUiSetConfigList(e) {
    return MobileBattleUiSetByPanelIndex_1.configMobileBattleUiSetByPanelIndex.GetConfigList(e);
  }
}
exports.BattleUiSetConfig = BattleUiSetConfig;
//# sourceMappingURL=BattleUiSetConfig.js.map