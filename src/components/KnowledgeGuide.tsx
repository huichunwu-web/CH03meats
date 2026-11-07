import React, { useState } from 'react';
import { soundManager } from '../utils/audio';
import { 
  BookOpen, 
  Layers, 
  Flame, 
  Thermometer, 
  Search, 
  CheckCircle2, 
  ShieldAlert, 
  Utensils, 
  Sparkles,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export const KnowledgeGuide: React.FC = () => {
  const [activeSection, setActiveSection] = useState<number>(1);

  const sections = [
    { id: 1, title: '第1節 肉的構造與肌纖維', icon: '🥩' },
    { id: 2, title: '第2節 肉的色香味與質地', icon: '🍷' },
    { id: 3, title: '第3節 死後變化與異常肉品', icon: '⏳' },
    { id: 4, title: '第4節 畜肉檢驗、分級與部位', icon: '🐖' },
    { id: 5, title: '第5節 禽肉選擇與細部分割', icon: '🍗' },
    { id: 6, title: '第6節 肉的製備與嫩化技法', icon: '🍳' },
    { id: 7, title: '第7節 肉類加工品及其製備', icon: '🌭' },
  ];

  const handleSelectSection = (id: number) => {
    soundManager.playClick();
    setActiveSection(id);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      {/* Overview Banner */}
      <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">📖</span>
              <h2 className="text-lg font-bold text-stone-900">第3章 肉類·重點精華講義導讀</h2>
            </div>
            <p className="text-xs text-stone-500 mt-1">
              彙整上課簡報 7 大章節核心圖解、對比圖表與關鍵數據，考前快速複習必備。
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-stone-600">
            <span className="font-semibold text-amber-800">章節導覽：</span>
            <span>共 7 個單元</span>
          </div>
        </div>

        {/* Section Navigation Tabs */}
        <div className="mt-4 pt-3 border-t border-stone-100 flex items-center gap-1.5 overflow-x-auto pb-1">
          {sections.map((sec) => (
            <button
              key={sec.id}
              onClick={() => handleSelectSection(sec.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-all ${
                activeSection === sec.id
                  ? 'bg-amber-800 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              <span>{sec.icon}</span>
              <span>{sec.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Section Content Display */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
        
        {/* SECTION 1 */}
        {activeSection === 1 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="border-b border-stone-200 pb-4">
              <span className="text-xs font-bold text-amber-800">CH03-1 P.1~9</span>
              <h3 className="text-xl font-bold text-stone-900 mt-1">第1節 肉的構造與肌纖維</h3>
            </div>

            {/* Muscle Structure Hierarchy */}
            <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200/60 space-y-2">
              <div className="text-xs font-bold text-amber-900">肌肉組織構造層級 (Muscle Hierarchy)：</div>
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono font-semibold">
                <span className="bg-white px-2.5 py-1 rounded-md border border-amber-200 text-stone-800">肌節</span>
                <span>➔</span>
                <span className="bg-white px-2.5 py-1 rounded-md border border-amber-200 text-stone-800">肌原纖維</span>
                <span>➔</span>
                <span className="bg-amber-700 text-white px-2.5 py-1 rounded-md">肌肉纖維 (基本單位)</span>
                <span>➔</span>
                <span className="bg-white px-2.5 py-1 rounded-md border border-amber-200 text-stone-800">肌束</span>
                <span>➔</span>
                <span className="bg-stone-900 text-white px-2.5 py-1 rounded-md">肌肉 (外圍包覆外肌膜)</span>
              </div>
            </div>

            {/* Red Muscle vs White Muscle Table */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-stone-900">骨骼肌纖維分類比較表</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border-collapse border border-stone-200">
                  <thead>
                    <tr className="bg-stone-100 text-stone-700 font-bold">
                      <th className="p-3 border border-stone-200">特徵項目</th>
                      <th className="p-3 border border-stone-200 bg-rose-50 text-rose-900">紅色肌 (慢肌 Slow-twitch)</th>
                      <th className="p-3 border border-stone-200 bg-stone-50 text-stone-800">白色肌 (快肌 Fast-twitch)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200">
                    <tr>
                      <td className="p-3 font-semibold border border-stone-200">生理生理特性</td>
                      <td className="p-3 border border-stone-200">微血管多、粒線體高、富含肌紅蛋白與鐵質</td>
                      <td className="p-3 border border-stone-200">粒線體少、肌紅蛋白低</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold border border-stone-200">運動類型</td>
                      <td className="p-3 border border-stone-200">持續性長耐力運動，需大量氧氣</td>
                      <td className="p-3 border border-stone-200">短期爆發性運動，無氧代謝為主</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold border border-stone-200">口感與多汁性</td>
                      <td className="p-3 border border-stone-200 text-rose-800 font-medium">有咬感、肌間有脂肪分佈，具多汁感</td>
                      <td className="p-3 border border-stone-200 text-stone-600">肌肉鬆散、無脂肪分佈，口感較澀</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold border border-stone-200">常見代表肉品</td>
                      <td className="p-3 border border-stone-200">土雞腿肉、牛肉、豬肉（運動量大顏色越深）</td>
                      <td className="p-3 border border-stone-200">雞胸肉、雞里肌肉</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Connective Tissue: Collagen vs Elastin */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl border border-stone-200 bg-stone-50 space-y-2">
                <div className="text-xs font-bold text-amber-800">膠原蛋白 (Collagen)</div>
                <ul className="text-xs text-stone-700 space-y-1">
                  <li>• 動物體內最多蛋白質，外肌膜主成分、肌腱主要物質。</li>
                  <li>• 加熱 60℃ 以上可軟化，在 <strong>65~80℃ 間隨時間延長轉變為明膠 (Gelatin)</strong>，使肉質更嫩。</li>
                  <li>• 隨年齡增加含量減少，但交聯度變緊不易煮爛。</li>
                </ul>
              </div>

              <div className="p-4 rounded-2xl border border-stone-200 bg-stone-50 space-y-2">
                <div className="text-xs font-bold text-stone-800">彈性蛋白 (Elastin)</div>
                <ul className="text-xs text-stone-700 space-y-1">
                  <li>• 存在於韌帶中，連結骨骼與關節（前腿、肩胛、頸部含量多）。</li>
                  <li>• <strong>加熱無法軟化</strong>，口感極韌，料理時常被丟棄修除。</li>
                </ul>
              </div>
            </div>

            {/* Cut direction & Fat Melting */}
            <div className="p-4 rounded-2xl bg-stone-100 text-xs space-y-2">
              <div className="font-bold text-stone-900">刀工與脂肪物理特性：</div>
              <p className="text-stone-700">
                • <strong>逆紋切：</strong>垂直切割肌纖維束截斷長纖維，方便咀嚼；順紋切不易咬斷。
              </p>
              <p className="text-stone-700">
                • <strong>脂肪硬度與融點：</strong>羊脂 &gt; 牛脂 &gt; 豬油（豬油單元不飽和脂肪酸較多硬度低；禽類不飽和度高於畜類）。
              </p>
              <p className="text-stone-700">
                • <strong>飼料換肉率：</strong>雞 1.5 &lt; 豬 3.5 &lt; 牛 7.0（大型動物飼料需求高價格貴）。
              </p>
            </div>
          </div>
        )}

        {/* SECTION 2 */}
        {activeSection === 2 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="border-b border-stone-200 pb-4">
              <span className="text-xs font-bold text-amber-800">CH03-1 P.10~18</span>
              <h3 className="text-xl font-bold text-stone-900 mt-1">第2節 肉的色香味與質地</h3>
            </div>

            {/* Meat Color Spectrum */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-stone-900">肌紅蛋白 (Myoglobin) 變色三階段</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-xl border border-purple-200 bg-purple-50/60 space-y-1">
                  <div className="text-xs font-bold text-purple-900">1. 還原肌紅蛋白 (紫紅)</div>
                  <div className="text-xs text-stone-600">
                    真空包裝、冷凍肉或剛切開肉品內部缺氧狀態。鐵為二價，未結合氧，為正常新鮮原色。
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/60 space-y-1">
                  <div className="text-xs font-bold text-rose-900">2. 氧合肌紅蛋白 (鮮紅)</div>
                  <div className="text-xs text-stone-600">
                    切開接觸空氣 30 分鐘，與適量氧氣結合呈現鮮紅色（超市保鮮膜冷藏包裝）。
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/60 space-y-1">
                  <div className="text-xs font-bold text-amber-900">3. 變性肌紅蛋白 (棕褐)</div>
                  <div className="text-xs text-stone-600">
                    長時間接觸氧氣過度氧化，二價鐵被氧化成三價鐵無法結氧，肉色轉為棕褐色。
                  </div>
                </div>
              </div>
            </div>

            {/* Green Meat Phenomenon & Curing */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl border border-stone-200 bg-stone-50 space-y-2">
                <div className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  綠色彩光現象辨析
                </div>
                <p className="text-xs text-stone-700 leading-relaxed">
                  <strong>物理繞射 (正常)：</strong>光線照射到鋒利刀刃平整切斷的肌纖維微結構產生繞射，呈現金屬綠彩虹光，無異味，安心可食。<br/>
                  <strong>微生物腐敗 (異常)：</strong>肉不新鮮分解產生含硫物質 (H2S)，生成「硫肌紅蛋白」變綠，有腐臭酸味且黏液拉絲，不可食用！
                </p>
              </div>

              <div className="p-4 rounded-2xl border border-stone-200 bg-stone-50 space-y-2">
                <div className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                  <Utensils className="w-4 h-4 text-rose-600" />
                  亞硝酸鹽發色機制
                </div>
                <p className="text-xs text-stone-700 leading-relaxed">
                  添加硝石中之<strong>亞硝酸鹽</strong>釋放一氧化氮 (NO)，與肌紅蛋白結合成「一氧化氮肌紅蛋白」，經加熱後形成極為耐熱且穩定的<strong>粉紅色色素 (Nitrosohemochrome)</strong>，常保火腿香腸紅潤。
                </p>
              </div>
            </div>

            {/* Flavor & Brining */}
            <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-100 text-xs space-y-2">
              <div className="font-bold text-amber-900">風味來源與泡鹽水多汁科學：</div>
              <p className="text-stone-700">
                • <strong>滋味成分：</strong>短鏈胜肽、小分子游離胺基酸（甜：醣類/胺基酸；鹹：無機鹽；酸：乳酸/磷酸；鮮：核苷酸IMP、麩胺酸）。長時間慢火燉煮老母雞最鮮美！
              </p>
              <p className="text-stone-700">
                • <strong>泡鹽水 (Brining)：</strong>浸泡 2~5% 鹽水，利用滲透壓促使肌纖維蛋白結構放鬆澎潤，牢牢吸附水分，煮後極致軟嫩多汁。
              </p>
            </div>
          </div>
        )}

        {/* SECTION 3 */}
        {activeSection === 3 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="border-b border-stone-200 pb-4">
              <span className="text-xs font-bold text-amber-800">CH03-2 P.1~4</span>
              <h3 className="text-xl font-bold text-stone-900 mt-1">第3節 肉類的死後變化及變質肉</h3>
            </div>

            {/* Rigor Mortis Timeline */}
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
              <div className="text-xs font-bold text-stone-900">死後僵直進入時程：</div>
              <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
                <div className="p-2 bg-white rounded-lg border border-stone-200">禽肉類：6 ~ 12 小時</div>
                <div className="p-2 bg-white rounded-lg border border-stone-200">豬肉：6 ~ 20 小時</div>
                <div className="p-2 bg-white rounded-lg border border-stone-200">牛肉：12 ~ 24 小時</div>
              </div>
              <p className="text-xs text-stone-600 mt-1">
                <strong>僵直期：</strong>保水性差、肉質堅硬不適食用。<strong>解僵熟成：</strong>蛋白質在冷藏（2~4℃）下受酵素水解軟化，釋放胜肽鮮味。
              </p>
            </div>

            {/* Dry Aging vs Wet Aging */}
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-stone-900">美國牛肉：乾式熟成 vs 濕式熟成</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-2xl border border-amber-200 bg-amber-50/40 space-y-2">
                  <div className="font-bold text-amber-900">乾式熟成 (Dry Aging)</div>
                  <ul className="text-stone-700 space-y-1">
                    <li>• <strong>環境：</strong>0℃，相對濕度 50~85%，紫外光照射冷藏室。</li>
                    <li>• <strong>天數：</strong>熟成 20 ~ 45 天。</li>
                    <li>• <strong>特點：</strong>無包裝表面大量脫水形成硬殼，鎖住甜味香氣。</li>
                    <li>• <strong>損耗：</strong>修除乾硬外層損失 20~30%，價格昂貴。</li>
                  </ul>
                </div>

                <div className="p-4 rounded-2xl border border-stone-200 bg-stone-50 space-y-2">
                  <div className="font-bold text-stone-900">濕式熟成 (Wet Aging)</div>
                  <ul className="text-stone-700 space-y-1">
                    <li>• <strong>方式：</strong>進口牛肉最普遍方式，直接置入<strong>真空袋</strong>冷藏熟成。</li>
                    <li>• <strong>天數：</strong>可維持 75 至 90 天。</li>
                    <li>• <strong>特點：</strong>無水份風乾損耗，經濟多汁大眾化。</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Abnormal Meats: DFD vs PSE */}
            <div className="p-4 rounded-2xl border border-rose-200 bg-rose-50/30 space-y-3">
              <div className="text-xs font-bold text-rose-900">異常肉品 (Abnormal Meat)：</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-white rounded-xl border border-rose-200">
                  <div className="font-bold text-rose-900">DFD 暗乾肉 (Dark, Firm, Dry)</div>
                  <p className="text-stone-600 mt-1">
                    宰前緊迫恐懼耗盡肌肉肝醣，宰後無法正常產酸，<strong>pH 值偏高 (&gt;6.0)</strong>，肉色紫黑乾燥，細菌極易繁殖。
                  </p>
                </div>
                <div className="p-3 bg-white rounded-xl border border-rose-200">
                  <div className="font-bold text-rose-900">PSE 水樣肉 (Pale, Soft, Exudative)</div>
                  <p className="text-stone-600 mt-1">
                    高溫屠宰未即時冷卻，<strong>酸度急降 (pH 急速降低)</strong>，蛋白質變性，肉色淡白發灰、質地鬆軟、汁液大量外流。
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 4 */}
        {activeSection === 4 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="border-b border-stone-200 pb-4">
              <span className="text-xs font-bold text-amber-800">CH03-2 P.5~18</span>
              <h3 className="text-xl font-bold text-stone-900 mt-1">第4節 畜肉檢驗、分級與部位分切</h3>
            </div>

            {/* Inspection & Grading */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1.5">
                <div className="font-bold text-stone-900">肉品檢驗重點</div>
                <p className="text-stone-600">• <strong>寄生蟲病：</strong>旋毛蟲、中華肝吸蟲、有鈎及無鈎條蟲。</p>
                <p className="text-stone-600">• <strong>狂牛症：</strong>變異性普立昂蛋白 (Prion)，具極強耐熱性，一般烹煮無法破壞。</p>
              </div>

              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1.5">
                <div className="font-bold text-stone-900">牛肉分級 (美國 USDA 8 級)</div>
                <p className="text-stone-600">
                  極佳級 (Prime) ➔ 特選級 (Choice) ➔ 可選級 (Good/Select) ➔ 合格級 (Standard) ➔ 商用級 (Commercial) ➔ 可用級 (Utility) ➔ 切塊級 (Cutter) ➔ 製罐級 (Canner)。
                </p>
                <p className="text-stone-500 font-medium">台灣進口主要以特選級 (Choice) 為主，少數 Prime 供應高級餐廳。</p>
              </div>
            </div>

            {/* Pork Cuts Highlights */}
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-stone-900">台灣豬肉 12 細部分切與烹調指南</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                  <div className="font-bold text-amber-800">松阪肉 (玻璃肉)</div>
                  <div className="text-stone-600 mt-0.5">豬頸兩頰肥肉層中，油花網狀分佈，爽脆細嫩多汁，適水煮與火烤。</div>
                </div>
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                  <div className="font-bold text-amber-800">小里肌 (腰內肉)</div>
                  <div className="text-stone-600 mt-0.5">整頭豬最嫩、無筋、水分多低脂，日式炸豬排與快炒首選原料。</div>
                </div>
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                  <div className="font-bold text-amber-800">五花肉 (三層肉)</div>
                  <div className="text-stone-600 mt-0.5">腹部肋條肉，一層肥一層瘦，適合慢火燉滷、爌肉、蒜泥白肉與培根。</div>
                </div>
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                  <div className="font-bold text-amber-800">梅花肉 vs 胛心肉</div>
                  <div className="text-stone-600 mt-0.5">肩胛部位：梅花肉油花網狀適合快炒；胛心肉質粗適肉丸與咖哩絞肉。</div>
                </div>
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                  <div className="font-bold text-amber-800">大里脊肉</div>
                  <div className="text-stone-600 mt-0.5">背脊平整瘦肉，煎炸前需拍鬆並「斷邊切斷筋膜」以防油炸捲曲。</div>
                </div>
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                  <div className="font-bold text-amber-800">前腿 vs 後腿</div>
                  <div className="text-stone-600 mt-0.5">前腿筋多吸水強適貢丸肉餡；後腿 (腿庫) 肉質嫩適作回鍋肉與白肉。</div>
                </div>
              </div>
            </div>

            {/* 4 Methods to Identify Injected Water Meat */}
            <div className="p-4 rounded-2xl bg-amber-50/40 border border-amber-200 space-y-2">
              <div className="text-xs font-bold text-amber-900">鑑別灌水肉的 4 大實務檢驗法：</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div><strong>1. 外觀觀察：</strong>瘦肉淡紅、脂肪蒼白無光，切口流出大量淡紅血水。</div>
                <div><strong>2. 觸摸檢驗：</strong>正常肉按壓有彈性油滑且具黏性；灌水肉無彈性且血水流出。</div>
                <div><strong>3. 燃燒試驗：</strong>用紙巾貼切口後點燃，正常肉完全燃燒，灌水肉無法燃燒。</div>
                <div><strong>4. 衛生紙法：</strong>貼於切口，正常肉吸水慢不易破；灌水肉紙張立刻濕透易拉斷。</div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 5 */}
        {activeSection === 5 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="border-b border-stone-200 pb-4">
              <span className="text-xs font-bold text-amber-800">CH03-3 P.1~4</span>
              <h3 className="text-xl font-bold text-stone-900 mt-1">第5節 禽肉選擇與細部分割</h3>
            </div>

            {/* Native Chicken vs Broiler */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-stone-900">土雞 (有色雞) vs 白肉雞 深度比對表</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border-collapse border border-stone-200">
                  <thead>
                    <tr className="bg-stone-100 font-bold text-stone-800">
                      <th className="p-3 border border-stone-200">項目</th>
                      <th className="p-3 border border-stone-200 bg-amber-50 text-amber-950">土雞 (有色雞)</th>
                      <th className="p-3 border border-stone-200 bg-stone-50 text-stone-800">白肉雞</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200">
                    <tr>
                      <td className="p-3 font-semibold border border-stone-200">特徵</td>
                      <td className="p-3 border border-stone-200">體型短頸、粗壯腳（黑腳或黃腳）、野性高愛活動</td>
                      <td className="p-3 border border-stone-200">體型長頸圓胸、腿弱、白毛白腳、性情溫和少動</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold border border-stone-200">飼養日齡</td>
                      <td className="p-3 border border-stone-200 font-mono font-bold text-amber-800">約 80 ~ 120 天</td>
                      <td className="p-3 border border-stone-200 font-mono font-bold text-stone-700">約 35 ~ 40 天 (極速)</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold border border-stone-200">肉質特性</td>
                      <td className="p-3 border border-stone-200">肉質緊實有口感、富結締組織、皮薄光滑耐咀嚼</td>
                      <td className="p-3 border border-stone-200">肉質軟嫩、含脂率高、總膠原蛋白含量低</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold border border-stone-200">適合烹調法</td>
                      <td className="p-3 border border-stone-200 font-semibold text-amber-900">傳統烹調：燉補、熱炒、三杯、白切</td>
                      <td className="p-3 border border-stone-200 font-semibold text-stone-900">西式烹調：油炸、燒烤、雞排、漢堡加工</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Chicken Cuts */}
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-stone-900">雞肉細部分割部位名稱與特點</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                  <div className="font-bold text-stone-900">1. 雞胸肉 (++++)</div>
                  <div className="text-stone-600 mt-1">瘦肉最多部位，保濕力不強易乾硬，適煎、烤、炒、炸、蒸煮。</div>
                </div>
                <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                  <div className="font-bold text-stone-900">2. 雞里脊肉 (++++)</div>
                  <div className="text-stone-600 mt-1">100%白色肉，肌束細柔嫩易撕裂，適快炒與裹粉炸。</div>
                </div>
                <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                  <div className="font-bold text-stone-900">3. 雞大腿肉 (++++)</div>
                  <div className="text-stone-600 mt-1">紅色肉比例高，肌肉束粗，保濕性強肉汁不易流失，適炸烤。</div>
                </div>
                <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                  <div className="font-bold text-stone-900">4. 雞腿肉 (+++)</div>
                  <div className="text-stone-600 mt-1">小雞腿棒棒腿，紅色慢肌多，炸與烤極佳。</div>
                </div>
                <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                  <div className="font-bold text-stone-900">5. 雞翅肉 (+++)</div>
                  <div className="text-stone-600 mt-1">雞皮比例高、脂肪多且結締組織多，適炸、紅燒滷與熬高湯。</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 6 */}
        {activeSection === 6 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="border-b border-stone-200 pb-4">
              <span className="text-xs font-bold text-amber-800">CH03-3 P.5~15</span>
              <h3 className="text-xl font-bold text-stone-900 mt-1">第6節 肉的製備與嫩化技術</h3>
            </div>

            {/* 5 Tenderizing Methods */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-stone-900">廚藝五大肉類嫩化法</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                  <div className="font-bold text-stone-900">1. 機械性</div>
                  <p className="text-stone-600 mt-0.5">敲打斷筋、切小塊或利用真空按摩嫩化機破壞肌束。</p>
                </div>
                <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                  <div className="font-bold text-stone-900">2. 酵素水解</div>
                  <p className="text-stone-600 mt-0.5">最常用<strong>木瓜蛋白酶 (Papain)</strong>，分解肌肉蛋白質鏈。</p>
                </div>
                <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                  <div className="font-bold text-stone-900">3. 小蘇打 (碳酸氫鈉)</div>
                  <p className="text-stone-600 mt-0.5">提升保水性（滑肉法），但有鹼味需燙水或過油去除。</p>
                </div>
                <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                  <div className="font-bold text-stone-900">4. 酸與鹽 (5~6%)</div>
                  <p className="text-stone-600 mt-0.5">酸 (酒/醋/水果) 滲透慢需隔夜；鹽使蛋白質絲解聚分散。</p>
                </div>
                <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 sm:col-span-2">
                  <div className="font-bold text-stone-900">5. 抓碼與泡油</div>
                  <p className="text-stone-600 mt-0.5">
                    <strong>抓碼：</strong>醬油+全蛋(紅碼)或鹽+蛋白(白碼)，再加入太白粉裹覆。<br/>
                    <strong>泡油：</strong>以食材 2 倍以上溫油 (140~150℃) 快速滑炒撥散鎖住水份。
                  </p>
                </div>
              </div>
            </div>

            {/* Emulsification & Meatballs */}
            <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200 space-y-2 text-xs">
              <div className="font-bold text-amber-900">貢丸擂潰與乳化溫度控制：</div>
              <p className="text-stone-700">
                • <strong>乳化力：</strong>肌肉蛋白質分散並穩定脂肪球於水中的能力。碎豬肉加鹽用力攪打抽出<strong>鹽溶性蛋白質</strong>充當乳化劑，加熱變性固化成彈牙網狀。
              </p>
              <p className="text-stone-700">
                • <strong>溫控極限：</strong>乳化力隨溫度升高急速暴跌！<strong>牛肉 &lt; 20℃、豬肉 &lt; 15~17℃、禽肉 &lt; 12~13℃</strong>。
              </p>
            </div>

            {/* Steak Doneness & Cooking Techniques */}
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-stone-900">牛排熟度與烹調技巧要領</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                <div className="p-2.5 bg-stone-50 rounded-lg border border-stone-200">
                  <div className="font-bold">Rare (三分熟)</div>
                  <div className="text-stone-500 mt-0.5">拇指碰食指觸感</div>
                </div>
                <div className="p-2.5 bg-stone-50 rounded-lg border border-stone-200">
                  <div className="font-bold">Medium (五分熟)</div>
                  <div className="text-stone-500 mt-0.5">拇指碰中指觸感</div>
                </div>
                <div className="p-2.5 bg-stone-50 rounded-lg border border-stone-200">
                  <div className="font-bold">Medium Well (七分)</div>
                  <div className="text-stone-500 mt-0.5">拇指碰無名指觸感</div>
                </div>
                <div className="p-2.5 bg-stone-50 rounded-lg border border-stone-200">
                  <div className="font-bold">Well Done (全熟)</div>
                  <div className="text-stone-500 mt-0.5">拇指碰小指或握拳</div>
                </div>
              </div>
              <div className="p-3 bg-stone-100 rounded-xl text-xs space-y-1">
                <p>• <strong>大火封汁：</strong>大火煎一面鎖住肉汁再翻面，切忌不停翻面造成外熟內生。</p>
                <p>• <strong>出鍋靜置 (Resting)：</strong>剛煎好的肉內部高壓肉汁集中，靜置讓肉汁回流被肌纖維吸回再切。</p>
                <p>• <strong>日式炸豬排：</strong>沾乾麵粉 ➔ 蛋液 ➔ 麵包粉，<strong>靜置數分鐘反潮</strong>吸附牢固不脫落。</p>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 7 */}
        {activeSection === 7 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="border-b border-stone-200 pb-4">
              <span className="text-xs font-bold text-amber-800">CH03-3 P.16~21</span>
              <h3 className="text-xl font-bold text-stone-900 mt-1">第7節 肉類加工品及其製備</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                <div className="font-bold text-stone-900">中式香腸 vs 西式香腸</div>
                <p className="text-stone-700">
                  • <strong>中式香腸：</strong>絞碎醃漬充填，加熱時內部水氣膨脹易爆裂，<strong>烹調前需用牙籤戳洞洩壓</strong>。
                </p>
                <p className="text-stone-700">
                  • <strong>西式香腸 (法蘭克福/熱狗)：</strong>完全乳化型熟香腸，中心溫度需達 72℃ 以上，水分高經煮熟，<strong>必須冷藏保存</strong>。
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
                <div className="font-bold text-stone-900">金華火腿 vs 壓型火腿</div>
                <p className="text-stone-700">
                  • <strong>金華火腿：</strong>豬後腿經鹽漬洗鹽通風，藉由<strong>細菌與黴菌自然發酵</strong>，風味醇厚，為中式高湯關鍵原料。
                </p>
                <p className="text-stone-700">
                  • <strong>壓型火腿：</strong>火腿殘肉去除筋膜脂肪後，經醃漬加壓塑型而成，切片規則適作三明治。
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2 sm:col-span-2">
                <div className="font-bold text-stone-900">臘肉與培根</div>
                <p className="text-stone-700">
                  使用腹脇肉 (三層肉)，採乾醃法表面抹鹽、乾燥煙燻。炒菜用臘肉應選較肥五花肉，<strong>切片不可太厚，先以熱水汆燙數秒去除多餘鹽分</strong>。
                </p>
              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
