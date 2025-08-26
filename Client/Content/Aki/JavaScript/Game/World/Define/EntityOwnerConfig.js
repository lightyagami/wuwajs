"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EntityOwnerConfig = undefined;
const EntityOwnerDataByGuid_1 = require("../../../Core/Define/ConfigQuery/EntityOwnerDataByGuid");
const EntityOwnerDataById_1 = require("../../../Core/Define/ConfigQuery/EntityOwnerDataById");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class EntityOwnerConfig extends ConfigBase_1.ConfigBase {
  GetEntityOwnerConfig(e) {
    e = EntityOwnerDataByGuid_1.configEntityOwnerDataByGuid.GetConfig(e);
    if (e) {
      return e;
    }
  }
  CheckEntityOwnerConfig(e) {
    e = EntityOwnerDataById_1.configEntityOwnerDataById.GetConfigList(e);
    if (e?.length) {
      return e[0];
    }
  }
}
exports.EntityOwnerConfig = EntityOwnerConfig;
//# sourceMappingURL=EntityOwnerConfig.js.map