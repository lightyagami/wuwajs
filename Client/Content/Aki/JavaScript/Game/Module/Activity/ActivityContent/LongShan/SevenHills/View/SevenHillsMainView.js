"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.SevenHillsMainView = void 0;
const UE = require("ue"),
  CommonParamById_1 = require("../../../../../../../Core/Define/ConfigCommon/CommonParamById"),
  EventDefine_1 = require("../../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../../Common/Event/EventSystem"),
  UiViewBase_1 = require("../../../../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../../../../Ui/Common/PopupCaptionItem"),
  CommonRewardPopup_1 = require("../../../../../Common/CommonRewardPopup"),
  GenericLayout_1 = require("../../../../../Util/Layout/GenericLayout"),
  ActivityLongShanController_1 = require("../../ActivityLongShanController"),
  SevenHillsRewardBoxItem_1 = require("../Item/SevenHillsRewardBoxItem"),
  SevenHillsStageItem_1 = require("../Item/SevenHillsStageItem");
class SevenHillsMainView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments), this.ActivityBaseData = void 0, this.lqe = void 0, this.JX1 = void 0, this.Vja = void 0, this.S2t = void 0, this.ZX1 = () => {
      return new SevenHillsRewardBoxItem_1.SevenHillsRewardBoxItem
    }, this.eY1 = () => {
      return new SevenHillsStageItem_1.SevenHillsStageItem
    }, this.m7s = e => {
      this.S2t.Refresh(e)
    }, this.Wja = e => {
      this.ActivityBaseData && this.ActivityBaseData.Id === e && this.JX1.RefreshByData(this.ActivityBaseData.GetAllScoreRewardData())
    }, this.$An = e => {
      "Start" !== e && "showviewStart" !== e || this.GetUiInturnAnimController(7)?.Play()
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIHorizontalLayout],
      [2, UE.UIItem],
      [3, UE.UIText],
      [4, UE.UIText],
      [5, UE.UIHorizontalLayout],
      [6, UE.UIItem],
      [7, UE.UIInturnAnimController]
    ]
  }
  async OnBeforeStartAsync() {
    this.ActivityBaseData = ActivityLongShanController_1.ActivityLongShanController.GetActivityData(), this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0)), this.lqe.SetCloseCallBack(() => {
      this.CloseMe()
    }), this.lqe.SetTitle(this.ActivityBaseData.GetTitle());
    var e = CommonParamById_1.configCommonParamById.GetStringConfig("SevenHillsIconPath");
    e && this.lqe.SetTitleIcon(e), this.JX1 = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(1), this.ZX1), await this.JX1.RefreshByDataAsync(this.ActivityBaseData.GetAllScoreRewardData()), this.Vja = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(5), this.eY1), this.ActivityBaseData.StageIds && await this.Vja.RefreshByDataAsync(this.ActivityBaseData.StageIds), this.S2t = new CommonRewardPopup_1.CommonRewardPopup(this.GetRootItem())
  }
  OnBeforeShow() {
    var e = this.ActivityBaseData.GetScoreItemCount(),
      e = (this.GetText(3)?.SetText(e.toString()), this.ActivityBaseData.ScoreItemTotal);
    this.GetText(4)?.SetText("/" + e), this.JX1.RefreshByData(this.ActivityBaseData.GetAllScoreRewardData())
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RefreshRewardPopUp, this.m7s), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.Wja), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.$An)
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshRewardPopUp, this.m7s), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.Wja), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.$An)
  }
}
exports.SevenHillsMainView = SevenHillsMainView;
//# sourceMappingURL=SevenHillsMainView.js.map