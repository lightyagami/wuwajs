"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EntityPhysicsAssetConfig = undefined;
const Log_1 = require("../../../../../../Core/Common/Log");
const PhysicsAssetConfigByIdWithDefaultId_1 = require("../../../../../../Core/Define/ConfigQuery/PhysicsAssetConfigByIdWithDefaultId");
const ConfigBase_1 = require("../../../../../../Core/Framework/ConfigBase");
const DEFAULT_DB_ID = "0";
class EntityPhysicsAssetConfig extends ConfigBase_1.ConfigBase {
  GetPhysicsAssetConfigByRoleBody(e) {
    var s = PhysicsAssetConfigByIdWithDefaultId_1.configPhysicsAssetConfigByIdWithDefaultId.GetConfig(DEFAULT_DB_ID, e, e, e);
    if (s) {
      if (s.Id !== e && Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Character", 57, "该角色未在角色物理资产配置表中配置 /Config/j.角色物理资产", ["默认值Id", DEFAULT_DB_ID]);
      }
      return s;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Character", 57, "该角色未在角色物理资产配置表中默认值配置 /Config/j.角色物理资产", ["默认值Id", DEFAULT_DB_ID]);
    }
  }
}
exports.EntityPhysicsAssetConfig = EntityPhysicsAssetConfig;
//# sourceMappingURL=EntityPhysicsAssetConfig.js.map