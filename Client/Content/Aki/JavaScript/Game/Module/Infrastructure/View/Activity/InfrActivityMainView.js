"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InfrActivityMainView = undefined;
const UE = require("ue");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../Ui/UiManager");
const ActivitySubViewBase_1 = require("../../../Activity/View/SubView/ActivitySubViewBase");
const ActivitySubViewGeneralInfo_1 = require("../../../Activity/View/SubView/ActivitySubViewGeneralInfo");
const ButtonItem_1 = require("../../../Common/Button/ButtonItem");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const InfrastructureController_1 = require("../../InfrastructureController");
const InfrastructureDefine_1 = require("../../InfrastructureDefine");
const InfrActivityProgressItem_1 = require("./InfrActivityProgressItem");
class InfrActivityMainView extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments);
    this.ActivityBaseData = undefined;
    this.CommonInfoPanel = new ActivitySubViewGeneralInfo_1.ActivitySubViewGeneralInfo();
    this.Zmu = new ButtonItem_1.ButtonItem();
    this.fs1 = new ButtonItem_1.ButtonItem();
    this.ZGl = undefined;
    this.tWt = () => {
      InfrastructureController_1.InfrastructureController.OpenInfrastructureMainView();
    };
    this.A5m = () => {
      UiManager_1.UiManager.OpenView("InfrastructureShopMainView", {
        OpenSource: 0
      });
    };
    this.D5m = () => {
      UiManager_1.UiManager.OpenView("InfrLimitTaskMainView", {
        OpenSource: 0
      });
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [2, UE.UIButtonComponent], [1, UE.UIButtonComponent], [3, UE.UIItem], [4, UE.UISprite], [5, UE.UIHorizontalLayout], [6, UE.UIItem], [7, UE.UIArtText], [8, UE.UIArtText], [9, UE.UIText], [10, UE.UIText], [11, UE.UITexture]];
    this.BtnBindInfo = [[2, this.A5m], [1, this.D5m]];
  }
  async OnBeforeStartAsync() {
    this.CommonInfoPanel.SetData(this.ActivityBaseData);
    this.ZGl = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(5), () => new InfrActivityProgressItem_1.InfrActivityProgressItem());
    await Promise.all([this.CommonInfoPanel.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()), this.oQm(), this.nQm()]);
  }
  async oQm() {
    await this.fs1.CreateThenShowByActorAsync(this.GetButton(2).GetOwner());
    this.fs1.SetFunction(this.D5m);
  }
  async nQm() {
    await this.Zmu.CreateThenShowByActorAsync(this.GetButton(1).GetOwner());
    this.Zmu.SetFunction(this.A5m);
  }
  OnStart() {
    this._Qm();
    this.IZm();
    this.Nqe();
    this.G_l();
    this.a_g();
  }
  OnRefreshView() {
    this._Qm();
    this.IZm();
    this.Nqe();
    this.G_l();
    this.a_g();
  }
  IZm() {
    var t;
    var e;
    if (ModelManager_1.ModelManager.FunctionModel.IsOpen(10131)) {
      this.fs1.SetFunction(this.D5m);
      this.fs1.BindRedDot("InfrLimitedTask");
      e = (t = ModelManager_1.ModelManager.InfrastructureModel.GetActivityData()?.GetActivityTaskDataList() ?? []).filter(t => t.Status === Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskTaken).length;
      this.fs1.SetText(e + "/" + t.length);
    } else {
      this.fs1.SetUiActive(false);
    }
  }
  _Qm() {
    var t;
    var e;
    if (ModelManager_1.ModelManager.FunctionModel.IsOpen(10131)) {
      e = (t = ModelManager_1.ModelManager.InfrastructureModel).GetAllShopCurrencyNum();
      this.Zmu.SetText(t.MoneyHistorySpent + "/" + e);
      this.Zmu.BindRedDot("InfrShop");
    } else {
      this.Zmu.SetUiActive(false);
    }
  }
  Nqe() {
    var e = ConfigManager_1.ConfigManager.InfrastructureConfig;
    var i = ModelManager_1.ModelManager.InfrastructureModel.FireLevel;
    var r = ModelManager_1.ModelManager.InfrastructureModel.FireExp;
    var s = e.GetAllLevelConfigs().reduce((t, e) => t.Level > e.Level ? t : e).Level;
    var n = [];
    for (let t = 1; t < s; t++) {
      if (t === s - 1 && i === s) {
        n.push([true, true]);
      } else {
        n.push([r >= e.GetLevelConfigById(t).Exp, false]);
      }
    }
    this.ZGl.RefreshByData(n);
    let t = 0;
    if (i === s) {
      t = 1;
    } else {
      t = (i - 1) / (s - 1) + (r - e.GetLevelConfigById(i).Exp) / (e.GetLevelConfigById(i + 1).Exp - e.GetLevelConfigById(i).Exp);
      this.GetSprite(4).SetFillAmount(t);
    }
    this.GetSprite(4).SetFillAmount(t);
    this.GetArtText(7).SetText((t * 100).toFixed(0));
    this.GetArtText(8).SetText((t * 100).toFixed(0));
  }
  G_l() {
    this.CommonInfoPanel.SetBtnText("LongShanStage_Join01");
    this.CommonInfoPanel.SetClickFunc(this.tWt);
    this.CommonInfoPanel.SetFunctionRedDotVisible(this.ActivityBaseData.CheckRedDot());
    var t = this.CommonInfoPanel.GetFunctional();
    var e = {
      UnlockBtnTextId: "LongShanStage_Join01",
      UnlockBtnFunction: this.tWt
    };
    t.RefreshGeneralPerformance(e);
  }
  a_g() {
    if (ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender() === 1) {
      this.SetTextureByPath(InfrastructureDefine_1.INFR_ACTIVITY_MALE_TEXTURE, this.GetTexture(11));
    } else {
      this.SetTextureByPath(InfrastructureDefine_1.INFR_ACTIVITY_FEMALE_TEXTURE, this.GetTexture(11));
    }
  }
}
exports.InfrActivityMainView = InfrActivityMainView;
//# sourceMappingURL=InfrActivityMainView.js.map