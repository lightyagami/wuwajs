"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoadBookPhantomTaskView = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Time_1 = require("../../../../../../Core/Common/Time");
const Protocol_1 = require("../../../../../../Core/Define/Net/Protocol");
const TimerSystem_1 = require("../../../../../../Core/Timer/TimerSystem");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../../Ui/Common/PopupCaptionItem");
const GridProxyAbstract_1 = require("../../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../../../Util/ScrollView/GenericScrollViewNew");
const ActivityRoadBookDefine_1 = require("../../RoadBook/ActivityRoadBookDefine");
const CLICK_COOLDOWN_MS = 3000;
class RoadBookPhantomTaskView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Otl = undefined;
    this.b4c = undefined;
    this.LevelSequencePlayer = undefined;
    this.jHm = undefined;
    this.oWi = () => {
      return new PhantomCardItem(this.b4c);
    };
    this.pcr = () => {
      ControllerHolder_1.ControllerHolder.HelpController.OpenHelpById(this.b4c.LocalConfig.HelpId);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UIScrollViewWithScrollbarComponent]];
    this.BtnBindInfo = [];
  }
  async OnBeforeStartAsync() {
    this.b4c = this.OpenParam;
    this.jHm = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(2), this.oWi);
    var e = [];
    this.Otl = new PopupCaptionItem_1.PopupCaptionItem();
    this.Otl.SetHelpCallBack(this.pcr);
    e.push(this.Otl.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()));
    this.Otl.SetCloseCallBack(() => {
      this.CloseMe();
    });
    await Promise.all(e);
    await this.Refresh();
  }
  async Refresh() {
    var e;
    var i;
    var t = this.b4c.PhantomDataMap;
    var r = new Array();
    let [o, s] = [0, 0];
    let a = -1;
    for ([e, i] of t.entries()) {
      r.push(e);
      var h = ConfigManager_1.ConfigManager.ActivityRoadBookConfig.GetPhantomConfig(e);
      var h = ConfigManager_1.ConfigManager.RewardConfig.GetDropPackagePreviewItemList(h.UnLockReward)[0][1];
      if (i) {
        if (a === -1 && this.b4c.GetPhantomNewUnlockState(e)) {
          a = e;
        }
        o += h;
      }
      s += h;
    }
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), "RoadBookPhantomGain_Progress", o, s);
    await this.jHm.RefreshByDataAsync(r.sort((e, i) => e - i));
    this.jHm.GetGenericLayout().PlayGridAnim();
    t = r.indexOf(a);
    if (t !== -1) {
      this.Ozf(t);
    }
  }
  Ozf(t) {
    const r = this.jHm.GetItemByIndex(Math.max(t, 0));
    if (r) {
      this.jHm.BindLateUpdate(e => {
        TimerSystem_1.GameplayTimerSystem.Next(() => {
          var e = this.GetScrollViewWithScrollbar(2);
          var i = Math.floor(this.jHm.ScrollWidth / r.Width / 2);
          var i = this.jHm.GetItemByIndex(Math.max(t - i, 0));
          e.ScrollToLeft((0, puerts_1.$ref)(new UE.Vector2D(e.ContentUIItem.RelativeLocation)), i);
        });
        this.jHm.UnBindLateUpdate();
      });
    }
  }
}
exports.RoadBookPhantomTaskView = RoadBookPhantomTaskView;
class PhantomCardItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor(e) {
    super();
    this.ActivityBaseData = e;
    this.PhantomId = 0;
    this.jbe = () => {
      var e = Time_1.Time.SystemNow;
      if (!(e - PhantomCardItem.Gzf < CLICK_COOLDOWN_MS)) {
        PhantomCardItem.Gzf = e;
        e = ConfigManager_1.ConfigManager.ActivityRoadBookConfig.GetPhantomConfig(this.PhantomId);
        if (ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()) {
          ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("DungeonDetection");
        } else {
          ModelManager_1.ModelManager.AdventureGuideModel.SetFromManualDetect(true);
          ControllerHolder_1.ControllerHolder.AdventureGuideController.RequestForDetection(Protocol_1.Aki.Protocol.r8n.Proto_NormalMonster, [], e.MonsterInfoId);
        }
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UITexture], [4, UE.UITexture], [5, UE.UITexture], [6, UE.UITexture], [7, UE.UITexture], [8, UE.UITexture], [9, UE.UIText], [10, UE.UISprite]];
    this.BtnBindInfo = [[0, this.jbe]];
  }
  Refresh(e, i, t) {
    this.PhantomId = e;
    var r;
    var o = ConfigManager_1.ConfigManager.ActivityRoadBookConfig.GetPhantomConfig(this.PhantomId);
    var s = this.ActivityBaseData.PhantomDataMap.get(e);
    var e = ConfigManager_1.ConfigManager.InventoryConfig.GetPhantomItemConfigListByMonsterId(e)?.[0];
    if (e) {
      r = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomSkillBySkillId(e.SkillId);
      this.SetTextureByPath(r.BattleViewIcon, this.GetTexture(8));
      this.Aqe(e.Rarity);
    }
    this.GetItem(1).SetUIActive(!s);
    this.GetItem(2).SetUIActive(s);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(9), o.Name);
    this.GetText(9)?.SetColor(UE.Color.FromHex(s ? "#2B2D2E" : "#515155"));
    this.SetTextureShowUntilLoaded(o.TexPhantom, this.GetTexture(4));
    if (s) {
      this.dVl();
    }
  }
  Aqe(e) {
    let i = 0;
    switch (ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomRareConfig(e).Cost) {
      case 1:
        i = 0;
        break;
      case 3:
        i = 1;
        break;
      case 4:
        i = 2;
    }
    e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("T_TheMeMapChipBg" + (i < 2 ? 1 : 2));
    this.SetTextureByPath(e, this.GetTexture(3));
    this.SetTextureByPath(ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("T_TheMeMapChipTop" + i), this.GetTexture(5));
    this.SetTextureByPath(ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("T_TheMeMapDisk" + i), this.GetTexture(6));
    this.SetTextureByPath(ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("T_TheMeMapCalipers" + i), this.GetTexture(7));
    this.GetSprite(10).SetColor(UE.Color.FromHex(ActivityRoadBookDefine_1.roadBookPhantomColorText[i + 1]));
  }
  dVl() {
    this.ActivityBaseData.SaveFirstCheckRedDotState(4, this.PhantomId);
  }
}
PhantomCardItem.Gzf = 0;
//# sourceMappingURL=RoadBookPhantomTaskView.js.map