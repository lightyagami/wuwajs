"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.NewbieCarnivalTaskType = void 0;
const GameUtils_1 = require("../../../Game/GameUtils");
class NewbieCarnivalTaskType {
  constructor() {
    this.J7 = null, this.z7 = 0
  }
  get Id() {
    return this.id()
  }
  get IconTexture() {
    return this.icontexture()
  }
  get LeftTexture() {
    return this.lefttexture()
  }
  get Title() {
    return this.title()
  }
  __init(t, e) {
    return this.z7 = t, this.J7 = e, this
  }
  static getRootAsNewbieCarnivalTaskType(t, e) {
    return (e || new NewbieCarnivalTaskType).__init(t.readInt32(t.position()) + t.position(), t)
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  icontexture(t) {
    var e = this.J7.__offset(this.z7, 6),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return "string" == typeof e && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(e), e
  }
  lefttexture(t) {
    var e = this.J7.__offset(this.z7, 8),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return "string" == typeof e && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(e), e
  }
  title(t) {
    var e = this.J7.__offset(this.z7, 10),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return "string" == typeof e && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(e), e
  }
}
exports.NewbieCarnivalTaskType = NewbieCarnivalTaskType;
//# sourceMappingURL=NewbieCarnivalTaskType.js.map