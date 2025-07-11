"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchDungeonSelectView = undefined;
const UE = require("ue");
const LocalStorage_1 = require("../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine");
const LevelGeneralCommons_1 = require("../../../LevelGamePlay/LevelGeneralCommons");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const ActivityFunctionalTypeA_1 = require("../../Activity/ActivityContent/UniversalComponents/Functional/ActivityFunctionalTypeA");
const ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
const LguiUtil_1 = require("../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew");
const FloroRanchController_1 = require("../FloroRanchController");
const FloroRanchDungeonSelectRightPanel_1 = require("./FloroRanchDungeonSelectRightPanel");
const FloroRanchDungeonItem_1 = require("./Item/FloroRanchDungeonItem");
const FloroRanchSkillItem_1 = require("./Item/FloroRanchSkillItem");
class FloroRanchDungeonSelectView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.CNe = undefined;
    this.MAu = 0;
    this.wmo = 0;
    this.EAu = [];
    this.M9c = undefined;
    this.TAu = undefined;
    this.wVl = undefined;
    this.lat = undefined;
    this.Og = (e, i) => {
      this.M9c.LateScrollTo(this.M9c.GetItemByKey(e.Id));
      this.M9c.SelectGridProxy(this.M9c.GetScrollItemByKey(e.Id)?.GridIndex);
      this.GetItem(4)?.SetUIActive(e.IsUnLock);
      this.TAu?.RefreshDungeonInfo(e, i);
      this.GetButton(2)?.RootUIComp.SetUIActive(e.IsUnLock);
    };
    this.bAu = e => {
      this.MAu = e;
      var e = this.CNe.GetFloroRanchSubDungeonData(e);
      this.EAu = e.SelectedRaceIds;
      this.GetButton(2)?.RootUIComp.SetUIActive(e.IsUnLock);
      this.GetItem(10)?.SetUIActive(!e.IsUnLock);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), "FloroRanchDayNum", e.MaxDays);
      var i = e.MaxCoin;
      var i = ModelManager_1.ModelManager.FloroRanchModel.GetCoinText(i);
      this.GetText(6)?.SetText(i);
      this.GetItem(4)?.SetUIActive(e.HasHistory);
      if (!e.IsUnLock) {
        i = LevelGeneralCommons_1.LevelGeneralCommons.GetConditionGroupHintText(e.ConditionId);
        this.wVl?.SetTextByTextId(i);
      }
    };
    this.RAu = () => {
      var e = new FloroRanchDungeonItem_1.FloroRanchDungeonItem();
      e.SetToggleCallBack(this.Og);
      return e;
    };
    this.AMo = () => {
      this.CloseMe();
    };
    this.wAu = () => {
      if (this.EAu.includes(0)) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("Farm_ChooseRace");
      } else if (this.wmo === 0) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("Farm_ChooseSkill");
      } else {
        FloroRanchController_1.FloroRanchController.SendFloroRanchStartPlayRequest(this.CNe.Id, this.MAu, this.EAu, this.wmo, () => {
          this.CloseMe();
        });
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIButtonComponent], [2, UE.UIButtonComponent], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIText], [6, UE.UIText], [7, UE.SpineSkeletonAnimationComponent], [8, UE.UIItem], [9, UE.UIScrollViewWithScrollbarComponent], [10, UE.UIItem]];
    this.BtnBindInfo = [[2, this.wAu], [1, this.AMo]];
  }
  async OnBeforeStartAsync() {
    this.CNe = ModelManager_1.ModelManager.FloroRanchModel.GetActivityData();
    var e = [];
    this.M9c = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(9), this.RAu);
    var i = this.CNe.GetFloroRanchDungeonDataList();
    e.push(this.M9c.RefreshByDataAsync(i, true));
    this.TAu = new FloroRanchDungeonSelectRightPanel_1.FloroRanchDungeonSelectRightPanel();
    this.TAu.OnSelectDifficultyCallBack = this.bAu;
    e.push(this.TAu.CreateThenShowByActorAsync(this.GetItem(3).GetOwner()));
    this.wVl = new ActivityFunctionalTypeA_1.FunctionalPanelConditionLock();
    e.push(this.wVl.CreateThenShowByActorAsync(this.GetItem(10).GetOwner()));
    this.lat = new FloroRanchSkillItem_1.FloroRanchSkillItem();
    e.push(this.lat.CreateThenShowByActorAsync(this.GetItem(8).GetOwner()));
    await Promise.all(e);
    var i = this.CNe.GetLatestUnlockSubDungeon();
    var e = this.CNe.GetFloroRanchDungeonData(i.InstanceId);
    this.Og(e, i);
    var e = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.FloroRanchSkillId, 0);
    this.RefreshSkillItem(e);
    this.GetSpine(7)?.SetAnimation(0, "idle", true);
  }
  RefreshRaceList(e) {
    this.EAu = e;
    this.TAu?.RefreshRaceList(e);
  }
  RefreshSkillItem(e) {
    this.wmo = e;
    this.lat?.Refresh(e);
  }
  RefreshSkillItemRedDot() {
    this.lat?.RefreshRedDot();
  }
}
exports.FloroRanchDungeonSelectView = FloroRanchDungeonSelectView;
//# sourceMappingURL=FloroRanchDungeonSelectView.js.map