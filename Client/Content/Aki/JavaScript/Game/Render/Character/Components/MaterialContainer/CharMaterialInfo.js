"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharMaterialSlot = undefined;
const UE = require("ue");
const FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil");
const RenderConfig_1 = require("../../../Config/RenderConfig");
const RenderDataManager_1 = require("../../../Data/RenderDataManager");
const STAR_SCAR_SLOT_NAME = "MI_Star";
const ORIGINAL_INDEX = 0;
const CACHE_INDEX = 1;
const TARGET_INDEX = 2;
class ColorTempContainer {
  constructor() {
    this.ColorR = -0;
    this.ColorG = -0;
    this.ColorB = -0;
    this.ColorA = -0;
  }
}
class CharMaterialSlot {
  constructor() {
    this.DynamicMaterial = undefined;
    this.FloatParamMap = undefined;
    this.VectorParamMap = undefined;
    this.TextureParamMap = undefined;
    this.ReplaceMaterialArray = undefined;
    this.SlotName = "";
    this.MaterialIndex = 0;
    this.SectionIndex = 0;
    this.IsStarScar = false;
    this.MaterialPartType = 0;
    this.SlotType = 0;
    this.MaterialDirty = false;
    this.Llr = false;
    this.Dlr = false;
    this.Rlr = false;
  }
  Init(t, i, s) {
    this.SlotName = i;
    this.MaterialIndex = t;
    this.SectionIndex = RenderConfig_1.INVALID_SECTION_INDEX;
    this.Llr = false;
    this.Dlr = false;
    this.Rlr = false;
    this.IsStarScar = i === STAR_SCAR_SLOT_NAME;
    this.SlotType = RenderConfig_1.RenderConfig.GetMaterialSlotType(i);
    this.MaterialPartType = RenderConfig_1.RenderConfig.GetMaterialPartType(i);
    this.SetDynamicMaterial(s);
    this.ReplaceMaterialArray = new Array();
  }
  SetDynamicMaterial(t) {
    if (this.DynamicMaterial = t) {
      this.FloatParamMap = new Map();
      this.VectorParamMap = new Map();
      this.TextureParamMap = new Map();
    }
    this.MaterialDirty = true;
  }
  SetSkeletalMeshMaterial(t) {
    var i;
    if (this.MaterialDirty) {
      this.MaterialDirty = false;
      if ((i = this.ReplaceMaterialArray.length) > 0) {
        t.SetMaterial(this.MaterialIndex, this.ReplaceMaterialArray[i - 1]);
      } else {
        t.SetMaterial(this.MaterialIndex, this.DynamicMaterial || RenderDataManager_1.RenderDataManager.Get().GetEmptyMaterial());
      }
    }
  }
  UpdateMaterialParam() {
    if (!this.IsDynamicMaterialValid()) {
      return 0;
    }
    var t = this.DynamicMaterial;
    let i = 0;
    if (this.Llr) {
      this.Llr = false;
      for (const o of this.FloatParamMap.keys()) {
        var s;
        var h = this.FloatParamMap.get(o);
        if (h[CACHE_INDEX] !== h[TARGET_INDEX]) {
          h[CACHE_INDEX] = h[TARGET_INDEX];
          s = FNameUtil_1.FNameUtil.GetDynamicFName(o);
          t.SetScalarParameterValue(s, h[TARGET_INDEX]);
          ++i;
        }
      }
    }
    if (this.Dlr) {
      this.Dlr = false;
      for (const _ of this.VectorParamMap.keys()) {
        var e;
        var r = this.VectorParamMap.get(_);
        if (r[CACHE_INDEX] !== r[TARGET_INDEX]) {
          r[CACHE_INDEX] = r[TARGET_INDEX];
          r = new UE.LinearColor(r[TARGET_INDEX].ColorR, r[TARGET_INDEX].ColorG, r[TARGET_INDEX].ColorB, r[TARGET_INDEX].ColorA);
          e = FNameUtil_1.FNameUtil.GetDynamicFName(_);
          t.SetVectorParameterValue(e, r);
          ++i;
        }
      }
    }
    if (this.Rlr) {
      this.Rlr = false;
      for (const n of this.TextureParamMap.keys()) {
        var a = this.TextureParamMap.get(n);
        var E = a[TARGET_INDEX];
        if (E !== undefined && a[CACHE_INDEX] !== E) {
          a[CACHE_INDEX] = E;
          a = FNameUtil_1.FNameUtil.GetDynamicFName(n);
          t.SetTextureParameterValue(a, E);
          ++i;
        }
      }
    }
    return i;
  }
  SetReplaceMaterial(t) {
    this.ReplaceMaterialArray.push(t);
    this.MaterialDirty = true;
  }
  RevertReplaceMaterial(i) {
    var s = new Array();
    let h = false;
    for (let t = 0; t < this.ReplaceMaterialArray.length; t++) {
      if (this.ReplaceMaterialArray[t] !== i) {
        s.push(this.ReplaceMaterialArray[t]);
      } else {
        h = true;
      }
    }
    this.ReplaceMaterialArray = s;
    this.MaterialDirty = true;
    return h;
  }
  SetFloat(t, i) {
    var s;
    if (this.IsDynamicMaterialValid()) {
      s = t.toString();
      this.Llr = true;
      if (this.FloatParamMap.has(s)) {
        this.FloatParamMap.get(s)[TARGET_INDEX] = i;
      } else {
        this.FloatParamMap.set(s, [this.DynamicMaterial.K2_GetScalarParameterValue(t), i + 1, i]);
      }
    }
  }
  RevertFloat(t) {
    if (this.IsDynamicMaterialValid() && this.FloatParamMap.has(t)) {
      this.Llr = true;
      (t = this.FloatParamMap.get(t))[TARGET_INDEX] = t[ORIGINAL_INDEX];
    }
  }
  SetColor(t, i) {
    var s;
    var h;
    if (this.IsDynamicMaterialValid()) {
      s = t.toString();
      this.Dlr = true;
      (h = new ColorTempContainer()).ColorR = i.R;
      h.ColorG = i.G;
      h.ColorB = i.B;
      h.ColorA = i.A;
      if (this.VectorParamMap.has(s)) {
        this.VectorParamMap.get(s)[TARGET_INDEX] = h;
      } else {
        i = this.DynamicMaterial.K2_GetVectorParameterValue(t);
        (t = new ColorTempContainer()).ColorR = i.R;
        t.ColorG = i.G;
        t.ColorB = i.B;
        t.ColorA = i.A;
        this.VectorParamMap.set(s, [t, undefined, h]);
      }
    }
  }
  RevertColor(t) {
    if (this.IsDynamicMaterialValid() && this.VectorParamMap.has(t)) {
      this.Dlr = true;
      (t = this.VectorParamMap.get(t))[TARGET_INDEX] = t[ORIGINAL_INDEX];
    }
  }
  SetTexture(t, i) {
    var s;
    if (this.IsDynamicMaterialValid()) {
      s = t.toString();
      this.Rlr = true;
      if (this.TextureParamMap.has(s)) {
        this.TextureParamMap.get(s)[TARGET_INDEX] = i;
      } else {
        this.TextureParamMap.set(s, [this.DynamicMaterial.K2_GetTextureParameterValue(t), undefined, i]);
      }
    }
  }
  RevertTexture(t) {
    if (this.IsDynamicMaterialValid() && this.TextureParamMap.has(t)) {
      this.Rlr = true;
      (t = this.TextureParamMap.get(t))[TARGET_INDEX] = t[ORIGINAL_INDEX];
    }
  }
  RevertProperty(t) {
    if (this.IsDynamicMaterialValid()) {
      t = t.toString();
      this.RevertColor(t);
      this.RevertFloat(t);
      this.RevertTexture(t);
    }
  }
  SetStarScarEnergy(t) {
    if (this.IsDynamicMaterialValid() && this.IsStarScar) {
      this.SetFloat(RenderConfig_1.RenderConfig.StarScarEnergyControl, t);
    }
  }
  IsDynamicMaterialValid() {
    return this.DynamicMaterial !== undefined && this.DynamicMaterial.IsValid();
  }
}
exports.CharMaterialSlot = CharMaterialSlot;
//# sourceMappingURL=CharMaterialInfo.js.map