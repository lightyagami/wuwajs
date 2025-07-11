"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomTipsView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const MediumItemGridLevelAndLockComponent_1 = require("../../Common/MediumItemGrid/MediumItemGridComponent/MediumItemGridLevelAndLockComponent");
const VisionFetterSuitItem_1 = require("../../Phantom/Vision/View/VisionFetterSuitItem");
const LguiUtil_1 = require("../../Util/LguiUtil");
const PhantomTipsAttributeItem_1 = require("../SpecialItem/PhantomTipsAttributeItem");
class PhantomTipsView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.wTt = 0;
    this.rgi = false;
    this.poh = undefined;
    this.voh = undefined;
    this.bxt = undefined;
    this.M2u = undefined;
    this.E2u = () => {
      if (this.wTt > 0) {
        UiManager_1.UiManager.OpenView("PhantomManageView", this.wTt);
      }
      this.CloseMe();
    };
    this.Moh = () => {
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UITexture], [3, UE.UITexture], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UINiagara], [8, UE.UIButtonComponent], [9, UE.UIItem], [10, UE.UIItem]];
    this.BtnBindInfo = [[8, this.E2u]];
  }
  async OnBeforeStartAsync() {
    this.poh = new PhantomTipsAttributeItem_1.PhantomTipsAttributeItem();
    await this.poh.CreateThenShowByActorAsync(this.GetItem(5).GetOwner());
    this.voh = new PhantomTipsAttributeItem_1.PhantomTipsAttributeItem();
    await this.voh.CreateThenShowByActorAsync(this.GetItem(6).GetOwner());
    var i = this.GetItem(4);
    this.bxt = new VisionFetterSuitItem_1.VisionFetterSuitItem(i);
    await this.bxt.CreateThenShowByActorAsync(i.GetOwner());
    this.M2u = new MediumItemGridLevelAndLockComponent_1.MediumItemGridLevelAndLockComponent();
    await this.M2u.CreateThenShowByActorAsync(this.GetItem(10).GetOwner());
    this.M2u.SetLevel(undefined);
    this.GetButton(8).SetSelfInteractive(false);
  }
  OnStart() {
    var i;
    var e = this.OpenParam;
    if (e === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Phantom", 58, "PhantomTipsView无效输入");
      }
      this.CloseMe();
    } else if ((i = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomDataBase(e)) === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Phantom", 58, "PhantomTipsView无效uniqueId", ["uniqueId", e]);
      }
      this.CloseMe();
    } else {
      this.wTt = e;
      this.Hqe(i);
      this._Oe(i);
      e = this.rgi ? "Golden" : "Start01";
      this.UiViewSequence.StartSequenceName = e;
      this.UiViewSequence.AddSequenceFinishEvent(e, this.Moh);
    }
  }
  Hqe(i) {
    var e = ConfigManager_1.ConfigManager.ItemConfig.GetQualityConfig(i.GetQuality());
    var t = UE.Color.FromHex(e.TextColor);
    var s = this.GetText(0);
    LguiUtil_1.LguiUtil.SetLocalTextNew(s, i.GetMonsterName());
    s.SetColor(t);
    this.GetText(1).SetText(i.GetCost().toString());
    this.SetItemIcon(this.GetTexture(2), i.GetConfigId(true));
    this.SetTextureByPath(e.AcquireNewItemQualityTexPath, this.GetTexture(3));
    this.rgi = e?.Id === 5;
    var s = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetFetterGroupById(i.GetFetterGroupId());
    this.bxt.Update(s);
    this.fvt(i);
    this.Soh(e);
  }
  _Oe(i) {
    var e = i.GetIsLock();
    var i = i.GetIsDeprecated();
    this.M2u.SetLock(e);
    this.M2u.SetDeprecate(i);
    this.GetButton(8).SetSelfInteractive(true);
  }
  fvt(i) {
    i = i.GetMainPropShowAttributeList(1);
    if (!(i.length < 2)) {
      this.poh.RefreshUi(i[0]);
      this.voh.RefreshUi(i[1]);
    }
  }
  Soh(i) {
    const t = UE.Color.FromHex(i.TextColor);
    this.rgi = i?.Id === 5;
    i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(this.rgi ? "NS_Fx_LGUI_Item_Golden" : "NS_Fx_LGUI_Item_Other");
    ResourceSystem_1.ResourceSystem.LoadAsync(i, UE.NiagaraSystem, i => {
      var e;
      if (i && UiManager_1.UiManager.IsViewOpen("PhantomTipsView") && this.RootItem) {
        (e = this.GetUiNiagara(7)).SetNiagaraSystem(i);
        if (!this.rgi) {
          e.ColorParameter.Get("Color").Constant = UE.LinearColor.FromSRGBColor(t);
        }
      }
    });
  }
  OnBeforeDestroy() {
    ModelManager_1.ModelManager.ItemModel.LastCloseTimeStamp = TimeUtil_1.TimeUtil.GetServerTimeStamp();
  }
}
exports.PhantomTipsView = PhantomTipsView;
//# sourceMappingURL=PhantomTipsView.js.map