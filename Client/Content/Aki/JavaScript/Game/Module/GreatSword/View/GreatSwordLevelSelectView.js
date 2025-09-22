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
    this.LJu = undefined;
    this.AJu = undefined;
    this.NXc = [];
    this.ZAt = undefined;
    this.I5t = () => {
      this.CloseMe();
    };
    this.VXc = e => {
      this.Og();
    };
    this.jXc = () => {
      this.CloseMe();
    };
    this.xJu = () => {
      var e = BlackSwordChallengeById_1.configBlackSwordChallengeById.GetConfig(ModelManager_1.ModelManager.GreatSwordChallengeModel.GetChallenge()?.BoardId ?? 0)?.RelativeDungeonId ?? 0;
      var t = ModelManager_1.ModelManager.GreatSwordChallengeModel.GetSelectedIndex();
      var t = ModelManager_1.ModelManager.GreatSwordChallengeModel.GetSubChallenges()?.[t]?.Config.Id;
      GreatSwordController_1.GreatSwordController.RequestGreatSwordLevelSelected(e, t);
    };
    this.PJu = () => {
      var e = new GreatSwordTrialLevelItem_1.GreatSwordTrialLevelItem();
      e.CanClickCallBack = this.Ioc;
      e.OnClickToggleCallBack = this.Kzc;
      this.NXc.push(e);
      return e;
    };
    this.DJu = () => new GreatSwordGoalItem_1.GreatSwordGoalItem();
    this.Ioc = e => {
      return !!(ModelManager_1.ModelManager.GreatSwordChallengeModel.GetSubChallenges() ?? [])[e]?.Unlocked || (ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("BlackSwordTips_LevelNotUnlocked"), false);
    };
    this.Kzc = t => {
      if (this.Ioc(t)) {
        for (let e = 0; e < this.NXc.length; e++) {
          this.NXc[e].SetToggleState(e === t ? 1 : 0);
        }
        ModelManager_1.ModelManager.GreatSwordChallengeModel.SetSelectedIndex(t);
        this.BJu();
        this.WXc();
        this.UiViewSequence.StopSequenceByKey("Switch", false, true);
        this.UiViewSequence.PlaySequence("Switch");
      }
    };
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.GreatSwordLevelRefreshUI, this.VXc);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.GreatSwordLevelSelectedComplete, this.jXc);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.GreatSwordLevelRefreshUI, this.VXc);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.GreatSwordLevelSelectedComplete, this.jXc);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIText], [2, UE.UIButtonComponent], [3, UE.UIHorizontalLayout], [4, UE.UIItem], [5, UE.UIVerticalLayout], [6, UE.UIItem], [7, UE.UIText], [8, UE.UIItem]];
    this.BtnBindInfo = [[2, this.I5t]];
  }
  async OnBeforeStartAsync() {
    this.LJu = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(3), this.PJu);
    this.AJu = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(5), this.DJu);
    this.ZAt = new ButtonItem_1.ButtonItem(this.GetItem(8));
    this.ZAt.SetFunction(this.xJu);
    this.ZAt.SetLocalTextNew("BlackRaid_1_Start_1");
    return Promise.resolve();
  }
  OnStart() {
    this.$Xc();
  }
  OnBeforeShow() {
    this.Og();
    var e = (ModelManager_1.ModelManager.GreatSwordChallengeModel.GetSubChallenges() ?? []).filter(e => e.Unlocked).length - 1;
    this.Kzc(e);
  }
  OnAfterDestroy() {
    GeneralLogicTreeController_1.GeneralLogicTreeController.OpenSystemBoardResultRequest(ModelManager_1.ModelManager.GreatSwordChallengeModel.GetIsStartChallenge() ? 2 : 0, ModelManager_1.ModelManager.GreatSwordChallengeModel.GetActionIncId());
    ModelManager_1.ModelManager.GreatSwordChallengeModel.ClearData();
  }
  Og() {
    this.UJu();
    this.BJu();
    this.WXc();
  }
  $Xc() {
    var e = BlackSwordChallengeById_1.configBlackSwordChallengeById.GetConfig(ModelManager_1.ModelManager.GreatSwordChallengeModel.GetChallenge()?.BoardId ?? 0);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e?.Title ?? "");
    var e = e?.Icon ?? "";
    var t = this.GetSprite(0);
    if (t) {
      this.SetSpriteByPath(e, t, false);
    }
  }
  UJu() {
    this.NXc = [];
    var e = ModelManager_1.ModelManager.GreatSwordChallengeModel.GetSubChallenges() ?? [];
    this.LJu?.RefreshByData(e);
  }
  BJu() {
    var e = ModelManager_1.ModelManager.GreatSwordChallengeModel.GetSubChallenges() ?? [];
    var t = ModelManager_1.ModelManager.GreatSwordChallengeModel.GetSelectedIndex();
    var e = e[t] ? [e[t]] : [];
    this.AJu?.RefreshByData(e);
  }
  WXc() {
    var e = ModelManager_1.ModelManager.GreatSwordChallengeModel.GetSubChallenges() ?? [];
    var t = ModelManager_1.ModelManager.GreatSwordChallengeModel.GetSelectedIndex();
    var e = e?.[t];
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(7), e?.Config?.RuleText);
  }
}
exports.GreatSwordLevelSelectView = GreatSwordLevelSelectView;
//# sourceMappingURL=GreatSwordLevelSelectView.js.map