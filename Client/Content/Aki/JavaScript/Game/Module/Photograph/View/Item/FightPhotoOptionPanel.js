"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FightPhotoOptionPanel = undefined;
const UE = require("ue");
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew");
const PhotographDefine_1 = require("../../PhotographDefine");
const FightPhotoConditionItem_1 = require("./FightPhotoConditionItem");
const FightPhotoOptionItem_1 = require("./FightPhotoOptionItem");
class FightPhotoOptionPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Xzd = [];
    this.Yzd = new Map();
    this.yEd = undefined;
    this.o8a = undefined;
    this.TDe = undefined;
    this.Bqe = () => {
      var e = new FightPhotoOptionItem_1.FightPhotoOptionItem();
      e.OnToggleClick = this.N8e;
      return e;
    };
    this.n8a = () => {
      return new FightPhotoConditionItem_1.FightPhotoConditionItem();
    };
    this.N8e = e => {
      this.yEd.SelectGridProxy(e);
    };
    this.zzd = e => {
      this.Jzd(!e);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIVerticalLayout], [1, UE.UIItem], [2, UE.UIScrollViewWithScrollbarComponent], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIText], [6, UE.UIItem], [7, UE.UISprite], [8, UE.UISprite], [9, UE.UIText], [10, UE.UIExtendToggle]];
    this.BtnBindInfo = [[10, this.zzd]];
  }
  async OnBeforeStartAsync() {
    this.yEd = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(2), this.Bqe);
    this.o8a = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(0), this.n8a);
    await this.yEd.RefreshByDataAsync(ConfigManager_1.ConfigManager.PhotographConfig.GetAllFightPhotoOptionConfig());
    this.yEd.SelectGridProxy(0);
    this.RefreshCondition();
    this.GetItem(4)?.SetUIActive(false);
    this.GetSprite(7).SetUIActive(false);
    this.GetSprite(8).SetUIActive(true);
    this.yEd.BindScrollValueChange(e => {
      if (e) {
        this.GetSprite(7).SetUIActive(e.Y > 0);
        this.GetSprite(8).SetUIActive(e.Y < 1);
      }
    });
  }
  OnBeforeShow() {
    this.kot();
  }
  RefreshCondition() {
    var e;
    var i;
    var t = ControllerHolder_1.ControllerHolder.PhotographController.CurrentBtNode;
    if (t && t.InProgress) {
      e = [];
      if (i = t.PhotographCondition) {
        e.push(new PhotographDefine_1.FightPhotoConditionData(i.TidTip, i.Target.CommonCondition, true));
      }
      if (i = t.CameraCondition) {
        e.push(new PhotographDefine_1.FightPhotoConditionData(i.TidTip, i.Condition));
      }
      this.o8a?.RefreshByData(e);
      this.RefreshFinishSprite();
    } else {
      this.GetVerticalLayout(0)?.RootUIComp.SetUIActive(false);
      this.GetText(9)?.SetUIActive(false);
      this.GetItem(6)?.SetUIActive(false);
    }
  }
  RefreshFinishSprite() {
    var e = ControllerHolder_1.ControllerHolder.PhotographController.CurrentBtNode;
    if (e && e.InProgress) {
      this.GetText(9)?.SetUIActive(!e.CheckRoleInCamera());
      this.GetItem(6)?.SetUIActive(e.CheckPhotographCondition());
    }
  }
  RefreshTip() {
    var e = ControllerHolder_1.ControllerHolder.PhotographController.IsFinishCurrentBtNode();
    this.GetItem(4)?.SetUIActive(e);
    var e = ControllerHolder_1.ControllerHolder.PhotographController.IsFightPhotoCanSettle() ? "PrefabTextItem_4294734977_Text" : "FightPhotoFinishTips";
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), e);
  }
  SetTipVisible(e) {
    this.GetItem(4)?.SetUIActive(e);
  }
  OnBeforeHide() {
    this.xHe();
    this.Jzd(true);
  }
  kot() {
    this.xHe();
    this.TDe = TimerSystem_1.GameplayTimerSystem.Forever(() => {
      this.RefreshFinishSprite();
    }, 1000);
  }
  xHe() {
    if (this.TDe !== undefined) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.TDe);
      this.TDe = undefined;
    }
  }
  Jzd(e) {
    var i;
    var t;
    if (this.Xzd.length === 0) {
      i = CommonParamById_1.configCommonParamById.GetIntConfig("FightPhotoHideMonsterDistance");
      ModelManager_1.ModelManager.CreatureModel.GetEntitiesInRange(i, 96, this.Xzd);
    }
    for (const o of this.Xzd) {
      if (o.Valid && o.Entity?.Valid && o.Entity.Active !== e) {
        if (e) {
          if (t = this.Yzd.get(o)) {
            o.Entity.Enable(t, "FightPhotoOptionPanel.OnHideMonsterToggleClick");
            this.Yzd.delete(o);
          }
        } else {
          t = o.Entity.Disable("[FightPhotoOptionPanel.OnHideMonsterToggleClick] state为false");
          this.Yzd.set(o, t);
        }
      }
    }
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    if (e.length !== 0 && e[0] === "HideEnemy") {
      var e = this.GetExtendToggle(10)?.GetRootComponent();
      var i = this.GetGuideUiItem("2");
      if (e && i) {
        return [e, i];
      }
    }
  }
}
exports.FightPhotoOptionPanel = FightPhotoOptionPanel;
//# sourceMappingURL=FightPhotoOptionPanel.js.map