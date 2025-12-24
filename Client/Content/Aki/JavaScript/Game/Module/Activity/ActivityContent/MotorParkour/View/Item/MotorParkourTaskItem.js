"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorParkourTaskItem = undefined;
const UE = require("ue");
const CommonItemSmallItemGrid_1 = require("../../../../../Common/ItemGrid/CommonItemSmallItemGrid");
const GridProxyAbstract_1 = require("../../../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../../../../Util/ScrollView/GenericScrollViewNew");
const ActivityControllerHolder_1 = require("../../../../ActivityControllerHolder");
class MotorParkourTaskItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.bOe = undefined;
    this.JGe = () => new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
    this.qOe = () => {
      ActivityControllerHolder_1.ActivityControllerHolder.MotorParkourController.RequestTaskReward(this.Pe.LevelId);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[3, UE.UIButtonComponent], [5, UE.UIItem], [0, UE.UIText], [1, UE.UIText], [2, UE.UIScrollViewWithScrollbarComponent], [4, UE.UIText]];
    this.BtnBindInfo = [[3, this.qOe]];
  }
  OnStart() {
    this.bOe = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(2), this.JGe);
  }
  Refresh(t, e, i) {
    this.Pe = t;
    this.bOe.RefreshByData(t.RewardList);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), t.Desc);
    this.GetText(1)?.SetUIActive(false);
    this.GetItem(5)?.SetUIActive(t.IsReceived);
    this.GetButton(3)?.RootUIComp.SetUIActive(t.IsFinished);
    this.GetText(4)?.SetUIActive(t.IsRunning);
  }
}
exports.MotorParkourTaskItem = MotorParkourTaskItem;
//# sourceMappingURL=MotorParkourTaskItem.js.map