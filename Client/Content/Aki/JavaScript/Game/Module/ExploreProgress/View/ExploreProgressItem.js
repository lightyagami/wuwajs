"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExploreProgressItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const UiManager_1 = require("../../../Ui/UiManager");
const HelpController_1 = require("../../Help/HelpController");
const LguiUtil_1 = require("../../Util/LguiUtil");
class ExploreProgressItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.ijs = undefined;
    this.rjs = () => {
      if (this.ijs) {
        UiManager_1.UiManager.OpenView("ExploreMissionView", this.ijs.AreaId);
      }
    };
    this.ojs = () => {
      var e = this.ijs?.GetPhantomSkillHelpId();
      if (e) {
        HelpController_1.HelpController.OpenHelpById(e);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UISprite], [3, UE.UIItem], [4, UE.UIButtonComponent], [5, UE.UIItem], [6, UE.UIButtonComponent], [7, UE.UIText]];
    this.BtnBindInfo = [[4, this.rjs], [6, this.ojs]];
  }
  Refresh(i) {
    var s = (this.ijs = i).GetProgress();
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), i.GetNameId());
    this.GetSprite(2).SetFillAmount(s / 100);
    if (i.IsPercent()) {
      this.GetText(1).SetText(Math.floor(s).toString() + "%");
    } else {
      this.GetText(1).SetText(i.GetCurrentCount() + "/" + i.GetTotalCount());
    }
    this.GetItem(3).SetUIActive(i.ExploreType === 6);
    if (i.IsCompleted()) {
      this.GetItem(5).SetUIActive(false);
    } else {
      s = i.HasPhantomSkill();
      this.GetItem(5).SetUIActive(s);
      s = this.GetText(7);
      let e = undefined;
      if (e = i.GetIsPhantomSkillUnlock() ? (s.SetChangeColor(false), i.GetUnlockTextId()) : (s.SetChangeColor(true, s.changeColor), i.GetLockTextId())) {
        LguiUtil_1.LguiUtil.SetLocalTextNew(s, e);
      }
    }
  }
}
exports.ExploreProgressItem = ExploreProgressItem;
//# sourceMappingURL=ExploreProgressItem.js.map