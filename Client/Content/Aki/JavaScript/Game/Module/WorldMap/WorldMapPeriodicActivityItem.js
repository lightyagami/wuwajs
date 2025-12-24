"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WorldMapPeriodicActivityItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiPanelBase_1 = require("../../Ui/Base/UiPanelBase");
class WorldMapPeriodicActivityItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.aPi = false;
    this.ShowMode = 1;
    this.krh = false;
    this.sMd = undefined;
    this.YP = () => {
      this.sMd?.();
    };
    this._am = () => {
      ModelManager_1.ModelManager.WorldMapModel.ActivityListData[0].OnClickCb();
      ModelManager_1.ModelManager.WorldMapModel.UpdateActivityListItemData(false);
      this.RefreshRedPoint();
    };
    this.RefreshWorldMapSelfShow = e => {
      if (e === 1) {
        this.RefreshView();
      } else {
        this.SetUiActive(false);
      }
    };
    this.SetWorldMapSelfShow = e => {
      this.ShowMode = e;
    };
  }
  async Init(e) {
    await this.CreateThenShowByActorAsync(e.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[7, UE.UISprite], [3, UE.UIButtonComponent], [2, UE.UIButtonComponent], [1, UE.UIText], [9, UE.UIItem]];
    this.BtnBindInfo = [[3, this._am], [2, this.YP]];
  }
  SetShowState(e) {
    this.aPi = e;
  }
  GetCurrentShowState() {
    return this.aPi;
  }
  Refresh(e) {
    this.krh = e;
    this.RefreshView();
  }
  SetOnClickBtnCb(e) {
    this.sMd = e;
  }
  RefreshView() {
    var e = ModelManager_1.ModelManager.WorldMapModel.ActivityListData;
    if (e.length === 0) {
      this.GetRootItem().SetUIActive(false);
    } else {
      if (this.krh) {
        this.GetRootItem().SetUIActive(true);
      } else {
        this.GetRootItem().SetUIActive(false);
      }
      e = e[0];
      this.GetText(1).SetText(e.CurrentNum + "/" + e.TotalNum);
      e = ConfigManager_1.ConfigManager.MapConfig.GetMapPeriodicActivityConfig(e.Id);
      this.SetSpriteByPath(e.IconPath, this.GetSprite(7), false);
      this.RefreshRedPoint();
    }
  }
  RefreshRedPoint() {
    this.GetItem(9).SetUIActive(ModelManager_1.ModelManager.WorldMapModel.ActivityListData.some(e => e.RedPoint));
  }
}
exports.WorldMapPeriodicActivityItem = WorldMapPeriodicActivityItem;
//# sourceMappingURL=WorldMapPeriodicActivityItem.js.map