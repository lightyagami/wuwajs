"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdvertisingTabEnemy = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicIntString_1 = require("./SubType/DicIntString");
class AdvertisingTabEnemy {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get Type() {
    return this.type();
  }
  get ThumbnailText() {
    return this.thumbnailtext();
  }
  get ThumbnailPic() {
    return this.thumbnailpic();
  }
  get Title() {
    return this.title();
  }
  get SubTitle() {
    return this.subtitle();
  }
  get Description() {
    return this.description();
  }
  get MainPic() {
    return this.mainpic();
  }
  get EnemyDescription() {
    return this.enemydescription();
  }
  get VisionDescription() {
    return this.visiondescription();
  }
  get VisionFetterList() {
    return GameUtils_1.GameUtils.ConvertToArray(this.visionfetterlistLength(), this.visionfetterlist, this);
  }
  get VisionEffectMap() {
    return GameUtils_1.GameUtils.ConvertToMap(this.visioneffectmapLength(), this.visioneffectmapKey, this.visioneffectmapValue, this);
  }
  visioneffectmapKey(t) {
    return this.visioneffectmap(t)?.key();
  }
  visioneffectmapValue(t) {
    return this.visioneffectmap(t)?.value();
  }
  get SuitCoreSprite() {
    return this.suitcoresprite();
  }
  get SuitCoreBgSprite() {
    return this.suitcorebgsprite();
  }
  get SuitOuterBgTexture() {
    return this.suitouterbgtexture();
  }
  get SuitNiagaraColor() {
    return this.suitniagaracolor();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsAdvertisingTabEnemy(t, i) {
    return (i || new AdvertisingTabEnemy()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  type() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  thumbnailtext(t) {
    var i = this.J7.__offset(this.z7, 8);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  thumbnailpic(t) {
    var i = this.J7.__offset(this.z7, 10);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  title(t) {
    var i = this.J7.__offset(this.z7, 12);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  subtitle(t) {
    var i = this.J7.__offset(this.z7, 14);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  description(t) {
    var i = this.J7.__offset(this.z7, 16);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  mainpic(t) {
    var i = this.J7.__offset(this.z7, 18);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  enemydescription(t) {
    var i = this.J7.__offset(this.z7, 20);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  visiondescription(t) {
    var i = this.J7.__offset(this.z7, 22);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  GetVisionfetterlistAt(t) {
    return this.visionfetterlist(t);
  }
  visionfetterlist(t) {
    var i = this.J7.__offset(this.z7, 24);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  visionfetterlistLength() {
    var t = this.J7.__offset(this.z7, 24);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  visionfetterlistArray() {
    var t = this.J7.__offset(this.z7, 24);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetVisioneffectmapAt(t, i) {
    return this.visioneffectmap(t);
  }
  visioneffectmap(t, i) {
    var s = this.J7.__offset(this.z7, 26);
    if (s) {
      return (i || new DicIntString_1.DicIntString()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  visioneffectmapLength() {
    var t = this.J7.__offset(this.z7, 26);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  suitcoresprite(t) {
    var i = this.J7.__offset(this.z7, 28);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  suitcorebgsprite(t) {
    var i = this.J7.__offset(this.z7, 30);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  suitouterbgtexture(t) {
    var i = this.J7.__offset(this.z7, 32);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  suitniagaracolor(t) {
    var i = this.J7.__offset(this.z7, 34);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
}
exports.AdvertisingTabEnemy = AdvertisingTabEnemy;
//# sourceMappingURL=AdvertisingTabEnemy.js.map