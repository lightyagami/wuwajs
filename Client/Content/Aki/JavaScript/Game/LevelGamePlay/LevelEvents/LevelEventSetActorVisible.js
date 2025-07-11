"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventSetActorVisible = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const GlobalData_1 = require("../../GlobalData");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
const PATH_LENGTH = 3;
class LevelEventSetActorVisible extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, t) {
    var o = e;
    if (o) {
      e = t;
      if (e) {
        var a = EntitySystem_1.EntitySystem.Get(e.EntityId);
        if (a?.Valid) {
          if (o.Targets && o.Targets.length !== 0) {
            if (a.GetComponent(202)?.Owner) {
              var n = a.GetComponent(163);
              if (n) {
                var r = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSubsystem(GlobalData_1.GlobalData.World, UE.KuroActorSubsystem.StaticClass());
                var i = o.SyncChildActor || false;
                for (const L of o.Targets) {
                  var s = L.PathName;
                  var c = s.split(".");
                  if (c.length < PATH_LENGTH) {
                    if (Log_1.Log.CheckError()) {
                      Log_1.Log.Error("LevelEvent", 7, "[SetActorVisible]actor路径错误", ["RefPath", s]);
                    }
                  } else {
                    c = c[1] + "." + c[2];
                    if (n.IsValidPlatFormPath(c)) {
                      var c = new UE.FName(c);
                      var l = r.GetActor(c);
                      if (l?.IsValid()) {
                        c = a.GetComponent(0).GetPbDataId();
                        if (ModelManager_1.ModelManager.SundryModel?.GetModuleDebugLevel("SceneItemReferenceComponent_" + c) && Log_1.Log.CheckInfo()) {
                          Log_1.Log.Info("LevelEvent", 39, "[SetActorVisible] [疑难杂症] 行为开关Actor", ["RefEntityPbDataId", a.GetComponent(0)?.GetPbDataId()], ["TargetPath", s], ["ActorType", o.ActorType], ["Enable", o.Enable], ["ActionGuid", this.ActionGuid], ["Context", t]);
                        }
                        l.SetActorEnableCollision(o.Enable);
                        switch (o.ActorType) {
                          case "MeshActor":
                            l.SetActorHiddenInGame(!o.Enable);
                            var E = o.Enable ? 3 : 0;
                            if (l instanceof UE.StaticMeshActor) {
                              if (o.Enable) {
                                l.SetLogicallyShow(3);
                              } else {
                                l.SetLogicallyHidden();
                              }
                            }
                            if (l instanceof UE.BP_KuroISMGroup_C) {
                              if (o.Enable) {
                                l.SeyLogicallyShowForAllChildren();
                              } else {
                                l.SeyLogicallyHiddenForAllChildren();
                              }
                            }
                            if (l.RootComponent?.IsValid() && l.RootComponent instanceof UE.MeshComponent) {
                              l.RootComponent.SetVisibility(o.Enable, i);
                            }
                            if (l.RootComponent?.IsValid() && l.RootComponent instanceof UE.PrimitiveComponent) {
                              l.RootComponent.SetCollisionEnabled(E);
                              l.RootComponent.SetHiddenInGame(!o.Enable, i);
                            }
                            break;
                          case "SoundActor":
                            if (l instanceof UE.KuroAmbientSoundActor && l.RootComponent instanceof UE.KuroAmbientSoundComponent) {
                              if (o.Enable) {
                                l.RootComponent.PlaySound();
                              } else {
                                l.RootComponent.StopSound();
                              }
                            }
                            break;
                          case "EffectActor":
                            if (l instanceof UE.BP_EffectActor_C) {
                              if (o.Enable) {
                                l.Play("[SetActorVisible]SceneEffectPlay");
                              } else {
                                l.Stop("[SetActorVisible]SceneEffectStop", false);
                              }
                            }
                            break;
                          case "LightsGroup":
                            if (l instanceof UE.BP_LightsGroup_C) {
                              l.ToggleLights(o.Enable);
                            }
                            break;
                          case "PPVolume":
                            if (l instanceof UE.KuroPostProcessVolume) {
                              l.bEnabled = o.Enable;
                            }
                            break;
                          case "CullDistanceVolume":
                            if (l instanceof UE.CullDistanceVolume) {
                              l.bEnabled = o.Enable;
                            }
                            break;
                          case "Skybox":
                            if (l instanceof UE.BP_CloudFuBen_C) {
                              l.ChangeSky(o.Enable);
                            }
                            break;
                          case "FloatingActor":
                            if (l instanceof UE.KuroFloatingStaticMesh) {
                              if (o.Enable) {
                                l.SetLogicallyShow(3);
                              } else {
                                l.SetLogicallyHidden();
                              }
                            }
                            break;
                          case "GpuNpc":
                            if (l instanceof UE.BakedBoneMeshActor) {
                              l.SetActorHiddenInGame(!o.Enable);
                            }
                            break;
                          case "ToonDepth":
                            if (l instanceof UE.BP_CustomDepthForToon_C) {
                              if (o.Enable) {
                                UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Mobile.CustomDepthForToonRimDrawDistance 5000");
                              } else {
                                UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.Mobile.CustomDepthForToonRimDrawDistance 800");
                              }
                            }
                        }
                      } else if (Log_1.Log.CheckWarn()) {
                        Log_1.Log.Warn("LevelEvent", 7, "[SetActorVisible]目标actor不存在", ["RefPath", s]);
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