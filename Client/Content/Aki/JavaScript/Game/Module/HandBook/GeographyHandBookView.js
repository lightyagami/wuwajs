"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GeographyHandBookView = undefined;
const UE = require("ue");
const Info_1 = require("../../../Core/Common/Info");
const Time_1 = require("../../../Core/Common/Time");
const ConfigCommon_1 = require("../../../Core/Config/ConfigCommon");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const UiViewBase_1 = require("../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../Ui/UiManager");
const CommonTabComponentData_1 = require("../Common/TabComponent/CommonTabComponentData");
const CommonTabData_1 = require("../Common/TabComponent/CommonTabData");
const CommonTabTitleData_1 = require("../Common/TabComponent/CommonTabTitleData");
const TabComponentWithCaptionItem_1 = require("../Common/TabComponent/TabComponentWithCaptionItem");
const CommonTabItem_1 = require("../Common/TabComponent/TabItem/CommonTabItem");
const GenericLayout_1 = require("../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../Util/LguiUtil");
const GeographyHandBookItem_1 = require("./GeographyHandBookItem");
const HandBookController_1 = require("./HandBookController");
class GeographyHandBookView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.yvt = undefined;
    this.L6e = undefined;
    this.ZZt = undefined;
    this.I6e = 0;
    this.KO1 = 0;
    this.Ivt = undefined;
    this.RoleRootUiCameraHandleData = undefined;
    this.GenericLayout = undefined;
    this.pei = [];
    this.vei = [];
    this.Refresh = () => {
      this.RefreshVerticalLayout();
      this.RefreshCollectText();
    };
    this.R6e = (t, e) => {
      return new CommonTabItem_1.CommonTabItem();
    };
    this.yqe = t => {
      t = this.yvt[t];
      return new CommonTabData_1.CommonTabData(t.Icon, new CommonTabTitleData_1.CommonTabTitleData(t.TypeName));
    };
    this.pqe = t => {
      this.L6e = Time_1.Time.Now;
      this.I6e = t;
      this.Refresh();
    };
    this.CanToggleChange = () => !!Info_1.Info.IsInGamepad() || !this.L6e || Time_1.Time.Now - this.L6e >= this.ZZt;
    this.Mei = () => {
      var t = new GeographyHandBookItem_1.GeographyHandBookItem();
      this.vei.push(t);
      return t;
    };
    this.aei = (t, e) => t.Id - e.Id;
    this.Eei = (t, e) => t.Id - e.Id;
    this.lyt = () => {
      UiManager_1.UiManager.CloseView("GeographyHandBookView");
    };
    this.OnHandBookRead = (t, e) => {
      if (t === 2) {
        var i = this.GenericLayout.GetLayoutItemList();
        var o = i.length;
        for (let t = 0; t < o; t++) {
          var n = i[t].GetChildItemList();
          var s = n.length;
          for (let t = 0; t < s; t++) {
            var a = n[t];
            if (a.GetData().Config.Id === e) {
              a.SetNewState(false);
              return;
            }
          }
        }
      }
    };
    this.OnGeographyPhotoSelect = e => {
      var i = ConfigCommon_1.ConfigCommon.ToList(ConfigManager_1.ConfigManager.HandBookConfig.GetAllGeographyHandBookConfig());
      i.sort(this.Eei);
      var o = i.length;
      let n = undefined;
      for (let t = 0; t < o; t++) {
        var s = i[t];
        if (s.Id === e) {
          n = s;
          break;
        }
      }
      var t = this.yvt?.findIndex(t => t.Id === n.GeographyTabType);
      this.I6e = t;
      this.Ivt.SelectToggleByIndex(this.I6e);
      this.rIf(n);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIVerticalLayout], [2, UE.UIText], [3, UE.UIScrollViewWithScrollbarComponent]];
  }
  OnStart() {
    this.InitVerticalLayout();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnHandBookDataInit, this.Refresh);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnHandBookDataUpdate, this.Refresh);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnHandBookRead, this.OnHandBookRead);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPhotoSelect, this.OnGeographyPhotoSelect);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnHandBookDataInit, this.Refresh);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnHandBookDataUpdate, this.Refresh);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnHandBookRead, this.OnHandBookRead);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPhotoSelect, this.OnGeographyPhotoSelect);
  }
  async OnBeforeStartAsync() {
    this.QPn();
    this.oIf();
    await this.InitCommonTabTitle();
  }
  QPn() {
    this.yvt = ConfigManager_1.ConfigManager.HandBookConfig.GetGeographyTabList();
  }
  oIf() {
    var t = ConfigCommon_1.ConfigCommon.ToList(ConfigManager_1.ConfigManager.HandBookConfig.GetGeographyTypeConfigList());
    t.sort(this.aei);
    this.pei = t;
    var t = this.OpenParam;
    if (t && t.SelectedId) {
      const e = ConfigManager_1.ConfigManager.HandBookConfig.GetGeographyHandBookConfig(t.SelectedId);
      if (e) {
        this.KO1 = t.SelectedId;
        this.I6e = this.yvt.findIndex(t => t.Id === e.GeographyTabType);
      }
    }
  }
  OnBeforeShow() {
    this.Oqe();
    this.Ivt.SelectToggleByIndex(this.I6e);
    if (this.KO1 && this.KO1 > 0) {
      const t = ConfigManager_1.ConfigManager.HandBookConfig.GetGeographyHandBookConfig(this.KO1);
      TimerSystem_1.TimerSystem.Next(() => {
        this.rIf(t, true);
        this.KO1 = 0;
      });
    }
  }
  Oqe() {
    let t = true;
    for (const i of this.GenericLayout.GetLayoutItemList()) {
      for (const o of i.GetChildItemList()) {
        var e = o.GetTog();
        if (t && o.GetIsUnlock()) {
          e.SetToggleStateForce(1, false, true);
          t = false;
        } else {
          e.SetToggleStateForce(0, false, true);
        }
      }
    }
  }
  async InitCommonTabTitle() {
    this.ZZt = CommonParamById_1.configCommonParamById.GetIntConfig("panel_interval_time");
    var t = new CommonTabComponentData_1.CommonTabComponentData(this.R6e, this.pqe, this.yqe);
    this.Ivt = new TabComponentWithCaptionItem_1.TabComponentWithCaptionItem(this.GetItem(0), t, this.lyt);
    this.Ivt.SetCanChange(this.CanToggleChange);
    this.Ivt.SetHelpButtonShowState(false);
    var t = this.yvt.length;
    var t = this.Ivt.CreateTabItemDataByLength(t);
    await this.Ivt.RefreshTabItemAsync(t);
  }
  InitVerticalLayout() {
    this.GenericLayout = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(1), this.Mei);
  }
  RefreshVerticalLayout() {
    var t = [];
    var e = this.yvt[this.I6e];
    for (const o of this.pei) {
      var i = ConfigManager_1.ConfigManager.HandBookConfig.GetGeographyHandBookConfigByTabTypeAndType(e.Id, o.Id);
      if (!!i && !(i.length <= 0)) {
        i = {
          TabType: this.yvt[this.I6e],
          Type: o,
          HandBookList: ConfigCommon_1.ConfigCommon.ToList(i)
        };
        t.push(i);
      }
    }
    this.vei = [];
    this.GenericLayout.RefreshByData(t, () => {
      var t = this.GenericLayout.GetItemByIndex(0);
      if (t) {
        this.GetScrollViewWithScrollbar(3).ScrollTo(t);
      }
      this.Oqe();
    });
  }
  RefreshCollectText() {
    var t = HandBookController_1.HandBookController.GetCollectProgress(2);
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(2), "RoleExp", t[0], t[1]);
  }
  rIf(e, i = false) {
    var o = this.GetScrollViewWithScrollbar(3);
    var n = this.GenericLayout.GetLayoutItemList();
    var s = n.length;
    for (let t = 0; t < s; t++) {
      var a = n[t].GetChildItemList();
      var r = a.length;
      for (let t = 0; t < r; t++) {
        var h = a[t];
        var m = h.GetData().Config;
        if (m.Id === e.Id && m.Type === e.Type) {
          h.SetToggleState(1);
          o.ScrollTo(h.GetRootItem());
          if (i) {
            h.ToggleClick();
          }
        } else {
          h.SetToggleState(0);
        }
      }
    }
  }
  OnBeforeDestroy() {
    this.RoleRootUiCameraHandleData = undefined;
    if (this.GenericLayout) {
      this.GenericLayout.ClearChildren();
      this.GenericLayout = undefined;
    }
    this.pei = [];
    this.vei = [];
  }
}
exports.GeographyHandBookView = GeographyHandBookView;
//# sourceMappingURL=GeographyHandBookView.js.map