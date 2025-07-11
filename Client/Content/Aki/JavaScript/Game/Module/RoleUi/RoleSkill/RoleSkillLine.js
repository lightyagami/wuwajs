"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleSkillLine = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class RoleSkillLine extends UiPanelBase_1.UiPanelBase {
  constructor(s, i, t, e) {
    super();
    this.CreateThenShowByActor(e.GetOwner());
    this.Rmo = e.GetAttachUIChild(0);
    this.Umo = e.GetAttachUIChild(1);
    this.Amo = e.GetAttachUIChild(2);
    this.StartPosId = s;
    this.EndPosId = i;
    this.SetColor(t);
  }
  SetColor(s) {
    if (this.Amo) {
      this.Amo.SetColor(UE.Color.FromHex(s));
    }
    if (this.Umo) {
      this.Umo.SetColor(UE.Color.FromHex(s));
    }
  }
  SetLineActive(s) {
    switch (s) {
      case 1:
        this.RootItem.SetUIActive(false);
        this.Amo.SetUIActive(false);
        break;
      case 2:
        this.RootItem.SetUIActive(true);
        this.Rmo.SetUIActive(true);
        this.Umo.SetUIActive(false);
        this.Amo.SetUIActive(false);
        break;
      case 3:
        this.RootItem.SetUIActive(true);
        this.Rmo.SetUIActive(false);
        this.Umo.SetUIActive(true);
        this.Amo.SetUIActive(true);
    }
  }
  OnBeforeDestroy() {
    this.StartPosId = undefined;
    this.EndPosId = undefined;
    this.Rmo = undefined;
    this.Umo = undefined;
    this.Amo = undefined;
  }
}
exports.RoleSkillLine = RoleSkillLine;
//# sourceMappingURL=RoleSkillLine.js.map