"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.CombineMeshTool = void 0;
const UE = require("ue"),
  Log_1 = require("../../../../../../Core/Common/Log"),
  ResourceSystem_1 = require("../../../../../../Core/Resource/ResourceSystem"),
  ObjectUtils_1 = require("../../../../../../Core/Utils/ObjectUtils");
class CombineMeshTool {
  static LoadDaConfig(t, i, s, e) {
    var o;
    t && s && e && (o = UE.KuroMaterialControllerComponent.AddOrGetMaterialControllerComponentFromActor(t)) && (this.PKo(s, e), this.xKo(t, i, s, e.Skel_Hair, e, o), this.wKo(t, i, s, e.Skel_Face, e, o), 1 === e.NpcSetupType ? (this.BKo(t, i, s, e.Skel_BodyUp, e, o), this.bKo(t, i, s, e.Skel_BodyDown, e, o)) : this.qKo(t, i, s, e.Skel_Body, e, o), this.GKo(t, s, e.Hook_Arm, e.Hook_Arm_Socket, e), this.GKo(t, s, e.Hook_Back, e.Hook_Back_Socket, e), this.GKo(t, s, e.Hook_Leg, e.Hook_Leg_Socket, e), this.GKo(t, s, e.Hook_Waist, e.Hook_Waist_Socket, e), this.GKo(t, s, e.Hook_Weapon, e.Hook_Weapon_Socket, e), this.GKo(t, s, e.Hook_Head, e.Hook_Head_Socket, e), o.UpdateEffects())
  }
  static PKo(t, i) {
    t.SetSkeletalMesh(void 0), t.SetVisibility(!0, !1), t.bRenderInMainPass = !1, t.CastShadow = !0, ObjectUtils_1.ObjectUtils.IsValid(i.Skel_Main) && t.SetSkeletalMesh(i.Skel_Main, !0)
  }
  static NKo(t, i, s, e, o, h, r = !1) {
    if (o && ObjectUtils_1.ObjectUtils.IsValid(o) && ObjectUtils_1.ObjectUtils.IsValid(i)) {
      var a = i.AddComponentByClass(UE.SkeletalMeshComponent.StaticClass(), !0, s, !1, h);
      if (ObjectUtils_1.ObjectUtils.IsValid(a)) {
        if (a.bUseAttachParentBound = !0, a.bUseBoundsFromMasterPoseComponent = !0, a.SetSkeletalMesh(o, !0), a.SetMasterPoseComponent(e, !1), a.CastShadow = !1, a.bForceCastRaytracingShadow = !0, a.K2_AttachToComponent(e, r ? h : void 0, 2, 2, 0, !0)) return r && a.K2_SetRelativeTransform(s, !1, void 0, !1), a.ComponentTags.Add(this.OKo), a;
        a.K2_DestroyComponent(i)
      }
    }
  }
  static xKo(t, i, s, e, o, h) {
    t = this.NKo(o, t, i, s, e, this.kKo);
    if (t && (h.AddSkeletalMeshComponent(t, this.kKo), o.bDyeColor)) {
      var i = new UE.LinearColor(o.Skel_Hair_Color),
        s = (i.A = 1, this.FKo(h, this.kKo, o.SkinDyeColor, i), o.Hair_Mat),
        r = o.Hair_Mat_Extra,
        a = r.Num() + 1;
      this.dJl(h, this.kKo, s, 0, a);
      for (let t = 1; t < a; ++t) this.dJl(h, this.kKo, r.Get(t - 1), t, a)
    }
  }
  static wKo(t, i, s, e, o, h) {
    i = this.NKo(o, t, i, s, e, this.VKo);
    if (i && (h.AddSkeletalMeshComponent(i, this.VKo), t.IsA(UE.BP_BaseNPC_C.StaticClass()) && (t.CombineFaceMesh = i), o.bDyeColor)) {
      this.FKo(h, this.VKo, o.SkinDyeColor);
      var s = o.Face_Mat,
        r = o.Face_Mat_Extra,
        a = r.Num() + 1;
      this.dJl(h, this.VKo, s, 0, a);
      for (let t = 1; t < a; ++t) this.dJl(h, this.VKo, r.Get(t - 1), t, a)
    }
  }
  static BKo(t, i, s, e, o, h) {
    t = this.NKo(o, t, i, s, e, this.HKo);
    if (t && (h.AddSkeletalMeshComponent(t, this.HKo), o.bDyeColor)) {
      var i = new UE.LinearColor(o.Skel_BodyUp_Color),
        s = (i.A = 1, this.FKo(h, this.HKo, o.SkinDyeColor, i), o.Skel_BodyUp_Mat),
        r = o.Skel_BodyUp_Mat_Extra,
        a = r.Num() + 1;
      this.dJl(h, this.HKo, s, 0, a);
      for (let t = 1; t < a; ++t) this.dJl(h, this.HKo, r.Get(t - 1), t, a)
    }
  }
  static bKo(t, i, s, e, o, h) {
    t = this.NKo(o, t, i, s, e, this.jKo);
    if (t && (h.AddSkeletalMeshComponent(t, this.jKo), o.bDyeColor)) {
      var i = new UE.LinearColor(o.Skel_BodyDown_Color),
        s = (i.A = 1, this.FKo(h, this.jKo, o.SkinDyeColor, i), o.Skel_BodyDown_Mat),
        r = o.Skel_BodyDown_Mat_Extra,
        a = r.Num() + 1;
      this.dJl(h, this.jKo, s, 0, a);
      for (let t = 1; t < a; ++t) this.dJl(h, this.jKo, r.Get(t - 1), t, a)
    }
  }
  static qKo(t, i, s, e, o, h) {
    t = this.NKo(o, t, i, s, e, this.WKo);
    if (t && (h.AddSkeletalMeshComponent(t, this.WKo), o.bDyeColor)) {
      var i = new UE.LinearColor(o.Body_Dyecolor01),
        s = (i.A = 1, new UE.LinearColor(o.Body_Dyecolor02)),
        e = (s.A = 1, this.FKo(h, this.WKo, o.SkinDyeColor, i, s), o.Skel_Body_Mat),
        r = o.Skel_Body_Mat_Extra,
        a = r.Num() + 1;
      this.dJl(h, this.WKo, e, 0, a);
      for (let t = 1; t < a; ++t) this.dJl(h, this.WKo, r.Get(t - 1), t, a)
    }
  }
  static FKo(t, i, s, e, o) {
    t?.AddColorUpdateParamPermanentCustom(this.KKo, s, i, 0, ""), e && t?.AddColorUpdateParamPermanentCustom(this.QKo, e, i, 0, ""), o && t?.AddColorUpdateParamPermanentCustom(this.XKo, o, i, 0, "")
  }
  static dJl(i, s, t, e = 0, o = 1) {
    t && t.IsValid() && (i.SetBaseMaterialByIndex(t, s, e), t = UE.KismetSystemLibrary.GetPathName(t).split(".")[0] + "_OL." + UE.KismetSystemLibrary.GetPathName(t).split(".")[1] + "_OL", ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.MaterialInstance, t => {
      t && t.IsValid() && i.SetBaseMaterialByIndex(t, s, e + o)
    }))
  }
  static GKo(s, e, o, h, r) {
    if (h && o && 0 !== o.Num())
      if (e.DoesSocketExist(h))
        for (let t = 0, i = o.Num(); t < i; t++) {
          var a = o.Get(t),
            l = a.Transform,
            a = a.Mesh;
          this.NKo(r, s, l, e, a, h, !0)
        } else Log_1.Log.CheckError() && Log_1.Log.Error("Level", 29, "目标不存在挂点", ["Actor", s.GetName()], ["Socket", h])
  }
}(exports.CombineMeshTool = CombineMeshTool).OKo = new UE.FName("PartMeshComp"), CombineMeshTool.KKo = new UE.FName("5BaseColorTint"), CombineMeshTool.QKo = new UE.FName("1BaseColorTint"), CombineMeshTool.XKo = new UE.FName("2BaseColorTint"), CombineMeshTool.VKo = new UE.FName("Face"), CombineMeshTool.kKo = new UE.FName("Hair"), CombineMeshTool.WKo = new UE.FName("Body"), CombineMeshTool.HKo = new UE.FName("BodyUp"), CombineMeshTool.jKo = new UE.FName("BodyDown");
//# sourceMappingURL=CombineMeshTool.js.map