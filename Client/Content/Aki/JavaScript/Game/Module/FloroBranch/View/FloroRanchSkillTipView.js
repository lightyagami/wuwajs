"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchSkillTipView = undefined;
const UE = require("ue");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
const LguiUtil_1 = require("../../Util/LguiUtil");
const FloroRanchController_1 = require("../FloroRanchController");
class FloroRanchSkillTipView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.fqu = undefined;
    this.r1u = () => {
      var i;
      var e;
      if (ModelManager_1.ModelManager.FloroRanchGamePlayModel.CanFsmInsertSkillTask()) {
        i = ModelManager_1.ModelManager.FloroRanchGamePlayModel.ActivityId;
        e = ModelManager_1.ModelManager.FloroRanchGamePlayModel.SubInstanceId;
        FloroRanchController_1.FloroRanchController.SendFloroRanchExecuteSkillPlayRequest(i, e, this.gqu);
      } else {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("FloroRanchSkillCantUse");
      }
    };
    this.dV1 = () => {
      this.CloseMe();
    };
    this.gqu = i => {
      if (i && !this.IsDestroyOrDestroying) {
        if (i = UiManager_1.UiManager.GetViewByName("FloroRanchGamePlayView")) {
          i.PlayFloroAudio(0);
        }
        this.CloseMe();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UITexture], [2, UE.UIText], [3, UE.UISprite], [4, UE.UIText], [5, UE.UIText], [6, UE.UIItem], [7, UE.UIItem], [9, UE.UIItem], [8, UE.UIText], [10, UE.UIButtonComponent]];
    this.BtnBindInfo = [[0, this.dV1], [10, this.r1u]];
  }
  OnStart() {
    var i = {
      UiText: this.GetText(5),
      ViewType: 0,
      ReportType: 8,
      Style: 2
    };
    ControllerHolder_1.ControllerHolder.TermExplanationController.RegisterTextHyperlinkByParam(i);
  }
  OnBeforeShow() {
    this.fqu = this.OpenParam;
    var i = this.fqu.CheckGetComponent(4);
    var e = i.SkillData;
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), e.Name);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), e.Desc);
    this.GetSprite(3).useChangeColor = e.IsActiveSkill;
    var r = e.IsActiveSkill ? "FloroRanchActiveSkill" : "FloroRanchPassiveSkill";
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), r);
    this.SetTextureShowUntilLoaded(e.Icon, this.GetTexture(1));
    this.GetItem(6).SetUIActive(true);
    this.GetItem(7).SetUIActive(i.CanUseCount > 0);
    this.GetItem(9).SetUIActive(i.CanUseCount <= 0);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), "Farm_SkillTimes", i.CanUseCount);
    this.GetButton(10).RootUIComp.SetUIActive(i.CanUseSkill());
  }
  OnBeforeDestroy() {
    ControllerHolder_1.ControllerHolder.TermExplanationController.UnRegisterTextHyperlink(this.GetText(5));
  }
}
exports.FloroRanchSkillTipView = FloroRanchSkillTipView;
//# sourceMappingURL=FloroRanchSkillTipView.js.map