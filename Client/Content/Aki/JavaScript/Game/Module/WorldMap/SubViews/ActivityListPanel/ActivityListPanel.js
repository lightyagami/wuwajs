"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityListPanel = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem");
const GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew");
const WorldMapSecondaryUi_1 = require("../../ViewComponent/WorldMapSecondaryUi");
const ActivityListItem_1 = require("./ActivityListItem");
class ActivityListPanel extends WorldMapSecondaryUi_1.WorldMapSecondaryUi {
  constructor() {
    super(...arguments);
    this.zJa = new PopupCaptionItem_1.PopupCaptionItem();
    this.xqe = undefined;
    this.Avd = () => {
      ModelManager_1.ModelManager.WorldMapModel.UpdateActivityListItemData();
      this.xqe?.RefreshByDataAsync(this.wja());
    };
  }
  GetResourceId() {
    return "UiView_CyclesActivitiesAssistant";
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIScrollViewWithScrollbarComponent], [2, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.xqe = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(1), () => new ActivityListItem_1.ActivityListItem());
    await Promise.all([this.xqe.RefreshByDataAsync(this.wja(), true), this.zJa.CreateThenShowByActorAsync(this.GetItem(0).GetOwner())]);
  }
  OnStart() {
    this.zJa.SetCloseCallBack(this.Close);
    this.zJa.SetHelpBtnActive(false);
  }
  OnShowWorldMapSecondaryUi() {
    this.Avd();
  }
  wja() {
    return ModelManager_1.ModelManager.WorldMapModel.ActivityListData.map(e => ({
      Data: e,
      OnclickCb: this.Avd
    })).filter(e => e !== undefined);
  }
}
exports.ActivityListPanel = ActivityListPanel;
//# sourceMappingURL=ActivityListPanel.js.map