"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PositionPanel = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const ActorSystem_1 = require("../../../../../Core/Actor/ActorSystem");
const Info_1 = require("../../../../../Core/Common/Info");
const Stats_1 = require("../../../../../Core/Common/Stats");
const Time_1 = require("../../../../../Core/Common/Time");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const GameBudgetInterfaceController_1 = require("../../../../../Core/GameBudgetAllocator/GameBudgetInterfaceController");
const Net_1 = require("../../../../../Core/Net/Net");
const Macro_1 = require("../../../../../Core/Preprocessor/Macro");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const BaseConfigController_1 = require("../../../../../Launcher/BaseConfig/BaseConfigController");
const Platform_1 = require("../../../../../Launcher/Platform/Platform");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const PublicUtil_1 = require("../../../../Common/PublicUtil");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const EffectSystem_1 = require("../../../../Effect/EffectSystem");
const Global_1 = require("../../../../Global");
const GlobalData_1 = require("../../../../GlobalData");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const FeatureRestrictionTemplate_1 = require("../../../Common/FeatureRestrictionTemplate");
const BattleChildViewPanel_1 = require("./BattleChildViewPanel");
const ENTITY_SCORE_PATH = "../Config/Raw/Tables/k.可视化编辑/EntityPerformanceData.json";
const SIMPLE_NPC_PERFORMANCE_SCORE = 25;
const LOW_SCORE_THRESHOLD = 300;
const MID_SCORE_THRESHOLD = 500;
const HIGH_SCORE_THRESHOLD = 600;
const LOW_SCORE_COLOR = "green";
const MID_SCORE_COLOR = "orange";
const HIGH_SCORE_COLOR = "purple";
const WARNING_COLOR = "red";
const budgetName = ["Normal", "Fighting", "Cutscene"];
const loadModeName = ["None", "InLoading", "InGame"];
class PositionPanel extends BattleChildViewPanel_1.BattleChildViewPanel {
  constructor() {
    super(...arguments);
    this.pet = undefined;
    this.zva = undefined;
    this.vet = undefined;
    this.lYa = undefined;
    this.bac = undefined;
    this.Fnu = undefined;
    this.Met = true;
    this.ola = false;
    this.Eet = "";
    this.Zva = "";
    this.SH = new Map();
    this.yet = 500;
    this.pk = 0;
    this.eMa = 0;
    this.tMa = 0;
    this.Lac = new Date();
    this.Qwu = "";
    this.wQe = () => {
      this.lhh();
      this.wac();
    };
    this.Ojc = () => {
      this.lhh();
    };
    this.ShowPlayerPosition = () => {
      this.Met = !this.Met;
      this.pet.SetUIActive(this.Met);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIText], [3, UE.UIText], [4, UE.UIText], [5, UE.UIItem]];
  }
  OnStart() {
    this.ola = FeatureRestrictionTemplate_1.FeatureRestrictionTemplate.TemplateForPioneerClient.Check();
    this.pet = this.GetText(0);
    this.zva = this.GetText(2);
    this.vet = this.GetText(1);
    this.lYa = this.GetText(3);
    this.bac = this.GetText(4);
    this.Fnu = this.GetItem(5);
    this.Qwu = TimeUtil_1.TimeUtil.GetTimeZoneOffsetString();
    if (!Info_1.Info.IsBuildShipping) {
      this.iMa();
    }
    if (this.ola) {
      this.Met = true;
    } else if (Info_1.Info.IsBuildShipping) {
      this.Met = false;
    }
    this.pet.SetUIActive(this.Met);
    this.zva.SetUIActive(false);
    this.lYa?.SetUIActive(false);
    this.Fnu?.SetUIActive(false);
    this.vet.SetUIActive(false);
    this.lhh();
    this.wac();
  }
  AddEvents() {
    this.ChildViewData.AddCallback(0, this.wQe);
    this.ChildViewData.AddCallback(25, this.Ojc);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ShowPlayerPosition, this.ShowPlayerPosition);
  }
  RemoveEvents() {
    this.ChildViewData.RemoveCallback(0, this.wQe);
    this.ChildViewData.RemoveCallback(25, this.Ojc);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ShowPlayerPosition, this.ShowPlayerPosition);
  }
  lhh() {
    var e = this.ChildViewData.GetChildVisible(0);
    var t = this.ChildViewData.GetChildVisible(25);
    this.vet?.SetUIActive(e && t);
  }
  wac() {
    var e = this.ChildViewData.GetChildVisible(0);
    this.bac?.SetUIActive(e);
  }
  OnBeforeDestroy() {
    this.pet = undefined;
    this.zva = undefined;
  }
  OnAfterTickBattleChildViewPanel(e) {
    PositionPanel.vJe.Start();
    this.Rac(e);
    this.Aac(e);
    PositionPanel.vJe.Stop();
  }
  Rac(e) {
    var t;
    var i;
    if (Global_1.Global.BaseCharacter) {
      t = Global_1.Global.BaseCharacter.CharacterActorComponent.ActorLocationProxy;
      [e, t, i] = (this.Met && this.Iet(t, e), [(t.X / 100).toFixed(0), (t.Y / 100).toFixed(0), (t.Z / 100).toFixed(0)]);
      this.vet.SetText(`${e},${t},${i}`);
    }
  }
  Aac(e) {
    this.Lac.setTime(Date.now());
    var t = TimeUtil_1.TimeUtil.DateFormat8(this.Lac, this.Qwu);
    this.bac.SetText(t);
  }
  Iet(e, t) {
    var i = e.X.toFixed(0);
    var s = e.Y.toFixed(0);
    var e = e.Z.toFixed(0);
    this.eMa += this.rMa;
    this.tMa++;
    var r = TimeUtil_1.TimeUtil.DateFormat2(new Date());
    var o = TimeUtil_1.TimeUtil.DateFormat2(new Date(TimeUtil_1.TimeUtil.GetServerTimeStamp()));
    var a = Net_1.Net.GetUnVerifiedMessageCount();
    var a = a > 10 ? `
协议缓存队列长度:${a}` : "";
    var l = (1000 / t).toFixed(0);
    var h = ActorSystem_1.ActorSystem.Size;
    var n = ActorSystem_1.ActorSystem.Capacity;
    var _ = BaseConfigController_1.BaseConfigController.GetPackageConfigOrDefault("Stream");
    var c = ModelManager_1.ModelManager.BulletModel?.GetBulletEntityMap().size;
    this.pk += t;
    if (this.pk > this.yet) {
      this.pk = 0;
      this.UpdateEffectState();
      this.oMa();
    }
    let m = `Fps:${l} Pos: (${i},${s},${e})`;
    m = `${m = !this.ola && this.SH.size > 0 ? m + "  " + this.Zva : m} 
CTime:${r}${this.Qwu}
STime:${o}
GTime:${ModelManager_1.ModelManager.TimeOfDayModel.GameTime.HourMinuteString}`;
    if (!this.ola) {
      if (t = Global_1.Global.BaseCharacter?.CharacterActorComponent?.MoveComp) {
        m = m + "  Gravity:" + t.GravityDirect.ToString();
      }
    }
    if (!this.ola) {
      m = `${m = (m = m + " ServerIp:" + ModelManager_1.ModelManager.LoginModel.Platform + a + this.Eet) + " Bullet:" + c}
Actor:${h}/${n} (${_}) Load:${loadModeName[ResourceSystem_1.ResourceSystem.GetLoadMode()]} Budge:${budgetName[GameBudgetInterfaceController_1.GameBudgetInterfaceController.CurrentGlobalMode]}`;
    }
    if (UE.KuroRenderingRuntimeBPPluginBPLibrary.GetRayTracingSupportedType() === 0 && UE.KismetSystemLibrary.GetConsoleVariableIntValue("r.RayTracing.Enable")) {
      let e = "";
      let t = false;
      if (UE.KismetSystemLibrary.GetConsoleVariableIntValue("r.Lumen.Reflections.Allow") > 0) {
        e += " Reflections";
        t = true;
      }
      if (UE.KismetSystemLibrary.GetConsoleVariableIntValue("r.Lumen.DiffuseIndirect.Allow") > 0) {
        if (t) {
          e += " /";
        }
        e += " GI";
        t = true;
      }
      if (UE.KismetSystemLibrary.GetConsoleVariableIntValue("r.RayTracing.Shadows") > 0) {
        if (t) {
          e += " /";
        }
        e += " Shadows";
        t = true;
      }
      if (!t) {
        e = "off";
      }
      m = `${m}\n RayTracing Feature: <color=green>${e}</color>`;
    }
    l = UE.KismetSystemLibrary.GetConsoleVariableIntValue("r.Streaming.DetailPanel");
    i = UE.StreamableRenderAsset.GetStreamingBudgetInfo();
    if (l > 0 && (i.X > 0 || i.Z > 0) && (s = i.X < i.Y ? "green" : "#ff0000ff", e = i.Z < i.W ? "green" : "#ff0000ff", r = l > 1, o = l < 3 ? 6 : (l - 1) * 6, t = i.X < i.Y ? 0 : o, a = i.Z < i.W ? 0 : o, m += `
StreamingPool: `, c = r ? "Require " : "", h = r ? "Budget " : "", i.W > 0 ? (i.X > 0 && (m = `${m}<color=${s}><size=+${t}> Texture ${c}${i.X}/${h}${i.Y}, </size></color>`), i.Z > 0 && (m = `${m}<color=${e}><size=+${a}> Mesh ${c}${i.Z}/${h}${i.W}</size></color>`)) : i.X > 0 && (m = `${m}<color=${s}><size=+${t}> Texture + Mesh ${c}${i.X}/${h}${i.Y}</size></color>`), r)) {
      n = UE.StreamableRenderAsset.GetStreamingRenderAssetsInfo();
      m = `${m = `${m}
RenderAssetNum: Texture ${n.X} Mesh ${n.Y}`}
CurrentTextureMem:${n.Z} RTMem:${n.W}`;
      _ = UE.StreamableRenderAsset.GetStreamingPoolInfo();
      m = `${m}
TextureStreamingPoolSize:${_.X} NonStreaming:${_.Y}`;
      if (_.Z > 0) {
        m = `${m}\nAvailableStreamingVRAM:${_.Z} UsableVRAM:${_.W})`;
      }
      m += `

`;
    }
    this.pet.SetText(m);
  }
  UpdateNiagaraGlobalWindow() {
    let e = "";
    let t = false;
    var i = UE.NiagaraFunctionLibrary.GetGlobalInfo();
    var s = i.GlobalTotalActive;
    var r = i.GlobalTotalScalability;
    var o = i.GlobalTotalParticles;
    var i = i.GlobalTotalEmitters;
    let a = 1;
    let l = 1;
    let h = 1;
    let n = 1;
    l = 1000;
    h = 4000;
    n = 2000;
    if (s > (Platform_1.Platform.IsPcPlatform() || Platform_1.Platform.IsPs5Platform(), a = 1000)) {
      e += ` TotalActive超标,当前值是:${s}
`;
      t = true;
    }
    if (r > l) {
      e += ` TotalScalability超标,当前值是:${r}
`;
      t = true;
    }
    if (o > h) {
      e += ` TotalParticles超标,当前值是:${o}
`;
      t = true;
    }
    if (i > n) {
      e += ` TotalEmitters超标,当前值是:${i}
`;
      t = true;
    }
    if (t) {
      e += ` 请联系客户端 wanglingjie
`;
      this.lYa?.SetUIActive(true);
      this.lYa?.SetText(e);
      if (ModelManager_1.ModelManager.GameModeModel?.MapConfig?.PakRule === 1) {
        this.Fnu?.SetUIActive(true);
      } else {
        this.Fnu?.SetUIActive(false);
      }
    } else {
      this.lYa?.SetUIActive(false);
      this.Fnu?.SetUIActive(false);
    }
  }
  UpdateEffectState() {
    var e = EffectSystem_1.EffectSystem.GetEffectCount();
    var t = EffectSystem_1.EffectSystem.GetActiveEffectCount();
    var i = EffectSystem_1.EffectSystem.GetEffectLruSize();
    var s = EffectSystem_1.EffectSystem.GetEffectLruCapacity();
    var r = EffectSystem_1.EffectSystem.GetPlayerEffectLruSize(0);
    var o = EffectSystem_1.EffectSystem.GetPlayerEffectLruSize(1);
    var a = EffectSystem_1.EffectSystem.GetPlayerEffectLruSize(2);
    var l = EffectSystem_1.EffectSystem.GetPlayerEffectLruSize(3);
    this.Eet = `
Effect: ${e}(${t}) Pool:${i}/${s}(${r})(${o})(${a})(${l})`;
  }
  oMa() {
    if (this.SH.size !== 0) {
      var s = Math.floor(this.eMa / this.tMa);
      let e = WARNING_COLOR;
      let t = "";
      let i = "";
      this.zva.SetUIActive(false);
      if (s < LOW_SCORE_THRESHOLD) {
        e = LOW_SCORE_COLOR;
      } else if (s < MID_SCORE_THRESHOLD) {
        e = MID_SCORE_COLOR;
        t = "<b>";
        i = "</b>";
      } else if (s < HIGH_SCORE_THRESHOLD) {
        e = HIGH_SCORE_COLOR;
        t = "<size=+6><b>";
        i = "</b></size>";
      } else if (s >= HIGH_SCORE_THRESHOLD) {
        e = WARNING_COLOR;
        t = "<size=+18><b>";
        i = "</b></size>";
        this.zva.SetUIActive(true);
        this.zva.SetText(`<size=+28><b><color=red>Warning!!!此处Aoi范围内可Tick实体过多，有性能问题。TickScore:${s}</color></b></size>`);
      }
      this.Zva = `<color=${e}>${t}TickScore:${s}${i}</color>`;
      this.eMa = 0;
      this.tMa = 0;
    }
  }
  get rMa() {
    let i = 0;
    ModelManager_1.ModelManager.CreatureModel.GetAllEntities().forEach(e => {
      var t;
      if (e.Entity.LastTickFrame === Time_1.Time.Frame && (t = (e = e.Entity.GetComponent(0)).GetPbDataId(), e?.GetEntityType() !== Protocol_1.Aki.Protocol.kks.Proto_Player) && e?.GetEntityType() !== Protocol_1.Aki.Protocol.kks.Proto_Vision && t !== 14000169 && (t = e?.GetPbEntityInitData())) {
        i += this.nMa(t.BlueprintType);
      }
    });
    return Math.floor(i);
  }
  nMa(e) {
    if (e.includes("SimpleNPC")) {
      return SIMPLE_NPC_PERFORMANCE_SCORE;
    } else if ((e = this.SH.get(e)) === undefined) {
      return 0;
    } else {
      return e;
    }
  }
  iMa() {
    var e = (0, PublicUtil_1.getConfigPath)(ENTITY_SCORE_PATH);
    var t = (0, puerts_1.$ref)("");
    UE.KuroStaticLibrary.LoadFileToString(t, e);
    if (e = (0, puerts_1.$unref)(t)) {
      t = JSON.parse(e);
      if (t) {
        e = t.EntityTypeScore;
        if (e) {
          this.SH.clear();
          for (const i of e) {
            this.SH.set(i.BlueprintType, Math.floor(i.Score * 10) / 10);
          }
        }
      }
    }
  }
}
(exports.PositionPanel = PositionPanel).vJe = Stats_1.Stat.Create("[BattleView]PositionPanelTick");
//# sourceMappingURL=PositionPanel.js.map