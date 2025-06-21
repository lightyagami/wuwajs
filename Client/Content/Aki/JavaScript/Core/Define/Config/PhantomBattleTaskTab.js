"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomBattleTaskTab = void 0;
const GameUtils_1 = require("../../../Game/GameUtils");
class PhantomBattleTaskTab {
  constructor() {
    this.J7 = null, this.z7 = 0
  }
  get Id() {
    return this.id()
  }
  get Title() {
    return this.title()
  }
  get Order() {
    return this.order()
  }
  __init(t, s) {
    return this.z7 = t, this.J7 = s, this
  }
  static getRootAsPhantomBattleTaskTab(t, s) {
    return (s || new PhantomBattleTaskTab).__init(t.readInt32(t.position()) + t.position(), t)
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  title(t) {
    var s = this.J7.__offset(this.z7, 6),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return "string" == typeof s && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(s), s
  }
  order() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
}
exports.PhantomBattleTaskTab = PhantomBattleTaskTab;
//# sourceMappingURL=PhantomBattleTaskTab.js.map