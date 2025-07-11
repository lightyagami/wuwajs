"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BabelTowerMainView = undefined;
const UE = require("ue");
const LocalStorage_1 = require("../../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../../Common/LocalStorageDefine");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const RedDotController_1 = require("../../../../RedDot/RedDotController");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem");
const UiManager_1 = require("../../../../Ui/UiManager");
const InstanceDungeonEntranceController_1 = require("../../../InstanceDungeon/InstanceDungeonEntranceController");
const PayShopViewData_1 = require("../../../PayShop/PayShopData/PayShopViewData");
const ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const BabelTowerController_1 = require("./BabelTowerController");
class BabelTowerMainView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.lqe = undefined;
    this.AMo = () => {
      if (this.Pe?.IfLeaveInstanceDungeonWhenClose) {
        InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.LeaveInstanceDungeon();
      } else {
        this.CloseMe();
      }
    };
    this.zDo = () => {
      var e;
      if (BabelTowerController_1.BabelTowerController.GetBabelTowerData().CheckIfInOpenTime()) {
        (e = new PayShopViewData_1.PayShopViewData()).PayShopId = 213;
        e.ShowShopIdList = [213];
        ControllerHolder_1.ControllerHolder.PayShopController.OpenPayShopView(e);
      } else {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("BabelTowerIsNotOpen");
      }
    };
    this.Ud_ = () => {
      if (BabelTowerController_1.BabelTowerController.GetBabelTowerData().CheckIfInOpenTime()) {
        UiManager_1.UiManager.OpenView("BabelTowerQuestView");
      } else {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("BabelTowerIsNotOpen");
      }
    };
    this.Qoc = () => {
      UiManager_1.UiManager.OpenView("BabelTowerNormalLevelChoseView");
    };
    this.Koc = () => {
      UiManager_1.UiManager.OpenView("BabelTowerHardLevelChoseView");
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIButtonComponent], [2, UE.UIItem], [3, UE.UIButtonComponent], [4, UE.UIItem], [5, UE.UIText], [6, UE.UIText], [7, UE.UIText], [8, UE.UIItem], [9, UE.UIArtText], [10, UE.UIText], [12, UE.UIArtText], [11, UE.UIText], [13, UE.UIButtonComponent], [14, UE.UIButtonComponent], [15, UE.UIItem], [16, UE.UIItem]];
    this.BtnBindInfo = [[3, this.zDo], [1, this.Ud_], [13, this.Qoc], [14, this.Koc]];
  }
  async OnBeforeStartAsync() {
    this.Pe = this.OpenParam;
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem();
    await this.lqe.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
    this.lqe.SetCloseCallBack(this.AMo);
  }
  OnStart() {
    this.GetItem(4).SetUIActive(false);
    RedDotController_1.RedDotController.BindRedDot("BabelTowerNewLevelDifficulty", this.GetItem(15), undefined, 1);
    RedDotController_1.RedDotController.BindRedDot("BabelTowerNewLevelDifficulty", this.GetItem(16), undefined, 0);
    RedDotController_1.RedDotController.BindRedDot("BabelTowerQuestRedDot", this.GetItem(2));
    var e = BabelTowerController_1.BabelTowerController.GetBabelTowerData().GetNewLevel();
    if (e && !(LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.BabelTowerNewLevel)?.get(e) ?? false)) {
      UiManager_1.UiManager.OpenView("BabelTowerNewLevelTipsView", e);
    }
  }
  OnBeforeShow() {
    this.Og();
  }
  OnBeforeDestroy() {
    RedDotController_1.RedDotController.UnBindGivenUi("BabelTowerNewLevelDifficulty", this.GetItem(15), 1);
    RedDotController_1.RedDotController.UnBindGivenUi("BabelTowerNewLevelDifficulty", this.GetItem(16), 0);
    RedDotController_1.RedDotController.UnBindGivenUi("BabelTowerQuestRedDot", this.GetItem(2));
    ModelManager_1.ModelManager.BabelTowerModel.CurrentSelectLevel = 0;
  }
  Og() {
    var e;
    var o = BabelTowerController_1.BabelTowerController.GetBabelTowerData();
    if (o) {
      if (e = o.GetNextLevelOpenTimeText()) {
        this.GetItem(8).SetUIActive(true);
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(7), "BabelUiTimeNew", e);
      } else {
        e = o.EndOpenTime === 0 ? 0 : o.EndOpenTime - TimeUtil_1.TimeUtil.GetServerTime();
        e = TimeUtil_1.TimeUtil.GetRemainTimeDataFormat(e).CountDownText;
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(7), "BabelTowerCloseTime", e);
      }
      e = o.GetNormalLevelPassText();
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(10), "BabelTowerNormalLevelTips", e);
      e = o.GetHardLevelStarText();
      this.GetArtText(12).SetText(e);
      this.GetText(6).SetText(o.CurrentItemCount + "");
      this.GetText(5).SetText("/" + ModelManager_1.ModelManager.BabelTowerModel.ItemCountMax);
    }
  }
}
exports.BabelTowerMainView = BabelTowerMainView;
//# sourceMappingURL=BabelTowerMainView.js.map