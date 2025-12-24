"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityPreWarmCollectItem = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class ActivityPreWarmCollectItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.xe = 0;
    this.Smm = undefined;
    this.Mmm = undefined;
    this.Wvt = () => {
      if (this.xe !== undefined && this.Smm !== undefined) {
        this.Smm(this.xe);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UISprite], [2, UE.UISprite], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UISprite]];
    this.BtnBindInfo = [[0, this.Wvt]];
  }
  SetSelectCallBack(e, t) {
    this.xe = t;
    this.Smm = e;
  }
  Refresh() {
    this.Mmm?.SetUIActive(false);
    this.GetSprite(2)?.SetUIActive(false);
    var e = ModelManager_1.ModelManager.ActivityPreWarmModel?.GetCollectItemDataById(this.xe);
    switch (e?.GetQuestState()) {
      case 0:
      case 1:
        this.Mmm = this.GetItem(3);
        break;
      case 2:
        this.Mmm = this.GetItem(4);
        this.TrySetSpriteByPath(e?.GetShadowItemIconPath(), this.GetSprite(6), false);
        break;
      case 3:
        this.Mmm = this.GetItem(5);
        this.GetSprite(2)?.SetUIActive(true);
        this.TrySetSpriteByPath(e?.GetItemIconPath(), this.GetSprite(2), false);
    }
    this.Mmm?.SetUIActive(true);
  }
  SetToggleState(e, t = false) {
    this.GetExtendToggle(0).SetToggleState(e, t);
  }
}
exports.ActivityPreWarmCollectItem = ActivityPreWarmCollectItem;
//# sourceMappingURL=ActivityPreWarmCollectItem.js.map