"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GachaEffectConfig = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const Color_1 = require("./SubType/Color");
class GachaEffectConfig {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get Times() {
    return this.times();
  }
  get Quality() {
    return this.quality();
  }
  get FinalShowSequencePath() {
    return this.finalshowsequencepath();
  }
  get DefaultColor() {
    return this.defaultcolor();
  }
  get FinalColor() {
    return this.finalcolor();
  }
  get DefaultProcess() {
    return this.defaultprocess();
  }
  get ChangeColorProcess() {
    return this.changecolorprocess();
  }
  get CompleteChangeColorProcess() {
    return this.completechangecolorprocess();
  }
  get PlaySequenceProcess() {
    return this.playsequenceprocess();
  }
  get SlideCurveAssetPath() {
    return this.slidecurveassetpath();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsGachaEffectConfig(t, s) {
    return (s || new GachaEffectConfig()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  times() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  quality() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  finalshowsequencepath(t) {
    var s = this.J7.__offset(this.z7, 10);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  defaultcolor(t) {
    var s = this.J7.__offset(this.z7, 12);
    if (s) {
      return (t || new Color_1.Color()).__init(this.J7.__indirect(this.z7 + s), this.J7);
    } else {
      return null;
    }
  }
  finalcolor(t) {
    var s = this.J7.__offset(this.z7, 14);
    if (s) {
      return (t || new Color_1.Color()).__init(this.J7.__indirect(this.z7 + s), this.J7);
    } else {
      return null;
    }
  }
  defaultprocess() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 0;
    }
  }
  changecolorprocess() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 0;
    }
  }
  completechangecolorprocess() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 0;
    }
  }
  playsequenceprocess() {
    var t = this.J7.__offset(this.z7, 22);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 0;
    }
  }
  slidecurveassetpath(t) {
    var s = this.J7.__offset(this.z7, 24);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
}
exports.GachaEffectConfig = GachaEffectConfig;
//# sourceMappingURL=GachaEffectConfig.js.map