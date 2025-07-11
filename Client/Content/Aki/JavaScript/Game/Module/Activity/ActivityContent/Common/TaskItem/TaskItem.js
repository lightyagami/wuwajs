"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TaskItem = undefined;
const UE = require("ue");
const StringUtils_1 = require("../../../../../../Core/Utils/StringUtils");
const CommonItemSmallItemGrid_1 = require("../../../../Common/ItemGrid/CommonItemSmallItemGrid");
const SkipTaskManager_1 = require("../../../../SkipInterface/SkipTaskManager");
const GridProxyAbstract_1 = require("../../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../../../Util/ScrollView/GenericScrollViewNew");
class TaskItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.sOn = undefined;
    this.bOe = undefined;
    this.JGe = () => new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
    this.IOe = () => {
      SkipTaskManager_1.SkipTaskManager.RunByConfigId(this.sOn.JumpId);
    };
    this.qOe = () => {
      this.sOn.ReceiveDelegate?.(this.sOn.TaskId);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIButtonComponent], [2, UE.UIItem], [3, UE.UIText], [4, UE.UIText], [5, UE.UIScrollViewWithScrollbarComponent], [6, UE.UIText]];
    this.BtnBindInfo = [[0, this.IOe], [1, this.qOe]];
  }
  OnStart() {
    this.bOe = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(5), this.JGe);
  }
  Refresh(i, t, e) {
    this.sOn = i;
    this.bOe.RefreshByData(i.RewardList);
    this.GetButton(1).RootUIComp.SetUIActive(i.IsFinished && !i.IsTaken);
    this.GetItem(2).SetUIActive(i.IsTaken);
    this.GetText(6).SetUIActive(!i.IsTaken && !i.IsFinished && i.JumpId === 0);
    if (StringUtils_1.StringUtils.IsEmpty(i.DoingTextId)) {
      this.GetText(6).ShowTextNew("Moonfiesta_TargetOn");
    } else {
      this.GetText(6).ShowTextNew("Moonfiesta_TargetDone");
    }
    this.GetButton(0).RootUIComp.SetUIActive(!i.IsFinished && !i.IsTaken && i.JumpId > 0);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), i.TitleTextId);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), "LongShanStage_Progress", i.Current, i.Target);
  }
}
exports.TaskItem = TaskItem;
//# sourceMappingURL=TaskItem.js.map