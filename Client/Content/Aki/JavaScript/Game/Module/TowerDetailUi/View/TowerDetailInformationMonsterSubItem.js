"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TowerDetailInformationMonsterSubItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class TowerDetailInformationMonsterSubItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super();
    this.SDo = 0;
    this.yDo = 0;
    this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UITexture], [3, UE.UIItem]];
  }
  OnStart() {}
  Update(e, t) {
    this.SDo = e;
    this.yDo = t;
    this.Og();
  }
  Og() {
    var e = ConfigManager_1.ConfigManager.MonsterInfoConfig.GetMonsterName(this.SDo);
    this.GetText(0).SetText(e);
    var e = this.yDo.toString();
    this.GetText(1).SetText(e);
    var e = ConfigManager_1.ConfigManager.MonsterInfoConfig.GetMonsterIcon(this.SDo);
    this.SetTextureByPath(e, this.GetTexture(2));
  }
}
exports.TowerDetailInformationMonsterSubItem = TowerDetailInformationMonsterSubItem;
//# sourceMappingURL=TowerDetailInformationMonsterSubItem.js.map