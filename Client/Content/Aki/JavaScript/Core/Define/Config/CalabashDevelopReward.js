"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CalabashDevelopReward = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class CalabashDevelopReward {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get MonsterId() {
    return this.monsterid();
  }
  get DevelopCondition() {
    return GameUtils_1.GameUtils.ConvertToArray(this.developconditionLength(), this.developcondition, this);
  }
  get MonsterInfoId() {
    return this.monsterinfoid();
  }
  get AllExp() {
    return this.allexp();
  }
  get SortId() {
    return this.sortid();
  }
  get MonsterProbeId() {
    return this.monsterprobeid();
  }
  get HandBookBp() {
    return this.handbookbp();
  }
  get MonsterBodyType() {
    return this.monsterbodytype();
  }
  get HandBookCamera() {
    return this.handbookcamera();
  }
  get MonsterNumber() {
    return this.monsternumber();
  }
  get InteractionRadius() {
    return this.interactionradius();
  }
  get IsShow() {
    return this.isshow();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsCalabashDevelopReward(t, s) {
    return (s || new CalabashDevelopReward()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  monsterid() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetDevelopconditionAt(t) {
    return this.developcondition(t);
  }
  developcondition(t) {
    var s = this.J7.__offset(this.z7, 6);
    if (s) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + s) + t * 4);
    } else {
      return 0;
    }
  }
  developconditionLength() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  developconditionArray() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  monsterinfoid() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  allexp() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  sortid() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  monsterprobeid() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  handbookbp(t) {
    var s = this.J7.__offset(this.z7, 16);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  monsterbodytype() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  handbookcamera(t) {
    var s = this.J7.__offset(this.z7, 20);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  monsternumber(t) {
    var s = this.J7.__offset(this.z7, 22);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  interactionradius() {
    var t = this.J7.__offset(this.z7, 24);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  isshow() {
    var t = this.J7.__offset(this.z7, 26);
    return !t || !!this.J7.readInt8(this.z7 + t);
  }
}
exports.CalabashDevelopReward = CalabashDevelopReward;
//# sourceMappingURL=CalabashDevelopReward.js.map