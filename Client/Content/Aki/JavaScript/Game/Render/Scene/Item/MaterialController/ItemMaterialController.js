"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ItemMaterialGlobalController = exports.ItemMaterialActorController = exports.ItemMaterialSimpleController = exports.ItemMaterialControllerBase = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const RenderConfig_1 = require("../../../Config/RenderConfig");
const EffectMaterialParameter_1 = require("../../../Effect/Data/Parameters/EffectMaterialParameter");
const EffectLifeTimeController_1 = require("../../../Effect/EffectLifeTimeController");
const RenderModuleConfig_1 = require("../../../Manager/RenderModuleConfig");
class ItemMaterialControllerBase {
  GetName() {
    return "";
  }
}
class ItemMaterialSimpleController extends (exports.ItemMaterialControllerBase = ItemMaterialControllerBase) {
  constructor(i) {
    super();
    this.CachedMaterials = [];
    this.ScalarParameterValue = undefined;
    this.VectorParameterValue = undefined;
    this.Actor = i;
    this.ForEachComponent(this.Actor, i => {
      if (this.CheckMaterial(i)) {
        this.CachedComponentMaterials(i);
      }
    });
  }
  GetActor() {
    if (this.Actor?.IsValid()) {
      return this.Actor;
    }
  }
  ForEachComponent(i, t) {
    if (i?.IsValid()) {
      var e = this.Actor.K2_GetComponentsByClass(UE.PrimitiveComponent.StaticClass());
      var s = e.Num();
      for (let i = 0; i < s; i++) {
        t(e.Get(i));
      }
    }
  }
  CheckMaterial(t) {
    if (!t?.IsValid()) {
      return false;
    }
    var i = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetWorldType(t);
    if (i === 2 || i === 4) {
      var e = t.GetNumMaterials();
      for (let i = 0; i < e; i++) {
        var s = t.GetMaterial(i);
        if (s) {
          if (!UE.KuroRenderingRuntimeBPPluginBPLibrary.MaterialHasParameter_EditorOnly(s, RenderConfig_1.RenderConfig.E_Action_UseScanning.toString())) {
            return false;
          }
        }
      }
    }
    return true;
  }
  CachedComponentMaterials(e) {
    if (e?.IsValid() && this.CachedMaterials.findIndex(i => i[0] === e) < 0) {
      var s = this.CachedMaterials.push([e, [], []]) - 1;
      var i = e.GetNumMaterials();
      for (let t = 0; t < i; t++) {
        var h = e.GetMaterial(t);
        let i = undefined;
        this.CachedMaterials[s][1].push(h);
        if (h) {
          i = h instanceof UE.MaterialInstanceDynamic ? h : e.CreateDynamicMaterialInstance(t, h);
          this.CachedMaterials[s][2].push(i);
        } else {
          this.CachedMaterials[s][2].push(undefined);
        }
        if (!i) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Render", 32, "材质控制器 - 使用了空材质", ["Actor", e.GetOwner().GetName()]);
          }
        }
      }
    }
  }
  UpdateParameters() {
    for (const i of this.CachedMaterials) {
      if (i[2]) {
        for (const t of i[2]) {
          if (t?.IsValid() && this.ScalarParameterValue) {
            for (const e of this.ScalarParameterValue.keys()) {
              t.SetScalarParameterValue(e, this.ScalarParameterValue.get(e));
            }
          }
        }
      }
    }
    for (const s of this.CachedMaterials) {
      if (s[2]) {
        for (const h of s[2]) {
          if (h?.IsValid() && this.VectorParameterValue) {
            for (const r of this.VectorParameterValue.keys()) {
              h.SetVectorParameterValue(r, this.VectorParameterValue.get(r));
            }
          }
        }
      }
    }
  }
}
exports.ItemMaterialSimpleController = ItemMaterialSimpleController;
class ItemMaterialActorController extends ItemMaterialControllerBase {
  constructor(i, t) {
    super();
    this.ModelParameters = undefined;
    this.CachedMaterials = [];
    this.CachedDecalMaterials = [];
    this.LifeTimeController = new EffectLifeTimeController_1.EffectLifeTimeController(t.StartTime, t.LoopTime, t.EndTime, 0, () => {
      this.Destroy();
    });
    this.Actor = i;
    this.Data = t;
    this.CachedMaterials = [];
    this.ForEachComponent(this.Actor, i => {
      if (this.CheckMaterial(i)) {
        this.CachedComponentMaterials(i);
      }
    });
    this.ForEachDecalComponent(this.Actor, i => {
      if (this.CheckDecalMaterial(i)) {
        this.CachedDecalComponentMaterials(i);
      }
    });
    this.CollectParameter();
    this.Play();
  }
  IsValid() {
    return this.LifeTimeController !== undefined && this.Actor?.IsValid() && this.Data?.IsValid();
  }
  GetActor() {
    if (this.Actor?.IsValid()) {
      return this.Actor;
    }
  }
  GetData() {
    if (this.Data?.IsValid()) {
      return this.Data;
    }
  }
  GetLifeTimeController() {
    if (this.LifeTimeController) {
      return this.LifeTimeController;
    }
  }
  CollectParameter() {
    RenderModuleConfig_1.RenderStats.Init();
    RenderModuleConfig_1.RenderStats.StatItemMaterialControllerCollectParameter.Start();
    this.ModelParameters = new EffectMaterialParameter_1.default();
    if (this.Data?.EnableBaseColorScale) {
      this.ModelParameters.CollectFloatConst(RenderConfig_1.RenderConfig.E_Action_UseBaseColorScale, 1);
      this.ModelParameters.CollectFloatCurve(RenderConfig_1.RenderConfig.E_Action_BaseColorScale, this.Data.BaseColorScale);
    }
    if (this.Data?.EnableAddEmissionColor) {
      this.ModelParameters.CollectFloatConst(RenderConfig_1.RenderConfig.E_Action_UseEmissionColor, 1);
      this.ModelParameters.CollectLinearColorCurve(RenderConfig_1.RenderConfig.E_Action_EmissionColor, this.Data.AddEmissionColor);
    }
    if (this.Data?.EnableRimLight) {
      this.ModelParameters.CollectFloatConst(RenderConfig_1.RenderConfig.E_Action_UseRimLight, 1);
      this.ModelParameters.CollectLinearColorCurve(RenderConfig_1.RenderConfig.E_Action_RimLightColor, this.Data.RimLightColor);
      this.ModelParameters.CollectFloatCurve(RenderConfig_1.RenderConfig.E_Action_RimPower, this.Data.RimPower);
    }
    if (this.Data?.EnableEmissionChange) {
      this.ModelParameters.CollectFloatConst(RenderConfig_1.RenderConfig.E_Action_UseEmissionChange, 1);
      this.ModelParameters.CollectLinearColorCurve(RenderConfig_1.RenderConfig.E_Action_EmissionLightColorChangeColor, this.Data.EmissionLightColorChangeColor);
      this.ModelParameters.CollectFloatCurve(RenderConfig_1.RenderConfig.E_Action_EmissionLightColorChangeStrength, this.Data.EmissionLightColorChangeStrength);
      this.ModelParameters.CollectFloatCurve(RenderConfig_1.RenderConfig.E_Action_EmissionLightColorChangeProgress, this.Data.EmissionLightColorChangeProgress);
    }
    if (this.Data?.EnableDissolve) {
      this.ModelParameters.CollectFloatConst(RenderConfig_1.RenderConfig.E_Action_UseDissolve, 1);
      this.ModelParameters.CollectFloatCurve(RenderConfig_1.RenderConfig.E_Action_DissolveProgress, this.Data.DissolveProgress);
      this.ModelParameters.CollectFloatCurve(RenderConfig_1.RenderConfig.E_Action_DissolveAdjustment, this.Data.DissolveAdjustment);
      this.ModelParameters.CollectFloatCurve(RenderConfig_1.RenderConfig.E_Action_DissolveEdageWidth, this.Data.DissolveEdageWidth);
      this.ModelParameters.CollectLinearColorCurve(RenderConfig_1.RenderConfig.E_Action_DissolveEdageColor, this.Data.DissolveEdageColor);
      this.ModelParameters.CollectFloatCurve(RenderConfig_1.RenderConfig.E_Action_DissolveEdageStrength, this.Data.DissolveEdageStrength);
      this.ModelParameters.CollectLinearColorCurve(RenderConfig_1.RenderConfig.E_Action_DissolveTex_S_O, this.Data.DissolveTexScaleOffset);
      this.ModelParameters.CollectLinearColorCurve(RenderConfig_1.RenderConfig.E_Action_DissolveTexSpeed, this.Data.DissolveTexSpeed);
      switch (this.Data.DissolveUv) {
        case 0:
          this.ModelParameters.CollectLinearColorConst(RenderConfig_1.RenderConfig.E_Tex_DissolveTexUVSwitch, new UE.LinearColor(1, 0, 0, 0));
          break;
        case 1:
          this.ModelParameters.CollectLinearColorConst(RenderConfig_1.RenderConfig.E_Tex_DissolveTexUVSwitch, new UE.LinearColor(0, 1, 0, 0));
          break;
        case 2:
          this.ModelParameters.CollectLinearColorConst(RenderConfig_1.RenderConfig.E_Tex_DissolveTexUVSwitch, new UE.LinearColor(0, 0, 1, 0));
          break;
        case 3:
          this.ModelParameters.CollectLinearColorConst(RenderConfig_1.RenderConfig.E_Tex_DissolveTexUVSwitch, new UE.LinearColor(0, 0, 0, 1));
      }
    }
    if (this.Data?.EnableScanning) {
      this.ModelParameters.CollectFloatConst(RenderConfig_1.RenderConfig.E_Action_UseScanning, 1);
      this.ModelParameters.CollectFloatCurve(RenderConfig_1.RenderConfig.E_Action_ScanningOutlineMixNoiseStrength, this.Data.ScanningOutlineMixNoiseStrength);
      this.ModelParameters.CollectFloatCurve(RenderConfig_1.RenderConfig.E_Action_ScanningOutlineStrength, this.Data.ScanningOutlineStrength);
      this.ModelParameters.CollectLinearColorCurve(RenderConfig_1.RenderConfig.E_Action_ScanningOutlineColor, this.Data.ScanningOutlineColor);
      this.ModelParameters.CollectLinearColorCurve(RenderConfig_1.RenderConfig.E_Action_ScanningTex_S_O, this.Data.ScanningOutlineTexScaleOffset);
    }
    if (this.Data?.EnablePivotPainterWorldPositionOffset) {
      this.ModelParameters.CollectFloatConst(RenderConfig_1.RenderConfig.E_Action_UsePivotPainterWorldPositionOffset, 1);
      this.ModelParameters.CollectLinearColorCurve(RenderConfig_1.RenderConfig.E_Action_PivotPainterTransform, this.Data.PivotPainterTransform);
      this.ModelParameters.CollectFloatCurve(RenderConfig_1.RenderConfig.E_Action_PivotPainter_FloatingThreshold, this.Data.FloatingThreshold);
    }
    if (this.Data?.EnableWorldPositionOffset) {
      this.ModelParameters.CollectFloatConst(RenderConfig_1.RenderConfig.E_Action_UseWPO, 1);
      this.ModelParameters.CollectFloatCurve(RenderConfig_1.RenderConfig.E_Action_VertexAnim_TimeDebug, this.Data.VertexAnimTimeDebug);
      this.ModelParameters.CollectFloatCurve(RenderConfig_1.RenderConfig.E_Action_VertexAnim_Frame, this.Data.VertexAnimFrame);
      this.ModelParameters.CollectFloatCurve(RenderConfig_1.RenderConfig.E_Action_SimpleWPO_Normal, this.Data.WorldPositionOffsetNormal);
      this.ModelParameters.CollectLinearColorCurve(RenderConfig_1.RenderConfig.E_Action_SimpleWPO_Offset, this.Data.WorldPositionOffsetOffset);
    }
    if (this.Data?.DisableFoliageEffect) {
      this.ModelParameters.CollectFloatConst(RenderConfig_1.RenderConfig.E_Action_DisableFoliageEffect, 0);
    }
    if (this.Data?.EnableFoliageEffect) {
      this.ModelParameters.CollectFloatConst(RenderConfig_1.RenderConfig.E_Action_DisableFoliageEffect, 1);
    }
    if (this.Data?.UseRimlightColorSpecil) {
      this.ModelParameters.CollectFloatConst(RenderConfig_1.RenderConfig.E_Action_UseRimlightColorSpecil, 1);
      this.ModelParameters.CollectLinearColorCurve(RenderConfig_1.RenderConfig.E_Action_RimLightColorSpecil, this.Data.RimLightColorSpecil);
      this.ModelParameters.CollectFloatCurve(RenderConfig_1.RenderConfig.E_Action_RimlightColorStrength, this.Data.RimlightColorStrength);
    }
    if (this.Data?.UseEmissionTex) {
      this.ModelParameters.CollectFloatConst(RenderConfig_1.RenderConfig.E_Action_UseEmissionTex, 1);
      this.ModelParameters.CollectFloatCurve(RenderConfig_1.RenderConfig.E_Action_EmissionTexStrength, this.Data.EmissionTexStrength);
    }
    if (this.Data?.SimpleUseFlow) {
      this.ModelParameters.CollectFloatConst(RenderConfig_1.RenderConfig.E_Action_Simple_UseFlow, 1);
      this.ModelParameters.CollectFloatCurve(RenderConfig_1.RenderConfig.E_Action_Simple_Uspeed, this.Data.SimpleUspeed);
      this.ModelParameters.CollectFloatCurve(RenderConfig_1.RenderConfig.E_Action_Simple_Vspeed, this.Data.SimpleVspeed);
    }
    if (this.Data?.EnableQuanXiPinTu) {
      this.ModelParameters.CollectFloatConst(RenderConfig_1.RenderConfig.E_Action_UseQuanXiPinTu, 1);
      this.ModelParameters.CollectFloatCurve(RenderConfig_1.RenderConfig.E_Action_TransparencyQuanXiPinTu, this.Data.TransparencyQuanXiPinTu);
      this.ModelParameters.CollectLinearColorCurve(RenderConfig_1.RenderConfig.E_Action_TransparentColorQuanXiPinTu, this.Data.TransparentColorQuanXiPinTu);
      this.ModelParameters.CollectLinearColorCurve(RenderConfig_1.RenderConfig.E_Action_OpaqueColorQuanXiPinTu, this.Data.OpaqueColorQuanXiPinTu);
    }
    if (this.Data?.EnableQuanXiFengSuo) {
      this.ModelParameters.CollectFloatConst(RenderConfig_1.RenderConfig.E_Action_UseQuanXiFengSuo, 1);
      this.ModelParameters.CollectFloatCurve(RenderConfig_1.RenderConfig.E_Action_TransparencyQuanXiFengSuo, this.Data.TransparencyQuanXiFengSuo);
      this.ModelParameters.CollectLinearColorCurve(RenderConfig_1.RenderConfig.E_Action_TransparentColorQuanXiFengSuo, this.Data.TransparentColorQuanXiFengSuo);
    }
    this.UpdateCustomCurvePar();
    RenderModuleConfig_1.RenderStats.StatItemMaterialControllerCollectParameter.Stop();
  }
  UpdateCustomCurvePar() {
    if (this.Data?.CustomScalarParMap) {
      var t = this.Data?.CustomScalarParMap;
      for (let i = t.Num() - 1; i >= 0; --i) {
        var e = t.GetKey(i);
        var s = t.Get(e);
        this.ModelParameters?.CollectFloatCurve(e, s);
      }
    }
    if (this.Data?.CustomColorParMap) {
      var h = this.Data?.CustomColorParMap;
      for (let i = h.Num() - 1; i >= 0; --i) {
        var r = h.GetKey(i);
        var n = h.Get(r);
        this.ModelParameters?.CollectLinearColorCurve(r, n);
      }
    }
  }
  UpdateParameters(i) {
    if (this.LifeTimeController) {
      for (const t of this.CachedMaterials) {
        if (t[2]) {
          for (const e of t[2]) {
            if (e?.IsValid() && this.LifeTimeController) {
              this.ModelParameters.Apply(e, this.LifeTimeController.PassTime, i);
            }
          }
        }
      }
      for (const s of this.CachedDecalMaterials) {
        if (s[2] && this.LifeTimeController) {
          this.ModelParameters.Apply(s[2], this.LifeTimeController.PassTime, i);
        }
      }
    }
  }
  Play() {
    this.LifeTimeController.Play();
    this.UpdateParameters(true);
  }
  Update(i) {
    if (this.IsValid()) {
      this.LifeTimeController.Update(i);
      this.UpdateParameters(false);
    }
  }
  Destroy() {
    this.LifeTimeController = undefined;
  }
  Stop(i = false) {
    this.LifeTimeController?.Stop(i);
  }
  ForEachComponent(i, t) {
    if (i?.IsValid()) {
      var e = this.Actor.K2_GetComponentsByClass(UE.PrimitiveComponent.StaticClass());
      var s = e.Num();
      for (let i = 0; i < s; i++) {
        t(e.Get(i));
      }
    }
  }
  ForEachDecalComponent(i, t) {
    if (i?.IsValid()) {
      var e = this.Actor.K2_GetComponentsByClass(UE.DecalComponent.StaticClass());
      var s = e.Num();
      for (let i = 0; i < s; i++) {
        t(e.Get(i));
      }
    }
  }
  CheckMaterial(t) {
    if (!t?.IsValid()) {
      return false;
    }
    var i = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetWorldType(t);
    if (i === 2 || i === 4) {
      var e = t.GetNumMaterials();
      for (let i = 0; i < e; i++) {
        var s = t.GetMaterial(i);
        if (s) {
          if (!UE.KuroRenderingRuntimeBPPluginBPLibrary.MaterialHasParameter_EditorOnly(s, RenderConfig_1.RenderConfig.E_Action_UseScanning.toString())) {
            return false;
          }
        }
      }
    }
    return true;
  }
  CheckDecalMaterial(i) {
    if (!i?.IsValid()) {
      return false;
    }
    var t = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetWorldType(i);
    if (t === 2 || t === 4) {
      t = i.GetDecalMaterial();
      if (t) {
        if (!UE.KuroRenderingRuntimeBPPluginBPLibrary.MaterialHasParameter_EditorOnly(t, RenderConfig_1.RenderConfig.E_Action_UseScanning.toString())) {
          return false;
        }
      }
    }
    return true;
  }
  CachedComponentMaterials(e) {
    if (e?.IsValid() && this.CachedMaterials.findIndex(i => i[0] === e) < 0) {
      var s = this.CachedMaterials.push([e, [], []]) - 1;
      var i = e.GetNumMaterials();
      for (let t = 0; t < i; t++) {
        var h = e.GetMaterial(t);
        let i = undefined;
        this.CachedMaterials[s][1].push(h);
        if (h) {
          i = h instanceof UE.MaterialInstanceDynamic ? h : e.CreateDynamicMaterialInstance(t, h);
          this.CachedMaterials[s][2].push(i);
        } else {
          this.CachedMaterials[s][2].push(undefined);
        }
        if (!i) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Render", 32, "材质控制器 - 使用了空材质", ["Actor", e.GetOwner().GetName()]);
          }
        }
      }
    }
  }
  CachedDecalComponentMaterials(t) {
    if (t?.IsValid() && this.CachedDecalMaterials.findIndex(i => i[0] === t) < 0) {
      var e = this.CachedDecalMaterials.push([t, undefined, undefined]) - 1;
      var s = t.GetDecalMaterial();
      let i = undefined;
      if (this.CachedDecalMaterials[e][1] = s) {
        i = s instanceof UE.MaterialInstanceDynamic ? s : t.CreateDynamicMaterialInstance();
        this.CachedDecalMaterials[e][2] = i;
      } else {
        this.CachedDecalMaterials[e][2] = undefined;
      }
      if (!i) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Render", 32, "材质控制器 - 使用了空材质", ["Actor", t.GetOwner().GetName()]);
        }
      }
    }
  }
  ResetComponentMaterials(t) {
    var e = this.CachedMaterials.findIndex(i => i[0] === t);
    if (e >= 0) {
      var s = t.GetNumMaterials();
      for (let i = 0; i < s; i++) {
        t.SetMaterial(i, this.CachedMaterials[e][1][i]);
      }
    }
  }
}
exports.ItemMaterialActorController = ItemMaterialActorController;
class ItemMaterialGlobalController extends ItemMaterialControllerBase {
  constructor(i, t) {
    super();
    this.ParameterCollection = undefined;
    this.LifeTimeController = new EffectLifeTimeController_1.EffectLifeTimeController(t.StartTime, t.LoopTime, t.EndTime, 0, () => {
      this.Destroy();
    });
    this.WorldContentObject = i;
    this.Data = t;
    this.Play();
  }
  IsValid() {
    return (this.ParameterCollection?.IsValid() && this.WorldContentObject?.IsValid()) ?? false;
  }
  UpdateParameters(i) {
    var t;
    if (this.IsValid()) {
      if (this.Data.EnableBaseColorScale && (i || this.Data.BaseColorScale.bUseCurve)) {
        t = UE.KuroCurveLibrary.GetValue_Float(this.Data.BaseColorScale, this.LifeTimeController.PassTime);
        UE.KismetMaterialLibrary.SetScalarParameterValue(this.WorldContentObject, this.ParameterCollection, RenderConfig_1.RenderConfig.E_Action_GlobalBaseColorScale, t);
      }
      if (this.Data.EnableAddEmissionColor && (i || this.Data.AddEmissionColor.bUseCurve)) {
        t = UE.KuroCurveLibrary.GetValue_LinearColor(this.Data.AddEmissionColor, this.LifeTimeController.PassTime);
        UE.KismetMaterialLibrary.SetVectorParameterValue(this.WorldContentObject, this.ParameterCollection, RenderConfig_1.RenderConfig.E_Action_GlobalAddEmissionColor, t);
      }
      if (this.Data.EnableScanningOutline && ((i || this.Data.ScanningOutlineColor.bUseCurve) && (t = UE.KuroCurveLibrary.GetValue_LinearColor(this.Data.ScanningOutlineColor, this.LifeTimeController.PassTime), UE.KismetMaterialLibrary.SetVectorParameterValue(this.WorldContentObject, this.ParameterCollection, RenderConfig_1.RenderConfig.E_Action_ScanningOutline, t)), (i || this.Data.ScanningOutlineWidth.bUseCurve) && (t = UE.KuroCurveLibrary.GetValue_Float(this.Data.ScanningOutlineWidth, this.LifeTimeController.PassTime), UE.KismetMaterialLibrary.SetScalarParameterValue(this.WorldContentObject, this.ParameterCollection, RenderConfig_1.RenderConfig.OutlineWidth, t)), (i || this.Data.ScanningBrokenTexScaleOffset.bUseCurve) && (t = UE.KuroCurveLibrary.GetValue_LinearColor(this.Data.ScanningBrokenTexScaleOffset, this.LifeTimeController.PassTime), UE.KismetMaterialLibrary.SetVectorParameterValue(this.WorldContentObject, this.ParameterCollection, RenderConfig_1.RenderConfig.BrokenTex_S_O, t)), i || this.Data.ScanningOutlineTexScaleOffset.bUseCurve)) {
        t = UE.KuroCurveLibrary.GetValue_LinearColor(this.Data.ScanningOutlineTexScaleOffset, this.LifeTimeController.PassTime);
        UE.KismetMaterialLibrary.SetVectorParameterValue(this.WorldContentObject, this.ParameterCollection, RenderConfig_1.RenderConfig.OutlineTex_S_O, t);
      }
      this.UpdateGlobalRim(i);
    }
  }
  UpdateGlobalRim(i) {
    var t;
    if (this.IsValid() && this.Data.EnableRimLight && ((i || this.Data.AddRimLightColor.bUseCurve) && (t = UE.KuroCurveLibrary.GetValue_LinearColor(this.Data.AddRimLightColor, this.LifeTimeController.PassTime), UE.KismetMaterialLibrary.SetVectorParameterValue(this.WorldContentObject, this.ParameterCollection, RenderConfig_1.RenderConfig.E_Action_GlobalRimLight, t)), (i || this.Data.RimPower.bUseCurve) && (t = UE.KuroCurveLibrary.GetValue_Float(this.Data.RimPower, this.LifeTimeController.PassTime), UE.KismetMaterialLibrary.SetScalarParameterValue(this.WorldContentObject, this.ParameterCollection, RenderConfig_1.RenderConfig.E_Action_RimPower, t)), (i || this.Data.RimMix.bUseCurve) && (t = UE.KuroCurveLibrary.GetValue_Float(this.Data.RimMix, this.LifeTimeController.PassTime), UE.KismetMaterialLibrary.SetScalarParameterValue(this.WorldContentObject, this.ParameterCollection, RenderConfig_1.RenderConfig.E_Action_RimMix, t)), i || this.Data.RimWidth.bUseCurve)) {
      t = UE.KuroCurveLibrary.GetValue_Float(this.Data.RimWidth, this.LifeTimeController.PassTime);
      UE.KismetMaterialLibrary.SetScalarParameterValue(this.WorldContentObject, this.ParameterCollection, RenderConfig_1.RenderConfig.E_Action_RimWidth, t);
    }
  }
  ResetParameters() {
    if (this.IsValid() && (this.Data.EnableBaseColorScale && UE.KismetMaterialLibrary.SetScalarParameterValue(this.WorldContentObject, this.ParameterCollection, RenderConfig_1.RenderConfig.E_Action_GlobalBaseColorScale, 1), this.Data.EnableAddEmissionColor && UE.KismetMaterialLibrary.SetVectorParameterValue(this.WorldContentObject, this.ParameterCollection, RenderConfig_1.RenderConfig.E_Action_GlobalAddEmissionColor, new UE.LinearColor(0, 0, 0, 1)), this.Data.EnableRimLight && UE.KismetMaterialLibrary.SetVectorParameterValue(this.WorldContentObject, this.ParameterCollection, RenderConfig_1.RenderConfig.E_Action_GlobalRimLight, new UE.LinearColor(0, 0, 0, 1)), this.Data.EnableScanningOutline)) {
      UE.KismetMaterialLibrary.SetVectorParameterValue(this.WorldContentObject, this.ParameterCollection, RenderConfig_1.RenderConfig.E_Action_ScanningOutline, new UE.LinearColor(0, 0, 0, 1));
    }
  }
  Play() {
    this.LifeTimeController.Play();
    this.UpdateParameters(true);
  }
  Update(i) {
    if (this?.IsValid()) {
      this.LifeTimeController.Update(i);
      this.UpdateParameters(false);
    }
  }
  Destroy() {
    this.ResetParameters();
    this.LifeTimeController = undefined;
  }
}
exports.ItemMaterialGlobalController = ItemMaterialGlobalController;
//# sourceMappingURL=ItemMaterialController.js.map