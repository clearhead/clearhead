const triggerMap = {
  // www.artinstitutes.edu
  'artinstitutes': 'optimizely.story',
  // www.southuniversity.edu, visit.southuniversity.edu
  'southuniversity': 'optimizely.story',
  // www.bludot.com
  'bludot': 'ch.event',
};

const sites = Object.keys(triggerMap);

export default function getTrigger() {
  const host = window.location.hostname;

  for (let site of sites) {
    if ((new RegExp(site)).test(host)) return triggerMap[site];
  }

  return 'clearhead.goal';
}
