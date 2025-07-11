"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoraleLevelDiffShow = undefined;
class MoraleLevelDiffShow {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get LevelDiffLower() {
    return this.leveldifflower();
  }
  get LevelDiffUpper() {
    return this.leveldiffupper();
  }
  get MonsterLevelPattern() {
    return this.monsterlevelpattern();
  }
  __init(t, e) {
    this.z7 = t;
    this.J7 = e;
    return this;
  }
  static getRootAsMoraleLevelDiffShow(t, e) {
    return (e || new MoraleLevelDiffShow()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  leveldifflower() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  leveldiffupper() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  monsterlevelpattern() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.MoraleLevelDiffShow = MoraleLevelDiffShow;
//# sourceMappingURL=MoraleLevelDiffShow.js.map