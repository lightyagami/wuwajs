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
  get InteractAreaId() {
    return this.interactareaid();
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
  get AllowVision() {
    return this.allowvision();
  }
  get IsWorldInteractable() {
    return this.isworldinteractable();
  }
  get SpecialSkillName() {
    return this.specialskillname();
  }
  get SpecialSkillDescription() {
    return this.specialskilldescription();
  }
  get SpecialSkillPicturePath() {
    return this.specialskillpicturepath();
  }
  get VisionCoolDown() {
    return this.visioncooldown();
  }
  get ItemAccess() {
    return this.itemaccess();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsCalabashDevelopReward(t, i) {
    return (i || new CalabashDevelopReward()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  monsterid() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  interactareaid() {
    var t = this.J7.__offset(this.z7, 6);
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
    var i = this.J7.__offset(this.z7, 8);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  developconditionLength() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  developconditionArray() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  monsterinfoid() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  allexp() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  sortid() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  monsterprobeid() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  handbookbp(t) {
    var i = this.J7.__offset(this.z7, 18);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  monsterbodytype() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  handbookcamera(t) {
    var i = this.J7.__offset(this.z7, 22);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  monsternumber(t) {
    var i = this.J7.__offset(this.z7, 24);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  interactionradius() {
    var t = this.J7.__offset(this.z7, 26);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  isshow() {
    var t = this.J7.__offset(this.z7, 28);
    return !t || !!this.J7.readInt8(this.z7 + t);
  }
  allowvision() {
    var t = this.J7.__offset(this.z7, 30);
    return !t || !!this.J7.readInt8(this.z7 + t);
  }
  isworldinteractable() {
    var t = this.J7.__offset(this.z7, 32);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  specialskillname(t) {
    var i = this.J7.__offset(this.z7, 34);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  specialskilldescription(t) {
    var i = this.J7.__offset(this.z7, 36);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  specialskillpicturepath(t) {
    var i = this.J7.__offset(this.z7, 38);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  visioncooldown() {
    var t = this.J7.__offset(this.z7, 40);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  itemaccess() {
    var t = this.J7.__offset(this.z7, 42);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.CalabashDevelopReward = CalabashDevelopReward;
//# sourceMappingURL=CalabashDevelopReward.js.map