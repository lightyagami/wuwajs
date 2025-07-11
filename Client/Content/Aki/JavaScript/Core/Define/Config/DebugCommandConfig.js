"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DebugCommandConfig = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class DebugCommandConfig {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get GetTargetStage() {
    return this.gettargetstage();
  }
  get ParamGetTarget() {
    return GameUtils_1.GameUtils.ConvertToArray(this.paramgettargetLength(), this.paramgettarget, this);
  }
  get EffectStage() {
    return this.effectstage();
  }
  get ParamEffect() {
    return GameUtils_1.GameUtils.ConvertToArray(this.parameffectLength(), this.parameffect, this);
  }
  __init(t, e) {
    this.z7 = t;
    this.J7 = e;
    return this;
  }
  static getRootAsDebugCommandConfig(t, e) {
    return (e || new DebugCommandConfig()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  gettargetstage() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetParamgettargetAt(t) {
    return this.paramgettarget(t);
  }
  paramgettarget(t, e) {
    var s = this.J7.__offset(this.z7, 8);
    var s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + t * 4, e) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  paramgettargetLength() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  effectstage() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetParameffectAt(t) {
    return this.parameffect(t);
  }
  parameffect(t, e) {
    var s = this.J7.__offset(this.z7, 12);
    var s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + t * 4, e) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  parameffectLength() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.DebugCommandConfig = DebugCommandConfig;
//# sourceMappingURL=DebugCommandConfig.js.map