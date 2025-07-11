"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapRogueExploreEndView = exports.ExploreEndViewData = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem");
const UiPopViewData_1 = require("../../../Ui/Define/UiPopViewData");
const LguiUtil_1 = require("../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew");
const RogueExploreListItem_1 = require("./Components/RogueExploreListItem");
class ExploreEndViewData extends UiPopViewData_1.UiPopViewData {
  constructor() {
    super(...arguments);
    this.ExitToMap = false;
  }
}
exports.ExploreEndViewData = ExploreEndViewData;
class MapRogueExploreEndView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.cT1 = undefined;
    this.lqe = undefined;
    this.Bqe = () => {
      return new RogueExploreListItem_1.RogueExploreListItem();
    };
    this.B6e = () => {
      this.CloseMe();
    };
    this.kv1 = () => {
      ControllerHolder_1.ControllerHolder.MapRogueController.RequestInstResultEnd();
    };
    this.Ov1 = () => {
      if (this.OpenParam.ExitToMap) {
        ControllerHolder_1.ControllerHolder.MapRogueController.RequestBackToMap(e => {
          if (e) {
            this.CloseMe();
          }
        });
      } else {
        ControllerHolder_1.ControllerHolder.MapRogueController.RequestInstLeave();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIScrollViewWithScrollbarComponent], [2, UE.UIItem], [3, UE.UIButtonComponent], [4, UE.UIButtonComponent], [5, UE.UIText]];
    this.BtnBindInfo = [[3, this.kv1], [4, this.Ov1]];
  }
  async OnBeforeStartAsync() {
    var e = [];
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem();
    e.push(this.lqe.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()));
    this.lqe.SetCloseCallBack(this.B6e);
    this.cT1 = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(1), this.Bqe);
    await Promise.all(e);
  }
  OnBeforeShow() {
    var e;
    var i;
    var r = ModelManager_1.ModelManager.MapRogueModel.GameInfo;
    if (r && (e = ConfigManager_1.ConfigManager.MapRogueConfig?.GetInsGridConfigByInstId(r.InstanceId))) {
      i = this.GetText(5);
      LguiUtil_1.LguiUtil.SetLocalTextNew(i, e.Title);
      this.cT1?.RefreshByData(r.GetAllExplorationData(), undefined, true);
    }
  }
}
exports.MapRogueExploreEndView = MapRogueExploreEndView;
//# sourceMappingURL=MapRogueExploreEndView.js.map