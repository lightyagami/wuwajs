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
    super();
    this.aPi = false;
    this.Gvd = () => {};
    this.YP = () => {
      this.Gvd?.();
    };
    this.b$d = () => {
      ModelManager_1.ModelManager.WorldMapModel.ActivityListData[0].OnClickCb();
      ModelManager_1.ModelManager.WorldMapModel.UpdateActivityListItemData(false);
      this.RefreshRedPoint();
    };
  }
  async Init(e) {
    await this.CreateThenShowByActorAsync(e.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[7, UE.UISprite], [3, UE.UIButtonComponent], [2, UE.UIButtonComponent], [1, UE.UIText], [9, UE.UIItem]];
    this.BtnBindInfo = [[3, this.b$d], [2, this.YP]];
  }
  SetShowState(e) {
    this.aPi = e;
  }
  GetCurrentShowState() {
    return this.aPi;
  }
  Refresh(e, t) {
    this.Gvd = t;
    this.RefreshView(e);
    this.RefreshRedPoint();
  }
  RefreshView(e) {
    var t = ModelManager_1.ModelManager.WorldMapModel.ActivityListData;
    if (t.length === 0) {
      this.GetRootItem().SetUIActive(false);
    } else {
      if (e) {
        this.GetRootItem().SetUIActive(true);
      } else {
        this.GetRootItem().SetUIActive(false);
      }
      e = t[0];
      this.GetText(1).SetText(e.CurrentNum + "/" + e.TotalNum);
      t = ConfigManager_1.ConfigManager.MapConfig.GetMapPeriodicActivityConfig(e.Id);
      this.SetSpriteByPath(t.IconPath, this.GetSprite(7), false);
      this.RefreshRedPoint();
    }
  }
  RefreshRedPoint() {
    this.GetItem(9).SetUIActive(ModelManager_1.ModelManager.WorldMapModel.ActivityListData.some(e => e.RedPoint));
  }
}
exports.WorldMapPeriodicActivityItem = WorldMapPeriodicActivityItem;
//# sourceMappingURL=WorldMapPeriodicActivityItem.js.map