"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InstanceDungeonRankTimeItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
class InstanceDungeonRankTimeItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.ItemModel = undefined;
  }
  OnRegisterComponent() {
    this.ItemModel = this.OpenParam;
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIText]];
    this.BtnBindInfo = [[0, this.ItemModel.ButtonClick]];
  }
  Refresh() {
    var e = this.ItemModel.GetContent();
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e.TextKey, ...e.Params);
    this.GetButton(0).RootUIComp.SetUIActive(true);
  }
}
exports.InstanceDungeonRankTimeItem = InstanceDungeonRankTimeItem;
//# sourceMappingURL=InstanceDungeonRankTimeItem.js.map