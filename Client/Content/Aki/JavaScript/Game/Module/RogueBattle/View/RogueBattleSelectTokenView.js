"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueBattleSelectTokenView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const RogueBattleTokenItem_1 = require("../Component/RogueBattleTokenItem");
const RogueBattleTopPanel_1 = require("../Component/RogueBattleTopPanel");
class RogueBattleSelectTokenView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.lV_ = undefined;
    this.Otl = undefined;
    this.ilo = () => {
      var e = this.lV_.GetSelectedGridIndex();
      if (!(e < 0)) {
        ModelManager_1.ModelManager.MapRogueModel.GetOpData(this.OpenParam).Select(e);
      }
    };
    this.vlo = () => {};
    this.UOe = () => {
      UiManager_1.UiManager.OpenView("RogueBattleSummary");
    };
    this.tV_ = () => {
      var e = new RogueBattleTokenItem_1.RogueBattleTokenItem();
      e.OnClickHandle = this.gqc;
      return e;
    };
    this.gqc = e => {
      if (e === undefined) {
        this.lV_?.DeselectCurrentGridProxy();
        this.GetButton(5).SetSelfInteractive(false);
      } else {
        this.GetButton(5).SetSelfInteractive(true);
        this.lV_?.SelectGridProxy(e);
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RogueBattleSelectOptionPreview);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIHorizontalLayout], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIButtonComponent], [6, UE.UIButtonComponent], [7, UE.UITexture], [8, UE.UIText]];
    this.BtnBindInfo = [[5, this.ilo], [6, this.vlo]];
  }
  async OnBeforeStartAsync() {
    this.lV_ = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(2), this.tV_);
    var e = this.OpenParam;
    var e = ModelManager_1.ModelManager.MapRogueModel.GetOpData(e);
    e.CloseViewFunc = () => {
      this.CloseMe();
    };
    e.UpdateViewFunc = () => {
      this.mH1();
    };
    var e = e.Data.GEc?.QEc;
    if (e) {
      this.Otl = new RogueBattleTopPanel_1.RogueBattleTopPanel();
      this.Otl.ClickDetailCallback = this.UOe;
      this.GetButton(6).RootUIComp.SetUIActive(false);
      await Promise.all([this.Otl.CreateThenShowByActorAsync(this.GetItem(1).GetOwner()), this.lV_.RefreshByDataAsync(e.fIc)]);
      this.Otl.SetCloseBtnActive(false);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("RogueBattle", 34, "没有肉鸽界面数据!, RogueBattleSelectTokenView");
    }
  }
  mH1() {
    var e = ModelManager_1.ModelManager.MapRogueModel.GetOpData(this.OpenParam).Data.GEc?.QEc?.fIc;
    if (e) {
      this.lV_?.RefreshByData(e);
    }
  }
}
exports.RogueBattleSelectTokenView = RogueBattleSelectTokenView;
//# sourceMappingURL=RogueBattleSelectTokenView.js.map