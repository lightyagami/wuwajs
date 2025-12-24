"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrialRoleConfig = undefined;
const RoleInfoById_1 = require("../../../Core/Define/ConfigQuery/RoleInfoById");
const TrialRoleInfoByGroupId_1 = require("../../../Core/Define/ConfigQuery/TrialRoleInfoByGroupId");
const TrialRoleInfoById_1 = require("../../../Core/Define/ConfigQuery/TrialRoleInfoById");
const TrialRoleInfoByType_1 = require("../../../Core/Define/ConfigQuery/TrialRoleInfoByType");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
const ConfigManager_1 = require("../../Manager/ConfigManager");
class TrialRoleConfig extends ConfigBase_1.ConfigBase {
  GetTrialRoleConfig(e) {
    return TrialRoleInfoById_1.configTrialRoleInfoById.GetConfig(e);
  }
  GetTrialRoleConfigsByGroupId(e) {
    return TrialRoleInfoByGroupId_1.configTrialRoleInfoByGroupId.GetConfigList(e);
  }
  GetTrialRoleConfigListByType(e) {
    return TrialRoleInfoByType_1.configTrialRoleInfoByType.GetConfigList(e) ?? [];
  }
  GetTrialRoleAllConfigByType(e) {
    const r = new Map();
    this.GetTrialRoleConfigListByType(e).forEach(e => {
      var o = e.GroupId;
      if (!r.has(o)) {
        r.set(o, []);
      }
      r.get(o).push(e);
    });
    r.forEach(e => {
      e.sort((e, o) => e.WorldLevel - o.WorldLevel);
    });
    return r;
  }
  GetRoleConfigByTrialRoleId(e) {
    e = this.GetTrialRoleConfig(e);
    if (e) {
      return RoleInfoById_1.configRoleInfoById.GetConfig(e.ParentId);
    }
  }
  GetRoleConfigByGroupId(e) {
    e = this.GetTrialRoleConfigsByGroupId(e);
    if (e) {
      return ConfigManager_1.ConfigManager.RoleConfig?.GetRoleConfig(e[0].ParentId);
    }
  }
  GetTrialRoleGroupId(e) {
    return this.GetTrialRoleConfig(e)?.GroupId;
  }
}
exports.TrialRoleConfig = TrialRoleConfig;
//# sourceMappingURL=TrialRoleConfig.js.map