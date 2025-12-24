"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameplayCueRecorderBeam = exports.GameplayCueRecorderHook = exports.GameplayCueRecorderObject = undefined;
const UE = require("ue");
const Log_1 = require("../../Core/Common/Log");
const MathUtils_1 = require("../../Core/Utils/MathUtils");
const RecorderBlueprintFunctionLibrary_1 = require("./RecorderBlueprintFunctionLibrary");
class GameplayCueRecorderObject {
  constructor(e, t, r, i) {
    this.Actor = e;
    this.OutSeq = t;
    this.StartTime = r;
    this.RecordInterval = i;
    this.Recorder = undefined;
  }
  Start() {
    if (this.Recorder) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Test", 6, "Start GameplayCue Recorder", ["Actor", this.Actor.GetName()], ["Time", this.StartTime]);
      }
      this.Recorder.SetRecordActor(this.Actor, this.RecordInterval, RecorderBlueprintFunctionLibrary_1.RECORDER_MAX_SPEED);
      this.Recorder.StartRecorder(this.OutSeq, this.StartTime - RecorderBlueprintFunctionLibrary_1.EFFECT_CREATE_ADVANCE);
      this.Recorder.TickRecorder(RecorderBlueprintFunctionLibrary_1.EFFECT_CREATE_ADVANCE);
      this.Recorder.PlayCommand();
    }
  }
  TickRecorder(e) {
    this.Recorder.TickRecorder(e);
  }
  StopRecorder(e) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Test", 6, "Stop GameplayCue Recorder");
    }
    this.Recorder.StopCommand();
    this.Recorder.StopRecorder();
  }
}
class GameplayCueRecorderHook extends (exports.GameplayCueRecorderObject = GameplayCueRecorderObject) {
  constructor(e, t, r, i, s) {
    super(e, r, i, s);
    this.gar = new UE.VectorDouble();
    this.n8 = "";
    if (!e.RootComponent) {
      e.AddComponentByClass(UE.SceneComponent.StaticClass(), false, MathUtils_1.MathUtils.DefaultTransform, false);
    }
    this.Recorder = UE.NewObject(UE.KuroEffectRecorder.StaticClass());
    this.Recorder.SetEffectClass(UE.TsRecordGameplayCue_C.StaticClass(), "GameplayCue_" + this.Actor.GetName());
    this.n8 = t.Paths[0];
    this.gar = t.TargetPosition;
  }
  StopRecorder(e) {
    this.Recorder.AddStaticStrPropertyTrack(this.Actor, new UE.FName("Path"), this.n8, 0, e);
    var t = UE.KismetMathLibrary.Conv_VectorDoubleToVector(this.gar);
    this.Recorder.AddStaticVectorPropertyTrack(this.Actor, new UE.FName("Position0"), t, 0, e);
    super.StopRecorder(e);
  }
}
exports.GameplayCueRecorderHook = GameplayCueRecorderHook;
class GameplayCueRecorderBeam extends GameplayCueRecorderObject {
  constructor(e, t, r, i, s) {
    super(e, r, i, s);
    this.n8 = "";
    this.Idc = undefined;
    this.v$o = undefined;
    if (!e.RootComponent) {
      e.AddComponentByClass(UE.SceneComponent.StaticClass(), false, MathUtils_1.MathUtils.DefaultTransform, false);
    }
    this.Recorder = UE.NewObject(UE.KuroEffectRecorder.StaticClass());
    this.Recorder.SetEffectClass(UE.TsRecordGameplayCue_C.StaticClass(), "GameplayCue_" + this.Actor.GetName());
    this.n8 = t.Path;
    this.v$o = t;
    this.Idc = RecorderBlueprintFunctionLibrary_1.default.CreateNewDataAssetNoBlueprint("DA_GameplayCue_" + this.Actor.GetName(), UE.BP_GameplayCueBeamDataAsset_C.StaticClass());
  }
  TickRecorder(e) {
    super.TickRecorder(e);
    if (!(e < MathUtils_1.MathUtils.SmallNumber) && this.Idc) {
      this.Idc.TimeLine.Add(RecorderBlueprintFunctionLibrary_1.default.RecordingTimeNoBlueprint() - this.StartTime);
      var t = new UE.SVectorArray();
      if (this.v$o?.CurrentPoints) {
        for (const r of this.v$o.CurrentPoints) {
          t.Vectors.Add(r);
        }
      }
      this.Idc.PointPositions.Add(t);
    }
  }
  StopRecorder(e) {
    this.Recorder.AddStaticStrPropertyTrack(this.Actor, new UE.FName("Path"), this.n8, 0, e);
    this.Recorder.AddStaticObjectPropertyTrack(this.Actor, new UE.FName("BeamData"), this.Idc, 0, e);
    super.StopRecorder(e);
  }
}
exports.GameplayCueRecorderBeam = GameplayCueRecorderBeam;
//# sourceMappingURL=GameplayCueRecorder.js.map