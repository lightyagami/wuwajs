"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MediumItemGridCoolDownComponent = undefined;
const UE = require("ue");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const MediumItemGridComponent_1 = require("./MediumItemGridComponent");
class MediumItemGridCoolDownComponent extends MediumItemGridComponent_1.MediumItemGridComponent {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIText]];
  }
  OnRefresh(e) {
    var i;
    var t = e.CoolDown;
    var e = e.TotalCdTime;
    if (t && e) {
      this.GetSprite(0).SetFillAmount(t / e);
      this.SetActive(true);
      e = this.GetText(1);
      if (t < ModelManager_1.ModelManager.MediumItemGridModel.ItemGridCoolDownSecond) {
        LguiUtil_1.LguiUtil.SetLocalTextNew(e, "ItemCdTime_Second", t.toFixed(1));
      } else {
        i = TimeUtil_1.TimeUtil.CalculateRemainingTime(t).TimeValue;
        if (t < TimeUtil_1.TimeUtil.Hour) {
          LguiUtil_1.LguiUtil.SetLocalTextNew(e, "ItemCdTime_Minute", i);
        } else if (t < TimeUtil_1.TimeUtil.OneDaySeconds) {
          LguiUtil_1.LguiUtil.SetLocalTextNew(e, "ItemCdTime_Hour", i);
        } else {
          LguiUtil_1.LguiUtil.SetLocalTextNew(e, "ItemCdTime_Day", i);
        }
      }
    } else {
      this.SetActive(false);
    }
  }
  GetResourceId() {
    return "UiItem_ItemCD";
  }
  GetLayoutLevel() {
    return 1;
  }
}
exports.MediumItemGridCoolDownComponent = MediumItemGridCoolDownComponent;
//# sourceMappingURL=MediumItemGridCoolDownComponent.js.map