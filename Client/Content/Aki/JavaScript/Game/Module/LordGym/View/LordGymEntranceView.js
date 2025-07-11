"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LordGymEntranceView = undefined;
const ue_1 = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const CommonItemSmallItemGrid_1 = require("../../Common/ItemGrid/CommonItemSmallItemGrid");
const HelpController_1 = require("../../Help/HelpController");
const PayShopDefine_1 = require("../../PayShop/PayShopDefine");
const LguiUtil_1 = require("../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew");
const LordGymController_1 = require("../LordGymController");
const LordGymItem_1 = require("./LordGymItem");
class LordGymEntranceView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.jSi = 0;
    this.WSi = undefined;
    this.KSi = 0;
    this.t5e = 0;
    this.QSi = false;
    this.XSi = 0;
    this.$Si = undefined;
    this.T8e = undefined;
    this.YSi = () => {
      return new LordGymItem_1.LordGymItem(this.JSi, this.zSi);
    };
    this.rOe = () => {
      return new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
    };
    this.xli = () => {
      UiManager_1.UiManager.CloseView(this.Info.Name);
    };
    this.ZSi = () => {
      if (this.t5e > 0) {
        HelpController_1.HelpController.OpenHelpById(this.t5e);
      }
    };
    this.eyi = () => {
      if (LordGymController_1.LordGymController.IsInEntranceEntity()) {
        LordGymController_1.LordGymController.LordGymBeginRequest(this.KSi).then(e => {
          if (e) {
            this.CloseMe();
          }
        });
      }
    };
    this.tyi = () => {
      UiManager_1.UiManager.OpenView("LordGymChallengeRecordView", this.jSi);
    };
    this.iyi = () => {
      ControllerHolder_1.ControllerHolder.PayShopController.OpenPayShopViewWithTab(5, PayShopDefine_1.LORD_GYM_TAB_INDEX);
    };
    this.JSi = e => {
      this.KSi = e;
      var i = this.$Si?.GetGenericLayout();
      var t = i?.GetLayoutItemByKey(this.KSi);
      i?.SelectGridProxy(t.GridIndex);
      var i = ConfigManager_1.ConfigManager.LordGymConfig.GetLordGymConfig(e);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), "Text_InstanceDungeonRecommendLevel_Text", i.MonsterLevel.toString());
      var r = i.RewardId;
      this.QSi = !ModelManager_1.ModelManager.ExchangeRewardModel.GetRewardIfCanExchange(r);
      var r = ConfigManager_1.ConfigManager.ExchangeRewardConfig.GetExchangeRewardPreviewRewardList(r);
      const s = ModelManager_1.ModelManager.LordGymModel?.GetLordGymIsFinish(this.KSi);
      this.T8e.RefreshByDataAsync(r).finally(() => {
        for (const e of this.T8e.GetScrollItemList()) {
          e.SetReceivedVisible(s);
        }
      });
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(15), i.PlayDescription);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), i.GymTitle);
      var r = ModelManager_1.ModelManager.LordGymModel.LordGymRecord.get(this.KSi);
      if (r !== undefined) {
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(24), "BestPassTime", TimeUtil_1.TimeUtil.GetTimeString(r.Qxs));
      } else {
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(24), "NoPassRecord");
      }
      if (i.HelpId) {
        this.GetButton(10).RootUIComp.SetUIActive(true);
        this.t5e = i.HelpId;
      } else {
        this.GetButton(10).RootUIComp.SetUIActive(false);
      }
      var r = !ModelManager_1.ModelManager.LordGymModel.GetLordGymIsUnLock(this.KSi);
      var o = ModelManager_1.ModelManager.LordGymModel.GetLastGymFinish(this.KSi);
      var h = i.MonsterLevel > ModelManager_1.ModelManager.EditFormationModel.GetFormationAverageLevel();
      this.GetItem(20).SetUIActive(r || !o);
      this.GetItem(25).SetUIActive(h && !r && o);
      this.GetButton(19).RootUIComp.SetUIActive(!r && !!o);
      if (r) {
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(21), i.LockDescription);
      } else if (o) {
        if (h) {
          LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(21), "LordGymLowLevel");
        }
      } else {
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(21), "LordGymLockTips");
      }
      if (this.QSi) {
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(22), "Text_ButtonTextChallengeOneMore_Text");
      } else {
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(22), "Text_StartBattle_Text");
      }
      if (!ModelManager_1.ModelManager.LordGymModel.GetLordGymHasRead(e) && !r && !!o) {
        LordGymController_1.LordGymController.ReadLordGym(e);
        t?.RefreshByLordId(e);
      }
    };
    this.zSi = e => this.KSi !== e;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, ue_1.UIText], [1, ue_1.UIButtonComponent], [2, ue_1.UIScrollViewWithScrollbarComponent], [3, ue_1.UIItem], [4, ue_1.UIItem], [5, ue_1.UIText], [6, ue_1.UIText], [7, ue_1.UITexture], [8, ue_1.UITexture], [9, ue_1.UITexture], [10, ue_1.UIButtonComponent], [11, ue_1.UIItem], [12, ue_1.UIItem], [13, ue_1.UIText], [14, ue_1.UIText], [15, ue_1.UIText], [16, ue_1.UIScrollViewWithScrollbarComponent], [17, ue_1.UIItem], [18, ue_1.UIButtonComponent], [19, ue_1.UIButtonComponent], [21, ue_1.UIText], [20, ue_1.UIItem], [22, ue_1.UIText], [23, ue_1.UIButtonComponent], [24, ue_1.UIText], [25, ue_1.UIItem]];
    this.BtnBindInfo = [[1, this.xli], [10, this.ZSi], [19, this.eyi], [18, this.tyi], [23, this.iyi]];
  }
  async ryi() {
    this.$Si = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(2), this.YSi);
    this.T8e = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(16), this.rOe);
    this.jSi = this.OpenParam;
    this.WSi = ModelManager_1.ModelManager.LordGymModel.GetLordGymEntranceList(this.jSi);
    if (this.WSi && this.WSi.length !== 0) {
      await this.$Si.RefreshByDataAsync(this.WSi);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("LevelPlay", 49, "获取领主道馆入口信息失败！", ["领主道馆入口Id:", this.jSi]);
    }
  }
  async OnBeforeStartAsync() {
    await this.ryi();
  }
  OnAfterShow() {
    if (!LordGymController_1.LordGymController.IsInEntranceEntity()) {
      this.CloseMe();
    }
  }
  OnStart() {
    var e = ConfigManager_1.ConfigManager.LordGymConfig.GetLordGymConfig(this.WSi[0]).MonsterList[0];
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), ConfigManager_1.ConfigManager.LordGymConfig.GetLordGymEntranceName(this.jSi));
    var e = ConfigManager_1.ConfigManager.MonsterInfoConfig.GetMonsterBigIcon(e);
    this.SetTextureByPath(e, this.GetTexture(9));
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(13), "SpecialRule");
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(14), "FirstPassReward");
    this.nyi();
  }
  nyi() {
    this.XSi = this.WSi[0];
    this.WSi.forEach(e => {
      if (ModelManager_1.ModelManager.LordGymModel.GetLordGymIsUnLock(e) && ModelManager_1.ModelManager.LordGymModel.GetLastGymFinish(e) && e >= this.XSi) {
        this.XSi = e;
      }
    });
    var e = this.$Si?.GetGenericLayout();
    var i = e?.GetLayoutItemByKey(this.XSi);
    e?.SelectGridProxy(i.GridIndex);
    this.JSi(this.XSi);
  }
  OnBeforeDestroy() {
    this.$Si = undefined;
    this.T8e = undefined;
  }
}
exports.LordGymEntranceView = LordGymEntranceView;
//# sourceMappingURL=LordGymEntranceView.js.map