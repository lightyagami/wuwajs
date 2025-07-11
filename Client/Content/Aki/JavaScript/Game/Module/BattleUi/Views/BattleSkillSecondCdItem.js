"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattleSkillSecondCdItem = undefined;
const UE = require("ue");
const Time_1 = require("../../../../Core/Common/Time");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const SkillCdController_1 = require("../../Battle/SkillCdController");
const AMOUNT_START = 0.3;
const AMOUNT_SCALE = 0.4;
class BattleSkillSecondCdItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Xy = 0;
    this.Mot = undefined;
    this.uit = undefined;
    this.cit = 0;
    this.mit = 0;
  }
  SetIndex(i) {
    this.Xy = i;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite]];
  }
  OnStart() {
    this.uit = this.GetSprite(0);
    this.RootItem?.SetUIRelativeRotation(new UE.Rotator(0, this.Xy * 90, 0));
  }
  RefreshSkillCoolDown(i) {
    this.Mot = i;
    if (this.Mot) {
      if ((!this.Kit() || !this.Qit()) && (!this.Xit() || !this.$it()) && (!this.Mot.IsMultiStageSkill() || !this.Eot())) {
        this.Yit();
      }
    } else {
      this.Sot();
    }
  }
  Tick(i) {
    this.Wit(i);
  }
  Zit(i, t) {
    if (i <= (this.cit = 0)) {
      this.Sot();
    } else {
      this.cit = i;
      this.mit = t;
      if (!this.IsShowOrShowing) {
        this.Show();
      }
    }
  }
  Sot() {
    if (this.IsShowOrShowing) {
      this.Hide();
    }
    this.cit = 0;
  }
  Wit(i) {
    if (!(this.cit <= 0) && !(this.mit <= 0) && !!this.uit && !SkillCdController_1.SkillCdController.IsPause() && !(Time_1.Time.TimeDilation <= 0)) {
      this.cit -= i * Time_1.Time.TimeDilation * TimeUtil_1.TimeUtil.Millisecond;
      if (this.cit < 0) {
        this.cit = 0;
        this.uit.SetFillAmount(0);
        this.Sot();
      } else {
        i = this.cit / this.mit;
        i = AMOUNT_START + i * AMOUNT_SCALE;
        this.uit.SetFillAmount(i);
      }
    }
  }
  Kit() {
    return this.Mot?.GetButtonType() === 7 && this.Mot.IsSkillInItemUseBuffCd();
  }
  Qit() {
    var [i, t] = this.Mot.GetEquippedItemUsingBuffCd();
    return i > 0 && (this.Zit(i, t), true);
  }
  Xit() {
    return this.Mot?.GetButtonType() === 7 && this.Mot.IsSkillInItemUseSkillCd();
  }
  $it() {
    var [i, t] = this.Mot.GetEquippedItemUsingSkillCd();
    return i > 0 && (this.Zit(i, t), true);
  }
  Eot() {
    var i;
    var t = this.Mot.GetMultiSkillInfo();
    return !!t && t.NextSkillId !== 0 && !(i = t.RemainingStartTime, t = t.StartTime, i > 0 ? this.Zit(i, t) : this.Sot(), 0);
  }
  Yit() {
    var i;
    var t = this.Mot.GetGroupSkillCdInfo();
    if (t) {
      i = t.CurRemainingCd;
      t = t.CurMaxCd;
      this.Zit(i, t);
    }
  }
}
exports.BattleSkillSecondCdItem = BattleSkillSecondCdItem;
//# sourceMappingURL=BattleSkillSecondCdItem.js.map