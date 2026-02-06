"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DrinksRoleLikeDrink = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class DrinksRoleLikeDrink {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get LikeStatus() {
    return this.likestatus();
  }
  get LinkDrinkBase() {
    return GameUtils_1.GameUtils.ConvertToArray(this.linkdrinkbaseLength(), this.linkdrinkbase, this);
  }
  get DrinkLikePoint() {
    return this.drinklikepoint();
  }
  get LinkOrnament() {
    return GameUtils_1.GameUtils.ConvertToArray(this.linkornamentLength(), this.linkornament, this);
  }
  get OrnamentLikePoint() {
    return this.ornamentlikepoint();
  }
  get OrnamentHintId() {
    return this.ornamenthintid();
  }
  get LinkBatching() {
    return GameUtils_1.GameUtils.ConvertToArray(this.linkbatchingLength(), this.linkbatching, this);
  }
  get BatchingLikePoint() {
    return this.batchinglikepoint();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsDrinksRoleLikeDrink(t, i) {
    return (i || new DrinksRoleLikeDrink()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  likestatus() {
    var t = this.J7.__offset(this.z7, 6);
    return !t || !!this.J7.readInt8(this.z7 + t);
  }
  GetLinkdrinkbaseAt(t) {
    return this.linkdrinkbase(t);
  }
  linkdrinkbase(t) {
    var i = this.J7.__offset(this.z7, 8);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  linkdrinkbaseLength() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  linkdrinkbaseArray() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  drinklikepoint() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetLinkornamentAt(t) {
    return this.linkornament(t);
  }
  linkornament(t) {
    var i = this.J7.__offset(this.z7, 12);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  linkornamentLength() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  linkornamentArray() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  ornamentlikepoint() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  ornamenthintid(t) {
    var i = this.J7.__offset(this.z7, 16);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  GetLinkbatchingAt(t) {
    return this.linkbatching(t);
  }
  linkbatching(t) {
    var i = this.J7.__offset(this.z7, 18);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  linkbatchingLength() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  linkbatchingArray() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  batchinglikepoint() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.DrinksRoleLikeDrink = DrinksRoleLikeDrink;
//# sourceMappingURL=DrinksRoleLikeDrink.js.map