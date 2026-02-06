"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleDevConfig = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const PropertyIndexById_1 = require("../../../../Core/Define/ConfigQuery/PropertyIndexById");
const RoleDevCulProjectConfigById_1 = require("../../../../Core/Define/ConfigQuery/RoleDevCulProjectConfigById");
const RoleDevCultivateProjectByProjectProjectId_1 = require("../../../../Core/Define/ConfigQuery/RoleDevCultivateProjectByProjectProjectId");
const RoleDevItemJumpGroupByItemId_1 = require("../../../../Core/Define/ConfigQuery/RoleDevItemJumpGroupByItemId");
const RoleDevLevelLimitAll_1 = require("../../../../Core/Define/ConfigQuery/RoleDevLevelLimitAll");
const RoleDevPhantomJumpGroupByPhantomId_1 = require("../../../../Core/Define/ConfigQuery/RoleDevPhantomJumpGroupByPhantomId");
const RoleDevProjectByRoleId_1 = require("../../../../Core/Define/ConfigQuery/RoleDevProjectByRoleId");
const RoleDevProsRoleItemByItemGroupId_1 = require("../../../../Core/Define/ConfigQuery/RoleDevProsRoleItemByItemGroupId");
const RoleDevTypeManageByItemType_1 = require("../../../../Core/Define/ConfigQuery/RoleDevTypeManageByItemType");
const RoleDevWeaponItemByWeaponType_1 = require("../../../../Core/Define/ConfigQuery/RoleDevWeaponItemByWeaponType");
const RoleDevWeaponJumpGroupByWeaponId_1 = require("../../../../Core/Define/ConfigQuery/RoleDevWeaponJumpGroupByWeaponId");
const ConfigBase_1 = require("../../../../Core/Framework/ConfigBase");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const TimeUtil_1 = require("../../../Common/TimeUtil");
class RoleDevConfig extends ConfigBase_1.ConfigBase {
  constructor() {
    super(...arguments);
    this.Ewg = new Map();
    this.vTg = new Map();
  }
  UpdateDevProsListConfig(e) {
    this.Ewg.clear();
    for (const t of e) {
      var o = [];
      for (const i of t.YRg) {
        o.push({
          TypeId: i.tTs,
          GachaId: i.t9n
        });
      }
      var r = {
        Id: t.s5n,
        ProspectBeginTime: Number(MathUtils_1.MathUtils.LongToBigInt(t.nmd)) / TimeUtil_1.TimeUtil.InverseMillisecond,
        ProspectEndTime: Number(MathUtils_1.MathUtils.LongToBigInt(t.smd)) / TimeUtil_1.TimeUtil.InverseMillisecond,
        TypeId: t.tTs,
        GachaId: t.t9n,
        SpecialGachaId: o,
        SortId: t.XBc
      };
      this.Ewg.set(t.s5n, r);
    }
  }
  UpdateDevPropsProjectConfig(e) {
    this.vTg.clear();
    e.forEach(e => {
      var o = {
        Id: e.s5n,
        ElementId: e.o5c,
        RoleName: e.bIg,
        RoleExperience: e.RIg,
        RoleGoalLevel: e.LIg,
        WeaponGoalLevel: e.wIg,
        WeaponExperience: e.PIg,
        RoleItemGroup: e.AIg,
        WeaponBreachItemGroup: e.DIg,
        WeaponType: e.UIg,
        SkillItemGroup: e.xIg,
        PrefectSkillLevel: e.BIg,
        RoleHeadIcon: e.kIg,
        RoleHeadIconSmall: e.qIg
      };
      this.vTg.set(e.s5n, o);
    });
  }
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
    var o = this.Ewg.get(e);
    if (o !== undefined) {
      return o;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("RoleDev", 97, "服务器Proto_DevPropsList无效roleId", ["roleId", e]);
    }
  }
  GetAllRoleDevProsListConfig() {
    return Array.from(this.Ewg.values());
  }
  GetRoleDevProsProjectConfig(e) {
    var o = this.vTg.get(e);
    if (o !== undefined) {
      return o;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("RoleDev", 97, "服务器Proto_DevPropsProjectList无效roleId", ["roleId", e]);
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
  GetCanLevelUpSkillNodeIndexList() {
    return CommonParamById_1.configCommonParamById.GetIntArrayConfig("RoleDevCanLevelUpSkillNodeIndexList");
  }
  GetDefaultSkillNodeIndex() {
    return this.GetCanLevelUpSkillNodeIndexList()[0] ?? 0;
  }
}
exports.RoleDevConfig = RoleDevConfig;
//# sourceMappingURL=RoleDevConfig.js.map