"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AlertAreaInfoView = undefined;
const UE = require("ue");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const BattleVisibleChildView_1 = require("../BattleChildView/BattleVisibleChildView");
const BattleUiTweenAnimPlayer_1 = require("../BattleUiTweenAnimPlayer");
const AlertAreaUpdateMachine_1 = require("./AlertAreaUpdateMachine");
const PERCENT_TO_PROGRESS = 0.01;
const UI_BAR_MIN_PERCENT = 42;
const UI_BAR_MAX_PERCENT = 83;
class AlertAreaInfoView extends BattleVisibleChildView_1.BattleVisibleChildView {
  constructor() {
    super(...arguments);
    this.L9e = 0;
    this.EMl = 0;
    this.IMl = undefined;
    this.Oml = undefined;
    this.TMl = (t, i) => {
      var e;
      if (this.L9e === t) {
        e = this.EMl;
        this.EMl = ModelManager_1.ModelManager.AlertAreaModel.GetAreaAlertValue(t);
        this.IMl?.ChangeTargetPercent(this.EMl);
        this.JDl(this.EMl);
        this.B4l(e, this.EMl);
        t = this.EMl - e;
        this.ZDl(true, t);
      }
    };
  }
  Initialize(t) {
    super.Initialize(t);
    this.InitChildType(4);
    this.SetVisible(1, false);
    this.Ore();
  }
  Reset() {
    super.Reset();
    this.kre();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UISprite], [2, UE.UIText], [3, UE.UIText], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem]];
  }
  Ore() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnUpdateAreaAlertValue, this.TMl);
  }
  kre() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnUpdateAreaAlertValue, this.TMl);
  }
  Tick(t) {
    if (this.IMl?.Update(t)) {
      this.OnMachineDataChange();
    }
  }
  OnMachineDataChange() {
    var t;
    var i;
    var e;
    if (this.IMl) {
      t = this.IMl.GetProgressDir();
      i = this.IMl.GetBarCurPercent();
      e = this.IMl.GetBarTargetPercent();
      if (t > 0) {
        this.tAl(i);
        this.iAl(e);
      } else {
        this.tAl(e);
        this.iAl(i);
      }
    }
  }
  StartShow(t) {
    this.L9e = t;
    this.EMl = ModelManager_1.ModelManager.AlertAreaModel.GetAreaAlertValue(t);
    this.IMl = new AlertAreaUpdateMachine_1.AlertAreaUpdateMachine();
    this.Est();
    this.SetVisible(1, true);
    this.IMl.Init(this.EMl);
    this.tAl(this.EMl);
    this.iAl(this.EMl);
    this.JDl(this.EMl);
    this.eAl();
  }
  EndShow(t) {
    if (t === undefined || t === this.L9e) {
      this.SetVisible(1, false);
      this.q4l();
      this.L9e = 0;
      this.EMl = 0;
      this.IMl = undefined;
    }
  }
  tAl(t) {
    t = MathUtils_1.MathUtils.RangeClamp(t, 0, 100, UI_BAR_MIN_PERCENT, UI_BAR_MAX_PERCENT);
    this.GetSprite(1).SetFillAmount(t * PERCENT_TO_PROGRESS);
  }
  iAl(t) {
    t = MathUtils_1.MathUtils.RangeClamp(t, 0, 100, UI_BAR_MIN_PERCENT, UI_BAR_MAX_PERCENT);
    this.GetSprite(0).SetFillAmount(t * PERCENT_TO_PROGRESS);
  }
  JDl(t) {
    t = MathUtils_1.MathUtils.Clamp(Math.round(t), 0, 100);
    this.GetText(2).SetText("" + t);
  }
  B4l(t, i) {
    var e = 100;
    if (e <= i) {
      if (!(e <= t)) {
        if (t >= 80) {
          this.Oml?.StopTweenAnim(5);
        }
        this.Oml?.PlayTweenAnim(6);
      }
    } else if (i >= 80) {
      if (e <= t) {
        this.Oml?.StopTweenAnim(6);
        this.Oml?.PlayTweenAnim(5);
      } else if (!(t >= 80)) {
        this.Oml?.PlayTweenAnim(5);
      }
    } else if (e <= t) {
      this.Oml?.StopTweenAnim(6);
      this.Oml?.PlayTweenAnim(4);
    } else if (t >= 80) {
      this.Oml?.StopTweenAnim(5);
      this.Oml?.PlayTweenAnim(4);
    }
  }
  ZDl(t, i = 0) {
    if (t) {
      t = MathUtils_1.MathUtils.Clamp(Math.abs(Math.round(i)), 0, 100);
      this.GetText(3).SetText((i >= 0 ? "+" : "-") + t + "%");
    }
    this.GetText(3).SetUIActive(true);
    this.Oml?.PlayTweenAnim(7);
  }
  eAl() {
    this.Oml?.StopTweenAnim(7);
    this.GetText(3).SetUIActive(false);
  }
  Est() {
    this.Oml = new BattleUiTweenAnimPlayer_1.BattleUiTweenAnimPlayer();
    this.Oml.InitTweenAnim(4, this.GetItem(4));
    this.Oml.InitTweenAnim(5, this.GetItem(5));
    this.Oml.InitTweenAnim(6, this.GetItem(6));
    this.Oml.InitTweenAnim(7, this.GetItem(7));
  }
  q4l() {
    this.Oml?.StopTweenAnim(5);
    this.Oml?.StopTweenAnim(6);
    this.Oml?.StopTweenAnim(7);
    this.Oml?.StopTweenAnim(4);
    this.Oml?.Clear();
    this.Oml = undefined;
  }
}
exports.AlertAreaInfoView = AlertAreaInfoView;
//# sourceMappingURL=AlertAreaInfoView.js.map