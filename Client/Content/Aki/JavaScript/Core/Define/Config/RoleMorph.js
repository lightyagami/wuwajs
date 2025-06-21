"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.RoleMorph = void 0;
const GameUtils_1 = require("../../../Game/GameUtils");
class RoleMorph {
  constructor() {
    this.J7 = null, this.z7 = 0
  }
  get Id() {
    return this.id()
  }
  get RoleId() {
    return this.roleid()
  }
  get Morph() {
    return this.morph()
  }
  get SkinId() {
    return this.skinid()
  }
  get MeshId() {
    return this.meshid()
  }
  get UiMeshId() {
    return this.uimeshid()
  }
  get UiScenePerformanceABP() {
    return this.uisceneperformanceabp()
  }
  get RoleBody() {
    return this.rolebody()
  }
  __init(t, s) {
    return this.z7 = t, this.J7 = s, this
  }
  static getRootAsRoleMorph(t, s) {
    return (s || new RoleMorph).__init(t.readInt32(t.position()) + t.position(), t)
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  roleid() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  morph() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  skinid() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  meshid() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  uimeshid() {
    var t = this.J7.__offset(this.z7, 14);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  uisceneperformanceabp(t) {
    var s = this.J7.__offset(this.z7, 16),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return "string" == typeof s && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(s), s
  }
  rolebody(t) {
    var s = this.J7.__offset(this.z7, 18),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return "string" == typeof s && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(s), s
  }
}
exports.RoleMorph = RoleMorph;
//# sourceMappingURL=RoleMorph.js.map