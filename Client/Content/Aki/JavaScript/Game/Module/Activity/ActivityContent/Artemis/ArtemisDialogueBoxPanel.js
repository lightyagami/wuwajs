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
    this.Uzm = undefined;
    this.s4e = undefined;
    this.xzm = false;
    this.Y_c = undefined;
    this.O8f = false;
    this.UiScrollView = undefined;
    this.W2e = () => {
      var e = new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
      e.ShowReceivedCallBack = () => this.xzm;
      return e;
    };
    this.DelayScrollToBotttom = () => {
      this.Y_c = TimerSystem_1.GameplayTimerSystem.Delay(() => {
        var e = this.O8f ? this.Uzm?.GetFirstItem() : this.Uzm?.GetLastItem();
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
    this.Uzm = new ArtemisDialogueParentItem_1.ArtemisDialogueParentItem();
    var e = this.GetVerticalLayout(1).GetOwner();
    await this.Uzm.CreateThenShowByActorAsync(e);
    this.Uzm.WaitCallback = this.DelayScrollToBotttom;
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
    this.xzm = t;
    this.s4e?.SetActive(e?.length !== 0);
    if (e?.length !== 0) {
      this.s4e?.RefreshByData(e);
    }
  }
  ShowDialogue(e, t, i) {
    this.Uzm?.RefreshChatUiItem(e, t, i);
  }
  ScrollToTop(e) {
    this.O8f = e;
  }
  PlayFixDoneSequence() {
    this.Uzm?.LeftPlayFixDoneLevelSequence();
  }
}
exports.ArtemisDialogueBoxPanel = ArtemisDialogueBoxPanel;
//# sourceMappingURL=ArtemisDialogueBoxPanel.js.map