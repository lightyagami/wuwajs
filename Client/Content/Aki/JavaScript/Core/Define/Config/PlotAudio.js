"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlotAudio = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class PlotAudio {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get ExternalSourceSetting() {
    return this.externalsourcesetting();
  }
  get FileName() {
    return this.filename();
  }
  get GlobalLanguage() {
    return this.globallanguage();
  }
  get CheckGenderEn() {
    return this.checkgenderen();
  }
  get CheckGenderJa() {
    return this.checkgenderja();
  }
  get CheckGenderKo() {
    return this.checkgenderko();
  }
  get CheckGenderZh() {
    return this.checkgenderzh();
  }
  get TailTime() {
    return this.tailtime();
  }
  get VarParams() {
    return this.varparams();
  }
  __init(t, e) {
    this.z7 = t;
    this.J7 = e;
    return this;
  }
  static getRootAsPlotAudio(t, e) {
    return (e || new PlotAudio()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id(t) {
    var e = this.J7.__offset(this.z7, 4);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  externalsourcesetting(t) {
    var e = this.J7.__offset(this.z7, 6);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  filename(t) {
    var e = this.J7.__offset(this.z7, 8);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  globallanguage() {
    var t = this.J7.__offset(this.z7, 10);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  checkgenderen() {
    var t = this.J7.__offset(this.z7, 12);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  checkgenderja() {
    var t = this.J7.__offset(this.z7, 14);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  checkgenderko() {
    var t = this.J7.__offset(this.z7, 16);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  checkgenderzh() {
    var t = this.J7.__offset(this.z7, 18);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  tailtime() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return -1;
    }
  }
  varparams(t) {
    var e = this.J7.__offset(this.z7, 22);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
}
exports.PlotAudio = PlotAudio;
//# sourceMappingURL=PlotAudio.js.map