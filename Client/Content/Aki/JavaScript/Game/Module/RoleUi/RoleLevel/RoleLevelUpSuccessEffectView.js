"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleLevelUpSuccessEffectView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew");
class RoleLevelUpSuccessEffectView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.Xuo = undefined;
    this.nqe = () => {
      var e = this.Pe.ClickFunction;
      if (e) {
        e();
      }
      this.CloseMe();
    };
    this.$uo = () => {
      return new SuccessDescriptionItem();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIScrollViewWithScrollbarComponent], [1, UE.UIItem], [2, UE.UIText], [3, UE.UIText], [4, UE.UIButtonComponent], [5, UE.UIButtonComponent]];
    this.BtnBindInfo = [[4, this.nqe], [5, this.nqe]];
  }
  OnBeforeCreate() {
    if (this.OpenParam === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Role", 37, "RoleLevelUpSuccessEffectView 打开失败,未传入界面数据");
      }
    } else {
      this.Pe = this.OpenParam;
      this.Dbt();
    }
  }
  OnStart() {
    var e = this.GetItem(1);
    this.Xuo = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(0), this.$uo, e.GetOwner());
  }
  OnBeforeShow() {
    this.RDt();
    this.Yuo();
    this.uuo();
  }
  Dbt() {
    var e = this.Pe.AudioId;
    if (e) {
      e = ConfigManager_1.ConfigManager.AudioConfig.GetAudioPath(e).Path;
      this.SetAudioEvent(e);
    }
  }
  uuo() {
    var e = this.Pe.ClickText ?? "Text_BackToView_Text";
    this.GetText(3).ShowTextNew(e);
  }
  RDt() {
    var e = this.Pe.Title ?? "Text_ActivedSucceed_Text";
    this.GetText(2).ShowTextNew(e);
  }
  Yuo() {
    var e;
    if (this.Xuo) {
      if ((e = this.Pe.TextList) !== undefined) {
        this.Xuo.RefreshByData(e);
      } else {
        this.GetScrollViewWithScrollbar(0).RootUIComp.SetUIActive(false);
      }
    }
  }
}
exports.RoleLevelUpSuccessEffectView = RoleLevelUpSuccessEffectView;
class SuccessDescriptionItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  SetDescriptionText(e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e.TextId, ...e.Params);
  }
  Refresh(e, i, t) {
    this.SetDescriptionText(e);
  }
}
//# sourceMappingURL=RoleLevelUpSuccessEffectView.js.map