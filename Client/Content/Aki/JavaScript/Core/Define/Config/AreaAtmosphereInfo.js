"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AreaAtmosphereInfo = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class AreaAtmosphereInfo {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get DAPath() {
    return this.dapath();
  }
  get IsTOD() {
    return this.istod();
  }
  get Priority() {
    return this.priority();
  }
  get FadeTime() {
    return this.fadetime();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsAreaAtmosphereInfo(t, s) {
    return (s || new AreaAtmosphereInfo()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  dapath(t) {
    var s = this.J7.__offset(this.z7, 6);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  istod() {
    var t = this.J7.__offset(this.z7, 8);
    return !t || !!this.J7.readInt8(this.z7 + t);
  }
  priority() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  fadetime() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 3;
    }
  }
}
exports.AreaAtmosphereInfo = AreaAtmosphereInfo;
//# sourceMappingURL=AreaAtmosphereInfo.js.map