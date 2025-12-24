"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AkiMap = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class AkiMap {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get MapId() {
    return this.mapid();
  }
  get MapName() {
    return this.mapname();
  }
  get FatherMap() {
    return this.fathermap();
  }
  get GroupMark() {
    return this.groupmark();
  }
  get Floor() {
    return this.floor();
  }
  get SwitchCondition() {
    return this.switchcondition();
  }
  get MapPic3d() {
    return this.mappic3d();
  }
  get MapPic2d() {
    return this.mappic2d();
  }
  get BigMapDefaultScale() {
    return this.bigmapdefaultscale();
  }
  get BigMapMinScale() {
    return this.bigmapminscale();
  }
  get BigMapMaxScale() {
    return this.bigmapmaxscale();
  }
  get LittleMapDefaultScale() {
    return this.littlemapdefaultscale();
  }
  get LimitContent() {
    return this.limitcontent();
  }
  get IsGravityMap() {
    return this.isgravitymap();
  }
  get IsNeedCustomizedThumbnail() {
    return this.isneedcustomizedthumbnail();
  }
  get SafeAreaOffset() {
    return GameUtils_1.GameUtils.ConvertToArray(this.safeareaoffsetLength(), this.safeareaoffset, this);
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsAkiMap(t, i) {
    return (i || new AkiMap()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  mapid() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  mapname(t) {
    var i = this.J7.__offset(this.z7, 6);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  fathermap() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  groupmark() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  floor() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  switchcondition(t) {
    var i = this.J7.__offset(this.z7, 14);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  mappic3d(t) {
    var i = this.J7.__offset(this.z7, 16);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  mappic2d(t) {
    var i = this.J7.__offset(this.z7, 18);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  bigmapdefaultscale() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  bigmapminscale() {
    var t = this.J7.__offset(this.z7, 22);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  bigmapmaxscale() {
    var t = this.J7.__offset(this.z7, 24);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  littlemapdefaultscale() {
    var t = this.J7.__offset(this.z7, 26);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  limitcontent(t) {
    var i = this.J7.__offset(this.z7, 28);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  isgravitymap() {
    var t = this.J7.__offset(this.z7, 30);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  isneedcustomizedthumbnail() {
    var t = this.J7.__offset(this.z7, 32);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  GetSafeareaoffsetAt(t) {
    return this.safeareaoffset(t);
  }
  safeareaoffset(t) {
    var i = this.J7.__offset(this.z7, 34);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  safeareaoffsetLength() {
    var t = this.J7.__offset(this.z7, 34);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  safeareaoffsetArray() {
    var t = this.J7.__offset(this.z7, 34);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
}
exports.AkiMap = AkiMap;
//# sourceMappingURL=AkiMap.js.map