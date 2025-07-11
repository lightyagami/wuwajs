"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityCorniceMeetingTabItem = undefined;
const UE = require("ue");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const RedDotController_1 = require("../../../../RedDot/RedDotController");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const ActivityCorniceMeetingController_1 = require("./ActivityCorniceMeetingController");
const ROME_ICON_PATH = "/Game/Aki/UI/UIResources/Common/Atlas/SP_ComRomeText_0{0}.SP_ComRomeText_0{1}";
class ActivityCorniceMeetingTabItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.ScrollViewDelegate = undefined;
    this.GridIndex = 0;
    this.DisplayIndex = 0;
    this.LevelPlayId = 0;
    this.qFe = false;
    this.jbe = t => {
      if (t === 1) {
        this.ScrollViewDelegate.SelectGridProxy(this.GridIndex, this.DisplayIndex, true);
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnClickActivityCorniceMeetingTab, this.LevelPlayId);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.LevelPlayId);
    };
  }
  Refresh(t, e, i) {
    this.LevelPlayId = t;
    this.GridIndex = i;
    this.Og();
    if (e) {
      this.ScrollViewDelegate?.SelectGridProxy(this.GridIndex, this.DisplayIndex, false);
    }
    this.TryBindRedDot();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText], [2, UE.UISprite], [3, UE.UISprite], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UISprite], [8, UE.UISprite], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UITexture]];
    this.BtnBindInfo = [[0, this.jbe]];
  }
  OnStart() {
    this.GetExtendToggle(0).SetToggleState(0, false);
  }
  TryBindRedDot() {
    if (!this.qFe) {
      this.qFe = true;
      RedDotController_1.RedDotController.BindRedDot("ActivityCorniceMeeting", this.GetItem(10), t => {
        this.GetItem(10).SetUIActive(t);
      }, this.LevelPlayId);
      RedDotController_1.RedDotController.BindRedDot("ActivityCorniceMeeting", this.GetItem(6), t => {
        this.GetItem(6).SetUIActive(t);
      }, this.LevelPlayId);
    }
  }
  OnBeforeDestroy() {
    RedDotController_1.RedDotController.UnBindGivenUi("ActivityCorniceMeeting", this.GetItem(10), this.LevelPlayId);
    RedDotController_1.RedDotController.UnBindGivenUi("ActivityCorniceMeeting", this.GetItem(6), this.LevelPlayId);
    this.GetSprite(7).SetSprite(undefined);
  }
  Og() {
    var t = ActivityCorniceMeetingController_1.ActivityCorniceMeetingController.GetCurrentActivityData().GetLevelEntryData(this.LevelPlayId);
    this.SetTextureByPath(t.GetBackgroundPath(), this.GetTexture(11));
    this.mGe();
    this.GFe();
    this.NFe();
  }
  mGe() {
    var t = ActivityCorniceMeetingController_1.ActivityCorniceMeetingController.GetCurrentActivityData().GetLevelEntryData(this.LevelPlayId);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), t.GetTitle());
  }
  GFe() {
    var t = ActivityCorniceMeetingController_1.ActivityCorniceMeetingController.GetCurrentActivityData().GetLevelEntryData(this.LevelPlayId);
    this.GetSprite(3).SetUIActive(t.IsRewardAllFinished());
    this.GetSprite(8).SetUIActive(t.IsRewardAllFinished());
    this.GetSprite(2).SetUIActive(false);
    var t = (this.GridIndex + 1).toString();
    this.SetSpriteByPath(StringUtils_1.StringUtils.Format(ROME_ICON_PATH, t, t), this.GetSprite(7), false);
  }
  NFe() {
    var t = ActivityCorniceMeetingController_1.ActivityCorniceMeetingController.GetCurrentActivityData();
    this.GetItem(9).SetUIActive(!t.GetIsShow(this.LevelPlayId));
    this.GetItem(5).SetUIActive(!t.GetIsShow(this.LevelPlayId));
    this.GetItem(4).SetUIActive(!t.GetIsShow(this.LevelPlayId));
  }
  Clear() {}
  OnSelected(t) {
    this.GetExtendToggle(0).SetToggleState(1, t);
    var t = ActivityCorniceMeetingController_1.ActivityCorniceMeetingController.GetCurrentActivityData();
    t.CurrentSelectLevelPlayId = this.LevelPlayId;
    var e = t.GetLevelEntryData(this.LevelPlayId);
    if (t.GetIsShow(this.LevelPlayId)) {
      if (e.GetChallengeNewLocalRedDot()) {
        e.SetChallengeLocalRedDot(false);
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCorniceMeetingRedDot, this.LevelPlayId);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.LevelPlayId);
  }
  OnDeselected(t) {
    this.GetExtendToggle(0).SetToggleState(0, t);
  }
  GetKey(t, e) {
    return this.LevelPlayId;
  }
}
exports.ActivityCorniceMeetingTabItem = ActivityCorniceMeetingTabItem;
//# sourceMappingURL=ActivityCorniceMeetingTabItem.js.map