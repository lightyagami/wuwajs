"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueRoomShowConfig = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class RogueRoomShowConfig {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get BehaviorTree() {
    return this.behaviortree();
  }
  get Icon() {
    return this.icon();
  }
  get Name() {
    return this.name();
  }
  get Desc() {
    return this.desc();
  }
  get BuffPoolId() {
    return this.buffpoolid();
  }
  get BuffId() {
    return this.buffid();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsRogueRoomShowConfig(t, i) {
    return (i || new RogueRoomShowConfig()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  behaviortree() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  icon(t) {
    var i = this.J7.__offset(this.z7, 6);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  name(t) {
    var i = this.J7.__offset(this.z7, 8);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  desc(t) {
    var i = this.J7.__offset(this.z7, 10);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  buffpoolid() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  buffid() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.RogueRoomShowConfig = RogueRoomShowConfig;
//# sourceMappingURL=RogueRoomShowConfig.js.map