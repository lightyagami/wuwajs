"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NpcMontageController = undefined;
const UE = require("ue");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const CharacterNameDefines_1 = require("../../Common/CharacterNameDefines");
class NpcMontageController {
  constructor(e) {
    this.Jh = undefined;
    this.oRe = undefined;
    this.Jh = e;
    this.oRe = this.Jh.GetComponent(44);
  }
  LoadAsync(e, t) {
    return ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.AnimMontage, t);
  }
  Play(e, t) {
    this.oRe.MainAnimInstance.Montage_Play(e);
    if (t) {
      this.oRe.MainAnimInstance.OnMontageEnded.Add(t);
    }
  }
  PlayOnce(e, t) {
    this.oRe.MainAnimInstance.Montage_Play(e);
    this.oRe.MainAnimInstance.Montage_SetNextSection(CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION, CharacterNameDefines_1.CharacterNameDefines.END_SECTION, e);
    if (t) {
      this.oRe.MainAnimInstance.OnMontageEnded.Add(t);
    }
  }
  PlayFromLoop(e, t) {
    this.oRe.MainAnimInstance.Montage_Play(e);
    this.oRe.MainAnimInstance.Montage_JumpToSection(CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION, e);
    if (t) {
      this.oRe.MainAnimInstance.OnMontageEnded.Add(t);
    }
  }
  PlayFromEnd(e, t) {
    this.oRe.MainAnimInstance.Montage_Play(e);
    this.oRe.MainAnimInstance.Montage_JumpToSection(CharacterNameDefines_1.CharacterNameDefines.END_SECTION, e);
    if (t) {
      this.oRe.MainAnimInstance.OnMontageEnded.Add(t);
    }
  }
  Stop(e = false, t) {
    if (e) {
      this.oRe.MainAnimInstance.Montage_JumpToSection(CharacterNameDefines_1.CharacterNameDefines.END_SECTION, t);
    } else {
      this.oRe.MainAnimInstance.Montage_SetNextSection(CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION, CharacterNameDefines_1.CharacterNameDefines.END_SECTION, t);
    }
  }
  ForceStop(e, t) {
    this.oRe.MainAnimInstance.Montage_Stop(e ?? 0, t);
  }
  ForceStopWithBlendOut(e, t) {
    var s;
    var r;
    if (t) {
      s = this.oRe.MainAnimInstance.Montage_GetPosition(t);
      if ((r = e * 1000) < (s = t.SequenceLength - s)) {
        this.oRe.MainAnimInstance.Montage_SetPlayRate(t, s / r);
      }
      this.oRe.MainAnimInstance.Montage_SetNextSection(CharacterNameDefines_1.CharacterNameDefines.LOOP_SECTION, CharacterNameDefines_1.CharacterNameDefines.END_SECTION, t);
    } else {
      this.oRe.MainAnimInstance.Montage_Stop(e ?? 0);
    }
  }
  AddOnMontageEnded(e) {
    if (e) {
      this.oRe.MainAnimInstance?.OnMontageEnded.Add(e);
    }
  }
  RemoveOnMontageEnded(e) {
    if (e) {
      this.oRe.MainAnimInstance?.OnMontageEnded.Remove(e);
    }
  }
}
exports.NpcMontageController = NpcMontageController;
//# sourceMappingURL=NpcMontageController.js.map