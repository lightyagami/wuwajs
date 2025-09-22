"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleDevConfig = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const PropertyIndexById_1 = require("../../../../Core/Define/ConfigQuery/PropertyIndexById");
const RoleDevCulProjectConfigById_1 = require("../../../../Core/Define/ConfigQuery/RoleDevCulProjectConfigById");
const RoleDevCultivateProjectByProjectProjectId_1 = require("../../../../Core/Define/ConfigQuery/RoleDevCultivateProjectByProjectProjectId");
const RoleDevItemJumpGroupByItemId_1 = require("../../../../Core/Define/ConfigQuery/RoleDevItemJumpGroupByItemId");
const RoleDevLevelLimitAll_1 = require("../../../../Core/Define/ConfigQuery/RoleDevLevelLimitAll");
const RoleDevPhantomJumpGroupByPhantomId_1 = require("../../../../Core/Define/ConfigQuery/RoleDevPhantomJumpGroupByPhantomId");
const RoleDevProjectByRoleId_1 = require("../../../../Core/Define/ConfigQuery/RoleDevProjectByRoleId");
const RoleDevProsListAll_1 = require("../../../../Core/Define/ConfigQuery/RoleDevProsListAll");
const RoleDevProsListById_1 = require("../../../../Core/Define/ConfigQuery/RoleDevProsListById");
const RoleDevProsProjectById_1 = require("../../../../Core/Define/ConfigQuery/RoleDevProsProjectById");
const RoleDevProsRoleItemByItemGroupId_1 = require("../../../../Core/Define/ConfigQuery/RoleDevProsRoleItemByItemGroupId");
const RoleDevTypeManageByItemType_1 = require("../../../../Core/Define/ConfigQuery/RoleDevTypeManageByItemType");
const RoleDevWeaponItemByWeaponType_1 = require("../../../../Core/Define/ConfigQuery/RoleDevWeaponItemByWeaponType");
const RoleDevWeaponJumpGroupByWeaponId_1 = require("../../../../Core/Define/ConfigQuery/RoleDevWeaponJumpGroupByWeaponId");
const ConfigBase_1 = require("../../../../Core/Framework/ConfigBase");
class RoleDevConfig extends ConfigBase_1.ConfigBase {
  GetRoleDevProjectConfig(e) {
    var o = RoleDevProjectByRoleId_1.configRoleDevProjectByRoleId.GetConfig(e);
    if (o !== undefined) {
      return o;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("RoleDev", 88, "RoleDevProject表无效roleId", ["roleId", e]);
    }
  }
  GetCultivateProjectConfig(e) {
    var o = RoleDevCultivateProjectByProjectProjectId_1.configRoleDevCultivateProjectByProjectProjectId.GetConfig(e);
    if (o !== undefined) {
      return o;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("RoleDev", 88, "RoleDevCultivateProject表无效cultivateProjectId", ["cultivateProjectId", e]);
    }
  }
  GetLevelLimitConfigList() {
    var e = RoleDevLevelLimitAll_1.configRoleDevLevelLimitAll.GetConfigList();
    return e || (Log_1.Log.CheckError() && Log_1.Log.Error("RoleDev", 88, "RoleDevLevelLimit表获取失败"), []);
  }
  GetItemJumpGroupConfig(e) {
    var o = RoleDevItemJumpGroupByItemId_1.configRoleDevItemJumpGroupByItemId.GetConfig(e);
    if (o !== undefined) {
      return o;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("RoleDev", 88, "RoleDevItemJumpGroup表无效itemId", ["itemId", e]);
    }
  }
  GetTypeManageConfig(e) {
    var o = RoleDevTypeManageByItemType_1.configRoleDevTypeManageByItemType.GetConfig(e);
    if (o !== undefined) {
      return o;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("RoleDev", 88, "RoleDevTypeManage表无效type", ["type", e]);
    }
  }
  GetPhantomJumpGroupConfig(e) {
    var o = RoleDevPhantomJumpGroupByPhantomId_1.configRoleDevPhantomJumpGroupByPhantomId.GetConfig(e);
    if (o !== undefined) {
      return o;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("RoleDev", 88, "RoleDevPhantomJumpGroup表无效fetterGroupId", ["fetterGroupId", e]);
    }
  }
  GetPropertyIndexConfigByIndex(e) {
    var o = PropertyIndexById_1.configPropertyIndexById.GetConfig(e);
    if (o !== undefined) {
      return o;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("RoleDev", 88, "PropertyIndex表无效index", ["index", e]);
    }
  }
  GetWeaponRecommendListConfig(e) {
    var o = RoleDevProjectByRoleId_1.configRoleDevProjectByRoleId.GetConfig(e);
    if (o === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("RoleDev", 88, "RoleDevProject表无效roleId", ["roleId", e]);
      }
      return [];
    } else {
      return o.RecommandWeapon;
    }
  }
  GetWeaponJumpGroupConfigByWeaponId(e) {
    var o = RoleDevWeaponJumpGroupByWeaponId_1.configRoleDevWeaponJumpGroupByWeaponId.GetConfig(e);
    if (o !== undefined) {
      return o;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("RoleDev", 88, "RoleDevWeaponJumpGroup表无效weaponId", ["weaponId", e]);
    }
  }
  GetRoleDevProsListConfig(e) {
    var o = RoleDevProsListById_1.configRoleDevProsListById.GetConfig(e);
    if (o !== undefined) {
      return o;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("RoleDev", 88, "RoleDevProsList表无效roleId", ["roleId", e]);
    }
  }
  GetAllRoleDevProsListConfig() {
    var e = RoleDevProsListAll_1.configRoleDevProsListAll.GetConfigList();
    if (e) {
      return e;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("RoleDev", 88, "RoleDevProsList表获取失败");
    }
  }
  GetRoleDevProsProjectConfig(e) {
    var o = RoleDevProsProjectById_1.configRoleDevProsProjectById.GetConfig(e);
    if (o !== undefined) {
      return o;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("RoleDev", 88, "RoleDevProsProject表无效roleId", ["roleId", e]);
    }
  }
  GetRoleDevProsRoleItemConfig(e) {
    var o = RoleDevProsRoleItemByItemGroupId_1.configRoleDevProsRoleItemByItemGroupId.GetConfig(e);
    if (o !== undefined) {
      return o;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("RoleDev", 88, "RoleDevProsRoleItem表无效itemGroupId", ["itemGroupId", e]);
    }
  }
  GetRoleDevWeaponItemConfig(e) {
    var o = RoleDevWeaponItemByWeaponType_1.configRoleDevWeaponItemByWeaponType.GetConfig(e);
    if (o !== undefined) {
      return o;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("RoleDev", 88, "RoleDevWeaponItem表无效weaponType", ["weaponType", e]);
    }
  }
  GetRoleDevStaticConfig() {
    var e = RoleDevCulProjectConfigById_1.configRoleDevCulProjectConfigById.GetConfig(1);
    if (e !== undefined) {
      return e;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("RoleDev", 88, "RoleDevStatic表无效configId", ["configId", 1]);
    }
  }
}
exports.RoleDevConfig = RoleDevConfig;
//# sourceMappingURL=RoleDevConfig.js.map