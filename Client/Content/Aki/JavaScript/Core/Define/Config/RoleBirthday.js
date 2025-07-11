"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleBirthday = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class RoleBirthday {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get RoleId() {
    return this.roleid();
  }
  get Priority() {
    return this.priority();
  }
  get Name() {
    return this.name();
  }
  get CardTextKey() {
    return this.cardtextkey();
  }
  get VoiceEvent() {
    return this.voiceevent();
  }
  get SceneCameraId() {
    return this.scenecameraid();
  }
  get CardCameraId() {
    return this.cardcameraid();
  }
  __init(t, e) {
    this.z7 = t;
    this.J7 = e;
    return this;
  }
  static getRootAsRoleBirthday(t, e) {
    return (e || new RoleBirthday()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  roleid() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  priority() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  name(t) {
    var e = this.J7.__offset(this.z7, 8);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  cardtextkey(t) {
    var e = this.J7.__offset(this.z7, 10);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  voiceevent(t) {
    var e = this.J7.__offset(this.z7, 12);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  scenecameraid(t) {
    var e = this.J7.__offset(this.z7, 14);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  cardcameraid(t) {
    var e = this.J7.__offset(this.z7, 16);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
}
exports.RoleBirthday = RoleBirthday;
//# sourceMappingURL=RoleBirthday.js.map