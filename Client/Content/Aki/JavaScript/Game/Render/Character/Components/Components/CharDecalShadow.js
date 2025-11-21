"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharDecalShadow = undefined;
const UE = require("ue");
const ActorSystem_1 = require("../../../../../Core/Actor/ActorSystem");
const Info_1 = require("../../../../../Core/Common/Info");
const Log_1 = require("../../../../../Core/Common/Log");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const RenderConfig_1 = require("../../../Config/RenderConfig");
const RenderDataManager_1 = require("../../../Data/RenderDataManager");
const CharRenderBase_1 = require("../../Manager/CharRenderBase");
const materialParameterNameOpacity = new UE.FName("Opacity");
class CharDecalShadow extends CharRenderBase_1.CharRenderBase {
  constructor() {
    super(...arguments);
    this.Qem = true;
    this.Kem = false;
    this.Xem = true;
    this.thr = undefined;
    this.Lo = undefined;
    this.ihr = new Map();
    this.ohr = undefined;
    this.rhr = undefined;
    this.nhr = undefined;
    this.shr = 1;
  }
  static OnSetDecalShadowEnabled(e) {
    if (e > 0) {
      for (const t of CharDecalShadow.hhr) {
        t.EnableDecalShadow();
      }
    } else {
      for (const i of CharDecalShadow.hhr) {
        i.DisableDecalShadow();
      }
    }
  }
  Start() {
    this.thr = this.GetRenderingComponent().GetOwner();
    this.Lo = this.GetRenderingComponent().DecalShadowConfig;
    this.Lo ||= RenderDataManager_1.RenderDataManager.Get().GetGlobalDecalShadowConfig();
    if (this.Lo) {
      this.lhr();
      CharDecalShadow.hhr.add(this);
      if (!CharDecalShadow._hr) {
        EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SetDecalShadowEnabled, CharDecalShadow.OnSetDecalShadowEnabled);
        CharDecalShadow._hr = true;
      }
      this.OnInitSuccess();
    }
  }
  Destroy() {
    this.ohr?.K2_DestroyActor();
    CharDecalShadow.hhr.delete(this);
  }
  lhr() {
    var t = this.thr.K2_GetComponentsByClass(UE.PrimitiveComponent.StaticClass());
    var i = t.Num();
    for (let e = 0; e < i; e++) {
      var a = t.Get(e);
      if (a.CastShadow) {
        this.ihr.set(a.GetName(), a);
      }
    }
  }
  AddPrimitiveComponent(e, t) {
    if (t.CastShadow) {
      this.RemovePrimitiveComponent(e);
      this.ihr.set(e, t);
      if (!this.Xem) {
        t.CastShadow = false;
      }
    }
  }
  RemovePrimitiveComponent(e) {
    var t = this.ihr.get(e);
    if (t) {
      t.CastShadow = true;
      this.ihr.delete(e);
    }
  }
  EnableDecalShadow() {
    if (!this.Kem) {
      if (this.Lo && (this.Kem = true, this.Qem)) {
        this.UpdateDecalShadow(true);
      }
    }
  }
  DisableDecalShadow() {
    if (this.Kem && (this.Kem = false, this.Qem)) {
      this.UpdateDecalShadow(false);
    }
  }
  UpdateDecalShadow(e) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("RenderCharacter", 25, "CharDecalShadow UpdateDecalShadow", ["visible", e], ["name", this.GetRenderingComponent()?.GetCachedOwnerName()]);
    }
    if (e) {
      e = this.Lo;
      if (!e) {
        return;
      }
      var t = this.thr;
      var i = t.GetComponentByClass(UE.CapsuleComponent.StaticClass());
      if (!i) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Render", 25, "Decal Shadow找不到胶囊体", ["Actor: ", t.GetName()]);
        }
        return;
      }
      if (this.ohr) {
        this.rhr.SetVisibility(true);
        if (!Info_1.Info.IsGameRunning()) {
          this.uhr(e, i.CapsuleRadius, i.CapsuleHalfHeight);
        }
      } else {
        this.ohr = ActorSystem_1.ActorSystem.Spawn(UE.Actor.StaticClass(), undefined, this.thr);
        this.rhr = this.ohr.AddComponentByClass(UE.DecalComponent.StaticClass(), false, undefined, false);
        ControllerHolder_1.ControllerHolder.AttachToActorController.AttachToActor(this.ohr, this.thr, 2, "CharDecalShadow.EnableDecalShadow", undefined, 0, 0, 0, false);
        this.ohr.K2_SetActorRotation(UE.Rotator.MakeFromEuler(new UE.Vector(0, -90, 0)), true);
        this.ohr.D_K2_SetActorRelativeLocation(new UE.VectorDouble(0, 0, -i.CapsuleHalfHeight), false, undefined, true);
        this.uhr(e, i.CapsuleRadius, i.CapsuleHalfHeight);
      }
    } else {
      this.rhr?.SetVisibility(false);
    }
    this.SetDecalShadowOpacity(this.shr);
  }
  EnableRealTimeShadow() {
    if (!this.Xem) {
      this.Xem = true;
      if (this.Qem) {
        this.UpdateRealTimeShadow(true);
      }
    }
  }
  DisableRealTimeShadow() {
    if (this.Xem && (this.Xem = false, this.Qem)) {
      this.UpdateRealTimeShadow(false);
    }
  }
  UpdateRealTimeShadow(e) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("RenderCharacter", 25, "CharDecalShadow UpdateRealTimeShadow", ["visible", e], ["name", this.GetRenderingComponent()?.GetCachedOwnerName()]);
    }
    if (e) {
      for (const t of this.ihr.values()) {
        t.SetCastShadow(true);
        t.ForceCastShadowInRayTracing = true;
      }
      e = this.GetRenderingComponent().GetComponent(RenderConfig_1.RenderConfig.IdBodyEffect);
      if (e) {
        e.SetCastShadow(true);
      }
    } else {
      for (const i of this.ihr.values()) {
        i.SetCastShadow(false);
        i.ForceCastShadowInRayTracing = false;
      }
      e = this.GetRenderingComponent().GetComponent(RenderConfig_1.RenderConfig.IdBodyEffect);
      if (e) {
        e.SetCastShadow(false);
      }
    }
    this.SetRealTimeShadowOpacity(this.shr);
  }
  DisableAllShadow() {
    this.DisableDecalShadow();
    this.DisableRealTimeShadow();
  }
  SetShouldCastShadow(e) {
    if (e !== this.Qem) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("RenderCharacter", 25, "CharDecalShadow SetShouldCastShadow", ["castShadow", e], ["name", this.GetRenderingComponent()?.GetCachedOwnerName()]);
      }
      if (this.Qem = e) {
        this.UpdateDecalShadow(this.Kem);
        this.UpdateRealTimeShadow(this.Xem);
      } else {
        this.UpdateDecalShadow(false);
        this.UpdateRealTimeShadow(false);
      }
    }
  }
  SetDecalShadowOpacity(e) {
    this.shr = e;
    if (this.Kem && this.Qem) {
      if (e < MathUtils_1.MathUtils.KindaSmallNumber) {
        this.rhr.SetVisibility(false);
      } else {
        this.rhr.SetVisibility(true);
        this.nhr.SetScalarParameterValue(materialParameterNameOpacity, e);
      }
    }
  }
  SetRealTimeShadowOpacity(e) {
    this.shr = e;
    if (this.Xem && this.GetRenderingComponent().RenderType === 3 && this.Qem) {
      var t = e > CharDecalShadow.chr;
      for (const i of this.ihr.values()) {
        i.SetCastShadow(t);
        i.ForceCastShadowInRayTracing = t;
      }
    }
  }
  uhr(e, t, i) {
    this.rhr.ZFadingFactor = e.ZDistanceFadeFactor;
    this.rhr.ZFadingPower = e.ZDistanceFadePower;
    this.nhr = UE.KismetMaterialLibrary.CreateDynamicMaterialInstance(this.rhr, e.DecalShadowMaterial);
    this.rhr.SetDecalMaterial(this.nhr);
    var a = e.DecalBoxScaleHori * 25;
    var i = i * e.DecalBoxScaleVerti;
    this.rhr.D_SetWorldScale3D(new UE.VectorDouble(i, a, a));
  }
  GetStatName() {
    return "CharDecalShadow";
  }
  GetComponentId() {
    return RenderConfig_1.RenderConfig.IdDecalShadow;
  }
}
(exports.CharDecalShadow = CharDecalShadow)._hr = false;
CharDecalShadow.hhr = new Set();
CharDecalShadow.chr = 0.2; //# sourceMappingURL=CharDecalShadow.js.map