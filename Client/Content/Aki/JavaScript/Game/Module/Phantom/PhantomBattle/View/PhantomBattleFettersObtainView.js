"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomBattleFettersObtainView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../../Ui/UiManager");
const GenericScrollView_1 = require("../../../Util/ScrollView/GenericScrollView");
const PhantomBattleItemView_1 = require("./PhantomBattleItemView");
class PhantomBattleFettersObtainView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.X6i = undefined;
    this.$6i = undefined;
    this.Y6i = (e, t, i) => {
      t = new PhantomBattleItemView_1.PhantomFettersObtainItem(t);
      t.Init();
      t.Update(e);
      t.BindOnItemButtonClickedCallback(this.J6i);
      return {
        Key: i,
        Value: t
      };
    };
    this.J6i = e => {
      ControllerHolder_1.ControllerHolder.AdventureGuideController.JumpToTargetView("MonsterDetectView", ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashDevelopRewardByMonsterId(e)?.MonsterProbeId);
    };
    this.m2e = () => {
      var e;
      ModelManager_1.ModelManager.PhantomBattleModel.CurrentSelectedFetter = this.X6i;
      this.CloseMe();
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.VisionFilterMonster);
      if (!UiManager_1.UiManager.IsViewShow("VisionEquipmentView")) {
        e = ModelManager_1.ModelManager.RoleModel.GetBattleTeamFirstRoleId();
        if (UiManager_1.UiManager.IsViewShow("PhantomBattleFettersView")) {
          UiManager_1.UiManager.CloseAndOpenView("PhantomBattleFettersView", "VisionEquipmentView", e);
        } else {
          UiManager_1.UiManager.OpenView("VisionEquipmentView", e);
        }
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIScrollViewWithScrollbarComponent], [1, UE.UIButtonComponent]];
    this.BtnBindInfo = [[1, this.m2e]];
  }
  OnStart() {
    var e = this.OpenParam;
    this.$6i = new GenericScrollView_1.GenericScrollView(this.GetScrollViewWithScrollbar(0), this.Y6i);
    this.ShowFettersObtainView(e);
  }
  ShowFettersObtainView(e) {
    this.SetActive(true);
    this.X6i = e;
  }
  OnBeforeDestroy() {
    this.$6i.ClearChildren();
  }
}
exports.PhantomBattleFettersObtainView = PhantomBattleFettersObtainView;
//# sourceMappingURL=PhantomBattleFettersObtainView.js.map