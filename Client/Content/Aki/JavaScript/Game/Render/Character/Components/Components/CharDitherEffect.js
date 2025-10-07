"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharDitherEffect = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const RenderConfig_1 = require("../../../Config/RenderConfig");
const CharRenderBase_1 = require("../../Manager/CharRenderBase");
const CharMaterialContainer_1 = require("../MaterialContainer/CharMaterialContainer");
const CharMaterialContainerV2_1 = require("./CharMaterialContainerV2");
class CharDitherEffect extends CharRenderBase_1.CharRenderBase {
  constructor() {
    super(...arguments);
    this.MaterialContainer = undefined;
    this.mhr = -0;
    this.dhr = -0;
    this.Chr = -0;
    this.fhr = 0;
    this.phr = -0;
    this.vhr = false;
    this.Mhr = undefined;
    this.jO_ = false;
    this.Jxl = [];
  }
  Start() {
    if (this.RenderComponent.UseMaterialContainerV2) {
      this.MaterialContainer = this.RenderComponent.GetComponent(RenderConfig_1.RenderConfig.IdMaterialContainerV2);
    } else {
      this.MaterialContainer = this.RenderComponent.GetComponent(RenderConfig_1.RenderConfig.IdMaterialContainer);
    }
    if (!this.MaterialContainer) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("RenderCharacter", 11, "非NPC类型没有添加组件 material container");
      }
    }
    this.phr = 1;
    this.mhr = 0;
    this.dhr = -0.2;
    this.Chr = 1;
    this.fhr = 0;
    this.vhr = false;
    this.Mhr = new Map();
    this.OnInitSuccess();
  }
  OnResetRenderState() {
    this.Shr(1);
    this.fhr = 0;
    this.vhr = false;
    this.Mhr.clear();
  }
  UpdateNpcDitherComponent() {}
  SetDitherEffect(i, s) {
    if (i !== this.phr) {
      let t = i < 0 || i >= 1 ? true : false;
      if (t) {
        if (this.Mhr.has(s)) {
          this.Mhr.set(s, false);
        }
        let e = false;
        let h = 0;
        this.Mhr.forEach((t, i) => {
          e = e || t;
          if (t && h < i) {
            h = i;
          }
        });
        this.fhr = h;
        if (!e && this.vhr) {
          this.RemoveDitherEffect();
        }
      } else {
        this.Mhr.set(s, true);
        if (this.fhr === s || this.fhr < s) {
          this.fhr = s;
          if (!this.vhr) {
            this.yhr();
          }
          this.Shr(i);
        }
      }
    }
  }
  SetDitherMask(t, i) {
    this.Jxl = t;
    this.jO_ = i;
    if (this.vhr) {
      this.Ihr();
      this.Thr();
      this.Lhr(this.mhr);
    }
  }
  RemoveDitherEffect() {
    this.Ihr();
    this.Shr(1);
    this.vhr = false;
  }
  yhr() {
    this.Thr();
    this.vhr = true;
  }
  Update() {}
  GetComponentId() {
    return RenderConfig_1.RenderConfig.IdDitherEffect;
  }
  GetDitherRate() {
    return this.phr;
  }
  Shr(t) {
    this.mhr = MathUtils_1.MathUtils.RangeClamp(t, 0, 1, this.dhr, this.Chr);
    if (!(Math.abs(this.phr - t) < 0.000001)) {
      this.Lhr(this.mhr);
      this.phr = t;
    }
  }
  Thr() {
    if (this.GetRenderingComponent().RenderType === 3) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("RenderCharacter", 25, "NpcEnableDither", ["CharName", this.GetRenderingComponent()?.GetCachedOwnerName()], ["Entity", this.GetRenderingComponent()?.GetCachedOwnerEntity()?.Id], ["Type", this.fhr]);
      }
    } else if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("RenderCharacter", 25, "CharacterEnableDither", ["CharName", this.GetRenderingComponent()?.GetCachedOwnerName()], ["Entity", this.GetRenderingComponent()?.GetCachedOwnerEntity()?.Id], ["Type", this.fhr]);
    }
    if (this.MaterialContainer instanceof CharMaterialContainerV2_1.CharMaterialContainerV2) {
      this.MaterialContainer.AddAlphaTestCount(0);
      if (this.Jxl.length > 0) {
        for (const t of this.Jxl) {
          this.MaterialContainer.SetFloatUpdateParamPermanent(RenderConfig_1.RenderConfig.UseDitherEffect, 1, 0, 0, t);
        }
      } else {
        this.MaterialContainer.SetFloatUpdateParamPermanent(RenderConfig_1.RenderConfig.UseDitherEffect, 1, 0, 0);
      }
    } else if (this.MaterialContainer instanceof CharMaterialContainer_1.CharMaterialContainer) {
      this.MaterialContainer.UseAlphaTestCommon();
      this.MaterialContainer.SetFloat(RenderConfig_1.RenderConfig.UseDitherEffect, 1, 0, 0);
    }
  }
  Lhr(t) {
    if (this.MaterialContainer instanceof CharMaterialContainerV2_1.CharMaterialContainerV2) {
      this.MaterialContainer.SetFloatUpdateParamPermanent(RenderConfig_1.RenderConfig.DitherValue, this.jO_ ? 1.2 : t, 0, 0);
      this.MaterialContainer.SetFloatUpdateParamPermanent(RenderConfig_1.RenderConfig.DitherValueMainPass, this.jO_ ? t : 1.2, 0, 0);
    } else if (this.MaterialContainer instanceof CharMaterialContainer_1.CharMaterialContainer) {
      this.MaterialContainer.SetFloat(RenderConfig_1.RenderConfig.DitherValue, this.jO_ ? 1.2 : t, 0, 0);
      this.MaterialContainer.SetFloat(RenderConfig_1.RenderConfig.DitherValueMainPass, this.jO_ ? t : 1.2, 0, 0);
    }
  }
  Ihr() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("RenderCharacter", 25, "CharacterDisableDither", ["CharName", this.GetRenderingComponent()?.GetCachedOwnerName()], ["Entity", this.GetRenderingComponent()?.GetCachedOwnerEntity()?.Id], ["Type", this.fhr]);
    }
    if (this.MaterialContainer instanceof CharMaterialContainerV2_1.CharMaterialContainerV2) {
      this.MaterialContainer.RemoveFloatUpdateParamPermanent(RenderConfig_1.RenderConfig.UseDitherEffect, 0, 0);
      this.MaterialContainer.RemoveFloatUpdateParamPermanent(RenderConfig_1.RenderConfig.DitherValue, 0, 0);
      this.MaterialContainer.RemoveFloatUpdateParamPermanent(RenderConfig_1.RenderConfig.DitherValueMainPass, 0, 0);
      this.MaterialContainer.RemoveAlphaTestCount(0);
    } else if (this.MaterialContainer instanceof CharMaterialContainer_1.CharMaterialContainer) {
      this.MaterialContainer.RevertAlphaTestCommon();
      this.MaterialContainer.SetFloat(RenderConfig_1.RenderConfig.UseDitherEffect, 0, 0, 0);
    }
  }
  GetStatName() {
    return "CharDitherEffect";
  }
}
exports.CharDitherEffect = CharDitherEffect;
//# sourceMappingURL=CharDitherEffect.js.map