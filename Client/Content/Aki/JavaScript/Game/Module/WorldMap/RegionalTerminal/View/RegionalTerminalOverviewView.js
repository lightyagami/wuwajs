"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RegionalTerminalOverviewView = undefined;
const UE = require("ue");
const AudioSystem_1 = require("../../../../../Core/Audio/AudioSystem");
const Log_1 = require("../../../../../Core/Common/Log");
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem");
const ActivityFunctionalTypeA_1 = require("../../../Activity/ActivityContent/UniversalComponents/Functional/ActivityFunctionalTypeA");
const ButtonItem_1 = require("../../../Common/Button/ButtonItem");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew");
const RegionalTerminalGameplayItem_1 = require("./RegionalTerminalGameplayItem");
const RegionalTerminalGroupItem_1 = require("./RegionalTerminalGroupItem");
class RegionalTerminalOverviewView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.lqe = undefined;
    this.KXm = undefined;
    this.XXm = undefined;
    this.wVl = undefined;
    this.p4e = undefined;
    this.l4e = undefined;
    this.eBl = 0;
    this.YXm = undefined;
    this.zXm = CommonParamById_1.configCommonParamById.GetIntConfig("AreaTerminalPinMaxCount") ?? 0;
    this.Arf = (i, e) => e.SortId - i.SortId;
    this.ZXm = () => {
      var i = new RegionalTerminalGroupItem_1.RegionalTerminalGroupItem();
      i.OnClickToggleCallBack = this.eYm;
      i.IsToggleSelectOnCallBack = this.tYm;
      return i;
    };
    this.eYm = (i, e, t) => {
      if (i) {
        if (this.YXm) {
          i = this.KXm.GetScrollItemByKey(this.YXm.GroupId);
          if (t !== this.YXm.GroupId) {
            i?.SetSelectOn(false);
          }
          i?.GetGameplayItem(this.YXm.Id)?.OnDeselected(false);
        }
        this.iYm(e, t);
      }
    };
    this.tYm = i => this.YXm === i;
    this.E5e = i => {
      var e = this.KXm.GetGenericLayout()?.GetUiAnimController();
      if (e) {
        e.AnimName = i;
        e.Play();
      }
    };
    this.NXm = (i, e) => {
      if (this.YXm?.Id === i) {
        this.rYm(this.YXm);
      }
      this.oYm(i)?.SetPin(e);
    };
    this.sYm = () => {
      if (this.YXm) {
        var i = this.GetExtendToggle(7).GetToggleState();
        if (i === 0) {
          if (ModelManager_1.ModelManager.RegionalTerminalModel.GetPinnedGameplayIds().length >= this.zXm) {
            ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("Terminal_Area_PinTipMax");
            return false;
          }
        }
        if (!ModelManager_1.ModelManager.RegionalTerminalModel.IsInPinCd) {
          this.nYm(i === 0);
        }
      }
      return false;
    };
    this.nqe = () => {
      var i;
      if (this.YXm) {
        if ((i = ConfigManager_1.ConfigManager.RegionalTerminalConfig.GetAreaTerminalByGameplayId(this.YXm.Id)).AreaForbiddenTips && !ModelManager_1.ModelManager.RegionalTerminalModel.CheckGameplayAreaAvailable(this.YXm.Id)) {
          ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId(i.AreaForbiddenTips);
        } else {
          this.YXm?.TerminalFunction();
          if (this.YXm.CloseTerminalWhenForwarding) {
            this.CloseMe();
          }
        }
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIScrollViewWithScrollbarComponent], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIText], [5, UE.UIItem], [6, UE.UIText], [7, UE.UIExtendToggle], [8, UE.UIItem], [9, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.KXm = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(1), this.ZXm, undefined, true);
    this.aYm();
    var i = [];
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem();
    i.push(this.lqe.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()));
    this.lqe.SetCloseCallBack(() => {
      this.CloseMe();
    });
    this.XXm = new RegionalTerminalGameplayItem_1.RegionalTerminalGameplayItem();
    this.XXm.EnableRedDot = false;
    this.XXm.IsToggleSelectOn = () => true;
    i.push(this.XXm.CreateThenShowByActorAsync(this.GetItem(3).GetOwner()));
    this.wVl = new ActivityFunctionalTypeA_1.FunctionalPanelConditionLock();
    i.push(this.wVl.CreateByActorAsync(this.GetItem(8).GetOwner()));
    this.p4e = new ButtonItem_1.ButtonItem();
    this.p4e.SetFunction(this.nqe);
    i.push(this.p4e.CreateByActorAsync(this.GetItem(9).GetOwner()));
    await Promise.all(i);
    await this.hYm();
    this.ryi();
  }
  OnBeforeShow() {
    this.KXm.GetScrollItemList().forEach(i => {
      i.RefreshFunctional();
    });
    this.lYm();
  }
  OnBeforeHide() {
    if (this.YXm) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RegionalTerminalGameplayPinUpdate, this.YXm.Id, ModelManager_1.ModelManager.RegionalTerminalModel.IsGameplayPin(this.YXm.Id));
    }
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RegionalTerminalGameplayPinUpdate, this.NXm);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PlaySequenceEventByStringParam, this.E5e);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RegionalTerminalGameplayPinUpdate, this.NXm);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PlaySequenceEventByStringParam, this.E5e);
  }
  OnBeforeDestroy() {
    this.Ovt();
  }
  async hYm() {
    var i = Array.from(ModelManager_1.ModelManager.RegionalTerminalModel.GroupDataMap.values()).filter(i => i.IsAvailableShow());
    i.sort(this.Arf);
    let e = this.OpenParam.GameplayId;
    if (e === 0) {
      e = i[0].GameplayDataList.filter(i => i.GetShowState()).sort(ModelManager_1.ModelManager.RegionalTerminalModel.SortGameplayData)[0].Id;
    }
    this.YXm = ModelManager_1.ModelManager.RegionalTerminalModel.GameplayDataMap.get(e);
    await this.KXm.RefreshByDataAsync(i);
  }
  ryi() {
    var i = this.KXm.GetScrollItemByKey(this.YXm.GroupId)?.GetGameplayItem(this.YXm.Id)?.GetRootItem();
    if (i) {
      this.KXm.LateScrollTo(i);
    }
  }
  iYm(i, e) {
    this.YXm = i;
    this.lYm();
    this.UiViewSequence?.PlayOrReplaySequenceByName("Switch");
  }
  oYm(i) {
    var e = ModelManager_1.ModelManager.RegionalTerminalModel.GameplayDataMap.get(i);
    if (e) {
      return this.KXm.GetScrollItemByKey(e.GroupId)?.GetGameplayItem(i);
    }
  }
  aYm() {
    this.GetExtendToggle(7).CanExecuteChange.Bind(this.sYm);
  }
  nYm(e) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Map", 37, "[RegionalTerminal] PinGameplay", ["GameplayId", this.YXm.Id], ["IsPin", e]);
    }
    var i = this.YXm.Id;
    ControllerHolder_1.ControllerHolder.RegionalTerminalController.RequestTerminalPinOperation(i, e, i => {
      ModelManager_1.ModelManager.RegionalTerminalModel.StartPinCdTimer();
      if (i) {
        this.tkf(false);
        i = e ? "Terminal_Area_PinTipSuccess" : "Terminal_Area_PinTipCancel";
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId(i);
      }
    });
  }
  lYm() {
    var i;
    var e;
    if (this.YXm) {
      this.rYm(this.YXm);
      this.KXm.GetScrollItemByKey(this.YXm.GroupId)?.SetSelectOn(true);
      i = this.YXm.GetLockState();
      e = ConfigManager_1.ConfigManager.RegionalTerminalConfig.GetAreaTerminalByGameplayId(this.YXm.Id);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), e.Desc);
      this.tkf(true);
      this.GetItem(5).SetUIActive(!i);
      e = this.YXm.GetViewParams();
      this.wVl.SetUiActive(e.ShowLockPanel);
      if (e.ShowLockPanel && (e.LockClickFunc !== undefined ? (this.wVl.ButtonCallBack = e.LockClickFunc, this.wVl.SetButtonVisible(true)) : this.wVl.SetButtonVisible(false), e.LockTxtId)) {
        this.wVl.SetTextByTextId(e.LockTxtId);
      }
      if (e.ButtonTxtId) {
        this.p4e.SetLocalTextNew(e.ButtonTxtId);
      }
      this.p4e.SetUiActive(e.ShowButton);
      this.K8e();
    }
  }
  tkf(i) {
    var e = ModelManager_1.ModelManager.RegionalTerminalModel.IsGameplayPin(this.YXm.Id);
    this.GetExtendToggle(7).SetToggleStateForce(e ? 1 : 0, false, false, i);
    if (!i) {
      AudioSystem_1.AudioSystem.PostEvent("play_ui_ia_com_tab_click");
    }
    var e = ModelManager_1.ModelManager.RegionalTerminalModel.GetPinnedGameplayIds().length;
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), "Terminal_Area_PinText", e, this.zXm);
  }
  rYm(i) {
    this.XXm.RefreshAsync(i, false, 0);
  }
  K8e() {
    this.Ovt();
    this.l4e = this.YXm.GetRedDotName();
    this.eBl = this.YXm.GetRedDotId();
    if (this.l4e) {
      this.p4e.BindRedDot(this.l4e, this.eBl);
    } else {
      this.p4e.SetRedDotVisible(this.YXm.GetRedDotState());
    }
  }
  Ovt() {
    if (this.l4e) {
      this.p4e.UnBindGivenUid(this.eBl);
      this.eBl = 0;
      this.l4e = undefined;
    }
  }
}
exports.RegionalTerminalOverviewView = RegionalTerminalOverviewView;
//# sourceMappingURL=RegionalTerminalOverviewView.js.map