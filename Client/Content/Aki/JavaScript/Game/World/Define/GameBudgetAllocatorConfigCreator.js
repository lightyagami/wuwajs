"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.GameBudgetAllocatorConfigCreator = exports.EFFECT_IMPORTANCE_ENABLE_RANGE = exports.EFFECT_USE_BOUNDS_RANGE = exports.EFFECT_ENABLE_RANGE = void 0;
const cpp_1 = require("cpp"),
  puerts_1 = require("puerts"),
  UE = require("ue"),
  Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  GameBudgetAllocatorConfig_1 = require("../../../Core/GameBudgetAllocator/GameBudgetAllocatorConfig"),
  FNameUtil_1 = require("../../../Core/Utils/FNameUtil"),
  GameBudgetAllocatorConfigMobileCreator_1 = require("./GameBudgetAllocatorConfigMobileCreator"),
  GameBudgetAllocatorConfigPcCreator_1 = require("./GameBudgetAllocatorConfigPcCreator"),
  PRE_PLAYER_MOVE_TICK_PRIORITY = 3,
  PLAYER_ALWAYS_TICK_PRIORITY = 4,
  ALWAYS_TICK_PRIORITY = 5,
  FIGHT_EFFECT_PRIPRITY = 7,
  Boss_PRIORITY = 8,
  ROLE_PRIORITY = 9,
  NPC_PRIORITY = 10,
  SIMPLE_NPC_PRIORITY = 11,
  HUD_PRIORITY = 12,
  BATTLE_HEAD_STATE_VIEW_PRIORITY = 12,
  OTHER_PRIORITY = 12,
  CAMERA_PRIORITY = 90,
  IDLE_EXEC_PRIORITY = 100,
  EFFECT_IMPORTANCE_ENABLE_MAX_RANGE = (exports.EFFECT_ENABLE_RANGE = 30001, exports.EFFECT_USE_BOUNDS_RANGE = 1e4, exports.EFFECT_IMPORTANCE_ENABLE_RANGE = 2e5, 5e5),
  HUD_ENABLE_RANGE = 5e3,
  BATTLE_HEAD_STATE_VIEW_RANGE = 5e3,
  CHARCTER_RENDER_ENABLE_MAX_RANGE = 18e3,
  COLLISION_PLANT_RANGE = 1e3;
