"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PreloadControllerNew = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
const Log_1 = require("../../../Core/Common/Log");
const Stats_1 = require("../../../Core/Common/Stats");
const CharacterPreloadById_1 = require("../../../Core/Define/ConfigQuery/CharacterPreloadById");
const GameplayCueById_1 = require("../../../Core/Define/ConfigQuery/GameplayCueById");
const PlotAudioById_1 = require("../../../Core/Define/ConfigQuery/PlotAudioById");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const StatSeconds_1 = require("../../../Core/Performance/StatSeconds");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const DataTableUtil_1 = require("../../../Core/Utils/DataTableUtil");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const BaseConfigController_1 = require("../../../Launcher/BaseConfig/BaseConfigController");
const IComponent_1 = require("../../../UniverseEditor/Interface/IComponent");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const PublicUtil_1 = require("../../Common/PublicUtil");
const InputModel_1 = require("../../Input/InputModel");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const AutoAttachDefine_1 = require("../../Module/AutoAttach/AutoAttachDefine");
const NpcIconDefine_1 = require("../../Module/NPC/NpcIconDefine");
const PlotAudioModel_1 = require("../../Module/Plot/PlotAudioModel");
const RoleDefine_1 = require("../../Module/RoleUi/RoleDefine");
const CharacterGlideComponent_1 = require("../../NewWorld/Character/Common/Component/CharacterGlideComponent");
const CharacterSplineMoveComponent_1 = require("../../NewWorld/Character/Common/Component/CharacterSplineMoveComponent");
const PreloadDefine_1 = require("../../Preload/PreloadDefine");
const RenderConfig_1 = require("../../Render/Config/RenderConfig");
const GameModePromise_1 = require("../Define/GameModePromise");
const PreloadConstants_1 = require("./PreloadConstants");
const commonMajorPaths = ["/Game/Aki/Data/Fight/CDT_CommonBulletData.CDT_CommonBulletData", "/Game/Aki/Data/Fight/DT_CommonHitEffect.DT_CommonHitEffect", "/Game/Aki/Character/Vision/DT_Vision.DT_Vision", "/Game/Aki/Data/Fight/DT_Common_Role_SkillInfo.DT_Common_Role_SkillInfo", "/Game/Aki/Data/Fight/DT_Common_Monster_SkillInfo.DT_Common_Monster_SkillInfo", "/Game/Aki/Data/Fight/DT_Common_Vision_SkillInfo.DT_Common_Vision_SkillInfo", "/Game/Aki/Data/Fight/DT_CharacterFightInfo.DT_CharacterFightInfo", "/Game/Aki/Data/Fight/DT_CaughtInfo.DT_CaughtInfo", "/Game/Aki/Data/Fight/DA_DefaultBulletConfig.DA_DefaultBulletConfig", "/Game/Aki/Data/Fight/DT_QteTag.DT_QteTag"];
const commonOtherPaths = ["/Game/Aki/UI/UIResources/UiFight/Atlas/SP_FightPutong.SP_FightPutong", "/Game/Aki/Character/BaseCharacter/Abilities/GA/GA_Base.GA_Base_C", "/Game/Aki/Effect/UI/Niagaras/Common/NS_Fx_LGUI_FightQTE_001.NS_Fx_LGUI_FightQTE_001", "/Game/Aki/Effect/UI/Niagaras/Common/NS_Fx_LGUI_FightQTE_002.NS_Fx_LGUI_FightQTE_002", "/Game/Aki/Effect/MaterialController/Common/DA_Fx_Character_ChangeRole.DA_Fx_Character_ChangeRole", "/Game/Aki/Effect/BluePrint/BP_FX_Common/BP_Fx_Scanning.BP_Fx_Scanning_C", "/Game/Aki/Effect/BluePrint/BP_FX_Common/BP_Fx_Control_Obj.BP_Fx_Control_Obj_C", "/Game/Aki/Data/Fight/BulletCampAsset/DT_AllBulletCampAsset.DT_AllBulletCampAsset", "/Game/Aki/Data/Fight/BulletDataAsset/DT_AllBulletLogicTypeNew.DT_AllBulletLogicTypeNew", "/Game/Aki/Data/Fight/CommonGB/DT_AllKuroBpDataGroup.DT_AllKuroBpDataGroup", "/Game/Aki/Effect/Niagara/NI_Common/NS_Fx_Control_Obj_Beam.NS_Fx_Control_Obj_Beam", "/Game/Aki/Effect/MaterialController/Common/DA_Fx_HuluWarning.DA_Fx_HuluWarning", "/Game/Aki/Data/Fight/UI/DT_PanelQte.DT_PanelQte", "/Game/Aki/Data/Qte/DT_CommonQte.DT_CommonQte", "/Game/Aki/Data/Qte/DT_BattleQte.DT_BattleQte", "/Game/Aki/UI/Framework/PredefColor/DT_PredefColor.DT_PredefColor", "/Game/Aki/Effect/MaterialController/Common/DA_Fx_UIChangeRole.DA_Fx_UIChangeRole", "/Game/Aki/TypeScript/Game/Render/Scene/Item/SceneInteractionActor.SceneInteractionActor_C", RenderConfig_1.RenderConfig.CharMaterialContainerDataPath, RenderConfig_1.RenderConfig.EmptyMaterialPath, RoleDefine_1.UI_ABP_PATH, NpcIconDefine_1.HEADSTATE_SCALE_CURVE_PATH, NpcIconDefine_1.DIALOG_SCALE_CURVE_PATH, AutoAttachDefine_1.INERTIA_CURVE_PATH, AutoAttachDefine_1.VELOCITY_CURVE_PATH, AutoAttachDefine_1.BOUNDARY_CURVE_PATH, PreloadConstants_1.ACC_LERP_CURVE_PATH, PreloadConstants_1.SWIM_ACCELERATOR_CURVE_PATH, PreloadConstants_1.SWIM_ROTATOR_CURVE_PATH, PreloadConstants_1.BASE_MOVE_INHERIT_CURVE_PATH, CharacterSplineMoveComponent_1.CharacterSplineMoveComponent.DaPath, PreloadConstants_1.ANGLE_TO_STEP_FREQUENCY_CURVE_PATH, PreloadConstants_1.ANGLE_TO_STEP_LENGTH_CURVE_PATH, PreloadConstants_1.BATTLE_SETTLEMENT_TIME_SCALE_CURVE_PATH, CharacterGlideComponent_1.SOAR_CONFIG_BASE_PATH, CharacterGlideComponent_1.SOAR_CAMERA_SHAKE_PATH, CharacterGlideComponent_1.SOAR_CAMERA_SHAKE_CURVE_PATH, CharacterGlideComponent_1.SOAR_AUTO_FLIGHT_PATH, InputModel_1.INPUT_COMMAND_TRANSFORM_DT_PATH];
const commonEffectPaths = ["/Game/Aki/Data/Camera/DA_FightCameraConfig.DA_FightCameraConfig", "/Game/Aki/Data/Fight/BulletDataAsset/DA_CommonBullet.DA_CommonBullet", "/Game/Aki/Effect/EffectGroup/Common/DA_Fx_Group_WeaponEnd.DA_Fx_Group_WeaponEnd", "/Game/Aki/Effect/EffectGroup/R2T1JinxiMd20011/DA_Fx_Group_R1s_Shoudao.DA_Fx_Group_R1s_Shoudao", "/Game/Aki/Effect/EffectGroup/Common/DA_Fx_Group_ChangeRole.DA_Fx_Group_ChangeRole", "/Game/Aki/Effect/EffectGroup/Common/DA_Fx_Group_ChangeRoleStart.DA_Fx_Group_ChangeRoleStart", "/Game/Aki/Effect/EffectGroup/Common/DA_Fx_Group_Control_Obj_Hand.DA_Fx_Group_Control_Obj_Hand", "/Game/Aki/Effect/DataAsset/Niagara/BigWorld/DA_Fx_Animal_Vanish.DA_Fx_Animal_Vanish", "/Game/Aki/Effect/EffectGroup/Common/DA_Fx_Group_XieZou_Qidong00.DA_Fx_Group_XieZou_Qidong00", "/Game/Aki/Effect/EffectGroup/Common/DA_Fx_Group_XieZou_Gaowen00.DA_Fx_Group_XieZou_Gaowen00", "/Game/Aki/Effect/MaterialController/Common/DA_Fx_HuluStart.DA_Fx_HuluStart", "/Game/Aki/Effect/MaterialController/Common/DA_Fx_TimeFreeze_LimitDodge.DA_Fx_TimeFreeze_LimitDodge", "/Game/Aki/Effect/EffectGroup/Common/DA_Fx_Group_Press_Smoke.DA_Fx_Group_Press_Smoke", "/Game/Aki/Effect/EffectGroup/Common/DA_Fx_Group_Hook_Miaodian_Lock.DA_Fx_Group_Hook_Miaodian_Lock", "/Game/Aki/Effect/EffectGroup/Common/DA_Fx_Group_Hook_Miaodian_LockDown.DA_Fx_Group_Hook_Miaodian_LockDown", "/Game/Aki/Effect/EffectGroup/Common/DA_Fx_Group_ChangeRole_Play.DA_Fx_Group_ChangeRole_Play"];
const iosAuditAppIgnoreAssets = new Set(["/Game/Aki/Sequence/Manager/DT_SequenceMember"]);
const NEED_PRELOAD_DISTANCE = 4000000;
const CHARACTER_PREFIX_PATH = "/Game/Aki/Character/";
const animSequenceBasesRef = (0, puerts_1.$ref)(UE.NewArray(UE.AnimSequenceBase));
const animNotifyEventsRef = (0, puerts_1.$ref)(UE.NewArray(UE.AnimNotifyEvent));
const animationAssetSetRef = (0, puerts_1.$ref)(UE.NewSet(UE.AnimationAsset));
const animBuffList = new Array();
const COMMON_STATE_MACHINE = "SM_Common";
class PreloadControllerNew extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return !!this.Spr();
  }
  static Spr() {
    var o = ModelManager_1.ModelManager.PreloadModelNew;
    if (PublicUtil_1.PublicUtil.UseDbConfig()) {
      var e = o.GetCommonSkillPreloadData();
      if (!e?.length) {
        return false;
      }
      for (const n of e) {
        var t = new PreloadDefine_1.AssetElement(undefined);
        this.ypr(n, t);
        o.AddCommonSkill(n.Id, n.HasMontagePath, t);
      }
    } else {
      var r = UE.KuroStaticLibrary.GetFilesRecursive(o.CommonSkillJsonExportPath, "*", true, false);
      for (let e = 0; e < r.Num(); ++e) {
        var a = r.Get(e);
        var i = (0, puerts_1.$ref)("");
        UE.KuroStaticLibrary.LoadFileToString(i, a);
        if (!(i = (0, puerts_1.$unref)(i))?.length) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Preload", 4, "[预加载] 加载文件失败", ["path", a]);
          }
          return false;
        }
        i = JSON.parse(i);
        if (!i) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Preload", 4, "[预加载] 序列化skillAssetRecord失败", ["path", a]);
          }
          return false;
        }
        a = new PreloadDefine_1.AssetElement(undefined);
        this.ypr(i.AssetRecord, a);
        o.AddCommonSkill(i.SkillId, i.HasMontagePath, a);
      }
    }
    return true;
  }
  static async DoPreload(e) {
    let o = false;
    var t = ModelManager_1.ModelManager.GameModeModel;
    t.PreloadCommonProfiler.Restart();
    var e = await this.Tpr(e);
    t.PreloadCommonProfiler.Stop();
    if (!e) {
      o = true;
    }
    ModelManager_1.ModelManager.GameModeModel.PreloadEntitiesProfiler.Restart();
    var t = await this.Wfr(ModelManager_1.ModelManager.GameModeModel.PreloadEntitiesProfiler);
    ModelManager_1.ModelManager.GameModeModel.PreloadEntitiesProfiler.Stop();
    return !(o = t ? o : true);
  }
  static async Tpr(e) {
    let o = false;
    var t = await this.Kfr();
    if (!t) {
      o = true;
    }
    if (ModelManager_1.ModelManager.CreatureModel.EnableEntityLog && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Preload", 4, "[预加载] 预加载公共主要资源结果", ["Success", t]);
    }
    var t = await this.Lpr();
    if (!t) {
      o = true;
    }
    if (ModelManager_1.ModelManager.CreatureModel.EnableEntityLog && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Preload", 4, "[预加载] 预加载公共次要资源结果", ["Success", t]);
    }
    e(o);
    return true;
  }
  static async Kfr() {
    var e = ModelManager_1.ModelManager.PreloadModelNew;
    for (const t of commonMajorPaths) {
      if (!BaseConfigController_1.BaseConfigController.GetIosAuditFirstDownloadTipWithSkip() || !iosAuditAppIgnoreAssets.has(t)) {
        e.CommonAssetElement.AddOther(t);
      }
    }
    for (const r of DataTableUtil_1.dataTablePaths.values()) {
      if (!BaseConfigController_1.BaseConfigController.GetIosAuditFirstDownloadTipWithSkip() || !iosAuditAppIgnoreAssets.has(r)) {
        e.CommonAssetElement.AddOther(r);
      }
    }
    var o = new GameModePromise_1.GameModePromise();
    this.LoadAssetAsync(e.CommonAssetElement, 101, true, o);
    return o.Promise;
  }
  static async Lpr() {
    var e = ModelManager_1.ModelManager.PreloadModelNew;
    for (const t of commonEffectPaths) {
      e.CommonAssetElement.AddEffect(t);
    }
    for (const r of commonOtherPaths) {
      e.CommonAssetElement.AddOther(r);
    }
    this.Dpr(e.CommonAssetElement, COMMON_STATE_MACHINE);
    var o = new GameModePromise_1.GameModePromise();
    this.LoadAssetAsync(e.CommonAssetElement, 101, true, o);
    return o.Promise;
  }
  static async Wfr(e) {
    const o = ModelManager_1.ModelManager.PreloadModelNew;
    var t = ModelManager_1.ModelManager.CreatureModel.GetAllEntities();
    if (t.length === 0) {
      return false;
    }
    var r = Vector_1.Vector.Create(ModelManager_1.ModelManager.GameModeModel.BornLocation);
    var a = Vector_1.Vector.Create();
    var i = new Array();
    for (const f of t) {
      var n = f.Entity.GetComponent(0);
      if (!f.IsInit && !n.GetLoading() && !n.GetRemoveState() && n.GetEntityType() !== Protocol_1.Aki.Protocol.kks.Proto_Custom && n.GetEntityType() !== Protocol_1.Aki.Protocol.kks.Proto_PlayerEntity) {
        if (n.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Player || (n = n.GetLocation(), a.X = n.X, a.Y = n.Y, a.Z = n.Z, Vector_1.Vector.DistSquared(r, a) <= NEED_PRELOAD_DISTANCE)) {
          i.push(f);
          o.AddNeedWaitEntity(f.Id);
        }
      }
    }
    let l = i.length;
    if (ModelManager_1.ModelManager.CreatureModel.EnableEntityLog && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Preload", 4, "[预加载] 批量预加载实体:开始", ["当前实体总数", t.length], ["需要预加载的实体个数", l]);
    }
    if (l === 0) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Preload", 4, "[预加载] 需要预加载的实体数量为0");
      }
      return false;
    }
    var _;
    var s = new Array();
    for (const u of i) {
      const c = u.Entity.GetComponent(0);
      if (!u.IsInit && !c.GetLoading()) {
        if (ControllerHolder_1.ControllerHolder.CreatureController.CheckEnableEntityLog(u) && Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Preload", 4, "[预加载] 预加载单个实体:开始", ["CreatureDataId", c.GetCreatureDataId()], ["PbDataId", c.GetPbDataId()], ["Reason", "PreloadController.PreloadEntities"], ["Count", l]);
        }
        _ = this.PreloadEntity(u, e, e => {
          l--;
          if (ControllerHolder_1.ControllerHolder.CreatureController.CheckEnableEntityLog(u) && Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Preload", 4, "[预加载] 预加载实体:结束", ["CreatureDataId", c.GetCreatureDataId()], ["PbDataId", c.GetPbDataId()], ["预加载结果", e], ["调用代码位置", "PreloadController.PreloadEntities"], ["Count", l]);
          }
          o.RemoveNeedWaitEntity(u.Id);
        });
        s.push(_);
      }
    }
    let d = true;
    for (const m of await Promise.all(s)) {
      if (m === 2) {
        d = false;
      }
    }
    if (ModelManager_1.ModelManager.CreatureModel.EnableEntityLog && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Preload", 4, "[预加载] 批量预加载实体:结束", ["预加载结果", d]);
    }
    return d;
  }
  static async PreloadEntity(e, o, t) {
    const r = ModelManager_1.ModelManager.PreloadModelNew;
    var a = new CustomPromise_1.CustomPromise();
    const i = e.Entity.GetComponent(0);
    if (i.GetRemoveState()) {
      t?.(4);
      return 4;
    }
    if (e.IsInit) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Preload", 4, "[预加载] 实体重复预加载，因为这个实体handle.IsInit为true");
      }
      t?.(2);
      return 2;
    }
    if (i.GetPreloadFinished()) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Preload", 4, "[预加载] 实体重复预加载，creatureDataComponent.GetPreloadFinished()为true");
      }
      t?.(2);
      return 2;
    }
    var n = StatSeconds_1.StatSecondsAccumulator.Create(`CreatureDataId:${i.GetCreatureDataId()}, PbDataId:${i.GetPbDataId()}`);
    n.Start();
    if (i.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Custom) {
      i.SetPreloadFinished(true);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PreloadEntityFinished, e);
      t?.(3);
      n.Stop();
      return 3;
    }
    let l = undefined;
    let _ = undefined;
    let s = undefined;
    let d = undefined;
    let f = undefined;
    if (o) {
      l = o.CreateChild(`预加载实体, CreatureDataId:${i.GetCreatureDataId()}, PbDataId:${i.GetPbDataId()}`, true);
      _ = l.CreateChild("预加载实体主要资源", true);
      s = l.CreateChild("预加载技能资源", true);
      d = l.CreateChild("预加载子弹资源", true);
      f = l.CreateChild("预加载实体固有资源", true);
    }
    l?.Start();
    let u = r.GetEntityAssetElement(i.GetCreatureDataId());
    if (u) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Preload", 4, "[预加载] 实体重复预加载");
      }
      t?.(2);
      l?.Stop();
      n.Stop();
      return 2;
    }
    (u = new PreloadDefine_1.EntityAssetElement(e)).LoadState = 0;
    u.Promise = a.Promise;
    u.AddCallback(t);
    u.MainAsset.AddObjectCallback = (e, o) => {
      r.HoldPreloadObject.AddEntityAsset(i.GetCreatureDataId(), e);
    };
    o = i.GetModelConfig();
    if (o && o.特效替换表 && o.蒙太奇替换表) {
      if ((c = o.特效替换表.ToAssetPathName()).length > 0) {
        u?.MainAsset.SetupReplaceEffect(c);
        e.Entity.GetComponent(3).SetReplaceEffect(u?.MainAsset.ReplaceEffectMap);
      }
      if ((c = o.蒙太奇替换表.ToAssetPathName()).length > 0) {
        u?.MainAsset.SetupReplaceMontage(c);
        e.Entity.GetComponent(3).SetReplaceMontage(u?.MainAsset.ReplaceMontageMap);
      }
    } else if (!o) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Preload", 4, "[预加载] ModelConfig为空", ["CreatureDataId", u?.CreatureDataComponent?.GetCreatureDataId()], ["EntityId", e.Entity?.Id], ["ModelId", i?.GetModelId()]);
      }
    }
    r.AddEntityAsset(i.GetCreatureDataId(), u);
    if (i.ModelBlueprintPath) {
      var c = i.GetPbEntityInitData();
      let e = undefined;
      if (c) {
        e = (0, IComponent_1.getComponent)(c.ComponentsData, "ModelComponent");
      }
      if (!this.Svl(u.MainAsset, e)) {
        t?.(2);
        l?.Stop();
        n.Stop();
        return 2;
      }
    } else if (!this.CollectAssetByModelId(u, i.GetModelId())) {
      t?.(2);
      l?.Stop();
      n.Stop();
      return 2;
    }
    if (i.IsAutoRole() && (c = i.GetAutoRoleConfig()?.Id) && (t = CharacterPreloadById_1.configCharacterPreloadById.GetConfig(c))) {
      this.ypr(t, u.MainAsset);
    }
    _?.Start();
    c = new GameModePromise_1.GameModePromise();
    if (ModelManager_1.ModelManager.PreloadModelNew?.EnablePreloadLog && Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Preload", 4, "[预加载] 开始预加载主要资源", ["CreatureDataId", u?.CreatureDataComponent?.GetCreatureDataId()], ["EntityId", e.Entity?.Id], ["ModelId", i?.GetModelId()], ["Dis", o?.描述], ["BP", o?.蓝图.ToAssetPathName()], ["\nAssets", "\n" + Array.from(u.MainAsset.AssetPathSet).map(e => "" + e).join("\n")]);
    }
    this.LoadAssetAsync(u.MainAsset, u.LoadPriority, false, c);
    t = await c.Promise;
    _?.Stop();
    if (!t) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Preload", 4, "[预加载] 预加载主要资源失败", ["CreatureDataId", u.CreatureDataComponent.GetCreatureDataId()]);
      }
      u.DoCallback(2);
      l?.Stop();
      n.Stop();
      return 2;
    }
    if (!e?.Valid) {
      u.DoCallback(4);
      l?.Stop();
      n.Stop();
      return 4;
    }
    var o = e.Entity.GetComponent(219);
    if (o && (o.InitPreload(u), o.IsEnableInitMorph())) {
      await o.InitMorph();
    }
    var m = new Array();
    f?.Start();
    switch (i.GetEntityConfigType()) {
      case Protocol_1.Aki.Protocol.rLs.F6n:
        var C = ModelManager_1.ModelManager.GameModeModel.MapId;
        var g = i.GetPbDataId();
        var C = r.PbDataPreloadDataMap.get(C)?.get(g);
        if (C) {
          this.ypr(C, u.MainAsset);
        } else {
          g = i.GetTemplateId();
          if (!g) {
            break;
          }
          C = r.GetTemplatePreloadData(g);
          if (C) {
            this.ypr(C, u.MainAsset);
          }
        }
        break;
      case Protocol_1.Aki.Protocol.rLs.lTs:
        var g = i.GetPbEntityInitData()?.BlueprintType;
        if (g && (C = ModelManager_1.ModelManager.CreatureModel.GetEntityTemplate(g)) && (g = r.GetTemplatePreloadData(C.Id))) {
          this.ypr(g, u.MainAsset);
        }
        break;
      case Protocol_1.Aki.Protocol.rLs.Proto_Template:
        C = i.GetPbDataId();
        g = r.GetTemplatePreloadData(C);
        if (g) {
          this.ypr(g, u.MainAsset);
        }
    }
    c = new GameModePromise_1.GameModePromise();
    if (ModelManager_1.ModelManager.PreloadModelNew?.EnablePreloadLog && Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Preload", 4, "[预加载] 开始预加载主体固定资源资源", ["CreatureDataId", u.CreatureDataComponent.GetCreatureDataId()], ["EntityConfigType", i.GetEntityConfigType()], ["\nAssets", "\n" + Array.from(u.MainAsset.AssetPathSet).map(e => "" + e).join("\n")]);
    }
    this.LoadAssetAsync(u.MainAsset, u.LoadPriority, false, c, e => {
      if (!e) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Preload", 4, "[预加载] 预加载固定资源失败", ["CreatureDataId", u.CreatureDataComponent.GetCreatureDataId()]);
        }
      }
    });
    m.push(c.Promise);
    f?.Stop();
    s?.Start();
    if (u.FightAssetManager.SkillAssetManager.SkillAssetMap.size) {
      let o = u.FightAssetManager.SkillAssetManager.SkillAssetMap.size;
      for (const [p, E] of u.FightAssetManager.SkillAssetManager.SkillAssetMap) {
        if (ModelManager_1.ModelManager.PreloadModelNew?.EnablePreloadLog && Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Preload", 4, "[预加载] 开始预加载技能资源", ["CreatureDataId", u.CreatureDataComponent.GetCreatureDataId()], ["SkillId", p], ["\nAssets", "\n" + Array.from(E.AssetPathSet).map(e => "" + e).join("\n")]);
        }
        var P = new GameModePromise_1.GameModePromise();
        this.LoadAssetAsync(E, u.LoadPriority, false, P, e => {
          if (! --o) {
            s?.Stop();
          }
          if (!e) {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Preload", 4, "[预加载] 预加载技能失败", ["CreatureDataId", u.CreatureDataComponent.GetCreatureDataId()], ["SkillId", p]);
            }
          }
        });
        m.push(P.Promise);
      }
    } else {
      s?.Stop();
    }
    d?.Start();
    const A = u.FightAssetManager.BulletAssetManager;
    let v = A.BulletAssetMap.size;
    if (v) {
      for (const [L, I] of A.BulletAssetMap) {
        var h;
        var D = new GameModePromise_1.GameModePromise();
        if (ModelManager_1.ModelManager.PreloadModelNew?.EnablePreloadLog && (h = A.IndexMapping.get(L), Log_1.Log.CheckDebug())) {
          Log_1.Log.Debug("Preload", 4, "[预加载] 开始预加载子弹资源", ["CreatureDataId", u.CreatureDataComponent.GetCreatureDataId()], ["bulletId", h], ["\nAssets", "\n" + Array.from(I.AssetPathSet).map(e => "" + e).join("\n")]);
        }
        this.LoadAssetAsync(I, u.LoadPriority, false, D, e => {
          if (! --v) {
            d?.Stop();
          }
          if (!e) {
            e = A.IndexMapping.get(L);
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Preload", 4, "[预加载] 预加载子弹失败", ["CreatureDataId", u.CreatureDataComponent.GetCreatureDataId()], ["BulletId", e]);
            }
          }
        });
        m.push(D.Promise);
      }
    } else {
      d?.Stop();
    }
    t = await Promise.all(m);
    if (!e.Valid) {
      u.DoCallback(4);
      l?.Stop();
      n.Stop();
      return 4;
    }
    if (i.GetRemoveState()) {
      u.DoCallback(4);
      l?.Stop();
      n.Stop();
      return 4;
    }
    let M = true;
    for (const S of t) {
      if (!S) {
        M = false;
      }
    }
    if (M) {
      a.SetResult(3);
      i.SetPreloadFinished(true);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PreloadEntityFinished, e);
      u.DoCallback(3);
      l?.Stop();
      n.Stop();
      return a.Promise;
    } else {
      u.DoCallback(2);
      l?.Stop();
      n.Stop();
      return 2;
    }
  }
  static RemoveEntity(e) {
    var o;
    var t = ModelManager_1.ModelManager.PreloadModelNew;
    var r = t.GetEntityAssetElement(e);
    if (r && r.EntityHandle?.Valid && r.LoadState !== 4) {
      r.LoadState = 4;
      if (!(o = t.HoldPreloadObject.RemoveEntityAssets(r.EntityHandle.CreatureDataId))) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Preload", 4, "HoldPreloadObject:RemoveEntityAssets Error", ["result", o], ["Key", r.EntityHandle.CreatureDataId]);
        }
      }
      r.Clear();
      t.RemoveEntityAsset(e);
    }
  }
  static async PreloadPlot(e, o, t, r = 0) {
    e = StringUtils_1.StringUtils.Format("{0},{1},{2}", e, o.toString(), t.toString());
    o = ModelManager_1.ModelManager.PreloadModelNew.PlotAssetManager;
    if (o.CheckCanLoad(e, r)) {
      return this.nI1(e);
    } else {
      o.AddPending(e, r);
      return 1;
    }
  }
  static RemovePlot(e, o, t) {
    var r = ModelManager_1.ModelManager.PreloadModelNew.PlotAssetManager;
    var e = StringUtils_1.StringUtils.Format("{0},{1},{2}", e, o.toString(), t.toString());
    r.RemovePending(e);
    this.sI1(e);
    this.aI1();
  }
  static async nI1(e) {
    var o = e.split(",");
    var o = ConfigManager_1.ConfigManager.FlowConfig.GetFlowStateActions(o[0], Number(o[1]), Number(o[2]));
    if (!o) {
      return 3;
    }
    var t = ModelManager_1.ModelManager.PreloadModelNew.PlotAssetManager.AddPlotAssetElement(e);
    if (!t) {
      return 3;
    }
    this.hI1(o, t);
    if (t.AssetPathSet.size === 0) {
      return 3;
    }
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Preload", 26, "[预加载][Plot] 剧情预载资源 --- 开始", ["id", e], ["length", t.AssetPathSet.size]);
    }
    o = new GameModePromise_1.GameModePromise();
    this.LoadAssetAsync(t, 101, false, o);
    t = await o.Promise;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Preload", 26, "[预加载][Plot] 剧情预载资源 --- 结束", ["id", e], ["result", t]);
    }
    if (t) {
      return 3;
    } else {
      return 2;
    }
  }
  static hI1(e, o) {
    var t;
    var r = ModelManager_1.ModelManager.PreloadModelNew;
    let a = undefined;
    let i = false;
    for (const s of e) {
      if (s.Name === "SetPlotMode") {
        var n = s.Params;
        a = n.Mode;
      } else if (s.Name === "ShowTalk") {
        if (a === "LevelA" || a === "LevelB") {
          var n = s.Params;
          var l = n.SequenceDataAsset;
          if (l) {
            i = true;
            r.PlotAssetManager.AddPath(o, l);
          }
          if (a === "LevelB") {
            const d = [];
            n.TalkItems.forEach(e => {
              if (e.TidTalk && e.PlayVoice) {
                d.push(e.TidTalk);
              }
            });
            for (const f of d) {
              if (!StringUtils_1.StringUtils.IsEmpty(f)) {
                var _ = PlotAudioById_1.configPlotAudioById.GetConfig(f);
                if (!_) {
                  return;
                }
                _ = PlotAudioModel_1.PlotAudioModel.GetAudioMouthAnimName(_);
                r.PlotAssetManager.AddPath(o, _);
              }
            }
          }
        }
      } else if (s.Name === "PlaySequenceData" && (l = s.Params.Path)) {
        i = true;
        r.PlotAssetManager.AddPath(o, l);
      }
    }
    if (i) {
      e = ModelManager_1.ModelManager.SequenceModel.SeqMainCharacterModelConfig.网格体?.ToAssetPathName();
      t = ModelManager_1.ModelManager.SequenceModel.SeqMainCharacterModelConfig.蓝图?.ToAssetPathName();
      r.PlotAssetManager.AddPath(o, e);
      r.PlotAssetManager.AddPath(o, t);
    }
  }
  static sI1(e) {
    var o = ModelManager_1.ModelManager.PreloadModelNew.PlotAssetManager.RemovePlotAssetElement(e);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Preload", 26, "[预加载][Plot] 移除剧情预载资源", ["id", e], ["result", o]);
    }
  }
  static aI1() {
    var e = ModelManager_1.ModelManager.PreloadModelNew.PlotAssetManager.CheckAndGetPendingPreload();
    if (e) {
      this.nI1(e.Id);
    }
  }
  static LoadAssetAsync(o, e, t, r, a) {
    o.AddPromise(r);
    this.Apr(o, e, e => {
      a?.(e);
      o.SetPromiseResult(e);
    }, t);
  }
  static async PreLoadLevelEntityByPbDataIds(e) {
    if (!ModelManager_1.ModelManager.CreatureModel) {
      return false;
    }
    if (e.length <= 0) {
      return false;
    }
    var o;
    var t = new Array();
    for (o of e) {
      o = Number(o);
      var r = this.y71(o, () => {});
      t.push(r);
    }
    let a = true;
    for (const i of await Promise.all(t)) {
      if (i === 2) {
        a = false;
      }
    }
    e = ModelManager_1.ModelManager.PreloadModelNew.HoldPreloadObject;
    if (ModelManager_1.ModelManager.CreatureModel.EnableEntityLog && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Preload", 80, "[预加载] 根据pbDataIds批量预加载实体:结束", ["预加载结果", a], ["HoldObjectsMapCount", e?.EntityAssetMap.Num()]);
    }
    return a;
  }
  static async y71(o, e) {
    var t = ModelManager_1.ModelManager.PreloadModelNew;
    var r = new CustomPromise_1.CustomPromise();
    var a = ModelManager_1.ModelManager.CreatureModel;
    if (!a) {
      return 2;
    }
    var a = a.GetCompleteEntityData(o);
    var i = a?.ComponentsData;
    if (!i) {
      return 2;
    }
    var n = t.GetPbEntityAssetElement(o);
    if (n) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Preload", 80, "[预加载] pb实体重复预加载");
      }
      e?.(2);
      return 2;
    }
    (n = new PreloadDefine_1.PbEntityAssetElement(o)).LoadState = 0;
    n.Promise = r.Promise;
    n.AddCallback(e);
    t.AddPbEntityAsset(o, n);
    var i = (0, IComponent_1.getComponent)(i, "ModelComponent");
    var l = i?.ModelType;
    if (i && i.Disabled === true && l?.Type === "ModelId" && this.CollectAssetByModelId(n, l.ModelId ?? 0) && this.Svl(n.MainAsset, i)) {
      e?.(2);
      return 2;
    } else {
      l = new GameModePromise_1.GameModePromise();
      this.LoadAssetAsync(n.MainAsset, n.LoadPriority, false, l);
      if (await l.Promise) {
        i = n.MainAsset;
        e = ModelManager_1.ModelManager.GameModeModel.MapId;
        if (l = t.PbDataPreloadDataMap.get(e)?.get(o)) {
          this.ypr(l, i);
        } else if ((e = a.BlueprintType) && (l = ModelManager_1.ModelManager.CreatureModel.GetEntityTemplate(e)) && (a = t.GetTemplatePreloadData(l.Id))) {
          this.ypr(a, i);
        }
        e = new GameModePromise_1.GameModePromise();
        this.LoadAssetAsync(i, n.LoadPriority, false, e, e => {
          if (!e) {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Preload", 80, "[预加载] 预加载固定资源失败", ["pbDataId", o]);
            }
          }
        });
        if (await e.Promise) {
          r.SetResult(3);
          n.DoCallback(3);
          return r.Promise;
        } else {
          n.DoCallback(2);
          return 2;
        }
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Preload", 80, "[预加载] 预加载主要资源失败", ["pbDataId", o]);
        }
        n.DoCallback(2);
        return 2;
      }
    }
  }
  static ClearAllPbLevelEntityPb() {
    ModelManager_1.ModelManager.PreloadModelNew.ClearPbEntityAsset();
  }
  static LoadAsset(e) {
    if (!e.NeedLoadAssets.length) {
      return true;
    }
    let o = true;
    for (const i of e.NeedLoadAssets) {
      e.AddLoading(i);
      var t;
      var r;
      var a = ResourceSystem_1.ResourceSystem.Load(i, UE.Object);
      e.RemoveLoading(i);
      if (a?.IsValid()) {
        e.AddObject(i, a);
        if (a.IsA(UE.AnimMontage.StaticClass()) && (t = e.GetEntityAssetElement()) && (t = t.Entity?.GetComponent(25))) {
          r = UE.BlueprintPathsLibrary.GetBaseFilename(i);
          t.AddMontage(r, a, i);
        }
      } else {
        o = false;
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Preload", 4, "[预加载] 同步加载资源失败", ["Path", i]);
        }
      }
    }
    e.NeedLoadAssets.length = 0;
    e.NeedLoadAssetTypes.length = 0;
    return o;
  }
  static FlushSkill(e, o) {
    var t;
    var e = e.FightAssetManager.SkillAssetManager.GetSkill(o);
    if (e) {
      [e, t] = this.Ppr(e);
      if (e && t) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Preload", 3, "[预加载] 技能资源预加载中，立马使用技能会变成同步加载", ["SkillId", o]);
        }
        return false;
      } else {
        return e;
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Preload", 4, "[预加载] FlushSkill失败，技能不存在", ["SkillId", o]);
      }
      return false;
    }
  }
  static FlushBullet(e, o) {
    var t;
    var e = e.FightAssetManager.BulletAssetManager.GetBullet(o);
    if (e) {
      [e, t] = this.Ppr(e);
      if (e && t && Log_1.Log.CheckError()) {
        Log_1.Log.Error("Preload", 3, "[预加载] 子弹资源预加载中，立马使用子弹会变成同步加载", ["bulletId", o]);
      }
      return e;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Preload", 4, "[预加载] FlushBullet失败，子弹不存在", ["BulletId", o]);
      }
      return false;
    }
  }
  static Ppr(e) {
    if (!e.Loading()) {
      return [true, false];
    }
    let o = true;
    for (const s of e.NeedLoadAssets) {
      e.AddLoading(s);
      var t;
      var r;
      var a = ResourceSystem_1.ResourceSystem.Load(s, UE.Object);
      e.RemoveLoading(s);
      if (a?.IsValid()) {
        e.AddObject(s, a);
        if (a.IsA(UE.AnimMontage.StaticClass()) && (t = e.GetEntityAssetElement()) && (t = t.Entity?.GetComponent(25))) {
          r = UE.BlueprintPathsLibrary.GetBaseFilename(s);
          t.AddMontage(r, a, s);
        }
      } else {
        o = false;
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Preload", 4, "[预加载] 同步加载资源失败", ["Path", s]);
        }
      }
    }
    var i = e.LoadingSet.size > 0;
    for (const d of e.LoadingSet) {
      var n;
      var l;
      var _ = ResourceSystem_1.ResourceSystem.Load(d, UE.Object);
      e.RemoveLoading(d);
      if (_?.IsValid()) {
        e.AddObject(d, _);
        if (_.IsA(UE.AnimMontage.StaticClass()) && (n = e.GetEntityAssetElement()) && (n = n.Entity?.GetComponent(25))) {
          l = UE.BlueprintPathsLibrary.GetBaseFilename(d);
          n.AddMontage(l, _, d);
        }
      } else {
        o = false;
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Preload", 4, "[预加载] 同步加载资源失败", ["Path", d]);
        }
      }
    }
    return [o, i];
  }
  static Apr(n, l, _, s) {
    if (n.NeedLoadAssets.length) {
      let r = undefined;
      var e = n.GetEntityAssetElement();
      if (e) {
        r = e.Entity?.GetComponent(24);
      }
      let a = n.NeedLoadAssets.length;
      let i = 0;
      for (let e = 0; e < n.NeedLoadAssets.length; e++) {
        var o = n.NeedLoadAssets[e];
        const d = n.NeedLoadAssetTypes[e];
        n.AddLoading(o);
        this.xpr(o, l, (e, o, t) => {
          a--;
          n.RemoveLoading(o);
          if (e) {
            if (d === 1 && t.IsA(UE.AnimMontage.StaticClass()) && r) {
              e = UE.BlueprintPathsLibrary.GetBaseFilename(o);
              r.AddMontage(e, t, o);
            }
            n.AddObject(o, t);
            if (s) {
              switch (d) {
                case 2:
                  this.upr(n, t);
                  break;
                case 0:
                  this.epr(n, t);
                  break;
                case 1:
                  if (t.IsA(UE.AnimMontage.StaticClass())) {
                    this.hpr(n, t, animBuffList);
                  } else if (t.IsA(UE.AnimSequenceBase.StaticClass())) {
                    this.lpr(n, t, animBuffList);
                  }
                  break;
                case 6:
                  this.cpr(n, t);
              }
            }
          } else {
            i++;
          }
          if (!a) {
            if (s && n.NeedLoadCount()) {
              this.Apr(n, l, _, s);
            } else {
              _?.(i === 0);
            }
          }
        });
      }
      n.NeedLoadAssets.length = 0;
      n.NeedLoadAssetTypes.length = 0;
    } else {
      _?.(true);
    }
  }
  static epr(e, o) {
    var t;
    var r;
    if (o && ((t = StatSeconds_1.StatSecondsAccumulator.Create("CollectAssetByActorClass")).Start(), r = (0, puerts_1.$ref)(undefined), UE.KuroStaticLibrary.GetCharacterAnimClass(o, r), o = (0, puerts_1.$unref)(r))) {
      this.cpr(e, o);
      t.Stop();
    }
  }
  static cpr(o, e) {
    if (e) {
      (0, puerts_1.$unref)(animationAssetSetRef).Empty();
      UE.KuroStaticLibrary.GetAnimAssetsByAnimBlueprintClass(e, animationAssetSetRef);
      var t = (0, puerts_1.$unref)(animationAssetSetRef);
      if (t.Num() !== 0) {
        for (let e = 0; e < t.Num(); ++e) {
          var r = t.Get(e);
          if (r.IsA(UE.AnimSequence.StaticClass())) {
            this.lpr(o, r, animBuffList);
          } else if (r.IsA(UE.AnimMontage.StaticClass())) {
            this.hpr(o, r, animBuffList);
          }
        }
        this._pr(o, animBuffList);
      }
    }
  }
  static lpr(o, e, t) {
    var r = StatSeconds_1.StatSecondsAccumulator.Create("CollectAssetByAnimSequence");
    r.Start();
    (0, puerts_1.$unref)(animNotifyEventsRef).Empty();
    UE.KuroStaticLibrary.GetAnimSequenceNotifies(e, animNotifyEventsRef);
    var a = (0, puerts_1.$unref)(animNotifyEventsRef);
    var i = a.Num();
    if (i !== 0) {
      for (let e = 0; e < i; ++e) {
        var n = a.Get(e);
        this.Mpr(o, n, t);
      }
      r.Stop();
    }
  }
  static hpr(o, e, t) {
    var r = StatSeconds_1.StatSecondsAccumulator.Create("CollectAssetByAnimMontage");
    r.Start();
    (0, puerts_1.$unref)(animNotifyEventsRef).Empty();
    UE.KuroStaticLibrary.GetAnimMontageNotifies(e, animNotifyEventsRef);
    var a = (0, puerts_1.$unref)(animNotifyEventsRef);
    if (a.Num() > 0) {
      for (let e = 0; e < a.Num(); ++e) {
        var i = a.Get(e);
        this.Mpr(o, i, t);
      }
    }
    (0, puerts_1.$unref)(animSequenceBasesRef).Empty();
    UE.KuroStaticLibrary.GetAnimSequencesByAnimMontage(e, animSequenceBasesRef);
    var n = (0, puerts_1.$unref)(animSequenceBasesRef);
    if (n.Num() > 0) {
      for (let e = 0; e < n.Num(); ++e) {
        var l = n.Get(e);
        this.lpr(o, l, t);
      }
    }
    r.Stop();
  }
  static Mpr(e, o, t) {
    if (o.NotifyStateClass?.IsValid()) {
      if (o.NotifyStateClass.IsA(UE.AnimNotifyStateEffect_C.StaticClass())) {
        if ((r = o.NotifyStateClass.EffectDataAssetRef?.ToAssetPathName()) && r.length !== 0 && r !== "None") {
          e.AddEffect(r);
          return;
        } else {
          return undefined;
        }
      }
      if (o.NotifyStateClass.IsA(UE.TsAnimNotifyStateAddBuff_C.StaticClass())) {
        if ((r = o.NotifyStateClass).BuffId) {
          t.push(r.BuffId);
          return;
        } else {
          return undefined;
        }
      }
    }
    var r;
    if (o.Notify?.IsValid()) {
      if (o.Notify.IsA(UE.AnimNotifyEffect_C.StaticClass())) {
        if ((r = o.Notify.EffectDataAssetRef?.ToAssetPathName()) && r.length !== 0 && r !== "None") {
          e.AddEffect(r);
          return;
        } else {
          return undefined;
        }
      } else {
        if (o.Notify.IsA(UE.TsAnimNotifyAddBuff_C.StaticClass()) && (e = o.Notify).BuffId) {
          t.push(e.BuffId);
        }
        return;
      }
    }
  }
  static _pr(e, o) {
    if (o?.length) {
      var t = StatSeconds_1.StatSecondsAccumulator.Create("CollectAssetByBuffIdList");
      t.Start();
      var o = ConfigManager_1.ConfigManager.BuffItemConfig.GetBuffConfigs(0, o);
      if (o) {
        for (const r of o) {
          this.fpr(e, r);
        }
      }
      t.Stop();
    }
  }
  static fpr(e, o) {
    if (o) {
      var t = StatSeconds_1.StatSecondsAccumulator.Create("CollectAssetByBuffInfo");
      t.Start();
      if (o.GameplayCueIds) {
        for (const a of o.GameplayCueIds) {
          var r = GameplayCueById_1.configGameplayCueById.GetConfig(a);
          if (r) {
            if (r.Path.length) {
              e.AddEffect(r.Path);
            }
            for (const i of r.Resources) {
              if (i.length) {
                e.AddEffect(i);
              }
            }
          }
        }
      }
      t.Stop();
    }
  }
  static xpr(t, e, r) {
    if (t?.length) {
      ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.Object, (e, o) => {
        if (e?.IsValid()) {
          r?.(true, t, e);
        } else {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Preload", 4, "[预加载] 预加载资源失败", ["Path", o]);
          }
          r?.(false, t, undefined);
        }
      }, e);
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Preload", 4, "[预加载] path路径为空");
      }
      r?.(false, t, undefined);
    }
  }
  static CollectAssetByModelId(e, o, t) {
    var r = ModelManager_1.ModelManager.PreloadModelNew;
    if (PublicUtil_1.PublicUtil.UseDbConfig()) {
      var a = r.GetModelConfigPreloadData(o);
      if (!a) {
        return false;
      }
      e.BlueprintClassPath = a.ActorClassPath;
      const i = t ?? e.MainAsset;
      this.ypr(a, i);
    } else {
      a = "" + r.ModelConfigJsonExportPath + o + ".json";
      if (UE.BlueprintPathsLibrary.FileExists(a)) {
        r = (0, puerts_1.$ref)("");
        UE.KuroStaticLibrary.LoadFileToString(r, a);
        if (!(o = (0, puerts_1.$unref)(r))?.length) {
          return false;
        }
        r = JSON.parse(o);
        e.BlueprintClassPath = r.ActorClassPath;
        const i = t ?? e.MainAsset;
        this.ypr(r.AssetRecord, i);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("World", 4, "[预加载] 不存在配置文件，重新导出ModelConfig对应的配置？", ["Path", a]);
      }
    }
    return true;
  }
  static Svl(e, o) {
    if (!o) {
      return false;
    }
    var t = o.ModelType;
    switch (t.Type) {
      case "LevelPrefab":
        var r = IComponent_1.levelPrefabBpPathConfig[t.BlueprintPath];
        if (r?.length) {
          e.AddOther(r);
        }
        if (t.PrefabPath?.length) {
          e.AddOther(t.PrefabPath);
        }
        break;
      case "Npc":
        if (t.BlueprintPath.length) {
          e.AddActorClass(t.BlueprintPath);
        }
        if (t.Abp?.length) {
          e.AddAnimationBlueprint(t.Abp);
        }
        if (t.NpcModel) {
          switch (t.NpcModel.Type) {
            case "Da":
              e.AddAsset(7, t.NpcModel.Da);
              break;
            case "Mesh":
              e.AddAsset(4, t.NpcModel.Mesh);
          }
        }
        break;
      case "Animal":
        if (t.BlueprintPath.length) {
          e.AddActorClass(t.BlueprintPath);
        }
        if (t.Abp?.length) {
          e.AddAnimationBlueprint(t.Abp);
        }
        if (t.AnimalModel && t.AnimalModel.Type === "Mesh") {
          e.AddAsset(4, t.AnimalModel.Mesh);
        }
    }
    return true;
  }
  static CollectAssetBySkillId(e, o, t) {
    PreloadControllerNew.Hj1.Start();
    var r;
    var a = ModelManager_1.ModelManager.PreloadModelNew;
    var i = a.GetCommonSkill(o);
    let n = false;
    let l = false;
    let _ = undefined;
    if (i) {
      n = true;
      l = i[0];
      var s = i[1];
      _ = new PreloadDefine_1.AssetElement(e);
      e.FightAssetManager.SkillAssetManager.AddSkill(o, _);
      for (let e = 0; e < s.NeedLoadAssets.length; e++) {
        var d = s.NeedLoadAssets[e];
        var f = s.NeedLoadAssetTypes[e];
        _.AddAsset(f, d);
      }
    }
    if (e.BlueprintClassPath?.length) {
      if (PublicUtil_1.PublicUtil.UseDbConfig()) {
        if (i = e.FightAssetManager.SkillAssetManager.GetEntitySkillPreload(o)) {
          _ = _ || new PreloadDefine_1.AssetElement(e);
          e.FightAssetManager.SkillAssetManager.AddSkill(o, _);
          this.ypr(i, _);
        }
      } else {
        i = (i = e.BlueprintClassPath.substring(CHARACTER_PREFIX_PATH.length)).substring(0, i.lastIndexOf("."));
        a = `${"" + a.SkillJsonExportPath + i}/${o}.json`;
        if (UE.BlueprintPathsLibrary.FileExists(a)) {
          r = (i = "", puerts_1.$ref)("");
          UE.KuroStaticLibrary.LoadFileToString(r, a);
          if ((i = (0, puerts_1.$unref)(r))?.length) {
            if (!_) {
              _ = new PreloadDefine_1.AssetElement(e);
              e.FightAssetManager.SkillAssetManager.AddSkill(o, _);
            }
            r = JSON.parse(i);
            this.ypr(r.AssetRecord, _);
          }
        } else if (t && Log_1.Log.CheckError()) {
          Log_1.Log.Error("World", 4, "[预加载] 不存在技能配置文件", ["Path", a], ["是否公共技能", n], ["是否拥有蒙太奇", l], ["CreatureDataId", e.CreatureDataComponent?.GetCreatureDataId()]);
        }
      }
      PreloadControllerNew.Hj1.Stop();
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("World", 4, "[预加载] 角色蓝图无效", ["SkillId", o], ["CreatureDataId", e.CreatureDataComponent?.GetCreatureDataId()]);
      }
      PreloadControllerNew.Hj1.Stop();
    }
    return _;
  }
  static ModelAssetElementCollectAssetBySkillId(e, o, t) {
    PreloadControllerNew.Hj1.Start();
    var r;
    var a = ModelManager_1.ModelManager.PreloadModelNew;
    var i = a.GetCommonSkill(e);
    let n = false;
    let l = false;
    let _ = undefined;
    if (i) {
      n = true;
      l = i[0];
      var s = i[1];
      _ = new PreloadDefine_1.AssetElement(undefined);
      o.SkillAssetManager.AddSkill(e, _);
      for (let e = 0; e < s.NeedLoadAssets.length; e++) {
        var d = s.NeedLoadAssets[e];
        var f = s.NeedLoadAssetTypes[e];
        _.AddAsset(f, d);
      }
    }
    if (o.BlueprintClassPath?.length) {
      if (PublicUtil_1.PublicUtil.UseDbConfig()) {
        if (i = o.SkillAssetManager.GetEntitySkillPreload(e)) {
          _ = _ || new PreloadDefine_1.AssetElement(undefined);
          o.SkillAssetManager.AddSkill(e, _);
          this.ypr(i, _);
        }
      } else {
        i = (i = o.BlueprintClassPath.substring(CHARACTER_PREFIX_PATH.length)).substring(0, i.lastIndexOf("."));
        a = `${"" + a.SkillJsonExportPath + i}/${e}.json`;
        if (UE.BlueprintPathsLibrary.FileExists(a)) {
          r = (i = "", puerts_1.$ref)("");
          UE.KuroStaticLibrary.LoadFileToString(r, a);
          if ((i = (0, puerts_1.$unref)(r))?.length) {
            if (!_) {
              _ = new PreloadDefine_1.AssetElement(undefined);
              o.SkillAssetManager.AddSkill(e, _);
            }
            r = JSON.parse(i);
            this.ypr(r.AssetRecord, _);
          }
        } else if (t && Log_1.Log.CheckError()) {
          Log_1.Log.Error("World", 4, "[预加载] 不存在技能配置文件", ["Path", a], ["是否公共技能", n], ["是否拥有蒙太奇", l]);
        }
      }
      PreloadControllerNew.Hj1.Stop();
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("World", 4, "[预加载] 角色蓝图无效", ["SkillId", e]);
      }
      PreloadControllerNew.Hj1.Stop();
    }
    return _;
  }
  static async CollectModelAssetSkillMap(i) {
    var e = i.BlueprintClassPath;
    if (e?.length) {
      e = ConfigManager_1.ConfigManager.WorldConfig.GetCharacterFightInfo(e);
      if (e) {
        e = e.SkillDataTable.ToAssetPathName();
        const n = new CustomPromise_1.CustomPromise();
        ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.DataTable, (e, o) => {
          if (e) {
            var t = new Array();
            DataTableUtil_1.DataTableUtil.GetDataTableAllRowNamesFromTable(e, t);
            for (const a of t) {
              var r = Number(a);
              this.ModelAssetElementCollectAssetBySkillId(r, i, false);
            }
          }
          n.SetResult();
        });
        await n.Promise;
      }
    }
  }
  static async CollectModelAssetBulletMap(i) {
    var e = i.BlueprintClassPath;
    if (e?.length) {
      e = ConfigManager_1.ConfigManager.WorldConfig.GetCharacterFightInfo(e);
      if (e) {
        e = e.BulletDataTable.ToAssetPathName();
        const n = new CustomPromise_1.CustomPromise();
        ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.DataTable, (e, o) => {
          if (e) {
            var t = new Array();
            DataTableUtil_1.DataTableUtil.GetDataTableAllRowNamesFromTable(e, t);
            for (const a of t) {
              var r = BigInt(a);
              this.ModelAssetElementCollectAssetByBulletId(i, r);
            }
          }
          n.SetResult();
        });
        await n.Promise;
      }
    }
  }
  static CollectAssetByBulletId(e, o) {
    var t = ModelManager_1.ModelManager.PreloadModelNew;
    if (!PublicUtil_1.PublicUtil.UseDbConfig()) {
      var r = e.BlueprintClassPath.substring(CHARACTER_PREFIX_PATH.length);
      var r = r.substring(0, r.lastIndexOf("."));
      var r = `${"" + t.BulletJsonExportPath + r}/${o}.json`;
      if (!UE.BlueprintPathsLibrary.FileExists(r)) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("World", 4, "[预加载] 不存在子弹配置文件", ["Path", r]);
        }
        return;
      }
      var a = (0, puerts_1.$ref)("");
      UE.KuroStaticLibrary.LoadFileToString(a, r);
      if (!(r = (0, puerts_1.$unref)(a))?.length) {
        return;
      }
      const i = new PreloadDefine_1.AssetElement(e);
      e.FightAssetManager.BulletAssetManager.AddBullet(o, i);
      a = JSON.parse(r);
      this.ypr(a.AssetRecord, i);
      return i;
    }
    PreloadControllerNew.a31.Start();
    r = t.GetBulletPreloadData(e.BlueprintClassPath, o);
    if (r) {
      const i = new PreloadDefine_1.AssetElement(e);
      e.FightAssetManager.BulletAssetManager.AddBullet(o, i);
      PreloadControllerNew.a31.Stop();
      PreloadControllerNew.h31.Start();
      this.ypr(r, i);
      PreloadControllerNew.h31.Stop();
      return i;
    }
    PreloadControllerNew.a31.Stop();
  }
  static ModelAssetElementCollectAssetByBulletId(e, o) {
    var t = ModelManager_1.ModelManager.PreloadModelNew;
    if (!PublicUtil_1.PublicUtil.UseDbConfig()) {
      var r = e.BlueprintClassPath.substring(CHARACTER_PREFIX_PATH.length);
      var r = r.substring(0, r.lastIndexOf("."));
      var r = `${"" + t.BulletJsonExportPath + r}/${o}.json`;
      if (!UE.BlueprintPathsLibrary.FileExists(r)) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("World", 4, "[预加载] 不存在子弹配置文件", ["Path", r]);
        }
        return;
      }
      var a = (0, puerts_1.$ref)("");
      UE.KuroStaticLibrary.LoadFileToString(a, r);
      if (!(r = (0, puerts_1.$unref)(a))?.length) {
        return;
      }
      const i = new PreloadDefine_1.AssetElement(undefined);
      e.BulletAssetManager.AddAsset(o, i);
      a = JSON.parse(r);
      this.ypr(a.AssetRecord, i);
      return i;
    }
    PreloadControllerNew.a31.Start();
    r = t.GetBulletPreloadData(e.BlueprintClassPath, o);
    if (r) {
      const i = new PreloadDefine_1.AssetElement(undefined);
      e.BulletAssetManager.AddAsset(o, i);
      PreloadControllerNew.a31.Stop();
      PreloadControllerNew.h31.Start();
      this.ypr(r, i);
      PreloadControllerNew.h31.Stop();
      return i;
    }
    PreloadControllerNew.a31.Stop();
  }
  static Dpr(e, o) {
    var t;
    var r = ModelManager_1.ModelManager.PreloadModelNew;
    if (PublicUtil_1.PublicUtil.UseDbConfig()) {
      return !!(t = r.GetStateMachinePreloadData(o)) && (this.ypr(t, e), true);
    } else {
      t = "" + r.StateMachineJsonExportPath + o + ".json";
      if (UE.BlueprintPathsLibrary.FileExists(t)) {
        o = (r = "", puerts_1.$ref)("");
        UE.KuroStaticLibrary.LoadFileToString(o, t);
        return !!(r = (0, puerts_1.$unref)(o))?.length && (o = JSON.parse(r), this.ypr(o.AssetRecord, e), true);
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("World", 4, "[预加载] 不存在状态机文件", ["Path", t]);
        }
        return false;
      }
    }
  }
  static CollectAssetByStateMachineNode(e, o) {
    var t = ModelManager_1.ModelManager.PreloadModelNew;
    if (!PublicUtil_1.PublicUtil.UseDbConfig()) {
      var r = "" + t.StateMachineJsonExportPath + o + ".json";
      if (!UE.BlueprintPathsLibrary.FileExists(r)) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("World", 4, "[预加载] 不存在状态机文件", ["Path", r]);
        }
        return;
      }
      var a = (0, puerts_1.$ref)("");
      UE.KuroStaticLibrary.LoadFileToString(a, r);
      if (!(r = (0, puerts_1.$unref)(a))?.length) {
        return;
      }
      const i = new PreloadDefine_1.AssetElement(e);
      a = JSON.parse(r);
      this.ypr(a.AssetRecord, i);
      return i;
    }
    r = t.GetStateMachinePreloadData(o);
    if (r) {
      const i = new PreloadDefine_1.AssetElement(e);
      this.ypr(r, i);
      return i;
    }
  }
  static RemoveSkill(e, o) {
    if (e) {
      return e.FightAssetManager.SkillAssetManager.RemoveSkill(o);
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("World", 4, "[预加载] entityAssetElement参数无效");
      }
      return false;
    }
  }
  static RemoveBullet(e, o) {
    if (e) {
      e.FightAssetManager.BulletAssetManager.RemoveBullet(o);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("World", 4, "[预加载] entityAssetElement参数无效");
    }
  }
  static upr(o, t) {
    if (t?.IsValid()) {
      var e = StatSeconds_1.StatSecondsAccumulator.Create("CollectAssetByEffectModelBase");
      e.Start();
      if (t.IsA(UE.EffectModelGroup_C.StaticClass())) {
        var r = t;
        var a = r.EffectData.Num();
        for (let e = 0; e < a; ++e) {
          var i;
          var n = r.EffectData.GetKey(e);
          if (n?.IsValid()) {
            if (n.IsA(UE.EffectModelGroup_C.StaticClass())) {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Preload", 4, "[预加载]子特效不能是DA_Fx_Group", ["父特效", t.GetName()], ["子特效", n.GetName()]);
              }
            } else {
              this.upr(o, n);
              if (n.IsA(UE.EffectModelSkeletalMesh_C.StaticClass())) {
                if ((i = n.AnimationRef)?.IsValid()) {
                  if (i.IsA(UE.AnimSequence.StaticClass())) {
                    this.lpr(o, i, animBuffList);
                  } else if (i.IsA(UE.AnimMontage.StaticClass())) {
                    this.hpr(o, i, animBuffList);
                  }
                } else if (Log_1.Log.CheckError()) {
                  Log_1.Log.Error("Preload", 4, "[预加载]特效的mesh没有配置动画", ["父特效", t.GetName()], ["子特效", n.GetName()]);
                }
              }
            }
          }
        }
      }
      e.Stop();
    }
  }
  static ypr(e, o) {
    PreloadControllerNew.$j1.Start();
    if (e.ActorClass) {
      for (const r of e.ActorClass) {
        o.AddActorClass(r);
      }
    }
    if (e.Animations) {
      for (const a of e.Animations) {
        o.AddAnimation(a);
      }
    }
    if (e.Effects) {
      for (const i of e.Effects) {
        o.AddEffect(i);
        var t = o.GetEntityAssetElement()?.Entity?.Id;
        if (t) {
          ModelManager_1.ModelManager.PreloadModelNew.PreCreateEffect.AddPreCreateEffect(t, i);
        }
      }
    }
    if (e.Audios) {
      for (const n of e.Audios) {
        o.AddAudio(n);
      }
    }
    if (e.Materials) {
      for (const l of e.Materials) {
        o.AddMaterial(l);
      }
    }
    if (e.Meshes) {
      for (const _ of e.Meshes) {
        o.AddMesh(_);
      }
    }
    if (e.AnimationBlueprints) {
      for (const s of e.AnimationBlueprints) {
        o.AddAnimationBlueprint(s);
      }
    }
    if (e.Others) {
      for (const d of e.Others) {
        o.AddOther(d);
      }
    }
    PreloadControllerNew.$j1.Stop();
  }
  static OnLeaveLevel() {
    var e;
    var o = ModelManager_1.ModelManager.PreloadModelNew;
    o.CommonAssetElement.Clear();
    for ([, e] of o.AllEntityAssetMap) {
      if (e.LoadState !== 4) {
        e.Clear();
      }
    }
    o.ClearEntityAsset();
    o.ClearPbEntityAsset();
    o.ClearPreloadResource();
    o.CleanPlotAsset();
    return true;
  }
}
(exports.PreloadControllerNew = PreloadControllerNew).Hj1 = Stats_1.Stat.Create("PreloadController.CollectAssetBySkillId");
PreloadControllerNew.a31 = Stats_1.Stat.Create("PreloadController.AddBulletAsset");
PreloadControllerNew.h31 = Stats_1.Stat.Create("PreloadController.CopyBulletAssets");
PreloadControllerNew.$j1 = Stats_1.Stat.Create("PreloadController.CopyAssets"); //# sourceMappingURL=PreloadControllerNew.js.map