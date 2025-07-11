"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrackMoonPhaseActivity = undefined;
class TrackMoonPhaseActivity {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get RoleTrialId() {
    return this.roletrialid();
  }
  get DropId() {
    return this.dropid();
  }
  get PopularityNeed() {
    return this.popularityneed();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsTrackMoonPhaseActivity(t, i) {
    return (i || new TrackMoonPhaseActivity()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  roletrialid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  dropid() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  popularityneed() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.TrackMoonPhaseActivity = TrackMoonPhaseActivity;
//# sourceMappingURL=TrackMoonPhaseActivity.js.map