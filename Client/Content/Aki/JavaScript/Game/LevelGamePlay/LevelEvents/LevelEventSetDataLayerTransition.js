"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventSetDataLayerTransition = undefined;
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const FNameUtil_1 = require("../../../Core/Utils/FNameUtil");
const GlobalData_1 = require("../../GlobalData");
const TsTransitionWorldPartitionTriggerVolume_1 = require("../../NewWorld/TriggerItems/TsTransitionWorldPartitionTriggerVolume");
const LevelGamePlayUtils_1 = require("../LevelGamePlayUtils");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventSetDataLayerTransition extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, a) {
    if (e) {
      var t = e.VolumeActor.PathName;
      var r = t.split(".");
      if (r.length < 3) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LevelEvent", 39, "[SetDataLayerTransition]actor路径错误", ["RefPath", t]);
        }
      } else {
        r = r[1] + "." + r[2];
        a = LevelGamePlayUtils_1.LevelGamePlayUtils.GetEntityHandle(undefined, a);
        if (a?.Valid) {
          a = a.Entity?.GetComponent(174);
          if (a && !a.IsValidPlatFormPath(r)) {
            return;
          }
        }
        var a = FNameUtil_1.FNameUtil.GetDynamicFName(r);
        var r = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSubsystem(GlobalData_1.GlobalData.World, UE.KuroActorSubsystem.StaticClass()).GetActor(a);
        if (r?.IsValid()) {
          if (r instanceof UE.BP_TsTransitionWorldPartitionTriggerVolumeWrapper_C) {
            if ((a = r.TargetVolume)?.IsValid()) {
              if (a instanceof TsTransitionWorldPartitionTriggerVolume_1.default) {
                a.SetMatForActivatingDataLayersByPath(e.MaterialDataForEnable);
                a.SetMatForDeactivatingDataLayersByPath(e.MaterialDataForDisable);
                a.SetSeqForSourceInByPath(e.VolumeEnterSeq);
                a.SetSeqForSourceOutByPath(e.VolumeOutSeq);
              } else if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("LevelEvent", 39, "[SetDataLayerTransition]目标volume不是TsTransitionWorldPartitionTriggerVolume", ["RefPath", t]);
              }
            } else if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("LevelEvent", 39, "[SetDataLayerTransition]目标volume尚不存在", ["RefPath", t]);
            }
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("LevelEvent", 39, "[SetDataLayerTransition]目标actor不是BP_TsTransitionWorldPartitionTriggerVolumeWrapper_C", ["RefPath", t]);
          }
        } else if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("LevelEvent", 39, "[SetDataLayerTransition]目标actor尚不存在", ["RefPath", t]);
        }
      }
    } else {
      this.FinishExecute(false);
    }
  }
}
exports.LevelEventSetDataLayerTransition = LevelEventSetDataLayerTransition;
//# sourceMappingURL=LevelEventSetDataLayerTransition.js.map