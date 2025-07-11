"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpenAndCloseViewHotKey = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class OpenAndCloseViewHotKey {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get ActionName() {
    return this.actionname();
  }
  get InputControllerType() {
    return this.inputcontrollertype();
  }
  get ViewName() {
    return this.viewname();
  }
  get HandleType() {
    return this.handletype();
  }
  get IsPressTrigger() {
    return this.ispresstrigger();
  }
  get PressStartTime() {
    return this.pressstarttime();
  }
  get PressTriggerTime() {
    return this.presstriggertime();
  }
  get IsReleaseTrigger() {
    return this.isreleasetrigger();
  }
  get ReleaseInvalidTime() {
    return this.releaseinvalidtime();
  }
  get IsPressClose() {
    return this.ispressclose();
  }
  get IsReleaseClose() {
    return this.isreleaseclose();
  }
  get ViewParam() {
    return GameUtils_1.GameUtils.ConvertToArray(this.viewparamLength(), this.viewparam, this);
  }
  __init(t, e) {
    this.z7 = t;
    this.J7 = e;
    return this;
  }
  static getRootAsOpenAndCloseViewHotKey(t, e) {
    return (e || new OpenAndCloseViewHotKey()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  actionname(t) {
    var e = this.J7.__offset(this.z7, 6);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  inputcontrollertype() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  viewname(t) {
    var e = this.J7.__offset(this.z7, 10);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  handletype(t) {
    var e = this.J7.__offset(this.z7, 12);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  ispresstrigger() {
    var t = this.J7.__offset(this.z7, 14);
    return !t || !!this.J7.readInt8(this.z7 + t);
  }
  pressstarttime() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  presstriggertime() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  isreleasetrigger() {
    var t = this.J7.__offset(this.z7, 20);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  releaseinvalidtime() {
    var t = this.J7.__offset(this.z7, 22);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  ispressclose() {
    var t = this.J7.__offset(this.z7, 24);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  isreleaseclose() {
    var t = this.J7.__offset(this.z7, 26);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  GetViewparamAt(t) {
    return this.viewparam(t);
  }
  viewparam(t, e) {
    var s = this.J7.__offset(this.z7, 28);
    var s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + t * 4, e) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  viewparamLength() {
    var t = this.J7.__offset(this.z7, 28);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.OpenAndCloseViewHotKey = OpenAndCloseViewHotKey;
//# sourceMappingURL=OpenAndCloseViewHotKey.js.map