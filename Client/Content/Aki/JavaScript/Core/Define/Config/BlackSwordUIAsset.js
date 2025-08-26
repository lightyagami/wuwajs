"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BlackSwordUIAsset = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class BlackSwordUIAsset {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get LevelColors() {
    return GameUtils_1.GameUtils.ConvertToArray(this.levelcolorsLength(), this.levelcolors, this);
  }
  get PatternPaths() {
    return GameUtils_1.GameUtils.ConvertToArray(this.patternpathsLength(), this.patternpaths, this);
  }
  get StarPaths() {
    return GameUtils_1.GameUtils.ConvertToArray(this.starpathsLength(), this.starpaths, this);
  }
  get CountDownTextAsset() {
    return GameUtils_1.GameUtils.ConvertToArray(this.countdowntextassetLength(), this.countdowntextasset, this);
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsBlackSwordUIAsset(t, s) {
    return (s || new BlackSwordUIAsset()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetLevelcolorsAt(t) {
    return this.levelcolors(t);
  }
  levelcolors(t, s) {
    var e = this.J7.__offset(this.z7, 6);
    var e = e ? this.J7.__string(this.J7.__vector(this.z7 + e) + t * 4, s) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  levelcolorsLength() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetPatternpathsAt(t) {
    return this.patternpaths(t);
  }
  patternpaths(t, s) {
    var e = this.J7.__offset(this.z7, 8);
    var e = e ? this.J7.__string(this.J7.__vector(this.z7 + e) + t * 4, s) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  patternpathsLength() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetStarpathsAt(t) {
    return this.starpaths(t);
  }
  starpaths(t, s) {
    var e = this.J7.__offset(this.z7, 10);
    var e = e ? this.J7.__string(this.J7.__vector(this.z7 + e) + t * 4, s) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  starpathsLength() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetCountdowntextassetAt(t) {
    return this.countdowntextasset(t);
  }
  countdowntextasset(t, s) {
    var e = this.J7.__offset(this.z7, 12);
    var e = e ? this.J7.__string(this.J7.__vector(this.z7 + e) + t * 4, s) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  countdowntextassetLength() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.BlackSwordUIAsset = BlackSwordUIAsset;
//# sourceMappingURL=BlackSwordUIAsset.js.map