"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventSetActorVisible = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const GlobalData_1 = require("../../GlobalData");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
const PATH_LENGTH = 3;
class LevelEventSetActorVisible extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, t) {
    const o = e;
    if (o) {
      e = t;
      if (e) {
        var a = EntitySystem_1.EntitySystem.Get(e.EntityId);
        if (a?.Valid) {
          if (o.Targets && o.Targets.length !== 0) {
            if (a.GetComponent(214)?.Owner) {
              var n = a.GetComponent(174);
              if (n) {
                var r = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSubsystem(GlobalData_1.GlobalData.World, UE.KuroActorSubsystem.StaticClass());
                var s = o.SyncChildActor || false;
                for (const L of o.Targets) {
                  var c = L.PathName;
                  var i = c.split(".");
                  if (i.length < PATH_LENGTH) {
                    if (Log_1.Log.CheckError()) {
                      Log_1.Log.Error("LevelEvent", 7, "[SetActorVisible]actor路径错误", ["RefPath", c]);
                    }
                  } else {
                    i = i[1] + "." + i[2];
                    if (n.IsValidPlatFormPath(i)) {
                      i = new UE.FName(i);
                      const v = r.GetActor(i);
                      if (v?.IsValid()) {
                        i = a.GetComponent(0).GetPbDataId();
                        if (ModelManager_1.ModelManager.SundryModel?.GetModuleDebugLevel("SceneItemReferenceComponent_" + i) && Log_1.Log.CheckInfo()) {
                          Log_1.Log.Info("LevelEvent", 39, "[SetActorVisible] [疑难杂症] 行为开关Actor", ["RefEntityPbDataId", a.GetComponent(0)?.GetPbDataId()], ["TargetPath", c], ["ActorType", o.ActorType], ["Enable", o.Enable], ["ActionGuid", this.ActionGuid], ["Context", t]);
                        }
                        if (o.CollisionEnabled !== undefined) {
                          v.SetActorEnableCollision(o.CollisionEnabled);
                        } else {
                          v.SetActorEnableCollision(o.Enable);
                        }
                        switch (o.ActorType) {
                          case "MeshActor":
                            v.SetActorHiddenInGame(!o.Enable);
                            var l = o.Enable ? 3 : 0;
                            if (v instanceof UE.StaticMeshActor) {
                              if (o.Enable) {
                                v.SetLogicallyShow(3);
                              } else {
                                v.SetLogicallyHidden();
                              }
                            }
                            if (v instanceof UE.BP_KuroISMGroup_C) {
                              if (o.Enable) {
                                v.SeyLogicallyShowForAllChildren();
                              } else {
                                v.SeyLogicallyHiddenForAllChildren();
                              }
                            }
                            if (v.RootComponent?.IsValid() && v.RootComponent instanceof UE.MeshComponent) {
                              v.RootComponent.SetVisibility(o.Enable, s);
                            }
                            if (v.RootComponent?.IsValid() && v.RootComponent instanceof UE.PrimitiveComponent) {
                              v.RootComponent.SetCollisionEnabled(l);
                              v.RootComponent.SetHiddenInGame(!o.Enable, s);
                            }
                            break;
                          case "SoundActor":
                            if (v instanceof UE.KuroAmbientSoundActor && v.RootComponent instanceof UE.KuroAmbientSoundComponent) {
                              if (o.Enable) {
                                v.RootComponent.PlaySound();
                              } else {
                                v.RootComponent.StopSound();
                              }
                            }
                            break;
                          case "EffectActor":
                            if (v instanceof UE.BP_EffectActor_C) {
                              if (o.Enable) {
                                v.Play("[SetActorVisible]SceneEffectPlay");
                              } else {
                                v.Stop("[SetActorVisible]SceneEffectStop", false);
                              }
                            }
                            break;
                          case "LightsGroup":
                            if (v instanceof UE.BP_LightsGroup_C) {
                              v.ToggleLights(o.Enable);
                            }
                            break;
                          case "PPVolume":
                            if (v instanceof UE.KuroPostProcessVolume) {
                              v.bEnabled = o.Enable;
                            }
                            break;
                          case "CullDistanceVolume":
                            if (v instanceof UE.CullDistanceVolume) {
                              v.bEnabled = o.Enable;
                            }
                            break;
                          case "Skybox":
                            ResourceSystem_1.ResourceSystem.LoadTypeAsync("BP_CloudFuBen_C", () => {
                              if (v instanceof UE.BP_CloudFuBen_C) {
                                v.SetActorHiddenInGame(!o.Enable);
                              }
                            });
                            break;
                          case "FloatingActor":
                            if (v instanceof UE.KuroFloatingStaticMesh) {
                              if (o.Enable) {
                                v.SetLogicallyShow(3);
                              } else {
                                v.SetLogicallyHidden();
                              }
                            }
                            break;
                          case "GpuNpc":
                            if (v instanceof UE.BakedBoneMeshActor) {
                              v.SetActorHiddenInGame(!o.Enable);
                            }
                            break;
                          case "ToonDepth":
                            if (v instanceof UE.BP_CustomDepthForToon_C) {
                              if (o.Enable) {
                                UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Mobile.CustomDepthForToonRimDrawDistance 5000");
                              } else {
                                UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Mobile.CustomDepthForToonRimDrawDistance 800");
                              }
                            }
                            break;
                          case "DecalActor":
                            if (v instanceof UE.DecalActor) {
                              v.SetActorHiddenInGame(!o.Enable);
                            }
                            break;
                          case "NvClothPlacement":
                            if (v instanceof UE.KuroNvClothPlacement) {
                              v.SetActorHiddenInGame(!o.Enable);
                              v.SetEnabled(o.Enable);
                            } else if (v instanceof UE.KuroCSGenericCloth) {
                              var E = v.K2_GetComponentsByClass(UE.StaticMeshComponent.StaticClass());
                              for (let e = 0; e < E.Num(); e++) {
                                var f = E.Get(e);
                                if (f.IsValid()) {
                                  f.SetVisibility(o.Enable, s);
                                }
                              }
                            }
                            if (v.RootComponent?.IsValid()) {
                              v.RootComponent.SetVisibility(o.Enable, s);
                            }
                            break;
                          case "PhysicalActor":
                            if (v instanceof UE.BP_QiuQian_C) {
                              v.SetActorHiddenInGame(!o.Enable);
                              v.SetActorTickEnabled(o.Enable);
                            }
                            break;
                          case "WorldPartitionTriggerVolumeWrapper":
                            if (v instanceof UE.BP_TsTransitionWorldPartitionTriggerVolumeWrapper_C) {
                              if ((l = v.TargetVolume)?.IsValid()) {
                                l.FunctionEnable = o.Enable;
                              }
                            } else if (v instanceof UE.TsTransitionWorldPartitionTriggerVolume_C && v?.IsValid()) {
                              v.FunctionEnable = o.Enable;
                            }
                            break;
                          case "SmartLightActor":
                            if (v instanceof UE.KuroSmartLightActor) {
                              v.Enabled = o.Enable;
                            }
                        }
                      } else if (Log_1.Log.CheckWarn()) {
                        Log_1.Log.Warn("LevelEvent", 7, "[SetActorVisible]目标actor不存在", ["RefPath", c]);
                      }
                    }
                  }
                }
              } else if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("LevelEvent", 7, "状态控制组件不存在");
              }
            } else if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("LevelEvent", 7, "状态控制actor不存在");
            }
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("LevelEvent", 7, "目标actor未配置", ["PbDataId", a.GetComponent(0)?.GetPbDataId()]);
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LevelEvent", 7, "状态控制entity不存在", ["EntityId", e.EntityId]);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelEvent", 7, "此LevelEvent只能配置在SceneActorRefComponent中");
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("LevelEvent", 7, "参数类型错误");
    }
  }
}
exports.LevelEventSetActorVisible = LevelEventSetActorVisible;
//# sourceMappingURL=LevelEventSetActorVisible.js.map