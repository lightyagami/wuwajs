"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueResGridExplore = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicIntInt_1 = require("./SubType/DicIntInt");
class RogueResGridExplore {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get InstId() {
    return this.instid();
  }
  get FinishCountType() {
    return GameUtils_1.GameUtils.ConvertToArray(this.finishcounttypeLength(), this.finishcounttype, this);
  }
  get CountTypeA() {
    return GameUtils_1.GameUtils.ConvertToArray(this.counttypeaLength(), this.counttypea, this);
  }
  get DescA() {
    return GameUtils_1.GameUtils.ConvertToArray(this.descaLength(), this.desca, this);
  }
  get CountTypeB() {
    return GameUtils_1.GameUtils.ConvertToArray(this.counttypebLength(), this.counttypeb, this);
  }
  get DescB() {
    return GameUtils_1.GameUtils.ConvertToArray(this.descbLength(), this.descb, this);
  }
  get ScoreMap() {
    return GameUtils_1.GameUtils.ConvertToMap(this.scoremapLength(), this.scoremapKey, this.scoremapValue, this);
  }
  scoremapKey(t) {
    return this.scoremap(t)?.key();
  }
  scoremapValue(t) {
    return this.scoremap(t)?.value();
  }
  get RankMap() {
    return GameUtils_1.GameUtils.ConvertToMap(this.rankmapLength(), this.rankmapKey, this.rankmapValue, this);
  }
  rankmapKey(t) {
    return this.rankmap(t)?.key();
  }
  rankmapValue(t) {
    return this.rankmap(t)?.value();
  }
  get DropMap() {
    return GameUtils_1.GameUtils.ConvertToMap(this.dropmapLength(), this.dropmapKey, this.dropmapValue, this);
  }
  dropmapKey(t) {
    return this.dropmap(t)?.key();
  }
  dropmapValue(t) {
    return this.dropmap(t)?.value();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsRogueResGridExplore(t, s) {
    return (s || new RogueResGridExplore()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  instid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetFinishcounttypeAt(t) {
    return this.finishcounttype(t);
  }
  finishcounttype(t, s) {
    var i = this.J7.__offset(this.z7, 8);
    var i = i ? this.J7.__string(this.J7.__vector(this.z7 + i) + t * 4, s) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  finishcounttypeLength() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetCounttypeaAt(t) {
    return this.counttypea(t);
  }
  counttypea(t, s) {
    var i = this.J7.__offset(this.z7, 10);
    var i = i ? this.J7.__string(this.J7.__vector(this.z7 + i) + t * 4, s) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  counttypeaLength() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetDescaAt(t) {
    return this.desca(t);
  }
  desca(t, s) {
    var i = this.J7.__offset(this.z7, 12);
    var i = i ? this.J7.__string(this.J7.__vector(this.z7 + i) + t * 4, s) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  descaLength() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetCounttypebAt(t) {
    return this.counttypeb(t);
  }
  counttypeb(t) {
    var s = this.J7.__offset(this.z7, 14);
    if (s) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + s) + t * 4);
    } else {
      return 0;
    }
  }
  counttypebLength() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  counttypebArray() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetDescbAt(t) {
    return this.descb(t);
  }
  descb(t, s) {
    var i = this.J7.__offset(this.z7, 16);
    var i = i ? this.J7.__string(this.J7.__vector(this.z7 + i) + t * 4, s) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  descbLength() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetScoremapAt(t, s) {
    return this.scoremap(t);
  }
  scoremap(t, s) {
    var i = this.J7.__offset(this.z7, 18);
    if (i) {
      return (s || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + i) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  scoremapLength() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetRankmapAt(t, s) {
    return this.rankmap(t);
  }
  rankmap(t, s) {
    var i = this.J7.__offset(this.z7, 20);
    if (i) {
      return (s || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + i) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  rankmapLength() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetDropmapAt(t, s) {
    return this.dropmap(t);
  }
  dropmap(t, s) {
    var i = this.J7.__offset(this.z7, 22);
    if (i) {
      return (s || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + i) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  dropmapLength() {
    var t = this.J7.__offset(this.z7, 22);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.RogueResGridExplore = RogueResGridExplore;
//# sourceMappingURL=RogueResGridExplore.js.map