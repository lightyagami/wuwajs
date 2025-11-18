"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const puerts_1 = require("puerts");
const UE = require("ue");
const AudioSystem_1 = require("../../Core/Audio/AudioSystem");
const Log_1 = require("../../Core/Common/Log");
const QueryTypeDefine_1 = require("../../Core/Define/QueryTypeDefine");
const Vector_1 = require("../../Core/Utils/Math/Vector");
const TraceElementCommon_1 = require("../../Core/Utils/TraceElementCommon");
const GlobalData_1 = require("../GlobalData");
const ModelManager_1 = require("../Manager/ModelManager");
const SequenceUtils_1 = require("../Module/Plot/Sequence/SequenceUtils");
const VoxelUtils_1 = require("../Utils/VoxelUtils");
const MATERIAL_ID_WAT = 6;
const MATERIAL_ID_SHR = 14;
class TsSeqAnimNotifyFootstepAudioEvent extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments);
    this.Variant = 0;
    this.FootstepEvent = undefined;
    this.FootTraceElement = undefined;
    this.FootstepVariantMap = UE.NewMap(UE.BuiltinInt, UE.BuiltinString);
  }
  Constructor() {}
  K2_Notify(e, t) {
    if (!e) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Audio", 45, "不存在的MeshComp", ["AnimNotify", this.GetName()]);
      }
      return false;
    }
    if (e.bHiddenInGame) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Audio", 45, "隐藏的MeshComp", ["AnimNotify", this.GetName()]);
      }
      return false;
    }
    e = e.GetOwner();
    if (!e) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Audio", 45, "不存在的MeshComp Owner", ["AnimNotify", this.GetName()]);
      }
      return false;
    }
    if (e.bHidden) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Audio", 45, "隐藏的MeshComp Owner", ["AnimNotify", this.GetName()]);
      }
      return false;
    }
    let i = false;
    var o = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetWorldType(e);
    if (o !== 1 && o !== 3) {
      o = SequenceUtils_1.SequenceUtils.GetSelectedSequenceInEditor();
      if (o && (i = o.GetAnimAudio(), Log_1.Log.CheckDebug() && Log_1.Log.Debug("Audio", 45, "存在Seq", ["seq", o.GetName()], ["AnimAudio", i]), i)) {
        AudioSystem_1.AudioSystem.SetSwitch("footstep_texture", "DirtSurface", e);
        const s = this.FootstepEvent && (0, AudioSystem_1.parseAudioEventPath)(this.FootstepEvent);
        if (!s) {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Audio", 45, "[Game.AnimNotify] eventName为空", ["EventName", s], ["AnimNotify", this.GetName()]);
          }
          return false;
        }
        if (!SequenceUtils_1.SequenceUtils.CheckIfUseAudioSeq(e)) {
          return false;
        }
        const r = AudioSystem_1.AudioSystem.GetAkComponent(e);
        AudioSystem_1.AudioSystem.PostEvent(s, r);
        return true;
      }
    } else {
      i = ModelManager_1.ModelManager.SequenceModel.CurLevelSeqActor?.GetSequence()?.GetAnimAudio() ?? false;
    }
    if (!i) {
      return false;
    }
    this.FootstepVariantMap.Set(0, "land");
    this.FootstepVariantMap.Set(1, "run");
    this.FootstepVariantMap.Set(2, "runstop");
    this.FootstepVariantMap.Set(3, "sprint");
    this.FootstepVariantMap.Set(4, "sprintstop");
    this.FootstepVariantMap.Set(5, "walk");
    this.FootstepVariantMap.Set(6, "walkstop");
    this.FootstepVariantMap.Set(7, "turnback");
    o = e.D_K2_GetActorLocation();
    this.FootTraceElement = UE.NewObject(UE.TraceLineElement.StaticClass());
    this.FootTraceElement.bIsSingle = true;
    this.FootTraceElement.bTraceComplex = false;
    this.FootTraceElement.bIgnoreSelf = true;
    this.FootTraceElement.WorldContextObject = e;
    this.FootTraceElement.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.IkGround);
    this.FootTraceElement.SetStartLocation(o.X, o.Y, o.Z);
    this.FootTraceElement.SetEndLocation(o.X, o.Y, o.Z - 400);
    UE.KuroTraceLibrary.LineTrace(this.FootTraceElement, "");
    const r = AudioSystem_1.AudioSystem.GetAkComponent(e);
    AudioSystem_1.AudioSystem.SetSwitch("footstep_variant", this.FootstepVariantMap.Get(this.Variant), e);
    o = this.GetFootstepTexture();
    this.FootTraceElement.Dispose();
    const s = this.FootstepEvent && (0, AudioSystem_1.parseAudioEventPath)(this.FootstepEvent);
    if (s) {
      return !!SequenceUtils_1.SequenceUtils.CheckIfUseAudioSeq(e) && (AudioSystem_1.AudioSystem.SetSwitch("footstep_texture", o, e), AudioSystem_1.AudioSystem.PostEvent(s, r), true);
    } else {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Audio", 45, "[Game.AnimNotify] eventName为空", ["EventName", s], ["AnimNotify", this.GetName()]);
      }
      return false;
    }
  }
  GetNotifyName() {
    return "SeqAnimNotifyFootstepAudioEvent";
  }
  GetFootstepTexture() {
    var e = this.FootTraceElement?.HitResult;
    if (!e?.IsValid()) {
      return "DirtSurface";
    }
    let t = false;
    var i;
    var o = e.Components.Get(0);
    var o = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetComponentPhysicalMaterial(o);
    if (t = !!o?.IsValid() && o.GetName() === "WaterLightLand" || t) {
      return this.CheckWaterSurfaceType(e);
    } else {
      o = Vector_1.Vector.Create();
      TraceElementCommon_1.TraceElementCommon.GetHitLocation(e, 0, o);
      e = o.ToUeVector();
      o = (0, puerts_1.$ref)(undefined);
      i = (0, puerts_1.$ref)(undefined);
      if (GlobalData_1.GlobalData.World) {
        if (VoxelUtils_1.VoxelUtils.TryGetVoxelInfo(GlobalData_1.GlobalData.World, e, o, -1, i)) {
          if (o = (0, puerts_1.$unref)(o)) {
            if (o.MtlID === MATERIAL_ID_WAT || o.MtlID === MATERIAL_ID_SHR) {
              return "DirtSurface";
            } else {
              return UE.KuroVoxelSystem.GetMtlNameByID(o.MtlID);
            }
          } else {
            if (Log_1.Log.CheckWarn()) {
              Log_1.Log.Warn("LevelEvent", 45, "[WorldController]Streaming:获取voxelInfo信息失败", ["Location", e], ["ErrorCode", (0, puerts_1.$unref)(i)]);
            }
            return "DirtSurface";
          }
        } else {
          if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("LevelEvent", 45, "[WorldController]Streaming:获取体素信息失败", ["Location", e], ["ErrorCode", (0, puerts_1.$unref)(i)]);
          }
          return "DirtSurface";
        }
      } else {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("LevelEvent", 45, "World为空");
        }
        return "DirtSurface";
      }
    }
  }
  CheckWaterSurfaceType(t) {
    if (t) {
      var i = t.GetHitCount();
      for (let e = 0; e < i; ++e) {
        if (UE.KuroCollisionLibrary.GetBodyInstance(t, e).CollisionResponses.ResponseToChannels.GameTraceChannel2 === 2) {
          return "WaterSurface";
        }
      }
    }
    return "DirtSurface";
  }
}
exports.default = TsSeqAnimNotifyFootstepAudioEvent;
//# sourceMappingURL=TsSeqAnimNotifyFootstepAudioEvent.js.map