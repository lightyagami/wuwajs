"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DangoAbyssBattlePanel = undefined;
const UE = require("ue");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiAsyncTask_1 = require("../../../../Ui/Base/UiAsyncTask");
const UiManager_1 = require("../../../../Ui/UiManager");
const BattleVisibleChildView_1 = require("../../../BattleUi/Views/BattleChildView/BattleVisibleChildView");
const DangoAbyssBattleTreasureItem_1 = require("./DangoAbyssBattleTreasureItem");
class DangoAbyssBattlePanel extends BattleVisibleChildView_1.BattleVisibleChildView {
  constructor() {
    super(...arguments);
    this.RewardTimeMap = new Map();
    this.FullTime = 0;
    this.UFc = undefined;
    this.GOe = undefined;
    this.YP = () => {
      UiManager_1.UiManager.OpenView("DangoAbyssInfoView");
    };
    this.h6c = () => {
      this.Qbe();
      this.kFc();
      this.CI1();
    };
    this.DFc = () => {
      this.BFc();
    };
    this.Vtl = () => {
      this.sSt();
      this.kFc();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIText], [2, UE.UISliderComponent], [3, UE.UIItem], [4, UE.UIItem], [6, UE.UIText], [5, UE.UIText], [7, UE.UIText], [8, UE.UIText]];
    this.BtnBindInfo = [[0, this.YP]];
  }
  async OnBeforeStartAsync() {
    this.FullTime = ModelManager_1.ModelManager.DangoAbyssModel.GetCurrentAbyssTotalScore();
    this.RewardTimeMap = ModelManager_1.ModelManager.DangoAbyssModel.GetCurrentAbyssTreasureMap();
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnShareReviveTimesChange, this.DFc);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnAbyssRoomInfoUpdate, this.h6c);
    this.UFc = new DangoAbyssBattleTreasureItem_1.DangoAbyssBattleTreasureRoot();
    await this.UFc.CreateThenShowByActorAsync(this.GetItem(3).GetOwner());
    this.UFc.InitItem(this.GetItem(3), this.GetItem(4));
    await this.UFc.Init(this.RewardTimeMap, this.FullTime);
    this.GOe = TimerSystem_1.GameplayTimerSystem.Forever(this.Vtl, 1000);
  }
  CI1() {
    var e = ModelManager_1.ModelManager.DangoAbyssModel.GetInstanceProgress();
    this.GetText(8)?.SetText(StringUtils_1.StringUtils.Format("{0}%", (e * 100).toFixed(0)));
  }
  kFc() {
    var e = ModelManager_1.ModelManager.DangoAbyssModel.GetInstanceProgress();
    this.OFc(e);
    this.qFc(e);
  }
  qFc(e) {
    var t = new UiAsyncTask_1.UiAsyncTask("DangoAbyss.UpdateRoomData", async () => {
      this.FullTime = ModelManager_1.ModelManager.DangoAbyssModel.GetCurrentAbyssTotalScore();
      this.RewardTimeMap = ModelManager_1.ModelManager.DangoAbyssModel.GetCurrentAbyssTreasureMap();
      await this.UFc.Init(this.RewardTimeMap, this.FullTime);
      this.UFc?.RefreshRewardItem(e * 100);
    });
    this.RunAsyncTask(t);
  }
  OnBeforeShow() {
    this.kFc();
    this.BFc();
    this.Qbe();
    this.CI1();
  }
  BFc() {
    var e = ModelManager_1.ModelManager.DangoAbyssModel.GetInstanceReviveTipTips();
    this.GetText(5)?.SetText(e);
  }
  Qbe() {
    var e = ModelManager_1.ModelManager.DangoAbyssModel.GetInstanceFloorText();
    this.GetText(6)?.SetText("" + e);
  }
  OFc(e) {
    this.GetSlider(2)?.SetValue(e);
  }
  sSt() {
    var e = ModelManager_1.ModelManager.DangoAbyssModel.GetInstanceRemainTimeText();
    this.GetText(1)?.SetText(e);
  }
  OnBeforeDestroy() {
    if (this.GOe) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.GOe);
      this.GOe = undefined;
    }
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnShareReviveTimesChange, this.DFc);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnAbyssRoomInfoUpdate, this.h6c);
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    if (e.length !== 0 && e[0] === "DangoMissionButton" && (e = this.GetButton(0)?.GetRootComponent())) {
      return [e, e];
    } else {
      return undefined;
    }
  }
}
exports.DangoAbyssBattlePanel = DangoAbyssBattlePanel;
//# sourceMappingURL=DangoAbyssBattlePanel.js.map