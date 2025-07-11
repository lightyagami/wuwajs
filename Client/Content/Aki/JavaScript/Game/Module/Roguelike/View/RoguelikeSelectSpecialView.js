"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoguelikeSelectSpecialView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiManager_1 = require("../../../Ui/UiManager");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
const RoguelikeDefine_1 = require("../Define/RoguelikeDefine");
const RoguelikeController_1 = require("../RoguelikeController");
const ElementPanel_1 = require("./ElementPanel");
const RoguelikeSelectSpecialItem_1 = require("./RoguelikeSelectSpecialItem");
const RogueSelectBaseView_1 = require("./RogueSelectBaseView");
const TopPanel_1 = require("./TopPanel");
const RogueSelectResult_1 = require("../Define/RogueSelectResult");
class RoguelikeSelectSpecialView extends RogueSelectBaseView_1.RogueSelectBaseView {
  constructor() {
    super(...arguments);
    this.Aho = undefined;
    this.llo = undefined;
    this._lo = undefined;
    this.ulo = undefined;
    this.clo = undefined;
    this.mlo = undefined;
    this.OnDescModelChange = () => {
      this.flo();
    };
    this.Pho = () => new RoguelikeSelectSpecialItem_1.RoguelikeSelectSpecialItem(this.xho);
    this.dlo = () => {
      if (!(this.ulo.UseTime >= this.ulo.MaxTime)) {
        RoguelikeController_1.RoguelikeController.RoguelikeRefreshGainRequest(this.ulo.Index);
      }
    };
    this.sOt = () => {
      ModelManager_1.ModelManager.RoguelikeModel.CurrentRogueGainEntry = this._lo;
      RoguelikeController_1.RoguelikeController.RogueChooseDataResultRequest(8);
    };
    this.xho = (e, i) => {
      if (this.llo === e) {
        this.llo = undefined;
        e.SetSelect(false);
        this._lo = undefined;
        this.mlo.Refresh(undefined);
      } else {
        if (this.llo !== undefined) {
          this.llo.SetSelect(false);
        }
        (this.llo = e).SetSelect(true);
        this._lo = i;
        this.mlo.Refresh(i);
      }
      this.Clo();
    };
    this.RoguelikeChooseDataResult = (e, i, t, s, o) => {
      if (t && s === this.ulo?.Index) {
        UiManager_1.UiManager.CloseAndOpenView(this.Info.Name, "RoguelikeSpecialDetailView", [e, RoguelikeController_1.RoguelikeController.CreateCloseViewCallBack(o, () => {
          var e = new RogueSelectResult_1.RogueSelectResult(ModelManager_1.ModelManager.RoguelikeModel.RogueInfo?.PhantomEntry, i, undefined);
          if (!(e.GetNewUnlockAffixEntry().size <= 0)) {
            UiManager_1.UiManager.OpenView("CommonSelectResultView", e);
          }
        })]);
      }
    };
    this.RoguelikeRefreshGain = e => {
      ModelManager_1.ModelManager.RoguelikeModel.CurrentRogueGainEntry = undefined;
      e = ModelManager_1.ModelManager.RoguelikeModel.GetRoguelikeChooseDataById(e);
      this.ulo = e;
      this.llo = undefined;
      this._lo = undefined;
      this.Hqe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIHorizontalLayout], [3, UE.UIButtonComponent], [4, UE.UIButtonComponent], [5, UE.UITexture], [6, UE.UIText], [7, UE.UIText]];
    this.BtnBindInfo = [[3, this.dlo], [4, this.sOt]];
  }
  async OnBeforeStartAsync() {
    this.clo = new TopPanel_1.TopPanel();
    this.clo.CloseCallback = this.CloseMySelf;
    this.AddChild(this.clo);
    await this.clo.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
    this.mlo = new ElementPanel_1.ElementPanel();
    await this.mlo.CreateThenShowByActorAsync(this.GetItem(1).GetOwner());
    await this.clo.RefreshCurrency([RoguelikeDefine_1.INSIDE_CURRENCY_ID]);
  }
  OnStart() {
    this.ulo = this.OpenParam;
    if (this.ulo === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Roguelike", 58, "RoguelikeSelectSpecialView无效输入");
      }
    } else {
      this.Aho = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(2), this.Pho);
      ModelManager_1.ModelManager.RoguelikeModel.CurrentRogueGainEntry = undefined;
      this.clo.CloseCallback = this.CloseMySelf;
      this.Hqe();
    }
  }
  Hqe() {
    this.glo();
    this.flo();
    this.Clo();
  }
  flo() {
    var e = this.ulo.RogueGainEntryList;
    this.Aho.RefreshByData(e);
  }
  glo() {
    this.mlo.Refresh();
  }
  Clo() {
    var e;
    var i = this.ulo.MaxTime;
    var t = i - this.ulo.UseTime;
    var s = this.GetText(7);
    if (t <= 0) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(s, "RoguelikeView_29_Text", t, i);
    } else {
      LguiUtil_1.LguiUtil.SetLocalTextNew(s, "RoguelikeView_28_Text", t, i);
    }
    this.GetButton(3).RootUIComp.SetUIActive(i > 0);
    this.GetButton(4).SetSelfInteractive(this._lo !== undefined);
    var s = this.ulo.CostCurrency;
    if (s.length > 0) {
      i = s[0];
      e = (s = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(i.s5n) >= i.m9n) ? "RogueSpecialRefreshCost" : "RogueSpecialRefreshCost_Not";
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), e, i.m9n);
      e = ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueCurrencyConfig(i.s5n);
      this.SetTextureByPath(e.IconSmall, this.GetTexture(5));
      this.GetButton(3).SetSelfInteractive(t > 0 && s);
    }
  }
}
exports.RoguelikeSelectSpecialView = RoguelikeSelectSpecialView;
//# sourceMappingURL=RoguelikeSelectSpecialView.js.map