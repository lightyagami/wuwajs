"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NpcStandbyShowFinitelyInfo = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const montage_id_js_1 = require("../fb-action/montage-id.js");
const ignore_entity_ids_collision_js_1 = require("../fb-component/ignore-entity-ids-collision.js");
class NpcStandbyShowFinitelyInfo {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsNpcStandbyShowFinitelyInfo(t, i) {
    return (i || new NpcStandbyShowFinitelyInfo()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsNpcStandbyShowFinitelyInfo(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new NpcStandbyShowFinitelyInfo()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  montage(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  registeredMontageId(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return (t || new montage_id_js_1.MontageId()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  faceExpressionId() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  time() {
    var t = this.bb.__offset(this.bb_pos, 10);
    if (t) {
      return this.bb.readInt32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  ignoreEntityCollision(t) {
    var i = this.bb.__offset(this.bb_pos, 12);
    if (i) {
      return (t || new ignore_entity_ids_collision_js_1.IgnoreEntityIdsCollision()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  static startNpcStandbyShowFinitelyInfo(t) {
    t.startObject(5);
  }
  static addMontage(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addRegisteredMontageId(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static addFaceExpressionId(t, i) {
    t.addFieldInt32(2, i, 0);
  }
  static addTime(t, i) {
    t.addFieldInt32(3, i, 0);
  }
  static addIgnoreEntityCollision(t, i) {
    t.addFieldOffset(4, i, 0);
  }
  static endNpcStandbyShowFinitelyInfo(t) {
    return t.endObject();
  }
}
exports.NpcStandbyShowFinitelyInfo = NpcStandbyShowFinitelyInfo;
//# sourceMappingURL=npc-standby-show-finitely-info.js.map