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
  static LoadDaConfig(t, i, s, e) {
    var o;
    if (t && s && e && (o = UE.KuroMaterialControllerComponent.AddOrGetMaterialControllerComponentFromActor(t))) {
      this.PKo(s, e);
      this.xKo(t, i, s, e.Skel_Hair, e, o);
      this.wKo(t, i, s, e.Skel_Face, e, o);
      if (e.NpcSetupType === 1) {
        this.BKo(t, i, s, e.Skel_BodyUp, e, o);
        this.bKo(t, i, s, e.Skel_BodyDown, e, o);
      } else {
        this.qKo(t, i, s, e.Skel_Body, e, o);
      }
      this.GKo(t, s, e.Hook_Arm, e.Hook_Arm_Socket, e, o);
      this.GKo(t, s, e.Hook_Back, e.Hook_Back_Socket, e, o);
      this.GKo(t, s, e.Hook_Leg, e.Hook_Leg_Socket, e, o);
      this.GKo(t, s, e.Hook_Waist, e.Hook_Waist_Socket, e, o);
      this.GKo(t, s, e.Hook_Weapon, e.Hook_Weapon_Socket, e, o);
      this.GKo(t, s, e.Hook_Head, e.Hook_Head_Socket, e, o);
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
  static NKo(t, i, s, e, o, h, r = false) {
    if (o && ObjectUtils_1.ObjectUtils.IsValid(o) && ObjectUtils_1.ObjectUtils.IsValid(i)) {
      var a = i.AddComponentByClass(UE.SkeletalMeshComponent.StaticClass(), true, s, false, h);
      if (ObjectUtils_1.ObjectUtils.IsValid(a)) {
        a.bUseAttachParentBound = true;
        a.bUseBoundsFromMasterPoseComponent = true;
        a.SetSkeletalMesh(o, true);
        a.SetMasterPoseComponent(e, false);
        a.CastShadow = false;
        a.bForceCastRaytracingShadow = true;
        if (a.K2_AttachToComponent(e, r ? h : undefined, 2, 2, 0, true)) {
          if (r) {
            a.K2_SetRelativeTransform(s, false, undefined, false);
          }
          a.ComponentTags.Add(this.OKo);
          return a;
        }
        a.K2_DestroyComponent(i);
      }
    }
  }
  static xKo(t, i, s, e, o, h) {
    t = this.NKo(o, t, i, s, e, this.kKo);
    if (t && (h.AddSkeletalMeshComponent(t, this.kKo), o.bDyeColor)) {
      var i = new UE.LinearColor(o.Skel_Hair_Color);
      i.A = 1;
      this.FKo(h, this.kKo, o.SkinDyeColor, i);
      var s = o.Hair_Mat;
      var r = o.Hair_Mat_Extra;
      var a = r.Num() + 1;
      this.dJl(h, this.kKo, s, 0, a);
      for (let t = 1; t < a; ++t) {
        this.dJl(h, this.kKo, r.Get(t - 1), t, a);
      }
    }
  }
  static wKo(t, i, s, e, o, h) {
    i = this.NKo(o, t, i, s, e, this.VKo);
    if (i && (h.AddSkeletalMeshComponent(i, this.VKo), t.IsA(UE.BP_BaseNPC_C.StaticClass()) && (t.CombineFaceMesh = i), o.bDyeColor)) {
      this.FKo(h, this.VKo, o.SkinDyeColor);
      var s = o.Face_Mat;
      var r = o.Face_Mat_Extra;
      var a = r.Num() + 1;
      this.dJl(h, this.VKo, s, 0, a);
      for (let t = 1; t < a; ++t) {
        this.dJl(h, this.VKo, r.Get(t - 1), t, a);
      }
    }
  }
  static BKo(t, i, s, e, o, h) {
    t = this.NKo(o, t, i, s, e, this.HKo);
    if (t && (h.AddSkeletalMeshComponent(t, this.HKo), o.bDyeColor)) {
      var i = new UE.LinearColor(o.Skel_BodyUp_Color);
      i.A = 1;
      this.FKo(h, this.HKo, o.SkinDyeColor, i);
      var s = o.Skel_BodyUp_Mat;
      var r = o.Skel_BodyUp_Mat_Extra;
      var a = r.Num() + 1;
      this.dJl(h, this.HKo, s, 0, a);
      for (let t = 1; t < a; ++t) {
        this.dJl(h, this.HKo, r.Get(t - 1), t, a);
      }
    }
  }
  static bKo(t, i, s, e, o, h) {
    t = this.NKo(o, t, i, s, e, this.jKo);
    if (t && (h.AddSkeletalMeshComponent(t, this.jKo), o.bDyeColor)) {
      var i = new UE.LinearColor(o.Skel_BodyDown_Color);
      i.A = 1;
      this.FKo(h, this.jKo, o.SkinDyeColor, i);
      var s = o.Skel_BodyDown_Mat;
      var r = o.Skel_BodyDown_Mat_Extra;
      var a = r.Num() + 1;
      this.dJl(h, this.jKo, s, 0, a);
      for (let t = 1; t < a; ++t) {
        this.dJl(h, this.jKo, r.Get(t - 1), t, a);
      }
    }
  }
  static qKo(t, i, s, e, o, h) {
    t = this.NKo(o, t, i, s, e, this.WKo);
    if (t && (h.AddSkeletalMeshComponent(t, this.WKo), o.bDyeColor)) {
      var i = new UE.LinearColor(o.Body_Dyecolor01);
      i.A = 1;
      var s = new UE.LinearColor(o.Body_Dyecolor02);
      s.A = 1;
      this.FKo(h, this.WKo, o.SkinDyeColor, i, s);
      var e = o.Skel_Body_Mat;
      var r = o.Skel_Body_Mat_Extra;
      var a = r.Num() + 1;
      this.dJl(h, this.WKo, e, 0, a);
      for (let t = 1; t < a; ++t) {
        this.dJl(h, this.WKo, r.Get(t - 1), t, a);
      }
    }
  }
  static FKo(t, i, s, e, o) {
    t?.AddColorUpdateParamPermanentCustom(this.KKo, s, i, 0, "");
    if (e) {
      t?.AddColorUpdateParamPermanentCustom(this.QKo, e, i, 0, "");
    }
    if (o) {
      t?.AddColorUpdateParamPermanentCustom(this.XKo, o, i, 0, "");
    }
  }
  static dJl(i, s, t, e = 0, o = 1) {
    if (t && t.IsValid()) {
      i.SetBaseMaterialByIndex(t, s, e);
      t = UE.KismetSystemLibrary.GetPathName(t).split(".")[0] + "_OL." + UE.KismetSystemLibrary.GetPathName(t).split(".")[1] + "_OL";
      ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.MaterialInstance, t => {
        if (t && t.IsValid()) {
          i.SetBaseMaterialByIndex(t, s, e + o);
        }
      });
    }
  }
  static GKo(s, e, o, h, r, a) {
    if (h && o && o.Num() !== 0) {
      if (e.DoesSocketExist(h)) {
        for (let t = 0, i = o.Num(); t < i; t++) {
          var l = o.Get(t);
          var _ = l.Transform;
          var l = l.Mesh;
          var _ = this.NKo(r, s, _, e, l, h, true);
          if (_) {
            a.AddSkeletalMeshComponent(_, h);
          }
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Level", 29, "目标不存在挂点", ["Actor", s.GetName()], ["Socket", h]);
      }
    }
  }
  static SetFace(t, i) {
    var s = UE.KuroMaterialControllerComponent.AddOrGetMaterialControllerComponentFromActor(t);
    if (s && (s = s.GetRegisteredSkeletalMeshComponent(this.VKo))?.IsValid()) {
      t.CharRenderingComponent?.TempRemoveDither();
      s.SetSkeletalMesh(i);
      t.CharRenderingComponent?.UpdateMaterialEffectsOnly();
      t.CharRenderingComponent?.TempRecoverDither();
    }
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