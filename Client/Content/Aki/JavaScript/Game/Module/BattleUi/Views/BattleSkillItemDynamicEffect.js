"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattleSkillItemDynamicEffect = undefined;
const UE = require("ue");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
class BattleSkillItemDynamicEffect {
  constructor(t) {
    this._Km = undefined;
    this.Ktt = 0;
    this.jtt = undefined;
    this.vit = 0;
    this.zQ_ = undefined;
    this.Wtt = undefined;
    this.trm = 1;
    this.uKm = undefined;
    this._Km = t;
  }
  CancelLoadDynamicEffectNiagara() {
    if (this.Ktt) {
      ResourceSystem_1.ResourceSystem.CancelAsyncLoad(this.Ktt);
      this.Ktt = undefined;
      this.Wtt = undefined;
    }
  }
  RefreshDynamicEffect(t) {
    let i = undefined;
    if (this.uKm = t) {
      i = this.GetDynamicEffectPath(t);
    }
    this.RefreshDynamicEffectScale(t);
    if (this.jtt === i) {
      if (!this.Wtt) {
        this.JQ_(t, true);
      }
    } else {
      this.CancelLoadDynamicEffectNiagara();
      this.jtt = i;
      if (this.jtt) {
        this.Wtt = this.jtt;
        this.Ktt = ResourceSystem_1.ResourceSystem.LoadAsync(this.Wtt, UE.NiagaraSystem, t => {
          var i;
          this.Wtt = undefined;
          if (t?.IsValid() && (i = this._Km)) {
            i.SetNiagaraSystem(t);
            this.JQ_(this.uKm);
            this.SetDynamicEffectVisible(true);
          }
        });
      } else {
        this.SetDynamicEffectVisible(false);
      }
    }
  }
  JQ_(i, s = false) {
    if (i && (i.ElementId !== this.vit || i.Color !== this.zQ_)) {
      let t = undefined;
      this.zQ_ = i.Color;
      if (StringUtils_1.StringUtils.IsEmpty(this.zQ_)) {
        this.vit = i.ElementId;
        if (this.vit > 0) {
          i = ConfigManager_1.ConfigManager.ElementInfoConfig.GetElementInfo(this.vit);
          t = new UE.LinearColor(UE.Color.FromHex(i.SkillEffectColor));
        }
      } else {
        this.vit = 0;
        t = new UE.LinearColor(UE.Color.FromHex(this.zQ_));
      }
      i = this._Km;
      if (t) {
        i.SetNiagaraVarLinearColor("Color", t);
      } else {
        i.ResetOverrideParameters();
        if (s && i.NiagaraComponent) {
          i.NiagaraComponent.ResetOverrideParametersAndActivate();
        }
      }
    }
  }
  RefreshDynamicEffectScale(t) {
    t = t?.Scale ?? 1;
    if (this.trm !== t) {
      this.trm = t;
      this._Km?.SetUIItemScale(t === 1 ? Vector_1.Vector.OneVector : new UE.Vector(t, t, t));
    }
  }
  SetDynamicEffectVisible(t) {
    var i = this._Km;
    if (i) {
      if (t) {
        if (!i.bIsUIActive) {
          i.SetUIActive(true);
        }
        i.ActivateSystem(true);
      } else if (i.bIsUIActive) {
        i.SetUIActive(false);
      }
    }
  }
  GetDynamicEffectPath(t) {
    t = t.NiagaraPath;
    if (!StringUtils_1.StringUtils.IsEmpty(t)) {
      return t;
    }
  }
  Reset() {
    this.CancelLoadDynamicEffectNiagara();
    if (this.vit !== 0 || this.zQ_ !== undefined) {
      this._Km?.ResetOverrideParameters();
      this.vit = 0;
      this.zQ_ = undefined;
    }
  }
}
exports.BattleSkillItemDynamicEffect = BattleSkillItemDynamicEffect;
//# sourceMappingURL=BattleSkillItemDynamicEffect.js.map