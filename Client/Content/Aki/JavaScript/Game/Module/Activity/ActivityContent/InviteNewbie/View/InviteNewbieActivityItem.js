"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InviteNewbieActivityItem = undefined;
const UE = require("ue");
const StringUtils_1 = require("../../../../../../Core/Utils/StringUtils");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const ActivityControllerHolder_1 = require("../../../ActivityControllerHolder");
const ActivityDescriptionTypeA_1 = require("../../UniversalComponents/Content/ActivityDescriptionTypeA");
const ActivityRewardList_1 = require("../../UniversalComponents/Content/ActivityRewardList");
const ActivityFunctionalTypeA_1 = require("../../UniversalComponents/Functional/ActivityFunctionalTypeA");
const ActivityTitleTypeA_1 = require("../../UniversalComponents/Title/ActivityTitleTypeA");
const InviteNewbieDefine_1 = require("../InviteNewbieDefine");
class InviteNewbieActivityItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.gV_ = undefined;
    this.LNe = undefined;
    this.DNe = undefined;
    this.UNe = undefined;
    this.ANe = undefined;
    this.VWu = () => {
      var i = this.gV_;
      ActivityControllerHolder_1.ActivityControllerHolder.ActivityInviteNewbieController.HandleOnEnterClick(i);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.gV_ = this.OpenParam;
    var i = this.GetItem(0);
    this.LNe = new ActivityTitleTypeA_1.ActivityTitleTypeA();
    var t = this.GetItem(1);
    this.DNe = new ActivityDescriptionTypeA_1.ActivityDescriptionTypeA();
    var e = this.GetItem(2);
    this.UNe = new ActivityRewardList_1.ActivityRewardList();
    var s = this.GetItem(3);
    this.ANe = new ActivityFunctionalTypeA_1.ActivityFunctionalTypeA(this.gV_);
    await Promise.all([this.LNe.CreateThenShowByActorAsync(i.GetOwner()), this.DNe.CreateThenShowByActorAsync(t.GetOwner()), this.UNe.CreateThenShowByActorAsync(e.GetOwner()), this.ANe.CreateThenShowByActorAsync(s.GetOwner())]);
  }
  OnStart() {
    var i = this.gV_.LocalConfig;
    this.LNe.SetTitleByText(this.gV_.GetTitle());
    this.LNe.SetSubTitleVisible(!StringUtils_1.StringUtils.IsEmpty(i?.DescTheme));
    if (i?.DescTheme) {
      this.LNe.SetSubTitleByTextId(i.DescTheme);
    }
    this.DNe.SetContentVisible(!StringUtils_1.StringUtils.IsEmpty(i?.Desc));
    if (i?.Desc) {
      this.DNe.SetContentByTextId(i.Desc);
    }
    var i = this.gV_.GetPreviewReward();
    this.UNe.InitGridLayout(this.UNe.InitCommonGridItem);
    this.UNe.RefreshItemLayout(i);
    this.UNe.SetTitleByTextId(InviteNewbieDefine_1.REWARD_TITLE_TEXT_ID_IN_SUBVIEW);
    this.ANe.FunctionButton.SetFunction(this.VWu);
    this.ANe.FunctionButton.SetLocalTextNew(InviteNewbieDefine_1.ENTER_BUTTON_TITLE_TEXT_ID_IN_SUBVIEW);
  }
  OnBeforeShow() {
    super.OnBeforeShow();
    this.ANe.FunctionButton.BindRedDot("InviteNewbie");
  }
  OnAfterHide() {
    super.OnAfterHide();
    this.ANe.FunctionButton.UnBindGivenUid(0);
  }
  RefreshTimerTextByData(i, t) {
    this.LNe.SetTimeTextVisible(i);
    if (i) {
      this.LNe.SetTimeTextByText(t);
    }
  }
}
exports.InviteNewbieActivityItem = InviteNewbieActivityItem;
//# sourceMappingURL=InviteNewbieActivityItem.js.map