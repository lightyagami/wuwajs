"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HandBookQuestView = undefined;
const UE = require("ue");
const Info_1 = require("../../../Core/Common/Info");
const Time_1 = require("../../../Core/Common/Time");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiViewBase_1 = require("../../Ui/Base/UiViewBase");
const CommonTabComponentData_1 = require("../Common/TabComponent/CommonTabComponentData");
const CommonTabData_1 = require("../Common/TabComponent/CommonTabData");
const CommonTabTitleData_1 = require("../Common/TabComponent/CommonTabTitleData");
const TabComponentWithCaptionItem_1 = require("../Common/TabComponent/TabComponentWithCaptionItem");
const CommonTabItem_1 = require("../Common/TabComponent/TabItem/CommonTabItem");
const LguiUtil_1 = require("../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../Util/ScrollView/GenericScrollViewNew");
const HandBookController_1 = require("./HandBookController");
const HandBookQuestItem_1 = require("./HandBookQuestItem");
class HandBookQuestView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.RoleRootUiCameraHandleData = undefined;
    this.GenericScroll = undefined;
    this.s8e = undefined;
    this.WPn = [];
    this.Ivt = undefined;
    this.I6e = 0;
    this.yvt = undefined;
    this.L6e = undefined;
    this.ZZt = undefined;
    this.Refresh = () => {
      this.RefreshLoopScrollView();
      this.RefreshCollectText();
    };
    this.R6e = (t, e) => {
      return new CommonTabItem_1.CommonTabItem();
    };
    this.pqe = t => {
      this.L6e = Time_1.Time.Now;
      this.I6e = t;
      this.Refresh();
      this.GetScrollViewWithScrollbar(1).GetContent().GetComponentByClass(UE.UIInturnAnimController.StaticClass()).Play();
    };
    this.yqe = t => {
      t = this.yvt[t];
      return new CommonTabData_1.CommonTabData(t.Icon, new CommonTabTitleData_1.CommonTabTitleData(t.Name));
    };
    this.CanToggleChange = () => !!Info_1.Info.IsInGamepad() || !this.L6e || Time_1.Time.Now - this.L6e >= this.ZZt;
    this.KPn = () => {
      var t = new HandBookQuestItem_1.HandBookQuestItem();
      this.WPn.push(t);
      return t;
    };
    this.aei = (t, e) => t.Id - e.Id;
    this.lyt = () => {
      this.CloseMe();
    };
    this.OnHandBookRead = (t, e) => {
      if (t === this.yvt[this.I6e].Type) {
        var i = this.WPn.length;
        for (let t = 0; t < i; t++) {
          var o = this.WPn[t].GetChildItemList();
          var n = o.length;
          for (let t = 0; t < n; t++) {
            var s = o[t];
            if (s.GetData()?.ConfigId === e) {
              s.SetNewState(false);
              return;
            }
          }
        }
      }
    };
    this.OnPhotoSelect = t => {
      for (const e of this.WPn) {
        for (const i of e.GetChildItemList()) {
          i.GetTog().SetToggleStateForce(0, false, true);
        }
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIScrollViewWithScrollbarComponent], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.QPn();
    await this.InitCommonTabTitle();
  }
  OnStart() {
    this.Ivt?.SetHelpButtonShowState(false);
    this.Refresh();
    this.AddEvent();
  }
  AddEvent() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnHandBookDataInit, this.Refresh);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnHandBookDataUpdate, this.Refresh);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnHandBookRead, this.OnHandBookRead);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPhotoSelect, this.OnPhotoSelect);
  }
  RemoveEvent() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnHandBookDataInit, this.Refresh);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnHandBookDataUpdate, this.Refresh);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnHandBookRead, this.OnHandBookRead);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPhotoSelect, this.OnPhotoSelect);
  }
  OnBeforeShow() {
    let t = true;
    for (const i of this.WPn) {
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
    this.Ivt.SelectToggleByIndex(this.I6e);
  }
  async InitCommonTabTitle() {
    this.ZZt = CommonParamById_1.configCommonParamById.GetIntConfig("panel_interval_time");
    var t = new CommonTabComponentData_1.CommonTabComponentData(this.R6e, this.pqe, this.yqe);
    this.Ivt = new TabComponentWithCaptionItem_1.TabComponentWithCaptionItem(this.GetItem(0), t, this.lyt);
    this.Ivt.SetCanChange(this.CanToggleChange);
    var t = this.yvt.length;
    var t = this.Ivt.CreateTabItemDataByLength(t);
    await this.Ivt.RefreshTabItemAsync(t);
  }
  RefreshLoopScrollView() {
    this.s8e ||= ConfigManager_1.ConfigManager.HandBookConfig.GetPlotTypeConfigList();
    var e = [];
    var t = this.yvt[this.I6e].Type;
    for (const s of this.s8e) {
      if (s.Type === t) {
        var i = ConfigManager_1.ConfigManager.HandBookConfig.GetPlotHandBookConfigByType(s.Id);
        if (i) {
          let t = true;
          for (const r of i) {
            var o = ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(s.Type, r.Id);
            t = o === undefined && t;
          }
          if (!t) {
            e.push(s);
          }
        }
      }
    }
    e.sort(this.aei);
    var n = this.GetScrollViewWithScrollbar(1);
    this.GenericScroll ||= new GenericScrollViewNew_1.GenericScrollViewNew(n, this.KPn, this.GetItem(3).GetOwner());
    if (e.length <= 0) {
      this.GenericScroll.SetActive(false);
      this.GetItem(4)?.SetUIActive(true);
    } else {
      this.GenericScroll.SetActive(true);
      this.GetItem(4)?.SetUIActive(false);
      this.GenericScroll.RefreshByData(e, () => {
        var t = this.GenericScroll?.GetItemByIndex(0);
        if (t) {
          this.GenericScroll?.ScrollTo(t);
        }
      });
    }
  }
  RefreshCollectText() {
    var t = HandBookController_1.HandBookController.GetCollectProgress(this.yvt[this.I6e].Type);
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(2), "RoleExp", t[0], t[1]);
    this.GetText(2)?.SetUIActive(false);
  }
  OnBeforeDestroy() {
    this.RoleRootUiCameraHandleData = undefined;
    this.GenericScroll = undefined;
    this.s8e = [];
    this.WPn = [];
    this.RemoveEvent();
  }
  QPn() {
    this.yvt = ConfigManager_1.ConfigManager.HandBookConfig.GetQuestTabList();
  }
}
exports.HandBookQuestView = HandBookQuestView;
//# sourceMappingURL=HandBookQuestView.js.map