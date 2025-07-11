"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QuestHandBookView = undefined;
const UE = require("ue");
const ConfigCommon_1 = require("../../../Core/Config/ConfigCommon");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const UiViewBase_1 = require("../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../Ui/Common/PopupCaptionItem");
const UiManager_1 = require("../../Ui/UiManager");
const GenericLayoutNew_1 = require("../Util/Layout/GenericLayoutNew");
const LguiUtil_1 = require("../Util/LguiUtil");
const HandBookController_1 = require("./HandBookController");
const PlotHandBookItem_1 = require("./PlotHandBookItem");
class QuestHandBookView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.GenericLayout = undefined;
    this.hti = [];
    this.lqe = undefined;
    this.Refresh = () => {
      this.InitVerticalLayout();
      this.RefreshCollectText();
    };
    this.lti = (e, t, i) => {
      t = new PlotHandBookItem_1.PlotHandBookItem(t);
      t.Refresh(e, false, i);
      return {
        Key: i,
        Value: t
      };
    };
    this.aei = (e, t) => e.Id - t.Id;
    this.lyt = () => {
      UiManager_1.UiManager.CloseView("QuestHandBookView");
    };
    this.OnPhotoSelect = e => {
      for (const i of this.GenericLayout?.GetLayoutItemList()) {
        for (const o of i.GetChildItemList()) {
          var t = o.GetTog();
          if (o.GetData()?.Config.Id === e) {
            t.SetToggleStateForce(1, false, true);
          } else {
            t.SetToggleStateForce(0, false, true);
          }
        }
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIVerticalLayout], [2, UE.UIText]];
  }
  OnStart() {
    this.Refresh();
    this.InitCommonTabTitle();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnHandBookDataInit, this.Refresh);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnHandBookDataUpdate, this.Refresh);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPhotoSelect, this.OnPhotoSelect);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnHandBookDataInit, this.Refresh);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnHandBookDataUpdate, this.Refresh);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPhotoSelect, this.OnPhotoSelect);
  }
  OnAfterShow() {}
  InitCommonTabTitle() {
    var e = ConfigManager_1.ConfigManager.HandBookConfig.GetHandBookEntranceConfig(7);
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0));
    this.lqe.SetCloseCallBack(this.lyt);
    this.lqe.SetTitleLocalText(e.Name);
    this.lqe.SetTitleIcon(e.TitleIcon);
  }
  InitVerticalLayout() {
    var e = ConfigCommon_1.ConfigCommon.ToList(ConfigManager_1.ConfigManager.HandBookConfig.GetPlotTypeConfigList());
    e.sort(this.aei);
    this.hti = e;
    this.GenericLayout ||= new GenericLayoutNew_1.GenericLayoutNew(this.GetVerticalLayout(1), this.lti);
    this.GenericLayout.ClearChildren();
    this.GenericLayout.RebuildLayoutByDataNew(this.hti);
  }
  RefreshCollectText() {
    var e = HandBookController_1.HandBookController.GetCollectProgress(7);
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(2), "RoleExp", e[0], e[1]);
    this.GetText(2)?.SetUIActive(false);
  }
  OnBeforeShow() {
    let e = true;
    for (const i of this.GenericLayout?.GetLayoutItemList()) {
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
  OnBeforeDestroy() {
    if (this.GenericLayout) {
      this.GenericLayout.ClearChildren();
      this.GenericLayout = undefined;
    }
    this.hti = [];
  }
}
exports.QuestHandBookView = QuestHandBookView;
//# sourceMappingURL=QuestHandBookView.js.map