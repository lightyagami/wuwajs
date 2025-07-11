"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiCameraMapping = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicStringString_1 = require("./SubType/DicStringString");
class UiCameraMapping {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get ViewName() {
    return this.viewname();
  }
  get DefaultUiCameraSettingsName() {
    return this.defaultuicamerasettingsname();
  }
  get IsCheckSpecialState() {
    return this.ischeckspecialstate();
  }
  get SpecialStateCameraSettingName() {
    return this.specialstatecamerasettingname();
  }
  get bPlayLoadingCameraAnimation() {
    return this.bplayloadingcameraanimation();
  }
  get BodyTargetType() {
    return this.bodytargettype();
  }
  get BodyCameraSettingsNameMap() {
    return GameUtils_1.GameUtils.ConvertToMap(this.bodycamerasettingsnamemapLength(), this.bodycamerasettingsnamemapKey, this.bodycamerasettingsnamemapValue, this);
  }
  bodycamerasettingsnamemapKey(t) {
    return this.bodycamerasettingsnamemap(t)?.key();
  }
  bodycamerasettingsnamemapValue(t) {
    return this.bodycamerasettingsnamemap(t)?.value();
  }
  get DefaultCameraBlendName() {
    return this.defaultcamerablendname();
  }
  get UiCameraBlendNameMap() {
    return GameUtils_1.GameUtils.ConvertToMap(this.uicamerablendnamemapLength(), this.uicamerablendnamemapKey, this.uicamerablendnamemapValue, this);
  }
  uicamerablendnamemapKey(t) {
    return this.uicamerablendnamemap(t)?.key();
  }
  uicamerablendnamemapValue(t) {
    return this.uicamerablendnamemap(t)?.value();
  }
  get UiCameraDelayTime() {
    return this.uicameradelaytime();
  }
  __init(t, e) {
    this.z7 = t;
    this.J7 = e;
    return this;
  }
  static getRootAsUiCameraMapping(t, e) {
    return (e || new UiCameraMapping()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  viewname(t) {
    var e = this.J7.__offset(this.z7, 6);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  defaultuicamerasettingsname(t) {
    var e = this.J7.__offset(this.z7, 8);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  ischeckspecialstate() {
    var t = this.J7.__offset(this.z7, 10);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  specialstatecamerasettingname(t) {
    var e = this.J7.__offset(this.z7, 12);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  bplayloadingcameraanimation() {
    var t = this.J7.__offset(this.z7, 14);
    return !t || !!this.J7.readInt8(this.z7 + t);
  }
  bodytargettype() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetBodycamerasettingsnamemapAt(t, e) {
    return this.bodycamerasettingsnamemap(t);
  }
  bodycamerasettingsnamemap(t, e) {
    var i = this.J7.__offset(this.z7, 18);
    if (i) {
      return (e || new DicStringString_1.DicStringString()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + i) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  bodycamerasettingsnamemapLength() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  defaultcamerablendname(t) {
    var e = this.J7.__offset(this.z7, 20);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  GetUicamerablendnamemapAt(t, e) {
    return this.uicamerablendnamemap(t);
  }
  uicamerablendnamemap(t, e) {
    var i = this.J7.__offset(this.z7, 22);
    if (i) {
      return (e || new DicStringString_1.DicStringString()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + i) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  uicamerablendnamemapLength() {
    var t = this.J7.__offset(this.z7, 22);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  uicameradelaytime() {
    var t = this.J7.__offset(this.z7, 24);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.UiCameraMapping = UiCameraMapping;
//# sourceMappingURL=UiCameraMapping.js.map