"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FishingItem = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicIntInt_1 = require("./SubType/DicIntInt");
const IntArray_1 = require("./SubType/IntArray");
class FishingItem {
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
  get Category() {
    return this.category();
  }
  get Name() {
    return this.name();
  }
  get Desc() {
    return this.desc();
  }
  get Pic() {
    return this.pic();
  }
  get Icon() {
    return this.icon();
  }
  get Shap() {
    return this.shap();
  }
  get Quality() {
    return this.quality();
  }
  get Tech() {
    return GameUtils_1.GameUtils.ConvertToArray(this.techLength(), this.tech, this);
  }
  get Price() {
    return GameUtils_1.GameUtils.ConvertToArray(this.priceLength(), this.price, this);
  }
  get SizeWeight() {
    return GameUtils_1.GameUtils.ConvertToArray(this.sizeweightLength(), this.sizeweight, this);
  }
  get Relation() {
    return this.relation();
  }
  get ChildRelation() {
    return this.childrelation();
  }
  get ConvertItem() {
    return GameUtils_1.GameUtils.ConvertToMap(this.convertitemLength(), this.convertitemKey, this.convertitemValue, this);
  }
  convertitemKey(t) {
    return this.convertitem(t)?.key();
  }
  convertitemValue(t) {
    return this.convertitem(t)?.value();
  }
  get CanDelete() {
    return this.candelete();
  }
  get DetectionUnlockCondition() {
    return this.detectionunlockcondition();
  }
  get Area() {
    return GameUtils_1.GameUtils.ConvertToArray(this.areaLength(), this.area, this);
  }
  get Time() {
    return this.time();
  }
  get Color() {
    return this.color();
  }
  get Sprite() {
    return this.sprite();
  }
  get IllustratedNum() {
    return this.illustratednum();
  }
  get Reputation() {
    return this.reputation();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsFishingItem(t, i) {
    return (i || new FishingItem()).__init(t.readInt32(t.position()) + t.position(), t);
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
  category() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  name(t) {
    var i = this.J7.__offset(this.z7, 10);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  desc(t) {
    var i = this.J7.__offset(this.z7, 12);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  pic(t) {
    var i = this.J7.__offset(this.z7, 14);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  icon(t) {
    var i = this.J7.__offset(this.z7, 16);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  shap() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  quality() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 2;
    }
  }
  GetTechAt(t) {
    return this.tech(t);
  }
  tech(t) {
    var i = this.J7.__offset(this.z7, 22);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  techLength() {
    var t = this.J7.__offset(this.z7, 22);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  techArray() {
    var t = this.J7.__offset(this.z7, 22);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetPriceAt(t) {
    return this.price(t);
  }
  price(t) {
    var i = this.J7.__offset(this.z7, 24);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  priceLength() {
    var t = this.J7.__offset(this.z7, 24);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  priceArray() {
    var t = this.J7.__offset(this.z7, 24);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetSizeweightAt(t, i) {
    return this.sizeweight(t);
  }
  sizeweight(t, i) {
    var s = this.J7.__offset(this.z7, 26);
    if (s) {
      return (i || new IntArray_1.IntArray()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  sizeweightLength() {
    var t = this.J7.__offset(this.z7, 26);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  relation() {
    var t = this.J7.__offset(this.z7, 28);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  childrelation() {
    var t = this.J7.__offset(this.z7, 30);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetConvertitemAt(t, i) {
    return this.convertitem(t);
  }
  convertitem(t, i) {
    var s = this.J7.__offset(this.z7, 32);
    if (s) {
      return (i || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  convertitemLength() {
    var t = this.J7.__offset(this.z7, 32);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  candelete() {
    var t = this.J7.__offset(this.z7, 34);
    return !t || !!this.J7.readInt8(this.z7 + t);
  }
  detectionunlockcondition() {
    var t = this.J7.__offset(this.z7, 36);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetAreaAt(t) {
    return this.area(t);
  }
  area(t) {
    var i = this.J7.__offset(this.z7, 38);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  areaLength() {
    var t = this.J7.__offset(this.z7, 38);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  areaArray() {
    var t = this.J7.__offset(this.z7, 38);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  time() {
    var t = this.J7.__offset(this.z7, 40);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  color(t) {
    var i = this.J7.__offset(this.z7, 42);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  sprite(t) {
    var i = this.J7.__offset(this.z7, 44);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  illustratednum() {
    var t = this.J7.__offset(this.z7, 46);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  reputation() {
    var t = this.J7.__offset(this.z7, 48);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.FishingItem = FishingItem;
//# sourceMappingURL=FishingItem.js.map