"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AimUnit = undefined;
const UE = require("ue");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const HudUnitBase_1 = require("../HudUnitBase");
const CLOSE_ANIM_TIME = 200;
const MAX_BYTE = 255;
class AimUnit extends HudUnitBase_1.HudUnitBase {
  constructor() {
    super(...arguments);
    this.Tti = 0;
    this.Lti = false;
    this.Dti = undefined;
    this.Rti = false;
    this.SPe = undefined;
    this.Uti = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UISprite], [2, UE.UISprite], [3, UE.UISprite], [4, UE.UISprite], [5, UE.UISprite], [6, UE.UISprite], [7, UE.UISprite], [8, UE.UISprite], [9, UE.UISprite], [10, UE.UISprite], [11, UE.UISprite], [12, UE.UIItem]];
  }
  OnStart() {
    this.Dti = [this.GetSprite(1), this.GetSprite(2), this.GetSprite(3), this.GetSprite(4), this.GetSprite(5), this.GetSprite(6), this.GetSprite(7), this.GetSprite(8), this.GetSprite(9), this.GetSprite(10), this.GetSprite(11)];
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  OnBeforeDestroy() {
    this.SPe?.Clear();
    this.SPe = undefined;
    this.Ati();
  }
  SetTargetVisible(t, i) {
    this.Lti = t;
    this.Ati();
    if (i || t || !this.GetActive() || this.Tti === 0) {
      if (t) {
        this.SPe.StopCurrentSequence();
        this.GetItem(0).SetAlpha(1);
      }
      this.SetVisible(t);
    } else {
      this.SetAimStatus(0);
    }
  }
  GetTargetVisible() {
    return this.Lti;
  }
  SetAimStatus(t) {
    if (this.Tti !== t) {
      switch (t) {
        case 0:
          this.Pti();
          break;
        case 1:
          this.xti();
          break;
        case 2:
          this.wti();
          break;
        case 3:
          this.Bti();
      }
      this.Tti = t;
    }
  }
  xti() {
    this.bti(false);
    this.qti(false);
    if (this.Tti === 3) {
      this.Gti("Change", true);
    } else if (this.Tti === 0) {
      this.Gti("Start1");
    }
  }
  wti() {
    this.bti(true);
    this.qti(false);
    if (this.Tti === 3) {
      this.Gti("Change", true);
    } else if (this.Tti === 0) {
      this.Gti("Start1");
    }
  }
  Bti() {
    this.bti(true);
    this.qti(true);
    if (this.Tti === 2 || this.Tti === 1) {
      this.Gti("Change");
    } else if (this.Tti === 0) {
      this.Gti("Start2");
    }
  }
  Pti() {
    this.Gti("close");
    this.Nti();
  }
  Gti(t, i = false) {
    this.Ati();
    this.SPe.StopCurrentSequence();
    this.SPe.PlaySequencePurely(t, false, i);
  }
  SetActive(t) {
    if (!t || !!this.Lti) {
      super.SetActive(t);
    }
  }
  Nti() {
    this.Uti = TimerSystem_1.TimerSystem.Delay(() => {
      this.SetActive(false);
      this.Uti = undefined;
    }, CLOSE_ANIM_TIME);
  }
  Ati() {
    if (this.Uti) {
      TimerSystem_1.TimerSystem.Remove(this.Uti);
      this.Uti = undefined;
    }
  }
  bti(t) {
    if (this.Rti === undefined || this.Rti !== t) {
      this.Rti = t;
      var i = this.Rti ? AimUnit.Oti : AimUnit.kti;
      for (const s of this.Dti) {
        s.SetColor(i);
      }
    }
  }
  qti(t) {
    this.GetSprite(6).SetAlpha(t ? 0 : 1);
    this.GetSprite(7).SetAlpha(t ? 0 : 1);
    this.GetSprite(8).SetAlpha(t ? 1 : 0);
    this.GetSprite(9).SetAlpha(t ? 1 : 0);
  }
  SetArrowLineVisible(t) {
    this.GetItem(12)?.SetUIActive(t);
  }
}
(exports.AimUnit = AimUnit).kti = new UE.Color(MAX_BYTE, MAX_BYTE, MAX_BYTE, MAX_BYTE);
AimUnit.Oti = new UE.Color(MAX_BYTE, 0, 0, MAX_BYTE); //# sourceMappingURL=ArmUnit.js.map