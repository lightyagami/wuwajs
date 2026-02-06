"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleDevModel = undefined;
const ModelBase_1 = require("../../../../Core/Framework/ModelBase");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
class RoleDevModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.byd = [];
    this.G7d = 0;
    this.yTg = "";
  }
  get Version() {
    return this.yTg;
  }
  set Version(e) {
    this.yTg = e;
  }
  UpdateRoleDevConfig(e) {
    var t = e.omd;
    if (t && t.length > 0) {
      ConfigManager_1.ConfigManager.RoleDevConfig.UpdateDevProsListConfig(t);
    }
    if (e.RFd) {
      this.UpdateDevTargetRoleId(e.RFd);
    }
    var t = e.TIg;
    if (t && t.length > 0) {
      ConfigManager_1.ConfigManager.RoleDevConfig.UpdateDevPropsProjectConfig(t);
    }
    if (e.K7n) {
      this.yTg = e.K7n;
    }
  }
  UpdateDevTargetRoleId(e) {
    this.G7d = e;
  }
  get DevTargetRoleId() {
    return this.G7d;
  }
  GetRoleDevPropsConfig(t) {
    return ConfigManager_1.ConfigManager.RoleDevConfig.GetAllRoleDevProsListConfig().find(e => e.Id === t);
  }
  get IsConfigDataInitialized() {
    return ConfigManager_1.ConfigManager.RoleDevConfig.GetAllRoleDevProsListConfig().length > 0;
  }
  get HotRoleDataList() {
    return this.byd;
  }
}
exports.RoleDevModel = RoleDevModel;
//# sourceMappingURL=RoleDevModel.js.map