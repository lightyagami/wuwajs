"use strict";

var SceneItemHitComponent_1;
var __decorate = this && this.__decorate || function (t, e, i, n) {
  var r;
  var o = arguments.length;
  var s = o < 3 ? e : n === null ? n = Object.getOwnPropertyDescriptor(e, i) : n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    s = Reflect.decorate(t, e, i, n);
  } else {
    for (var a = t.length - 1; a >= 0; a--) {
      if (r = t[a]) {
        s = (o < 3 ? r(s) : o > 3 ? r(e, i, s) : r(e, i)) || s;
      }
    }
  }
  if (o > 3 && s) {
    Object.defineProperty(e, i, s);
  }
  return s;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneItemHitComponent = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const Time_1 = require("../../../Core/Common/Time");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
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
    this.ComponentHitConditionCheck = new Array();
    this.HitCompConfig = undefined;
  }
}
class BulletHitReg {
  constructor() {
    this.HitBullet = undefined;
    this.HitConditionCheck = new Array();
    this.AttackerHitTimeScaleRatio = undefined;
    this.VictimHitTimeScaleRatio = undefined;
  }
  SetupConfig(t, e, i) {
    this.HitBullet = t;
    this.AttackerHitTimeScaleRatio = e;
    this.VictimHitTimeScaleRatio = i;
  }
}
let SceneItemHitComponent = SceneItemHitComponent_1 = class SceneItemHitComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.inn = undefined;
    this.Hte = undefined;
    this.Ifn = undefined;
    this.Dcd = undefined;
    this.xcd = new Array();
    this.Ucd = new Map();
    this.Ufn = undefined;
    this.Afn = Rotator_1.Rotator.Create();
    this.w0n = 0;
    this.AimParts = new Array();
    this.Bcd = new Map();
    this.kcd = 0;
  }
  OnStart() {
    this.inn = this.Entity.GetComponent(200);
    this.Ifn = this.Entity.GetComponent(134);
    this.Hte = this.Entity.GetComponent(206);
    this.w0n = this.Entity.GetComponent(0).GetEntityOnlineInteractType();
    var t = this.Hte?.CreatureData;
    if (t) {
      if (t.GetEntityConfigType() === Protocol_1.Aki.Protocol.rLs.F6n) {
        var e = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(this.Hte?.CreatureData.GetPbDataId());
        if (!e) {
          return true;
        }
        e = (0, IComponent_1.getComponent)(e.ComponentsData, "HitComponent");
        if (e) {
          this.Dcd = e;
        }
      } else if (t.GetEntityConfigType() === Protocol_1.Aki.Protocol.rLs.Proto_Template) {
        e = ModelManager_1.ModelManager.CreatureModel.GetEntityTemplate(this.Hte.CreatureData.GetPbDataId());
        if (!e) {
          return true;
        }
        t = (0, IComponent_1.getComponent)(e.ComponentsData, "HitComponent");
        if (t) {
          this.Dcd = t;
        }
      }
    }
    this.Ocd(this.Dcd);
    return true;
  }
  Ocd(t) {
    var e = new BulletHitReg();
    e.SetupConfig(t?.HitBullet, t?.AttackerHitTimeScaleRatio, t?.VictimHitTimeScaleRatio);
    this.xcd.push(e);
    if (t?.BulletHitConfigs?.length) {
      for (const r of t.BulletHitConfigs) {
        var i = new BulletHitReg();
        i.SetupConfig(r.HitBullet, r.AttackerHitTimeScaleRatio, r.VictimHitTimeScaleRatio);
        this.xcd.push(i);
      }
    }
    if (t?.AimParts && this.Hte) {
      for (const o of t.AimParts) {
        var n = new AimPartUtils_1.AimPart(this.Hte);
        n.InitSceneItem(o);
        this.AimParts.push(n);
      }
    }
  }
  qcd(e, t = false) {
    if (this.kcd === Time_1.Time.Frame) {
      if (!t) {
        t = this.Bcd.get(e);
        if (t) {
          return t;
        }
      }
    } else {
      this.Bcd.clear();
      this.kcd = Time_1.Time.Frame;
    }
    let i = undefined;
    for (let t = this.xcd.length - 1; t >= 0; t--) {
      var n = this.xcd[t];
      if ((!this.Gcd(e) || n.HitBullet?.Type === IComponent_1.EHitBulletType.FixedBulletId) && (!n.HitBullet || SceneItemHitUtils_1.SceneItemHitUtils.CheckHitDataMatchBulletType(n.HitBullet, e, this.Entity))) {
        let t = true;
        for (const r of n.HitConditionCheck) {
          if (!(t &&= r(e))) {
            break;
          }
        }
        if (t) {
          i = n;
          break;
        }
      }
    }
    this.Bcd.set(e, i);
    return i;
  }
  Pfn(t) {
    return !this.inn.HasTag(-1431780499) && !this.Ifn?.IsLocked && !this.Entity.GetComponent(0)?.IsConcealed && this.qcd(t, true) !== undefined;
  }
  xfn(t, e) {
    t = this.Ucd.get(t)?.ComponentHitConditionCheck;
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
    t = this.Ucd.get(t)?.HitCompConfig?.HitBullet;
    return !t || SceneItemHitUtils_1.SceneItemHitUtils.CheckHitDataMatchBulletType(t, e, this.Entity);
  }
  OnSceneItemHit(t, e) {
    EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemEntityHitAlways, t);
    if (!LevelGamePlayController_1.LevelGamePlayController.MultiplayerLimitTypeCheck(this.w0n, false)) {
      return false;
    }
    var i = EntitySystem_1.EntitySystem.Get(t.BulletEntityId)?.GetBulletInfo();
    if (i) {
      if (this.Entity.GetComponent(166)?.ReboundBullet(t, i)) {
        return false;
      }
      if (this.Gcd(t)) {
        this.Fcd(t);
        return false;
      }
      if (t.CalculateType !== 0) {
        return false;
      }
      if (this.Pfn(t)) {
        this.bfn(t);
        this.WVr(t, i.EffectInfo.DisablePostProcess);
        this.Bfn(t, e);
        this.iwr(t);
        for (var [n] of this.Ucd) {
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
    if ((i = n && n.length > 0 && t.Attacker.GetComponent(209)?.HasTag(412116357) ? n : i) || (i = t.ReBulletData.Render.EffectOnHit.get(4)) && i.length !== 0) {
      n = new UE.TransformDouble(t.HitEffectRotation.ToUeRotator(), t.HitPosition.ToUeVector(), Vector_1.Vector.OneVectorDouble);
      BulletCollisionUtil_1.BulletCollisionUtil.PlaySceneItemHitEffect(t.Attacker, i, n, t.ReBulletData.Render.AudioOnHit, e);
    }
  }
  Bfn(e, i) {
    var n = this.Entity.GetComponent(200);
    if (n) {
      var r = SceneInteractionManager_1.SceneInteractionManager.Get().GetPartCollisionActorsNum(this.Hte.GetSceneInteractionLevelHandleId());
      let t = undefined;
      if (r && r > 0) {
        if (i.ValidProcessIndex === 1) {
          t = SceneInteractionManager_1.SceneInteractionManager.Get().GetPartCollisionActorTag(this.Hte.GetSceneInteractionLevelHandleId(), i.Actor)?.TagId;
        }
      } else {
        i = (r = EntitySystem_1.EntitySystem.Get(e.BulletEntityId).GetBulletInfo()).CollisionInfo.BeHitEffect;
        e = ConfigManager_1.ConfigManager.BulletConfig.GetBulletHitData(r.Attacker, i);
        BulletUtil_1.BulletUtil.GetHitRotator(r, this.Hte, this.Afn);
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
    var t = e.ReBulletData.TimeScale;
    var i = t.TimeScaleOnAttack;
    var n = this.qcd(e);
    var r = n?.AttackerHitTimeScaleRatio?.ValueRatio ?? 1;
    var o = n?.AttackerHitTimeScaleRatio?.TimeRatio ?? 1;
    var s = n?.AttackerHitTimeScaleRatio?.MaxExtraTime ?? 0;
    if (t.TimeScaleOnAttackIgnoreAttacker) {
      if (i.时间膨胀时长 > 0) {
        n = EntitySystem_1.EntitySystem.Get(e.BulletEntityId).GetBulletInfo();
        BulletUtil_1.BulletUtil.SetTimeScale(n, i.优先级, i.时间膨胀值 * r, i.时间膨胀变化曲线, Math.min(i.时间膨胀时长 * o, i.时间膨胀时长 + s), 1);
      }
    } else if (i.时间膨胀时长 > 0) {
      e.Attacker.GetComponent(126)?.SetTimeScale(i.优先级 - 1, i.时间膨胀值 * r, i.时间膨胀变化曲线, Math.min(i.时间膨胀时长 * o, i.时间膨胀时长 + s), 1);
      var a = t.CharacterCustomKeyTimeScale;
      var l = a?.length ?? 0;
      for (let t = 0; t < l; t++) {
        var h = ModelManager_1.ModelManager.BulletModel.GetEntityIdByCustomKey(e.Attacker.Id, a[t], e.BulletId.toString());
        if (!h) {
          return;
        }
        EntitySystem_1.EntitySystem.Get(h)?.GetComponent(126)?.SetTimeScale(i.优先级, i.时间膨胀值 * r, i.时间膨胀变化曲线, Math.min(i.时间膨胀时长 * o, i.时间膨胀时长 + s), 1);
      }
    }
  }
  Ofn(t) {
    var e;
    var i;
    var n;
    var r;
    var o;
    var s;
    var a;
    if (!t.ReBulletData.Base.ContinuesCollision) {
      if ((e = this.Entity.GetComponent(126)) && (i = this.Gcd(t), r = (n = t.ReBulletData.TimeScale).TimeScaleOnHit, o = (a = this.qcd(t))?.VictimHitTimeScaleRatio?.ValueRatio ?? 1, s = a?.VictimHitTimeScaleRatio?.TimeRatio ?? 1, a = a?.VictimHitTimeScaleRatio?.MaxExtraTime ?? 0, r.时间膨胀时长 > 0)) {
        BulletUtil_1.BulletUtil.SetVictimTimeScale(t.BulletEntityId, this.Entity.Id, e, r.优先级, r.时间膨胀值 * o, r.时间膨胀变化曲线, Math.min(r.时间膨胀时长 * s, r.时间膨胀时长 + a), 2, n.RemoveHitTimeScaleOnDestroy, i);
      }
    }
  }
  Gcd(t) {
    return t.CalculateType !== 0 && t.ReBulletData.TimeScale.TimeScaleOnHit.时间膨胀时长 > 0;
  }
  Fcd(t) {
    this.Ofn(t);
  }
  RegisterComponent(t, e) {
    if (this.Ucd.has(t)) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SceneGameplay", 39, "[SceneItemHitComponent] RegisterComponent Failed: Already registered", ["EntityId", this.Entity.Id]);
      }
    } else {
      var i = new ComponentHitReg();
      this.Ucd.set(t, i);
      if (i.HitCompConfig = e) {
        t = new BulletHitReg();
        t.SetupConfig(e.HitBullet, e.AttackerHitTimeScaleRatio, e.VictimHitTimeScaleRatio);
        this.xcd.push(t);
        if (e.AimParts && this.Hte) {
          for (const r of e.AimParts) {
            var n = new AimPartUtils_1.AimPart(this.Hte);
            n.InitSceneItem(r);
            this.AimParts.push(n);
          }
        }
      }
    }
  }
  AddComponentHitCondition(t, e) {
    var i;
    if (!this.Ucd.has(t)) {
      i = new ComponentHitReg();
      this.Ucd.set(t, i);
    }
    this.Ucd.get(t).ComponentHitConditionCheck.push(e);
  }
  RemoveComponentHitCondition(t, e) {
    t = this.Ucd.get(t)?.ComponentHitConditionCheck;
    if (t !== undefined && (e = t.indexOf(e)) !== -1) {
      t.splice(e, 1);
    }
  }
  Gfn(t) {
    return SceneItemHitComponent_1.kfn.get(t);
  }
};
SceneItemHitComponent.kfn = new Map([[8, 631236362], [1, -40693742], [9, 1688432695], [0, 178446985], [10, -1474770640], [3, -1876401816], [11, -350051159], [2, -2061161961]]);
SceneItemHitComponent = SceneItemHitComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(158)], SceneItemHitComponent);
exports.SceneItemHitComponent = SceneItemHitComponent; //# sourceMappingURL=SceneItemHitComponent.js.map