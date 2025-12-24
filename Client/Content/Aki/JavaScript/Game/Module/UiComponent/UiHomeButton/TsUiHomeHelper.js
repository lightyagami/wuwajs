"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TsUiHomeHelper = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const HomeBtnStyleById_1 = require("../../../../Core/Define/ConfigQuery/HomeBtnStyleById");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const HomeBtnItem_1 = require("./HomeBtnItem");
class TsUiHomeHelper extends UE.LGUIBehaviour {
  constructor() {
    super(...arguments);
    this.HasCreate = false;
    this.HomeBtnItem = undefined;
    this.OnBtnClick = () => {
      ControllerHolder_1.ControllerHolder.HomeBtnController.ExecuteBtnClick();
    };
  }
  Constructor() {
    this.HasCreate = false;
    this.HomeBtnItem = undefined;
    this.OnBtnClick = () => {
      ControllerHolder_1.ControllerHolder.HomeBtnController.ExecuteBtnClick();
    };
  }
  CreateHomeBtn(e) {
    if (this.HasCreate) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("HomeBtn", 87, "Home键被重复创建");
      }
    } else {
      this.CreateHomeBtnAsync(e);
    }
  }
  async CreateHomeBtnAsync(e) {
    var t;
    if (!this.HomeBtnItem) {
      this.HomeBtnItem = new HomeBtnItem_1.HomeBtnItem();
      if ((t = HomeBtnStyleById_1.configHomeBtnStyleById.GetConfig(e)) !== undefined) {
        this.HomeBtnItem.SetFunction(this.OnBtnClick);
        this.HomeBtnItem.SetHomeBtnStyle(e);
        await this.HomeBtnItem.CreateThenShowByResourceIdAsync(t.ResourceId, this.RootUIComp);
        this.HasCreate = true;
      }
    }
  }
}
exports.TsUiHomeHelper = TsUiHomeHelper;
exports.default = TsUiHomeHelper; //# sourceMappingURL=TsUiHomeHelper.js.map