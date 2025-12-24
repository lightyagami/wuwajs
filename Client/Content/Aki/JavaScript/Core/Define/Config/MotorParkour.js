"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorParkour = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class MotorParkour {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get ActivityId() {
    return this.activityid();
  }
  get InstId() {
    return this.instid();
  }
  get RewardIds() {
    return GameUtils_1.GameUtils.ConvertToArray(this.rewardidsLength(), this.rewardids, this);
  }
  get LevelName() {
    return this.levelname();
  }
  get RouteName() {
    return this.routename();
  }
  get SmallBgTexture() {
    return this.smallbgtexture();
  }
  get SelectedSmallBgTexture() {
    return this.selectedsmallbgtexture();
  }
  get RaceTrackTexture() {
    return this.racetracktexture();
  }
  get RomanNum() {
    return this.romannum();
  }
  get MapTexture() {
    return this.maptexture();
  }
  get CenterOffset() {
    return GameUtils_1.GameUtils.ConvertToArray(this.centeroffsetLength(), this.centeroffset, this);
  }
  get UiOffset() {
    return GameUtils_1.GameUtils.ConvertToArray(this.uioffsetLength(), this.uioffset, this);
  }
  get MapScale() {
    return this.mapscale();
  }
  get SplineId() {
    return this.splineid();
  }
  get SplineStartIndex() {
    return this.splinestartindex();
  }
  get SplineEndIndex() {
    return this.splineendindex();
  }
  get RouteTextureRotation() {
    return this.routetexturerotation();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsMotorParkour(t, s) {
    return (s || new MotorParkour()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  activityid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  instid() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetRewardidsAt(t) {
    return this.rewardids(t);
  }
  rewardids(t) {
    var s = this.J7.__offset(this.z7, 10);
    if (s) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + s) + t * 4);
    } else {
      return 0;
    }
  }
  rewardidsLength() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  rewardidsArray() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  levelname(t) {
    var s = this.J7.__offset(this.z7, 12);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  routename(t) {
    var s = this.J7.__offset(this.z7, 14);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  smallbgtexture(t) {
    var s = this.J7.__offset(this.z7, 16);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  selectedsmallbgtexture(t) {
    var s = this.J7.__offset(this.z7, 18);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  racetracktexture(t) {
    var s = this.J7.__offset(this.z7, 20);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  romannum(t) {
    var s = this.J7.__offset(this.z7, 22);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  maptexture(t) {
    var s = this.J7.__offset(this.z7, 24);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  GetCenteroffsetAt(t) {
    return this.centeroffset(t);
  }
  centeroffset(t) {
    var s = this.J7.__offset(this.z7, 26);
    if (s) {
      return this.J7.readFloat32(this.J7.__vector(this.z7 + s) + t * 4);
    } else {
      return 0;
    }
  }
  centeroffsetLength() {
    var t = this.J7.__offset(this.z7, 26);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  centeroffsetArray() {
    var t = this.J7.__offset(this.z7, 26);
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
    var s = this.J7.__offset(this.z7, 28);
    if (s) {
      return this.J7.readFloat32(this.J7.__vector(this.z7 + s) + t * 4);
    } else {
      return 0;
    }
  }
  uioffsetLength() {
    var t = this.J7.__offset(this.z7, 28);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  uioffsetArray() {
    var t = this.J7.__offset(this.z7, 28);
    if (t) {
      return new Float32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  mapscale() {
    var t = this.J7.__offset(this.z7, 30);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 1;
    }
  }
  splineid() {
    var t = this.J7.__offset(this.z7, 32);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  splinestartindex() {
    var t = this.J7.__offset(this.z7, 34);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  splineendindex() {
    var t = this.J7.__offset(this.z7, 36);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  routetexturerotation() {
    var t = this.J7.__offset(this.z7, 38);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.MotorParkour = MotorParkour;
//# sourceMappingURL=MotorParkour.js.map