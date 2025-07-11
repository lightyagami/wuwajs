"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShopUtils = undefined;
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const TimeOfDayDefine_1 = require("../TimeOfDay/TimeOfDayDefine");
const EXP_ID = 1;
const GOLD_ID = 2;
const DIAMOND_ID = 3;
class ShopUtils {
  static GetResource(e) {
    if (e === EXP_ID) {
      return ModelManager_1.ModelManager.PlayerInfoModel.GetNumberPropById(1) || 0;
    } else if (e === GOLD_ID) {
      return ModelManager_1.ModelManager.PlayerInfoModel.GetNumberPropById(2) || 0;
    } else if (e === DIAMOND_ID) {
      return ModelManager_1.ModelManager.PlayerInfoModel.GetNumberPropById(3) || 0;
    } else {
      return ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(e);
    }
  }
  static FormatTime(e) {
    var i = Math.trunc(e / TimeOfDayDefine_1.TOD_SECOND_PER_DAY);
    var a = Math.trunc(e % TimeOfDayDefine_1.TOD_SECOND_PER_DAY / TimeOfDayDefine_1.TOD_SECOND_PER_HOUR);
    var r = Math.trunc(e % TimeOfDayDefine_1.TOD_SECOND_PER_HOUR / TimeOfDayDefine_1.TOD_SECOND_PER_MINUTE);
    var e = Math.trunc(e) % TimeOfDayDefine_1.TOD_SECOND_PER_MINUTE;
    if (i > 0) {
      return StringUtils_1.StringUtils.Format(ConfigManager_1.ConfigManager.TextConfig.GetTextById("ShopTimeStr1"), i.toString(), a.toString());
    } else if (a > 0) {
      return StringUtils_1.StringUtils.Format(ConfigManager_1.ConfigManager.TextConfig.GetTextById("ShopTimeStr2"), a.toString(), r.toString());
    } else if (r > 0) {
      return StringUtils_1.StringUtils.Format(ConfigManager_1.ConfigManager.TextConfig.GetTextById("ShopTimeStr3"), r.toString());
    } else {
      return StringUtils_1.StringUtils.Format(ConfigManager_1.ConfigManager.TextConfig.GetTextById("ShopTimeStr4"), e.toString());
    }
  }
}
exports.ShopUtils = ShopUtils;
//# sourceMappingURL=ShopUtils.js.map