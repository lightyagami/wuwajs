"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChatExpressionView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const LguiUtil_1 = require("../../Util/LguiUtil");
const LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView");
const ChatExpressionGroupItem_1 = require("./ChatExpressionGroupItem");
const ChatExpressionItem_1 = require("./ChatExpressionItem");
class ChatExpressionView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.lHe = undefined;
    this.lSt = new Map();
    this._St = undefined;
    this.cHe = () => {
      var e = new ChatExpressionItem_1.ChatExpressionItem();
      e.BindOnClicked(this.uSt);
      return e;
    };
    this.cSt = e => {
      this.mSt(e);
    };
    this.uSt = e => {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSelectExpression, e);
      UiManager_1.UiManager.CloseView("ChatExpressionView");
    };
    this.dSt = () => {
      UiManager_1.UiManager.CloseView("ChatExpressionView");
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UILoopScrollViewComponent], [4, UE.UIItem], [5, UE.UIButtonComponent]];
    this.BtnBindInfo = [[5, this.dSt]];
  }
  OnStart() {
    var e = this.GetItem(1);
    var i = this.GetItem(0);
    var t = i.GetOwner();
    this.lHe = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(3), t, this.cHe);
    i.SetUIActive(false);
    e.SetUIActive(false);
    this.bl();
  }
  OnBeforeDestroy() {
    this.CSt();
    this.lSt.clear();
    this._St = undefined;
    this.lHe = undefined;
  }
  bl() {
    this.CSt();
    var e = ConfigManager_1.ConfigManager.ChatConfig.GetAllExpressionGroupConfig();
    if (e) {
      for (const i of e) {
        this.gSt(i);
      }
      var e = e[0];
      if (e) {
        e = e?.Id;
        this.mSt(e);
      }
    }
  }
  mSt(e) {
    if (this._St) {
      this._St.SetState(0);
    }
    var i = this.fSt(e);
    i.SetState(1);
    this._St = i;
    var i = ConfigManager_1.ConfigManager.ChatConfig.GetAllExpressionConfigByGroupId(e);
    this.lHe.ReloadData(i);
  }
  gSt(e) {
    var i = this.GetItem(1).GetOwner();
    var i = LguiUtil_1.LguiUtil.DuplicateActor(i, this.GetItem(4));
    var i = new ChatExpressionGroupItem_1.ChatExpressionGroupItem(i);
    i.Refresh(e);
    i.SetState(0);
    i.BindOnClicked(this.cSt);
    i.SetActive(true);
    this.lSt.set(e.Id, i);
  }
  fSt(e) {
    return this.lSt.get(e);
  }
  CSt() {
    for (const e of this.lSt.values()) {
      e.Destroy();
    }
  }
}
exports.ChatExpressionView = ChatExpressionView;
//# sourceMappingURL=ChatExpressionView.js.map