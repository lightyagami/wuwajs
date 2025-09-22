"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TsUiHomeHelper = undefined;
const UE = require("ue");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const CommonDynamicBtnItem_1 = require("../../Common/Button/CommonDynamicBtnItem");
class TsUiHomeHelper extends UE.LGUIBehaviour {
  constructor() {
    super(...arguments);
    this.CommonDynamicBtnItem = undefined;
    this.OnBtnClick = () => {
      ControllerHolder_1.ControllerHolder.HomeBtnController.ExecuteBtnClick();
    };
  }
  Constructor() {
    this.CommonDynamicBtnItem = undefined;
    this.OnBtnClick = () => {
      ControllerHolder_1.ControllerHolder.HomeBtnController.ExecuteBtnClick();
    };
  }
  CreateHomeBtn(e) {
    this.CreateHomeBtnAsync(e);
  }
  async CreateHomeBtnAsync(e) {
    if (!this.CommonDynamicBtnItem) {
      this.CommonDynamicBtnItem = new CommonDynamicBtnItem_1.CommonDynamicBtnItem();
      await this.CommonDynamicBtnItem.CreateThenShowByResourceIdAsync(e, this.RootUIComp);
      this.CommonDynamicBtnItem.SetFunction(this.OnBtnClick);
    }
  }
}
exports.TsUiHomeHelper = TsUiHomeHelper;
exports.default = TsUiHomeHelper; //# sourceMappingURL=TsUiHomeHelper.js.map