"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomFettersObtainItem = exports.PhantomFettersItem = exports.PhantomFetterItemData = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const UiManager_1 = require("../../../../Ui/UiManager");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const VisionFetterSuitItem_1 = require("../../Vision/View/VisionFetterSuitItem");
class PhantomFetterItemData {
  constructor() {
    this.PhantomFetterGroup = undefined;
    this.RoleId = 0;
  }
}
exports.PhantomFetterItemData = PhantomFetterItemData;
class PhantomFettersItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.fGt = undefined;
    this.bxt = undefined;
    this.ndi = undefined;
    this.BTt = t => {
      if (this.ndi) {
        this.ndi(this.fGt);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIText], [5, UE.UIItem]];
    this.BtnBindInfo = [[0, this.BTt]];
  }
  OnStart() {
    this.bxt = new VisionFetterSuitItem_1.VisionFetterSuitItem(this.GetItem(2));
    this.bxt.Init().finally(() => {
      this.bxt.SetActive(true);
    });
    this.GetItem(3).SetUIActive(false);
    this.GetExtendToggle(0).SetToggleState(0);
  }
  Refresh(t, e, i) {
    this.fGt = t;
    this.RefreshName();
    this.m8i();
    this.RefreshUnlockText();
    this.Eo_();
    this.N6e(e, false);
  }
  Eo_() {
    var t = ModelManager_1.ModelManager.VisionRecommendModel.GetRoleFetterRecommendInfo(this.fGt.RoleId);
    let e = false;
    if (t) {
      for (const i of t) {
        if (i.GetRecommendFetterGroupId() === this.fGt.PhantomFetterGroup.Id) {
          e = true;
          break;
        }
      }
    }
    this.GetItem(5).SetUIActive(e);
  }
  RefreshName() {
    this.GetText(1).ShowTextNew(this.fGt.PhantomFetterGroup.FetterGroupName);
  }
  RefreshUnlockText() {
    var t = this.fGt.PhantomFetterGroup.Id;
    var t = ModelManager_1.ModelManager.PhantomBattleModel.GetFetterGroupMonsterIdArray(t);
    var e = ModelManager_1.ModelManager.PhantomBattleModel.GetMonsterFindCountByMonsterIdArray(t);
    this.GetText(4).SetText(e + "/" + t.length);
  }
  BindOnItemButtonClickedCallback(t) {
    this.ndi = t;
  }
  OnSelected(t) {
    this.N6e(true);
  }
  OnDeselected(t) {
    this.N6e(false);
  }
  m8i() {
    this.bxt.Update(this.fGt.PhantomFetterGroup);
  }
  N6e(t, e = true) {
    var i = this.GetExtendToggle(0);
    if (t) {
      i.SetToggleState(1, e);
    } else {
      i.SetToggleState(0, false);
    }
  }
}
exports.PhantomFettersItem = PhantomFettersItem;
class PhantomFettersObtainItem extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super();
    this.u8i = 0;
    this.ndi = undefined;
    this.wqe = undefined;
    this.d8i = () => {
      if (this.ndi) {
        UiManager_1.UiManager.CloseView("PhantomBattleFettersObtainView");
        this.ndi(this.u8i);
      }
    };
    this.wqe = t;
  }
  Init() {
    this.CreateThenShowByActor(this.wqe.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIText], [2, UE.UIText], [3, UE.UIButtonComponent]];
    this.BtnBindInfo = [[3, this.d8i]];
  }
  Update(t) {
    this.u8i = t.Id;
    if (t.IsGet) {
      this.SetTextureByPath(t.Icon, this.GetTexture(0));
      this.GetText(1).ShowTextNew(t.Name);
    } else {
      t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("T_IconMonsterHead00_UI");
      this.SetTextureByPath(t, this.GetTexture(0));
      this.GetText(1).SetText("???");
    }
    this.GetText(2).SetUIActive(false);
  }
  BindOnItemButtonClickedCallback(t) {
    this.ndi = t;
  }
}
exports.PhantomFettersObtainItem = PhantomFettersObtainItem;
//# sourceMappingURL=PhantomBattleItemView.js.map