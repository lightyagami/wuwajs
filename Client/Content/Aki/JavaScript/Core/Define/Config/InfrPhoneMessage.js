"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InfrPhoneMessage = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class InfrPhoneMessage {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get RoleTexturePath() {
    return this.roletexturepath();
  }
  get Name() {
    return this.name();
  }
  __init(t, e) {
    this.z7 = t;
    this.J7 = e;
    return this;
  }
  static getRootAsInfrPhoneMessage(t, e) {
    return (e || new InfrPhoneMessage()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  roletexturepath(t) {
    var e = this.J7.__offset(this.z7, 6);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  name(t) {
    var e = this.J7.__offset(this.z7, 8);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
}
exports.InfrPhoneMessage = InfrPhoneMessage;
//# sourceMappingURL=InfrPhoneMessage.js.map