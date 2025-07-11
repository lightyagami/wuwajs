"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FeedingAnimal = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class FeedingAnimal {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get ItemIds() {
    return GameUtils_1.GameUtils.ConvertToArray(this.itemidsLength(), this.itemids, this);
  }
  get GameplayTags() {
    return GameUtils_1.GameUtils.ConvertToArray(this.gameplaytagsLength(), this.gameplaytags, this);
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsFeedingAnimal(t, i) {
    return (i || new FeedingAnimal()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetItemidsAt(t) {
    return this.itemids(t);
  }
  itemids(t) {
    var i = this.J7.__offset(this.z7, 6);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  itemidsLength() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  itemidsArray() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetGameplaytagsAt(t) {
    return this.gameplaytags(t);
  }
  gameplaytags(t, i) {
    var s = this.J7.__offset(this.z7, 8);
    var s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + t * 4, i) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  gameplaytagsLength() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.FeedingAnimal = FeedingAnimal;
//# sourceMappingURL=FeedingAnimal.js.map