"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SimpleCombatDetailConfig = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class SimpleCombatDetailConfig {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get SimpleCombatId() {
    return this.simplecombatid();
  }
  get SubTypeId() {
    return this.subtypeid();
  }
  get PrefabPath() {
    return this.prefabpath();
  }
  get DaPath() {
    return this.dapath();
  }
  get PropertyId() {
    return this.propertyid();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsSimpleCombatDetailConfig(t, i) {
    return (i || new SimpleCombatDetailConfig()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  simplecombatid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  subtypeid() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  prefabpath(t) {
    var i = this.J7.__offset(this.z7, 10);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  dapath(t) {
    var i = this.J7.__offset(this.z7, 12);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  propertyid() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.SimpleCombatDetailConfig = SimpleCombatDetailConfig;
//# sourceMappingURL=SimpleCombatDetailConfig.js.map