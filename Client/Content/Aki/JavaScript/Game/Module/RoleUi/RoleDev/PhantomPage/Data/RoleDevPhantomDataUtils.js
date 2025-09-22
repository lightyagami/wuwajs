"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleDevPhantomDataUtils = undefined;
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const RoleDevPhantomSuitItemData_1 = require("./RoleDevPhantomSuitItemData");
class RoleDevPhantomDataUtils {
  static RefreshSuitDataListByRecommendInfo(e, t) {
    var a;
    var o;
    var n;
    var r = [];
    if (t && t.length !== 0 && (t.sort((e, t) => t.GetUsage() - e.GetUsage()), o = (t = t[0]).GetRecommendFetterGroupId(), a = t.GetFetterType(), ConfigManager_1.ConfigManager.RoleDevConfig?.GetPhantomJumpGroupConfig(o)) && ((n = new RoleDevPhantomSuitItemData_1.RoleDevPhantomSuitItemData()).Init(o, e, Math.round(t.GetUsage())), r.push(n), a === 1) && (o = t.GetSpecialFetterSubGroupId()) > 0 && ConfigManager_1.ConfigManager.RoleDevConfig?.GetPhantomJumpGroupConfig(o)) {
      (n = new RoleDevPhantomSuitItemData_1.RoleDevPhantomSuitItemData()).Init(o, e, Math.round(t.GetUsage()));
      r.push(n);
    }
    return r;
  }
  static RefreshSuitDataListByFetterGroupId(e, t) {
    var a;
    var o = [];
    if (ConfigManager_1.ConfigManager.RoleDevConfig?.GetPhantomJumpGroupConfig(t)) {
      (a = new RoleDevPhantomSuitItemData_1.RoleDevPhantomSuitItemData()).Init(t, e, 0);
      o.push(a);
    }
    return o;
  }
}
exports.RoleDevPhantomDataUtils = RoleDevPhantomDataUtils;
//# sourceMappingURL=RoleDevPhantomDataUtils.js.map