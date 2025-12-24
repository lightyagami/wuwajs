"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecialSkillFuLuoLuo = undefined;
const Log_1 = require("../../../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../../../Core/Define/Net/Protocol");
const Vector_1 = require("../../../../../../../Core/Utils/Math/Vector");
const EventDefine_1 = require("../../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const PhantomUtil_1 = require("../../../../../../Module/Phantom/PhantomUtil");
const CharacterAttributeTypes_1 = require("../../Abilities/CharacterAttributeTypes");
const SpecialSkillBase_1 = require("./SpecialSkillBase");
const SPECIAL_ENERGY_COUNT = 6;
const SPECIAL_SKILL_ID = 1608301;
const DISTANCE_XY = 3000;
const DISTANCE_Z = 1500;
const DISTANCE_Z_DELTA = 200;
const RESET_SKILL = 1608942;
class SpecialSkillFuLuoLuo extends SpecialSkillBase_1.SpecialSkillBase {
  constructor() {
    super(...arguments);
    this.Jh = undefined;
    this.Gin = undefined;
    this.pKu = false;
    this.$te = undefined;
    this.Xte = undefined;
    this.n$t = undefined;
    this.ewu = [];
    this.Lz = Vector_1.Vector.Create();
    this.aO1 = false;
    this._yo = (t, e, i) => {
      if (e === 0 && this.ewu.length !== 0 && (this.ewu.length = 0, Log_1.Log.CheckDebug())) {
        Log_1.Log.Debug("Battle", 17, "SpecialSkillFuLuoLuo 弗洛洛特殊能量被清空");
      }
    };
    this.Qin = (t, e, i) => {
      this.RefreshStarScarMaterial();
    };
    this.Zre = (t, e) => {
      if (SPECIAL_SKILL_ID === e) {
        this.QQu(true);
      }
    };
    this.ene = (t, e) => {
      if (SPECIAL_SKILL_ID === e) {
        this.QQu(false);
      }
    };
    this.lF1 = (t, e) => {
      if (t !== e) {
        this._F1(t);
      }
    };
    this.uF1 = (t, e) => {
      if (t !== e) {
        this._F1(t);
      }
    };
  }
  OnStart() {
    this.Jh = this.SpecialSkillComponent.Entity;
    this.$te = this.Jh.GetComponent(181);
    this.Xte = this.Jh.GetComponent(203);
    this.n$t = this.Jh.CheckGetComponent(3);
    this.Jh.GetComponent(98)?.SetEnableRefreshStarScarByEnergy(false);
    var t = this.Jh.GetComponent(0);
    this.aO1 = ModelManager_1.ModelManager.CreatureModel.GetPlayerId() === t.GetPlayerId();
    this.fwu();
    this.RefreshStarScarMaterial();
    if (this.aO1) {
      EventSystem_1.EventSystem.AddWithTarget(this.Jh, EventDefine_1.EEventName.CharUseSkill, this.Zre);
      EventSystem_1.EventSystem.AddWithTarget(this.Jh, EventDefine_1.EEventName.OnSkillEnd, this.ene);
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnBeforeChangeRole, this.lF1);
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnBeforeUpdateSceneTeam, this.uF1);
      if (this.$te) {
        this.$te.AddListener(CharacterAttributeTypes_1.EAttributeId.Proto_SpecialEnergy1, this._yo);
        this.$te?.AddListener(CharacterAttributeTypes_1.EAttributeId.Proto_SpecialEnergy2, this.Qin);
      }
    } else if (this.$te) {
      this.$te?.AddListener(CharacterAttributeTypes_1.EAttributeId.Proto_SpecialEnergy2, this.Qin);
    }
  }
  OnEnd() {
    if (this.aO1) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnBeforeChangeRole, this.lF1);
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnBeforeUpdateSceneTeam, this.uF1);
      if (this.Jh) {
        EventSystem_1.EventSystem.RemoveWithTarget(this.Jh, EventDefine_1.EEventName.CharUseSkill, this.Zre);
        EventSystem_1.EventSystem.RemoveWithTarget(this.Jh, EventDefine_1.EEventName.OnSkillEnd, this.ene);
        this.Jh = undefined;
      }
      if (this.$te) {
        this.$te.RemoveListener(CharacterAttributeTypes_1.EAttributeId.Proto_SpecialEnergy1, this._yo);
        this.$te.RemoveListener(CharacterAttributeTypes_1.EAttributeId.Proto_SpecialEnergy2, this.Qin);
      }
    } else if (this.$te) {
      this.$te.RemoveListener(CharacterAttributeTypes_1.EAttributeId.Proto_SpecialEnergy2, this.Qin);
    }
  }
  fwu() {
    this.ewu.length = 0;
    var e = this.$te?.GetCurrentValue(CharacterAttributeTypes_1.EAttributeId.Proto_SpecialEnergy1) ?? 0;
    for (let t = 0; t < SPECIAL_ENERGY_COUNT; t++) {
      var i = (SPECIAL_ENERGY_COUNT - t - 1) * 2;
      var i = (e & 3 << i) >> i;
      if (i > 0) {
        this.ewu.push(i);
      }
    }
  }
  GetSpecialEnergyType(t) {
    return this.ewu[t] ?? 0;
  }
  AddSpecialEnergy(t) {
    if (this.ewu.length < SPECIAL_ENERGY_COUNT) {
      this.ewu.push(t);
      this.gwu();
    } else if (!this.Xte?.HasTag(-686337478)) {
      let e = false;
      for (let t = 0; t < SPECIAL_ENERGY_COUNT; t++) {
        if (!e) {
          if (this.ewu[t] !== 3) {
            e = true;
          }
        }
        if (e && t !== SPECIAL_ENERGY_COUNT - 1) {
          this.ewu[t] = this.ewu[t + 1];
        }
      }
      if (e && (this.ewu[SPECIAL_ENERGY_COUNT - 1] = t, this.$te) && (t = this.$te.GetBaseValue(CharacterAttributeTypes_1.EAttributeId.Proto_SpecialEnergy1), this.gwu(), t === this.$te.GetBaseValue(CharacterAttributeTypes_1.EAttributeId.Proto_SpecialEnergy1))) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.FuLuoLuoAddDuplicatedEnergy, this.Jh?.Id ?? 0);
      }
    }
  }
  RemoveSpecialEnergy() {
    if (!(this.ewu.length <= 0)) {
      this.ewu.shift();
      this.gwu();
    }
  }
  gwu() {
    let t = 0;
    for (const e of this.ewu) {
      t = (t <<= 2) + e;
    }
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 17, "SpecialSkillFuLuoLuo", ["弗洛洛特殊能量", this.ewu], ["", t]);
    }
    this.$te?.SetBaseValue(CharacterAttributeTypes_1.EAttributeId.Proto_SpecialEnergy1, t);
  }
  OnTick(t) {
    var e;
    var i;
    var s;
    if (this.pKu && this.Gin && this.Jh && (e = this.Jh.GetComponent(1).ActorLocationProxy, s = (i = this.Gin.GetComponent(1)).ActorLocationProxy, Vector_1.Vector.DistSquaredXY(e, s) > DISTANCE_XY * DISTANCE_XY && (s.Subtraction(e, this.Lz), this.Lz.Normalize(), this.Lz.MultiplyEqual(DISTANCE_XY), this.Lz.AdditionEqual(e), i?.SetActorLocation(this.Lz.ToUeVector(), "弗洛洛大招移动范围限制", false)), Math.abs(e.Z - s.Z) > DISTANCE_Z)) {
      this.Lz.X = e.X;
      this.Lz.Y = e.Y;
      this.Lz.Z = e.Z - DISTANCE_Z_DELTA;
      i?.SetActorLocation(this.Lz.ToUeVector(), "弗洛洛大招Z超范围", false);
      this.Gin.GetComponent(41)?.BeginSkill(RESET_SKILL);
    }
  }
  QQu(t) {
    var e = PhantomUtil_1.PhantomUtil.GetSummonedEntity(this.Jh, Protocol_1.Aki.Protocol.Summon.x3s.Proto_ESummonTypeConcomitantCustom, 2)?.Entity;
    if (e) {
      (this.Gin = e)?.GetComponent(187)?.SetWalkOffLedgeRecord(!t);
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Movement", 35, "弗洛洛大招边缘保护", ["开关", t]);
      }
      this.pKu = t;
    } else {
      this.Gin = undefined;
    }
  }
  RefreshStarScarMaterial() {
    var t;
    var e;
    if (this.$te) {
      t = this.$te.GetCurrentValue(CharacterAttributeTypes_1.EAttributeId.Proto_SpecialEnergy2);
      e = this.$te.GetCurrentValue(CharacterAttributeTypes_1.EAttributeId.Proto_SpecialEnergy2Max);
      this.n$t?.Actor?.CharRenderingComponent.SetStarScarEnergy(t / e);
    }
  }
  _F1(t) {
    if (this.pKu && t?.Entity === this.Jh) {
      this.Jh?.GetComponent(99)?.DisableRoleWithoutEffect();
    }
  }
}
exports.SpecialSkillFuLuoLuo = SpecialSkillFuLuoLuo;
//# sourceMappingURL=SpecialSkillFuLuoLuo.js.map