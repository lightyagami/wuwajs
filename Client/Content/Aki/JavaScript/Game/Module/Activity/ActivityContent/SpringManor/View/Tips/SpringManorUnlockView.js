"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpringManorUnlockView = undefined;
const UE = require("ue");
const CommonParamById_1 = require("../../../../../../../Core/Define/ConfigCommon/CommonParamById");
const UiTickViewBase_1 = require("../../../../../../Ui/Base/UiTickViewBase");
const UiManager_1 = require("../../../../../../Ui/UiManager");
class SpringManorUnlockView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.kQ_ = false;
    this._at = 0;
    this.tEt = CommonParamById_1.configCommonParamById.GetIntConfig("SpringManorLevelDisplayTime");
    this.hwg = undefined;
    this.nqe = () => {
      UiManager_1.UiManager.OpenView("Spring26AtmosphereLevelView");
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UISprite], [2, UE.UIText], [3, UE.UIText]];
    this.BtnBindInfo = [[0, this.nqe]];
  }
  OnStart() {
    this._at = this.tEt;
    this.hwg = this.GetSprite(1);
  }
  OnTick(i) {
    this.hwg?.SetFillAmount(this._at / this.tEt);
    if (this._at <= 0) {
      if (!this.kQ_) {
        this.CloseMe();
        this.kQ_ = true;
      }
    } else {
      this._at -= i;
    }
  }
}
exports.SpringManorUnlockView = SpringManorUnlockView;
//# sourceMappingURL=SpringManorUnlockView.js.map