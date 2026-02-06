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
const CalabashDefine_1 = require("../../CalabashDefine");
const AttributeSelectPanel_1 = require("./AttributeSelectPanel");
class VisionRefineAttributeSelectView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this._Xe = -1;
    this.gh1 = undefined;
    this.b1c = [];
    this.nvt = undefined;
    this.L1c = undefined;
    this.oAg = undefined;
    this.p5t = () => {
      if (this.L1c) {
        this.L1c(this.gh1);
      }
      this.CloseMe();
    };
    this.j_1 = i => {
      this.gh1 = i;
      this.Tke();
      this.C4e();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIButtonComponent], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIText], [5, UE.UIItem], [6, UE.UIText], [7, UE.UIItem]];
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
    var i;
    var e;
    var t = this.OpenParam;
    this._Xe = t.IncId;
    this.L1c = t.Callback;
    this.oAg = t.GetSelectedPropItemIdList;
    this.gh1 = t.SelectAttribute;
    var s = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomDataBase(this._Xe);
    var r = s.GetMainPropShowAttributeList(1)[0];
    var h = ModelManager_1.ModelManager.CalabashModel.GetVisionRefineRecommendAttributes(s.GetCost(), s.GetFetterGroupId());
    var s = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomMainPropItemRefineAvailableIdList(s.GetConfigId());
    var a = new Array();
    let n = undefined;
    for ([i, e] of s.entries()) {
      var o = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomMainPropertyItemId(e);
      var o = {
        PropItemId: e,
        PropIndexId: o.PropId,
        IsRecommend: !!t.DataConfirmed && h.includes(o.PropId),
        IsDisable: !!t.DataConfirmed && r.Id === o.PropId
      };
      a.push(o);
      if (t.SelectAttribute !== undefined && t.SelectAttribute.PropItemId === e) {
        n = i;
      }
    }
    this.b1c = a;
    this.nvt.RefreshByData(this.b1c, n);
    this.C4e();
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
  C4e() {
    if (this.oAg) {
      var e = this.oAg();
      var t = this.gh1?.PropItemId;
      if (t !== undefined && e.length > 0) {
        let i = 0;
        for (const s of e) {
          if (s === t) {
            i += 1;
          }
        }
        if (i > 0) {
          this.GetItem(5)?.SetUIActive(true);
          LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), CalabashDefine_1.VISION_REFINE_CAN_REFINE_WITH_NUMBER_TEXT_ID, i);
          return;
        }
      }
    }
    this.GetItem(5)?.SetUIActive(false);
  }
}
exports.VisionRefineAttributeSelectView = VisionRefineAttributeSelectView;
//# sourceMappingURL=VisionRefineAttributeSelectView.js.map