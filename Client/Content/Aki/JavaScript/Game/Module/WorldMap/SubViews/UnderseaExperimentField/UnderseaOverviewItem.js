"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnderseaOverviewItem = undefined;
const UE = require("ue");
const LocalStorage_1 = require("../../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../../Common/LocalStorageDefine");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const UnderseaExperimentFieldPanel_1 = require("./UnderseaExperimentFieldPanel");
class UnderseaOverviewItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.iwu = false;
    this.rwu = undefined;
    this.owu = () => {
      this.iwu = !this.iwu;
      LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.CustomizedThumbnailShow, this.iwu);
      this.GetItem(1)?.SetUIActive(this.iwu);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIItem]];
    this.BtnBindInfo = [[0, this.owu]];
  }
  async Initialize(e, i) {
    await this.CreateThenShowByActorAsync(e.GetOwner());
    this.rwu = new UnderseaExperimentFieldPanel_1.UnderseaExperimentFieldPanel();
    await this.rwu.Initialize(this.GetItem(1), i);
    this.iwu = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.CustomizedThumbnailShow) ?? true;
    this.GetExtendToggle(0).SetToggleState(this.iwu ? 1 : 0);
    this.GetItem(1).SetUIActive(this.iwu);
  }
}
exports.UnderseaOverviewItem = UnderseaOverviewItem;
//# sourceMappingURL=UnderseaOverviewItem.js.map