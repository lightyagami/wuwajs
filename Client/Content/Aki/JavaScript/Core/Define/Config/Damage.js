"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Damage = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicStringString_1 = require("./SubType/DicStringString");
class Damage {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get Condition() {
    return this.condition();
  }
  get ConstVariables() {
    return GameUtils_1.GameUtils.ConvertToMap(this.constvariablesLength(), this.constvariablesKey, this.constvariablesValue, this);
  }
  constvariablesKey(t) {
    return this.constvariables(t)?.key();
  }
  constvariablesValue(t) {
    return this.constvariables(t)?.value();
  }
  get CalculateType() {
    return this.calculatetype();
  }
  get Element() {
    return this.element();
  }
  get DamageTextType() {
    return this.damagetexttype();
  }
  get PayloadId() {
    return this.payloadid();
  }
  get Type() {
    return this.type();
  }
  get SubType() {
    return GameUtils_1.GameUtils.ConvertToArray(this.subtypeLength(), this.subtype, this);
  }
  get SmashType() {
    return this.smashtype();
  }
  get CureBaseValue() {
    return GameUtils_1.GameUtils.ConvertToArray(this.curebasevalueLength(), this.curebasevalue, this);
  }
  get RelatedProperty() {
    return this.relatedproperty();
  }
  get RateLv() {
    return GameUtils_1.GameUtils.ConvertToArray(this.ratelvLength(), this.ratelv, this);
  }
  get HardnessLv() {
    return GameUtils_1.GameUtils.ConvertToArray(this.hardnesslvLength(), this.hardnesslv, this);
  }
  get ToughLv() {
    return GameUtils_1.GameUtils.ConvertToArray(this.toughlvLength(), this.toughlv, this);
  }
  get Energy() {
    return GameUtils_1.GameUtils.ConvertToArray(this.energyLength(), this.energy, this);
  }
  get SpecialEnergy1() {
    return GameUtils_1.GameUtils.ConvertToArray(this.specialenergy1Length(), this.specialenergy1, this);
  }
  get SpecialEnergy2() {
    return GameUtils_1.GameUtils.ConvertToArray(this.specialenergy2Length(), this.specialenergy2, this);
  }
  get SpecialEnergy3() {
    return GameUtils_1.GameUtils.ConvertToArray(this.specialenergy3Length(), this.specialenergy3, this);
  }
  get SpecialEnergy4() {
    return GameUtils_1.GameUtils.ConvertToArray(this.specialenergy4Length(), this.specialenergy4, this);
  }
  get SpecialEnergy5() {
    return GameUtils_1.GameUtils.ConvertToArray(this.specialenergy5Length(), this.specialenergy5, this);
  }
  get ElementPowerType() {
    return this.elementpowertype();
  }
  get ElementPower() {
    return GameUtils_1.GameUtils.ConvertToArray(this.elementpowerLength(), this.elementpower, this);
  }
  get FormulaType() {
    return this.formulatype();
  }
  get FormulaParam1() {
    return GameUtils_1.GameUtils.ConvertToArray(this.formulaparam1Length(), this.formulaparam1, this);
  }
  get FormulaParam2() {
    return GameUtils_1.GameUtils.ConvertToArray(this.formulaparam2Length(), this.formulaparam2, this);
  }
  get FormulaParam3() {
    return GameUtils_1.GameUtils.ConvertToArray(this.formulaparam3Length(), this.formulaparam3, this);
  }
  get FormulaParam4() {
    return GameUtils_1.GameUtils.ConvertToArray(this.formulaparam4Length(), this.formulaparam4, this);
  }
  get FormulaParam5() {
    return GameUtils_1.GameUtils.ConvertToArray(this.formulaparam5Length(), this.formulaparam5, this);
  }
  get FormulaParam6() {
    return GameUtils_1.GameUtils.ConvertToArray(this.formulaparam6Length(), this.formulaparam6, this);
  }
  get FormulaParam7() {
    return GameUtils_1.GameUtils.ConvertToArray(this.formulaparam7Length(), this.formulaparam7, this);
  }
  get FormulaParam8() {
    return GameUtils_1.GameUtils.ConvertToArray(this.formulaparam8Length(), this.formulaparam8, this);
  }
  get FormulaParam9() {
    return GameUtils_1.GameUtils.ConvertToArray(this.formulaparam9Length(), this.formulaparam9, this);
  }
  get FormulaParam10() {
    return GameUtils_1.GameUtils.ConvertToArray(this.formulaparam10Length(), this.formulaparam10, this);
  }
  get ImmuneType() {
    return this.immunetype();
  }
  get Percent0() {
    return GameUtils_1.GameUtils.ConvertToArray(this.percent0Length(), this.percent0, this);
  }
  get Percent1() {
    return GameUtils_1.GameUtils.ConvertToArray(this.percent1Length(), this.percent1, this);
  }
  get FluctuationLower() {
    return GameUtils_1.GameUtils.ConvertToArray(this.fluctuationlowerLength(), this.fluctuationlower, this);
  }
  get FluctuationUpper() {
    return GameUtils_1.GameUtils.ConvertToArray(this.fluctuationupperLength(), this.fluctuationupper, this);
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsDamage(t, i) {
    return (i || new Damage()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readFloat64(this.z7 + t);
    } else {
      return 0;
    }
  }
  condition(t) {
    var i = this.J7.__offset(this.z7, 6);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  GetConstvariablesAt(t, i) {
    return this.constvariables(t);
  }
  constvariables(t, i) {
    var r = this.J7.__offset(this.z7, 8);
    if (r) {
      return (i || new DicStringString_1.DicStringString()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + r) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  constvariablesLength() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  calculatetype() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  element() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  damagetexttype() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  payloadid() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.readFloat64(this.z7 + t);
    } else {
      return 0;
    }
  }
  type() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetSubtypeAt(t) {
    return this.subtype(t);
  }
  subtype(t) {
    var i = this.J7.__offset(this.z7, 20);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  subtypeLength() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  subtypeArray() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  smashtype() {
    var t = this.J7.__offset(this.z7, 22);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 1;
    }
  }
  GetCurebasevalueAt(t) {
    return this.curebasevalue(t);
  }
  curebasevalue(t) {
    var i = this.J7.__offset(this.z7, 24);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  curebasevalueLength() {
    var t = this.J7.__offset(this.z7, 24);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  curebasevalueArray() {
    var t = this.J7.__offset(this.z7, 24);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  relatedproperty() {
    var t = this.J7.__offset(this.z7, 26);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 7;
    }
  }
  GetRatelvAt(t) {
    return this.ratelv(t);
  }
  ratelv(t) {
    var i = this.J7.__offset(this.z7, 28);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  ratelvLength() {
    var t = this.J7.__offset(this.z7, 28);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  ratelvArray() {
    var t = this.J7.__offset(this.z7, 28);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetHardnesslvAt(t) {
    return this.hardnesslv(t);
  }
  hardnesslv(t) {
    var i = this.J7.__offset(this.z7, 30);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  hardnesslvLength() {
    var t = this.J7.__offset(this.z7, 30);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  hardnesslvArray() {
    var t = this.J7.__offset(this.z7, 30);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetToughlvAt(t) {
    return this.toughlv(t);
  }
  toughlv(t) {
    var i = this.J7.__offset(this.z7, 32);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  toughlvLength() {
    var t = this.J7.__offset(this.z7, 32);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  toughlvArray() {
    var t = this.J7.__offset(this.z7, 32);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetEnergyAt(t) {
    return this.energy(t);
  }
  energy(t) {
    var i = this.J7.__offset(this.z7, 34);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  energyLength() {
    var t = this.J7.__offset(this.z7, 34);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  energyArray() {
    var t = this.J7.__offset(this.z7, 34);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetSpecialenergy1At(t) {
    return this.specialenergy1(t);
  }
  specialenergy1(t) {
    var i = this.J7.__offset(this.z7, 36);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  specialenergy1Length() {
    var t = this.J7.__offset(this.z7, 36);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  specialenergy1Array() {
    var t = this.J7.__offset(this.z7, 36);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetSpecialenergy2At(t) {
    return this.specialenergy2(t);
  }
  specialenergy2(t) {
    var i = this.J7.__offset(this.z7, 38);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  specialenergy2Length() {
    var t = this.J7.__offset(this.z7, 38);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  specialenergy2Array() {
    var t = this.J7.__offset(this.z7, 38);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetSpecialenergy3At(t) {
    return this.specialenergy3(t);
  }
  specialenergy3(t) {
    var i = this.J7.__offset(this.z7, 40);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  specialenergy3Length() {
    var t = this.J7.__offset(this.z7, 40);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  specialenergy3Array() {
    var t = this.J7.__offset(this.z7, 40);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetSpecialenergy4At(t) {
    return this.specialenergy4(t);
  }
  specialenergy4(t) {
    var i = this.J7.__offset(this.z7, 42);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  specialenergy4Length() {
    var t = this.J7.__offset(this.z7, 42);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  specialenergy4Array() {
    var t = this.J7.__offset(this.z7, 42);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetSpecialenergy5At(t) {
    return this.specialenergy5(t);
  }
  specialenergy5(t) {
    var i = this.J7.__offset(this.z7, 44);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  specialenergy5Length() {
    var t = this.J7.__offset(this.z7, 44);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  specialenergy5Array() {
    var t = this.J7.__offset(this.z7, 44);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  elementpowertype() {
    var t = this.J7.__offset(this.z7, 46);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetElementpowerAt(t) {
    return this.elementpower(t);
  }
  elementpower(t) {
    var i = this.J7.__offset(this.z7, 48);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  elementpowerLength() {
    var t = this.J7.__offset(this.z7, 48);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  elementpowerArray() {
    var t = this.J7.__offset(this.z7, 48);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  formulatype() {
    var t = this.J7.__offset(this.z7, 50);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetFormulaparam1At(t) {
    return this.formulaparam1(t);
  }
  formulaparam1(t) {
    var i = this.J7.__offset(this.z7, 52);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  formulaparam1Length() {
    var t = this.J7.__offset(this.z7, 52);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  formulaparam1Array() {
    var t = this.J7.__offset(this.z7, 52);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetFormulaparam2At(t) {
    return this.formulaparam2(t);
  }
  formulaparam2(t) {
    var i = this.J7.__offset(this.z7, 54);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  formulaparam2Length() {
    var t = this.J7.__offset(this.z7, 54);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  formulaparam2Array() {
    var t = this.J7.__offset(this.z7, 54);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetFormulaparam3At(t) {
    return this.formulaparam3(t);
  }
  formulaparam3(t) {
    var i = this.J7.__offset(this.z7, 56);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  formulaparam3Length() {
    var t = this.J7.__offset(this.z7, 56);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  formulaparam3Array() {
    var t = this.J7.__offset(this.z7, 56);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetFormulaparam4At(t) {
    return this.formulaparam4(t);
  }
  formulaparam4(t) {
    var i = this.J7.__offset(this.z7, 58);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  formulaparam4Length() {
    var t = this.J7.__offset(this.z7, 58);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  formulaparam4Array() {
    var t = this.J7.__offset(this.z7, 58);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetFormulaparam5At(t) {
    return this.formulaparam5(t);
  }
  formulaparam5(t) {
    var i = this.J7.__offset(this.z7, 60);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  formulaparam5Length() {
    var t = this.J7.__offset(this.z7, 60);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  formulaparam5Array() {
    var t = this.J7.__offset(this.z7, 60);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetFormulaparam6At(t) {
    return this.formulaparam6(t);
  }
  formulaparam6(t) {
    var i = this.J7.__offset(this.z7, 62);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  formulaparam6Length() {
    var t = this.J7.__offset(this.z7, 62);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  formulaparam6Array() {
    var t = this.J7.__offset(this.z7, 62);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetFormulaparam7At(t) {
    return this.formulaparam7(t);
  }
  formulaparam7(t) {
    var i = this.J7.__offset(this.z7, 64);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  formulaparam7Length() {
    var t = this.J7.__offset(this.z7, 64);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  formulaparam7Array() {
    var t = this.J7.__offset(this.z7, 64);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetFormulaparam8At(t) {
    return this.formulaparam8(t);
  }
  formulaparam8(t) {
    var i = this.J7.__offset(this.z7, 66);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  formulaparam8Length() {
    var t = this.J7.__offset(this.z7, 66);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  formulaparam8Array() {
    var t = this.J7.__offset(this.z7, 66);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetFormulaparam9At(t) {
    return this.formulaparam9(t);
  }
  formulaparam9(t) {
    var i = this.J7.__offset(this.z7, 68);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  formulaparam9Length() {
    var t = this.J7.__offset(this.z7, 68);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  formulaparam9Array() {
    var t = this.J7.__offset(this.z7, 68);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetFormulaparam10At(t) {
    return this.formulaparam10(t);
  }
  formulaparam10(t) {
    var i = this.J7.__offset(this.z7, 70);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  formulaparam10Length() {
    var t = this.J7.__offset(this.z7, 70);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  formulaparam10Array() {
    var t = this.J7.__offset(this.z7, 70);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  immunetype() {
    var t = this.J7.__offset(this.z7, 72);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetPercent0At(t) {
    return this.percent0(t);
  }
  percent0(t) {
    var i = this.J7.__offset(this.z7, 74);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  percent0Length() {
    var t = this.J7.__offset(this.z7, 74);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  percent0Array() {
    var t = this.J7.__offset(this.z7, 74);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetPercent1At(t) {
    return this.percent1(t);
  }
  percent1(t) {
    var i = this.J7.__offset(this.z7, 76);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  percent1Length() {
    var t = this.J7.__offset(this.z7, 76);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  percent1Array() {
    var t = this.J7.__offset(this.z7, 76);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetFluctuationlowerAt(t) {
    return this.fluctuationlower(t);
  }
  fluctuationlower(t) {
    var i = this.J7.__offset(this.z7, 78);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  fluctuationlowerLength() {
    var t = this.J7.__offset(this.z7, 78);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  fluctuationlowerArray() {
    var t = this.J7.__offset(this.z7, 78);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetFluctuationupperAt(t) {
    return this.fluctuationupper(t);
  }
  fluctuationupper(t) {
    var i = this.J7.__offset(this.z7, 80);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  fluctuationupperLength() {
    var t = this.J7.__offset(this.z7, 80);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  fluctuationupperArray() {
    var t = this.J7.__offset(this.z7, 80);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
}
exports.Damage = Damage;
//# sourceMappingURL=Damage.js.map