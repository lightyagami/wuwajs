"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapRogueTitleItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class MapRogueTitleItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.CheckCanBtnClick = undefined;
    this.eje = () => {
      if (!this.CheckCanBtnClick || !!this.CheckCanBtnClick()) {
        ControllerHolder_1.ControllerHolder.MapRogueController.OpenExplore();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[1, UE.UIText], [2, UE.UIText], [0, UE.UIButtonComponent]];
    this.BtnBindInfo = [[0, this.eje]];
  }
  OnStart() {
    var e;
    var r = ModelManager_1.ModelManager.MapRogueModel.GameInfo;
    if (r &&= ConfigManager_1.ConfigManager.MapRogueConfig.GetInsGridConfigByInstId(r.InstanceId)) {
      e = this.GetText(1);
      LguiUtil_1.LguiUtil.SetLocalTextNew(e, r.Title);
      this.RefreshProgress();
    }
  }
  RefreshProgress() {
    var e = ModelManager_1.ModelManager.MapRogueModel.GameInfo;
    if (e) {
      e = e.ExplorationCurrentProgress();
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), "RogueResExplore_3", e);
    }
  }
}
exports.MapRogueTitleItem = MapRogueTitleItem;
//# sourceMappingURL=MapRogueTitleItem.js.map