"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TowerDetailInformationBuffSubItem = undefined;
const UE = require("ue");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class TowerDetailInformationBuffSubItem extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super();
    this.Pe = undefined;
    this.CreateThenShowByActor(t.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIText], [2, UE.UIText]];
  }
  Update(t) {
    this.Pe = t;
    this.Og();
  }
  Og() {
    var t = this.Pe.Desc;
    this.GetText(2).SetText(t);
    var t = this.Pe.Name;
    this.GetText(1).SetText(t);
    var t = this.Pe.IconPath;
    if (t === "" || t === undefined) {
      if (StringUtils_1.StringUtils.IsEmpty(t)) {
        this.GetTexture(0).SetUIActive(false);
      } else {
        this.SetTextureByPath(t, this.GetTexture(0));
        this.GetTexture(0).SetUIActive(true);
      }
    }
  }
}
exports.TowerDetailInformationBuffSubItem = TowerDetailInformationBuffSubItem;
//# sourceMappingURL=TowerDetailInformationBuffSubItem.js.map