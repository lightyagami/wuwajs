"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisionRecommendView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../../Ui/UiManager");
const ButtonItem_1 = require("../../../Common/Button/ButtonItem");
const ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const VisionFetterDescItem_1 = require("../../PhantomBattle/View/VisionFetterDescItem");
const VisionFetterSuitItem_1 = require("./VisionFetterSuitItem");
class VisionRecommendView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.fSd = undefined;
    this.b9i = 0;
    this.zo_ = 0;
    this.Jo_ = undefined;
    this.eGe = undefined;
    this.gSd = false;
    this.sGe = () => {
      return new VisionFetterDescItem_1.VisionFetterDescItem();
    };
    this.W2e = () => {
      return new FetterItemContent();
    };
    this.OnClickConfirmBoxBtn = () => {
      this.jCo();
    };
    this.jCo = () => {
      var e = ModelManager_1.ModelManager.VisionRecommendModel.GetRoleFetterRecommendInfo(this.zo_)[this.b9i];
      var t = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(this.zo_);
      if (ModelManager_1.ModelManager.PhantomBattleModel.GetRoleIfEquipVision(t.GetRoleId())) {
        this.Qji();
      } else {
        e = ModelManager_1.ModelManager.VisionRecommendModel.GetRecommendEquipUniqueIdList(t.GetRoleId(), e);
        ControllerHolder_1.ControllerHolder.PhantomBattleController.SendPhantomAutoPutRequest(t.GetRoleId(), e);
        UiManager_1.UiManager.CloseView("VisionRecommendView");
      }
    };
    this.OnClickGoFetterGroupDetailViewBtn = () => {
      this.CloseMe(() => {
        var e = ModelManager_1.ModelManager.VisionRecommendModel.GetRoleFetterRecommendInfo(this.zo_);
        if (e && e.length !== 0) {
          e = e[this.b9i].GetRecommendFetterGroupId();
          ControllerHolder_1.ControllerHolder.PhantomBattleController.OpenPhantomBattleFetterView(e, this.zo_);
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.HideVisionTabRole);
        }
      });
    };
    this.Zo_ = e => {
      this.b9i = e.Index;
      this.en_();
      this.tn_(this.b9i);
      this.in_();
      this.CSd();
    };
    this.pSd = () => {
      var e;
      if (this.gSd && (e = ModelManager_1.ModelManager.VisionRecommendModel.GetRoleFetterRecommendInfo(this.zo_)) && e.length !== 0) {
        e = e[this.b9i].GetRecommendFetterGroupId();
        UiManager_1.UiManager.CloseView("VisionRecommendView");
        ControllerHolder_1.ControllerHolder.RoleDevController.LogRoleDevSubPageClick(this.zo_, 3, 20);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnVisionRecommendFetterGroupSelected, e);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIVerticalLayout], [1, UE.UIItem], [2, UE.UIText], [3, UE.UIButtonComponent], [4, UE.UIVerticalLayout], [5, UE.UIItem], [6, UE.UIButtonComponent], [7, UE.UIItem]];
    this.BtnBindInfo = [[3, this.OnClickGoFetterGroupDetailViewBtn], [6, this.OnClickConfirmBoxBtn]];
  }
  OnStart() {
    var e = this.OpenParam;
    this.zo_ = e.RoleId;
    this.gSd = e.IsFromRoleDev;
    this.Jo_ = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(0), this.W2e);
    this.eGe = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(4), this.sGe);
    this.vSd();
    this.ySd();
  }
  vSd() {
    this.fSd = new ButtonItem_1.ButtonItem(this.GetItem(7));
    this.fSd.SetLocalTextNew("RoleProject_PhantomRecommend_Tips01");
    this.fSd.SetFunction(this.pSd);
  }
  ySd() {
    var e = this.GetButton(6);
    var t = this.GetItem(7);
    if (this.gSd) {
      e?.RootUIComp.SetUIActive(false);
      t?.SetUIActive(true);
    } else {
      e?.RootUIComp.SetUIActive(true);
      t?.SetUIActive(false);
    }
  }
  Qji() {
    const t = ModelManager_1.ModelManager.VisionRecommendModel.GetRoleFetterRecommendInfo(this.zo_)[this.b9i];
    const i = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(this.zo_);
    var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(96);
    e.FunctionMap.set(1, () => {
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.CloseConfirmBoxView();
    });
    e.FunctionMap.set(2, () => {
      var e = ModelManager_1.ModelManager.VisionRecommendModel.GetRecommendEquipUniqueIdList(i.GetRoleId(), t);
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.CloseConfirmBoxView();
      ControllerHolder_1.ControllerHolder.PhantomBattleController.SendPhantomAutoPutRequest(i.GetRoleId(), e);
      UiManager_1.UiManager.CloseView("VisionRecommendView");
    });
    ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
  }
  OnBeforeShow() {
    this.b9i = 0;
    this.en_();
    this.tn_(this.b9i);
    this.in_();
    this.CSd();
    this.ySd();
  }
  en_() {
    var t = ModelManager_1.ModelManager.VisionRecommendModel.GetRoleFetterRecommendInfo(this.zo_);
    t?.sort((e, t) => t.GetUsage() - e.GetUsage());
    var i = new Array();
    var r = t ? t.length : 0;
    for (let e = 0; e < r; e++) {
      var s = new FetterGroupContentData();
      s.Index = e;
      s.CurrentSelectIndex = this.b9i;
      s.VisionFetterRecommendInfo = t[e];
      s.ClickCallBack = this.Zo_;
      i.push(s);
    }
    this.Jo_?.RefreshByData(i);
  }
  rn_(e) {
    e = ModelManager_1.ModelManager.VisionRecommendModel.GetFetterDescByRecommendInfo(e);
    this.eGe.RefreshByData(e);
  }
  tn_(e) {
    var t = ModelManager_1.ModelManager.VisionRecommendModel.GetRoleFetterRecommendInfo(this.zo_);
    if (t && t.length !== 0) {
      t = t[e];
      this.rn_(t);
    }
  }
  in_() {
    var e = ModelManager_1.ModelManager.VisionRecommendModel.GetRoleFetterRecommendInfo(this.zo_);
    if (e && e.length !== 0) {
      e = e[this.b9i];
      e = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetFetterGroupById(e.GetRecommendFetterGroupId());
      this.GetText(2).ShowTextNew(e.FetterGroupName);
    }
  }
  CSd() {
    var e;
    if (this.gSd && (e = ModelManager_1.ModelManager.VisionRecommendModel.GetRoleFetterRecommendInfo(this.zo_)) && e.length !== 0) {
      if ((e = e[this.b9i]).GetRecommendFetterGroupId() === e.GetRecommendFetterGroupId()) {
        this.fSd.SetLocalTextNew("RoleProject_PhantomRecommend_Tips01");
        this.fSd.SetEnableClick(false);
      } else {
        this.fSd.SetLocalTextNew("RoleProject_PhantomRecommend_Button01");
        this.fSd.SetEnableClick(true);
      }
    }
  }
}
exports.VisionRecommendView = VisionRecommendView;
class FetterGroupContentData {
  constructor() {
    this.Index = 0;
    this.CurrentSelectIndex = 0;
    this.VisionFetterRecommendInfo = undefined;
    this.ClickCallBack = undefined;
  }
}
class FetterItemContent extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.$8i = undefined;
    this.VHa = undefined;
    this.nqe = () => {
      this.$8i?.ClickCallBack?.(this.$8i);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIItem], [2, UE.UIText], [3, UE.UIText]];
    this.BtnBindInfo = [[0, this.nqe]];
  }
  async OnBeforeStartAsync() {
    this.VHa = new VisionFetterSuitItem_1.VisionFetterSuitItem(this.GetItem(1));
    await this.VHa.Init();
  }
  Refresh(e, t, i) {
    this.$8i = e;
    this.on_(e);
    this.P5e(e);
    this.dbl(e);
    e = e.Index === e.CurrentSelectIndex;
    this.GetExtendToggle(0).SetToggleState(e ? 1 : 0);
  }
  on_(e) {
    e = e.VisionFetterRecommendInfo.GetRecommendFetterGroupId();
    e = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetFetterGroupById(e);
    this.VHa?.Update(e);
    this.VHa?.SetActive(true);
  }
  P5e(e) {
    e = e.VisionFetterRecommendInfo.GetRecommendFetterGroupId();
    e = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetFetterGroupById(e).FetterGroupName;
    this.GetText(2).ShowTextNew(e);
  }
  dbl(e) {
    e = e.VisionFetterRecommendInfo.GetUsageText();
    this.GetText(3).SetText(e);
  }
}
//# sourceMappingURL=VisionRecommendView.js.map