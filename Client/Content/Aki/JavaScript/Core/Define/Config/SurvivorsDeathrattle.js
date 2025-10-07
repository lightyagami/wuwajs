"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurvivorsDeathrattle = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class SurvivorsDeathrattle {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get Type() {
    return this.type();
  }
  get NearbyMonsterRadius() {
    return this.nearbymonsterradius();
  }
  get NearbyMonsterBuffs() {
    return GameUtils_1.GameUtils.ConvertToArray(this.nearbymonsterbuffsLength(), this.nearbymonsterbuffs, this);
  }
  get PolluteRadius() {
    return this.polluteradius();
  }
  get SpawnMonsters() {
    return GameUtils_1.GameUtils.ConvertToArray(this.spawnmonstersLength(), this.spawnmonsters, this);
  }
  get SpawnGoldenCoins() {
    return GameUtils_1.GameUtils.ConvertToArray(this.spawngoldencoinsLength(), this.spawngoldencoins, this);
  }
  get DropGold() {
    return this.dropgold();
  }
  get Effect() {
    return this.effect();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsSurvivorsDeathrattle(t, s) {
    return (s || new SurvivorsDeathrattle()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  type() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 1;
    }
  }
  nearbymonsterradius() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetNearbymonsterbuffsAt(t) {
    return this.nearbymonsterbuffs(t);
  }
  nearbymonsterbuffs(t) {
    var s = this.J7.__offset(this.z7, 10);
    if (s) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + s) + t * 4);
    } else {
      return 0;
    }
  }
  nearbymonsterbuffsLength() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  nearbymonsterbuffsArray() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  polluteradius() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetSpawnmonstersAt(t) {
    return this.spawnmonsters(t);
  }
  spawnmonsters(t) {
    var s = this.J7.__offset(this.z7, 14);
    if (s) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + s) + t * 4);
    } else {
      return 0;
    }
  }
  spawnmonstersLength() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  spawnmonstersArray() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetSpawngoldencoinsAt(t) {
    return this.spawngoldencoins(t);
  }
  spawngoldencoins(t) {
    var s = this.J7.__offset(this.z7, 16);
    if (s) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + s) + t * 4);
    } else {
      return 0;
    }
  }
  spawngoldencoinsLength() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  spawngoldencoinsArray() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  dropgold() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  effect() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.SurvivorsDeathrattle = SurvivorsDeathrattle;
//# sourceMappingURL=SurvivorsDeathrattle.js.map