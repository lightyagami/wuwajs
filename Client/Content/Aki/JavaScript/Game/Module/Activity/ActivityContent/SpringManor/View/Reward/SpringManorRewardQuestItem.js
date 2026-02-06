"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpringManorRewardQuestItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../../../Ui/UiManager");
const ButtonItem_1 = require("../../../../../Common/Button/ButtonItem");
const CommonItemSmallItemGrid_1 = require("../../../../../Common/ItemGrid/CommonItemSmallItemGrid");
const GridProxyAbstract_1 = require("../../../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../../../../Util/ScrollView/GenericScrollViewNew");
const ActivityControllerHolder_1 = require("../../../../ActivityControllerHolder");
class SpringManorRewardQuestItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.BOe = 0;
    this.K0g = undefined;
    this.T8e = undefined;
    this.nVg = undefined;
    this.OnSkipClick = undefined;
    this.Y8d = () => {
      if (this.BOe !== 0) {
        if (ModelManager_1.ModelManager.SpringManorModel.CheckInInstance()) {
          var i = ConfigManager_1.ConfigManager.SpringManorConfig.GetRewardTaskConfigById(this.BOe);
          if (i) {
            switch (i.SkipType) {
              case 1:
                var r = i.SkipParam[0];
                var t = i.SkipParam.length;
                if (t === 1) {
                  UiManager_1.UiManager.OpenView(r);
                } else if (t === 2) {
                  t = i.SkipParam[1];
                  let e = undefined;
                  e = isNaN(Number(t)) ? t : Number(t);
                  UiManager_1.UiManager.OpenView(r, e);
                } else {
                  t = i.SkipParam.slice(1);
                  UiManager_1.UiManager.OpenView(r, t);
                }
                break;
              case 2:
                ActivityControllerHolder_1.ActivityControllerHolder.SpringManorController?.TrackRewardTask(this.BOe);
            }
            this.OnSkipClick?.(i.SkipType);
          }
        } else {
          ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("Spring26_BanSkipTips");
        }
      }
    };
    this.FVc = () => {
      this.K0g?.();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIText], [5, UE.UIText], [6, UE.UIScrollViewWithScrollbarComponent]];
    this.BtnBindInfo = [[0, this.Y8d]];
  }
  async OnBeforeStartAsync() {
    this.nVg = new ButtonItem_1.ButtonItem();
    this.nVg.SetFunction(this.FVc);
    await this.nVg.OnlyCreateByActorAsync(this.GetItem(1).GetOwner());
  }
  OnStart() {
    this.T8e = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(6), () => new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid());
    this.GetText(5)?.SetUIActive(true);
    this.nVg?.SetRedDotVisible(true);
  }
  Refresh(e, i, r) {
    var t;
    var o;
    var s = ModelManager_1.ModelManager.SpringManorModel.ActivityData.GetRewardTaskData(e);
    if (s && (o = ConfigManager_1.ConfigManager.SpringManorConfig.GetRewardTaskConfigById(e))) {
      this.BOe = e;
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), o.Desc);
      this.GetText(5).SetText(s.Current + "/" + s.Target);
      e = ConfigManager_1.ConfigManager.RewardConfig.GetDropPackagePreviewItemList(o.DropId);
      this.T8e?.RefreshByData(e);
      e = s.Status === 0;
      t = s.Status === 2;
      s = s.Status === 1;
      o = o.SkipType > 0;
      this.nVg?.SetUiActive(e);
      this.GetButton(0).RootUIComp.SetUIActive(s && o);
      this.GetItem(2).SetUIActive(s && !o);
      this.GetItem(3).SetUIActive(t);
    }
  }
  SetReceiveClickCallback(e) {
    this.K0g = e;
  }
}
exports.SpringManorRewardQuestItem = SpringManorRewardQuestItem;
//# sourceMappingURL=SpringManorRewardQuestItem.js.map