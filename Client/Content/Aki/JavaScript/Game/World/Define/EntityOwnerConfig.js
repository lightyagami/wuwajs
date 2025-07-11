"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EntityOwnerConfig = undefined;
const EntityOwnerDataByGuid_1 = require("../../../Core/Define/ConfigQuery/EntityOwnerDataByGuid");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class EntityOwnerConfig extends ConfigBase_1.ConfigBase {
  GetEntityOwnerConfig(e) {
    e = EntityOwnerDataByGuid_1.configEntityOwnerDataByGuid.GetConfig(e, false);
    if (e) {
      return e;
    }
  }
}
exports.EntityOwnerConfig = EntityOwnerConfig;
//# sourceMappingURL=EntityOwnerConfig.js.map