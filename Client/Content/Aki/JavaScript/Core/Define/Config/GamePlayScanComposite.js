"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GamePlayScanComposite = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class GamePlayScanComposite {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get UId() {
    return this.uid();
  }
  get ScanInfos() {
    return GameUtils_1.GameUtils.ConvertToArray(this.scaninfosLength(), this.scaninfos, this);
  }
  get ItemMaterialDataPath() {
    return this.itemmaterialdatapath();
  }
  get NearVoiceEffectPath() {
    return this.nearvoiceeffectpath();
  }
  get FarVoiceEffectPath() {
    return this.farvoiceeffectpath();
  }
  get ScanConcealEffectPath() {
    return this.scanconcealeffectpath();
  }
  get InteractionEffectInterval() {
    return this.interactioneffectinterval();
  }
  get ShowDistance() {
    return this.showdistance();
  }
  get ShowInteractionEffect() {
    return this.showinteractioneffect();
  }
  get ClampToEllipse() {
    return this.clamptoellipse();
  }
  get ScanAudioEvent() {
    return this.scanaudioevent();
  }
  get TriggerRoleAudio() {
    return this.triggerroleaudio();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsGamePlayScanComposite(t, i) {
    return (i || new GamePlayScanComposite()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  uid() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetScaninfosAt(t) {
    return this.scaninfos(t);
  }
  scaninfos(t) {
    var i = this.J7.__offset(this.z7, 6);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  scaninfosLength() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  scaninfosArray() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  itemmaterialdatapath(t) {
    var i = this.J7.__offset(this.z7, 8);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  nearvoiceeffectpath(t) {
    var i = this.J7.__offset(this.z7, 10);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  farvoiceeffectpath(t) {
    var i = this.J7.__offset(this.z7, 12);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  scanconcealeffectpath(t) {
    var i = this.J7.__offset(this.z7, 14);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  interactioneffectinterval() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 8;
    }
  }
  showdistance() {
    var t = this.J7.__offset(this.z7, 18);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  showinteractioneffect() {
    var t = this.J7.__offset(this.z7, 20);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  clamptoellipse() {
    var t = this.J7.__offset(this.z7, 22);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  scanaudioevent(t) {
    var i = this.J7.__offset(this.z7, 24);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  triggerroleaudio() {
    var t = this.J7.__offset(this.z7, 26);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
}
exports.GamePlayScanComposite = GamePlayScanComposite;
//# sourceMappingURL=GamePlayScanComposite.js.map