"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QuestResourceWhite = undefined;
class QuestResourceWhite {
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
  static getRootAsQuestResourceWhite(t, e) {
    return (e || new QuestResourceWhite()).__init(t.readInt32(t.position()) + t.position(), t);
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
exports.QuestResourceWhite = QuestResourceWhite;
//# sourceMappingURL=QuestResourceWhite.js.map