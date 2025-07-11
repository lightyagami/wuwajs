"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleSkillPanelHandle = undefined;
const SpecialPanelHandleBase_1 = require("./SpecialPanelHandleBase");
const ModelManager_1 = require("../../../../Manager/ModelManager");
class RoleSkillPanelHandle extends SpecialPanelHandleBase_1.SpecialPanelHandleBase {
  constructor() {
    super(...arguments);
    this.GroupName = "";
    this.IsInPreview = false;
  }
  SetToggleSelectByGroupName(e) {
    var a = this.GetNavigationGroup(e);
    if (a) {
      this.GroupName = e;
      for (let e = 0, l = a.ListenerList.length; e < l; ++e) {
        a.ListenerList[e].GetBehaviorComponent().bToggleOnSelect = true;
      }
    }
  }
  ResetToggleSelect() {
    var a = this.GetNavigationGroup(this.GroupName);
    if (a) {
      this.GroupName = "";
      for (let e = 0, l = a.ListenerList.length; e < l; ++e) {
        a.ListenerList[e].GetBehaviorComponent().bToggleOnSelect = false;
      }
    }
  }
  SetSkillTreeToggleCursorActive(a) {
    var t = this.GetNavigationGroup(this.GroupName);
    if (t) {
      for (let e = 0, l = t.ListenerList.length; e < l; ++e) {
        t.ListenerList[e].Cursor.Switch = a;
      }
      ModelManager_1.ModelManager.UiNavigationModel.RefreshCursorActive();
    }
  }
}
exports.RoleSkillPanelHandle = RoleSkillPanelHandle;
//# sourceMappingURL=RoleSkillPanelHandle.js.map