"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchGamePlayExplainView = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
class FloroRanchGamePlayExplainView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.XTt = () => {
      this.CloseMe();
    };
    this.AMo = () => {
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIButtonComponent], [2, UE.UIItem], [3, UE.UIText], [4, UE.UIText], [5, UE.UIText], [6, UE.UIText], [7, UE.UIItem]];
    this.BtnBindInfo = [[0, this.XTt], [1, this.AMo]];
  }
  OnBeforeShow() {
    var e = ModelManager_1.ModelManager.FloroRanchGamePlayModel.SubInstanceId;
    var e = ModelManager_1.ModelManager.FloroRanchModel.GetActivityData().GetFloroRanchSubDungeonData(e);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), "Farm_DungeonTarget", e.GetMaxStage(), e.GetStageDay());
    this.GetText(4)?.SetText(e.FirstReward.toString());
    this.GetText(5)?.SetText(e.AgainReward.toString());
    this.GetItem(7)?.SetUIActive(e.AgainReward !== 0);
    var e = ConfigManager_1.ConfigManager.FloroRanchConfig.GetFloroRanchTagConfig(e.TagId);
    if (e) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), e.Name);
    }
  }
  OnStart() {
    this.V2u();
  }
  OnBeforeDestroy() {
    this.j2u();
  }
  V2u() {
    var e = {
      UiText: this.GetText(6),
      ViewType: 0,
      ReportType: 8,
      Style: 2
    };
    ControllerHolder_1.ControllerHolder.TermExplanationController.RegisterTextHyperlinkByParam(e);
  }
  j2u() {
    ControllerHolder_1.ControllerHolder.TermExplanationController.UnRegisterTextHyperlink(this.GetText(6));
  }
}
exports.FloroRanchGamePlayExplainView = FloroRanchGamePlayExplainView;
//# sourceMappingURL=FloroRanchGamePlayExplainView.js.map