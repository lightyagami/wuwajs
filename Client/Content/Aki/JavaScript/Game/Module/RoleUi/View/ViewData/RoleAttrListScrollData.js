"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleAttrListScrollData = undefined;
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const AttrListScrollData_1 = require("./AttrListScrollData");
class RoleAttrListScrollData extends AttrListScrollData_1.AttrListScrollData {
  rTo() {
    return ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(this.Id);
  }
  GetName() {
    return this.rTo().Name;
  }
  GetIcon() {
    return this.rTo().Icon;
  }
  GetDesc() {
    return this.rTo().Dec;
  }
}
exports.RoleAttrListScrollData = RoleAttrListScrollData;
//# sourceMappingURL=RoleAttrListScrollData.js.map