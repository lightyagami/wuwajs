"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.ShowerSkillButton = void 0;
const UE = require("ue"),
  Time_1 = require("../../../../../Core/Common/Time"),
  CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  TimeUtil_1 = require("../../../../Common/TimeUtil"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  SKILL_COOLDOWN_INTERVAL = 100,
  SKILL_COOLDOWN_LOOP_INTERVAL = .1;
class ShowerSkillButton extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), this.rTt = void 0, this.WI = !1, this.lit = void 0, this._it = void 0, this.uit = void 0, this.cit = 0, this.mit = 0, this.dit = 0, this.hit = void 0, this.yit = void 0, this.Az1 = 1, this.kit = i => {
      this.cit -= SKILL_COOLDOWN_LOOP_INTERVAL, this.cit = Math.round(10 * this.cit) / 10, 0 < this.cit ? this._it.SetText(this.cit.toFixed(this.Az1)) : this.FinishSkillCoolDown()
    }, this.Fr = () => {
      this.WI && this.rTt?.()
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIItem],
      [2, UE.UISprite],
      [3, UE.UIText],
      [4, UE.UISprite]
    ], this.BtnBindInfo = [
      [0, this.Fr]
    ]
  }
  OnStart() {
    this.lit = this.GetItem(1), this.uit = this.GetSprite(2), this._it = this.GetText(3), this.ihu(!0)
  }
  ihu(i) {
    this.WI = i, this.GetButton(0)?.SetSelfInteractive(i)
  }
  TickSkillCoolDown(i) {
    var t;
    this.cit <= 0 || this.mit <= 0 || !this.uit || (t = (Time_1.Time.WorldTimeSeconds - this.dit) / this.mit, this.uit.SetFillAmount(t), this._it.SetText(this.cit.toFixed(this.Az1)))
  }
  ResetSkillCoolDown() {
    this.ihu(!0), this.lit?.SetUIActive(!1), this.sot(), this.cit = 0
  }
  sot() {
    TimerSystem_1.TimerSystem.Has(this.hit) && TimerSystem_1.TimerSystem.Remove(this.hit), TimerSystem_1.TimerSystem.Has(this.yit) && TimerSystem_1.TimerSystem.Remove(this.yit)
  }
  PlaySwitchCd() {
    var i = CommonParamById_1.configCommonParamById.GetIntConfig("ShowerVisionChangeCoolDown");
    i && (i = TimeUtil_1.TimeUtil.SetTimeSecond(i), this.iot(i, i))
  }
  iot(i, t) {
    this.sot(), i <= (this.cit = 0) ? (this.lit.SetUIActive(!1), this.ihu(!0)) : (this.cit = i, this.mit = t, this.dit = Time_1.Time.WorldTimeSeconds - (t - i), this._it?.SetText(this.cit.toFixed(this.Az1)), this.hit = TimerSystem_1.TimerSystem.Forever(this.kit, SKILL_COOLDOWN_INTERVAL), this.not(this.hit), this.lit.SetUIActive(!0), this.ihu(!1))
  }
  FinishSkillCoolDown() {
    this.ResetSkillCoolDown()
  }
  not(i) {
    var t = this.lot();
    1 !== t && (0 < t ? TimerSystem_1.TimerSystem.ChangeDilation(i, t) : TimerSystem_1.TimerSystem.Pause(i))
  }
  lot() {
    return Time_1.Time.TimeDilation
  }
  SetPressCallback(i) {
    this.rTt = i
  }
}
exports.ShowerSkillButton = ShowerSkillButton;
//# sourceMappingURL=ShowerSkillButton.js.map