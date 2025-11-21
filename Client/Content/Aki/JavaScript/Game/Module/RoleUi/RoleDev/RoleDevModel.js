"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleDevModel = undefined;
const ModelBase_1 = require("../../../../Core/Framework/ModelBase");
class RoleDevModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.HEd = {
      DevPropsList: []
    };
    this.byd = [];
    this.G7d = 0;
  }
  InitRoleDevelopConfigData(e) {
    this.HEd = e;
  }
  UpdateDevTargetRoleId(e) {
    this.G7d = e;
  }
  get DevTargetRoleId() {
    return this.G7d;
  }
  get RoleDevelopConfigData() {
    return this.HEd;
  }
  get DevPropsList() {
    return this.HEd.DevPropsList;
  }
  GetRoleDevPropsConfig(t) {
    return this.DevPropsList.find(e => e.Id === t);
  }
  get IsConfigDataInitialized() {
    return this.DevPropsList.length > 0;
  }
  get HotRoleDataList() {
    return this.byd;
  }
}
exports.RoleDevModel = RoleDevModel;
//# sourceMappingURL=RoleDevModel.js.map