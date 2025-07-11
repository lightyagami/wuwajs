"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivitySubViewDoubleReward = undefined;
const UE = require("ue");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const ActivitySubViewBase_1 = require("../../View/SubView/ActivitySubViewBase");
const ActivityDescriptionTypeA_1 = require("../UniversalComponents/Content/ActivityDescriptionTypeA");
const ActivityTitleTypeA_1 = require("../UniversalComponents/Title/ActivityTitleTypeA");
class ActivitySubViewDoubleReward extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments);
    this.ActivityBaseData = undefined;
    this.LNe = undefined;
    this.DNe = undefined;
    this.IOe = () => {
      ModelManager_1.ModelManager.ActivityModel.SendActivityViewJumpClickLogData(this.ActivityBaseData);
      this.ActivityBaseData.JumpToDungeon();
    };
    this.ahh = () => {
      ControllerHolder_1.ControllerHolder.ActivityController.OpenActivityConditionView(this.ActivityBaseData.Id);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIText], [3, UE.UIButtonComponent], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIText], [7, UE.UIButtonComponent]];
    this.BtnBindInfo = [[3, this.IOe], [7, this.ahh]];
  }
  OnSetData() {}
  async OnBeforeStartAsync() {
    var i = this.GetItem(0);
    this.LNe = new ActivityTitleTypeA_1.ActivityTitleTypeA();
    var t = this.GetItem(1);
    this.DNe = new ActivityDescriptionTypeA_1.ActivityDescriptionTypeA();
    await Promise.all([this.DNe.CreateThenShowByActorAsync(t.GetOwner()), this.LNe.CreateThenShowByActorAsync(i.GetOwner())]);
  }
  OnStart() {
    var i;
    var t = this.ActivityBaseData.LocalConfig;
    if (t) {
      i = t.DescTheme;
      i = !StringUtils_1.StringUtils.IsEmpty(i);
      this.LNe.SetTitleByText(this.ActivityBaseData.GetTitle());
      this.LNe.SetSubTitleVisible(i);
      if (i) {
        this.LNe.SetSubTitleByTextId(t.DescTheme);
      }
      i = t.Desc;
      this.DNe.SetContentByTextId(i);
      this.OnRefreshView();
    }
  }
  OnTimer(i) {
    this.FNe();
  }
  OnRefreshView() {
    var i = this.ActivityBaseData.GetNumTxtAndParam();
    var t = this.ActivityBaseData.IsUnLock();
    this.GetButton(3)?.RootUIComp.SetUIActive(t && ModelManager_1.ModelManager.FunctionModel.IsOpen(10023004));
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), i[0], i[1], i[2]);
    this.GetItem(4).SetUIActive(t);
    this.GetItem(5).SetUIActive(!t);
    this.GetButton(7).RootUIComp.SetUIActive(!t);
    if (!t) {
      i = this.GetCurrentLockConditionText();
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), i);
    }
    this.FNe();
    this.ActivityBaseData.ReadDailyRedDot();
  }
  FNe() {
    var [i, t] = this.GetTimeVisibleAndRemainTime();
    this.LNe.SetTimeTextVisible(i);
    if (i) {
      this.LNe.SetTimeTextByText(t);
    }
  }
}
exports.ActivitySubViewDoubleReward = ActivitySubViewDoubleReward;
//# sourceMappingURL=ActivitySubViewDoubleReward.js.map