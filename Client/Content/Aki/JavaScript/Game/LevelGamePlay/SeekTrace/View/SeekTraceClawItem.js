"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SeekTraceClawItem = undefined;
const UE = require("ue");
const IAction_1 = require("../../../../UniverseEditor/Interface/IAction");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class SeekTraceClawItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UITexture], [2, UE.UITexture], [3, UE.UITexture]];
  }
  OnBeforeShow() {
    let e = "TraceClawType3Icon";
    let a = "TraceClawType3Bg";
    switch (ModelManager_1.ModelManager.SeekTraceModel.IconType) {
      case IAction_1.ETraceTracingImageType.Type1:
        e = "TraceClawType1Icon";
        a = "TraceClawType1Bg";
        break;
      case IAction_1.ETraceTracingImageType.Type2:
        e = "TraceClawType2Icon";
        a = "TraceClawType2Bg";
    }
    this.SetTextureByPath(ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e), this.GetTexture(2));
    this.SetTextureByPath(ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(a), this.GetTexture(3));
  }
}
exports.SeekTraceClawItem = SeekTraceClawItem;
//# sourceMappingURL=SeekTraceClawItem.js.map