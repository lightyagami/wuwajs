"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseMap = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class TrapDefenseMap {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get MapId() {
    return this.mapid();
  }
  get CenterOffset() {
    return GameUtils_1.GameUtils.ConvertToArray(this.centeroffsetLength(), this.centeroffset, this);
  }
  get UiOffset() {
    return GameUtils_1.GameUtils.ConvertToArray(this.uioffsetLength(), this.uioffset, this);
  }
  get BigMapUiOffset() {
    return GameUtils_1.GameUtils.ConvertToArray(this.bigmapuioffsetLength(), this.bigmapuioffset, this);
  }
  get MiniMapScale() {
    return this.minimapscale();
  }
  get MapScale() {
    return this.mapscale();
  }
  get MiniMapResourcePath() {
    return this.minimapresourcepath();
  }
  get MiniMapLightResourcePath() {
    return this.minimaplightresourcepath();
  }
  get MapResourcePath() {
    return this.mapresourcepath();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsTrapDefenseMap(t, s) {
    return (s || new TrapDefenseMap()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  mapid() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetCenteroffsetAt(t) {
    return this.centeroffset(t);
  }
  centeroffset(t) {
    var s = this.J7.__offset(this.z7, 6);
    if (s) {
      return this.J7.readFloat32(this.J7.__vector(this.z7 + s) + t * 4);
    } else {
      return 0;
    }
  }
  centeroffsetLength() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  centeroffsetArray() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return new Float32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetUioffsetAt(t) {
    return this.uioffset(t);
  }
  uioffset(t) {
    var s = this.J7.__offset(this.z7, 8);
    if (s) {
      return this.J7.readFloat32(this.J7.__vector(this.z7 + s) + t * 4);
    } else {
      return 0;
    }
  }
  uioffsetLength() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  uioffsetArray() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return new Float32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetBigmapuioffsetAt(t) {
    return this.bigmapuioffset(t);
  }
  bigmapuioffset(t) {
    var s = this.J7.__offset(this.z7, 10);
    if (s) {
      return this.J7.readFloat32(this.J7.__vector(this.z7 + s) + t * 4);
    } else {
      return 0;
    }
  }
  bigmapuioffsetLength() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  bigmapuioffsetArray() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return new Float32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  minimapscale() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 1;
    }
  }
  mapscale() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 1;
    }
  }
  minimapresourcepath(t) {
    var s = this.J7.__offset(this.z7, 16);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  minimaplightresourcepath(t) {
    var s = this.J7.__offset(this.z7, 18);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  mapresourcepath(t) {
    var s = this.J7.__offset(this.z7, 20);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
}
exports.TrapDefenseMap = TrapDefenseMap;
//# sourceMappingURL=TrapDefenseMap.js.map