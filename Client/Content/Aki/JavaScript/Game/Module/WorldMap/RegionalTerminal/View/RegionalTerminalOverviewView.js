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
    this.gJm = undefined;
    this.CJm = undefined;
    this.wVl = undefined;
    this.p4e = undefined;
    this.l4e = undefined;
    this.eBl = 0;
    this.pJm = undefined;
    this.vJm = CommonParamById_1.configCommonParamById.GetIntConfig("AreaTerminalPinMaxCount") ?? 0;
    this.Ynf = (i, e) => e.SortId - i.SortId;
    this.SJm = () => {
      var i = new RegionalTerminalGroupItem_1.RegionalTerminalGroupItem();
      i.OnClickToggleCallBack = this.MJm;
      i.IsToggleSelectOnCallBack = this.EJm;
      return i;
    };
    this.MJm = (i, e, t) => {
      if (i) {
        if (this.pJm) {
          i = this.gJm.GetScrollItemByKey(this.pJm.GroupId);
          if (t !== this.pJm.GroupId) {
            i?.SetSelectOn(false);
          }
          i?.GetGameplayItem(this.pJm.Id)?.OnDeselected(false);
        }
        this.IJm(e, t);
      }
    };
    this.EJm = i => this.pJm === i;
    this.E5e = i => {
      var e = this.gJm.GetGenericLayout()?.GetUiAnimController();
      if (e) {
        e.AnimName = i;
        e.Play();
      }
    };
    this.lJm = (i, e) => {
      if (this.pJm?.Id === i) {
        this.TJm(this.pJm);
      }
      this.bJm(i)?.SetPin(e);
    };
    this.wJm = () => {
      if (this.pJm) {
        var i = this.GetExtendToggle(7).GetToggleState();
        if (i === 0) {
          if (ModelManager_1.ModelManager.RegionalTerminalModel.GetPinnedGameplayIds().length >= this.vJm) {
            ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("Terminal_Area_PinTipMax");
            return false;
          }
        }
        if (!ModelManager_1.ModelManager.RegionalTerminalModel.IsInPinCd) {
          this.RJm(i === 0);
        }
      }
      return false;
    };
    this.nqe = () => {
      if (this.pJm && (this.pJm?.TerminalFunction(), this.pJm.CloseTerminalWhenForwarding)) {
        this.CloseMe();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIScrollViewWithScrollbarComponent], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIText], [5, UE.UIItem], [6, UE.UIText], [7, UE.UIExtendToggle], [8, UE.UIItem], [9, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.gJm = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(1), this.SJm, undefined, true);
    this.LJm();
    var i = [];
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem();
    i.push(this.lqe.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()));
    this.lqe.SetCloseCallBack(() => {
      this.CloseMe();
    });
    this.CJm = new RegionalTerminalGameplayItem_1.RegionalTerminalGameplayItem();
    this.CJm.EnableRedDot = false;
    this.CJm.IsToggleSelectOn = () => true;
    i.push(this.CJm.CreateThenShowByActorAsync(this.GetItem(3).GetOwner()));
    this.wVl = new ActivityFunctionalTypeA_1.FunctionalPanelConditionLock();
    i.push(this.wVl.CreateByActorAsync(this.GetItem(8).GetOwner()));
    this.p4e = new ButtonItem_1.ButtonItem();
    this.p4e.SetFunction(this.nqe);
    i.push(this.p4e.CreateByActorAsync(this.GetItem(9).GetOwner()));
    await Promise.all(i);
    await this.PJm();
    this.ryi();
  }
  OnBeforeShow() {
    this.gJm.GetScrollItemList().forEach(i => {
      i.RefreshFunctional();
    });
    this.AJm();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RegionalTerminalGameplayPinUpdate, this.lJm);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PlaySequenceEventByStringParam, this.E5e);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RegionalTerminalGameplayPinUpdate, this.lJm);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PlaySequenceEventByStringParam, this.E5e);
  }
  OnBeforeDestroy() {
    this.Ovt();
  }
  async PJm() {
    var i = Array.from(ModelManager_1.ModelManager.RegionalTerminalModel.GroupDataMap.values()).filter(i => i.IsAvailableShow());
    i.sort(this.Ynf);
    let e = this.OpenParam.GameplayId;
    if (e === 0) {
      e = i[0].GameplayDataList.filter(i => i.GetShowState()).sort(ModelManager_1.ModelManager.RegionalTerminalModel.SortGameplayData)[0].Id;
    }
    this.pJm = ModelManager_1.ModelManager.RegionalTerminalModel.GameplayDataMap.get(e);
    await this.gJm.RefreshByDataAsync(i);
  }
  ryi() {
    var i = this.gJm.GetScrollItemByKey(this.pJm.GroupId)?.GetGameplayItem(this.pJm.Id)?.GetRootItem();
    if (i) {
      this.gJm.LateScrollTo(i);
    }
  }
  IJm(i, e) {
    this.pJm = i;
    this.AJm();
    this.UiViewSequence?.PlayOrReplaySequenceByName("Switch");
  }
  bJm(i) {
    var e = ModelManager_1.ModelManager.RegionalTerminalModel.GameplayDataMap.get(i);
    if (e) {
      return this.gJm.GetScrollItemByKey(e.GroupId)?.GetGameplayItem(i);
    }
  }
  LJm() {
    this.GetExtendToggle(7).CanExecuteChange.Bind(this.wJm);
  }
  RJm(e) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Map", 37, "[RegionalTerminal] PinGameplay", ["GameplayId", this.pJm.Id], ["IsPin", e]);
    }
    var i = this.pJm.Id;
    ControllerHolder_1.ControllerHolder.RegionalTerminalController.RequestTerminalPinOperation(i, e, i => {
      ModelManager_1.ModelManager.RegionalTerminalModel.StartPinCdTimer();
      if (i) {
        this.WNf(false);
        i = e ? "Terminal_Area_PinTipSuccess" : "Terminal_Area_PinTipCancel";
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId(i);
      }
    });
  }
  AJm() {
    var i;
    var e;
    if (this.pJm) {
      this.TJm(this.pJm);
      this.gJm.GetScrollItemByKey(this.pJm.GroupId)?.SetSelectOn(true);
      i = this.pJm.GetLockState();
      e = ConfigManager_1.ConfigManager.RegionalTerminalConfig.GetAreaTerminalByGameplayId(this.pJm.Id);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), e.Desc);
      this.WNf(true);
      this.GetItem(5).SetUIActive(!i);
      e = this.pJm.GetViewParams();
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
  WNf(i) {
    var e = ModelManager_1.ModelManager.RegionalTerminalModel.IsGameplayPin(this.pJm.Id);
    this.GetExtendToggle(7).SetToggleStateForce(e ? 1 : 0, false, false, i);
    if (!i) {
      AudioSystem_1.AudioSystem.PostEvent("play_ui_ia_com_tab_click");
    }
    var e = ModelManager_1.ModelManager.RegionalTerminalModel.GetPinnedGameplayIds().length;
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), "Terminal_Area_PinText", e, this.vJm);
  }
  TJm(i) {
    this.CJm.RefreshAsync(i, false, 0);
  }
  K8e() {
    this.Ovt();
    this.l4e = this.pJm.GetRedDotName();
    this.eBl = this.pJm.GetRedDotId();
    if (this.l4e) {
      this.p4e.BindRedDot(this.l4e, this.eBl);
    } else {
      this.p4e.SetRedDotVisible(this.pJm.GetRedDotState());
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