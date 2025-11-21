"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurvivorsRogueSettleBaseView = undefined;
const UE = require("ue");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const SurvivorsRogueGainData_1 = require("../../Data/SurvivorsRogueGainData");
const ScrollingNumberTool_1 = require("../../ScrollingNumberTool");
const SurvivorsRogueRoleInfoItem_1 = require("./Components/SurvivorsRogueRoleInfoItem");
const SurvivorsRogueWeaponSettleItem_1 = require("./Components/SurvivorsRogueWeaponSettleItem");
const ENDLESS_NO_ACHIEVED_ICON = "/Game/Aki/UI/UIResources/UiActivity/Atlas/Activity27/Survivor/Settlement/SP_SurvivorSettlementIconWuJin01.SP_SurvivorSettlementIconWuJin01";
const ENDLESS_ACHIEVED_ICON = "/Game/Aki/UI/UIResources/UiActivity/Atlas/Activity27/Survivor/Settlement/SP_SurvivorSettlementIconWuJin02.SP_SurvivorSettlementIconWuJin02";
class SurvivorsRogueSettleBaseView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.vBd = undefined;
    this.TSn = undefined;
    this.Zjd = new ScrollingNumberTool_1.ScrollingNumberTool();
    this.OnClickBtnReturn = () => {};
    this.OnClickBtnReturnMain = () => {};
    this.$An = e => {
      if (e === "InturnAni") {
        this.vBd.GetUiAnimController()?.Play();
        this.Zjd.StartScrolling();
      }
    };
    this.yBd = () => {
      return new SurvivorsRogueWeaponSettleItem_1.SurvivorsRogueWeaponSettleItem();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UITexture], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UISprite], [8, UE.UIItem], [9, UE.UIText], [10, UE.UIText], [11, UE.UIText], [12, UE.UIText], [13, UE.UIText], [14, UE.UIText], [15, UE.UIVerticalLayout], [16, UE.UIItem], [17, UE.UIButtonComponent], [18, UE.UIButtonComponent]];
    this.BtnBindInfo = [[17, this.OnClickBtnReturn], [18, this.OnClickBtnReturnMain]];
  }
  SetBtnReturnMainVisible(e) {
    this.GetButton(18).RootUIComp.SetUIActive(e);
  }
  async OnBeforeStartAsync() {
    this.vBd = new GenericLayout_1.GenericLayout(this.GetVerticalLayout(15), this.yBd);
    this.TSn = new SurvivorsRogueRoleInfoItem_1.SurvivorsRogueRoleInfoItem();
    await this.TSn.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
    await this.Zjd.InitCurve();
    await this.RefreshAsync();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.$An);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnActivitySequenceEmitEvent, this.$An);
  }
  OnAfterShow() {
    this.vBd.GetLayoutItemList().forEach(e => {
      e.PlayAnim();
    });
  }
  OnBeforeDestroyImplement() {
    this.Zjd.Clear();
  }
  GetViewInfo() {}
  SBd(e, t) {
    var i = [];
    for (const s of e) {
      var r = s;
      if (r.R5n === "xTd") {
        r = new SurvivorsRogueGainData_1.SurvivorsWeaponGainData(s.w5n, s.v9n, r.xTd);
        i.push(r);
      }
    }
    e = ModelManager_1.ModelManager.SurvivorsRogueModel.GainData.GetWeaponGainListWithBondInfo(i);
    return ModelManager_1.ModelManager.SurvivorsRogueModel.GainData.GetWeaponGridDataList(e, t);
  }
  async RefreshAsync() {
    var e = this.GetViewInfo();
    if (e) {
      for (const n of e.YTd) {
        var t = n;
        if (t.R5n === "DTd") {
          this.TSn.Refresh(t.v9n, t.DTd.F6n);
        }
      }
      var i;
      var r;
      var s = e.VId;
      var o = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsLevel(e.gG_);
      if (o) {
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), o.Name);
        this.SetTextureShowUntilLoaded(o.Icon, this.GetTexture(1));
        i = o.Diff === 0;
        r = o.Diff === 1;
        o = o.Diff === 2;
        this.GetItem(3).SetUIActive(i);
        this.GetItem(4).SetUIActive(r);
        this.GetItem(5).SetUIActive(o);
        this.GetItem(6).SetUIActive(s);
        this.GetSprite(7).SetUIActive(s);
        if (s) {
          i = e.MDd ? ENDLESS_ACHIEVED_ICON : ENDLESS_NO_ACHIEVED_ICON;
          this.SetSpriteByPath(i, this.GetSprite(7), false);
        } else {
          this.GetText(10).SetText(e.AEs.toString());
        }
        this.GetItem(8).SetUIActive(!s);
        this.GetText(11).SetText(e.SDd.toString());
        r = s ? "SurvivorsSettlement_EndlessWaveTitle" : "SurvivorsSettlement_WaveTitle";
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(9), r);
        o = s ? "SurvivorsSettlement_EndlessTimeText" : "SurvivorsSettlement_TimeText";
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(12), o);
        i = TimeUtil_1.TimeUtil.GetRemainTimeDataFormat6(Number(MathUtils_1.MathUtils.LongToBigInt(e.fAs)));
        this.GetText(13).SetText(i);
        this.Zjd.Init(0, e.vDd, e => {
          this.GetText(14).SetText(Math.round(e).toString());
        });
        r = this.SBd(e.YTd, e.yDd);
        await this.vBd.RefreshByDataAsync(r);
      }
    }
  }
}
exports.SurvivorsRogueSettleBaseView = SurvivorsRogueSettleBaseView;
//# sourceMappingURL=SurvivorsRogueSettleBaseView.js.map