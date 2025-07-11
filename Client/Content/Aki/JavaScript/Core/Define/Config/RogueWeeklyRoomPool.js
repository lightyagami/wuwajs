"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueWeeklyRoomPool = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class RogueWeeklyRoomPool {
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
  __init(t, e) {
    this.z7 = t;
    this.J7 = e;
    return this;
  }
  static getRootAsRogueWeeklyRoomPool(t, e) {
    return (e || new RogueWeeklyRoomPool()).__init(t.readInt32(t.position()) + t.position(), t);
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
    var e = this.J7.__offset(this.z7, 8);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
}
exports.RogueWeeklyRoomPool = RogueWeeklyRoomPool;
//# sourceMappingURL=RogueWeeklyRoomPool.js.map