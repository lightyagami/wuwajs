"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchSubIns = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicIntInt_1 = require("./SubType/DicIntInt");
const DicIntString_1 = require("./SubType/DicIntString");
class FloroRanchSubIns {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get ActivityId() {
    return this.activityid();
  }
  get Difficulty() {
    return this.difficulty();
  }
  get Tag() {
    return this.tag();
  }
  get Race() {
    return GameUtils_1.GameUtils.ConvertToArray(this.raceLength(), this.race, this);
  }
  get Stage() {
    return this.stage();
  }
  get StageDays() {
    return GameUtils_1.GameUtils.ConvertToArray(this.stagedaysLength(), this.stagedays, this);
  }
  get Goal() {
    return GameUtils_1.GameUtils.ConvertToArray(this.goalLength(), this.goal, this);
  }
  get FirstTechReward() {
    return this.firsttechreward();
  }
  get TechReward() {
    return GameUtils_1.GameUtils.ConvertToArray(this.techrewardLength(), this.techreward, this);
  }
  get ToyReward() {
    return GameUtils_1.GameUtils.ConvertToArray(this.toyrewardLength(), this.toyreward, this);
  }
  get FirstWinReward() {
    return GameUtils_1.GameUtils.ConvertToMap(this.firstwinrewardLength(), this.firstwinrewardKey, this.firstwinrewardValue, this);
  }
  firstwinrewardKey(t) {
    return this.firstwinreward(t)?.key();
  }
  firstwinrewardValue(t) {
    return this.firstwinreward(t)?.value();
  }
  get Terrain() {
    return GameUtils_1.GameUtils.ConvertToMap(this.terrainLength(), this.terrainKey, this.terrainValue, this);
  }
  terrainKey(t) {
    return this.terrain(t)?.key();
  }
  terrainValue(t) {
    return this.terrain(t)?.value();
  }
  get CardBase() {
    return GameUtils_1.GameUtils.ConvertToArray(this.cardbaseLength(), this.cardbase, this);
  }
  get Card() {
    return GameUtils_1.GameUtils.ConvertToMap(this.cardLength(), this.cardKey, this.cardValue, this);
  }
  cardKey(t) {
    return this.card(t)?.key();
  }
  cardValue(t) {
    return this.card(t)?.value();
  }
  get StartToy() {
    return GameUtils_1.GameUtils.ConvertToArray(this.starttoyLength(), this.starttoy, this);
  }
  get EventGroup() {
    return this.eventgroup();
  }
  get EndlessMode() {
    return this.endlessmode();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsFloroRanchSubIns(t, i) {
    return (i || new FloroRanchSubIns()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  activityid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  difficulty() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  tag() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetRaceAt(t) {
    return this.race(t);
  }
  race(t) {
    var i = this.J7.__offset(this.z7, 12);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  raceLength() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  raceArray() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  stage() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetStagedaysAt(t) {
    return this.stagedays(t);
  }
  stagedays(t) {
    var i = this.J7.__offset(this.z7, 16);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  stagedaysLength() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  stagedaysArray() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetGoalAt(t) {
    return this.goal(t);
  }
  goal(t) {
    var i = this.J7.__offset(this.z7, 18);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  goalLength() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  goalArray() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  firsttechreward() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetTechrewardAt(t) {
    return this.techreward(t);
  }
  techreward(t) {
    var i = this.J7.__offset(this.z7, 22);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  techrewardLength() {
    var t = this.J7.__offset(this.z7, 22);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  techrewardArray() {
    var t = this.J7.__offset(this.z7, 22);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetToyrewardAt(t) {
    return this.toyreward(t);
  }
  toyreward(t) {
    var i = this.J7.__offset(this.z7, 24);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  toyrewardLength() {
    var t = this.J7.__offset(this.z7, 24);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  toyrewardArray() {
    var t = this.J7.__offset(this.z7, 24);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetFirstwinrewardAt(t, i) {
    return this.firstwinreward(t);
  }
  firstwinreward(t, i) {
    var s = this.J7.__offset(this.z7, 26);
    if (s) {
      return (i || new DicIntString_1.DicIntString()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  firstwinrewardLength() {
    var t = this.J7.__offset(this.z7, 26);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetTerrainAt(t, i) {
    return this.terrain(t);
  }
  terrain(t, i) {
    var s = this.J7.__offset(this.z7, 28);
    if (s) {
      return (i || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  terrainLength() {
    var t = this.J7.__offset(this.z7, 28);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetCardbaseAt(t) {
    return this.cardbase(t);
  }
  cardbase(t) {
    var i = this.J7.__offset(this.z7, 30);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  cardbaseLength() {
    var t = this.J7.__offset(this.z7, 30);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  cardbaseArray() {
    var t = this.J7.__offset(this.z7, 30);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetCardAt(t, i) {
    return this.card(t);
  }
  card(t, i) {
    var s = this.J7.__offset(this.z7, 32);
    if (s) {
      return (i || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  cardLength() {
    var t = this.J7.__offset(this.z7, 32);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetStarttoyAt(t) {
    return this.starttoy(t);
  }
  starttoy(t) {
    var i = this.J7.__offset(this.z7, 34);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  starttoyLength() {
    var t = this.J7.__offset(this.z7, 34);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  starttoyArray() {
    var t = this.J7.__offset(this.z7, 34);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  eventgroup() {
    var t = this.J7.__offset(this.z7, 36);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  endlessmode() {
    var t = this.J7.__offset(this.z7, 38);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
}
exports.FloroRanchSubIns = FloroRanchSubIns;
//# sourceMappingURL=FloroRanchSubIns.js.map