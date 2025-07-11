"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaCardRewardView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiAsyncTask_1 = require("../../../../Ui/Base/UiAsyncTask");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const PhantomArenaController_1 = require("../../PhantomArenaController");
const UnlockViewCardItem_1 = require("../CardItem/Item/UnlockViewCardItem");
class PhantomArenaCardRewardView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.eVi = undefined;
    this.CardId = 0;
    this.IsWaitingChange = false;
    this.dV1 = () => {
      if (ModelManager_1.ModelManager.PhantomArenaModel.CardUnlockQueue.length > 0) {
        this.ShowNext();
      } else {
        this.CloseMe();
      }
    };
    this.vCu = e => {
      if (e === "CardChange" && this.IsWaitingChange) {
        this.RefreshByCardId(this.CardId);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIButtonComponent], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem]];
    this.BtnBindInfo = [[1, this.dV1]];
  }
  async OnBeforeStartAsync() {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), "PhantomBattle_1089");
    this.eVi = new UnlockViewCardItem_1.UnlockViewCardItem();
    await this.eVi.CreateThenShowByActorAsync(this.GetItem(2).GetOwner());
  }
  OnStart() {
    this.GetItem(3).SetUIActive(true);
    this.GetItem(4).SetUIActive(false);
    this.CardId = ModelManager_1.ModelManager.PhantomArenaModel.CardUnlockQueue.shift();
    this.RefreshByCardId(this.CardId);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.vCu);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.vCu);
  }
  RefreshByCardId(e) {
    this.eVi.Refresh(e);
  }
  ShowNext() {
    var e = new UiAsyncTask_1.UiAsyncTask("PhantomArenaCardRewardView", async () => {
      await this.ShowNextAsync();
    });
    this.RunAsyncTask(e);
  }
  async ShowNextAsync() {
    if (ModelManager_1.ModelManager.PhantomArenaModel.CardUnlockQueue.length !== 0) {
      this.CardId = ModelManager_1.ModelManager.PhantomArenaModel.CardUnlockQueue.shift();
      this.IsWaitingChange = true;
      await this.PlaySequenceAsync("Switch");
      this.IsWaitingChange = false;
    }
  }
  OnAfterDestroy() {
    PhantomArenaController_1.PhantomArenaController.PostUnlockView();
  }
}
exports.PhantomArenaCardRewardView = PhantomArenaCardRewardView;
//# sourceMappingURL=PhantomArenaCardRewardView.js.map