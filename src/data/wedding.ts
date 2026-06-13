export const WEDDING = {
  groom: 'مصطفى',
  bride: 'آية',
  date: new Date('2026-07-04T20:00:00'),
  dateLabel: 'السبت ٤ يوليو ٢٠٢٦',
  timeLabel: '٨:٠٠ مساءً',

  henna: {
    dateLabel: 'الجمعة ٣ يوليو ٢٠٢٦',
    timeLabel: '٨:٠٠ مساءً',
    location: 'منزل العروس',
    title: '🌙 ليلة الحنة',
  },

  ceremony: {
    dateLabel: 'السبت ٤ يوليو ٢٠٢٦',
    timeLabel: '٨:٠٠ مساءً',
    venue: 'قاعة منتجع الكابيتانو',
    address: 'بجوار مركز شباب العدوة',
    title: '💒 حفل الزفاف',
  },

  timeline: [
    { time: '٧:٠٠ مساءً', title: 'استقبال الضيوف', icon: '🤝' },
    { time: '٨:٠٠ مساءً', title: 'بداية الحفل', icon: '🎵' },
    { time: '٨:٣٠ مساءً', title: 'الزفة', icon: '🎶' },
    { time: '٩:٠٠ مساءً', title: 'التقاط الصور', icon: '📸' },
    { time: '٩:٣٠ مساءً', title: 'العشاء', icon: '🍽️' },
    { time: '١٠:٣٠ مساءً', title: 'الاحتفال', icon: '💃' },
    { time: '١٢:٠٠ صباحاً', title: 'ختام الحفل', icon: '🎉' },
  ],

  gallery: [
    { id: 1, src: 'https://picsum.photos/seed/wedding1/600/750', alt: 'صورة زفاف ١' },
    { id: 2, src: 'https://picsum.photos/seed/wedding2/750/500', alt: 'صورة زفاف ٢' },
    { id: 3, src: 'https://picsum.photos/seed/wedding3/500/650', alt: 'صورة زفاف ٣' },
    { id: 4, src: 'https://picsum.photos/seed/wedding4/650/500', alt: 'صورة زفاف ٤' },
    { id: 5, src: 'https://picsum.photos/seed/wedding5/800/550', alt: 'صورة زفاف ٥' },
    { id: 6, src: 'https://picsum.photos/seed/wedding6/550/750', alt: 'صورة زفاف ٦' },
    { id: 7, src: 'https://picsum.photos/seed/wedding7/600/600', alt: 'صورة زفاف ٧' },
  ],

  mapLink: 'https://maps.google.com/?q=منتجع+الكابيتانو+العدوة',
} as const;
