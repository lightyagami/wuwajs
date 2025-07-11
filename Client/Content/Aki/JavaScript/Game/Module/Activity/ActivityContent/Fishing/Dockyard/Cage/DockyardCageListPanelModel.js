"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DockyardCageListPanelModel = undefined;
const TimeUtil_1 = require("../../../../../../Common/TimeUtil");
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const ScrollingTipsController_1 = require("../../../../../ScrollingTips/ScrollingTipsController");
const FishingDefine_1 = require("../../FishingDefine");
const DockyardItemListPanelModel_1 = require("../List/DockyardItemListPanelModel");
class DockyardCageListPanelModel extends DockyardItemListPanelModel_1.DockyardItemListPanelModel {
  constructor() {
    super(...arguments);
    this.Mne = 0;
    this.$Xt = 0;
  }
  OnInit() {
    this.ComponentData.TitleText = "Fishing_CageText3";
    this.ComponentData.HelpBtnId = FishingDefine_1.CAGE_LIST_HELPID;
    var e = ModelManager_1.ModelManager.FishingModel.GetCageDataByConfigId(this.Mne);
    this.$Xt = e ? e.Data.zT_ : 0;
    this.ComponentData.GetCountText = () => this.ShowItemList.length + "/" + this.$Xt;
    var e = this.GetShowItemList();
    if (e.length < this.$Xt) {
      e = (ModelManager_1.ModelManager.FishingModel.GetShipCageNextHarvestTimeStamp(this.Mne) - TimeUtil_1.TimeUtil.GetServerTimeStamp()) / TimeUtil_1.TimeUtil.InverseMillisecond;
      e = TimeUtil_1.TimeUtil.GetRemainTimeDataFormat4(e).CountDownText;
      this.ComponentData.TimeText = e;
    }
  }
  Init(e) {
    this.Mne = e;
  }
  GetShowItemList() {
    return ModelManager_1.ModelManager.FishingModel.GetCageDataList(this.Mne);
  }
  CheckOtherCanDragCondition(e) {
    var i;
    return !!this.CheckSelectedInList() || (i = this.ShowItemList.length < this.$Xt, e && !i && ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("Fishing_CageFull"), i);
  }
}
exports.DockyardCageListPanelModel = DockyardCageListPanelModel;
//# sourceMappingURL=DockyardCageListPanelModel.js.map