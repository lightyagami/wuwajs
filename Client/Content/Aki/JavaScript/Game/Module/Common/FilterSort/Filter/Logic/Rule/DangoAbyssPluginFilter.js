"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DangoAbyssPluginFilter = undefined;
const CommonFilter_1 = require("./CommonFilter");
class DangoAbyssPluginFilter extends CommonFilter_1.CommonFilter {
  constructor() {
    super(...arguments);
    this.GetDangoAbyssPluginQuality = t => {
      return t.GetQuality();
    };
    this.GetDangoAbyssPluginProp = t => {
      var s = [];
      for (const r of t.GetProp()) {
        s.push(r.Id);
      }
      return s;
    };
    this.GetDangoAbyssPluginTag = t => {
      var s = [];
      for (const r of t.GetConfig().AddTag.keys()) {
        s.push(r);
      }
      return s;
    };
    this.GetDangoAbyssPluginEquipState = t => {
      if (t.GetRoleId() > 0) {
        return 1;
      } else {
        return -1;
      }
    };
    this.GetDangoAbyssPluginLockState = t => {
      if (t.GetIsLock()) {
        return 1;
      } else {
        return -1;
      }
    };
    this.GetDangoAbyssPluginDeprecateState = t => {
      if (t.GetIsDeprecated()) {
        return 1;
      } else {
        return -1;
      }
    };
  }
  OnInitFilterMap() {
    this.FilterMap.set(35, this.GetDangoAbyssPluginQuality);
    this.FilterMap.set(36, this.GetDangoAbyssPluginProp);
    this.FilterMap.set(37, this.GetDangoAbyssPluginTag);
    this.FilterMap.set(38, this.GetDangoAbyssPluginEquipState);
    this.FilterMap.set(39, this.GetDangoAbyssPluginLockState);
    this.FilterMap.set(40, this.GetDangoAbyssPluginDeprecateState);
  }
}
exports.DangoAbyssPluginFilter = DangoAbyssPluginFilter;
//# sourceMappingURL=DangoAbyssPluginFilter.js.map