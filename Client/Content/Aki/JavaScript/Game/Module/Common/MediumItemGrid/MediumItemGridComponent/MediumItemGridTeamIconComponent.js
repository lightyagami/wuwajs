"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MediumItemGridTeamIconComponent = undefined;
const MediumItemGridComponent_1 = require("./MediumItemGridComponent");
class MediumItemGridTeamIconComponent extends MediumItemGridComponent_1.MediumItemGridComponent {
  GetResourceId() {
    return "UiItem_ItemTeam";
  }
  OnRefresh(e) {
    if (e !== undefined && e) {
      this.SetActive(true);
    } else {
      this.SetActive(false);
    }
  }
}
exports.MediumItemGridTeamIconComponent = MediumItemGridTeamIconComponent;
//# sourceMappingURL=MediumItemGridTeamIconComponent.js.map