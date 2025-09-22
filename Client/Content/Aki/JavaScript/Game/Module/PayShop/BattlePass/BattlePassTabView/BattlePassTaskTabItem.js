"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattlePassTaskTabItem = undefined;
const UE = require("ue");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const RedDotController_1 = require("../../../../RedDot/RedDotController");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class BattlePassTaskTabItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.ScrollViewDelegate = undefined;
    this.GridIndex = 0;
    this.DisplayIndex = 0;
    this.l4e = "";
    this.SelectedCallBack = undefined;
    this.OnCanExecuteChange = undefined;
    this.Lke = () => this.OnCanExecuteChange?.(this.GridIndex) ?? true;
    this.Bke = e => {
      if (e === 1) {
        this.SelectedCallBack?.(this.GridIndex);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[1, UE.UIText], [0, UE.UIText], [2, UE.UIExtendToggle], [3, UE.UIItem]];
    this.BtnBindInfo = [[2, this.Bke]];
  }
  OnStart() {
    this.GetExtendToggle(2).CanExecuteChange.Bind(this.Lke);
  }
  SetForceSwitch(e, t = false) {
    this.GetExtendToggle(2).SetToggleState(e, t);
  }
  SetSelectedCallBack(e) {
    this.SelectedCallBack = e;
  }
  SetCanExecuteChange(e) {
    this.OnCanExecuteChange = e;
  }
  Refresh(e, t, s) {
    this.UpdateView(e);
  }
  GetKey(e, t) {
    return e;
  }
  Clear() {
    this.UnBindRedDot();
  }
  OnSelected() {}
  OnDeselected() {}
  UpdateView(e) {
    var t = this.GetText(0);
    var s = ModelManager_1.ModelManager.BattlePassModel;
    let i = s.GetBattlePassEndTime();
    switch (e) {
      case 0:
        this.l4e = "BattlePassAlwaysTaskTab";
        LguiUtil_1.LguiUtil.SetLocalTextNew(t, "Text_BattlePassAwalsTask_Text");
        break;
      case 1:
        i = Math.min(i, s.GetDayEndTime());
        LguiUtil_1.LguiUtil.SetLocalText(t, "BattlePassDayTask");
        this.l4e = "BattlePassDayTaskTab";
        break;
      case 2:
        i = Math.min(i, s.GetWeekEndTime());
        LguiUtil_1.LguiUtil.SetLocalText(t, "BattlePassWeekTask");
        this.l4e = "BattlePassWeekTaskTab";
    }
    var e = this.GetText(1);
    var a = TimeUtil_1.TimeUtil.CalculateHourGapBetweenNow(i, true);
    var l = Math.floor(a / TimeUtil_1.TimeUtil.OneDayHourCount);
    var a = Math.floor(a - l * TimeUtil_1.TimeUtil.OneDayHourCount);
    if (l > 0) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(e, "Text_BattlePassRefreshTime1_Text", l, a);
    } else if (a > 0) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(e, "Text_BattlePassRefreshTime2_Text", a);
    } else {
      LguiUtil_1.LguiUtil.SetLocalTextNew(e, "Text_BattlePassRefreshTime3_Text");
    }
    this.K8e();
  }
  K8e() {
    if (this.l4e) {
      RedDotController_1.RedDotController.BindRedDot(this.l4e, this.GetItem(3), undefined, 0);
    }
  }
  UnBindRedDot() {
    if (this.l4e) {
      RedDotController_1.RedDotController.UnBindRedDot(this.l4e);
      this.l4e = undefined;
    }
  }
}
exports.BattlePassTaskTabItem = BattlePassTaskTabItem;
//# sourceMappingURL=BattlePassTaskTabItem.js.map