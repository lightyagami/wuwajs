"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NavigationRoleSkillTreeToggle = undefined;
const StringUtils_1 = require("../../../../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../../Common/Event/EventSystem");
const NavigationToggle_1 = require("../../NavigationToggle");
class NavigationRoleSkillTreeToggle extends NavigationToggle_1.NavigationToggle {
  constructor() {
    super(...arguments);
    this.EBo = false;
    this.SBo = () => {
      var e = this.Selectable;
      if (e.GetToggleState() === 1) {
        this.EBo = true;
      }
      e.bToggleOnSelect = false;
    };
  }
  OnInit() {
    super.OnInit();
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SelectRoleTabOutside, this.SBo);
  }
  OnClear() {
    super.OnClear();
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SelectRoleTabOutside, this.SBo);
  }
  OnToggleClick() {
    var e = this.PanelHandle;
    if (StringUtils_1.StringUtils.IsBlank(e.GroupName)) {
      e.SetToggleSelectByGroupName(this.Listener.GroupName);
    }
  }
  OnHandlePointerSelectInheritance(e) {
    return !this.EBo || (this.EBo = false);
  }
  OnCheckFindNavigationBefore() {
    return !this.PanelHandle.IsInPreview;
  }
}
exports.NavigationRoleSkillTreeToggle = NavigationRoleSkillTreeToggle;
//# sourceMappingURL=NavigationRoleSkillTreeToggle.js.map