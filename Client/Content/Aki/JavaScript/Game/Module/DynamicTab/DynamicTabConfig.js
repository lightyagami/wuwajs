"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DynamicTabConfig = undefined;
const ConfigCommon_1 = require("../../../Core/Config/ConfigCommon");
const UiDynamicTabByChildViewName_1 = require("../../../Core/Define/ConfigQuery/UiDynamicTabByChildViewName");
const UiDynamicTabById_1 = require("../../../Core/Define/ConfigQuery/UiDynamicTabById");
const UiDynamicTabByParentViewName_1 = require("../../../Core/Define/ConfigQuery/UiDynamicTabByParentViewName");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class DynamicTabConfig extends ConfigBase_1.ConfigBase {
  constructor() {
    super(...arguments);
    this.H3t = (e, i) => e.TabIndex - i.TabIndex;
  }
  GetViewTabList(e) {
    e = ConfigCommon_1.ConfigCommon.ToList(UiDynamicTabByParentViewName_1.configUiDynamicTabByParentViewName.GetConfigList(e));
    e.sort(this.H3t);
    return e;
  }
  GetTabViewNameList(e) {
    var i = [];
    for (const a of this.GetViewTabList(e)) {
      i.push(a.ChildViewName);
    }
    return i;
  }
  GetViewTab(e) {
    return UiDynamicTabByChildViewName_1.configUiDynamicTabByChildViewName.GetConfig(e);
  }
  GetTabViewConfById(e) {
    return UiDynamicTabById_1.configUiDynamicTabById.GetConfig(e);
  }
}
exports.DynamicTabConfig = DynamicTabConfig;
//# sourceMappingURL=DynamicTabConfig.js.map