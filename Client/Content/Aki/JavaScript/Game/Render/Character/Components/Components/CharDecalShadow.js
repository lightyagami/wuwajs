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
    this.DecalShadowEnabled = false;
    this.RealtimeShadowEnabled = true;
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
      if (!this.RealtimeShadowEnabled) {
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
    var e;
    var t;
    var i;
    if (!this.DecalShadowEnabled) {
      if (e = this.Lo) {
        if (i = (t = this.thr).GetComponentByClass(UE.CapsuleComponent.StaticClass())) {
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
          this.DecalShadowEnabled = true;
          this.SetDecalShadowOpacity(this.shr);
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Render", 25, "Decal Shadow找不到胶囊体", ["Actor: ", t.GetName()]);
        }
      }
    }
  }
  DisableDecalShadow() {
    if (this.DecalShadowEnabled) {
      this.rhr?.SetVisibility(false);
      this.DecalShadowEnabled = false;
      this.SetDecalShadowOpacity(this.shr);
    }
  }
  EnableRealtimeShadow() {
    if (!this.RealtimeShadowEnabled) {
      for (const t of this.ihr.values()) {
        t.SetCastShadow(true);
      }
      this.RealtimeShadowEnabled = true;
      var e = this.GetRenderingComponent().GetComponent(RenderConfig_1.RenderConfig.IdBodyEffect);
      if (e) {
        e.SetCastShadow(true);
      }
      this.SetRealtimeShadowOpacity(this.shr);
    }
  }
  DisableRealtimeShadow() {
    if (this.RealtimeShadowEnabled) {
      for (const t of this.ihr.values()) {
        t.SetCastShadow(false);
      }
      this.RealtimeShadowEnabled = false;
      var e = this.GetRenderingComponent().GetComponent(RenderConfig_1.RenderConfig.IdBodyEffect);
      if (e) {
        e.SetCastShadow(false);
      }
      this.SetRealtimeShadowOpacity(this.shr);
    }
  }
  DisableAllShadow() {
    this.DisableDecalShadow();
    this.DisableRealtimeShadow();
  }
  SetDecalShadowOpacity(e) {
    this.shr = e;
    if (this.DecalShadowEnabled) {
      if (e < MathUtils_1.MathUtils.KindaSmallNumber) {
        this.rhr.SetVisibility(false);
      } else {
        this.rhr.SetVisibility(true);
        this.nhr.SetScalarParameterValue(materialParameterNameOpacity, e);
      }
    }
  }
  SetRealtimeShadowOpacity(e) {
    this.shr = e;
    if (this.RealtimeShadowEnabled && this.GetRenderingComponent().RenderType === 3) {
      var t = e > CharDecalShadow.chr;
      for (const i of this.ihr.values()) {
        i.SetCastShadow(t);
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