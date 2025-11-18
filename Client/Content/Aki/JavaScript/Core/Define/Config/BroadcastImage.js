"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BroadcastImage = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class BroadcastImage {
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
  get Image() {
    return this.image();
  }
  get ImageM() {
    return this.imagem();
  }
  get ImageF() {
    return this.imagef();
  }
  get UmgIcon() {
    return this.umgicon();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsBroadcastImage(t, s) {
    return (s || new BroadcastImage()).__init(t.readInt32(t.position()) + t.position(), t);
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
    var s = this.J7.__offset(this.z7, 6);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  image(t) {
    var s = this.J7.__offset(this.z7, 8);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  imagem(t) {
    var s = this.J7.__offset(this.z7, 10);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  imagef(t) {
    var s = this.J7.__offset(this.z7, 12);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  umgicon(t) {
    var s = this.J7.__offset(this.z7, 14);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
}
exports.BroadcastImage = BroadcastImage;
//# sourceMappingURL=BroadcastImage.js.map