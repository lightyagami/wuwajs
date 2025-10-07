"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurvivorsRoleTabDetail = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const UiManager_1 = require("../../../../Ui/UiManager");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const DEFAULT_SHOW_ATTRIBUTE_NUM = 4;
class SurvivorsRoleTabDetail extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.u9i = undefined;
    this.ko_ = 0;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIItem], [2, UE.UIButtonComponent], [3, UE.UIText], [4, UE.UIItem]];
    this.BtnBindInfo = [[2, this.Dkd.bind(this)]];
  }
  OnStart() {
    this.u9i = new SurvivorsRoleVisionAttribute(this.GetItem(1));
    this.u9i.Init();
  }
  Refresh(e, i = false, t = DEFAULT_SHOW_ATTRIBUTE_NUM) {
    var r = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsRole(e);
    var s = r.TrialRoleId;
    this.ko_ = e;
    var a = r.RecommendProperty;
    var r = r.PropertyList;
    var n = a.slice(0, t);
    if (n.length < t) {
      for (const o of r) {
        if (!n.includes(o) && (n.push(o), n.length === t)) {
          break;
        }
      }
    }
    a = ModelManager_1.ModelManager.SurvivorsRogueModel.GetRoleDefaultAttributeList(e, n);
    this.u9i?.Refresh(a, i);
    r = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsRoleDefaultEvolve(e);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), r.Describe);
    this.GetText(0)?.ShowTextNew(ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(s).Name);
  }
  RefreshFourAttr(e, i = false) {
    this.Refresh(e, i, DEFAULT_SHOW_ATTRIBUTE_NUM);
  }
  Dkd() {
    var e;
    if (this.ko_ !== 0) {
      e = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsRole(this.ko_);
      UiManager_1.UiManager.OpenView("SurvivorsAttributeDetailView", ModelManager_1.ModelManager.SurvivorsRogueModel.GetRoleDefaultAttributeList(this.ko_, e.PropertyList));
    }
  }
}
exports.SurvivorsRoleTabDetail = SurvivorsRoleTabDetail;
class SurvivorsRoleVisionAttribute extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super();
    this.AttributeScroller = undefined;
    this.wqe = undefined;
    this.PCo = () => {
      return new SurvivorsAttributeItem();
    };
    this.wqe = e;
  }
  Init() {
    this.CreateThenShowByActor(this.wqe.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIVerticalLayout], [1, UE.UIItem]];
  }
  OnStart() {
    this.AttributeScroller = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(0), this.PCo, this.GetItem(1).GetOwner());
  }
  Refresh(e, i = false) {
    this.AttributeScroller.RefreshByData(e, undefined, i);
  }
}
class SurvivorsAttributeItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIItem], [3, UE.UIText], [4, UE.UITexture], [5, UE.UISprite], [6, UE.UIItem]];
  }
  Refresh(e, i, t) {
    var r = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetPropertyConfig(e.AttrId);
    this.SetTextByTextId(r.Name);
    this.SetIcon(r.Icon);
    this.SetValue(e.Value, r.IsPercent);
    this.SetBgVisible(t % 2 == 0);
  }
  SetIcon(e) {
    this.SetTextureByPath(e, this.GetTexture(4));
  }
  SetValue(e, i = false) {
    this.GetText(1)?.SetText(i ? (e * 100).toString() + "%" : e.toString());
  }
  SetTextByTextId(e) {
    this.GetText(0)?.ShowTextNew(e);
  }
  SetBgVisible(e) {
    this.GetSprite(5)?.SetUIActive(e);
  }
}
//# sourceMappingURL=SurvivorsRoleTabDetail.js.map