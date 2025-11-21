"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShipTowerDescView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem");
const UiManager_1 = require("../../../Ui/UiManager");
const ButtonItem_1 = require("../../Common/Button/ButtonItem");
const LogReportDefine_1 = require("../../LogReport/LogReportDefine");
const GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew");
const ShipTowerDefine_1 = require("../ShipTowerDefine");
const ShipTowerDescLeftPanel_1 = require("./ShipTowerDescLeftPanel");
const ShipTowerDescTeamItem_1 = require("./ShipTowerDescTeamItem");
const ShipTowerTeamPanel_1 = require("./ShipTowerTeamPanel");
class ShipTowerDescView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.OpenParam = undefined;
    this.Ns_ = undefined;
    this.Vs_ = undefined;
    this.zJa = undefined;
    this.js_ = undefined;
    this.Hs_ = undefined;
    this.Ws_ = undefined;
    this.Qs_ = undefined;
    this.$s_ = undefined;
    this.SelectedLeftRoleData = undefined;
    this.Ys_ = 0;
    this.ooc = undefined;
    this.zs_ = () => {
      this.Js_();
    };
    this.Zs_ = () => {
      ModelManager_1.ModelManager.ShipTowerModel.OpenViewReset({
        StageData: this.Ns_
      });
    };
    this.ea_ = () => {
      this.Ns_.StartChallenge();
    };
    this.ta_ = () => {
      this.Vs_?.UpdateRoleListFilter();
      var e = this.Vs_?.GetRoleIdList();
      if (e?.length) {
        this.ooc = e.find(e => ModelManager_1.ModelManager.RoleModel?.IsMainRole(e));
        ControllerHolder_1.ControllerHolder.RoleController.OpenRoleMainViewByParam({
          AgentType: 0,
          RoleIdList: e,
          TeamPositionType: 1
        });
      }
    };
    this.ra_ = () => {
      this.Ns_.StartChallenge();
    };
    this.oa_ = () => {
      this.Ns_.OpenViewTeamRecommend();
    };
    this.SZc = () => {
      this.Ns_.ExchangeTeamData();
      this.Slo();
      var e;
      var t = this.Ns_.Id;
      let i = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.ShipTowerExchangeInstId);
      if (!i || !i.has(t)) {
        if (i) {
          i.add(t);
        } else {
          i = new Set([t]);
        }
        LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.ShipTowerExchangeInstId, i);
        (e = new LogReportDefine_1.ShipTowerSwitch()).i_inst_id = t;
        ControllerHolder_1.ControllerHolder.LogReportController.LogReport(e);
      }
    };
    this.na_ = () => {
      var e = new ShipTowerDescTeamItem_1.ShipTowerDescTeamItem();
      e.RoleClickCallBack = this.OnRoleClick;
      e.BuffClickCallBack = this.aa_;
      e.MechanismClickCallBack = this.vD_;
      return e;
    };
    this.OnRoleClick = e => {
      if (this.$s_?.Index !== e.Index) {
        this.$s_ = e;
        this.noc();
      }
      this.ha_();
    };
    this.aa_ = e => {
      ModelManager_1.ModelManager.ShipTowerModel.OpenViewBuff({
        BuffId: e.BuffDataEdit?.Id,
        StageId: this.Ns_.Id,
        OperationType: 1,
        TeamData: e,
        OnUseBuff: this.la_
      });
    };
    this.vD_ = e => {
      this.Ns_.OpenViewMonsterDesc(e.InstId);
    };
    this.la_ = (e, t) => {
      t?.UseBuff(e);
      e = t?.Index ?? -1;
      this.js_?.GetScrollItemByIndex(e)?.UpdateBuff();
      UiManager_1.UiManager.CloseView("ShipTowerBuffView");
    };
    this._a_ = e => {
      var t;
      var i;
      this.SelectedLeftRoleData = e;
      if (this.$s_) {
        t = this.$s_.Index;
        e = e.GetDataId();
        i = ModelManager_1.ModelManager.ShipTowerModel.IsOtherTeamRoleData(e);
        this.$s_.UpdateRoleListByModel();
        if (i) {
          this.Ns_.UpdateOtherTeamRoleRepeat(t, e);
        }
        this.Ns_.UpdateAllTeamRoleToModel();
        this.js_?.RefreshByData(this.Ns_.TeamDataList);
      }
    };
    this.ca_ = e => {
      var t;
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("ShipTower", 69, "OnRoleTeamSelect", ["formationData", e]);
      }
      if (this.$s_) {
        t = this.$s_.Index;
        this.Ns_.TeamDataList[t].UpdateRoleListByFormationData(e);
        this.Ns_.UpdateOtherTeamRoleRepeat(t);
        this.Ns_.UpdateAllTeamRoleToModel();
        this.Vs_?.OnlyUpdateTeamList();
        this.js_?.RefreshByData(this.Ns_.TeamDataList);
      }
    };
    this.kW_ = () => {
      if (this.z8_) {
        this.qW_();
      }
    };
    this.FG_ = e => {
      if (this.Ns_.Id === e) {
        this.Slo();
      }
    };
    this.J8_ = e => {
      if (this.Ns_.Id === e) {
        if (this.z8_ && this.$s_) {
          this.$s_.UpdateRoleListToRoleSelectModel();
          this.Ns_.UpdateOtherTeamRoleToModel(this.$s_.Index);
          this.Ns_.UpdateAllTeamRoleToModel();
        }
        this.Slo();
      }
    };
  }
  get z8_() {
    return ModelManager_1.ModelManager.ShipTowerModel.IsShowLeftTeamPanel;
  }
  set z8_(e) {
    ModelManager_1.ModelManager.ShipTowerModel.IsShowLeftTeamPanel = e;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIScrollViewWithScrollbarComponent], [3, UE.UIButtonComponent], [4, UE.UIButtonComponent], [5, UE.UIButtonComponent], [6, UE.UIButtonComponent], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIButtonComponent], [11, UE.UIItem], [12, UE.UIItem], [13, UE.UIButtonComponent]];
    this.BtnBindInfo = [[3, this.zs_], [10, this.zs_], [6, this.oa_], [13, this.SZc]];
  }
  Es_() {
    this.Ns_ = ModelManager_1.ModelManager.ShipTowerModel.GetStageDataById(this.OpenParam.StageId);
    if (this.OpenParam?.ApplyTeamEditStageId) {
      this.Ns_.CopyTeamRoleToEdit(this.OpenParam.ApplyTeamEditStageId);
    } else if (!this.OpenParam?.IsOpenCover) {
      this.Ns_.UpdateToEdit();
    }
    this.z8_ = false;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("ShipTower", 69, "ShipTowerDescView", ["DataParam", this.OpenParam]);
    }
  }
  async OnBeforeStartAsync() {
    this.Es_();
    this.zJa = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    this.zJa.SetCloseCallBack(this.CloseMe.bind(this));
    this.zJa.SetHelpBtnActive(false);
    this.Vs_ = new ShipTowerTeamPanel_1.ShipTowerTeamPanel();
    await this.Vs_.Init(this.GetItem(7), this.Ns_);
    this.Vs_.RoleSelectCallBack = this._a_;
    this.Vs_.TeamSelectCallBack = this.ca_;
    this.Vs_.RoleListUpdateCallback = this.kW_;
    this.Vs_.EmptyStateItem = this.tH_();
    this.js_ = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(2), this.na_, this.GetItem(11).GetOwner());
    this.Hs_ = new ShipTowerDescLeftPanel_1.ShipTowerDescLeftPanel();
    await this.Hs_.Init(this.GetItem(1), this.Ns_);
    this.Ws_ = new ButtonItem_1.ButtonItem(this.GetButton(4)?.RootUIComp);
    this.Qs_ = new ButtonItem_1.ButtonItem(this.GetButton(5)?.RootUIComp);
    this.ua_();
  }
  OnStart() {
    this.bA_();
  }
  bA_() {
    if (this.OpenParam?.IsOpenCover) {
      ModelManager_1.ModelManager.ShipTowerModel.OpenViewCover({
        StageData: this.Ns_
      });
    }
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ShipTowerStageUpdate, this.FG_);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ShipTowerSureResetStage, this.FG_);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ShipTowerSureCoverChallenge, this.FG_);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ShipTowerTeamRecommendApplyFinish, this.J8_);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ShipTowerStageUpdate, this.FG_);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ShipTowerSureResetStage, this.FG_);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ShipTowerSureCoverChallenge, this.FG_);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ShipTowerTeamRecommendApplyFinish, this.J8_);
  }
  OnBeforeShow() {
    if (this.ooc && ModelManager_1.ModelManager.RoleModel.GetCurSelectMainRoleId() !== this.ooc) {
      this.ooc = undefined;
      this.Ns_.UpdateMainRoleToEdit();
      this.noc();
      this.Vs_?.UpdateRoleListByMainRoleChange();
    }
    this.Slo();
    if (!this.Ns_.ProtoIsPassed) {
      this.PlaySequence("Tips");
    }
  }
  OnBeforeDestroy() {
    if (ModelManager_1.ModelManager.ShipTowerModel.ChallengeStageData !== this.Ns_) {
      this.Ns_?.UpdateToEdit();
    }
  }
  Slo() {
    this.ua_();
    this.js_?.RefreshByData(this.Ns_.TeamDataList, undefined, true);
    if (this.z8_) {
      this.ha_();
    } else {
      this.Js_();
    }
  }
  ua_() {
    var e = this.Ns_.CanReset();
    this.Ys_ = e ? 1 : 0;
  }
  ha_() {
    if (!this.z8_) {
      this.PlaySequence("Team");
    }
    this.z8_ = true;
    this.Hs_?.SetActive(false);
    this.Vs_?.UpdateViewAndShow(this.$s_);
    this.qW_();
    this.ma_(this.Qs_, this.Ys_, this.Ns_.IsUnLocked());
    this.da_(true);
  }
  qW_() {
    this.ma_(this.Ws_, 3, !!this.Vs_?.GetRoleIdList().length);
  }
  Js_() {
    this.z8_ = false;
    this.Vs_?.SetActive(false);
    this.Hs_?.UpdateViewAndShow(this.Ns_);
    this.ma_(this.Ws_, 2, this.Ns_.CanReset());
    this.ma_(this.Qs_, this.Ys_, this.Ns_.IsUnLocked());
    this.da_(false);
    this.tH_()?.SetUIActive(false);
  }
  da_(e) {
    this.GetItem(8)?.SetUIActive(e);
    this.GetItem(9)?.SetUIActive(e);
    if (this.$s_) {
      if (e) {
        this.cq_();
      } else {
        this.wA_()?.SetTeamToggleIsSelect(false);
      }
    }
  }
  tH_() {
    return this.GetItem(12);
  }
  cq_() {
    this.Ns_.TeamDataList.forEach((e, t) => {
      if (t !== this.$s_?.Index) {
        this.js_?.GetScrollItemByIndex(t)?.SetTeamToggleIsSelect(false);
      }
    });
  }
  wA_() {
    var e;
    if (this.$s_) {
      e = this.$s_.Index;
      return this.js_?.GetScrollItemByIndex(e);
    }
  }
  noc() {
    if (this.$s_) {
      this.$s_.UpdateRoleListToRoleSelectModel();
      this.Ns_.UpdateCurSelectTeamIndex(this.$s_.Index);
      this.Ns_.UpdateOtherTeamRoleToModel(this.$s_.Index);
      this.Ns_.UpdateAllTeamRoleToModel();
    }
  }
  ma_(e, t, i = true) {
    e.SetActive(i);
    if (i) {
      switch (t) {
        case 3:
          this.uq_(e, ShipTowerDefine_1.shipTowerTextKey.RoleDetail);
          e.SetFunction(this.ta_);
          break;
        case 0:
          this.uq_(e, ShipTowerDefine_1.shipTowerTextKey.StartChallenge);
          e.SetFunction(this.ea_);
          break;
        case 2:
          this.uq_(e, ShipTowerDefine_1.shipTowerTextKey.Reset);
          e.SetFunction(this.Zs_);
          break;
        case 1:
          this.uq_(e, ShipTowerDefine_1.shipTowerTextKey.AgainChallenge);
          e.SetFunction(this.ra_);
      }
    }
  }
  uq_(e, t) {
    t = ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(t, t);
    e.SetText(t);
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    switch (e[0]) {
      case "TabCompRight":
        return this.Vs_?.GetGuideUiItemAndUiItemForShowEx(e);
      case "Desc":
      case "Item":
      case "TeamAndItem":
      case "TeamAndItemOuter":
        if (e.length !== 2 || isNaN(Number(e[1]))) {
          return undefined;
        } else {
          return this.js_?.GetScrollItemByIndex(Number(e[1]))?.GetGuideUiItemAndUiItemForShowEx(e);
        }
    }
  }
}
exports.ShipTowerDescView = ShipTowerDescView;
//# sourceMappingURL=ShipTowerDescView.js.map