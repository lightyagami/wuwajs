"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AkiMapSource = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class AkiMapSource {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get MapId() {
    return this.mapid();
  }
  get PakRule() {
    return this.pakrule();
  }
  get MapPath() {
    return this.mappath();
  }
  get LoadMapMode() {
    return this.loadmapmode();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsAkiMapSource(t, s) {
    return (s || new AkiMapSource()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  mapid() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  pakrule() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  mappath(t) {
    var s = this.J7.__offset(this.z7, 8);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  loadmapmode() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.AkiMapSource = AkiMapSource;
//# sourceMappingURL=AkiMapSource.js.map