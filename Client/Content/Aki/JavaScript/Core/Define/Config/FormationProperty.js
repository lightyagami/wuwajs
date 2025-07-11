"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormationProperty = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const FloatRange_1 = require("./SubType/FloatRange");
class FormationProperty {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get InitValue() {
    return this.initvalue();
  }
  get InitRecoveryRate() {
    return this.initrecoveryrate();
  }
  get InitMax() {
    return this.initmax();
  }
  get MarkTag() {
    return GameUtils_1.GameUtils.ConvertToArray(this.marktagLength(), this.marktag, this);
  }
  get ResistTag() {
    return GameUtils_1.GameUtils.ConvertToArray(this.resisttagLength(), this.resisttag, this);
  }
  get TriggerRange1() {
    return this.triggerrange1();
  }
  get TriggerType1() {
    return this.triggertype1();
  }
  get TriggerEffect1() {
    return this.triggereffect1();
  }
  get TriggerEffectParams1() {
    return GameUtils_1.GameUtils.ConvertToArray(this.triggereffectparams1Length(), this.triggereffectparams1, this);
  }
  get TriggerRange2() {
    return this.triggerrange2();
  }
  get TriggerType2() {
    return this.triggertype2();
  }
  get TriggerEffect2() {
    return this.triggereffect2();
  }
  get TriggerEffectParams2() {
    return GameUtils_1.GameUtils.ConvertToArray(this.triggereffectparams2Length(), this.triggereffectparams2, this);
  }
  get TriggerRange3() {
    return this.triggerrange3();
  }
  get TriggerType3() {
    return this.triggertype3();
  }
  get TriggerEffect3() {
    return this.triggereffect3();
  }
  get TriggerEffectParams3() {
    return GameUtils_1.GameUtils.ConvertToArray(this.triggereffectparams3Length(), this.triggereffectparams3, this);
  }
  get Condition() {
    return this.condition();
  }
  get PropertyIndex() {
    return this.propertyindex();
  }
  __init(t, r) {
    this.z7 = t;
    this.J7 = r;
    return this;
  }
  static getRootAsFormationProperty(t, r) {
    return (r || new FormationProperty()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  initvalue() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  initrecoveryrate() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return -500;
    }
  }
  initmax() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 10000;
    }
  }
  GetMarktagAt(t) {
    return this.marktag(t);
  }
  marktag(t, r) {
    var i = this.J7.__offset(this.z7, 12);
    var i = i ? this.J7.__string(this.J7.__vector(this.z7 + i) + t * 4, r) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  marktagLength() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetResisttagAt(t) {
    return this.resisttag(t);
  }
  resisttag(t, r) {
    var i = this.J7.__offset(this.z7, 14);
    var i = i ? this.J7.__string(this.J7.__vector(this.z7 + i) + t * 4, r) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  resisttagLength() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  triggerrange1(t) {
    var r = this.J7.__offset(this.z7, 16);
    if (r) {
      return (t || new FloatRange_1.FloatRange()).__init(this.J7.__indirect(this.z7 + r), this.J7);
    } else {
      return null;
    }
  }
  triggertype1() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  triggereffect1() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetTriggereffectparams1At(t) {
    return this.triggereffectparams1(t);
  }
  triggereffectparams1(t) {
    var r = this.J7.__offset(this.z7, 22);
    if (r) {
      return this.J7.readFloat64(this.J7.__vector(this.z7 + r) + t * 8);
    } else {
      return 0;
    }
  }
  triggereffectparams1Length() {
    var t = this.J7.__offset(this.z7, 22);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  triggereffectparams1Array() {
    var t = this.J7.__offset(this.z7, 22);
    if (t) {
      return new Float64Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  triggerrange2(t) {
    var r = this.J7.__offset(this.z7, 24);
    if (r) {
      return (t || new FloatRange_1.FloatRange()).__init(this.J7.__indirect(this.z7 + r), this.J7);
    } else {
      return null;
    }
  }
  triggertype2() {
    var t = this.J7.__offset(this.z7, 26);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  triggereffect2() {
    var t = this.J7.__offset(this.z7, 28);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetTriggereffectparams2At(t) {
    return this.triggereffectparams2(t);
  }
  triggereffectparams2(t) {
    var r = this.J7.__offset(this.z7, 30);
    if (r) {
      return this.J7.readFloat64(this.J7.__vector(this.z7 + r) + t * 8);
    } else {
      return 0;
    }
  }
  triggereffectparams2Length() {
    var t = this.J7.__offset(this.z7, 30);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  triggereffectparams2Array() {
    var t = this.J7.__offset(this.z7, 30);
    if (t) {
      return new Float64Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  triggerrange3(t) {
    var r = this.J7.__offset(this.z7, 32);
    if (r) {
      return (t || new FloatRange_1.FloatRange()).__init(this.J7.__indirect(this.z7 + r), this.J7);
    } else {
      return null;
    }
  }
  triggertype3() {
    var t = this.J7.__offset(this.z7, 34);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  triggereffect3() {
    var t = this.J7.__offset(this.z7, 36);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetTriggereffectparams3At(t) {
    return this.triggereffectparams3(t);
  }
  triggereffectparams3(t) {
    var r = this.J7.__offset(this.z7, 38);
    if (r) {
      return this.J7.readFloat64(this.J7.__vector(this.z7 + r) + t * 8);
    } else {
      return 0;
    }
  }
  triggereffectparams3Length() {
    var t = this.J7.__offset(this.z7, 38);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  triggereffectparams3Array() {
    var t = this.J7.__offset(this.z7, 38);
    if (t) {
      return new Float64Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  condition() {
    var t = this.J7.__offset(this.z7, 40);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  propertyindex() {
    var t = this.J7.__offset(this.z7, 42);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.FormationProperty = FormationProperty;
//# sourceMappingURL=FormationProperty.js.map