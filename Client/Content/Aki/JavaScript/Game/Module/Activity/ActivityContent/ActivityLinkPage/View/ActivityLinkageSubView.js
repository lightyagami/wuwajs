"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.ActivityLinkageSubView = void 0;
const UE = require("ue"),
  LanguageSystem_1 = require("../../../../../../Core/Common/LanguageSystem"),
  Log_1 = require("../../../../../../Core/Common/Log"),
  ActivityById_1 = require("../../../../../../Core/Define/ConfigQuery/ActivityById"),
  ActivityLinkageById_1 = require("../../../../../../Core/Define/ConfigQuery/ActivityLinkageById"),
  ActivityLinkageInfoByIdAndLanguage_1 = require("../../../../../../Core/Define/ConfigQuery/ActivityLinkageInfoByIdAndLanguage"),
  ActivityLinkageUrlByIdAndIsNational_1 = require("../../../../../../Core/Define/ConfigQuery/ActivityLinkageUrlByIdAndIsNational"),
  MultiTextLang_1 = require("../../../../../../Core/Define/ConfigQuery/MultiTextLang"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  PublicUtil_1 = require("../../../../../Common/PublicUtil"),
  TimeUtil_1 = require("../../../../../Common/TimeUtil"),
  ControllerHolder_1 = require("../../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  CommonItemSmallItemGrid_1 = require("../../../../Common/ItemGrid/CommonItemSmallItemGrid"),
  LogReportDefine_1 = require("../../../../LogReport/LogReportDefine"),
  GenericLayout_1 = require("../../../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../../../Util/LguiUtil"),
  GenericScrollViewNew_1 = require("../../../../Util/ScrollView/GenericScrollViewNew"),
  ActivitySubViewBase_1 = require("../../../View/SubView/ActivitySubViewBase"),
  ActivityButtonItem_1 = require("../../UniversalComponents/Functional/ActivityButtonItem"),
  ActivityLinkageController_1 = require("../ActivityLinkageController"),
  ActivityLinkageTabItem_1 = require("./ActivityLinkageTabItem");
class ActivityLinkageSubView extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments), this.ActivityBaseData = void 0, this.p4e = void 0, this.bD = 0, this.pua = void 0, this.H3e = void 0, this.B7t = void 0, this.tw1 = void 0, this.W2e = () => {
      var i = new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid;
      return i.ShowReceivedCallBack = () => this.ActivityBaseData.IsReceiveReward(this.bD), i
    }, this.tu1 = () => {
      var i = new ActivityLinkageTabItem_1.ActivityLinkageTabItem;
      return i.SetToggleCallBack(this.TabItemToggleClick), i
    }, this.TabItemToggleClick = (i, e) => {
      this.PlaySubViewSequence("Switch"), this.B7t.SelectGridProxy(i), this.Hqe(e);
      i = new LogReportDefine_1.LinkageSwitchModuleEvent;
      i.i_activity_id = this.ActivityBaseData.Id, i.i_activity_type = this.ActivityBaseData.Type, i.i_id = e.TabId, i.i_if_finish = e.IsReceive ? 1 : 0, ControllerHolder_1.ControllerHolder.LogReportController.LogReport(i)
    }, this.Hqe = i => {
      this.pua = i, this.bD = i.TabId;
      i = ActivityLinkageById_1.configActivityLinkageById.GetConfig(this.bD);
      if (i) {
        this.SetTextureByPath(i.BgImage, this.GetTexture(0)), this.FNe();
        var e, t, r = [];
        for ([e, t] of i.Reward) r.push([{
          ItemId: e,
          IncId: 0
        }, t]);
        this.H3e?.RefreshByData(r), this.ewa();
        var i = LanguageSystem_1.LanguageSystem.GetLanguageDefineByCode(LanguageSystem_1.LanguageSystem.PackageLanguage).LanguageType,
          i = ActivityLinkageInfoByIdAndLanguage_1.configActivityLinkageInfoByIdAndLanguage.GetConfig(this.bD, i);
        i && (this.SetTextureByPath(i.BigImage, this.GetTexture(1)), i = !ControllerHolder_1.ControllerHolder.KuroSdkController.GetIfGlobalSdk(), this.tw1 = ActivityLinkageUrlByIdAndIsNational_1.configActivityLinkageUrlByIdAndIsNational.GetConfig(this.bD, i))
      }
    }, this.PWa = i => {
      i === this.ActivityBaseData.Id && (this.H3e.RefreshWithoutDataSync(), this.ewa())
    }, this.iu1 = () => {
      if (this.tw1.LinkUrl) {
        var e = PublicUtil_1.PublicUtil.OverridePackageId ?? ControllerHolder_1.ControllerHolder.KuroSdkController.GetPackageId();
        let i = this.tw1.LinkUrl + "?packageId=" + e;
        this.tw1.IsNeedToken && (i = i + "&" + PublicUtil_1.PublicUtil.GetPublicInfo());
        var e = this.tw1.IsNational,
          t = (e || (i = i + "&language=" + LanguageSystem_1.LanguageSystem.PackageLanguage), i = PublicUtil_1.PublicUtil.GetExtendExternalUrl(i, this.tw1.IsInternalLink), ModelManager_1.ModelManager.KuroSdkModel.GetPlatformStr()),
          t = (i = i + "&platform=" + t, this.tw1.IsInternalLink ? ControllerHolder_1.ControllerHolder.KuroSdkController.SdkOpenUrlWnd("", i) : ControllerHolder_1.ControllerHolder.KuroSdkController.OpenExternalUrl(i), Log_1.Log.CheckInfo() && Log_1.Log.Info("Activity", 71, "联动页打开链接", ["url", i], ["是否为国内包体", e]), new LogReportDefine_1.LinkageClickGoEvent);
        t.i_activity_id = this.ActivityBaseData.Id, t.i_activity_type = this.ActivityBaseData.Type, t.i_id = this.bD, ControllerHolder_1.ControllerHolder.LogReportController.LogReport(t), this.ActivityBaseData?.IsReceiveReward(this.bD) || ActivityLinkageController_1.ActivityLinkageController.RequestReward(this.bD)
      } else Log_1.Log.CheckError() && Log_1.Log.Error("Activity", 71, "联动页链接为空", ["tabId", this.bD])
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UITexture],
      [2, UE.UIText],
      [3, UE.UIText],
      [4, UE.UIText],
      [5, UE.UIScrollViewWithScrollbarComponent],
      [6, UE.UIButtonComponent],
      [7, UE.UIHorizontalLayout],
      [8, UE.UIText],
      [9, UE.UIInturnAnimController]
    ]
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.PWa)
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.PWa)
  }
  async OnBeforeStartAsync() {
    var i;
    this.p4e = new ActivityButtonItem_1.ActivityButtonItem, await this.p4e.CreateThenShowByActorAsync(this.GetButton(6).GetOwner()), this.p4e.SetFunction(this.iu1), this.ActivityBaseData && (this.ActivityBaseData.ReadRedDot(), i = ActivityById_1.configActivityById.GetConfig(this.ActivityBaseData.Id)) && (LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), i.Desc), i = TimeUtil_1.TimeUtil.GetDataFromTimeStamp(this.ActivityBaseData.BeginOpenTime), this.GetText(2)?.SetText(i.Month + "/" + i.Day), i = TimeUtil_1.TimeUtil.GetDataFromTimeStamp(this.ActivityBaseData.EndOpenTime), this.GetText(3)?.SetText(i.Month + "/" + i.Day), this.H3e = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(7), this.W2e), this.B7t = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(5), this.tu1), i = this.ActivityBaseData.GetTabInfoList(), await this.B7t.RefreshByDataAsync(i), this.B7t.SelectGridProxy(0), this.Hqe(i[0]))
  }
  OnBeforeShow() {
    this.GetUiInturnAnimController(9)?.Play()
  }
  FNe() {
    var i = ActivityLinkageById_1.configActivityLinkageById.GetConfig(this.bD).Show,
      e = this.GetText(4);
    e.SetUIActive(i), i && (i = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("ActivityRemainingTime"), i = ModelManager_1.ModelManager.ActivityModel.GetRemainTimeText(this.pua.EndTimeStamp / 1e3, i) ?? "", e.SetText(i))
  }
  ewa() {
    var i = !this.ActivityBaseData.IsReceiveReward(this.bD);
    this.p4e?.SetRedDotVisible(i)
  }
  OnTimer(i) {
    var e;
    this.ActivityBaseData.IsNeedShowTabsChange() && (e = this.ActivityBaseData.GetTabInfoList(), this.B7t.RefreshByData(e), this.B7t.SelectGridProxy(0), this.Hqe(e[0]), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.ActivityBaseData.Id)), this.FNe()
  }
}
exports.ActivityLinkageSubView = ActivityLinkageSubView;
//# sourceMappingURL=ActivityLinkageSubView.js.map