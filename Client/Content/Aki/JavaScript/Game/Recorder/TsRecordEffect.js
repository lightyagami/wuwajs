"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Info_1 = require("../../Core/Common/Info");
const Log_1 = require("../../Core/Common/Log");
const EffectContext_1 = require("../Effect/EffectContext/EffectContext");
const EffectSystem_1 = require("../Effect/EffectSystem");
const RecorderBlueprintFunctionLibrary_1 = require("./RecorderBlueprintFunctionLibrary");
class TsRecordEffect extends UE.KuroRecordEffect {
  constructor() {
    super(...arguments);
    this.EffectModelDataPath = "";
    this.EffectModelData = undefined;
    this.LifeTimeType = 0;
    this.ManualProcessTime = 0;
    this.EffectHandle = 0;
    this.Playing = false;
    this.LastHidden = false;
  }
  Constructor() {
    this.EffectHandle = 0;
    this.Playing = false;
    this.LastHidden = false;
  }
  ReceiveBeginPlay() {
    RecorderBlueprintFunctionLibrary_1.default.RecorderPlayerInitializeTs();
    this.SetActorTickEnabled(true);
  }
  ReceiveEndPlay(t) {
    if (EffectSystem_1.EffectSystem.IsValid(this.EffectHandle)) {
      EffectSystem_1.EffectSystem.StopEffectById(this.EffectHandle, "[TsRecordEffect.ReceiveEndPlay]", true);
    }
  }
  ReceiveTick(t) {
    if (this.Playing && !this.EffectModelData && this.EffectModelDataPath) {
      this.TryAddEffectView();
    }
    if (this.EffectHandle && (Info_1.Info.IsGameRunning() || EffectSystem_1.EffectSystem.TickHandleInEditor(this.EffectHandle, t), this.LifeTimeType === 3 && this.ManualProcessTime > -1 && EffectSystem_1.EffectSystem.HandleSeekToTimeWithProcess(this.EffectHandle, this.ManualProcessTime, true, t), this.LastHidden !== this.bHidden)) {
      this.LastHidden = this.bHidden;
      EffectSystem_1.EffectSystem.SetEffectHidden(this.EffectHandle, this.bHidden);
    }
  }
  OnPlay() {
    this.Playing = true;
    this.TryAddEffectView();
  }
  OnStop() {
    this.Playing = false;
    if (EffectSystem_1.EffectSystem.IsValid(this.EffectHandle)) {
      EffectSystem_1.EffectSystem.StopEffectById(this.EffectHandle, "[TsRecordEffect.OnStop]", false);
    }
  }
  TryAddEffectView() {
    if (!this.EffectModelData) {
      if (!this.EffectModelDataPath) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Recorder", 6, "No EffectModelData", ["Actor", this.GetName()]);
        }
        return;
      }
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Recorder", 6, "No EffectModelData but TryLoad", ["Actor", this.GetName()], ["Path", this.EffectModelDataPath]);
      }
      this.EffectModelData = UE.Object.Load(this.EffectModelDataPath);
    }
    var t;
    if (!this.EffectHandle) {
      t = UE.KismetSystemLibrary.GetPathName(this.EffectModelData);
      this.EffectHandle = EffectSystem_1.EffectSystem.SpawnEffect(this, this.D_GetTransform(), t, "[TsRecordEffect.TryAddEffectView]", new EffectContext_1.EffectContext(undefined, this), 0, t => {
        if (this.LifeTimeType === 3) {
          EffectSystem_1.EffectSystem.FreezeHandle(t, true);
        }
      });
      if (EffectSystem_1.EffectSystem.IsValid(this.EffectHandle)) {
        EffectSystem_1.EffectSystem.GetEffectActor(this.EffectHandle).K2_AttachToActor(this, undefined, 2, 2, 2, false);
      }
    }
  }
}
exports.default = TsRecordEffect;
//# sourceMappingURL=TsRecordEffect.js.map