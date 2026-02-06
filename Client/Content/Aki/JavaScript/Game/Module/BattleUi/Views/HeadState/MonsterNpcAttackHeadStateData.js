"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MonsterNpcAttackHeadStateData = undefined;
const CharacterAttributeTypes_1 = require("../../../../NewWorld/Character/Common/Component/Abilities/CharacterAttributeTypes");
const HeadStateData_1 = require("./HeadStateData");
class MonsterNpcAttackHeadStateData extends HeadStateData_1.HeadStateData {
  constructor() {
    super(...arguments);
    this.mpd = undefined;
    this.fpd = undefined;
    this.gpd = undefined;
    this.Cpd = undefined;
    this.ppd = undefined;
    this.vpd = undefined;
    this.ypd = undefined;
    this.Spd = undefined;
    this.Mpd = undefined;
    this.Epd = undefined;
    this.Ipd = undefined;
    this.Tpd = undefined;
    this.bpd = undefined;
    this.JCd = (t, i, s) => {
      if (this.ypd) {
        this.ypd(t, i, s);
      }
    };
    this.epd = (t, i) => {
      if (this.Spd) {
        this.Spd(t, i);
      }
    };
    this.ipd = (t, i) => {
      if (this.Mpd) {
        this.Mpd(t, i);
      }
    };
    this.opd = (t, i) => {
      if (this.Epd) {
        this.Epd(t, i);
      }
    };
    this.spd = (t, i) => {
      if (this.Ipd) {
        this.Ipd(t, i);
      }
    };
    this.hpd = (t, i) => {
      if (this.Tpd) {
        this.Tpd(t, i);
      }
    };
    this._pd = (t, i) => {
      if (this.bpd) {
        this.bpd(t, i);
      }
    };
  }
  UnBindAllCallback() {
    super.UnBindAllCallback();
    this.ypd = undefined;
    this.Spd = undefined;
    this.Mpd = undefined;
    this.Epd = undefined;
    this.Ipd = undefined;
    this.Tpd = undefined;
    this.bpd = undefined;
  }
  AddEntityEvents() {
    super.AddEntityEvents();
    var t = this.Entity?.GetComponent(184);
    if (t?.Valid) {
      t.AddListener(CharacterAttributeTypes_1.EAttributeId.Proto_SpecialEnergy4, this.JCd, "SpecialEnergy4.MonsterNpcAttackHeadState");
      t.AddListener(CharacterAttributeTypes_1.EAttributeId.Proto_SpecialEnergy4Max, this.JCd, "SpecialEnergy4Max.HeadState");
    }
    var t = this.Entity?.GetComponent(217);
    if (t?.Valid) {
      this.mpd = t.ListenForTagAddOrRemove(792676641, this.epd);
      this.fpd = t.ListenForTagAddOrRemove(-325960901, this.ipd);
      this.gpd = t.ListenForTagAddOrRemove(314261857, this.opd);
      this.Cpd = t.ListenForTagAddOrRemove(1921770646, this.spd);
      this.ppd = t.ListenForTagAddOrRemove(897633166, this.hpd);
      this.vpd = t.ListenForTagAddOrRemove(-1737347985, this._pd);
    }
  }
  RemoveEntityEvents() {
    super.RemoveEntityEvents();
    var t = this.Entity?.GetComponent(184);
    if (t?.Valid) {
      t.RemoveListener(CharacterAttributeTypes_1.EAttributeId.Proto_SpecialEnergy4, this.JCd);
      t.RemoveListener(CharacterAttributeTypes_1.EAttributeId.Proto_SpecialEnergy4Max, this.JCd);
    }
    this.fpd?.EndTask();
    this.fpd = undefined;
    this.mpd?.EndTask();
    this.mpd = undefined;
    this.gpd?.EndTask();
    this.gpd = undefined;
    this.Cpd?.EndTask();
    this.Cpd = undefined;
    this.ppd?.EndTask();
    this.ppd = undefined;
    this.vpd?.EndTask();
    this.vpd = undefined;
  }
  BindOnSpecialEnergy4Changed(t) {
    this.ypd = t;
  }
  BindOnSlowChargeStateChanged(t) {
    this.Spd = t;
  }
  BindOnFastChargeStateChanged(t) {
    this.Mpd = t;
  }
  BindOnAttackReadyStateChanged(t) {
    this.Epd = t;
  }
  BindOnAttackBeginStateChanged(t) {
    this.Ipd = t;
  }
  BindOnAttackEndStateChanged(t) {
    this.Tpd = t;
  }
  BindOnAttackBrokenStateChanged(t) {
    this.bpd = t;
  }
}
exports.MonsterNpcAttackHeadStateData = MonsterNpcAttackHeadStateData;
//# sourceMappingURL=MonsterNpcAttackHeadStateData.js.map