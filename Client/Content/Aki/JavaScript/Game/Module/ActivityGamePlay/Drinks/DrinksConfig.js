"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DrinksConfig = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const DrinksBatchingAll_1 = require("../../../../Core/Define/ConfigQuery/DrinksBatchingAll");
const DrinksBatchingById_1 = require("../../../../Core/Define/ConfigQuery/DrinksBatchingById");
const DrinksDialogById_1 = require("../../../../Core/Define/ConfigQuery/DrinksDialogById");
const DrinksDrinkBaseAll_1 = require("../../../../Core/Define/ConfigQuery/DrinksDrinkBaseAll");
const DrinksDrinkBaseById_1 = require("../../../../Core/Define/ConfigQuery/DrinksDrinkBaseById");
const DrinksDrinkMixAll_1 = require("../../../../Core/Define/ConfigQuery/DrinksDrinkMixAll");
const DrinksDrinkMixById_1 = require("../../../../Core/Define/ConfigQuery/DrinksDrinkMixById");
const DrinksFlavorRangeByGroupId_1 = require("../../../../Core/Define/ConfigQuery/DrinksFlavorRangeByGroupId");
const DrinksFlavorRangeById_1 = require("../../../../Core/Define/ConfigQuery/DrinksFlavorRangeById");
const DrinksFlavorTypeById_1 = require("../../../../Core/Define/ConfigQuery/DrinksFlavorTypeById");
const DrinksOrnamentAll_1 = require("../../../../Core/Define/ConfigQuery/DrinksOrnamentAll");
const DrinksOrnamentById_1 = require("../../../../Core/Define/ConfigQuery/DrinksOrnamentById");
const DrinksParamById_1 = require("../../../../Core/Define/ConfigQuery/DrinksParamById");
const DrinksRequireListById_1 = require("../../../../Core/Define/ConfigQuery/DrinksRequireListById");
const DrinksRequireListByRoleId_1 = require("../../../../Core/Define/ConfigQuery/DrinksRequireListByRoleId");
const DrinksRoleInviteAll_1 = require("../../../../Core/Define/ConfigQuery/DrinksRoleInviteAll");
const DrinksRoleInviteById_1 = require("../../../../Core/Define/ConfigQuery/DrinksRoleInviteById");
const DrinksRoleLikeDrinkById_1 = require("../../../../Core/Define/ConfigQuery/DrinksRoleLikeDrinkById");
const DrinksStepConfigById_1 = require("../../../../Core/Define/ConfigQuery/DrinksStepConfigById");
const ConfigBase_1 = require("../../../../Core/Framework/ConfigBase");
class DrinksConfig extends ConfigBase_1.ConfigBase {
  GetDrinkBase(r) {
    var i = DrinksDrinkBaseById_1.configDrinksDrinkBaseById.GetConfig(r);
    if (i !== undefined) {
      return i;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Drinks", 77, "DrinksDrinkBase表无效id", ["id", r]);
    }
  }
  GetAllDrinkBase() {
    var r = DrinksDrinkBaseAll_1.configDrinksDrinkBaseAll.GetConfigList();
    if (r === undefined) {
      return [];
    } else {
      return r;
    }
  }
  GetBatching(r) {
    var i = DrinksBatchingById_1.configDrinksBatchingById.GetConfig(r);
    if (i !== undefined) {
      return i;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Drinks", 77, "DrinksBatching表无效id", ["id", r]);
    }
  }
  GetAllBatching() {
    var r = DrinksBatchingAll_1.configDrinksBatchingAll.GetConfigList();
    if (r === undefined) {
      return [];
    } else {
      return r;
    }
  }
  GetOrnament(r) {
    var i = DrinksOrnamentById_1.configDrinksOrnamentById.GetConfig(r);
    if (i !== undefined) {
      return i;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Drinks", 77, "DrinksOrnament表无效id", ["id", r]);
    }
  }
  GetAllOrnament() {
    var r = DrinksOrnamentAll_1.configDrinksOrnamentAll.GetConfigList();
    if (r === undefined) {
      return [];
    } else {
      return r;
    }
  }
  GetRequireList(r) {
    var i = DrinksRequireListById_1.configDrinksRequireListById.GetConfig(r);
    if (i !== undefined) {
      return i;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Drinks", 77, "DrinksRequireList表无效id", ["id", r]);
    }
  }
  GetRoleLikeDrink(r) {
    var i = DrinksRoleLikeDrinkById_1.configDrinksRoleLikeDrinkById.GetConfig(r);
    if (i !== undefined) {
      return i;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Drinks", 77, "DrinksRoleLikeDrink表无效id", ["id", r]);
    }
  }
  GetFlavorRange(r) {
    var i = DrinksFlavorRangeById_1.configDrinksFlavorRangeById.GetConfig(r);
    if (i !== undefined) {
      return i;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Drinks", 77, "DrinksFlavorRange表无效id", ["id", r]);
    }
  }
  GetFlavorRangeGroup(r) {
    var i = DrinksFlavorRangeByGroupId_1.configDrinksFlavorRangeByGroupId.GetConfigList(r);
    if (i === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Drinks", 77, "DrinksFlavorRange表无效Group", ["Group", r]);
      }
      return [];
    } else {
      return i;
    }
  }
  GetFlavorType(r) {
    var i = DrinksFlavorTypeById_1.configDrinksFlavorTypeById.GetConfig(r);
    if (i !== undefined) {
      return i;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Drinks", 77, "DrinksFlavorType表无效id", ["id", r]);
    }
  }
  GetDrinkMix(r) {
    var i = DrinksDrinkMixById_1.configDrinksDrinkMixById.GetConfig(r);
    if (i !== undefined) {
      return i;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Drinks", 77, "DrinksDrinkMix表无效id", ["id", r]);
    }
  }
  GetAllMix() {
    var r = DrinksDrinkMixAll_1.configDrinksDrinkMixAll.GetConfigList();
    if (r === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Drinks", 77, "DrinksDrinkMix表无效");
      }
      return [];
    } else {
      return r;
    }
  }
  GetRequireListByRole(r) {
    var i = DrinksRequireListByRoleId_1.configDrinksRequireListByRoleId.GetConfigList(r);
    if (i === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Drinks", 77, "DrinksRequireList表无效role", ["role", r]);
      }
      return [];
    } else {
      return i;
    }
  }
  GetStepConfig(r) {
    var i = DrinksStepConfigById_1.configDrinksStepConfigById.GetConfig(r);
    if (i !== undefined) {
      return i;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Drinks", 77, "DrinksStepConfig表无效role", ["step", r]);
    }
  }
  GetInviteConfig(r) {
    var i = DrinksRoleInviteById_1.configDrinksRoleInviteById.GetConfig(r);
    if (i !== undefined) {
      return i;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Drinks", 77, "DrinksRoleInvite表无效id", ["configId", r]);
    }
  }
  GetInviteConfigByRole(r) {
    for (const i of this.GetAllInvite()) {
      if (i.RoleId === r) {
        return i;
      }
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Drinks", 77, "DrinksRoleInvite表无效roleId", ["roleId", r]);
    }
  }
  GetAllInvite() {
    var r = DrinksRoleInviteAll_1.configDrinksRoleInviteAll.GetConfigList();
    return r || [];
  }
  GetDialog(r) {
    var i = DrinksDialogById_1.configDrinksDialogById.GetConfig(r);
    if (i !== undefined) {
      return i;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Drinks", 77, "DrinksDialog表无效id", ["id", r]);
    }
  }
  GetParam(r) {
    var i = DrinksParamById_1.configDrinksParamById.GetConfig(r);
    if (i !== undefined) {
      return i;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Drinks", 77, "DrinksParam表无效id", ["id", r]);
    }
  }
  GetFlavorMax() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("DrinksFlavorMax") ?? 10;
  }
  GetQTETimeLimit() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("DrinksQTETimeLimit") ?? 9000;
  }
  GetQTESpeed() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("DrinksQTETimeSpeed") ?? 1500;
  }
  GetQTESeqTime() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("DrinksQTESeqTime") ?? 500;
  }
  GetNeedHideNpcId() {
    return CommonParamById_1.configCommonParamById.GetIntArrayConfig("DrinksNPCEntity") ?? [];
  }
}
exports.DrinksConfig = DrinksConfig;
//# sourceMappingURL=DrinksConfig.js.map