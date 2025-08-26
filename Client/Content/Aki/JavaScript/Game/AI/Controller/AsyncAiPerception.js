"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AsyncAiPerception = undefined;
const cpp_1 = require("cpp");
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const Stats_1 = require("../../../Core/Common/Stats");
const Time_1 = require("../../../Core/Common/Time");
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const JsModelManager_1 = require("../../../Core/Model/JsModelManager");
const TickProcessSystem_1 = require("../../../Core/Tick/TickProcessSystem");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const CampUtils_1 = require("../../NewWorld/Character/Common/Blueprint/Utils/CampUtils");
const CombatLog_1 = require("../../Utils/CombatLog");
const AiConfig_1 = require("../Common/AiConfig");
const MINUS_HALF = -180;
const MINUS_QUATER = -90;
class AiSenseObject {
  constructor(t) {
    this.AiSense = t;
    this.AiSenseObjectData = new cpp_1.FAiSenseObject();
    this.AiSenseObjectData.AiSenseId = t.Id;
    this.AiSenseObjectData.AiSenseHorizontalAngle = new UE.Vector2D(t.HorizontalAngle.Min, t.HorizontalAngle.Max);
    this.AiSenseObjectData.AiSenseVerticalAngle = new UE.Vector2D(t.VerticalAngle.Min, t.VerticalAngle.Max);
    this.AiSenseObjectData.AiSenseCantBeBlock = t.CantBeBlock;
    this.AiSenseObjectData.AiSenseBlockType = t.BlockType;
    this.AiSenseObjectData.WithAngleHorizontal = t.HorizontalAngle.Min > MINUS_HALF || t.HorizontalAngle.Max < 180;
    this.AiSenseObjectData.WithAngleVertical = t.VerticalAngle.Min > MINUS_QUATER || t.VerticalAngle.Max < 90;
    this.AiSenseObjectData.SenseDistanceRangeMin = t.SenseDistanceRange.Min;
    this.AiSenseObjectData.SenseDistanceRangeMax = t.SenseDistanceRange.Max;
    this.AiSenseObjectData.SquaredWalkSenseRate = t.WalkSenseRate * t.WalkSenseRate;
    this.AiSenseObjectData.SquaredAirSenseRate = t.AirSenseRate * t.AirSenseRate;
  }
}
class AsyncAiPerception {
  constructor(t, i, s) {
    this.Bte = t;
    this.AiSenseGroup = i;
    this.AiPerceptionData = undefined;
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
    this.Ci_ = undefined;
    this.gi_ = undefined;
    this.pi_ = undefined;
    this.yoe = undefined;
    this.Ioe = [];
    this.Loe = new Array();
    this.Doe = new Map();
    this.MaxSenseRange = 0;
    this.Poe = false;
    this.X6_ = 0;
    this.Y6_ = new Map();
    this.z6_ = -1;
    this.J6_ = -1;
    this.Z6_ = t => {
      if (this.J6_ !== -1 && this.J6_ <= Time_1.Time.Frame) {
        this.J6_ = -1;
        this.mr_(t);
      }
      if (this.z6_ === Time_1.Time.Frame) {
        this.dr_(t);
      }
      if (this.Y6_.size > 0) {
        for (const i of this.Y6_) {
          this.e5_(i[0], i[1]);
        }
        this.Y6_.clear();
      }
    };
    this.d3r = -1;
    this.uoe = undefined;
    this.vi_ = () => {
      if (this.AiPerceptionData && (this.J6_ === -1 || !(this.J6_ <= Time_1.Time.Frame))) {
        AsyncAiPerception.yi_.Start();
        let i = this.Ci_.Num();
        for (let t = i - 1; t > -1; t--) {
          var s;
          var e = this.Ci_.GetKey(t);
          if (e !== this.E0 && (!(s = EntitySystem_1.EntitySystem.Get(e))?.Valid || !s.Active)) {
            this.Ci_.Remove(e);
            this.yoe.Remove(e);
            if (this.Allies.delete(e)) {
              this.Bte.AiPerceptionEvents.CollectAiPerceptionEventById(false, e, 1);
            }
            if (this.Enemies.delete(e)) {
              this.Bte.AiPerceptionEvents.CollectAiPerceptionEventById(false, e, 2);
            }
            if (this.Neutrals.delete(e)) {
              this.Bte.AiPerceptionEvents.CollectAiPerceptionEventById(false, e, 0);
            }
            this.SceneItems.delete(e);
          }
        }
        i = this.pi_.Num();
        for (let t = 0; t < i; t++) {
          var h = this.pi_.Get(t);
          var h = EntitySystem_1.EntitySystem.Get(h);
          if (h?.Valid) {
            this.Voe(h, false);
          }
        }
        this.pi_.Empty();
        i = this.gi_.Num();
        for (let t = 0; t < i; t++) {
          var r;
          var n = this.gi_.GetKey(t);
          if (EntitySystem_1.EntitySystem.Get(n)?.Active && (r = this.gi_.Get(n)) !== undefined && (this.Ci_.Set(n, r), (r = EntitySystem_1.EntitySystem.Get(n))?.Valid)) {
            this.Voe(r, true);
          }
        }
        this.gi_.Empty();
        this.Woe();
        this.Koe();
        AsyncAiPerception.yi_.Stop();
      }
    };
    this.E0 = t.CharActorComp.Entity.Id;
    this.AiPerceptionData = JsModelManager_1.JsModelManager.AddAiPerception(this.E0);
    this.AiPerceptionData.AiSenseGroupLoseDelayRange = new UE.Vector2D(i.LoseDelay.Min, i.LoseDelay.Max);
    this.Ci_ = this.AiPerceptionData.EntitiesInSense;
    this.gi_ = this.AiPerceptionData.EntitiesToAdd;
    this.yoe = this.AiPerceptionData.EntitiesRemoveTime;
    this.pi_ = this.AiPerceptionData.EntitiesNotSense;
    this.Noe = t.CharActorComp.Actor.Camp;
    this.Ci_.Add(this.E0, 0);
    let e = -1;
    for (const r of s) {
      var h = new AiSenseObject(r);
      this.Loe.push(h);
      if (!(++e > 0)) {
        if (h.AiSenseObjectData.WithAngleHorizontal) {
          ++this.AiPerceptionData.WithAngleHorizontalCount;
        }
        if (h.AiSenseObjectData.WithAngleVertical) {
          ++this.AiPerceptionData.WithAngleVerticalCount;
        }
        if (r.SenseDistanceRange.Max > this.MaxSenseRange) {
          this.MaxSenseRange = r.SenseDistanceRange.Max;
        }
        this.AiPerceptionData.ActivateAiSenseObjects.Get(h.AiSense.SenseTarget)?.Add(h.AiSenseObjectData);
      }
    }
    this.Ooe = i ? i.ShareDis * i.ShareDis : 0;
    if (this.Ooe > 0 && Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("AI", 6, "共享感知距离应该不需要再是用了", ["Actor", this.Bte.CharActorComp?.Actor.GetName()], ["AiSenseGroup", i.Id]);
    }
    this.X6_ = TickProcessSystem_1.TickProcessSystem.RegisterTickProcess(6, true, this.Z6_, "AsyncAiPerception");
  }
  GetEnableAiSenseDebug() {
    let i = "感知配置激活情况: ";
    for (let t = 0; t < this.Loe.length; ++t) {
      var s = this.Loe[t];
      var e = this.Loe[t].AiSense.Id;
      var s = this.AiPerceptionData.ActivateAiSenseObjects.Get(s.AiSense.SenseTarget).Contains(s.AiSenseObjectData);
      i += e + ":" + s + "; ";
    }
    for (const r of this.Doe.values()) {
      var t = r.AiSense.Id;
      var h = this.AiPerceptionData.ActivateAiSenseObjects.Get(r.AiSense.SenseTarget).Contains(r.AiSenseObjectData);
      i += t + ":" + h + "; ";
    }
    return i;
  }
  Foe(t, i) {
    this.Y6_.set(t, i);
  }
  e5_(t, i) {
    var s = this.AiPerceptionData.ActivateAiSenseObjects.Get(t.AiSense.SenseTarget);
    if (s.Contains(t.AiSenseObjectData) !== i) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("AI", 6, "EnableAiSense", ["Actor", this.Bte.CharActorComp.Actor.GetName()], ["AiSenseObject", t.AiSense.Id], ["enable", i]);
      }
      if (i) {
        if (t.AiSenseObjectData.WithAngleHorizontal) {
          ++this.AiPerceptionData.WithAngleHorizontalCount;
        }
        if (t.AiSenseObjectData.WithAngleVertical) {
          ++this.AiPerceptionData.WithAngleVerticalCount;
        }
        s.Add(t.AiSenseObjectData);
      } else {
        if (t.AiSenseObjectData.WithAngleHorizontal) {
          --this.AiPerceptionData.WithAngleHorizontalCount;
        }
        if (t.AiSenseObjectData.WithAngleVertical) {
          --this.AiPerceptionData.WithAngleVerticalCount;
        }
        if ((i = s.FindIndex(t.AiSenseObjectData)) > -1) {
          s.RemoveAt(i);
        }
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
      this.z6_ = Time_1.Time.Frame;
    }
    this.Poe = !t;
    CombatLog_1.CombatLog.Info("Ai", this.Bte.CharActorComp?.Entity, "禁用全部感知", ["forbid", this.Poe]);
  }
  dr_(t) {
    if (this.AiPerceptionData && this.Poe) {
      var i = this.Ci_.Num();
      for (let t = 0; t < i; t++) {
        var s = this.Ci_.GetKey(t);
        if (s !== this.E0 && (s = EntitySystem_1.EntitySystem.Get(s))) {
          this.Voe(s, false);
        }
      }
      this.Allies.clear();
      this.Enemies.clear();
      this.Neutrals.clear();
      this.AllEnemies.clear();
      this.Ci_.Empty();
      this.Ci_.Add(this.E0, 0);
    }
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
    this.J6_ = Time_1.Time.Frame;
    if (t && (this.Ioe.length = 0, this.AiPerceptionData && (JsModelManager_1.JsModelManager.RemoveAiPerception(this.AiPerceptionData.Handle), this.AiPerceptionData = undefined), this.X6_ > 0)) {
      TickProcessSystem_1.TickProcessSystem.UnregisterTickProcess(this.X6_);
      this.X6_ = 0;
    }
  }
  mr_(t) {
    if (this.AiPerceptionData) {
      this.Ci_.Empty();
      this.Ci_.Add(this.E0, 0);
      this.gi_.Empty();
    }
  }
  Tick() {
    if (Time_1.Time.Frame !== Time_1.Time.LastPauseTimeFrame && Time_1.Time.Frame !== Time_1.Time.LastResumeTimeFrame && Time_1.Time.Frame !== Time_1.Time.LastResumeTimeFrame + 1 && this.Bte.CharActorComp?.Valid) {
      if (this.AiSenseGroup) {
        if (!this.Poe) {
          if (this.d3r === Time_1.Time.Frame) {
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("AI", 36, "[AsyncAiPerception::Tick] Execute twice or more in one frame. Error!!!!");
            }
          } else {
            this.d3r = Time_1.Time.Frame;
            this.fi_();
          }
        }
      } else {
        this.Koe();
      }
    }
  }
  fi_() {
    var t;
    if (this.AiPerceptionData) {
      if (AiConfig_1.AiConfig.CppAsyncAiPerception) {
        if (!this.uoe) {
          this.uoe = UE.NewObject(UE.TraceLineElement.StaticClass());
          this.uoe.WorldContextObject = this.Bte.CharActorComp.Actor;
          this.uoe.bIsSingle = true;
          this.uoe.bIgnoreSelf = true;
        }
        cpp_1.FKuroAIPerceptionUtils.StartAsyncAiPerception(this.vi_, this.AiPerceptionData.Handle, Time_1.Time.Now, this.uoe);
      } else {
        t = {
          AiPerceptionHandle: this.AiPerceptionData.Handle
        };
        global.startAsyncTask("Task/AiPerceptionTask", t, t => {
          this.vi_();
        }, true);
      }
    }
  }
  Voe(i, s) {
    AsyncAiPerception.boe.Start();
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
    AsyncAiPerception.boe.Stop();
  }
  Woe() {
    if (!(this.AiSenseGroup.ShareDis <= 0)) {
      AsyncAiPerception.qoe.Start();
      var t;
      var i;
      var s = this.Bte.CharActorComp.ActorLocationProxy;
      ModelManager_1.ModelManager.CreatureModel.GetEntitiesInRangeWithLocation(s, this.AiSenseGroup.ShareDis, 248, this.Ioe);
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
      AsyncAiPerception.qoe.Stop();
    }
  }
  Koe() {
    AsyncAiPerception.Goe.Start();
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
    AsyncAiPerception.Goe.Stop();
  }
  OnEntityCampModified(i, s, t) {
    if (this.AiPerceptionData) {
      if (i.Id === this.Bte.CharAiDesignComp?.Entity.Id) {
        this.Noe = this.Bte.CharActorComp.Actor.Camp;
        this.Clear(false, true);
      } else {
        var e = cpp_1.FAiModel.GetEntitySenseType(this.AiPerceptionData, i.Id);
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
}
(exports.AsyncAiPerception = AsyncAiPerception).yi_ = Stats_1.Stat.Create("AsyncAiPerception.AfterAsyncTask");
AsyncAiPerception.boe = Stats_1.Stat.Create("AsyncAiPerception.SenseActor");
AsyncAiPerception.qoe = Stats_1.Stat.Create("AsyncAiPerception.FindShareAlly");
AsyncAiPerception.Goe = Stats_1.Stat.Create("AsyncAiPerception.RefreshAllEnemies"); //# sourceMappingURL=AsyncAiPerception.js.map