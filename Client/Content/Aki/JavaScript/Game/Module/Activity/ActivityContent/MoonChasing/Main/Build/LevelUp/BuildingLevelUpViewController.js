"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BuildingLevelUpViewController = undefined;
const MathUtils_1 = require("../../../../../../../../Core/Utils/MathUtils");
const ModelManager_1 = require("../../../../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../../../../Ui/UiManager");
const MoonChasingController_1 = require("../../MoonChasingController");
const ADD_STEP = 800;
const REDUCE_STEP = 800;
class BuildingLevelUpViewController {
  constructor() {
    this.Yzt = undefined;
    this.jio = undefined;
    this._Hs = false;
    this.CRn = 0;
    this.UnlockPress = () => {
      var i = this.Yzt.UiViewSequence;
      if (i.HasSequenceNameInPlaying("Press")) {
        i.ChangePlaybackDirection("Press");
      } else {
        this.Yzt.UiViewSequence.PlaySequence("Press");
        this.Yzt.PlayBuildingLoopSequence(true);
      }
      this._Hs = true;
    };
    this.UnlockRelease = () => {
      var i = this.Yzt.UiViewSequence;
      if (i.HasSequenceNameInPlaying("Press")) {
        i.ChangePlaybackDirection("Press");
      }
      this._Hs = false;
    };
    this.CloseSelf = () => {
      var i;
      if (this.jio.IsLevelUp) {
        if ((i = ModelManager_1.ModelManager.MoonChasingBuildingModel.GetPopularityUpData()) === undefined) {
          this.Yzt.CloseMe();
        } else {
          UiManager_1.UiManager.OpenView("BusinessTipsPopularityUpView", i, () => {
            this.Yzt.CloseMe();
          });
          ModelManager_1.ModelManager.MoonChasingBuildingModel.SetPopularityUpData(undefined);
        }
      } else {
        MoonChasingController_1.MoonChasingController.BuildingBuildFlowRequest(this.jio.BuildingId, i => {
          if (i) {
            this.Yzt.UiViewSequence.CloseSequenceName = "Close02";
            UiManager_1.UiManager.ResetToBattleView();
          } else {
            this.Yzt.CloseMe();
          }
        });
      }
    };
  }
  RegisterView(i) {
    this.Yzt = i;
    this.jio = i.OpenParam;
  }
  Start() {
    if (this.jio.IsLevelUp) {
      this.Yzt.InitLevelUp(this.jio.BuildingId);
      this.Yzt.ShowLevelUp();
      this.Yzt.FinishLevelUp(this.jio.BuildingId);
      this.Yzt.UiViewSequence.StartSequenceName = "LevelUp";
    } else {
      this.Yzt.InitUnlock(this.jio.BuildingId);
      this.Yzt.UiViewSequence.StartSequenceName = "Build";
    }
  }
  Tick(i) {
    if (!this.jio.IsLevelUp && !(this.CRn >= 1)) {
      if (this._Hs) {
        this.CRn = MathUtils_1.MathUtils.Clamp(this.CRn + i / ADD_STEP, 0, 1);
      } else {
        this.CRn = MathUtils_1.MathUtils.Clamp(this.CRn - i / REDUCE_STEP, 0, 1);
      }
      this.Yzt.SetFillAmount(this.CRn);
      if (this.CRn >= 1) {
        this.Yzt.ShowUnlock();
        this.Yzt.FinishUnlock(this.jio.BuildingId);
        this.Yzt.UiViewSequence.StopPrevSequence(false, true);
        this.Yzt.UiViewSequence.PlaySequence("Select");
        this.Yzt.PlayBuildingLoopSequence(false);
      }
      if (this.CRn <= 0) {
        this.Yzt.PlayBuildingLoopSequence(false);
      }
    }
  }
}
exports.BuildingLevelUpViewController = BuildingLevelUpViewController;
//# sourceMappingURL=BuildingLevelUpViewController.js.map