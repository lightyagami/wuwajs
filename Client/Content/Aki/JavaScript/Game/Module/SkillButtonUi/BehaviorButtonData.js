"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BehaviorButtonData = undefined;
const InputEnums_1 = require("../../Input/InputEnums");
const ModelManager_1 = require("../../Manager/ModelManager");
const visibleTagMap = new Map([[101, 852227396]]);
const hiddenTagMap = new Map([[101, [-1987419794, 855966206, 504239013, -1254507003]], [102, [729920684, -1254507003]]]);
class BehaviorButtonData {
  constructor() {
    this.ButtonType = 0;
    this.ActionName = "";
    this.InputAction = InputEnums_1.EInputAction.None;
    this.IsEnable = false;
    this.IsVisible = false;
    this.State = 0;
    this.SkillIconPathList = undefined;
    this.VisibleTagId = 0;
    this.HiddenTagIds = [];
  }
  Refresh(t, s, i, e) {
    this.ButtonType = t;
    this.ActionName = InputEnums_1.EInputAction[s];
    this.InputAction = s;
    this.IsEnable = true;
    this.IsVisible = true;
    this.State = 0;
    this.HiddenTagIds = hiddenTagMap.get(t);
    this.VisibleTagId = visibleTagMap.get(t) ?? 0;
    this.SkillIconPathList = ModelManager_1.ModelManager.SkillButtonUiModel.BehaviorIconPathMap.get(t);
    if (i) {
      this.RefreshIsVisible(i, e);
    }
  }
  RefreshIsVisible(t, s) {
    if (this.VisibleTagId !== 0 && this.mSo(t, this.VisibleTagId)) {
      this.IsVisible = true;
    } else if (this.ButtonType !== 101 || s?.IsAim) {
      for (const i of this.HiddenTagIds) {
        if (this.mSo(t, i)) {
          this.IsVisible = false;
          return;
        }
      }
      this.IsVisible = true;
    } else {
      this.IsVisible = false;
    }
  }
  mSo(t, s) {
    return !!t && t.HasTag(s);
  }
}
exports.BehaviorButtonData = BehaviorButtonData;
//# sourceMappingURL=BehaviorButtonData.js.map