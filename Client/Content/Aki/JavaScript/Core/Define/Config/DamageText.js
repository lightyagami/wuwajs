"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DamageText = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class DamageText {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get CommonIcon() {
    return this.commonicon();
  }
  get CritIcon() {
    return this.criticon();
  }
  get CritNiagaraPath() {
    return this.critniagarapath();
  }
  get TextColor() {
    return this.textcolor();
  }
  get StrokeColor() {
    return this.strokecolor();
  }
  get CritTextColor() {
    return this.crittextcolor();
  }
  get CritStrokeColor() {
    return this.critstrokecolor();
  }
  get MinDeviationX() {
    return this.mindeviationx();
  }
  get MinDeviationY() {
    return this.mindeviationy();
  }
  get MaxDeviationX() {
    return this.maxdeviationx();
  }
  get MaxDeviationY() {
    return this.maxdeviationy();
  }
  get OwnDamageSequence() {
    return this.owndamagesequence();
  }
  get OwnCriticalDamageSequence() {
    return this.owncriticaldamagesequence();
  }
  get MonsterDamageSequence() {
    return this.monsterdamagesequence();
  }
  get MonsterCriticalDamageSequence() {
    return this.monstercriticaldamagesequence();
  }
  get DamageTextSequence() {
    return this.damagetextsequence();
  }
  get IsPreload() {
    return this.ispreload();
  }
  get OwnCommonDamageCurvePath() {
    return GameUtils_1.GameUtils.ConvertToArray(this.owncommondamagecurvepathLength(), this.owncommondamagecurvepath, this);
  }
  get OwnCriticalDamageCurvePath() {
    return GameUtils_1.GameUtils.ConvertToArray(this.owncriticaldamagecurvepathLength(), this.owncriticaldamagecurvepath, this);
  }
  get MonsterCommonDamageCurvePath() {
    return GameUtils_1.GameUtils.ConvertToArray(this.monstercommondamagecurvepathLength(), this.monstercommondamagecurvepath, this);
  }
  get MonsterCriticalDamageCurvePath() {
    return GameUtils_1.GameUtils.ConvertToArray(this.monstercriticaldamagecurvepathLength(), this.monstercriticaldamagecurvepath, this);
  }
  get UseForOptimization() {
    return this.useforoptimization();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsDamageText(t, i) {
    return (i || new DamageText()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  commonicon(t) {
    var i = this.J7.__offset(this.z7, 6);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  criticon(t) {
    var i = this.J7.__offset(this.z7, 8);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  critniagarapath(t) {
    var i = this.J7.__offset(this.z7, 10);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  textcolor(t) {
    var i = this.J7.__offset(this.z7, 12);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  strokecolor(t) {
    var i = this.J7.__offset(this.z7, 14);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  crittextcolor(t) {
    var i = this.J7.__offset(this.z7, 16);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  critstrokecolor(t) {
    var i = this.J7.__offset(this.z7, 18);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  mindeviationx() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  mindeviationy() {
    var t = this.J7.__offset(this.z7, 22);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  maxdeviationx() {
    var t = this.J7.__offset(this.z7, 24);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  maxdeviationy() {
    var t = this.J7.__offset(this.z7, 26);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  owndamagesequence(t) {
    var i = this.J7.__offset(this.z7, 28);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  owncriticaldamagesequence(t) {
    var i = this.J7.__offset(this.z7, 30);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  monsterdamagesequence(t) {
    var i = this.J7.__offset(this.z7, 32);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  monstercriticaldamagesequence(t) {
    var i = this.J7.__offset(this.z7, 34);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  damagetextsequence(t) {
    var i = this.J7.__offset(this.z7, 36);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  ispreload() {
    var t = this.J7.__offset(this.z7, 38);
    return !t || !!this.J7.readInt8(this.z7 + t);
  }
  GetOwncommondamagecurvepathAt(t) {
    return this.owncommondamagecurvepath(t);
  }
  owncommondamagecurvepath(t, i) {
    var e = this.J7.__offset(this.z7, 40);
    var e = e ? this.J7.__string(this.J7.__vector(this.z7 + e) + t * 4, i) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  owncommondamagecurvepathLength() {
    var t = this.J7.__offset(this.z7, 40);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetOwncriticaldamagecurvepathAt(t) {
    return this.owncriticaldamagecurvepath(t);
  }
  owncriticaldamagecurvepath(t, i) {
    var e = this.J7.__offset(this.z7, 42);
    var e = e ? this.J7.__string(this.J7.__vector(this.z7 + e) + t * 4, i) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  owncriticaldamagecurvepathLength() {
    var t = this.J7.__offset(this.z7, 42);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetMonstercommondamagecurvepathAt(t) {
    return this.monstercommondamagecurvepath(t);
  }
  monstercommondamagecurvepath(t, i) {
    var e = this.J7.__offset(this.z7, 44);
    var e = e ? this.J7.__string(this.J7.__vector(this.z7 + e) + t * 4, i) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  monstercommondamagecurvepathLength() {
    var t = this.J7.__offset(this.z7, 44);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetMonstercriticaldamagecurvepathAt(t) {
    return this.monstercriticaldamagecurvepath(t);
  }
  monstercriticaldamagecurvepath(t, i) {
    var e = this.J7.__offset(this.z7, 46);
    var e = e ? this.J7.__string(this.J7.__vector(this.z7 + e) + t * 4, i) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  monstercriticaldamagecurvepathLength() {
    var t = this.J7.__offset(this.z7, 46);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  useforoptimization() {
    var t = this.J7.__offset(this.z7, 48);
    return !t || !!this.J7.readInt8(this.z7 + t);
  }
}
exports.DamageText = DamageText;
//# sourceMappingURL=DamageText.js.map