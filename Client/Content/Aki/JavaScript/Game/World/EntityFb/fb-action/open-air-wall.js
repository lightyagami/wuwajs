"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpenAirWall = undefined;
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers");
class OpenAirWall {
  constructor() {
    this.bb = undefined;
    this.bb_pos = 0;
  }
  __init(t, i) {
    this.bb_pos = t;
    this.bb = i;
    return this;
  }
  static getRootAsOpenAirWall(t, i) {
    return (i || new OpenAirWall()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  static getSizePrefixedRootAsOpenAirWall(t, i) {
    t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (i || new OpenAirWall()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  type(t) {
    var i = this.bb.__offset(this.bb_pos, 4);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  hitEffectData(t) {
    var i = this.bb.__offset(this.bb_pos, 6);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  hitCd() {
    var t = this.bb.__offset(this.bb_pos, 8);
    if (t) {
      return this.bb.readFloat32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  airWallEffectData(t) {
    var i = this.bb.__offset(this.bb_pos, 10);
    if (i) {
      return this.bb.__string(this.bb_pos + i, t);
    } else {
      return undefined;
    }
  }
  airWallEffectHeight() {
    var t = this.bb.__offset(this.bb_pos, 12);
    if (t) {
      return this.bb.readFloat32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  airWallEffectThickness() {
    var t = this.bb.__offset(this.bb_pos, 14);
    if (t) {
      return this.bb.readFloat32(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  collisionPreset() {
    var t = this.bb.__offset(this.bb_pos, 16);
    if (t) {
      return this.bb.readUint8(this.bb_pos + t);
    } else {
      return 0;
    }
  }
  static startOpenAirWall(t) {
    t.startObject(7);
  }
  static addType(t, i) {
    t.addFieldOffset(0, i, 0);
  }
  static addHitEffectData(t, i) {
    t.addFieldOffset(1, i, 0);
  }
  static addHitCd(t, i) {
    t.addFieldFloat32(2, i, 0);
  }
  static addAirWallEffectData(t, i) {
    t.addFieldOffset(3, i, 0);
  }
  static addAirWallEffectHeight(t, i) {
    t.addFieldFloat32(4, i, 0);
  }
  static addAirWallEffectThickness(t, i) {
    t.addFieldFloat32(5, i, 0);
  }
  static addCollisionPreset(t, i) {
    t.addFieldInt8(6, i, 0);
  }
  static endOpenAirWall(t) {
    return t.endObject();
  }
  static createOpenAirWall(t, i, e, r, s, a, l, n) {
    OpenAirWall.startOpenAirWall(t);
    OpenAirWall.addType(t, i);
    OpenAirWall.addHitEffectData(t, e);
    OpenAirWall.addHitCd(t, r);
    OpenAirWall.addAirWallEffectData(t, s);
    OpenAirWall.addAirWallEffectHeight(t, a);
    OpenAirWall.addAirWallEffectThickness(t, l);
    OpenAirWall.addCollisionPreset(t, n);
    return OpenAirWall.endOpenAirWall(t);
  }
}
exports.OpenAirWall = OpenAirWall;
//# sourceMappingURL=open-air-wall.js.map