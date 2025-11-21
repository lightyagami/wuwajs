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
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RenderModuleController_1 = require("../../../Render/Manager/RenderModuleController");
const GachaScanView_1 = require("../../Gacha/GachaResultView/GachaScanView");
const MeshStreamTaskContext_1 = require("../../MeshStream/MeshStreamTaskContext");
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
          }, 102, "Ui.GachaUi");
          await u.Promise;
          var n = ActorSystem_1.ActorSystem.Spawn(UE.LevelSequenceActor.StaticClass(), new UE.TransformDouble(), undefined);
          n.SetSequence(r);
          UE.KuroSequenceRuntimeFunctionLibrary.SetSequenceInUiScene(r, true);
          a.set(e, n);
          var a = new UE.MovieSceneSequencePlaybackSettings();
          a.bRestoreState = true;
          a.bPauseAtEnd = true;
          n.PlaybackSettings = a;
          var t = UE.NewArray(UE.SkeletalMesh);
          const C = new CustomPromise_1.CustomPromise();
          var i = n.GetBindingByTagInTemplate(GachaScanView_1.SCENE_ROLE_TAG, true);
          for (let e = 0; e < i.Num(); e++) {
            var l = i.Get(e);
            if (l) {
              var s = l.K2_GetComponentsByClass(UE.SkeletalMeshComponent.StaticClass());
              for (let e = 0; e < s.Num(); e++) {
                var c = s.Get(e);
                c.SetTickableWhenPaused(true);
                t.Add(c.SkeletalMesh);
              }
              if (l instanceof UE.BP_BaseRole_Seq_V2_C) {
                l.SetTickableWhenPaused(true);
              }
            }
          }
          if (!(t.Num() <= 0)) {
            (a = new MeshStreamTaskContext_1.MeshStreamTaskContext()).SkeletalMeshes = t;
            a.OnTaskFinish = () => {
              C.SetResult();
            };
            n = ControllerHolder_1.ControllerHolder.MeshStreamController.AddMeshStreamTask(a);
            o.set(e, n);
            await C.Promise;
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
      var t = e.GetSequence();
      UE.KuroSequencePerformanceManager.OpenKuroPerformanceMode(t);
      CameraController_1.CameraController.SetViewTarget(r, "RoleNewJoinView.SceneSequenceCamera");
      e.bOverrideInstanceData = true;
      e.SetTickableWhenPaused(!ModelManager_1.ModelManager.GameModeModel.IsMulti);
      e.AddBindingByTag(GachaScanView_1.SCENE_CAMERA_TAG, r, false, true);
      var t = e.DefaultInstanceData;
      const i = UE.KismetMathLibrary.Conv_TransformDoubleToTransform(RenderModuleController_1.RenderModuleController.GetKuroCurrentUiSceneTransform());
      t.TransformOrigin = i;
      if (n.BindPoint?.length > 0) {
        t.TransformOriginActor = UE.KuroCollectActorComponent.GetActorWithTag(FNameUtil_1.FNameUtil.GetDynamicFName(n.BindPoint), 1);
      } else {
        r = UE.KuroCollectActorComponent.GetActorWithTag(FNameUtil_1.FNameUtil.GetDynamicFName("KuroUiSceneRoot"), 1);
        const i = UE.KismetMathLibrary.Conv_TransformDoubleToTransform(r.D_GetTransform());
        t.TransformOrigin = i;
      }
      n = ConfigManager_1.ConfigManager.GachaConfig.GetRoleInfoById(o);
      a.UpdateGachaShowItem(o, n.QualityId);
      r = e.SequencePlayer;
      t = r.GetStartTime().Time;
      r.SetPlaybackPosition(new UE.MovieSceneSequencePlaybackParams(t, 0, "", 0, 1));
      r.PlayTo(new UE.MovieSceneSequencePlaybackParams(t, 0, "A", 2, 0));
    }
  }
}
exports.PersonalUtil = PersonalUtil;
//# sourceMappingURL=PersonalUtil.js.map