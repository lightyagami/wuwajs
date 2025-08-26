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
    this.hwu = false;
    this.lwu = undefined;
    this._wu = () => {
      this.hwu = !this.hwu;
      LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.CustomizedThumbnailShow, this.hwu);
      this.GetItem(1)?.SetUIActive(this.hwu);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIItem]];
    this.BtnBindInfo = [[0, this._wu]];
  }
  async Initialize(e, i) {
    await this.CreateThenShowByActorAsync(e.GetOwner());
    this.lwu = new UnderseaExperimentFieldPanel_1.UnderseaExperimentFieldPanel();
    await this.lwu.Initialize(this.GetItem(1), i);
    this.hwu = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.CustomizedThumbnailShow) ?? true;
    this.GetExtendToggle(0).SetToggleState(this.hwu ? 1 : 0);
    this.GetItem(1).SetUIActive(this.hwu);
  }
}
exports.UnderseaOverviewItem = UnderseaOverviewItem;
//# sourceMappingURL=UnderseaOverviewItem.js.map