"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PersonalPlayerTitleMiniPreView = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const PlayerTitleItem_1 = require("../../Common/PlayerTitleItem");
class PersonalPlayerTitleMiniPreView extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.rhc = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    var e = this.GetItem(4);
    this.rhc = new PlayerTitleItem_1.PlayerTitleItem();
    this.rhc.SetIsPreview(true);
    await this.rhc.CreateThenShowByActorAsync(e.GetOwner());
  }
  RefreshView(e) {
    var r;
    if (e) {
      r = ModelManager_1.ModelManager.PersonalModel.GetSex();
      this.rhc.Refresh(e.PlayerTitleId, e.StarLevel, r);
    }
  }
}
exports.PersonalPlayerTitleMiniPreView = PersonalPlayerTitleMiniPreView;
//# sourceMappingURL=PersonalPlayerTitleMiniPreView.js.map