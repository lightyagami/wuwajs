"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapRoguePopupBase = undefined;
const UE = require("ue");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const MapRogueMoodBar_1 = require("../MapRogueMoodBar");
const MapRoguePanelLv_1 = require("./MapRoguePanelLv");
const MapRogueTitleItem_1 = require("./MapRogueTitleItem");
const LV_CHANGE_DELAY = 500;
class MapRoguePopupBase extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.LevelSequencePlayer = undefined;
    this.CaptionItem = undefined;
    this.PanelLv = undefined;
    this.MapTitleItem = undefined;
    this.MoodBar = undefined;
    this.OnMaskClick = undefined;
    this.B6e = () => {
      ControllerHolder_1.ControllerHolder.MapRogueController.OpenExploreEnd();
    };
    this.XTt = () => {
      this.OnMaskClick?.();
    };
    this.JGn = () => {
      ControllerHolder_1.ControllerHolder.MapRogueController.OpenMapHelpView();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[2, UE.UIItem], [0, UE.UIItem], [1, UE.UIItem], [3, UE.UIButtonComponent], [4, UE.UIItem]];
    this.BtnBindInfo = [[3, this.XTt]];
  }
  async OnBeforeStartAsync() {
    var e = [];
    this.CaptionItem = new PopupCaptionItem_1.PopupCaptionItem();
    e.push(this.CaptionItem.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()));
    this.CaptionItem.SetCloseCallBack(this.B6e);
    this.CaptionItem.SetHelpCallBack(this.JGn);
    e.push(this.CaptionItem.SetCurrencyItemList([ModelManager_1.ModelManager.MapRogueModel.GetRogueCurrencyItemId()]));
    this.MapTitleItem = new MapRogueTitleItem_1.MapRogueTitleItem();
    e.push(this.MapTitleItem.CreateThenShowByActorAsync(this.GetItem(4).GetOwner()));
    this.PanelLv = new MapRoguePanelLv_1.MapRoguePanelLv();
    e.push(this.PanelLv.CreateThenShowByActorAsync(this.GetItem(2).GetOwner()));
    this.MoodBar = new MapRogueMoodBar_1.MapRogueMoodBar();
    e.push(this.MoodBar.CreateThenShowByResourceIdAsync("UiItem_MoodBar", this.GetItem(1)));
    await Promise.all(e);
    this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.SetMaskButtonVisible(false);
    this.CaptionItem.SetHelpBtnActive(true);
  }
  OnBeforeShow() {
    var e = ModelManager_1.ModelManager.MapRogueModel.GameInfo;
    if (e) {
      this.MoodBar.SetLimit(e.MoodMin, e.MoodMax);
      this.MoodBar.SetCurrentValue(e.Mood);
      var i = e.TeamLvAnim;
      this.PanelLv.SetLv(i, false);
      const t = e.TeamLv;
      if (i !== t) {
        TimerSystem_1.GameplayTimerSystem.Delay(() => {
          this.PanelLv.SetLv(t, true);
        }, LV_CHANGE_DELAY);
      }
    }
  }
  SetMaskButtonVisible(e) {
    this.GetButton(3).RootUIComp.SetUIActive(e);
  }
  SetHelpCallBack(e) {
    this.CaptionItem?.SetHelpCallBack(e);
  }
}
exports.MapRoguePopupBase = MapRoguePopupBase;
//# sourceMappingURL=MapRoguePopupBase.js.map