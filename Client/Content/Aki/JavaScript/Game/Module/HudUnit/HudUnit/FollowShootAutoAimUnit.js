"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FollowShootAutoAimUnit = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const Log_1 = require("../../../../Core/Common/Log");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const HudUnitBase_1 = require("../HudUnitBase");
const CLOSE_ANIM_TIME = 200;
class FollowShootAutoAimUnit extends HudUnitBase_1.HudUnitBase {
  constructor() {
    super(...arguments);
    this.Kti = undefined;
    this.xii = undefined;
    this.uAl = undefined;
    this.dce = false;
    this.Yti = false;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem]];
  }
  OnStart() {
    this.Kti = this.GetItem(0);
    this.Yti = false;
    this.Kti.SetUIActive(false);
    this.Qnt();
    this.dce = true;
  }
  OnAfterShow() {
    this.StopTweenAnim(2);
    this.PlayTweenAnim(1);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("HudUnit", 17, "FollowShootAutoAimUnit AnimStart");
    }
  }
  async OnBeforeHideAsync() {
    this.StopTweenAnim(1);
    this.PlayTweenAnim(2);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("HudUnit", 17, "FollowShootAutoAimUnit AnimClose");
    }
    if (this.uAl) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("HudUnit", 17, "重复隐藏FollowShootAutoAimUnit");
      }
    } else {
      this.Gii();
      this.uAl = new CustomPromise_1.CustomPromise();
      this.xii = TimerSystem_1.TimerSystem.Delay(() => {
        this.xii = undefined;
        if (this.uAl) {
          this.uAl.SetResult();
          this.uAl = undefined;
        }
      }, CLOSE_ANIM_TIME);
      await this.uAl.Promise;
    }
  }
  OnBeforeDestroy() {
    this.Kti = undefined;
    this.Gii();
    super.OnBeforeDestroy();
  }
  SetTargetItemOffset(i, t) {
    if (this.Kti) {
      this.Kti.SetAnchorOffsetX(i);
      this.Kti.SetAnchorOffsetY(t);
    }
  }
  SetTargetAimVisible(i, t) {
    if (this.Kti && this.Yti !== i) {
      this.Yti = i;
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("HudUnit", 17, "FollowShootAutoAim设置目标准心是否可见", ["", i]);
      }
      this.Kti.SetUIActive(i);
      if (i) {
        this.Kti.SetUIActive(i);
        this.PlayStartAimAnim();
        this.PlayLoopAimAnim();
      } else {
        this.StopLoopAimAnim();
        this.PlayCloseAimAnim();
      }
    }
  }
  Gii() {
    if (this.xii) {
      TimerSystem_1.TimerSystem.Remove(this.xii);
      this.xii = undefined;
    }
    if (this.uAl) {
      this.uAl.SetResult();
      this.uAl = undefined;
    }
  }
  Qnt() {
    this.InitTweenAnim(1);
    this.InitTweenAnim(2);
    this.InitTweenAnim(3);
    this.InitTweenAnim(4);
    this.InitTweenAnim(5);
  }
  PlayStartAimAnim() {
    if (this.dce) {
      this.PlayTweenAnim(3);
    }
  }
  PlayCloseAimAnim() {
    if (this.dce) {
      this.PlayTweenAnim(4);
    }
  }
  PlayLoopAimAnim() {
    if (this.dce) {
      this.PlayTweenAnim(5);
    }
  }
  StopLoopAimAnim() {
    if (this.dce) {
      this.StopTweenAnim(5);
    }
  }
}
exports.FollowShootAutoAimUnit = FollowShootAutoAimUnit;
//# sourceMappingURL=FollowShootAutoAimUnit.js.map