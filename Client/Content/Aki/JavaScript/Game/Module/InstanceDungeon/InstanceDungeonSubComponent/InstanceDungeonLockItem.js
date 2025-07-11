"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InstanceDungeonLockItem = undefined;
const ue_1 = require("ue");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
class InstanceDungeonLockItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, ue_1.UIText]];
  }
  RefreshItem(e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e.TextKey, ...e.Params);
  }
  SetLockText(e) {
    this.GetText(0).SetText(e);
  }
}
exports.InstanceDungeonLockItem = InstanceDungeonLockItem;
//# sourceMappingURL=InstanceDungeonLockItem.js.map