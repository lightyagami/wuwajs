"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RegionalTerminalGameplayData = undefined;
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
class RegionalTerminalGameplayData {
  constructor() {
    this.Id = 0;
    this.GameplayId = 0;
    this.GroupId = 0;
    this.SortId = 0;
    this.CloseTerminalWhenForwarding = true;
  }
  GetGameplayConfig() {
    return ConfigManager_1.ConfigManager.RegionalTerminalConfig.GetAreaTerminalByGameplayId(this.Id);
  }
}
exports.RegionalTerminalGameplayData = RegionalTerminalGameplayData;
//# sourceMappingURL=RegionalTerminalGameplayData.js.map