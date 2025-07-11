"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueTaskItem = undefined;
const UE = require("ue");
const RogueResTaskById_1 = require("../../../../Core/Define/ConfigQuery/RogueResTaskById");
const CommonItemSmallItemGrid_1 = require("../../Common/ItemGrid/CommonItemSmallItemGrid");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew");
const ActivityPermanentRogueController_1 = require("../ActivityPermanentRogueController");
class RogueTaskItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.bOe = undefined;
    this.sOn = undefined;
    this.JGe = () => new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
    this.qOe = () => {
      ActivityPermanentRogueController_1.ActivityPermanentRogueController.RequestTaskAward(this.sOn.Id);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIButtonComponent], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIText], [5, UE.UIText], [6, UE.UIScrollViewWithScrollbarComponent]];
    this.BtnBindInfo = [[1, this.qOe]];
  }
  OnStart() {
    this.bOe = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(6), this.JGe);
  }
  Refresh(e, t, i) {
    this.sOn = e;
    this.bOe.RefreshByData(e.GetRewardList());
    this.GetButton(1).RootUIComp.SetUIActive(e.IsFinished() && !e.IsTaken());
    this.GetItem(3).SetUIActive(e.IsTaken());
    this.GetText(2).SetUIActive(!e.IsTaken() && !e.IsFinished());
    this.GetButton(0).RootUIComp.SetUIActive(false);
    var r = RogueResTaskById_1.configRogueResTaskById.GetConfig(e.Id);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), r.Text);
    if (e.Target > 0) {
      this.GetText(5)?.SetUIActive(true);
      this.GetText(5)?.SetText(e.Current + "/" + e.Target);
    } else {
      this.GetText(5)?.SetUIActive(false);
    }
  }
}
exports.RogueTaskItem = RogueTaskItem;
//# sourceMappingURL=RogueTaskItem.js.map