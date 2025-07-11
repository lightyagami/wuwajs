"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OverlayMap = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class OverlayMap {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get OverlayMapId() {
    return this.overlaymapid();
  }
  get MapId() {
    return this.mapid();
  }
  get GravityFlip() {
    return this.gravityflip();
  }
  get MapAddress() {
    return this.mapaddress();
  }
  get MapPos() {
    return GameUtils_1.GameUtils.ConvertToArray(this.mapposLength(), this.mappos, this);
  }
  get Rotation() {
    return this.rotation();
  }
  get WidthHeight() {
    return GameUtils_1.GameUtils.ConvertToArray(this.widthheightLength(), this.widthheight, this);
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsOverlayMap(t, i) {
    return (i || new OverlayMap()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  overlaymapid() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  mapid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  gravityflip() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 1;
    }
  }
  mapaddress(t) {
    var i = this.J7.__offset(this.z7, 10);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  GetMapposAt(t) {
    return this.mappos(t);
  }
  mappos(t) {
    var i = this.J7.__offset(this.z7, 12);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  mapposLength() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  mapposArray() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  rotation() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetWidthheightAt(t) {
    return this.widthheight(t);
  }
  widthheight(t) {
    var i = this.J7.__offset(this.z7, 16);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  widthheightLength() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  widthheightArray() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
}
exports.OverlayMap = OverlayMap;
//# sourceMappingURL=OverlayMap.js.map