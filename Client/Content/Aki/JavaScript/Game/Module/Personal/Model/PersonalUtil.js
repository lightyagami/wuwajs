"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PersonalUtil = undefined;
const UE = require("ue");
const ActorSystem_1 = require("../../../../Core/Actor/ActorSystem");
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const FNameUtil_1 = require("../../../../Core/Utils/FNameUtil");
const CameraController_1 = require("../../../Camera/CameraController");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RenderModuleController_1 = require("../../../Render/Manager/RenderModuleController");
const GachaScanView_1 = require("../../Gacha/GachaResultView/GachaScanView");
const UiModelResourcesManager_1 = require("../../UiComponent/UiModelResourcesManager");
class PersonalUtil {
  static async PreloadRoleSequence(e, a, o) {
    if (!a.has(e)) {
      var n = ConfigManager_1.ConfigManager.GachaConfig.GetGachaTextureInfo(e);
      if (n) {
        n = ConfigManager_1.ConfigManager.GachaConfig.GetGachaSequenceConfigById(n.ShowSequence);
        if (n) {
          const u = new CustomPromise_1.CustomPromise();
          let r = undefined;
          ResourceSystem_1.ResourceSystem.LoadAsync(n.SequencePath, UE.LevelSequence, e => {
            UE.KuroSequenceRuntimeFunctionLibrary.HandleSeqTexStreaming(e, true);
            r = e;
            u.SetResult(true);
          }, 102);
          await u.Promise;
          var n = ActorSystem_1.ActorSystem.Spawn(UE.LevelSequenceActor.StaticClass(), new UE.TransformDouble(), undefined);
          n.SetSequence(r);
          UE.KuroSequenceRuntimeFunctionLibrary.SetSequenceInUiScene(r, true);
          a.set(e, n);
          var a = new UE.MovieSceneSequencePlaybackSettings();
          a.bRestoreState = true;
          a.bPauseAtEnd = true;
          n.PlaybackSettings = a;
          var i = UE.NewArray(UE.SkeletalMesh);
          const U = new CustomPromise_1.CustomPromise();
          var t = n.GetBindingByTagInTemplate(GachaScanView_1.SCENE_ROLE_TAG, true);
          for (let e = 0; e < t.Num(); e++) {
            var s = t.Get(e);
            if (s) {
              var l = s.K2_GetComponentsByClass(UE.SkeletalMeshComponent.StaticClass());
              for (let e = 0; e < l.Num(); e++) {
                var c = l.Get(e);
                c.SetTickableWhenPaused(true);
                i.Add(c.SkeletalMesh);
              }
              if (s instanceof UE.BP_BaseRole_Seq_V2_C) {
                s.SetTickableWhenPaused(true);
              }
            }
          }
          if (!(i.Num() <= 0)) {
            a = UiModelResourcesManager_1.UiModelResourcesManager.LoadMeshesComponentsBundleStreaming(i, undefined, () => {
              U.SetResult();
            });
            o.set(e, a);
            await U.Promise;
          }
        }
      }
    }
  }
  static PlayRoleGachaSequence(e) {
    var r = e.SceneSequenceCamera;
    var a = e.UpdateInteractBp;
    var o = e.RoleConfigId;
    var e = e.SequenceActor;
    var n = ConfigManager_1.ConfigManager.GachaConfig.GetGachaTextureInfo(o);
    if (n) {
      var i = e.GetSequence();
      UE.KuroSequencePerformanceManager.OpenKuroPerformanceMode(i);
      CameraController_1.CameraController.SetViewTarget(r, "RoleNewJoinView.SceneSequenceCamera");
      e.bOverrideInstanceData = true;
      e.SetTickableWhenPaused(!ModelManager_1.ModelManager.GameModeModel.IsMulti);
      e.AddBindingByTag(GachaScanView_1.SCENE_CAMERA_TAG, r, false, true);
      var i = e.DefaultInstanceData;
      const t = UE.KismetMathLibrary.Conv_TransformDoubleToTransform(RenderModuleController_1.RenderModuleController.GetKuroCurrentUiSceneTransform());
      i.TransformOrigin = t;
      if (n.BindPoint?.length > 0) {
        i.TransformOriginActor = UE.KuroCollectActorComponent.GetActorWithTag(FNameUtil_1.FNameUtil.GetDynamicFName(n.BindPoint), 1);
      } else {
        r = UE.KuroCollectActorComponent.GetActorWithTag(FNameUtil_1.FNameUtil.GetDynamicFName("KuroUiSceneRoot"), 1);
        const t = UE.KismetMathLibrary.Conv_TransformDoubleToTransform(r.D_GetTransform());
        i.TransformOrigin = t;
      }
      n = ConfigManager_1.ConfigManager.GachaConfig.GetRoleInfoById(o);
      a.UpdateGachaShowItem(o, n.QualityId);
      r = e.SequencePlayer;
      i = r.GetStartTime().Time;
      r.SetPlaybackPosition(new UE.MovieSceneSequencePlaybackParams(i, 0, "", 0, 1));
      r.PlayTo(new UE.MovieSceneSequencePlaybackParams(i, 0, "A", 2, 0));
    }
  }
}
exports.PersonalUtil = PersonalUtil;
//# sourceMappingURL=PersonalUtil.js.map