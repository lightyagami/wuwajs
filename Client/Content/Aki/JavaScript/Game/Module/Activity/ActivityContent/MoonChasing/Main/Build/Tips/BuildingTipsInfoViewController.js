"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BuildingTipsInfoViewController = undefined;
const ConfigManager_1 = require("../../../../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../../../../Ui/UiManager");
const ConfirmBoxController_1 = require("../../../../../../ConfirmBox/ConfirmBoxController");
const ConfirmBoxDefine_1 = require("../../../../../../ConfirmBox/ConfirmBoxDefine");
const WorldMapController_1 = require("../../../../../../WorldMap/WorldMapController");
class BuildingTipsInfoViewController {
  constructor() {
    this.Yzt = undefined;
    this.jio = undefined;
    this.SwitchPrev = () => {
      this.qDn(true);
      this.Yzt.UiViewSequence.StopPrevSequence(false, true);
      this.Yzt.UiViewSequence.PlaySequence("Switch");
      this.Refresh();
    };
    this.SwitchNext = () => {
      this.qDn(false);
      this.Yzt.UiViewSequence.StopPrevSequence(false, true);
      this.Yzt.UiViewSequence.PlaySequence("Switch");
      this.Refresh();
    };
    this.JumpToMap = () => {
      var i = ConfigManager_1.ConfigManager.BuildingConfig.GetBuildingById(this.jio.BuildingId);
      if (i.MapMarkId > 0) {
        i = {
          MarkId: i.MapMarkId,
          MarkType: 0
        };
        WorldMapController_1.WorldMapController.OpenView(2, false, i);
      }
    };
    this.JumpToConditionTip = () => {
      var i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(197);
      i.FunctionMap.set(2, () => {
        var i = ConfigManager_1.ConfigManager.BuildingConfig.GetBuildingById(this.jio.BuildingId);
        ControllerHolder_1.ControllerHolder.MoonChasingController.OpenTaskView(i.JumpType, i.JumpParam);
      });
      ConfirmBoxController_1.ConfirmBoxController.ShowConfirmBoxNew(i);
    };
    this.CloseSelf = () => {
      var i = UiManager_1.UiManager.GetViewByName("MoonChasingMainView")?.OpenParam;
      if (i) {
        i.RefreshBuildingId = this.jio.BuildingId;
      }
      this.Yzt.CloseMe();
    };
    this.UnlockOrLevelUp = () => {
      var i = ModelManager_1.ModelManager.MoonChasingBuildingModel.GetBuildingDataById(this.jio.BuildingId);
      if (i.IsCanLevelUp) {
        if (i.IsBuild) {
          this.Yzt.UiViewSequence.HideSequenceName = "HideView02";
          ControllerHolder_1.ControllerHolder.MoonChasingController.BuildingLevelUpRequest(this.jio.BuildingId);
        } else {
          this.Yzt.UiViewSequence.HideSequenceName = "HideView01";
          ControllerHolder_1.ControllerHolder.MoonChasingController.BuildingUnLockRequest(this.jio.BuildingId);
        }
      } else {
        (i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(205)).FunctionMap.set(2, () => {
          ControllerHolder_1.ControllerHolder.MoonChasingController.OpenBusinessMainView();
        });
        ConfirmBoxController_1.ConfirmBoxController.ShowConfirmBoxNew(i);
      }
    };
  }
  qDn(i) {
    var r = ModelManager_1.ModelManager.MoonChasingBuildingModel.GetBuildingDataSize();
    this.jio.BuildingId = i ? this.jio.BuildingId - 1 > 0 ? this.jio.BuildingId - 1 : r : this.jio.BuildingId + 1 <= r ? this.jio.BuildingId + 1 : 1;
  }
  RegisterView(i) {
    this.Yzt = i;
    this.jio = i.OpenParam;
  }
  async Refresh() {
    this.Yzt.RefreshText(this.jio.BuildingId);
    await this.Yzt.RefreshAttribute(this.jio.BuildingId);
    this.Yzt.RefreshRoleItem(this.jio.BuildingId);
    this.Yzt.RefreshBottom(this.jio.BuildingId);
    this.Yzt.RefreshTexture(this.jio.BuildingId);
  }
}
exports.BuildingTipsInfoViewController = BuildingTipsInfoViewController;
//# sourceMappingURL=BuildingTipsInfoViewController.js.map