"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PickInteractionView = undefined;
const UE = require("ue");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const UiViewBase_1 = require("../../Ui/Base/UiViewBase");
class PickInteractionView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.$Pl = () => {
      this.GetButton(0).RootUIComp.SetUIActive(false);
      this.GetButton(1).RootUIComp.SetUIActive(false);
      this.GetButton(2).RootUIComp.SetUIActive(false);
    };
    this.WPl = false;
    this.XPl = () => {
      this.WPl = true;
    };
    this.YPl = () => {
      this.WPl = false;
    };
    this.ODo = () => {
      ControllerHolder_1.ControllerHolder.LevelPickInteractController.ResetPickInteractGame();
    };
    this.Awe = () => {
      this.$Pl();
      ControllerHolder_1.ControllerHolder.LevelPickInteractController.ExitPickInteractModel();
    };
    this.lRl = () => {
      var e;
      if (!this.WPl) {
        if (e = CommonParamById_1.configCommonParamById.GetIntConfig("PickInteractionViewTutorialId")) {
          ControllerHolder_1.ControllerHolder.HelpController.OpenHelpById(e);
        }
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIButtonComponent], [2, UE.UIButtonComponent]];
    this.BtnBindInfo = [[0, this.ODo], [1, this.Awe], [2, this.lRl]];
  }
  OnStart() {
    ControllerHolder_1.ControllerHolder.LevelPickInteractController.OnClosingView = this.$Pl;
    ControllerHolder_1.ControllerHolder.LevelPickInteractController.OnViewPiecePostMoveEventStart = this.XPl;
    ControllerHolder_1.ControllerHolder.LevelPickInteractController.OnViewPiecePostMoveEventEnd = this.YPl;
    this.WPl = false;
  }
}
exports.PickInteractionView = PickInteractionView;
//# sourceMappingURL=PickInteractionView.js.map