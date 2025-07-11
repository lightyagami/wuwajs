"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RandomNpcRule = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const fixed_date_time_js_1 = require("../fb-component/fixed-date-time.js");
const probability_refresh_group_js_1 = require("../fb-component/probability-refresh-group.js");
class RandomNpcRule {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, e) {
    this.bb_pos = t;
    this.bb = e;
    return this;
  }
  static getRootAsRandomNpcRule(t, e) {
    return (e || new RandomNpcRule()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsRandomNpcRule(t, e) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (e || new RandomNpcRule()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var e = this.bb.__offset(this.bb_pos, 4);
    if (e) {
      return this.bb.__string(this.bb_pos + e, t);
    } else {
      return undefined;
    }
  }
  dateTimeList(t, e) {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return (e || new fixed_date_time_js_1.FixedDateTime()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + i) + t * 4), this.bb);
    } else {
      return undefined;
    }
  }
  dateTimeListLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  probabilityRefreshGroup(t) {
    var e = this.bb.__offset(this.bb_pos, 8);
    if (e) {
      return (t || new probability_refresh_group_js_1.ProbabilityRefreshGroup()).__init(this.bb.__indirect(this.bb_pos + e), this.bb);
    } else {
      return undefined;
    }
  }
  static startRandomNpcRule(t) {
    t.startObject(3);
  }
  static addType(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static addDateTimeList(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static createDateTimeListVector(e, i) {
    e.startVector(4, i.length, 4);
    for (let t = i.length - 1; t >= 0; t--) {
      e.addOffset(i[t]);
    }
    return e.endVector();
  }
  static startDateTimeListVector(t, e) {
    t.startVector(4, e, 4);
  }
  static addProbabilityRefreshGroup(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static endRandomNpcRule(t) {
    return t.endObject();
  }
}
exports.RandomNpcRule = RandomNpcRule;
//# sourceMappingURL=random-npc-rule.js.map