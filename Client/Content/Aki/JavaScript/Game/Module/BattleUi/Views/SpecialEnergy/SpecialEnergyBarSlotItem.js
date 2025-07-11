"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecialEnergyBarSlotItem = undefined;
const UE = require("ue");
const Time_1 = require("../../../../../Core/Common/Time");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const EFFECT_DURATION = 500;
class SpecialEnergyBarSlotItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.ac = 0;
    this.Fdt = false;
    this.Kdt = 0;
    this.Qdt = 0;
    this.Vdt = 1;
    this.Xdt = 0;
    this.$dt = 0;
    this.Ydt = 0;
    this.PNn = undefined;
    this.Oca = -1;
    this.kca = false;
    this.Y7_ = -1;
    this.z7_ = false;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UISprite], [2, UE.UIItem], [3, UE.UINiagara], [4, UE.UINiagara], [5, UE.UINiagara], [6, UE.UINiagara], [7, UE.UISprite], [8, UE.UISprite]];
  }
  OnStart() {
    this.GetSprite(0).SetUIActive(true);
    this.GetSprite(1).SetUIActive(true);
    this.GetSprite(7).SetUIActive(true);
    this.GetSprite(8).SetUIActive(true);
    this.GetUiNiagara(3).SetUIActive(false);
    this.GetUiNiagara(4).SetUIActive(false);
    this.GetUiNiagara(5).SetUIActive(false);
    this.GetUiNiagara(6).SetUIActive(false);
    var t = this.GetSprite(7);
    this.GetSprite(8).SetStretchLeft(t.GetStretchLeft());
    this.Xdt = t.GetStretchRight();
    this.$dt = t.Width;
    this.Ydt = t.tileX;
  }
  SetBarColor(t) {
    this.GetSprite(1).SetColor(t);
  }
  SetPointBgColor(t) {
    this.GetSprite(7).SetColor(t);
  }
  SetPointColor(t) {
    this.GetSprite(8).SetColor(t);
  }
  SetFullEffectColor(t, i = false) {
    this.GetUiNiagara(3).SetNiagaraVarLinearColor("Color", t);
    this.GetUiNiagara(4).SetNiagaraVarLinearColor("Color", t);
    this.GetUiNiagara(6).SetNiagaraVarLinearColor("Color", t);
    this.GetUiNiagara(3).SetNiagaraVarFloat("Default", i ? 0 : 1);
    this.GetUiNiagara(3).SetNiagaraVarFloat("Shift", i ? 1 : 0);
  }
  SetBgAndUseEffectColor(t) {
    this.GetUiNiagara(4).SetNiagaraVarLinearColor("Color", t);
    this.GetUiNiagara(6).SetNiagaraVarLinearColor("Color", t);
  }
  SetChangeEffectColor(t) {
    this.GetUiNiagara(5).SetNiagaraVarLinearColor("Color", t);
  }
  SetEffectBasePercent(t) {
    this.Vdt = t;
    this.GetUiNiagara(3).SetNiagaraVarFloat("Dissolve", this.Vdt);
    this.GetUiNiagara(4).SetNiagaraVarFloat("Dissolve", this.Vdt);
    this.GetUiNiagara(5).SetNiagaraVarFloat("Dissolve", this.Vdt);
    this.GetUiNiagara(6).SetNiagaraVarFloat("Dissolve", this.Vdt);
  }
  UpdatePercent(t, i, s = false) {
    let h = 0;
    if (t <= MathUtils_1.MathUtils.SmallNumber) {
      h = -1;
    } else if (t >= 1 - MathUtils_1.MathUtils.SmallNumber && i) {
      h = 1;
    }
    if (this.ac !== h) {
      if (h === -1) {
        this.GetSprite(0).SetUIActive(true);
        this.GetSprite(7).SetUIActive(true);
        this.GetSprite(8).SetUIActive(false);
        this.GetSprite(1).SetUIActive(false);
        this.GetUiNiagara(3).SetUIActive(false);
        this.GetUiNiagara(4).SetUIActive(false);
        this.GetUiNiagara(5).SetUIActive(false);
        if (this.ac === 1 && !s) {
          this.Jdt();
        }
      } else if (h === 1) {
        this.GetSprite(0).SetUIActive(false);
        this.GetSprite(7).SetUIActive(false);
        this.GetSprite(8).SetUIActive(false);
        this.GetSprite(1).SetUIActive(false);
        this.GetUiNiagara(3).SetUIActive(true);
        this.GetUiNiagara(4).SetUIActive(true);
        this.GetUiNiagara(6).SetUIActive(false);
        this.zdt();
      } else {
        this.GetSprite(0).SetUIActive(true);
        this.GetSprite(7).SetUIActive(true);
        this.GetSprite(8).SetUIActive(true);
        this.GetSprite(1).SetUIActive(true);
        this.GetUiNiagara(3).SetUIActive(false);
        this.GetUiNiagara(4).SetUIActive(false);
        this.GetUiNiagara(5).SetUIActive(false);
        if (this.ac === 1 && !s) {
          this.Jdt();
        }
      }
      this.ac = h;
    }
    if (h === 0) {
      this.GetSprite(1).SetFillAmount(t);
      this.Zdt(t);
    }
  }
  UpdatePercentWithVisible(t, i, s, h, e) {
    if (i) {
      this.GetSprite(1).SetFillAmount(t);
      this.Zdt(t);
    }
    if (h) {
      this.GetSprite(0).SetUIActive(i);
      this.GetSprite(1).SetUIActive(i);
      this.GetSprite(7).SetUIActive(i);
      this.GetSprite(8).SetUIActive(i);
      this.GetUiNiagara(5).SetUIActive(false);
      this.GetUiNiagara(6).SetUIActive(false);
    } else if (s) {
      this.GetSprite(0).SetUIActive(i);
      this.GetSprite(1).SetUIActive(i);
      this.GetSprite(7).SetUIActive(i);
      this.GetSprite(8).SetUIActive(i);
      if (i) {
        this.GetUiNiagara(5).SetUIActive(false);
      } else {
        this.GetUiNiagara(5).SetNiagaraVarFloat("Dissolve", t * this.Vdt);
        this.zdt();
      }
      if (i && t === 0) {
        this.GetUiNiagara(6).SetNiagaraVarFloat("Dissolve", e * this.Vdt);
        this.Jdt();
      } else {
        this.GetUiNiagara(6).SetUIActive(false);
      }
    }
  }
  UpdatePercentWithFullEffect(t, i, s) {
    if (s) {
      this.GetSprite(1).SetUIActive(false);
      this.GetSprite(8).SetUIActive(false);
      this.GetUiNiagara(5).SetUIActive(false);
      this.GetUiNiagara(6).SetUIActive(false);
      this.GetUiNiagara(3).SetUIActive(true);
      this.GetUiNiagara(4).SetUIActive(true);
    }
    this.GetUiNiagara(3).SetNiagaraVarFloat("Dissolve", t);
    this.GetUiNiagara(4).SetNiagaraVarFloat("Dissolve", i);
    this.GetUiNiagara(3).SetUIActive(t > 0);
    this.GetUiNiagara(4).SetUIActive(i > 0);
  }
  UpdatePercentWithFullEffectEnable(t, i, s = false) {
    let h = 0;
    if (t <= MathUtils_1.MathUtils.SmallNumber) {
      h = -1;
    } else if (i) {
      h = t < 1 - MathUtils_1.MathUtils.SmallNumber ? 1 : 2;
    }
    if (this.ac !== h) {
      if (h === -1) {
        this.GetSprite(0).SetUIActive(true);
        this.GetSprite(7).SetUIActive(true);
        this.GetSprite(8).SetUIActive(false);
        this.GetSprite(1).SetUIActive(false);
        this.GetUiNiagara(3).SetUIActive(false);
        this.GetUiNiagara(4).SetUIActive(false);
        this.GetUiNiagara(5).SetUIActive(false);
        if (this.ac === 1 && !s) {
          this.Jdt();
        }
      } else if (h === 1) {
        this.GetSprite(0).SetUIActive(false);
        this.GetSprite(7).SetUIActive(true);
        this.GetSprite(8).SetUIActive(false);
        this.GetSprite(1).SetUIActive(false);
        this.GetUiNiagara(3).SetUIActive(true);
        this.GetUiNiagara(4).SetUIActive(true);
        this.GetUiNiagara(6).SetUIActive(false);
        this.zdt();
      } else if (h === 2) {
        this.GetSprite(0).SetUIActive(false);
        this.GetSprite(7).SetUIActive(false);
        this.GetSprite(8).SetUIActive(false);
        this.GetSprite(1).SetUIActive(false);
        this.GetUiNiagara(3).SetUIActive(true);
        this.GetUiNiagara(4).SetUIActive(true);
        this.GetUiNiagara(6).SetUIActive(false);
        this.zdt();
      } else {
        this.GetSprite(0).SetUIActive(true);
        this.GetSprite(7).SetUIActive(true);
        this.GetSprite(8).SetUIActive(true);
        this.GetSprite(1).SetUIActive(true);
        this.GetUiNiagara(3).SetUIActive(false);
        this.GetUiNiagara(4).SetUIActive(false);
        this.GetUiNiagara(5).SetUIActive(false);
        if (this.ac === 1 && !s) {
          this.Jdt();
        }
      }
      this.ac = h;
    }
    if (h === 0) {
      this.GetSprite(1).SetFillAmount(t);
      this.Zdt(t);
    } else if (h === 1 || h === 2) {
      this.GetUiNiagara(3).SetNiagaraVarFloat("Dissolve", t);
      this.GetUiNiagara(4).SetNiagaraVarFloat("Dissolve", t);
    }
  }
  Zdt(t) {
    var t = Math.max(0, Math.min(1, t));
    var i = this.GetSprite(8);
    i.SetStretchRight(this.Xdt + this.$dt * (1 - t));
    i.SetTileX(this.Ydt * t);
  }
  PlayUseEffectWithPercent(t) {
    this.GetUiNiagara(6).SetNiagaraVarFloat("Dissolve", t * this.Vdt);
    this.Jdt();
  }
  zdt() {
    this.GetUiNiagara(5).SetUIActive(true);
    this.Fdt = true;
    this.Kdt = EFFECT_DURATION + Time_1.Time.Now;
  }
  PlayChangeEffectWithPercent(t) {
    this.GetUiNiagara(5).SetNiagaraVarFloat("Dissolve", t);
    this.zdt();
  }
  SetChangeEffectOffsetX(t) {
    var i = this.GetUiNiagara(5);
    if (!this.z7_) {
      this.z7_ = true;
      this.Y7_ = i.GetAnchorOffsetX();
    }
    i.SetAnchorOffsetX(t);
  }
  Jdt() {
    this.GetUiNiagara(6).SetUIActive(true);
    this.Fdt = true;
    this.Qdt = EFFECT_DURATION + Time_1.Time.Now;
  }
  Tick(t) {
    if (this.Fdt && (this.Fdt = false, this.Kdt > 0 && (this.Kdt <= Time_1.Time.Now ? (this.GetUiNiagara(5).SetUIActive(false), this.Kdt = 0) : this.Fdt = true), this.Qdt > 0)) {
      if (this.Qdt <= Time_1.Time.Now) {
        this.GetUiNiagara(6).SetUIActive(false);
        this.Qdt = 0;
      } else {
        this.Fdt = true;
      }
    }
  }
  ReplaceFullEffect(t) {
    var i = this.GetUiNiagara(3);
    this.PNn ||= i.NiagaraSystemReference;
    i.SetNiagaraSystem(t);
  }
  SetFullEffectOffsetX(t) {
    var i = this.GetUiNiagara(3);
    if (!this.kca) {
      this.kca = true;
      this.Oca = i.GetAnchorOffsetX();
    }
    i.SetAnchorOffsetX(t);
  }
  SetFullEffectVisible(t) {
    this.GetUiNiagara(3).SetUIActive(t);
  }
  OnBeforeDestroy() {
    if (this.PNn) {
      this.GetUiNiagara(3).SetNiagaraSystem(this.PNn);
      this.PNn = undefined;
    }
    if (this.kca) {
      this.GetUiNiagara(3).SetAnchorOffsetX(this.Oca);
      this.kca = false;
    }
    if (this.z7_) {
      this.GetUiNiagara(5).SetAnchorOffsetX(this.Y7_);
      this.z7_ = false;
    }
  }
}
exports.SpecialEnergyBarSlotItem = SpecialEnergyBarSlotItem;
//# sourceMappingURL=SpecialEnergyBarSlotItem.js.map