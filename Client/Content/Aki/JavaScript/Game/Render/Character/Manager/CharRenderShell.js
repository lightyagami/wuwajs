"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharRenderShell = undefined;
const cpp_1 = require("cpp");
const UE = require("ue");
const Info_1 = require("../../../../Core/Common/Info");
const Log_1 = require("../../../../Core/Common/Log");
const Time_1 = require("../../../../Core/Common/Time");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const GameBudgetInterfaceController_1 = require("../../../../Core/GameBudgetAllocator/GameBudgetInterfaceController");
const PerformanceController_1 = require("../../../../Core/Performance/PerformanceController");
const TickProcessSystem_1 = require("../../../../Core/Tick/TickProcessSystem");
const TickSystem_1 = require("../../../../Core/Tick/TickSystem");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const TsBaseCharacter_1 = require("../../../Character/TsBaseCharacter");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const Global_1 = require("../../../Global");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const SceneTeamDefine_1 = require("../../../Module/SceneTeam/SceneTeamDefine");
const GameBudgetAllocatorConfigCreator_1 = require("../../../World/Define/GameBudgetAllocatorConfigCreator");
const RenderModuleConfig_1 = require("../../Manager/RenderModuleConfig");
class CharRenderShell {
  constructor() {
    this.RenderingComponent = undefined;
    this.veh = false;
    this.hen = 0;
    this.sva = undefined;
    this.hKf = false;
    this.M6l = e => {
      if (CharRenderShell.CharRenderShellGameBudgetOptimize && e.VehicleType === "Motorcycle" && e.IsRolePassenger(true)) {
        this.lKf(GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator.TsMoveSceneItemEntityConfig);
      }
    };
    this.E6l = e => {
      if (CharRenderShell.CharRenderShellGameBudgetOptimize && this.RenderingComponent && e.VehicleType === "Motorcycle" && e.IsRolePassenger(true)) {
        this.lKf(GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator.TsCharacterRenderConfig);
      }
    };
    this.tXd = e => {
      var t;
      var i;
      if (this.hen === 0 && ((t = (i = this.RenderingComponent?.GetCachedOwnerEntity())?.GetComponent(59)?.GetAttributeHolder()) !== i && (i = t?.CheckGetComponent(44)) && (this.hen = i.GetVisionId()), this.hen === 0)) {
        EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.EndVisionSkill, this.tXd);
      }
      if (this.hen === e) {
        this.RenderingComponent?.CleanOriginEffect();
      }
    };
    this.yW = undefined;
    this.s6a = undefined;
    this.P1h = false;
    this.Mq_ = false;
    this.RoleEntity = undefined;
    this.xie = (e, t) => {
      if (this.RoleEntity && e.Id === this.RoleEntity.Id) {
        this.A4i();
      }
    };
    this.OnExecuteQte = (e, t) => {
      if (this.RoleEntity && e === this.RoleEntity.Id) {
        this.A4i();
      }
    };
    this.lSl = () => {
      if (this.RenderingComponent?.ShouldTickAfterGoDown()) {
        this.Mq_ = true;
      } else {
        this.o3a();
      }
    };
    this.OtherRoleEntityId = 0;
    this.rZe = (e, t) => {
      if (this.j4_ && e.Id === this.OtherRoleEntityId) {
        this.A4i();
      }
    };
    this.z6u = () => {
      if (this.RenderingComponent?.ShouldTickAfterGoDown()) {
        this.Mq_ = true;
      } else {
        this.o3a();
      }
    };
    this.vk1 = 0;
    this.par = (e, t, i) => {
      if (Time_1.Time.IsAfterPrePhysicTick) {
        if (this.vk1 === 0) {
          this.vk1 = TickProcessSystem_1.TickProcessSystem.RegisterOnceTickProcess(5, true, this.A$a);
        }
      } else {
        TimerSystem_1.TimerSystem.Next(this.gc_);
      }
    };
    this.A$a = e => {
      this.vk1 = 0;
      this.RenderingComponent?.UpdateMaterialEffectsOnly();
    };
    this.gc_ = e => {
      if (this.yW && this.pc_ < Time_1.Time.Frame) {
        this.Tick(0, true);
      }
    };
    this.a6a = e => {
      if (this.yW) {
        cpp_1.FKuroGameBudgetAllocatorInterface.MarkActorInFighting(GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator.TsCharacterRenderConfig.GroupName, this.yW, e);
      }
    };
    this.pc_ = 0;
    this.ScheduledAfterTick = undefined;
    this.OnEnabledChange = undefined;
    this.i3a = false;
    this.r3a = 0;
    this.LocationProxyFunction = undefined;
  }
  get IsAlwaysTick() {
    return this.veh;
  }
  Init(e) {
    this.RenderingComponent = e;
    this.veh = e.RenderType === 5 || e.RenderType === 6 || e.IsUiUpdate;
    if (!this.veh) {
      var t = this.RenderingComponent.GetOwner();
      if (t instanceof TsBaseCharacter_1.default) {
        var i = t.EntityId;
        var s = ModelManager_1.ModelManager.CreatureModel?.GetCreatureDataId(i);
        var r = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems();
        for (let e = 0; e < SceneTeamDefine_1.SCENE_TEAM_MAX_NUM; e++) {
          var h = r[e];
          if (h?.GetCreatureDataId() === s) {
            if (h.IsMyRole()) {
              if ((h = t.CharacterActorComponent?.Entity) && (this.RoleEntity = h, EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnChangeRole, this.xie), EventSystem_1.EventSystem.AddWithTarget(h, EventDefine_1.EEventName.OnRoleGoDownFinish, this.lSl), ControllerHolder_1.ControllerHolder.MapRogueController.CheckInMapRogueInstance())) {
                EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CharExecuteQte, this.OnExecuteQte);
              }
              return;
            }
            h = t.CharacterActorComponent?.Entity;
            if (h) {
              if (h.GetComponent(0)?.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Player) {
                this.OtherRoleEntityId = i;
                EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnOtherChangeRole, this.rZe);
                EventSystem_1.EventSystem.AddWithTarget(h, EventDefine_1.EEventName.OnOtherRoleGoDownFinish, this.z6u);
                this.A4i();
                return;
              }
            }
          }
        }
      }
      var e = this.RenderingComponent.GetCachedOwnerEntity();
      var o = e?.GetComponent(0);
      if (o?.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Vision) {
        EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.EndVisionSkill, this.tXd);
      } else if (o?.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Monster && Info_1.Info.IsPcOrGamepadPlatform() && o.GetMonsterMatchType() === 1) {
        this.hKf = true;
        EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnEnterVehicle, this.M6l);
        EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnLeaveVehicle, this.E6l);
      }
      this.sva = e?.GetComponent(196);
      this.A4i();
    }
  }
  lKf(e) {
    if (this.RenderingComponent) {
      if (this.yW) {
        GameBudgetInterfaceController_1.GameBudgetInterfaceController.UnregisterTick(this);
        this.yW = undefined;
      }
      this.Mq_ = false;
      this.yW = GameBudgetInterfaceController_1.GameBudgetInterfaceController.RegisterTick(e.GroupName, e.SignificanceGroup, this, this.RenderingComponent.GetCachedOwner());
    }
  }
  Clear() {
    var e;
    if (!this.veh) {
      this.o3a();
    }
    if (this.Xjt) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnChangeRole, this.xie);
      EventSystem_1.EventSystem.RemoveWithTarget(this.RoleEntity, EventDefine_1.EEventName.OnRoleGoDownFinish, this.lSl);
      if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.CharExecuteQte, this.OnExecuteQte)) {
        EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CharExecuteQte, this.OnExecuteQte);
      }
      this.RoleEntity = undefined;
    }
    if (this.j4_) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnOtherChangeRole, this.rZe);
      if (e = ModelManager_1.ModelManager.CreatureModel.GetEntityById(this.OtherRoleEntityId)?.Entity) {
        EventSystem_1.EventSystem.RemoveWithTarget(e, EventDefine_1.EEventName.OnOtherRoleGoDownFinish, this.z6u);
      }
      this.OtherRoleEntityId = 0;
    }
    if (this.hKf) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnEnterVehicle, this.M6l);
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnLeaveVehicle, this.E6l);
    }
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.EndVisionSkill, this.tXd)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.EndVisionSkill, this.tXd);
    }
  }
  A4i() {
    if (CharRenderShell.CharRenderShellGameBudgetOptimize && this.RenderingComponent && (!this.Mq_ || (this.Mq_ = false, !this.yW))) {
      if (this.yW) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("HudUnit", 36, "CharRenderShell RegisterTick: 重复注册Tick", ["Actor", UE.KismetSystemLibrary.GetPathName(this.RenderingComponent.GetCachedOwner())]);
        }
        this.o3a();
      }
      let e = false;
      var i = this.RenderingComponent.GetCachedOwnerEntity()?.GetComponent(0);
      if (i?.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Npc && ((i = i.GetSubEntityType()) === 0 || i === 1 || i === 2)) {
        e = true;
      }
      this.r3a = Time_1.Time.WorldTimeSeconds;
      let t = GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator.TsCharacterRenderConfig;
      if (this.hKf) {
        if (Global_1.Global.BaseCharacter?.CharacterActorComponent?.Entity.GetComponent(242)?.VehicleType === "Motorcycle") {
          t = GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator.TsMoveSceneItemEntityConfig;
        }
      } else {
        t = e ? GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator.TsNpcRenderConfig : this.Xjt ? GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator.TsPlayerAlwaysTickConfig : GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator.TsCharacterRenderConfig;
      }
      this.yW = GameBudgetInterfaceController_1.GameBudgetInterfaceController.RegisterTick(t.GroupName, t.SignificanceGroup, this, this.RenderingComponent.GetCachedOwner());
      i = this.RenderingComponent.GetOwner();
      if (i) {
        this.s6a = i;
        EventSystem_1.EventSystem.AddWithTarget(this.s6a, EventDefine_1.EEventName.OnMarkActorInFighting, this.a6a);
      }
      if (!this.P1h) {
        this.P1h = true;
        EventSystem_1.EventSystem.AddWithTarget(this.RenderingComponent, EventDefine_1.EEventName.OnAddMaterialController, this.par);
      }
      if (i instanceof UE.BP_MaterialControllerRenderActor_C && i.RefActor) {
        cpp_1.FKuroGameBudgetAllocatorInterface.UpdatePerformanceActor(t.GroupName, this.yW, i.RefActor);
        this.i3a = i.RefActor.WasRecentlyRendered();
      }
    }
  }
  get Xjt() {
    return this.RoleEntity !== undefined;
  }
  get j4_() {
    return this.OtherRoleEntityId !== 0;
  }
  o3a() {
    if (this.P1h && (this.P1h = false, this.RenderingComponent)) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.RenderingComponent, EventDefine_1.EEventName.OnAddMaterialController, this.par);
    }
    if (CharRenderShell.CharRenderShellGameBudgetOptimize) {
      if (this.s6a) {
        EventSystem_1.EventSystem.RemoveWithTarget(this.s6a, EventDefine_1.EEventName.OnMarkActorInFighting, this.a6a);
        this.s6a = undefined;
      }
      if (this.yW) {
        GameBudgetInterfaceController_1.GameBudgetInterfaceController.UnregisterTick(this);
        this.yW = undefined;
      }
      this.Mq_ = false;
    }
  }
  ScheduledTick(e, t, i) {
    RenderModuleConfig_1.RenderStats.StatRenderModuleModelTickRenderShell?.Start();
    try {
      this.pc_ = Time_1.Time.Frame;
      this.Tick(e);
    } catch (e) {
      if (e instanceof Error && Log_1.Log.CheckError()) {
        Log_1.Log.ErrorWithStack("Render", 25, "RenderShell Tick执行异常", e, ["error", e.message]);
      }
    }
    RenderModuleConfig_1.RenderStats.StatRenderModuleModelTickRenderShell?.Stop();
  }
  OnWasRecentlyRenderedOnScreenChange(e) {
    this.i3a = e;
    if (!this.i3a) {
      this.r3a = Time_1.Time.WorldTimeSeconds;
    }
  }
  Tick(i, s = false) {
    if ((!CharRenderShell.CharRenderShellGameBudgetOptimize || Info_1.Info.IsInEditorTick() || s || this.Mq_ || this.sva?.IsInPlot || this.veh || this.i3a) && this.RenderingComponent) {
      if (this.Mq_ && !this.RenderingComponent.ShouldTickAfterGoDown()) {
        this.o3a();
      } else if (!TickSystem_1.TickSystem.IsPaused || this.veh || ModelManager_1.ModelManager.RenderModuleModel?.ForceTickCharRenderShell) {
        RenderModuleConfig_1.RenderStats.StatCharRenderShellTick.Start();
        let e = i;
        if (this.r3a > 0) {
          e += Time_1.Time.WorldTimeSeconds - this.r3a;
          this.r3a = 0;
        }
        let t = 0;
        if (PerformanceController_1.PerformanceController.IsEntityTickPerformanceTest) {
          t = cpp_1.KuroTime.GetMilliseconds64();
        }
        this.RenderingComponent.Tick(e);
        if (PerformanceController_1.PerformanceController.IsEntityTickPerformanceTest && (s = this.RenderingComponent.GetOwner()) instanceof TsBaseCharacter_1.default) {
          PerformanceController_1.PerformanceController.CollectComponentTickPerformanceInfo(s.EntityId, "CharRenderingComponent", true, cpp_1.KuroTime.GetMilliseconds64() - t);
        }
        RenderModuleConfig_1.RenderStats.StatCharRenderShellTick.Stop();
      }
    }
  }
}
(exports.CharRenderShell = CharRenderShell).CharRenderShellGameBudgetOptimize = true;
//# sourceMappingURL=CharRenderShell.js.map