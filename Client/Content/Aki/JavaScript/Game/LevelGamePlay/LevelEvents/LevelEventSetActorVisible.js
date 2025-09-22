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
            if (a.GetComponent(203)?.Owner) {
              var n = a.GetComponent(164);
              if (n) {
                var r = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSubsystem(GlobalData_1.GlobalData.World, UE.KuroActorSubsystem.StaticClass());
                var s = o.SyncChildActor || false;
                for (const E of o.Targets) {
                  var c = E.PathName;
                  var i = c.split(".");
                  if (i.length < PATH_LENGTH) {
                    if (Log_1.Log.CheckError()) {
                      Log_1.Log.Error("LevelEvent", 7, "[SetActorVisible]actor路径错误", ["RefPath", c]);
                    }
                  } else {
                    i = i[1] + "." + i[2];
                    if (n.IsValidPlatFormPath(i)) {
                      i = new UE.FName(i);
                      const L = r.GetActor(i);
                      if (L?.IsValid()) {
                        i = a.GetComponent(0).GetPbDataId();
                        if (ModelManager_1.ModelManager.SundryModel?.GetModuleDebugLevel("SceneItemReferenceComponent_" + i) && Log_1.Log.CheckInfo()) {
                          Log_1.Log.Info("LevelEvent", 39, "[SetActorVisible] [疑难杂症] 行为开关Actor", ["RefEntityPbDataId", a.GetComponent(0)?.GetPbDataId()], ["TargetPath", c], ["ActorType", o.ActorType], ["Enable", o.Enable], ["ActionGuid", this.ActionGuid], ["Context", t]);
                        }
                        if (o.CollisionEnabled !== undefined) {
                          L.SetActorEnableCollision(o.CollisionEnabled);
                        } else {
                          L.SetActorEnableCollision(o.Enable);
                        }
                        switch (o.ActorType) {
                          case "MeshActor":
                            L.SetActorHiddenInGame(!o.Enable);
                            var l = o.Enable ? 3 : 0;
                            if (L instanceof UE.StaticMeshActor) {
                              if (o.Enable) {
                                L.SetLogicallyShow(3);
                              } else {
                                L.SetLogicallyHidden();
                              }
                            }
                            if (L instanceof UE.BP_KuroISMGroup_C) {
                              if (o.Enable) {
                                L.SeyLogicallyShowForAllChildren();
                              } else {
                                L.SeyLogicallyHiddenForAllChildren();
                              }
                            }
                            if (L.RootComponent?.IsValid() && L.RootComponent instanceof UE.MeshComponent) {
                              L.RootComponent.SetVisibility(o.Enable, s);
                            }
                            if (L.RootComponent?.IsValid() && L.RootComponent instanceof UE.PrimitiveComponent) {
                              L.RootComponent.SetCollisionEnabled(l);
                              L.RootComponent.SetHiddenInGame(!o.Enable, s);
                            }
                            break;
                          case "SoundActor":
                            if (L instanceof UE.KuroAmbientSoundActor && L.RootComponent instanceof UE.KuroAmbientSoundComponent) {
                              if (o.Enable) {
                                L.RootComponent.PlaySound();
                              } else {
                                L.RootComponent.StopSound();
                              }
                            }
                            break;
                          case "EffectActor":
                            if (L instanceof UE.BP_EffectActor_C) {
                              if (o.Enable) {
                                L.Play("[SetActorVisible]SceneEffectPlay");
                              } else {
                                L.Stop("[SetActorVisible]SceneEffectStop", false);
                              }
                            }
                            break;
                          case "LightsGroup":
                            if (L instanceof UE.BP_LightsGroup_C) {
                              L.ToggleLights(o.Enable);
                            }
                            break;
                          case "PPVolume":
                            if (L instanceof UE.KuroPostProcessVolume) {
                              L.bEnabled = o.Enable;
                            }
                            break;
                          case "CullDistanceVolume":
                            if (L instanceof UE.CullDistanceVolume) {
                              L.bEnabled = o.Enable;
                            }
                            break;
                          case "Skybox":
                            ResourceSystem_1.ResourceSystem.LoadTypeAsync("BP_CloudFuBen_C", () => {
                              if (L instanceof UE.BP_CloudFuBen_C) {
                                L.SetActorHiddenInGame(!o.Enable);
                              }
                            });
                            break;
                          case "FloatingActor":
                            if (L instanceof UE.KuroFloatingStaticMesh) {
                              if (o.Enable) {
                                L.SetLogicallyShow(3);
                              } else {
                                L.SetLogicallyHidden();
                              }
                            }
                            break;
                          case "GpuNpc":
                            if (L instanceof UE.BakedBoneMeshActor) {
                              L.SetActorHiddenInGame(!o.Enable);
                            }
                            break;
                          case "ToonDepth":
                            if (L instanceof UE.BP_CustomDepthForToon_C) {
                              if (o.Enable) {
                                UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Mobile.CustomDepthForToonRimDrawDistance 5000");
                              } else {
                                UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Mobile.CustomDepthForToonRimDrawDistance 800");
                              }
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