class GameBudgetAllocatorConfigCreator {
  static get TsNormalEntityGroupConfig() {
    return this.Cvr
  }
  static get TsBossEntityGroupConfig() {
    return this.Twa
  }
  static get TsCharacterEntityGroupConfig() {
    return this.gvr
  }
  static get TsNormalNpcEntityGroupConfig() {
    return this.QPa
  }
  static get TsSimpleNpcEntityGroupConfig() {
    return this.KPa
  }
  static get TsFightEffectGroupConfig() {
    return this.fvr
  }
  static get TsEffectGroupConfig() {
    return this.pvr
  }
  static get TsEffectInportanceGroupConfig() {
    return this.AJs
  }
  static get TsAlwaysTickConfig() {
    return this.vvr
  }
  static get TsPlayerAlwaysTickConfig() {
    return this.Mvr
  }
  static get TsIdleExecConfig() {
    return this.Evr
  }
  static get TsAlwaysTick2Config() {
    return this.Svr
  }
  static get TsHUDTickConfig() {
    return this.yvr
  }
  static get TsCharacterRenderConfig() {
    return this.n3a
  }
  static get TsStabilizeLowEntityGroupConfig() {
    return this.Jia
  }
  static get TsBattleHeadStateViewConfig() {
    return this.pka
  }
  static get TsCharacterDtailConfig() {
    return this.DOn
  }
  static get TsAlwaysTickHotFixConfig() {
    return this.Zja
  }
  static get TsMoveSceneItemEntityConfig() {
    return this.Omu
  }
  static get TsCollisionPlantConfig() {
    return this.s01
  }
  static CreateCharacterEntityConfigOnly() {
    this.DOn = this.Tvr(new GameBudgetAllocatorConfigMobileCreator_1.GameBudgetAllocatorConfigMobileCreator, !1)
  }
  static CreateConfigs() {
    let t = void 0;
    t = new(Info_1.Info.IsPcPlatform() ? GameBudgetAllocatorConfigPcCreator_1.GameBudgetAllocatorConfigPcCreator : GameBudgetAllocatorConfigMobileCreator_1.GameBudgetAllocatorConfigMobileCreator), this.Ivr(t), this.Lwa(t), this.Tvr(t), this.$Pa(t), this.XPa(t), this.Lvr(t), this.Dvr(t), this.DJs(t), this.zia(t), this.eWa(t), this.qmu(t), this.Rvr(t), this.Uvr(t), this.Avr(t), this.Pvr(t), this.xvr(t), this.CreateCharacterRenderConfig(t), this.fka(t), this.a01(t)
  }
  static UpdateGroupConfigTickStrategy(t, e, i) {
    t.ueGroupConfig.DisableActorTickStrategy = e, t.ueGroupConfig.DisableActorTickDistance = i, cpp_1.FKuroGameBudgetAllocatorInterface.UpdateGroupConfig(t.ueGroupConfig)
  }
  static RestoreGroupConfigTickStrategy(t) {
    t.ueGroupConfig.DisableActorTickStrategy = t.DefaultDisableActorTickStrategy, t.ueGroupConfig.DisableActorTickDistance = t.DefaultDisableActorTickDistance, cpp_1.FKuroGameBudgetAllocatorInterface.UpdateGroupConfig(t.ueGroupConfig)
  }
  static wvr(t, e) {
    var i = (0, puerts_1.$ref)(t);
    for (const r in e) {
      var a = e[r];
      "Default" === r ? (a || Log_1.Log.CheckError() && Log_1.Log.Error("Game", 24, "Missing default config!", ["GroupName", t.GroupName.toString()]), cpp_1.FKuroGameBudgetAllocatorInterface.SetDefaultTickIntervalDetailConfig(i, a.MaxInterval, a.TickReductionStartSize, a.TickReductionIntervalSize)) : a && cpp_1.FKuroGameBudgetAllocatorInterface.SetTickIntervalDetailConfig(i, a.GlobalMode, a.ActorMode, a.MaxInterval, a.TickReductionStartSize, a.TickReductionIntervalSize)
    }
    cpp_1.FKuroGameBudgetAllocatorInterface.SetGroupConfig(t.GroupName, t)
  }
  static Pvr(t) {
    var t = t.CreateIdleExecConfig(),
      e = new UE.GameBudgetAllocatorGroupConfig,
      i = (e.GroupName = FNameUtil_1.FNameUtil.GetDynamicFName("IdleExecGroup"), e.SignificanceGroup = 0, e.TickPriority = IDLE_EXEC_PRIORITY, this.Evr = new GameBudgetAllocatorConfig_1.TsGameBudgetGroupConfigCache(e), (0, puerts_1.$ref)(e));
    cpp_1.FKuroGameBudgetAllocatorInterface.SetDefaultTickIntervalDetailConfig(i, t.MaxInterval, t.TickReductionStartSize, t.TickReductionIntervalSize), cpp_1.FKuroGameBudgetAllocatorInterface.SetGroupConfig(e.GroupName, e)
  }
  static Lwa(t, e = !0) {
    t = t.CreateBossEntityConfig();
    return e && ((e = new UE.GameBudgetAllocatorGroupConfig).GroupName = FNameUtil_1.FNameUtil.GetDynamicFName("BossEntity"), e.SignificanceGroup = 3, e.TickPriority = Boss_PRIORITY, this.Twa = new GameBudgetAllocatorConfig_1.TsGameBudgetGroupConfigCache(e), this.wvr(e, t)), t
  }
  static Tvr(t, e = !0) {
    t = t.CreateCharacterEntityConfig();
    return e && ((e = new UE.GameBudgetAllocatorGroupConfig).GroupName = FNameUtil_1.FNameUtil.GetDynamicFName("CharacterEntity"), e.SignificanceGroup = 2, e.TickPriority = ROLE_PRIORITY, this.gvr = new GameBudgetAllocatorConfig_1.TsGameBudgetGroupConfigCache(e), this.wvr(e, t)), t
  }
  static $Pa(t, e = !0) {
    t = t.CreateNormalNpcEntityConfig();
    return e && ((e = new UE.GameBudgetAllocatorGroupConfig).GroupName = FNameUtil_1.FNameUtil.GetDynamicFName("NormalNpcEntity"), e.SignificanceGroup = 2, e.TickPriority = NPC_PRIORITY, this.QPa = new GameBudgetAllocatorConfig_1.TsGameBudgetGroupConfigCache(e), this.wvr(e, t)), t
  }
  static XPa(t, e = !0) {
    t = t.CreateSimpleNpcEntityConfig();
    return e && ((e = new UE.GameBudgetAllocatorGroupConfig).GroupName = FNameUtil_1.FNameUtil.GetDynamicFName("SimpleNpcEntity"), e.SignificanceGroup = 1, e.TickPriority = SIMPLE_NPC_PRIORITY, e.DisableActorTickStrategy = 1, e.DisableActorTickDistance = 3e3, this.KPa = new GameBudgetAllocatorConfig_1.TsGameBudgetGroupConfigCache(e), this.wvr(e, t)), t
  }
  static Ivr(t) {
    var t = t.CreateNormalEntityConfig(),
      e = new UE.GameBudgetAllocatorGroupConfig;
    e.GroupName = FNameUtil_1.FNameUtil.GetDynamicFName("NormalEntity"), e.SignificanceGroup = 1, e.TickPriority = OTHER_PRIORITY, this.Cvr = new GameBudgetAllocatorConfig_1.TsGameBudgetGroupConfigCache(e), this.wvr(e, t)
  }
  static Lvr(t) {
    var t = t.CreateFightEffectConfig(),
      e = new UE.GameBudgetAllocatorGroupConfig,
      i = (e.GroupName = FNameUtil_1.FNameUtil.GetDynamicFName("FightEffectGroup"), e.SignificanceGroup = 4, e.TickPriority = FIGHT_EFFECT_PRIPRITY, e.DisableActorTickStrategy = 1, e.DisableActorTickDistance = exports.EFFECT_ENABLE_RANGE, this.fvr = new GameBudgetAllocatorConfig_1.TsGameBudgetGroupConfigCache(e), (0, puerts_1.$ref)(e));
    cpp_1.FKuroGameBudgetAllocatorInterface.SetDefaultTickIntervalDetailConfig(i, t.MaxInterval, t.TickReductionStartSize, t.TickReductionIntervalSize), cpp_1.FKuroGameBudgetAllocatorInterface.SetGroupConfig(e.GroupName, e)
  }
  static Dvr(t) {
    var t = t.CreateEffectConfig(),
      e = new UE.GameBudgetAllocatorGroupConfig;
    e.GroupName = FNameUtil_1.FNameUtil.GetDynamicFName("EffectGroup"), e.SignificanceGroup = 2, e.TickPriority = OTHER_PRIORITY, e.DisableActorTickStrategy = 1, e.DisableActorTickDistance = exports.EFFECT_ENABLE_RANGE, this.pvr = new GameBudgetAllocatorConfig_1.TsGameBudgetGroupConfigCache(e), this.wvr(e, t)
  }
  static DJs(t) {
    var t = t.CreateEffectImportanceConfig(),
      e = new UE.GameBudgetAllocatorGroupConfig;
    e.GroupName = FNameUtil_1.FNameUtil.GetDynamicFName("EffectImportanceGroup"), e.SignificanceGroup = 3, e.TickPriority = OTHER_PRIORITY, e.DisableActorTickStrategy = 1, e.DisableActorTickDistance = EFFECT_IMPORTANCE_ENABLE_MAX_RANGE, this.AJs = new GameBudgetAllocatorConfig_1.TsGameBudgetGroupConfigCache(e), this.wvr(e, t)
  }
  static zia(t) {
    var t = t.CreateStabilizeLowEntityConfig(),
      e = new UE.GameBudgetAllocatorGroupConfig;
    e.GroupName = FNameUtil_1.FNameUtil.GetDynamicFName("CustomStabilizeLow"), e.SignificanceGroup = 1, e.TickPriority = OTHER_PRIORITY, e.DisableActorTickStrategy = 0, this.Jia = new GameBudgetAllocatorConfig_1.TsGameBudgetGroupConfigCache(e), this.wvr(e, t)
  }
  static eWa(t) {
    var t = t.CreateAlwaysTickHotfixConfig(),
      e = new UE.GameBudgetAllocatorGroupConfig;
    e.GroupName = FNameUtil_1.FNameUtil.GetDynamicFName("AlwaysTickHotFix"), e.SignificanceGroup = 3, e.TickPriority = OTHER_PRIORITY, e.DisableActorTickStrategy = 0, this.Zja = new GameBudgetAllocatorConfig_1.TsGameBudgetGroupConfigCache(e), this.wvr(e, t)
  }
  static qmu(t) {
    var t = t.CreateMoveSceneItemEntityConfig(),
      e = new UE.GameBudgetAllocatorGroupConfig;
    e.GroupName = FNameUtil_1.FNameUtil.GetDynamicFName("MoveSceneItemEntity"), e.SignificanceGroup = 1, e.TickPriority = PRE_PLAYER_MOVE_TICK_PRIORITY, this.Omu = new GameBudgetAllocatorConfig_1.TsGameBudgetGroupConfigCache(e), this.wvr(e, t)
  }
  static Rvr(t) {
    var t = t.CreatePlayerAlwaysTickConfig(),
      e = new UE.GameBudgetAllocatorGroupConfig,
      i = (e.GroupName = FNameUtil_1.FNameUtil.GetDynamicFName("PlayerAlwaysTickGroup"), e.SignificanceGroup = 4, e.TickPriority = PLAYER_ALWAYS_TICK_PRIORITY, this.Mvr = new GameBudgetAllocatorConfig_1.TsGameBudgetGroupConfigCache(e), (0, puerts_1.$ref)(e));
    cpp_1.FKuroGameBudgetAllocatorInterface.SetDefaultTickIntervalDetailConfig(i, t.MaxInterval, t.TickReductionStartSize, t.TickReductionIntervalSize), cpp_1.FKuroGameBudgetAllocatorInterface.SetGroupConfig(e.GroupName, e)
  }
  static Uvr(t) {
    var t = t.CreateAlwaysTickConfig(),
      e = new UE.GameBudgetAllocatorGroupConfig,
      i = (e.GroupName = FNameUtil_1.FNameUtil.GetDynamicFName("AlwaysTickGroup"), e.SignificanceGroup = 4, e.TickPriority = ALWAYS_TICK_PRIORITY, this.vvr = new GameBudgetAllocatorConfig_1.TsGameBudgetGroupConfigCache(e), (0, puerts_1.$ref)(e));
    cpp_1.FKuroGameBudgetAllocatorInterface.SetDefaultTickIntervalDetailConfig(i, t.MaxInterval, t.TickReductionStartSize, t.TickReductionIntervalSize), cpp_1.FKuroGameBudgetAllocatorInterface.SetGroupConfig(e.GroupName, e)
  }
  static Avr(t) {
    var t = t.CreateCameraAlwaysTickConfig(),
      e = new UE.GameBudgetAllocatorGroupConfig,
      i = (e.GroupName = FNameUtil_1.FNameUtil.GetDynamicFName("CameraAlwaysTickGroup"), e.SignificanceGroup = 4, e.TickPriority = CAMERA_PRIORITY, this.Svr = new GameBudgetAllocatorConfig_1.TsGameBudgetGroupConfigCache(e), (0, puerts_1.$ref)(e));
    cpp_1.FKuroGameBudgetAllocatorInterface.SetDefaultTickIntervalDetailConfig(i, t.MaxInterval, t.TickReductionStartSize, t.TickReductionIntervalSize), cpp_1.FKuroGameBudgetAllocatorInterface.SetGroupConfig(e.GroupName, e)
  }
  static xvr(t) {
    var t = t.CreateHUDTickConfig(),
      e = new UE.GameBudgetAllocatorGroupConfig,
      i = (e.GroupName = FNameUtil_1.FNameUtil.GetDynamicFName("HUDGroup"), e.SignificanceGroup = 2, e.TickPriority = HUD_PRIORITY, e.DisableActorTickStrategy = 1, e.DisableActorTickDistance = HUD_ENABLE_RANGE, this.yvr = new GameBudgetAllocatorConfig_1.TsGameBudgetGroupConfigCache(e), (0, puerts_1.$ref)(e));
    cpp_1.FKuroGameBudgetAllocatorInterface.SetDefaultTickIntervalDetailConfig(i, t.MaxInterval, t.TickReductionStartSize, t.TickReductionIntervalSize), cpp_1.FKuroGameBudgetAllocatorInterface.SetGroupConfig(e.GroupName, e)
  }
  static fka(t) {
    var t = t.CreateBattleHeadViewConfig(),
      e = new UE.GameBudgetAllocatorGroupConfig,
      i = (e.GroupName = FNameUtil_1.FNameUtil.GetDynamicFName("BattleHeadViewGroup"), e.SignificanceGroup = 2, e.TickPriority = BATTLE_HEAD_STATE_VIEW_PRIORITY, e.DisableActorTickStrategy = 1, e.DisableActorTickDistance = BATTLE_HEAD_STATE_VIEW_RANGE, this.pka = new GameBudgetAllocatorConfig_1.TsGameBudgetGroupConfigCache(e), (0, puerts_1.$ref)(e));
    cpp_1.FKuroGameBudgetAllocatorInterface.SetDefaultTickIntervalDetailConfig(i, t.MaxInterval, t.TickReductionStartSize, t.TickReductionIntervalSize), cpp_1.FKuroGameBudgetAllocatorInterface.SetGroupConfig(e.GroupName, e)
  }
  static CreateCharacterRenderConfig(t) {
    var t = t.CreateCharacterRenderConfig(),
      e = new UE.GameBudgetAllocatorGroupConfig;
    e.GroupName = FNameUtil_1.FNameUtil.GetDynamicFName("CharacterRenderGroup"), e.SignificanceGroup = 3, e.TickPriority = Boss_PRIORITY, e.DisableActorTickStrategy = 1, e.DisableActorTickDistance = CHARCTER_RENDER_ENABLE_MAX_RANGE, this.n3a = new GameBudgetAllocatorConfig_1.TsGameBudgetGroupConfigCache(e), this.wvr(e, t)
  }
  static a01(t) {
    var t = t.CreateCollisionPlantConfig(),
      e = new UE.GameBudgetAllocatorGroupConfig;
    e.GroupName = FNameUtil_1.FNameUtil.GetDynamicFName("CollisionPlant"), e.SignificanceGroup = 1, e.TickPriority = OTHER_PRIORITY, e.DisableActorTickStrategy = 1, e.DisableActorTickDistance = COLLISION_PLANT_RANGE, this.s01 = new GameBudgetAllocatorConfig_1.TsGameBudgetGroupConfigCache(e), this.wvr(e, t)
  }
  static GetEffectDynamicGroup(t) {
    var e, i, a, r, o, _, n, s, c, g, l, C;
    return t >= exports.EFFECT_IMPORTANCE_ENABLE_RANGE ? this.TsEffectInportanceGroupConfig : this.TsEffectDynamicGroupConfigMap.get(t) || (0, l = (t - (g = .1 * t)) / 179, o = (t - (e = .2 * t)) / 59, _ = (t - (C = .05 * t)) / 299, n = (t - (i = .1 * t)) / 299, s = (t - (a = .02 * t)) / 599, c = (t - (r = .1 * t)) / 299, g = {
      Default: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(0, 0, 180, g, l),
      Normal_Render: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(0, 0, 60, e, o),
      Normal_NotRendered: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(0, 1, 300, C, _),
      Normal_Fighting: void 0,
      Fighting_Rendered: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(1, 0, 300, i, n),
      Fighting_NotRendered: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(1, 1, 600, a, s),
      Fighting_Fighting: void 0,
      Cutscene_Rendered: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(2, 0, 5, e, o),
      Cutscene_NotRendered: new GameBudgetAllocatorConfig_1.TsGameBudgetAllocatorTickIntervalDetailConfig(2, 1, 300, r, c)
    }, (l = new UE.GameBudgetAllocatorGroupConfig).GroupName = FNameUtil_1.FNameUtil.GetDynamicFName("EffectGroup_" + t), l.SignificanceGroup = 2, l.TickPriority = OTHER_PRIORITY, l.DisableActorTickStrategy = 1, l.DisableActorTickDistance = t, C = new GameBudgetAllocatorConfig_1.TsGameBudgetGroupConfigCache(l), this.TsEffectDynamicGroupConfigMap.set(t, C), this.wvr(l, g), C)
  }
}(exports.GameBudgetAllocatorConfigCreator = GameBudgetAllocatorConfigCreator).TsEffectDynamicGroupConfigMap = new Map;
//# sourceMappingURL=GameBudgetAllocatorConfigCreator.js.map