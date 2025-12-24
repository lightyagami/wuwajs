"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ArtemisActivityConfig = undefined;
const ArtemisByActivityId_1 = require("../../../../../Core/Define/ConfigQuery/ArtemisByActivityId");
const ArtemisByDay_1 = require("../../../../../Core/Define/ConfigQuery/ArtemisByDay");
const ArtemisChatById_1 = require("../../../../../Core/Define/ConfigQuery/ArtemisChatById");
const ArtemisQteById_1 = require("../../../../../Core/Define/ConfigQuery/ArtemisQteById");
const ConfigBase_1 = require("../../../../../Core/Framework/ConfigBase");
class ArtemisActivityConfig extends ConfigBase_1.ConfigBase {
  GetArtemisByActivityIdAndDay(e, t) {
    return ArtemisByDay_1.configArtemisByDay.GetConfig(e, t);
  }
  GetArtemisGroupByActivityId(e) {
    return ArtemisByActivityId_1.configArtemisByActivityId.GetConfigList(e);
  }
  GetArtemisChatConfigById(e) {
    return ArtemisChatById_1.configArtemisChatById.GetConfig(e);
  }
  GetArtemisQteConfigById(e) {
    return ArtemisQteById_1.configArtemisQteById.GetConfig(e);
  }
}
exports.ArtemisActivityConfig = ArtemisActivityConfig;
//# sourceMappingURL=ArtemisActivityConfig.js.map