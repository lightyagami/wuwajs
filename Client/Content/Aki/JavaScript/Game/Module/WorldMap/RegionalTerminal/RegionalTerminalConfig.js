"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RegionalTerminalConfig = undefined;
const AreaMapGroupAll_1 = require("../../../../Core/Define/ConfigQuery/AreaMapGroupAll");
const AreaMapGroupById_1 = require("../../../../Core/Define/ConfigQuery/AreaMapGroupById");
const AreaTerminalAll_1 = require("../../../../Core/Define/ConfigQuery/AreaTerminalAll");
const AreaTerminalByCountry_1 = require("../../../../Core/Define/ConfigQuery/AreaTerminalByCountry");
const AreaTerminalById_1 = require("../../../../Core/Define/ConfigQuery/AreaTerminalById");
const AreaTerminalGroupById_1 = require("../../../../Core/Define/ConfigQuery/AreaTerminalGroupById");
const ConfigBase_1 = require("../../../../Core/Framework/ConfigBase");
class RegionalTerminalConfig extends ConfigBase_1.ConfigBase {
  GetAreaTerminalByGameplayId(e) {
    return AreaTerminalById_1.configAreaTerminalById.GetConfig(e);
  }
  GetAreaTerminalByCountryId(e) {
    return AreaTerminalByCountry_1.configAreaTerminalByCountry.GetConfigList(e) ?? [];
  }
  GetAllAreaTerminal() {
    return AreaTerminalAll_1.configAreaTerminalAll.GetConfigList() ?? [];
  }
  GetAreaTerminalGroup(e) {
    return AreaTerminalGroupById_1.configAreaTerminalGroupById.GetConfig(e);
  }
  GetAllAreaMapGroup() {
    return AreaMapGroupAll_1.configAreaMapGroupAll.GetConfigList() ?? [];
  }
  GetAreaMapGroup(e) {
    return AreaMapGroupById_1.configAreaMapGroupById.GetConfig(e);
  }
}
exports.RegionalTerminalConfig = RegionalTerminalConfig;
//# sourceMappingURL=RegionalTerminalConfig.js.map