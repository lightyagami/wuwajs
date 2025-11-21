"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const puerts_1 = require("puerts");
const UE = require("ue");
const Info_1 = require("../../../../Core/Common/Info");
const Log_1 = require("../../../../Core/Common/Log");
const GameplayTagUtils_1 = require("../../../../Core/Utils/GameplayTagUtils");
const TsBaseCharacter_1 = require("../../../Character/TsBaseCharacter");
const SkeletalMeshEffectContext_1 = require("../../../Effect/EffectContext/SkeletalMeshEffectContext");
const EffectSystem_1 = require("../../../Effect/EffectSystem");
const TsEffectActor_1 = require("../../../Effect/TsEffectActor");
const GlobalData_1 = require("../../../GlobalData");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiEffectAnsContext_1 = require("../../../Module/UiModel/UiModelComponent/Common/UiModelAns/UiAnimNotifyStateContext/UiEffectAnsContext");
const EffectUtil_1 = require("../../../Utils/EffectUtil");
const RenderConfig_1 = require("../../Config/RenderConfig");
class AnimNotifyStateEffectParams {
  constructor(t, e, i) {
    this.EffectHandle = t;
    this.UiEffectAnsContext = e;
    this.HasSeekTo = i;
  }
}
class AnimNotifyStateEffect extends UE.KuroEffectMakerANS {
  constructor() {
    super(...arguments);
    this.NeedAnyTag = false;
    this.PlayNeedTags = undefined;
    this.EffectDataAssetRef = undefined;
    this.EffectSlotName = undefined;
    this.AutoDetachTime = -0;
    this.IsSyncEffectTimeScale = false;
    this.SocketName = undefined;
    this.UseSocketTransform = false;
    this.UseClipboardTransform = false;
    this.DetachWhenSkillEnd = false;
    this.IsWeaponEffect = false;
    this.WhenSkillEnd = 0;
    this.FasterStop = true;
    this.RecycleWhenEnd = false;
    this.AlwaysLoop = false;
    this.PlayOnEnd = false;
    this.SyncEventTimeToEffectTime = false;
    this.WithOutTag = undefined;
    this.IgnoreWhenInvisible = false;
    this.ParamsMap = new Map();
    this.IsInited = false;
    this.LastMeshComp = undefined;
  }
  Constructor() {
    this.ParamsMap = new Map();
    this.IsInited = false;
    this.LastMeshComp = undefined;
  }
  K2_ValidateAssets() {
    return true;
  }
  Init() {
    if (!this.IsInited) {
      this.ParamsMap = new Map();
      this.IsInited = true;
    }
  }
  K2_NotifyBegin(e, t, i) {
    if (this.IgnoreWhenInvisible && !e.IsVisible()) {
      return false;
    }
    this.Init();
    if (Info_1.Info.IsPlayInEditor) {
      this.LastMeshComp = e;
    }
    var s = e.GetOwner();
    if (s?.IsA(UE.TsUiSceneRoleActor_C.StaticClass()) || s?.IsA(UE.TsSkeletalObserver_C.StaticClass())) {
      if (e.IsComponentTickEnabled()) {
        var f = e.GetOwner();
        var r = new SkeletalMeshEffectContext_1.SkeletalMeshEffectContext(undefined);
        r.SkeletalMeshComp = e;
        r.SourceObject = f;
        r.CreateFromType = 1;
        r.AnsSlotName = this.EffectSlotName;
        var f = UE.KismetMathLibrary.Conv_VectorToVectorDouble(this.Location);
        var f = new UiEffectAnsContext_1.UiEffectAnsContext(this.EffectDataAssetRef.ToAssetPathName(), e, this.SocketName, this.Attached, this.AttachLocationOnly, f, this.Rotation, new UE.VectorDouble(this.Scale), this.PlayOnEnd, this.FasterStop, r, (t, e) => {
          if (EffectSystem_1.EffectSystem.IsValid(e) && this.ParamsMap.has(t)) {
            if (this.SyncEventTimeToEffectTime) {
              EffectSystem_1.EffectSystem.FreezeHandle(e, true, true);
            }
            this.ParamsMap.get(t).EffectHandle = e;
          }
        });
        let t = undefined;
        (s?.IsA(UE.TsUiSceneRoleActor_C.StaticClass()), t = s.Model.CheckGetComponent(6)).AddAns("UiEffectAnsContext", f);
        this.ParamsMap.set(e, new AnimNotifyStateEffectParams(undefined, f, false));
      }
    } else if (!this.PlayOnEnd) {
      if (this.ParamsMap.has(e)) {
        return false;
      }
      r = this.SpawnEffectInternal(e, t);
      if (!r) {
        return false;
      }
      if (this.SyncEventTimeToEffectTime) {
        EffectSystem_1.EffectSystem.FreezeHandle(r, true, true);
      }
      this.ParamsMap.set(e, new AnimNotifyStateEffectParams(r, undefined, false));
    }
    return true;
  }
  SpawnEffectInternal(t, e, i = false) {
    var s = t.GetOwner();
    if (s instanceof TsBaseCharacter_1.default && !this.GameplayTagsCheck(s)) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("RenderEffect", 50, "AnimNotifyStateEffect：特效GameplayTag检查失败", ["meshComp", t?.GetName()], ["outer", t.GetOwner()?.GetName()], ["animation", e?.GetName()]);
      }
      return 0;
    }
    s = t.GetOwner();
    let f = undefined;
    if (s instanceof TsBaseCharacter_1.default && s.CharacterActorComponent?.Entity) {
      f = new SkeletalMeshEffectContext_1.SkeletalMeshEffectContext(s.CharacterActorComponent?.Entity.Id);
    } else if (s.IsA(UE.TsEffectActor_C.StaticClass())) {
      (f = new SkeletalMeshEffectContext_1.SkeletalMeshEffectContext(s.OwnerEntityId)).IsSyncEffectTimeScale = this.IsSyncEffectTimeScale || (ModelManager_1.ModelManager.CharacterModel?.EnabledSelfCentered ?? false);
    } else if (s.IsA(UE.EffectSystemActor.StaticClass())) {
      (f = new SkeletalMeshEffectContext_1.SkeletalMeshEffectContext(s.GetOwnerEntityId())).IsSyncEffectTimeScale = this.IsSyncEffectTimeScale || (ModelManager_1.ModelManager.CharacterModel?.EnabledSelfCentered ?? false);
    } else {
      f = new SkeletalMeshEffectContext_1.SkeletalMeshEffectContext(undefined);
    }
    f.SkeletalMeshComp = t;
    f.SourceObject = s;
    f.CreateFromType = 1;
    f.AnsSlotName = this.EffectSlotName;
    if (s?.ActorHasTag(AnimNotifyStateEffect.TagFlagNoNiagara)) {
      f.PlayFlag |= 1;
    }
    let r = Info_1.Info.IsGameRunning() ? 3 : 0;
    if (Info_1.Info.IsInCg()) {
      r = 0;
    }
    if (GlobalData_1.GlobalData.IsUiSceneOpen || s.Tags.Contains(RenderConfig_1.RenderConfig.UIName)) {
      r = 1;
    } else if (s instanceof TsBaseCharacter_1.default && s.CharacterActorComponent?.Entity?.GetComponent(39) || s instanceof TsEffectActor_1.default && s.GetEffectType() === 0 || s?.IsA(UE.EffectSystemActor.StaticClass()) && s.GetEffectType() === 0) {
      r = 0;
    }
    EffectSystem_1.EffectSystem.InitializeWithPreview(false);
    e = this.EffectDataAssetRef.ToAssetPathName();
    let n = undefined;
    if (Info_1.Info.IsGameRunning()) {
      if (s instanceof TsBaseCharacter_1.default) {
        n = s.CharacterActorComponent?.GetReplaceEffect(e);
      }
    } else {
      n = EffectUtil_1.EffectUtil.GetPreviewReplaceEffectPath(e);
    }
    if (this.SyncEventTimeToEffectTime && e?.includes("QianxiaoReadNovelLoop")) {
      r = 0;
    }
    let a = 0;
    a = i ? EffectSystem_1.EffectSystem.SpawnUnloopedEffect(s, new UE.TransformDouble(), n || e, "[AnimNotifyStateEffect.SpawnEffectInternal]", f, r) : EffectSystem_1.EffectSystem.SpawnEffect(s, new UE.TransformDouble(), n || e, "[AnimNotifyStateEffect.SpawnEffectInternal]", f, r);
    EffectSystem_1.EffectSystem.SetEffectNotRecord(a, true);
    if (a && EffectSystem_1.EffectSystem.IsValid(a)) {
      this.AttachEffectToSkill(s, a);
      this.AttachEffectToSelfCentered(s, a);
      this.AttachEffectToWeapon(t, s, a);
      this.SetupTransform(EffectSystem_1.EffectSystem.GetEffectActor(a), t);
      EffectSystem_1.EffectSystem.ForceCheckPendingInit(a);
      return a;
    } else {
      return 0;
    }
  }
  AttachEffectToSkill(e, i) {
    if (e instanceof TsBaseCharacter_1.default) {
      e = e.CharacterActorComponent?.Entity?.GetComponent(39);
      if (e) {
        let t = 0;
        if (!!this.DetachWhenSkillEnd || this.WhenSkillEnd !== 0) {
          if (this.DetachWhenSkillEnd && this.WhenSkillEnd === 0) {
            t = 2;
          } else if (this.DetachWhenSkillEnd || this.WhenSkillEnd !== 0) {
            if (this.DetachWhenSkillEnd && this.WhenSkillEnd === 1) {
              t = 3;
            } else if (this.DetachWhenSkillEnd && this.WhenSkillEnd === 2) {
              t = 4;
            } else if (this.DetachWhenSkillEnd || this.WhenSkillEnd !== 1) {
              if (!this.DetachWhenSkillEnd && this.WhenSkillEnd === 2) {
                t = 6;
              }
            } else {
              t = 5;
            }
          } else {
            t = 1;
          }
        }
        e.AttachEffectToSkill(i, t, this.SocketName, -1);
      }
    }
  }
  AttachEffectToSelfCentered(t, e) {
    var i;
    if (t instanceof TsBaseCharacter_1.default) {
      if (!(i = t.CharacterActorComponent?.Entity?.GetComponent(39)) || !i.CurrentSkill) {
        if ((i = t.CharacterActorComponent?.Entity?.GetComponent(293))?.Valid) {
          i.AddEffect(e);
        }
      }
    }
  }
  AttachEffectToWeapon(t, e, i) {
    if (this.IsWeaponEffect && e instanceof TsBaseCharacter_1.default) {
      e = e.CharacterActorComponent?.Entity?.GetComponent(81);
      if (e?.Valid) {
        for (const s of e.GetWeaponMesh().CharacterWeapons) {
          if (s.Mesh === t) {
            s.AddBuffEffect(i);
          }
        }
      }
    }
  }
  K2_NotifyTick(t, e, i) {
    var s;
    var f;
    var r;
    var n = this.ParamsMap.get(t);
    return !!n && !!(s = n.EffectHandle) && !!EffectSystem_1.EffectSystem.IsValid(s) && !(this.Attached && this.AttachLocationOnly && this.SocketName !== AnimNotifyStateEffect.NameNone && (f = EffectSystem_1.EffectSystem.GetEffectActor(s), t = t.D_GetSocketTransform(this.SocketName, 0), r = UE.KismetMathLibrary.Conv_VectorToVectorDouble(this.Location), f.D_K2_SetActorLocation(t.TransformPosition(r), false, undefined, false)), this.SyncEventTimeToEffectTime && (n.HasSeekTo && (n.HasSeekTo = false, EffectSystem_1.EffectSystem.FreezeHandle(s, false, true)), EffectSystem_1.EffectSystem.IsHandleFreeze(s)) && EffectSystem_1.EffectSystem.HandleSeekToTime(s, this.CurrentTimeLength, false, true) && (n.HasSeekTo = true), 0);
  }
  K2_NotifyEnd(t, e) {
    var i = t.GetOwner();
    if (i?.IsA(UE.TsUiSceneRoleActor_C.StaticClass()) || i?.IsA(UE.TsSkeletalObserver_C.StaticClass())) {
      const f = this.ParamsMap.get(t);
      if (f && f.UiEffectAnsContext) {
        i?.IsA(UE.TsUiSceneRoleActor_C.StaticClass());
        var s = i.Model;
        if (s) {
          s.CheckGetComponent(6).ReduceAns("UiEffectAnsContext", f.UiEffectAnsContext);
          this.ParamsMap.delete(t);
          return true;
        }
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("RenderEffect", 25, "AnimNotifyStateEffect未成对，model为空");
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("RenderEffect", 43, "AnimNotifyStateEffect未成对，UiEffectAnsContext为空");
      }
      return false;
    }
    if (this.PlayOnEnd) {
      if (this.IgnoreWhenInvisible && !t.IsVisible()) {
        return false;
      }
      if (i instanceof TsBaseCharacter_1.default) {
        if (!i.CharacterActorComponent?.Entity?.GetComponent(209)?.HasAnyTag(GameplayTagUtils_1.GameplayTagUtils.ConvertFromUeContainer(this.WithOutTag))) {
          return this.SpawnEffectInternal(t, e, true) !== 0;
        }
      }
    }
    const f = this.ParamsMap.get(t);
    return !!f && (this.ParamsMap.delete(t), f.EffectHandle && EffectSystem_1.EffectSystem.StopEffectById(f.EffectHandle, `[动画:${e.GetName()}，AnimNotifyStateEffect.K2_NotifyEnd]`, this.FasterStop), true);
  }
  GameplayTagsCheck(t) {
    var e = t.CharacterActorComponent?.Entity?.GetComponent(209);
    if (e) {
      var i = this.PlayNeedTags.Num();
      if (this.NeedAnyTag) {
        for (let t = 0; t < i; t++) {
          var s = this.PlayNeedTags.GetKey(t);
          var f = this.PlayNeedTags.Get(s);
          if (e.HasTag(s.TagId) === f) {
            return true;
          }
        }
        return false;
      }
      for (let t = 0; t < i; t++) {
        var r = this.PlayNeedTags.GetKey(t);
        var n = this.PlayNeedTags.Get(r);
        if (e.HasTag(r.TagId) !== n) {
          return false;
        }
      }
    }
    return true;
  }
  K2_PostChangeProperty(t) {
    if (t.op_Equality(RenderConfig_1.RenderConfig.UseSocketTransform2)) {
      this.UseSocketTransform = false;
      if (this.LastMeshComp) {
        e = this.LastMeshComp.D_GetSocketTransform(this.SocketName, 3);
        i = UE.KismetMathLibrary.Conv_VectorDoubleToVector(e.GetLocation());
        this.Location = i;
        this.Rotation = e.GetRotation().Rotator();
        i = UE.KismetMathLibrary.Conv_VectorDoubleToVector(e.GetScale3D());
        this.Scale = i;
      }
    } else if (t.op_Equality(RenderConfig_1.RenderConfig.UseClipboardTransform2)) {
      const f = (this.UseClipboardTransform = false, puerts_1.$ref)("");
      UE.KuroRenderingRuntimeBPPluginBPLibrary.ClipboardPaste_EditorOnly(f);
      var e = t => {
        var e = (0, puerts_1.$unref)(f);
        var i = e.indexOf(t, -1);
        if (i >= 0) {
          var s = e.indexOf(")", i);
          if (s >= 0) {
            return e.substring(i + t.length, s);
          }
        }
        return "";
      };
      var i = e("Translation=(");
      var t = (0, puerts_1.$ref)(this.Location);
      var s = (0, puerts_1.$ref)(false);
      UE.KismetStringLibrary.Conv_StringToVector(i, t, s);
      if ((0, puerts_1.$unref)(s)) {
        this.Location = (0, puerts_1.$unref)(t);
      }
      var i = e("Rotation=(");
      var t = (0, puerts_1.$ref)(this.Rotation);
      UE.KismetStringLibrary.Conv_StringToRotator(i, t, s);
      if ((0, puerts_1.$unref)(s)) {
        this.Rotation = (0, puerts_1.$unref)(t);
      }
      var i = e("Scale3D=(");
      var t = (0, puerts_1.$ref)(this.Scale);
      UE.KismetStringLibrary.Conv_StringToVector(i, t, s);
      if ((0, puerts_1.$unref)(s)) {
        this.Scale = (0, puerts_1.$unref)(t);
      }
    }
    return true;
  }
  GetNotifyName() {
    var t = this.EffectDataAssetRef.ToAssetPathName();
    if (t) {
      return UE.BlueprintPathsLibrary.GetBaseFilename(t, true);
    } else {
      return "特效数据状态";
    }
  }
  SetupTransform(t, e) {
    var i;
    var s;
    if (this.Attached && !this.AttachLocationOnly && this.SocketName !== AnimNotifyStateEffect.NameNone) {
      t.K2_AttachToComponent(e, this.SocketName, 0, 0, 0, false);
      i = UE.KismetMathLibrary.Conv_VectorToVectorDouble(this.Location);
      s = UE.KismetMathLibrary.Conv_VectorToVectorDouble(this.Scale);
      i = new UE.TransformDouble(this.Rotation, i, s);
      s = (0, puerts_1.$ref)(new UE.HitResult());
      t.D_K2_SetActorRelativeTransform(i, false, s, true);
    } else {
      i = e.D_GetSocketTransform(this.SocketName, 0);
      s = UE.KismetMathLibrary.Conv_VectorToVectorDouble(this.Location);
      t.D_K2_SetActorLocationAndRotation(i.TransformPosition(s), i.TransformRotation(this.Rotation.Quaternion()).Rotator(), false, undefined, true);
      e = UE.KismetMathLibrary.Conv_VectorToVectorDouble(this.Scale);
      t.D_SetActorScale3D(e);
    }
  }
}
AnimNotifyStateEffect.NameNone = new UE.FName("None");
AnimNotifyStateEffect.TagFlagNoNiagara = new UE.FName("NoNiagara");
exports.default = AnimNotifyStateEffect; //# sourceMappingURL=AnimNotifyStateEffect.js.map