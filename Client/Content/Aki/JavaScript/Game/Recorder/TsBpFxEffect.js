"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const RecorderBlueprintFunctionLibrary_1 = require("./RecorderBlueprintFunctionLibrary");
class TsBpFxEffect extends UE.Actor {
  constructor() {
    super(...arguments);
    this.IsRecorderActor = false;
    this.RecordTime = 0;
    this.RecorderShadow = undefined;
    this.Recorder = undefined;
  }
  Constructor() {
    this.Recorder = undefined;
  }
  ReceiveBeginPlay() {
    this.OnPlay();
  }
  ReceiveEndPlay() {
    this.OnStop();
  }
  TryRecord() {
    this.OnPlay();
  }
  AddAutoFloatTrack(r) {
    this.Recorder?.Recorder?.AddAutoFloatPropertyTrack(this, r, RecorderBlueprintFunctionLibrary_1.default.RecordingTimeNoBlueprint());
  }
  AddAutoVectorTrack(r) {
    this.Recorder?.Recorder?.AddAutoVectorPropertyTrack(this, r, RecorderBlueprintFunctionLibrary_1.default.RecordingTimeNoBlueprint());
  }
  AddAutoObjectTrack(r) {
    this.Recorder?.Recorder?.AddAutoObjectPropertyTrack(this, r, RecorderBlueprintFunctionLibrary_1.default.RecordingTimeNoBlueprint());
  }
  OnRecordStart() {}
  OnRecordTick(r) {
    this.RecordTime = RecorderBlueprintFunctionLibrary_1.default.RecordingTimeNoBlueprint();
  }
  OnRecordStop() {}
  OnPlay() {
    if (RecorderBlueprintFunctionLibrary_1.default.Recording && !this.Recorder) {
      this.Recorder = RecorderBlueprintFunctionLibrary_1.default.StartRecordTsBpFxEffect(this);
    }
  }
  OnStop() {
    if (RecorderBlueprintFunctionLibrary_1.default.Recording && this.RecorderShadow) {
      RecorderBlueprintFunctionLibrary_1.default.StopRecordTsBpFxEffect(this);
    }
  }
  ClearRecorder() {
    this.Recorder = undefined;
    this.RecorderShadow = undefined;
  }
}
exports.default = TsBpFxEffect;
//# sourceMappingURL=TsBpFxEffect.js.map