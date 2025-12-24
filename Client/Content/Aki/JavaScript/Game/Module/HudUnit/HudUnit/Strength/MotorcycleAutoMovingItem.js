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
    this.R2f = -1;
    this.L2f = -1;
    this.Lti = false;
    this.w2f = false;
    this.P2f = false;
    this.A2f = undefined;
    this.D2f = undefined;
    this.U2f = false;
    this.TweenAnimPlayer = new BattleUiTweenAnimPlayer_1.BattleUiTweenAnimPlayer();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UISprite], [2, UE.UIItem], [3, UE.UISprite], [6, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem]];
  }
  OnStart() {
    this.InitTweenAnim(6);
    this.InitTweenAnim(4);
    this.InitTweenAnim(5);
    this.A2f = this.GetSprite(3);
    this.D2f = this.GetSprite(1);
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
    if (t !== this.R2f) {
      this.A2f.SetFillAmount(t);
      if (t === 1) {
        this.SetChangeColorNitrogen(true);
        this.PlayTweenAnim(4);
      } else if (this.R2f === 1) {
        this.SetChangeColorNitrogen(false);
      }
      this.R2f = t;
    }
  }
  SetPercentAccelerator(t) {
    if (t !== this.L2f) {
      this.D2f.SetFillAmount(t);
      if (t === 1) {
        this.SetChangeColorAccelerator(true);
        this.PlayTweenAnim(4);
      } else if (this.L2f === 1) {
        this.SetChangeColorAccelerator(false);
      }
      this.L2f = t;
    }
  }
  SetChangeColorNitrogen(t) {
    if (this.w2f !== t) {
      this.w2f = t;
      this.A2f.SetChangeColor(t, this.A2f.changeColor);
    }
  }
  SetChangeColorAccelerator(t) {
    if (this.P2f !== t) {
      this.P2f = t;
      this.D2f.SetChangeColor(t, this.D2f.changeColor);
    }
  }
  SetNitrogen(t) {
    if (this.U2f !== t) {
      this.U2f = t;
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