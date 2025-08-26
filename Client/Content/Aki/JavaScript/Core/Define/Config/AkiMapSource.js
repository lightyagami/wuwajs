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
  get IgnoreWorldOrigin() {
    return this.ignoreworldorigin();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsAkiMapSource(t, i) {
    return (i || new AkiMapSource()).__init(t.readInt32(t.position()) + t.position(), t);
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
    var i = this.J7.__offset(this.z7, 8);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  loadmapmode() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  ignoreworldorigin() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.AkiMapSource = AkiMapSource;
//# sourceMappingURL=AkiMapSource.js.map