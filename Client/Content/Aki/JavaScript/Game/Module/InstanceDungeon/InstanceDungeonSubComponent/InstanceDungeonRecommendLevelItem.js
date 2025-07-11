"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InstanceDungeonRecommendLevelItem = undefined;
const ue_1 = require("ue");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
class InstanceDungeonRecommendLevelItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Uth = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, ue_1.UIText]];
  }
  OnStart() {
    if (this.Uth) {
      this.RefreshItem(this.Uth.Level);
    }
  }
  RefreshItem(e) {
    if (this.InAsyncLoading()) {
      this.Uth = {
        Level: e
      };
    } else {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e.TextId, e.Level);
    }
  }
}
exports.InstanceDungeonRecommendLevelItem = InstanceDungeonRecommendLevelItem;
//# sourceMappingURL=InstanceDungeonRecommendLevelItem.js.map