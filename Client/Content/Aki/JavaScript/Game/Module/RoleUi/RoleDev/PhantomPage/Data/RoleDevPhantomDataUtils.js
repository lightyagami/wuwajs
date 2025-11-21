"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleDevPhantomDataUtils = undefined;
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const RoleDevPhantomSuitItemData_1 = require("./RoleDevPhantomSuitItemData");
class RoleDevPhantomDataUtils {
  static RefreshSuitDataListByRecommendInfo(e, t, a) {
    var o;
    var r;
    var n;
    var i = [];
    if (t && t.length !== 0 && (t = t.find(e => e.GetRecommendFetterGroupId() === a)) && (r = t.GetRecommendFetterGroupId(), o = t.GetFetterType(), ConfigManager_1.ConfigManager.RoleDevConfig?.GetPhantomJumpGroupConfig(r)) && ((n = new RoleDevPhantomSuitItemData_1.RoleDevPhantomSuitItemData()).Init(r, e, t), i.push(n), o === 1) && (r = t.GetSpecialFetterSubGroupId()) > 0 && ConfigManager_1.ConfigManager.RoleDevConfig?.GetPhantomJumpGroupConfig(r)) {
      (n = new RoleDevPhantomSuitItemData_1.RoleDevPhantomSuitItemData()).Init(r, e, t);
      i.push(n);
    }
    return i;
  }
  static SortRecommendInfo(e) {
    e.sort((e, t) => t.GetUsage() - e.GetUsage());
    return e;
  }
  static RefreshSuitDataListByFetterGroupId(e, t) {
    var a;
    var o = [];
    if (ConfigManager_1.ConfigManager.RoleDevConfig?.GetPhantomJumpGroupConfig(t)) {
      (a = new RoleDevPhantomSuitItemData_1.RoleDevPhantomSuitItemData()).Init(t, e, undefined);
      o.push(a);
    }
    return o;
  }
  static GetDefaultRecommendFetterGroupId(e) {
    e = ModelManager_1.ModelManager.VisionRecommendModel.GetRoleFetterRecommendInfo(e);
    if (e) {
      RoleDevPhantomDataUtils.SortRecommendInfo(e);
      return e[0].GetRecommendFetterGroupId();
    } else {
      return 0;
    }
  }
}
exports.RoleDevPhantomDataUtils = RoleDevPhantomDataUtils;
//# sourceMappingURL=RoleDevPhantomDataUtils.js.map