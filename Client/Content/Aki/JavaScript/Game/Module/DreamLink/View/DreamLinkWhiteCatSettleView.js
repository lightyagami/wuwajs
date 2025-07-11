"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DreamLinkWhiteCatSettleRecordItem = exports.DreamLinkWhiteCatSettleItem = exports.DreamLinkWhiteCatSettlePanel = exports.DreamLinkWhiteCatSettleView = undefined;
const UE = require("ue");
const CommonDefine_1 = require("../../../../Core/Define/CommonDefine");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const ActivityCorniceMeetingSettleView_1 = require("../../Activity/ActivityContent/CorniceMeeting/ActivityCorniceMeetingSettleView");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew");
const LEAVETIME = 30;
class DreamLinkWhiteCatSettleView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.ButtonMap = undefined;
    this.$Fe = undefined;
    this.Data = undefined;
    this.RewardExploreTargetReachedList = undefined;
    this.JFe = () => {
      this.CloseMe(e => {
        if (e) {
          ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.RestartInstanceDungeon();
        }
      });
    };
    this.zFe = () => {
      this.CloseMe(e => {
        if (e) {
          ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.LeaveInstanceDungeon();
        }
      });
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[1, UE.UIText], [2, UE.UITexture], [4, UE.UIItem], [5, UE.UIItem], [20, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.Data = this.OpenParam;
    this.ButtonMap = new Map();
    await this.ZFe();
    var e = this.GetItem(20);
    this.RewardExploreTargetReachedList = new DreamLinkWhiteCatSettlePanel();
    this.RewardExploreTargetReachedList.Data = this.Data;
    await this.RewardExploreTargetReachedList.CreateThenShowByResourceIdAsync("UiItem_ResultScore", e);
  }
  OnBeforeShow() {
    this.e3e();
    this.RefreshTitle();
  }
  OnBeforeDestroy() {
    this.o3e();
  }
  RefreshTitle() {
    var e;
    if (this.Data !== undefined) {
      e = this.GetText(1);
      this.GetTexture(2)?.SetUIActive(false);
      LguiUtil_1.LguiUtil.SetLocalTextNew(e, "Text_ChallengeFinish_Text");
      this.PlaySequence("Success");
    }
  }
  o3e() {
    if (TimerSystem_1.GameplayTimerSystem.Has(this.$Fe)) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.$Fe);
    }
    this.$Fe = undefined;
  }
  e3e() {
    let e = LEAVETIME + 1;
    this.$Fe = TimerSystem_1.GameplayTimerSystem.Forever(() => {
      if (e <= 0) {
        TimerSystem_1.GameplayTimerSystem.Remove(this.$Fe);
        this.zFe();
      } else {
        this.ButtonMap.get(0).SetFloatText("InstanceDungeonLeftTimeToAutoLeave", (e--).toString());
      }
    }, CommonDefine_1.MILLIONSECOND_PER_SECOND);
  }
  async ZFe() {
    this.GetItem(5)?.SetUIActive(false);
    var e = this.i3e(this.GetItem(5), 0, this.zFe);
    var t = this.i3e(this.GetItem(5), 1, this.JFe);
    await Promise.all([e, t]);
    var e = this.ButtonMap.get(0);
    var t = this.ButtonMap.get(1);
    e.SetBtnText("Leave");
    e.SetFloatText("InstanceDungeonLeftTimeToAutoLeave", LEAVETIME.toString());
    t.SetBtnText("ChallengeAgain");
  }
  async i3e(e, t, i) {
    var s = this.GetItem(5);
    var r = this.GetItem(4);
    var s = LguiUtil_1.LguiUtil.DuplicateActor(s.GetOwner(), r);
    var r = new ActivityCorniceMeetingSettleView_1.ActivityCorniceMeetingButton();
    this.ButtonMap.set(t, r);
    await r.InitializeAsync(s, i);
    r.SetActive(true);
  }
}
exports.DreamLinkWhiteCatSettleView = DreamLinkWhiteCatSettleView;
class DreamLinkWhiteCatSettlePanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Layout = undefined;
    this.RecordPanel = undefined;
    this.Data = undefined;
    this.OnCreateItem = () => {
      return new DreamLinkWhiteCatSettleItem();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIScrollViewWithScrollbarComponent], [1, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    var e = [];
    if (this.Data.vM_ >= 0) {
      e.push({
        Title: "DreamLinkWhiteCatSettleView_LifeScore",
        Score: this.Data.vM_.toString(),
        IsReached: false
      });
    }
    if (this.Data.pM_ >= 0) {
      e.push({
        Title: "DreamLinkWhiteCatSettleView_TimeScore",
        Score: this.Data.pM_.toString(),
        IsReached: false
      });
    }
    if (this.Data.yM_ >= 0) {
      e.push({
        Title: "DreamLinkWhiteCatSettleView_StepScore",
        Score: this.Data.yM_.toString(),
        IsReached: false
      });
    }
    e.push({
      Title: "DreamLinkWhiteCatSettleView_PassTime",
      Score: TimeUtil_1.TimeUtil.GetTimeString(this.Data.fAs),
      IsReached: false
    });
    this.Layout = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(0), this.OnCreateItem);
    await this.Layout.RefreshByDataAsync(e);
    this.RecordPanel = new DreamLinkWhiteCatSettleRecordItem();
    this.RecordPanel.Data = {
      Title: "DreamLinkWhiteCatSettlePanel_RecordTitle",
      Score: this.Data.Yma.toString(),
      IsNew: this.Data.Yxs
    };
    await this.RecordPanel.CreateThenShowByActorAsync(this.GetItem(1).GetOwner());
  }
}
exports.DreamLinkWhiteCatSettlePanel = DreamLinkWhiteCatSettlePanel;
class DreamLinkWhiteCatSettleItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIText], [2, UE.UIText]];
  }
  Refresh(e, t, i) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e.Title);
    this.GetText(2).SetText(e.Score);
  }
}
exports.DreamLinkWhiteCatSettleItem = DreamLinkWhiteCatSettleItem;
class DreamLinkWhiteCatSettleRecordItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Data = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIItem]];
  }
  OnBeforeShow() {
    if (this.Data !== undefined) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), this.Data.Title);
      this.GetText(1).SetText(this.Data.Score);
      this.GetItem(2).SetUIActive(this.Data.IsNew);
    }
  }
}
exports.DreamLinkWhiteCatSettleRecordItem = DreamLinkWhiteCatSettleRecordItem;
//# sourceMappingURL=DreamLinkWhiteCatSettleView.js.map