"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AchievementStarLevel = undefined;
class AchievementStarLevel {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Level() {
    return this.level();
  }
  get DropId() {
    return this.dropid();
  }
  __init(t, e) {
    this.z7 = t;
    this.J7 = e;
    return this;
  }
  static getRootAsAchievementStarLevel(t, e) {
    return (e || new AchievementStarLevel()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  level() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  dropid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.AchievementStarLevel = AchievementStarLevel;
//# sourceMappingURL=AchievementStarLevel.js.map