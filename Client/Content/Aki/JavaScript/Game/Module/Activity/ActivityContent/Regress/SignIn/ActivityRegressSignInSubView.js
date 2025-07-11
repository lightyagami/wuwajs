"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityRegressSignInSubView = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const ActivityRegressMainSubViewBase_1 = require("../Base/ActivityRegressMainSubViewBase");
const ActivityRegressSignPanel_1 = require("./ActivityRegressSignPanel");
class ActivityRegressSignInSubView extends ActivityRegressMainSubViewBase_1.ActivityRegressMainSubViewBase {
  constructor() {
    super(...arguments);
    this.nCa = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.nCa = new ActivityRegressSignPanel_1.ActivityRegressSignPanel();
    await this.nCa.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
  }
  OnAfterShow() {
    ModelManager_1.ModelManager.ActivityRegressModel.SetSignFirstShowTime();
  }
  OnUpdate() {
    this.nCa.RefreshView();
    var e = ModelManager_1.ModelManager.ActivityRegressModel.Grade;
    this.GetItem(1).SetUIActive(e === 1);
    this.GetItem(2).SetUIActive(e === 2);
  }
}
exports.ActivityRegressSignInSubView = ActivityRegressSignInSubView;
//# sourceMappingURL=ActivityRegressSignInSubView.js.map