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
    this.Mjd = true;
    this.Ejd = false;
    this.Ijd = true;
    this.thr = undefined;
    this.Lo = undefined;
    this.ihr = new Map();
    this.ohr = undefined;
    this.rhr = undefined;
    this.nhr = undefined;
    this.shr = 1;
  }
  static OnSetDecalShadowEnabled(t) {
    if (t > 0) {
      for (const e of CharDecalShadow.hhr) {
        e.EnableDecalShadow();
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
    var e = this.thr.K2_GetComponentsByClass(UE.PrimitiveComponent.StaticClass());
    var i = e.Num();
    for (let t = 0; t < i; t++) {
      var h = e.Get(t);
      if (h.CastShadow) {
        this.ihr.set(h.GetName(), h);
      }
    }
  }
  AddPrimitiveComponent(t, e) {
    if (e.CastShadow) {
      this.RemovePrimitiveComponent(t);
      this.ihr.set(t, e);
      if (!this.Ijd) {
        e.CastShadow = false;
      }
    }
  }
  RemovePrimitiveComponent(t) {
    var e = this.ihr.get(t);
    if (e) {
      e.CastShadow = true;
      this.ihr.delete(t);
    }
  }
  EnableDecalShadow() {
    if (!this.Ejd) {
      if (this.Lo && (this.Ejd = true, this.Mjd)) {
        this.UpdateDecalShadow(true);
      }
    }
  }
  DisableDecalShadow() {
    if (this.Ejd && (this.Ejd = false, this.Mjd)) {
      this.UpdateDecalShadow(false);
    }
  }
  UpdateDecalShadow(t) {
    if (t) {
      t = this.Lo;
      if (!t) {
        return;
      }
      var e = this.thr;
      var i = e.GetComponentByClass(UE.CapsuleComponent.StaticClass());
      if (!i) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Render", 25, "Decal Shadow找不到胶囊体", ["Actor: ", e.GetName()]);
        }
        return;
      }
      if (this.ohr) {
        this.rhr.SetVisibility(true);
        if (!Info_1.Info.IsGameRunning()) {
          this.uhr(t, i.CapsuleRadius, i.CapsuleHalfHeight);
        }
      } else {
        this.ohr = ActorSystem_1.ActorSystem.Spawn(UE.Actor.StaticClass(), undefined, this.thr);
        this.rhr = this.ohr.AddComponentByClass(UE.DecalComponent.StaticClass(), false, undefined, false);
        ControllerHolder_1.ControllerHolder.AttachToActorController.AttachToActor(this.ohr, this.thr, 2, "CharDecalShadow.EnableDecalShadow", undefined, 0, 0, 0, false);
        this.ohr.K2_SetActorRotation(UE.Rotator.MakeFromEuler(new UE.Vector(0, -90, 0)), true);
        this.ohr.D_K2_SetActorRelativeLocation(new UE.VectorDouble(0, 0, -i.CapsuleHalfHeight), false, undefined, true);
        this.uhr(t, i.CapsuleRadius, i.CapsuleHalfHeight);
      }
    } else {
      this.rhr?.SetVisibility(false);
    }
    this.SetDecalShadowOpacity(this.shr);
  }
  EnableRealTimeShadow() {
    if (!this.Ijd) {
      this.Ijd = true;
      if (this.Mjd) {
        this.UpdateRealTimeShadow(true);
      }
    }
  }
  DisableRealTimeShadow() {
    if (this.Ijd && (this.Ijd = false, this.Mjd)) {
      this.UpdateRealTimeShadow(false);
    }
  }
  UpdateRealTimeShadow(t) {
    if (t) {
      for (const e of this.ihr.values()) {
        e.SetCastShadow(true);
      }
      t = this.GetRenderingComponent().GetComponent(RenderConfig_1.RenderConfig.IdBodyEffect);
      if (t) {
        t.SetCastShadow(true);
      }
    } else {
      for (const i of this.ihr.values()) {
        i.SetCastShadow(false);
      }
      t = this.GetRenderingComponent().GetComponent(RenderConfig_1.RenderConfig.IdBodyEffect);
      if (t) {
        t.SetCastShadow(false);
      }
    }
    this.SetRealTimeShadowOpacity(this.shr);
  }
  DisableAllShadow() {
    this.DisableDecalShadow();
    this.DisableRealTimeShadow();
  }
  SetShouldCastShadow(t) {
    if (t !== this.Mjd) {
      if (this.Mjd = t) {
        this.UpdateDecalShadow(this.Ejd);
        this.UpdateRealTimeShadow(this.Ijd);
      } else {
        this.UpdateDecalShadow(false);
        this.UpdateRealTimeShadow(false);
      }
    }
  }
  SetDecalShadowOpacity(t) {
    this.shr = t;
    if (this.Ejd) {
      if (t < MathUtils_1.MathUtils.KindaSmallNumber) {
        this.rhr.SetVisibility(false);
      } else {
        this.rhr.SetVisibility(true);
        this.nhr.SetScalarParameterValue(materialParameterNameOpacity, t);
      }
    }
  }
  SetRealTimeShadowOpacity(t) {
    this.shr = t;
    if (this.Ijd && this.GetRenderingComponent().RenderType === 3) {
      var e = t > CharDecalShadow.chr;
      for (const i of this.ihr.values()) {
        i.SetCastShadow(e);
      }
    }
  }
  uhr(t, e, i) {
    this.rhr.ZFadingFactor = t.ZDistanceFadeFactor;
    this.rhr.ZFadingPower = t.ZDistanceFadePower;
    this.nhr = UE.KismetMaterialLibrary.CreateDynamicMaterialInstance(this.rhr, t.DecalShadowMaterial);
    this.rhr.SetDecalMaterial(this.nhr);
    var h = t.DecalBoxScaleHori * 25;
    var i = i * t.DecalBoxScaleVerti;
    this.rhr.D_SetWorldScale3D(new UE.VectorDouble(i, h, h));
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