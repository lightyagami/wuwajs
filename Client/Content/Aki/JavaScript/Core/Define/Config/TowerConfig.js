"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TowerConfig = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const IntPair_1 = require("./SubType/IntPair");
class TowerConfig {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get Season() {
    return this.season();
  }
  get Difficulty() {
    return this.difficulty();
  }
  get AreaNum() {
    return this.areanum();
  }
  get Floor() {
    return this.floor();
  }
  get InstanceId() {
    return this.instanceid();
  }
  get AreaName() {
    return this.areaname();
  }
  get Cost() {
    return this.cost();
  }
  get RecommendElement() {
    return GameUtils_1.GameUtils.ConvertToArray(this.recommendelementLength(), this.recommendelement, this);
  }
  get ShowMonsters() {
    return GameUtils_1.GameUtils.ConvertToArray(this.showmonstersLength(), this.showmonsters, this);
  }
  get ShowMonstersAndLevel() {
    return GameUtils_1.GameUtils.ConvertToArray(this.showmonstersandlevelLength(), this.showmonstersandlevel, this);
  }
  get ShowBuffs() {
    return GameUtils_1.GameUtils.ConvertToArray(this.showbuffsLength(), this.showbuffs, this);
  }
  get RoleBuff() {
    return GameUtils_1.GameUtils.ConvertToArray(this.rolebuffLength(), this.rolebuff, this);
  }
  get MonsterBuff() {
    return GameUtils_1.GameUtils.ConvertToArray(this.monsterbuffLength(), this.monsterbuff, this);
  }
  get Target() {
    return GameUtils_1.GameUtils.ConvertToArray(this.targetLength(), this.target, this);
  }
  get TargetConfig() {
    return GameUtils_1.GameUtils.ConvertToArray(this.targetconfigLength(), this.targetconfig, this);
  }
  get BgPath() {
    return this.bgpath();
  }
  get ItemBgPath() {
    return this.itembgpath();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsTowerConfig(t, s) {
    return (s || new TowerConfig()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  season() {
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
  areanum() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  floor() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  instanceid() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  areaname(t) {
    var s = this.J7.__offset(this.z7, 16);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  cost() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetRecommendelementAt(t) {
    return this.recommendelement(t);
  }
  recommendelement(t) {
    var s = this.J7.__offset(this.z7, 20);
    if (s) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + s) + t * 4);
    } else {
      return 0;
    }
  }
  recommendelementLength() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  recommendelementArray() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetShowmonstersAt(t) {
    return this.showmonsters(t);
  }
  showmonsters(t) {
    var s = this.J7.__offset(this.z7, 22);
    if (s) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + s) + t * 4);
    } else {
      return 0;
    }
  }
  showmonstersLength() {
    var t = this.J7.__offset(this.z7, 22);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  showmonstersArray() {
    var t = this.J7.__offset(this.z7, 22);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetShowmonstersandlevelAt(t, s) {
    return this.showmonstersandlevel(t);
  }
  showmonstersandlevel(t, s) {
    var i = this.J7.__offset(this.z7, 24);
    if (i) {
      return (s || new IntPair_1.IntPair()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + i) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  showmonstersandlevelLength() {
    var t = this.J7.__offset(this.z7, 24);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetShowbuffsAt(t) {
    return this.showbuffs(t);
  }
  showbuffs(t) {
    var s = this.J7.__offset(this.z7, 26);
    if (s) {
      return this.J7.readFloat64(this.J7.__vector(this.z7 + s) + t * 8);
    } else {
      return 0;
    }
  }
  showbuffsLength() {
    var t = this.J7.__offset(this.z7, 26);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  showbuffsArray() {
    var t = this.J7.__offset(this.z7, 26);
    if (t) {
      return new Float64Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetRolebuffAt(t) {
    return this.rolebuff(t);
  }
  rolebuff(t) {
    var s = this.J7.__offset(this.z7, 28);
    if (s) {
      return this.J7.readFloat64(this.J7.__vector(this.z7 + s) + t * 8);
    } else {
      return 0;
    }
  }
  rolebuffLength() {
    var t = this.J7.__offset(this.z7, 28);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  rolebuffArray() {
    var t = this.J7.__offset(this.z7, 28);
    if (t) {
      return new Float64Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetMonsterbuffAt(t) {
    return this.monsterbuff(t);
  }
  monsterbuff(t) {
    var s = this.J7.__offset(this.z7, 30);
    if (s) {
      return this.J7.readFloat64(this.J7.__vector(this.z7 + s) + t * 8);
    } else {
      return 0;
    }
  }
  monsterbuffLength() {
    var t = this.J7.__offset(this.z7, 30);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  monsterbuffArray() {
    var t = this.J7.__offset(this.z7, 30);
    if (t) {
      return new Float64Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetTargetAt(t) {
    return this.target(t);
  }
  target(t) {
    var s = this.J7.__offset(this.z7, 32);
    if (s) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + s) + t * 4);
    } else {
      return 0;
    }
  }
  targetLength() {
    var t = this.J7.__offset(this.z7, 32);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  targetArray() {
    var t = this.J7.__offset(this.z7, 32);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetTargetconfigAt(t) {
    return this.targetconfig(t);
  }
  targetconfig(t) {
    var s = this.J7.__offset(this.z7, 34);
    if (s) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + s) + t * 4);
    } else {
      return 0;
    }
  }
  targetconfigLength() {
    var t = this.J7.__offset(this.z7, 34);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  targetconfigArray() {
    var t = this.J7.__offset(this.z7, 34);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  bgpath(t) {
    var s = this.J7.__offset(this.z7, 36);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  itembgpath(t) {
    var s = this.J7.__offset(this.z7, 38);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
}
exports.TowerConfig = TowerConfig;
//# sourceMappingURL=TowerConfig.js.map