"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleAutoMovingItem = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const Stats_1 = require("../../../../../Core/Common/Stats");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const BattleUiTweenAnimPlayer_1 = require("../../../BattleUi/Views/BattleUiTweenAnimPlayer");
const CLOSE_ANIM_TIME = 300;
class MotorcycleAutoMovingItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.xii = undefined;
    this.i5f = -1;
    this.r5f = -1;
    this.Lti = false;
    this.o5f = false;
    this.n5f = false;
    this.s5f = undefined;
    this.a5f = undefined;
    this.h5f = false;
    this.TweenAnimPlayer = new BattleUiTweenAnimPlayer_1.BattleUiTweenAnimPlayer();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UISprite], [2, UE.UIItem], [3, UE.UISprite], [6, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem]];
  }
  OnStart() {
    this.InitTweenAnim(6);
    this.InitTweenAnim(4);
    this.InitTweenAnim(5);
    this.s5f = this.GetSprite(3);
    this.a5f = this.GetSprite(1);
  }
  OnBeforeDestroy() {
    this.Gii();
    super.OnBeforeDestroy();
  }
  SetVisible(t) {
    if (this.Lti !== t) {
      if (this.Lti = t) {
        this.SetActive(true);
        this.StopTweenAnim(5);
        this.PlayTweenAnim(6);
      } else {
        this.Wti();
      }
    }
  }
  Wti() {
    this.StopTweenAnim(6);
    this.PlayTweenAnim(5);
    this.Gii();
    this.xii = TimerSystem_1.TimerSystem.Delay(() => {
      this.xii = undefined;
      if (!this.Lti) {
        this.SetActive(false);
      }
    }, CLOSE_ANIM_TIME, MotorcycleAutoMovingItem.Xii);
  }
  Gii() {
    if (this.xii) {
      TimerSystem_1.TimerSystem.Remove(this.xii);
      this.xii = undefined;
    }
  }
  SetPercentNitrogen(t) {
    if (t !== this.i5f) {
      this.s5f.SetFillAmount(t);
      if (t === 1) {
        this.SetChangeColorNitrogen(true);
        this.PlayTweenAnim(4);
      } else if (this.i5f === 1) {
        this.SetChangeColorNitrogen(false);
      }
      this.i5f = t;
    }
  }
  SetPercentAccelerator(t) {
    if (t !== this.r5f) {
      this.a5f.SetFillAmount(t);
      if (t === 1) {
        this.SetChangeColorAccelerator(true);
        this.PlayTweenAnim(4);
      } else if (this.r5f === 1) {
        this.SetChangeColorAccelerator(false);
      }
      this.r5f = t;
    }
  }
  SetChangeColorNitrogen(t) {
    if (this.o5f !== t) {
      this.o5f = t;
      this.s5f.SetChangeColor(t, this.s5f.changeColor);
    }
  }
  SetChangeColorAccelerator(t) {
    if (this.n5f !== t) {
      this.n5f = t;
      this.a5f.SetChangeColor(t, this.a5f.changeColor);
    }
  }
  SetNitrogen(t) {
    if (this.h5f !== t) {
      this.h5f = t;
      this.GetItem(0).SetUIActive(!t);
      this.GetItem(2).SetUIActive(t);
    }
  }
  GetTargetVisible() {
    return this.Lti;
  }
  InitTweenAnim(t) {
    this.TweenAnimPlayer.InitTweenAnim(t, this.GetItem(t));
  }
  PlayTweenAnim(t) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("HudUnit", 17, "[自动奔跑]PlayTweenAnim", ["type", t]);
    }
    this.TweenAnimPlayer.PlayTweenAnim(t);
  }
  StopTweenAnim(t) {
    this.TweenAnimPlayer.StopTweenAnim(t);
  }
}
(exports.MotorcycleAutoMovingItem = MotorcycleAutoMovingItem).Xii = Stats_1.Stat.Create("MotorcycleAutoMovingItemCloseAnim");
//# sourceMappingURL=MotorcycleAutoMovingItem.js.map