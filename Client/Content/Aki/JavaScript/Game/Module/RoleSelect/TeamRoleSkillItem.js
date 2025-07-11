"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TeamRoleSkillItem = exports.TeamRoleSkillData = undefined;
const UE = require("ue");
const GridProxyAbstract_1 = require("../Util/Grid/GridProxyAbstract");
class TeamRoleSkillData {
  constructor() {
    this.SkillIcon = "";
    this.SkillType = 0;
    this.SkillTypeText = "";
    this.SkillName = "";
    this.SkillTagList = undefined;
    this.ShowSkillToggle = true;
    this.SkillDesc = "";
    this.SkillDescNum = [];
    this.MultiSkillDesc = "";
    this.MultiSkillDescNum = [];
    this.SkillResume = "";
    this.SkillResumeNum = [];
  }
}
exports.TeamRoleSkillData = TeamRoleSkillData;
class TeamRoleSkillItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.Callback = undefined;
  }
  OnStart() {
    this.GetExtendToggle(1).OnStateChange.Add(t => {
      if (this.Pe) {
        this.Callback?.(t, this.Pe);
      }
    });
  }
  OnBeforeDestroy() {
    this.GetExtendToggle(1).OnStateChange.Clear();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIExtendToggle]];
  }
  OnSelected(t) {
    this.GetExtendToggle(1).SetToggleStateForce(1, false);
  }
  OnDeselected(t) {
    this.GetExtendToggle(1).SetToggleState(0, false);
  }
  Refresh(t, s, e) {
    this.Pe = t;
    this.SetSpriteByPath(t.SkillIcon, this.GetSprite(0), false);
  }
  BindOnSkillStateChange(t) {
    this.Callback = t;
  }
}
exports.TeamRoleSkillItem = TeamRoleSkillItem;
//# sourceMappingURL=TeamRoleSkillItem.js.map