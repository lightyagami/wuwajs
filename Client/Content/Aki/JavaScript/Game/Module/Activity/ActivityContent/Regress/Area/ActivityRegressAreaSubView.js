"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityRegressAreaSubView = undefined;
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const ActivityRegressDefine_1 = require("../ActivityRegressDefine");
const ActivityRegressMainSubViewBase_1 = require("../Base/ActivityRegressMainSubViewBase");
const ActivityRegressTabGroupPanel_1 = require("../Panels/ActivityRegressTabGroupPanel");
const ActivityRegressAreaActivityInfoPanel_1 = require("./ActivityRegressAreaActivityInfoPanel");
class ActivityRegressAreaSubView extends ActivityRegressMainSubViewBase_1.ActivityRegressMainSubViewBase {
  constructor() {
    super(...arguments);
    this.r_1 = undefined;
    this.o_1 = undefined;
    this.Gda = undefined;
    this.Wwn = e => {
      e = this.Gda[e].Config;
      this.o_1.RefreshByData(e);
      this.SequencePlayer.PlaySequence("Start");
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = ActivityRegressDefine_1.activityRegressMainViewComponentsInfo;
  }
  async OnBeforeStartAsync() {
    var e = this.GetItem(6).GetOwner();
    this.o_1 = new ActivityRegressAreaActivityInfoPanel_1.ActivityRegressAreaActivityInfoPanel();
    await this.o_1.CreateThenShowByActorAsync(e);
  }
  OnStart() {
    super.OnStart();
    var e = this.GetHorizontalLayout(0);
    var i = this.GetItem(5);
    this.r_1 = new ActivityRegressTabGroupPanel_1.ActivityRegressTabGroupPanel(e, i, this.Wwn);
    this.r_1.Init();
    this.GetItem(3).SetUIActive(false);
  }
  OnBeforeDestroy() {
    this.r_1.Destroy();
    this.r_1 = undefined;
  }
  OnUpdate(e) {
    var i = ModelManager_1.ModelManager.ActivityRegressModel.GetLastestRegressBaseConfigList(2);
    this.Gda = [];
    i.forEach(e => {
      var i = new ActivityRegressDefine_1.ActivityRegressTabSwitchItemCommonData();
      i.RecallEntryType = 2;
      i.Config = e;
      i.Title = e.Title;
      this.Gda.push(i);
    });
    this.GetItem(7).SetUIActive(this.Gda.length > 1);
    this.r_1.RefreshByData(this.Gda, e);
  }
}
exports.ActivityRegressAreaSubView = ActivityRegressAreaSubView;
//# sourceMappingURL=ActivityRegressAreaSubView.js.map