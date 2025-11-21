"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ToolWindowView = undefined;
const UE = require("ue");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const HotPatch_1 = require("../../../../Launcher/HotPatch");
const GameSettingsDefine_1 = require("../../../GameSettings/GameSettingsDefine");
const GameSettingsManager_1 = require("../../../GameSettings/GameSettingsManager");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine");
const ToolWindowButtonItem_1 = require("./ToolWindowButtonItem");
class ToolWindowView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.UBi = undefined;
    this.ABi = undefined;
    this.Lic = undefined;
    this.$8u = undefined;
    this.PBi = () => {
      UiManager_1.UiManager.OpenView("LogUploadView");
    };
    this.xBi = () => {
      var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(168);
      e.FunctionMap.set(2, () => {
        var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(186);
        e.SetAfterShowFunction(() => {
          HotPatch_1.HotPatch.ClearPatch();
        });
        e.SetCloseFunction(() => {
          HotPatch_1.HotPatch.ClearPatch();
        });
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
      });
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
    };
    this.wic = () => {
      UiManager_1.UiManager.OpenView("NetworkDetectionView");
    };
    this.W8u = () => {
      UiManager_1.UiManager.OpenView("VulkanSetView");
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem]];
  }
  OnStart() {
    this.GetText(0).ShowTextNew("PrefabTextItem_HotfixTool_Text");
    this.ABi = new ToolWindowButtonItem_1.ToolWindowButtonItem(this.GetItem(1));
    var e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("PrefabTextItem_HotfixTool_clear_Text");
    this.ABi.SetText(e);
    this.ABi.BindCallback(this.xBi);
    var e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("SP_Tool_Clean");
    this.ABi.RefreshIcon(e, () => {
      this.ABi.SetIconVisible(true);
    });
    this.UBi = new ToolWindowButtonItem_1.ToolWindowButtonItem(this.GetItem(2));
    var e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("PrefabTextItem_HotfixTool_upload_Text");
    this.UBi.SetText(e);
    this.UBi.BindCallback(this.PBi);
    var e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("SP_Tool_Upload");
    this.UBi.RefreshIcon(e, () => {
      this.UBi.SetIconVisible(true);
    });
    this.Lic = new ToolWindowButtonItem_1.ToolWindowButtonItem(this.GetItem(3));
    var e = ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey("NetworkDetection_Title");
    this.Lic.SetText(e);
    this.Lic.BindCallback(this.wic);
    var e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("SP_IconNet");
    this.Lic.RefreshIcon(e, () => {
      this.Lic.SetIconVisible(true);
    });
    var e = ConfigManager_1.ConfigManager.MenuBaseConfig.GetMenuConfigByFunctionId(GameSettingsDefine_1.EFunction.Vulkan);
    var e = GameSettingsManager_1.GameSettingsManager.CheckConfigValidByCheckList(e)[0];
    this.GetItem(4).SetUIActive(e);
    if (e) {
      this.$8u = new ToolWindowButtonItem_1.ToolWindowButtonItem(this.GetItem(4));
      e = ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey("ToolsImageSet_Text");
      this.$8u.SetText(e);
      this.$8u.BindCallback(this.W8u);
      e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("SP_IconVulkan");
      this.$8u.RefreshIcon(e, () => {
        this.$8u.SetIconVisible(true);
      });
    }
  }
}
exports.ToolWindowView = ToolWindowView;
//# sourceMappingURL=ToolWindowView.js.map