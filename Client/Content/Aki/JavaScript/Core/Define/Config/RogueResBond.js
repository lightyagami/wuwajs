"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueResBond = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicIntInt_1 = require("./SubType/DicIntInt");
const DicIntIntArray_1 = require("./SubType/DicIntIntArray");
const DicIntString_1 = require("./SubType/DicIntString");
class RogueResBond {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get Rarity() {
    return this.rarity();
  }
  get ActLinkNum() {
    return this.actlinknum();
  }
  get StarMapType() {
    return this.starmaptype();
  }
  get StarMap() {
    return GameUtils_1.GameUtils.ConvertToMap(this.starmapLength(), this.starmapKey, this.starmapValue, this);
  }
  starmapKey(t) {
    return this.starmap(t)?.key();
  }
  starmapValue(t) {
    return this.starmap(t)?.value();
  }
  get BattleEffect() {
    return GameUtils_1.GameUtils.ConvertToMap(this.battleeffectLength(), this.battleeffectKey, this.battleeffectValue, this);
  }
  battleeffectKey(t) {
    return this.battleeffect(t)?.key();
  }
  battleeffectValue(t) {
    return this.battleeffect(t)?.value();
  }
  get ExploreEffect() {
    return GameUtils_1.GameUtils.ConvertToMap(this.exploreeffectLength(), this.exploreeffectKey, this.exploreeffectValue, this);
  }
  exploreeffectKey(t) {
    return this.exploreeffect(t)?.key();
  }
  exploreeffectValue(t) {
    return this.exploreeffect(t)?.value();
  }
  get LinkRule() {
    return GameUtils_1.GameUtils.ConvertToArray(this.linkruleLength(), this.linkrule, this);
  }
  get LinkEffect() {
    return GameUtils_1.GameUtils.ConvertToMap(this.linkeffectLength(), this.linkeffectKey, this.linkeffectValue, this);
  }
  linkeffectKey(t) {
    return this.linkeffect(t)?.key();
  }
  linkeffectValue(t) {
    return this.linkeffect(t)?.value();
  }
  get Cond() {
    return this.cond();
  }
  get Icon() {
    return this.icon();
  }
  get Name() {
    return this.name();
  }
  get FightEffectDesc() {
    return GameUtils_1.GameUtils.ConvertToArray(this.fighteffectdescLength(), this.fighteffectdesc, this);
  }
  get FightEffectDescParam() {
    return GameUtils_1.GameUtils.ConvertToArray(this.fighteffectdescparamLength(), this.fighteffectdescparam, this);
  }
  get ExploreEffectDesc() {
    return GameUtils_1.GameUtils.ConvertToArray(this.exploreeffectdescLength(), this.exploreeffectdesc, this);
  }
  get ExploreEffectDescParam() {
    return GameUtils_1.GameUtils.ConvertToArray(this.exploreeffectdescparamLength(), this.exploreeffectdescparam, this);
  }
  get LinkEffectDesc() {
    return GameUtils_1.GameUtils.ConvertToMap(this.linkeffectdescLength(), this.linkeffectdescKey, this.linkeffectdescValue, this);
  }
  linkeffectdescKey(t) {
    return this.linkeffectdesc(t)?.key();
  }
  linkeffectdescValue(t) {
    return this.linkeffectdesc(t)?.value();
  }
  get LinkEffectDescParam() {
    return GameUtils_1.GameUtils.ConvertToMap(this.linkeffectdescparamLength(), this.linkeffectdescparamKey, this.linkeffectdescparamValue, this);
  }
  linkeffectdescparamKey(t) {
    return this.linkeffectdescparam(t)?.key();
  }
  linkeffectdescparamValue(t) {
    return this.linkeffectdescparam(t)?.value();
  }
  __init(t, e) {
    this.z7 = t;
    this.J7 = e;
    return this;
  }
  static getRootAsRogueResBond(t, e) {
    return (e || new RogueResBond()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  rarity() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  actlinknum() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 3;
    }
  }
  starmaptype() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 1;
    }
  }
  GetStarmapAt(t, e) {
    return this.starmap(t);
  }
  starmap(t, e) {
    var i = this.J7.__offset(this.z7, 12);
    if (i) {
      return (e || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + i) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  starmapLength() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetBattleeffectAt(t, e) {
    return this.battleeffect(t);
  }
  battleeffect(t, e) {
    var i = this.J7.__offset(this.z7, 14);
    if (i) {
      return (e || new DicIntIntArray_1.DicIntIntArray()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + i) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  battleeffectLength() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetExploreeffectAt(t, e) {
    return this.exploreeffect(t);
  }
  exploreeffect(t, e) {
    var i = this.J7.__offset(this.z7, 16);
    if (i) {
      return (e || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + i) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  exploreeffectLength() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetLinkruleAt(t) {
    return this.linkrule(t);
  }
  linkrule(t) {
    var e = this.J7.__offset(this.z7, 18);
    if (e) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + e) + t * 4);
    } else {
      return 0;
    }
  }
  linkruleLength() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  linkruleArray() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetLinkeffectAt(t, e) {
    return this.linkeffect(t);
  }
  linkeffect(t, e) {
    var i = this.J7.__offset(this.z7, 20);
    if (i) {
      return (e || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + i) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  linkeffectLength() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  cond() {
    var t = this.J7.__offset(this.z7, 22);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  icon(t) {
    var e = this.J7.__offset(this.z7, 24);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  name(t) {
    var e = this.J7.__offset(this.z7, 26);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  GetFighteffectdescAt(t) {
    return this.fighteffectdesc(t);
  }
  fighteffectdesc(t, e) {
    var i = this.J7.__offset(this.z7, 28);
    var i = i ? this.J7.__string(this.J7.__vector(this.z7 + i) + t * 4, e) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  fighteffectdescLength() {
    var t = this.J7.__offset(this.z7, 28);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetFighteffectdescparamAt(t) {
    return this.fighteffectdescparam(t);
  }
  fighteffectdescparam(t, e) {
    var i = this.J7.__offset(this.z7, 30);
    var i = i ? this.J7.__string(this.J7.__vector(this.z7 + i) + t * 4, e) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  fighteffectdescparamLength() {
    var t = this.J7.__offset(this.z7, 30);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetExploreeffectdescAt(t) {
    return this.exploreeffectdesc(t);
  }
  exploreeffectdesc(t, e) {
    var i = this.J7.__offset(this.z7, 32);
    var i = i ? this.J7.__string(this.J7.__vector(this.z7 + i) + t * 4, e) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  exploreeffectdescLength() {
    var t = this.J7.__offset(this.z7, 32);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetExploreeffectdescparamAt(t) {
    return this.exploreeffectdescparam(t);
  }
  exploreeffectdescparam(t, e) {
    var i = this.J7.__offset(this.z7, 34);
    var i = i ? this.J7.__string(this.J7.__vector(this.z7 + i) + t * 4, e) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  exploreeffectdescparamLength() {
    var t = this.J7.__offset(this.z7, 34);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetLinkeffectdescAt(t, e) {
    return this.linkeffectdesc(t);
  }
  linkeffectdesc(t, e) {
    var i = this.J7.__offset(this.z7, 36);
    if (i) {
      return (e || new DicIntString_1.DicIntString()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + i) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  linkeffectdescLength() {
    var t = this.J7.__offset(this.z7, 36);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetLinkeffectdescparamAt(t, e) {
    return this.linkeffectdescparam(t);
  }
  linkeffectdescparam(t, e) {
    var i = this.J7.__offset(this.z7, 38);
    if (i) {
      return (e || new DicIntString_1.DicIntString()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + i) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  linkeffectdescparamLength() {
    var t = this.J7.__offset(this.z7, 38);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.RogueResBond = RogueResBond;
//# sourceMappingURL=RogueResBond.js.map