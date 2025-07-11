"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LangOfLogo = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class LangOfLogo {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Name() {
    return this.name();
  }
  get ZhHansLogo() {
    return this.zhhanslogo();
  }
  get EnLogo() {
    return this.enlogo();
  }
  get JpLogo() {
    return this.jplogo();
  }
  get ZhHantLogo() {
    return this.zhhantlogo();
  }
  get KrLogo() {
    return this.krlogo();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsLangOfLogo(t, s) {
    return (s || new LangOfLogo()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  name(t) {
    var s = this.J7.__offset(this.z7, 4);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  zhhanslogo(t) {
    var s = this.J7.__offset(this.z7, 6);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  enlogo(t) {
    var s = this.J7.__offset(this.z7, 8);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  jplogo(t) {
    var s = this.J7.__offset(this.z7, 10);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  zhhantlogo(t) {
    var s = this.J7.__offset(this.z7, 12);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  krlogo(t) {
    var s = this.J7.__offset(this.z7, 14);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
}
exports.LangOfLogo = LangOfLogo;
//# sourceMappingURL=LangOfLogo.js.map