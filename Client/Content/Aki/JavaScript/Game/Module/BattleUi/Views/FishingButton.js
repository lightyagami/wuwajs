"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FishingButton = undefined;
const UE = require("ue");
const Info_1 = require("../../../../Core/Common/Info");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotController_1 = require("../../../RedDot/RedDotController");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine");
const InputMultiKeyItem_1 = require("../../Common/InputKey/InputMultiKeyItem");
class FishingButton extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Qtt = undefined;
    this.ZMe = "";
    this.UFe = () => {
      ControllerHolder_1.ControllerHolder.FishingController.FishingInputHandler(this.ZMe);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIItem]];
    if (!Info_1.Info.IsInTouch()) {
      this.ComponentRegisterInfos.push([2, UE.UIItem]);
    }
    this.BtnBindInfo = [[0, this.UFe]];
  }
  async OnBeforeStartAsync() {
    var e = this.OpenParam;
    this.ZMe = e.ActionName;
    if (this.ZMe === InputMappingsDefine_1.actionMappings.切换角色3) {
      RedDotController_1.RedDotController.BindRedDot("FishingTech", this.GetItem(1));
    } else {
      this.GetItem(1).SetUIActive(false);
    }
    if (!Info_1.Info.IsInTouch()) {
      e = this.GetItem(2);
      this.Qtt = new InputMultiKeyItem_1.InputMultiKeyItem();
      await this.Qtt.CreateThenShowByActorAsync(e.GetOwner());
      e = {
        ActionOrAxisName: this.ZMe
      };
      this.Qtt.RefreshByActionOrAxis(e);
    }
  }
  OnBeforeShow() {
    if (this.ZMe === InputMappingsDefine_1.actionMappings.切换角色3) {
      ModelManager_1.ModelManager.FishingModel.RefreshTechCanLevelUp();
    }
  }
  OnBeforeDestroy() {
    if (this.ZMe === InputMappingsDefine_1.actionMappings.切换角色3) {
      RedDotController_1.RedDotController.UnBindGivenUi("FishingTech", this.GetItem(1));
    }
  }
}
exports.FishingButton = FishingButton;
//# sourceMappingURL=FishingButton.js.map