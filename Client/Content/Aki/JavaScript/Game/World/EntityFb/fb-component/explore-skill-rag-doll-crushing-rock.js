"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExploreSkillRagDollCrushingRock = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ExploreSkillRagDollCrushingRock {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(l, r) {
    this.bb_pos = l;
    this.bb = r;
    return this;
  }
  static getRootAsExploreSkillRagDollCrushingRock(l, r) {
    return (r || new ExploreSkillRagDollCrushingRock()).__init(l.readInt32(l.position()) + l.position(), l);
  }
  static getSizePrefixedRootAsExploreSkillRagDollCrushingRock(l, r) {
    l.setPosition(l.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (r || new ExploreSkillRagDollCrushingRock()).__init(l.readInt32(l.position()) + l.position(), l);
  }
  type(l) {
    var r = this.bb.__offset(this.bb_pos, 4);
    if (r) {
      return this.bb.__string(this.bb_pos + r, l);
    } else {
      return undefined;
    }
  }
  static startExploreSkillRagDollCrushingRock(l) {
    l.startObject(1);
  }
  static addType(l, r) {
    l.addFieldOffset(0, r, 0);
  }
  static endExploreSkillRagDollCrushingRock(l) {
    return l.endObject();
  }
  static createExploreSkillRagDollCrushingRock(l, r) {
    ExploreSkillRagDollCrushingRock.startExploreSkillRagDollCrushingRock(l);
    ExploreSkillRagDollCrushingRock.addType(l, r);
    return ExploreSkillRagDollCrushingRock.endExploreSkillRagDollCrushingRock(l);
  }
}
exports.ExploreSkillRagDollCrushingRock = ExploreSkillRagDollCrushingRock;
//# sourceMappingURL=explore-skill-rag-doll-crushing-rock.js.map