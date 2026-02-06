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
const UiModelUtil_1 = require("../../../Module/UiModel/UiModelUtil");
const TsBaseVehicle_1 = require("../../../NewWorld/Vehicle/TsBaseVehicle");
const ActorUtils_1 = require("../../../Utils/ActorUtils");
const EffectUtil_1 = require("../../../Utils/EffectUtil");
const TsAnimNotifyUtils_1 = require("../../../Utils/TsAnimNotifyUtils");
const RenderConfig_1 = require("../../Config/RenderConfig");
class AnimNotifyStateEffectParams {
  constructor(t, e, i, s) {
    this.EffectHandle = t;
    this.UiEffectAnsContext = e;
    this.HasSeekTo = i;
    this.ContinuousSeek = s;
  }
}
class AnimNotifyStateEffect extends UE.KuroEffectMakerANS {
  constructor() {
    super(...arguments);
    this.NeedAnyTag = false;
    this.PlayNeedTags = undefined;
    this.TagCheckWithOwner = false;
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
    this.SyncEventTimeContinuous = false;
    this.WithOutTag = undefined;
    this.IgnoreWhenInvisible = false;
    this.IgnoreWhenEntityNotInit = false;
    this.DisableOnVehicle = false;
    this.ParamsMap = new Map();
    this.IsInited = false;
    this.LastMeshComp = undefined;
    this.NotRealAttach = false;
    this.IsUiModelTagChecked = false;
  }
  Constructor() {
    this.ParamsMap = new Map();
    this.IsInited = false;
    this.LastMeshComp = undefined;
    this.IsUiModelTagChecked = false;
  }
  K2_ValidateAssets() {
    return true;
  }
  CheckRealAttach() {
    this.NotRealAttach = this.AttachLocationOnly || this.AttachLocationTime > 0 || this.AttachRotationTime > 0;
  }
  Init() {
    if (!this.IsInited) {
      this.ParamsMap = new Map();
      this.IsInited = true;
    }
  }
  K2_NotifyBegin(e, i, t) {
    if (this.IgnoreWhenInvisible && !e.IsVisible()) {
      return false;
    }
    if (this.IgnoreWhenEntityNotInit) {
      var s = ActorUtils_1.ActorUtils.GetEntityByActor(e.GetOwner(), false);
      if (s?.Valid && s.Entity?.Valid && !s.Entity.IsInit) {
        return false;
      }
    }
    this.Init();
    this.CheckRealAttach();
    if (Info_1.Info.IsPlayInEditor) {
      this.LastMeshComp = e;
    }
    const f = e.GetOwner();
    var s = f?.IsA(UE.TsUiSceneRoleActor_C.StaticClass());
    var r = f?.IsA(UE.TsSkeletalObserver_C.StaticClass());
    if (s || r) {
      this.IsUiModelTagChecked = false;
      if (e.IsComponentTickEnabled()) {
        const f = e.GetOwner();
        if (this.UiModelTagsCheck(f)) {
          s = new SkeletalMeshEffectContext_1.SkeletalMeshEffectContext(undefined);
          s.SkeletalMeshComp = e;
          s.SourceObject = f;
          s.CreateFromType = 1;
          s.AnsSlotName = this.EffectSlotName;
          r = UE.KismetMathLibrary.Conv_VectorToVectorDouble(this.Location);
          r = new UiEffectAnsContext_1.UiEffectAnsContext(this.EffectDataAssetRef.ToAssetPathName(), e, this.SocketName, this.Attached, this.AttachLocationOnly, r, this.Rotation, new UE.VectorDouble(this.Scale), this.PlayOnEnd, this.FasterStop, s, (t, e) => {
            if (EffectSystem_1.EffectSystem.IsValid(e) && this.ParamsMap.has(t)) {
              if (this.SyncEventTimeToEffectTime) {
                EffectSystem_1.EffectSystem.FreezeHandle(e, true, true);
              }
              this.ParamsMap.get(t).EffectHandle = e;
            }
          });
          let t = undefined;
          (t = f.Model.CheckGetComponent(6)).AddAns("UiEffectAnsContext", r);
          this.ParamsMap.set(e, new AnimNotifyStateEffectParams(undefined, r, false, false));
        } else {
          this.IsUiModelTagChecked = true;
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("RenderEffect", 97, "AnimNotifyStateEffect：UI模型特效Tag检查失败", ["meshComp", e?.GetName()], ["outer", e.GetOwner()?.GetName()], ["animation", i?.GetName()]);
          }
        }
      }
    } else if (!this.PlayOnEnd) {
      if (this.ParamsMap.has(e)) {
        return false;
      }
      if (this.DisableOnVehicle && f instanceof TsBaseCharacter_1.default) {
        s = f.GetEntityNoBlueprint()?.GetComponent(242);
        if (s?.IsOnVehicle && s.VehicleType === "Motorcycle") {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("RenderEffect", 50, "AnimNotifyEffect: 特效不在骑乘摩托情况下播放", ["meshComp", e?.GetName()], ["outer", f?.GetName()], ["animation", i?.GetName()]);
          }
          return false;
        }
      }
      r = this.SpawnEffectInternal(e, i);
      if (!r) {
        return false;
      }
      let t = this.SyncEventTimeContinuous;
      if (this.SyncEventTimeToEffectTime && (EffectSystem_1.EffectSystem.FreezeHandle(r, true, true), e.bEnableUpdateRateOptimizations) && e.VisibilityBasedAnimTickOption > 1) {
        t = true;
      }
      this.ParamsMap.set(e, new AnimNotifyStateEffectParams(r, undefined, false, t));
    }
    return true;
  }
  SpawnEffectInternal(t, e, i = false) {
    var s = t.GetOwner();
    if ((s instanceof TsBaseCharacter_1.default || s instanceof TsBaseVehicle_1.default) && !this.GameplayTagsCheck(s)) {
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
    f.IsSyncEventTimeToEffectTime = this.SyncEventTimeToEffectTime;
    if (s?.ActorHasTag(AnimNotifyStateEffect.TagFlagNoNiagara)) {
      f.PlayFlag |= 1;
    }
    let r = Info_1.Info.IsGameRunning() ? 3 : 0;
    if (Info_1.Info.IsInCg()) {
      r = 0;
    }
    if (GlobalData_1.GlobalData.IsUiSceneOpen || s.Tags.Contains(RenderConfig_1.RenderConfig.UIName)) {
      r = 1;
    } else if (s instanceof TsBaseCharacter_1.default && s.CharacterActorComponent?.Entity?.GetComponent(42) || s instanceof TsEffectActor_1.default && s.GetEffectType() === 0 || s?.IsA(UE.EffectSystemActor.StaticClass()) && s.GetEffectType() === 0) {
      r = 0;
    }
    EffectSystem_1.EffectSystem.InitializeWithPreview(false);
    e = this.EffectDataAssetRef.ToAssetPathName();
    let h = undefined;
    if (Info_1.Info.IsGameRunning()) {
      if (s instanceof TsBaseCharacter_1.default) {
        h = s.CharacterActorComponent?.GetReplaceEffect(e);
      } else if (s instanceof TsBaseVehicle_1.default) {
        h = s.VehicleActorComponent?.GetReplaceEffect(e);
      }
    } else {
      h = EffectUtil_1.EffectUtil.GetPreviewReplaceEffectPath(e);
    }
    let n = 0;
    n = i ? EffectSystem_1.EffectSystem.SpawnUnloopedEffect(s, new UE.TransformDouble(), h || e, "[AnimNotifyStateEffect.SpawnEffectInternal]", f, r) : EffectSystem_1.EffectSystem.SpawnEffect(s, new UE.TransformDouble(), h || e, "[AnimNotifyStateEffect.SpawnEffectInternal]", f, r);
    EffectSystem_1.EffectSystem.SetEffectNotRecord(n, true);
    if (n && EffectSystem_1.EffectSystem.IsValid(n)) {
      this.AttachEffectToSkill(s, n);
      this.AttachEffectToSelfCentered(s, n);
      this.AttachEffectToWeapon(t, s, n);
      this.SetupTransform(EffectSystem_1.EffectSystem.GetEffectActor(n), t);
      EffectSystem_1.EffectSystem.ForceCheckPendingInit(n);
      return n;
    } else {
      return 0;
    }
  }
  AttachEffectToSkill(e, i) {
    if (e instanceof TsBaseCharacter_1.default) {
      e = e.CharacterActorComponent?.Entity?.GetComponent(42);
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
      if (!(i = t.CharacterActorComponent?.Entity?.GetComponent(42)) || !i.CurrentSkill) {
        if ((i = t.CharacterActorComponent?.Entity?.GetComponent(314))?.Valid) {
          i.AddEffect(e);
        }
      }
    }
  }
  AttachEffectToWeapon(t, e, i) {
    if (this.IsWeaponEffect && e instanceof TsBaseCharacter_1.default) {
      e = e.CharacterActorComponent?.Entity?.GetComponent(86);
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
    var s = this.ParamsMap.get(t);
    if (!s) {
      return false;
    }
    var f = s.EffectHandle;
    if (!f || !EffectSystem_1.EffectSystem.IsValid(f)) {
      return false;
    }
    var r;
    var h;
    var n = t.GetOwner();
    if (this.DisableOnVehicle && n instanceof TsBaseCharacter_1.default) {
      var n = n.GetEntityNoBlueprint()?.GetComponent(242);
      if (n?.IsOnVehicle && n.VehicleType === "Motorcycle") {
        return this.StopEffectInternal(t, e, `[动画:${e.GetName()}，AnimNotifyStateEffect StopEffectOnVehicle ]`);
      }
    }
    if (this.NotRealAttach && this.SocketName !== AnimNotifyStateEffect.NameNone && (n = EffectSystem_1.EffectSystem.GetTotalPassTime(f), e = EffectSystem_1.EffectSystem.GetEffectActor(f), r = t.D_GetSocketTransform(this.SocketName, 0), (this.AttachLocationOnly || this.AttachLocationTime > n) && (h = UE.KismetMathLibrary.Conv_VectorToVectorDouble(this.Location), e.D_K2_SetActorLocation(r.TransformPosition(h), false, undefined, false)), this.AttachRotationTime > n)) {
      e.K2_SetActorRotation(r.TransformRotation(this.Rotation.Quaternion()).Rotator(), false);
    }
    if (this.SyncEventTimeToEffectTime && (s.HasSeekTo && (s.HasSeekTo = false, EffectSystem_1.EffectSystem.FreezeHandle(f, false, true)), EffectSystem_1.EffectSystem.IsHandleFreeze(f)) && EffectSystem_1.EffectSystem.HandleSeekToTime(f, this.CurrentTimeLength, false, true) && !s.ContinuousSeek) {
      if (t.bEnableUpdateRateOptimizations && t.VisibilityBasedAnimTickOption > 1) {
        return s.ContinuousSeek = true;
      }
      s.HasSeekTo = true;
    }
    return true;
  }
  K2_NotifyEnd(t, e) {
    var i = t.GetOwner();
    if (i?.IsA(UE.TsUiSceneRoleActor_C.StaticClass()) || i?.IsA(UE.TsSkeletalObserver_C.StaticClass())) {
      var s = this.ParamsMap.get(t);
      if (s && s.UiEffectAnsContext) {
        i?.IsA(UE.TsUiSceneRoleActor_C.StaticClass());
        var f = i.Model;
        if (f) {
          f.CheckGetComponent(6).ReduceAns("UiEffectAnsContext", s.UiEffectAnsContext);
          this.ParamsMap.delete(t);
          return true;
        }
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("RenderEffect", 25, "AnimNotifyStateEffect未成对，model为空");
        }
      } else if (!this.IsUiModelTagChecked) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("RenderEffect", 43, "AnimNotifyStateEffect未成对，UiEffectAnsContext为空");
        }
      }
      return false;
    }
    if (this.PlayOnEnd) {
      if (this.IgnoreWhenInvisible && !t.IsVisible()) {
        return false;
      }
      if (this.IgnoreWhenEntityNotInit) {
        f = ActorUtils_1.ActorUtils.GetEntityByActor(t.GetOwner(), false);
        if (f?.Valid && f.Entity?.Valid && !f.Entity.IsInit) {
          return false;
        }
      }
      if (!(i instanceof TsBaseCharacter_1.default)) {
        return this.SpawnEffectInternal(t, e, true) !== 0;
      }
      if (!i.CharacterActorComponent?.Entity?.GetComponent(217)?.HasAnyTag(GameplayTagUtils_1.GameplayTagUtils.ConvertFromUeContainer(this.WithOutTag))) {
        return this.SpawnEffectInternal(t, e, true) !== 0;
      }
    }
    return this.StopEffectInternal(t, e, `[动画:${e.GetName()}，AnimNotifyStateEffect.K2_NotifyEnd]`);
  }
  StopEffectInternal(t, e, i) {
    var s = this.ParamsMap.get(t);
    return !!s && (this.ParamsMap.delete(t), s.EffectHandle && (s.HasSeekTo && EffectSystem_1.EffectSystem.FreezeHandle(s.EffectHandle, false, true), EffectSystem_1.EffectSystem.StopEffectById(s.EffectHandle, i, this.FasterStop)), true);
  }
  GameplayTagsCheck(t) {
    const e = t.GetEntityNoBlueprint()?.GetComponent(217);
    return !e || TsAnimNotifyUtils_1.TsAnimNotifyUtils.CheckTags(this.NeedAnyTag, this.PlayNeedTags, t => e.HasTag(t));
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
    if (this.Attached && !this.NotRealAttach && this.SocketName !== AnimNotifyStateEffect.NameNone) {
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
  UiModelTagsCheck(t) {
    t = UiModelUtil_1.UiModelUtil.GetSelfAndOwnerComponents(t, 7, this.TagCheckWithOwner);
    return t.length === 0 || t.some(t => TsAnimNotifyUtils_1.TsAnimNotifyUtils.CheckTags(this.NeedAnyTag, this.PlayNeedTags, t.ContainsTagById.bind(t)));
  }
}
AnimNotifyStateEffect.NameNone = new UE.FName("None");
AnimNotifyStateEffect.TagFlagNoNiagara = new UE.FName("NoNiagara");
exports.default = AnimNotifyStateEffect; //# sourceMappingURL=AnimNotifyStateEffect.js.map