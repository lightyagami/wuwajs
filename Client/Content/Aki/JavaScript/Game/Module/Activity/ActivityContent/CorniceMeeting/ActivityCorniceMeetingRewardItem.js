"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityCorniceMeetingRewardItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const CommonItemSmallItemGrid_1 = require("../../../Common/ItemGrid/CommonItemSmallItemGrid");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew");
const ActivityCorniceMeetingController_1 = require("./ActivityCorniceMeetingController");
class ActivityCorniceMeetingRewardItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.ScrollViewDelegate = undefined;
    this.GridIndex = 0;
    this.DisplayIndex = 0;
    this.bOe = undefined;
    this.HFe = 0;
    this.JGe = () => {
      return new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
    };
    this.s3e = () => {
      var e = ActivityCorniceMeetingController_1.ActivityCorniceMeetingController.GetCurrentActivityData();
      ActivityCorniceMeetingController_1.ActivityCorniceMeetingController.CorniceMeetingRewardRequest(e.CurrentSelectLevelPlayId, this.GridIndex, () => {
        this.n3e();
      });
    };
  }
  GetKey(e, i) {}
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIScrollViewWithScrollbarComponent], [2, UE.UIText], [3, UE.UISprite], [4, UE.UIButtonComponent], [5, UE.UIItem]];
    this.BtnBindInfo = [[4, this.s3e]];
  }
  OnStart() {
    var e = this.GetScrollViewWithScrollbar(1);
    this.bOe = new GenericScrollViewNew_1.GenericScrollViewNew(e, () => this.JGe());
  }
  OnSelected(e) {}
  OnDeselected(e) {}
  Refresh(e, i, t) {
    this.HFe = e;
    this.mGe();
    this.jqe();
    this.n3e();
  }
  Clear() {}
  mGe() {
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(0), ActivityCorniceMeetingController_1.ActivityCorniceMeetingController.GetCurrentActivityData().TaskTitleTextId, this.HFe.toString());
  }
  jqe() {
    var e = ActivityCorniceMeetingController_1.ActivityCorniceMeetingController.GetCurrentActivityData();
    var e = e.GetScoreIndexPreviewItem(e.CurrentSelectLevelPlayId, this.HFe);
    this.bOe.RefreshByData(e);
  }
  n3e() {
    var e = ActivityCorniceMeetingController_1.ActivityCorniceMeetingController.GetCurrentActivityData();
    var e = e.GetRewardState(e.CurrentSelectLevelPlayId, this.GridIndex);
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
}
exports.ActivityCorniceMeetingRewardItem = ActivityCorniceMeetingRewardItem;
//# sourceMappingURL=ActivityCorniceMeetingRewardItem.js.map