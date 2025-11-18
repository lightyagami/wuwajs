"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryWeapon = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicIntInt_1 = require("./SubType/DicIntInt");
class HonamiStoryWeapon {
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
  get QualityId() {
    return this.qualityid();
  }
  get PropLibraryId() {
    return this.proplibraryid();
  }
  get BuffTempId() {
    return GameUtils_1.GameUtils.ConvertToArray(this.bufftempidLength(), this.bufftempid, this);
  }
  get SuitId() {
    return GameUtils_1.GameUtils.ConvertToArray(this.suitidLength(), this.suitid, this);
  }
  get PhantomItemId() {
    return this.phantomitemid();
  }
  get ExtraSuitAddEnhanceLevel() {
    return GameUtils_1.GameUtils.ConvertToMap(this.extrasuitaddenhancelevelLength(), this.extrasuitaddenhancelevelKey, this.extrasuitaddenhancelevelValue, this);
  }
  extrasuitaddenhancelevelKey(t) {
    return this.extrasuitaddenhancelevel(t)?.key();
  }
  extrasuitaddenhancelevelValue(t) {
    return this.extrasuitaddenhancelevel(t)?.value();
  }
  get PluginTags() {
    return GameUtils_1.GameUtils.ConvertToArray(this.plugintagsLength(), this.plugintags, this);
  }
  get AttributesDescription() {
    return this.attributesdescription();
  }
  get AttributesDescriptionArgs() {
    return GameUtils_1.GameUtils.ConvertToArray(this.attributesdescriptionargsLength(), this.attributesdescriptionargs, this);
  }
  get AttributesDescriptionSimple() {
    return this.attributesdescriptionsimple();
  }
  get AttributesDescriptionSimpleArgs() {
    return GameUtils_1.GameUtils.ConvertToArray(this.attributesdescriptionsimpleargsLength(), this.attributesdescriptionsimpleargs, this);
  }
  get Icon() {
    return this.icon();
  }
  get IconToggle() {
    return this.icontoggle();
  }
  get Type() {
    return this.type();
  }
  get Name() {
    return this.name();
  }
  get GetWayDes() {
    return this.getwaydes();
  }
  get LockDescription() {
    return this.lockdescription();
  }
  get IsShowReward() {
    return this.isshowreward();
  }
  get TypeDescription() {
    return this.typedescription();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsHonamiStoryWeapon(t, i) {
    return (i || new HonamiStoryWeapon()).__init(t.readInt32(t.position()) + t.position(), t);
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
  qualityid() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 1;
    }
  }
  proplibraryid() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetBufftempidAt(t) {
    return this.bufftempid(t);
  }
  bufftempid(t) {
    var i = this.J7.__offset(this.z7, 12);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  bufftempidLength() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  bufftempidArray() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetSuitidAt(t) {
    return this.suitid(t);
  }
  suitid(t) {
    var i = this.J7.__offset(this.z7, 14);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  suitidLength() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  suitidArray() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  phantomitemid() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetExtrasuitaddenhancelevelAt(t, i) {
    return this.extrasuitaddenhancelevel(t);
  }
  extrasuitaddenhancelevel(t, i) {
    var s = this.J7.__offset(this.z7, 18);
    if (s) {
      return (i || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  extrasuitaddenhancelevelLength() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetPlugintagsAt(t) {
    return this.plugintags(t);
  }
  plugintags(t) {
    var i = this.J7.__offset(this.z7, 20);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  plugintagsLength() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  plugintagsArray() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  attributesdescription(t) {
    var i = this.J7.__offset(this.z7, 22);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  GetAttributesdescriptionargsAt(t) {
    return this.attributesdescriptionargs(t);
  }
  attributesdescriptionargs(t, i) {
    var s = this.J7.__offset(this.z7, 24);
    var s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + t * 4, i) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  attributesdescriptionargsLength() {
    var t = this.J7.__offset(this.z7, 24);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  attributesdescriptionsimple(t) {
    var i = this.J7.__offset(this.z7, 26);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  GetAttributesdescriptionsimpleargsAt(t) {
    return this.attributesdescriptionsimpleargs(t);
  }
  attributesdescriptionsimpleargs(t, i) {
    var s = this.J7.__offset(this.z7, 28);
    var s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + t * 4, i) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  attributesdescriptionsimpleargsLength() {
    var t = this.J7.__offset(this.z7, 28);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  icon(t) {
    var i = this.J7.__offset(this.z7, 30);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  icontoggle(t) {
    var i = this.J7.__offset(this.z7, 32);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  type() {
    var t = this.J7.__offset(this.z7, 34);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  name(t) {
    var i = this.J7.__offset(this.z7, 36);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  getwaydes(t) {
    var i = this.J7.__offset(this.z7, 38);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  lockdescription(t) {
    var i = this.J7.__offset(this.z7, 40);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  isshowreward() {
    var t = this.J7.__offset(this.z7, 42);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  typedescription(t) {
    var i = this.J7.__offset(this.z7, 44);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
}
exports.HonamiStoryWeapon = HonamiStoryWeapon;
//# sourceMappingURL=HonamiStoryWeapon.js.map