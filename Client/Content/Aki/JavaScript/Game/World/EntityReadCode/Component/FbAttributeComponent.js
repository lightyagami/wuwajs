"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbAttributeComponent = undefined;
const UnionFightMusicsSwitchTypeHelper_1 = require("./UnionFightMusicsSwitchTypeHelper");
const UnionWorldLevelBonusHelper_1 = require("./UnionWorldLevelBonusHelper");
class FbAttributeComponent {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
    this.owh = false;
    this.nwh = 0;
    this.swh = false;
    this.awh = 0;
    this.hwh = false;
    this.lwh = 0;
    this.Muh = false;
    this.jGi = 0;
    this.Kb1 = false;
    this.Xb1 = 0;
    this._wh = false;
    this.cwh = 0;
    this.uwh = false;
    this.dwh = 0;
    this.mwh = false;
    this.Cwh = 0;
    this.gwh = false;
    this.fwh = undefined;
    this.pwh = false;
    this.vwh = undefined;
    this.pbh = false;
    this.vbh = undefined;
    this.ywh = false;
    this.Swh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbAttributeComponent(t);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get PropertyId() {
    if (!this.owh) {
      this.owh = true;
      this.nwh = this.FbDataInternal.propertyId();
    }
    return this.nwh;
  }
  get MonsterPropExtraRateId() {
    if (!this.swh) {
      this.swh = true;
      this.awh = this.FbDataInternal.monsterPropExtraRateId();
    }
    return this.awh;
  }
  get MonsterPropGrowthId() {
    if (!this.hwh) {
      this.hwh = true;
      this.lwh = this.FbDataInternal.monsterPropGrowthId();
    }
    return this.lwh;
  }
  get Level() {
    if (!this.Muh) {
      this.Muh = true;
      this.jGi = this.FbDataInternal.level();
    }
    return this.jGi;
  }
  get MoraleLevel() {
    if (!this.Kb1) {
      this.Kb1 = true;
      this.Xb1 = this.FbDataInternal.moraleLevel();
    }
    return this.Xb1;
  }
  get RageModeId() {
    if (!this._wh) {
      this._wh = true;
      this.cwh = this.FbDataInternal.rageModeId();
    }
    return this.cwh;
  }
  get HardnessModeId() {
    if (!this.uwh) {
      this.uwh = true;
      this.dwh = this.FbDataInternal.hardnessModeId();
    }
    return this.dwh;
  }
  get WorldLevelBonusId() {
    if (!this.mwh) {
      this.mwh = true;
      this.Cwh = this.FbDataInternal.worldLevelBonusId();
    }
    return this.Cwh;
  }
  get FightMusics() {
    var t;
    var i;
    if (!this.gwh && (this.gwh = true, t = this.FbDataInternal.fightMusicsType(), i = UnionFightMusicsSwitchTypeHelper_1.UnionFightMusicsSwitchTypeHelper.GetUnionFightMusicsSwitchTypeObject(t))) {
      this.fwh = UnionFightMusicsSwitchTypeHelper_1.UnionFightMusicsSwitchTypeHelper.ReadUnionFightMusicsSwitchType(t, this.FbDataInternal.fightMusics(i));
    }
    return this.fwh;
  }
  get FightMusic() {
    if (!this.pwh) {
      this.pwh = true;
      this.vwh = this.FbDataInternal.fightMusic();
    }
    return this.vwh;
  }
  get AppendBuffIds() {
    if (!this.pbh) {
      this.pbh = true;
      this.vbh = new Array();
      var i = this.FbDataInternal.appendBuffIdsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          this.vbh.push(Number(this.FbDataInternal.appendBuffIds(t) ?? 0));
        }
      }
    }
    return this.vbh;
  }
  get WorldLevelBonusType() {
    var t;
    var i;
    if (!this.ywh && (this.ywh = true, t = this.FbDataInternal.worldLevelBonusTypeType(), i = UnionWorldLevelBonusHelper_1.UnionWorldLevelBonusHelper.GetUnionWorldLevelBonusObject(t))) {
      this.Swh = UnionWorldLevelBonusHelper_1.UnionWorldLevelBonusHelper.ReadUnionWorldLevelBonus(t, this.FbDataInternal.worldLevelBonusType(i));
    }
    return this.Swh;
  }
}
exports.FbAttributeComponent = FbAttributeComponent;
//# sourceMappingURL=FbAttributeComponent.js.map