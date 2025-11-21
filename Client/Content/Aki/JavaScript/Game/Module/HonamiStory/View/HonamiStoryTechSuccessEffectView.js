"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryTechSuccessEffectView = undefined;
const UE = require("ue");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
class HonamiStoryTechSuccessEffectView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.nLc = undefined;
    this.Pe = undefined;
    this.Jvt = () => {
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UILoopScrollViewComponent], [1, UE.UIItem], [2, UE.UIText], [3, UE.UIText], [4, UE.UIButtonComponent], [5, UE.UIButtonComponent]];
    this.BtnBindInfo = [[4, this.Jvt], [5, this.Jvt]];
  }
  async OnBeforeStartAsync() {
    this.nLc = new SuccessDescriptionItem();
    await this.nLc.CreateThenShowByActorAsync(this.GetItem(1).GetOwner());
  }
  OnBeforeShow() {
    this.Pe = this.OpenParam;
    if (this.Pe) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), this.Pe.SuccessTitle);
      this.nLc.SetDescriptionText(this.Pe.SuccessDesc, this.Pe.SuccessDescParams);
      this.GetText(3).ShowTextNew("Text_BackToView_Text");
    }
  }
  OnAfterDestroy() {
    var e;
    var i;
    var t = ModelManager_1.ModelManager.HonamiStoryModel;
    if (!!this.Pe?.Type && (this.Pe.Type === 1 || this.Pe.Type === 2)) {
      e = t.CurrentSelectNode.GetConfig.FlowListName;
      i = t.CurrentSelectNode.GetConfig.FlowId;
      t = t.CurrentSelectNode.GetConfig.StateId;
      if (e && i && t) {
        ControllerHolder_1.ControllerHolder.FlowController.StartFlow(e, i, t);
      }
    }
  }
}
exports.HonamiStoryTechSuccessEffectView = HonamiStoryTechSuccessEffectView;
class SuccessDescriptionItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  SetDescriptionText(e, i) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e, ...i);
  }
}
//# sourceMappingURL=HonamiStoryTechSuccessEffectView.js.map