"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.ReignsCard = void 0;
const GameUtils_1 = require("../../../Game/GameUtils");
class ReignsCard {
  constructor() {
    this.J7 = null, this.z7 = 0
  }
  get Id() {
    return this.id()
  }
  get CardType() {
    return this.cardtype()
  }
  get CardBackground() {
    return this.cardbackground()
  }
  get CardIcon() {
    return this.cardicon()
  }
  get CardTitle() {
    return this.cardtitle()
  }
  get CardDescription() {
    return this.carddescription()
  }
  get CardHeader() {
    return this.cardheader()
  }
  __init(t, i) {
    return this.z7 = t, this.J7 = i, this
  }
  static getRootAsReignsCard(t, i) {
    return (i || new ReignsCard).__init(t.readInt32(t.position()) + t.position(), t)
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  cardtype(t) {
    var i = this.J7.__offset(this.z7, 6),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return "string" == typeof i && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(i), i
  }
  cardbackground(t) {
    var i = this.J7.__offset(this.z7, 8),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return "string" == typeof i && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(i), i
  }
  cardicon(t) {
    var i = this.J7.__offset(this.z7, 10),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return "string" == typeof i && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(i), i
  }
  cardtitle(t) {
    var i = this.J7.__offset(this.z7, 12),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return "string" == typeof i && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(i), i
  }
  carddescription(t) {
    var i = this.J7.__offset(this.z7, 14),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return "string" == typeof i && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(i), i
  }
  cardheader(t) {
    var i = this.J7.__offset(this.z7, 16),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return "string" == typeof i && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(i), i
  }
}
exports.ReignsCard = ReignsCard;
//# sourceMappingURL=ReignsCard.js.map