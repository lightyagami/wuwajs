"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueIllustratedView = undefined;
const UE = require("ue");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem");
const UiManager_1 = require("../../../Ui/UiManager");
const RogueOutButtonItem_1 = require("./RogueOutButtonItem");
class RogueIllustratedView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.lqe = undefined;
    this.x5c = undefined;
    this.D5c = undefined;
    this.U5c = undefined;
    this._5e = () => {
      this.CloseMe();
    };
    this.B5c = () => {
      UiManager_1.UiManager.OpenView("RogueTokenIllustratedView");
    };
    this.k5c = () => {
      UiManager_1.UiManager.OpenView("RogueEventIllustratedView", true);
    };
    this.O5c = () => {
      UiManager_1.UiManager.OpenView("RogueEventIllustratedView", false);
    };
    this.q5c = () => {};
    this.QOe = () => {};
    this.G5c = () => {
      this.UnbindRedDot();
      this.BindRedDot();
      this.RefreshBtn();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIButtonComponent], [5, UE.UIButtonComponent]];
    this.BtnBindInfo = [[4, this.q5c], [5, this.QOe]];
  }
  async OnBeforeStartAsync() {
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    this.lqe.SetCloseCallBack(this._5e);
    this.lqe.SetHelpBtnActive(false);
    var t = [];
    this.x5c = new RogueOutButtonItem_1.RogueButtonItemCollection();
    this.x5c.SetOnClickCall(this.B5c);
    t.push(this.x5c.CreateThenShowByActorAsync(this.GetItem(1).GetOwner()));
    this.D5c = new RogueOutButtonItem_1.RogueButtonItemCollection();
    this.D5c.SetOnClickCall(this.k5c);
    t.push(this.D5c.CreateThenShowByActorAsync(this.GetItem(2).GetOwner()));
    this.U5c = new RogueOutButtonItem_1.RogueButtonItemCollection();
    this.U5c.SetOnClickCall(this.O5c);
    t.push(this.U5c.CreateThenShowByActorAsync(this.GetItem(3).GetOwner()));
    await Promise.all(t);
  }
  OnStart() {
    this.GetButton(4).RootUIComp.SetUIActive(false);
    this.GetButton(5).RootUIComp.SetUIActive(false);
  }
  OnBeforeShow() {
    this.RefreshBtn();
    this.BindRedDot();
  }
  OnBeforeHide() {
    this.UnbindRedDot();
  }
  OnBeforeDestroy() {
    this.lqe = undefined;
    this.x5c = undefined;
    this.D5c = undefined;
    this.U5c = undefined;
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PermanentRogueRewardUpdate, this.G5c);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PermanentRogueRewardUpdate, this.G5c);
  }
  RefreshBtn() {
    var t = ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetTypeIllustratedCountInfo();
    var e = ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey("Rogue_Collection_Progress", "Rogue_Collection_Progress");
    var i = t.get(0);
    var s = StringUtils_1.StringUtils.Format(e ?? "", i ? i[0].toString() : "0", i ? i[1].toString() : "0");
    this.x5c?.SetNum(s);
    this.x5c?.SetButtonDone(!i || i[0] === i[1]);
    var s = t.get(1);
    var i = StringUtils_1.StringUtils.Format(e ?? "", s ? s[0].toString() : "0", s ? s[1].toString() : "0");
    this.D5c?.SetNum(i);
    this.D5c?.SetButtonDone(!s || s[0] === s[1]);
    var i = t.get(2);
    var s = StringUtils_1.StringUtils.Format(e ?? "", i ? i[0].toString() : "0", i ? i[1].toString() : "0");
    this.U5c?.SetNum(s);
    this.U5c?.SetButtonDone(!i || i[0] === i[1]);
  }
  BindRedDot() {
    this.x5c?.BindRedDot("RogueResIllustratedTokenTab", 0);
    this.D5c?.BindRedDot("RogueResIllustratedNormalTab", 0);
    this.U5c?.BindRedDot("RogueResIllustratedMapTab", 0);
  }
  UnbindRedDot() {
    this.x5c.UnBindRedDot();
    this.D5c.UnBindRedDot();
    this.U5c.UnBindRedDot();
  }
}
exports.RogueIllustratedView = RogueIllustratedView;
//# sourceMappingURL=RogueIllustratedMainVIew.js.map