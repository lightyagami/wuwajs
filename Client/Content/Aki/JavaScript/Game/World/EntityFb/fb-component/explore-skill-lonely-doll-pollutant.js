"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExploreSkillLonelyDollPollutant = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class ExploreSkillLonelyDollPollutant {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(l, t) {
    this.bb_pos = l;
    this.bb = t;
    return this;
  }
  static getRootAsExploreSkillLonelyDollPollutant(l, t) {
    return (t || new ExploreSkillLonelyDollPollutant()).__init(l.readInt32(l.position()) + l.position(), l);
  }
  static getSizePrefixedRootAsExploreSkillLonelyDollPollutant(l, t) {
    l.setPosition(l.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (t || new ExploreSkillLonelyDollPollutant()).__init(l.readInt32(l.position()) + l.position(), l);
  }
  type(l) {
    var t = this.bb.__offset(this.bb_pos, 4);
    if (t) {
      return this.bb.__string(this.bb_pos + t, l);
    } else {
      return undefined;
    }
  }
  static startExploreSkillLonelyDollPollutant(l) {
    l.startObject(1);
  }
  static addType(l, t) {
    l.addFieldOffset(0, t, 0);
  }
  static endExploreSkillLonelyDollPollutant(l) {
    return l.endObject();
  }
  static createExploreSkillLonelyDollPollutant(l, t) {
    ExploreSkillLonelyDollPollutant.startExploreSkillLonelyDollPollutant(l);
    ExploreSkillLonelyDollPollutant.addType(l, t);
    return ExploreSkillLonelyDollPollutant.endExploreSkillLonelyDollPollutant(l);
  }
}
exports.ExploreSkillLonelyDollPollutant = ExploreSkillLonelyDollPollutant;
//# sourceMappingURL=explore-skill-lonely-doll-pollutant.js.map