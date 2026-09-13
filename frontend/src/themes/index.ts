import makarSankranti from "./data/makar-sankranti";
import vasantPanchami from "./data/vasant-panchami";
import mahaShivaratri from "./data/maha-shivaratri";
import holi from "./data/holi";
import ugadiGudiPadwa from "./data/ugadi-gudi-padwa";
import ramNavami from "./data/ram-navami";
import akshayaTritiya from "./data/akshaya-tritiya";
import guruPurnima from "./data/guru-purnima";
import rakshaBandhan from "./data/raksha-bandhan";
import krishnaJanmashtami from "./data/krishna-janmashtami";
import ganeshChaturthi from "./data/ganesh-chaturthi";
import durgaPujaNavaratri from "./data/durga-puja-navaratri";
import diwali from "./data/diwali";
import type { FestivalTheme } from "./types";

// Ordered chronologically through the Hindu calendar year (Jan -> Nov), used
// as-is for the admin picker grid.
export const FESTIVAL_THEME_LIST: FestivalTheme[] = [
  makarSankranti,
  vasantPanchami,
  mahaShivaratri,
  holi,
  ugadiGudiPadwa,
  ramNavami,
  akshayaTritiya,
  guruPurnima,
  rakshaBandhan,
  krishnaJanmashtami,
  ganeshChaturthi,
  durgaPujaNavaratri,
  diwali,
];

export const FESTIVAL_THEMES: Record<string, FestivalTheme> = Object.fromEntries(
  FESTIVAL_THEME_LIST.map((theme) => [theme.id, theme]),
);
