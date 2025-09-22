"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleDevModel = undefined;
const ModelBase_1 = require("../../../../Core/Framework/ModelBase");
class RoleDevModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.ESd = {
      DevPropsList: []
    };
    this.npd = [];
    this.BNd = 0;
  }
  InitRoleDevelopConfigData(e) {
    this.ESd = e;
  }
  UpdateDevTargetRoleId(e) {
    this.BNd = e;
  }
  get DevTargetRoleId() {
    return this.BNd;
  }
  get RoleDevelopConfigData() {
    return this.ESd;
  }
  get DevPropsList() {
    return this.ESd.DevPropsList;
  }
  GetRoleDevPropsConfig(t) {
    return this.DevPropsList.find(e => e.Id === t);
  }
  get IsConfigDataInitialized() {
    return this.DevPropsList.length > 0;
  }
  get HotRoleDataList() {
    return this.npd;
  }
}
exports.RoleDevModel = RoleDevModel;
//# sourceMappingURL=RoleDevModel.js.map