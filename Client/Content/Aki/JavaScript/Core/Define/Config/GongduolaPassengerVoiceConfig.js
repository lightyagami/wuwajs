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
  get VehicleType() {
    return this.vehicletype();
  }
  get TriggerType() {
    return this.triggertype();
  }
  get Priority() {
    return this.priority();
  }
  get TriggerWeatherIds() {
    return GameUtils_1.GameUtils.ConvertToArray(this.triggerweatheridsLength(), this.triggerweatherids, this);
  }
  get TriggerTimePeriod() {
    return GameUtils_1.GameUtils.ConvertToArray(this.triggertimeperiodLength(), this.triggertimeperiod, this);
  }
  get ConditionParam() {
    return GameUtils_1.GameUtils.ConvertToArray(this.conditionparamLength(), this.conditionparam, this);
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
  vehicletype(t) {
    var i = this.J7.__offset(this.z7, 8);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  triggertype() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  priority() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetTriggerweatheridsAt(t) {
    return this.triggerweatherids(t);
  }
  triggerweatherids(t) {
    var i = this.J7.__offset(this.z7, 14);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  triggerweatheridsLength() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  triggerweatheridsArray() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetTriggertimeperiodAt(t) {
    return this.triggertimeperiod(t);
  }
  triggertimeperiod(t, i) {
    var s = this.J7.__offset(this.z7, 16);
    var s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + t * 4, i) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  triggertimeperiodLength() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetConditionparamAt(t) {
    return this.conditionparam(t);
  }
  conditionparam(t) {
    var i = this.J7.__offset(this.z7, 18);
    if (i) {
      return this.J7.readFloat32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  conditionparamLength() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  conditionparamArray() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return new Float32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetPlotflowAt(t) {
    return this.plotflow(t);
  }
  plotflow(t, i) {
    var s = this.J7.__offset(this.z7, 20);
    var s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + t * 4, i) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  plotflowLength() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  voice(t) {
    var i = this.J7.__offset(this.z7, 22);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
}
exports.GongduolaPassengerVoiceConfig = GongduolaPassengerVoiceConfig;
//# sourceMappingURL=GongduolaPassengerVoiceConfig.js.map