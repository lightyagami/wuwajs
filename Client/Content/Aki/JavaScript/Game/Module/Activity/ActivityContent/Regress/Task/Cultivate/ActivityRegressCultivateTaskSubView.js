"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityRegressRoleCultivateSubView = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const LguiUtil_1 = require("../../../../../Util/LguiUtil");
const LoopScrollView_1 = require("../../../../../Util/ScrollView/LoopScrollView");
const ActivityRegressTaskSubViewBase_1 = require("../ActivityRegressTaskSubViewBase");
const ActivityRegressCultivateTaskSubViewLoopItem_1 = require("./ActivityRegressCultivateTaskSubViewLoopItem");
class ActivityRegressRoleCultivateSubView extends ActivityRegressTaskSubViewBase_1.ActivityRegressTaskSubViewBase {
  constructor() {
    super(...arguments);
    this.vVt = undefined;
    this.I2i = () => {
      return new ActivityRegressCultivateTaskSubViewLoopItem_1.ActivityRegressCultivateTaskSubViewLoopItem();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UILoopScrollViewComponent], [2, UE.UIItem]];
  }
  OnStart() {
    this.vVt = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(1), this.GetItem(2).GetOwner(), this.I2i);
  }
  OnBeforeShow() {
    this.Og();
  }
  OnUpdate() {
    this.Og();
  }
  Og() {
    var e = ModelManager_1.ModelManager.ActivityRegressModel.GetRegressCultivateLoopSvDataList();
    this.vVt.RefreshByData(e, false, undefined, true);
    var t = ModelManager_1.ModelManager.ActivityRegressModel.CalculateRegressCultivateReachTaskCount(e);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), "PrefabTextItem_4217661232_Text", t + "/" + e.length);
  }
  OnBeforeDestroy() {
    this.vVt?.ClearGridProxies();
  }
}
exports.ActivityRegressRoleCultivateSubView = ActivityRegressRoleCultivateSubView;
//# sourceMappingURL=ActivityRegressCultivateTaskSubView.js.map