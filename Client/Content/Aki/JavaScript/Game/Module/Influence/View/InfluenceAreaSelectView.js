"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InfluenceAreaSelectView = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const GenericLayoutNew_1 = require("../../Util/Layout/GenericLayoutNew");
const LguiUtil_1 = require("../../Util/LguiUtil");
const InfluenceReputationDefine_1 = require("../InfluenceReputationDefine");
class InfluenceAreaSelectView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Yni = undefined;
    this.Jni = undefined;
    this.zni = 0;
    this.Rvt = () => {
      this.CloseMe();
    };
    this.qAt = () => {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshInfluencePanel, this.zni);
      this.CloseMe();
    };
    this.sGe = (e, t) => {
      t = new AreaButtonItem(t);
      t.UpdateItem(e.Id);
      t.SetToggleFunction(this.j5e);
      t.SetCanExecuteChange(this.Lke);
      return {
        Key: e.Id,
        Value: t
      };
    };
    this.j5e = e => {
      if (this.zni) {
        this.Zni(this.zni).SetToggleState(0, false);
      }
      this.zni = e;
      var t = this.GetText(3);
      var i = this.GetText(4);
      var s = ModelManager_1.ModelManager.InfluenceReputationModel.IsCountryUnLock(e);
      var n = this.GetInteractionGroup(6);
      if (s) {
        s = ConfigManager_1.ConfigManager.InfluenceConfig.GetCountryConfig(e);
        LguiUtil_1.LguiUtil.SetLocalTextNew(t, s.Title);
        LguiUtil_1.LguiUtil.SetLocalTextNew(i, s.Desc);
        n.SetInteractable(true);
      } else {
        LguiUtil_1.LguiUtil.SetLocalText(t, "AreaLockTitle");
        LguiUtil_1.LguiUtil.SetLocalText(i, "AreaLockContent");
        n.SetInteractable(false);
      }
    };
    this.Lke = e => this.zni !== e;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIGridLayout], [2, UE.UIItem], [3, UE.UIText], [4, UE.UIText], [5, UE.UIButtonComponent], [6, UE.UIInteractionGroup]];
    this.BtnBindInfo = [[0, this.Rvt], [5, this.qAt]];
  }
  OnStart() {
    this.Yni = new GenericLayoutNew_1.GenericLayoutNew(this.GetGridLayout(1), this.sGe);
    var e = ConfigManager_1.ConfigManager.InfluenceConfig.GetCountryList();
    this.Yni.RebuildLayoutByDataNew(e);
    this.Jni = new AreaButtonItem(this.GetItem(2));
    this.Jni.UpdateItem(InfluenceReputationDefine_1.NO_COUNTRY_ID);
    this.Jni.SetToggleFunction(this.j5e);
    this.Jni.SetCanExecuteChange(this.Lke);
  }
  Zni(e) {
    e = this.Yni.GetLayoutItemByKey(e);
    return e || this.Jni;
  }
  OnAfterShow() {
    var e = this.OpenParam;
    this.Zni(e).SetToggleState(1, true);
  }
  OnBeforeDestroy() {
    this.Yni.ClearChildren();
    this.Yni = undefined;
    this.Jni.Destroy();
    this.Jni = undefined;
  }
}
exports.InfluenceAreaSelectView = InfluenceAreaSelectView;
class AreaButtonItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super();
    this.j5e = undefined;
    this.Vbt = undefined;
    this.z5t = 0;
    this.Bke = e => {
      if (e === 1) {
        this.j5e(this.z5t);
      }
    };
    this.Lke = () => !this.Vbt || this.Vbt(this.z5t);
    this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIExtendToggle], [2, UE.UIItem], [3, UE.UIItem]];
    this.BtnBindInfo = [[1, this.Bke]];
  }
  OnStart() {
    this.GetExtendToggle(1).CanExecuteChange.Bind(this.Lke);
  }
  OnBeforeDestroy() {
    this.GetExtendToggle(1).CanExecuteChange.Unbind();
  }
  esi(e) {
    var t = ModelManager_1.ModelManager.InfluenceReputationModel.HasRedDotInCurrentCountry(this.z5t);
    this.GetItem(3).SetUIActive(t && e);
  }
  UpdateItem(e) {
    this.z5t = e;
    var t = ConfigManager_1.ConfigManager.InfluenceConfig.GetCountryConfig(e);
    var e = ModelManager_1.ModelManager.InfluenceReputationModel.IsCountryUnLock(e);
    var i = this.GetTexture(0);
    var s = this.GetItem(2);
    i.SetUIActive(e);
    s.SetUIActive(!e);
    if (e) {
      this.SetTextureByPath(t.Logo, i);
    }
    this.esi(e);
  }
  SetToggleFunction(e) {
    this.j5e = e;
  }
  SetCanExecuteChange(e) {
    this.Vbt = e;
  }
  SetToggleState(e, t) {
    this.GetExtendToggle(1).SetToggleStateForce(e, t);
  }
}
//# sourceMappingURL=InfluenceAreaSelectView.js.map