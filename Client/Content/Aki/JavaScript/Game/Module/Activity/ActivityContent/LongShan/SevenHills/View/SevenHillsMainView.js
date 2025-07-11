"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SevenHillsMainView = undefined;
const UE = require("ue");
const CommonParamById_1 = require("../../../../../../../Core/Define/ConfigCommon/CommonParamById");
const EventDefine_1 = require("../../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../../Common/Event/EventSystem");
const UiViewBase_1 = require("../../../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../../../Ui/Common/PopupCaptionItem");
const CommonRewardPopup_1 = require("../../../../../Common/CommonRewardPopup");
const GenericLayout_1 = require("../../../../../Util/Layout/GenericLayout");
const ActivityLongShanController_1 = require("../../ActivityLongShanController");
const SevenHillsRewardBoxItem_1 = require("../Item/SevenHillsRewardBoxItem");
const SevenHillsStageItem_1 = require("../Item/SevenHillsStageItem");
class SevenHillsMainView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.ActivityBaseData = undefined;
    this.lqe = undefined;
    this.$Y1 = undefined;
    this.Vja = undefined;
    this.S2t = undefined;
    this.WY1 = () => {
      return new SevenHillsRewardBoxItem_1.SevenHillsRewardBoxItem();
    };
    this.QY1 = () => {
      return new SevenHillsStageItem_1.SevenHillsStageItem();
    };
    this.m7s = e => {
      this.S2t.Refresh(e);
    };
    this.Wja = e => {
      if (this.ActivityBaseData && this.ActivityBaseData.Id === e) {
        this.$Y1.RefreshByData(this.ActivityBaseData.GetAllScoreRewardData());
      }
    };
    this.$An = e => {
      if (e === "Start" || e === "showviewStart") {
        this.GetUiInturnAnimController(7)?.Play();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIHorizontalLayout], [2, UE.UIItem], [3, UE.UIText], [4, UE.UIText], [5, UE.UIHorizontalLayout], [6, UE.UIItem], [7, UE.UIInturnAnimController]];
  }
  async OnBeforeStartAsync() {
    this.ActivityBaseData = ActivityLongShanController_1.ActivityLongShanController.GetActivityData();
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    this.lqe.SetCloseCallBack(() => {
      this.CloseMe();
    });
    this.lqe.SetTitle(this.ActivityBaseData.GetTitle());
    var e = CommonParamById_1.configCommonParamById.GetStringConfig("SevenHillsIconPath");
    if (e) {
      this.lqe.SetTitleIcon(e);
    }
    this.$Y1 = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(1), this.WY1);
    await this.$Y1.RefreshByDataAsync(this.ActivityBaseData.GetAllScoreRewardData());
    this.Vja = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(5), this.QY1);
    if (this.ActivityBaseData.StageIds) {
      await this.Vja.RefreshByDataAsync(this.ActivityBaseData.StageIds);
    }
    this.S2t = new CommonRewardPopup_1.CommonRewardPopup(this.GetRootItem());
  }
  OnBeforeShow() {
    var e = this.ActivityBaseData.GetScoreItemCount();
    this.GetText(3)?.SetText(e.toString());
    var e = this.ActivityBaseData.ScoreItemTotal;
    this.GetText(4)?.SetText("/" + e);
    this.$Y1.RefreshByData(this.ActivityBaseData.GetAllScoreRewardData());
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RefreshRewardPopUp, this.m7s);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.Wja);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.$An);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshRewardPopUp, this.m7s);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.Wja);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.$An);
  }
}
exports.SevenHillsMainView = SevenHillsMainView;
//# sourceMappingURL=SevenHillsMainView.js.map