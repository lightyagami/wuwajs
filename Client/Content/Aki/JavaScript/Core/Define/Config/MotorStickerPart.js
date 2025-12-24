"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorStickerPart = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicIntInt_1 = require("./SubType/DicIntInt");
class MotorStickerPart {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get Icon() {
    return this.icon();
  }
  get IconSelect() {
    return this.iconselect();
  }
  get CameraId() {
    return GameUtils_1.GameUtils.ConvertToMap(this.cameraidLength(), this.cameraidKey, this.cameraidValue, this);
  }
  cameraidKey(t) {
    return this.cameraid(t)?.key();
  }
  cameraidValue(t) {
    return this.cameraid(t)?.value();
  }
  get CameraIds() {
    return GameUtils_1.GameUtils.ConvertToArray(this.cameraidsLength(), this.cameraids, this);
  }
  get DetailCameraIds() {
    return GameUtils_1.GameUtils.ConvertToArray(this.detailcameraidsLength(), this.detailcameraids, this);
  }
  get TipsCameraId() {
    return this.tipscameraid();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsMotorStickerPart(t, i) {
    return (i || new MotorStickerPart()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  icon(t) {
    var i = this.J7.__offset(this.z7, 6);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  iconselect(t) {
    var i = this.J7.__offset(this.z7, 8);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  GetCameraidAt(t, i) {
    return this.cameraid(t);
  }
  cameraid(t, i) {
    var s = this.J7.__offset(this.z7, 10);
    if (s) {
      return (i || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  cameraidLength() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetCameraidsAt(t) {
    return this.cameraids(t);
  }
  cameraids(t, i) {
    var s = this.J7.__offset(this.z7, 12);
    var s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + t * 4, i) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  cameraidsLength() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetDetailcameraidsAt(t) {
    return this.detailcameraids(t);
  }
  detailcameraids(t, i) {
    var s = this.J7.__offset(this.z7, 14);
    var s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + t * 4, i) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  detailcameraidsLength() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  tipscameraid(t) {
    var i = this.J7.__offset(this.z7, 16);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
}
exports.MotorStickerPart = MotorStickerPart;
//# sourceMappingURL=MotorStickerPart.js.map