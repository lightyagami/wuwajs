"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FavorLevel = undefined;
class FavorLevel {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Level() {
    return this.level();
  }
  get LevelUpExp() {
    return this.levelupexp();
  }
  __init(t, e) {
    this.z7 = t;
    this.J7 = e;
    return this;
  }
  static getRootAsFavorLevel(t, e) {
    return (e || new FavorLevel()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  level() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  levelupexp() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.FavorLevel = FavorLevel;
//# sourceMappingURL=FavorLevel.js.map