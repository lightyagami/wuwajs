"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ArtemisDialogueBoxPanel = undefined;
const UE = require("ue");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const CommonItemSmallItemGrid_1 = require("../../../Common/ItemGrid/CommonItemSmallItemGrid");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const ArtemisDialogueParentItem_1 = require("./ArtemisDialogueParentItem");
class ArtemisDialogueBoxPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.pef = undefined;
    this.s4e = undefined;
    this.vef = false;
    this.Y_c = undefined;
    this.zYf = false;
    this.UiScrollView = undefined;
    this.W2e = () => {
      var e = new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
      e.ShowReceivedCallBack = () => this.vef;
      return e;
    };
    this.DelayScrollToBotttom = () => {
      this.Y_c = TimerSystem_1.GameplayTimerSystem.Delay(() => {
        var e = this.zYf ? this.pef?.GetFirstItem() : this.pef?.GetLastItem();
        if (e) {
          this.UiScrollView?.StopMovement();
          this.UiScrollView.ScrollTo(e);
        }
      }, 100);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIScrollViewWithScrollbarComponent], [1, UE.UIVerticalLayout], [2, UE.UIItem], [3, UE.UIText], [4, UE.UIHorizontalLayout], [5, UE.UIItem], [6, UE.UIScrollbarComponent]];
  }
  async OnBeforeStartAsync() {
    this.pef = new ArtemisDialogueParentItem_1.ArtemisDialogueParentItem();
    var e = this.GetVerticalLayout(1).GetOwner();
    await this.pef.CreateThenShowByActorAsync(e);
    this.pef.WaitCallback = this.DelayScrollToBotttom;
  }
  OnStart() {
    this.s4e = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(4), this.W2e);
    this.UiScrollView = this.GetScrollViewWithScrollbar(0);
  }
  OnBeforeDestroy() {
    if (this.Y_c?.Valid()) {
      this.Y_c.Remove();
      this.Y_c = undefined;
    }
  }
  SetShowRewardItems(e) {
    this.GetItem(2)?.SetUIActive(e);
  }
  SetRewardItems(e, t) {
    this.vef = t;
    this.s4e?.SetActive(e?.length !== 0);
    if (e?.length !== 0) {
      this.s4e?.RefreshByData(e);
    }
  }
  ShowDialogue(e, t, i) {
    this.pef?.RefreshChatUiItem(e, t, i);
  }
  ScrollToTop(e) {
    this.zYf = e;
  }
  PlayFixDoneSequence() {
    this.pef?.LeftPlayFixDoneLevelSequence();
  }
}
exports.ArtemisDialogueBoxPanel = ArtemisDialogueBoxPanel;
//# sourceMappingURL=ArtemisDialogueBoxPanel.js.map