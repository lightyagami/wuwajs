"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DamageViewData = undefined;
const UE = require("ue");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
class DamageViewData {
  constructor() {
    this.ConfigId = 0;
    this.DamageTextConfig = undefined;
    this.MinRandomOffsetX = 0;
    this.MinRandomOffsetY = 0;
    this.MaxRandomOffsetX = 0;
    this.MaxRandomOffsetY = 0;
    this.TextColor = undefined;
    this.CriticalTextColor = undefined;
    this.StrokeColor = undefined;
    this.CriticalStrokeColor = undefined;
    this.CriticalNiagaraPath = "";
    this.CriticalNiagaraId = -1;
  }
  Initialize(t) {
    this.ConfigId = t.Id;
    this.DamageTextConfig = t;
    this.CriticalNiagaraPath = t.CritNiagaraPath;
    this.MinRandomOffsetX = t.MinDeviationX;
    this.MinRandomOffsetY = t.MinDeviationY;
    this.MaxRandomOffsetX = t.MaxDeviationX;
    this.MaxRandomOffsetY = t.MaxDeviationX;
    this.TextColor = UE.Color.FromHex(t.TextColor);
    this.CriticalTextColor = UE.Color.FromHex(t.CritTextColor);
    this.StrokeColor = UE.Color.FromHex(t.StrokeColor);
    this.CriticalStrokeColor = UE.Color.FromHex(t.CritStrokeColor);
  }
  GetConfigId() {
    return this.ConfigId;
  }
  GetRandomOffsetX() {
    return MathUtils_1.MathUtils.GetRandomFloatNumber(this.MinRandomOffsetX, this.MaxRandomOffsetX);
  }
  GetRandomOffsetY() {
    return MathUtils_1.MathUtils.GetRandomFloatNumber(this.MinRandomOffsetY, this.MaxRandomOffsetY);
  }
  GetTextColor() {
    return this.TextColor;
  }
  GetCriticalTextColor() {
    return this.CriticalTextColor;
  }
  GetStrokeColor() {
    return this.StrokeColor;
  }
  GetCriticalStrokeColor() {
    return this.CriticalStrokeColor;
  }
  GetCriticalNiagaraPath() {
    return this.CriticalNiagaraPath;
  }
  GetSequencePath(t, i, s) {
    if (s) {
      return this.DamageTextConfig.DamageTextSequence;
    } else if (t) {
      if (i) {
        return this.DamageTextConfig.OwnCriticalDamageSequence;
      } else {
        return this.DamageTextConfig.OwnDamageSequence;
      }
    } else if (i) {
      return this.DamageTextConfig.MonsterCriticalDamageSequence;
    } else {
      return this.DamageTextConfig.MonsterDamageSequence;
    }
  }
}
exports.DamageViewData = DamageViewData;
//# sourceMappingURL=DamageViewData.js.map