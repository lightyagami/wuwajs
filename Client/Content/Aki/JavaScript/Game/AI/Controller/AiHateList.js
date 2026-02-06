"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AiHateList = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Time_1 = require("../../../Core/Common/Time");
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const IComponent_1 = require("../../../UniverseEditor/Interface/IComponent");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const CampUtils_1 = require("../../NewWorld/Character/Common/Blueprint/Utils/CampUtils");
const GravityUtils_1 = require("../../Utils/GravityUtils");
const MIN_HATE = 1;
const ONE_THOUSAND_MILLISECONDS = 1000;
const tmpVector = Vector_1.Vector.Create();
class HatredItem {
  constructor() {
    this.HatredValue = 0;
    this.TauntValue = 0;
    this.DisengageTime = -1;
    this.DecreaseCdEndTime = 0;
    this.DecreaseEndTime = 0;
    this.NextDecreaseTime = 0;
    this.EarliestClearTime = 0;
    this.InMaxArea = false;
  }
  get InDecreasing() {
    return this.NextDecreaseTime > 0;
  }
  get HatredValueActual() {
    return this.HatredValue + this.TauntValue;
  }
  AfterTriggerHatredDecrease() {
    if (Time_1.Time.WorldTime > this.DecreaseEndTime) {
      this.NextDecreaseTime = 0;
    } else {
      this.NextDecreaseTime += ONE_THOUSAND_MILLISECONDS;
    }
  }
}
class AiHateList {
  constructor(t) {
    this.Bte = t;
    this.vie = undefined;
    this.Mie = 0;
    this.Eie = 0;
    this.Sie = 0;
    this.yie = 0;
    this.Iie = 0;
    this.Tie = 0;
    this.Lie = undefined;
    this.Die = undefined;
    this.Rie = Vector_1.Vector.Create();
    this.Uie = (e, t, i, s, h) => {
      var r = s.DamageData;
      if (r.CalculateType === 0) {
        r = s.Damage;
        if (!this.Lie?.Valid || !this.Lie.HasTag(-893996770)) {
          var s = e.GetComponent(217);
          if (!s?.Valid || !s.HasTag(-1566015933)) {
            let t = e.GetComponent(3);
            if (!t) {
              s = e.GetComponent(246);
              if (!(t = s?.GetCurrentOrLastDriver()?.GetComponent(3))) {
                return;
              }
            }
            if (CampUtils_1.CampUtils.GetCampRelationship(this.Bte.CharActorComp.Actor.Camp, t.Actor.Camp) === 2) {
              if (s = this.Aie.get(e.Id)) {
                s.HatredValue += Math.max(MIN_HATE, s.InDecreasing ? -r * this.vie.IncreaseRateWhenDecreasing : -r);
              } else {
                this.Pie(e.Id, Math.max(MIN_HATE, -r), 0, "Damage");
              }
            }
          }
        }
      }
    };
    this.xie = (t, e) => {
      var i;
      if (e && this.vie && (this.Die?.Valid && this.Die === e && (EventSystem_1.EventSystem.EmitWithTarget(this.Bte.CharAiDesignComp.Entity, EventDefine_1.EEventName.AiHateTargetChanged, t.Id, e.Id), this.Die = t, ControllerHolder_1.ControllerHolder.BlackboardController.SetEntityIdByEntity(this.Bte.CharActorComp.Entity.Id, "HateTarget", t.Id)), (i = this.Aie.get(e?.Id)) !== undefined)) {
        this.wie(t.Id, i, "ChangeRole");
        this.Bie(e.Id, "InActive");
      }
    };
    this.Mjs = (t, e) => {
      if (this.vie && (e = this.Aie.get(e?.Id)) !== undefined) {
        this.wie(t.Id, e, "VisionMorphBegin");
      }
    };
    this.CMl = (t, e) => {
      if (this.vie && (e = this.Aie.get(e?.Id)) !== undefined) {
        this.wie(t.Id, e, "VisionMorphEnd");
      }
    };
    this.Aie = new Map();
    this.bie = new Array();
    this.qie = new Array();
    this.Gie = 0;
    this.Nie = 0;
    this.Oie = 0;
    this.kie = 2;
    this.pr1 = t => {
      if (t === this.Bte.CharActorComp?.Entity.Id) {
        this.Bie(0, "Dead");
      }
    };
  }
  get AiHate() {
    return this.vie;
  }
  set AiHate(t) {
    if (this.vie !== t) {
      var e = this.Bte.CharActorComp.Entity.GetComponent(189);
      if (e) {
        if (s = this.Fie()) {
          ControllerHolder_1.ControllerHolder.BlackboardController.SetVectorValueByEntity(this.Bte.CharActorComp.Entity.Id, "CenterLocation", s.X, s.Y, s.Z);
        }
        e.SetChain(t ? t.MaxMoveFromBorn : 0, s);
      }
      this.vie = t;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("AI", 6, "AiHateInternal Changed", ["Actor", this.Bte.CharActorComp?.Actor.GetName()], ["Id", t?.Id]);
      }
      if (t) {
        for (var [, i] of this.Aie) {
          i.DisengageTime = -1;
        }
        if (t.ExcludeTag) {
          this.Mie = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(t.ExcludeTag);
        }
        if (t.SwornHatredTag) {
          this.Eie = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(t.SwornHatredTag);
        }
        this.Sie = t.DisengageDistanceRange.Min * t.DisengageDistanceRange.Min;
        this.yie = t.DisengageDistanceRange.Max * t.DisengageDistanceRange.Max;
        var e = t.DisengageBornDistance.Min;
        var s = t.DisengageBornDistance.Max;
        if (e < 0 && s < 0) {
          this.Iie = Number.MAX_VALUE;
          this.Tie = Number.MAX_VALUE;
        } else {
          this.Iie = e * e;
          this.Tie = s * s;
        }
      } else {
        this.Die = undefined;
        this.Aie.clear();
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("AI", 6, "RemoveHatredItem", ["AiActor", this.Bte.CharActorComp?.Actor.GetName()], ["Reason", "SetAiHate"]);
        }
      }
    }
  }
  RefreshAbilityComp() {
    this.Lie = this.Bte.CharAiDesignComp?.Entity?.GetComponent(217);
  }
  GetHatredMap() {
    return this.Aie;
  }
  GetHatredMapDebugText() {
    let t = "";
    for (var [e, i] of this.Aie) {
      e = ControllerHolder_1.ControllerHolder.CharacterController.GetCharacterActorComponentById(e);
      if (e?.Valid) {
        t += "--" + e.Actor.GetName() + "(" + i.HatredValue + "," + i.TauntValue + "," + i.DisengageTime + ")\n";
      }
    }
    return t += "AiHateConfig:" + this.AiHate.Id;
  }
  GetCurrentTarget() {
    return this.Die;
  }
  get IsCurrentTargetInMaxArea() {
    var t;
    return !!this.Die && !!(t = this.Aie.get(this.Die.Id)) && t.InMaxArea;
  }
  BindEvents() {
    if (this.vie) {
      EventSystem_1.EventSystem.AddWithTarget(this.Bte.CharAiDesignComp.Entity, EventDefine_1.EEventName.CharBeDamage, this.Uie);
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnChangeRole, this.xie);
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CharOnRoleDead, this.pr1);
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.VisionMorphBegin, this.Mjs);
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.VisionMorphEnd, this.CMl);
    }
  }
  UnBindEvents() {
    if (this.Bte.CharAiDesignComp.Valid && EventSystem_1.EventSystem.HasWithTarget(this.Bte.CharAiDesignComp.Entity, EventDefine_1.EEventName.CharBeDamage, this.Uie)) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Bte.CharAiDesignComp.Entity, EventDefine_1.EEventName.CharBeDamage, this.Uie);
    }
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnChangeRole, this.xie)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnChangeRole, this.xie);
    }
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.VisionMorphBegin, this.Mjs)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.VisionMorphBegin, this.Mjs);
    }
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.VisionMorphEnd, this.CMl)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.VisionMorphEnd, this.CMl);
    }
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.CharOnRoleDead, this.pr1)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CharOnRoleDead, this.pr1);
    }
  }
  Clear(t = true) {
    if (t) {
      this.vie = undefined;
    }
    this.Die = undefined;
    this.Lie = undefined;
    this.UnBindEvents();
    this.Bie(0, "Clear");
  }
  Tick(t) {
    var e;
    if (this.vie) {
      e = this.Bte.CharActorComp.ScaledHalfHeight;
      t = this.Vie(t * MathUtils_1.MathUtils.MillisecondToSecond, e);
      e = this.Die?.Id;
      this.Die = t ? ModelManager_1.ModelManager.CreatureModel.GetEntityById(t) : undefined;
      if ((t = this.Die?.Id) !== e) {
        EventSystem_1.EventSystem.EmitWithTarget(this.Bte.CharAiDesignComp.Entity, EventDefine_1.EEventName.AiHateTargetChanged, t, e);
      }
      t = this.Bte.CharAiDesignComp.Entity.Id;
      if (this.Die) {
        if (ControllerHolder_1.ControllerHolder.BlackboardController.GetEntityIdByEntity(t, "HateTarget") !== this.Die.Id) {
          ControllerHolder_1.ControllerHolder.BlackboardController.SetEntityIdByEntity(t, "HateTarget", this.Die.Id);
        }
        e = this.Aie.get(this.Die.Id);
        if (Time_1.Time.WorldTime > e.DecreaseCdEndTime && e.HatredValue > MIN_HATE) {
          e.DecreaseCdEndTime = Time_1.Time.WorldTime + this.vie.DecreaseTimeCd;
          e.DecreaseEndTime = Time_1.Time.WorldTime + this.vie.DecreaseTimeLength;
          e.NextDecreaseTime = Time_1.Time.WorldTime + ONE_THOUSAND_MILLISECONDS;
        }
      } else if (ControllerHolder_1.ControllerHolder.BlackboardController.HasValueByEntity(t, "HateTarget")) {
        ControllerHolder_1.ControllerHolder.BlackboardController.RemoveValueByEntity(t, "HateTarget");
      }
    }
  }
  wie(t, e, i) {
    if (this.Aie.has(t)) {
      this.Aie.set(t, e);
    } else {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("AI", 6, "AddHatredItem", ["Actor", this.Bte.CharActorComp?.Actor.GetName()], ["entityId", t], ["reason", i]);
      }
      this.Aie.set(t, e);
      if ((i = EntitySystem_1.EntitySystem.Get(t))?.Valid) {
        EventSystem_1.EventSystem.EmitWithTarget(i, EventDefine_1.EEventName.AiHateAddOrRemove, true, this.Bte);
        this.Bte.AiPerceptionEvents.CollectAiHateEvent(true, i);
      }
      EventSystem_1.EventSystem.EmitWithTarget(this.Bte.CharAiDesignComp.Entity, EventDefine_1.EEventName.AiInFight, this.Aie.size > 0);
    }
  }
  Pie(e, i = MIN_HATE, s, h = "None") {
    if (this.vie) {
      let t = this.Aie.get(e);
      if (t) {
        t.HatredValue = i;
        if (s) {
          t.TauntValue = s;
        }
      } else {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("AI", 6, "AddHatredItemByValue", ["Actor", this.Bte.CharActorComp?.Actor.GetName()], ["entityId", e], ["reason", h]);
        }
        (t = new HatredItem()).HatredValue = i;
        if (s) {
          t.TauntValue = s;
        }
        t.EarliestClearTime = Time_1.Time.WorldTime + this.vie.MinClearTime;
        this.Aie.set(e, t);
        if ((h = EntitySystem_1.EntitySystem.Get(e))?.Valid) {
          EventSystem_1.EventSystem.EmitWithTarget(h, EventDefine_1.EEventName.AiHateAddOrRemove, true, this.Bte);
          this.Bte.AiPerceptionEvents.CollectAiHateEvent(true, h);
        }
        if (this.Bte.CharAiDesignComp?.Entity) {
          EventSystem_1.EventSystem.EmitWithTarget(this.Bte.CharAiDesignComp.Entity, EventDefine_1.EEventName.AiInFight, this.Aie.size > 0);
        }
      }
      return t;
    }
  }
  Bie(t, e) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("AI", 6, "RemoveHatredItem", ["Actor", this.Bte.CharActorComp?.Actor.GetName()], ["entityId", t], ["reason", e]);
    }
    if (t) {
      if (this.Aie.has(t)) {
        const s = EntitySystem_1.EntitySystem.Get(t);
        if (s?.Valid) {
          EventSystem_1.EventSystem.EmitWithTarget(s, EventDefine_1.EEventName.AiHateAddOrRemove, false, this.Bte);
          this.Bte.AiPerceptionEvents.CollectAiHateEvent(false, s);
        }
        this.Aie.delete(t);
        EventSystem_1.EventSystem.EmitWithTarget(this.Bte.CharAiDesignComp.Entity, EventDefine_1.EEventName.AiInFight, this.Aie.size > 0);
      }
    } else if (this.Aie.size) {
      for (var [i] of this.Aie) {
        const s = EntitySystem_1.EntitySystem.Get(i);
        if (s?.IsInit) {
          EventSystem_1.EventSystem.EmitWithTarget(s, EventDefine_1.EEventName.AiHateAddOrRemove, false, this.Bte);
          this.Bte.AiPerceptionEvents.CollectAiHateEvent(false, s);
        }
      }
      this.Aie.clear();
      EventSystem_1.EventSystem.EmitWithTarget(this.Bte.CharAiDesignComp.Entity, EventDefine_1.EEventName.AiInFight, this.Aie.size > 0);
    }
  }
  Vie(t, e) {
    this.Rie.FromUeVector(this.Bte.CharActorComp.GetInitLocation());
    var i = this.Bte.CharActorComp.ActorLocationProxy;
    this.Hie(t, this.Rie, i, e);
    this.jie(this.Rie, i, e);
    let s = 0;
    for (const h of this.bie) {
      this.Bie(h, this.qie[s]);
      ++s;
    }
    return this.Gie;
  }
  Hie(t, e, i, s) {
    this.Gie = 0;
    this.Nie = this.yie;
    this.Oie = 0;
    this.kie = 2;
    this.bie.length = 0;
    this.qie.length = 0;
    for (var [h, r] of this.Aie) {
      var n = ControllerHolder_1.ControllerHolder.CharacterController.GetCharacterActorComponentById(h);
      if (n && n.Entity.Active) {
        n.ActorLocationProxy.Subtraction(i, tmpVector);
        var a = GravityUtils_1.GravityUtils.ConvertToPlanarVectorForActor(this.Bte.CharActorComp, tmpVector);
        a += s - n.ScaledHalfHeight;
        var o = tmpVector.SizeSquared();
        e.Subtraction(n.ActorLocationProxy, tmpVector);
        var _ = GravityUtils_1.GravityUtils.GetPlanarSizeSquared2dForActor(this.Bte.CharActorComp, tmpVector);
        r.InMaxArea = this.Wie(o, a, _);
        var a = r.InMaxArea && this.Kie(o, a, _);
        if (Time_1.Time.WorldTime < r.EarliestClearTime) {
          if (!!(r.DisengageTime <= 0) && (!r.InMaxArea || !a)) {
            r.DisengageTime = Time_1.Time.WorldTime + MathUtils_1.MathUtils.GetRandomRange(this.vie.DisengageTimeRange.Min, this.vie.DisengageTimeRange.Max);
          }
        } else {
          if (!r.InMaxArea) {
            this.bie.push(h);
            this.qie.push("MaxArea");
            continue;
          }
          if (r.DisengageTime > 0) {
            if (a) {
              r.DisengageTime = -1;
            } else if (r.TauntValue <= 0 && Time_1.Time.WorldTime > r.DisengageTime) {
              this.bie.push(h);
              this.qie.push("MinAreaTimer");
              continue;
            }
          } else if (!a) {
            r.DisengageTime = Time_1.Time.WorldTime + MathUtils_1.MathUtils.GetRandomRange(this.vie.DisengageTimeRange.Min, this.vie.DisengageTimeRange.Max);
          }
        }
        if (r.InDecreasing && Time_1.Time.WorldTime > r.NextDecreaseTime) {
          r.HatredValue = Math.max(MIN_HATE, r.HatredValue * this.vie.DecreaseRate);
          r.AfterTriggerHatredDecrease();
        }
        _ = this.Qie(n.Entity, r.TauntValue);
        if (!(this.kie > _)) {
          if (this.kie === _) {
            if (this.Oie > r.HatredValueActual) {
              continue;
            }
            if (this.Oie === r.HatredValueActual && this.Nie <= o) {
              continue;
            }
          }
          this.kie = _;
          this.Oie = r.HatredValue;
          this.Nie = o;
          this.Gie = h;
        }
      } else {
        this.bie.push(h);
        this.qie.push("InActive");
      }
    }
  }
  AddNewHateListForTaunt(t, e) {
    var i = this.Aie.get(t);
    if (i) {
      i.TauntValue = e;
    } else {
      this.Pie(t, MIN_HATE, e, "Taunt");
    }
  }
  RemoveHateListForTaunt(t) {
    t = this.Aie.get(t);
    if (t) {
      t.TauntValue = 0;
    }
  }
  jie(t, e, i) {
    if (!(this.vie.BaseHatred <= 0) && this.Bte.AiPerception) {
      for (const a of this.Bte.AiPerception.AllEnemies) {
        if (!this.Aie.has(a)) {
          var s = ControllerHolder_1.ControllerHolder.CharacterController.GetCharacterActorComponentById(a);
          if (s?.Valid) {
            var h = this.Qie(s.Entity, 0);
            if (!(h <= 1)) {
              s.ActorLocationProxy.Subtraction(e, tmpVector);
              var r = GravityUtils_1.GravityUtils.ConvertToPlanarVectorForActor(this.Bte.CharActorComp, tmpVector);
              r += i - s.HalfHeight;
              var n = tmpVector.SizeSquared();
              t.Subtraction(s.ActorLocationProxy, tmpVector);
              var s = GravityUtils_1.GravityUtils.GetPlanarSizeSquared2dForActor(this.Bte.CharActorComp, tmpVector);
              if (this.Kie(n, r, s)) {
                r = this.Pie(a, MIN_HATE, 0, "Area");
                if (r) {
                  r.InMaxArea = true;
                }
                if (!(this.kie > h)) {
                  if (this.kie === h) {
                    if (this.Oie > MIN_HATE) {
                      continue;
                    }
                    if (this.Oie === MIN_HATE && this.Nie <= n) {
                      continue;
                    }
                  }
                  this.kie = h;
                  this.Oie = MIN_HATE;
                  this.Nie = n;
                  this.Gie = a;
                }
              }
            }
          }
        }
      }
    }
  }
  ChangeHatred(t, e, i) {
    if (t === 0) {
      for (var [s, h] of this.Aie) {
        h.HatredValue = h.HatredValue * e + i;
        if (h.HatredValue <= 0) {
          this.Bie(s, "ForceChanged");
        }
      }
    } else {
      var r = this.Aie.get(t);
      if (r) {
        r.HatredValue = r.HatredValue * e + i;
      } else if (i > 0) {
        this.Pie(t, i, 0, "Blueprint");
      }
    }
  }
  ClearHatred(t) {
    if (t === 0) {
      this.Bie(0, "Clear");
    } else {
      this.Bie(t, "Clear");
    }
  }
  Qie(t, e) {
    if (!t?.Active) {
      return 0;
    }
    var i = t.GetComponent(186);
    if (i?.Valid && !i.IsInGame) {
      return 0;
    }
    i = t.GetComponent(217);
    if (i) {
      if (this.Mie && i.HasTag(this.Mie)) {
        return 1;
      }
      if (i.HasTag(1008164187)) {
        return 2;
      }
      if (e > 0) {
        return 6;
      }
      e = t.GetComponent(0).GetPlayerId();
      if (!ControllerHolder_1.ControllerHolder.OnlineController.CheckPlayerNetHealthy(e)) {
        return 3;
      }
      if (this.Eie && i.HasTag(this.Eie)) {
        return 5;
      }
    } else {
      e = t.GetComponent(0).GetPlayerId();
      if (!ControllerHolder_1.ControllerHolder.OnlineController.CheckPlayerNetHealthy(e)) {
        return 3;
      }
    }
    return 4;
  }
  Kie(t, e, i) {
    return t < this.Sie && MathUtils_1.MathUtils.InRange(e, this.vie.DisengageHeightRange) && i < this.Iie;
  }
  Wie(t, e, i) {
    return t < this.yie && MathUtils_1.MathUtils.InRange(e, this.vie.DisengageHeightRangeMax) && i < this.Tie;
  }
  SharedHatredTarget(t) {
    var e;
    if (this.vie && !this.Die) {
      if (e = this.Aie.get(t)) {
        e.EarliestClearTime = Time_1.Time.WorldTime + this.vie.MinClearTime;
      } else {
        this.Pie(t, MIN_HATE, 0, "Shared");
      }
    }
  }
  Fie() {
    var t = this.Bte.CharActorComp.CreatureData.GetPbEntityInitData();
    if (t) {
      t = (0, IComponent_1.getComponent)(t.ComponentsData, "AiComponent")?.CenterPoint;
      if (t) {
        var t = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(t);
        if (t) {
          t = Vector_1.Vector.Create(t.Transform?.Pos.X ?? 0, t.Transform?.Pos.Y ?? 0, t.Transform?.Pos.Z ?? 0);
          return Vector_1.Vector.Create(t.X, t.Y, t.Z);
        }
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("AI", 50, "CenterPoint实体非法, 请指定【TsEntity_用例_投放】以外的实体");
        }
      }
    }
  }
  OnEntityCampModified(t, e, i) {
    if (t.Id === this.Bte.CharAiDesignComp?.Entity.Id) {
      this.Bie(0, "ChangeCamp");
    } else if (CampUtils_1.CampUtils.GetCampRelationship(this.Bte.CharActorComp.Actor.Camp, i) !== 2 && (this.Bie(t.Id, "ChangeCamp"), this.Die?.Id === t.Id)) {
      i = this.Bte.CharActorComp.ScaledHalfHeight;
      t = this.Vie(0, i);
      this.Die = t ? ModelManager_1.ModelManager.CreatureModel.GetEntityById(t) : undefined;
    }
  }
}
exports.AiHateList = AiHateList;
//# sourceMappingURL=AiHateList.js.map