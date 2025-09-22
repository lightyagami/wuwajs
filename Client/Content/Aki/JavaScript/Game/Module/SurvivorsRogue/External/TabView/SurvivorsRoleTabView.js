"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurvivorsRoleTabView = undefined;
const UE = require("ue");
const LevelGeneralCommons_1 = require("../../../../LevelGamePlay/LevelGeneralCommons");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ActivityFunctionalTypeA_1 = require("../../../Activity/ActivityContent/UniversalComponents/Functional/ActivityFunctionalTypeA");
const LoopScrollMediumItemGrid_1 = require("../../../Common/MediumItemGrid/LoopScrollMediumItemGrid");
const UiSceneManager_1 = require("../../../UiComponent/UiSceneManager");
const SurvivorsRoleTabDetail_1 = require("./SurvivorsRoleTabDetail");
const SurvivorsTabViewBase_1 = require("./SurvivorsTabViewBase");
const SHOW_ATTRIBUTE_NUM = 6;
class SurvivorsRoleTabView extends SurvivorsTabViewBase_1.SurvivorsTabViewBase {
  constructor() {
    super(...arguments);
    this.Ukd = undefined;
    this.wVl = undefined;
    this.CreateLoopItem = () => {
      var e = new SurvivorsRoleTabItem();
      e.BindOnCanExecuteChange(this.OnCanClickItem);
      e.OnClickCallBack = this.OnItemClick;
      return e;
    };
  }
  get ItemType() {
    return 2;
  }
  GetLoopItemIndex() {
    return 3;
  }
  GetLoopScrollComponentIndex() {
    return 1;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UILoopScrollViewComponent], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem]];
    this.BtnBindInfo = [];
  }
  async InitSubComponents() {
    var e = [];
    this.Ukd = new SurvivorsRoleTabDetail_1.SurvivorsRoleTabDetail();
    e.push(this.Ukd.CreateThenShowByActorAsync(this.GetItem(4).GetOwner()));
    this.wVl = new ActivityFunctionalTypeA_1.FunctionalPanelConditionLock();
    e.push(this.wVl.CreateThenShowByActorAsync(this.GetItem(5).GetOwner()));
    await Promise.all(e);
  }
  OnTriggerSequenceStartEvent() {
    this.Ukd?.Refresh(this.CurrentItemId, true, SHOW_ATTRIBUTE_NUM);
  }
  OnBeforeShow() {
    UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor().Model?.CheckGetComponent(3)?.SetLoadingOpen(true);
    UiSceneManager_1.UiSceneManager.ShowRoleSystemRoleActor();
  }
  OnHideUiTabViewBase(e) {
    UiSceneManager_1.UiSceneManager.HideRoleSystemRoleActor();
    if (UiSceneManager_1.UiSceneManager.HasRoleSystemRoleActor()) {
      UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor().Model?.CheckGetComponent(3)?.SetLoadingOpen(false);
    }
  }
  OnStart() {
    this.wVl.SetButtonVisible(false);
  }
  GenerateItemUiDataList() {
    const t = ModelManager_1.ModelManager.SurvivorsRogueModel;
    var e = t.ActivityData;
    if (e) {
      return e.GetShowRoleList().map(e => {
        return {
          Id: e,
          LockState: t.GetItemIsLock(this.ItemType, e),
          IsNew: t.GetItemIsNew(this.ItemType, e)
        };
      });
    } else {
      return [];
    }
  }
  OnSelectItem(e, t = true) {
    var i;
    var r = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsRole(e.Id);
    this.wVl?.SetUiActive(e.LockState ?? false);
    if (e.LockState) {
      i = LevelGeneralCommons_1.LevelGeneralCommons.GetConditionGroupHintText(r.UnlockConditionId);
      this.wVl?.SetTextByTextId(i ?? "");
    }
    this.Ukd.Refresh(e.Id, t, SHOW_ATTRIBUTE_NUM);
    this.xkd(r.TrialRoleId);
    if (t) {
      this.UiViewSequence?.StopSequenceByKey("Switch");
      this.UiViewSequence?.PlaySequence("Switch");
    }
  }
  xkd(e) {
    e = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e);
    if (e) {
      ControllerHolder_1.ControllerHolder.RoleController.OnSelectedRoleChangeByConfig(e.GetRoleConfig().Id, e.GetRoleSkinId());
    }
  }
}
exports.SurvivorsRoleTabView = SurvivorsRoleTabView;
class SurvivorsRoleTabItem extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
  constructor() {
    super(...arguments);
    this.OnClickCallBack = undefined;
  }
  OnRefresh(e, t, i) {
    var r = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsRole(e.Id);
    var r = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(r.TrialRoleId);
    var e = {
      Type: 4,
      Data: e,
      BottomTextId: r.Name,
      IconPath: r.RoleHeadIconBig,
      QualityId: r.QualityId,
      IsProhibit: e.LockState,
      IsNewVisible: e.IsNew
    };
    this.SetElement(r.ElementId);
    this.Apply(e);
  }
  OnSelected(e) {
    this.SetSelected(true, true);
    if (e) {
      this.OnExtendToggleStateChanged(this.GetItemGridExtendToggle().ToggleState);
    }
  }
  OnDeselected(e) {
    this.SetSelected(false, true);
  }
  OnExtendToggleStateChanged(e) {
    this.OnClickCallBack?.(this.Data, this);
  }
}
//# sourceMappingURL=SurvivorsRoleTabView.js.map