"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AutoMovingItem = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const Stats_1 = require("../../../../../Core/Common/Stats");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const BattleUiTweenAnimPlayer_1 = require("../../../BattleUi/Views/BattleUiTweenAnimPlayer");
const CLOSE_ANIM_TIME = 300;
class AutoMovingItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.xii = undefined;
    this.rdt = -1;
    this.Lti = false;
    this.TweenAnimPlayer = new BattleUiTweenAnimPlayer_1.BattleUiTweenAnimPlayer();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [3, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem]];
  }
  OnStart() {
    this.InitTweenAnim(3);
    this.InitTweenAnim(1);
    this.InitTweenAnim(2);
  }
  OnBeforeDestroy() {
    this.Gii();
    super.OnBeforeDestroy();
  }
  SetVisible(e) {
    if (this.Lti !== e) {
      if (this.Lti = e) {
        this.SetActive(true);
        this.StopTweenAnim(2);
        this.PlayTweenAnim(3);
      } else {
        this.Wti();
      }
    }
  }
  Wti() {
    this.StopTweenAnim(3);
    this.PlayTweenAnim(2);
    this.Gii();
    this.xii = TimerSystem_1.TimerSystem.Delay(() => {
      this.xii = undefined;
      if (!this.Lti) {
        this.SetActive(false);
      }
    }, CLOSE_ANIM_TIME, AutoMovingItem.Xii);
  }
  Gii() {
    if (this.xii) {
      TimerSystem_1.TimerSystem.Remove(this.xii);
      this.xii = undefined;
    }
  }
  SetPercent(e) {
    if (e !== this.rdt) {
      this.GetSprite(0).SetFillAmount(e);
      if (e === 1) {
        this.SetChangeColor(true);
        this.PlayTweenAnim(1);
      } else if (this.rdt === 1) {
        this.SetChangeColor(false);
      }
      this.rdt = e;
    }
  }
  SetChangeColor(e) {
    var t = this.GetSprite(0);
    t.SetChangeColor(e, t.changeColor);
  }
  InitTweenAnim(e) {
    this.TweenAnimPlayer.InitTweenAnim(e, this.GetItem(e));
  }
  PlayTweenAnim(e) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("HudUnit", 17, "[自动奔跑]PlayTweenAnim", ["type", e]);
    }
    this.TweenAnimPlayer.PlayTweenAnim(e);
  }
  StopTweenAnim(e) {
    this.TweenAnimPlayer.StopTweenAnim(e);
  }
}
(exports.AutoMovingItem = AutoMovingItem).Xii = Stats_1.Stat.Create("AutoMovingItemCloseAnim");
//# sourceMappingURL=AutoMovingItem.js.map