"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KeySettingPanel = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const DynScrollView_1 = require("../../Util/ScrollView/DynScrollView");
const MenuDefine_1 = require("../MenuDefine");
const KeySettingRowBaseItem_1 = require("./KeySettingRowBaseItem");
const KeySettingRowContainerItem_1 = require("./KeySettingRowContainerItem");
const SCROLL_TO_OFFSET = 3;
class KeySettingPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.MPi = undefined;
    this.EPi = undefined;
    this.SPi = undefined;
    this.tui = undefined;
    this.iui = undefined;
    this.yPi = undefined;
    this.IPi = undefined;
    this.TPi = [];
    this.qfa = 0;
    this.LSi = (e, t, i) => {
      var s = new KeySettingRowContainerItem_1.KeySettingRowContainerItem();
      s.BindOnToggleStateChanged(this.sui);
      s.BindOnHover(this._ui);
      s.BindOnUnHover(this.uui);
      s.BindOnWaitInput(this.LPi);
      return s;
    };
    this.sui = (e, t) => {
      if (t === 0) {
        e.SetDetailItemVisible(false);
        this.yPi = undefined;
      } else {
        this.yPi?.SetDetailItemVisible(false);
        this.yPi = e;
        this.yPi.SetDetailItemVisible(true);
      }
    };
    this._ui = e => {
      if (this.tui) {
        this.tui(e);
      }
    };
    this.uui = e => {
      if (this.iui) {
        this.iui(e);
      }
    };
    this.LPi = (e, t, i) => {
      if (this.SPi) {
        this.SPi(e, t, i);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIDynScrollViewComponent], [1, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.EPi = new KeySettingRowBaseItem_1.KeySettingRowBaseItem();
    this.MPi = new DynScrollView_1.DynamicScrollView(this.GetUIDynScrollViewComponent(0), this.GetItem(1), this.EPi, this.LSi);
    await this.MPi.Init();
  }
  OnBeforeDestroy() {
    this.EPi = undefined;
    this.MPi = undefined;
    this.yPi = undefined;
    this.IPi = undefined;
    this.SPi = undefined;
    this.qfa = 0;
  }
  SelectKeySettingRow(e) {
    this.IPi?.SetSelected(false);
    this.IPi = e;
    this.IPi?.SetSelected(true);
  }
  BindOnWaitInput(e) {
    this.SPi = e;
  }
  BindOnHover(e) {
    this.tui = e;
  }
  BindOnUnHover(e) {
    this.iui = e;
  }
  Refresh(e, t) {
    for (const i of e) {
      i.IsExpandDetail = false;
    }
    ModelManager_1.ModelManager.MenuModel.KeySettingInputControllerType = t;
    this.MPi?.RefreshByData(e);
    this.TPi = e;
    this.yPi = undefined;
  }
  RefreshRow(e) {
    var t = this.TPi.indexOf(e);
    this.MPi?.GetScrollItemFromIndex(t)?.Update(e, t);
  }
  GetRowByData(e, t) {
    var e = this.TPi.indexOf(e);
    var i = this.MPi;
    if (i) {
      if (t && this.qfa === 0) {
        this.qfa = 1;
        i.ScrollToItemIndex(e - SCROLL_TO_OFFSET).finally(() => {
          this.qfa = 2;
        });
      }
      if (this.qfa === 1) {
        return undefined;
      } else {
        this.qfa = 0;
        i.AddListenerOnItemClear(e, () => {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Guide", 64, "当item拖出view之后，停止引导@[KeySettingPanel]");
          }
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.FinishGuideStepByEvent, MenuDefine_1.STOP_GUIDE_TAG);
        });
        return i.GetScrollItemFromIndex(e);
      }
    }
  }
  StopScroll() {
    this.GetUIDynScrollViewComponent(0).StopMovement();
  }
}
exports.KeySettingPanel = KeySettingPanel;
//# sourceMappingURL=KeySettingPanel.js.map