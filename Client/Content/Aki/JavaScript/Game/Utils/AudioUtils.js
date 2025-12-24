"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AudioUtils = exports.FoliageAudioInfo = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../Core/Common/Log");
const FNameUtil_1 = require("../../Core/Utils/FNameUtil");
const GlobalData_1 = require("../GlobalData");
const ModelManager_1 = require("../Manager/ModelManager");
const AUDIO_TAG_PREFIX = "Audio_";
class FoliageAudioInfo {
  constructor() {
    this.PhysicalMaterial = undefined;
    this.FoliageName = FNameUtil_1.FNameUtil.NONE;
    this.IsAudioShrub = false;
    this.IsHitFoliage = false;
    this.AudioShrubTag = FNameUtil_1.FNameUtil.NONE;
  }
}
exports.FoliageAudioInfo = FoliageAudioInfo;
class AudioUtils {
  static HandleAudioBoxUpdate(e, o) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Audio", 39, "[AudioBox] 更新音频盒子队列", ["Type", o], ["Box", e]);
    }
    var e = ModelManager_1.ModelManager.AudioModel.UpdateAudioBoxQueue(e, o);
    if (e && (o = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(e.PbDataId)) && (e = o.Entity.GetComponent(140))) {
      e.PostAudioBoxEvent();
    }
  }
  static QueryFoliageAudioPhysicalMaterial(e, o = undefined) {
    var r = new FoliageAudioInfo();
    var i = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSubsystem(GlobalData_1.GlobalData.World, UE.KuroAudioMaterialSubsystem.StaticClass());
    var t = (0, puerts_1.$ref)(FNameUtil_1.FNameUtil.NONE);
    var a = (0, puerts_1.$ref)(undefined);
    var s = (0, puerts_1.$ref)(undefined);
    r.IsHitFoliage = i.QueryInsideAnyFoliageInstance(e, t, a, s);
    r.FoliageName = (0, puerts_1.$unref)(t);
    r.PhysicalMaterial = (0, puerts_1.$unref)(a);
    var i = (0, puerts_1.$unref)(t).toString();
    if (i.includes("_Shr_") || i.includes("_Veg_")) {
      r.IsAudioShrub = true;
    }
    var _ = (0, puerts_1.$unref)(s);
    if (_ && _.StaticMesh) {
      for (let e = 0; e < _.StaticMesh.Tags.Num(); ++e) {
        var u = _.StaticMesh.Tags.Get(e).toString();
        if (u.startsWith(AUDIO_TAG_PREFIX)) {
          r.AudioShrubTag = new UE.FName(u.substring(AUDIO_TAG_PREFIX.length));
        }
      }
    }
    o?.GetComponent(199)?.UpdateIsInAudioShrubEvent(r.IsAudioShrub, r.AudioShrubTag);
    return r;
  }
}
exports.AudioUtils = AudioUtils;
//# sourceMappingURL=AudioUtils.js.map