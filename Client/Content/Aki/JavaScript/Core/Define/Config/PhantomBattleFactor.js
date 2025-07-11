"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomBattleFactor = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class PhantomBattleFactor {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get PhantomBattleEffectId() {
    return GameUtils_1.GameUtils.ConvertToArray(this.phantombattleeffectidLength(), this.phantombattleeffectid, this);
  }
  get IsBeforeBattle() {
    return this.isbeforebattle();
  }
  get Tag() {
    return this.tag();
  }
  get Sort() {
    return this.sort();
  }
  get Name() {
    return this.name();
  }
  get Description() {
    return this.description();
  }
  get DescriptionParams() {
    return GameUtils_1.GameUtils.ConvertToArray(this.descriptionparamsLength(), this.descriptionparams, this);
  }
  get DeActiveDescription() {
    return this.deactivedescription();
  }
  get DeActiveDescriptionParams() {
    return GameUtils_1.GameUtils.ConvertToArray(this.deactivedescriptionparamsLength(), this.deactivedescriptionparams, this);
  }
  get EntryId() {
    return this.entryid();
  }
  get SlotTendency() {
    return this.slottendency();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsPhantomBattleFactor(t, i) {
    return (i || new PhantomBattleFactor()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetPhantombattleeffectidAt(t) {
    return this.phantombattleeffectid(t);
  }
  phantombattleeffectid(t) {
    var i = this.J7.__offset(this.z7, 6);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  phantombattleeffectidLength() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  phantombattleeffectidArray() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  isbeforebattle() {
    var t = this.J7.__offset(this.z7, 8);
    return !t || !!this.J7.readInt8(this.z7 + t);
  }
  tag(t) {
    var i = this.J7.__offset(this.z7, 10);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  sort() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  name(t) {
    var i = this.J7.__offset(this.z7, 14);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  description(t) {
    var i = this.J7.__offset(this.z7, 16);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  GetDescriptionparamsAt(t) {
    return this.descriptionparams(t);
  }
  descriptionparams(t, i) {
    var s = this.J7.__offset(this.z7, 18);
    var s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + t * 4, i) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  descriptionparamsLength() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  deactivedescription(t) {
    var i = this.J7.__offset(this.z7, 20);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  GetDeactivedescriptionparamsAt(t) {
    return this.deactivedescriptionparams(t);
  }
  deactivedescriptionparams(t, i) {
    var s = this.J7.__offset(this.z7, 22);
    var s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + t * 4, i) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  deactivedescriptionparamsLength() {
    var t = this.J7.__offset(this.z7, 22);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  entryid() {
    var t = this.J7.__offset(this.z7, 24);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  slottendency() {
    var t = this.J7.__offset(this.z7, 26);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.PhantomBattleFactor = PhantomBattleFactor;
//# sourceMappingURL=PhantomBattleFactor.js.map