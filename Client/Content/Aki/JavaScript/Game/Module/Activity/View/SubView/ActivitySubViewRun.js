"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivitySubViewRun = undefined;
const UE = require("ue");
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const RedDotController_1 = require("../../../../RedDot/RedDotController");
const UiManager_1 = require("../../../../Ui/UiManager");
const CommonItemSmallItemGrid_1 = require("../../../Common/ItemGrid/CommonItemSmallItemGrid");
const GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew");
const ActivityController_1 = require("../../ActivityController");
const ActivitySubViewBase_1 = require("./ActivitySubViewBase");
class ActivitySubViewRun extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments);
    this.bOe = undefined;
    this.F5e = false;
    this.JGe = () => {
      return new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
    };
    this.L3e = () => {
      if (this.ActivityBaseData.GetPreGuideQuestFinishState()) {
        ActivityController_1.ActivityController.RequestReadActivity(this.ActivityBaseData);
        ActivityController_1.ActivityController.OpenActivityContentView(this.ActivityBaseData);
      } else {
        UiManager_1.UiManager.OpenView("QuestView", this.ActivityBaseData.GetUnFinishPreGuideQuestId());
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIText], [3, UE.UIButtonComponent], [4, UE.UIScrollViewWithScrollbarComponent], [5, UE.UIText], [6, UE.UIItem], [7, UE.UIText], [8, UE.UIItem]];
    this.BtnBindInfo = [[3, () => {
      this.L3e();
    }]];
  }
  OnStart() {
    var t = this.GetScrollViewWithScrollbar(4);
    this.bOe = new GenericScrollViewNew_1.GenericScrollViewNew(t, this.JGe);
  }
  OnRefreshView() {
    this.FNe();
    this.A2e();
    this.mGe();
    this.Dke();
    this.BindRedPoint();
    this.M3e();
    this.V5e();
  }
  BindRedPoint() {
    if (!this.F5e) {
      this.F5e = true;
      RedDotController_1.RedDotController.BindRedDot("CommonActivityPage", this.GetItem(6), undefined, this.ActivityBaseData.Id);
    }
  }
  OnTimer(t) {
    this.FNe();
  }
  mGe() {
    this.GetText(0).SetText(this.ActivityBaseData.GetTitle());
  }
  Dke() {
    this.GetText(1).ShowTextNew(this.ActivityBaseData.LocalConfig.Desc);
    if (this.ActivityBaseData.IsUnLock() && this.ActivityBaseData.GetPreGuideQuestFinishState()) {
      this.GetText(5).ShowTextNew("ReadyToFightText");
    } else {
      this.GetText(5).ShowTextNew("JumpToQuestText");
    }
  }
  M3e() {
    this.GetButton(3).RootUIComp.SetUIActive(this.ActivityBaseData.IsUnLock());
  }
  A2e() {
    var t = this.ActivityBaseData.GetPreviewReward();
    this.bOe.RefreshByData(t);
  }
  FNe() {
    var [t, i] = this.GetTimeVisibleAndRemainTime();
    this.GetText(2).SetUIActive(t);
    if (t) {
      this.GetText(2).SetText(i);
    }
  }
  V5e() {
    var t = this.GetText(7);
    var i = !this.ActivityBaseData.IsUnLock() || !this.ActivityBaseData.GetPreGuideQuestFinishState();
    this.GetItem(8).SetUIActive(i);
    if (i) {
      t.SetText(this.GetCurrentLockConditionText());
    }
  }
  OnBeforeDestroy() {
    RedDotController_1.RedDotController.UnBindGivenUi("CommonActivityPage", this.GetItem(6), this.ActivityBaseData.Id);
  }
  GetCurrentLockConditionText() {
    var t = super.GetCurrentLockConditionText();
    let i = t === "" ? t : MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t);
    if (StringUtils_1.StringUtils.IsEmpty(i)) {
      t = this.ActivityBaseData.GetPreShowGuideQuestName();
      i = StringUtils_1.StringUtils.Format(MultiTextLang_1.configMultiTextLang.GetLocalTextNew("Text_ActivityNeedPreGiideQuest_Text"), t);
    }
    return i;
  }
}
exports.ActivitySubViewRun = ActivitySubViewRun;
//# sourceMappingURL=ActivitySubViewRun.js.map