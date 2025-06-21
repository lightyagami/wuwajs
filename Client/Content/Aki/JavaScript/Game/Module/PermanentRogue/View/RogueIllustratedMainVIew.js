"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.RogueIllustratedView = void 0;
const UE = require("ue"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem"),
  UiManager_1 = require("../../../Ui/UiManager"),
  RogueOutButtonItem_1 = require("./RogueOutButtonItem");
class RogueIllustratedView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments), this.lqe = void 0, this.x5c = void 0, this.D5c = void 0, this.U5c = void 0, this._5e = () => {
      this.CloseMe()
    }, this.B5c = () => {
      UiManager_1.UiManager.OpenView("RogueTokenIllustratedView")
    }, this.k5c = () => {
      UiManager_1.UiManager.OpenView("RogueEventIllustratedView", !0)
    }, this.O5c = () => {
      UiManager_1.UiManager.OpenView("RogueEventIllustratedView", !1)
    }, this.q5c = () => {}, this.QOe = () => {}, this.G5c = () => {
      this.UnbindRedDot(), this.BindRedDot(), this.RefreshBtn()
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIButtonComponent],
      [5, UE.UIButtonComponent]
    ], this.BtnBindInfo = [
      [4, this.q5c],
      [5, this.QOe]
    ]
  }
  async OnBeforeStartAsync() {
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0)), this.lqe.SetCloseCallBack(this._5e), this.lqe.SetHelpBtnActive(!1);
    var t = [];
    this.x5c = new RogueOutButtonItem_1.RogueButtonItemCollection, this.x5c.SetOnClickCall(this.B5c), t.push(this.x5c.CreateThenShowByActorAsync(this.GetItem(1).GetOwner())), this.D5c = new RogueOutButtonItem_1.RogueButtonItemCollection, this.D5c.SetOnClickCall(this.k5c), t.push(this.D5c.CreateThenShowByActorAsync(this.GetItem(2).GetOwner())), this.U5c = new RogueOutButtonItem_1.RogueButtonItemCollection, this.U5c.SetOnClickCall(this.O5c), t.push(this.U5c.CreateThenShowByActorAsync(this.GetItem(3).GetOwner())), await Promise.all(t)
  }
  OnStart() {
    this.GetButton(4).RootUIComp.SetUIActive(!1), this.GetButton(5).RootUIComp.SetUIActive(!1)
  }
  OnBeforeShow() {
    this.RefreshBtn(), this.BindRedDot()
  }
  OnBeforeHide() {
    this.UnbindRedDot()
  }
  OnBeforeDestroy() {
    this.lqe = void 0, this.x5c = void 0, this.D5c = void 0, this.U5c = void 0
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PermanentRogueRewardUpdate, this.G5c)
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PermanentRogueRewardUpdate, this.G5c)
  }
  RefreshBtn() {
    var t = ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetTypeIllustratedCountInfo(),
      e = ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey("Rogue_Collection_Progress", "Rogue_Collection_Progress"),
      i = t.get(0),
      s = StringUtils_1.StringUtils.Format(e ?? "", i ? i[0].toString() : "0", i ? i[1].toString() : "0"),
      s = (this.x5c?.SetNum(s), this.x5c?.SetButtonDone(!i || i[0] === i[1]), t.get(1)),
      i = StringUtils_1.StringUtils.Format(e ?? "", s ? s[0].toString() : "0", s ? s[1].toString() : "0"),
      i = (this.D5c?.SetNum(i), this.D5c?.SetButtonDone(!s || s[0] === s[1]), t.get(2)),
      s = StringUtils_1.StringUtils.Format(e ?? "", i ? i[0].toString() : "0", i ? i[1].toString() : "0");
    this.U5c?.SetNum(s), this.U5c?.SetButtonDone(!i || i[0] === i[1])
  }
  BindRedDot() {
    this.x5c?.BindRedDot("RogueResIllustratedTokenTab", 0), this.D5c?.BindRedDot("RogueResIllustratedNormalTab", 0), this.U5c?.BindRedDot("RogueResIllustratedMapTab", 0)
  }
  UnbindRedDot() {
    this.x5c.UnBindRedDot(), this.D5c.UnBindRedDot(), this.U5c.UnBindRedDot()
  }
}
exports.RogueIllustratedView = RogueIllustratedView;
//# sourceMappingURL=RogueIllustratedMainVIew.js.map