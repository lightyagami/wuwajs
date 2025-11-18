"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryRandomLevelPlay = undefined;
class HonamiStoryRandomLevelPlay {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get Group() {
    return this.group();
  }
  get BTId() {
    return this.btid();
  }
  get Weight() {
    return this.weight();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsHonamiStoryRandomLevelPlay(t, i) {
    return (i || new HonamiStoryRandomLevelPlay()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  group() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  btid() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  weight() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.HonamiStoryRandomLevelPlay = HonamiStoryRandomLevelPlay;
//# sourceMappingURL=HonamiStoryRandomLevelPlay.js.map