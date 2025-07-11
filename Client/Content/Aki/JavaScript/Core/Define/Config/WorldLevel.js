"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WorldLevel = undefined;
class WorldLevel {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get PlayerLevelMax() {
    return this.playerlevelmax();
  }
  get ConditionGroupId() {
    return this.conditiongroupid();
  }
  get AiTeamLevelId() {
    return this.aiteamlevelid();
  }
  get TrainingLevel() {
    return this.traininglevel();
  }
  __init(t, e) {
    this.z7 = t;
    this.J7 = e;
    return this;
  }
  static getRootAsWorldLevel(t, e) {
    return (e || new WorldLevel()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  playerlevelmax() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  conditiongroupid() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  aiteamlevelid() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  traininglevel() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.WorldLevel = WorldLevel;
//# sourceMappingURL=WorldLevel.js.map