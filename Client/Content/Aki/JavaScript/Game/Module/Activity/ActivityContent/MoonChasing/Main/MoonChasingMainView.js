"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoonChasingMainView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../../Ui/Common/PopupCaptionItem");
const ButtonItem_1 = require("../../../../Common/Button/ButtonItem");
const ActivityMoonChasingController_1 = require("../Activity/ActivityMoonChasingController");
const BuildingMainModule_1 = require("./Build/BuildingMainModule");
const MoonChasingViewController_1 = require("./MoonChasingViewController");
const PopularityModule_1 = require("./PopularityModule");
class MoonChasingMainView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.eke = undefined;
    this.lqe = undefined;
    this.vRn = undefined;
    this.NKs = undefined;
    this.kKs = undefined;
    this.FKs = undefined;
    this.Sfa = undefined;
    this.s6e = undefined;
    this.aOn = new MoonChasingViewController_1.MoonChasingViewController();
    this.u2e = () => {
      this.eke.RefreshPopularity();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem]];
  }
  async ERn() {
    this.eke = new PopularityModule_1.PopularityModule();
    await this.eke.CreateByActorAsync(this.GetItem(6).GetOwner());
    this.AddChild(this.eke);
  }
  async zDn() {
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(5));
    this.lqe.SetCloseCallBack(this.aOn.CloseSelf);
    this.lqe.SetHelpCallBack(this.aOn.OpenHelpView);
    var i = ConfigManager_1.ConfigManager.BusinessConfig.GetCoinItemId();
    await this.lqe.SetCurrencyItemList([i]);
  }
  async SRn() {
    this.vRn = new BuildingMainModule_1.BuildingMainModule();
    await this.vRn.CreateThenShowByActorAsync(this.GetItem(8).GetOwner());
  }
  VKs() {
    this.NKs = new ButtonItem_1.ButtonItem(this.GetItem(2));
    this.NKs.SetFunction(this.aOn.SkipToBusiness);
    this.kKs = new ButtonItem_1.ButtonItem(this.GetItem(3));
    this.kKs.SetFunction(this.aOn.SkipToBuild);
    this.FKs = new ButtonItem_1.ButtonItem(this.GetItem(4));
    this.FKs.SetFunction(() => {
      this.aOn.SkipToTask();
    });
    this.Sfa = new ButtonItem_1.ButtonItem(this.GetItem(0));
    this.Sfa.SetFunction(this.aOn.SkipToHandbook);
    this.s6e = new ButtonItem_1.ButtonItem(this.GetItem(1));
    this.s6e.SetFunction(this.aOn.SkipToReward);
  }
  async OnBeforeStartAsync() {
    this.aOn.RegisterView(this);
    await ControllerHolder_1.ControllerHolder.MoonChasingController.TrackMoonAllDataRequest();
    await Promise.all([this.zDn(), this.ERn(), this.SRn()]);
    this.VKs();
  }
  OnBeforeShow() {
    this.aOn.Show();
    ActivityMoonChasingController_1.ActivityMoonChasingController.CheckIsActivityClose();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PopularityChange, this.u2e);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PopularityChange, this.u2e);
  }
  GetGuideUiItemAndUiItemForShowEx(i) {
    var t;
    var e;
    if (!(i.length < 1)) {
      if ((t = i[0]) === "Cost") {
        if ((e = this.lqe.GetCostContent()) === undefined) {
          return undefined;
        } else {
          return [e, e];
        }
      } else if (t === "BuildMap") {
        return this.vRn.GetGuideUiItemAndUiItemForShowEx(i);
      } else {
        return undefined;
      }
    }
  }
  RefreshBuildingModule() {
    this.vRn.RefreshModule();
  }
  BuildingBackToMainView() {
    this.GetItem(7)?.SetUIActive(true);
    this.vRn.HideBuildingModule();
  }
  SkipToBuild() {
    this.GetItem(7)?.SetUIActive(false);
    this.vRn.ShowBuilding();
  }
  RefreshMainModule(i) {
    this.vRn.RefreshBuilding(i);
  }
  RefreshRedDot() {
    this.NKs.BindRedDot("MoonChasingDelegation");
    this.kKs.BindRedDot("MoonChasingBuilding");
    this.Sfa.BindRedDot("MoonChasingHandbook");
    this.s6e.BindRedDot("MoonChasingRewardAndShop");
    this.FKs.BindRedDot("MoonChasingAllQuest");
  }
}
exports.MoonChasingMainView = MoonChasingMainView;
//# sourceMappingURL=MoonChasingMainView.js.map