"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GongduolaPassengerVoiceConfig = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class GongduolaPassengerVoiceConfig {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get RoleId() {
    return this.roleid();
  }
  get TriggerType() {
    return this.triggertype();
  }
  get Priority() {
    return this.priority();
  }
  get PlotFlow() {
    return GameUtils_1.GameUtils.ConvertToArray(this.plotflowLength(), this.plotflow, this);
  }
  get Voice() {
    return this.voice();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsGongduolaPassengerVoiceConfig(t, i) {
    return (i || new GongduolaPassengerVoiceConfig()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  roleid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  triggertype() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  priority() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetPlotflowAt(t) {
    return this.plotflow(t);
  }
  plotflow(t, i) {
    var s = this.J7.__offset(this.z7, 12);
    var s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + t * 4, i) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  plotflowLength() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  voice(t) {
    var i = this.J7.__offset(this.z7, 14);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
}
exports.GongduolaPassengerVoiceConfig = GongduolaPassengerVoiceConfig;
//# sourceMappingURL=GongduolaPassengerVoiceConfig.js.map