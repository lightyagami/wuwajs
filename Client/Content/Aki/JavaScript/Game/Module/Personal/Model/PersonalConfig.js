"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PersonalConfig = undefined;
const PlayerHeadReAll_1 = require("../../../../Core/Define/ConfigQuery/PlayerHeadReAll");
const PlayerHeadReById_1 = require("../../../../Core/Define/ConfigQuery/PlayerHeadReById");
const ConfigBase_1 = require("../../../../Core/Framework/ConfigBase");
class PersonalConfig extends ConfigBase_1.ConfigBase {
  GetPlayerHeadConfig(e) {
    return PlayerHeadReById_1.configPlayerHeadReById.GetConfig(e);
  }
  GetAllPlayerHeadConfig() {
    return PlayerHeadReAll_1.configPlayerHeadReAll.GetConfigList();
  }
}
exports.PersonalConfig = PersonalConfig;
//# sourceMappingURL=PersonalConfig.js.map