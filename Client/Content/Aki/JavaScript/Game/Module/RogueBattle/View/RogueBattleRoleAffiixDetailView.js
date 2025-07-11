"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueBattleRoleAffixDetailView = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem");
const RoleController_1 = require("../../RoleUi/RoleController");
const RoleDefine_1 = require("../../RoleUi/RoleDefine");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
const RogueBattleRoleAffixDetailToggle_1 = require("../Component/RogueBattleRoleAffixDetailToggle");
class RogueBattleRoleAffixDetailView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.lqe = undefined;
    this.xS1 = undefined;
    this.g71 = () => {
      var e = this.OpenParam.RoleId;
      if (e > RoleDefine_1.ROBOT_DATA_MIN_ID) {
        RoleController_1.RoleController.OpenRoleMainView(1, 0, [e], "RoleSkillTabView");
      } else if (e = ConfigManager_1.ConfigManager.RogueBattleConfig.GetRogueResBondRole(e)) {
        RoleController_1.RoleController.OpenRoleMainView(1, 0, [e.TrialRoleId], "RoleSkillTabView");
      }
    };
    this.US1 = e => {
      this.xS1?.SelectGridProxy(e);
      this.RefreshDetail();
    };
    this.Bqe = () => {
      var e = new RogueBattleRoleAffixDetailToggle_1.RogueBattleRoleAffixDetailToggle();
      e.OnSelectCallback = this.US1;
      return e;
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UISprite], [2, UE.UIText], [3, UE.UIText], [4, UE.UIHorizontalLayout], [5, UE.UIButtonComponent]];
    this.BtnBindInfo = [[5, this.g71]];
  }
  async OnBeforeStartAsync() {
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem();
    this.lqe.SetCloseCallBack(() => {
      this.CloseMe();
    });
    this.xS1 = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(4), this.Bqe);
    await Promise.all([this.lqe.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()), this.xS1.RefreshByDataAsync(this.OpenParam.AffixIds)]);
    this.xS1.SelectGridProxy(this.OpenParam.Index ?? 0);
    this.RefreshDetail();
  }
  RefreshDetail() {
    var e = this.xS1.GetSelectedGridIndex();
    if (!(e < 0)) {
      e = this.OpenParam.AffixIds[e];
      if ((e = ConfigManager_1.ConfigManager.RogueBattleConfig?.GetRogueResCharacterBuff(e)) !== undefined) {
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), e.AffixTitle);
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), e.AffixDesc, ...e.AffixDescParam);
        this.SetSpriteByPath(e.AffixIcon, this.GetSprite(1), false);
      }
    }
  }
}
exports.RogueBattleRoleAffixDetailView = RogueBattleRoleAffixDetailView;
//# sourceMappingURL=RogueBattleRoleAffiixDetailView.js.map