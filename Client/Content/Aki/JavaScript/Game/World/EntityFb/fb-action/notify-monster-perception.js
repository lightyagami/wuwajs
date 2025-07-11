"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NotifyMonsterPerception = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_battle_state_perception_behavior_js_1 = require("../fb-action/union-battle-state-perception-behavior.js");
class NotifyMonsterPerception {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsNotifyMonsterPerception(t, e) {
    return (e || new NotifyMonsterPerception()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsNotifyMonsterPerception(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new NotifyMonsterPerception()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  entityIds(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return this.bb.readInt32(this.bb.__vector(this.bb_pos + e) + t * 4);
    } else {
      return 0;
    }
  }
  entityIdsLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  entityIdsArray() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return new Int32Array(this.bb.bytes().buffer, this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + t), this.bb.__vector_len(this.bb_pos + t));
    } else {
      return undefined;
    }
  }
  perceptionBehaviorOptionType() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_battle_state_perception_behavior_js_1.UnionBattleStatePerceptionBehavior.NONE;
    }
  }
  perceptionBehaviorOption(t) {
    var e = this.bb.__offset(this.bb_pos, 10);
    if (e) {
      return this.bb.__union(t, this.bb_pos + e);
    } else {
      return undefined;
    }
  }
  static startNotifyMonsterPerception(t) {
    t.startObject(4);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addEntityIds(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static createEntityIdsVector(e, i) {
    e.startVector(4, i.length, 4);
    for (let t = i.length - 1; t >= 0; t--) {
      e.addInt32(i[t]);
    }
    return e.endVector();
  }
  static startEntityIdsVector(t, e) {
    t.startVector(4, e, 4);
  }
  static addPerceptionBehaviorOptionType(t, e) {
    t.addFieldInt8(2, e, union_battle_state_perception_behavior_js_1.UnionBattleStatePerceptionBehavior.NONE);
  }
  static addPerceptionBehaviorOption(t, e) {
    t.addFieldOffset(3, e, 0);
  }
  static endNotifyMonsterPerception(t) {
    return t.endObject();
  }
  static createNotifyMonsterPerception(t, e, i, r, s) {
    NotifyMonsterPerception.startNotifyMonsterPerception(t);
    NotifyMonsterPerception.addType(t, e);
    NotifyMonsterPerception.addEntityIds(t, i);
    NotifyMonsterPerception.addPerceptionBehaviorOptionType(t, r);
    NotifyMonsterPerception.addPerceptionBehaviorOption(t, s);
    return NotifyMonsterPerception.endNotifyMonsterPerception(t);
  }
}
exports.NotifyMonsterPerception = NotifyMonsterPerception;
//# sourceMappingURL=notify-monster-perception.js.map