"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorSkinShow = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicStringInt_1 = require("./SubType/DicStringInt");
class MotorSkinShow {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get QualityId() {
    return this.qualityid();
  }
  get FreeItem() {
    return this.freeitem();
  }
  get ItemCount() {
    return GameUtils_1.GameUtils.ConvertToMap(this.itemcountLength(), this.itemcountKey, this.itemcountValue, this);
  }
  itemcountKey(t) {
    return this.itemcount(t)?.key();
  }
  itemcountValue(t) {
    return this.itemcount(t)?.value();
  }
  get Icon() {
    return this.icon();
  }
  get Name() {
    return this.name();
  }
  get TypeDescription() {
    return this.typedescription();
  }
  get Desc() {
    return this.desc();
  }
  get JumpDiyRoot() {
    return this.jumpdiyroot();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsMotorSkinShow(t, i) {
    return (i || new MotorSkinShow()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  qualityid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  freeitem() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetItemcountAt(t, i) {
    return this.itemcount(t);
  }
  itemcount(t, i) {
    var s = this.J7.__offset(this.z7, 10);
    if (s) {
      return (i || new DicStringInt_1.DicStringInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  itemcountLength() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  icon(t) {
    var i = this.J7.__offset(this.z7, 12);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  name(t) {
    var i = this.J7.__offset(this.z7, 14);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  typedescription(t) {
    var i = this.J7.__offset(this.z7, 16);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  desc(t) {
    var i = this.J7.__offset(this.z7, 18);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  jumpdiyroot() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 1;
    }
  }
}
exports.MotorSkinShow = MotorSkinShow;
//# sourceMappingURL=MotorSkinShow.js.map