"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CorniceQuest = undefined;
class CorniceQuest {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get QuestId() {
    return this.questid();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsCorniceQuest(t, s) {
    return (s || new CorniceQuest()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  questid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.CorniceQuest = CorniceQuest;
//# sourceMappingURL=CorniceQuest.js.map