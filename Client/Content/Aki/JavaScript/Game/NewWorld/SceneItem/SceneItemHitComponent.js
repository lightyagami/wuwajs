"use strict";

var SceneItemHitComponent_1;
var __decorate = this && this.__decorate || function (t, e, i, n) {
  var s;
  var r = arguments.length;
  var o = r < 3 ? e : n === null ? n = Object.getOwnPropertyDescriptor(e, i) : n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    o = Reflect.decorate(t, e, i, n);
  } else {
    for (var h = t.length - 1; h >= 0; h--) {
      if (s = t[h]) {
        o = (r < 3 ? s(o) : r > 3 ? s(e, i, o) : s(e, i)) || o;
      }
    }
  }
  if (r > 3 && o) {
    Object.defineProperty(e, i, o);
  }
  return o;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneItemHitComponent = undefined;
const UE = require("ue");
const EntityComponent_1 = require("../../../Core/Entity/EntityComponent");
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent");
const Rotator_1 = require("../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const IComponent_1 = require("../../../UniverseEditor/Interface/IComponent");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const LevelGamePlayController_1 = require("../../LevelGamePlay/LevelGamePlayController");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const SceneInteractionManager_1 = require("../../Render/Scene/Interaction/SceneInteractionManager");
const BulletCollisionUtil_1 = require("../Bullet/BulletStaticMethod/BulletCollisionUtil");
const BulletUtil_1 = require("../Bullet/BulletUtil");
const AimPartUtils_1 = require("../Common/AimPartUtils");
const SceneItemHitUtils_1 = require("./Util/SceneItemHitUtils");
class ComponentHitReg {
  constructor() {
    this.ComponentHitConditionCheck = [];
    this.ComponentHitBaseConfig = undefined;
  }
}
let SceneItemHitComponent = SceneItemHitComponent_1 = class SceneItemHitComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.inn = undefined;
    this.Hte = undefined;
    this.Ifn = undefined;
    this.Tfn = new Array();
    this.Lfn = new Map();
    this.Dfn = undefined;
    this.Rfn = undefined;
    this.Ufn = undefined;
    this.Afn = Rotator_1.Rotator.Create();
    this.w0n = 0;
    this.AimParts = new Array();
    this.Pla = undefined;
    this.kSa = undefined;
    this.wla = t => SceneItemHitUtils_1.SceneItemHitUtils.CheckHitDataMatchPlayerAttack(t);
    this.Bla = t => SceneItemHitUtils_1.SceneItemHitUtils.CheckHitDataMatchFixedBulletId(this.Pla, t);
  }
  OnStart() {
    this.inn = this.Entity.GetComponent(196);
    this.Ifn = this.Entity.GetComponent(130);
    this.Hte = this.Entity.GetComponent(202);
    this.w0n = this.Entity.GetComponent(0).GetEntityOnlineInteractType();
    var t = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(this.Hte?.CreatureData.GetPbDataId());
    if (t &&= (0, IComponent_1.getComponent)(t.ComponentsData, "HitComponent")) {
      this.kSa = t;
    }
    return true;
  }
  OnActivate() {
    if (this.kSa) {
      switch (this.kSa.HitBullet?.Type) {
        case IComponent_1.EHitBulletType.PlayerAttack:
          this.AddHitCondition(this.wla);
          break;
        case IComponent_1.EHitBulletType.FixedBulletId:
          this.Pla = this.kSa.HitBullet;
          this.AddHitCondition(this.Bla);
      }
      if (this.kSa.AimParts && this.Hte) {
        for (const e of this.kSa.AimParts) {
          var t = new AimPartUtils_1.AimPart(this.Hte);
          t.InitSceneItem(e);
          this.AimParts.push(t);
        }
      }
      if (this.kSa?.AttackerHitTimeScaleRatio) {
        this.Dfn = this.kSa.AttackerHitTimeScaleRatio;
      }
      if (this.kSa?.VictimHitTimeScaleRatio) {
        this.Rfn = this.kSa.VictimHitTimeScaleRatio;
      }
    }
  }
  Pfn(t) {
    if (this.inn.HasTag(-1431780499)) {
      return false;
    }
    if (this.Ifn?.IsLocked) {
      return false;
    }
    if (this.Entity.GetComponent(0)?.IsConcealed) {
      return false;
    }
    let e = true;
    if (this.Tfn.length > 0) {
      for (const i of this.Tfn) {
        if (!(e &&= i(t))) {
          break;
        }
      }
    }
    return e;
  }
  xfn(t, e) {
    t = this.Lfn.get(t)?.ComponentHitConditionCheck;
    if (t === undefined) {
      return true;
    }
    let i = true;
    if (t.length > 0) {
      for (const n of t) {
        if (!(i &&= n(e))) {
          break;
        }
      }
    }
    return i;
  }
  wfn(t, e) {
    t = this.Lfn.get(t)?.ComponentHitBaseConfig?.HitBullet;
    return !t || SceneItemHitUtils_1.SceneItemHitUtils.CheckHitDataMatchBulletType(t, e, this.Entity);
  }
  OnSceneItemHit(t, e) {
    EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemEntityHitAlways, t);
    if (!LevelGamePlayController_1.LevelGamePlayController.MultiplayerLimitTypeCheck(this.w0n, false)) {
      return false;
    }
    var i = EntitySystem_1.EntitySystem.Get(t.BulletEntityId)?.GetBulletInfo();
    if (i) {
      if (this.Entity.GetComponent(162)?.ReboundBullet(t, i)) {
        return false;
      }
      if (t.CalculateType !== 0) {
        if (t.ReBulletData.TimeScale.TimeScaleOnHit) {
          this.Ofn(t);
        }
        return false;
      }
      if (this.Pfn(t)) {
        this.bfn(t);
        this.WVr(t, i.EffectInfo.DisablePostProcess);
        this.Bfn(t, e);
        this.iwr(t);
        for (var [n] of this.Lfn) {
          if (this.wfn(n, t) && this.xfn(n, t)) {
            this.qfn(n, t);
          }
        }
        EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemEntityHit);
        EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemEntityHitByHitActorData, e);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAnySceneItemEntityHit, this.Entity);
      } else {
        this.WVr(t, i.EffectInfo.DisablePostProcess);
      }
    } else {
      this.WVr(t, false);
    }
    return true;
  }
  GetPenetrationType() {
    return this.Entity.GetComponent(0).GetBaseInfo().Category.BulletPenetrationType;
  }
  WVr(t, e) {
    let i = undefined;
    var n = t.ReBulletData.Render.EffectOnHit.get(12);
    if ((i = n && n.length > 0 && t.Attacker.GetComponent(205)?.HasTag(412116357) ? n : i) || (i = t.ReBulletData.Render.EffectOnHit.get(4)) && i.length !== 0) {
      n = new UE.TransformDouble(t.HitEffectRotation.ToUeRotator(), t.HitPosition.ToUeVector(), Vector_1.Vector.OneVectorDouble);
      BulletCollisionUtil_1.BulletCollisionUtil.PlaySceneItemHitEffect(t.Attacker, i, n, t.ReBulletData.Render.AudioOnHit, e);
    }
  }
  Bfn(e, i) {
    var n = this.Entity.GetComponent(196);
    if (n) {
      var s = SceneInteractionManager_1.SceneInteractionManager.Get().GetPartCollisionActorsNum(this.Hte.GetSceneInteractionLevelHandleId());
      let t = undefined;
      if (s && s > 0) {
        if (i.ValidProcessIndex === 1) {
          t = SceneInteractionManager_1.SceneInteractionManager.Get().GetPartCollisionActorTag(this.Hte.GetSceneInteractionLevelHandleId(), i.Actor)?.TagId;
        }
      } else {
        i = (s = EntitySystem_1.EntitySystem.Get(e.BulletEntityId).GetBulletInfo()).CollisionInfo.BeHitEffect;
        e = ConfigManager_1.ConfigManager.BulletConfig.GetBulletHitData(s.Attacker, i);
        BulletUtil_1.BulletUtil.GetHitRotator(s, this.Hte, this.Afn);
        i = BulletUtil_1.BulletUtil.GetOverrideHitAnimByAngle(this.Hte, e?.被击动作, this.Afn.Yaw);
        t = this.Gfn(i);
      }
      if (this.Ufn !== undefined) {
        n.RemoveTag(this.Ufn);
        this.Ufn = undefined;
      }
      if (t !== undefined) {
        n.AddTag(t);
        this.Ufn = t;
      }
    }
  }
  bfn(t) {
    if (t.HitEffect) {
      this.Hte.UpdateHitInfo(t.HitPosition, t.HitEffect.地面受击速度);
    }
  }
  qfn(t, e) {
    if (t?.Valid) {
      EventSystem_1.EventSystem.EmitWithTarget(t, EventDefine_1.EEventName.OnSceneItemHit);
      EventSystem_1.EventSystem.EmitWithTarget(t, EventDefine_1.EEventName.OnSceneItemHitByHitData, e);
    }
  }
  iwr(t) {
    this.Nfn(t);
    this.Ofn(t);
  }
  Nfn(e) {
    var t;
    var i = e.ReBulletData.TimeScale;
    var n = i.TimeScaleOnAttack;
    var s = this.Dfn?.ValueRatio ?? 1;
    var r = this.Dfn?.TimeRatio ?? 1;
    var o = this.Dfn?.MaxExtraTime ?? 0;
    if (i.TimeScaleOnAttackIgnoreAttacker) {
      if (n.时间膨胀时长 > 0) {
        t = EntitySystem_1.EntitySystem.Get(e.BulletEntityId).GetBulletInfo();
        BulletUtil_1.BulletUtil.SetTimeScale(t, n.优先级, n.时间膨胀值 * s, n.时间膨胀变化曲线, Math.min(n.时间膨胀时长 * r, n.时间膨胀时长 + o), 1);
      }
    } else if (n.时间膨胀时长 > 0) {
      e.Attacker.GetComponent(122)?.SetTimeScale(n.优先级 - 1, n.时间膨胀值 * s, n.时间膨胀变化曲线, Math.min(n.时间膨胀时长 * r, n.时间膨胀时长 + o), 1);
      var h = i.CharacterCustomKeyTimeScale;
      var a = h?.length ?? 0;
      for (let t = 0; t < a; t++) {
        var l = ModelManager_1.ModelManager.BulletModel.GetEntityIdByCustomKey(e.Attacker.Id, h[t], e.BulletId.toString());
        if (!l) {
          return;
        }
        EntitySystem_1.EntitySystem.Get(l)?.GetComponent(122)?.SetTimeScale(n.优先级, n.时间膨胀值 * s, n.时间膨胀变化曲线, Math.min(n.时间膨胀时长 * r, n.时间膨胀时长 + o), 1);
      }
    }
  }
  Ofn(t) {
    var e;
    var i;
    var n;
    var s;
    var r;
    var o;
    if (!t.ReBulletData.Base.ContinuesCollision) {
      if ((e = this.Entity.GetComponent(122)) && (n = (i = t.ReBulletData.TimeScale).TimeScaleOnHit, s = this.Rfn?.ValueRatio ?? 1, r = this.Rfn?.TimeRatio ?? 1, o = this.Rfn?.MaxExtraTime ?? 0, n.时间膨胀时长 > 0)) {
        BulletUtil_1.BulletUtil.SetVictimTimeScale(t.BulletEntityId, this.Entity.Id, e, n.优先级, n.时间膨胀值 * s, n.时间膨胀变化曲线, Math.min(n.时间膨胀时长 * r, n.时间膨胀时长 + o), 2, i.RemoveHitTimeScaleOnDestroy, this.$vl(t));
      }
    }
  }
  $vl(t) {
    var e;
    return !!this.kSa?.HitBullet && this.kSa.HitBullet.Type === IComponent_1.EHitBulletType.FixedBulletId && !((e = this.kSa.HitBullet.BulletId).length <= 0) && !!e.includes(t.BulletId);
  }
  AddHitCondition(t) {
    this.Tfn.push(t);
  }
  RemoveHitCondition(t) {
    t = this.Tfn.indexOf(t);
    if (t !== -1) {
      this.Tfn.splice(t, 1);
    }
  }
  RegisterComponent(t, e) {
    var i;
    if (!this.Lfn.has(t)) {
      (i = new ComponentHitReg()).ComponentHitBaseConfig = e;
      this.Lfn.set(t, i);
      if (e) {
        this.kSa = e;
      }
    }
  }
  AddComponentHitCondition(t, e) {
    var i;
    if (!this.Lfn.has(t)) {
      i = new ComponentHitReg();
      this.Lfn.set(t, i);
    }
    this.Lfn.get(t).ComponentHitConditionCheck.push(e);
  }
  RemoveComponentHitCondition(t, e) {
    t = this.Lfn.get(t)?.ComponentHitConditionCheck;
    if (t !== undefined && (e = t.indexOf(e)) !== -1) {
      t.splice(e, 1);
    }
  }
  Gfn(t) {
    return SceneItemHitComponent_1.kfn.get(t);
  }
};
SceneItemHitComponent.kfn = new Map([[8, 631236362], [1, -40693742], [9, 1688432695], [0, 178446985], [10, -1474770640], [3, -1876401816], [11, -350051159], [2, -2061161961]]);
SceneItemHitComponent = SceneItemHitComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(154)], SceneItemHitComponent);
exports.SceneItemHitComponent = SceneItemHitComponent; //# sourceMappingURL=SceneItemHitComponent.js.map