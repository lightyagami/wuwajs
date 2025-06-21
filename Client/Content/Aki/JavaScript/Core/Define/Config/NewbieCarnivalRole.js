"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.NewbieCarnivalRole = void 0;
const GameUtils_1 = require("../../../Game/GameUtils");
class NewbieCarnivalRole {
  constructor() {
    this.J7 = null, this.z7 = 0
  }
  get RoleId() {
    return this.roleid()
  }
  get DesText() {
    return this.destext()
  }
  get Card() {
    return this.card()
  }
  get MainViewCard() {
    return this.mainviewcard()
  }
  get MainViewSpineItem() {
    return this.mainviewspineitem()
  }
  get RoleViewSpineItem() {
    return this.roleviewspineitem()
  }
  get HeadCard() {
    return this.headcard()
  }
  get TrialRoleId() {
    return this.trialroleid()
  }
  __init(t, i) {
    return this.z7 = t, this.J7 = i, this
  }
  static getRootAsNewbieCarnivalRole(t, i) {
    return (i || new NewbieCarnivalRole).__init(t.readInt32(t.position()) + t.position(), t)
  }
  roleid() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  destext(t) {
    var i = this.J7.__offset(this.z7, 6),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return "string" == typeof i && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(i), i
  }
  card(t) {
    var i = this.J7.__offset(this.z7, 8),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return "string" == typeof i && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(i), i
  }
  mainviewcard(t) {
    var i = this.J7.__offset(this.z7, 10),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return "string" == typeof i && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(i), i
  }
  mainviewspineitem(t) {
    var i = this.J7.__offset(this.z7, 12),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return "string" == typeof i && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(i), i
  }
  roleviewspineitem(t) {
    var i = this.J7.__offset(this.z7, 14),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return "string" == typeof i && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(i), i
  }
  headcard(t) {
    var i = this.J7.__offset(this.z7, 16),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return "string" == typeof i && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(i), i
  }
  trialroleid() {
    var t = this.J7.__offset(this.z7, 18);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
}
exports.NewbieCarnivalRole = NewbieCarnivalRole;
//# sourceMappingURL=NewbieCarnivalRole.js.map