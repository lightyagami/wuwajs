"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JokerDeck = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class JokerDeck {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get CardType() {
    return this.cardtype();
  }
  get CardNumber() {
    return this.cardnumber();
  }
  get TexturePath() {
    return this.texturepath();
  }
  __init(t, e) {
    this.z7 = t;
    this.J7 = e;
    return this;
  }
  static getRootAsJokerDeck(t, e) {
    return (e || new JokerDeck()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  cardtype() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  cardnumber() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  texturepath(t) {
    var e = this.J7.__offset(this.z7, 10);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
}
exports.JokerDeck = JokerDeck;
//# sourceMappingURL=JokerDeck.js.map