"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AiPerception = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const Stats_1 = require("../../../Core/Common/Stats");
const Time_1 = require("../../../Core/Common/Time");
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const TraceElementCommon_1 = require("../../../Core/Utils/TraceElementCommon");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const CampUtils_1 = require("../../NewWorld/Character/Common/Blueprint/Utils/CampUtils");
const CharacterUnifiedStateTypes_1 = require("../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes");
const CombatLog_1 = require("../../Utils/CombatLog");
const PROFILE_KEY = "AiPerception_IsActorInSense";
const MINUS_HALF = -180;
const MINUS_QUATER = -90;
class AiSenseObject {
  constructor(t) {
    this.AiSense = t;
    this.WithAngleHorizontal = t.HorizontalAngle.Min > MINUS_HALF || t.HorizontalAngle.Max < 180;
    this.WithAngleVertical = t.VerticalAngle.Min > MINUS_QUATER || t.VerticalAngle.Max < 90;
    this.Coe = t.SenseDistanceRange.Min * t.SenseDistanceRange.Min;
    this.goe = t.SenseDistanceRange.Max * t.SenseDistanceRange.Max;
    this.foe = t.WalkSenseRate * t.WalkSenseRate;
    this.poe = t.AirSenseRate * t.AirSenseRate;
  }
  InArea(t, i, s, e, h, r) {
    if (this.WithAngleHorizontal && !MathUtils_1.MathUtils.InRange(i, this.AiSense.HorizontalAngle)) {
      return false;
    }
    if (this.WithAngleVertical && !MathUtils_1.MathUtils.InRange(s, this.AiSense.VerticalAngle)) {
      return false;
    }
    let n = t;
    if (e === CharacterUnifiedStateTypes_1.ECharPositionState.Ground) {
      if (h === CharacterUnifiedStateTypes_1.ECharMoveState.Other || h === CharacterUnifiedStateTypes_1.ECharMoveState.Stand || h === CharacterUnifiedStateTypes_1.ECharMoveState.Walk || h === CharacterUnifiedStateTypes_1.ECharMoveState.WalkStop) {
        n /= this.foe;
      }
    } else if (h === CharacterUnifiedStateTypes_1.ECharMoveState.Glide) {
      n /= this.poe;
    }
    return !(r ? n > this.goe : n > this.Coe);
  }
}
class AiPerception {
  constructor(t, i, s) {
    this.Bte = t;
    this.AiSenseGroup = i;
    this.Allies = new Set();
    this.Enemies = new Set();
    this.Neutrals = new Set();
    this.SceneItems = new Set();
    this.AllEnemies = new Set();
    this.ShareAllyLink = new Set();
    this.voe = new Set();
    this.Moe = new Set();
    this.Eoe = new Set();
    this.f6 = new Array();
    this.EntitiesInSense = new Map();
    this.EntitiesToAdd = new Map();
    this.Soe = new Array();
    this.yoe = new Map();
    this.Ioe = [];
    this.Lz = Vector_1.Vector.Create();
    this.Toe = new Set();
    this.Loe = new Array();
    this.Doe = new Map();
    this.Roe = new Map();
    this.Uoe = 0;
    this.Aoe = 0;
    this.uoe = undefined;
    this.MaxSenseRange = 0;
    this.Poe = false;
    this.xoe = Stats_1.Stat.Create("IsActorInSense");
    this.woe = Stats_1.Stat.Create("FindNewInSenseActor");
    this.Boe = Stats_1.Stat.Create("FindOutSenseActor");
    this.boe = Stats_1.Stat.Create("SenseActor");
    this.qoe = Stats_1.Stat.Create("FindShareAlly");
    this.Goe = Stats_1.Stat.Create("RefreshAllEnemies");
    this.E0 = t.CharActorComp.Entity.Id;
    this.Noe = t.CharActorComp.Actor.Camp;
    this.EntitiesInSense.set(this.E0, 0);
    this.Roe.set(0, new Set());
    this.Roe.set(1, new Set());
    let e = -1;
    for (const r of s) {
      var h = new AiSenseObject(r);
      this.Loe.push(h);
      if (!(++e > 0)) {
        if (h.WithAngleHorizontal) {
          ++this.Uoe;
        }
        if (h.WithAngleVertical) {
          ++this.Aoe;
        }
        if (r.SenseDistanceRange.Max > this.MaxSenseRange) {
          this.MaxSenseRange = r.SenseDistanceRange.Max;
        }
        this.Roe.get(h.AiSense.SenseTarget)?.add(h);
      }
    }
    this.Ooe = i ? i.ShareDis * i.ShareDis : 0;
    this.koe();
  }
  koe() {
    this.uoe = UE.NewObject(UE.TraceLineElement.StaticClass());
    this.uoe.WorldContextObject = this.Bte.CharActorComp.Actor;
    this.uoe.bIsSingle = true;
    this.uoe.bIgnoreSelf = true;
  }
  GetEnableAiSenseDebug() {
    let i = "感知配置激活情况: ";
    for (let t = 0; t < this.Loe.length; ++t) {
      var s = this.Loe[t];
      var e = this.Loe[t].AiSense.Id;
      var s = this.Roe.get(s.AiSense.SenseTarget).has(s);
      i += e + ":" + s + "; ";
    }
    return i;
  }
  Foe(t, i) {
    var s = this.Roe.get(t.AiSense.SenseTarget);
    if (s.has(t) !== i) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("AI", 6, "EnableAiSense", ["Actor", this.Bte.CharActorComp.Actor.GetName()], ["AiSenseObject", t.AiSense.Id], ["enable", i]);
      }
      if (i) {
        if (t.WithAngleHorizontal) {
          ++this.Uoe;
        }
        if (t.WithAngleVertical) {
          ++this.Aoe;
        }
        s.add(t);
      } else {
        if (t.WithAngleHorizontal) {
          --this.Uoe;
        }
        if (t.WithAngleVertical) {
          --this.Aoe;
        }
        s.delete(t);
      }
    }
  }
  SetAiSenseEnable(t, i) {
    if (!(t < 0) && !(this.Loe.length <= t)) {
      this.Foe(this.Loe[t], i);
    }
  }
  SetAiSenseEnableWithoutForbidAllSense(t) {
    if (!(this.Loe.length <= 0)) {
      for (const i of this.Loe) {
        this.Foe(i, t);
      }
    }
  }
  SetAllAiSenseEnable(t) {
    if (!t) {
      for (var [i] of this.EntitiesInSense) {
        if (i !== this.E0 && (i = EntitySystem_1.EntitySystem.Get(i))) {
          this.Voe(i, false);
        }
      }
      this.Allies.clear();
      this.Enemies.clear();
      this.Neutrals.clear();
      this.AllEnemies.clear();
      this.EntitiesInSense.clear();
      this.EntitiesInSense.set(this.E0, 0);
    }
    this.Poe = !t;
    CombatLog_1.CombatLog.Info("Ai", this.Bte.CharActorComp?.Entity, "禁用全部感知", ["forbid", this.Poe]);
  }
  AddOrRemoveAiSense(t, i) {
    if (i && !this.Doe.has(t) && (s = ConfigManager_1.ConfigManager.AiConfig.LoadAiSense(t.toString()))) {
      this.Doe.set(t, new AiSenseObject(s));
    }
    var s = this.Doe.get(t);
    if (s) {
      this.Foe(s, i);
    }
  }
  EnableAiSenseByType(t, i) {
    for (const e of this.Loe) {
      if (e.AiSense.SenseType === t) {
        this.Foe(e, i);
      }
    }
    for (var [, s] of this.Doe) {
      if (s.AiSense.SenseType === t) {
        this.Foe(s, i);
      }
    }
  }
  Clear(t = true, i = false) {
    if (i) {
      for (const s of this.Allies) {
        this.Bte.AiPerceptionEvents.CollectAiPerceptionEventById(false, s, 1);
      }
      for (const e of this.Enemies) {
        this.Bte.AiPerceptionEvents.CollectAiPerceptionEventById(false, e, 2);
      }
      for (const h of this.Neutrals) {
        this.Bte.AiPerceptionEvents.CollectAiPerceptionEventById(false, h, 0);
      }
    }
    this.Allies.clear();
    this.Enemies.clear();
    this.Neutrals.clear();
    this.SceneItems.clear();
    this.AllEnemies.clear();
    this.f6.length = 0;
    this.EntitiesInSense.clear();
    this.EntitiesInSense.set(this.E0, 0);
    this.EntitiesToAdd.clear();
    this.Soe.length = 0;
    this.yoe.clear();
    if (t) {
      this.Ioe.length = 0;
    }
  }
  Tick() {
    if (this.Bte.CharActorComp?.Valid) {
      if (this.AiSenseGroup) {
        if (!this.Poe) {
          this.Hoe();
          this.joe();
          for (var [t, i] of this.EntitiesToAdd) {
            this.EntitiesInSense.set(t, i);
            i = EntitySystem_1.EntitySystem.Get(t);
            this.Voe(i, true);
          }
          this.EntitiesToAdd.clear();
          this.Woe();
          this.Koe();
        }
      } else {
        this.Koe();
      }
    }
  }
  Qoe(t, i, s, e = false) {
    this.xoe.Start();
    var h = this.Bte.CharActorComp.ActorLocationProxy;
    var r = t.GetComponent(1);
    var n = e && r.CreatureData.IsRole();
    r.ActorLocationProxy.Subtraction(h, this.Lz);
    var o = this.Lz.SizeSquared();
    let a = 0;
    let f = 0;
    if ((this.Uoe || this.Aoe) && (this.Lz.FromUeVector(this.Bte.CharActorComp.ActorRotation.UnrotateVectorDouble(this.Lz.ToUeVector())), this.Uoe && (a = MathUtils_1.MathUtils.RadToDeg * Math.atan2(this.Lz.Y, this.Lz.X)), this.Aoe)) {
      f = MathUtils_1.MathUtils.RadToDeg * Math.asin(this.Lz.Z / Math.sqrt(o));
    }
    var e = t.GetComponent(101);
    var _ = e?.Valid ? e.PositionState : CharacterUnifiedStateTypes_1.ECharPositionState.Ground;
    var c = e?.Valid ? e.MoveState : CharacterUnifiedStateTypes_1.ECharMoveState.Other;
    TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.uoe, h);
    this.Toe.clear();
    for (const l of this.Roe.get(s)) {
      if (l.InArea(o, a, f, _, c, i)) {
        if (n && Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("AI", 6, "Mingzhongzhigui Ai InArea", ["actor", r.Owner?.GetName()], ["CantBeBlock", l.AiSense.CantBeBlock]);
        }
        if (!l.AiSense.CantBeBlock) {
          if (this.Toe.has(l.AiSense.BlockType)) {
            continue;
          }
          this.uoe.SetTraceTypeQuery(l.AiSense.BlockType);
          TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.uoe, r.ActorLocationProxy);
          if (TraceElementCommon_1.TraceElementCommon.LineTrace(this.uoe, PROFILE_KEY)) {
            var S = this.uoe.HitResult;
            if (S.bBlockingHit && S.Actors.Get(0) !== r.Owner) {
              if (n && Log_1.Log.CheckInfo()) {
                Log_1.Log.Info("AI", 6, "Mingzhongzhigui Ai Hit", ["actor", S.Actors.Get(0)?.GetName()], ["Comp", S.Components.Get(0)?.GetName()]);
              }
              this.Toe.add(l.AiSense.BlockType);
              continue;
            }
          }
        }
        this.xoe.Stop();
        return true;
      }
    }
    this.xoe.Stop();
    return false;
  }
  Hoe() {
    this.woe.Start();
    var i;
    var s;
    var e = this.Bte.CharActorComp.ActorLocationProxy;
    this.EntitiesToAdd.clear();
    for ([i, s] of this.Roe) {
      if (s.size !== 0) {
        let t = 0;
        for (const h of s) {
          t = Math.max(t, h.AiSense.SenseDistanceRange.Min);
        }
        if (i === 0) {
          ModelManager_1.ModelManager.CreatureModel.GetEntitiesInRangeWithLocation(e, t, 62, this.Ioe);
        } else {
          ModelManager_1.ModelManager.CreatureModel.GetEntitiesInRangeWithLocation(e, t, 1, this.Ioe);
        }
        for (const r of this.Ioe) {
          if (r.Entity?.Valid && r.Entity.Active) {
            if (!this.EntitiesInSense.has(r.Entity.Id)) {
              if (this.Qoe(r.Entity, false, i)) {
                this.EntitiesToAdd.set(r.Entity.Id, i);
              }
            }
          }
        }
      }
    }
    this.woe.Stop();
  }
  joe() {
    this.Boe.Start();
    this.Soe.length = 0;
    for (var [t, i] of this.EntitiesInSense) {
      var s;
      if (t !== this.E0) {
        if ((s = EntitySystem_1.EntitySystem.Get(t))?.Valid && s.Active) {
          if (this.Qoe(s, true, i)) {
            this.yoe.delete(t);
          } else {
            this.Soe.push(t);
          }
        } else {
          this.EntitiesInSense.delete(t);
          this.yoe.delete(t);
          if (this.Allies.delete(t)) {
            this.Bte.AiPerceptionEvents.CollectAiRemovePerceptionEventByEntityId(false, t, 1);
          }
          if (this.Enemies.delete(t)) {
            this.Bte.AiPerceptionEvents.CollectAiRemovePerceptionEventByEntityId(false, t, 2);
          }
          if (this.Neutrals.delete(t)) {
            this.Bte.AiPerceptionEvents.CollectAiRemovePerceptionEventByEntityId(false, t, 0);
          }
          this.SceneItems.delete(t);
        }
      }
    }
    for (var [e, h] of this.yoe) {
      if (Time_1.Time.Now > h) {
        this.EntitiesInSense.delete(e);
        if ((h = EntitySystem_1.EntitySystem.Get(e))?.Valid) {
          this.Voe(h, false);
        }
        this.yoe.delete(e);
      }
    }
    for (const r of this.Soe) {
      if (!this.yoe.has(r)) {
        this.yoe.set(r, Time_1.Time.Now + MathUtils_1.MathUtils.GetRandomRange(this.AiSenseGroup.LoseDelay.Min, this.AiSenseGroup.LoseDelay.Max));
      }
    }
    this.Boe.Stop();
  }
  Voe(i, s) {
    this.boe.Start();
    var e = i.Id;
    var i = i.GetComponent(3);
    if (i?.Valid) {
      var h = CampUtils_1.CampUtils.GetCampRelationship(this.Noe, i.Actor.Camp);
      let t = undefined;
      switch (h) {
        case 1:
          t = this.Allies;
          break;
        case 2:
          t = this.Enemies;
          break;
        default:
          t = this.Neutrals;
      }
      if (s) {
        if (!t.has(e)) {
          t.add(e);
          this.Bte.AiPerceptionEvents.CollectAiPerceptionEventByActorComp(true, i, h);
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAiSenseEntityEnter, this.E0, i.Entity);
        }
      } else if (t.delete(e)) {
        this.Bte.AiPerceptionEvents.CollectAiPerceptionEventByActorComp(false, i, h);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAiSenseEntityLeave, this.E0, i.Entity);
      }
    } else if (s) {
      if (!this.SceneItems.has(e)) {
        this.SceneItems.add(e);
        this.Bte.AiPerceptionEvents.OnSenseSceneItem(i);
      }
    } else {
      this.SceneItems.delete(e);
    }
    this.boe.Stop();
  }
  Woe() {
    if (!(this.AiSenseGroup.ShareDis <= 0)) {
      this.qoe.Start();
      var t;
      var i;
      var s = this.Bte.CharActorComp.ActorLocationProxy;
      ModelManager_1.ModelManager.CreatureModel.GetEntitiesInRangeWithLocation(s, this.AiSenseGroup.ShareDis, 62, this.Ioe);
      this.voe.clear();
      this.voe.add(this.E0);
      var e = this.Bte.CharActorComp.Actor.Camp;
      for (const r of this.Ioe) {
        if (!!r.Entity?.Active && !this.voe.has(r.Entity.Id) && !!(t = r.Entity.GetComponent(3))?.Valid && e === t.Actor.Camp && !(Vector_1.Vector.DistSquared(s, t.ActorLocationProxy) > this.Ooe) && !(this.voe.add(r.Entity.Id), this.ShareAllyLink.has(r.Entity.Id))) {
          if ((t = r.Entity.GetComponent(47))?.Valid) {
            t.AiController.AiPerception?.Moe.add(this.E0);
          }
        }
      }
      for (const n of this.ShareAllyLink) {
        if (!this.voe.has(n)) {
          if ((i = EntitySystem_1.EntitySystem.Get(n))?.Valid && (i = i.GetComponent(47))?.Valid) {
            i.AiController.AiPerception?.Moe.delete(this.E0);
          }
        }
      }
      var h = this.voe;
      this.voe = this.ShareAllyLink;
      this.ShareAllyLink = h;
      this.qoe.Stop();
    }
  }
  Koe() {
    this.Goe.Start();
    this.AllEnemies.clear();
    for (const i of this.Enemies) {
      this.AllEnemies.add(i);
    }
    this.Eoe.clear();
    this.f6.length = 0;
    this.Eoe.add(this.E0);
    for (const s of this.Moe) {
      this.f6.push(s);
      this.Eoe.add(s);
    }
    while (this.f6.length > 0) {
      var t = this.f6.pop();
      var t = EntitySystem_1.EntitySystem.Get(t);
      if (t?.Valid) {
        t = t.GetComponent(47);
        if (t?.Valid && t.AiController.AiPerception) {
          for (const e of t.AiController.AiPerception.Enemies) {
            this.AllEnemies.add(e);
          }
          for (const h of t.AiController.AiPerception.Moe) {
            if (!this.Eoe.has(h)) {
              this.Eoe.add(h);
              this.f6.push(h);
            }
          }
        }
      }
    }
    this.Goe.Stop();
  }
  OnEntityCampModified(i, s, t) {
    if (i.Id === this.Bte.CharAiDesignComp?.Entity.Id) {
      this.Noe = this.Bte.CharActorComp.Actor.Camp;
      this.Clear(false, true);
    } else {
      var e = this.EntitiesInSense?.get(i.Id);
      if (e === 0) {
        e = CampUtils_1.CampUtils.GetCampRelationship(this.Noe, s);
        s = CampUtils_1.CampUtils.GetCampRelationship(this.Noe, t);
        if (e !== s) {
          let t = false;
          switch (e) {
            case 2:
              t = this.Enemies.delete(i.Id);
              this.AllEnemies.delete(i.Id);
              break;
            case 1:
              t = this.Allies.delete(i.Id);
              break;
            default:
              t = this.Neutrals.delete(i.Id);
          }
          if (t) {
            this.Bte.AiPerceptionEvents.CollectAiPerceptionEventById(false, i.Id, e);
            switch (s) {
              case 2:
                this.Enemies.add(i.Id);
                this.AllEnemies.add(i.Id);
                break;
              case 1:
                this.Allies.add(i.Id);
                break;
              default:
                this.Neutrals.add(i.Id);
            }
            this.Bte.AiPerceptionEvents.CollectAiPerceptionEventById(true, i.Id, s);
          }
        }
      }
    }
  }
}
exports.AiPerception = AiPerception;
//# sourceMappingURL=AiPerception.js.map