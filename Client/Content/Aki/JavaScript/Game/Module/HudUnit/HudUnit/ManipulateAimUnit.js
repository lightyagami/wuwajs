"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ManipulateAimUnit = undefined;
const UE = require("ue");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const HudUnitBase_1 = require("../HudUnitBase");
const CLOSE_ANIM_TIME = 200;
class ManipulateAimUnit extends HudUnitBase_1.HudUnitBase {
  constructor() {
    super(...arguments);
    this.Kti = undefined;
    this.Qti = undefined;
    this.Xti = false;
    this._at = undefined;
    this.$ti = undefined;
    this.dce = false;
    this.Yti = false;
    this.dat = () => {
      this._at = undefined;
      this.$ti?.();
    };
  }
  OnRegisterComponent() {
    if (this.ResourceId === "UiView_Sight") {
      this.Xti = true;
    }
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem]];
    if (this.Xti) {
      this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem]];
    } else {
      this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem]];
    }
  }
  OnStart() {
    this.Kti = this.GetItem(0);
    this.Qti = this.GetItem(1);
    this.Yti = false;
    this.Kti.SetUIActive(false);
    this.Qnt();
    this.PlayStartAnim();
  }
  OnBeforeDestroy() {
    this.Kti = undefined;
    this.Qti = undefined;
    this.$ti = undefined;
    super.OnBeforeDestroy();
  }
  SetTargetItemOffset(i, t) {
    if (this.Kti) {
      this.Kti.SetAnchorOffsetX(i);
      this.Kti.SetAnchorOffsetY(t);
    }
  }
  SetTargetAimVisible(i) {
    if (this.Kti && this.Yti !== i) {
      this.Yti = i;
      if (this.Xti) {
        if (i) {
          this.Kti.SetUIActive(i);
          this.PlayStartAimAnim();
          this.PlayLoopAimAnim();
        } else {
          this.StopLoopAimAnim();
          this.PlayCloseAimAnim();
        }
      } else {
        this.Kti.SetUIActive(i);
      }
    }
  }
  SetIsWeakness(i) {
    if (this.Qti && this.Qti.IsUIActiveSelf() !== i) {
      this.Qti.SetUIActive(i);
    }
  }
  Qnt() {
    if (this.Xti) {
      this.InitTweenAnim(2);
      this.InitTweenAnim(3);
      this.InitTweenAnim(4);
      this.InitTweenAnim(5);
      this.InitTweenAnim(6);
    }
  }
  PlayStartAnim() {
    this.dce = true;
    this.StopCloseAnim();
    this.PlayTweenAnim(2);
  }
  PlayCloseAnim() {
    if (this.dce) {
      this.dce = false;
      this.Jti();
      if (this.InAsyncLoading()) {
        this.$ti?.();
      } else {
        this._at = TimerSystem_1.TimerSystem.Delay(this.dat, CLOSE_ANIM_TIME);
        this.PlayTweenAnim(3);
      }
    }
  }
  StopCloseAnim() {
    this.Jti();
    this.StopTweenAnim(3);
  }
  Jti() {
    if (this._at) {
      TimerSystem_1.TimerSystem.Remove(this._at);
      this._at = undefined;
    }
  }
  SetCloseAnimCallback(i) {
    this.$ti = i;
  }
  PlayStartAimAnim() {
    if (this.dce) {
      this.PlayTweenAnim(4);
    }
  }
  PlayCloseAimAnim() {
    if (this.dce) {
      this.PlayTweenAnim(5);
    }
  }
  PlayLoopAimAnim() {
    if (this.dce) {
      this.PlayTweenAnim(6);
    }
  }
  StopLoopAimAnim() {
    if (this.dce) {
      this.StopTweenAnim(6);
    }
  }
  PlayTweenAnim(i) {
    if (this.Xti) {
      super.PlayTweenAnim(i);
    }
  }
  StopTweenAnim(i) {
    if (this.Xti) {
      super.StopTweenAnim(i);
    }
  }
}
exports.ManipulateAimUnit = ManipulateAimUnit;
//# sourceMappingURL=ManipulateAimUnit.js.map