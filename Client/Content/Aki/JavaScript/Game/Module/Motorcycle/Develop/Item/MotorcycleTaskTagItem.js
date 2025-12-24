"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleTaskTagItem = undefined;
const UE = require("ue");
const CommonDefine_1 = require("../../../../../Core/Define/CommonDefine");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class MotorcycleTaskTagItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIText]];
  }
  Refresh(e) {
    this.GetItem(1).SetUIActive(e.Type === 3);
    this.GetItem(2).SetUIActive(e.Type === 2);
    if (e.Type === 2) {
      i = e.EndTime;
      t = TimeUtil_1.TimeUtil.GetServerTime();
      i = Math.max(i - t, 1);
      t = this.FOe(i);
      i = TimeUtil_1.TimeUtil.GetCountDownDataFormat2(i, t[0], t[1]).CountDownText ?? "";
      this.GetText(3).SetText(StringUtils_1.StringUtils.Format("{0}", i));
    } else if (e.Type === 3) {
      t = e.RewardInfo.WaitRewardCount + e.RewardInfo.RewardedCount;
      i = e.RewardInfo.MaxRewardCount;
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), "MotorBike_TechCube_RepeatStatus", t, i);
    }
    var i;
    var t = this.GetSprite(0);
    t.SetChangeColor(e.Type === 3, t.changeColor);
  }
  FOe(e) {
    if (e > CommonDefine_1.SECOND_PER_DAY) {
      return [3, 2];
    } else if (e > CommonDefine_1.SECOND_PER_HOUR) {
      return [2, 1];
    } else if (e > CommonDefine_1.SECOND_PER_MINUTE) {
      return [1, 0];
    } else {
      return [0, 0];
    }
  }
}
exports.MotorcycleTaskTagItem = MotorcycleTaskTagItem;
//# sourceMappingURL=MotorcycleTaskTagItem.js.map