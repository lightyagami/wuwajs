"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchPauseView = undefined;
const UE = require("ue");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine");
class FloroRanchPauseView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.yxu = () => {
      var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(345);
      e.FunctionMap.set(2, () => {
        if (ModelManager_1.ModelManager.FloroRanchGamePlayModel.IsEndlessMode) {
          ModelManager_1.ModelManager.FloroRanchGamePlayModel.ChangeState(4);
        } else {
          ModelManager_1.ModelManager.FloroRanchGamePlayModel.ChangeState(3);
        }
      });
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
    };
    this.Sxu = () => {
      ModelManager_1.ModelManager.FloroRanchGamePlayModel.ReStartGame();
    };
    this.JFe = () => {
      this.CloseMe(() => {
        ModelManager_1.ModelManager.FloroRanchGamePlayModel.ResumeGame();
      });
    };
    this.WHu = () => {
      ModelManager_1.ModelManager.FloroRanchGamePlayModel.ExitGame(false);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIButtonComponent], [2, UE.UIButtonComponent], [3, UE.UIButtonComponent]];
    this.BtnBindInfo = [[0, this.yxu], [1, this.Sxu], [2, this.JFe], [3, this.WHu]];
  }
}
exports.FloroRanchPauseView = FloroRanchPauseView;
//# sourceMappingURL=FloroRanchPauseView.js.map