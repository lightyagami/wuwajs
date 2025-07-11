"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityRegressTabItemPanel = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../../Core/Common/Log");
const RedDotController_1 = require("../../../../../RedDot/RedDotController");
const CommonTabItemBase_1 = require("../../../../Common/TabComponent/TabItem/CommonTabItemBase");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
class ActivityRegressTabItemPanel extends CommonTabItemBase_1.CommonTabItemBase {
  constructor() {
    super(...arguments);
    this.RedDotName = undefined;
    this.Bke = t => {
      if (t === 1) {
        this.SelectedCallBack(this.GridIndex);
      }
    };
    this.RefreshTransition = () => {
      var t = this.GetUiExtendToggleSpriteTransition(3);
      if (t) {
        t.SetAllStateSprite(this.GetSprite(0).GetSprite());
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIExtendToggle], [2, UE.UIItem], [3, UE.UIExtendToggleSpriteTransition], [4, UE.UIItem], [5, UE.UIText]];
    this.BtnBindInfo = [[1, this.Bke]];
  }
  OnStart() {
    super.OnStart();
    this.GetExtendToggle(1).SetToggleState(0);
    this.GetItem(2).SetUIActive(false);
    this.GetSprite(0).SetUIActive(true);
  }
  OnRefresh(t, e, i) {
    if (t.Data && (this.UpdateTabIcon(t.Data.GetIcon() ?? ""), this.UpdateTitle(t.Data.GetTitleData()?.TextId ?? ""), this.UnBindRedDot(), t.RedDotName)) {
      this.BindRedDot(t.RedDotName, t.RedDotUid);
    }
  }
  OnSelected(t) {
    this.SelectedCallBack(this.GridIndex);
  }
  OnUpdateTabIcon(t) {
    if (t === "") {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("ActivityRecall", 63, "回流活动->ActivityRecallTabItemPanel刷新标签图标,传入路径为空", ["iconPath: ", t]);
      }
    } else {
      this.SetSpriteByPath(t, this.GetSprite(0), false, undefined, this.RefreshTransition);
    }
  }
  UpdateTitle(t) {
    var e = this.GetText(5);
    LguiUtil_1.LguiUtil.SetLocalTextNew(e, t);
  }
  OnSetToggleState(t, e) {
    this.GetExtendToggle(1).SetToggleState(t, e);
  }
  GetTabToggle() {
    return this.GetExtendToggle(1);
  }
  OnBeforeDestroy() {
    this.UnBindRedDot();
  }
  OnClear() {
    this.UnBindRedDot();
  }
  BindRedDot(t, e = 0) {
    this.RedDotName = t;
    if (this.RedDotName) {
      RedDotController_1.RedDotController.BindRedDot(t, this.GetItem(2), undefined, e);
    }
  }
  UnBindRedDot() {
    if (this.RedDotName) {
      RedDotController_1.RedDotController.UnBindRedDot(this.RedDotName);
      this.RedDotName = undefined;
    }
  }
}
exports.ActivityRegressTabItemPanel = ActivityRegressTabItemPanel;
//# sourceMappingURL=ActivityRegressTabItemPanel.js.map