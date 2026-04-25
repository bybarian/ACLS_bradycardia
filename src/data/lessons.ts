import { LessonSection, RhythmType } from "../types";

export const LESSONS: LessonSection[] = [
  {
    id: "narrow-regular",
    title: "慢的 + 窄的 + 規則的",
    subtitle: "第一類：最穩定的心搏過緩類型",
    teachingPoints: [
      "1st degree AV block: P-R 間隔延長 (>0.2秒)，但每個 P 波後面都有 QRS。",
      "Junctional bradycardia: 沒有 P 波（或倒置），跳動由 AV 交界發出，通常心律在 20~40 次/分。",
      "治療重點：通常以觀察或治療原發疾病為主。"
    ],
    characteristic: {
      speed: "慢",
      width: "窄",
      regularity: "規則"
    },
    rhythms: [RhythmType.FIRST_DEGREE_AVB, RhythmType.JUNCTIONAL],
    quizzes: [
      {
        id: "q1",
        rhythm: RhythmType.FIRST_DEGREE_AVB,
        description: "心電圖顯示 P-R 間期固定為 0.28 秒，QRS 寬度正常，心跳 50 次/分且規則。",
        hint: "注意 P 到 R 的時間是否超過一大格(0.2秒)。",
        explanation: "PR 間期 > 0.2 秒且固定，每個 P 後都有 QRS，這是典型的一度房室阻斷。"
      },
      {
        id: "q2",
        rhythm: RhythmType.JUNCTIONAL,
        description: "心電圖找不到明顯的 P 波，QRS 波型窄，節律規則，心跳率約為 35 次/分。",
        hint: "核心重點是『沒有 P 波』或 P 波非常靠近 QRS。",
        explanation: "沒有 P 波且 QRS 窄而規則，心跳慢，判斷為交界性心搏過慢。"
      }
    ]
  },
  {
    id: "narrow-irregular",
    title: "慢的 + 窄的 + 不規則的",
    subtitle: "第二類：需要區分房室傳導問題或結節問題",
    teachingPoints: [
      "Mobitz I (Wenckebach): PR 間期漸行漸遠，直到一個 QRS 掉落。",
      "Mobitz II: PR 間期固定，但會突然掉落一個 QRS。",
      "Af SVR (心房顫動慢速反應): 完全沒有 P 波，基線不穩，且 RR 間隔絕對不規則。",
      "SSS (病竇症候群): 可能出現竇性停跳(Sinus Pause)或心跳極慢。"
    ],
    characteristic: {
      speed: "慢",
      width: "窄",
      regularity: "不規則"
    },
    rhythms: [RhythmType.MOBITZ_1, RhythmType.MOBITZ_2, RhythmType.AF_SVR, RhythmType.SSS],
    quizzes: [
      {
        id: "q3",
        rhythm: RhythmType.MOBITZ_1,
        description: "心電圖顯示 PR 間期從 0.18s -> 0.24s -> 0.30s，然後接著一個 P 波後沒有出現 QRS。",
        hint: "觀察 PR 間期是否有變長的趨勢。",
        explanation: "PR 漸行漸遠直到掉落，這是 Mobitz I (Wenckebach) 的特徵。"
      },
      {
        id: "q4",
        rhythm: RhythmType.AF_SVR,
        description: "基線出現不規則顫動，找不到 P 波，RR 間隔長短不一，平均心跳 45 次/分。",
        hint: "找不到 P 波且 RR 完全不規則。",
        explanation: "心房顫動合併慢速心室反應 (Af with SVR)。"
      }
    ]
  },
  {
    id: "wide-rhythm",
    title: "慢的 + 寬的",
    subtitle: "第三類：最具危險性的類型",
    teachingPoints: [
      "3rd degree AV block: P 波與 QRS 脫鉤，各跳各的。通常 QRS 是寬的且心跳極慢。",
      "IVR (心室自主性節律): 沒有 P 波，跳動由心室發出，QRS 極寬且心跳通常只有 20~40 次/分。",
      "這種情況通常預示著傳導系統嚴重受損。"
    ],
    characteristic: {
      speed: "慢",
      width: "寬",
      regularity: "規則"
    },
    rhythms: [RhythmType.THIRD_DEGREE_AVB, RhythmType.IVR],
    quizzes: [
      {
        id: "q5",
        rhythm: RhythmType.THIRD_DEGREE_AVB,
        description: "P 波點點名(PP固定)，QRS 也點點名(RR固定)，但 PR 間期毫無規律。QRS > 0.12s。",
        hint: "P 波與 QRS 是否有關聯？(各跳各的)",
        explanation: "AV dissociation (房室脫鉤) 是三度房室阻斷的核心診斷標準。"
      }
    ]
  }
];
