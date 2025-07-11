"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleMorphAudioRules = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class RoleMorphAudioRules {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get MorphId() {
    return this.morphid();
  }
  get EnterMorphSwitch() {
    return this.entermorphswitch();
  }
  get ExitMorphEvent() {
    return this.exitmorphevent();
  }
  get IgnoredTypeList() {
    return GameUtils_1.GameUtils.ConvertToArray(this.ignoredtypelistLength(), this.ignoredtypelist, this);
  }
  get IgnoredEventList() {
    return GameUtils_1.GameUtils.ConvertToArray(this.ignoredeventlistLength(), this.ignoredeventlist, this);
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsRoleMorphAudioRules(t, i) {
    return (i || new RoleMorphAudioRules()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  morphid() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  entermorphswitch(t) {
    var i = this.J7.__offset(this.z7, 6);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  exitmorphevent(t) {
    var i = this.J7.__offset(this.z7, 8);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  GetIgnoredtypelistAt(t) {
    return this.ignoredtypelist(t);
  }
  ignoredtypelist(t) {
    var i = this.J7.__offset(this.z7, 10);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  ignoredtypelistLength() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  ignoredtypelistArray() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetIgnoredeventlistAt(t) {
    return this.ignoredeventlist(t);
  }
  ignoredeventlist(t, i) {
    var s = this.J7.__offset(this.z7, 12);
    var s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + t * 4, i) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  ignoredeventlistLength() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.RoleMorphAudioRules = RoleMorphAudioRules;
//# sourceMappingURL=RoleMorphAudioRules.js.map