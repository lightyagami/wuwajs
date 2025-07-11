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
const DISTANCE = 3000;
class SpecialSkillFuLuoLuo extends SpecialSkillBase_1.SpecialSkillBase {
  constructor() {
    super(...arguments);
    this.Jh = undefined;
    this.Gin = undefined;
    this.RHc = false;
    this.$te = undefined;
    this.Xte = undefined;
    this.KRu = [];
    this.Lz = Vector_1.Vector.Create();
    this.aO1 = false;
    this._yo = (t, e, i) => {
      if (e === 0 && this.KRu.length !== 0 && (this.KRu.length = 0, Log_1.Log.CheckDebug())) {
        Log_1.Log.Debug("Battle", 17, "SpecialSkillFuLuoLuo 弗洛洛特殊能量被清空");
      }
    };
    this.Zre = (t, e) => {
      if (SPECIAL_SKILL_ID === e) {
        this.THc(true);
      }
    };
    this.ene = (t, e) => {
      if (SPECIAL_SKILL_ID === e) {
        this.THc(false);
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
    this.$te = this.Jh.GetComponent(172);
    this.Xte = this.Jh.GetComponent(193);
    var t = this.Jh.GetComponent(0);
    this.aO1 = ModelManager_1.ModelManager.CreatureModel.GetPlayerId() === t.GetPlayerId();
    this.lwu();
    if (this.aO1 && (EventSystem_1.EventSystem.AddWithTarget(this.Jh, EventDefine_1.EEventName.CharUseSkill, this.Zre), EventSystem_1.EventSystem.AddWithTarget(this.Jh, EventDefine_1.EEventName.OnSkillEnd, this.ene), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnBeforeChangeRole, this.lF1), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnBeforeUpdateSceneTeam, this.uF1), this.$te)) {
      this.$te.AddListener(CharacterAttributeTypes_1.EAttributeId.Proto_SpecialEnergy1, this._yo);
    }
  }
  OnEnd() {
    if (this.aO1 && (EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnBeforeChangeRole, this.lF1), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnBeforeUpdateSceneTeam, this.uF1), this.Jh && (EventSystem_1.EventSystem.RemoveWithTarget(this.Jh, EventDefine_1.EEventName.CharUseSkill, this.Zre), EventSystem_1.EventSystem.RemoveWithTarget(this.Jh, EventDefine_1.EEventName.OnSkillEnd, this.ene), this.Jh = undefined), this.$te)) {
      this.$te.RemoveListener(CharacterAttributeTypes_1.EAttributeId.Proto_SpecialEnergy1, this._yo);
    }
  }
  lwu() {
    this.KRu.length = 0;
    var e = this.$te?.GetCurrentValue(CharacterAttributeTypes_1.EAttributeId.Proto_SpecialEnergy1) ?? 0;
    for (let t = 0; t < SPECIAL_ENERGY_COUNT; t++) {
      var i = (SPECIAL_ENERGY_COUNT - t - 1) * 2;
      var i = (e & 3 << i) >> i;
      if (i > 0) {
        this.KRu.push(i);
      }
    }
  }
  GetSpecialEnergyType(t) {
    return this.KRu[t] ?? 0;
  }
  AddSpecialEnergy(t) {
    if (this.KRu.length < SPECIAL_ENERGY_COUNT) {
      this.KRu.push(t);
      this._wu();
    } else if (!this.Xte?.HasTag(-686337478)) {
      let e = false;
      for (let t = 0; t < SPECIAL_ENERGY_COUNT; t++) {
        if (!e) {
          if (this.KRu[t] !== 3) {
            e = true;
          }
        }
        if (e && t !== SPECIAL_ENERGY_COUNT - 1) {
          this.KRu[t] = this.KRu[t + 1];
        }
      }
      if (e) {
        this.KRu[SPECIAL_ENERGY_COUNT - 1] = t;
        this._wu();
      }
    }
  }
  RemoveSpecialEnergy() {
    if (!(this.KRu.length <= 0)) {
      this.KRu.shift();
      this._wu();
    }
  }
  _wu() {
    let t = 0;
    for (const e of this.KRu) {
      t = (t <<= 2) + e;
    }
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 17, "SpecialSkillFuLuoLuo", ["弗洛洛特殊能量", this.KRu], ["", t]);
    }
    this.$te?.SetBaseValue(CharacterAttributeTypes_1.EAttributeId.Proto_SpecialEnergy1, t);
  }
  OnTick(t) {
    var e;
    var i;
    var s;
    if (this.RHc && this.Gin && this.Jh && (e = this.Jh.GetComponent(1).ActorLocationProxy, s = (i = this.Gin.GetComponent(1)).ActorLocationProxy, Vector_1.Vector.DistSquaredXY(e, s) > DISTANCE * DISTANCE)) {
      s.Subtraction(e, this.Lz);
      this.Lz.Normalize();
      this.Lz.MultiplyEqual(DISTANCE);
      this.Lz.AdditionEqual(e);
      i?.SetActorLocation(this.Lz.ToUeVector(), "弗洛洛大招移动范围限制", false);
    }
  }
  THc(t) {
    var e = PhantomUtil_1.PhantomUtil.GetSummonedEntity(this.Jh, Protocol_1.Aki.Protocol.Summon.x3s.Proto_ESummonTypeConcomitantCustom, 2)?.Entity;
    if (e) {
      (this.Gin = e)?.GetComponent(178)?.SetWalkOffLedgeRecord(!t);
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Movement", 35, "弗洛洛大招边缘保护", ["开关", t]);
      }
      this.RHc = t;
    } else {
      this.Gin = undefined;
    }
  }
  _F1(t) {
    if (this.RHc && t?.Entity === this.Jh) {
      this.Jh?.GetComponent(93)?.DisableRoleWithoutEffect();
    }
  }
}
exports.SpecialSkillFuLuoLuo = SpecialSkillFuLuoLuo;
//# sourceMappingURL=SpecialSkillFuLuoLuo.js.map