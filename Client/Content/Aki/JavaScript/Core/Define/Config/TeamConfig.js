"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TeamConfig = undefined;
class TeamConfig {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get BuffId() {
    return this.buffid();
  }
  get InviteEffectTime() {
    return this.inviteeffecttime();
  }
  get ViolationOperationTimes() {
    return this.violationoperationtimes();
  }
  get ViolationOperationBanTime() {
    return this.violationoperationbantime();
  }
  get BanTimesCheck() {
    return this.bantimescheck();
  }
  get BBanTime() {
    return this.bbantime();
  }
  get CBanTime() {
    return this.cbantime();
  }
  get InviteCD() {
    return this.invitecd();
  }
  get NearbrPlayerCount() {
    return this.nearbrplayercount();
  }
  get NearbrPlayerCountRefreshCD() {
    return this.nearbrplayercountrefreshcd();
  }
  get ViolationOperationTimeLimit() {
    return this.violationoperationtimelimit();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsTeamConfig(t, i) {
    return (i || new TeamConfig()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  buffid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  inviteeffecttime() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  violationoperationtimes() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  violationoperationbantime() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  bantimescheck() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  bbantime() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  cbantime() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  invitecd() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  nearbrplayercount() {
    var t = this.J7.__offset(this.z7, 22);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  nearbrplayercountrefreshcd() {
    var t = this.J7.__offset(this.z7, 24);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  violationoperationtimelimit() {
    var t = this.J7.__offset(this.z7, 26);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.TeamConfig = TeamConfig;
//# sourceMappingURL=TeamConfig.js.map