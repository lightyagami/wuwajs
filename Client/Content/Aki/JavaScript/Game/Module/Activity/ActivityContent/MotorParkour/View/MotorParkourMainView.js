"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorParkourMainView = undefined;
const UE = require("ue");
const MultiTextLang_1 = require("../../../../../../Core/Define/ConfigQuery/MultiTextLang");
const TimeUtil_1 = require("../../../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../../../../Ui/Base/UiTickViewBase");
const PopupCaptionItem_1 = require("../../../../../Ui/Common/PopupCaptionItem");
const UiManager_1 = require("../../../../../Ui/UiManager");
const ScrollingTipsController_1 = require("../../../../ScrollingTips/ScrollingTipsController");
const GenericLayout_1 = require("../../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../../../Util/ScrollView/GenericScrollViewNew");
const ActivityControllerHolder_1 = require("../../../ActivityControllerHolder");
const MotorParkourLevelItem_1 = require("./Item/MotorParkourLevelItem");
const MotorParkourRankItem_1 = require("./Item/MotorParkourRankItem");
class MotorParkourMainView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.CNe = undefined;
    this.ibf = undefined;
    this.rbf = undefined;
    this.ZTf = undefined;
    this.lqe = undefined;
    this.Og = i => {
      this.ibf = i;
      this.rbf.SelectGridProxy(this.rbf.GetScrollItemByKey(i.Id)?.GridIndex);
      var e = this.GetTexture(8);
      this.SetTextureByPath(i.RaceTrackTexture, e);
      e?.SetUIRelativeRotation(new UE.Rotator(0, i.RouteTextureRotation, 0));
      this.ZTf.RefreshByData(i.HistoryRankList, undefined, true);
      this.GetItem(14)?.SetUIActive(i.BestRecordTime !== 0);
      var e = TimeUtil_1.TimeUtil.GetRemainTimeDataFormat5(i.BestRecordTime * TimeUtil_1.TimeUtil.Millisecond);
      this.GetText(12)?.SetText(e);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(7), i.RouteName);
    };
    this.GZt = i => {
      var e;
      if (!i.IsUnLock) {
        if (i.IsReachUnlockTime()) {
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("MotorParkour_GuideText_1");
          return;
        } else {
          e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("GuideTips_96101_Content");
          e = ModelManager_1.ModelManager.ActivityModel.GetRemainTimeText(i.UnlockTime, e);
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(e);
          return;
        }
      }
      this.Og(i);
      this.PlaySequence("Switch");
    };
    this.c71 = () => {
      var i = new MotorParkourLevelItem_1.MotorParkourLevelItem();
      i.OnToggleCallback = this.GZt;
      return i;
    };
    this.Nn1 = () => {
      return new MotorParkourRankItem_1.MotorParkourRankItem();
    };
    this.g6e = () => {
      var i = this.CNe.GetSelectedLevelDataInRewardView();
      var i = {
        ActivityData: this.CNe,
        SelectLevelData: i
      };
      UiManager_1.UiManager.OpenView("MotorParkourRewardView", i);
    };
    this.dxl = () => {
      if (ModelManager_1.ModelManager.GameModeModel.IsMulti) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("ErrorCode_600064_Text");
      } else {
        ActivityControllerHolder_1.ActivityControllerHolder.MotorParkourController.EnterMotorParkourDungeonDirectly(this.ibf.Id);
      }
    };
    this.AMo = () => {
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIItem], [2, UE.UIScrollViewWithScrollbarComponent], [3, UE.UIItem], [4, UE.UIButtonComponent], [5, UE.UIText], [6, UE.UIText], [7, UE.UIText], [8, UE.UITexture], [10, UE.UIVerticalLayout], [11, UE.UIItem], [12, UE.UIText], [13, UE.UIButtonComponent], [14, UE.UIItem], [15, UE.UIItem], [16, UE.UITexture]];
    this.BtnBindInfo = [[4, this.g6e], [13, this.dxl]];
  }
  async OnBeforeStartAsync() {
    ActivityControllerHolder_1.ActivityControllerHolder.MotorParkourController.IsNeedShowMotorParkourMainView = false;
    this.CNe = this.OpenParam;
    this.rbf = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(2), this.c71, undefined, true);
    this.ZTf = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(10), this.Nn1);
    var i = [];
    var e = this.GetItem(1);
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem();
    this.lqe.SetCloseCallBack(this.AMo);
    i.push(this.lqe.CreateThenShowByActorAsync(e.GetOwner()));
    var e = this.CNe.GetLevelDataList();
    i.push(this.rbf.RefreshByDataAsync(e, true));
    await Promise.all(i);
    this.ibf = this.CNe.GetSelectedLevelData();
  }
  OnBeforeShow() {
    this.rbf.RefreshByData(this.CNe.GetLevelDataList(), () => {
      this.Og(this.ibf);
      this.rbf.LateScrollTo(this.rbf.GetItemByKey(this.ibf.Id));
    }, true);
    var i = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender() === 0;
    var e = i ? "T_LevelSelectBgFemale" : "T_LevelSelectBgMale";
    var e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e);
    this.SetTextureByPath(e, this.GetTexture(0));
    var e = i ? "T_RoleFemale" : "T_RoleMale";
    var i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e);
    this.SetTextureByPath(i, this.GetTexture(16));
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), "MotorParkour_RewardProgress_1", this.CNe.GetFinishedTaskNum(), this.CNe.GetAllTaskNum());
    this.GetItem(15)?.SetUIActive(this.CNe.RewardHasRedDot());
  }
  OnTick(i) {
    var e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("ActivityRemainingTime");
    var e = ModelManager_1.ModelManager.ActivityModel.GetRemainTimeText(this.CNe.EndShowTime, e);
    this.GetText(6)?.SetText(e);
  }
}
exports.MotorParkourMainView = MotorParkourMainView;
//# sourceMappingURL=MotorParkourMainView.js.map