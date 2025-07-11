"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoguelikeInstanceBtnPanel = undefined;
const UE = require("ue");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotController_1 = require("../../../RedDot/RedDotController");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const ActivityRogueController_1 = require("../../Activity/ActivityContent/RougeActivity/ActivityRogueController");
const PayShopViewData_1 = require("../../PayShop/PayShopData/PayShopViewData");
const LguiUtil_1 = require("../../Util/LguiUtil");
const RoguelikeController_1 = require("../RoguelikeController");
class RoguelikeInstanceBtnPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.jho = () => {
      var e;
      var t = ActivityRogueController_1.ActivityRogueController.GetCurrentActivityData()?.SeasonData;
      if (t !== undefined) {
        t = ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueSeasonConfigById(t.UHn);
        (e = new PayShopViewData_1.PayShopViewData()).ShowShopIdList = [t.ShopId];
        e.PayShopId = t.ShopId;
        ModelManager_1.ModelManager.RoguelikeModel?.RecordRoguelikeShopRedDot(true);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RoguelikeDataUpdate);
        ControllerHolder_1.ControllerHolder.PayShopController.OpenPayShopView(e);
      }
    };
    this.Kho = () => {
      var e = ActivityRogueController_1.ActivityRogueController.GetCurrentActivityData()?.SeasonData;
      if (e !== undefined) {
        RoguelikeController_1.RoguelikeController.OpenRoguelikeSkillView(e.UHn);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[1, UE.UIButtonComponent], [0, UE.UIButtonComponent], [2, UE.UIText], [3, UE.UIText], [4, UE.UISprite], [5, UE.UIItem], [6, UE.UIItem]];
    this.BtnBindInfo = [[1, this.jho], [0, this.Kho]];
  }
  async OnBeforeStartAsync() {
    var e;
    if (ModelManager_1.ModelManager.RoguelikeModel.CheckRogueIsOpen() && (e = ActivityRogueController_1.ActivityRogueController.GetCurrentActivityData()?.SeasonData) !== undefined) {
      await RoguelikeController_1.RoguelikeController.RoguelikeTalentInfoRequest(e.UHn);
    }
  }
  OnStart() {
    this.Refresh();
  }
  OnBeforeShow() {
    this.BindRedDot();
  }
  OnAfterHide() {
    this.UnBindRedDot();
  }
  BindRedDot() {
    RedDotController_1.RedDotController.BindRedDot("RogueSkillUnlock", this.GetItem(5));
    RedDotController_1.RedDotController.BindRedDot("RoguelikeShop", this.GetItem(6));
  }
  UnBindRedDot() {
    RedDotController_1.RedDotController.UnBindGivenUi("RogueSkillUnlock", this.GetItem(5));
    RedDotController_1.RedDotController.UnBindGivenUi("RoguelikeShop", this.GetItem(6));
  }
  Refresh() {
    var e = ActivityRogueController_1.ActivityRogueController.GetCurrentActivityData()?.SeasonData;
    if (e) {
      o = ModelManager_1.ModelManager.RoguelikeModel.GetParamConfigBySeasonId()?.WeekTokenMaxCount ?? 1;
      t = e.yqs / o;
      this.GetSprite(4)?.SetFillAmount(t);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), "Roguelike_ActivityMain_Score", e.yqs, o);
    }
    var t = MathUtils_1.MathUtils.LongToBigInt(ModelManager_1.ModelManager.RoguelikeModel?.TempCountdown ?? 0);
    var e = Number(t) - TimeUtil_1.TimeUtil.GetServerTime();
    var o = TimeUtil_1.TimeUtil.CalculateRemainingTime(e);
    if (o) {
      LguiUtil_1.LguiUtil.SetLocalText(this.GetText(2), o.TextId, o.TimeValue);
    }
  }
}
exports.RoguelikeInstanceBtnPanel = RoguelikeInstanceBtnPanel;
//# sourceMappingURL=RoguelikeInstanceBtnPanel.js.map