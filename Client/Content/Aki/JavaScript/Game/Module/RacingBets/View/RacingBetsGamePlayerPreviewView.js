"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RacingBetsGamePlayPreviewView = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const UiCameraAnimationController_1 = require("../../UiCameraAnimation/UiCameraAnimationController");
const RacingBetsDangoRankPanel_1 = require("./Item/RacingBetsDangoRankPanel");
class RacingBetsGamePlayPreviewView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Ckc = [];
    this.LT1 = undefined;
    this.lyt = () => {
      ModelManager_1.ModelManager.RacingBetsModel.CloseDangoGamePlayPreviewView();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIItem], [2, UE.UIItem]];
    this.BtnBindInfo = [[0, this.lyt]];
  }
  async OnBeforeStartAsync() {
    this.Ckc = ModelManager_1.ModelManager.RacingBetsModel.GetDungeonDangoList();
    this.LT1 = new RacingBetsDangoRankPanel_1.RacingBetsDangoRankPanel();
    await this.LT1.CreateThenShowByActorAsync(this.GetItem(2).GetOwner());
    await this.LT1.InitAsync(this.Ckc);
  }
  PushCameraHandle(e, a, i) {
    UiCameraAnimationController_1.UiCameraAnimationController.PushCameraHandle(e, a, true);
  }
  PopCameraHandle(e, a, i, n) {
    UiCameraAnimationController_1.UiCameraAnimationController.PopCameraHandle(e, a, i, n);
  }
}
exports.RacingBetsGamePlayPreviewView = RacingBetsGamePlayPreviewView;
//# sourceMappingURL=RacingBetsGamePlayerPreviewView.js.map