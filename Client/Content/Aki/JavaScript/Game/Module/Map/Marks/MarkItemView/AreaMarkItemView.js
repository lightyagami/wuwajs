"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AreaMarkItemView = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const AreaByDeliveryMarkId_1 = require("../../../../../Core/Define/ConfigQuery/AreaByDeliveryMarkId");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ConfigMarkItemView_1 = require("./ConfigMarkItemView");
const LEVEL_TWO_SIZE = 48;
const LEVEL_TREE_SIZE = 36;
class AreaMarkItemView extends ConfigMarkItemView_1.ConfigMarkItemView {
  constructor(e) {
    super(e);
  }
  OnViewRefresh() {
    this.SetNameText();
  }
  SetNameText() {
    var t = AreaByDeliveryMarkId_1.configAreaByDeliveryMarkId.GetConfig(this.Holder.MarkId);
    if (t) {
      var a = ModelManager_1.ModelManager.ExploreProgressModel.GetExploreAreaData(t.AreaId);
      var o = this.Holder.MarkConfig.MarkTitle;
      let e = LEVEL_TREE_SIZE;
      let r = "";
      let i = "SmallAreaName";
      if (t.Level === 2 && !t.IsDisableInExplore) {
        t = a?.GetProgress()?.toString() ?? "0";
        r = a?.IsReachMaxProgress ? StringUtils_1.StringUtils.Format("<color=#ffd12f>{0}%</color>", t) : StringUtils_1.StringUtils.Format("{0}%", t);
        e = LEVEL_TWO_SIZE;
        i = "BigAreaName";
      }
      this.MarkItemNameHandle.SetName({
        FormatStr: i,
        Name: o,
        Progress: r,
        FontSize: e
      });
      this.MarkItemNameHandle.SetVisible(true);
    } else {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Map", 63, "缺少区域配置", ["标记id", this.Holder.MarkId.toString()]);
      }
      this.MarkItemNameHandle.SetVisible(false);
    }
  }
  GetInteractiveFlag() {
    return false;
  }
}
exports.AreaMarkItemView = AreaMarkItemView;
//# sourceMappingURL=AreaMarkItemView.js.map