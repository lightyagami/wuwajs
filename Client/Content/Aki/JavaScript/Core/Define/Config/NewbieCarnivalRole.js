"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NewbieCarnivalRole = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class NewbieCarnivalRole {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get RoleId() {
    return this.roleid();
  }
  get DesText() {
    return this.destext();
  }
  get Card() {
    return this.card();
  }
  get MainViewCard() {
    return this.mainviewcard();
  }
  get MainViewSpineItem() {
    return this.mainviewspineitem();
  }
  get RoleViewSpineItem() {
    return this.roleviewspineitem();
  }
  get HeadCard() {
    return this.headcard();
  }
  get TrialRoleId() {
    return this.trialroleid();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsNewbieCarnivalRole(t, i) {
    return (i || new NewbieCarnivalRole()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  roleid() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  destext(t) {
    var i = this.J7.__offset(this.z7, 6);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  card(t) {
    var i = this.J7.__offset(this.z7, 8);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  mainviewcard(t) {
    var i = this.J7.__offset(this.z7, 10);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  mainviewspineitem(t) {
    var i = this.J7.__offset(this.z7, 12);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  roleviewspineitem(t) {
    var i = this.J7.__offset(this.z7, 14);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  headcard(t) {
    var i = this.J7.__offset(this.z7, 16);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  trialroleid() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.NewbieCarnivalRole = NewbieCarnivalRole;
//# sourceMappingURL=NewbieCarnivalRole.js.map