"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShowerSkillButton = undefined;
const UE = require("ue");
const Time_1 = require("../../../../../Core/Common/Time");
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const SKILL_COOLDOWN_INTERVAL = 100;
const SKILL_COOLDOWN_LOOP_INTERVAL = 0.1;
class ShowerSkillButton extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.rTt = undefined;
    this.WI = false;
    this.lit = undefined;
    this._it = undefined;
    this.uit = undefined;
    this.cit = 0;
    this.mit = 0;
    this.dit = 0;
    this.hit = undefined;
    this.yit = undefined;
    this.MJ1 = 1;
    this.kit = i => {
      this.cit -= SKILL_COOLDOWN_LOOP_INTERVAL;
      this.cit = Math.round(this.cit * 10) / 10;
      if (this.cit > 0) {
        this._it.SetText(this.cit.toFixed(this.MJ1));
      } else {
        this.FinishSkillCoolDown();
      }
    };
    this.Fr = () => {
      if (this.WI) {
        this.rTt?.();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIItem], [2, UE.UISprite], [3, UE.UIText], [4, UE.UISprite]];
    this.BtnBindInfo = [[0, this.Fr]];
  }
  OnStart() {
    this.lit = this.GetItem(1);
    this.uit = this.GetSprite(2);
    this._it = this.GetText(3);
    this.Umu(true);
  }
  Umu(i) {
    this.WI = i;
    this.GetButton(0)?.SetSelfInteractive(i);
  }
  TickSkillCoolDown(i) {
    var t;
    if (!(this.cit <= 0) && !(this.mit <= 0) && !!this.uit) {
      t = (Time_1.Time.WorldTimeSeconds - this.dit) / this.mit;
      this.uit.SetFillAmount(t);
      this._it.SetText(this.cit.toFixed(this.MJ1));
    }
  }
  ResetSkillCoolDown() {
    this.Umu(true);
    this.lit?.SetUIActive(false);
    this.sot();
    this.cit = 0;
  }
  sot() {
    if (TimerSystem_1.TimerSystem.Has(this.hit)) {
      TimerSystem_1.TimerSystem.Remove(this.hit);
    }
    if (TimerSystem_1.TimerSystem.Has(this.yit)) {
      TimerSystem_1.TimerSystem.Remove(this.yit);
    }
  }
  PlaySwitchCd() {
    var i = CommonParamById_1.configCommonParamById.GetIntConfig("ShowerVisionChangeCoolDown");
    if (i) {
      i = TimeUtil_1.TimeUtil.SetTimeSecond(i);
      this.iot(i, i);
    }
  }
  iot(i, t) {
    this.sot();
    if (i <= (this.cit = 0)) {
      this.lit.SetUIActive(false);
      this.Umu(true);
    } else {
      this.cit = i;
      this.mit = t;
      this.dit = Time_1.Time.WorldTimeSeconds - (t - i);
      this._it?.SetText(this.cit.toFixed(this.MJ1));
      this.hit = TimerSystem_1.TimerSystem.Forever(this.kit, SKILL_COOLDOWN_INTERVAL);
      this.not(this.hit);
      this.lit.SetUIActive(true);
      this.Umu(false);
    }
  }
  FinishSkillCoolDown() {
    this.ResetSkillCoolDown();
  }
  not(i) {
    var t = this.lot();
    if (t !== 1) {
      if (t > 0) {
        TimerSystem_1.TimerSystem.ChangeDilation(i, t);
      } else {
        TimerSystem_1.TimerSystem.Pause(i);
      }
    }
  }
  lot() {
    return Time_1.Time.TimeDilation;
  }
  SetPressCallback(i) {
    this.rTt = i;
  }
}
exports.ShowerSkillButton = ShowerSkillButton;
//# sourceMappingURL=ShowerSkillButton.js.map