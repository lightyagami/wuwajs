"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ComponentConfig = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const ElementIconTagById_1 = require("../../../../Core/Define/ConfigQuery/ElementIconTagById");
const EntranceIconTagById_1 = require("../../../../Core/Define/ConfigQuery/EntranceIconTagById");
const ItemIconTagById_1 = require("../../../../Core/Define/ConfigQuery/ItemIconTagById");
const MonsterIconTagById_1 = require("../../../../Core/Define/ConfigQuery/MonsterIconTagById");
const QualityIconTagById_1 = require("../../../../Core/Define/ConfigQuery/QualityIconTagById");
const RoleIconTagById_1 = require("../../../../Core/Define/ConfigQuery/RoleIconTagById");
const ConfigBase_1 = require("../../../../Core/Framework/ConfigBase");
class ComponentConfig extends ConfigBase_1.ConfigBase {
  GetItemConfigParam(e) {
    var o = ItemIconTagById_1.configItemIconTagById.GetConfig(e);
    if (o) {
      return o.ConfigParam;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("LguiUtil", 10, "[ComponentConfig.GetItemConfigParam]查找配置数据失败，数据为空", ["标签", e]);
    }
  }
  GetQualityConfigParam(e) {
    var o = QualityIconTagById_1.configQualityIconTagById.GetConfig(e);
    if (o) {
      return o.ConfigParam;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("LguiUtil", 10, "[ComponentConfig.GetQualityConfigParam]查找配置数据失败，数据为空", ["标签", e]);
    }
  }
  GetRoleConfigParam(e) {
    var o = RoleIconTagById_1.configRoleIconTagById.GetConfig(e);
    if (o) {
      return o.ConfigParam;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("LguiUtil", 10, "[ComponentConfig.GetRoleConfigParam]查找配置数据失败，数据为空", ["标签", e]);
    }
  }
  GetRoleSkinConfigParam(e) {
    var o = RoleIconTagById_1.configRoleIconTagById.GetConfig(e);
    if (o) {
      return o.ConfigParam;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("LguiUtil", 10, "[ComponentConfig.GetRoleConfigParam]查找配置数据失败，数据为空", ["标签", e]);
    }
  }
  GetElementConfigParam(e) {
    var o = ElementIconTagById_1.configElementIconTagById.GetConfig(e);
    if (o) {
      return o.ConfigParam;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("LguiUtil", 10, "[ComponentConfig.GetElementIconTag]查找配置数据失败，数据为空", ["标签", e]);
    }
  }
  GetMonsterConfigParam(e) {
    var o = MonsterIconTagById_1.configMonsterIconTagById.GetConfig(e);
    if (!o || o) {
      return o.ConfigParam;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("LguiUtil", 10, "[ComponentConfig.GetMonsterConfigParam]查找配置数据失败，数据为空", ["标签", e]);
    }
  }
  GetDungeonEntranceConfigParam(e) {
    var o = EntranceIconTagById_1.configEntranceIconTagById.GetConfig(e);
    if (!o || o) {
      return o.ConfigParam;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("LguiUtil", 10, "[ComponentConfig.GetDungeonConfigParam]查找配置数据失败，数据为空", ["标签", e]);
    }
  }
}
exports.ComponentConfig = ComponentConfig;
//# sourceMappingURL=ComponentConfig.js.map