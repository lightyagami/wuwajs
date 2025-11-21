"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdvanceNoticeMultiGridItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const AdvanceNoticeGridItem_1 = require("./AdvanceNoticeGridItem");
class AdvanceNoticeMultiGridItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super();
    this.AdvertisingPageInfoId = e;
    this.mGo = [];
    this.AnimControllerComponent = undefined;
  }
  OnRegisterComponent() {
    for (let e = 0; e < this.GetGridCount(); e++) {
      this.ComponentRegisterInfos.push([e, UE.UIItem]);
    }
  }
  async OnBeforeStartAsync() {
    this.AnimControllerComponent = this.RootItem.GetOwner().GetComponentByClass(UE.UIInturnAnimController.StaticClass());
    var t = [];
    var i = ConfigManager_1.ConfigManager.AdvanceNoticeConfig.GetAdvertisingPageInfoById(this.AdvertisingPageInfoId).TabIdArray;
    var r = i.length;
    for (let e = 0; e < r; e++) {
      var s = new AdvanceNoticeGridItem_1.AdvanceNoticeGridItem(this.AdvertisingPageInfoId);
      this.mGo.push(s);
      t.push(s.CreateThenShowByActorAsync(this.GetItem(e).GetOwner()));
    }
    await Promise.all(t);
    for (let e = 0; e < r; e++) {
      this.mGo[e].RefreshByTabId(i[e]);
    }
  }
  GetGridCount() {
    return ConfigManager_1.ConfigManager.AdvanceNoticeConfig.GetAdvertisingPageInfoById(this.AdvertisingPageInfoId).TabIdArray.length;
  }
  PlayAnim() {
    this.AnimControllerComponent?.Play();
  }
}
exports.AdvanceNoticeMultiGridItem = AdvanceNoticeMultiGridItem;
//# sourceMappingURL=AdvanceNoticeMultiGridItem.js.map