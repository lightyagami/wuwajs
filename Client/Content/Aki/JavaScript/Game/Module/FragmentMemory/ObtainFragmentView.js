"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ObtainFragmentView = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiViewBase_1 = require("../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../Ui/UiManager");
const ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController");
const LguiUtil_1 = require("../Util/LguiUtil");
const FragmentMemoryData_1 = require("./FragmentMemoryData");
class ObtainFragmentView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Jwn = undefined;
    this.tWt = () => {
      var e = this.Jwn.GetTopicData();
      if (e.GetUnlockState()) {
        var i = ConfigManager_1.ConfigManager.FragmentMemoryConfig.GetFragmentMemoryPreNeedItemId();
        let e = 1;
        if ((e = i > 0 ? ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(i) : e) > 0) {
          this.CloseMe(() => {
            var e = new FragmentMemoryData_1.FragmentMemoryMainViewOpenData();
            e.FragmentMemoryTopicData = this.Jwn.GetTopicData();
            e.CurrentSelectId = this.Jwn.GetId();
            ModelManager_1.ModelManager.FragmentMemoryModel.MemoryFragmentMainViewTryPlayAnimation = "Start02";
            UiManager_1.UiManager.OpenView("MemoryFragmentMainView", e);
          });
        } else {
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("Condition_13000069_Description");
        }
      } else {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(e.GetConditionDesc());
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIText], [2, UE.UIText], [3, UE.UIButtonComponent]];
    this.BtnBindInfo = [[3, this.tWt]];
  }
  OnBeforeShow() {
    var e = this.ChildPopView.PopItem;
    if (e) {
      (e = e).SetCaptionTitleVisible(false);
      e.SetCaptionTitleIconVisible(false);
    }
    var e = this.OpenParam;
    this.Jwn = ModelManager_1.ModelManager.FragmentMemoryModel.GetCollectDataById(e);
    ModelManager_1.ModelManager.FragmentMemoryModel.CurrentUnlockCollectId = 0;
    this.Og();
  }
  Og() {
    this.zwn();
    this.P5e();
    this.u3e();
  }
  Zwn() {
    return this.Jwn.GetThemeBg();
  }
  zwn() {
    this.SetTextureByPath(this.Zwn(), this.GetTexture(0));
  }
  eBn() {
    return this.Jwn.GetTitle();
  }
  P5e() {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), this.eBn());
  }
  ke() {
    return this.Jwn.GetTimeText();
  }
  u3e() {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), "FragmentMemoryCollectTime", this.ke());
  }
}
exports.ObtainFragmentView = ObtainFragmentView;
//# sourceMappingURL=ObtainFragmentView.js.map