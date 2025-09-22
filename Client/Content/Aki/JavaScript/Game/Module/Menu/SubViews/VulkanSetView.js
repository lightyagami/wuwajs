"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VulkanSetView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const GameSettingsDefine_1 = require("../../../GameSettings/GameSettingsDefine");
const GameSettingsManager_1 = require("../../../GameSettings/GameSettingsManager");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const ButtonItem_1 = require("../../Common/Button/ButtonItem");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew");
const vulkanFunctionId = GameSettingsDefine_1.EFunction.Vulkan;
const mobileRhiNameList = ["OpenGL", "Vulkan"];
class VulkanSetView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.NOe = -1;
    this.Q8u = -1;
    this.K8u = undefined;
    this.bs_ = undefined;
    this.X8u = undefined;
    this.xqe = undefined;
    this.Y8u = () => {
      var e = new SetItem();
      e.CallbackClickItem = this.z8u;
      return e;
    };
    this.z8u = e => {
      this.Q8u = e.Value;
      this.xqe.SelectGridProxy(e.Index);
      this.GetItem(4).SetUIActive(this.Qqd());
    };
    this.rki = () => {
      this.CloseMe();
    };
    this.p5t = () => {
      if (!(this.Q8u < 0)) {
        GameSettingsManager_1.GameSettingsManager.HandleValueChange(vulkanFunctionId, this.Q8u, 1);
        this.CloseMe();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIScrollViewWithScrollbarComponent], [4, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    var e = [];
    this.K8u = new ButtonItem_1.ButtonItem();
    e.push(this.K8u.CreateThenShowByActorAsync(this.GetItem(1).GetOwner()));
    this.K8u.SetFunction(this.rki);
    this.bs_ = new ButtonItem_1.ButtonItem();
    e.push(this.bs_.CreateThenShowByActorAsync(this.GetItem(2).GetOwner()));
    this.bs_.SetFunction(this.p5t);
    this.X8u = new TipsItem();
    e.push(this.X8u.CreateThenShowByActorAsync(this.GetItem(4).GetOwner()));
    this.xqe = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(3), this.Y8u);
    var t = this.Fq();
    e.push(this.xqe.RefreshByDataAsync(t));
    await Promise.all(e);
  }
  Fq() {
    var t = [];
    let e = GameSettingsManager_1.GameSettingsManager.GetCurrentValue(vulkanFunctionId) ?? -1;
    var i = ConfigManager_1.ConfigManager.MenuBaseConfig.GetMenuConfigByFunctionId(vulkanFunctionId);
    var s = i.OptionsName;
    var n = i.OptionsValue;
    let r = n.indexOf(e);
    if (r < 0) {
      e = i.OptionsDefault;
      r = n.indexOf(e);
    }
    this.NOe = r;
    this.Q8u = e;
    for (let e = 0; e < s.length; e++) {
      t.push({
        Index: e,
        Value: n[e],
        Name: n[e] === 0 ? "ToolsImageSetOpenGLES_Text" : "ToolsImageSetVulkan_Text"
      });
    }
    return t;
  }
  OnBeforeShow() {
    this.GetItem(4).SetUIActive(this.Qqd());
    this.xqe.SelectGridProxy(this.NOe);
  }
  Qqd() {
    var e = mobileRhiNameList[this.Q8u];
    var t = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetRHIName();
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("GameSettings", 64, "当前选中的RHI是", ["chosen", e], ["using", t]);
    }
    return e !== t;
  }
}
exports.VulkanSetView = VulkanSetView;
class SetItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.CallbackClickItem = undefined;
    this.z8u = () => {
      if (this.Pe && this.CallbackClickItem) {
        this.CallbackClickItem(this.Pe);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText]];
    this.BtnBindInfo = [[0, this.z8u]];
  }
  Refresh(e, t, i) {
    this.Pe = e;
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e.Name);
    e = t ? 1 : 0;
    this.GetExtendToggle(0).SetToggleState(e);
  }
  OnSelected(e) {
    this.GetExtendToggle(0).SetToggleState(1);
  }
  OnDeselected(e) {
    this.GetExtendToggle(0).SetToggleState(0);
  }
}
class TipsItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIText], [2, UE.UIButtonComponent]];
  }
  OnBeforeShow() {
    this.GetSprite(0).SetUIActive(false);
    this.SetButtonUiActive(2, false);
  }
}
//# sourceMappingURL=VulkanSetView.js.map