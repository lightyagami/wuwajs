"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RegionalTerminalBarItem = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew");
const RegionalTerminalBarGameplayItem_1 = require("./RegionalTerminalBarGameplayItem");
class RegionalTerminalBarItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.SPe = undefined;
    this.rJm = undefined;
    this.oJm = false;
    this.nJm = false;
    this.sJm = false;
    this.aJm = false;
    this.U0n = false;
    this.hJm = false;
    this.ShowMode = 1;
    this.Dwn = [];
    this.lJm = () => {
      this._Jm();
      this._Oe();
    };
    this.V1g = () => {
      this._Jm();
      this._Oe();
      if (!this.sJm && this.hJm) {
        this.SPe.StopSequenceByKey("Close", true);
        this.U0n = true;
        this.SPe.PlayOrReplaySequenceByName("Start");
      }
    };
    this.bCf = e => {
      if (e === "Close") {
        this._Oe();
      }
      this.U0n = false;
    };
    this.Wpu = (e, t) => {
      var i = this.rJm?.GetGenericLayout()?.GetUiAnimController();
      if (i) {
        i.AnimName = t;
        i.Play();
      }
    };
    this.uJm = () => {
      return new RegionalTerminalBarGameplayItem_1.RegionalTerminalBarGameplayItem();
    };
    this.cJm = () => {
      if (!this.U0n) {
        this.sJm = true;
        ModelManager_1.ModelManager.RegionalTerminalModel.BarFoldState = this.sJm;
        this.SPe.StopSequenceByKey("Start", true);
        this.U0n = true;
        this.SPe.PlayOrReplaySequenceByName("Close");
      }
    };
    this.dJm = () => {
      var e;
      if (this.aJm) {
        if (!this.U0n) {
          this.sJm = false;
          ModelManager_1.ModelManager.RegionalTerminalModel.BarFoldState = this.sJm;
          this._Oe();
          this.SPe.StopSequenceByKey("Close", true);
          this.U0n = true;
          this.SPe.PlayOrReplaySequenceByName("Start");
          if ((e = this.rJm.GetScrollItemList()).length > 0) {
            ControllerHolder_1.ControllerHolder.UiNavigationNewController.SetNavigationFocusForView(e[0].GetRootItem());
          }
        }
      } else {
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("Terminal_Area_UnlockTip");
      }
    };
    this.mJm = () => {
      ControllerHolder_1.ControllerHolder.RegionalTerminalController.OpenTerminalOverviewView();
    };
    this.SetWorldMapSelfShow = e => {
      this.ShowMode = e;
    };
    this.RefreshWorldMapSelfShow = e => {
      this.SetUiActive(this.IsAvailableShow());
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIScrollViewWithScrollbarComponent], [1, UE.UIItem], [2, UE.UIButtonComponent], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIButtonComponent], [6, UE.UIItem], [7, UE.UIButtonComponent], [8, UE.UIItem], [9, UE.UIItem]];
    this.BtnBindInfo = [[2, this.cJm], [7, this.dJm], [5, this.mJm]];
  }
  OnStart() {
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.SPe.BindSequenceCloseEvent(this.bCf);
    this.RootActor.OnSequencePlayEvent.Bind(this.Wpu);
    this.rJm = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(0), this.uJm);
    this._Jm();
    this.GetItem(8).SetUIActive(!this.aJm);
    var e = this.OpenParam;
    if (e?.IsUnfold !== undefined) {
      this.sJm = !this.aJm || !e.IsUnfold;
    } else {
      this.sJm = !this.aJm || ModelManager_1.ModelManager.RegionalTerminalModel.BarFoldState;
    }
    this._Oe();
  }
  BeforeShow() {
    this._Jm();
    this._Oe();
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RegionalTerminalGameplayPinUpdate, this.lJm);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.AreaMapGroupIdChanged, this.V1g);
  }
  BeforeHide() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RegionalTerminalGameplayPinUpdate, this.lJm);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.AreaMapGroupIdChanged, this.V1g);
  }
  _Jm() {
    this.Dwn = ModelManager_1.ModelManager.RegionalTerminalModel.GetGameplayDataList();
    this.hJm = this.Dwn.length > 0;
    if (this.hJm) {
      this.aJm = true;
      this.rJm.RefreshByData(this.Dwn);
    }
    this.nJm = false;
    this.oJm = false;
    for (const e of ModelManager_1.ModelManager.RegionalTerminalModel.GameplayDataMap.values()) {
      if (this.Dwn.includes(e)) {
        if (e.GetRedDotState()) {
          this.nJm = true;
        }
      } else if (e.GetShowState() && (this.aJm = true, e.GetRedDotState())) {
        this.oJm = true;
        break;
      }
    }
    this.BNe();
  }
  _Oe() {
    this.GetButton(2).RootUIComp.SetUIActive(!this.sJm);
    this.GetButton(5).RootUIComp.SetUIActive(!this.sJm);
    this.GetButton(7).RootUIComp.SetUIActive(this.sJm);
    this.GetScrollViewWithScrollbar(0).RootUIComp.SetUIActive(this.hJm && !this.sJm);
  }
  BNe() {
    this.GetItem(6).SetUIActive(this.oJm);
    this.GetItem(9).SetUIActive(this.nJm || this.oJm);
  }
  IsAvailableShow() {
    return this.ShowMode === 1;
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    if (e.length !== 0 && e[0] === "BarItem") {
      var t = Number(e[1]);
      for (let e = 0; e < this.Dwn.length; e++) {
        var i = this.Dwn[e];
        if (i.Id === t) {
          if (i = this.rJm?.GetGenericLayout()?.GetLayoutItemByIndex(e)?.GetRootItem()) {
            return [i, i];
          } else {
            return undefined;
          }
        }
      }
    }
  }
}
exports.RegionalTerminalBarItem = RegionalTerminalBarItem;
//# sourceMappingURL=RegionalTerminalBarItem.js.map