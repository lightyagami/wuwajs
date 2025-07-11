"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisionRefineAttributeSelectView = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const AttributeSelectPanel_1 = require("./AttributeSelectPanel");
class VisionRefineAttributeSelectView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this._Xe = -1;
    this.gh1 = undefined;
    this.b1c = [];
    this.nvt = undefined;
    this.L1c = undefined;
    this.p5t = () => {
      if (this.L1c) {
        this.L1c(this.gh1);
      }
      this.CloseMe();
    };
    this.j_1 = e => {
      this.gh1 = e;
      this.Tke();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIButtonComponent], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIText]];
    this.BtnBindInfo = [[1, this.p5t]];
  }
  async OnBeforeStartAsync() {
    this.GetItem(3).SetUIActive(false);
    this.GetButton(0).RootUIComp.SetUIActive(false);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), "VisionRefineAttributeSelectTitle");
    this.nvt = new AttributeSelectPanel_1.AttributeSelectPanel();
    this.nvt.CallBackClick = this.j_1;
    await this.nvt.CreateThenShowByActorAsync(this.GetItem(2).GetOwner());
  }
  OnStart() {
    var e = this.OpenParam;
    this._Xe = e.IncId;
    this.L1c = e.Callback;
    var e = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomDataBase(this._Xe);
    var i = e.GetMainPropShowAttributeList(1)[0];
    var t = ModelManager_1.ModelManager.CalabashModel.GetVisionRefineRecommendAttributes(e.GetCost(), e.GetFetterGroupId());
    var e = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomMainPropItemRefineAvailableIdList(e.GetConfigId());
    var s = new Array();
    for (const a of e) {
      var r = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomMainPropertyItemId(a);
      var r = {
        PropItemId: a,
        PropIndexId: r.PropId,
        IsRecommend: t.includes(r.PropId),
        IsDisable: i.Id === r.PropId
      };
      s.push(r);
    }
    this.b1c = s;
    this.nvt.RefreshByData(this.b1c);
  }
  OnBeforeShow() {
    this.Tke();
  }
  Tke() {
    if (this.gh1) {
      this.GetButton(1).SetSelfInteractive(true);
    } else {
      this.GetButton(1).SetSelfInteractive(false);
    }
  }
}
exports.VisionRefineAttributeSelectView = VisionRefineAttributeSelectView;
//# sourceMappingURL=VisionRefineAttributeSelectView.js.map