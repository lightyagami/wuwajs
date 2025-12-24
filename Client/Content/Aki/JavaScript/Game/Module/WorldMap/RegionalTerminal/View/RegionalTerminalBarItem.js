"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RegionalTerminalBarItem = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const MapUtil_1 = require("../../../Map/MapUtil");
const GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew");
const RegionalTerminalBarGameplayItem_1 = require("./RegionalTerminalBarGameplayItem");
class RegionalTerminalBarItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.SPe = undefined;
    this.BXm = undefined;
    this.kXm = false;
    this.qXm = false;
    this.OXm = false;
    this.GXm = false;
    this.U0n = false;
    this.FXm = false;
    this.ShowMode = 1;
    this.Dwn = [];
    this.NXm = (e, t) => {
      this.VXm();
      this._Oe();
    };
    this.Pgf = e => {
      if (e === "Close") {
        this._Oe();
      }
      this.U0n = false;
    };
    this.E5e = e => {
      var t = this.BXm?.GetGenericLayout()?.GetUiAnimController();
      if (t) {
        t.AnimName = e;
        t.Play();
      }
    };
    this.HXm = () => {
      return new RegionalTerminalBarGameplayItem_1.RegionalTerminalBarGameplayItem();
    };
    this.jXm = () => {
      if (!this.U0n) {
        this.OXm = true;
        ModelManager_1.ModelManager.RegionalTerminalModel.BarFoldState = this.OXm;
        this.SPe.StopSequenceByKey("Start", true);
        this.U0n = true;
        this.SPe.PlayOrReplaySequenceByName("Close");
      }
    };
    this.$Xm = () => {
      var e;
      if (this.GXm) {
        if (!this.U0n) {
          this.OXm = false;
          ModelManager_1.ModelManager.RegionalTerminalModel.BarFoldState = this.OXm;
          this._Oe();
          this.SPe.StopSequenceByKey("Close", true);
          this.U0n = true;
          this.SPe.PlayOrReplaySequenceByName("Start");
          if ((e = this.BXm.GetScrollItemList()).length > 0) {
            ControllerHolder_1.ControllerHolder.UiNavigationNewController.SetNavigationFocusForView(e[0].GetRootItem());
          }
        }
      } else {
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("Terminal_Area_UnlockTip");
      }
    };
    this.WXm = () => {
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
    this.BtnBindInfo = [[2, this.jXm], [7, this.$Xm], [5, this.WXm]];
  }
  OnStart() {
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.SPe.BindSequenceCloseEvent(this.Pgf);
    this.BXm = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(0), this.HXm);
    this.VXm();
    this.GetItem(8).SetUIActive(!this.GXm);
    var e = this.OpenParam;
    if (e?.IsUnfold !== undefined) {
      this.OXm = !this.GXm || !e.IsUnfold;
    } else {
      this.OXm = !this.GXm || ModelManager_1.ModelManager.RegionalTerminalModel.BarFoldState;
    }
    this._Oe();
  }
  BeforeShow() {
    this.VXm();
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RegionalTerminalGameplayPinUpdate, this.NXm);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PlaySequenceEventByStringParam, this.E5e);
  }
  BeforeHide() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RegionalTerminalGameplayPinUpdate, this.NXm);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PlaySequenceEventByStringParam, this.E5e);
  }
  VXm() {
    let e = ModelManager_1.ModelManager.AreaModel.AreaInfo;
    if (!e) {
      var t = MapUtil_1.MapUtil.GetWorldMapLevelOneAreaId();
      if (!(e = t ? ConfigManager_1.ConfigManager.AreaConfig.GetAreaInfo(t) : e)) {
        return;
      }
    }
    t = ModelManager_1.ModelManager.AreaModel.GetAllAreaIdInheritable(e);
    this.Dwn = ModelManager_1.ModelManager.RegionalTerminalModel.GetGameplayDataList(t, e.CountryId);
    this.FXm = this.Dwn.length > 0;
    if (this.FXm) {
      this.GXm = true;
      this.BXm.RefreshByData(this.Dwn);
    }
    this.qXm = false;
    this.kXm = false;
    for (const i of ModelManager_1.ModelManager.RegionalTerminalModel.GameplayDataMap.values()) {
      if (this.Dwn.includes(i)) {
        if (i.GetRedDotState()) {
          this.qXm = true;
        }
      } else if (i.GetShowState() && (this.GXm = true, i.GetRedDotState())) {
        this.kXm = true;
        break;
      }
    }
    this.BNe();
  }
  _Oe() {
    this.GetButton(2).RootUIComp.SetUIActive(!this.OXm);
    this.GetButton(5).RootUIComp.SetUIActive(!this.OXm);
    this.GetButton(7).RootUIComp.SetUIActive(this.OXm);
    this.GetScrollViewWithScrollbar(0).RootUIComp.SetUIActive(this.FXm && !this.OXm);
  }
  BNe() {
    this.GetItem(6).SetUIActive(this.kXm);
    this.GetItem(9).SetUIActive(this.qXm || this.kXm);
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
          if (i = this.BXm?.GetGenericLayout()?.GetLayoutItemByIndex(e)?.GetRootItem()) {
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