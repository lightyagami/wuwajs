"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdviceSelectMotionItem = undefined;
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
const GenericScrollView_1 = require("../../Util/ScrollView/GenericScrollView");
class AdviceSelectMotionItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super();
    this.ZHe = undefined;
    this.OnClickBtnBtnCall = () => {};
    this.eje = () => {
      if (this.OnClickBtnBtnCall) {
        this.OnClickBtnBtnCall();
      }
    };
    this.Bqe = (e, t, i) => {
      t = new AdviceSelectMotionContent(t);
      t.RefreshView(e);
      return {
        Key: i,
        Value: t
      };
    };
    this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIText], [2, UE.UIScrollViewWithScrollbarComponent]];
    this.BtnBindInfo = [[0, this.eje]];
  }
  SetClickChangeRoleCall(e) {
    this.OnClickBtnBtnCall = e;
  }
  OnStart() {
    this.ZHe = new GenericScrollView_1.GenericScrollView(this.GetScrollViewWithScrollbar(2), this.Bqe);
  }
  RefreshView(e) {
    this.ZHe.RefreshByData(e);
    this.tje();
  }
  tje() {
    var e;
    if (ModelManager_1.ModelManager.AdviceModel.PreSelectRoleId > 0) {
      e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleName(ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(ModelManager_1.ModelManager.AdviceModel.PreSelectRoleId).Name);
      this.GetText(1).SetText(e);
    } else {
      this.GetText(1).SetText("");
    }
  }
  OnBeforeDestroy() {
    this.ZHe.ClearChildren();
  }
}
exports.AdviceSelectMotionItem = AdviceSelectMotionItem;
class AdviceSelectMotionContent extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super();
    this.Pe = undefined;
    this.pHe = () => {
      var e = this.Pe;
      var t = ConfigManager_1.ConfigManager.MotionConfig.GetMotionRoleId(e.GetIndex());
      var t = ModelManager_1.ModelManager.MotionModel.GetRoleMotionState(t, e.GetIndex());
      var t = t === 0 || t === 1;
      if (!t || e.GetIndex() === -1) {
        if (ModelManager_1.ModelManager.AdviceModel.PreSelectMotionId !== this.Pe.GetIndex()) {
          return true;
        }
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnClickAdviceMotion);
      }
      return false;
    };
    this.ije = () => {
      ModelManager_1.ModelManager.AdviceModel.PreSelectMotionId = this.Pe.GetIndex();
      ModelManager_1.ModelManager.AdviceModel.CurrentSelectMotionId = this.Pe.GetIndex();
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnClickAdviceMotion);
    };
    this.x7e = () => {
      this.Oqe();
    };
    this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UISprite], [2, UE.UIText]];
    this.BtnBindInfo = [[0, this.ije]];
  }
  OnStart() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnClickAdviceMotion, this.x7e);
    var e = this.GetExtendToggle(0);
    e.CanExecuteChange.Unbind();
    e.CanExecuteChange.Bind(this.pHe);
  }
  RefreshView(e) {
    let t = "";
    if ((this.Pe = e).GetIndex() === ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceMotionDefaultConfigId()) {
      t = ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceSpecialParamsContent(e.GetIndex());
      LguiUtil_1.LguiUtil.SetLocalText(this.GetText(2), "NoneMotion");
    } else {
      t = ConfigManager_1.ConfigManager.MotionConfig.GetMotionTitle(e.GetIndex());
      this.GetText(2).SetText(t);
    }
    this.oje();
    this.Oqe();
  }
  Oqe() {
    var e = this.GetExtendToggle(0).ToggleState;
    var t = ModelManager_1.ModelManager.AdviceModel.PreSelectMotionId === this.Pe.GetIndex() ? 1 : 0;
    if (e !== t) {
      this.GetExtendToggle(0).SetToggleStateForce(t, false);
    }
  }
  oje() {
    var e;
    var t = this.Pe;
    if (t.GetIndex() === ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceMotionDefaultConfigId()) {
      this.GetSprite(1).SetUIActive(false);
    } else {
      e = ConfigManager_1.ConfigManager.MotionConfig.GetMotionRoleId(t.GetIndex());
      t = (e = ModelManager_1.ModelManager.MotionModel.GetRoleMotionState(e, t.GetIndex())) === 0 || e === 1;
      this.GetSprite(1).SetUIActive(t);
    }
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnClickAdviceMotion, this.x7e);
  }
}
//# sourceMappingURL=AdviceSelectMotionItem.js.map