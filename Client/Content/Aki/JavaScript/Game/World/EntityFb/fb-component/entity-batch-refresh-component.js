"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EntityBatchRefreshComponent = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const union_entity_batch_refresh_js_1 = require("../fb-component/union-entity-batch-refresh.js");
const condition_group_js_1 = require("../fb-condition/condition-group.js");
class EntityBatchRefreshComponent {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsEntityBatchRefreshComponent(t, i) {
    return (i || new EntityBatchRefreshComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsEntityBatchRefreshComponent(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new EntityBatchRefreshComponent()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  disabled() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  startCondition(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return (t || new condition_group_js_1.ConditionGroup()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  endCondition(t) {
    var i = this.bb.__offset(this.bb_pos, 8);
    if (i) {
      return (t || new condition_group_js_1.ConditionGroup()).__init(this.bb.__indirect(this.bb_pos + i), this.bb);
    } else {
      return undefined;
    }
  }
  entityBatchRefreshType() {
    var t = this.bb.__offset(this.bb_pos, 10);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return union_entity_batch_refresh_js_1.UnionEntityBatchRefresh.NONE;
    }
  }
  entityBatchRefresh(t) {
    var i = this.bb.__offset(this.bb_pos, 12);
    if (i) {
      return this.bb.__union(t, this.bb_pos + i);
    } else {
      return undefined;
    }
  }
  static startEntityBatchRefreshComponent(t) {
    t.startObject(5);
  }
  static addDisabled(t, i) {
    t.addFieldInt8(0, +i, 0);
  }
  static addStartCondition(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static addEndCondition(t, i) {
    t.addFieldOffset(2, i, 0);
  }
  static addEntityBatchRefreshType(t, i) {
    t.addFieldInt8(3, i, union_entity_batch_refresh_js_1.UnionEntityBatchRefresh.NONE);
  }
  static addEntityBatchRefresh(t, i) {
    t.addFieldOffset(4, i, 0);
  }
  static endEntityBatchRefreshComponent(t) {
    return t.endObject();
  }
}
exports.EntityBatchRefreshComponent = EntityBatchRefreshComponent;
//# sourceMappingURL=entity-batch-refresh-component.js.map