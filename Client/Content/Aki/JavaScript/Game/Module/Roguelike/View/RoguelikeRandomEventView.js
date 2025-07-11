"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoguelikeRandomEventView = undefined;
const UE = require("ue");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
const RoguelikeDefine_1 = require("../Define/RoguelikeDefine");
const RogueSelectResult_1 = require("../Define/RogueSelectResult");
const RoguelikeController_1 = require("../RoguelikeController");
class RoguelikeRandomEventItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Data = undefined;
    this.OnSelectHandle = undefined;
    this.OnClickEvent = e => {
      ModelManager_1.ModelManager.RoguelikeModel.CurrentRogueGainEntry = e === 1 ? this.Data : undefined;
      if (this.OnSelectHandle) {
        this.OnSelectHandle(this, e);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText], [2, UE.UIText]];
  }
  OnStart() {
    this.GetExtendToggle(0).OnStateChange.Clear();
    this.GetExtendToggle(0).OnStateChange.Add(this.OnClickEvent);
  }
  SetButtonState(e) {
    this.GetExtendToggle(0).SetSelfInteractive(e);
  }
  SetToggleState(e) {
    this.GetExtendToggle(0).SetToggleState(e ? 1 : 0, false);
  }
  GetToggleState() {
    return this.GetExtendToggle(0).GetToggleState();
  }
  Refresh(e, t, i) {
    this.Data = e;
    var s = ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueEventConfigById(e.ConfigId);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), s?.Title ?? "");
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), s?.TextId ?? "");
    var s = this.Data.IsSell ?? ModelManager_1.ModelManager.RoguelikeModel.GetRoguelikeCurrency(RoguelikeDefine_1.INSIDE_CURRENCY_ID) >= (e.Cost ?? 0);
    this.SetButtonState(!this.Data.IsSelect && s);
  }
}
class RoguelikeRandomEventView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.EventItemList = [];
    this.EventActorList = [];
    this.DelayShowTimerId = undefined;
    this.LastSelectItem = undefined;
    this.GenericLayout = undefined;
    this.LevelSequencePlayer = undefined;
    this.YMa = false;
    this.OnBtnConfirm = () => {
      RoguelikeController_1.RoguelikeController.RogueChooseDataResultRequest(7);
    };
    this.Fao = () => {
      var e = new RoguelikeRandomEventItem();
      e.OnSelectHandle = this.OnSelectHandle;
      return e;
    };
    this.RoguelikeChooseDataResult = (e, t, i, s, r) => {
      const o = ModelManager_1.ModelManager.RoguelikeModel?.GetRoguelikeChooseDataById(-2);
      if (s === o?.Index) {
        RoguelikeController_1.RoguelikeController.CreateCloseViewCallBack(r, () => {
          var e = new RogueSelectResult_1.RogueSelectResult(ModelManager_1.ModelManager.RoguelikeModel.RogueInfo.PhantomEntry, t, undefined, false);
          e.CallBack = () => {
            this.UpdateEventList(o, false);
          };
          if (e.GetNewUnlockAffixEntry().size > 0) {
            UiManager_1.UiManager.OpenView("CommonSelectResultView", e);
          } else if (!this.Yho(() => {
            this.UpdateEventList(o, false);
          }) && !this.YMa) {
            this.UpdateEventList(o, false);
          }
        })?.();
      }
    };
    this.OnSelectHandle = (e, t) => {
      if (this.LastSelectItem !== undefined && this.LastSelectItem !== e && t === 1) {
        this.LastSelectItem.SetToggleState(false);
      }
      this.LastSelectItem = e;
      let i = false;
      this.GenericLayout?.GetLayoutItemList().forEach(e => {
        if (e.GetToggleState() === 1) {
          i = true;
        }
      });
      this.GetButton(2).SetSelfInteractive(i);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIVerticalLayout], [1, UE.UIItem], [2, UE.UIButtonComponent], [3, UE.UIItem]];
    this.BtnBindInfo = [[2, this.OnBtnConfirm]];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RoguelikeChooseDataResult, this.RoguelikeChooseDataResult);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RoguelikeChooseDataResult, this.RoguelikeChooseDataResult);
  }
  OnStart() {
    this.GenericLayout = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(0), this.Fao);
    this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  OnBeforeShow() {
    this.GetButton(2).RootUIComp.SetUIActive(false);
    this.GetButton(2).SetSelfInteractive(false);
    const e = ModelManager_1.ModelManager.RoguelikeModel?.GetRoguelikeChooseDataById(-2);
    if (!this.Yho(() => {
      this.UpdateEventList(e);
    })) {
      this.UpdateEventList(e);
    }
  }
  OnBeforeDestroy() {
    this.EventItemList.forEach(e => {
      e.Destroy();
    });
    if (this.DelayShowTimerId !== undefined) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.DelayShowTimerId);
    }
    this.EventItemList.length = 0;
    (this.EventActorList.length = 0, this.OpenParam.SelectCallback)?.(this.LastSelectItem !== undefined ? this.LastSelectItem.Data.ConfigId : 0);
  }
  UpdateEventList(i, e = 0) {
    var t = i.RogueGainEntryList.length === 0;
    this.yka(false);
    if (t) {
      this.CloseMe();
    } else {
      (async () => {
        let e = false;
        for (const t of i.RogueGainEntryList) {
          e = e || t.IsSelect;
        }
        this.GetItem(1).SetUIActive(false);
        await this.GenericLayout?.RefreshByDataAsync(i.RogueGainEntryList);
        this.yka(true);
        this.LevelSequencePlayer?.PlaySequencePurely("ShowPanel");
      })();
    }
  }
  yka(e) {
    this.GetItem(3).SetUIActive(e);
    this.GetButton(2).RootUIComp.SetUIActive(e);
  }
  Yho(e) {
    var t = ModelManager_1.ModelManager.RoguelikeModel?.GetRoguelikeChooseDataById(Protocol_1.Aki.Protocol.s8s.Proto_EventRoleBuffBindId);
    return t !== undefined && !t.IsSelect && t.Layer === ModelManager_1.ModelManager.RoguelikeModel?.CurRoomCount && (t.CallBack = e, UiManager_1.UiManager.OpenView("RoleBuffSelectView", t), true);
  }
}
exports.RoguelikeRandomEventView = RoguelikeRandomEventView;
//# sourceMappingURL=RoguelikeRandomEventView.js.map