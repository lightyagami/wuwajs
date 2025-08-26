"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GeographyHandBookView = undefined;
const UE = require("ue");
const ConfigCommon_1 = require("../../../Core/Config/ConfigCommon");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const UiViewBase_1 = require("../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../Ui/Common/PopupCaptionItem");
const UiManager_1 = require("../../Ui/UiManager");
const GenericLayout_1 = require("../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../Util/LguiUtil");
const GeographyHandBookItem_1 = require("./GeographyHandBookItem");
const HandBookController_1 = require("./HandBookController");
class GeographyHandBookView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.RoleRootUiCameraHandleData = undefined;
    this.GenericLayout = undefined;
    this.pei = [];
    this.vei = [];
    this.lqe = undefined;
    this.Refresh = () => {
      this.InitVerticalLayout();
      this.RefreshCollectText();
    };
    this.Mei = () => {
      var e = new GeographyHandBookItem_1.GeographyHandBookItem();
      this.vei.push(e);
      return e;
    };
    this.aei = (e, t) => e.Id - t.Id;
    this.Eei = (e, t) => e.Id - t.Id;
    this.lyt = () => {
      UiManager_1.UiManager.CloseView("GeographyHandBookView");
    };
    this.OnHandBookRead = (e, t) => {
      if (e === 2) {
        var i = this.vei.length;
        for (let e = 0; e < i; e++) {
          var o = this.vei[e].GetChildItemList();
          var n = o.length;
          for (let e = 0; e < n; e++) {
            var s = o[e];
            if (s.GetData().Config.Id === t) {
              s.SetNewState(false);
              return;
            }
          }
        }
      }
    };
    this.OnGeographyPhotoSelect = t => {
      var i = ConfigCommon_1.ConfigCommon.ToList(ConfigManager_1.ConfigManager.HandBookConfig.GetAllGeographyHandBookConfig());
      i.sort(this.Eei);
      var o = this.GetScrollViewWithScrollbar(3);
      var n = i.length;
      let s = undefined;
      for (let e = 0; e < n; e++) {
        var r = i[e];
        if (r.Id === t) {
          s = r;
          break;
        }
      }
      var h = this.vei.length;
      for (let e = 0; e < h; e++) {
        var a = this.vei[e].GetChildItemList();
        var v = a.length;
        for (let e = 0; e < v; e++) {
          var _ = a[e];
          var f = _.GetData().Config;
          if (f.Id === s.Id && f.Type === s.Type) {
            _.SetToggleState(1);
            o.ScrollTo(_.GetRootItem());
          } else {
            _.SetToggleState(0);
          }
        }
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIVerticalLayout], [2, UE.UIText], [3, UE.UIScrollViewWithScrollbarComponent]];
  }
  OnStart() {
    this.Refresh();
    this.InitCommonTabTitle();
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
  OnBeforeShow() {
    this.Oqe();
  }
  Oqe() {
    let e = true;
    for (const i of this.vei) {
      for (const o of i.GetChildItemList()) {
        var t = o.GetTog();
        if (e && o.GetIsUnlock()) {
          t.SetToggleStateForce(1, false, true);
          e = false;
        } else {
          t.SetToggleStateForce(0, false, true);
        }
      }
    }
  }
  InitCommonTabTitle() {
    var e = ConfigManager_1.ConfigManager.HandBookConfig.GetHandBookEntranceConfig(2);
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    this.lqe.SetCloseCallBack(this.lyt);
    this.lqe.SetTitleLocalText(e.Name);
    this.lqe.SetTitleIcon(e.TitleIcon);
  }
  InitVerticalLayout() {
    var e = ConfigCommon_1.ConfigCommon.ToList(ConfigManager_1.ConfigManager.HandBookConfig.GetGeographyTypeConfigList());
    e.sort(this.aei);
    this.pei = e;
    this.vei = [];
    this.GenericLayout ||= new GenericLayout_1.GenericLayout(this.GetVerticalLayout(1), this.Mei);
    this.GenericLayout.ClearChildren();
    this.GenericLayout.RefreshByData(this.pei, () => {
      var e = this.GetItem(0);
      this.GetScrollViewWithScrollbar(3).ScrollTo(e);
      this.Oqe();
    });
  }
  RefreshCollectText() {
    var e = HandBookController_1.HandBookController.GetCollectProgress(2);
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(2), "RoleExp", e[0], e[1]);
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