"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VulkanSetView = undefined;
const UE = require("ue");
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
class VulkanSetView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.NOe = -1;
    this.gjc = -1;
    this.Cjc = undefined;
    this.bs_ = undefined;
    this.pjc = undefined;
    this.xqe = undefined;
    this.vjc = () => {
      var e = new SetItem();
      e.CallbackClickItem = this.yjc;
      return e;
    };
    this.yjc = e => {
      this.gjc = e.Value;
      this.xqe.SelectGridProxy(e.Index);
      this.GetItem(4).SetUIActive(e.Index !== this.NOe);
    };
    this.rki = () => {
      this.CloseMe();
    };
    this.p5t = () => {
      if (!(this.gjc < 0)) {
        GameSettingsManager_1.GameSettingsManager.HandleValueChange(vulkanFunctionId, this.gjc, 1);
        this.CloseMe();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIScrollViewWithScrollbarComponent], [4, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    var e = [];
    this.Cjc = new ButtonItem_1.ButtonItem();
    e.push(this.Cjc.CreateThenShowByActorAsync(this.GetItem(1).GetOwner()));
    this.Cjc.SetFunction(this.rki);
    this.bs_ = new ButtonItem_1.ButtonItem();
    e.push(this.bs_.CreateThenShowByActorAsync(this.GetItem(2).GetOwner()));
    this.bs_.SetFunction(this.p5t);
    this.pjc = new TipsItem();
    e.push(this.pjc.CreateThenShowByActorAsync(this.GetItem(4).GetOwner()));
    this.xqe = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(3), this.vjc);
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
    this.gjc = e;
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
    this.GetItem(4).SetUIActive(false);
    this.xqe.SelectGridProxy(this.NOe);
  }
}
exports.VulkanSetView = VulkanSetView;
class SetItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.CallbackClickItem = undefined;
    this.yjc = () => {
      if (this.Pe && this.CallbackClickItem) {
        this.CallbackClickItem(this.Pe);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText]];
    this.BtnBindInfo = [[0, this.yjc]];
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