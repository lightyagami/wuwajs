"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AlertAreaConfig = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class AlertAreaConfig {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get Description() {
    return this.description();
  }
  get CreatorId() {
    return this.creatorid();
  }
  get MinValue() {
    return this.minvalue();
  }
  get MaxValue() {
    return this.maxvalue();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsAlertAreaConfig(t, i) {
    return (i || new AlertAreaConfig()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  description(t) {
    var i = this.J7.__offset(this.z7, 6);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  creatorid() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  minvalue() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 0;
    }
  }
  maxvalue() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 100;
    }
  }
}
exports.AlertAreaConfig = AlertAreaConfig;
//# sourceMappingURL=AlertAreaConfig.js.map