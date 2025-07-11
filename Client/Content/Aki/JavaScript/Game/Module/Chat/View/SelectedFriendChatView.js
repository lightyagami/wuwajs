"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectedFriendChatView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
const LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView");
const SelectedFriendItem_1 = require("./SelectedFriendItem");
class SelectedFriendChatView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Ayt = undefined;
    this.cHe = () => {
      var e = new SelectedFriendItem_1.SelectedFriendItem();
      e.BindOnClicked(this.Pyt);
      return e;
    };
    this.Pyt = e => {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Chat", 5, "选择玩家", ["playerId", e]);
      }
      if (ModelManager_1.ModelManager.FriendModel.IsMyFriend(e)) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSelectChatFriend, e);
        UiManager_1.UiManager.CloseView("SelectedFriendChatView");
      } else {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("SelectChatNoFriendText");
        this.bl();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UILoopScrollViewComponent], [1, UE.UIItem], [2, UE.UIItem]];
  }
  OnStart() {
    var e = this.GetItem(1).GetOwner();
    this.Ayt = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(0), e, this.cHe, true);
    this.bl();
  }
  OnBeforeDestroy() {
    this.Ayt = undefined;
  }
  bl() {
    var e = ModelManager_1.ModelManager.FriendModel;
    var r = ModelManager_1.ModelManager.ChatModel;
    var i = [];
    for (const t of e.GetFriendSortedListIds()) {
      if (!r.IsInPrivateChatRoom(t) && !e.HasBlockedPlayer(t)) {
        i.push(t);
      }
    }
    this.Ayt.ReloadData(i);
    this.GetItem(2).SetUIActive(i.length <= 0);
  }
}
exports.SelectedFriendChatView = SelectedFriendChatView;
//# sourceMappingURL=SelectedFriendChatView.js.map