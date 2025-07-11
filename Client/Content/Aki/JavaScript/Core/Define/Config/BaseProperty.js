"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseProperty = undefined;
class BaseProperty {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get Lv() {
    return this.lv();
  }
  get LifeMax() {
    return this.lifemax();
  }
  get Life() {
    return this.life();
  }
  get Sheild() {
    return this.sheild();
  }
  get SheildDamageChange() {
    return this.sheilddamagechange();
  }
  get SheildDamageReduce() {
    return this.sheilddamagereduce();
  }
  get Atk() {
    return this.atk();
  }
  get Crit() {
    return this.crit();
  }
  get CritDamage() {
    return this.critdamage();
  }
  get Def() {
    return this.def();
  }
  get EnergyEfficiency() {
    return this.energyefficiency();
  }
  get CdReduse() {
    return this.cdreduse();
  }
  get DamageChangeNormalSkill() {
    return this.damagechangenormalskill();
  }
  get DamageChange() {
    return this.damagechange();
  }
  get DamageReduce() {
    return this.damagereduce();
  }
  get DamageChangeAuto() {
    return this.damagechangeauto();
  }
  get DamageChangeCast() {
    return this.damagechangecast();
  }
  get DamageChangeUltra() {
    return this.damagechangeultra();
  }
  get DamageChangeQte() {
    return this.damagechangeqte();
  }
  get DamageChangePhys() {
    return this.damagechangephys();
  }
  get DamageChangeElement1() {
    return this.damagechangeelement1();
  }
  get DamageChangeElement2() {
    return this.damagechangeelement2();
  }
  get DamageChangeElement3() {
    return this.damagechangeelement3();
  }
  get DamageChangeElement4() {
    return this.damagechangeelement4();
  }
  get DamageChangeElement5() {
    return this.damagechangeelement5();
  }
  get DamageChangeElement6() {
    return this.damagechangeelement6();
  }
  get DamageResistancePhys() {
    return this.damageresistancephys();
  }
  get DamageResistanceElement1() {
    return this.damageresistanceelement1();
  }
  get DamageResistanceElement2() {
    return this.damageresistanceelement2();
  }
  get DamageResistanceElement3() {
    return this.damageresistanceelement3();
  }
  get DamageResistanceElement4() {
    return this.damageresistanceelement4();
  }
  get DamageResistanceElement5() {
    return this.damageresistanceelement5();
  }
  get DamageResistanceElement6() {
    return this.damageresistanceelement6();
  }
  get HealChange() {
    return this.healchange();
  }
  get HealedChange() {
    return this.healedchange();
  }
  get DamageReducePhys() {
    return this.damagereducephys();
  }
  get DamageReduceElement1() {
    return this.damagereduceelement1();
  }
  get DamageReduceElement2() {
    return this.damagereduceelement2();
  }
  get DamageReduceElement3() {
    return this.damagereduceelement3();
  }
  get DamageReduceElement4() {
    return this.damagereduceelement4();
  }
  get DamageReduceElement5() {
    return this.damagereduceelement5();
  }
  get DamageReduceElement6() {
    return this.damagereduceelement6();
  }
  get EnergyMax() {
    return this.energymax();
  }
  get Energy() {
    return this.energy();
  }
  get SpecialEnergy1Max() {
    return this.specialenergy1max();
  }
  get SpecialEnergy1() {
    return this.specialenergy1();
  }
  get SpecialEnergy2Max() {
    return this.specialenergy2max();
  }
  get SpecialEnergy2() {
    return this.specialenergy2();
  }
  get SpecialEnergy3Max() {
    return this.specialenergy3max();
  }
  get SpecialEnergy3() {
    return this.specialenergy3();
  }
  get SpecialEnergy4Max() {
    return this.specialenergy4max();
  }
  get SpecialEnergy4() {
    return this.specialenergy4();
  }
  get SpecialEnergy5Max() {
    return this.specialenergy5max();
  }
  get SpecialEnergy5() {
    return this.specialenergy5();
  }
  get StrengthMax() {
    return this.strengthmax();
  }
  get Strength() {
    return this.strength();
  }
  get StrengthRecover() {
    return this.strengthrecover();
  }
  get StrengthPunishTime() {
    return this.strengthpunishtime();
  }
  get StrengthRun() {
    return this.strengthrun();
  }
  get StrengthSwim() {
    return this.strengthswim();
  }
  get StrengthFastSwim() {
    return this.strengthfastswim();
  }
  get HardnessMax() {
    return this.hardnessmax();
  }
  get Hardness() {
    return this.hardness();
  }
  get HardnessRecover() {
    return this.hardnessrecover();
  }
  get HardnessPunishTime() {
    return this.hardnesspunishtime();
  }
  get HardnessChange() {
    return this.hardnesschange();
  }
  get HardnessReduce() {
    return this.hardnessreduce();
  }
  get RageMax() {
    return this.ragemax();
  }
  get Rage() {
    return this.rage();
  }
  get RageRecover() {
    return this.ragerecover();
  }
  get RagePunishTime() {
    return this.ragepunishtime();
  }
  get RageChange() {
    return this.ragechange();
  }
  get RageReduce() {
    return this.ragereduce();
  }
  get ToughMax() {
    return this.toughmax();
  }
  get Tough() {
    return this.tough();
  }
  get ToughRecover() {
    return this.toughrecover();
  }
  get ToughChange() {
    return this.toughchange();
  }
  get ToughReduce() {
    return this.toughreduce();
  }
  get ToughRecoverDelayTime() {
    return this.toughrecoverdelaytime();
  }
  get ElementPower1() {
    return this.elementpower1();
  }
  get ElementPower2() {
    return this.elementpower2();
  }
  get ElementPower3() {
    return this.elementpower3();
  }
  get ElementPower4() {
    return this.elementpower4();
  }
  get ElementPower5() {
    return this.elementpower5();
  }
  get ElementPower6() {
    return this.elementpower6();
  }
  get SpecialDamageChange() {
    return this.specialdamagechange();
  }
  get StrengthFastClimbCost() {
    return this.strengthfastclimbcost();
  }
  get ElementPropertyType() {
    return this.elementpropertytype();
  }
  get WeakTime() {
    return this.weaktime();
  }
  get IgnoreDefRate() {
    return this.ignoredefrate();
  }
  get IgnoreDamageResistancePhys() {
    return this.ignoredamageresistancephys();
  }
  get IgnoreDamageResistanceElement1() {
    return this.ignoredamageresistanceelement1();
  }
  get IgnoreDamageResistanceElement2() {
    return this.ignoredamageresistanceelement2();
  }
  get IgnoreDamageResistanceElement3() {
    return this.ignoredamageresistanceelement3();
  }
  get IgnoreDamageResistanceElement4() {
    return this.ignoredamageresistanceelement4();
  }
  get IgnoreDamageResistanceElement5() {
    return this.ignoredamageresistanceelement5();
  }
  get IgnoreDamageResistanceElement6() {
    return this.ignoredamageresistanceelement6();
  }
  get SkillToughRatio() {
    return this.skilltoughratio();
  }
  get StrengthClimbJump() {
    return this.strengthclimbjump();
  }
  get StrengthGliding() {
    return this.strengthgliding();
  }
  get Mass() {
    return this.mass();
  }
  get BrakingFrictionFactor() {
    return this.brakingfrictionfactor();
  }
  get GravityScale() {
    return this.gravityscale();
  }
  get SpeedRatio() {
    return this.speedratio();
  }
  get DamageChangePhantom() {
    return this.damagechangephantom();
  }
  get AutoAttackSpeed() {
    return this.autoattackspeed();
  }
  get CastAttackSpeed() {
    return this.castattackspeed();
  }
  get StatusBuildUp1Max() {
    return this.statusbuildup1max();
  }
  get StatusBuildUp1() {
    return this.statusbuildup1();
  }
  get StatusBuildUp2Max() {
    return this.statusbuildup2max();
  }
  get StatusBuildUp2() {
    return this.statusbuildup2();
  }
  get StatusBuildUp3Max() {
    return this.statusbuildup3max();
  }
  get StatusBuildUp3() {
    return this.statusbuildup3();
  }
  get StatusBuildUp4Max() {
    return this.statusbuildup4max();
  }
  get StatusBuildUp4() {
    return this.statusbuildup4();
  }
  get StatusBuildUp5Max() {
    return this.statusbuildup5max();
  }
  get StatusBuildUp5() {
    return this.statusbuildup5();
  }
  get ParalysisTimeMax() {
    return this.paralysistimemax();
  }
  get ParalysisTime() {
    return this.paralysistime();
  }
  get ParalysisTimeRecover() {
    return this.paralysistimerecover();
  }
  get ElementEnergyMax() {
    return this.elementenergymax();
  }
  get ElementEnergy() {
    return this.elementenergy();
  }
  get ElementEfficiency() {
    return this.elementefficiency();
  }
  __init(t, e) {
    this.z7 = t;
    this.J7 = e;
    return this;
  }
  static getRootAsBaseProperty(t, e) {
    return (e || new BaseProperty()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  lv() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  lifemax() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 1;
    }
  }
  life() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  sheild() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  sheilddamagechange() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  sheilddamagereduce() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  atk() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  crit() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  critdamage() {
    var t = this.J7.__offset(this.z7, 22);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 10000;
    }
  }
  def() {
    var t = this.J7.__offset(this.z7, 24);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  energyefficiency() {
    var t = this.J7.__offset(this.z7, 26);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 10000;
    }
  }
  cdreduse() {
    var t = this.J7.__offset(this.z7, 28);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 10000;
    }
  }
  damagechangenormalskill() {
    var t = this.J7.__offset(this.z7, 30);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  damagechange() {
    var t = this.J7.__offset(this.z7, 32);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  damagereduce() {
    var t = this.J7.__offset(this.z7, 34);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  damagechangeauto() {
    var t = this.J7.__offset(this.z7, 36);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  damagechangecast() {
    var t = this.J7.__offset(this.z7, 38);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  damagechangeultra() {
    var t = this.J7.__offset(this.z7, 40);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  damagechangeqte() {
    var t = this.J7.__offset(this.z7, 42);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  damagechangephys() {
    var t = this.J7.__offset(this.z7, 44);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  damagechangeelement1() {
    var t = this.J7.__offset(this.z7, 46);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  damagechangeelement2() {
    var t = this.J7.__offset(this.z7, 48);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  damagechangeelement3() {
    var t = this.J7.__offset(this.z7, 50);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  damagechangeelement4() {
    var t = this.J7.__offset(this.z7, 52);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  damagechangeelement5() {
    var t = this.J7.__offset(this.z7, 54);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  damagechangeelement6() {
    var t = this.J7.__offset(this.z7, 56);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  damageresistancephys() {
    var t = this.J7.__offset(this.z7, 58);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  damageresistanceelement1() {
    var t = this.J7.__offset(this.z7, 60);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  damageresistanceelement2() {
    var t = this.J7.__offset(this.z7, 62);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  damageresistanceelement3() {
    var t = this.J7.__offset(this.z7, 64);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  damageresistanceelement4() {
    var t = this.J7.__offset(this.z7, 66);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  damageresistanceelement5() {
    var t = this.J7.__offset(this.z7, 68);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  damageresistanceelement6() {
    var t = this.J7.__offset(this.z7, 70);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  healchange() {
    var t = this.J7.__offset(this.z7, 72);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  healedchange() {
    var t = this.J7.__offset(this.z7, 74);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  damagereducephys() {
    var t = this.J7.__offset(this.z7, 76);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  damagereduceelement1() {
    var t = this.J7.__offset(this.z7, 78);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  damagereduceelement2() {
    var t = this.J7.__offset(this.z7, 80);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  damagereduceelement3() {
    var t = this.J7.__offset(this.z7, 82);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  damagereduceelement4() {
    var t = this.J7.__offset(this.z7, 84);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  damagereduceelement5() {
    var t = this.J7.__offset(this.z7, 86);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  damagereduceelement6() {
    var t = this.J7.__offset(this.z7, 88);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  energymax() {
    var t = this.J7.__offset(this.z7, 90);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 10000;
    }
  }
  energy() {
    var t = this.J7.__offset(this.z7, 92);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  specialenergy1max() {
    var t = this.J7.__offset(this.z7, 94);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 100;
    }
  }
  specialenergy1() {
    var t = this.J7.__offset(this.z7, 96);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  specialenergy2max() {
    var t = this.J7.__offset(this.z7, 98);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 100;
    }
  }
  specialenergy2() {
    var t = this.J7.__offset(this.z7, 100);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  specialenergy3max() {
    var t = this.J7.__offset(this.z7, 102);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 100;
    }
  }
  specialenergy3() {
    var t = this.J7.__offset(this.z7, 104);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  specialenergy4max() {
    var t = this.J7.__offset(this.z7, 106);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 10000;
    }
  }
  specialenergy4() {
    var t = this.J7.__offset(this.z7, 108);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  specialenergy5max() {
    var t = this.J7.__offset(this.z7, 110);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 10000;
    }
  }
  specialenergy5() {
    var t = this.J7.__offset(this.z7, 112);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  strengthmax() {
    var t = this.J7.__offset(this.z7, 114);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 14000;
    }
  }
  strength() {
    var t = this.J7.__offset(this.z7, 116);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 14000;
    }
  }
  strengthrecover() {
    var t = this.J7.__offset(this.z7, 118);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 250;
    }
  }
  strengthpunishtime() {
    var t = this.J7.__offset(this.z7, 120);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 2000;
    }
  }
  strengthrun() {
    var t = this.J7.__offset(this.z7, 122);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 100;
    }
  }
  strengthswim() {
    var t = this.J7.__offset(this.z7, 124);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 26;
    }
  }
  strengthfastswim() {
    var t = this.J7.__offset(this.z7, 126);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 66;
    }
  }
  hardnessmax() {
    var t = this.J7.__offset(this.z7, 128);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  hardness() {
    var t = this.J7.__offset(this.z7, 130);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  hardnessrecover() {
    var t = this.J7.__offset(this.z7, 132);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  hardnesspunishtime() {
    var t = this.J7.__offset(this.z7, 134);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  hardnesschange() {
    var t = this.J7.__offset(this.z7, 136);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  hardnessreduce() {
    var t = this.J7.__offset(this.z7, 138);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  ragemax() {
    var t = this.J7.__offset(this.z7, 140);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  rage() {
    var t = this.J7.__offset(this.z7, 142);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  ragerecover() {
    var t = this.J7.__offset(this.z7, 144);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  ragepunishtime() {
    var t = this.J7.__offset(this.z7, 146);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  ragechange() {
    var t = this.J7.__offset(this.z7, 148);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  ragereduce() {
    var t = this.J7.__offset(this.z7, 150);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  toughmax() {
    var t = this.J7.__offset(this.z7, 152);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  tough() {
    var t = this.J7.__offset(this.z7, 154);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  toughrecover() {
    var t = this.J7.__offset(this.z7, 156);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  toughchange() {
    var t = this.J7.__offset(this.z7, 158);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 10000;
    }
  }
  toughreduce() {
    var t = this.J7.__offset(this.z7, 160);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 10000;
    }
  }
  toughrecoverdelaytime() {
    var t = this.J7.__offset(this.z7, 162);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  elementpower1() {
    var t = this.J7.__offset(this.z7, 164);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  elementpower2() {
    var t = this.J7.__offset(this.z7, 166);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  elementpower3() {
    var t = this.J7.__offset(this.z7, 168);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  elementpower4() {
    var t = this.J7.__offset(this.z7, 170);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  elementpower5() {
    var t = this.J7.__offset(this.z7, 172);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  elementpower6() {
    var t = this.J7.__offset(this.z7, 174);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  specialdamagechange() {
    var t = this.J7.__offset(this.z7, 176);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  strengthfastclimbcost() {
    var t = this.J7.__offset(this.z7, 178);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 242;
    }
  }
  elementpropertytype() {
    var t = this.J7.__offset(this.z7, 180);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  weaktime() {
    var t = this.J7.__offset(this.z7, 182);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  ignoredefrate() {
    var t = this.J7.__offset(this.z7, 184);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  ignoredamageresistancephys() {
    var t = this.J7.__offset(this.z7, 186);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  ignoredamageresistanceelement1() {
    var t = this.J7.__offset(this.z7, 188);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  ignoredamageresistanceelement2() {
    var t = this.J7.__offset(this.z7, 190);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  ignoredamageresistanceelement3() {
    var t = this.J7.__offset(this.z7, 192);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  ignoredamageresistanceelement4() {
    var t = this.J7.__offset(this.z7, 194);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  ignoredamageresistanceelement5() {
    var t = this.J7.__offset(this.z7, 196);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  ignoredamageresistanceelement6() {
    var t = this.J7.__offset(this.z7, 198);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  skilltoughratio() {
    var t = this.J7.__offset(this.z7, 200);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 10000;
    }
  }
  strengthclimbjump() {
    var t = this.J7.__offset(this.z7, 202);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 1220;
    }
  }
  strengthgliding() {
    var t = this.J7.__offset(this.z7, 204);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 30;
    }
  }
  mass() {
    var t = this.J7.__offset(this.z7, 206);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 100;
    }
  }
  brakingfrictionfactor() {
    var t = this.J7.__offset(this.z7, 208);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 10000;
    }
  }
  gravityscale() {
    var t = this.J7.__offset(this.z7, 210);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 20000;
    }
  }
  speedratio() {
    var t = this.J7.__offset(this.z7, 212);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 10000;
    }
  }
  damagechangephantom() {
    var t = this.J7.__offset(this.z7, 214);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  autoattackspeed() {
    var t = this.J7.__offset(this.z7, 216);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 10000;
    }
  }
  castattackspeed() {
    var t = this.J7.__offset(this.z7, 218);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 10000;
    }
  }
  statusbuildup1max() {
    var t = this.J7.__offset(this.z7, 220);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 100;
    }
  }
  statusbuildup1() {
    var t = this.J7.__offset(this.z7, 222);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  statusbuildup2max() {
    var t = this.J7.__offset(this.z7, 224);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 100;
    }
  }
  statusbuildup2() {
    var t = this.J7.__offset(this.z7, 226);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  statusbuildup3max() {
    var t = this.J7.__offset(this.z7, 228);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 100;
    }
  }
  statusbuildup3() {
    var t = this.J7.__offset(this.z7, 230);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  statusbuildup4max() {
    var t = this.J7.__offset(this.z7, 232);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 100;
    }
  }
  statusbuildup4() {
    var t = this.J7.__offset(this.z7, 234);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  statusbuildup5max() {
    var t = this.J7.__offset(this.z7, 236);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 100;
    }
  }
  statusbuildup5() {
    var t = this.J7.__offset(this.z7, 238);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  paralysistimemax() {
    var t = this.J7.__offset(this.z7, 240);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  paralysistime() {
    var t = this.J7.__offset(this.z7, 242);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  paralysistimerecover() {
    var t = this.J7.__offset(this.z7, 244);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  elementenergymax() {
    var t = this.J7.__offset(this.z7, 246);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 10000;
    }
  }
  elementenergy() {
    var t = this.J7.__offset(this.z7, 248);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  elementefficiency() {
    var t = this.J7.__offset(this.z7, 250);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 10000;
    }
  }
}
exports.BaseProperty = BaseProperty;
//# sourceMappingURL=BaseProperty.js.map