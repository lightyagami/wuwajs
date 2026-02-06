"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattleHonamiStoryMapLevelHoverItem = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const UiSequencePlayer_1 = require("../../../../Ui/Base/UiSequencePlayer");
const HonamiStoryUtil_1 = require("../../../HonamiStory/HonamiStoryUtil");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class HonamiStoryHoverDescItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText]];
  }
  OnStart() {
    this.GetText(0).SetUIActive(false);
  }
  Refresh() {
    var e = ModelManager_1.ModelManager.HonamiStoryModel.PollutionLevel;
    var t = ModelManager_1.ModelManager.HonamiStoryModel.PollutionLevelMap?.get(e);
    var i = (t?.PersistMilliseconds ?? 0) * MathUtils_1.MathUtils.MillisecondToSecond;
    var t = t?.MonsterEnhanceLevel ?? 0;
    if (HonamiStoryUtil_1.HonamiStoryUtil.CheckInHonamiStoryTopTower()) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), "HonamiStory_PollutionTowerLevelTips", e, t);
    } else {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), "HonamiStory_PollutionLevelTips", e, i, t);
    }
  }
}
class HonamiStoryHoverInfoItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.SGe = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIItem], [2, UE.UILayoutBase]];
  }
  async OnBeforeStartAsync() {
    this.SGe = new HonamiStoryHoverDescItem();
    await this.SGe.CreateThenShowByActorAsync(this.GetItem(1).GetOwner());
  }
  OnStart() {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), "HonamiStory_PollutionLevel");
  }
  OnBeforeShow() {
    this.Refresh();
  }
  Refresh() {
    this.SGe?.Refresh();
  }
}
class BattleHonamiStoryMapLevelHoverItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.xKt = undefined;
    this.$pt = undefined;
    this.TDe = undefined;
    this.vOm = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.xKt = new HonamiStoryHoverInfoItem();
    await this.xKt.CreateThenShowByActorAsync(this.GetItem(1).GetOwner());
  }
  OnStart() {
    var e = this.RootItem;
    e.SetAnchorHAlign(2);
    e.SetAnchorVAlign(1);
    e.SetAnchorOffsetX(0);
    e.SetAnchorOffsetY(0);
    this.$pt = new UiSequencePlayer_1.UiSequencePlayer(e);
  }
  OnBeforeShow() {
    this.$pt.StopPrevSequence(false, true);
    this.$pt.PlaySequencePurely("Start");
    this.TDe = TimerSystem_1.GameplayTimerSystem.Delay(() => {
      this.TDe = undefined;
      this.$pt?.StopPrevSequence(false, true);
      this.SetActive(false);
      this.vOm?.();
    }, 8000);
  }
  async OnBeforeHideAsync() {
    this.TDe?.Remove();
    this.TDe = undefined;
    this.$pt.StopPrevSequence(false, true);
    await this.$pt?.PlaySequenceAsync("Close", new CustomPromise_1.CustomPromise());
  }
  Refresh() {
    this.xKt?.Refresh();
  }
  RegisterOnAutoClose(e) {
    this.vOm = e;
  }
}
exports.BattleHonamiStoryMapLevelHoverItem = BattleHonamiStoryMapLevelHoverItem;
//# sourceMappingURL=BattleHonamiStoryMapLevelHoverItem.js.map