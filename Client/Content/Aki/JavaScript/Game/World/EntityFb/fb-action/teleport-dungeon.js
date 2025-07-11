"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TeleportDungeon = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_teleport_transition_option_js_1 = require("../fb-action/union-teleport-transition-option.js");
class TeleportDungeon {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsTeleportDungeon(t, e) {
    return (e || new TeleportDungeon()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsTeleportDungeon(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new TeleportDungeon()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  dungeonId() {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  isRegroup() {
    var t = this.bb.__offset(this.bb_pos, 6);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  locationEntityId() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  transitionOptionType() {
    var t = this.bb.__offset(this.bb_pos, 10);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_teleport_transition_option_js_1.UnionTeleportTransitionOption.NONE;
    }
  }
  transitionOption(t) {
    var e = this.bb.__offset(this.bb_pos, 12);
    if (e) {
      return this.bb.__union(t, this.bb_pos + e);
    } else {
      return undefined;
    }
  }
  isNeedSecondaryConfirmation() {
    var t = this.bb.__offset(this.bb_pos, 14);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  useLocationEntityGravity() {
    var t = this.bb.__offset(this.bb_pos, 16);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  continueSave() {
    var t = this.bb.__offset(this.bb_pos, 18);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  keepMovementStates(t, e) {
    var n = this.bb.__offset(this.bb_pos, 20);
    if (n) {
      return this.bb.__string(this.bb.__vector(this.bb_pos + n) + t * 4, e);
    } else {
      return undefined;
    }
  }
  keepMovementStatesLength() {
    var t = this.bb.__offset(this.bb_pos, 20);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startTeleportDungeon(t) {
    t.startObject(9);
  }
  static addDungeonId(t, e) {
    t.addFieldInt32(0, e, 0);
  }
  static addIsRegroup(t, e) {
    t.addFieldInt8(1, +e, 0);
  }
  static addLocationEntityId(t, e) {
    t.addFieldInt32(2, e, 0);
  }
  static addTransitionOptionType(t, e) {
    t.addFieldInt8(3, e, union_teleport_transition_option_js_1.UnionTeleportTransitionOption.NONE);
  }
  static addTransitionOption(t, e) {
    t.addFieldOffset(4, e, 0);
  }
  static addIsNeedSecondaryConfirmation(t, e) {
    t.addFieldInt8(5, +e, 0);
  }
  static addUseLocationEntityGravity(t, e) {
    t.addFieldInt8(6, +e, 0);
  }
  static addContinueSave(t, e) {
    t.addFieldInt8(7, +e, 0);
  }
  static addKeepMovementStates(t, e) {
    t.addFieldOffset(8, e, 0);
  }
  static createKeepMovementStatesVector(e, n) {
    e.startVector(4, n.length, 4);
    for (let t = n.length - 1; t >= 0; t--) {
      e.addOffset(n[t]);
    }
    return e.endVector();
  }
  static startKeepMovementStatesVector(t, e) {
    t.startVector(4, e, 4);
  }
  static endTeleportDungeon(t) {
    return t.endObject();
  }
  static createTeleportDungeon(t, e, n, i, o, r, s, a, u, h) {
    TeleportDungeon.startTeleportDungeon(t);
    TeleportDungeon.addDungeonId(t, e);
    TeleportDungeon.addIsRegroup(t, n);
    TeleportDungeon.addLocationEntityId(t, i);
    TeleportDungeon.addTransitionOptionType(t, o);
    TeleportDungeon.addTransitionOption(t, r);
    TeleportDungeon.addIsNeedSecondaryConfirmation(t, s);
    TeleportDungeon.addUseLocationEntityGravity(t, a);
    TeleportDungeon.addContinueSave(t, u);
    TeleportDungeon.addKeepMovementStates(t, h);
    return TeleportDungeon.endTeleportDungeon(t);
  }
}
exports.TeleportDungeon = TeleportDungeon;
//# sourceMappingURL=teleport-dungeon.js.map