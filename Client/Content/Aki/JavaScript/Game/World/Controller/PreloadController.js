"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PreloadController = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const LogProfiler_1 = require("../../../Core/Common/LogProfiler");
const Stats_1 = require("../../../Core/Common/Stats");
const Queue_1 = require("../../../Core/Container/Queue");
const AiBaseById_1 = require("../../../Core/Define/ConfigQuery/AiBaseById");
const AiStateMachineConfigById_1 = require("../../../Core/Define/ConfigQuery/AiStateMachineConfigById");
const GameplayCueById_1 = require("../../../Core/Define/ConfigQuery/GameplayCueById");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const StatSeconds_1 = require("../../../Core/Performance/StatSeconds");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const DataTableUtil_1 = require("../../../Core/Utils/DataTableUtil");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const IComponent_1 = require("../../../UniverseEditor/Interface/IComponent");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const PreCreateEffect_1 = require("../../Effect/PreCreateEffect");
const GlobalData_1 = require("../../GlobalData");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const AutoAttachDefine_1 = require("../../Module/AutoAttach/AutoAttachDefine");
const NpcIconDefine_1 = require("../../Module/NPC/NpcIconDefine");
const RoleDefine_1 = require("../../Module/RoleUi/RoleDefine");
const CharacterSplineMoveComponent_1 = require("../../NewWorld/Character/Common/Component/CharacterSplineMoveComponent");
const RenderConfig_1 = require("../../Render/Config/RenderConfig");
const PreloadModel_1 = require("../Model/PreloadModel");
const PreloadConstants_1 = require("./PreloadConstants");
const VISION_DATA_PATH = "/Game/Aki/Character/Vision/DT_Vision.DT_Vision";
const commonMajorPaths = ["/Game/Aki/Data/Fight/DT_CommonNewBulletDataMain.DT_CommonNewBulletDataMain", "/Game/Aki/Data/Fight/DT_CommonHitEffect.DT_CommonHitEffect", "/Game/Aki/Character/Vision/DT_Vision.DT_Vision", "/Game/Aki/Data/Fight/DT_Common_Role_SkillInfo.DT_Common_Role_SkillInfo", "/Game/Aki/Data/Fight/DT_Common_Vision_SkillInfo.DT_Common_Vision_SkillInfo", "/Game/Aki/Data/Fight/CDT_CharacterFightInfo.CDT_CharacterFightInfo", "/Game/Aki/Data/Fight/DT_CaughtInfo.DT_CaughtInfo", "/Game/Aki/Data/Fight/DA_DefaultBulletConfig.DA_DefaultBulletConfig", "/Game/Aki/Data/Fight/DT_QteTag.DT_QteTag"];
const commonOtherPaths = ["/Game/Aki/UI/UIResources/UiFight/Atlas/SP_FightPutong.SP_FightPutong", "/Game/Aki/Character/BaseCharacter/Abilities/GA/GA_Base.GA_Base_C", "/Game/Aki/Effect/UI/Niagaras/Common/NS_Fx_LGUI_FightQTE_001.NS_Fx_LGUI_FightQTE_001", "/Game/Aki/Effect/UI/Niagaras/Common/NS_Fx_LGUI_FightQTE_002.NS_Fx_LGUI_FightQTE_002", "/Game/Aki/Effect/MaterialController/Common/DA_Fx_Character_ChangeRole.DA_Fx_Character_ChangeRole", "/Game/Aki/Effect/BluePrint/BP_FX_Common/BP_Fx_Scanning.BP_Fx_Scanning_C", "/Game/Aki/Effect/BluePrint/BP_FX_Common/BP_Fx_Control_Obj.BP_Fx_Control_Obj_C", "/Game/Aki/Data/Fight/BulletCampAsset/DT_AllBulletCampAsset.DT_AllBulletCampAsset", "/Game/Aki/Data/Fight/BulletDataAsset/DT_AllBulletLogicTypeNew.DT_AllBulletLogicTypeNew", "/Game/Aki/Data/Fight/CommonGB/DT_AllKuroBpDataGroup.DT_AllKuroBpDataGroup", "/Game/Aki/Effect/Niagara/NI_Common/NS_Fx_Control_Obj_Beam.NS_Fx_Control_Obj_Beam", "/Game/Aki/Effect/MaterialController/Common/DA_Fx_HuluWarning.DA_Fx_HuluWarning", "/Game/Aki/Data/Fight/UI/DT_PanelQte.DT_PanelQte", "/Game/Aki/Data/Qte/DT_CommonQte.DT_CommonQte", "/Game/Aki/UI/Framework/PredefColor/DT_PredefColor.DT_PredefColor", "/Game/Aki/Effect/MaterialController/Common/DA_Fx_UIChangeRole.DA_Fx_UIChangeRole", RenderConfig_1.RenderConfig.CharMaterialContainerDataPath, RenderConfig_1.RenderConfig.EmptyMaterialPath, RoleDefine_1.UI_ABP_PATH, NpcIconDefine_1.HEADSTATE_SCALE_CURVE_PATH, NpcIconDefine_1.DIALOG_SCALE_CURVE_PATH, AutoAttachDefine_1.INERTIA_CURVE_PATH, AutoAttachDefine_1.VELOCITY_CURVE_PATH, AutoAttachDefine_1.BOUNDARY_CURVE_PATH, PreloadConstants_1.ACC_LERP_CURVE_PATH, PreloadConstants_1.SWIM_ACCELERATOR_CURVE_PATH, PreloadConstants_1.SWIM_ROTATOR_CURVE_PATH, PreloadConstants_1.BASE_MOVE_INHERIT_CURVE_PATH, CharacterSplineMoveComponent_1.CharacterSplineMoveComponent.DaPath, PreloadConstants_1.ANGLE_TO_STEP_FREQUENCY_CURVE_PATH, PreloadConstants_1.ANGLE_TO_STEP_LENGTH_CURVE_PATH, PreloadConstants_1.BATTLE_SETTLEMENT_TIME_SCALE_CURVE_PATH];
const commonEffectPaths = ["/Game/Aki/Data/Camera/DA_FightCameraConfig.DA_FightCameraConfig", "/Game/Aki/Data/Fight/BulletDataAsset/DA_CommonBullet.DA_CommonBullet", "/Game/Aki/Effect/EffectGroup/Common/DA_Fx_Group_WeaponEnd.DA_Fx_Group_WeaponEnd", "/Game/Aki/Effect/EffectGroup/Common/DA_Fx_Group_ChangeRole.DA_Fx_Group_ChangeRole", "/Game/Aki/Effect/EffectGroup/Common/DA_Fx_Group_ChangeRoleStart.DA_Fx_Group_ChangeRoleStart", "/Game/Aki/Effect/EffectGroup/Common/DA_Fx_Group_Control_Obj_Hand.DA_Fx_Group_Control_Obj_Hand", "/Game/Aki/Effect/DataAsset/Niagara/BigWorld/DA_Fx_Animal_Vanish.DA_Fx_Animal_Vanish", "/Game/Aki/Effect/EffectGroup/Common/DA_Fx_Group_XieZou_Qidong00.DA_Fx_Group_XieZou_Qidong00", "/Game/Aki/Effect/EffectGroup/Common/DA_Fx_Group_XieZou_Gaowen00.DA_Fx_Group_XieZou_Gaowen00", "/Game/Aki/Effect/MaterialController/Common/DA_Fx_HuluStart.DA_Fx_HuluStart", "/Game/Aki/Effect/MaterialController/Common/DA_Fx_TimeFreeze_LimitDodge.DA_Fx_TimeFreeze_LimitDodge", "/Game/Aki/Effect/EffectGroup/Common/DA_Fx_Group_Press_Smoke.DA_Fx_Group_Press_Smoke", "/Game/Aki/Effect/EffectGroup/Common/DA_Fx_Group_Hook_Miaodian_Lock.DA_Fx_Group_Hook_Miaodian_Lock", "/Game/Aki/Effect/EffectGroup/Common/DA_Fx_Group_Hook_Miaodian_LockDown.DA_Fx_Group_Hook_Miaodian_LockDown", "/Game/Aki/Effect/EffectGroup/Common/DA_Fx_Group_ChangeRole_Play.DA_Fx_Group_ChangeRole_Play"];
const animSequenceBasesRef = (0, puerts_1.$ref)(UE.NewArray(UE.AnimSequenceBase));
const animNotifyEventsRef = (0, puerts_1.$ref)(UE.NewArray(UE.AnimNotifyEvent));
const animationAssetSetRef = (0, puerts_1.$ref)(UE.NewSet(UE.AnimationAsset));
const animBuffList = new Array();
const COMMON_STATE_MACHINE = "SM_Common";
const NEED_PRELOAD_DISTANCE = 4000000;
class PreloadController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return true;
  }
  static OnClear() {
    return true;
  }
  static DoPreload(o, a) {
    var e = ModelManager_1.ModelManager.PreloadModel;
    if (e.IsUsePreload) {
      e.HoldPreloadObject.Clear();
      e.ResourcesLoadTime.length = 0;
      const r = StatSeconds_1.StatSecondsAccumulator.Create("DoPreload");
      r.Start();
      const i = ModelManager_1.ModelManager.GameModeModel;
      i.PreloadCommonProfiler.Restart();
      this.jfr(e => {
        if (e) {
          i.PreloadCommonProfiler.Stop();
          i.PreloadEntitiesProfiler.Restart();
          o(true);
          const t = StatSeconds_1.StatSecondsAccumulator.Create("PreloadEntities");
          t.Start();
          this.Wfr(ModelManager_1.ModelManager.GameModeModel.PreloadEntitiesProfiler, e => {
            t.Stop();
            r.Stop();
            ModelManager_1.ModelManager.GameModeModel.PreloadEntitiesProfiler.Stop();
            a(e);
          });
        } else {
          r.Stop();
          i.PreloadCommonProfiler.Stop();
          o(false);
          a?.(false);
        }
      });
    } else {
      o(true);
      a(true);
    }
  }
  static jfr(n) {
    const s = StatSeconds_1.StatSecondsAccumulator.Create("PreloadLoadCommon");
    s.Start();
    var e = ModelManager_1.ModelManager.PreloadModel;
    const _ = ConfigManager_1.ConfigManager.WorldConfig;
    var t = ModelManager_1.ModelManager.GameModeModel;
    const f = e.CommonAssetElement;
    if (ModelManager_1.ModelManager.CreatureModel.EnableEntityLog && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Preload", 3, "预加载:PreloadLoadCommon(开始)");
    }
    this.Kfr(t.PreloadCommonProfiler, e => {
      if (e) {
        e = ModelManager_1.ModelManager.GameModeModel.PreloadCommonProfiler.CreateChild("搜集公共资源的次要资源", true);
        e.Start();
        _.GetRoleCommonSkillInfo();
        _.GetVisionCommonSkillInfo();
        _.GetCommonBulletData();
        for (const a of commonOtherPaths) {
          f.AddOtherAsset(a);
        }
        for (const r of DataTableUtil_1.dataTablePaths.values()) {
          f.AddOtherAsset(r);
        }
        for (const i of commonEffectPaths) {
          f.AddEffectAsset(i);
        }
        var t = AiStateMachineConfigById_1.configAiStateMachineConfigById.GetConfig(COMMON_STATE_MACHINE);
        for (const l of JSON.parse(t.StateMachineJson).Nodes) {
          this.CollectAssetByStateMachineNode(f, l);
        }
        e.Stop();
        const o = ModelManager_1.ModelManager.GameModeModel.PreloadCommonProfiler.CreateChild("加载公共资源次要资源", true);
        o.Restart();
        this.CheckPreloadByAssetElement(f, o, e => {
          o.Stop();
          s.Stop();
          if (e) {
            if (ModelManager_1.ModelManager.CreatureModel.EnableEntityLog && Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("Preload", 3, "预加载:PreloadLoadCommon(结束)");
            }
            n(true);
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("World", 3, "[PreloadManager.PreloadLoadCommon] 预加载公共资源失败。");
            }
            n(false);
          }
        }, 0);
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("World", 3, "[PreloadManager.PreloadLoadCommon] 预加载公共资源Major失败。");
        }
        n(false);
      }
    });
  }
  static Kfr(e, o) {
    var t = ModelManager_1.ModelManager.PreloadModel.CommonAssetElement;
    const a = StatSeconds_1.StatSecondsAccumulator.Create("PreloadCommonMajor");
    const r = e.CreateChild("收集并加载公共的主要资源", true);
    if (ModelManager_1.ModelManager.CreatureModel.EnableEntityLog && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Preload", 3, "预加载:PreloadCommonMajor(开始)");
    }
    a.Start();
    r.Restart();
    for (const l of commonMajorPaths) {
      t.AddMajorAsset(l);
    }
    var i = new Array();
    for (const n of t.MajorAssets) {
      i.push(n);
    }
    this.Xfr(t, t.MajorAssets, i, r, (e, t) => {
      r.Stop();
      a.Stop();
      if (e) {
        if (ModelManager_1.ModelManager.CreatureModel.EnableEntityLog && Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Preload", 3, "预加载:PreloadCommonMajor(结束)");
        }
        o?.(e);
      } else {
        o(false);
      }
    });
  }
  static Wfr(e, o) {
    const a = ModelManager_1.ModelManager.PreloadModel;
    if (a.LoadAssetOneByOneState) {
      this.$fr(e, o);
    } else {
      var r = ModelManager_1.ModelManager.CreatureModel.GetAllEntities();
      if (r.length === 0) {
        o(true);
      } else {
        var i = Vector_1.Vector.Create(ModelManager_1.ModelManager.GameModeModel.BornLocation);
        var l = Vector_1.Vector.Create();
        var n = new Array();
        for (const _ of r) {
          var s = _.Entity.GetComponent(0);
          if (!_.IsInit && !s.GetLoading() && !s.GetRemoveState() && s.GetEntityType() !== Protocol_1.Aki.Protocol.kks.Proto_Custom) {
            if (s.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Player || (s = s.GetLocation(), l.X = s.X, l.Y = s.Y, l.Z = s.Z, Vector_1.Vector.DistSquared(i, l) <= NEED_PRELOAD_DISTANCE)) {
              n.push(_);
              a.AddNeedWaitEntity(_.Id);
            }
          }
        }
        let t = n.length;
        if (ModelManager_1.ModelManager.CreatureModel.EnableEntityLog && Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Preload", 3, "过滤需要预加载的实体", ["当前实体总数", r.length], ["需要预加载的实体个数", t]);
        }
        if (t === 0) {
          o(true);
        } else {
          for (const f of n) {
            const c = f.Entity.GetComponent(0);
            if (!f.IsInit && !c.GetLoading()) {
              if (ControllerHolder_1.ControllerHolder.CreatureController.CheckEnableEntityLog(f) && Log_1.Log.CheckInfo()) {
                Log_1.Log.Info("Preload", 3, "预加载实体:开始", ["CreatureDataId", c.GetCreatureDataId()], ["PbDataId", c.GetPbDataId()], ["Reason", "PreloadController.PreloadEntities"], ["Count", t]);
              }
              this.PreloadEntity(f, e, e => {
                t--;
                if (ControllerHolder_1.ControllerHolder.CreatureController.CheckEnableEntityLog(f) && Log_1.Log.CheckInfo()) {
                  Log_1.Log.Info("Preload", 3, "预加载实体:结束", ["CreatureDataId", c.GetCreatureDataId()], ["PbDataId", c.GetPbDataId()], ["预加载结果", e], ["调用代码位置", "PreloadController.PreloadEntities"], ["Count", t]);
                }
                a.RemoveNeedWaitEntity(f.Id);
                if (t <= 0) {
                  o?.(e);
                }
              });
            }
          }
        }
      }
    }
  }
  static $fr(e, t) {
    var o = ModelManager_1.ModelManager.CreatureModel.GetAllEntities();
    let a = undefined;
    if (e) {
      (a = e.CreateChild("逐个加载Entity，实体个数:" + o.length, true)).Start();
    }
    var r = new Array();
    for (const i of o) {
      r.push(i);
    }
    this.Yfr(r, 0, a, e => {
      a?.Stop();
      t(e);
    });
  }
  static Yfr(t, o, a, r) {
    var e;
    var i;
    if (o >= t.length) {
      r(true);
    } else {
      i = (e = t[o]).Entity.GetComponent(0);
      if (!e || i.GetRemoveState()) {
        this.Yfr(t, o + 1, a, e => {
          r(e);
        });
      } else {
        this.PreloadEntity(e, a, e => {
          if (e) {
            if (o < t.length) {
              this.Yfr(t, o + 1, a, e => {
                r(e);
              });
            } else {
              r(true);
            }
          } else {
            r(false);
          }
        });
      }
    }
  }
  static PreloadEntity(l, t, n) {
    if (ModelManager_1.ModelManager.PreloadModel.IsUsePreload) {
      const s = l.Entity.GetComponent(0);
      const _ = StatSeconds_1.StatSecondsAccumulator.Create(`CreatureDataId:${s.GetCreatureDataId()}, PbDataId:${s.GetPbDataId()}`);
      _.Start();
      let o = undefined;
      let e = undefined;
      let a = undefined;
      let r = undefined;
      let i = undefined;
      if (t) {
        o = t.CreateChild(`预加载实体, CreatureDataId:${s.GetCreatureDataId()}, PbDataId:${s.GetPbDataId()}`, true);
        e = o.CreateChild("搜集实体主要资源", true);
        a = o.CreateChild("搜集实体次要资源", true);
        r = o.CreateChild("预加载实体主要资源", true);
        i = o.CreateChild("预加载实体次要资源", true);
      }
      o?.Start();
      if (s.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Custom) {
        o?.Stop();
        _.Stop();
        n?.(true);
      } else {
        e?.Start();
        const f = this.Jfr(l);
        if (f) {
          o?.SetDescribe(f.CharacterPath + ", 优先级:" + f.GetLoadPriority());
          e?.Stop();
          if (f && f.LoadState === 3) {
            o?.Stop();
            _.Stop();
            n?.(true);
          } else if (f.LoadState !== 0) {
            _.Stop();
            o?.Stop();
            n?.(false);
          } else {
            f.LoadState = 1;
            if (s.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Player && ControllerHolder_1.ControllerHolder.CreatureController.CheckEnableEntityLog(l) && Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("Preload", 3, "预加载实体:预加载主要资源（开始）", ["CreatureDataId", s.GetCreatureDataId()], ["PbDataId", s.GetPbDataId()]);
            }
            r?.Start();
            this.zfr(f, r, e => {
              r?.Stop();
              if (s.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Player && ControllerHolder_1.ControllerHolder.CreatureController.CheckEnableEntityLog(l) && Log_1.Log.CheckInfo()) {
                Log_1.Log.Info("Preload", 3, "预加载实体:预加载主要资源（结束）", ["CreatureDataId", s.GetCreatureDataId()], ["PbDataId", s.GetPbDataId()], ["结果", e]);
              }
              if (e) {
                if (f && f.LoadState !== 4) {
                  a?.Start();
                  if (this.Zfr(f)) {
                    a?.Stop();
                    const t = StatSeconds_1.StatSecondsAccumulator.Create(`CheckPreloadEntityMinor: CreatureDataId:${s.GetCreatureDataId()} PbDataI:${s.GetPbDataId()}`);
                    t.Start();
                    if (s.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Player && ControllerHolder_1.ControllerHolder.CreatureController.CheckEnableEntityLog(l) && Log_1.Log.CheckInfo()) {
                      Log_1.Log.Info("Preload", 3, "预加载实体:预加载次要资源（开始）", ["CreatureDataId", s.GetCreatureDataId()], ["PbDataId", s.GetPbDataId()]);
                    }
                    i?.Start();
                    this.CheckPreloadByAssetElement(f, i, e => {
                      t.Stop();
                      i?.Stop();
                      if (s.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Player && ControllerHolder_1.ControllerHolder.CreatureController.CheckEnableEntityLog(l) && Log_1.Log.CheckInfo()) {
                        Log_1.Log.Info("Preload", 3, "预加载实体:预加载次要资源（结束）", ["CreatureDataId", s.GetCreatureDataId()], ["PbDataId", s.GetPbDataId()], ["结果", e]);
                      }
                      if (f && f.LoadState !== 4) {
                        if (e) {
                          f.LoadState = 3;
                          _.Stop();
                          o?.Stop();
                          s.SetPreloadFinished(true);
                          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PreloadEntityFinished, f.EntityHandle);
                          n?.(true);
                        } else {
                          if (Log_1.Log.CheckError()) {
                            Log_1.Log.Error("World", 3, "[PreloadManager.PreloadEntity] 预加载实体次要资源是失败。", ["CreatureDataId", s?.GetCreatureDataId()], ["PbDataId", s?.GetPbDataId()]);
                          }
                          _.Stop();
                          n?.(false);
                        }
                      } else {
                        _.Stop();
                        n?.(false);
                      }
                    }, 0);
                  } else {
                    _.Stop();
                    a?.Stop();
                    o?.Stop();
                    n?.(false);
                  }
                } else {
                  _.Stop();
                  o?.Stop();
                  n?.(false);
                }
              } else {
                if (Log_1.Log.CheckError()) {
                  Log_1.Log.Error("World", 3, "[PreloadManager.PreloadEntity] 预加载实体失败。", ["CreatureDataId", s.GetCreatureDataId()], ["PbDataId", s.GetPbDataId()]);
                }
                _.Stop();
                o?.Stop();
                n?.(false);
              }
            });
          }
        } else {
          e?.Stop();
          o?.Stop();
          _.Stop();
          n?.(false);
        }
      }
    } else {
      n(true);
    }
  }
  static RemovePreloadEntity(e) {
    var t = ModelManager_1.ModelManager.PreloadModel;
    var o = t.AllEntityAssetMap.get(e);
    if (o && o.LoadState !== 4) {
      o.LoadState = 4;
      t.HoldPreloadObject.RemoveEntityAssets(o.EntityHandle.Id);
      for (const a of o.AssetPathSet) {
        t.RemovePreloadResource(a);
      }
      t.RemoveEntityAsset(e);
    }
  }
  static HasAsset(e) {
    return ModelManager_1.ModelManager.PreloadModel.PreloadAssetMap.has(e);
  }
  static IsEntityPreload(e) {
    return ModelManager_1.ModelManager.PreloadModel.AllEntityAssetMap.has(e);
  }
  static zfr(o, e, a) {
    if (o.MajorAssets.size) {
      const r = StatSeconds_1.StatSecondsAccumulator.Create("PreloadEntityMajor:" + o.CreatureDataComponent.GetCreatureDataId());
      r.Start();
      var t = new Array();
      for (const i of o.MajorAssets) {
        t.push(i);
      }
      this.Xfr(o, o.MajorAssets, t, e, (e, t) => {
        r.Stop();
        if (e && (t = t.get(o.BlueprintClassPath))?.IsValid()) {
          this.epr(o, t);
          this.tpr.Start();
          a?.(e);
        } else {
          this.tpr.Start();
          a(false);
        }
        this.tpr.Stop();
      });
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Preload", 3, "实体预加载主要资源MajorAssets为空。", ["CreatureDataId", o.CreatureDataComponent.GetCreatureDataId()], ["PbDataId", o.CreatureDataComponent.GetPbDataId()], ["ModelId", o.CreatureDataComponent.GetModelId()]);
      }
      a?.(false);
    }
  }
  static EntityIsDone(e) {
    return ModelManager_1.ModelManager.PreloadModel.AllEntityAssetMap.get(e)?.LoadState === 3;
  }
  static Jfr(e) {
    var t = e.Entity.GetComponent(0);
    var o = ModelManager_1.ModelManager.PreloadModel;
    var a = o.AllEntityAssetMap.get(t.GetCreatureDataId());
    if (a) {
      return a;
    }
    var r = StatSeconds_1.StatSecondsAccumulator.Create("CollectAssetByEntityMajor:" + t.GetCreatureDataId());
    r.Start();
    (a = new PreloadModel_1.EntityAssetElement(e)).LoadState = 0;
    o.AddEntityAsset(t.GetCreatureDataId(), a);
    const i = t.GetModelConfig();
    if (i) {
      if (t.ModelBlueprintPath?.length) {
        a.BlueprintClassPath = t.ModelBlueprintPath;
        a.AddMajorAsset(t.ModelBlueprintPath);
      }
      e = i.蓝图.ToAssetPathName();
      if (e.length > 0) {
        o = (a.BlueprintClassPath = e).lastIndexOf("/");
        a.CharacterPath = e.substring(0, o);
        a.AddMajorAsset(e);
      }
      if (t.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Player || t.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Monster || t.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Vision) {
        o = a.BlueprintClassPath;
        if (!o || o.length === 0 || o === "None") {
          e = t.GetModelId();
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("World", 3, "[PreloadController.CollectAssetByEntityMajor] 预加载的实体没有配置蓝图。", ["CreatureDataId", t.GetCreatureDataId()], ["PbDataId", t.GetPbDataId()], ["ModelId", e], ["BlueprintClassPath", o]);
          }
          if (GlobalData_1.GlobalData.IsPlayInEditor) {
            const i = DataTableUtil_1.DataTableUtil.GetDataTableRowFromName(0, e.toString());
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("World", 3, "[PreloadController.CollectAssetByEntityMajor] 预加载的实体没有配置蓝图(直接从表中查询)。", ["ModelId", e], ["BlueprintClassPath", i?.蓝图.ToAssetPathName()]);
            }
          }
          r.Stop();
          return;
        }
        e = ConfigManager_1.ConfigManager.WorldConfig.GetCharacterFightInfo(o);
        o = e?.SkillDataTable.ToAssetPathName();
        if (o && o.length > 0 && o !== "None") {
          a.AddMajorAsset(o);
        }
        o = e?.BulletDataTable.ToAssetPathName();
        if (o && o.length > 0 && o !== "None") {
          a.AddMajorAsset(o);
        }
        o = e?.PartHitEffect?.ToAssetPathName();
        if (o && o.length > 0 && o !== "None") {
          a.PartHitEffectPath = o;
          a.AddMajorAsset(o);
        }
        o = e?.HitEffectTable.ToAssetPathName();
        if (o && o.length > 0 && o !== "None") {
          a.AddMajorAsset(o);
        }
        o = this.GetCurCharacterLoadType();
        if (o !== 0) {
          this.LGn(e?.SkillDataTableMap, o, a);
          this.LGn(e?.BulletDataTableMap, o, a);
          this.LGn(e?.HitEffectTableMap, o, a);
        }
      }
      r.Stop();
      return a;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("World", 3, "[PreloadManager.CollectAssetByCreatureMajor] 不存在实体配置表，预加载失败。", ["CreatureDataId", t.GetCreatureDataId()], ["PbDataId", t.GetPbDataId()]);
    }
    r.Stop();
  }
  static LGn(e, t, o) {
    if ((e &&= e.Get(t)?.ToAssetPathName()) && e.length > 0 && e !== "None") {
      o.AddMajorAsset(e);
    }
  }
  static Zfr(e) {
    var t;
    var o;
    var a;
    var r;
    var i;
    return !e.CollectMinorAsset && ((t = StatSeconds_1.StatSecondsAccumulator.Create("CollectAssetByEntityMinor:" + e.CreatureDataComponent.GetCreatureDataId(), e.CreatureDataComponent.GetPbDataId().toString())).Start(), e.CollectMinorAsset = true, o = this.ipr(e), a = this.rpr(e), r = this.CollectAssetByBullet(e), i = this.CollectAssetByStateMachine(e), this.npr(e), this.spr(e), t.Stop(), o) && a && r && i;
  }
  static CheckPreloadByAssetElement(t, e, o, a = 0) {
    let r = undefined;
    (r = e ? e.CreateChild(`CheckPreloadByAssetElement 层:${a} 个数:${t.NeedLoadCount()}`, true) : r)?.Start();
    if (t.NeedLoadCount()) {
      e = new Queue_1.Queue();
      if (t.OtherAssetSet.size > 0) {
        e.Push([6, t.OtherAssetSet]);
      }
      if (t.AnimationAssetSet.size > 0) {
        e.Push([0, t.AnimationAssetSet]);
      }
      if (t.AnimationBlueprintClassAssetSet.size > 0) {
        e.Push([5, t.AnimationBlueprintClassAssetSet]);
      }
      if (t.MeshAssetSet.size > 0) {
        e.Push([3, t.MeshAssetSet]);
      }
      if (t.AudioAssetSet.size > 0) {
        e.Push([2, t.AudioAssetSet]);
      }
      if (t.EffectAssetSet.size > 0) {
        if (PreCreateEffect_1.PreCreateEffect.IsNeedPreCreateEffect()) {
          e.Push([1, t.EffectAssetSet]);
        } else {
          t.EffectAssetSet.clear();
        }
      }
      this.apr(t, r, e, e => {
        if (t.NeedLoadCount()) {
          this.CheckPreloadByAssetElement(t, r, e => {
            o(e);
          }, a + 1);
        } else {
          r?.Stop();
          o(!t.HasError);
        }
      });
    } else {
      r?.Stop();
      o(true);
    }
  }
  static apr(n, s, _, f) {
    if (_.Size === 0) {
      f(true);
    } else {
      var e = _.Pop();
      const c = e[0];
      e = e[1];
      const d = StatSeconds_1.StatSecondsAccumulator.Create(`LoadAssetsByQueue: ${PreloadModel_1.preloadAssetTypeForName.get(c)}, 个数:${e.size}`);
      let l = undefined;
      if (s) {
        l = s.CreateChild(PreloadModel_1.preloadAssetTypeForName.get(c) + " 个数:" + e.size, true);
      }
      d.Start();
      l?.Start();
      if (e.size === 0) {
        l?.Stop();
        d.Stop();
        f(true);
      } else {
        var t = new Array();
        for (const o of e) {
          t.push(o);
        }
        this.Xfr(n, e, t, l, (e, t) => {
          l?.Stop();
          d.Stop();
          if (!e) {
            n.HasError = true;
          }
          if (c === 0) {
            animBuffList.length = 0;
            for (var [, o] of t) {
              if (o.IsA(UE.AnimMontage.StaticClass())) {
                this.hpr(n, o, animBuffList);
              } else if (o.IsA(UE.AnimSequenceBase.StaticClass())) {
                this.lpr(n, o, animBuffList);
              }
            }
            this.CollectAssetByBuffIdList(n, animBuffList);
          }
          if (c === 1) {
            for (var [a, r] of t) {
              if (r.IsA(UE.EffectModelBase.StaticClass()) && n instanceof PreloadModel_1.EntityAssetElement) {
                ModelManager_1.ModelManager.PreloadModel.PreCreateEffect.AddPreCreateEffect(n.EntityHandle.Id, a);
              }
              this.upr(n, r);
            }
          }
          if (c === 5) {
            for (var [, i] of t) {
              this.cpr(n, i);
            }
          }
          if (_.Size === 0) {
            f(e);
          } else {
            this.apr(n, s, _, e => {
              f(e);
            });
          }
        });
      }
    }
  }
  static Xfr(i, e, l, t, n) {
    var s = ModelManager_1.ModelManager.PreloadModel;
    if (s.LoadAssetOneByOneState) {
      this.LoadAssetsOneByOne(i, e, l, t, n);
    } else {
      let o = undefined;
      (o = t ? t.CreateChild("批量预加载资源", true) : o)?.Start();
      let a = 0;
      let r = 0;
      const _ = new Map();
      for (const f of l) {
        e.delete(f);
        s.AddPreloadResource(f);
        ResourceSystem_1.ResourceSystem.LoadAsync(f, UE.Object, (e, t) => {
          if (e?.IsValid()) {
            a++;
            i.AddObject(t, e);
            _.set(t, e);
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("World", 3, "[PreloadManager.PreloadAssetsInternal] 批量预加载资源失败，asset.IsValid() = false。", ["Path", t]);
            }
            r++;
          }
          if (!(r + a < l.length)) {
            o?.Stop();
            n?.(r === 0, _);
          }
        }, i.GetLoadPriority());
      }
    }
  }
  static LoadAssetsOneByOne(e, t, o, a, r) {
    let i = undefined;
    if (a) {
      (i = a.CreateChild("逐个加载资源列表，资源个数:" + t.size, true)).Start();
    }
    const l = new Map();
    this.LoadAssetsRecursive(e, t, o, 0, i, l, e => {
      i?.Stop();
      r(e, l);
    });
  }
  static LoadAssetsRecursive(a, r, i, l, n, s, _) {
    if (i.length === 0 || l === i.length) {
      _(true);
    } else {
      const f = i[l];
      let o = undefined;
      if (n) {
        (o = n.CreateChild(`加载资源:${f} `, true)).Start();
      }
      r.delete(f);
      ModelManager_1.ModelManager.PreloadModel.AddPreloadResource(f);
      ResourceSystem_1.ResourceSystem.LoadAsync(f, UE.Object, (e, t) => {
        o?.Stop();
        ModelManager_1.ModelManager.PreloadModel.AddResourcesLoadTime([t, o ? o.Time : 0]);
        if (e) {
          if (e.IsValid()) {
            a.AddObject(f, e);
            s.set(t, e);
            if (l < i.length) {
              this.LoadAssetsRecursive(a, r, i, l + 1, n, s, e => {
                _(e);
              });
            } else {
              _?.(true);
            }
          } else {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("World", 3, "[PreloadManager.LoadAssetsRecursive] asset.IsValid() = false。", ["资源Path", t]);
            }
            _?.(false);
          }
        } else {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("World", 3, "[PreloadManager.LoadAssetsRecursive] 预加载资源失败, asset = undefined。", ["资源Path", t]);
          }
          _?.(false);
        }
      }, a.GetLoadPriority());
    }
  }
  static LoadAsset(e, t) {}
  static npr(e) {}
  static spr(t) {
    if (t.PartHitEffectPath?.length) {
      var e = undefined;
      if (!(e = ResourceSystem_1.ResourceSystem.GetLoadedAsset(t.PartHitEffectPath, UE.BP_PartHitEffect_C))?.IsValid()) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("World", 3, "预加载部位资源失败。", ["Path", t.PartHitEffectPath], ["CreatureDataId", t.CreatureDataComponent.GetCreatureDataId()]);
        }
        t.PrintDebugInfo();
      }
      var o = e?.PartCollision;
      var a = o?.Num();
      if (a) {
        for (let e = 0; e < a; ++e) {
          var r = o.Get(e);
          var i = r.Audio?.ToAssetPathName();
          var r = r.Effect?.ToAssetPathName();
          if (i?.length && i !== "None" && t.AddEffectAsset(i) && t instanceof PreloadModel_1.EntityAssetElement) {
            ModelManager_1.ModelManager.PreloadModel.PreCreateEffect.AddPreCreateEffect(t.EntityHandle.Id, i);
          }
          if (r?.length && r !== "None" && t.AddEffectAsset(r) && t instanceof PreloadModel_1.EntityAssetElement) {
            ModelManager_1.ModelManager.PreloadModel.PreCreateEffect.AddPreCreateEffect(t.EntityHandle.Id, r);
          }
        }
      }
    }
  }
  static ipr(t) {
    var e = StatSeconds_1.StatSecondsAccumulator.Create("CollectAssetByModelConfig:" + t.CreatureDataComponent.GetCreatureDataId(), t.CreatureDataComponent.GetPbDataId().toString());
    e.Start();
    var o = t.CreatureDataComponent.GetModelConfig();
    if (!o) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("World", 3, "[PreloadManager.PreloadEntityActor] 不存在modelConfig。", ["PbDataId", t.CreatureDataComponent.GetPbDataId()]);
      }
      e.Stop();
      return false;
    }
    var a = o.动画蓝图.ToAssetPathName();
    if (a && a.length > 0 && a !== "None") {
      t.AddAnimationBlueprintClassAsset(a);
    }
    var a = o.网格体;
    if (UE.KismetSystemLibrary.IsValidSoftObjectReference(a)) {
      t.AddOtherAsset(a.ToAssetPathName());
    }
    var a = o.场景交互物.AssetPathName?.toString();
    if (a && a.length > 0 && a !== "None") {
      t.AddOtherAsset(a);
    }
    var r = o.常驻特效列表;
    var i = r?.Num();
    if (i) {
      for (let e = 0; e < i; ++e) {
        var l = r.GetKey(e);
        var l = r.Get(l).AssetPathName;
        t.AddEffectAsset(l.toString());
      }
    }
    a = o.DA.AssetPathName.toString();
    if (a && a !== "None") {
      t.AddOtherAsset(a);
    }
    e.Stop();
    return true;
  }
  static rpr(e) {
    var t;
    var o;
    var a = StatSeconds_1.StatSecondsAccumulator.Create("CollectAssetBySkill:" + e.CreatureDataComponent.GetCreatureDataId(), e.CreatureDataComponent.GetPbDataId().toString());
    a.Start();
    var r = e.CreatureDataComponent;
    if (r.GetEntityType() !== Protocol_1.Aki.Protocol.kks.Proto_Player && r.GetEntityType() !== Protocol_1.Aki.Protocol.kks.Proto_Monster && r.GetEntityType() !== Protocol_1.Aki.Protocol.kks.Proto_Vision) {
      a.Stop();
    } else {
      r = e.BlueprintClassPath;
      if ((t = ConfigManager_1.ConfigManager.WorldConfig.GetCharacterFightInfo(r)?.SkillDataTable.ToAssetPathName()) && t.length > 0 && t !== "None") {
        o = undefined;
        if ((o = ResourceSystem_1.ResourceSystem.GetLoadedAsset(t, UE.DataTable))?.IsValid()) {
          e.SkillDataTable = o;
        } else if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Character", 3, "[PreloadController.CollectAssetBySkill] 加载角色技能表失败。", ["Path", r], ["技能表Path", t]);
        }
      }
      e.AddOtherAsset(VISION_DATA_PATH);
      this.mpr(e);
      a.Stop();
    }
    return true;
  }
  static mpr(e) {
    var t = e.CreatureDataComponent;
    if (e.SkillDataTable) {
      const M = new Array();
      DataTableUtil_1.DataTableUtil.GetDataTableAllRowNamesFromTable(e.SkillDataTable, M);
      var o = new Array();
      for (const D of M) {
        var a = this.dpr(e, D);
        if (a) {
          this.CollectEntityAbility(e, a);
          this.CollectEntitySkillMontage(e, D, a);
          var r = a.SkillStartBuff;
          if (r?.Num()) {
            for (let e = 0; e < r.Num(); ++e) {
              var i = r.Get(e);
              if (i) {
                o.push(i);
              }
            }
          }
          var l = a.SkillEndBuff;
          if (l?.Num()) {
            for (let e = 0; e < l.Num(); ++e) {
              var n = l.Get(e);
              if (n) {
                o.push(n);
              }
            }
          }
        }
      }
      this.CollectAssetByBuffIdList(e, o);
    }
    var s = ConfigManager_1.ConfigManager.WorldConfig;
    var _ = s.GetCharacterFightInfo(e.BlueprintClassPath);
    var f = this.GetCurCharacterLoadType();
    if (f !== 0) {
      _ = _?.SkillDataTableMap.Get(f)?.ToAssetPathName();
      if (_ && _.length > 0 && _ !== "None") {
        var c = ResourceSystem_1.ResourceSystem.GetLoadedAsset(_, UE.DataTable);
        if (c) {
          const M = new Array();
          DataTableUtil_1.DataTableUtil.GetDataTableAllRowNamesFromTable(c, M);
          var d = new Array();
          for (const P of M) {
            var C = DataTableUtil_1.DataTableUtil.GetDataTableRow(c, P);
            if (C) {
              this.CollectEntityAbility(e, C);
              this.CollectEntitySkillMontage(e, P, C);
              var u = C.SkillStartBuff;
              if (u?.Num()) {
                for (let e = 0; e < u.Num(); ++e) {
                  var m = u.Get(e);
                  if (m) {
                    d.push(m);
                  }
                }
              }
              var g = C.SkillEndBuff;
              if (g?.Num()) {
                for (let e = 0; e < g.Num(); ++e) {
                  var A = g.Get(e);
                  if (A) {
                    d.push(A);
                  }
                }
              }
            }
          }
          this.CollectAssetByBuffIdList(e, d);
        }
      }
    }
    let M = undefined;
    if (t.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Player) {
      M = s.GetRoleCommonSkillRowNames();
    } else if (t.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Monster) {
      M = s.GetMonsterCommonSkillRowNames();
    } else if (t.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Vision) {
      M = s.GetVisionCommonSkillRowNames();
    }
    if (M) {
      for (const h of M) {
        var v = this.dpr(e, h);
        if (v) {
          this.CollectEntityAbility(e, v);
          this.CollectEntitySkillMontage(e, h, v);
        }
      }
    }
  }
  static fpr(e, t) {
    if (t) {
      var o = StatSeconds_1.StatSecondsAccumulator.Create("CollectAssetByBuffInfo");
      o.Start();
      if (t.GameplayCueIds) {
        for (const r of t.GameplayCueIds) {
          var a = GameplayCueById_1.configGameplayCueById.GetConfig(r);
          if (a) {
            if (a.Path.length) {
              e.AddEffectAsset(a.Path);
            }
            for (const i of a.Resources) {
              if (i.length) {
                e.AddEffectAsset(i);
              }
            }
          }
        }
      }
      o.Stop();
    }
  }
  static CollectAssetByBuffIdList(e, t) {
    if (t?.length) {
      var o = StatSeconds_1.StatSecondsAccumulator.Create("CollectAssetByBuffIdList");
      o.Start();
      var t = ConfigManager_1.ConfigManager.BuffItemConfig.GetBuffConfigs(e instanceof PreloadModel_1.EntityAssetElement ? e.EntityHandle.Id : -1, t);
      if (t) {
        for (const a of t) {
          this.fpr(e, a);
        }
      }
      o.Stop();
    }
  }
  static dpr(t, o) {
    let a = DataTableUtil_1.DataTableUtil.GetDataTableRow(t.SkillDataTable, o.toString());
    if (!a) {
      var r = ConfigManager_1.ConfigManager.WorldConfig;
      let e = undefined;
      if (t.CreatureDataComponent.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Player) {
        e = r.GetRoleCommonSkillInfo();
      } else if (t.CreatureDataComponent.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Vision) {
        e = r.GetVisionCommonSkillInfo();
      }
      if (e) {
        a = DataTableUtil_1.DataTableUtil.GetDataTableRow(e, o.toString());
      }
    }
    return a;
  }
  static CollectEntityAbility(e, t) {
    if (t && t.SkillMode === 1 && (t = t.SkillGA.AssetPathName.toString()) && t.length > 0 && t !== "None") {
      e.AddOtherAsset(t);
    }
  }
  static CollectEntitySkillMontage(t, o, e) {
    var a = e.Animations;
    var r = e.ExportSpecialAnim;
    if (a?.Num() || r?.Num()) {
      if (a?.Num()) {
        for (let e = 0; e < a.Num(); ++e) {
          var i = a.Get(e).AssetPathName.toString();
          if (i && i.length !== 0 && i !== "None") {
            t.AddAnimationAsset(i);
          }
        }
      }
      if (r?.Num()) {
        for (let e = 0; e < r.Num(); ++e) {
          var l = r.Get(e).AssetPathName.toString();
          if (l && l.length !== 0 && l !== "None") {
            t.AddAnimationAsset(l);
          }
        }
      }
    } else if (e.MontagePaths?.Num()) {
      var n = e.MontagePaths;
      for (let e = 0; e < n.Num(); ++e) {
        var s = n.Get(e);
        if (!s || s.length === 0) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("World", 3, "[PreloadManager.CollectEntitySkillMontage] 实体的MontagePath配置了空蒙太奇名称。", ["索引:", e], ["SkillId:", o], ["CreatureDataId:", t.CreatureDataComponent.GetCreatureDataId()], ["PbDataId:", t.CreatureDataComponent.GetPbDataId()]);
          }
        }
      }
    }
  }
  static ppr(t) {
    var e = new LogProfiler_1.LogProfiler("CollectAssetByCommonBullet耗时");
    e.Start();
    var o = StatSeconds_1.StatSecondsAccumulator.Create("CollectAssetByCommonBullet");
    o.Start();
    var a = ConfigManager_1.ConfigManager.WorldConfig.GetCommonBulletData();
    var r = DataTableUtil_1.DataTableUtil.GetDataTableAllRowFromTable(a);
    var i = ModelManager_1.ModelManager.PreloadModel;
    var l = r.length;
    for (let e = 0; e < l; ++e) {
      var n = r[e];
      var s = n.基础设置;
      var _ = n.逻辑设置;
      var f = n.表现效果设置;
      var n = n.执行逻辑;
      var s = s.命中判定类型预设;
      if (UE.KismetSystemLibrary.IsValidSoftObjectReference(s)) {
        i.CommonAssetElement.AddOtherAsset(s.ToAssetPathName());
      }
      var s = _.预设;
      if (UE.KismetSystemLibrary.IsValidSoftObjectReference(s)) {
        i.CommonAssetElement.AddOtherAsset(s.ToAssetPathName());
      }
      var _ = f.子弹特效DA;
      if (UE.KismetSystemLibrary.IsValidSoftObjectReference(_)) {
        i.CommonAssetElement.AddEffectAsset(_.ToAssetPathName());
      }
      var c = f.命中特效DA?.Num();
      var d = f.命中特效DA;
      if (c) {
        for (let e = 0; e < c; ++e) {
          var C = d.GetKey(e);
          var C = d.Get(C);
          var u = C?.ToAssetPathName();
          if (u && u?.length > 0 && u !== "None" && i.CommonAssetElement.AddEffectAsset(u)) {
            i.PreCreateEffect.AddPreCreateEffect(t, C.ToAssetPathName());
          }
        }
      }
      var s = f.命中时攻击者震屏;
      if (UE.KismetSystemLibrary.IsValidSoftClassReference(s)) {
        i.CommonAssetElement.AddOtherAsset(s.ToAssetPathName());
      }
      var _ = f.命中时受击者震屏;
      if (UE.KismetSystemLibrary.IsValidSoftClassReference(_)) {
        i.CommonAssetElement.AddOtherAsset(_.ToAssetPathName());
      }
      var s = n.GB组;
      if (UE.KismetSystemLibrary.IsValidSoftObjectReference(s)) {
        i.CommonAssetElement.AddOtherAsset(s.ToAssetPathName());
      }
      var m = n.命中后对攻击者应用GE的Id;
      if (m?.Num()) {
        for (let e = 0; e < m.Num(); ++e) {
          this.CollectAssetByCommonBulletBuff(t, Number(m.Get(e)));
        }
      }
      var g = n.命中后对受击者应用GE的Id;
      if (g?.Num()) {
        for (let e = 0; e < g.Num(); ++e) {
          this.CollectAssetByCommonBulletBuff(t, Number(g.Get(e)));
        }
      }
      var A = n.能量恢复类GE数组的Id;
      if (A?.Num()) {
        for (let e = 0; e < A.Num(); ++e) {
          this.CollectAssetByCommonBulletBuff(t, Number(A.Get(e)));
        }
      }
      var M = n.命中后对在场上角色应用的GE的Id;
      if (M?.Num()) {
        for (let e = 0; e < M.Num(); ++e) {
          this.CollectAssetByCommonBulletBuff(t, Number(M.Get(e)));
        }
      }
      var v = n.受击对象进入应用的GE的Id;
      if (v?.Num()) {
        for (let e = 0; e < v.Num(); ++e) {
          this.CollectAssetByCommonBulletBuff(t, Number(v.Get(e)));
        }
      }
    }
    o.Stop();
    e.Stop();
  }
  static CollectAssetByCommonBulletBuff(e, t) {
    if (t) {
      e = ConfigManager_1.ConfigManager.BuffItemConfig.GetBuffConfig(e, t);
      if (e) {
        var o = ModelManager_1.ModelManager.PreloadModel;
        if (e.GameplayCueIds) {
          for (const r of e.GameplayCueIds) {
            var a = GameplayCueById_1.configGameplayCueById.GetConfig(r);
            if (a && a.Path && a.Path.length !== 0) {
              o.CommonAssetElement.AddEffectAsset(a.Path);
            }
          }
        }
      }
    }
  }
  static CollectAssetByBullet(e) {
    var t;
    var o;
    var a;
    var r = StatSeconds_1.StatSecondsAccumulator.Create("CollectAssetByBullet:" + e.CreatureDataComponent.GetCreatureDataId(), e.CreatureDataComponent.GetPbDataId().toString());
    r.Start();
    var i = e.CreatureDataComponent;
    if (i.GetEntityType() !== Protocol_1.Aki.Protocol.kks.Proto_Player && i.GetEntityType() !== Protocol_1.Aki.Protocol.kks.Proto_Monster && i.GetEntityType() !== Protocol_1.Aki.Protocol.kks.Proto_Vision) {
      r.Stop();
    } else {
      i = e.BlueprintClassPath;
      if ((t = (o = ConfigManager_1.ConfigManager.WorldConfig.GetCharacterFightInfo(i))?.BulletDataTable.ToAssetPathName()) && t.length !== 0 && t !== "None") {
        a = undefined;
        if ((a = ResourceSystem_1.ResourceSystem.GetLoadedAsset(t, UE.DataTable))?.IsValid()) {
          this.CollectAssetByBulletDt(a, e);
          if (o && (a = this.GetCurCharacterLoadType()) !== 0 && (o = o?.BulletDataTableMap.Get(a)?.ToAssetPathName()) && o.length > 0 && o !== "None" && (a = ResourceSystem_1.ResourceSystem.GetLoadedAsset(o, UE.DataTable))) {
            this.CollectAssetByBulletDt(a, e);
          }
        } else if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Character", 3, "[CollectAssetByBullet.PreloadController] 加载角色子弹表失败。", ["Path", i], ["子弹表Path", t]);
        }
      }
      r.Stop();
    }
    return true;
  }
  static CollectAssetByBulletDt(t, o) {
    if (t.IsValid()) {
      var a = DataTableUtil_1.DataTableUtil.GetDataTableAllRowFromTable(t);
      var r = a.length;
      for (let e = 0; e < r; ++e) {
        var i = a[e];
        if (!this.vpr(o, i)) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Preload", 36, "[CollectEntityAssetByBulletDataMain]Collect Entity Bullet Failed", ["EntityId", o?.Entity?.Id], ["BulletDataMain", t.GetName()], ["RowStructName", t.RowStructName], ["BulletCount", r], ["ErrorIndex", e]);
          }
        }
      }
    }
  }
  static CollectAssetByStateMachine(e) {
    var t = e.CreatureDataComponent.GetPbEntityInitData();
    let o = 0;
    t = (o = t?.ComponentsData && (t = (0, IComponent_1.getComponent)(t.ComponentsData, "AiComponent"))?.AiId && !t.Disabled ? t.AiId : o) ? AiBaseById_1.configAiBaseById.GetConfig(o) : undefined;
    if (t?.StateMachine) {
      var a = AiStateMachineConfigById_1.configAiStateMachineConfigById.GetConfig(t.StateMachine);
      if (a?.StateMachineJson) {
        var a = JSON.parse(a.StateMachineJson);
        var r = e.Entity.GetComponent(81);
        r.StateMachineName = t.StateMachine;
        for (const i of (r.StateMachineJsonObject = a).Nodes) {
          this.CollectAssetByStateMachineNode(e, i);
        }
      }
    }
    return true;
  }
  static CollectAssetByStateMachineNode(e, t) {
    if (t.BindStates && t.BindStates.length > 0) {
      for (const a of t.BindStates) {
        switch (a.Type) {
          case 1:
            this.CollectAssetByBuffIdList(e, [BigInt(a.BindBuff.BuffId)]);
            break;
          case 104:
            for (const r of a.BindCue.CueIds) {
              this.CollectAssetByCueId(e, BigInt(r));
            }
            break;
          case 113:
            if (a.BindPalsy.CounterAttackEffect) {
              e.AddOtherAsset(a.BindPalsy.CounterAttackEffect);
            }
            if (a.BindPalsy.CounterAttackCamera) {
              e.AddOtherAsset(a.BindPalsy.CounterAttackCamera);
            }
        }
      }
    }
    var o = [];
    if (t.OnEnterActions && t.OnEnterActions?.length > 0) {
      o.push(...t.OnEnterActions);
    }
    if (t.OnExitActions && t.OnExitActions?.length > 0) {
      o.push(...t.OnExitActions);
    }
    for (const i of o) {
      switch (i.Type) {
        case 1:
          this.CollectAssetByBuffIdList(e, [BigInt(i.ActionAddBuff.BuffId)]);
          break;
        case 101:
          for (const l of i.ActionCue.CueIds) {
            this.CollectAssetByCueId(e, BigInt(l));
          }
      }
    }
  }
  static CollectAssetByCueId(e, t) {
    t = GameplayCueById_1.configGameplayCueById.GetConfig(t);
    if (t && t.Path && t.Path.length !== 0) {
      e.AddEffectAsset(t.Path);
    }
  }
  static vpr(t, e) {
    var o = StatSeconds_1.StatSecondsAccumulator.Create("CollectEntityAssetByBulletDataMain");
    o.Start();
    var a = e.基础设置;
    var r = e.逻辑设置;
    var i = e.表现效果设置;
    var l = e.执行逻辑;
    if (!a) {
      n = t;
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Preload", 36, "[CollectEntityAssetByBulletDataMain]BaseSetting Is Undefiend", ["EntityId", n?.Entity?.Id], ["BulletDataMain", e.子弹名称]);
      }
      o.Stop();
      return false;
    }
    var n = a.命中判定类型预设;
    if (UE.KismetSystemLibrary.IsValidSoftObjectReference(n)) {
      t.AddOtherAsset(n.ToAssetPathName());
    }
    var e = r.预设;
    if (UE.KismetSystemLibrary.IsValidSoftObjectReference(e)) {
      t.AddOtherAsset(e.ToAssetPathName());
    }
    var a = i.子弹特效DA;
    if (UE.KismetSystemLibrary.IsValidSoftObjectReference(a)) {
      t.AddEffectAsset(a.ToAssetPathName());
    }
    var s = i.命中特效DA;
    var _ = s?.Num();
    if (_) {
      for (let e = 0; e < _; ++e) {
        var f = s.GetKey(e);
        var f = s.Get(f);
        var c = f?.ToAssetPathName();
        if (c && c?.length > 0 && c !== "None" && t.AddEffectAsset(c) && t instanceof PreloadModel_1.EntityAssetElement) {
          if (t.CreatureDataComponent.GetEntityType() === Protocol_1.Aki.Protocol.kks.Proto_Player) {
            ModelManager_1.ModelManager.PreloadModel.PreCreateEffect.AddPreCreateHitEffect(t.EntityHandle.Id, f.ToAssetPathName());
          } else {
            ModelManager_1.ModelManager.PreloadModel.PreCreateEffect.AddPreCreateEffect(t.EntityHandle.Id, f.ToAssetPathName());
          }
        }
      }
    }
    var n = i.命中时攻击者震屏;
    if (UE.KismetSystemLibrary.IsValidSoftClassReference(n)) {
      t.AddOtherAsset(n.ToAssetPathName());
    }
    var r = i.命中时受击者震屏;
    if (UE.KismetSystemLibrary.IsValidSoftClassReference(r)) {
      t.AddOtherAsset(r.ToAssetPathName());
    }
    var e = l.GB组;
    if (UE.KismetSystemLibrary.IsValidSoftObjectReference(e)) {
      t.AddOtherAsset(e.ToAssetPathName());
    }
    var d = new Array();
    var C = l.命中后对攻击者应用GE的Id;
    if (C?.Num()) {
      for (let e = 0; e < C.Num(); ++e) {
        var u = C.Get(e);
        if (u) {
          d.push(u);
        }
      }
    }
    var m = l.命中后对受击者应用GE的Id;
    if (m?.Num()) {
      for (let e = 0; e < m.Num(); ++e) {
        var g = m.Get(e);
        if (g) {
          d.push(g);
        }
      }
    }
    var A = l.能量恢复类GE数组的Id;
    if (A?.Num()) {
      for (let e = 0; e < A.Num(); ++e) {
        var M = A.Get(e);
        if (M) {
          d.push(M);
        }
      }
    }
    var v = l.命中后对在场上角色应用的GE的Id;
    if (v?.Num()) {
      for (let e = 0; e < v.Num(); ++e) {
        var D = v.Get(e);
        if (D) {
          d.push(D);
        }
      }
    }
    var P = l.受击对象进入应用的GE的Id;
    if (P?.Num()) {
      for (let e = 0; e < P.Num(); ++e) {
        var h = P.Get(e);
        if (h) {
          d.push(h);
        }
      }
    }
    this.CollectAssetByBuffIdList(t, d);
    o.Stop();
    return true;
  }
  static lpr(t, e, o) {
    var a = StatSeconds_1.StatSecondsAccumulator.Create("CollectAssetByAnimSequence");
    a.Start();
    (0, puerts_1.$unref)(animNotifyEventsRef).Empty();
    UE.KuroStaticLibrary.GetAnimSequenceNotifies(e, animNotifyEventsRef);
    var r = (0, puerts_1.$unref)(animNotifyEventsRef);
    var i = r?.Num();
    if (i) {
      for (let e = 0; e < i; ++e) {
        var l = r.Get(e);
        this.Mpr(t, l, o);
      }
      a.Stop();
    }
  }
  static hpr(t, e, o) {
    var a = StatSeconds_1.StatSecondsAccumulator.Create("CollectAssetByAnimMontage");
    a.Start();
    (0, puerts_1.$unref)(animNotifyEventsRef).Empty();
    UE.KuroStaticLibrary.GetAnimMontageNotifies(e, animNotifyEventsRef);
    var r = (0, puerts_1.$unref)(animNotifyEventsRef);
    if (r?.Num()) {
      for (let e = 0; e < r.Num(); ++e) {
        var i = r.Get(e);
        this.Mpr(t, i, o);
      }
    }
    (0, puerts_1.$unref)(animSequenceBasesRef).Empty();
    UE.KuroStaticLibrary.GetAnimSequencesByAnimMontage(e, animSequenceBasesRef);
    var l = (0, puerts_1.$unref)(animSequenceBasesRef);
    if (l?.Num()) {
      for (let e = 0; e < l.Num(); ++e) {
        var n = l.Get(e);
        this.lpr(t, n, o);
      }
    }
    a.Stop();
  }
  static Mpr(e, t, o) {
    if (t.NotifyStateClass?.IsValid()) {
      if (t.NotifyStateClass.IsA(UE.AnimNotifyStateEffect_C.StaticClass())) {
        if ((a = t.NotifyStateClass.EffectDataAssetRef?.ToAssetPathName()) && a.length !== 0 && a !== "None") {
          e.AddEffectAsset(a);
          return;
        } else {
          return undefined;
        }
      }
      if (t.NotifyStateClass.IsA(UE.TsAnimNotifyStateAddBuff_C.StaticClass())) {
        if ((a = t.NotifyStateClass).BuffId) {
          o.push(a.BuffId);
          return;
        } else {
          return undefined;
        }
      }
    }
    var a;
    if (t.Notify?.IsValid()) {
      if (t.Notify.IsA(UE.AnimNotifyEffect_C.StaticClass())) {
        if ((a = t.Notify.EffectDataAssetRef?.ToAssetPathName()) && a.length !== 0 && a !== "None") {
          e.AddEffectAsset(a);
          return;
        } else {
          return undefined;
        }
      } else {
        if (t.Notify.IsA(UE.TsAnimNotifyAddBuff_C.StaticClass()) && (e = t.Notify).BuffId) {
          o.push(e.BuffId);
        }
        return;
      }
    }
  }
  static upr(t, o) {
    if (o?.IsValid()) {
      var e = StatSeconds_1.StatSecondsAccumulator.Create("CollectAssetByEffectModelBase");
      e.Start();
      if (o.IsA(UE.EffectModelGroup_C.StaticClass())) {
        var a = o;
        var r = a.EffectData?.Num();
        if (r) {
          for (let e = 0; e < r; ++e) {
            var i;
            var l = a.EffectData.GetKey(e);
            if (l?.IsValid()) {
              if (l.IsA(UE.EffectModelGroup_C.StaticClass())) {
                if (Log_1.Log.CheckError()) {
                  Log_1.Log.Error("Preload", 3, "子特效不能是DA_Fx_Group", ["父特效", o.GetName()], ["子特效", l.GetName()]);
                }
              } else {
                this.upr(t, l);
                if (l.IsA(UE.EffectModelSkeletalMesh_C.StaticClass())) {
                  if ((i = l.AnimationRef)?.IsValid()) {
                    if (i.IsA(UE.AnimSequence.StaticClass())) {
                      this.lpr(t, i, animBuffList);
                    } else if (i.IsA(UE.AnimMontage.StaticClass())) {
                      this.hpr(t, i, animBuffList);
                    }
                  } else if (Log_1.Log.CheckError()) {
                    Log_1.Log.Error("Preload", 3, "特效的mesh没有配置动画", ["父特效", o.GetName()], ["子特效", l.GetName()]);
                  }
                }
              }
            }
          }
        }
      }
      e.Stop();
    }
  }
  static cpr(t, e) {
    if (e) {
      PreloadController.Epr.Start();
      (0, puerts_1.$unref)(animationAssetSetRef).Empty();
      UE.KuroStaticLibrary.GetAnimAssetsByAnimBlueprintClass(e, animationAssetSetRef);
      var o = (0, puerts_1.$unref)(animationAssetSetRef);
      var a = UE.KuroStaticLibrary.GetDefaultObject(e);
      if (a && a.ExtraRibbonAnims?.Num() > 0) {
        for (let e = 0; e < a.ExtraRibbonAnims?.Num(); e++) {
          var r = a.ExtraRibbonAnims.GetKey(e);
          var r = a.ExtraRibbonAnims.Get(r);
          if (r) {
            o.Add(r);
          }
        }
      }
      if (o?.Num()) {
        for (let e = animBuffList.length = 0; e < o.Num(); ++e) {
          var i = o.Get(e);
          if (i.IsA(UE.AnimSequence.StaticClass())) {
            this.lpr(t, i, animBuffList);
          } else if (i.IsA(UE.AnimMontage.StaticClass())) {
            this.hpr(t, i, animBuffList);
          }
        }
        this.CollectAssetByBuffIdList(t, animBuffList);
      }
      PreloadController.Epr.Stop();
    }
  }
  static epr(t, e) {
    if (e) {
      var o = StatSeconds_1.StatSecondsAccumulator.Create("CollectAssetByActorClass");
      o.Start();
      var a = (0, puerts_1.$ref)(undefined);
      UE.KuroStaticLibrary.GetCharacterAnimClass(e, a);
      var a = (0, puerts_1.$unref)(a);
      if (e.IsChildOf(UE.TsBaseCharacter_C.StaticClass())) {
        var r = e?.SimpleConstructionScript;
        if (r) {
          for (let e = 0; e < r.AllNodes.Num(); e++) {
            var i = r.AllNodes.Get(e);
            if (i && i.ComponentClass === UE.SkeletalMeshComponent.StaticClass() && (i = i.ComponentTemplate?.GetAnimClass())) {
              this.cpr(t, i);
            }
          }
        }
      }
      if (a) {
        this.cpr(t, a);
        o.Stop();
      }
    }
  }
  static OnLeaveLevel() {
    var e;
    var t = ModelManager_1.ModelManager.PreloadModel;
    t.CommonAssetElement.Clear();
    for ([, e] of t.AllEntityAssetMap) {
      if (e.LoadState !== 4) {
        e.Clear();
      }
    }
    t.ClearEntityAsset();
    t.ClearPreloadResource();
    return true;
  }
  static GetCurCharacterLoadType() {
    if (ModelManager_1.ModelManager.RoguelikeModel.CheckInRoguelikeOnly()) {
      return 1;
    } else {
      return 0;
    }
  }
}
(exports.PreloadController = PreloadController).tpr = Stats_1.Stat.Create("PreloadEntityMajor Cb");
PreloadController.Epr = Stats_1.Stat.Create("CollectAssetByAnimationBlueprintClass"); //# sourceMappingURL=PreloadController.js.map