"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KSCBaseProperty = undefined;
class KSCBaseProperty {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get KscGameplayType() {
    return this.kscgameplaytype();
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
  get MoveSpeed() {
    return this.movespeed();
  }
  get SkillCoolDown() {
    return this.skillcooldown();
  }
  get DamageAmplify1() {
    return this.damageamplify1();
  }
  get DamageAmplify2() {
    return this.damageamplify2();
  }
  get SkillCoolDownChangeMin() {
    return this.skillcooldownchangemin();
  }
  __init(e, t) {
    this.z7 = e;
    this.J7 = t;
    return this;
  }
  static getRootAsKSCBaseProperty(e, t) {
    return (t || new KSCBaseProperty()).__init(e.readInt32(e.position()) + e.position(), e);
  }
  id() {
    var e = this.J7.__offset(this.z7, 4);
    if (e) {
      return this.J7.readInt32(this.z7 + e);
    } else {
      return 0;
    }
  }
  kscgameplaytype() {
    var e = this.J7.__offset(this.z7, 6);
    if (e) {
      return this.J7.readInt32(this.z7 + e);
    } else {
      return 0;
    }
  }
  lv() {
    var e = this.J7.__offset(this.z7, 8);
    if (e) {
      return this.J7.readInt32(this.z7 + e);
    } else {
      return 0;
    }
  }
  lifemax() {
    var e = this.J7.__offset(this.z7, 10);
    if (e) {
      return this.J7.readInt32(this.z7 + e);
    } else {
      return 0;
    }
  }
  life() {
    var e = this.J7.__offset(this.z7, 12);
    if (e) {
      return this.J7.readInt32(this.z7 + e);
    } else {
      return 0;
    }
  }
  sheild() {
    var e = this.J7.__offset(this.z7, 14);
    if (e) {
      return this.J7.readInt32(this.z7 + e);
    } else {
      return 0;
    }
  }
  atk() {
    var e = this.J7.__offset(this.z7, 16);
    if (e) {
      return this.J7.readInt32(this.z7 + e);
    } else {
      return 0;
    }
  }
  crit() {
    var e = this.J7.__offset(this.z7, 18);
    if (e) {
      return this.J7.readInt32(this.z7 + e);
    } else {
      return 0;
    }
  }
  critdamage() {
    var e = this.J7.__offset(this.z7, 20);
    if (e) {
      return this.J7.readInt32(this.z7 + e);
    } else {
      return 10000;
    }
  }
  def() {
    var e = this.J7.__offset(this.z7, 22);
    if (e) {
      return this.J7.readInt32(this.z7 + e);
    } else {
      return 0;
    }
  }
  damagechangephys() {
    var e = this.J7.__offset(this.z7, 24);
    if (e) {
      return this.J7.readInt32(this.z7 + e);
    } else {
      return 0;
    }
  }
  damagechangeelement1() {
    var e = this.J7.__offset(this.z7, 26);
    if (e) {
      return this.J7.readInt32(this.z7 + e);
    } else {
      return 0;
    }
  }
  damagechangeelement2() {
    var e = this.J7.__offset(this.z7, 28);
    if (e) {
      return this.J7.readInt32(this.z7 + e);
    } else {
      return 0;
    }
  }
  damagechangeelement3() {
    var e = this.J7.__offset(this.z7, 30);
    if (e) {
      return this.J7.readInt32(this.z7 + e);
    } else {
      return 0;
    }
  }
  damagechangeelement4() {
    var e = this.J7.__offset(this.z7, 32);
    if (e) {
      return this.J7.readInt32(this.z7 + e);
    } else {
      return 0;
    }
  }
  damagechangeelement5() {
    var e = this.J7.__offset(this.z7, 34);
    if (e) {
      return this.J7.readInt32(this.z7 + e);
    } else {
      return 0;
    }
  }
  damagechangeelement6() {
    var e = this.J7.__offset(this.z7, 36);
    if (e) {
      return this.J7.readInt32(this.z7 + e);
    } else {
      return 0;
    }
  }
  damageresistancephys() {
    var e = this.J7.__offset(this.z7, 38);
    if (e) {
      return this.J7.readInt32(this.z7 + e);
    } else {
      return 0;
    }
  }
  damageresistanceelement1() {
    var e = this.J7.__offset(this.z7, 40);
    if (e) {
      return this.J7.readInt32(this.z7 + e);
    } else {
      return 0;
    }
  }
  damageresistanceelement2() {
    var e = this.J7.__offset(this.z7, 42);
    if (e) {
      return this.J7.readInt32(this.z7 + e);
    } else {
      return 0;
    }
  }
  damageresistanceelement3() {
    var e = this.J7.__offset(this.z7, 44);
    if (e) {
      return this.J7.readInt32(this.z7 + e);
    } else {
      return 0;
    }
  }
  damageresistanceelement4() {
    var e = this.J7.__offset(this.z7, 46);
    if (e) {
      return this.J7.readInt32(this.z7 + e);
    } else {
      return 0;
    }
  }
  damageresistanceelement5() {
    var e = this.J7.__offset(this.z7, 48);
    if (e) {
      return this.J7.readInt32(this.z7 + e);
    } else {
      return 0;
    }
  }
  damageresistanceelement6() {
    var e = this.J7.__offset(this.z7, 50);
    if (e) {
      return this.J7.readInt32(this.z7 + e);
    } else {
      return 0;
    }
  }
  healchange() {
    var e = this.J7.__offset(this.z7, 52);
    if (e) {
      return this.J7.readInt32(this.z7 + e);
    } else {
      return 0;
    }
  }
  healedchange() {
    var e = this.J7.__offset(this.z7, 54);
    if (e) {
      return this.J7.readInt32(this.z7 + e);
    } else {
      return 0;
    }
  }
  damagereducephys() {
    var e = this.J7.__offset(this.z7, 56);
    if (e) {
      return this.J7.readInt32(this.z7 + e);
    } else {
      return 0;
    }
  }
  damagereduceelement1() {
    var e = this.J7.__offset(this.z7, 58);
    if (e) {
      return this.J7.readInt32(this.z7 + e);
    } else {
      return 0;
    }
  }
  damagereduceelement2() {
    var e = this.J7.__offset(this.z7, 60);
    if (e) {
      return this.J7.readInt32(this.z7 + e);
    } else {
      return 0;
    }
  }
  damagereduceelement3() {
    var e = this.J7.__offset(this.z7, 62);
    if (e) {
      return this.J7.readInt32(this.z7 + e);
    } else {
      return 0;
    }
  }
  damagereduceelement4() {
    var e = this.J7.__offset(this.z7, 64);
    if (e) {
      return this.J7.readInt32(this.z7 + e);
    } else {
      return 0;
    }
  }
  damagereduceelement5() {
    var e = this.J7.__offset(this.z7, 66);
    if (e) {
      return this.J7.readInt32(this.z7 + e);
    } else {
      return 0;
    }
  }
  damagereduceelement6() {
    var e = this.J7.__offset(this.z7, 68);
    if (e) {
      return this.J7.readInt32(this.z7 + e);
    } else {
      return 0;
    }
  }
  ignoredefrate() {
    var e = this.J7.__offset(this.z7, 70);
    if (e) {
      return this.J7.readInt32(this.z7 + e);
    } else {
      return 0;
    }
  }
  ignoredamageresistancephys() {
    var e = this.J7.__offset(this.z7, 72);
    if (e) {
      return this.J7.readInt32(this.z7 + e);
    } else {
      return 0;
    }
  }
  ignoredamageresistanceelement1() {
    var e = this.J7.__offset(this.z7, 74);
    if (e) {
      return this.J7.readInt32(this.z7 + e);
    } else {
      return 0;
    }
  }
  ignoredamageresistanceelement2() {
    var e = this.J7.__offset(this.z7, 76);
    if (e) {
      return this.J7.readInt32(this.z7 + e);
    } else {
      return 0;
    }
  }
  ignoredamageresistanceelement3() {
    var e = this.J7.__offset(this.z7, 78);
    if (e) {
      return this.J7.readInt32(this.z7 + e);
    } else {
      return 0;
    }
  }
  ignoredamageresistanceelement4() {
    var e = this.J7.__offset(this.z7, 80);
    if (e) {
      return this.J7.readInt32(this.z7 + e);
    } else {
      return 0;
    }
  }
  ignoredamageresistanceelement5() {
    var e = this.J7.__offset(this.z7, 82);
    if (e) {
      return this.J7.readInt32(this.z7 + e);
    } else {
      return 0;
    }
  }
  ignoredamageresistanceelement6() {
    var e = this.J7.__offset(this.z7, 84);
    if (e) {
      return this.J7.readInt32(this.z7 + e);
    } else {
      return 0;
    }
  }
  movespeed() {
    var e = this.J7.__offset(this.z7, 86);
    if (e) {
      return this.J7.readInt32(this.z7 + e);
    } else {
      return 200;
    }
  }
  skillcooldown() {
    var e = this.J7.__offset(this.z7, 88);
    if (e) {
      return this.J7.readInt32(this.z7 + e);
    } else {
      return 0;
    }
  }
  damageamplify1() {
    var e = this.J7.__offset(this.z7, 90);
    if (e) {
      return this.J7.readInt32(this.z7 + e);
    } else {
      return 0;
    }
  }
  damageamplify2() {
    var e = this.J7.__offset(this.z7, 92);
    if (e) {
      return this.J7.readInt32(this.z7 + e);
    } else {
      return 0;
    }
  }
  skillcooldownchangemin() {
    var e = this.J7.__offset(this.z7, 94);
    if (e) {
      return this.J7.readInt32(this.z7 + e);
    } else {
      return -5000;
    }
  }
}
exports.KSCBaseProperty = KSCBaseProperty;
//# sourceMappingURL=KSCBaseProperty.js.map