"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GreatSwordLevelSelectView = undefined;
const UE = require("ue");
const BlackSwordChallengeById_1 = require("../../../../Core/Define/ConfigQuery/BlackSwordChallengeById");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const ButtonItem_1 = require("../../Common/Button/ButtonItem");
const GeneralLogicTreeController_1 = require("../../GeneralLogicTree/GeneralLogicTreeController");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
const GreatSwordController_1 = require("../GreatSwordController");
const GreatSwordGoalItem_1 = require("./Item/GreatSwordGoalItem");
const GreatSwordTrialLevelItem_1 = require("./Item/GreatSwordTrialLevelItem");
class GreatSwordLevelSelectView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.rzu = undefined;
    this.ozu = undefined;
    this.nzu = [];
    this.ZAt = undefined;
    this.I5t = () => {
      this.CloseMe();
    };
    this.szu = e => {
      this.Og();
    };
    this.azu = () => {
      this.CloseMe();
    };
    this.hzu = () => {
      var e = BlackSwordChallengeById_1.configBlackSwordChallengeById.GetConfig(ModelManager_1.ModelManager.GreatSwordChallengeModel.GetChallenge()?.BoardId ?? 0)?.RelativeDungeonId ?? 0;
      var t = ModelManager_1.ModelManager.GreatSwordChallengeModel.GetSelectedIndex();
      var t = ModelManager_1.ModelManager.GreatSwordChallengeModel.GetSubChallenges()?.[t]?.Config.Id;
      GreatSwordController_1.GreatSwordController.RequestGreatSwordLevelSelected(e, t);
    };
    this.lzu = () => {
      var e = new GreatSwordTrialLevelItem_1.GreatSwordTrialLevelItem();
      e.CanClickCallBack = this.Ioc;
      e.OnClickToggleCallBack = this._zu;
      this.nzu.push(e);
      return e;
    };
    this.uzu = () => new GreatSwordGoalItem_1.GreatSwordGoalItem();
    this.Ioc = e => {
      return !!(ModelManager_1.ModelManager.GreatSwordChallengeModel.GetSubChallenges() ?? [])[e]?.Unlocked || (ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("BlackSwordTips_LevelNotUnlocked"), false);
    };
    this._zu = t => {
      if (this.Ioc(t)) {
        for (let e = 0; e < this.nzu.length; e++) {
          this.nzu[e].SetToggleState(e === t ? 1 : 0);
        }
        ModelManager_1.ModelManager.GreatSwordChallengeModel.SetSelectedIndex(t);
        this.czu();
        this.dzu();
        this.UiViewSequence.StopSequenceByKey("Switch", false, true);
        this.UiViewSequence.PlaySequence("Switch");
      }
    };
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.GreatSwordLevelRefreshUI, this.szu);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.GreatSwordLevelSelectedComplete, this.azu);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.GreatSwordLevelRefreshUI, this.szu);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.GreatSwordLevelSelectedComplete, this.azu);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIText], [2, UE.UIButtonComponent], [3, UE.UIHorizontalLayout], [4, UE.UIItem], [5, UE.UIVerticalLayout], [6, UE.UIItem], [7, UE.UIText], [8, UE.UIItem]];
    this.BtnBindInfo = [[2, this.I5t]];
  }
  async OnBeforeStartAsync() {
    this.rzu = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(3), this.lzu);
    this.ozu = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(5), this.uzu);
    this.ZAt = new ButtonItem_1.ButtonItem(this.GetItem(8));
    this.ZAt.SetFunction(this.hzu);
    this.ZAt.SetLocalTextNew("BlackRaid_1_Start_1");
    return Promise.resolve();
  }
  OnStart() {
    this.mzu();
  }
  OnBeforeShow() {
    this.Og();
    var e = (ModelManager_1.ModelManager.GreatSwordChallengeModel.GetSubChallenges() ?? []).filter(e => e.Unlocked).length - 1;
    this._zu(e);
  }
  OnAfterDestroy() {
    GeneralLogicTreeController_1.GeneralLogicTreeController.OpenSystemBoardResultRequest(ModelManager_1.ModelManager.GreatSwordChallengeModel.GetIsStartChallenge() ? 2 : 0, ModelManager_1.ModelManager.GreatSwordChallengeModel.GetActionIncId());
    ModelManager_1.ModelManager.GreatSwordChallengeModel.ClearData();
  }
  Og() {
    this.fzu();
    this.czu();
    this.dzu();
  }
  mzu() {
    var e = BlackSwordChallengeById_1.configBlackSwordChallengeById.GetConfig(ModelManager_1.ModelManager.GreatSwordChallengeModel.GetChallenge()?.BoardId ?? 0);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e?.Title ?? "");
    var e = e?.Icon ?? "";
    var t = this.GetSprite(0);
    if (t) {
      this.SetSpriteByPath(e, t, false);
    }
  }
  fzu() {
    this.nzu = [];
    var e = ModelManager_1.ModelManager.GreatSwordChallengeModel.GetSubChallenges() ?? [];
    this.rzu?.RefreshByData(e);
  }
  czu() {
    var e = ModelManager_1.ModelManager.GreatSwordChallengeModel.GetSubChallenges() ?? [];
    var t = ModelManager_1.ModelManager.GreatSwordChallengeModel.GetSelectedIndex();
    var e = e[t] ? [e[t]] : [];
    this.ozu?.RefreshByData(e);
  }
  dzu() {
    var e = ModelManager_1.ModelManager.GreatSwordChallengeModel.GetSubChallenges() ?? [];
    var t = ModelManager_1.ModelManager.GreatSwordChallengeModel.GetSelectedIndex();
    var e = e?.[t];
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(7), e?.Config?.RuleText);
  }
}
exports.GreatSwordLevelSelectView = GreatSwordLevelSelectView;
//# sourceMappingURL=GreatSwordLevelSelectView.js.map