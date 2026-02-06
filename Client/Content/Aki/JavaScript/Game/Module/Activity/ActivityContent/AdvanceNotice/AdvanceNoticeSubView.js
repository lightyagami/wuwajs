"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdvanceNoticeSubView = undefined;
const UE = require("ue");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const ActivitySubViewBase_1 = require("../../View/SubView/ActivitySubViewBase");
const AdvanceNoticeDefine_1 = require("./AdvanceNoticeDefine");
const AdvanceNoticeMultiGridItem_1 = require("./AdvanceNoticeMultiGridItem");
class AdvanceNoticeSubView extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments);
    this.MultiGridItem = undefined;
    this.kym = () => {
      var e;
      if (this.ActivityBaseData && ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk()) {
        if (!!(e = ConfigManager_1.ConfigManager.AdvanceNoticeConfig.GetAdvertisingPageInfoByActivityId(this.ActivityBaseData.Id)) && !((e = e.PVLinkId) <= 0)) {
          if ((e = ConfigManager_1.ConfigManager.AdvanceNoticeConfig.GetAdvertisingUrlConfigById(e)) && (e = ControllerHolder_1.ControllerHolder.KuroSdkController.GetIfGlobalSdk() ? e.GlobalLinkUrl : e.LinkUrl)) {
            ControllerHolder_1.ControllerHolder.KuroSdkController.OpenWebView("", e, true, true);
          }
        }
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIButtonComponent], [2, UE.UISprite], [3, UE.UIItem], [4, UE.UIText], [5, UE.UIText], [6, UE.UIText], [7, UE.UIText], [8, UE.UITexture]];
    this.BtnBindInfo = [[1, this.kym]];
  }
  async OnBeforeStartAsync() {
    var e = this.ActivityBaseData.Id;
    var e = ConfigManager_1.ConfigManager.AdvanceNoticeConfig.GetAdvertisingPageInfoByActivityId(e);
    var i = e.TabIdArray.length;
    var i = AdvanceNoticeDefine_1.advanceNoticeGridToPrefab[i];
    this.MultiGridItem = new AdvanceNoticeMultiGridItem_1.AdvanceNoticeMultiGridItem(e.Id);
    await this.MultiGridItem.CreateThenShowByResourceIdAsync(i, this.GetItem(3));
  }
  OnBeforeShow() {
    this.MultiGridItem?.PlayAnim();
  }
  OnRefreshView() {
    var e;
    var i;
    var t;
    if (this.ActivityBaseData && (e = ConfigManager_1.ConfigManager.AdvanceNoticeConfig.GetAdvertisingPageInfoByActivityId(this.ActivityBaseData.Id), this.SetTextureByPath(e.InscriptionPic, this.GetTexture(8)), LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), e.TitleText), this.GetText(5).SetText(e.TitleVersion), i = this.ActivityBaseData.GetUnlockTimeStamp(), i = new Date(i * TimeUtil_1.TimeUtil.InverseMillisecond), LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), e.OpenTimeText, i.getMonth() + 1, i.getDate()), i = this.GetText(7), t = e.PVLinkId > 0, i.SetUIActive(t), this.GetSprite(2).SetUIActive(!t), this.GetButton(1).RootUIComp.SetUIActive(t), t)) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(i, e.PVText);
    }
  }
}
exports.AdvanceNoticeSubView = AdvanceNoticeSubView;
//# sourceMappingURL=AdvanceNoticeSubView.js.map