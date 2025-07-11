"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExploreProgressView = undefined;
const UE = require("ue");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const LguiUtil_1 = require("../../Util/LguiUtil");
const GenericScrollView_1 = require("../../Util/ScrollView/GenericScrollView");
class ExploreProgressView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.D2o = undefined;
    this.R2o = (e, i, r) => {
      i = new ExploreProgressItem(i);
      i.Update(e);
      return {
        Key: r,
        Value: i
      };
    };
    this.m2e = () => {
      UiManager_1.UiManager.CloseView("ExploreProgressView");
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIText], [2, UE.UIText], [3, UE.UIScrollViewWithScrollbarComponent]];
    this.BtnBindInfo = [[0, this.m2e]];
  }
  OnStart() {
    this.D2o = new GenericScrollView_1.GenericScrollView(this.GetScrollViewWithScrollbar(3), this.R2o);
  }
  OnBeforeDestroy() {
    if (this.D2o) {
      this.D2o.ClearChildren();
      this.D2o = undefined;
    }
  }
  OnAfterShow() {
    var e = ModelManager_1.ModelManager.WorldMapModel.GetAreaExploreInfo();
    var i = ConfigManager_1.ConfigManager.AreaConfig.GetAreaInfo(e.AreaId);
    var i = ConfigManager_1.ConfigManager.AreaConfig.GetAreaLocalName(i.Title);
    this.GetText(1).SetText(i);
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(2), "ExplorationDegree", e.ExplorePercent);
    var i = ModelManager_1.ModelManager.WorldMapModel.GetAreaExploreInfo();
    this.D2o.RefreshByData(i.ExploreProgress);
  }
}
exports.ExploreProgressView = ExploreProgressView;
const ONEHUNDRED = 100;
class ExploreProgressItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super();
    this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UISprite]];
  }
  Update(e) {
    var i = ConfigManager_1.ConfigManager.WorldMapConfig.GetExploreProgressInfoById(e.ExploreProgressId);
    var i = ConfigManager_1.ConfigManager.ExploreProgressConfig.GetExploreTypeByType(i.ExploreType);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), i.Name);
    let r = 0;
    if (e.ExplorePercent) {
      r = e.ExplorePercent;
    }
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(1), "ExplorationDegree", r);
    i = MathUtils_1.MathUtils.GetFloatPointFloor(MathUtils_1.MathUtils.SafeDivide(r, ONEHUNDRED), 2);
    this.GetSprite(2).SetFillAmount(i);
  }
}
//# sourceMappingURL=ExploreInfoView.js.map