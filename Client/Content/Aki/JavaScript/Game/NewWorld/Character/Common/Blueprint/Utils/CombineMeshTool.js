"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CombineMeshTool = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../../Core/Common/Log");
const ResourceSystem_1 = require("../../../../../../Core/Resource/ResourceSystem");
const ObjectUtils_1 = require("../../../../../../Core/Utils/ObjectUtils");
class CombineMeshTool {
  static LoadDaConfig(t, i, e, s) {
    var o;
    if (t && e && s && (o = UE.KuroMaterialControllerComponent.AddOrGetMaterialControllerComponentFromActor(t))) {
      this.PKo(e, s);
      this.xKo(t, i, e, s.Skel_Hair, s, o);
      this.wKo(t, i, e, s.Skel_Face, s, o);
      if (s.NpcSetupType === 1) {
        this.BKo(t, i, e, s.Skel_BodyUp, s, o);
        this.bKo(t, i, e, s.Skel_BodyDown, s, o);
      } else {
        this.qKo(t, i, e, s.Skel_Body, s, o);
      }
      this.GKo(t, e, s.Hook_Arm, s.Hook_Arm_Socket, s, o);
      this.GKo(t, e, s.Hook_Back, s.Hook_Back_Socket, s, o);
      this.GKo(t, e, s.Hook_Leg, s.Hook_Leg_Socket, s, o);
      this.GKo(t, e, s.Hook_Waist, s.Hook_Waist_Socket, s, o);
      this.GKo(t, e, s.Hook_Weapon, s.Hook_Weapon_Socket, s, o);
      this.GKo(t, e, s.Hook_Head, s.Hook_Head_Socket, s, o);
      o.UpdateEffects();
    }
  }
  static PKo(t, i) {
    t.SetSkeletalMesh(undefined);
    t.SetVisibility(true, false);
    t.bRenderInMainPass = false;
    t.CastShadow = true;
    if (ObjectUtils_1.ObjectUtils.IsValid(i.Skel_Main)) {
      t.SetSkeletalMesh(i.Skel_Main, true);
    }
  }
  static NKo(t, i, e, s, o, h, r = false, a = 0) {
    if (o && ObjectUtils_1.ObjectUtils.IsValid(o) && ObjectUtils_1.ObjectUtils.IsValid(i)) {
      a = i.AddComponentByClass(UE.SkeletalMeshComponent.StaticClass(), true, e, false, this.GetPartMeshName(h, a));
      if (ObjectUtils_1.ObjectUtils.IsValid(a)) {
        a.bUseAttachParentBound = true;
        a.bUseBoundsFromMasterPoseComponent = true;
        a.SetSkeletalMesh(o, true);
        if (!r) {
          a.SetMasterPoseComponent(s, false);
        }
        a.CastShadow = false;
        a.bForceCastRaytracingShadow = true;
        if (a.K2_AttachToComponent(s, r ? h : undefined, 2, 2, 0, true)) {
          if (r) {
            a.K2_SetRelativeTransform(e, false, undefined, false);
          }
          a.ComponentTags.Add(this.OKo);
          return a;
        }
        a.K2_DestroyComponent(i);
      }
    }
  }
  static xKo(t, i, e, s, o, h) {
    t = this.NKo(o, t, i, e, s, this.kKo);
    if (t && (h.AddSkeletalMeshComponent(t, this.kKo), o.bDyeColor)) {
      var i = new UE.LinearColor(o.Skel_Hair_Color);
      i.A = 1;
      this.FKo(h, this.kKo, o.SkinDyeColor, i);
      var e = o.Hair_Mat;
      var r = o.Hair_Mat_Extra;
      var a = r.Num() + 1;
      this.dJl(h, this.kKo, e, 0, a);
      for (let t = 1; t < a; ++t) {
        this.dJl(h, this.kKo, r.Get(t - 1), t, a);
      }
    }
  }
  static wKo(t, i, e, s, o, h) {
    i = this.NKo(o, t, i, e, s, this.VKo);
    if (i && (h.AddSkeletalMeshComponent(i, this.VKo), t.IsA(UE.BP_BaseNPC_C.StaticClass()) && (t.CombineFaceMesh = i), o.bDyeColor)) {
      this.FKo(h, this.VKo, o.SkinDyeColor);
      var e = o.Face_Mat;
      var r = o.Face_Mat_Extra;
      var a = r.Num() + 1;
      this.dJl(h, this.VKo, e, 0, a);
      for (let t = 1; t < a; ++t) {
        this.dJl(h, this.VKo, r.Get(t - 1), t, a);
      }
    }
  }
  static BKo(t, i, e, s, o, h) {
    t = this.NKo(o, t, i, e, s, this.HKo);
    if (t && (h.AddSkeletalMeshComponent(t, this.HKo), o.bDyeColor)) {
      var i = new UE.LinearColor(o.Skel_BodyUp_Color);
      i.A = 1;
      this.FKo(h, this.HKo, o.SkinDyeColor, i);
      var e = o.Skel_BodyUp_Mat;
      var r = o.Skel_BodyUp_Mat_Extra;
      var a = r.Num() + 1;
      this.dJl(h, this.HKo, e, 0, a);
      for (let t = 1; t < a; ++t) {
        this.dJl(h, this.HKo, r.Get(t - 1), t, a);
      }
    }
  }
  static bKo(t, i, e, s, o, h) {
    t = this.NKo(o, t, i, e, s, this.jKo);
    if (t && (h.AddSkeletalMeshComponent(t, this.jKo), o.bDyeColor)) {
      var i = new UE.LinearColor(o.Skel_BodyDown_Color);
      i.A = 1;
      this.FKo(h, this.jKo, o.SkinDyeColor, i);
      var e = o.Skel_BodyDown_Mat;
      var r = o.Skel_BodyDown_Mat_Extra;
      var a = r.Num() + 1;
      this.dJl(h, this.jKo, e, 0, a);
      for (let t = 1; t < a; ++t) {
        this.dJl(h, this.jKo, r.Get(t - 1), t, a);
      }
    }
  }
  static qKo(t, i, e, s, o, h) {
    t = this.NKo(o, t, i, e, s, this.WKo);
    if (t && (h.AddSkeletalMeshComponent(t, this.WKo), o.bDyeColor)) {
      var i = new UE.LinearColor(o.Body_Dyecolor01);
      i.A = 1;
      var e = new UE.LinearColor(o.Body_Dyecolor02);
      e.A = 1;
      this.FKo(h, this.WKo, o.SkinDyeColor, i, e);
      var s = o.Skel_Body_Mat;
      var r = o.Skel_Body_Mat_Extra;
      var a = r.Num() + 1;
      this.dJl(h, this.WKo, s, 0, a);
      for (let t = 1; t < a; ++t) {
        this.dJl(h, this.WKo, r.Get(t - 1), t, a);
      }
    }
  }
  static FKo(t, i, e, s, o) {
    t?.AddColorUpdateParamPermanentCustom(this.KKo, e, i, 0, "");
    if (s) {
      t?.AddColorUpdateParamPermanentCustom(this.QKo, s, i, 0, "");
    }
    if (o) {
      t?.AddColorUpdateParamPermanentCustom(this.XKo, o, i, 0, "");
    }
  }
  static dJl(i, e, t, s = 0, o = 1) {
    if (t && t.IsValid()) {
      i.SetBaseMaterialByIndex(t, e, s);
      t = UE.KismetSystemLibrary.GetPathName(t).split(".")[0] + "_OL." + UE.KismetSystemLibrary.GetPathName(t).split(".")[1] + "_OL";
      ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.MaterialInstance, t => {
        if (t && t.IsValid()) {
          i.SetBaseMaterialByIndex(t, e, s + o);
        }
      });
    }
  }
  static HWm(e, s) {
    if (!ObjectUtils_1.ObjectUtils.IsValid(e)) {
      return false;
    }
    if (s && !(s.Num() <= 0)) {
      for (let t = 0, i = s.Num(); t < i; t++) {
        var o = s.Get(t);
        var h = new UE.FName(o.MorphName);
        e.SetMorphTarget(h, o.PreviewValue);
      }
    }
    return true;
  }
  static GKo(e, s, o, h, r, a) {
    if (h && o && o.Num() !== 0) {
      if (s.DoesSocketExist(h)) {
        for (let t = 0, i = o.Num(); t < i; t++) {
          var l = o.Get(t);
          var n = l.Transform;
          var _ = l.Mesh;
          var c = l.MorphTargets;
          var U = l.MaterialInfos;
          var l = this.NKo(r, e, n, s, _, h, true, t);
          if (l && (this.HWm(l, c), a.AddSkeletalMeshComponent(l, h), U) && U.Num() > 0) {
            for (let t = 0; t < U.Num(); t++) {
              var v = U.Get(t);
              var E = v.SlotID;
              var v = v.Material;
              if (v && v.IsValid()) {
                a.SetBaseMaterialByIndex(v, h, E);
              }
            }
          }
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Level", 29, "目标不存在挂点", ["Actor", e.GetName()], ["Socket", h]);
      }
    }
  }
  static SetFace(t, i) {
    var e = UE.KuroMaterialControllerComponent.AddOrGetMaterialControllerComponentFromActor(t);
    if (e && (e = e.GetRegisteredSkeletalMeshComponent(this.VKo))?.IsValid()) {
      t.CharRenderingComponent?.TempRemoveDither();
      e.SetSkeletalMesh(i);
      t.CharRenderingComponent?.UpdateMaterialEffectsOnly();
      t.CharRenderingComponent?.TempRecoverDither();
    }
  }
  static GetPartMeshName(t, i) {
    if (i === 0) {
      return t;
    }
    let e = t.toString();
    if (i < 10) {
      e += "0";
    }
    return new UE.FName(e + i.toString());
  }
}
(exports.CombineMeshTool = CombineMeshTool).OKo = new UE.FName("PartMeshComp");
CombineMeshTool.KKo = new UE.FName("5BaseColorTint");
CombineMeshTool.QKo = new UE.FName("1BaseColorTint");
CombineMeshTool.XKo = new UE.FName("2BaseColorTint");
CombineMeshTool.VKo = new UE.FName("Face");
CombineMeshTool.kKo = new UE.FName("Hair");
CombineMeshTool.WKo = new UE.FName("Body");
CombineMeshTool.HKo = new UE.FName("BodyUp");
CombineMeshTool.jKo = new UE.FName("BodyDown"); //# sourceMappingURL=CombineMeshTool.js.map