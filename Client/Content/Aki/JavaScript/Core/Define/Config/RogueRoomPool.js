"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueRoomPool = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class RogueRoomPool {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get BehaviorTree() {
    return this.behaviortree();
  }
  get RoomsMusicState() {
    return this.roomsmusicstate();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsRogueRoomPool(t, s) {
    return (s || new RogueRoomPool()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  behaviortree() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  roomsmusicstate(t) {
    var s = this.J7.__offset(this.z7, 8);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
}
exports.RogueRoomPool = RogueRoomPool;
//# sourceMappingURL=RogueRoomPool.js.map