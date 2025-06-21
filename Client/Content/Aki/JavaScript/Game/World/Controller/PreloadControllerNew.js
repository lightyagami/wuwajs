"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PreloadControllerNew = void 0;
const puerts_1 = require("puerts"),
  UE = require("ue"),
  CustomPromise_1 = require("../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../Core/Common/Log"),
  Stats_1 = require("../../../Core/Common/Stats"),
  CharacterPreloadById_1 = require("../../../Core/Define/ConfigQuery/CharacterPreloadById"),
  GameplayCueById_1 = require("../../../Core/Define/ConfigQuery/GameplayCueById"),
  PlotAudioById_1 = require("../../../Core/Define/ConfigQuery/PlotAudioById"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
  StatSeconds_1 = require("../../../Core/Performance/StatSeconds"),
  ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
  DataTableUtil_1 = require("../../../Core/Utils/DataTableUtil"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  StringUtils_1 = require("../../../Core/Utils/StringUtils"),
  BaseConfigController_1 = require("../../../Launcher/BaseConfig/BaseConfigController"),
  IComponent_1 = require("../../../UniverseEditor/Interface/IComponent"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  PublicUtil_1 = require("../../Common/PublicUtil"),
  InputModel_1 = require("../../Input/InputModel"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  AutoAttachDefine_1 = require("../../Module/AutoAttach/AutoAttachDefine"),
  NpcIconDefine_1 = require("../../Module/NPC/NpcIconDefine"),
  PlotAudioModel_1 = require("../../Module/Plot/PlotAudioModel"),
  RoleDefine_1 = require("../../Module/RoleUi/RoleDefine"),
  CharacterGlideComponent_1 = require("../../NewWorld/Character/Common/Component/CharacterGlideComponent"),
  CharacterSplineMoveComponent_1 = require("../../NewWorld/Character/Common/Component/CharacterSplineMoveComponent"),
  PreloadDefine_1 = require("../../Preload/PreloadDefine"),
  RenderConfig_1 = require("../../Render/Config/RenderConfig"),
  GameModePromise_1 = require("../Define/GameModePromise"),
  PreloadConstants_1 = require("./PreloadConstants"),
  commonMajorPaths = ["/Game/Aki/Data/Fight/CDT_CommonBulletData.CDT_CommonBulletData", "/Game/Aki/Data/Fight/DT_CommonHitEffect.DT_CommonHitEffect", "/Game/Aki/Character/Vision/DT_Vision.DT_Vision", "/Game/Aki/Data/Fight/DT_Common_Role_SkillInfo.DT_Common_Role_SkillInfo", "/Game/Aki/Data/Fight/DT_Common_Monster_SkillInfo.DT_Common_Monster_SkillInfo", "/Game/Aki/Data/Fight/DT_Common_Vision_SkillInfo.DT_Common_Vision_SkillInfo", "/Game/Aki/Data/Fight/DT_CharacterFightInfo.DT_CharacterFightInfo", "/Game/Aki/Data/Fight/DT_CaughtInfo.DT_CaughtInfo", "/Game/Aki/Data/Fight/DA_DefaultBulletConfig.DA_DefaultBulletConfig", "/Game/Aki/Data/Fight/DT_QteTag.DT_QteTag"],
  commonOtherPaths = ["/Game/Aki/UI/UIResources/UiFight/Atlas/SP_FightPutong.SP_FightPutong", "/Game/Aki/Character/BaseCharacter/Abilities/GA/GA_Base.GA_Base_C", "/Game/Aki/Effect/UI/Niagaras/Common/NS_Fx_LGUI_FightQTE_001.NS_Fx_LGUI_FightQTE_001", "/Game/Aki/Effect/UI/Niagaras/Common/NS_Fx_LGUI_FightQTE_002.NS_Fx_LGUI_FightQTE_002", "/Game/Aki/Effect/MaterialController/Common/DA_Fx_Character_ChangeRole.DA_Fx_Character_ChangeRole", "/Game/Aki/Effect/BluePrint/BP_FX_Common/BP_Fx_Scanning.BP_Fx_Scanning_C", "/Game/Aki/Effect/BluePrint/BP_FX_Common/BP_Fx_Control_Obj.BP_Fx_Control_Obj_C", "/Game/Aki/Data/Fight/BulletCampAsset/DT_AllBulletCampAsset.DT_AllBulletCampAsset", "/Game/Aki/Data/Fight/BulletDataAsset/DT_AllBulletLogicTypeNew.DT_AllBulletLogicTypeNew", "/Game/Aki/Data/Fight/CommonGB/DT_AllKuroBpDataGroup.DT_AllKuroBpDataGroup", "/Game/Aki/Effect/Niagara/NI_Common/NS_Fx_Control_Obj_Beam.NS_Fx_Control_Obj_Beam", "/Game/Aki/Effect/MaterialController/Common/DA_Fx_HuluWarning.DA_Fx_HuluWarning", "/Game/Aki/Data/Fight/UI/DT_PanelQte.DT_PanelQte", "/Game/Aki/Data/Qte/DT_CommonQte.DT_CommonQte", "/Game/Aki/Data/Qte/DT_BattleQte.DT_BattleQte", "/Game/Aki/UI/Framework/PredefColor/DT_PredefColor.DT_PredefColor", "/Game/Aki/Effect/MaterialController/Common/DA_Fx_UIChangeRole.DA_Fx_UIChangeRole", "/Game/Aki/TypeScript/Game/Render/Scene/Item/SceneInteractionActor.SceneInteractionActor_C", RenderConfig_1.RenderConfig.CharMaterialContainerDataPath, RenderConfig_1.RenderConfig.EmptyMaterialPath, RoleDefine_1.UI_ABP_PATH, NpcIconDefine_1.HEADSTATE_SCALE_CURVE_PATH, NpcIconDefine_1.DIALOG_SCALE_CURVE_PATH, AutoAttachDefine_1.INERTIA_CURVE_PATH, AutoAttachDefine_1.VELOCITY_CURVE_PATH, AutoAttachDefine_1.BOUNDARY_CURVE_PATH, PreloadConstants_1.ACC_LERP_CURVE_PATH, PreloadConstants_1.SWIM_ACCELERATOR_CURVE_PATH, PreloadConstants_1.SWIM_ROTATOR_CURVE_PATH, PreloadConstants_1.BASE_MOVE_INHERIT_CURVE_PATH, CharacterSplineMoveComponent_1.CharacterSplineMoveComponent.DaPath, PreloadConstants_1.ANGLE_TO_STEP_FREQUENCY_CURVE_PATH, PreloadConstants_1.ANGLE_TO_STEP_LENGTH_CURVE_PATH, PreloadConstants_1.BATTLE_SETTLEMENT_TIME_SCALE_CURVE_PATH, CharacterGlideComponent_1.SOAR_CONFIG_BASE_PATH, CharacterGlideComponent_1.SOAR_CAMERA_SHAKE_PATH, CharacterGlideComponent_1.SOAR_CAMERA_SHAKE_CURVE_PATH, CharacterGlideComponent_1.SOAR_AUTO_FLIGHT_PATH, InputModel_1.INPUT_COMMAND_TRANSFORM_DT_PATH],
  commonEffectPaths = ["/Game/Aki/Data/Camera/DA_FightCameraConfig.DA_FightCameraConfig", "/Game/Aki/Data/Fight/BulletDataAsset/DA_CommonBullet.DA_CommonBullet", "/Game/Aki/Effect/EffectGroup/Common/DA_Fx_Group_WeaponEnd.DA_Fx_Group_WeaponEnd", "/Game/Aki/Effect/EffectGroup/R2T1JinxiMd20011/DA_Fx_Group_R1s_Shoudao.DA_Fx_Group_R1s_Shoudao", "/Game/Aki/Effect/EffectGroup/Common/DA_Fx_Group_ChangeRole.DA_Fx_Group_ChangeRole", "/Game/Aki/Effect/EffectGroup/Common/DA_Fx_Group_ChangeRoleStart.DA_Fx_Group_ChangeRoleStart", "/Game/Aki/Effect/EffectGroup/Common/DA_Fx_Group_Control_Obj_Hand.DA_Fx_Group_Control_Obj_Hand", "/Game/Aki/Effect/DataAsset/Niagara/BigWorld/DA_Fx_Animal_Vanish.DA_Fx_Animal_Vanish", "/Game/Aki/Effect/EffectGroup/Common/DA_Fx_Group_XieZou_Qidong00.DA_Fx_Group_XieZou_Qidong00", "/Game/Aki/Effect/EffectGroup/Common/DA_Fx_Group_XieZou_Gaowen00.DA_Fx_Group_XieZou_Gaowen00", "/Game/Aki/Effect/MaterialController/Common/DA_Fx_HuluStart.DA_Fx_HuluStart", "/Game/Aki/Effect/MaterialController/Common/DA_Fx_TimeFreeze_LimitDodge.DA_Fx_TimeFreeze_LimitDodge", "/Game/Aki/Effect/EffectGroup/Common/DA_Fx_Group_Press_Smoke.DA_Fx_Group_Press_Smoke", "/Game/Aki/Effect/EffectGroup/Common/DA_Fx_Group_Hook_Miaodian_Lock.DA_Fx_Group_Hook_Miaodian_Lock", "/Game/Aki/Effect/EffectGroup/Common/DA_Fx_Group_Hook_Miaodian_LockDown.DA_Fx_Group_Hook_Miaodian_LockDown", "/Game/Aki/Effect/EffectGroup/Common/DA_Fx_Group_ChangeRole_Play.DA_Fx_Group_ChangeRole_Play"],
  iosAuditAppIgnoreAssets = new Set(["/Game/Aki/Sequence/Manager/DT_SequenceMember"]),
  NEED_PRELOAD_DISTANCE = 4e6,
  CHARACTER_PREFIX_PATH = "/Game/Aki/Character/",
  animSequenceBasesRef = (0, puerts_1.$ref)(UE.NewArray(UE.AnimSequenceBase)),
  animNotifyEventsRef = (0, puerts_1.$ref)(UE.NewArray(UE.AnimNotifyEvent)),
  animationAssetSetRef = (0, puerts_1.$ref)(UE.NewSet(UE.AnimationAsset)),
  animBuffList = new Array,
  COMMON_STATE_MACHINE = "SM_Common";
class PreloadControllerNew extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return !!this.Spr()
  }
  static Spr() {
    var o = ModelManager_1.ModelManager.PreloadModelNew;
    if (PublicUtil_1.PublicUtil.UseDbConfig()) {
      var e = o.GetCommonSkillPreloadData();
      if (!e?.length) return !1;
      for (const n of e) {
        var t = new PreloadDefine_1.AssetElement(void 0);
        this.ypr(n, t), o.AddCommonSkill(n.Id, n.HasMontagePath, t)
      }
    } else {
      var r = UE.KuroStaticLibrary.GetFilesRecursive(o.CommonSkillJsonExportPath, "*", !0, !1);
      for (let e = 0; e < r.Num(); ++e) {
        var a = r.Get(e),
          i = (0, puerts_1.$ref)("");
        if (UE.KuroStaticLibrary.LoadFileToString(i, a), !(i = (0, puerts_1.$unref)(i))?.length) return Log_1.Log.CheckError() && Log_1.Log.Error("Preload", 4, "[预加载] 加载文件失败", ["path", a]), !1;
        i = JSON.parse(i);
        if (!i) return Log_1.Log.CheckError() && Log_1.Log.Error("Preload", 4, "[预加载] 序列化skillAssetRecord失败", ["path", a]), !1;
        a = new PreloadDefine_1.AssetElement(void 0);
        this.ypr(i.AssetRecord, a), o.AddCommonSkill(i.SkillId, i.HasMontagePath, a)
      }
    }
    return !0
  }
  static async DoPreload(e) {
    let o = !1;
    var t = ModelManager_1.ModelManager.GameModeModel,
      e = (t.PreloadCommonProfiler.Restart(), await this.Tpr(e)),
      t = (t.PreloadCommonProfiler.Stop(), e || (o = !0), ModelManager_1.ModelManager.GameModeModel.PreloadEntitiesProfiler.Restart(), await this.Wfr(ModelManager_1.ModelManager.GameModeModel.PreloadEntitiesProfiler));
    return ModelManager_1.ModelManager.GameModeModel.PreloadEntitiesProfiler.Stop(), !(o = t ? o : !0)
  }
  static async Tpr(e) {
    let o = !1;
    var t = await this.Kfr(),
      t = (t || (o = !0), ModelManager_1.ModelManager.CreatureModel.EnableEntityLog && Log_1.Log.CheckInfo() && Log_1.Log.Info("Preload", 4, "[预加载] 预加载公共主要资源结果", ["Success", t]), await this.Lpr());
    return t || (o = !0), ModelManager_1.ModelManager.CreatureModel.EnableEntityLog && Log_1.Log.CheckInfo() && Log_1.Log.Info("Preload", 4, "[预加载] 预加载公共次要资源结果", ["Success", t]), e(o), !0
  }
  static async Kfr() {
    var e = ModelManager_1.ModelManager.PreloadModelNew;
    for (const t of commonMajorPaths) BaseConfigController_1.BaseConfigController.GetIosAuditFirstDownloadTipWithSkip() && iosAuditAppIgnoreAssets.has(t) || e.CommonAssetElement.AddOther(t);
    for (const r of DataTableUtil_1.dataTablePaths.values()) BaseConfigController_1.BaseConfigController.GetIosAuditFirstDownloadTipWithSkip() && iosAuditAppIgnoreAssets.has(r) || e.CommonAssetElement.AddOther(r);
    var o = new GameModePromise_1.GameModePromise;
    return this.LoadAssetAsync(e.CommonAssetElement, 101, !0, o), o.Promise
  }
  static async Lpr() {
    var e = ModelManager_1.ModelManager.PreloadModelNew;
    for (const t of commonEffectPaths) e.CommonAssetElement.AddEffect(t);
    for (const r of commonOtherPaths) e.CommonAssetElement.AddOther(r);
    this.Dpr(e.CommonAssetElement, COMMON_STATE_MACHINE);
    var o = new GameModePromise_1.GameModePromise;
    return this.LoadAssetAsync(e.CommonAssetElement, 101, !0, o), o.Promise
  }
  static async Wfr(e) {
    const o = ModelManager_1.ModelManager.PreloadModelNew;
    var t = ModelManager_1.ModelManager.CreatureModel.GetAllEntities();
    if (0 === t.length) return !1;
    var r = Vector_1.Vector.Create(ModelManager_1.ModelManager.GameModeModel.BornLocation),
      a = Vector_1.Vector.Create(),
      i = new Array;
    for (const f of t) {
      var n = f.Entity.GetComponent(0);
      f.IsInit || n.GetLoading() || n.GetRemoveState() || n.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Custom || n.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_PlayerEntity || (n.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Player || (n = n.GetLocation(), a.X = n.X, a.Y = n.Y, a.Z = n.Z, Vector_1.Vector.DistSquared(r, a) <= NEED_PRELOAD_DISTANCE)) && (i.push(f), o.AddNeedWaitEntity(f.Id))
    }
    let l = i.length;
    if (ModelManager_1.ModelManager.CreatureModel.EnableEntityLog && Log_1.Log.CheckInfo() && Log_1.Log.Info("Preload", 4, "[预加载] 批量预加载实体:开始", ["当前实体总数", t.length], ["需要预加载的实体个数", l]), 0 === l) return Log_1.Log.CheckError() && Log_1.Log.Error("Preload", 4, "[预加载] 需要预加载的实体数量为0"), !1;
    var _, s = new Array;
    for (const u of i) {
      const c = u.Entity.GetComponent(0);
      u.IsInit || c.GetLoading() || (ControllerHolder_1.ControllerHolder.CreatureController.CheckEnableEntityLog(u) && Log_1.Log.CheckInfo() && Log_1.Log.Info("Preload", 4, "[预加载] 预加载单个实体:开始", ["CreatureDataId", c.GetCreatureDataId()], ["PbDataId", c.GetPbDataId()], ["Reason", "PreloadController.PreloadEntities"], ["Count", l]), _ = this.PreloadEntity(u, e, e => {
        l--, ControllerHolder_1.ControllerHolder.CreatureController.CheckEnableEntityLog(u) && Log_1.Log.CheckInfo() && Log_1.Log.Info("Preload", 4, "[预加载] 预加载实体:结束", ["CreatureDataId", c.GetCreatureDataId()], ["PbDataId", c.GetPbDataId()], ["预加载结果", e], ["调用代码位置", "PreloadController.PreloadEntities"], ["Count", l]), o.RemoveNeedWaitEntity(u.Id)
      }), s.push(_))
    }
    let d = !0;
    for (const m of await Promise.all(s)) 2 === m && (d = !1);
    return ModelManager_1.ModelManager.CreatureModel.EnableEntityLog && Log_1.Log.CheckInfo() && Log_1.Log.Info("Preload", 4, "[预加载] 批量预加载实体:结束", ["预加载结果", d]), d
  }
  static async PreloadEntity(e, o, t) {
    const r = ModelManager_1.ModelManager.PreloadModelNew;
    var a = new CustomPromise_1.CustomPromise;
    const i = e.Entity.GetComponent(0);
    if (i.GetRemoveState()) return t?.(4), 4;
    if (e.IsInit) return Log_1.Log.CheckError() && Log_1.Log.Error("Preload", 4, "[预加载] 实体重复预加载，因为这个实体handle.IsInit为true"), t?.(2), 2;
    if (i.GetPreloadFinished()) return Log_1.Log.CheckError() && Log_1.Log.Error("Preload", 4, "[预加载] 实体重复预加载，creatureDataComponent.GetPreloadFinished()为true"), t?.(2), 2;
    var n = StatSeconds_1.StatSecondsAccumulator.Create(`CreatureDataId:${i.GetCreatureDataId()}, PbDataId:` + i.GetPbDataId());
    if (n.Start(), i.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Custom) return i.SetPreloadFinished(!0), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PreloadEntityFinished, e), t?.(3), n.Stop(), 3;
    let l = void 0,
      _ = void 0,
      s = void 0,
      d = void 0,
      f = void 0,
      u = (o && (l = o.CreateChild(`预加载实体, CreatureDataId:${i.GetCreatureDataId()}, PbDataId:` + i.GetPbDataId(), !0), _ = l.CreateChild("预加载实体主要资源", !0), s = l.CreateChild("预加载技能资源", !0), d = l.CreateChild("预加载子弹资源", !0), f = l.CreateChild("预加载实体固有资源", !0)), l?.Start(), r.GetEntityAssetElement(i.GetCreatureDataId()));
    if (u) return Log_1.Log.CheckError() && Log_1.Log.Error("Preload", 4, "[预加载] 实体重复预加载"), t?.(2), l?.Stop(), n.Stop(), 2;
    (u = new PreloadDefine_1.EntityAssetElement(e)).LoadState = 0, u.Promise = a.Promise, u.AddCallback(t), u.MainAsset.AddObjectCallback = (e, o) => {
      r.HoldPreloadObject.AddEntityAsset(i.GetCreatureDataId(), e)
    };
    o = i.GetModelConfig();
    if (o && o.特效替换表 && o.蒙太奇替换表 ? (0 < (c = o.特效替换表.ToAssetPathName()).length && (u?.MainAsset.SetupReplaceEffect(c), e.Entity.GetComponent(3).SetReplaceEffect(u?.MainAsset.ReplaceEffectMap)), 0 < (c = o.蒙太奇替换表.ToAssetPathName()).length && (u?.MainAsset.SetupReplaceMontage(c), e.Entity.GetComponent(3).SetReplaceMontage(u?.MainAsset.ReplaceMontageMap))) : o || Log_1.Log.CheckError() && Log_1.Log.Error("Preload", 4, "[预加载] ModelConfig为空", ["CreatureDataId", u?.CreatureDataComponent?.GetCreatureDataId()], ["EntityId", e.Entity?.Id], ["ModelId", i?.GetModelId()]), r.AddEntityAsset(i.GetCreatureDataId(), u), i.ModelBlueprintPath) {
      var c = i.GetPbEntityInitData();
      let e = void 0;
      if (c && (e = (0, IComponent_1.getComponent)(c.ComponentsData, "ModelComponent")), !this.Svl(u.MainAsset, e)) return t?.(2), l?.Stop(), n.Stop(), 2
    } else if (!this.CollectAssetByModelId(u, i.GetModelId())) return t?.(2), l?.Stop(), n.Stop(), 2;
    i.IsAutoRole() && (c = i.GetAutoRoleConfig()?.Id) && (t = CharacterPreloadById_1.configCharacterPreloadById.GetConfig(c)) && this.ypr(t, u.MainAsset), _?.Start();
    c = new GameModePromise_1.GameModePromise, ModelManager_1.ModelManager.PreloadModelNew?.EnablePreloadLog && Log_1.Log.CheckDebug() && Log_1.Log.Debug("Preload", 4, "[预加载] 开始预加载主要资源", ["CreatureDataId", u?.CreatureDataComponent?.GetCreatureDataId()], ["EntityId", e.Entity?.Id], ["ModelId", i?.GetModelId()], ["Dis", o?.描述], ["BP", o?.蓝图.ToAssetPathName()], ["\nAssets", "\n" + Array.from(u.MainAsset.AssetPathSet).map(e => "" + e).join("\n")]), this.LoadAssetAsync(u.MainAsset, u.LoadPriority, !1, c), t = await c.Promise;
    if (_?.Stop(), !t) return Log_1.Log.CheckError() && Log_1.Log.Error("Preload", 4, "[预加载] 预加载主要资源失败", ["CreatureDataId", u.CreatureDataComponent.GetCreatureDataId()]), u.DoCallback(2), l?.Stop(), n.Stop(), 2;
    if (!e?.Valid) return u.DoCallback(4), l?.Stop(), n.Stop(), 4;
    var o = e.Entity.GetComponent(219),
      m = (o && (o.InitPreload(u), o.IsEnableInitMorph()) && await o.InitMorph(), new Array);
    switch (f?.Start(), i.GetEntityConfigType()) {
      case Protocol_1.Aki.Protocol.rLs.F6n:
        var C = ModelManager_1.ModelManager.GameModeModel.MapId,
          g = i.GetPbDataId(),
          C = r.PbDataPreloadDataMap.get(C)?.get(g);
        if (C) this.ypr(C, u.MainAsset);
        else {
          g = i.GetTemplateId();
          if (!g) break;
          C = r.GetTemplatePreloadData(g);
          C && this.ypr(C, u.MainAsset)
        }
        break;
      case Protocol_1.Aki.Protocol.rLs.lTs:
        var g = i.GetPbEntityInitData()?.BlueprintType;
        g && (C = ModelManager_1.ModelManager.CreatureModel.GetEntityTemplate(g)) && (g = r.GetTemplatePreloadData(C.Id)) && this.ypr(g, u.MainAsset);
        break;
      case Protocol_1.Aki.Protocol.rLs.Proto_Template:
        C = i.GetPbDataId(), g = r.GetTemplatePreloadData(C);
        g && this.ypr(g, u.MainAsset)
    }
    c = new GameModePromise_1.GameModePromise;
    if (ModelManager_1.ModelManager.PreloadModelNew?.EnablePreloadLog && Log_1.Log.CheckDebug() && Log_1.Log.Debug("Preload", 4, "[预加载] 开始预加载主体固定资源资源", ["CreatureDataId", u.CreatureDataComponent.GetCreatureDataId()], ["EntityConfigType", i.GetEntityConfigType()], ["\nAssets", "\n" + Array.from(u.MainAsset.AssetPathSet).map(e => "" + e).join("\n")]), this.LoadAssetAsync(u.MainAsset, u.LoadPriority, !1, c, e => {
        e || Log_1.Log.CheckError() && Log_1.Log.Error("Preload", 4, "[预加载] 预加载固定资源失败", ["CreatureDataId", u.CreatureDataComponent.GetCreatureDataId()])
      }), m.push(c.Promise), f?.Stop(), s?.Start(), u.FightAssetManager.SkillAssetManager.SkillAssetMap.size) {
      let o = u.FightAssetManager.SkillAssetManager.SkillAssetMap.size;
      for (const [p, E] of u.FightAssetManager.SkillAssetManager.SkillAssetMap) {
        ModelManager_1.ModelManager.PreloadModelNew?.EnablePreloadLog && Log_1.Log.CheckDebug() && Log_1.Log.Debug("Preload", 4, "[预加载] 开始预加载技能资源", ["CreatureDataId", u.CreatureDataComponent.GetCreatureDataId()], ["SkillId", p], ["\nAssets", "\n" + Array.from(E.AssetPathSet).map(e => "" + e).join("\n")]);
        var P = new GameModePromise_1.GameModePromise;
        this.LoadAssetAsync(E, u.LoadPriority, !1, P, e => {
          --o || s?.Stop(), e || Log_1.Log.CheckError() && Log_1.Log.Error("Preload", 4, "[预加载] 预加载技能失败", ["CreatureDataId", u.CreatureDataComponent.GetCreatureDataId()], ["SkillId", p])
        }), m.push(P.Promise)
      }
    } else s?.Stop();
    d?.Start();
    const A = u.FightAssetManager.BulletAssetManager;
    let v = A.BulletAssetMap.size;
    if (v)
      for (const [L, I] of A.BulletAssetMap) {
        var D, h = new GameModePromise_1.GameModePromise;
        ModelManager_1.ModelManager.PreloadModelNew?.EnablePreloadLog && (D = A.IndexMapping.get(L), Log_1.Log.CheckDebug()) && Log_1.Log.Debug("Preload", 4, "[预加载] 开始预加载子弹资源", ["CreatureDataId", u.CreatureDataComponent.GetCreatureDataId()], ["bulletId", D], ["\nAssets", "\n" + Array.from(I.AssetPathSet).map(e => "" + e).join("\n")]), this.LoadAssetAsync(I, u.LoadPriority, !1, h, e => {
          --v || d?.Stop(), e || (e = A.IndexMapping.get(L), Log_1.Log.CheckError() && Log_1.Log.Error("Preload", 4, "[预加载] 预加载子弹失败", ["CreatureDataId", u.CreatureDataComponent.GetCreatureDataId()], ["BulletId", e]))
        }), m.push(h.Promise)
      } else d?.Stop();
    t = await Promise.all(m);
    if (!e.Valid) return u.DoCallback(4), l?.Stop(), n.Stop(), 4;
    if (i.GetRemoveState()) return u.DoCallback(4), l?.Stop(), n.Stop(), 4;
    let M = !0;
    for (const S of t) S || (M = !1);
    return M ? (a.SetResult(3), i.SetPreloadFinished(!0), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PreloadEntityFinished, e), u.DoCallback(3), l?.Stop(), n.Stop(), a.Promise) : (u.DoCallback(2), l?.Stop(), n.Stop(), 2)
  }
  static RemoveEntity(e) {
    var o, t = ModelManager_1.ModelManager.PreloadModelNew,
      r = t.GetEntityAssetElement(e);
    r && r.EntityHandle?.Valid && 4 !== r.LoadState && (r.LoadState = 4, (o = t.HoldPreloadObject.RemoveEntityAssets(r.EntityHandle.CreatureDataId)) || Log_1.Log.CheckError() && Log_1.Log.Error("Preload", 4, "HoldPreloadObject:RemoveEntityAssets Error", ["result", o], ["Key", r.EntityHandle.CreatureDataId]), r.Clear(), t.RemoveEntityAsset(e))
  }
  static async PreloadPlot(e, o, t, r = 0) {
    e = StringUtils_1.StringUtils.Format("{0},{1},{2}", e, o.toString(), t.toString()), o = ModelManager_1.ModelManager.PreloadModelNew.PlotAssetManager;
    return o.CheckCanLoad(e, r) ? this.DE1(e) : (o.AddPending(e, r), 1)
  }
  static RemovePlot(e, o, t) {
    var r = ModelManager_1.ModelManager.PreloadModelNew.PlotAssetManager,
      e = StringUtils_1.StringUtils.Format("{0},{1},{2}", e, o.toString(), t.toString());
    r.RemovePending(e), this.BE1(e), this.kE1()
  }
  static async DE1(e) {
    var o = e.split(","),
      o = ConfigManager_1.ConfigManager.FlowConfig.GetFlowStateActions(o[0], Number(o[1]), Number(o[2]));
    if (!o) return 3;
    var t = ModelManager_1.ModelManager.PreloadModelNew.PlotAssetManager.AddPlotAssetElement(e);
    if (!t) return 3;
    if (this.OE1(o, t), 0 === t.AssetPathSet.size) return 3;
    Log_1.Log.CheckDebug() && Log_1.Log.Debug("Preload", 26, "[预加载][Plot] 剧情预载资源 --- 开始", ["id", e], ["length", t.AssetPathSet.size]);
    o = new GameModePromise_1.GameModePromise, this.LoadAssetAsync(t, 101, !1, o), t = await o.Promise;
    return Log_1.Log.CheckDebug() && Log_1.Log.Debug("Preload", 26, "[预加载][Plot] 剧情预载资源 --- 结束", ["id", e], ["result", t]), t ? 3 : 2
  }
  static OE1(e, o) {
    var t, r = ModelManager_1.ModelManager.PreloadModelNew;
    let a = void 0,
      i = !1;
    for (const s of e)
      if ("SetPlotMode" === s.Name) {
        var n = s.Params;
        a = n.Mode
      } else if ("ShowTalk" === s.Name) {
      if ("LevelA" === a || "LevelB" === a) {
        var n = s.Params,
          l = n.SequenceDataAsset;
        if (l && (i = !0, r.PlotAssetManager.AddPath(o, l)), "LevelB" === a) {
          const d = [];
          n.TalkItems.forEach(e => {
            e.TidTalk && e.PlayVoice && d.push(e.TidTalk)
          });
          for (const f of d)
            if (!StringUtils_1.StringUtils.IsEmpty(f)) {
              var _ = PlotAudioById_1.configPlotAudioById.GetConfig(f);
              if (!_) return;
              _ = PlotAudioModel_1.PlotAudioModel.GetAudioMouthAnimName(_);
              r.PlotAssetManager.AddPath(o, _)
            }
        }
      }
    } else "PlaySequenceData" === s.Name && (l = s.Params.Path) && (i = !0, r.PlotAssetManager.AddPath(o, l));
    i && (e = ModelManager_1.ModelManager.SequenceModel.SeqMainCharacterModelConfig.网格体?.ToAssetPathName(), t = ModelManager_1.ModelManager.SequenceModel.SeqMainCharacterModelConfig.蓝图?.ToAssetPathName(), r.PlotAssetManager.AddPath(o, e), r.PlotAssetManager.AddPath(o, t))
  }
  static BE1(e) {
    var o = ModelManager_1.ModelManager.PreloadModelNew.PlotAssetManager.RemovePlotAssetElement(e);
    Log_1.Log.CheckDebug() && Log_1.Log.Debug("Preload", 26, "[预加载][Plot] 移除剧情预载资源", ["id", e], ["result", o])
  }
  static kE1() {
    var e = ModelManager_1.ModelManager.PreloadModelNew.PlotAssetManager.CheckAndGetPendingPreload();
    e && this.DE1(e.Id)
  }
  static LoadAssetAsync(o, e, t, r, a) {
    o.AddPromise(r), this.Apr(o, e, e => {
      a?.(e), o.SetPromiseResult(e)
    }, t)
  }
  static async PreLoadLevelEntityByPbDataIds(e) {
    if (!ModelManager_1.ModelManager.CreatureModel) return !1;
    if (e.length <= 0) return !1;
    var o, t = new Array;
    for (o of e) {
      o = Number(o);
      var r = this.Gj1(o, () => {});
      t.push(r)
    }
    let a = !0;
    for (const i of await Promise.all(t)) 2 === i && (a = !1);
    e = ModelManager_1.ModelManager.PreloadModelNew.HoldPreloadObject;
    return ModelManager_1.ModelManager.CreatureModel.EnableEntityLog && Log_1.Log.CheckInfo() && Log_1.Log.Info("Preload", 80, "[预加载] 根据pbDataIds批量预加载实体:结束", ["预加载结果", a], ["HoldObjectsMapCount", e?.EntityAssetMap.Num()]), a
  }
  static async Gj1(o, e) {
    var t = ModelManager_1.ModelManager.PreloadModelNew,
      r = new CustomPromise_1.CustomPromise,
      a = ModelManager_1.ModelManager.CreatureModel;
    if (!a) return 2;
    var a = a.GetCompleteEntityData(o),
      i = a?.ComponentsData;
    if (!i) return 2;
    var n = t.GetPbEntityAssetElement(o);
    if (n) return Log_1.Log.CheckWarn() && Log_1.Log.Warn("Preload", 80, "[预加载] pb实体重复预加载"), e?.(2), 2;
    (n = new PreloadDefine_1.PbEntityAssetElement(o)).LoadState = 0, n.Promise = r.Promise, n.AddCallback(e), t.AddPbEntityAsset(o, n);
    var i = (0, IComponent_1.getComponent)(i, "ModelComponent"),
      l = i?.ModelType;
    return i && !0 === i.Disabled && "ModelId" === l?.Type && this.CollectAssetByModelId(n, l.ModelId ?? 0) && this.Svl(n.MainAsset, i) ? (e?.(2), 2) : (l = new GameModePromise_1.GameModePromise, this.LoadAssetAsync(n.MainAsset, n.LoadPriority, !1, l), await l.Promise ? (i = n.MainAsset, e = ModelManager_1.ModelManager.GameModeModel.MapId, (l = t.PbDataPreloadDataMap.get(e)?.get(o)) ? this.ypr(l, i) : (e = a.BlueprintType) && (l = ModelManager_1.ModelManager.CreatureModel.GetEntityTemplate(e)) && (a = t.GetTemplatePreloadData(l.Id)) && this.ypr(a, i), e = new GameModePromise_1.GameModePromise, this.LoadAssetAsync(i, n.LoadPriority, !1, e, e => {
      e || Log_1.Log.CheckError() && Log_1.Log.Error("Preload", 80, "[预加载] 预加载固定资源失败", ["pbDataId", o])
    }), await e.Promise ? (r.SetResult(3), n.DoCallback(3), r.Promise) : (n.DoCallback(2), 2)) : (Log_1.Log.CheckError() && Log_1.Log.Error("Preload", 80, "[预加载] 预加载主要资源失败", ["pbDataId", o]), n.DoCallback(2), 2))
  }
  static ClearAllPbLevelEntityPb() {
    ModelManager_1.ModelManager.PreloadModelNew.ClearPbEntityAsset()
  }
  static LoadAsset(e) {
    if (!e.NeedLoadAssets.length) return !0;
    let o = !0;
    for (const i of e.NeedLoadAssets) {
      e.AddLoading(i);
      var t, r, a = ResourceSystem_1.ResourceSystem.Load(i, UE.Object);
      e.RemoveLoading(i), a?.IsValid() ? (e.AddObject(i, a), a.IsA(UE.AnimMontage.StaticClass()) && (t = e.GetEntityAssetElement()) && (t = t.Entity?.GetComponent(25)) && (r = UE.BlueprintPathsLibrary.GetBaseFilename(i), t.AddMontage(r, a, i))) : (o = !1, Log_1.Log.CheckError() && Log_1.Log.Error("Preload", 4, "[预加载] 同步加载资源失败", ["Path", i]))
    }
    return e.NeedLoadAssets.length = 0, e.NeedLoadAssetTypes.length = 0, o
  }
  static FlushSkill(e, o) {
    var t, e = e.FightAssetManager.SkillAssetManager.GetSkill(o);
    return e ? ([e, t] = this.Ppr(e), e && t ? (Log_1.Log.CheckError() && Log_1.Log.Error("Preload", 3, "[预加载] 技能资源预加载中，立马使用技能会变成同步加载", ["SkillId", o]), !1) : e) : (Log_1.Log.CheckError() && Log_1.Log.Error("Preload", 4, "[预加载] FlushSkill失败，技能不存在", ["SkillId", o]), !1)
  }
  static FlushBullet(e, o) {
    var t, e = e.FightAssetManager.BulletAssetManager.GetBullet(o);
    return e ? ([e, t] = this.Ppr(e), e && t && Log_1.Log.CheckError() && Log_1.Log.Error("Preload", 3, "[预加载] 子弹资源预加载中，立马使用子弹会变成同步加载", ["bulletId", o]), e) : (Log_1.Log.CheckError() && Log_1.Log.Error("Preload", 4, "[预加载] FlushBullet失败，子弹不存在", ["BulletId", o]), !1)
  }
  static Ppr(e) {
    if (!e.Loading()) return [!0, !1];
    let o = !0;
    for (const s of e.NeedLoadAssets) {
      e.AddLoading(s);
      var t, r, a = ResourceSystem_1.ResourceSystem.Load(s, UE.Object);
      e.RemoveLoading(s), a?.IsValid() ? (e.AddObject(s, a), a.IsA(UE.AnimMontage.StaticClass()) && (t = e.GetEntityAssetElement()) && (t = t.Entity?.GetComponent(25)) && (r = UE.BlueprintPathsLibrary.GetBaseFilename(s), t.AddMontage(r, a, s))) : (o = !1, Log_1.Log.CheckError() && Log_1.Log.Error("Preload", 4, "[预加载] 同步加载资源失败", ["Path", s]))
    }
    var i = 0 < e.LoadingSet.size;
    for (const d of e.LoadingSet) {
      var n, l, _ = ResourceSystem_1.ResourceSystem.Load(d, UE.Object);
      e.RemoveLoading(d), _?.IsValid() ? (e.AddObject(d, _), _.IsA(UE.AnimMontage.StaticClass()) && (n = e.GetEntityAssetElement()) && (n = n.Entity?.GetComponent(25)) && (l = UE.BlueprintPathsLibrary.GetBaseFilename(d), n.AddMontage(l, _, d))) : (o = !1, Log_1.Log.CheckError() && Log_1.Log.Error("Preload", 4, "[预加载] 同步加载资源失败", ["Path", d]))
    }
    return [o, i]
  }
  static Apr(n, l, _, s) {
    if (n.NeedLoadAssets.length) {
      let r = void 0;
      var e = n.GetEntityAssetElement();
      e && (r = e.Entity?.GetComponent(24));
      let a = n.NeedLoadAssets.length,
        i = 0;
      for (let e = 0; e < n.NeedLoadAssets.length; e++) {
        var o = n.NeedLoadAssets[e];
        const d = n.NeedLoadAssetTypes[e];
        n.AddLoading(o), this.xpr(o, l, (e, o, t) => {
          if (a--, n.RemoveLoading(o), e) {
            if (1 === d && t.IsA(UE.AnimMontage.StaticClass()) && r && (e = UE.BlueprintPathsLibrary.GetBaseFilename(o), r.AddMontage(e, t, o)), n.AddObject(o, t), s) switch (d) {
              case 2:
                this.upr(n, t);
                break;
              case 0:
                this.epr(n, t);
                break;
              case 1:
                t.IsA(UE.AnimMontage.StaticClass()) ? this.hpr(n, t, animBuffList) : t.IsA(UE.AnimSequenceBase.StaticClass()) && this.lpr(n, t, animBuffList);
                break;
              case 6:
                this.cpr(n, t)
            }
          } else i++;
          a || (s && n.NeedLoadCount() ? this.Apr(n, l, _, s) : _?.(0 === i))
        })
      }
      n.NeedLoadAssets.length = 0, n.NeedLoadAssetTypes.length = 0
    } else _?.(!0)
  }
  static epr(e, o) {
    var t, r;
    o && ((t = StatSeconds_1.StatSecondsAccumulator.Create("CollectAssetByActorClass")).Start(), r = (0, puerts_1.$ref)(void 0), UE.KuroStaticLibrary.GetCharacterAnimClass(o, r), o = (0, puerts_1.$unref)(r)) && (this.cpr(e, o), t.Stop())
  }
  static cpr(o, e) {
    if (e) {
      (0, puerts_1.$unref)(animationAssetSetRef).Empty(), UE.KuroStaticLibrary.GetAnimAssetsByAnimBlueprintClass(e, animationAssetSetRef);
      var t = (0, puerts_1.$unref)(animationAssetSetRef);
      if (0 !== t.Num()) {
        for (let e = 0; e < t.Num(); ++e) {
          var r = t.Get(e);
          r.IsA(UE.AnimSequence.StaticClass()) ? this.lpr(o, r, animBuffList) : r.IsA(UE.AnimMontage.StaticClass()) && this.hpr(o, r, animBuffList)
        }
        this._pr(o, animBuffList)
      }
    }
  }
  static lpr(o, e, t) {
    var r = StatSeconds_1.StatSecondsAccumulator.Create("CollectAssetByAnimSequence"),
      a = (r.Start(), (0, puerts_1.$unref)(animNotifyEventsRef).Empty(), UE.KuroStaticLibrary.GetAnimSequenceNotifies(e, animNotifyEventsRef), (0, puerts_1.$unref)(animNotifyEventsRef)),
      i = a.Num();
    if (0 !== i) {
      for (let e = 0; e < i; ++e) {
        var n = a.Get(e);
        this.Mpr(o, n, t)
      }
      r.Stop()
    }
  }
  static hpr(o, e, t) {
    var r = StatSeconds_1.StatSecondsAccumulator.Create("CollectAssetByAnimMontage");
    r.Start();
    (0, puerts_1.$unref)(animNotifyEventsRef).Empty(), UE.KuroStaticLibrary.GetAnimMontageNotifies(e, animNotifyEventsRef);
    var a = (0, puerts_1.$unref)(animNotifyEventsRef);
    if (0 < a.Num())
      for (let e = 0; e < a.Num(); ++e) {
        var i = a.Get(e);
        this.Mpr(o, i, t)
      }(0, puerts_1.$unref)(animSequenceBasesRef).Empty(), UE.KuroStaticLibrary.GetAnimSequencesByAnimMontage(e, animSequenceBasesRef);
    var n = (0, puerts_1.$unref)(animSequenceBasesRef);
    if (0 < n.Num())
      for (let e = 0; e < n.Num(); ++e) {
        var l = n.Get(e);
        this.lpr(o, l, t)
      }
    r.Stop()
  }
  static Mpr(e, o, t) {
    if (o.NotifyStateClass?.IsValid()) {
      if (o.NotifyStateClass.IsA(UE.AnimNotifyStateEffect_C.StaticClass())) return (r = o.NotifyStateClass.EffectDataAssetRef?.ToAssetPathName()) && 0 !== r.length && "None" !== r ? void e.AddEffect(r) : void 0;
      if (o.NotifyStateClass.IsA(UE.TsAnimNotifyStateAddBuff_C.StaticClass())) return (r = o.NotifyStateClass).BuffId ? void t.push(r.BuffId) : void 0
    }
    var r;
    if (o.Notify?.IsValid()) return o.Notify.IsA(UE.AnimNotifyEffect_C.StaticClass()) ? (r = o.Notify.EffectDataAssetRef?.ToAssetPathName()) && 0 !== r.length && "None" !== r ? void e.AddEffect(r) : void 0 : void(o.Notify.IsA(UE.TsAnimNotifyAddBuff_C.StaticClass()) && (e = o.Notify).BuffId && t.push(e.BuffId))
  }
  static _pr(e, o) {
    if (o?.length) {
      var t = StatSeconds_1.StatSecondsAccumulator.Create("CollectAssetByBuffIdList"),
        o = (t.Start(), ConfigManager_1.ConfigManager.BuffItemConfig.GetBuffConfigs(0, o));
      if (o)
        for (const r of o) this.fpr(e, r);
      t.Stop()
    }
  }
  static fpr(e, o) {
    if (o) {
      var t = StatSeconds_1.StatSecondsAccumulator.Create("CollectAssetByBuffInfo");
      if (t.Start(), o.GameplayCueIds)
        for (const a of o.GameplayCueIds) {
          var r = GameplayCueById_1.configGameplayCueById.GetConfig(a);
          if (r) {
            r.Path.length && e.AddEffect(r.Path);
            for (const i of r.Resources) i.length && e.AddEffect(i)
          }
        }
      t.Stop()
    }
  }
  static xpr(t, e, r) {
    t?.length ? ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.Object, (e, o) => {
      e?.IsValid() ? r?.(!0, t, e) : (Log_1.Log.CheckError() && Log_1.Log.Error("Preload", 4, "[预加载] 预加载资源失败", ["Path", o]), r?.(!1, t, void 0))
    }, e) : (Log_1.Log.CheckError() && Log_1.Log.Error("Preload", 4, "[预加载] path路径为空"), r?.(!1, t, void 0))
  }
  static CollectAssetByModelId(e, o, t) {
    var r = ModelManager_1.ModelManager.PreloadModelNew;
    if (PublicUtil_1.PublicUtil.UseDbConfig()) {
      var a = r.GetModelConfigPreloadData(o);
      if (!a) return !1;
      e.BlueprintClassPath = a.ActorClassPath;
      const i = t ?? e.MainAsset;
      this.ypr(a, i)
    } else {
      a = "" + r.ModelConfigJsonExportPath + o + ".json";
      if (UE.BlueprintPathsLibrary.FileExists(a)) {
        r = (0, puerts_1.$ref)("");
        if (UE.KuroStaticLibrary.LoadFileToString(r, a), !(o = (0, puerts_1.$unref)(r))?.length) return !1;
        r = JSON.parse(o);
        e.BlueprintClassPath = r.ActorClassPath;
        const i = t ?? e.MainAsset;
        this.ypr(r.AssetRecord, i)
      } else Log_1.Log.CheckError() && Log_1.Log.Error("World", 4, "[预加载] 不存在配置文件，重新导出ModelConfig对应的配置？", ["Path", a])
    }
    return !0
  }
  static Svl(e, o) {
    if (!o) return !1;
    var t = o.ModelType;
    switch (t.Type) {
      case "LevelPrefab":
        var r = IComponent_1.levelPrefabBpPathConfig[t.BlueprintPath];
        r?.length && e.AddOther(r), t.PrefabPath?.length && e.AddOther(t.PrefabPath);
        break;
      case "Npc":
        if (t.BlueprintPath.length && e.AddActorClass(t.BlueprintPath), t.Abp?.length && e.AddAnimationBlueprint(t.Abp), t.NpcModel) switch (t.NpcModel.Type) {
          case "Da":
            e.AddAsset(7, t.NpcModel.Da);
            break;
          case "Mesh":
            e.AddAsset(4, t.NpcModel.Mesh)
        }
    }
    return !0
  }
  static CollectAssetBySkillId(e, o, t) {
    PreloadControllerNew._j1.Start();
    var r, a = ModelManager_1.ModelManager.PreloadModelNew,
      i = a.GetCommonSkill(o);
    let n = !1,
      l = !1,
      _ = void 0;
    if (i) {
      n = !0, l = i[0];
      var s = i[1];
      _ = new PreloadDefine_1.AssetElement(e), e.FightAssetManager.SkillAssetManager.AddSkill(o, _);
      for (let e = 0; e < s.NeedLoadAssets.length; e++) {
        var d = s.NeedLoadAssets[e],
          f = s.NeedLoadAssetTypes[e];
        _.AddAsset(f, d)
      }
    }
    return e.BlueprintClassPath?.length ? (PublicUtil_1.PublicUtil.UseDbConfig() ? (i = e.FightAssetManager.SkillAssetManager.GetEntitySkillPreload(o)) && (_ = _ || new PreloadDefine_1.AssetElement(e), e.FightAssetManager.SkillAssetManager.AddSkill(o, _), this.ypr(i, _)) : (i = (i = e.BlueprintClassPath.substring(CHARACTER_PREFIX_PATH.length)).substring(0, i.lastIndexOf(".")), a = "" + a.SkillJsonExportPath + i + `/${o}.json`, UE.BlueprintPathsLibrary.FileExists(a) ? (r = (i = "", puerts_1.$ref)(""), UE.KuroStaticLibrary.LoadFileToString(r, a), (i = (0, puerts_1.$unref)(r))?.length && (_ || (_ = new PreloadDefine_1.AssetElement(e), e.FightAssetManager.SkillAssetManager.AddSkill(o, _)), r = JSON.parse(i), this.ypr(r.AssetRecord, _))) : t && Log_1.Log.CheckError() && Log_1.Log.Error("World", 4, "[预加载] 不存在技能配置文件", ["Path", a], ["是否公共技能", n], ["是否拥有蒙太奇", l], ["CreatureDataId", e.CreatureDataComponent?.GetCreatureDataId()])), PreloadControllerNew._j1.Stop()) : (Log_1.Log.CheckError() && Log_1.Log.Error("World", 4, "[预加载] 角色蓝图无效", ["SkillId", o], ["CreatureDataId", e.CreatureDataComponent?.GetCreatureDataId()]), PreloadControllerNew._j1.Stop()), _
  }
  static ModelAssetElementCollectAssetBySkillId(e, o, t) {
    PreloadControllerNew._j1.Start();
    var r, a = ModelManager_1.ModelManager.PreloadModelNew,
      i = a.GetCommonSkill(e);
    let n = !1,
      l = !1,
      _ = void 0;
    if (i) {
      n = !0, l = i[0];
      var s = i[1];
      _ = new PreloadDefine_1.AssetElement(void 0), o.SkillAssetManager.AddSkill(e, _);
      for (let e = 0; e < s.NeedLoadAssets.length; e++) {
        var d = s.NeedLoadAssets[e],
          f = s.NeedLoadAssetTypes[e];
        _.AddAsset(f, d)
      }
    }
    return o.BlueprintClassPath?.length ? (PublicUtil_1.PublicUtil.UseDbConfig() ? (i = o.SkillAssetManager.GetEntitySkillPreload(e)) && (_ = _ || new PreloadDefine_1.AssetElement(void 0), o.SkillAssetManager.AddSkill(e, _), this.ypr(i, _)) : (i = (i = o.BlueprintClassPath.substring(CHARACTER_PREFIX_PATH.length)).substring(0, i.lastIndexOf(".")), a = "" + a.SkillJsonExportPath + i + `/${e}.json`, UE.BlueprintPathsLibrary.FileExists(a) ? (r = (i = "", puerts_1.$ref)(""), UE.KuroStaticLibrary.LoadFileToString(r, a), (i = (0, puerts_1.$unref)(r))?.length && (_ || (_ = new PreloadDefine_1.AssetElement(void 0), o.SkillAssetManager.AddSkill(e, _)), r = JSON.parse(i), this.ypr(r.AssetRecord, _))) : t && Log_1.Log.CheckError() && Log_1.Log.Error("World", 4, "[预加载] 不存在技能配置文件", ["Path", a], ["是否公共技能", n], ["是否拥有蒙太奇", l])), PreloadControllerNew._j1.Stop()) : (Log_1.Log.CheckError() && Log_1.Log.Error("World", 4, "[预加载] 角色蓝图无效", ["SkillId", e]), PreloadControllerNew._j1.Stop()), _
  }
  static async CollectModelAssetSkillMap(i) {
    var e = i.BlueprintClassPath;
    if (e?.length) {
      e = ConfigManager_1.ConfigManager.WorldConfig.GetCharacterFightInfo(e);
      if (e) {
        e = e.SkillDataTable.ToAssetPathName();
        const n = new CustomPromise_1.CustomPromise;
        ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.DataTable, (e, o) => {
          if (e) {
            var t = new Array;
            DataTableUtil_1.DataTableUtil.GetDataTableAllRowNamesFromTable(e, t);
            for (const a of t) {
              var r = Number(a);
              this.ModelAssetElementCollectAssetBySkillId(r, i, !1)
            }
          }
          n.SetResult()
        }), await n.Promise
      }
    }
  }
  static async CollectModelAssetBulletMap(i) {
    var e = i.BlueprintClassPath;
    if (e?.length) {
      e = ConfigManager_1.ConfigManager.WorldConfig.GetCharacterFightInfo(e);
      if (e) {
        e = e.BulletDataTable.ToAssetPathName();
        const n = new CustomPromise_1.CustomPromise;
        ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.DataTable, (e, o) => {
          if (e) {
            var t = new Array;
            DataTableUtil_1.DataTableUtil.GetDataTableAllRowNamesFromTable(e, t);
            for (const a of t) {
              var r = BigInt(a);
              this.ModelAssetElementCollectAssetByBulletId(i, r)
            }
          }
          n.SetResult()
        }), await n.Promise
      }
    }
  }
  static CollectAssetByBulletId(e, o) {
    var t = ModelManager_1.ModelManager.PreloadModelNew;
    if (!PublicUtil_1.PublicUtil.UseDbConfig()) {
      var r = e.BlueprintClassPath.substring(CHARACTER_PREFIX_PATH.length),
        r = r.substring(0, r.lastIndexOf(".")),
        r = "" + t.BulletJsonExportPath + r + `/${o}.json`;
      if (!UE.BlueprintPathsLibrary.FileExists(r)) return void(Log_1.Log.CheckError() && Log_1.Log.Error("World", 4, "[预加载] 不存在子弹配置文件", ["Path", r]));
      var a = (0, puerts_1.$ref)("");
      if (UE.KuroStaticLibrary.LoadFileToString(a, r), !(r = (0, puerts_1.$unref)(a))?.length) return;
      const i = new PreloadDefine_1.AssetElement(e);
      e.FightAssetManager.BulletAssetManager.AddBullet(o, i);
      a = JSON.parse(r);
      return this.ypr(a.AssetRecord, i), i
    }
    PreloadControllerNew.AN1.Start();
    r = t.GetBulletPreloadData(e.BlueprintClassPath, o);
    if (r) {
      const i = new PreloadDefine_1.AssetElement(e);
      return e.FightAssetManager.BulletAssetManager.AddBullet(o, i), PreloadControllerNew.AN1.Stop(), PreloadControllerNew.PN1.Start(), this.ypr(r, i), PreloadControllerNew.PN1.Stop(), i
    }
    PreloadControllerNew.AN1.Stop()
  }
  static ModelAssetElementCollectAssetByBulletId(e, o) {
    var t = ModelManager_1.ModelManager.PreloadModelNew;
    if (!PublicUtil_1.PublicUtil.UseDbConfig()) {
      var r = e.BlueprintClassPath.substring(CHARACTER_PREFIX_PATH.length),
        r = r.substring(0, r.lastIndexOf(".")),
        r = "" + t.BulletJsonExportPath + r + `/${o}.json`;
      if (!UE.BlueprintPathsLibrary.FileExists(r)) return void(Log_1.Log.CheckError() && Log_1.Log.Error("World", 4, "[预加载] 不存在子弹配置文件", ["Path", r]));
      var a = (0, puerts_1.$ref)("");
      if (UE.KuroStaticLibrary.LoadFileToString(a, r), !(r = (0, puerts_1.$unref)(a))?.length) return;
      const i = new PreloadDefine_1.AssetElement(void 0);
      e.BulletAssetManager.AddAsset(o, i);
      a = JSON.parse(r);
      return this.ypr(a.AssetRecord, i), i
    }
    PreloadControllerNew.AN1.Start();
    r = t.GetBulletPreloadData(e.BlueprintClassPath, o);
    if (r) {
      const i = new PreloadDefine_1.AssetElement(void 0);
      return e.BulletAssetManager.AddAsset(o, i), PreloadControllerNew.AN1.Stop(), PreloadControllerNew.PN1.Start(), this.ypr(r, i), PreloadControllerNew.PN1.Stop(), i
    }
    PreloadControllerNew.AN1.Stop()
  }
  static Dpr(e, o) {
    var t, r = ModelManager_1.ModelManager.PreloadModelNew;
    return PublicUtil_1.PublicUtil.UseDbConfig() ? !!(t = r.GetStateMachinePreloadData(o)) && (this.ypr(t, e), !0) : (t = "" + r.StateMachineJsonExportPath + o + ".json", UE.BlueprintPathsLibrary.FileExists(t) ? (o = (r = "", puerts_1.$ref)(""), UE.KuroStaticLibrary.LoadFileToString(o, t), !!(r = (0, puerts_1.$unref)(o))?.length && (o = JSON.parse(r), this.ypr(o.AssetRecord, e), !0)) : (Log_1.Log.CheckError() && Log_1.Log.Error("World", 4, "[预加载] 不存在状态机文件", ["Path", t]), !1))
  }
  static CollectAssetByStateMachineNode(e, o) {
    var t = ModelManager_1.ModelManager.PreloadModelNew;
    if (!PublicUtil_1.PublicUtil.UseDbConfig()) {
      var r = "" + t.StateMachineJsonExportPath + o + ".json";
      if (!UE.BlueprintPathsLibrary.FileExists(r)) return void(Log_1.Log.CheckError() && Log_1.Log.Error("World", 4, "[预加载] 不存在状态机文件", ["Path", r]));
      var a = (0, puerts_1.$ref)("");
      if (UE.KuroStaticLibrary.LoadFileToString(a, r), !(r = (0, puerts_1.$unref)(a))?.length) return;
      const i = new PreloadDefine_1.AssetElement(e);
      a = JSON.parse(r);
      return this.ypr(a.AssetRecord, i), i
    }
    r = t.GetStateMachinePreloadData(o);
    if (r) {
      const i = new PreloadDefine_1.AssetElement(e);
      return this.ypr(r, i), i
    }
  }
  static RemoveSkill(e, o) {
    return e ? e.FightAssetManager.SkillAssetManager.RemoveSkill(o) : (Log_1.Log.CheckError() && Log_1.Log.Error("World", 4, "[预加载] entityAssetElement参数无效"), !1)
  }
  static RemoveBullet(e, o) {
    e ? e.FightAssetManager.BulletAssetManager.RemoveBullet(o) : Log_1.Log.CheckError() && Log_1.Log.Error("World", 4, "[预加载] entityAssetElement参数无效")
  }
  static upr(o, t) {
    if (t?.IsValid()) {
      var e = StatSeconds_1.StatSecondsAccumulator.Create("CollectAssetByEffectModelBase");
      if (e.Start(), t.IsA(UE.EffectModelGroup_C.StaticClass())) {
        var r = t,
          a = r.EffectData.Num();
        for (let e = 0; e < a; ++e) {
          var i, n = r.EffectData.GetKey(e);
          n?.IsValid() && (n.IsA(UE.EffectModelGroup_C.StaticClass()) ? Log_1.Log.CheckError() && Log_1.Log.Error("Preload", 4, "[预加载]子特效不能是DA_Fx_Group", ["父特效", t.GetName()], ["子特效", n.GetName()]) : (this.upr(o, n), n.IsA(UE.EffectModelSkeletalMesh_C.StaticClass()) && ((i = n.AnimationRef)?.IsValid() ? i.IsA(UE.AnimSequence.StaticClass()) ? this.lpr(o, i, animBuffList) : i.IsA(UE.AnimMontage.StaticClass()) && this.hpr(o, i, animBuffList) : Log_1.Log.CheckError() && Log_1.Log.Error("Preload", 4, "[预加载]特效的mesh没有配置动画", ["父特效", t.GetName()], ["子特效", n.GetName()]))))
        }
      }
      e.Stop()
    }
  }
  static ypr(e, o) {
    if (PreloadControllerNew.uj1.Start(), e.ActorClass)
      for (const r of e.ActorClass) o.AddActorClass(r);
    if (e.Animations)
      for (const a of e.Animations) o.AddAnimation(a);
    if (e.Effects)
      for (const i of e.Effects) {
        o.AddEffect(i);
        var t = o.GetEntityAssetElement()?.Entity?.Id;
        t && ModelManager_1.ModelManager.PreloadModelNew.PreCreateEffect.AddPreCreateEffect(t, i)
      }
    if (e.Audios)
      for (const n of e.Audios) o.AddAudio(n);
    if (e.Materials)
      for (const l of e.Materials) o.AddMaterial(l);
    if (e.Meshes)
      for (const _ of e.Meshes) o.AddMesh(_);
    if (e.AnimationBlueprints)
      for (const s of e.AnimationBlueprints) o.AddAnimationBlueprint(s);
    if (e.Others)
      for (const d of e.Others) o.AddOther(d);
    PreloadControllerNew.uj1.Stop()
  }
  static OnLeaveLevel() {
    var e, o = ModelManager_1.ModelManager.PreloadModelNew;
    o.CommonAssetElement.Clear();
    for ([, e] of o.AllEntityAssetMap) 4 !== e.LoadState && e.Clear();
    return o.ClearEntityAsset(), o.ClearPbEntityAsset(), o.ClearPreloadResource(), o.CleanPlotAsset(), !0
  }
}(exports.PreloadControllerNew = PreloadControllerNew)._j1 = Stats_1.Stat.Create("PreloadController.CollectAssetBySkillId"), PreloadControllerNew.AN1 = Stats_1.Stat.Create("PreloadController.AddBulletAsset"), PreloadControllerNew.PN1 = Stats_1.Stat.Create("PreloadController.CopyBulletAssets"), PreloadControllerNew.uj1 = Stats_1.Stat.Create("PreloadController.CopyAssets");
//# sourceMappingURL=PreloadControllerNew.js.map