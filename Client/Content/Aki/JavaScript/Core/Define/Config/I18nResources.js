"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.I18nResources = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class I18nResources {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get PlotAudioRef() {
    return this.plotaudioref();
  }
  get TextureRef() {
    return this.textureref();
  }
  __init(t, e) {
    this.z7 = t;
    this.J7 = e;
    return this;
  }
  static getRootAsI18nResources(t, e) {
    return (e || new I18nResources()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id(t) {
    var e = this.J7.__offset(this.z7, 4);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  plotaudioref(t) {
    var e = this.J7.__offset(this.z7, 6);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  textureref(t) {
    var e = this.J7.__offset(this.z7, 8);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
}
exports.I18nResources = I18nResources;
//# sourceMappingURL=I18nResources.js.map