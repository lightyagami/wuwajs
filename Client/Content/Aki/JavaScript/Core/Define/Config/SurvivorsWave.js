"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurvivorsWave = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicStringInt_1 = require("./SubType/DicStringInt");
class SurvivorsWave {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get Level() {
    return this.level();
  }
  get Wave() {
    return this.wave();
  }
  get WaveConditions() {
    return GameUtils_1.GameUtils.ConvertToArray(this.waveconditionsLength(), this.waveconditions, this);
  }
  get WaveTime() {
    return this.wavetime();
  }
  get EndlessModeWaveTime() {
    return this.endlessmodewavetime();
  }
  get ConditionSpawnIds() {
    return GameUtils_1.GameUtils.ConvertToArray(this.conditionspawnidsLength(), this.conditionspawnids, this);
  }
  get EndlessModeConditionSpawnIds() {
    return GameUtils_1.GameUtils.ConvertToArray(this.endlessmodeconditionspawnidsLength(), this.endlessmodeconditionspawnids, this);
  }
  get WaveType() {
    return this.wavetype();
  }
  get TreasurePool() {
    return GameUtils_1.GameUtils.ConvertToMap(this.treasurepoolLength(), this.treasurepoolKey, this.treasurepoolValue, this);
  }
  treasurepoolKey(t) {
    return this.treasurepool(t)?.key();
  }
  treasurepoolValue(t) {
    return this.treasurepool(t)?.value();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsSurvivorsWave(t, i) {
    return (i || new SurvivorsWave()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  level() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  wave() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetWaveconditionsAt(t) {
    return this.waveconditions(t);
  }
  waveconditions(t) {
    var i = this.J7.__offset(this.z7, 10);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  waveconditionsLength() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  waveconditionsArray() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  wavetime() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  endlessmodewavetime() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetConditionspawnidsAt(t) {
    return this.conditionspawnids(t);
  }
  conditionspawnids(t) {
    var i = this.J7.__offset(this.z7, 16);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  conditionspawnidsLength() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  conditionspawnidsArray() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetEndlessmodeconditionspawnidsAt(t) {
    return this.endlessmodeconditionspawnids(t);
  }
  endlessmodeconditionspawnids(t) {
    var i = this.J7.__offset(this.z7, 18);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  endlessmodeconditionspawnidsLength() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  endlessmodeconditionspawnidsArray() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  wavetype() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetTreasurepoolAt(t, i) {
    return this.treasurepool(t);
  }
  treasurepool(t, i) {
    var s = this.J7.__offset(this.z7, 22);
    if (s) {
      return (i || new DicStringInt_1.DicStringInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  treasurepoolLength() {
    var t = this.J7.__offset(this.z7, 22);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.SurvivorsWave = SurvivorsWave;
//# sourceMappingURL=SurvivorsWave.js.map