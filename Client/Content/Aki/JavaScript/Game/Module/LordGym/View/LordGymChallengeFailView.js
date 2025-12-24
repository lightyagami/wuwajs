"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LordGymChallengeFailView = undefined;
const UE = require("ue");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const ButtonItem_1 = require("../../Common/Button/ButtonItem");
const TrainingView_1 = require("../../TrainingDegree/TrainingView");
const LguiUtil_1 = require("../../Util/LguiUtil");
const LordGymController_1 = require("../LordGymController");
const LordGymDefine_1 = require("../LordGymDefine");
class LordGymChallengeFailView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.syi = 0;
    this.e3t = undefined;
    this.THl = undefined;
    this.bHl = undefined;
    this.Qre = undefined;
    this.LHl = () => {
      if (this.Qre === 3) {
        ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.EnterEntrance(LordGymDefine_1.THRID_ENTRANCE_ID);
      }
      this.CloseMe();
    };
    this.AHl = () => {
      if (this.Qre === 2) {
        LordGymController_1.LordGymController.LordGymBeginRequest(this.syi);
      } else if (this.Qre === 3) {
        ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.RestartInstanceDungeon();
      }
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIText], [5, UE.UIText], [6, UE.UIText], [7, UE.UIHorizontalLayout], [8, UE.UIButtonComponent], [9, UE.UIText], [10, UE.UITexture], [11, UE.UIText], [12, UE.UIText]];
  }
  async OnBeforeStartAsync() {
    var e = this.OpenParam;
    this.syi = e.LordId;
    this.Qre = e.Version;
    this.THl = new ButtonItem_1.ButtonItem();
    this.bHl = new ButtonItem_1.ButtonItem();
    await Promise.all([this.THl?.CreateThenShowByActorAsync(this.GetItem(2).GetOwner()), this.bHl?.CreateThenShowByActorAsync(this.GetItem(3).GetOwner())]);
    this.THl.SetFunction(this.LHl);
    this.bHl.SetFunction(this.AHl);
    if (this.Qre === 2) {
      this.THl.SetLocalTextNew("Text_GymReturnToWorld_Text");
      this.bHl.SetLocalTextNew("Text_GymReChallenge_Text");
    } else if (this.Qre === 3) {
      this.THl.SetLocalTextNew("ChanllengeBackToCockpit");
      this.bHl.SetLocalTextNew("Text_GymReChallenge_Text");
    }
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), "Text_GymFail_Text");
  }
  OnStart() {
    this.e3t = new TrainingView_1.TrainingView();
    this.e3t.Show(this.GetHorizontalLayout(7));
  }
}
exports.LordGymChallengeFailView = LordGymChallengeFailView;
//# sourceMappingURL=LordGymChallengeFailView.js.map