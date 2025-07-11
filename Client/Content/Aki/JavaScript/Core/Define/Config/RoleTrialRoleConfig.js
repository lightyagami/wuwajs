"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleTrialRoleConfig = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class RoleTrialRoleConfig {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get RoleId() {
    return this.roleid();
  }
  get RoleStand() {
    return this.rolestand();
  }
  get RoleStand2() {
    return this.rolestand2();
  }
  get RoleIcon() {
    return this.roleicon();
  }
  get UiConfigId() {
    return this.uiconfigid();
  }
  get Introduction() {
    return this.introduction();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsRoleTrialRoleConfig(t, i) {
    return (i || new RoleTrialRoleConfig()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  roleid() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  rolestand(t) {
    var i = this.J7.__offset(this.z7, 6);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  rolestand2(t) {
    var i = this.J7.__offset(this.z7, 8);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  roleicon(t) {
    var i = this.J7.__offset(this.z7, 10);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  uiconfigid() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  introduction(t) {
    var i = this.J7.__offset(this.z7, 14);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
}
exports.RoleTrialRoleConfig = RoleTrialRoleConfig;
//# sourceMappingURL=RoleTrialRoleConfig.js.map