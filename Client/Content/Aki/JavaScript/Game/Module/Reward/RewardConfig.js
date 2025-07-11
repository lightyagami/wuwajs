"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RewardConfig = undefined;
const Log_1 = require("../../../Core/Common/Log");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const DropPackageById_1 = require("../../../Core/Define/ConfigQuery/DropPackageById");
const DropShowPlanById_1 = require("../../../Core/Define/ConfigQuery/DropShowPlanById");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class RewardConfig extends ConfigBase_1.ConfigBase {
  constructor() {
    super(...arguments);
    this.nao = undefined;
    this.sao = undefined;
    this.aao = undefined;
    this.hao = undefined;
    this.lao = undefined;
    this._ao = undefined;
    this.uao = undefined;
    this.cao = undefined;
    this.mao = undefined;
    this.dao = undefined;
    this.Cao = undefined;
    this.gao = undefined;
  }
  GetDropPackage(t) {
    return DropPackageById_1.configDropPackageById.GetConfig(t);
  }
  GetDropPackagePreview(t) {
    t = DropPackageById_1.configDropPackageById.GetConfig(t);
    if (t) {
      return t.DropPreview;
    }
  }
  GetDropPackagePreviewItemList(t) {
    var o;
    var e;
    var i = [];
    for ([o, e] of DropPackageById_1.configDropPackageById.GetConfig(t).DropPreview) {
      i.push([{
        ItemId: o,
        IncId: 0
      }, e]);
    }
    return i;
  }
  GetDropShowPlan(t) {
    return DropShowPlanById_1.configDropShowPlanById.GetConfig(t);
  }
  GetSpeed() {
    this.nao ||= CommonParamById_1.configCommonParamById.GetIntConfig("adsorption_speed");
    return this.nao;
  }
  GetMaxAdsorption() {
    this.sao ||= CommonParamById_1.configCommonParamById.GetIntConfig("adsorption_time");
    return this.sao;
  }
  GetHeightProtect() {
    this.aao ||= CommonParamById_1.configCommonParamById.GetIntConfig("drop_height_protect");
    return this.aao;
  }
  GetRestitution() {
    this.hao ||= CommonParamById_1.configCommonParamById.GetFloatConfig("drop_bounce_coefficient");
    return this.hao;
  }
  GetFriction() {
    this.lao ||= CommonParamById_1.configCommonParamById.GetFloatConfig("drop_friction");
    return this.lao;
  }
  GetDropItemPickUpRange() {
    this._ao ||= CommonParamById_1.configCommonParamById.GetIntConfig("drop_item_pickup_range");
    return this._ao;
  }
  GetPickUpInBagRange() {
    this.uao ||= CommonParamById_1.configCommonParamById.GetIntConfig("drop_pickup_in_bag_range");
    return this.uao;
  }
  GetDropItemAcceleration() {
    this.cao ||= CommonParamById_1.configCommonParamById.GetIntConfig("adsorption_acceleration");
    return this.cao;
  }
  GetFallToGroundSpeed() {
    this.mao ||= CommonParamById_1.configCommonParamById.GetIntConfig("drop_fall_ground_speed");
    return this.mao;
  }
  GetDropChestOffsetZ() {
    this.dao ||= CommonParamById_1.configCommonParamById.GetIntConfig("drop_chest_zaxis_offset");
    return this.dao;
  }
  GetDropBornRadius() {
    this.Cao ||= CommonParamById_1.configCommonParamById.GetIntConfig("drop_born_radius");
    return this.Cao;
  }
  GetDropRotationProtectTime() {
    this.gao ||= CommonParamById_1.configCommonParamById.GetIntConfig("drop_lock_rotation_time");
    return this.gao;
  }
  GetMergedDropPackagePreviewItemList(t) {
    var o = [];
    if (t) {
      for (const r of t) {
        var e = this.GetDropPackage(r)?.DropPreview;
        if (e) {
          for (const a of e) {
            var i = [{
              IncId: 0,
              ItemId: a[0]
            }, a[1]];
            o.push(i);
          }
        }
      }
    }
    return o;
  }
  GetLowModeCount() {
    var t = CommonParamById_1.configCommonParamById.GetIntConfig("into_bag_list_low_count");
    if (t === undefined && Log_1.Log.CheckError()) {
      Log_1.Log.Error("Reward", 8, "慢速模式最大数量无法找到, 请检测c.参数字段\"into_bag_list_low_count\"");
    }
    if (t >= 0) {
      return t;
    } else {
      return 1;
    }
  }
  GetFastModeCount() {
    var t = CommonParamById_1.configCommonParamById.GetIntConfig("into_bag_list_fast_count");
    if (t === undefined && Log_1.Log.CheckError()) {
      Log_1.Log.Error("Reward", 8, "快速模式最大数量无法找到, 请检测c.参数字段\"into_bag_list_fast_count\"");
    }
    if (t >= 0) {
      return t;
    } else {
      return 1;
    }
  }
  GetLowModeNextAddItemTime() {
    var t = CommonParamById_1.configCommonParamById.GetIntConfig("into_bag_next_item_low_time");
    if (t === undefined && Log_1.Log.CheckError()) {
      Log_1.Log.Error("Reward", 8, "慢速模式下一个物品进包时间无法找到, 请检测c.参数字段\"into_bag_next_item_low_time\"");
    }
    if (t >= 0) {
      return t;
    } else {
      return 1;
    }
  }
  GetFastModeNextAddItemTime() {
    var t = CommonParamById_1.configCommonParamById.GetIntConfig("into_bag_next_item_fast_time");
    if (t === undefined && Log_1.Log.CheckError()) {
      Log_1.Log.Error("Reward", 8, "快速模式下一个物品进包时间无法找到, 请检测c.参数字段\"into_bag_next_item_fast_time\"");
    }
    if (t >= 0) {
      return t;
    } else {
      return 1;
    }
  }
  GetIntoBagMaxCount() {
    var t = CommonParamById_1.configCommonParamById.GetIntConfig("item_list_max_size");
    if (t === undefined && Log_1.Log.CheckError()) {
      Log_1.Log.Error("Reward", 8, "外入包列表最大数量无法找到, 请检测c.参数字段\"item_list_max_size\"");
    }
    if (t >= 0) {
      return t;
    } else {
      return 1;
    }
  }
  GetShowTime() {
    var t = CommonParamById_1.configCommonParamById.GetIntConfig("into_bag_show_time");
    if (t === undefined && Log_1.Log.CheckError()) {
      Log_1.Log.Error("Reward", 8, "入包每个物品的显示时间无法找到, 请检测c.参数字段\"into_bag_show_time\"");
    }
    if (t >= 0) {
      return t;
    } else {
      return 3000;
    }
  }
  GetNextItemTime() {
    var t = CommonParamById_1.configCommonParamById.GetIntConfig("into_bag_next_item_time");
    if (t === undefined && Log_1.Log.CheckError()) {
      Log_1.Log.Error("Reward", 8, "下一个物品添加进来的时间无法找到, 请检测c.参数字段\"into_bag_next_item_time\"");
    }
    if (t >= 0) {
      return t;
    } else {
      return 300;
    }
  }
  GetSliderTime() {
    var t = CommonParamById_1.configCommonParamById.GetIntConfig("into_bag_slide_time");
    if (t === undefined && Log_1.Log.CheckError()) {
      Log_1.Log.Error("Reward", 8, "上滑时间无法找到, 请检测c.参数字段\"into_bag_slide_time\"");
    }
    if (t >= 0) {
      return t;
    } else {
      return 200;
    }
  }
  OnClear() {
    this.nao = undefined;
    this.sao = undefined;
    this.aao = undefined;
    this.hao = undefined;
    this.lao = undefined;
    this._ao = undefined;
    this.uao = undefined;
    this.cao = undefined;
    this.mao = undefined;
    this.dao = undefined;
    return !(this.Cao = undefined);
  }
}
exports.RewardConfig = RewardConfig;
//# sourceMappingURL=RewardConfig.js.map