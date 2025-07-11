"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActorPoolGuard = undefined;
const UE = require("ue");
class ActorPoolGuard {
  static CleanActorBeforeEnPool(e, o) {
    if (o) {
      o(e);
    } else if (e instanceof UE.LevelSequenceActor) {
      this.ClearSequenceActor(e);
    } else {
      e.D_K2_SetActorTransform(new UE.TransformDouble(), false, undefined, true);
      UE.KuroActorManager.ClearAcquiredComponents(e);
      UE.KuroActorManager.ResetDelegates(e);
      e.K2_DetachFromActor();
      e.SetActorHiddenInGame(true);
      var r = e.K2_GetComponentsByClass(UE.ActorComponent.StaticClass());
      for (let e = 0; e < r.Num(); e++) {
        UE.KuroActorManager.UnregisterComponent(r.Get(e));
      }
      e.SetActorTickEnabled(false);
      e.SetActorEnableCollision(false);
    }
    return true;
  }
  static PrepareActorBeforeDePool(e) {
    return !!UE.KuroActorManager.ResetActorToDefault(e) && (e.SetActorEnableCollision(true), UE.KuroActorManager.ResetUberGraph(e), true);
  }
  static ClearSequenceActor(e) {
    e.PlaybackSettings = new UE.MovieSceneSequencePlaybackSettings();
    e.ResetBindings();
    e.SequencePlayer.OnFinished.Clear();
    e.SequencePlayer.OnPlay.Clear();
    e.SequencePlayer.OnStop.Clear();
    e.SequencePlayer.OnPause.Clear();
    e.SequencePlayer.OnPlayReverse.Clear();
    e.SequencePlayer.OnCameraCut.Clear();
    e.bOverrideInstanceData = false;
    var o = e.DefaultInstanceData;
    if (o) {
      o.TransformOrigin = new UE.Transform();
      o.TransformOriginActor = undefined;
    }
    e.SetSequence(UE.KuroActorManager.GetDummySequence());
  }
}
exports.ActorPoolGuard = ActorPoolGuard;
//# sourceMappingURL=ActorPoolGuard.js.map