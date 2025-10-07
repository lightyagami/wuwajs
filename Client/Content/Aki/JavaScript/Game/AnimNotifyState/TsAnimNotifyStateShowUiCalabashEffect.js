"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Log_1 = require("../../Core/Common/Log");
const SkeletalMeshEffectContext_1 = require("../Effect/EffectContext/SkeletalMeshEffectContext");
const EffectSystem_1 = require("../Effect/EffectSystem");
const TsUiSceneRoleActor_1 = require("../Module/UiComponent/TsUiSceneRoleActor");
const UiEffectAnsContext_1 = require("../Module/UiModel/UiModelComponent/Common/UiModelAns/UiAnimNotifyStateContext/UiEffectAnsContext");
class AnimNotifyStateEffectParams {
  constructor(t, e, i) {
    this.EffectHandle = t;
    this.UiEffectAnsContext = e;
    this.HasSeekTo = i;
  }
}
class TsAnimNotifyStateShowUiCalabashEffect extends UE.KuroEffectMakerANS {
  constructor() {
    super(...arguments);
    this.PlayOnEnd = false;
    this.EffectSlotName = undefined;
    this.ParamsMap = new Map();
    this.IsInited = false;
  }
  Constructor() {
    this.ParamsMap = new Map();
    this.IsInited = false;
  }
  Init() {
    if (!this.IsInited) {
      this.ParamsMap = new Map();
      this.IsInited = true;
    }
  }
  K2_NotifyBegin(t, e, i) {
    if (t.IsVisible()) {
      this.Init();
      var f = t.GetOwner();
      if (f instanceof TsUiSceneRoleActor_1.default) {
        if (!f.Model) {
          return false;
        }
        var s = f.Model.CheckGetComponent(18);
        if (!s) {
          return false;
        }
        s = s.GetHuluHandle().Model;
        if (!s) {
          return false;
        }
        s = s.CheckGetComponent(31);
        if (!s) {
          return false;
        }
        f = f.Model?.CheckGetComponent(6);
        if (!f) {
          return false;
        }
        var o = t.GetOwner();
        var n = new SkeletalMeshEffectContext_1.SkeletalMeshEffectContext(undefined);
        n.SkeletalMeshComp = t;
        n.SourceObject = o;
        n.CreateFromType = 1;
        n.AnsSlotName = this.EffectSlotName;
        var o = UE.KismetMathLibrary.Conv_VectorToVectorDouble(this.Location);
        var s = new UiEffectAnsContext_1.UiEffectAnsContext(s.EffectPath, t, this.SocketName, this.Attached, this.AttachLocationOnly, o, this.Rotation, new UE.VectorDouble(this.Scale), this.PlayOnEnd, true, n, (t, e) => {
          if (EffectSystem_1.EffectSystem.IsValid(e) && this.ParamsMap.has(t)) {
            this.ParamsMap.get(t).EffectHandle = e;
          }
        });
        f.AddAns("UiEffectAnsContext", s);
        this.ParamsMap.set(t, new AnimNotifyStateEffectParams(undefined, s, false));
      }
    }
    return false;
  }
  K2_NotifyTick(t, e, i) {
    var f;
    var s = this.ParamsMap.get(t);
    return !!s && !!(s = s.EffectHandle) && !!EffectSystem_1.EffectSystem.IsValid(s) && !(this.Attached && this.AttachLocationOnly && this.SocketName !== TsAnimNotifyStateShowUiCalabashEffect.NameNone && (s = EffectSystem_1.EffectSystem.GetEffectActor(s), t = t.D_GetSocketTransform(this.SocketName, 0), f = UE.KismetMathLibrary.Conv_VectorToVectorDouble(this.Location), s.D_K2_SetActorLocation(t.TransformPosition(f), false, undefined, false)), 0);
  }
  K2_NotifyEnd(t, e) {
    var i = t.GetOwner();
    if (i instanceof TsUiSceneRoleActor_1.default) {
      var f = this.ParamsMap.get(t);
      if (f && f.UiEffectAnsContext) {
        if (i.Model) {
          i.Model.CheckGetComponent(6).ReduceAns("UiEffectAnsContext", f.UiEffectAnsContext);
          this.ParamsMap.delete(t);
          return true;
        }
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("RenderEffect", 25, "AnimNotifyStateEffect未成对，model为空");
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("RenderEffect", 43, "AnimNotifyStateEffect未成对，UiEffectAnsContext为空");
      }
    }
    return false;
  }
  GetNotifyName() {
    return "Ui界面葫芦显示特效";
  }
}
TsAnimNotifyStateShowUiCalabashEffect.NameNone = new UE.FName("None");
exports.default = TsAnimNotifyStateShowUiCalabashEffect; //# sourceMappingURL=TsAnimNotifyStateShowUiCalabashEffect.js.map