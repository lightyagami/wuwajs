"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditFormationRoleFilter = exports.RoleFilter = undefined;
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const CommonFilter_1 = require("./CommonFilter");
class RoleFilter extends CommonFilter_1.CommonFilter {
  constructor() {
    super(...arguments);
    this.GetElementConfigId = e => {
      return e.GetElementInfo().Id;
    };
    this.GetWeaponType = e => {
      return e.GetRoleConfig().WeaponType;
    };
    this.GetRoleTagIdList = e => {
      return ModelManager_1.ModelManager.RoleModel.GetRoleTagByRoleInfo(e.GetRoleConfig());
    };
  }
  OnInitFilterMap() {
    this.FilterMap.set(1, this.GetElementConfigId);
    this.FilterMap.set(2, this.GetWeaponType);
    this.FilterMap.set(27, this.GetRoleTagIdList);
  }
}
class EditFormationRoleFilter extends (exports.RoleFilter = RoleFilter) {
  constructor() {
    super(...arguments);
    this.K8_ = e => {
      e = e.GetDataId();
      return ModelManager_1.ModelManager.RoleSelectModel.GetRoleIndex(e) > 0;
    };
  }
  DefaultFilterList() {
    return [this.K8_];
  }
}
exports.EditFormationRoleFilter = EditFormationRoleFilter;
//# sourceMappingURL=RoleFilter.js.map