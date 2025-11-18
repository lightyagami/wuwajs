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
            if (a.GetComponent(206)?.Owner) {
              var n = a.GetComponent(167);
              if (n) {
                var s = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSubsystem(GlobalData_1.GlobalData.World, UE.KuroActorSubsystem.StaticClass());
                var c = o.SyncChildActor || false;
                for (const E of o.Targets) {
                  var r = E.PathName;
                  var i = r.split(".");
                  if (i.length < PATH_LENGTH) {
                    if (Log_1.Log.CheckError()) {
                      Log_1.Log.Error("LevelEvent", 7, "[SetActorVisible]actor路径错误", ["RefPath", r]);
                    }
                  } else {
                    i = i[1] + "." + i[2];
                    if (n.IsValidPlatFormPath(i)) {
                      i = new UE.FName(i);
                      const f = s.GetActor(i);
                      if (f?.IsValid()) {
                        i = a.GetComponent(0).GetPbDataId();
                        if (ModelManager_1.ModelManager.SundryModel?.GetModuleDebugLevel("SceneItemReferenceComponent_" + i) && Log_1.Log.CheckInfo()) {
                          Log_1.Log.Info("LevelEvent", 39, "[SetActorVisible] [疑难杂症] 行为开关Actor", ["RefEntityPbDataId", a.GetComponent(0)?.GetPbDataId()], ["TargetPath", r], ["ActorType", o.ActorType], ["Enable", o.Enable], ["ActionGuid", this.ActionGuid], ["Context", t]);
                        }
                        if (o.CollisionEnabled !== undefined) {
                          f.SetActorEnableCollision(o.CollisionEnabled);
                        } else {
                          f.SetActorEnableCollision(o.Enable);
                        }
                        switch (o.ActorType) {
                          case "MeshActor":
                            f.SetActorHiddenInGame(!o.Enable);
                            var l = o.Enable ? 3 : 0;
                            if (f instanceof UE.StaticMeshActor) {
                              if (o.Enable) {
                                f.SetLogicallyShow(3);
                              } else {
                                f.SetLogicallyHidden();
                              }
                            }
                            if (f instanceof UE.BP_KuroISMGroup_C) {
                              if (o.Enable) {
                                f.SeyLogicallyShowForAllChildren();
                              } else {
                                f.SeyLogicallyHiddenForAllChildren();
                              }
                            }
                            if (f.RootComponent?.IsValid() && f.RootComponent instanceof UE.MeshComponent) {
                              f.RootComponent.SetVisibility(o.Enable, c);
                            }
                            if (f.RootComponent?.IsValid() && f.RootComponent instanceof UE.PrimitiveComponent) {
                              f.RootComponent.SetCollisionEnabled(l);
                              f.RootComponent.SetHiddenInGame(!o.Enable, c);
                            }
                            break;
                          case "SoundActor":
                            if (f instanceof UE.KuroAmbientSoundActor && f.RootComponent instanceof UE.KuroAmbientSoundComponent) {
                              if (o.Enable) {
                                f.RootComponent.PlaySound();
                              } else {
                                f.RootComponent.StopSound();
                              }
                            }
                            break;
                          case "EffectActor":
                            if (f instanceof UE.BP_EffectActor_C) {
                              if (o.Enable) {
                                f.Play("[SetActorVisible]SceneEffectPlay");
                              } else {
                                f.Stop("[SetActorVisible]SceneEffectStop", false);
                              }
                            }
                            break;
                          case "LightsGroup":
                            if (f instanceof UE.BP_LightsGroup_C) {
                              f.ToggleLights(o.Enable);
                            }
                            break;
                          case "PPVolume":
                            if (f instanceof UE.KuroPostProcessVolume) {
                              f.bEnabled = o.Enable;
                            }
                            break;
                          case "CullDistanceVolume":
                            if (f instanceof UE.CullDistanceVolume) {
                              f.bEnabled = o.Enable;
                            }
                            break;
                          case "Skybox":
                            ResourceSystem_1.ResourceSystem.LoadTypeAsync("BP_CloudFuBen_C", () => {
                              if (f instanceof UE.BP_CloudFuBen_C) {
                                f.SetActorHiddenInGame(!o.Enable);
                              }
                            });
                            break;
                          case "FloatingActor":
                            if (f instanceof UE.KuroFloatingStaticMesh) {
                              if (o.Enable) {
                                f.SetLogicallyShow(3);
                              } else {
                                f.SetLogicallyHidden();
                              }
                            }
                            break;
                          case "GpuNpc":
                            if (f instanceof UE.BakedBoneMeshActor) {
                              f.SetActorHiddenInGame(!o.Enable);
                            }
                            break;
                          case "ToonDepth":
                            if (f instanceof UE.BP_CustomDepthForToon_C) {
                              if (o.Enable) {
                                UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Mobile.CustomDepthForToonRimDrawDistance 5000");
                              } else {
                                UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Mobile.CustomDepthForToonRimDrawDistance 800");
                              }
                            }
                            break;
                          case "DecalActor":
                            if (f instanceof UE.DecalActor) {
                              f.SetActorHiddenInGame(!o.Enable);
                            }
                            break;
                          case "NvClothPlacement":
                            if (f instanceof UE.KuroNvClothPlacement) {
                              f.SetActorHiddenInGame(!o.Enable);
                              f.SetEnabled(o.Enable);
                            }
                            if (f.RootComponent?.IsValid()) {
                              f.RootComponent.SetVisibility(o.Enable, c);
                            }
                            break;
                          case "PhysicalActor":
                            if (f instanceof UE.BP_QiuQian_C) {
                              f.SetActorHiddenInGame(!o.Enable);
                              f.SetActorTickEnabled(o.Enable);
                            }
                        }
                      } else if (Log_1.Log.CheckWarn()) {
                        Log_1.Log.Warn("LevelEvent", 7, "[SetActorVisible]目标actor不存在", ["RefPath", r]);
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