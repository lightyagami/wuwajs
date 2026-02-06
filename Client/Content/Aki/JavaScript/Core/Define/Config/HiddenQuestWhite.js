"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HiddenQuestWhite = undefined;
class HiddenQuestWhite {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get QuestId() {
    return this.questid();
  }
  __init(t, e) {
    this.z7 = t;
    this.J7 = e;
    return this;
  }
  static getRootAsHiddenQuestWhite(t, e) {
    return (e || new HiddenQuestWhite()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  questid() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.HiddenQuestWhite = HiddenQuestWhite;
//# sourceMappingURL=HiddenQuestWhite.js.map