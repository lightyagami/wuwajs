"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkipTaskFishingRelatedView = undefined;
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiManager_1 = require("../../../Ui/UiManager");
const SkipTask_1 = require("./SkipTask");
const DEFAULT_PORT_ID = 1;
class SkipTaskFishingRelatedView extends SkipTask_1.SkipTask {
  constructor() {
    super(...arguments);
    this.Y9t = () => {
      if (!this.lY_("FishingQuestView")) {
        UiManager_1.UiManager.OpenView("FishingQuestView");
      }
    };
    this.JO_ = () => {
      if (!this.lY_("FishingHandBookView")) {
        UiManager_1.UiManager.OpenView("FishingHandBookView");
      }
    };
    this.eG_ = () => {
      if (!this.lY_("DockyardView")) {
        ControllerHolder_1.ControllerHolder.FishingController.OpenDockyardView();
      }
    };
    this.tG_ = () => {
      if (!this.lY_("DockyardShopMainView")) {
        ControllerHolder_1.ControllerHolder.FishingController.OpenDockyardShopView(1);
      }
    };
    this.iG_ = () => {
      if (!this.lY_("DockyardShopMainView")) {
        ControllerHolder_1.ControllerHolder.FishingController.OpenDockyardShopView(0);
      }
    };
  }
  OnRun(e, i, a) {
    switch (Number(e)) {
      case 1:
        this.rG_(this.Y9t);
        break;
      case 2:
        this.rG_(this.JO_);
        break;
      case 3:
        this.oG_(() => {
          var e;
          if (!this.lY_("FishingTechRootView")) {
            e = {
              Type: Number(i),
              NodeId: Number(a)
            };
            UiManager_1.UiManager.OpenView("FishingTechRootView", e);
          }
        });
        break;
      case 4:
        this.rG_(this.eG_);
        break;
      case 5:
        this.oG_(this.tG_);
        break;
      case 6:
        this.oG_(this.iG_);
    }
    this.Finish();
  }
  CheckMainViewOpen() {
    return UiManager_1.UiManager.GetViewByName("FishingDockView") !== undefined;
  }
  CheckIsInSailing() {
    return ModelManager_1.ModelManager.FishingModel.GetShipData()?.IsShipDriving() ?? false;
  }
  SkipToMap() {
    let e = ModelManager_1.ModelManager.FishingModel.GetShipData().GetLastPortId();
    if (e <= 0) {
      e = DEFAULT_PORT_ID;
    }
    var i = {
      MarkId: ConfigManager_1.ConfigManager.FishingConfig.GetFishingPortConfig(e).MarkId,
      MarkType: 34
    };
    ControllerHolder_1.ControllerHolder.WorldMapController.OpenView(2, false, i);
  }
  oG_(e) {
    if (this.CheckMainViewOpen()) {
      e();
    } else {
      this.SkipToMap();
    }
  }
  rG_(e) {
    if (this.CheckMainViewOpen() || this.CheckIsInSailing()) {
      e();
    } else {
      this.SkipToMap();
    }
  }
  lY_(e) {
    return !!UiManager_1.UiManager.IsViewOpen(e) || UiManager_1.UiManager.GetViewByName(e) !== undefined && (UiManager_1.UiManager.NormalResetToView(e), true);
  }
}
exports.SkipTaskFishingRelatedView = SkipTaskFishingRelatedView;
//# sourceMappingURL=SkipTaskFishingRelatedView.js.map