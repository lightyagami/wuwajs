"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PreCreateEffect = undefined;
const UE = require("ue");
const Log_1 = require("../../Core/Common/Log");
const Stats_1 = require("../../Core/Common/Stats");
const Queue_1 = require("../../Core/Container/Queue");
const Protocol_1 = require("../../Core/Define/Net/Protocol");
const EntitySystem_1 = require("../../Core/Entity/EntitySystem");
const GameBudgetInterfaceController_1 = require("../../Core/GameBudgetAllocator/GameBudgetInterfaceController");
const EventDefine_1 = require("../Common/Event/EventDefine");
const EventSystem_1 = require("../Common/Event/EventSystem");
const GlobalData_1 = require("../GlobalData");
const ModelManager_1 = require("../Manager/ModelManager");
const GameBudgetAllocatorConfigCreator_1 = require("../World/Define/GameBudgetAllocatorConfigCreator");
const EffectContext_1 = require("./EffectContext/EffectContext");
const EffectSystem_1 = require("./EffectSystem");
const HIT_EFFECT_COUNT = 3;
const FIGHT_EFFECT_LRU_SIZE = 600;
const NORMAL_EFFECT_LRU_SIZE = 100;
const CHANGE_COUNT_EVERY_TICK = 3;
const LOW_MEMORY_HIT_EFFECT_COUNT = 2;
const LOW_MEMORY_FIGHT_EFFECT_LRU_SIZE = 300;
const LOW_MEMORY_NORMAL_EFFECT_LRU_SIZE = 60;
const PLAYER_CREATE_MAX = 150;
const commonFightEffect = ["/Game/Aki/Effect/EffectGroup/Common/DA_Fx_Group_ChangeRole.DA_Fx_Group_ChangeRole", "/Game/Aki/Effect/EffectGroup/Common/DA_Fx_Group_ChangeRoleStart.DA_Fx_Group_ChangeRoleStart", "/Game/Aki/Effect/EffectGroup/Common/DA_Fx_Group_ChangeRole_Play.DA_Fx_Group_ChangeRole_Play", "/Game/Aki/Effect/EffectAudio/RoleCommon/DA_Au_Role_Common_Char_Change.DA_Au_Role_Common_Char_Change", "/Game/Aki/Effect/EffectGroup/Common/DA_Fx_Group_WeaponEnd.DA_Fx_Group_WeaponEnd"];
class PreCreateEffectData {
  constructor(e, t) {
    this.EntityId = e;
    this.Path = t;
  }
}
class PreCreateEffect {
  constructor() {
    this.Hpe = new UE.TransformDouble();
    this.jpe = new Map();
    this.Wpe = new Queue_1.Queue();
    this.Vk_ = new Map();
    this.Kpe = new Map();
    this.Qpe = Stats_1.Stat.Create("PreCreateEffect");
    this.yW = undefined;
    this.Xpe = NORMAL_EFFECT_LRU_SIZE;
    this.$pe = new Set();
    this.Ype = true;
    this.Jpe = (e, t) => {
      if (e.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Player) {
        this.$pe.add(t.Id);
        EventSystem_1.EventSystem.AddWithTarget(t.Entity, EventDefine_1.EEventName.AiHateAddOrRemove, this.AiHateAddOrRemove);
      }
      EventSystem_1.EventSystem.AddWithTargetUseHoldKey(this, t, EventDefine_1.EEventName.RemoveEntity, this.zpe);
    };
    this.zpe = (e, t) => {
      if (this.$pe.has(t.Id)) {
        this.$pe.delete(t.Id);
        EventSystem_1.EventSystem.RemoveWithTarget(t.Entity, EventDefine_1.EEventName.AiHateAddOrRemove, this.AiHateAddOrRemove);
      }
      EventSystem_1.EventSystem.RemoveWithTargetUseKey(this, t, EventDefine_1.EEventName.RemoveEntity, this.zpe);
      if (this.jpe.has(t.Id)) {
        this.jpe.delete(t.Id);
      }
      this.Vk_.delete(t.Id);
    };
    this.AiHateAddOrRemove = (e, t) => {
      if (e) {
        var e = t.CharActorComp.Entity.Id;
        var _ = this.jpe.get(e);
        if (_) {
          while (!_.Empty) {
            this.Wpe.Push(_.Pop());
          }
          this.jpe.delete(e);
        }
      }
    };
    this.Zpe = e => {
      if (e) {
        this.eve();
        e = UE.KuroStaticLibrary.IsLowMemoryDevice() ? LOW_MEMORY_FIGHT_EFFECT_LRU_SIZE : FIGHT_EFFECT_LRU_SIZE;
        this.Xpe = e;
      } else {
        e = UE.KuroStaticLibrary.IsLowMemoryDevice() ? LOW_MEMORY_NORMAL_EFFECT_LRU_SIZE : NORMAL_EFFECT_LRU_SIZE;
        this.Xpe = e;
      }
    };
    this.ScheduledAfterTick = undefined;
    this.OnEnabledChange = undefined;
    this.OnWasRecentlyRenderedOnScreenChange = undefined;
    this.LocationProxyFunction = undefined;
  }
  Init() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnBattleStateChanged, this.Zpe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CreateEntity, this.Jpe);
    var e = UE.KuroStaticLibrary.IsLowMemoryDevice() ? LOW_MEMORY_NORMAL_EFFECT_LRU_SIZE : NORMAL_EFFECT_LRU_SIZE;
    this.Xpe = e;
  }
  Clear() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnBattleStateChanged, this.Zpe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CreateEntity, this.Jpe);
    EventSystem_1.EventSystem.RemoveAllTargetUseKey(this);
    this.Vk_.clear();
  }
  static IsNeedPreCreateEffect() {
    return !GlobalData_1.GlobalData.IsPlayInEditor || ModelManager_1.ModelManager.GameModeModel.MapId > 3000 && ModelManager_1.ModelManager.GameModeModel.MapId < 4000 || ModelManager_1.ModelManager.GameModeModel.MapId === 2;
  }
  Tick(e) {
    if (PreCreateEffect.IsOpenPool) {
      if (!this.Wpe.Empty && PreCreateEffect.IsNeedPreCreateEffect()) {
        this.Qpe.Start();
        this.tve();
        this.Qpe.Stop();
      }
      this.ive();
    }
  }
  ive() {
    var e = EffectSystem_1.EffectSystem.GetEffectLruCapacity();
    if (e !== this.Xpe) {
      if (e > this.Xpe) {
        e = EffectSystem_1.EffectSystem.GetEffectLruSize() - CHANGE_COUNT_EVERY_TICK;
        EffectSystem_1.EffectSystem.SetEffectLruCapacity(e > this.Xpe ? e : this.Xpe);
      } else {
        EffectSystem_1.EffectSystem.SetEffectLruCapacity(FIGHT_EFFECT_LRU_SIZE);
      }
    }
  }
  eve() {
    commonFightEffect.forEach(e => {
      if (EffectSystem_1.EffectSystem.GetEffectLruCount(e) === 0) {
        this.Wpe.Push(new PreCreateEffectData(-1, e));
      }
    });
  }
  ove(e) {
    var t;
    if (EntitySystem_1.EntitySystem.Get(e.EntityId)?.GetComponent(0)?.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Player) {
      if ((t = this.Vk_.get(e.EntityId) ?? 0) >= PLAYER_CREATE_MAX) {
        return undefined;
      } else {
        this.Vk_.set(e.EntityId, t + 1);
        this.Wpe.Push(e);
        return;
      }
    }
    if (!this.jpe.has(e.EntityId)) {
      this.jpe.set(e.EntityId, new Queue_1.Queue());
    }
    this.jpe.get(e.EntityId).Push(e);
    this.Kpe.set(e.Path, this.Kpe.get(e.Path) + 1);
  }
  AddPreCreateEffect(e, t) {
    if (!!t && !t.includes("/Niagara") && !t.includes("/MaterialController/") && !t.includes("/UIResources/") && !t.includes("/Aki/Character")) {
      e = new PreCreateEffectData(e, t);
      if (!this.Kpe.get(t)) {
        this.ove(e);
      }
      if (this.Ype && (PreCreateEffect.PreCreateEffectSet.add(t), Log_1.Log.CheckDebug())) {
        Log_1.Log.Debug("Preload", 4, "PreCreateEffect_常规特效", ["Path", t]);
      }
    }
  }
  AddPreCreateHitEffect(e, t) {
    if (t) {
      var _ = new PreCreateEffectData(e, t);
      var r = (UE.KuroStaticLibrary.IsLowMemoryDevice() ? LOW_MEMORY_HIT_EFFECT_COUNT : HIT_EFFECT_COUNT) - EffectSystem_1.EffectSystem.GetEffectLruCount(t) - this.Kpe.get(t);
      for (let e = 0; e < r; e++) {
        this.ove(_);
      }
      if (this.Ype && (PreCreateEffect.PreCreateEffectSet.add(t), Log_1.Log.CheckDebug())) {
        Log_1.Log.Debug("Preload", 4, "PreCreateEffect_被击特效", ["Path", t]);
      }
    }
  }
  tve() {
    var e = this.Wpe.Pop();
    if (this.Kpe.get(e.Path) - 1 <= 0) {
      this.Kpe.delete(e.Path);
    } else {
      this.Kpe.set(e.Path, this.Kpe.get(e.Path) - 1);
    }
    var t = EffectSystem_1.EffectSystem.SpawnEffect(GlobalData_1.GlobalData.GameInstance, this.Hpe, e.Path, "PreCreateEffect", new EffectContext_1.EffectContext(e.EntityId), 3, undefined, undefined, undefined, true);
    EffectSystem_1.EffectSystem.StopEffectById(t, "PreCreateEffect", true);
    if (this.Ype && Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Preload", 4, "PreCreateEffect_生成特效", ["Path", e]);
    }
  }
  RegisterTick() {
    if (this.yW) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Preload", 4, "EffectHandle RegisterTick: 重复注册Tick", ["EffectHandle", this.constructor.name]);
      }
      this.UnregisterTick();
    }
    var e = GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator.TsIdleExecConfig;
    this.yW = GameBudgetInterfaceController_1.GameBudgetInterfaceController.RegisterTick(e.GroupName, e.SignificanceGroup, this, undefined);
  }
  UnregisterTick() {
    if (this.yW) {
      GameBudgetInterfaceController_1.GameBudgetInterfaceController.UnregisterTick(this);
      this.yW = undefined;
    }
  }
  ScheduledTick(e, t, _) {
    this.Tick(e);
  }
}
(exports.PreCreateEffect = PreCreateEffect).PreCreateEffectSet = new Set();
PreCreateEffect.IsOpenPool = true; //# sourceMappingURL=PreCreateEffect.js.map