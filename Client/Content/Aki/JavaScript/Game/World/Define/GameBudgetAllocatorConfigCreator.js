"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameBudgetAllocatorConfigCreator = exports.EFFECT_IMPORTANCE_ENABLE_RANGE = exports.EFFECT_USE_BOUNDS_RANGE = exports.EFFECT_ENABLE_RANGE = undefined;
const cpp_1 = require("cpp");
const puerts_1 = require("puerts");
const UE = require("ue");
const Info_1 = require("../../../Core/Common/Info");
const Log_1 = require("../../../Core/Common/Log");
const GameBudgetAllocatorConfig_1 = require("../../../Core/GameBudgetAllocator/GameBudgetAllocatorConfig");
const FNameUtil_1 = require("../../../Core/Utils/FNameUtil");
const GameBudgetAllocatorConfigMobileCreator_1 = require("./GameBudgetAllocatorConfigMobileCreator");
const GameBudgetAllocatorConfigPcCreator_1 = require("./GameBudgetAllocatorConfigPcCreator");
const PRE_PLAYER_MOVE_TICK_PRIORITY = 3;
const PLAYER_ALWAYS_TICK_PRIORITY = 4;
const ALWAYS_TICK_PRIORITY = 5;
const FIGHT_EFFECT_PRIPRITY = 7;
const Boss_PRIORITY = 8;
const ROLE_PRIORITY = 9;
const NPC_PRIORITY = 10;
const SIMPLE_NPC_PRIORITY = 11;
const HUD_PRIORITY = 12;
const BATTLE_HEAD_STATE_VIEW_PRIORITY = 12;
const OTHER_PRIORITY = 12;
const CAMERA_PRIORITY = 90;
const IDLE_EXEC_PRIORITY = 100;
exports.EFFECT_ENABLE_RANGE = 30001;
exports.EFFECT_USE_BOUNDS_RANGE = 10000;
exports.EFFECT_IMPORTANCE_ENABLE_RANGE = 200000;
const EFFECT_IMPORTANCE_ENABLE_MAX_RANGE = 500000;
const HUD_ENABLE_RANGE = 5000;
const BATTLE_HEAD_STATE_VIEW_RANGE = 5000;
const CHARCTER_RENDER_ENABLE_MAX_RANGE = 18000;
const COLLISION_PLANT_RANGE = 1000;
const DYNAMIC_PHYSICS_INTERACTION_ACTOR_RANGE = 2500;
const STATIC_PHYSICS_INTERACTION_ACTOR_RANGE = 1500;
class GameBudgetAllocatorConfigCreator {
  static get TsNormalEntityGroupConfig() {
    return this.Cvr;
  }
  static get TsBossEntityGroupConfig() {
    return this.Twa;
  }
  static get TsCharacterEntityGroupConfig() {
    return this.gvr;
  }
  static get TsNormalNpcEntityGroupConfig() {
    return this.QPa;
  }
  static get TsSimpleNpcEntityGroupConfig() {
    return this.KPa;
  }
  static get TsFightEffectGroupConfig() {
    return this.fvr;
  }
  static get TsEffectGroupConfig() {
    return this.pvr;
  }
  static get TsEffectInportanceGroupConfig() {
    return this.AJs;
  }
  static get TsAlwaysTickConfig() {
    return this.vvr;
  }
  static get TsPlayerAlwaysTickConfig() {
    return this.Mvr;
  }
  static get TsNormalEntityAlwaysTickConfig() {
    return this.Wvd;
  }
  static get TsIdleExecConfig() {
    return this.Evr;
  }
  static get TsAlwaysTick2Config() {
    return this.Svr;
  }
  static get TsHUDTickConfig() {
    return this.yvr;
  }
  static get TsCharacterRenderConfig() {
    return this.n3a;
  }
  static get TsNpcRenderConfig() {
    return this.O3d;
  }
  static get TsStabilizeLowEntityGroupConfig() {
    return this.Jia;
  }
  static get TsBattleHeadStateViewConfig() {
    return this.pka;
  }
  static get TsCharacterDtailConfig() {
    return this.DOn;
  }
  static get TsAlwaysTickHotFixConfig() {
    return this.Zja;
  }
  static get TsMoveSceneItemEntityConfig() {
    return this.q4u;
  }
  static get TsCollisionPlantConfig() {
    return this.w01;
  }
  static get TsDynamicPhysicsInteractionActorConfig() {
    return this.gWd;
  }
  static get TsStaticPhysicsInteractionActorConfig() {
    return this.CWd;
  }
  static CreateCharacterEntityConfigOnly() {
    this.DOn = this.Tvr(new GameBudgetAllocatorConfigMobileCreator_1.GameBudgetAllocatorConfigMobileCreator(), false);
  }
  static CreateConfigs() {
    let t = undefined;
    t = new (Info_1.Info.IsPcPlatform() ? GameBudgetAllocatorConfigPcCreator_1.GameBudgetAllocatorConfigPcCreator : GameBudgetAllocatorConfigMobileCreator_1.GameBudgetAllocatorConfigMobileCreator)();
    this.Ivr(t);
    this.Lwa(t);
    this.Tvr(t);
    this.$Pa(t);
    this.XPa(t);
    this.Lvr(t);
    this.Dvr(t);
    this.DJs(t);
    this.zia(t);
    this.eWa(t);
    this.G4u(t);
    this.Rvr(t);
    this.Xfd(t);
    this.Uvr(t);
    this.Avr(t);
    this.Pvr(t);
    this.xvr(t);
    this.CreateCharacterRenderConfig(t);
    this.CreateNpcRenderConfig(t);
    this.fka(t);
    this.A01(t);
    this.pWd(t);
    this.vWd(t);
  }
  static UpdateGroupConfigTickStrategy(t, e, i) {
    t.ueGroupConfig.DisableActorTickStrategy = e;
    t.ueGroupConfig.DisableActorTickDistance = i;
    cpp_1.FKuroGameBudgetAllocatorInterface.UpdateGroupConfig(t.ueGroupConfig);
  }
  static RestoreGroupConfigTickStrategy(t) {
    t.ueGroupConfig.DisableActorTickStrategy = t.DefaultDisableActorTickStrategy;
    t.ueGroupConfig.DisableActorTickDistance = t.DefaultDisableActorTickDistance;
    cpp_1.FKuroGameBudgetAllocatorInterface.UpdateGroupConfig(t.ueGroupConfig);
  }
  static wvr(t, e) {
    var i = (0, puerts_1.$ref)(t);
    for (const r in e) {
      var a = e[r];
      if (r === "Default") {
        if (!a) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Game", 24, "Missing default config!", ["GroupName", t.GroupName.toString()]);
          }
        }
        cpp_1.FKuroGameBudgetAllocatorInterface.SetDefaultTickIntervalDetailConfig(i, a.MaxInterval, a.TickReductionStartSize, a.TickReductionIntervalSize);
      } else if (a) {
        cpp_1.FKuroGameBudgetAllocatorInterface.SetTickIntervalDetailConfig(i, a.GlobalMode, a.ActorMode, a.MaxInterval, a.TickReductionStartSize, a.TickReductionIntervalSize);
      }
    }
    cpp_1.FKuroGameBudgetAllocatorInterface.SetGroupConfig(t.GroupName, t);
  }
  static Pvr(t) {
    var t = t.CreateIdleExecConfig();
    var e = new UE.GameBudgetAllocatorGroupConfig();
    e.GroupName = FNameUtil_1.FNameUtil.GetDynamicFName("IdleExecGroup");
    e.SignificanceGroup = 0;
    e.TickPriority = IDLE_EXEC_PRIORITY;
    this.Evr = new GameBudgetAllocatorConfig_1.TsGameBudgetGroupConfigCache(e);
    var i = (0, puerts_1.$ref)(e);
    cpp_1.FKuroGameBudgetAllocatorInterface.SetDefaultTickIntervalDetailConfig(i, t.MaxInterval, t.TickReductionStartSize, t.TickReductionIntervalSize);
    cpp_1.FKuroGameBudgetAllocatorInterface.SetGroupConfig(e.GroupName, e);
  }
  static Lwa(t, e = true) {
    t = t.CreateBossEntityConfig();
    if (e) {
      (e = new UE.GameBudgetAllocatorGroupConfig()).GroupName = FNameUtil_1.FNameUtil.GetDynamicFName("BossEntity");
      e.SignificanceGroup = 3;
      e.TickPriority = Boss_PRIORITY;
      this.Twa = new GameBudgetAllocatorConfig_1.TsGameBudgetGroupConfigCache(e);
      this.wvr(e, t);
    }
    return t;
  }
  static Tvr(t, e = true) {
    t = t.CreateCharacterEntityConfig();
    if (e) {
      (e = new UE.GameBudgetAllocatorGroupConfig()).GroupName = FNameUtil_1.FNameUtil.GetDynamicFName("CharacterEntity");
      e.SignificanceGroup = 2;
      e.TickPriority = ROLE_PRIORITY;
      this.gvr = new GameBudgetAllocatorConfig_1.TsGameBudgetGroupConfigCache(e);
      this.wvr(e, t);
    }
    return t;
  }
  static $Pa(t, e = true) {
    t = t.CreateNormalNpcEntityConfig();
    if (e) {
      (e = new UE.GameBudgetAllocatorGroupConfig()).GroupName = FNameUtil_1.FNameUtil.GetDynamicFName("NormalNpcEntity");
      e.SignificanceGroup = 2;
      e.TickPriority = NPC_PRIORITY;
      this.QPa = new GameBudgetAllocatorConfig_1.TsGameBudgetGroupConfigCache(e);
      this.wvr(e, t);
    }
    return t;
  }
  static XPa(t, e = true) {
    t = t.CreateSimpleNpcEntityConfig();
    if (e) {
      (e = new UE.GameBudgetAllocatorGroupConfig()).GroupName = FNameUtil_1.FNameUtil.GetDynamicFName("SimpleNpcEntity");
      e.SignificanceGroup = 1;
      e.TickPriority = SIMPLE_NPC_PRIORITY;
      e.DisableActorTickStrategy = 1;
      e.DisableActorTickDistance = 3000;
      this.KPa = new GameBudgetAllocatorConfig_1.TsGameBudgetGroupConfigCache(e);
      this.wvr(e, t);
    }
    return t;
  }
  static Ivr(t) {
    var t = t.CreateNormalEntityConfig();
    var e = new UE.GameBudgetAllocatorGroupConfig();
    e.GroupName = FNameUtil_1.FNameUtil.GetDynamicFName("NormalEntity");
    e.SignificanceGroup = 1;
    e.TickPriority = OTHER_PRIORITY;
    this.Cvr = new GameBudgetAllocatorConfig_1.TsGameBudgetGroupConfigCache(e);
    this.wvr(e, t);
  }
  static Lvr(t) {
    var t = t.CreateFightEffectConfig();
    var e = new UE.GameBudgetAllocatorGroupConfig();
    e.GroupName = FNameUtil_1.FNameUtil.GetDynamicFName("FightEffectGroup");
    e.SignificanceGroup = 4;
    e.TickPriority = FIGHT_EFFECT_PRIPRITY;
    e.DisableActorTickStrategy = 1;
    e.DisableActorTickDistance = exports.EFFECT_ENABLE_RANGE;
    this.fvr = new GameBudgetAllocatorConfig_1.TsGameBudgetGroupConfigCache(e);
    var i = (0, puerts_1.$ref)(e);
    cpp_1.FKuroGameBudgetAllocatorInterface.SetDefaultTickIntervalDetailConfig(i, t.MaxInterval, t.TickReductionStartSize, t.TickReductionIntervalSize);
    cpp_1.FKuroGameBudgetAllocatorInterface.SetGroupConfig(e.GroupName, e);
  }
  static Dvr(t) {
    var t = t.CreateEffectConfig();
    var e = new UE.GameBudgetAllocatorGroupConfig();
    e.GroupName = FNameUtil_1.FNameUtil.GetDynamicFName("EffectGroup");
    e.SignificanceGroup = 2;
    e.TickPriority = OTHER_PRIORITY;
    e.DisableActorTickStrategy = 1;
    e.DisableActorTickDistance = exports.EFFECT_ENABLE_RANGE;
    this.pvr = new GameBudgetAllocatorConfig_1.TsGameBudgetGroupConfigCache(e);
    this.wvr(e, t);
  }
  static DJs(t) {
    var t = t.CreateEffectImportanceConfig();
    var e = new UE.GameBudgetAllocatorGroupConfig();
    e.GroupName = FNameUtil_1.FNameUtil.GetDynamicFName("EffectImportanceGroup");
    e.SignificanceGroup = 3;
    e.TickPriority = OTHER_PRIORITY;
    e.DisableActorTickStrategy = 1;
    e.DisableActorTickDistance = EFFECT_IMPORTANCE_ENABLE_MAX_RANGE;
    this.AJs = new GameBudgetAllocatorConfig_1.TsGameBudgetGroupConfigCache(e);
    this.wvr(e, t);
  }
  static zia(t) {
    var t = t.CreateStabilizeLowEntityConfig();
    var e = new UE.GameBudgetAllocatorGroupConfig();
    e.GroupName = FNameUtil_1.FNameUtil.GetDynamicFName("CustomStabilizeLow");
    e.SignificanceGroup = 1;
    e.TickPriority = OTHER_PRIORITY;
    e.DisableActorTickStrategy = 0;
    this.Jia = new GameBudgetAllocatorConfig_1.TsGameBudgetGroupConfigCache(e);
    this.wvr(e, t);
  }
  static eWa(t) {
    var t = t.CreateAlwaysTickHotfixConfig();
    var e = new UE.GameBudgetAllocatorGroupConfig();
    e.GroupName = FNameUtil_1.FNameUtil.GetDynamicFName("AlwaysTickHotFix");
    e.SignificanceGroup = 3;
    e.TickPriority = OTHER_PRIORITY;
    e.DisableActorTickStrategy = 0;
    this.Zja = new GameBudgetAllocatorConfig_1.TsGameBudgetGroupConfigCache(e);
    this.wvr(e, t);
  }
  static G4u(t) {
    var t = t.CreateMoveSceneItemEntityConfig();
    var e = new UE.GameBudgetAllocatorGroupConfig();
    e.GroupName = FNameUtil_1.FNameUtil.GetDynamicFName("MoveSceneItemEntity");
    e.SignificanceGroup = 1;
    e.TickPriority = PRE_PLAYER_MOVE_TICK_PRIORITY;
    this.q4u = new GameBudgetAllocatorConfig_1.TsGameBudgetGroupConfigCache(e);
    this.wvr(e, t);
  }
  static Rvr(t) {
    var t = t.CreatePlayerAlwaysTickConfig();
    var e = new UE.GameBudgetAllocatorGroupConfig();
    e.GroupName = FNameUtil_1.FNameUtil.GetDynamicFName("PlayerAlwaysTickGroup");
    e.SignificanceGroup = 4;
    e.TickPriority = PLAYER_ALWAYS_TICK_PRIORITY;
    this.Mvr = new GameBudgetAllocatorConfig_1.TsGameBudgetGroupConfigCache(e);
    var i = (0, puerts_1.$ref)(e);
    cpp_1.FKuroGameBudgetAllocatorInterface.SetDefaultTickIntervalDetailConfig(i, t.MaxInterval, t.TickReductionStartSize, t.TickReductionIntervalSize);
    cpp_1.FKuroGameBudgetAllocatorInterface.SetGroupConfig(e.GroupName, e);
  }
  static Xfd(t) {
    var t = t.CreateNormalEntityAlwaysTickConfig();
    var e = new UE.GameBudgetAllocatorGroupConfig();
    e.GroupName = FNameUtil_1.FNameUtil.GetDynamicFName("NormalEntityAlwaysTickGroup");
    e.SignificanceGroup = 3;
    e.TickPriority = OTHER_PRIORITY;
    e.DisableActorTickStrategy = 0;
    this.Wvd = new GameBudgetAllocatorConfig_1.TsGameBudgetGroupConfigCache(e);
    this.wvr(e, t);
  }
  static Uvr(t) {
    var t = t.CreateAlwaysTickConfig();
    var e = new UE.GameBudgetAllocatorGroupConfig();
    e.GroupName = FNameUtil_1.FNameUtil.GetDynamicFName("AlwaysTickGroup");
    e.SignificanceGroup = 4;
    e.TickPriority = ALWAYS_TICK_PRIORITY;
    this.vvr = new GameBudgetAllocatorConfig_1.TsGameBudgetGroupConfigCache(e);
    var i = (0, puerts_1.$ref)(e);
    cpp_1.FKuroGameBudgetAllocatorInterface.SetDefaultTickIntervalDetailConfig(i, t.MaxInterval, t.TickReductionStartSize, t.TickReductionIntervalSize);
    cpp_1.FKuroGameBudgetAllocatorInterface.SetGroupConfig(e.GroupName, e);
  }
  static Avr(t) {
    var t = t.CreateCameraAlwaysTickConfig();
    var e = new UE.GameBudgetAllocatorGroupConfig();
    e.GroupName = FNameUtil_1.FNameUtil.GetDynamicFName("CameraAlwaysTickGroup");
    e.SignificanceGroup = 4;
    e.TickPriority = CAMERA_PRIORITY;
    this.Svr = new GameBudgetAllocatorConfig_1.TsGameBudgetGroupConfigCache(e);
    var i = (0, puerts_1.$ref)(e);
    cpp_1.FKuroGameBudgetAllocatorInterface.SetDefaultTickIntervalDetailConfig(i, t.MaxInterval, t.TickReductionStartSize, t.TickReductionIntervalSize);
    cpp_1.FKuroGameBudgetAllocatorInterface.SetGroupConfig(e.GroupName, e);
  }
  static xvr(t) {
    var t = t.CreateHUDTickConfig();
    var e = new UE.GameBudgetAllocatorGroupConfig();
    e.GroupName = FNameUtil_1.FNameUtil.GetDynamicFName("HUDGroup");
    e.SignificanceGroup = 2;
    e.TickPriority = HUD_PRIORITY;
    e.DisableActorTickStrategy = 1;
    e.DisableActorTickDistance = HUD_ENABLE_RANGE;
    this.yvr = new GameBudgetAllocatorConfig_1.TsGameBudgetGroupConfigCache(e);
    var i = (0, puerts_1.$ref)(e);
    cpp_1.FKuroGameBudgetAllocatorInterface.SetDefaultTickIntervalDetailConfig(i, t.MaxInterval, t.TickReductionStartSize, t.TickReductionIntervalSize);
    cpp_1.FKuroGameBudgetAllocatorInterface.SetGroupConfig(e.GroupName, e);
  }
  static fka(t) {
    var t = t.CreateBattleHeadViewConfig();
    var e = new UE.GameBudgetAllocatorGroupConfig();
    e.GroupName = FNameUtil_1.FNameUtil.GetDynamicFName("BattleHeadViewGroup");
    e.SignificanceGroup = 2;
    e.TickPriority = BATTLE_HEAD_STATE_VIEW_PRIORITY;
    e.DisableActorTickStrategy = 1;
    e.DisableActorTickDistance = BATTLE_HEAD_STATE_VIEW_RANGE;
    this.pka = new GameBudgetAllocatorConfig_1.TsGameBudgetGroupConfigCache(e);
    var i = (0, puerts_1.$ref)(e);
    cpp_1.FKuroGameBudgetAllocatorInterface.SetDefaultTickIntervalDetailConfig(i, t.MaxInterval, t.TickReductionStartSize, t.TickReductionIntervalSize);
    cpp_1.FKuroGameBudgetAllocatorInterface.SetGroupConfig(e.GroupName, e);
  }
  static CreateCharacterRenderConfig(t) {
    var t = t.CreateCharacterRenderConfig();
    var e = new UE.GameBudgetAllocatorGroupConfig();
    e.GroupName = FNameUtil_1.FNameUtil.GetDynamicFName("CharacterRenderGroup");
    e.SignificanceGroup = 3;
    e.TickPriority = Boss_PRIORITY;
    e.DisableActorTickStrategy = 1;
    e.DisableActorTickDistance = CHARCTER_RENDER_ENABLE_MAX_RANGE;
    this.n3a = new GameBudgetAllocatorConfig_1.TsGameBudgetGroupConfigCache(e);
    this.wvr(e, t);
  }
  static CreateNpcRenderConfig(t) {
    var t = t.CreateNpcRenderConfig();
    var e = new UE.GameBudgetAllocatorGroupConfig();
    e.GroupName = FNameUtil_1.FNameUtil.GetDynamicFName("NpcRenderGroup");
    e.SignificanceGroup = 1;
    e.TickPriority = SIMPLE_NPC_PRIORITY;
    e.DisableActorTickStrategy = 1;
    e.DisableActorTickDistance = CHARCTER_RENDER_ENABLE_MAX_RANGE;
    this.O3d = new GameBudgetAllocatorConfig_1.TsGameBudgetGroupConfigCache(e);
    this.wvr(e, t);
  }
  static A01(t) {
    var t = t.CreateCollisionPlantConfig();
    var e = new UE.GameBudgetAllocatorGroupConfig();
    e.GroupName = FNameUtil_1.FNameUtil.GetDynamicFName("CollisionPlant");
    e.SignificanceGroup = 1;
    e.TickPriority = OTHER_PRIORITY;
    e.DisableActorTickStrategy = 1;
    e.DisableActorTickDistance = COLLISION_PLANT_RANGE;
    this.w01 = new GameBudgetAllocatorConfig_1.TsGameBudgetGroupConfigCache(e);
    this.wvr(e, t);
  }
  static pWd(t) {
    var t = t.CreateDynamicPhysicsInteractionActorConfig();
    var e = new UE.GameBudgetAllocatorGroupConfig();
    e.GroupName = FNameUtil_1.FNameUtil.GetDynamicFName("BlueprintTick.DynamicPhysicsInteractionActor");
    e.SignificanceGroup = 2;
    e.TickPriority = OTHER_PRIORITY;
    e.DisableActorTickStrategy = 1;
    e.DisableActorTickDistance = DYNAMIC_PHYSICS_INTERACTION_ACTOR_RANGE;
    this.gWd = new GameBudgetAllocatorConfig_1.TsGameBudgetGroupConfigCache(e);
    this.wvr(e, t);
  }
  static vWd(t) {
    var t = t.CreateStaticPhysicsInteractionActorConfig();
    var e = new UE.GameBudgetAllocatorGroupConfig();
    e.GroupName = FNameUtil_1.FNameUtil.GetDynamicFName("BlueprintTick.StaticPhysicsInteractionActor");
    e.SignificanceGroup = 1;
    e.TickPriority = OTHER_PRIORITY;
    e.DisableActorTickStrategy = 1;
    e.DisableActorTickDistance = STATIC_PHYSICS_INTERACTION_ACTOR_RANGE;
    this.CWd = new GameBudgetAllocatorConfig_1.TsGameBudgetGroupConfigCache(e);
    this.wvr(e, t);
  }
  static GetEffectDynamicGroup(t) {
    var e;
    var i;
    var a;
    var r;
    var o;
    var n;
    var _;
    var s;
    var c;
    var C;
    var g;
    var l;
    if (t >= exports.EFFECT_IMPORTANCE_ENABLE_RANGE) {
      return this.TsEffectInportanceGroupConfig;
    } else {
      return this.TsEffectDynamicGroupConfigMap.get(t) || (0, g = (t - (C = t * 0.1)) / 179, o = (t - (e = t * 0.2)) / 59, n = (t - (l = t * 0.05)) / 299, _ = (t - (i = t * 0.1)) / 299, s = (t - (a = t * 0.02)) / 599, c = (t - (r = t * 0.1)) / 299, C = {
        Default: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(0, 0, 180, C, g),
        Normal_Render: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(0, 0, 60, e, o),
        Normal_NotRendered: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(0, 1, 300, l, n),
        Normal_Fighting: undefined,
        Fighting_Rendered: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(1, 0, 300, i, _),
        Fighting_NotRendered: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(1, 1, 600, a, s),
        Fighting_Fighting: undefined,
        Cutscene_Rendered: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(2, 0, 5, e, o),
        Cutscene_NotRendered: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(2, 1, 300, r, c)
      }, (g = new UE.GameBudgetAllocatorGroupConfig()).GroupName = FNameUtil_1.FNameUtil.GetDynamicFName("EffectGroup_" + t), g.SignificanceGroup = 2, g.TickPriority = OTHER_PRIORITY, g.DisableActorTickStrategy = 1, g.DisableActorTickDistance = t, l = new GameBudgetAllocatorConfig_1.TsGameBudgetGroupConfigCache(g), this.TsEffectDynamicGroupConfigMap.set(t, l), this.wvr(g, C), l);
    }
  }
}
(exports.GameBudgetAllocatorConfigCreator = GameBudgetAllocatorConfigCreator).TsEffectDynamicGroupConfigMap = new Map();
//# sourceMappingURL=GameBudgetAllocatorConfigCreator.js.map