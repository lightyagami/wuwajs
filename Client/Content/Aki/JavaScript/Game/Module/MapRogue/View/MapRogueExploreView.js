"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapRogueExploreView = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem");
const LguiUtil_1 = require("../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew");
const RogueExploreListItem_1 = require("./Components/RogueExploreListItem");
class MapRogueExploreView extends UiViewBase_1.UiViewBase {
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
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIScrollViewWithScrollbarComponent], [2, UE.UIItem], [3, UE.UIText]];
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
      i = this.GetText(3);
      LguiUtil_1.LguiUtil.SetLocalTextNew(i, e.Title);
      this.cT1?.RefreshByData(r.GetAllExplorationData(), undefined, true);
    }
  }
}
exports.MapRogueExploreView = MapRogueExploreView;
//# sourceMappingURL=MapRogueExploreView.js.map