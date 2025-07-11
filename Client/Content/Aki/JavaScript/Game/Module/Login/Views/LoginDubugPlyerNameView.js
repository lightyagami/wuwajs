"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoginDebugPlayerNameView = undefined;
const UE = require("ue");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine");
const PersonalDefine_1 = require("../../Personal/Model/PersonalDefine");
class LoginDebugPlayerNameView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.NEi = undefined;
    this.OEi = e => {
      this.GetButton(3).SetSelfInteractive(e.length > 0);
    };
    this.uHe = () => {
      this.CloseMe();
    };
    this.L3e = () => {
      var e = this.GetInputText(0).GetText();
      if (StringUtils_1.StringUtils.GetStringRealCount(e) > PersonalDefine_1.MAX_NAME_LENGTH) {
        this.kEi();
      } else {
        ModelManager_1.ModelManager.LoginModel.SetPlayerName(e);
        this.CloseMe();
        if (this.NEi) {
          this.NEi();
        }
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITextInputComponent], [1, UE.UIText], [2, UE.UIButtonComponent], [3, UE.UIButtonComponent], [4, UE.UIText]];
    this.BtnBindInfo = [[2, this.uHe], [3, this.L3e]];
  }
  OnBeforeCreate() {
    this.NEi = this.OpenParam;
  }
  OnStart() {
    this.GetText(1).SetUIActive(false);
    this.GetInputText(0).OnTextChange.Bind(this.OEi);
    this.GetButton(3).SetSelfInteractive(false);
  }
  kEi() {
    var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(112);
    ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
  }
  OnBeforeDestroy() {
    this.NEi = undefined;
  }
}
exports.LoginDebugPlayerNameView = LoginDebugPlayerNameView;
//# sourceMappingURL=LoginDubugPlyerNameView.js.map