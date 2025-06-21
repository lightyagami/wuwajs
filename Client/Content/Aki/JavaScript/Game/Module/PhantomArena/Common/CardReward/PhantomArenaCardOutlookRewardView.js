"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaCardOutlookRewardView = void 0;
const UE = require("ue"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiAsyncTask_1 = require("../../../../Ui/Base/UiAsyncTask"),
  UiViewBase_1 = require("../../../../Ui/Base/UiViewBase"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  PhantomArenaController_1 = require("../../PhantomArenaController"),
  UnlockViewCardItem_1 = require("../CardItem/Item/UnlockViewCardItem");
class PhantomArenaCardOutlookRewardView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments), this.eVi = void 0, this.CardId = 0, this.IsWaitingChange = !1, this.k41 = () => {
      0 < ModelManager_1.ModelManager.PhantomArenaModel.CardOutlookUnlockQueue.length ? this.ShowNext() : this.CloseMe()
    }, this.Xlu = e => {
      "Change" === e && this.IsWaitingChange && this.RefreshByCardId(this.CardId)
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIButtonComponent],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem]
    ], this.BtnBindInfo = [
      [1, this.k41]
    ]
  }
  async OnBeforeStartAsync() {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), "PhantomBattle_1090"), this.eVi = new UnlockViewCardItem_1.UnlockViewCardItem, await this.eVi.CreateThenShowByActorAsync(this.GetItem(2).GetOwner())
  }
  OnStart() {
    this.GetItem(3).SetUIActive(!0), this.GetItem(4).SetUIActive(!1), this.CardId = ModelManager_1.ModelManager.PhantomArenaModel.CardOutlookUnlockQueue.shift(), this.RefreshByCardId(this.CardId)
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.Xlu)
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.Xlu)
  }
  RefreshByCardId(e) {
    this.eVi.Refresh(e)
  }
  ShowNext() {
    var e = new UiAsyncTask_1.UiAsyncTask("PhantomArenaCardOutlookRewardView", async () => {
      await this.ShowNextAsync()
    });
    this.RunAsyncTask(e)
  }
  async ShowNextAsync() {
    0 !== ModelManager_1.ModelManager.PhantomArenaModel.CardOutlookUnlockQueue.length && (this.CardId = ModelManager_1.ModelManager.PhantomArenaModel.CardUnlockQueue.shift(), this.IsWaitingChange = !0, await this.PlaySequenceAsync("Switch"), this.IsWaitingChange = !1)
  }
  OnAfterDestroy() {
    PhantomArenaController_1.PhantomArenaController.PostUnlockView()
  }
}
exports.PhantomArenaCardOutlookRewardView = PhantomArenaCardOutlookRewardView;
//# sourceMappingURL=PhantomArenaCardOutlookRewardView.js.map