"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FightPhotoOption = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class FightPhotoOption {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get Name() {
    return this.name();
  }
  get Picture() {
    return this.picture();
  }
  get FilterIndex() {
    return this.filterindex();
  }
  get FilterParamX() {
    return this.filterparamx();
  }
  get FilterParamY() {
    return this.filterparamy();
  }
  get FilterIntensity() {
    return this.filterintensity();
  }
  get DtTableId() {
    return this.dttableid();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsFightPhotoOption(t, i) {
    return (i || new FightPhotoOption()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  name(t) {
    var i = this.J7.__offset(this.z7, 6);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  picture(t) {
    var i = this.J7.__offset(this.z7, 8);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  filterindex() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  filterparamx() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 0.5;
    }
  }
  filterparamy() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 0.5;
    }
  }
  filterintensity() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 1;
    }
  }
  dttableid() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.FightPhotoOption = FightPhotoOption;
//# sourceMappingURL=FightPhotoOption.js.map