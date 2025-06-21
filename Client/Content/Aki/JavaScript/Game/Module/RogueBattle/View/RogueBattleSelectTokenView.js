"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.RogueBattleSelectTokenView = void 0;
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  UiManager_1 = require("../../../Ui/UiManager"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  RogueBattleTokenItem_1 = require("../Component/RogueBattleTokenItem"),
  RogueBattleTopPanel_1 = require("../Component/RogueBattleTopPanel");
class RogueBattleSelectTokenView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments), this.lV_ = void 0, this.Otl = void 0, this.ilo = () => {
      var e = this.lV_.GetSelectedGridIndex();
      e < 0 || ModelManager_1.ModelManager.MapRogueModel.GetOpData(this.OpenParam).Select(e)
    }, this.vlo = () => {}, this.UOe = () => {
      UiManager_1.UiManager.OpenView("RogueBattleSummary")
    }, this.tV_ = () => {
      var e = new RogueBattleTokenItem_1.RogueBattleTokenItem;
      return e.OnClickHandle = this.gqc, e
    }, this.gqc = e => {
      void 0 === e ? (this.lV_?.DeselectCurrentGridProxy(), this.GetButton(5).SetSelfInteractive(!1)) : (this.GetButton(5).SetSelfInteractive(!0), this.lV_?.SelectGridProxy(e)), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RogueBattleSelectOptionPreview)
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIHorizontalLayout],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIButtonComponent],
      [6, UE.UIButtonComponent],
      [7, UE.UITexture],
      [8, UE.UIText]
    ], this.BtnBindInfo = [
      [5, this.ilo],
      [6, this.vlo]
    ]
  }
  async OnBeforeStartAsync() {
    this.lV_ = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(2), this.tV_);
    var e = this.OpenParam,
      e = ModelManager_1.ModelManager.MapRogueModel.GetOpData(e),
      e = (e.CloseViewFunc = () => {
        this.CloseMe()
      }, e.UpdateViewFunc = () => {
        this.P91()
      }, e.Data.GEc?.QEc);
    e ? (this.Otl = new RogueBattleTopPanel_1.RogueBattleTopPanel, this.Otl.ClickDetailCallback = this.UOe, this.GetButton(6).RootUIComp.SetUIActive(!1), await Promise.all([this.Otl.CreateThenShowByActorAsync(this.GetItem(1).GetOwner()), this.lV_.RefreshByDataAsync(e.fIc)]), this.Otl.SetCloseBtnActive(!1)) : Log_1.Log.CheckError() && Log_1.Log.Error("RogueBattle", 34, "没有肉鸽界面数据!, RogueBattleSelectTokenView")
  }
  P91() {
    var e = ModelManager_1.ModelManager.MapRogueModel.GetOpData(this.OpenParam).Data.GEc?.QEc?.fIc;
    e && this.lV_?.RefreshByData(e)
  }
}
exports.RogueBattleSelectTokenView = RogueBattleSelectTokenView;
//# sourceMappingURL=RogueBattleSelectTokenView.js.map