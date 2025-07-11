"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RacingBetsSeason = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class RacingBetsSeason {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get MoneyId() {
    return this.moneyid();
  }
  get EndReward() {
    return this.endreward();
  }
  get GroupMatches() {
    return GameUtils_1.GameUtils.ConvertToArray(this.groupmatchesLength(), this.groupmatches, this);
  }
  get OddsUpdate() {
    return GameUtils_1.GameUtils.ConvertToArray(this.oddsupdateLength(), this.oddsupdate, this);
  }
  get GearNum() {
    return this.gearnum();
  }
  get LegMatchRoundMinTime() {
    return this.legmatchroundmintime();
  }
  get DungeonInstanceId() {
    return this.dungeoninstanceid();
  }
  get DungeonEntranceId() {
    return this.dungeonentranceid();
  }
  get ButtleScreenCD() {
    return this.buttlescreencd();
  }
  get RandomSeedIndex() {
    return this.randomseedindex();
  }
  get EndMailId() {
    return this.endmailid();
  }
  get CalcRankDelay() {
    return this.calcrankdelay();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsRacingBetsSeason(t, s) {
    return (s || new RacingBetsSeason()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  moneyid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  endreward() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetGroupmatchesAt(t) {
    return this.groupmatches(t);
  }
  groupmatches(t) {
    var s = this.J7.__offset(this.z7, 10);
    if (s) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + s) + t * 4);
    } else {
      return 0;
    }
  }
  groupmatchesLength() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  groupmatchesArray() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetOddsupdateAt(t) {
    return this.oddsupdate(t);
  }
  oddsupdate(t) {
    var s = this.J7.__offset(this.z7, 12);
    if (s) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + s) + t * 4);
    } else {
      return 0;
    }
  }
  oddsupdateLength() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  oddsupdateArray() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  gearnum() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  legmatchroundmintime() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  dungeoninstanceid() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  dungeonentranceid() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  buttlescreencd() {
    var t = this.J7.__offset(this.z7, 22);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  randomseedindex() {
    var t = this.J7.__offset(this.z7, 24);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  endmailid() {
    var t = this.J7.__offset(this.z7, 26);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  calcrankdelay() {
    var t = this.J7.__offset(this.z7, 28);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.RacingBetsSeason = RacingBetsSeason;
//# sourceMappingURL=RacingBetsSeason.js.map