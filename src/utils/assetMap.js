import bridge from '@/assets/bridge.png';
import emzor from '@/assets/emzor.png';
import hba from '@/assets/hba-africa.png';
import hfnPartner from '@/assets/hfn_partner.png';
import heroMain from '@/assets/image.jpg';
import oando from '@/assets/oando_logo.png';
import pharm from '@/assets/pharm.png';
import society from '@/assets/society.png';

export const assetMap = {
  bridge,
  emzor,
  pharm,
  society,
  oando,
  hba,
  'hero-main': heroMain,
  hfn_partner: hfnPartner,
};

export const resolveAsset = (key) => assetMap[key] || key || '';
