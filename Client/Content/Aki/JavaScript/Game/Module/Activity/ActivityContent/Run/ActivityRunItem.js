"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityRunItem = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const CommonItemSmallItemGrid_1 = require("../../../Common/ItemGrid/CommonItemSmallItemGrid");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew");
const ActivityRunController_1 = require("./ActivityRunController");
class ActivityRunItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.ScrollViewDelegate = undefined;
    this.GridIndex = 0;
    this.DisplayIndex = 0;
    this.bOe = undefined;
    this.HFe = 0;
    this.r3e = e => {
      if (e === this.HFe) {
        this.n3e();
      }
    };
    this.JGe = () => {
      return new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
    };
    this.s3e = () => {
      var e = ModelManager_1.ModelManager.ActivityRunModel.GetActivityRunData(ModelManager_1.ModelManager.ActivityRunModel.CurrentSelectChallengeId).GetScoreIndex(this.HFe);
      ActivityRunController_1.ActivityRunController.RequestTakeChallengeReward(ModelManager_1.ModelManager.ActivityRunModel.CurrentSelectChallengeId, e);
    };
  }
  GetKey(e, t) {}
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIScrollViewWithScrollbarComponent], [2, UE.UIText], [3, UE.UISprite], [4, UE.UIButtonComponent], [5, UE.UIItem]];
    this.BtnBindInfo = [[4, this.s3e]];
  }
  OnStart() {
    var e = this.GetScrollViewWithScrollbar(1);
    this.bOe = new GenericScrollViewNew_1.GenericScrollViewNew(e, () => this.JGe());
    this.AddEventListener();
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnGetRunActivityReward, this.r3e);
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnGetRunActivityReward, this.r3e);
  }
  OnSelected(e) {}
  OnDeselected(e) {}
  Refresh(e, t, i) {
    this.HFe = e;
    this.mGe();
    this.jqe();
    this.n3e();
  }
  Clear() {}
  mGe() {
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(0), "ActivityRunPointNeed", this.HFe.toString());
  }
  jqe() {
    var e = ModelManager_1.ModelManager.ActivityRunModel.GetActivityRunData(ModelManager_1.ModelManager.ActivityRunModel.CurrentSelectChallengeId);
    var t = e.GetScoreIndex(this.HFe);
    var e = e.GetScoreIndexPreviewItem(t);
    this.bOe.RefreshByData(e);
  }
  n3e() {
    var e = ModelManager_1.ModelManager.ActivityRunModel.GetActivityRunData(ModelManager_1.ModelManager.ActivityRunModel.CurrentSelectChallengeId);
    var e = e.GetScoreIndexCannotGetReward(e.GetScoreIndex(this.HFe));
    this.GetText(2).SetUIActive(false);
    this.GetButton(4).RootUIComp.SetUIActive(false);
    this.GetItem(5).SetUIActive(false);
    this.GetSprite(3).SetUIActive(false);
    if (e === 0) {
      this.GetText(2).SetUIActive(true);
    } else if (e === 1) {
      this.GetItem(5).SetUIActive(true);
      this.GetButton(4).RootUIComp.SetUIActive(true);
    } else if (e === 2) {
      this.GetSprite(3).SetUIActive(true);
    }
  }
  OnBeforeDestroy() {
    this.RemoveEventListener();
  }
}
exports.ActivityRunItem = ActivityRunItem;
//# sourceMappingURL=ActivityRunItem.js.map