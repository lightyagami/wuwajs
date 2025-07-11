"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DangoAbyssLevelUpView = undefined;
const UE = require("ue");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const DangoAbyssActivityController_1 = require("../../../Activity/ActivityContent/DangoAbyss/DangoAbyssActivityController");
const ButtonItem_1 = require("../../../Common/Button/ButtonItem");
const CommonCurrencyItemListComponent_1 = require("../../../Common/CommonCurrencyItemListComponent");
const CommonLevelUpAttributeItem_1 = require("../../../Common/CommonLevelUpAttributeItem");
const CostItem_1 = require("../../../Common/CostItem");
const RoleLevelUpSuccessController_1 = require("../../../RoleUi/RoleLevel/RoleLevelUpSuccessController");
const ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const DangoAbyssDefine_1 = require("../DangoAbyssDefine");
class DangoAbyssLevelUpView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.eyc = 0;
    this.T6c = undefined;
    this.U1a = undefined;
    this.$a_ = undefined;
    this.eGe = undefined;
    this.wSc = () => {
      this.Og();
    };
    this.nbc = (e, t) => {
      if (this.eyc === e) {
        (e = this.zyc().GetLevelUpViewData(t)).ClickFunction = this.uy1;
        RoleLevelUpSuccessController_1.RoleLevelUpSuccessController.OpenSuccessAttributeView(e);
      }
    };
    this.sGe = () => new CommonLevelUpAttributeItem_1.CommonLevelUpAttributeItem();
    this.tWt = () => {
      var e = this.zyc();
      if (e.GetIfCanLevelUp()) {
        if (e.GetIfLevelUpEnough()) {
          DangoAbyssActivityController_1.DangoAbyssActivityController.RequestAbyssDangoLevelUp(e.GetId(), e.GetLevel() + 1);
        } else {
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("GenericPrompt_LevelUpMaterialShort_TipsText");
        }
      }
    };
    this.I5t = () => {
      this.CloseMe();
    };
    this.uy1 = () => {
      if (this.zyc().GetIfMaxLevel()) {
        this.CloseMe();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIText], [4, UE.UIText], [5, UE.UIItem], [6, UE.UIText], [7, UE.UIVerticalLayout], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIItem]];
    this.BtnBindInfo = [[0, this.I5t]];
  }
  GetLoopAudioEventSwitch() {
    return !ModelManager_1.ModelManager.DangoAbyssModel.CheckIfInSmallWorldInstance();
  }
  async OnBeforeStartAsync() {
    var e = [];
    this.U1a = new CostItem_1.CostItem();
    e.push(this.U1a.CreateThenShowByActorAsync(this.GetItem(9).GetOwner()));
    this.$a_ = new ButtonItem_1.ButtonItem();
    e.push(this.$a_.CreateThenShowByActorAsync(this.GetItem(11).GetOwner()));
    this.$a_.SetFunction(this.tWt);
    this.GetItem(2).SetUIActive(false);
    this.T6c = new CommonCurrencyItemListComponent_1.CommonCurrencyItemListComponent(this.GetItem(1));
    e.push(this.T6c.SetCurrencyItemList([DangoAbyssDefine_1.CURRENCY_ITEM_EXP_ID, DangoAbyssDefine_1.CURRENCY_ITEM_TOKEN_ID]));
    await Promise.all(e);
    this.eGe = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(7), this.sGe);
  }
  OnStart() {
    this.eyc = this.OpenParam;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAbyssPluginDangoSelect, 0);
  }
  zyc() {
    return ModelManager_1.ModelManager.DangoAbyssModel.GetDangoAbyssRoleData(this.eyc);
  }
  OnBeforeShow() {
    this.Og();
  }
  Og() {
    var e = this.zyc();
    this.sqi(e);
    this.ew1(e);
    this.eSc(e);
    this.Wbe(e);
    this.tSc(e);
    this.fvt(e);
  }
  sqi(e) {
    var t;
    if (e && (t = e.GetIfCanLevelUp(), this.U1a.SetActive(t), t)) {
      this.U1a.RefreshCost(e.GetCurrentLevelUpConsume());
    }
  }
  ew1(e) {
    var t;
    if (e) {
      t = e.GetIfLock();
      e = e.GetIfMaxLevel();
      this.GetItem(10).SetActive(!t && e);
    } else {
      this.GetItem(10).SetActive(false);
    }
  }
  tSc(e) {
    var t;
    if (e) {
      t = e.GetIfCanLevelUp();
      this.$a_?.SetActive(t);
      t = ModelManager_1.ModelManager.DangoAbyssModel.GetDangoLevelUpRedDotById(e.GetId(), false);
      this.$a_?.SetRedDotVisible(t);
    } else {
      this.$a_?.SetActive(false);
    }
  }
  eSc(e) {
    this.GetText(4).SetText(StringUtils_1.StringUtils.Format("Lv.{0}", e.GetLevel().toString()));
    if (e.GetIfMaxLevel()) {
      this.GetItem(5).SetUIActive(false);
      this.GetText(6).SetText(StringUtils_1.EMPTY_STRING);
    } else {
      this.GetItem(5).SetUIActive(true);
      this.GetText(6).SetText(StringUtils_1.StringUtils.Format("Lv.{0}", (e.GetLevel() + 1).toString()));
    }
  }
  fvt(e) {
    let t = e.GetLevel() + 1;
    if (e.GetIfMaxLevel()) {
      t = e.GetLevel();
    }
    e = e.GetLevelUpViewAttributeInfo(t, e.GetIfMaxLevel());
    this.eGe.RefreshByData(e);
  }
  Wbe(e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), e.GetName());
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnAbyssRoleInfoUpdate, this.wSc);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnAbyssDangoLevelUp, this.nbc);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnAbyssRoleInfoUpdate, this.wSc);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnAbyssDangoLevelUp, this.nbc);
  }
}
exports.DangoAbyssLevelUpView = DangoAbyssLevelUpView;
//# sourceMappingURL=DangoAbyssLevelUpView.js.map