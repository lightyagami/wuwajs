"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KuroHitResultCache = exports.HitInformation = undefined;
const UE = require("ue");
const Stats_1 = require("../../../Core/Common/Stats");
const FNameUtil_1 = require("../../../Core/Utils/FNameUtil");
const Rotator_1 = require("../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const BulletDataMain_1 = require("./BulletConf/BulletDataMain");
class HitInformation {
  constructor(t, i, r, s, e, o, h, a, l, n, u, c, C, _, H, m) {
    this.HitPosition = Vector_1.Vector.Create();
    this.HitEffectRotation = Rotator_1.Rotator.Create();
    this.BulletId = 0;
    this.IsShaking = false;
    this.BulletEntityId = 0;
    this.CalculateType = -1;
    this.DamageId = 0;
    this.ShouldOptimize = false;
    if (a) {
      this.HitPosition.FromUeVector(a);
    } else {
      this.HitPosition.Reset();
    }
    if (e) {
      this.HitEffectRotation.FromUeRotator(e);
    } else {
      this.HitEffectRotation.Reset();
    }
    this.Target = i;
    this.HitPart = h;
    this.BulletId = s;
    this.SkillLevel = l;
    this.Attacker = t;
    this.IsShaking = o;
    this.HitEffect = r;
    this.ReBulletData = n;
    this.BulletDataPreset = C;
    this.BulletEntityId = _;
    this.BulletRowName = u;
    this.CalculateType = H;
    this.DamageId = c;
    this.DirectTarget = i;
    this.ShouldOptimize = m;
  }
  static FromUeHitInformation(t) {
    return new HitInformation(ControllerHolder_1.ControllerHolder.CharacterController.GetEntityByUeTsBaseCharacter(t.攻击者), ControllerHolder_1.ControllerHolder.CharacterController.GetEntityByUeTsBaseCharacter(t.受击者), t.被击效果, t.子弹ID, t.受击特效旋转, t.是否震动, t.受击部位, t.受击位置, t.技能等级, new BulletDataMain_1.BulletDataMain(t.重构子弹数据, "", false), t.子弹表ID, Number(t.伤害ID), t.子弹逻辑预设, t.子弹ID, t.伤害类型, false);
  }
  ToUeHitInformation() {
    return new UE.SHitInformation(ControllerHolder_1.ControllerHolder.CharacterController.GetUeTsBaseCharacterByEntity(this.Attacker), ControllerHolder_1.ControllerHolder.CharacterController.GetUeTsBaseCharacterByEntity(this.Target), this.HitEffect, this.BulletId, this.HitPosition.ToUeVectorOld(), this.HitEffectRotation.ToUeRotator(), this.IsShaking, this.HitPart, this.HitPosition.ToUeVectorOld(), this.SkillLevel, this.ReBulletData.Data, this.BulletDataPreset, this.BulletRowName, this.CalculateType, BigInt(this.DamageId));
  }
}
exports.HitInformation = HitInformation;
class KuroHitResultCache {
  constructor() {
    this.HitCount = 0;
    this.Actors = new Array();
    this.BoneNameArray = new Array();
    this.Components = new Array();
    this.ImpactPointX = new Array();
    this.ImpactPointY = new Array();
    this.ImpactPointZ = new Array();
  }
  Append(t) {
    KuroHitResultCache.MHo.Start();
    var i = t.GetHitCount();
    this.HitCount += i;
    var r = t.Actors;
    var s = t.BoneNameArray;
    var e = t.Components;
    var o = t.ImpactPointX_Array;
    var h = t.ImpactPointY_Array;
    var a = t.ImpactPointZ_Array;
    for (let t = 0; t < i; t++) {
      this.Actors.push(r.Get(t));
      this.BoneNameArray.push(FNameUtil_1.FNameUtil.GetDynamicFName(s.Get(t)));
      this.Components.push(e.Get(t));
      this.ImpactPointX.push(o.Get(t));
      this.ImpactPointY.push(h.Get(t));
      this.ImpactPointZ.push(a.Get(t));
    }
    KuroHitResultCache.MHo.Stop();
  }
}
(exports.KuroHitResultCache = KuroHitResultCache).MHo = Stats_1.Stat.Create("KuroHitResultCache");
//# sourceMappingURL=BulletTypes.js.map