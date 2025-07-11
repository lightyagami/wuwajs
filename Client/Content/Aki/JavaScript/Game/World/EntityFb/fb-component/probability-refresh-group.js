"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProbabilityRefreshGroup = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
const probability_refresh_item_js_1 = require("../fb-component/probability-refresh-item.js");
class ProbabilityRefreshGroup {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, r) {
    this.bb_pos = t;
    this.bb = r;
    return this;
  }
  static getRootAsProbabilityRefreshGroup(t, r) {
    return (r || new ProbabilityRefreshGroup()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsProbabilityRefreshGroup(t, r) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (r || new ProbabilityRefreshGroup()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  checkOccupation(t) {
    var r = this.bb.__offset(this.bb_pos, 4);
    if (r) {
      return this.bb.__string(this.bb_pos + r, t);
    } else {
      return undefined;
    }
  }
  refreshItems(t, r) {
    var e = this.bb.__offset(this.bb_pos, 6);
    if (e) {
      return (r || new probability_refresh_item_js_1.ProbabilityRefreshItem()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + e) + t * 4), this.bb);
    } else {
      return undefined;
    }
  }
  refreshItemsLength() {
    var t = this.bb.__offset(this.bb_pos, 6);
    if (t) {
      return this.bb.__vector_len(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startProbabilityRefreshGroup(t) {
    t.startObject(2);
  }
  static addCheckOccupation(t, r) {
    t.addFieldOffset(0, r, 0);
  }
  static addRefreshItems(t, r) {
    t.addFieldOffset(1, r, 0);
  }
  static createRefreshItemsVector(r, e) {
    r.startVector(4, e.length, 4);
    for (let t = e.length - 1; t >= 0; t--) {
      r.addOffset(e[t]);
    }
    return r.endVector();
  }
  static startRefreshItemsVector(t, r) {
    t.startVector(4, r, 4);
  }
  static endProbabilityRefreshGroup(t) {
    return t.endObject();
  }
  static createProbabilityRefreshGroup(t, r, e) {
    ProbabilityRefreshGroup.startProbabilityRefreshGroup(t);
    ProbabilityRefreshGroup.addCheckOccupation(t, r);
    ProbabilityRefreshGroup.addRefreshItems(t, e);
    return ProbabilityRefreshGroup.endProbabilityRefreshGroup(t);
  }
}
exports.ProbabilityRefreshGroup = ProbabilityRefreshGroup;
//# sourceMappingURL=probability-refresh-group.js.map