"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivitySubViewRoadBook = undefined;
const UE = require("ue");
const MathUtils_1 = require("../../../../../../Core/Utils/MathUtils");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
const UiManager_1 = require("../../../../../Ui/UiManager");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
const ActivitySubViewBase_1 = require("../../../View/SubView/ActivitySubViewBase");
const ActivitySubViewGeneralInfo_1 = require("../../../View/SubView/ActivitySubViewGeneralInfo");
class ActivitySubViewRoadBook extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments);
    this.ActivityBaseData = undefined;
    this.GeneralActivityInfo = undefined;
    this.ExpComponent = undefined;
    this.eje = () => {
      UiManager_1.UiManager.OpenView("RoadBookMainView", this.ActivityBaseData);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    var e = [];
    this.GeneralActivityInfo = new ActivitySubViewGeneralInfo_1.ActivitySubViewGeneralInfo();
    this.GeneralActivityInfo.SetData(this.ActivityBaseData);
    this.GeneralActivityInfo.SetClickFunc(this.eje);
    e.push(this.GeneralActivityInfo.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()));
    this.ExpComponent = new RoadBookExpComponent();
    e.push(this.ExpComponent.CreateThenShowByActorAsync(this.GetItem(1).GetOwner()));
    await Promise.all(e);
    this.GeneralActivityInfo.SetBtnText("RoadBookEnterName_Text");
    var e = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender();
    var e = e === 0;
    this.GetItem(2).SetUIActive(!e);
    this.GetItem(3).SetUIActive(e);
  }
  OnRefreshView() {
    this._Vl();
    this.ZGe();
  }
  _Vl() {
    this.ExpComponent.SetProgress(this.ActivityBaseData.GetCurrentExp(), this.ActivityBaseData.GetCurrentTargetExp(), this.ActivityBaseData.TravelLevel === this.ActivityBaseData.MaxTravelLevel);
    this.ExpComponent.SetLevel(this.ActivityBaseData.TravelLevel);
  }
  ZGe() {
    this.GeneralActivityInfo.SetFunctionRedDotVisible(this.ActivityBaseData.RedPointShowState);
  }
}
exports.ActivitySubViewRoadBook = ActivitySubViewRoadBook;
class RoadBookExpComponent extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIArtText], [1, UE.UISprite], [2, UE.UIText], [3, UE.UIText]];
  }
  OnStart() {
    this.GetText(3)?.ShowTextNew("RoadBookCurrentLevelExp_Text");
  }
  SetProgress(e, i, t) {
    if (t) {
      this.GetSprite(1).SetFillAmount(1);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), "RoadBookLevelMax_Text");
    } else {
      this.GetSprite(1).SetFillAmount(MathUtils_1.MathUtils.Clamp(e / i, 0, 1));
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), "RoadBookExp_Text", e, i);
    }
  }
  SetLevel(e) {
    this.GetArtText(0).SetText(e.toString());
  }
}
//# sourceMappingURL=ActivitySubViewRoadBook.js.map