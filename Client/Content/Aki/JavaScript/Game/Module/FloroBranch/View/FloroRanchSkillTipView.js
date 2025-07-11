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
const LguiUtil_1 = require("../../Util/LguiUtil");
const FloroRanchController_1 = require("../FloroRanchController");
class FloroRanchSkillTipView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.$Ou = undefined;
    this.y_u = () => {
      var e = ModelManager_1.ModelManager.FloroRanchGamePlayModel.ActivityId;
      var i = ModelManager_1.ModelManager.FloroRanchGamePlayModel.SubInstanceId;
      FloroRanchController_1.FloroRanchController.SendFloroRanchExecuteSkillPlayRequest(e, i, this.WOu);
    };
    this.dV1 = () => {
      this.CloseMe();
    };
    this.WOu = e => {
      if (e && !this.IsDestroyOrDestroying) {
        if (e = UiManager_1.UiManager.GetViewByName("FloroRanchGamePlayView")) {
          e.PlayFloroAudio(0);
        }
        this.CloseMe();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UITexture], [2, UE.UIText], [3, UE.UISprite], [4, UE.UIText], [5, UE.UIText], [6, UE.UIItem], [7, UE.UIItem], [9, UE.UIItem], [8, UE.UIText], [10, UE.UIButtonComponent]];
    this.BtnBindInfo = [[0, this.dV1], [10, this.y_u]];
  }
  OnStart() {
    var e = {
      UiText: this.GetText(5),
      ViewType: 0,
      ReportType: 8,
      Style: 2
    };
    ControllerHolder_1.ControllerHolder.TermExplanationController.RegisterTextHyperlinkByParam(e);
  }
  OnBeforeShow() {
    this.$Ou = this.OpenParam;
    var e = this.$Ou.CheckGetComponent(4);
    var i = e.SkillData;
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), i.Name);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), i.Desc);
    this.GetSprite(3).useChangeColor = i.IsActiveSkill;
    var r = i.IsActiveSkill ? "FloroRanchActiveSkill" : "FloroRanchPassiveSkill";
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), r);
    this.SetTextureShowUntilLoaded(i.Icon, this.GetTexture(1));
    this.GetItem(6).SetUIActive(true);
    this.GetItem(7).SetUIActive(e.CanUseCount > 0);
    this.GetItem(9).SetUIActive(e.CanUseCount <= 0);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), "Farm_SkillTimes", e.CanUseCount);
    this.GetButton(10).RootUIComp.SetUIActive(e.CanUseSkill());
  }
  OnBeforeDestroy() {
    ControllerHolder_1.ControllerHolder.TermExplanationController.UnRegisterTextHyperlink(this.GetText(5));
  }
}
exports.FloroRanchSkillTipView = FloroRanchSkillTipView;
//# sourceMappingURL=FloroRanchSkillTipView.js.map