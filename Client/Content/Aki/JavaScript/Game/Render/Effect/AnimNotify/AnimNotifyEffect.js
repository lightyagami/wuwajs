"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const puerts_1 = require("puerts");
const UE = require("ue");
const Info_1 = require("../../../../Core/Common/Info");
const Log_1 = require("../../../../Core/Common/Log");
const Stats_1 = require("../../../../Core/Common/Stats");
const QueryTypeDefine_1 = require("../../../../Core/Define/QueryTypeDefine");
const Quat_1 = require("../../../../Core/Utils/Math/Quat");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const TraceElementCommon_1 = require("../../../../Core/Utils/TraceElementCommon");
const TsBaseCharacter_1 = require("../../../Character/TsBaseCharacter");
const SkeletalMeshEffectContext_1 = require("../../../Effect/EffectContext/SkeletalMeshEffectContext");
const EffectSystem_1 = require("../../../Effect/EffectSystem");
const TsEffectActor_1 = require("../../../Effect/TsEffectActor");
const GlobalData_1 = require("../../../GlobalData");
const ModelManager_1 = require("../../../Manager/ModelManager");
const CharacterUtils_1 = require("../../../NewWorld/Character/CharacterUtils");
const ColorUtils_1 = require("../../../Utils/ColorUtils");
const EffectUtil_1 = require("../../../Utils/EffectUtil");
const RenderConfig_1 = require("../../Config/RenderConfig");
const DISTANCE_EFFECT_ON_FLOOR = 1;
const DISTANCE_FOOT_TO_EFFECT = 10;
const DETECT_DEPTH = 100;
const PROFILE_KEY = "AnimNotifyEffect";
class AnimNotifyEffect extends UE.KuroEffectMakerAN {
  constructor() {
    super(...arguments);
    this.NeedAnyTag = false;
    this.PlayNeedTags = undefined;
    this.EffectDataAssetRef = undefined;
    this.IsSyncEffectTimeScale = false;
    this.LocationType = 0;
    this.RightOrLeftFoot = true;
    this.DebugTrace = false;
    this.SocketName = undefined;
    this.UseSocketTransform = false;
    this.TraceFrom = undefined;
    this.TraceTo = undefined;
    this.UseClipboardTransform = false;
    this.DetachWhenSkillEnd = false;
    this.WhenSkillEnd = 0;
    this.WhenSkillEndEnableTime = 0;
    this.IgnoreWhenInvisible = false;
    this.LastSkeletalMesh = undefined;
  }
  Constructor() {
    this.LastSkeletalMesh = undefined;
  }
  K2_ValidateAssets() {
    return true;
  }
  K2_Notify(t, e) {
    AnimNotifyEffect.NotifyStat.Start();
    this.LastSkeletalMesh = t;
    if (this.IgnoreWhenInvisible && !t.IsVisible()) {
      return false;
    }
    var i = this.LastSkeletalMesh.GetOwner();
    var f = this.EffectDataAssetRef.ToAssetPathName();
    if (!f?.length) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("RenderEffect", 3, "特效路径无效", ["meshComp", t?.GetName()], ["outer", i?.GetName()], ["animation", e?.GetName()]);
      }
      AnimNotifyEffect.NotifyStat.Stop();
      return false;
    }
    if (!Info_1.Info.IsInCg() && i instanceof TsBaseCharacter_1.default && !this.GameplayTagsCheck(i)) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("RenderEffect", 50, "AnimNotifyEffect: 特效GameplayTag检查失败", ["meshComp", t?.GetName()], ["outer", i?.GetName()], ["animation", e?.GetName()]);
      }
      AnimNotifyEffect.NotifyStat.Stop();
      return false;
    }
    EffectSystem_1.EffectSystem.InitializeWithPreview(false);
    let o = Info_1.Info.IsGameRunning() ? 3 : 0;
    if (Info_1.Info.IsInCg()) {
      o = 0;
    }
    if (GlobalData_1.GlobalData.IsUiSceneOpen || i.Tags.Contains(RenderConfig_1.RenderConfig.UIName)) {
      o = 1;
    } else if (i instanceof TsBaseCharacter_1.default && i.CharacterActorComponent?.Entity?.GetComponent(39) || i instanceof TsEffectActor_1.default && i.GetEffectType() === 0 || i?.IsA(UE.EffectSystemActor.StaticClass()) && i.GetEffectType() === 0) {
      o = 0;
    }
    AnimNotifyEffect.CreateEffectContextStat.Start();
    let n = undefined;
    if (i instanceof TsBaseCharacter_1.default && i.CharacterActorComponent?.Entity) {
      n = new SkeletalMeshEffectContext_1.SkeletalMeshEffectContext(i.CharacterActorComponent?.Entity.Id);
    } else if (i.IsA(UE.TsEffectActor_C.StaticClass())) {
      (n = new SkeletalMeshEffectContext_1.SkeletalMeshEffectContext(i.OwnerEntityId)).IsSyncEffectTimeScale = this.IsSyncEffectTimeScale || (ModelManager_1.ModelManager.CharacterModel?.EnabledSelfCentered ?? false);
    } else if (i.IsA(UE.EffectSystemActor.StaticClass())) {
      (n = new SkeletalMeshEffectContext_1.SkeletalMeshEffectContext(i.GetOwnerEntityId())).IsSyncEffectTimeScale = this.IsSyncEffectTimeScale || (ModelManager_1.ModelManager.CharacterModel?.EnabledSelfCentered ?? false);
    } else {
      n = new SkeletalMeshEffectContext_1.SkeletalMeshEffectContext(undefined);
    }
    n.SkeletalMeshComp = t;
    n.SourceObject = i;
    n.DisablePostProcess = this.IsDisablePostProcess(t);
    n.CreateFromType = 1;
    if (i?.ActorHasTag(AnimNotifyEffect.TagFlagNoNiagara)) {
      n.PlayFlag |= 1;
    }
    AnimNotifyEffect.CreateEffectContextStat.Stop();
    AnimNotifyEffect.SpawnEffectStat.Start();
    let s = undefined;
    if (Info_1.Info.IsGameRunning()) {
      if (i instanceof TsBaseCharacter_1.default) {
        s = i.CharacterActorComponent?.GetReplaceEffect(f);
      }
    } else {
      s = EffectUtil_1.EffectUtil.GetPreviewReplaceEffectPath(f);
    }
    e = EffectSystem_1.EffectSystem.SpawnUnloopedEffect(i, MathUtils_1.MathUtils.DefaultTransformDouble, s || f, "[AnimNotifyEffect.K2_Notify]", n, o);
    EffectSystem_1.EffectSystem.SetEffectNotRecord(e, true);
    AnimNotifyEffect.SpawnEffectStat.Stop();
    this.AttachEffectAndSetupTransform(i, e);
    AnimNotifyEffect.NotifyStat.Stop();
    return true;
  }
  AttachEffectAndSetupTransform(t, e) {
    if (e && EffectSystem_1.EffectSystem.IsValid(e)) {
      AnimNotifyEffect.AttachEffectToSkillStat.Start();
      this.AttachEffectToSkill(t, e);
      AnimNotifyEffect.AttachEffectToSkillStat.Stop();
      this.AttachEffectToSelfCentered(t, e);
      AnimNotifyEffect.SetupTransformStat.Start();
      this.SetupTransform(EffectSystem_1.EffectSystem.GetEffectActor(e), t);
      AnimNotifyEffect.SetupTransformStat.Stop();
      EffectSystem_1.EffectSystem.ForceCheckPendingInit(e);
    }
  }
  GameplayTagsCheck(t) {
    var e = t.CharacterActorComponent?.Entity?.GetComponent(209);
    if (e) {
      var i = this.PlayNeedTags.Num();
      if (this.NeedAnyTag) {
        for (let t = 0; t < i; t++) {
          var f = this.PlayNeedTags.GetKey(t);
          var o = this.PlayNeedTags.Get(f);
          if (e.HasTag(f.TagId) === o) {
            return true;
          }
        }
        return false;
      }
      for (let t = 0; t < i; t++) {
        var n = this.PlayNeedTags.GetKey(t);
        var s = this.PlayNeedTags.Get(n);
        if (e.HasTag(n.TagId) !== s) {
          return false;
        }
      }
    }
    return true;
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
        e.AttachEffectToSkill(i, t, this.SocketName, this.WhenSkillEndEnableTime);
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
  K2_PostChangeProperty(t) {
    if (t.op_Equality(RenderConfig_1.RenderConfig.UseSocketTransform)) {
      this.UseSocketTransform = false;
      if (this.LastSkeletalMesh) {
        e = this.LastSkeletalMesh.D_GetSocketTransform(this.SocketName, 3);
        this.Location = e.GetLocation().op_ToVector();
        this.Rotation = e.GetRotation().Rotator();
        this.Scale = e.GetScale3D().op_ToVector();
      }
    } else if (t.op_Equality(RenderConfig_1.RenderConfig.UseClipboardTransform)) {
      const o = (this.UseClipboardTransform = false, puerts_1.$ref)("");
      UE.KuroRenderingRuntimeBPPluginBPLibrary.ClipboardPaste_EditorOnly(o);
      var e = t => {
        var e = (0, puerts_1.$unref)(o);
        var i = e.indexOf(t, -1);
        if (i >= 0) {
          var f = e.indexOf(")", i);
          if (f >= 0) {
            return e.substring(i + t.length, f);
          }
        }
        return "";
      };
      var t = e("Translation=(");
      var i = (0, puerts_1.$ref)(this.Location);
      var f = (0, puerts_1.$ref)(false);
      UE.KismetStringLibrary.Conv_StringToVector(t, i, f);
      if ((0, puerts_1.$unref)(f)) {
        this.Location = (0, puerts_1.$unref)(i);
      }
      var t = e("Rotation=(");
      var i = (0, puerts_1.$ref)(this.Rotation);
      UE.KismetStringLibrary.Conv_StringToRotator(t, i, f);
      if ((0, puerts_1.$unref)(f)) {
        this.Rotation = (0, puerts_1.$unref)(i);
      }
      var t = e("Scale3D=(");
      var i = (0, puerts_1.$ref)(this.Scale);
      UE.KismetStringLibrary.Conv_StringToVector(t, i, f);
      if ((0, puerts_1.$unref)(f)) {
        this.Scale = (0, puerts_1.$unref)(i);
      }
    }
    return true;
  }
  GetNotifyName() {
    var t = this.EffectDataAssetRef.ToAssetPathName();
    if (t) {
      return UE.BlueprintPathsLibrary.GetBaseFilename(t, true);
    } else {
      return "特效数据通知";
    }
  }
  SetupTransform(t, e) {
    switch (this.LocationType) {
      case 0:
        if (this.Attached && this.SocketName !== AnimNotifyEffect.NameNone) {
          t.K2_AttachToComponent(this.LastSkeletalMesh, this.SocketName, 0, 0, 0, false);
          f = UE.KismetMathLibrary.Conv_VectorToVectorDouble(this.Location);
          i = UE.KismetMathLibrary.Conv_VectorToVectorDouble(this.Scale);
          f = new UE.TransformDouble(this.Rotation, f, i);
          t.D_K2_SetActorRelativeTransform(f, false, undefined, true);
        } else {
          i = this.LastSkeletalMesh.D_GetSocketTransform(this.SocketName, 0);
          f = UE.KismetMathLibrary.Conv_VectorToVectorDouble(this.Location);
          t.D_K2_SetActorLocationAndRotation(i.TransformPosition(f), i.TransformRotation(this.Rotation.Quaternion()).Rotator(), false, undefined, true);
          f = UE.KismetMathLibrary.Conv_VectorToVectorDouble(this.Scale);
          t.D_SetActorScale3D(f);
        }
        break;
      case 1:
        var i = UE.KismetMathLibrary.Conv_VectorToVectorDouble(this.Location);
        var f = UE.KismetMathLibrary.Conv_VectorToVectorDouble(this.Scale);
        var i = new UE.TransformDouble(this.Rotation, i, f);
        if (e instanceof TsBaseCharacter_1.default) {
          this.TraceDetectClimbStep(e, i);
        } else {
          if (!AnimNotifyEffect.TmpVector) {
            AnimNotifyEffect.InitTraceInfo();
          }
          AnimNotifyEffect.TmpVector.FromUeVector(this.LastSkeletalMesh.D_GetRightVector());
          AnimNotifyEffect.SocketLocation.FromUeVector(this.LastSkeletalMesh.D_GetSocketLocation(this.RightOrLeftFoot ? AnimNotifyEffect.SocketNameRightFoot : AnimNotifyEffect.SocketNameLeftFoot));
          (f = AnimNotifyEffect.LineTrace).WorldContextObject = e;
          TraceElementCommon_1.TraceElementCommon.SetStartLocation(f, AnimNotifyEffect.SocketLocation);
          AnimNotifyEffect.TmpVector.MultiplyEqual(DETECT_DEPTH);
          AnimNotifyEffect.TmpVector.AdditionEqual(AnimNotifyEffect.SocketLocation);
          TraceElementCommon_1.TraceElementCommon.SetEndLocation(f, AnimNotifyEffect.TmpVector);
          f.SetDrawDebugTrace(this.DebugTrace ? 2 : 0);
          if (TraceElementCommon_1.TraceElementCommon.LineTrace(f, PROFILE_KEY)) {
            TraceElementCommon_1.TraceElementCommon.GetImpactPoint(f.HitResult, 0, AnimNotifyEffect.TmpVector);
            TraceElementCommon_1.TraceElementCommon.GetImpactNormal(f.HitResult, 0, AnimNotifyEffect.TmpVector2);
            AnimNotifyEffect.TmpVector2.Multiply(DISTANCE_EFFECT_ON_FLOOR, AnimNotifyEffect.TmpVector3);
            AnimNotifyEffect.TmpVector3.AdditionEqual(AnimNotifyEffect.TmpVector);
            i.SetLocation(AnimNotifyEffect.TmpVector3.ToUeVector());
            MathUtils_1.MathUtils.LookRotationUpFirst(Vector_1.Vector.UpVectorProxy, AnimNotifyEffect.TmpVector2, AnimNotifyEffect.TmpQuat);
            i.SetRotation(AnimNotifyEffect.TmpQuat.ToUeQuat());
          }
        }
        t.D_K2_SetActorTransform(i, false, undefined, false);
        break;
      case 2:
        if (!AnimNotifyEffect.TmpVector) {
          AnimNotifyEffect.InitTraceInfo();
        }
        var f = this.LastSkeletalMesh.D_GetSocketTransform(this.SocketName, 0);
        var i = UE.KismetMathLibrary.Conv_VectorToVectorDouble(this.TraceFrom);
        var o = UE.KismetMathLibrary.Conv_VectorToVectorDouble(this.TraceTo);
        var i = f.TransformPosition(i);
        var f = f.TransformPosition(o);
        var o = AnimNotifyEffect.LineTrace;
        o.WorldContextObject = e;
        TraceElementCommon_1.TraceElementCommon.SetStartLocation(o, i);
        TraceElementCommon_1.TraceElementCommon.SetEndLocation(o, f);
        o.SetDrawDebugTrace(this.DebugTrace ? 2 : 0);
        var i = TraceElementCommon_1.TraceElementCommon.LineTrace(o, PROFILE_KEY);
        if (i) {
          TraceElementCommon_1.TraceElementCommon.GetImpactPoint(o.HitResult, 0, AnimNotifyEffect.TmpVector);
          TraceElementCommon_1.TraceElementCommon.GetImpactNormal(o.HitResult, 0, AnimNotifyEffect.TmpVector2);
          AnimNotifyEffect.TmpVector4.FromUeVector(e.GetActorRightVector());
          AnimNotifyEffect.TmpVector2.CrossProduct(AnimNotifyEffect.TmpVector4, AnimNotifyEffect.TmpVector3);
          f = UE.KismetMathLibrary.D_MakeRotFromZX(AnimNotifyEffect.TmpVector2.ToUeVector(), AnimNotifyEffect.TmpVector3.ToUeVector());
          t.D_K2_SetActorLocationAndRotation(AnimNotifyEffect.TmpVector.ToUeVector(), f, false, undefined, true);
          i = new UE.Transform(this.Rotation, this.Location, this.Scale);
          t.K2_AddActorLocalTransform(i, false, undefined, true);
        }
    }
  }
  static InitTraceInfo() {
    this.TmpVector = Vector_1.Vector.Create();
    this.TmpVector2 = Vector_1.Vector.Create();
    this.TmpVector3 = Vector_1.Vector.Create();
    this.TmpVector4 = Vector_1.Vector.Create();
    this.TmpQuat = Quat_1.Quat.Create();
    this.SocketLocation = Vector_1.Vector.Create();
    this.SocketNameLeftFoot = new UE.FName("Bip001LFoot");
    this.SocketNameRightFoot = new UE.FName("Bip001RFoot");
    var t = UE.NewObject(UE.TraceLineElement.StaticClass());
    t.bIsSingle = true;
    t.bIgnoreSelf = true;
    t.bTraceComplex = true;
    t.DrawTime = 5;
    t.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.IkGround);
    TraceElementCommon_1.TraceElementCommon.SetTraceColor(t, ColorUtils_1.ColorUtils.LinearGreen);
    TraceElementCommon_1.TraceElementCommon.SetTraceHitColor(t, ColorUtils_1.ColorUtils.LinearRed);
    this.LineTrace = t;
  }
  TraceDetectClimbStep(t, e) {
    if (!AnimNotifyEffect.TmpVector) {
      AnimNotifyEffect.InitTraceInfo();
    }
    var i = AnimNotifyEffect.LineTrace;
    var f = t.Mesh;
    i.WorldContextObject = t;
    AnimNotifyEffect.SocketLocation.FromUeVector(f.D_GetSocketLocation(this.RightOrLeftFoot ? AnimNotifyEffect.SocketNameRightFoot : AnimNotifyEffect.SocketNameLeftFoot));
    TraceElementCommon_1.TraceElementCommon.SetStartLocation(i, AnimNotifyEffect.SocketLocation);
    t.CharacterActorComponent.ActorForwardProxy.Multiply(DETECT_DEPTH, AnimNotifyEffect.TmpVector);
    AnimNotifyEffect.TmpVector.AdditionEqual(AnimNotifyEffect.SocketLocation);
    TraceElementCommon_1.TraceElementCommon.SetEndLocation(i, AnimNotifyEffect.TmpVector);
    i.SetDrawDebugTrace(this.DebugTrace ? 2 : 0);
    var f = TraceElementCommon_1.TraceElementCommon.LineTrace(i, PROFILE_KEY);
    if (f) {
      TraceElementCommon_1.TraceElementCommon.GetHitLocation(i.HitResult, 0, AnimNotifyEffect.TmpVector2);
      TraceElementCommon_1.TraceElementCommon.GetImpactNormal(i.HitResult, 0, AnimNotifyEffect.TmpVector3);
      MathUtils_1.MathUtils.LookRotationUpFirst(Vector_1.Vector.UpVectorProxy, AnimNotifyEffect.TmpVector3, AnimNotifyEffect.TmpQuat);
      e.SetRotation(AnimNotifyEffect.TmpQuat.ToUeQuat());
      AnimNotifyEffect.TmpVector3.MultiplyEqual(AnimNotifyEffect.TmpVector3);
      AnimNotifyEffect.TmpVector2.AdditionEqual(AnimNotifyEffect.TmpVector3);
      e.SetLocation(AnimNotifyEffect.TmpVector2.ToUeVector());
      return true;
    } else {
      MathUtils_1.MathUtils.LookRotationUpFirst(Vector_1.Vector.UpVectorProxy, t.CharacterActorComponent.ActorForwardProxy, AnimNotifyEffect.TmpQuat);
      e.SetRotation(AnimNotifyEffect.TmpQuat.ToUeQuat());
      t.CharacterActorComponent.ActorForwardProxy.Multiply(DISTANCE_FOOT_TO_EFFECT, AnimNotifyEffect.TmpVector3);
      AnimNotifyEffect.SocketLocation.Addition(AnimNotifyEffect.TmpVector3, AnimNotifyEffect.TmpVector2);
      e.SetLocation(AnimNotifyEffect.TmpVector2.ToUeVector());
      return false;
    }
  }
  IsDisablePostProcess(t) {
    var t = t.GetOwner();
    return t instanceof TsBaseCharacter_1.default && !!(t = ModelManager_1.ModelManager.CreatureModel.GetEntityById(t.EntityId))?.Valid && !CharacterUtils_1.CharacterUtils.CanCharacterMonsterOrSummonedDisplayEffect(t);
  }
}
AnimNotifyEffect.TmpVector = undefined;
AnimNotifyEffect.TmpVector2 = undefined;
AnimNotifyEffect.TmpVector3 = undefined;
AnimNotifyEffect.TmpVector4 = undefined;
AnimNotifyEffect.TmpQuat = undefined;
AnimNotifyEffect.SocketLocation = undefined;
AnimNotifyEffect.SocketNameLeftFoot = undefined;
AnimNotifyEffect.SocketNameRightFoot = undefined;
AnimNotifyEffect.LineTrace = undefined;
AnimNotifyEffect.NotifyStat = Stats_1.Stat.Create("K2_Notify");
AnimNotifyEffect.CreateEffectContextStat = Stats_1.Stat.Create("K2_Notify.CreateEffectContext");
AnimNotifyEffect.SpawnEffectStat = Stats_1.Stat.Create("K2_Notify.SpawnEffect");
AnimNotifyEffect.AttachEffectToSkillStat = Stats_1.Stat.Create("K2_Notify.AttachEffectToSkill");
AnimNotifyEffect.SetupTransformStat = Stats_1.Stat.Create("K2_Notify.SetupTransform");
AnimNotifyEffect.NameNone = new UE.FName("None");
AnimNotifyEffect.TagFlagNoNiagara = new UE.FName("NoNiagara");
exports.default = AnimNotifyEffect; //# sourceMappingURL=AnimNotifyEffect.js.map