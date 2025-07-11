"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterDitherEffectController = undefined;
const MathUtils_1 = require("../../../../../../Core/Utils/MathUtils");
const ObjectUtils_1 = require("../../../../../../Core/Utils/ObjectUtils");
const TsBaseCharacter_1 = require("../../../../../Character/TsBaseCharacter");
const MILLISECOND_TO_SECOND = 0.001;
class CharacterDitherEffectController {
  constructor(t, i) {
    this.qYo = false;
    this.GYo = 1;
    this.NYo = 0;
    this.OYo = 1;
    this.kYo = false;
    this.Ane = undefined;
    this.Pne = undefined;
    this.I1a = false;
    this.OC = t;
    this.l9e = i;
    if (!ObjectUtils_1.ObjectUtils.IsValid(this.l9e)) {
      this.kYo = false;
    }
  }
  get FYo() {
    return !this.OC || !this.OC.IsValid() || this.OC.bHidden;
  }
  get CurrentDitherValue() {
    return this.GYo;
  }
  get IsInAutoAnimationValue() {
    return this.qYo;
  }
  get DitherSpeedRateValue() {
    return this.OYo;
  }
  get IsDisableValue() {
    return this.kYo;
  }
  SetIsDisable(t, i = 0) {
    if (this.kYo !== t) {
      if (this.kYo = t) {
        this.SetHiddenInGame(true, false);
      } else {
        if (!this.qYo && MathUtils_1.MathUtils.IsNearlyZero(this.GYo, MathUtils_1.MathUtils.KindaSmallNumber)) {
          this.SetHiddenInGame(true, false);
        } else {
          this.SetHiddenInGame(false, false);
        }
        if (this.NYo !== 0) {
          this.l9e.SetDitherEffect(this.GYo, this.NYo);
        }
      }
    }
  }
  EnterAppearEffect(t = 1, i = 3, s = true) {
    if (this.FYo) {
      this.SetHiddenInGame(false, true);
    }
    this.I1a = false;
    this.qYo = true;
    this.NYo = i;
    this.OYo = t;
    if (s) {
      this.GYo = 0;
      this.l9e.SetDitherEffect(this.GYo, this.NYo);
    }
  }
  EnterDisappearEffect(t = 1, i = 3, s = true) {
    if (this.FYo) {
      this.GYo = 0;
      this.NYo = i;
      this.T1a();
    } else {
      this.qYo = true;
      this.NYo = i;
      this.OYo = -t;
      if (s) {
        this.GYo = 1;
        this.l9e.SetDitherEffect(this.GYo, this.NYo);
      }
    }
  }
  SetDitherEffect(t, i = 3, s = true) {
    this.GYo = MathUtils_1.MathUtils.Clamp(t, 0, 1);
    this.NYo = i;
    if (!this.kYo) {
      this.SetHiddenInGame(MathUtils_1.MathUtils.IsNearlyZero(this.GYo, MathUtils_1.MathUtils.KindaSmallNumber), s);
      this.l9e?.SetDitherEffect(this.GYo, i);
    }
  }
  SetHiddenInGame(t, i) {
    if (this.OC) {
      if (this.OC instanceof TsBaseCharacter_1.default) {
        var s = this.OC.CharacterActorComponent;
        if (!s) {
          return;
        }
        if (t) {
          if (this.Ane) {
            return;
          }
          this.Ane = s.DisableActor("[CharacterDitherEffectController.SetHiddenInGame]");
          if (!s.Entity.GetComponent(186)?.IsNpcOutShowRange) {
            this.Pne = s.DisableCollision("[CharacterDitherEffectController.SetHiddenInGame]");
          }
        } else {
          if (this.Ane) {
            s.EnableActor(this.Ane);
            this.Ane = undefined;
          }
          if (this.Pne) {
            s.EnableCollision(this.Pne);
            this.Pne = undefined;
          }
        }
      } else if (this.OC.IsValid()) {
        if (this.FYo === t) {
          return;
        }
        this.OC.SetActorHiddenInGame(t);
        this.OC.SetActorEnableCollision(!t);
      }
      if (t && i && this.qYo) {
        this.qYo = false;
        this.GYo = 0;
      }
    }
  }
  Update(t) {
    if (!this.kYo && this.qYo) {
      t = t * MILLISECOND_TO_SECOND * this.OYo;
      this.VYo(t, this.NYo);
    }
  }
  T1a() {
    if (!this.I1a) {
      this.I1a = true;
      this.SetHiddenInGame(MathUtils_1.MathUtils.IsNearlyZero(this.GYo, MathUtils_1.MathUtils.KindaSmallNumber), true);
      this.l9e.SetDitherEffect(this.GYo, this.NYo);
      this.l9e.UpdateMaterialEffectsOnly();
    }
  }
  ForceResetDither() {
    this.GYo = 0;
    this.NYo = 1;
    this.T1a();
  }
  VYo(t, i) {
    this.GYo = MathUtils_1.MathUtils.Clamp(this.GYo + t, 0, 1);
    if (this.GYo === 0 && t < 0) {
      this.qYo = false;
      this.SetHiddenInGame(true, true);
    } else if (this.GYo === 1 && t > 0) {
      this.qYo = false;
    }
    this.l9e.SetDitherEffect(this.GYo, i);
  }
  Clear() {
    this.OC = undefined;
    if (this.l9e) {
      this.l9e.ResetAllRenderingState();
    }
    this.l9e = undefined;
    this.Ane = undefined;
    this.Pne = undefined;
  }
}
exports.CharacterDitherEffectController = CharacterDitherEffectController;
//# sourceMappingURL=CharacterDitherEffectController.js.map