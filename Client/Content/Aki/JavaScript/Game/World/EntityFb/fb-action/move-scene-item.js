"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoveSceneItem = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_move_scene_item_js_1 = require("../fb-action/union-move-scene-item.js");
class MoveSceneItem {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(e, t) {
    this.bb_pos = e;
    this.bb = t;
    return this;
  }
  static getRootAsMoveSceneItem(e, t) {
    return (t || new MoveSceneItem()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  static getSizePrefixedRootAsMoveSceneItem(e, t) {
    e.setPosition(e.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new MoveSceneItem()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  entityId() {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.readInt32(this.bb_pos + e);
    } else {
      return 0;
    }
  }
  stopBeforeMove() {
    var e = this.bb.__offset(this.bb_pos, 6);
    return !!e && !!this.bb.readInt8(this.bb_pos + e);
  }
  moveConfigType() {
    var e = this.bb.__offset(this.bb_pos, 8);
    if (e) {
      return this.bb.readUint8(this.bb_pos + e);
    } else {
      return union_move_scene_item_js_1.UnionMoveSceneItem.NONE;
    }
  }
  moveConfig(e) {
    var t = this.bb.__offset(this.bb_pos, 10);
    if (t) {
      return this.bb.__union(e, this.bb_pos + t);
    } else {
      return undefined;
    }
  }
  bypassClientResponse() {
    var e = this.bb.__offset(this.bb_pos, 12);
    return !!e && !!this.bb.readInt8(this.bb_pos + e);
  }
  static startMoveSceneItem(e) {
    e.startObject(5);
  }
  static addEntityId(e, t) {
    e.addFieldInt32(0, t, 0);
  }
  static addStopBeforeMove(e, t) {
    e.addFieldInt8(1, +t, 0);
  }
  static addMoveConfigType(e, t) {
    e.addFieldInt8(2, t, union_move_scene_item_js_1.UnionMoveSceneItem.NONE);
  }
  static addMoveConfig(e, t) {
    e.addFieldOffset(3, t, 0);
  }
  static addBypassClientResponse(e, t) {
    e.addFieldInt8(4, +t, 0);
  }
  static endMoveSceneItem(e) {
    return e.endObject();
  }
  static createMoveSceneItem(e, t, s, i, n, o) {
    MoveSceneItem.startMoveSceneItem(e);
    MoveSceneItem.addEntityId(e, t);
    MoveSceneItem.addStopBeforeMove(e, s);
    MoveSceneItem.addMoveConfigType(e, i);
    MoveSceneItem.addMoveConfig(e, n);
    MoveSceneItem.addBypassClientResponse(e, o);
    return MoveSceneItem.endMoveSceneItem(e);
  }
}
exports.MoveSceneItem = MoveSceneItem;
//# sourceMappingURL=move-scene-item.js.map