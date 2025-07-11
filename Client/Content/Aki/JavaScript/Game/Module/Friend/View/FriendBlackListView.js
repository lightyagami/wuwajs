"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FriendBlackListView = undefined;
const UE = require("ue");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew");
const FriendController_1 = require("../FriendController");
const FriendItem_1 = require("./FriendItem");
class FriendBlackListView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.h8t = undefined;
    this.l8t = [];
    this.sGe = () => {
      var e = new FriendItem_1.FriendItem(this.Info.Name);
      e.SetIsInBlackList(true);
      return e;
    };
    this._8t = () => {
      this.u8t();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIItem], [2, UE.UIScrollViewWithScrollbarComponent], [3, UE.UIItem]];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.UpdateBlackListShow, this._8t);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.UpdateBlackListShow, this._8t);
  }
  OnStart() {
    this.c8t();
    this.h8t = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(2), this.sGe);
    FriendController_1.FriendController.RequestBlackList();
  }
  u8t() {
    this.l8t = FriendController_1.FriendController.CreateFriendItemSt(ModelManager_1.ModelManager.FriendModel.GetBlackListIds(), 0);
    this.h8t.RefreshByData(this.l8t);
    this.c8t();
  }
  c8t() {
    var e = this.GetText(0);
    var i = CommonParamById_1.configCommonParamById.GetIntConfig("blocklist_limit");
    var t = this.l8t.length;
    LguiUtil_1.LguiUtil.SetLocalText(e, "FriendBlackListCount", t, i);
    this.GetItem(3).SetUIActive(this.l8t.length <= 0);
  }
  OnBeforeDestroy() {
    this.l8t.length = 0;
    ModelManager_1.ModelManager.FriendModel.ResetShowingView();
  }
}
exports.FriendBlackListView = FriendBlackListView;
//# sourceMappingURL=FriendBlackListView.js.map